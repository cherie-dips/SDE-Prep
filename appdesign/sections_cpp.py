"""Sections 5-6: class design in C++, and the nine design principles from the book."""

SECTIONS = [

("cpp", "Class design in C++", """
<div class="box">
<h4>About the book, before you start</h4>
<p><i>Head First Design Patterns</i> (Freeman &amp; Robson, O'Reilly) is the source for the
patterns in this guide, and it is <b>a genuinely good book for system design and low-level
design</b> &mdash; it teaches you <i>why</i> each pattern exists and what breaks without it,
instead of handing you a catalogue of UML diagrams to memorise. Worth reading end to end.</p>
<p><b>The one catch: every example in it is written in Java.</b> Java and C++ differ in exactly the
places OOP interviews probe, so a pattern transliterated straight from the book will read as
Java-with-different-syntax. This section is the translation layer &mdash; the OOP concepts compared
between Java and C++ &mdash; and every pattern in the following sections is written in modern C++
rather than converted Java. Read this section before the patterns.</p>
</div>

<table>
<tr><th>Concept</th><th>Java (as in the book)</th><th>C++ (what you write here)</th></tr>
<tr><td>Interface</td><td><code>interface Duck { void quack(); }</code></td>
<td>Abstract base class, all methods <b>pure virtual</b>, plus a virtual destructor</td></tr>
<tr><td>Object lifetime</td><td>Garbage collector reclaims it eventually</td>
<td>RAII &mdash; destructors run deterministically; <code>unique_ptr</code>/<code>shared_ptr</code></td></tr>
<tr><td>Variables</td><td>Every object is a reference; <code>Duck d</code> is a handle</td>
<td><code>Duck d</code> is a <b>value</b>; polymorphism needs a pointer or reference, or you slice</td></tr>
<tr><td>Base destructor</td><td>Not a concern</td>
<td><code>virtual ~Base() = default;</code> is <b>mandatory</b> for any polymorphic base</td></tr>
<tr><td>Multiple inheritance</td><td>Only of interfaces</td>
<td>Allowed of classes, with the diamond problem and <code>virtual</code> inheritance</td></tr>
<tr><td>Overriding</td><td><code>@Override</code> annotation, optional</td>
<td><code>override</code> keyword &mdash; use it always; <code>final</code> to stop the chain</td></tr>
<tr><td>Generics</td><td>Type-erased generics, runtime</td>
<td>Templates, compile-time &mdash; enables static polymorphism (CRTP) with no vtable cost</td></tr>
<tr><td>Passing objects</td><td>Always by reference, implicitly</td>
<td>Choose: by value (copies), <code>const&amp;</code> (cheap read), or by pointer (nullable)</td></tr>
</table>
<p>The rest of this section works through the ones that change how you actually write the pattern.</p>

<h3>1. C++ has no <code>interface</code> keyword</h3>
<p>Java's <code>interface Duck { void quack(); }</code> becomes an abstract base class with
<b>pure virtual</b> functions:</p>
<pre><code>class QuackBehavior {
public:
    virtual ~QuackBehavior() = default;   // &lt;-- REQUIRED. see below
    virtual void quack() const = 0;       // "= 0" makes it pure virtual
};

class LoudQuack : public QuackBehavior {
public:
    void quack() const override { std::cout &lt;&lt; "QUACK!\\n"; }
};</code></pre>

<div class="box">
<h4>The virtual destructor rule &mdash; they will check this</h4>
<p>If you delete a derived object through a base pointer and the base destructor is <b>not</b>
virtual, the behaviour is undefined &mdash; in practice the derived part never gets destroyed and
you leak.</p>
<pre><code>Base* p = new Derived();
delete p;          // Base::~Base not virtual -> Derived::~Derived never runs</code></pre>
<p><b>Rule:</b> any class you intend to inherit from polymorphically gets a
<code>virtual ~Class() = default;</code>. Write it every time, unprompted. In an interview it takes
two seconds and it is the single most reliable signal that you actually write C++.</p>
</div>

<h3>2. Ownership replaces garbage collection</h3>
<p>Java hands you a reference and the collector cleans up. In C++ <b>you must say who owns what</b>,
and that choice <i>is</i> part of the design.</p>
<table>
<tr><th>Type</th><th>Meaning</th><th>Use for</th></tr>
<tr><td><code>std::unique_ptr&lt;T&gt;</code></td><td>Exactly one owner; freed when it goes away</td>
<td><b>The default.</b> A Decorator wrapping its component, a Strategy held by a Context</td></tr>
<tr><td><code>std::shared_ptr&lt;T&gt;</code></td><td>Shared ownership, reference counted</td>
<td>When lifetime genuinely is shared &mdash; several observers holding a subject</td></tr>
<tr><td><code>std::weak_ptr&lt;T&gt;</code></td><td>Observes without owning; can detect death</td>
<td><b>Observer lists</b>, and breaking reference cycles</td></tr>
<tr><td><code>T&amp;</code> or <code>T*</code></td><td>Non-owning reference</td>
<td>A parameter you only read; a back-pointer to a parent</td></tr>
</table>
<p><b>The interview line:</b> "I'll hold this by <code>unique_ptr</code> because ownership is
exclusive; if I needed shared ownership I'd use <code>shared_ptr</code>, but I'd reach for that
deliberately rather than by default." Reaching for <code>shared_ptr</code> everywhere is the
classic sign of someone writing Java in C++.</p>

<h3>3. Rule of Zero, Three, Five</h3>
<div class="term">
<span class="word">Rule of Zero</span>
<p class="plain">if your class holds its resources in types that already manage themselves
(<code>std::string</code>, <code>std::vector</code>, smart pointers), write <b>no</b> destructor,
copy constructor or assignment operator. The compiler's defaults are correct.</p>
<p>This is what you want almost always. Say "Rule of Zero" and move on.</p>
</div>
<div class="term">
<span class="word">Rule of Five</span>
<p class="plain">if you <i>do</i> write one of {destructor, copy constructor, copy assignment, move
constructor, move assignment}, you probably need to consider all five.</p>
<p>Comes up when you hand-manage a resource. In a design round you should usually be avoiding
that.</p>
</div>

<h3>4. Copies are real, and they cost</h3>
<p>Java passes object references. C++ copies by default. So <code>void f(std::string s)</code>
copies the whole string; <code>void f(const std::string&amp; s)</code> does not. Get this wrong in
an interview and it looks like you learned C++ from Java. Defaults to use:</p>
<ul>
<li><b>Read-only parameter</b> &rarr; <code>const T&amp;</code></li>
<li><b>The function will keep a copy</b> &rarr; take by value and <code>std::move</code> it in</li>
<li><b>Cheap types</b> (<code>int</code>, <code>double</code>, an enum) &rarr; by value</li>
</ul>

<h3>5. <code>std::function</code> often replaces a whole class hierarchy</h3>
<p>A genuinely idiomatic C++ move that the book cannot show you. If a Strategy has one method and
no state, you do not need an inheritance hierarchy at all:</p>
<pre><code>// The book's way: an interface plus a class per behaviour.
// The C++ way, when the behaviour is a single function:
class Duck {
    std::function&lt;void()&gt; quack_;
public:
    explicit Duck(std::function&lt;void()&gt; q) : quack_(std::move(q)) {}
    void performQuack() const { quack_(); }
};

Duck loud([]{ std::cout &lt;&lt; "QUACK!\\n"; });
Duck mute([]{ /* nothing */ });</code></pre>
<p><b>When to prefer the class hierarchy anyway:</b> the behaviour has state, several related
methods, or you want to name and test the behaviours independently. Being able to argue both sides
is the point &mdash; their rubric explicitly rewards discussing technical trade-offs.</p>

<h3>6. Small keywords that signal care</h3>
<ul>
<li><code>override</code> &mdash; on every function overriding a virtual. The compiler then catches
a typo'd signature that would otherwise silently create a new function.</li>
<li><code>final</code> &mdash; on classes not designed for further inheritance.</li>
<li><code>explicit</code> &mdash; on single-argument constructors, to stop surprise implicit
conversions.</li>
<li><code>enum class Status { Active, Returned };</code> &mdash; scoped and type-safe, unlike a
plain <code>enum</code>.</li>
<li><code>const</code> on member functions that do not mutate. Const-correctness is free credibility.</li>
<li><code>[[nodiscard]]</code> on functions whose return value must not be ignored.</li>
</ul>

<h3>7. Composition in C++</h3>
<pre><code>// Inheritance: Manager IS-A Employee
class Manager : public Employee { ... };

// Composition: Order HAS-A payment method
class Order {
    std::unique_ptr&lt;PaymentMethod&gt; payment_;   // swappable at runtime
    std::vector&lt;LineItem&gt;          items_;     // owns its items by value
};</code></pre>
<p>The test to say out loud: <b>"is-a" means inheritance, "has-a" means composition</b> &mdash; and
if you are ever unsure, prefer composition, because it can be changed at runtime and does not
couple you to a base class's internals.</p>
"""),

("principles", "The nine design principles", """
<p>These are the principles <i>Head First Design Patterns</i> builds everything on, quoted as the
book states them. The patterns are just recurring applications of these. If you remember nothing
else, remember the first three &mdash; they generate most good designs on their own.</p>

<div class="term">
<span class="word">1. Identify the aspects of your application that vary and separate them from what stays the same.</span>
<p class="plain">find the part that keeps changing, and pull it out into its own thing.</p>
<p>The book's master principle; every pattern is an instance of it. In the interview, the question
to ask yourself about any design is <b>"what is most likely to change here?"</b> Then make that the
part behind an interface. New payment method, new discount rule, new export format &mdash; these
are the axes of change, and they should each be one new class rather than an edit to five.</p>
</div>

<div class="term">
<span class="word">2. Program to an interface, not an implementation.</span>
<p class="plain">depend on <i>what</i> something does, not on <i>which</i> concrete class does it.</p>
<pre><code>// Bad: bound to one concrete class forever
MySQLBookRepo repo_;

// Good: any implementation will do - including a fake one in tests
std::unique_ptr&lt;BookRepository&gt; repo_;</code></pre>
<p>The immediate practical payoff to mention: <b>testability</b>. If your service depends on an
interface you can inject an in-memory fake and test it without a database. Interviewers love a
candidate who links a design principle to testing.</p>
</div>

<div class="term">
<span class="word">3. Favor composition over inheritance.</span>
<p class="plain">build behaviour by holding other objects, rather than by inheriting from a base
class.</p>
<p>Why the book pushes this so hard: inheritance is fixed at compile time and applies to all
instances of the class, while composition can be swapped at runtime. Inheritance also creates the
tightest possible coupling &mdash; a change to the base class ripples into every subclass. And deep
hierarchies produce the class explosion the book opens with (a subclass for every combination of
features).</p>
</div>

<div class="term">
<span class="word">4. Strive for loosely coupled designs between objects that interact.</span>
<p class="plain">objects should know as little about each other as possible.</p>
<p>Observer is the poster child: the subject knows only that observers implement an interface. It
does not know their concrete types, how many there are, or what they do. You can add new observers
without touching the subject at all.</p>
</div>

<div class="term">
<span class="word">5. Classes should be open for extension, but closed for modification.</span>
<p class="plain">you should be able to add new behaviour by adding new code, not by editing
existing, working, tested code.</p>
<p>Known as the <b>Open-Closed Principle</b>. The tell that you are violating it is a growing
<code>if/else</code> or <code>switch</code> on a type tag &mdash; every new case means editing that
function again. Replacing that switch with polymorphism is the single most common refactor in this
interview round.</p>
</div>

<div class="term">
<span class="word">6. Depend upon abstractions. Do not depend upon concrete classes.</span>
<p class="plain">both high-level and low-level code should depend on interfaces in the middle.</p>
<p>The <b>Dependency Inversion Principle</b>. "Inversion" because naively your high-level
<code>OrderService</code> would depend on the low-level <code>MySQLRepo</code>; instead you define a
<code>Repository</code> interface owned by the high-level code, and the database class implements
it. The arrow of dependency now points <i>up</i>, and you can swap the database without touching
the business logic.</p>
</div>

<div class="term">
<span class="word">7. Principle of Least Knowledge &mdash; talk only to your immediate friends.</span>
<p class="plain">don't reach through one object to get at another.</p>
<pre><code>// Violates it - now you depend on Order, Customer AND Address
order.getCustomer().getAddress().getCity()

// Better: ask the object you know, for what you need
order.shippingCity()</code></pre>
<p>Also called the <b>Law of Demeter</b>. The chain is fragile: any of those three classes changing
breaks your code. Spotting a "train wreck" call chain in a design discussion is a nice catch.</p>
</div>

<div class="term">
<span class="word">8. Don't call us, we'll call you (the Hollywood Principle).</span>
<p class="plain">the framework calls your code; your code doesn't call the framework.</p>
<p>This is what <b>Template Method</b> does: the base class owns the algorithm's skeleton and calls
down into your overridden steps at the right moments. You never call the skeleton yourself.</p>
</div>

<div class="term">
<span class="word">9. A class should have only one reason to change.</span>
<p class="plain">each class does one job.</p>
<p>The <b>Single Responsibility Principle</b>. The practical test: describe the class in one
sentence. If you need the word "and", it probably wants splitting. A class that formats a report
<i>and</i> emails it has two reasons to change &mdash; a formatting change and a delivery change
&mdash; and they will fight.</p>
</div>

<div class="box">
<h4>How to actually use these in the room</h4>
<p>Do not recite them. Use them as <b>justifications</b>. When you make a design decision, name the
principle behind it in half a sentence:</p>
<p>"I'll put the discount rules behind an interface &mdash; that's the part most likely to change,
and it keeps the order code closed for modification when marketing invents a new promotion."</p>
<p>You have just cited principles 1 and 5 without sounding like a textbook.</p>
</div>
"""),

]
