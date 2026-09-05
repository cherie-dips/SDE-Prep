"""Sections 7-8: the design patterns, in C++."""

SECTIONS = [

("patterns-core", "The patterns you will actually use", """
<p>Seven patterns cover the overwhelming majority of what this round asks for. Each one below has:
the problem it solves, the book's definition, working C++, and &mdash; just as important &mdash;
when <b>not</b> to reach for it.</p>

<div class="box">
<p><b>The warning that matters most.</b> The commonest way to fail a design round is to bolt on
patterns to show you know them. A Singleton nobody needed, a Factory producing one product, an
Observer with one observer. Interviewers read that as cargo-culting. <b>Name a pattern only when
you can say what would go wrong without it.</b></p>
</div>

<h3>Strategy</h3>
<p><b>The problem:</b> you have a family of interchangeable algorithms &mdash; several ways to
calculate shipping, several ways to sort, several discount rules &mdash; and you keep editing a
growing <code>if/else</code> every time a new one appears.</p>
<p><b>The book:</b> <i>"defines a family of algorithms, encapsulates each one, and makes them
interchangeable. Strategy lets the algorithm vary independently from clients that use it."</i></p>

<pre><code>#include &lt;memory&gt;
#include &lt;utility&gt;

class ShippingStrategy {
public:
    virtual ~ShippingStrategy() = default;
    virtual double cost(double weightKg, double distanceKm) const = 0;
};

class StandardShipping : public ShippingStrategy {
public:
    double cost(double w, double d) const override { return 3.0 + 0.5 * w + 0.01 * d; }
};

class ExpressShipping : public ShippingStrategy {
public:
    double cost(double w, double d) const override { return 9.0 + 1.2 * w + 0.03 * d; }
};

class Order {
    std::unique_ptr&lt;ShippingStrategy&gt; shipping_;
public:
    explicit Order(std::unique_ptr&lt;ShippingStrategy&gt; s) : shipping_(std::move(s)) {}

    // swappable at RUNTIME - the thing inheritance cannot do
    void setShipping(std::unique_ptr&lt;ShippingStrategy&gt; s) { shipping_ = std::move(s); }

    double shippingCost(double w, double d) const { return shipping_-&gt;cost(w, d); }
};</code></pre>

<p><b>Where it shows up in this round:</b> pricing, discounts, ranking, routing, retry policies,
export formats. Any time the interviewer says "and we might want to add other kinds of X later",
they are asking for Strategy.</p>
<p><b>Don't use it when</b> there is exactly one algorithm and no realistic prospect of a second.
And remember section 5: if the strategy is one stateless function, <code>std::function</code> is
the lighter C++ answer.</p>

<h3>Observer</h3>
<p><b>The problem:</b> when something happens, several unrelated parts of the system need to react
&mdash; and you do not want the thing that changed to know about all of them.</p>
<p><b>The book:</b> <i>"defines a one-to-many dependency between objects so that when one object
changes state, all of its dependents are notified and updated automatically."</i></p>

<pre><code>#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;algorithm&gt;

class OrderObserver {
public:
    virtual ~OrderObserver() = default;
    virtual void onOrderPlaced(const std::string&amp; orderId) = 0;
};

class OrderService {
    // weak_ptr: we watch observers, we do NOT own them, and we can tell
    // when one has been destroyed. This is the C++-specific bit.
    std::vector&lt;std::weak_ptr&lt;OrderObserver&gt;&gt; observers_;
public:
    void subscribe(std::shared_ptr&lt;OrderObserver&gt; o) {
        observers_.push_back(std::move(o));
    }

    void placeOrder(const std::string&amp; orderId) {
        // ... persist the order ...
        notify(orderId);
    }

private:
    void notify(const std::string&amp; orderId) {
        // prune dead observers while notifying the live ones
        auto dead = std::remove_if(observers_.begin(), observers_.end(),
            [&amp;](const std::weak_ptr&lt;OrderObserver&gt;&amp; w) {
                if (auto o = w.lock()) { o-&gt;onOrderPlaced(orderId); return false; }
                return true;                       // expired -> remove
            });
        observers_.erase(dead, observers_.end());
    }
};

class EmailNotifier : public OrderObserver {
public:
    void onOrderPlaced(const std::string&amp; id) override { /* send email */ }
};
class InventoryUpdater : public OrderObserver {
public:
    void onOrderPlaced(const std::string&amp; id) override { /* decrement stock */ }
};</code></pre>

<div class="box">
<p><b>Say the <code>weak_ptr</code> reasoning out loud.</b> "I hold observers by
<code>weak_ptr</code> so the subject doesn't keep them alive &mdash; otherwise you get a leak, or a
cycle if an observer also holds the subject. Locking the weak pointer also gives me a natural place
to prune dead ones." In Java the collector handles this; in C++ it is a design decision, and
noticing it is a strong signal.</p>
</div>
<p><b>Where it shows up:</b> "when an order is placed we also need to email the customer, update
inventory, and notify the warehouse." Three things reacting to one event is the tell.</p>
<p><b>Don't use it when</b> there is one listener and there always will be &mdash; a direct call is
clearer. Also be honest about the downside: notification order is not guaranteed and debugging
becomes harder, because control flow is no longer local.</p>

<h3>Decorator</h3>
<p><b>The problem:</b> you need to add optional responsibilities in arbitrary combinations. With
inheritance you would need a subclass per combination &mdash; the class explosion the book opens
with.</p>
<p><b>The book:</b> <i>"attaches additional responsibilities to an object dynamically. Decorators
provide a flexible alternative to subclassing for extending functionality."</i></p>

<pre><code>#include &lt;memory&gt;
#include &lt;string&gt;
#include &lt;utility&gt;

class Beverage {
public:
    virtual ~Beverage() = default;
    virtual std::string description() const = 0;
    virtual double cost() const = 0;
};

class Espresso : public Beverage {
public:
    std::string description() const override { return "Espresso"; }
    double cost() const override { return 1.99; }
};

// The decorator IS-A Beverage and HAS-A Beverage. That dual nature is the whole trick:
// being a Beverage lets it stand in anywhere; having one lets it wrap.
class CondimentDecorator : public Beverage {
protected:
    std::unique_ptr&lt;Beverage&gt; inner_;
public:
    explicit CondimentDecorator(std::unique_ptr&lt;Beverage&gt; b) : inner_(std::move(b)) {}
};

class Mocha : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string description() const override { return inner_-&gt;description() + ", Mocha"; }
    double cost() const override { return inner_-&gt;cost() + 0.20; }
};

class Whip : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string description() const override { return inner_-&gt;description() + ", Whip"; }
    double cost() const override { return inner_-&gt;cost() + 0.10; }
};

// Espresso, Mocha, Mocha, Whip - stacked at runtime, no combinatorial subclasses
inline std::unique_ptr&lt;Beverage&gt; makeDrink() {
    std::unique_ptr&lt;Beverage&gt; d = std::make_unique&lt;Espresso&gt;();
    d = std::make_unique&lt;Mocha&gt;(std::move(d));
    d = std::make_unique&lt;Mocha&gt;(std::move(d));
    d = std::make_unique&lt;Whip&gt;(std::move(d));
    return d;
}</code></pre>
<p><b>Where it shows up:</b> pricing with add-ons, middleware chains (logging wrapping auth wrapping
the handler), compression or encryption wrapping a stream, feature toppings.</p>
<p><b>Don't use it when</b> the combinations are few and fixed &mdash; three flags on a struct beat
a wrapper tower. The honest downside: a stack of decorators is hard to debug and you lose the
concrete type of what is inside.</p>

<h3>Factory Method</h3>
<p><b>The problem:</b> your code needs to create objects, but which concrete class depends on
context &mdash; and you do not want <code>new ConcreteThing</code> scattered everywhere, because
that is depending on a concrete class (principle 6).</p>
<p><b>The book:</b> <i>"defines an interface for creating an object, but lets subclasses decide
which class to instantiate."</i></p>

<pre><code>#include &lt;memory&gt;
#include &lt;string&gt;

class Pizza {
public:
    virtual ~Pizza() = default;
    virtual void prepare() = 0;
};
class NYCheesePizza : public Pizza { public: void prepare() override {} };
class ChicagoCheesePizza : public Pizza { public: void prepare() override {} };

class PizzaStore {
public:
    virtual ~PizzaStore() = default;

    // the algorithm lives here, once
    std::unique_ptr&lt;Pizza&gt; orderPizza(const std::string&amp; type) {
        auto pizza = createPizza(type);   // ...but the CREATION is deferred
        pizza-&gt;prepare();
        return pizza;
    }
protected:
    // the factory method: subclasses decide what gets built
    virtual std::unique_ptr&lt;Pizza&gt; createPizza(const std::string&amp; type) = 0;
};

class NYPizzaStore : public PizzaStore {
protected:
    std::unique_ptr&lt;Pizza&gt; createPizza(const std::string&amp;) override {
        return std::make_unique&lt;NYCheesePizza&gt;();
    }
};</code></pre>
<p><b>Simpler cousin worth naming:</b> a <b>static factory function</b> &mdash; one function with a
switch that returns the right <code>unique_ptr</code>. Not a GoF pattern, but often the right
answer, and saying "a simple factory function is enough here" shows judgement rather than
pattern-hunger.</p>

<h3>Abstract Factory</h3>
<p><b>The problem:</b> you need to create <i>families</i> of related objects that must be used
together, and mixing families would be a bug.</p>
<p><b>The book:</b> <i>"provides an interface for creating families of related or dependent objects
without specifying their concrete classes."</i></p>
<pre><code>// the product interfaces, and one family's concrete versions
class Dough  { public: virtual ~Dough()  = default; };
class Sauce  { public: virtual ~Sauce()  = default; };
class Cheese { public: virtual ~Cheese() = default; };
class ThinCrust : public Dough  {};
class Marinara  : public Sauce  {};
class Reggiano  : public Cheese {};

class IngredientFactory {
public:
    virtual ~IngredientFactory() = default;
    virtual std::unique_ptr&lt;Dough&gt;  createDough()  = 0;
    virtual std::unique_ptr&lt;Sauce&gt;  createSauce()  = 0;
    virtual std::unique_ptr&lt;Cheese&gt; createCheese() = 0;
};

class NYIngredientFactory : public IngredientFactory {
public:
    std::unique_ptr&lt;Dough&gt;  createDough()  override { return std::make_unique&lt;ThinCrust&gt;(); }
    std::unique_ptr&lt;Sauce&gt;  createSauce()  override { return std::make_unique&lt;Marinara&gt;(); }
    std::unique_ptr&lt;Cheese&gt; createCheese() override { return std::make_unique&lt;Reggiano&gt;(); }
};</code></pre>
<p><b>Factory Method vs Abstract Factory</b> &mdash; they will ask. Factory Method creates
<i>one</i> product and varies it through <b>inheritance</b> (a subclass overrides the method).
Abstract Factory creates a <i>family</i> of products and varies it through <b>composition</b> (you
hand the object a different factory). One product, one method; a family, an object.</p>

<h3>Command</h3>
<p><b>The problem:</b> you want to treat "do this thing" as an object &mdash; so you can queue it,
log it, schedule it, or undo it.</p>
<p><b>The book:</b> <i>"encapsulates a request as an object, thereby letting you parameterize other
objects with different requests, queue or log requests, and support undoable operations."</i></p>

<pre><code>#include &lt;memory&gt;
#include &lt;vector&gt;

class Command {
public:
    virtual ~Command() = default;
    virtual void execute() = 0;
    virtual void undo()    = 0;      // undo is what makes Command earn its keep
};

class Light {
public:
    void on()  {}
    void off() {}
};

class LightOnCommand : public Command {
    Light&amp; light_;                    // non-owning: the receiver outlives the command
public:
    explicit LightOnCommand(Light&amp; l) : light_(l) {}
    void execute() override { light_.on();  }
    void undo()    override { light_.off(); }
};

class RemoteControl {
    std::vector&lt;std::unique_ptr&lt;Command&gt;&gt; history_;
public:
    void submit(std::unique_ptr&lt;Command&gt; c) {
        c-&gt;execute();
        history_.push_back(std::move(c));
    }
    void undoLast() {
        if (history_.empty()) return;
        history_.back()-&gt;undo();
        history_.pop_back();
    }
};</code></pre>
<p><b>Where it shows up:</b> undo/redo, job queues, transactional operations, request logging for
replay after a crash, macro recording. If the interviewer mentions <b>undo</b> or <b>a queue of
work</b>, this is the pattern.</p>

<h3>Singleton</h3>
<p><b>The problem:</b> exactly one instance must exist &mdash; one configuration object, one
connection pool.</p>
<p><b>The book:</b> <i>"ensures a class has only one instance, and provides a global point of
access to it."</i></p>
<pre><code>class Config {
public:
    // "Meyers singleton": thread-safe initialisation is guaranteed by the
    // standard since C++11, so no locking is needed. Prefer this always.
    static Config&amp; instance() {
        static Config c;      // constructed once, on first use
        return c;
    }
    Config(const Config&amp;)            = delete;   // no copying
    Config&amp; operator=(const Config&amp;) = delete;
private:
    Config() = default;
};</code></pre>
<div class="box">
<p><b>Say the criticism before they do.</b> "It's a Meyers singleton, which is thread-safe since
C++11. That said, singletons are effectively global state &mdash; they hide dependencies and make
testing hard, because you can't substitute a fake. In a real design I'd usually prefer to create
one instance at startup and inject it as a dependency."</p>
<p>Volunteering the downside of the pattern you just used is one of the strongest moves available
in a design interview.</p>
</div>
"""),

("patterns-more", "The rest of the pattern catalogue", """
<p>Less frequent in this round, but each has a scenario where it is clearly the right answer. Know
the one-line definition and the trigger for each.</p>

<h3>Adapter</h3>
<p><b>The book:</b> <i>"converts the interface of a class into another interface the clients
expect. Adapter lets classes work together that couldn't otherwise because of incompatible
interfaces."</i></p>
<p><b>Trigger:</b> a third-party library or legacy class whose interface does not match yours, and
you cannot change it.</p>
<pre><code>// Their interface (can't change it)
class LegacyPaymentGateway {
public:
    bool doPayment(const char* cardNo, int cents) { return true; }
};

// Our interface
class PaymentProcessor {
public:
    virtual ~PaymentProcessor() = default;
    virtual bool charge(const std::string&amp; card, double amount) = 0;
};

class LegacyGatewayAdapter : public PaymentProcessor {
    LegacyPaymentGateway&amp; gateway_;
public:
    explicit LegacyGatewayAdapter(LegacyPaymentGateway&amp; g) : gateway_(g) {}
    bool charge(const std::string&amp; card, double amount) override {
        return gateway_.doPayment(card.c_str(), static_cast&lt;int&gt;(amount * 100));
    }
};</code></pre>

<h3>Facade</h3>
<p><b>The book:</b> <i>"provides a unified interface to a set of interfaces in a subsystem. Facade
defines a higher-level interface that makes the subsystem easier to use."</i></p>
<p><b>Trigger:</b> a client has to orchestrate six objects in the right order to do one common
task. <b>Adapter vs Facade:</b> Adapter changes an interface to match what a client expects; Facade
simplifies a complicated one. Different intent, similar mechanics.</p>
<pre><code>// collaborators, elided. PaymentProcessor is the interface from the Adapter example
// above - so the adapted legacy gateway drops straight in here.
class Cart { public: double total() const { return 0.0; } };
class InventoryService { public: bool reserve(const Cart&amp;){ return true; } void release(const Cart&amp;){} };
class ShippingService  { public: void schedule(const Cart&amp;){} };

class OrderFacade {
    InventoryService&amp; inventory_;
    PaymentProcessor&amp; payment_;      // an interface, so any implementation works
    ShippingService&amp;  shipping_;
public:
    OrderFacade(InventoryService&amp; i, PaymentProcessor&amp; p, ShippingService&amp; s)
        : inventory_(i), payment_(p), shipping_(s) {}

    // one call instead of the client knowing the whole dance
    bool placeOrder(const Cart&amp; cart, const std::string&amp; card) {
        if (!inventory_.reserve(cart)) return false;
        if (!payment_.charge(card, cart.total())) {
            inventory_.release(cart);            // undo the reservation on failure
            return false;
        }
        shipping_.schedule(cart);
        return true;
    }
};</code></pre>

<h3>Template Method</h3>
<p><b>The book:</b> <i>"defines the skeleton of an algorithm in a method, deferring some steps to
subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing
the algorithm's structure."</i></p>
<p><b>Trigger:</b> several processes that follow the same sequence but differ in a couple of steps
&mdash; importing CSV vs XML, or any "fetch, validate, transform, save" pipeline.</p>
<pre><code>struct Row {};                    // a parsed record

class DataImporter {
public:
    virtual ~DataImporter() = default;

    // non-virtual: the skeleton is fixed. Subclasses cannot reorder it.
    void import(const std::string&amp; path) {
        auto raw  = read(path);        // varies
        auto rows = parse(raw);        // varies
        validate(rows);                // shared
        save(rows);                    // shared
        if (shouldArchive()) archive(path);   // a "hook" with a default
    }
protected:
    virtual std::string read(const std::string&amp; path) = 0;
    virtual std::vector&lt;Row&gt; parse(const std::string&amp; raw) = 0;
    virtual bool shouldArchive() const { return false; }   // hook: optional override
private:
    void validate(const std::vector&lt;Row&gt;&amp;) {}
    void save(const std::vector&lt;Row&gt;&amp;) {}
    void archive(const std::string&amp;) {}
};</code></pre>
<p>Note the <b>hook</b> &mdash; a virtual with a default implementation that subclasses may
override but need not. And note this is the Hollywood Principle in action: the base class calls
down into you.</p>
<p><b>Template Method vs Strategy:</b> Template Method varies <i>steps within</i> a fixed algorithm
using inheritance. Strategy swaps the <i>whole</i> algorithm using composition.</p>

<h3>Iterator</h3>
<p><b>The book:</b> <i>"provides a way to access the elements of an aggregate object sequentially
without exposing its underlying representation."</i></p>
<p>In C++ this is mostly already solved: the STL is built on iterators, so the idiomatic answer is
to expose <code>begin()</code> and <code>end()</code> and let range-for work.</p>
<pre><code>struct Song {};

class Playlist {
    std::vector&lt;Song&gt; songs_;
public:
    // Now: for (const auto&amp; s : playlist) { ... }  - and every STL algorithm works.
    auto begin()       { return songs_.begin(); }
    auto end()         { return songs_.end();   }
    auto begin() const { return songs_.begin(); }
    auto end()   const { return songs_.end();   }
};</code></pre>
<p><b>The point to make:</b> the caller iterates without knowing whether you store a
<code>vector</code>, a <code>list</code> or a database cursor. You can change the container without
breaking anyone.</p>

<h3>Composite</h3>
<p><b>The book:</b> <i>"allows you to compose objects into tree structures to represent part-whole
hierarchies. Composite lets clients treat individual objects and compositions of objects
uniformly."</i></p>
<p><b>Trigger:</b> anything tree-shaped &mdash; a filesystem, a menu with submenus, an org chart,
nested UI components, a bill of materials.</p>
<pre><code>class FileNode {
public:
    virtual ~FileNode() = default;
    virtual std::string name() const = 0;
    virtual long        size() const = 0;     // leaf and composite answer identically
};

class File : public FileNode {
    std::string name_; long size_;
public:
    File(std::string n, long s) : name_(std::move(n)), size_(s) {}
    std::string name() const override { return name_; }
    long        size() const override { return size_; }
};

class Directory : public FileNode {
    std::string name_;
    std::vector&lt;std::unique_ptr&lt;FileNode&gt;&gt; children_;
public:
    explicit Directory(std::string n) : name_(std::move(n)) {}
    void add(std::unique_ptr&lt;FileNode&gt; c) { children_.push_back(std::move(c)); }
    std::string name() const override { return name_; }
    long size() const override {                 // recursion, transparent to the caller
        long total = 0;
        for (const auto&amp; c : children_) total += c-&gt;size();
        return total;
    }
};</code></pre>

<h3>State</h3>
<p><b>The book:</b> <i>"allows an object to alter its behavior when its internal state changes. The
object will appear to change its class."</i></p>
<p><b>Trigger:</b> a big <code>switch (status)</code> repeated in several methods. An order that is
Pending, Paid, Shipped, Delivered, Cancelled, where what each operation does depends on which state
it is in.</p>
<pre><code>class OrderContext;               // forward declaration is enough for a reference

class OrderState {
public:
    virtual ~OrderState() = default;
    virtual void pay(OrderContext&amp;)    {}   // by default, invalid transitions do nothing
    virtual void cancel(OrderContext&amp;) {}
    virtual const char* name() const = 0;
};

class PendingState : public OrderState {
public:
    void pay(OrderContext&amp; ctx) override;      // -> PaidState
    void cancel(OrderContext&amp; ctx) override;   // -> CancelledState
    const char* name() const override { return "PENDING"; }
};

class ShippedState : public OrderState {
public:
    // pay() and cancel() intentionally not overridden: you cannot cancel a shipped order.
    const char* name() const override { return "SHIPPED"; }
};</code></pre>
<p><b>State vs Strategy</b> &mdash; the book calls them "twins separated at birth", and it is a
favourite interview question. Structurally identical; the difference is intent and who decides.
With <b>Strategy</b>, the client chooses the algorithm and it normally stays put. With <b>State</b>,
the objects themselves drive the transitions, so the behaviour changes over the object's lifetime
without the client doing anything.</p>

<h3>Proxy</h3>
<p><b>The book:</b> <i>"provides a surrogate or placeholder for another object to control access to
it."</i></p>
<p><b>Trigger:</b> you want to add access control, caching, lazy loading or remote calls without
changing the real object or its callers. Flavours: <b>virtual proxy</b> (create the expensive thing
on first use), <b>protection proxy</b> (check permissions), <b>remote proxy</b> (a local stand-in
for something on another machine), <b>caching proxy</b>.</p>
<pre><code>class Image {
public:
    virtual ~Image() = default;
    virtual void display() const = 0;
};

class RealImage : public Image {          // expensive: loads from disk on construction
public:
    explicit RealImage(std::string path) {}
    void display() const override {}
};

class ImageProxy : public Image {
    std::string path_;
    mutable std::unique_ptr&lt;RealImage&gt; real_;   // mutable: created inside a const method
public:
    explicit ImageProxy(std::string p) : path_(std::move(p)) {}
    void display() const override {
        if (!real_) real_ = std::make_unique&lt;RealImage&gt;(path_);  // load on first use only
        real_-&gt;display();
    }
};</code></pre>
<p><b>Proxy vs Decorator</b> &mdash; also asked. Both wrap an object with the same interface.
Decorator <i>adds behaviour</i>; Proxy <i>controls access</i> and normally does not change what the
operation means.</p>

<h3>Compound: MVC</h3>
<p>The book's finale: Model-View-Controller is not one pattern but several working together.</p>
<ul>
<li><b>Model</b> notifies views of changes &mdash; that is <b>Observer</b>.</li>
<li><b>Controller</b> is a <b>Strategy</b> for the view: swap the controller and the same view
behaves differently.</li>
<li>Nested view components form a <b>Composite</b>.</li>
</ul>
<p>Worth a sentence if you design anything with a UI, because it demonstrates that patterns
combine &mdash; which is the book's real thesis.</p>

<h3>The comparison table they will probe</h3>
<table>
<tr><th>Confusable pair</th><th>The distinction in one line</th></tr>
<tr><td>Strategy vs State</td><td>Client picks the algorithm vs the objects transition themselves</td></tr>
<tr><td>Strategy vs Template Method</td><td>Swap the whole algorithm (composition) vs vary steps inside it (inheritance)</td></tr>
<tr><td>Decorator vs Proxy</td><td>Adds behaviour vs controls access</td></tr>
<tr><td>Decorator vs Inheritance</td><td>Runtime and stackable vs compile-time and fixed</td></tr>
<tr><td>Adapter vs Facade</td><td>Convert an interface vs simplify a subsystem</td></tr>
<tr><td>Factory Method vs Abstract Factory</td><td>One product via inheritance vs a family via composition</td></tr>
<tr><td>Observer vs Mediator</td><td>Broadcast to many vs centralise many-to-many coordination</td></tr>
</table>
"""),

]
