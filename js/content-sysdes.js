const SYSDES_CONTENT = {
  id: 'sysdes', t: 'System Design',
  tabs: [
    {
      id: "lld", t: "LLD Basics",
      topics: [
        {
          t: "OOP Concepts Deep Dive",
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Object-Oriented Programming</div><p class="learn-p">Object-Oriented Programming (OOP) is a programming paradigm that organizes software design around <b>data (objects)</b> rather than functions and logic. An object is a self-contained entity that bundles both <b>state</b> (data members / attributes) and <b>behavior</b> (member functions / methods). OOP was popularised by languages like Smalltalk, C++, and Java, and it remains the dominant paradigm for large-scale system design.</p><p class="learn-p">The four pillars of OOP are <b>Encapsulation</b>, <b>Abstraction</b>, <b>Inheritance</b>, and <b>Polymorphism</b>. Mastering these is essential for any low-level design interview because every class diagram, design pattern, and case study rests on these ideas.</p></div><div class="learn-section"><div class="learn-h">1. Encapsulation</div><p class="learn-p">Encapsulation means <b>bundling data and the methods that operate on that data inside a single class</b>, and restricting direct access to some of the object\'s components. In C++, this is achieved with the access specifiers <code>private</code>, <code>protected</code>, and <code>public</code>.</p><div class="learn-code">class BankAccount {\nprivate:\n    double balance;          // hidden from outside\npublic:\n    void deposit(double amt) { if (amt &gt; 0) balance += amt; }\n    double getBalance() const { return balance; }\n};</div><p class="learn-p">Key benefits:</p><ul class="learn-list"><li><b>Data Hiding</b> — internal representation can change without affecting external code.</li><li><b>Validation</b> — setters can enforce invariants (e.g., balance &ge; 0).</li><li><b>Reduced coupling</b> — clients depend on the interface, not the implementation.</li></ul><div class="learn-tip"><b>Tip:</b> Always default to <code>private</code> for data members. Expose only what is necessary via <code>public</code> getters/setters or domain-specific methods.</div></div><div class="learn-section"><div class="learn-h">2. Abstraction</div><p class="learn-p">Abstraction means <b>exposing only essential details</b> while hiding the complexity. In C++ we achieve abstraction through <b>abstract classes</b> (containing at least one pure virtual function) and <b>interfaces</b> (classes with only pure virtual functions).</p><div class="learn-code">class Shape {          // abstract class\npublic:\n    virtual double area() const = 0;   // pure virtual\n    virtual ~Shape() {}\n};</div><p class="learn-p">Users of <code>Shape</code> can call <code>area()</code> without knowing whether the concrete object is a <code>Circle</code>, <code>Rectangle</code>, or <code>Triangle</code>. This <b>decouples the client from the implementation</b> and is the backbone of the Strategy, Template Method, and many other design patterns.</p><div class="learn-warn"><b>Warning:</b> An abstract class with a virtual destructor is important in C++ to avoid undefined behaviour when deleting through a base pointer.</div></div><div class="learn-section"><div class="learn-h">3. Inheritance</div><p class="learn-p">Inheritance lets a <b>derived class reuse and extend</b> the functionality of a base class. It models an <b>IS-A</b> relationship: a <code>Dog</code> IS-A <code>Animal</code>.</p><div class="learn-code">class Animal {\npublic:\n    virtual void speak() const { std::cout &lt;&lt; "..."; }\n};\nclass Dog : public Animal {\npublic:\n    void speak() const override { std::cout &lt;&lt; "Woof!"; }\n};</div><p class="learn-p">Types of inheritance in C++:</p><table class="learn-table"><tr><th>Type</th><th>Public members become</th><th>Protected members become</th></tr><tr><td>public</td><td>public</td><td>protected</td></tr><tr><td>protected</td><td>protected</td><td>protected</td></tr><tr><td>private</td><td>private</td><td>private</td></tr></table><p class="learn-p">C++ also supports <b>multiple inheritance</b> — a class can derive from more than one base. This introduces the <b>Diamond Problem</b>, resolved using <code>virtual</code> inheritance.</p><div class="learn-warn"><b>Warning:</b> Prefer composition over inheritance for code reuse. Inheritance should model genuine IS-A relationships, not simply share code.</div></div><div class="learn-section"><div class="learn-h">4. Polymorphism</div><p class="learn-p">Polymorphism lets the same interface trigger <b>different behaviour</b> depending on the actual object type. C++ provides two flavours:</p><ul class="learn-list"><li><b>Compile-time (static) polymorphism</b> — achieved via <b>function overloading</b> and <b>templates</b>. The compiler resolves the call at compile time.</li><li><b>Run-time (dynamic) polymorphism</b> — achieved via <b>virtual functions</b> and <b>inheritance</b>. The call is dispatched through the vtable at run time.</li></ul><div class="learn-code">// Compile-time: function overloading\nint add(int a, int b);\ndouble add(double a, double b);\n\n// Run-time: virtual dispatch\nShape* s = new Circle(5);\ns-&gt;area();  // calls Circle::area() via vtable</div><p class="learn-p">Dynamic polymorphism is the cornerstone of the <b>Open-Closed Principle</b> and many design patterns (Strategy, State, Command, Observer).</p><div class="learn-tip"><b>Tip:</b> In interviews, when a question says "make it extensible", it almost always means "use polymorphism so new types can be added without changing existing code."</div></div><div class="learn-section"><div class="learn-h">5. Constructors, Destructors &amp; the Rule of Five</div><p class="learn-p">Every C++ class has special member functions that control its lifecycle:</p><ol class="learn-list"><li><b>Default constructor</b> — creates the object.</li><li><b>Copy constructor</b> — creates an object as a copy of another.</li><li><b>Copy assignment operator</b> — assigns one existing object to another.</li><li><b>Move constructor</b> (C++11) — transfers resources from an rvalue.</li><li><b>Move assignment operator</b> (C++11) — transfers via assignment from an rvalue.</li><li><b>Destructor</b> — cleans up resources.</li></ol><p class="learn-p">The <b>Rule of Five</b> states: if you define any one of these, you should define all five. The <b>Rule of Zero</b> advises: design your class so that compiler-generated versions are correct (use smart pointers, containers).</p><div class="learn-tip"><b>Tip:</b> Always use <code>= default</code> or <code>= delete</code> to be explicit about which special members you want.</div></div><div class="learn-section"><div class="learn-h">6. Access Specifiers &amp; Friend Functions</div><p class="learn-p">C++ provides three access levels: <code>public</code>, <code>protected</code>, and <code>private</code>. The <code>friend</code> keyword grants a non-member function or another class access to private/protected members.</p><div class="learn-code">class Matrix {\n    friend Matrix operator*(const Matrix&amp; a, const Matrix&amp; b);\nprivate:\n    int data[3][3];\n};</div><p class="learn-p">Use <code>friend</code> sparingly — it breaks encapsulation. Prefer public interfaces wherever possible.</p></div><div class="learn-section"><div class="learn-h">Interview Relevance</div><p class="learn-p">OOP questions are asked in virtually every LLD interview. Common formats:</p><ul class="learn-list"><li>"Explain the four pillars of OOP with examples."</li><li>"What is the difference between overloading and overriding?"</li><li>"When would you use an abstract class vs. an interface?"</li><li>"Explain the Diamond Problem and how C++ solves it."</li></ul><p class="learn-p">You should be able to code small class hierarchies on the spot and explain vtable mechanics.</p></div>',
          code: `// ===== OOP Concepts Deep Dive — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

// --- Abstraction & Encapsulation ---
class Shape {
public:
    virtual double area() const = 0;
    virtual string name() const = 0;
    virtual ~Shape() = default;
};

// --- Inheritance & Polymorphism ---
class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    string name() const override { return "Circle"; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
    string name() const override { return "Rectangle"; }
};

// --- Compile-time polymorphism (overloading) ---
class Printer {
public:
    void print(int x)    { cout << "int: " << x << endl; }
    void print(double x) { cout << "double: " << x << endl; }
    void print(const string& s) { cout << "string: " << s << endl; }
};

// --- Diamond Problem & Virtual Inheritance ---
class A { public: int val = 0; };
class B : virtual public A {};
class C : virtual public A {};
class D : public B, public C {};  // only one copy of A::val

// --- Rule of Five example ---
class Buffer {
    int* data;
    size_t sz;
public:
    Buffer(size_t n) : data(new int[n]), sz(n) {}
    ~Buffer() { delete[] data; }
    Buffer(const Buffer& o) : data(new int[o.sz]), sz(o.sz) {
        copy(o.data, o.data + sz, data);
    }
    Buffer& operator=(const Buffer& o) {
        if (this != &o) {
            delete[] data;
            sz = o.sz;
            data = new int[sz];
            copy(o.data, o.data + sz, data);
        }
        return *this;
    }
    Buffer(Buffer&& o) noexcept : data(o.data), sz(o.sz) {
        o.data = nullptr; o.sz = 0;
    }
    Buffer& operator=(Buffer&& o) noexcept {
        if (this != &o) {
            delete[] data;
            data = o.data; sz = o.sz;
            o.data = nullptr; o.sz = 0;
        }
        return *this;
    }
};

int main() {
    // Runtime polymorphism
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(5));
    shapes.push_back(make_unique<Rectangle>(4, 6));
    for (auto& s : shapes)
        cout << s->name() << " area = " << s->area() << endl;

    // Compile-time polymorphism
    Printer p;
    p.print(42);
    p.print(3.14);
    p.print("hello");
    return 0;
}`,
          problems: [
            ["Design a Class Hierarchy for Shapes","https://www.geeksforgeeks.org/virtual-function-cpp/","Easy"],
            ["Number of Recent Calls (OOP Queue)","https://leetcode.com/problems/number-of-recent-calls/","Easy"],
            ["Design HashMap","https://leetcode.com/problems/design-hashmap/","Easy"],
            ["Design Browser History","https://leetcode.com/problems/design-browser-history/","Medium"],
          ],
          mcqs: [
            {"q":"Which keyword in C++ is used to achieve run-time polymorphism?","o":["static","virtual","template","friend"],"a":1},
            {"q":"The Diamond Problem in C++ multiple inheritance is solved using:","o":["friend classes","virtual inheritance","private inheritance","templates"],"a":1},
            {"q":"Which of the following is NOT a pillar of OOP?","o":["Encapsulation","Concurrency","Polymorphism","Abstraction"],"a":1},
          ],
        },
        {
          t: "Composition vs Inheritance",
          learn: '<div class="learn-section"><div class="learn-h">The Two Pillars of Code Reuse</div><p class="learn-p">When designing classes, two major mechanisms let you reuse existing functionality: <b>Inheritance</b> ("IS-A") and <b>Composition</b> ("HAS-A"). Choosing between them is one of the most frequently asked LLD interview questions and has enormous impact on maintainability.</p><p class="learn-p"><b>Inheritance</b> establishes a subtype relationship. A <code>Car</code> IS-A <code>Vehicle</code>. The derived class inherits the interface and implementation of the base class.</p><p class="learn-p"><b>Composition</b> means a class contains an instance of another class as a member. A <code>Car</code> HAS-A <code>Engine</code>. The outer class delegates work to the inner object.</p></div><div class="learn-section"><div class="learn-h">When to Use Inheritance</div><p class="learn-p">Use inheritance when:</p><ul class="learn-list"><li>There is a genuine <b>IS-A</b> relationship that satisfies the <b>Liskov Substitution Principle</b>.</li><li>You need <b>polymorphic dispatch</b> — clients hold a base pointer and call virtual methods.</li><li>The base class defines a <b>stable interface</b> that is unlikely to change.</li></ul><div class="learn-code">class PaymentMethod {\npublic:\n    virtual bool charge(double amount) = 0;\n    virtual ~PaymentMethod() = default;\n};\nclass CreditCard : public PaymentMethod {\npublic:\n    bool charge(double amount) override { /* ... */ return true; }\n};</div><p class="learn-p">Here, <code>CreditCard</code> IS-A <code>PaymentMethod</code>. Code that accepts <code>PaymentMethod*</code> can work with any concrete payment type. This is the correct use of inheritance.</p></div><div class="learn-section"><div class="learn-h">When to Use Composition</div><p class="learn-p">Use composition when:</p><ul class="learn-list"><li>You want to <b>reuse behaviour</b> without exposing the base class interface.</li><li>The relationship is <b>HAS-A</b> or <b>USES-A</b>.</li><li>You want to <b>swap implementations at runtime</b> (Strategy pattern).</li><li>The "base" class may change independently of the "derived" class.</li></ul><div class="learn-code">class Engine {\npublic:\n    void start() { /* ignition logic */ }\n};\nclass Car {\n    Engine engine;          // composition (HAS-A)\npublic:\n    void start() { engine.start(); }\n};</div><p class="learn-p">A <code>Car</code> is not an <code>Engine</code>; it <b>has</b> one. Composition keeps the two classes loosely coupled — you can replace <code>Engine</code> with <code>ElectricMotor</code> without changing the <code>Car</code> interface.</p></div><div class="learn-section"><div class="learn-h">Side-by-Side Comparison</div><table class="learn-table"><tr><th>Aspect</th><th>Inheritance</th><th>Composition</th></tr><tr><td>Relationship</td><td>IS-A</td><td>HAS-A</td></tr><tr><td>Coupling</td><td>Tight — child depends on parent internals</td><td>Loose — classes interact via interfaces</td></tr><tr><td>Flexibility</td><td>Static — set at compile time</td><td>Dynamic — can swap at runtime</td></tr><tr><td>Code reuse</td><td>Inherits interface + implementation</td><td>Reuses only implementation</td></tr><tr><td>Fragile base class</td><td>Yes — parent changes can break child</td><td>No — member changes are encapsulated</td></tr><tr><td>Polymorphism</td><td>Built-in via virtual dispatch</td><td>Achieved by composing interfaces</td></tr></table></div><div class="learn-section"><div class="learn-h">The Fragile Base Class Problem</div><p class="learn-p">One of the biggest risks of inheritance is the <b>Fragile Base Class Problem</b>. If the base class changes its internal implementation, derived classes may break silently.</p><div class="learn-code">class HashSet {\npublic:\n    int addCount = 0;\n    virtual void add(int e)     { addCount++; /* insert */ }\n    virtual void addAll(vector&lt;int&gt;&amp; v) {\n        for (int e : v) add(e);   // calls virtual add\n    }\n};\nclass CountingSet : public HashSet {\npublic:\n    void add(int e) override    { addCount++; HashSet::add(e); }\n    void addAll(vector&lt;int&gt;&amp; v) override {\n        addCount += v.size(); HashSet::addAll(v); // DOUBLE COUNT!\n    }\n};</div><p class="learn-p"><code>CountingSet::addAll</code> increments the count, then calls <code>HashSet::addAll</code>, which internally calls <code>CountingSet::add</code> (virtual dispatch), incrementing again. This is exactly the bug described in <i>Effective Java</i> Item 18.</p><div class="learn-warn"><b>Warning:</b> This is a classic interview example. The fix is to use composition: wrap a <code>HashSet</code> inside <code>CountingSet</code> instead of inheriting from it.</div></div><div class="learn-section"><div class="learn-h">Composition with Interfaces — The Best of Both Worlds</div><p class="learn-p">You can achieve polymorphism <b>and</b> loose coupling by combining <b>interfaces (abstract classes)</b> with <b>composition</b>. This is the <b>Strategy Pattern</b> in essence:</p><div class="learn-code">class ISortStrategy {\npublic:\n    virtual void sort(vector&lt;int&gt;&amp; data) = 0;\n    virtual ~ISortStrategy() = default;\n};\nclass QuickSort : public ISortStrategy {\npublic:\n    void sort(vector&lt;int&gt;&amp; data) override { /* quicksort */ }\n};\nclass DataProcessor {\n    unique_ptr&lt;ISortStrategy&gt; strategy;  // composition\npublic:\n    void setStrategy(unique_ptr&lt;ISortStrategy&gt; s) {\n        strategy = move(s);\n    }\n    void process(vector&lt;int&gt;&amp; data) {\n        strategy-&gt;sort(data);\n    }\n};</div><p class="learn-p"><code>DataProcessor</code> depends on the <b>interface</b> <code>ISortStrategy</code>, not on any concrete sort. New sort algorithms can be added without modifying <code>DataProcessor</code>. This satisfies the <b>Open-Closed Principle</b>.</p><div class="learn-tip"><b>Tip:</b> The rule of thumb — "Program to an interface, not an implementation" — is the single most important design guideline in OOP.</div></div><div class="learn-section"><div class="learn-h">Aggregation vs Composition</div><p class="learn-p">Both are HAS-A relationships, but they differ in <b>ownership</b>:</p><ul class="learn-list"><li><b>Composition</b> — the inner object\'s lifetime is managed by the outer object. If the <code>Car</code> is destroyed, its <code>Engine</code> is destroyed too. Represented by a filled diamond in UML.</li><li><b>Aggregation</b> — the inner object can exist independently. A <code>Department</code> has <code>Professors</code>, but professors outlive the department. Represented by an empty diamond in UML.</li></ul></div><div class="learn-section"><div class="learn-h">Interview Tips</div><ul class="learn-list"><li>If asked "Why prefer composition over inheritance?", cite: loose coupling, runtime flexibility, avoidance of the fragile base class problem, and easier unit testing (mocking).</li><li>If asked "When IS inheritance correct?", answer: genuine IS-A with Liskov Substitution, when you need polymorphic dispatch, and when the type hierarchy is stable.</li><li>Be ready to refactor a bad inheritance hierarchy into composition on the whiteboard.</li></ul></div>',
          code: `// ===== Composition vs Inheritance — C++ Demo =====
#include <iostream>
#include <memory>
#include <vector>
using namespace std;

// ----- Bad design: Inheritance for code reuse -----
class BadHashSet {
public:
    int addCount = 0;
    virtual void add(int e)  { addCount++; }
    virtual void addAll(const vector<int>& v) {
        for (int e : v) add(e);   // virtual dispatch!
    }
    virtual ~BadHashSet() = default;
};

class BadCountingSet : public BadHashSet {
public:
    void add(int e) override {
        addCount++;                // +1
        BadHashSet::add(e);        // +1 again => double-counted!
    }
    void addAll(const vector<int>& v) override {
        addCount += v.size();      // +N
        BadHashSet::addAll(v);     // calls this->add() => +N more
    }
};

// ----- Good design: Composition (wrapper / decorator) -----
class ISet {
public:
    virtual void add(int e) = 0;
    virtual void addAll(const vector<int>& v) = 0;
    virtual ~ISet() = default;
};

class MyHashSet : public ISet {
public:
    void add(int e) override { /* actual set insert */ }
    void addAll(const vector<int>& v) override {
        for (int e : v) add(e);
    }
};

class CountingSetWrapper : public ISet {
    unique_ptr<ISet> inner;     // composition
    int addCount = 0;
public:
    CountingSetWrapper(unique_ptr<ISet> s) : inner(move(s)) {}
    void add(int e) override {
        addCount++;
        inner->add(e);           // delegates — no double count
    }
    void addAll(const vector<int>& v) override {
        addCount += v.size();
        inner->addAll(v);        // inner::addAll calls inner::add, NOT this->add
    }
    int getCount() const { return addCount; }
};

// ----- Strategy via Composition -----
class ISortStrategy {
public:
    virtual void sort(vector<int>& data) = 0;
    virtual ~ISortStrategy() = default;
};
class BubbleSort : public ISortStrategy {
public:
    void sort(vector<int>& data) override {
        for (size_t i = 0; i < data.size(); i++)
            for (size_t j = 0; j + 1 < data.size() - i; j++)
                if (data[j] > data[j+1]) swap(data[j], data[j+1]);
    }
};
class DataProcessor {
    unique_ptr<ISortStrategy> strategy;
public:
    void setStrategy(unique_ptr<ISortStrategy> s) { strategy = move(s); }
    void process(vector<int>& data) { strategy->sort(data); }
};

int main() {
    // Demonstrate the bug
    BadCountingSet bcs;
    vector<int> nums = {1, 2, 3};
    bcs.addAll(nums);
    cout << "Bad count (expected 3): " << bcs.addCount << endl; // prints 9!

    // Demonstrate the fix
    auto cs = CountingSetWrapper(make_unique<MyHashSet>());
    cs.addAll(nums);
    cout << "Good count (expected 3): " << cs.getCount() << endl; // prints 3
    return 0;
}`,
          problems: [
            ["Design Parking System","https://leetcode.com/problems/design-parking-system/","Easy"],
            ["Shuffle an Array","https://leetcode.com/problems/shuffle-an-array/","Medium"],
            ["Design Underground System","https://leetcode.com/problems/design-underground-system/","Medium"],
          ],
          mcqs: [
            {"q":"Which relationship does Composition model?","o":["IS-A","HAS-A","USES-A","EXTENDS-A"],"a":1},
            {"q":"The \"Fragile Base Class\" problem is a risk associated with:","o":["Composition","Aggregation","Inheritance","Encapsulation"],"a":2},
            {"q":"Which design principle says \"Program to an interface, not an implementation\"?","o":["Single Responsibility","Open-Closed","Dependency Inversion","Liskov Substitution"],"a":2},
          ],
        },
        {
          t: "SRP & OCP",
          learn: '<div class="learn-section"><div class="learn-h">SOLID — The Foundation of Clean OO Design</div><p class="learn-p">SOLID is an acronym for five design principles introduced by <b>Robert C. Martin</b> (Uncle Bob). These principles guide developers toward writing code that is <b>maintainable, extensible, and testable</b>. In LLD interviews at companies like DE Shaw, you are expected to identify and apply these principles when designing classes.</p><ul class="learn-list"><li><b>S</b> — Single Responsibility Principle</li><li><b>O</b> — Open-Closed Principle</li><li><b>L</b> — Liskov Substitution Principle</li><li><b>I</b> — Interface Segregation Principle</li><li><b>D</b> — Dependency Inversion Principle</li></ul><p class="learn-p">In this topic we cover <b>SRP</b> and <b>OCP</b> in depth.</p></div><div class="learn-section"><div class="learn-h">Single Responsibility Principle (SRP)</div><p class="learn-p">"A class should have <b>only one reason to change</b>." — Robert C. Martin</p><p class="learn-p">This means every class should have exactly <b>one job</b> or <b>one axis of change</b>. If a class handles both business logic and persistence, it has two reasons to change: business rules evolving and database schema changing.</p><div class="learn-code">// BAD: Two responsibilities — report generation AND file I/O\nclass Report {\npublic:\n    string generate() { /* build report content */ }\n    void saveToFile(const string&amp; path) { /* write to disk */ }\n};</div><div class="learn-code">// GOOD: Separated responsibilities\nclass Report {\npublic:\n    string generate() { /* build report content */ }\n};\nclass ReportSaver {\npublic:\n    void save(const Report&amp; r, const string&amp; path) { /* write */ }\n};</div><p class="learn-p">Now <code>Report</code> only changes when report content logic changes, and <code>ReportSaver</code> only changes when the file format or output mechanism changes.</p><div class="learn-tip"><b>Tip:</b> A practical test: describe what your class does. If you use the word "and", it probably violates SRP. "This class generates reports <b>and</b> saves them" — two responsibilities.</div></div><div class="learn-section"><div class="learn-h">SRP — Real-World Example</div><p class="learn-p">Consider a <code>User</code> class in an e-commerce app:</p><div class="learn-code">// VIOLATES SRP\nclass User {\npublic:\n    void register(string email, string pwd) { /* ... */ }\n    void sendWelcomeEmail() { /* SMTP logic */ }\n    void saveToDatabase()   { /* SQL insert */ }\n};</div><p class="learn-p">This class has <b>three reasons to change</b>: user registration logic, email service API changes, and database schema changes. Refactored:</p><div class="learn-code">class User { /* only user domain data &amp; validation */ };\nclass UserRepository { void save(const User&amp; u); };\nclass EmailService  { void sendWelcome(const User&amp; u); };</div><p class="learn-p">Each class now has a single axis of change. This also makes unit testing far easier — you can mock <code>EmailService</code> and <code>UserRepository</code> independently.</p></div><div class="learn-section"><div class="learn-h">Open-Closed Principle (OCP)</div><p class="learn-p">"Software entities should be <b>open for extension but closed for modification</b>." — Bertrand Meyer</p><p class="learn-p">You should be able to add new behaviour to a system <b>without changing existing, tested code</b>. This is typically achieved through <b>polymorphism</b> and <b>abstraction</b>.</p></div><div class="learn-section"><div class="learn-h">OCP — Bad Example</div><div class="learn-code">// VIOLATES OCP: must modify this function every time a new shape is added\ndouble totalArea(vector&lt;Shape*&gt;&amp; shapes) {\n    double total = 0;\n    for (auto s : shapes) {\n        if (s-&gt;type == "circle")\n            total += 3.14 * s-&gt;radius * s-&gt;radius;\n        else if (s-&gt;type == "rectangle")\n            total += s-&gt;width * s-&gt;height;\n        // add more else-if for each new shape...\n    }\n    return total;\n}</div><p class="learn-p">Every new shape requires modifying this function. The function is <b>not closed for modification</b>.</p></div><div class="learn-section"><div class="learn-h">OCP — Good Example</div><div class="learn-code">class Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\nclass Circle : public Shape {\n    double r;\npublic:\n    Circle(double r) : r(r) {}\n    double area() const override { return 3.14159 * r * r; }\n};\nclass Rectangle : public Shape {\n    double w, h;\npublic:\n    Rectangle(double w, double h) : w(w), h(h) {}\n    double area() const override { return w * h; }\n};\n\n// This function NEVER needs to change when new shapes are added\ndouble totalArea(const vector&lt;unique_ptr&lt;Shape&gt;&gt;&amp; shapes) {\n    double total = 0;\n    for (auto&amp; s : shapes) total += s-&gt;area();\n    return total;\n}</div><p class="learn-p">Adding a <code>Triangle</code> class requires <b>zero changes</b> to <code>totalArea</code>. The function is closed for modification, open for extension.</p><div class="learn-tip"><b>Tip:</b> The Strategy pattern, Template Method pattern, and most design patterns are concrete applications of OCP. If an interviewer asks "how would you make this extensible?", think OCP.</div></div><div class="learn-section"><div class="learn-h">OCP via the Strategy Pattern</div><p class="learn-p">Another classic OCP application: varying an algorithm at runtime without changing the client.</p><div class="learn-code">class DiscountStrategy {\npublic:\n    virtual double apply(double price) const = 0;\n    virtual ~DiscountStrategy() = default;\n};\nclass NoDiscount : public DiscountStrategy {\npublic:\n    double apply(double price) const override { return price; }\n};\nclass FlatDiscount : public DiscountStrategy {\n    double amount;\npublic:\n    FlatDiscount(double a) : amount(a) {}\n    double apply(double price) const override { return price - amount; }\n};\nclass PercentDiscount : public DiscountStrategy {\n    double pct;\npublic:\n    PercentDiscount(double p) : pct(p) {}\n    double apply(double price) const override { return price * (1 - pct / 100); }\n};</div><p class="learn-p">The billing module uses <code>DiscountStrategy*</code> and never changes, even when new discount types (buy-one-get-one, tiered discounts) are added.</p></div><div class="learn-section"><div class="learn-h">Common Interview Pitfalls</div><div class="learn-warn"><b>Warning:</b> Don\'t confuse SRP with "a class should have only one method." SRP says one <b>reason to change</b> (one responsibility), not one method. A <code>UserValidator</code> may have many validation methods but still has a single responsibility: validating user data.</div><div class="learn-warn"><b>Warning:</b> OCP does not mean "never modify code." It means design your abstractions so that <b>common extension points</b> don\'t require modification. Hot paths of change should be abstracted.</div></div>',
          code: `// ===== SRP & OCP — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <fstream>
using namespace std;

// =================== SRP ===================
// BAD: Invoice does formatting AND persistence
class BadInvoice {
    double amount;
public:
    BadInvoice(double a) : amount(a) {}
    string format()    { return "Invoice: \$" + to_string(amount); }
    void saveToFile()  { ofstream("invoice.txt") << format(); }
    void printInvoice(){ cout << format() << endl; }
};

// GOOD: Responsibilities separated
class Invoice {
    double amount;
public:
    Invoice(double a) : amount(a) {}
    double getAmount() const { return amount; }
    string format() const {
        return "Invoice: \$" + to_string(amount);
    }
};

class InvoicePersistence {
public:
    void saveToFile(const Invoice& inv, const string& path) {
        ofstream(path) << inv.format();
    }
};

class InvoicePrinter {
public:
    void print(const Invoice& inv) {
        cout << inv.format() << endl;
    }
};

// =================== OCP ===================
// Discount strategies — open for extension, closed for modification
class DiscountStrategy {
public:
    virtual double apply(double price) const = 0;
    virtual string name() const = 0;
    virtual ~DiscountStrategy() = default;
};

class NoDiscount : public DiscountStrategy {
public:
    double apply(double price) const override { return price; }
    string name() const override { return "No Discount"; }
};

class FlatDiscount : public DiscountStrategy {
    double amount;
public:
    FlatDiscount(double a) : amount(a) {}
    double apply(double price) const override {
        return max(0.0, price - amount);
    }
    string name() const override {
        return "Flat \$" + to_string(amount) + " off";
    }
};

class PercentDiscount : public DiscountStrategy {
    double pct;
public:
    PercentDiscount(double p) : pct(p) {}
    double apply(double price) const override {
        return price * (1.0 - pct / 100.0);
    }
    string name() const override {
        return to_string(pct) + "% off";
    }
};

// Billing — NEVER needs modification for new discounts (OCP)
class Billing {
public:
    double checkout(double price, const DiscountStrategy& disc) {
        double final_price = disc.apply(price);
        cout << disc.name() << ": \$" << price
             << " -> \$" << final_price << endl;
        return final_price;
    }
};

int main() {
    // SRP demo
    Invoice inv(250.0);
    InvoicePrinter().print(inv);

    // OCP demo — add new discounts without changing Billing
    Billing billing;
    billing.checkout(100, NoDiscount());
    billing.checkout(100, FlatDiscount(15));
    billing.checkout(100, PercentDiscount(20));
    return 0;
}`,
          problems: [
            ["Design an Ordered Stream","https://leetcode.com/problems/design-an-ordered-stream/","Easy"],
            ["Design a Food Rating System","https://leetcode.com/problems/design-a-food-rating-system/","Medium"],
            ["Online Stock Span","https://leetcode.com/problems/online-stock-span/","Medium"],
          ],
          mcqs: [
            {"q":"SRP states that a class should have:","o":["Only one method","Only one member variable","Only one reason to change","Only one constructor"],"a":2},
            {"q":"Which design pattern is a direct application of the Open-Closed Principle?","o":["Singleton","Strategy","Builder","Prototype"],"a":1},
            {"q":"In OCP, \"closed for modification\" means:","o":["The source file is read-only","Existing tested code need not be changed to add new behaviour","The class cannot be inherited","Private members cannot be changed"],"a":1},
          ],
        },
        {
          t: "LSP, ISP & DIP",
          learn: '<div class="learn-section"><div class="learn-h">Liskov Substitution Principle (LSP)</div><p class="learn-p">"If S is a subtype of T, then objects of type T may be replaced with objects of type S <b>without altering the correctness</b> of the program." — Barbara Liskov, 1987</p><p class="learn-p">In practical terms: wherever you use a base class reference, you should be able to plug in <b>any derived class</b> and the program should still work correctly. This is stronger than just "the code compiles" — it means <b>behavioural compatibility</b>.</p></div><div class="learn-section"><div class="learn-h">LSP — The Classic Rectangle-Square Violation</div><p class="learn-p">The most famous LSP violation is making <code>Square</code> inherit from <code>Rectangle</code>:</p><div class="learn-code">class Rectangle {\nprotected:\n    int width, height;\npublic:\n    virtual void setWidth(int w)  { width = w; }\n    virtual void setHeight(int h) { height = h; }\n    int area() const { return width * height; }\n};\n\nclass Square : public Rectangle {\npublic:\n    void setWidth(int w) override  { width = w; height = w; }\n    void setHeight(int h) override { width = h; height = h; }\n};</div><p class="learn-p">Now consider client code:</p><div class="learn-code">void resize(Rectangle&amp; r) {\n    r.setWidth(5);\n    r.setHeight(10);\n    assert(r.area() == 50);  // FAILS for Square! area = 100\n}</div><p class="learn-p">Substituting <code>Square</code> where <code>Rectangle</code> is expected <b>breaks the program</b>. The <code>Square</code> class violates LSP because it changes the expected post-condition of <code>setWidth</code>/<code>setHeight</code>.</p><div class="learn-warn"><b>Warning:</b> "A square IS-A rectangle in mathematics" does not mean <code>Square</code> should inherit from <code>Rectangle</code> in code. OOP inheritance is about <b>behavioural substitutability</b>, not mathematical set theory.</div></div><div class="learn-section"><div class="learn-h">LSP — How to Fix</div><p class="learn-p">Solutions:</p><ul class="learn-list"><li>Make <code>Rectangle</code> and <code>Square</code> siblings under a common <code>Shape</code> interface with an <code>area()</code> method but <b>no setters</b> that violate invariants.</li><li>Use immutable shapes — constructor sets dimensions, no setters.</li><li>Remove the inheritance relationship entirely if LSP cannot be satisfied.</li></ul><div class="learn-tip"><b>Tip:</b> LSP violations often show up as unexpected <code>if (instanceof ...)</code> checks in client code. If you catch yourself type-checking a polymorphic object, you probably have an LSP issue.</div></div><div class="learn-section"><div class="learn-h">Interface Segregation Principle (ISP)</div><p class="learn-p">"Clients should not be forced to depend on interfaces they do not use." — Robert C. Martin</p><p class="learn-p">A fat interface forces implementers to provide methods they don\'t need, leading to empty stub implementations or <code>throw UnsupportedOperationException()</code> — both are code smells.</p></div><div class="learn-section"><div class="learn-h">ISP — Bad Example</div><div class="learn-code">class IWorker {\npublic:\n    virtual void work() = 0;\n    virtual void eat()  = 0;    // not all workers eat at the workplace\n    virtual ~IWorker() = default;\n};\nclass Robot : public IWorker {\npublic:\n    void work() override { /* productive */ }\n    void eat()  override { /* ??? Robot can\'t eat! */ }\n};</div><p class="learn-p"><code>Robot</code> is forced to implement <code>eat()</code>, which it cannot meaningfully do. This violates ISP.</p></div><div class="learn-section"><div class="learn-h">ISP — Good Example</div><div class="learn-code">class IWorkable {\npublic:\n    virtual void work() = 0;\n    virtual ~IWorkable() = default;\n};\nclass IFeedable {\npublic:\n    virtual void eat() = 0;\n    virtual ~IFeedable() = default;\n};\nclass Human : public IWorkable, public IFeedable {\npublic:\n    void work() override { /* ... */ }\n    void eat()  override { /* ... */ }\n};\nclass Robot : public IWorkable {\npublic:\n    void work() override { /* ... */ }\n};</div><p class="learn-p">Now <code>Robot</code> only implements what it can do. Interfaces are <b>cohesive</b> and <b>minimal</b>.</p><div class="learn-tip"><b>Tip:</b> In C++, ISP is implemented via multiple abstract base classes (since C++ has no <code>interface</code> keyword). Each abstract class represents one cohesive capability.</div></div><div class="learn-section"><div class="learn-h">Dependency Inversion Principle (DIP)</div><p class="learn-p">"High-level modules should not depend on low-level modules. Both should depend on <b>abstractions</b>." — Robert C. Martin</p><p class="learn-p">Additionally: "Abstractions should not depend on details. Details should depend on abstractions."</p></div><div class="learn-section"><div class="learn-h">DIP — Bad Example</div><div class="learn-code">class MySQLDatabase {\npublic:\n    void insert(string data) { /* MySQL-specific SQL */ }\n};\nclass OrderService {\n    MySQLDatabase db;     // HIGH-LEVEL depends on LOW-LEVEL\npublic:\n    void placeOrder(string data) { db.insert(data); }\n};</div><p class="learn-p"><code>OrderService</code> (high-level business logic) is tightly coupled to <code>MySQLDatabase</code> (low-level detail). Switching to PostgreSQL requires changing <code>OrderService</code>.</p></div><div class="learn-section"><div class="learn-h">DIP — Good Example</div><div class="learn-code">class IDatabase {\npublic:\n    virtual void insert(string data) = 0;\n    virtual ~IDatabase() = default;\n};\nclass MySQLDatabase : public IDatabase {\npublic:\n    void insert(string data) override { /* MySQL */ }\n};\nclass PostgresDatabase : public IDatabase {\npublic:\n    void insert(string data) override { /* Postgres */ }\n};\nclass OrderService {\n    IDatabase&amp; db;         // depends on ABSTRACTION\npublic:\n    OrderService(IDatabase&amp; db) : db(db) {}\n    void placeOrder(string data) { db.insert(data); }\n};</div><p class="learn-p">Now both <code>OrderService</code> and the database implementations depend on the <code>IDatabase</code> abstraction. The dependency arrow is <b>inverted</b> — the high-level module defines the interface, and low-level modules conform to it.</p><div class="learn-tip"><b>Tip:</b> DIP is the principle; <b>Dependency Injection</b> is a technique to implement it. Constructor injection (passing the dependency via constructor) is the most common form.</div></div><div class="learn-section"><div class="learn-h">How SOLID Principles Work Together</div><table class="learn-table"><tr><th>Principle</th><th>Key Question</th><th>Violation Smell</th></tr><tr><td>SRP</td><td>Does this class have only one reason to change?</td><td>God class, mixed concerns</td></tr><tr><td>OCP</td><td>Can I add new behaviour without modifying existing code?</td><td>Long if-else / switch chains</td></tr><tr><td>LSP</td><td>Can I substitute any subtype without breaking correctness?</td><td>instanceof checks, throwing UnsupportedOperation</td></tr><tr><td>ISP</td><td>Are my interfaces cohesive and minimal?</td><td>Empty method stubs in implementers</td></tr><tr><td>DIP</td><td>Do high-level modules depend on abstractions?</td><td>Direct instantiation of concrete classes in business logic</td></tr></table></div>',
          code: `// ===== LSP, ISP & DIP — C++ Implementation =====
#include <iostream>
#include <string>
#include <memory>
#include <cassert>
using namespace std;

// =================== LSP ===================
// BAD: Square violates LSP when inheriting Rectangle
class Rectangle {
protected:
    int w, h;
public:
    Rectangle(int w, int h) : w(w), h(h) {}
    virtual void setWidth(int nw)  { w = nw; }
    virtual void setHeight(int nh) { h = nh; }
    int area() const { return w * h; }
};

class BadSquare : public Rectangle {
public:
    BadSquare(int side) : Rectangle(side, side) {}
    void setWidth(int s) override  { w = s; h = s; }
    void setHeight(int s) override { w = s; h = s; }
};

// GOOD: Use a common Shape interface — no conflicting setters
class Shape {
public:
    virtual double area() const = 0;
    virtual ~Shape() = default;
};
class GoodRectangle : public Shape {
    double w, h;
public:
    GoodRectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};
class GoodSquare : public Shape {
    double side;
public:
    GoodSquare(double s) : side(s) {}
    double area() const override { return side * side; }
};

// =================== ISP ===================
class IWorkable {
public:
    virtual void work() = 0;
    virtual ~IWorkable() = default;
};
class IFeedable {
public:
    virtual void eat() = 0;
    virtual ~IFeedable() = default;
};
class ISleepable {
public:
    virtual void sleep() = 0;
    virtual ~ISleepable() = default;
};

class Human : public IWorkable, public IFeedable, public ISleepable {
public:
    void work()  override { cout << "Human working" << endl; }
    void eat()   override { cout << "Human eating" << endl; }
    void sleep() override { cout << "Human sleeping" << endl; }
};

class Robot : public IWorkable {   // Only implements what it can do
public:
    void work() override { cout << "Robot working 24/7" << endl; }
};

// =================== DIP ===================
class INotificationService {
public:
    virtual void send(const string& to, const string& msg) = 0;
    virtual ~INotificationService() = default;
};

class EmailService : public INotificationService {
public:
    void send(const string& to, const string& msg) override {
        cout << "Email to " << to << ": " << msg << endl;
    }
};

class SMSService : public INotificationService {
public:
    void send(const string& to, const string& msg) override {
        cout << "SMS to " << to << ": " << msg << endl;
    }
};

// High-level module depends on abstraction, NOT concrete service
class OrderProcessor {
    INotificationService& notifier;
public:
    OrderProcessor(INotificationService& n) : notifier(n) {}
    void processOrder(const string& customer) {
        cout << "Processing order..." << endl;
        notifier.send(customer, "Your order is confirmed!");
    }
};

int main() {
    // LSP demo
    Rectangle r(5, 10);
    r.setWidth(5); r.setHeight(10);
    cout << "Rectangle area: " << r.area() << endl;  // 50

    BadSquare sq(5);
    sq.setWidth(5); sq.setHeight(10);
    cout << "BadSquare area (expect 50): " << sq.area() << endl; // 100! LSP violated

    // ISP demo
    Human h;
    h.work(); h.eat(); h.sleep();
    Robot bot;
    bot.work();  // Robot only does what it can

    // DIP demo — swap implementations freely
    EmailService email;
    SMSService sms;
    OrderProcessor op1(email);
    op1.processOrder("alice@example.com");
    OrderProcessor op2(sms);
    op2.processOrder("+1234567890");
    return 0;
}`,
          problems: [
            ["Design Add and Search Words","https://leetcode.com/problems/design-add-and-search-words-data-structure/","Medium"],
            ["Implement Queue using Stacks","https://leetcode.com/problems/implement-queue-using-stacks/","Easy"],
            ["Design Circular Queue","https://leetcode.com/problems/design-circular-queue/","Medium"],
          ],
          mcqs: [
            {"q":"The Rectangle-Square problem is a classic violation of which SOLID principle?","o":["SRP","OCP","LSP","DIP"],"a":2},
            {"q":"ISP recommends:","o":["One large interface covering all functionality","Many small, cohesive interfaces","No interfaces at all — use concrete classes","At most two interfaces per class"],"a":1},
            {"q":"In DIP, what should high-level modules depend on?","o":["Low-level modules directly","Concrete implementations","Abstractions (interfaces)","Global variables"],"a":2},
          ],
        }
      ]
    },
    {
      id: "patterns", t: "Patterns & Case Studies",
      topics: [
        {
          t: "Singleton & Factory Pattern",
          learn: '<div class="learn-section"><div class="learn-h">Creational Design Patterns</div><p class="learn-p">Creational patterns deal with <b>object creation mechanisms</b>, trying to create objects in a manner suitable to the situation. They abstract the instantiation process, making the system independent of how its objects are created, composed, and represented. The two most commonly asked creational patterns in interviews are <b>Singleton</b> and <b>Factory</b>.</p></div><div class="learn-section"><div class="learn-h">Singleton Pattern</div><p class="learn-p">The Singleton pattern ensures a class has <b>exactly one instance</b> and provides a <b>global point of access</b> to it. Use cases include:</p><ul class="learn-list"><li><b>Configuration manager</b> — one config object for the whole app.</li><li><b>Logger</b> — one centralized logging instance.</li><li><b>Database connection pool</b> — one pool shared across threads.</li><li><b>Cache</b> — a single in-memory cache.</li></ul></div><div class="learn-section"><div class="learn-h">Singleton — Implementation Approaches</div><p class="learn-p"><b>Approach 1: Meyers\' Singleton (C++11 thread-safe)</b></p><div class="learn-code">class Singleton {\npublic:\n    static Singleton&amp; getInstance() {\n        static Singleton instance;  // C++11 guarantees thread-safe init\n        return instance;\n    }\n    void doWork() { /* ... */ }\n    // Delete copy &amp; move\n    Singleton(const Singleton&amp;) = delete;\n    Singleton&amp; operator=(const Singleton&amp;) = delete;\nprivate:\n    Singleton() {}   // private constructor\n};</div><p class="learn-p">This is the <b>recommended</b> C++ approach. The C++11 standard guarantees that local static initialization is thread-safe (Magic Statics / [stmt.dcl] paragraph 4).</p><p class="learn-p"><b>Approach 2: Double-Checked Locking (pre-C++11 or explicit threading)</b></p><div class="learn-code">class Singleton {\n    static Singleton* instance;\n    static mutex mtx;\npublic:\n    static Singleton* getInstance() {\n        if (instance == nullptr) {         // first check (no lock)\n            lock_guard&lt;mutex&gt; lock(mtx);\n            if (instance == nullptr)       // second check (with lock)\n                instance = new Singleton();\n        }\n        return instance;\n    }\nprivate:\n    Singleton() {}\n};</div><div class="learn-warn"><b>Warning:</b> Double-checked locking requires the pointer to be <code>std::atomic</code> to prevent instruction reordering. Without atomic, the compiler or CPU may reorder the write to <code>instance</code> before the constructor finishes, causing another thread to see a partially constructed object.</div></div><div class="learn-section"><div class="learn-h">Singleton — Pros &amp; Cons</div><table class="learn-table"><tr><th>Pros</th><th>Cons</th></tr><tr><td>Controlled access to sole instance</td><td>Global state — makes testing hard</td></tr><tr><td>Lazy initialization</td><td>Hides dependencies in code</td></tr><tr><td>Memory efficient (one instance)</td><td>Violates SRP (manages own lifecycle)</td></tr><tr><td>Thread-safe with proper implementation</td><td>Hard to mock in unit tests</td></tr></table><div class="learn-tip"><b>Tip:</b> In interviews, always mention thread-safety. For C++, recommend Meyers\' Singleton. For Java, recommend <code>enum Singleton</code> or <code>Bill Pugh\'s</code> approach.</div></div><div class="learn-section"><div class="learn-h">Factory Method Pattern</div><p class="learn-p">The Factory Method pattern defines an interface for creating objects but lets <b>subclasses decide which class to instantiate</b>. It lets a class defer instantiation to subclasses.</p><p class="learn-p">Use cases:</p><ul class="learn-list"><li>When the exact type of object to create isn\'t known until runtime.</li><li>When a class wants its subclasses to specify the objects it creates.</li><li>When you want to encapsulate object creation logic in one place.</li></ul></div><div class="learn-section"><div class="learn-h">Simple Factory (Not a GoF pattern, but commonly asked)</div><div class="learn-code">class Shape {\npublic:\n    virtual void draw() = 0;\n    virtual ~Shape() = default;\n};\nclass Circle : public Shape {\npublic:\n    void draw() override { cout &lt;&lt; "Drawing Circle"; }\n};\nclass Square : public Shape {\npublic:\n    void draw() override { cout &lt;&lt; "Drawing Square"; }\n};\n\nclass ShapeFactory {\npublic:\n    static unique_ptr&lt;Shape&gt; create(const string&amp; type) {\n        if (type == "circle")  return make_unique&lt;Circle&gt;();\n        if (type == "square")  return make_unique&lt;Square&gt;();\n        return nullptr;\n    }\n};</div><p class="learn-p">The client calls <code>ShapeFactory::create("circle")</code> without knowing about concrete classes.</p></div><div class="learn-section"><div class="learn-h">Factory Method (GoF Pattern)</div><div class="learn-code">class Document {\npublic:\n    virtual void open() = 0;\n    virtual ~Document() = default;\n};\nclass PDFDocument : public Document {\npublic:\n    void open() override { /* open PDF */ }\n};\nclass WordDocument : public Document {\npublic:\n    void open() override { /* open Word */ }\n};\n\n// Factory Method in the creator class\nclass Application {\npublic:\n    virtual unique_ptr&lt;Document&gt; createDocument() = 0;  // factory method\n    void openDocument() {\n        auto doc = createDocument();\n        doc-&gt;open();\n    }\n    virtual ~Application() = default;\n};\nclass PDFApplication : public Application {\npublic:\n    unique_ptr&lt;Document&gt; createDocument() override {\n        return make_unique&lt;PDFDocument&gt;();\n    }\n};</div><p class="learn-p">The base <code>Application</code> defines the workflow (<code>openDocument</code>). Subclasses decide <b>what</b> to create. This follows OCP — adding a new document type requires a new subclass, not modifying existing code.</p></div><div class="learn-section"><div class="learn-h">Abstract Factory Pattern</div><p class="learn-p">The Abstract Factory creates <b>families of related objects</b> without specifying their concrete classes. For example, a UI toolkit factory that produces buttons, text fields, and checkboxes — one factory for Windows, another for macOS.</p><div class="learn-code">class IButton { public: virtual void render() = 0; virtual ~IButton() = default; };\nclass ITextBox { public: virtual void render() = 0; virtual ~ITextBox() = default; };\n\nclass WinButton : public IButton { void render() override { /* Windows style */ } };\nclass WinTextBox : public ITextBox { void render() override { /* Windows style */ } };\nclass MacButton : public IButton { void render() override { /* Mac style */ } };\nclass MacTextBox : public ITextBox { void render() override { /* Mac style */ } };\n\nclass IGUIFactory {\npublic:\n    virtual unique_ptr&lt;IButton&gt; createButton() = 0;\n    virtual unique_ptr&lt;ITextBox&gt; createTextBox() = 0;\n    virtual ~IGUIFactory() = default;\n};\nclass WinFactory : public IGUIFactory {\n    unique_ptr&lt;IButton&gt; createButton() override { return make_unique&lt;WinButton&gt;(); }\n    unique_ptr&lt;ITextBox&gt; createTextBox() override { return make_unique&lt;WinTextBox&gt;(); }\n};</div><div class="learn-tip"><b>Tip:</b> Use <b>Simple Factory</b> when you need a central creation point. Use <b>Factory Method</b> when subclasses should decide. Use <b>Abstract Factory</b> when you need families of related objects.</div></div>',
          code: `// ===== Singleton & Factory Pattern — C++ Implementation =====
#include <iostream>
#include <string>
#include <memory>
#include <unordered_map>
#include <mutex>
using namespace std;

// =================== SINGLETON ===================
// Meyers' Singleton (thread-safe in C++11)
class Logger {
public:
    static Logger& getInstance() {
        static Logger instance;
        return instance;
    }
    void log(const string& msg) {
        lock_guard<mutex> lock(mtx);
        cout << "[LOG " << (++count) << "] " << msg << endl;
    }
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;
private:
    Logger() : count(0) { cout << "Logger created" << endl; }
    int count;
    mutex mtx;
};

// =================== SIMPLE FACTORY ===================
class Notification {
public:
    virtual void send(const string& msg) = 0;
    virtual ~Notification() = default;
};

class EmailNotification : public Notification {
public:
    void send(const string& msg) override {
        cout << "Email: " << msg << endl;
    }
};

class SMSNotification : public Notification {
public:
    void send(const string& msg) override {
        cout << "SMS: " << msg << endl;
    }
};

class PushNotification : public Notification {
public:
    void send(const string& msg) override {
        cout << "Push: " << msg << endl;
    }
};

class NotificationFactory {
public:
    static unique_ptr<Notification> create(const string& type) {
        if (type == "email") return make_unique<EmailNotification>();
        if (type == "sms")   return make_unique<SMSNotification>();
        if (type == "push")  return make_unique<PushNotification>();
        throw invalid_argument("Unknown notification type: " + type);
    }
};

// =================== FACTORY METHOD ===================
class Transport {
public:
    virtual void deliver(const string& package) = 0;
    virtual ~Transport() = default;
};

class Truck : public Transport {
public:
    void deliver(const string& pkg) override {
        cout << "Truck delivers: " << pkg << endl;
    }
};

class Ship : public Transport {
public:
    void deliver(const string& pkg) override {
        cout << "Ship delivers: " << pkg << endl;
    }
};

// Base logistics class with factory method
class Logistics {
public:
    virtual unique_ptr<Transport> createTransport() = 0;
    void planDelivery(const string& pkg) {
        auto t = createTransport();   // factory method call
        t->deliver(pkg);
    }
    virtual ~Logistics() = default;
};

class RoadLogistics : public Logistics {
public:
    unique_ptr<Transport> createTransport() override {
        return make_unique<Truck>();
    }
};

class SeaLogistics : public Logistics {
public:
    unique_ptr<Transport> createTransport() override {
        return make_unique<Ship>();
    }
};

int main() {
    // Singleton
    Logger::getInstance().log("App started");
    Logger::getInstance().log("Processing request");

    // Simple Factory
    auto n = NotificationFactory::create("email");
    n->send("Hello from factory!");

    // Factory Method
    unique_ptr<Logistics> logistics;
    logistics = make_unique<RoadLogistics>();
    logistics->planDelivery("Electronics");
    logistics = make_unique<SeaLogistics>();
    logistics->planDelivery("Furniture");
    return 0;
}`,
          problems: [
            ["Design HashMap","https://leetcode.com/problems/design-hashmap/","Easy"],
            ["Implement Trie (Prefix Tree)","https://leetcode.com/problems/implement-trie-prefix-tree/","Medium"],
            ["Design a File System","https://leetcode.com/problems/design-file-system/","Medium"],
          ],
          mcqs: [
            {"q":"In C++11, the recommended thread-safe Singleton uses:","o":["Double-checked locking with mutex","Meyers' Singleton (local static variable)","Global static instance","std::call_once"],"a":1},
            {"q":"The Factory Method pattern defers object creation to:","o":["The client code","A static method","Subclasses","A configuration file"],"a":2},
            {"q":"Which is a valid criticism of the Singleton pattern?","o":["It uses too much memory","It makes unit testing harder due to global state","It is too complex to implement","It cannot be used in multi-threaded programs"],"a":1},
          ],
        },
        {
          t: "Observer & Strategy Pattern",
          learn: '<div class="learn-section"><div class="learn-h">Behavioural Design Patterns</div><p class="learn-p">Behavioural patterns are concerned with <b>algorithms and the assignment of responsibilities between objects</b>. They describe patterns of communication between objects and how the flow of control is distributed. The <b>Observer</b> and <b>Strategy</b> patterns are among the most frequently asked in interviews.</p></div><div class="learn-section"><div class="learn-h">Observer Pattern</div><p class="learn-p">The Observer pattern defines a <b>one-to-many dependency</b> between objects. When the <b>subject</b> (observable) changes state, all its <b>observers</b> (subscribers) are notified and updated automatically.</p><p class="learn-p"><b>Real-world analogies:</b></p><ul class="learn-list"><li>YouTube channel subscriptions — you subscribe, you get notified of new videos.</li><li>Event listeners in GUI frameworks — buttons notify handlers on click.</li><li>Stock price alerts — investors subscribe to price change notifications.</li><li>Newspaper subscriptions — publisher sends papers to all subscribers.</li></ul></div><div class="learn-section"><div class="learn-h">Observer — Structure</div><p class="learn-p">The pattern involves these participants:</p><ul class="learn-list"><li><b>Subject (Observable)</b> — maintains a list of observers and notifies them of state changes.</li><li><b>Observer (Subscriber)</b> — defines an update interface for objects that should be notified.</li><li><b>Concrete Subject</b> — stores state of interest and sends notifications.</li><li><b>Concrete Observer</b> — implements the update interface to react to notifications.</li></ul><div class="learn-code">class IObserver {\npublic:\n    virtual void update(float price) = 0;\n    virtual ~IObserver() = default;\n};\n\nclass ISubject {\npublic:\n    virtual void attach(IObserver* o) = 0;\n    virtual void detach(IObserver* o) = 0;\n    virtual void notify() = 0;\n    virtual ~ISubject() = default;\n};</div></div><div class="learn-section"><div class="learn-h">Observer — Push vs Pull Model</div><table class="learn-table"><tr><th>Push Model</th><th>Pull Model</th></tr><tr><td>Subject sends all data in the update call</td><td>Subject sends minimal notification; observer queries for data</td></tr><tr><td><code>update(float price, int volume)</code></td><td><code>update(Subject* src)</code> then <code>src-&gt;getPrice()</code></td></tr><tr><td>Simple, but observers may receive unneeded data</td><td>Flexible, but adds coupling to subject interface</td></tr></table><div class="learn-tip"><b>Tip:</b> In interviews, mention both models and state that the push model is simpler for simple cases, while the pull model is better when different observers need different data from the subject.</div></div><div class="learn-section"><div class="learn-h">Observer — Use Cases in System Design</div><ul class="learn-list"><li><b>Event-driven architectures</b> — microservices publishing events to a message bus.</li><li><b>MVC pattern</b> — Model notifies View of changes.</li><li><b>Reactive programming</b> — RxJava, RxCpp observables.</li><li><b>Pub-Sub systems</b> — Kafka, Redis Pub/Sub (distributed Observer).</li></ul><div class="learn-warn"><b>Warning:</b> Be careful of <b>memory leaks</b> — if an observer is destroyed without detaching, the subject holds a dangling pointer. Use weak references or ensure detach is called in the observer\'s destructor.</div></div><div class="learn-section"><div class="learn-h">Strategy Pattern</div><p class="learn-p">The Strategy pattern defines a <b>family of algorithms</b>, encapsulates each one, and makes them <b>interchangeable</b>. The client can switch algorithms at runtime without changing its code.</p><p class="learn-p"><b>Key insight:</b> Strategy is the pattern form of the principle "Program to an interface, not an implementation." It is a direct application of OCP and DIP.</p></div><div class="learn-section"><div class="learn-h">Strategy — When to Use</div><ul class="learn-list"><li>When you have multiple algorithms for a task and want to switch between them.</li><li>When you see a class with many conditional statements selecting a behaviour.</li><li>When different clients need different variations of an algorithm.</li><li>When you want to isolate algorithm implementation details from the code that uses it.</li></ul></div><div class="learn-section"><div class="learn-h">Strategy — Example: Payment Processing</div><div class="learn-code">class PaymentStrategy {\npublic:\n    virtual bool pay(double amount) = 0;\n    virtual ~PaymentStrategy() = default;\n};\nclass CreditCardPayment : public PaymentStrategy {\n    string cardNumber;\npublic:\n    CreditCardPayment(string card) : cardNumber(card) {}\n    bool pay(double amount) override {\n        cout &lt;&lt; "Charged $" &lt;&lt; amount &lt;&lt; " to card " &lt;&lt; cardNumber;\n        return true;\n    }\n};\nclass PayPalPayment : public PaymentStrategy {\n    string email;\npublic:\n    PayPalPayment(string email) : email(email) {}\n    bool pay(double amount) override {\n        cout &lt;&lt; "Paid $" &lt;&lt; amount &lt;&lt; " via PayPal (" &lt;&lt; email &lt;&lt; ")";\n        return true;\n    }\n};\n\nclass ShoppingCart {\n    PaymentStrategy* strategy;\npublic:\n    void setPaymentStrategy(PaymentStrategy* s) { strategy = s; }\n    void checkout(double total) {\n        strategy-&gt;pay(total);   // delegates to whatever strategy is set\n    }\n};</div><p class="learn-p">Adding <code>UPIPayment</code> or <code>CryptoPayment</code> requires zero changes to <code>ShoppingCart</code>. This is OCP in action.</p></div><div class="learn-section"><div class="learn-h">Strategy vs Inheritance</div><p class="learn-p">Without Strategy, you might use inheritance to vary behaviour:</p><div class="learn-code">class Duck {\npublic:\n    virtual void fly() = 0;\n};\nclass MallardDuck : public Duck {\n    void fly() override { /* fly with wings */ }\n};\nclass RubberDuck : public Duck {\n    void fly() override { /* can\'t fly! empty method or throw */ }\n};</div><p class="learn-p">This is fragile — not all ducks fly, and changing fly behaviour means changing the class hierarchy. With Strategy:</p><div class="learn-code">class IFlyBehaviour {\npublic:\n    virtual void fly() = 0;\n    virtual ~IFlyBehaviour() = default;\n};\nclass FlyWithWings : public IFlyBehaviour {\npublic:\n    void fly() override { cout &lt;&lt; "Flying!"; }\n};\nclass NoFly : public IFlyBehaviour {\npublic:\n    void fly() override { cout &lt;&lt; "Can\'t fly"; }\n};\nclass Duck {\n    unique_ptr&lt;IFlyBehaviour&gt; flyBehaviour;  // strategy\npublic:\n    void setFly(unique_ptr&lt;IFlyBehaviour&gt; fb) { flyBehaviour = move(fb); }\n    void performFly() { flyBehaviour-&gt;fly(); }\n};</div><p class="learn-p">Now fly behaviour is <b>composed</b>, not inherited. You can change a duck\'s fly behaviour at runtime.</p><div class="learn-tip"><b>Tip:</b> The Strategy pattern is fundamentally "composition over inheritance" for algorithms. The Head First Design Patterns book uses the Duck example to introduce this exact concept.</div></div><div class="learn-section"><div class="learn-h">Observer vs Strategy — Quick Comparison</div><table class="learn-table"><tr><th>Aspect</th><th>Observer</th><th>Strategy</th></tr><tr><td>Relationship</td><td>One-to-many</td><td>One-to-one</td></tr><tr><td>Purpose</td><td>Notify dependents of state changes</td><td>Swap algorithm at runtime</td></tr><tr><td>Direction</td><td>Subject &rarr; Observers</td><td>Context &rarr; Strategy</td></tr><tr><td>Cardinality</td><td>Multiple observers</td><td>One strategy at a time</td></tr></table></div>',
          code: `// ===== Observer & Strategy Pattern — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <algorithm>
using namespace std;

// =================== OBSERVER PATTERN ===================
class IObserver {
public:
    virtual void update(const string& event, float data) = 0;
    virtual ~IObserver() = default;
};

class ISubject {
public:
    virtual void attach(IObserver* o) = 0;
    virtual void detach(IObserver* o) = 0;
    virtual void notify(const string& event) = 0;
    virtual ~ISubject() = default;
};

class StockMarket : public ISubject {
    vector<IObserver*> observers;
    float price = 0;
public:
    void attach(IObserver* o) override { observers.push_back(o); }
    void detach(IObserver* o) override {
        observers.erase(
            remove(observers.begin(), observers.end(), o),
            observers.end());
    }
    void notify(const string& event) override {
        for (auto* obs : observers)
            obs->update(event, price);
    }
    void setPrice(float p) {
        price = p;
        notify("price_change");
    }
    float getPrice() const { return price; }
};

class PhoneApp : public IObserver {
    string name;
public:
    PhoneApp(string n) : name(n) {}
    void update(const string& event, float data) override {
        cout << "[" << name << "] " << event << ": \$" << data << endl;
    }
};

class EmailAlert : public IObserver {
    string email;
public:
    EmailAlert(string e) : email(e) {}
    void update(const string& event, float data) override {
        cout << "[Email " << email << "] " << event << ": \$" << data << endl;
    }
};

// =================== STRATEGY PATTERN ===================
class CompressionStrategy {
public:
    virtual void compress(const string& file) = 0;
    virtual ~CompressionStrategy() = default;
};

class ZipCompression : public CompressionStrategy {
public:
    void compress(const string& file) override {
        cout << "ZIP compressing: " << file << endl;
    }
};

class RarCompression : public CompressionStrategy {
public:
    void compress(const string& file) override {
        cout << "RAR compressing: " << file << endl;
    }
};

class GzipCompression : public CompressionStrategy {
public:
    void compress(const string& file) override {
        cout << "GZIP compressing: " << file << endl;
    }
};

class FileCompressor {
    unique_ptr<CompressionStrategy> strategy;
public:
    void setStrategy(unique_ptr<CompressionStrategy> s) {
        strategy = move(s);
    }
    void compressFile(const string& file) {
        if (!strategy) {
            cout << "No compression strategy set!" << endl;
            return;
        }
        strategy->compress(file);
    }
};

int main() {
    // Observer demo
    StockMarket market;
    PhoneApp app1("Alice-Phone");
    PhoneApp app2("Bob-Phone");
    EmailAlert email("charlie@example.com");

    market.attach(&app1);
    market.attach(&app2);
    market.attach(&email);
    market.setPrice(150.0);   // all three notified

    market.detach(&app2);     // Bob unsubscribes
    market.setPrice(155.5);   // only Alice and Charlie notified

    cout << "---" << endl;

    // Strategy demo
    FileCompressor compressor;
    compressor.setStrategy(make_unique<ZipCompression>());
    compressor.compressFile("report.pdf");

    compressor.setStrategy(make_unique<GzipCompression>());
    compressor.compressFile("data.csv");

    compressor.setStrategy(make_unique<RarCompression>());
    compressor.compressFile("archive.tar");
    return 0;
}`,
          problems: [
            ["Design Twitter","https://leetcode.com/problems/design-twitter/","Medium"],
            ["Sort an Array","https://leetcode.com/problems/sort-an-array/","Medium"],
            ["Design a Leaderboard","https://leetcode.com/problems/design-a-leaderboard/","Medium"],
          ],
          mcqs: [
            {"q":"The Observer pattern defines a:","o":["One-to-one dependency","Many-to-many dependency","One-to-many dependency","No dependency"],"a":2},
            {"q":"The Strategy pattern is a direct application of which principles?","o":["SRP and LSP","OCP and DIP","ISP and SRP","LSP and OCP"],"a":1},
            {"q":"In the Observer pattern, a memory leak can occur when:","o":["Too many observers are added","The subject is destroyed before observers","An observer is destroyed without detaching from the subject","The notify method is called too frequently"],"a":2},
          ],
        },
        {
          t: "Decorator & Adapter Pattern",
          learn: '<div class="learn-section"><div class="learn-h">Structural Design Patterns</div><p class="learn-p">Structural patterns deal with <b>object composition</b> — how classes and objects are composed to form larger structures. They help ensure that when one part of a system changes, the rest doesn\'t need to change. The <b>Decorator</b> and <b>Adapter</b> patterns are two of the most useful structural patterns for interviews.</p></div><div class="learn-section"><div class="learn-h">Decorator Pattern</div><p class="learn-p">The Decorator pattern allows you to <b>attach new behaviours to objects dynamically</b> by wrapping them in decorator objects. It provides a flexible alternative to subclassing for extending functionality.</p><p class="learn-p"><b>Key insight:</b> Both the decorator and the decorated object implement the <b>same interface</b>. The decorator wraps the original and adds behaviour before/after delegating to it. This lets you stack multiple decorators.</p></div><div class="learn-section"><div class="learn-h">Decorator — Structure</div><ul class="learn-list"><li><b>Component</b> — the interface (abstract class) that both concrete components and decorators implement.</li><li><b>Concrete Component</b> — the base object being decorated.</li><li><b>Base Decorator</b> — holds a reference to a Component and delegates to it.</li><li><b>Concrete Decorators</b> — add specific behaviour before/after delegation.</li></ul><div class="learn-code">class Coffee {\npublic:\n    virtual double cost() const = 0;\n    virtual string description() const = 0;\n    virtual ~Coffee() = default;\n};\nclass SimpleCoffee : public Coffee {\npublic:\n    double cost() const override { return 5.0; }\n    string description() const override { return "Simple Coffee"; }\n};\nclass MilkDecorator : public Coffee {\n    unique_ptr&lt;Coffee&gt; coffee;\npublic:\n    MilkDecorator(unique_ptr&lt;Coffee&gt; c) : coffee(move(c)) {}\n    double cost() const override { return coffee-&gt;cost() + 1.5; }\n    string description() const override {\n        return coffee-&gt;description() + " + Milk";\n    }\n};</div></div><div class="learn-section"><div class="learn-h">Decorator — Stacking</div><p class="learn-p">The power of Decorator is that you can <b>stack multiple decorators</b>:</p><div class="learn-code">auto coffee = make_unique&lt;SimpleCoffee&gt;();          // $5\ncoffee = make_unique&lt;MilkDecorator&gt;(move(coffee));   // $6.5\ncoffee = make_unique&lt;SugarDecorator&gt;(move(coffee));  // $7\ncoffee = make_unique&lt;WhipDecorator&gt;(move(coffee));   // $8.5</div><p class="learn-p">Each decorator wraps the previous one, forming a chain. The outermost decorator\'s <code>cost()</code> cascades inward. This is much more flexible than creating subclasses like <code>CoffeeWithMilkAndSugar</code>.</p><div class="learn-tip"><b>Tip:</b> Java\'s I/O streams are a classic Decorator example: <code>BufferedReader(InputStreamReader(FileInputStream(...)))</code>. Each layer adds buffering, character conversion, etc.</div></div><div class="learn-section"><div class="learn-h">Decorator vs Inheritance</div><table class="learn-table"><tr><th>Aspect</th><th>Inheritance</th><th>Decorator</th></tr><tr><td>When decided</td><td>Compile time</td><td>Runtime</td></tr><tr><td>Combinatorial explosion</td><td>N features &rarr; 2^N subclasses</td><td>N feature decorators, combine freely</td></tr><tr><td>Adding features</td><td>New subclass per combination</td><td>New decorator, composable</td></tr><tr><td>Removing features</td><td>Cannot remove at runtime</td><td>Don\'t add the decorator</td></tr></table></div><div class="learn-section"><div class="learn-h">Adapter Pattern</div><p class="learn-p">The Adapter pattern converts the <b>interface of a class into another interface</b> that the client expects. It lets classes work together that couldn\'t otherwise because of <b>incompatible interfaces</b>.</p><p class="learn-p"><b>Real-world analogy:</b> A power adapter converts a US plug to a European socket. The device (client) doesn\'t change, the socket (service) doesn\'t change — the adapter bridges the gap.</p></div><div class="learn-section"><div class="learn-h">Adapter — Two Forms</div><p class="learn-p"><b>Object Adapter</b> (composition — preferred):</p><div class="learn-code">// Existing service with incompatible interface\nclass LegacyPrinter {\npublic:\n    void printOldWay(const string&amp; text) {\n        cout &lt;&lt; "*** " &lt;&lt; text &lt;&lt; " ***" &lt;&lt; endl;\n    }\n};\n\n// Interface client expects\nclass IPrinter {\npublic:\n    virtual void print(const string&amp; text) = 0;\n    virtual ~IPrinter() = default;\n};\n\n// Adapter bridges the gap\nclass PrinterAdapter : public IPrinter {\n    LegacyPrinter legacy;      // composition\npublic:\n    void print(const string&amp; text) override {\n        legacy.printOldWay(text);   // translate call\n    }\n};</div><p class="learn-p"><b>Class Adapter</b> (multiple inheritance):</p><div class="learn-code">class PrinterAdapter : public IPrinter, private LegacyPrinter {\npublic:\n    void print(const string&amp; text) override {\n        printOldWay(text);     // inherited from LegacyPrinter\n    }\n};</div><div class="learn-warn"><b>Warning:</b> Object Adapter is generally preferred because it doesn\'t require multiple inheritance and is more flexible (the adaptee can be changed at runtime).</div></div><div class="learn-section"><div class="learn-h">Adapter — Common Use Cases</div><ul class="learn-list"><li><b>Legacy integration</b> — wrapping old APIs to conform to new interfaces.</li><li><b>Third-party library wrapping</b> — insulating your code from external library changes.</li><li><b>Testing</b> — adapting real services to testable interfaces (similar to mocking).</li><li><b>API versioning</b> — adapting v1 API calls to v2 implementations.</li></ul></div><div class="learn-section"><div class="learn-h">Decorator vs Adapter — Key Differences</div><table class="learn-table"><tr><th>Aspect</th><th>Decorator</th><th>Adapter</th></tr><tr><td>Intent</td><td>Add new behaviour</td><td>Make incompatible interfaces work together</td></tr><tr><td>Interface change</td><td>Same interface</td><td>Different interface</td></tr><tr><td>Wrapping</td><td>Wraps same-type object</td><td>Wraps different-type object</td></tr><tr><td>Stacking</td><td>Multiple decorators stackable</td><td>Usually single adapter</td></tr></table><div class="learn-tip"><b>Tip:</b> If someone asks "Decorator vs Adapter?", the key distinction is: Decorator adds behaviour to an existing interface; Adapter converts one interface to another.</div></div>',
          code: `// ===== Decorator & Adapter Pattern — C++ Implementation =====
#include <iostream>
#include <string>
#include <memory>
using namespace std;

// =================== DECORATOR PATTERN ===================
// Component interface
class Pizza {
public:
    virtual double cost() const = 0;
    virtual string description() const = 0;
    virtual ~Pizza() = default;
};

// Concrete component
class Margherita : public Pizza {
public:
    double cost() const override { return 8.0; }
    string description() const override { return "Margherita"; }
};

class FarmHouse : public Pizza {
public:
    double cost() const override { return 10.0; }
    string description() const override { return "Farm House"; }
};

// Base decorator
class ToppingDecorator : public Pizza {
protected:
    unique_ptr<Pizza> pizza;
public:
    ToppingDecorator(unique_ptr<Pizza> p) : pizza(move(p)) {}
};

// Concrete decorators
class ExtraCheese : public ToppingDecorator {
public:
    ExtraCheese(unique_ptr<Pizza> p) : ToppingDecorator(move(p)) {}
    double cost() const override { return pizza->cost() + 2.0; }
    string description() const override {
        return pizza->description() + " + Extra Cheese";
    }
};

class Mushroom : public ToppingDecorator {
public:
    Mushroom(unique_ptr<Pizza> p) : ToppingDecorator(move(p)) {}
    double cost() const override { return pizza->cost() + 1.5; }
    string description() const override {
        return pizza->description() + " + Mushroom";
    }
};

class Jalapeno : public ToppingDecorator {
public:
    Jalapeno(unique_ptr<Pizza> p) : ToppingDecorator(move(p)) {}
    double cost() const override { return pizza->cost() + 1.0; }
    string description() const override {
        return pizza->description() + " + Jalapeno";
    }
};

// =================== ADAPTER PATTERN ===================
// Target interface (what our system expects)
class IMediaPlayer {
public:
    virtual void play(const string& filename) = 0;
    virtual ~IMediaPlayer() = default;
};

// Adaptee (legacy/third-party with different interface)
class VLCPlayer {
public:
    void playVLC(const string& file) {
        cout << "VLC playing: " << file << endl;
    }
};

class FFmpegPlayer {
public:
    void playFFmpeg(const string& file) {
        cout << "FFmpeg playing: " << file << endl;
    }
};

// Object Adapters
class VLCAdapter : public IMediaPlayer {
    VLCPlayer vlc;
public:
    void play(const string& filename) override {
        vlc.playVLC(filename);  // translate the call
    }
};

class FFmpegAdapter : public IMediaPlayer {
    FFmpegPlayer ffmpeg;
public:
    void play(const string& filename) override {
        ffmpeg.playFFmpeg(filename);
    }
};

// Client code works with IMediaPlayer only
class MusicApp {
    unique_ptr<IMediaPlayer> player;
public:
    void setPlayer(unique_ptr<IMediaPlayer> p) { player = move(p); }
    void playFile(const string& f) { player->play(f); }
};

int main() {
    // Decorator demo: stackable toppings
    unique_ptr<Pizza> order = make_unique<Margherita>();
    order = make_unique<ExtraCheese>(move(order));
    order = make_unique<Mushroom>(move(order));
    order = make_unique<Jalapeno>(move(order));
    cout << order->description() << endl;
    cout << "Total: \$" << order->cost() << endl;

    cout << "---" << endl;

    // Adapter demo: adapting different players
    MusicApp app;
    app.setPlayer(make_unique<VLCAdapter>());
    app.playFile("song.mp3");

    app.setPlayer(make_unique<FFmpegAdapter>());
    app.playFile("video.mkv");
    return 0;
}`,
          problems: [
            ["Design Browser History","https://leetcode.com/problems/design-browser-history/","Medium"],
            ["Flatten Nested List Iterator","https://leetcode.com/problems/flatten-nested-list-iterator/","Medium"],
            ["LRU Cache","https://leetcode.com/problems/lru-cache/","Medium"],
          ],
          mcqs: [
            {"q":"The Decorator pattern provides an alternative to:","o":["Encapsulation","Subclassing for extending functionality","Using interfaces","Static methods"],"a":1},
            {"q":"What distinguishes Adapter from Decorator?","o":["Adapter adds behaviour; Decorator changes interface","Adapter changes interface; Decorator adds behaviour","Both add behaviour","Both change interface"],"a":1},
            {"q":"Java I/O streams (BufferedReader wrapping InputStreamReader wrapping FileInputStream) is an example of:","o":["Adapter pattern","Strategy pattern","Decorator pattern","Observer pattern"],"a":2},
          ],
        },
        {
          t: "Builder & Command Pattern",
          learn: '<div class="learn-section"><div class="learn-h">Builder Pattern (Creational)</div><p class="learn-p">The Builder pattern separates the <b>construction of a complex object from its representation</b>, allowing the same construction process to create different representations. It is especially useful when an object has many optional parameters or requires a multi-step construction process.</p><p class="learn-p"><b>When to use Builder:</b></p><ul class="learn-list"><li>When constructors have too many parameters (telescoping constructor anti-pattern).</li><li>When construction involves multiple steps or optional fields.</li><li>When you want to construct different representations of a product.</li><li>When you need immutable objects built step by step.</li></ul></div><div class="learn-section"><div class="learn-h">Builder — The Problem It Solves</div><div class="learn-code">// Telescoping constructor anti-pattern\nclass Pizza {\npublic:\n    Pizza(string dough, string sauce, string cheese,\n          bool mushroom, bool onion, bool pepperoni,\n          bool olives, bool jalapeno);\n    // Which bool is which?? Error-prone!\n};\nPizza p("thin", "tomato", "mozzarella", true, false, true, false, true);</div><p class="learn-p">With 8 parameters and 5 booleans, it is nearly impossible to remember the order. The Builder pattern solves this by providing <b>named method calls</b> for each option.</p></div><div class="learn-section"><div class="learn-h">Builder — Implementation</div><div class="learn-code">class Pizza {\npublic:\n    string dough, sauce, cheese;\n    bool mushroom = false, onion = false, pepperoni = false;\n\n    class Builder {\n        Pizza pizza;\n    public:\n        Builder&amp; setDough(string d) { pizza.dough = d; return *this; }\n        Builder&amp; setSauce(string s) { pizza.sauce = s; return *this; }\n        Builder&amp; setCheese(string c) { pizza.cheese = c; return *this; }\n        Builder&amp; addMushroom() { pizza.mushroom = true; return *this; }\n        Builder&amp; addOnion() { pizza.onion = true; return *this; }\n        Builder&amp; addPepperoni() { pizza.pepperoni = true; return *this; }\n        Pizza build() { return pizza; }\n    };\n};\n\n// Usage — clear and readable\nPizza p = Pizza::Builder()\n    .setDough("thin")\n    .setSauce("tomato")\n    .setCheese("mozzarella")\n    .addMushroom()\n    .addPepperoni()\n    .build();</div><p class="learn-p">Each setter returns <code>Builder&amp;</code>, enabling <b>method chaining</b> (fluent interface). The final <code>build()</code> call produces the object.</p><div class="learn-tip"><b>Tip:</b> The Builder can also perform validation in the <code>build()</code> method, throwing an exception if the object would be in an invalid state (e.g., missing required fields).</div></div><div class="learn-section"><div class="learn-h">Builder — Director (GoF Variant)</div><p class="learn-p">The GoF version of Builder includes a <b>Director</b> that knows the construction steps. The Director orchestrates the Builder to produce a specific product:</p><div class="learn-code">class MealBuilder {\npublic:\n    virtual void buildMainCourse() = 0;\n    virtual void buildDrink() = 0;\n    virtual void buildDessert() = 0;\n    virtual Meal getResult() = 0;\n    virtual ~MealBuilder() = default;\n};\n\nclass Director {\npublic:\n    Meal constructMeal(MealBuilder&amp; builder) {\n        builder.buildMainCourse();\n        builder.buildDrink();\n        builder.buildDessert();\n        return builder.getResult();\n    }\n};</div><p class="learn-p">Different builders (VegMealBuilder, NonVegMealBuilder) produce different meals using the same construction steps.</p></div><div class="learn-section"><div class="learn-h">Command Pattern (Behavioural)</div><p class="learn-p">The Command pattern encapsulates a <b>request as an object</b>, thereby letting you parameterize clients with different requests, queue requests, log them, and support <b>undo/redo</b> operations.</p><p class="learn-p"><b>Key participants:</b></p><ul class="learn-list"><li><b>Command</b> — interface declaring <code>execute()</code> and optionally <code>undo()</code>.</li><li><b>Concrete Command</b> — binds a receiver to an action.</li><li><b>Receiver</b> — the object that performs the actual work.</li><li><b>Invoker</b> — asks the command to execute. Stores command history for undo.</li><li><b>Client</b> — creates commands and configures the invoker.</li></ul></div><div class="learn-section"><div class="learn-h">Command — When to Use</div><ul class="learn-list"><li><b>Undo/Redo</b> — text editors, drawing apps, transaction rollback.</li><li><b>Macro recording</b> — record a sequence of commands and replay them.</li><li><b>Task queues</b> — serialize commands and execute them later (job queues).</li><li><b>Decoupling</b> — the invoker doesn\'t know what the command does, only that it can <code>execute()</code>.</li><li><b>Transactional behaviour</b> — execute all or rollback all.</li></ul></div><div class="learn-section"><div class="learn-h">Command — Example: Text Editor with Undo</div><div class="learn-code">class ICommand {\npublic:\n    virtual void execute() = 0;\n    virtual void undo() = 0;\n    virtual ~ICommand() = default;\n};\n\nclass TextEditor {    // Receiver\n    string text;\npublic:\n    void insertText(const string&amp; t) { text += t; }\n    void deleteChars(int n) { text.erase(text.size() - n); }\n    string getText() const { return text; }\n};\n\nclass InsertCommand : public ICommand {\n    TextEditor&amp; editor;\n    string toInsert;\npublic:\n    InsertCommand(TextEditor&amp; e, string t) : editor(e), toInsert(t) {}\n    void execute() override { editor.insertText(toInsert); }\n    void undo() override    { editor.deleteChars(toInsert.size()); }\n};</div></div><div class="learn-section"><div class="learn-h">Command — The Invoker with History</div><div class="learn-code">class CommandManager {   // Invoker\n    stack&lt;unique_ptr&lt;ICommand&gt;&gt; history;\npublic:\n    void executeCommand(unique_ptr&lt;ICommand&gt; cmd) {\n        cmd-&gt;execute();\n        history.push(move(cmd));\n    }\n    void undo() {\n        if (!history.empty()) {\n            history.top()-&gt;undo();\n            history.pop();\n        }\n    }\n};</div><p class="learn-p">The <code>CommandManager</code> stores executed commands and can undo them in LIFO order. This is the standard implementation for undo/redo in editors.</p><div class="learn-tip"><b>Tip:</b> For redo support, maintain two stacks — one for undo history and one for redo. When undoing, move the command to the redo stack. When redoing, move it back.</div></div><div class="learn-section"><div class="learn-h">Builder vs Command — Quick Comparison</div><table class="learn-table"><tr><th>Aspect</th><th>Builder</th><th>Command</th></tr><tr><td>Category</td><td>Creational</td><td>Behavioural</td></tr><tr><td>Purpose</td><td>Construct complex objects step by step</td><td>Encapsulate requests as objects</td></tr><tr><td>Key benefit</td><td>Readable construction of multi-param objects</td><td>Undo/redo, queuing, logging of operations</td></tr><tr><td>Pattern</td><td>Returns the built product</td><td>Executes actions on receivers</td></tr></table><div class="learn-warn"><b>Warning:</b> Don\'t overuse the Command pattern for simple operations. It introduces indirection and complexity. Use it when you genuinely need undo/redo, queuing, or decoupling of invokers from receivers.</div></div>',
          code: `// ===== Builder & Command Pattern — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <stack>
#include <memory>
using namespace std;

// =================== BUILDER PATTERN ===================
class HttpRequest {
public:
    string method, url, body;
    vector<pair<string,string>> headers;
    int timeout = 30;
    bool followRedirects = true;

    void print() const {
        cout << method << " " << url << endl;
        for (auto& [k,v] : headers)
            cout << "  " << k << ": " << v << endl;
        if (!body.empty()) cout << "  Body: " << body << endl;
        cout << "  Timeout: " << timeout << "s" << endl;
        cout << "  Follow redirects: " << (followRedirects ? "yes" : "no") << endl;
    }

    class Builder {
        HttpRequest req;
    public:
        Builder(const string& method, const string& url) {
            req.method = method;
            req.url = url;
        }
        Builder& addHeader(const string& k, const string& v) {
            req.headers.push_back({k, v});
            return *this;
        }
        Builder& setBody(const string& body) {
            req.body = body;
            return *this;
        }
        Builder& setTimeout(int t) {
            req.timeout = t;
            return *this;
        }
        Builder& setFollowRedirects(bool f) {
            req.followRedirects = f;
            return *this;
        }
        HttpRequest build() {
            if (req.url.empty())
                throw invalid_argument("URL is required");
            return req;
        }
    };
};

// =================== COMMAND PATTERN ===================
// Receiver
class Light {
    string room;
    bool on = false;
    int brightness = 100;
public:
    Light(string r) : room(r) {}
    void turnOn()  { on = true;  cout << room << " light ON" << endl; }
    void turnOff() { on = false; cout << room << " light OFF" << endl; }
    void dim(int level) {
        brightness = level;
        cout << room << " light dimmed to " << level << "%" << endl;
    }
    void restore(int level) {
        brightness = level;
        cout << room << " light restored to " << level << "%" << endl;
    }
    int getBrightness() const { return brightness; }
};

// Command interface
class ICommand {
public:
    virtual void execute() = 0;
    virtual void undo() = 0;
    virtual ~ICommand() = default;
};

// Concrete commands
class TurnOnCommand : public ICommand {
    Light& light;
public:
    TurnOnCommand(Light& l) : light(l) {}
    void execute() override { light.turnOn(); }
    void undo()    override { light.turnOff(); }
};

class TurnOffCommand : public ICommand {
    Light& light;
public:
    TurnOffCommand(Light& l) : light(l) {}
    void execute() override { light.turnOff(); }
    void undo()    override { light.turnOn(); }
};

class DimCommand : public ICommand {
    Light& light;
    int newLevel, prevLevel;
public:
    DimCommand(Light& l, int level) : light(l), newLevel(level), prevLevel(0) {}
    void execute() override {
        prevLevel = light.getBrightness();
        light.dim(newLevel);
    }
    void undo() override { light.restore(prevLevel); }
};

// Invoker with undo support
class RemoteControl {
    stack<unique_ptr<ICommand>> history;
public:
    void press(unique_ptr<ICommand> cmd) {
        cmd->execute();
        history.push(move(cmd));
    }
    void undoLast() {
        if (!history.empty()) {
            cout << ">> UNDO: ";
            history.top()->undo();
            history.pop();
        }
    }
};

// Macro command (composite of commands)
class MacroCommand : public ICommand {
    vector<unique_ptr<ICommand>> commands;
public:
    void add(unique_ptr<ICommand> c) { commands.push_back(move(c)); }
    void execute() override {
        for (auto& c : commands) c->execute();
    }
    void undo() override {
        for (int i = commands.size() - 1; i >= 0; i--)
            commands[i]->undo();
    }
};

int main() {
    // Builder demo
    auto req = HttpRequest::Builder("POST", "https://api.example.com/data")
        .addHeader("Content-Type", "application/json")
        .addHeader("Authorization", "Bearer token123")
        .setBody(R"({"name": "test"})")
        .setTimeout(60)
        .build();
    req.print();

    cout << "
--- Command demo ---
";

    // Command demo
    Light bedroom("Bedroom");
    Light kitchen("Kitchen");
    RemoteControl remote;

    remote.press(make_unique<TurnOnCommand>(bedroom));
    remote.press(make_unique<DimCommand>(bedroom, 50));
    remote.press(make_unique<TurnOnCommand>(kitchen));

    cout << "
--- Undo sequence ---
";
    remote.undoLast();  // undo kitchen on
    remote.undoLast();  // undo bedroom dim
    remote.undoLast();  // undo bedroom on
    return 0;
}`,
          problems: [
            ["Implement Stack using Queues","https://leetcode.com/problems/implement-stack-using-queues/","Easy"],
            ["Min Stack","https://leetcode.com/problems/min-stack/","Medium"],
            ["Design Tic-Tac-Toe","https://leetcode.com/problems/design-tic-tac-toe/","Medium"],
          ],
          mcqs: [
            {"q":"The Builder pattern primarily solves the problem of:","o":["Too many subclasses","Telescoping constructors with many parameters","Thread-safety in object creation","Circular dependencies"],"a":1},
            {"q":"In the Command pattern, which component stores command history for undo?","o":["Receiver","Command","Invoker","Client"],"a":2},
            {"q":"Which is NOT a use case for the Command pattern?","o":["Undo/Redo operations","Task queuing","Object construction","Macro recording"],"a":2},
          ],
        },
        {
          t: 'State, Proxy & Chain of Responsibility',
          learn: '<div class="learn-section"><div class="learn-h">Three Essential GoF Patterns</div><p class="learn-p"><b>State</b> and <b>Chain of Responsibility</b> are behavioural; <b>Proxy</b> is structural. Together they cover state machines, access control, and request pipelines.</p></div><div class="learn-section"><div class="learn-h">State Pattern</div><p class="learn-p">Allows an object to <b>alter its behaviour when its internal state changes</b>. Eliminates large if-else/switch blocks by encapsulating each state in its own class.</p><table class="learn-table"><tr><th>Participant</th><th>Role</th></tr><tr><td>Context</td><td>Object whose behaviour varies (e.g., VendingMachine). Holds a pointer to current State.</td></tr><tr><td>State (interface)</td><td>Declares methods all concrete states must implement.</td></tr><tr><td>Concrete States</td><td>IdleState, HasCoinState, DispensingState, OutOfStockState — each handles transitions.</td></tr></table><div class="learn-code">Vending Machine State Transitions:\n\n  Idle ──insertCoin──► HasCoin ──selectProduct──► Dispensing\n   ▲                                                │\n   └────────── (stock > 0) ◄── dispense() ──────────┘\n                                    │\n                              (stock == 0)\n                                    │\n                                    ▼\n                              OutOfStock</div><div class="learn-tip"><b>Tip:</b> If methods are full of <code>if (state == X) ... else if (state == Y)</code>, refactor to the State pattern. OCP satisfied — adding MaintenanceMode only requires a new class.</div></div><div class="learn-section"><div class="learn-h">Proxy Pattern</div><p class="learn-p">Provides a <b>surrogate or placeholder</b> to control access. Has the same interface as the real object.</p><ul class="learn-list"><li><b>Caching Proxy</b> — caches expensive operation results</li><li><b>Protection Proxy</b> — checks permissions before forwarding</li><li><b>Remote Proxy</b> — represents object in different address space (RPC stub)</li><li><b>Virtual Proxy</b> — lazy initialization of expensive objects</li><li><b>Logging Proxy</b> — logs all calls before forwarding</li></ul><div class="learn-warn"><b>Proxy vs Decorator:</b> Structurally identical (both wrap same interface). Difference is intent: Proxy controls <b>access</b>; Decorator adds <b>new behaviour</b>.</div></div><div class="learn-section"><div class="learn-h">Chain of Responsibility (CoR)</div><p class="learn-p">Passes a request along a <b>chain of handlers</b>. Each handler either processes the request or passes it to the next.</p><ul class="learn-list"><li><b>Middleware in Express/Koa</b> — each calls <code>next()</code></li><li><b>Logging levels</b> — DEBUG → INFO → ERROR handlers</li><li><b>DOM event bubbling</b> — propagates until handled</li><li><b>Approval workflows</b> — Manager → Director → VP by amount</li></ul></div><div class="learn-section"><div class="learn-h">When to Use Each</div><table class="learn-table"><tr><th>Pattern</th><th>Use When</th><th>Key Benefit</th><th>Example</th></tr><tr><td>State</td><td>Behaviour depends on internal state</td><td>Eliminates conditionals</td><td>Vending machine, TCP connection</td></tr><tr><td>Proxy</td><td>Control access / caching / lazy init</td><td>Transparent access control</td><td>Caching proxy, image placeholder</td></tr><tr><td>CoR</td><td>Multiple handlers, unknown a priori</td><td>Dynamic request processing</td><td>Middleware, approval chain</td></tr></table></div>',
          code: `// ===== State, Proxy & Chain of Responsibility =====
#include <iostream>
#include <string>
#include <memory>
#include <unordered_map>
using namespace std;

// ========== STATE PATTERN — Vending Machine ==========
class VendingMachine;
class IState {
public:
    virtual void insertCoin(VendingMachine& vm) = 0;
    virtual void selectProduct(VendingMachine& vm) = 0;
    virtual void dispense(VendingMachine& vm) = 0;
    virtual string name() const = 0;
    virtual ~IState() = default;
};
class IdleState : public IState {
public:
    void insertCoin(VendingMachine& vm) override;
    void selectProduct(VendingMachine&) override { cout << "[Idle] Insert coin first!" << endl; }
    void dispense(VendingMachine&) override {}
    string name() const override { return "Idle"; }
};
class HasCoinState : public IState {
public:
    void insertCoin(VendingMachine&) override { cout << "[HasCoin] Returning extra coin." << endl; }
    void selectProduct(VendingMachine& vm) override;
    void dispense(VendingMachine&) override {}
    string name() const override { return "HasCoin"; }
};
class DispensingState : public IState {
public:
    void insertCoin(VendingMachine&) override { cout << "[Dispensing] Wait..." << endl; }
    void selectProduct(VendingMachine&) override { cout << "[Dispensing] Wait..." << endl; }
    void dispense(VendingMachine& vm) override;
    string name() const override { return "Dispensing"; }
};
class OutOfStockState : public IState {
public:
    void insertCoin(VendingMachine&) override { cout << "[OutOfStock] Refunding." << endl; }
    void selectProduct(VendingMachine&) override { cout << "[OutOfStock] Empty." << endl; }
    void dispense(VendingMachine&) override {}
    string name() const override { return "OutOfStock"; }
};
class VendingMachine {
    unique_ptr<IState> state; int stock;
public:
    VendingMachine(int s) : stock(s) { state = make_unique<IdleState>(); }
    void setState(unique_ptr<IState> s) { state = move(s); }
    int getStock() const { return stock; }
    void decrementStock() { --stock; }
    void insertCoin()    { state->insertCoin(*this); }
    void selectProduct() { state->selectProduct(*this); }
    void dispense()      { state->dispense(*this); }
};
void IdleState::insertCoin(VendingMachine& vm) {
    cout << "[Idle] Coin inserted." << endl;
    vm.setState(make_unique<HasCoinState>());
}
void HasCoinState::selectProduct(VendingMachine& vm) {
    if (vm.getStock() > 0) { vm.setState(make_unique<DispensingState>()); vm.dispense(); }
    else { vm.setState(make_unique<OutOfStockState>()); }
}
void DispensingState::dispense(VendingMachine& vm) {
    vm.decrementStock(); cout << "[Dispensing] Done!" << endl;
    vm.setState(vm.getStock() > 0
        ? unique_ptr<IState>(make_unique<IdleState>())
        : unique_ptr<IState>(make_unique<OutOfStockState>()));
}

// ========== PROXY — Caching Proxy ==========
class IDataService {
public:
    virtual string fetch(const string& key) = 0;
    virtual ~IDataService() = default;
};
class RealDB : public IDataService {
public:
    string fetch(const string& key) override {
        cout << "  [DB] Query: " << key << endl; return "data_" + key;
    }
};
class CachingProxy : public IDataService {
    RealDB db; unordered_map<string, string> cache;
public:
    string fetch(const string& key) override {
        auto it = cache.find(key);
        if (it != cache.end()) { cout << "  [CACHE HIT] " << key << endl; return it->second; }
        string v = db.fetch(key); cache[key] = v; return v;
    }
};

// ========== CHAIN OF RESPONSIBILITY ==========
struct Request { string user, token, body; int cnt; };
class Handler {
    shared_ptr<Handler> next;
public:
    void setNext(shared_ptr<Handler> h) { next = h; }
    virtual bool handle(Request& r) { return next ? next->handle(r) : true; }
    virtual ~Handler() = default;
};
class AuthHandler : public Handler {
public:
    bool handle(Request& r) override {
        if (r.token.empty()) { cout << "[Auth] REJECTED" << endl; return false; }
        cout << "[Auth] OK" << endl; return Handler::handle(r);
    }
};
class RateLimitHandler : public Handler {
    int lim;
public:
    RateLimitHandler(int l) : lim(l) {}
    bool handle(Request& r) override {
        if (r.cnt > lim) { cout << "[Rate] REJECTED" << endl; return false; }
        cout << "[Rate] OK" << endl; return Handler::handle(r);
    }
};

int main() {
    VendingMachine vm(1);
    vm.insertCoin(); vm.selectProduct();
    vm.insertCoin(); // refunded — out of stock

    CachingProxy proxy;
    proxy.fetch("user1"); proxy.fetch("user1"); // HIT

    auto auth = make_shared<AuthHandler>();
    auto rate = make_shared<RateLimitHandler>(100);
    auth->setNext(rate);
    Request ok{"alice","t","GET /",5}; auth->handle(ok);
    Request bad{"bob","","GET /",1};   auth->handle(bad);
    return 0;
}`,
          problems: [
            ['Design Vending Machine (State)', '#', 'Medium'],
            ['LRU Cache (Proxy/Cache)', 'https://leetcode.com/problems/lru-cache/', 'Medium'],
            ['Design Browser History', 'https://leetcode.com/problems/design-browser-history/', 'Medium']
          ],
          mcqs: [
            {q: 'In the State pattern, where is transition logic defined?', o: ['In the client code', 'In each concrete state class', 'In the context class only', 'In a config file'], a: 1},
            {q: 'Which pattern provides a surrogate to control access to another object?', o: ['Decorator', 'Adapter', 'Proxy', 'Facade'], a: 2},
            {q: 'Chain of Responsibility differs from simple if-else because:', o: ['It is faster', 'Handlers can be added/removed/reordered at runtime', 'It uses less memory', 'It only works with 3 handlers'], a: 1}
          ]
        },
        {
          t: "Design Parking Lot",
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Design a <b>Parking Lot system</b> that supports multiple floors, different vehicle sizes, ticketing, and payment. This is one of the most commonly asked LLD interview questions at companies like Amazon, Google, and DE Shaw.</p><p class="learn-p"><b>Key requirements to clarify in interview:</b></p><ul class="learn-list"><li>Multiple floors, each with multiple spots.</li><li>Different vehicle types: Motorcycle, Car, Truck (Bus).</li><li>Different spot sizes: Small, Medium, Large.</li><li>A motorcycle can park in any spot; a car in Medium or Large; a truck only in Large.</li><li>Ticketing system — issue a ticket on entry, calculate fee on exit.</li><li>Payment — hourly rate based on vehicle type.</li><li>Display board showing available spots per floor.</li></ul></div><div class="learn-section"><div class="learn-h">Identifying Classes &amp; Relationships</div><p class="learn-p">Think about the <b>nouns</b> in the requirements — these become classes:</p><ul class="learn-list"><li><b>ParkingLot</b> — the top-level singleton managing everything.</li><li><b>ParkingFloor</b> — a single level with spots and a display board.</li><li><b>ParkingSpot</b> — an individual spot (Small, Medium, Large).</li><li><b>Vehicle</b> — base class with subtypes (Motorcycle, Car, Truck).</li><li><b>Ticket</b> — issued on entry, records vehicle, spot, entry time.</li><li><b>Payment</b> — calculates the fee based on duration and vehicle type.</li><li><b>EntrancePanel</b> / <b>ExitPanel</b> — entry and exit gates.</li><li><b>DisplayBoard</b> — shows available spots per floor.</li></ul></div><div class="learn-section"><div class="learn-h">Design Patterns Used</div><table class="learn-table"><tr><th>Pattern</th><th>Where</th><th>Why</th></tr><tr><td>Singleton</td><td>ParkingLot</td><td>Only one parking lot instance</td></tr><tr><td>Strategy</td><td>ParkingStrategy</td><td>Different spot assignment algorithms (nearest, spread-out)</td></tr><tr><td>Factory</td><td>VehicleFactory</td><td>Create vehicle objects from type strings</td></tr><tr><td>Observer</td><td>DisplayBoard</td><td>Update available count when spots change</td></tr></table></div><div class="learn-section"><div class="learn-h">Spot Assignment Logic</div><p class="learn-p">A key design decision is <b>how to assign spots</b>. Common strategies:</p><ul class="learn-list"><li><b>Nearest to entrance</b> — minimise walk distance; use a min-heap per spot type.</li><li><b>Even distribution</b> — spread vehicles across floors for load balancing.</li><li><b>Compact packing</b> — fill one floor before moving to the next.</li></ul><div class="learn-code">class IParkingStrategy {\npublic:\n    virtual ParkingSpot* findSpot(Vehicle* v, vector&lt;ParkingFloor*&gt;&amp; floors) = 0;\n    virtual ~IParkingStrategy() = default;\n};</div><p class="learn-p">Using the Strategy pattern lets you switch algorithms without changing the ParkingLot class.</p></div><div class="learn-section"><div class="learn-h">Ticket &amp; Payment</div><p class="learn-p">When a vehicle enters:</p><ol class="learn-list"><li>EntrancePanel calls <code>ParkingLot::getTicket(vehicle)</code>.</li><li>System finds an available spot matching the vehicle size.</li><li>A <code>Ticket</code> is created with: ticket ID, vehicle info, spot, entry timestamp.</li><li>The spot is marked as occupied; the display board is updated.</li></ol><p class="learn-p">When a vehicle exits:</p><ol class="learn-list"><li>ExitPanel scans the ticket.</li><li>Duration = exit time - entry time.</li><li>Fee = duration * hourly rate (based on vehicle type).</li><li>Payment is processed (cash, card, UPI).</li><li>The spot is freed; the display board is updated.</li></ol><div class="learn-tip"><b>Tip:</b> In interviews, mention thread-safety — multiple entrance gates may try to assign the same spot simultaneously. Use a mutex or atomic CAS on spot assignment.</div></div><div class="learn-section"><div class="learn-h">Handling Concurrency</div><p class="learn-p">A parking lot is inherently concurrent — multiple cars enter/exit simultaneously. Key considerations:</p><ul class="learn-list"><li><b>Spot assignment</b> must be atomic — use a lock or concurrent data structure.</li><li><b>Ticket generation</b> — use atomic increment for ticket IDs.</li><li><b>Display board updates</b> — can be eventually consistent (slight delay is OK).</li></ul><div class="learn-warn"><b>Warning:</b> Don\'t forget to discuss thread-safety in your interview. Even if the interviewer doesn\'t ask, mentioning it shows you think about production systems.</div></div><div class="learn-section"><div class="learn-h">Extensibility</div><p class="learn-p">A good design should easily support:</p><ul class="learn-list"><li>Adding new vehicle types (EV with charging) — add a subclass of Vehicle.</li><li>Adding new spot types (EV charging spot) — add a subclass of ParkingSpot.</li><li>Adding new payment methods — Strategy pattern for payment.</li><li>Adding handicapped spots, reserved spots — boolean flags on ParkingSpot.</li><li>Variable pricing (surge pricing, weekend rates) — Strategy for pricing.</li></ul></div>',
          code: `// ===== Design Parking Lot — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <memory>
#include <ctime>
#include <mutex>
using namespace std;

// ---------- Enums ----------
enum class VehicleType { MOTORCYCLE, CAR, TRUCK };
enum class SpotSize    { SMALL, MEDIUM, LARGE };

// ---------- Vehicle Hierarchy ----------
class Vehicle {
protected:
    string licensePlate;
    VehicleType type;
public:
    Vehicle(string lp, VehicleType t) : licensePlate(lp), type(t) {}
    VehicleType getType() const { return type; }
    string getPlate() const { return licensePlate; }
    virtual SpotSize requiredSize() const = 0;
    virtual ~Vehicle() = default;
};
class Motorcycle : public Vehicle {
public:
    Motorcycle(string lp) : Vehicle(lp, VehicleType::MOTORCYCLE) {}
    SpotSize requiredSize() const override { return SpotSize::SMALL; }
};
class Car : public Vehicle {
public:
    Car(string lp) : Vehicle(lp, VehicleType::CAR) {}
    SpotSize requiredSize() const override { return SpotSize::MEDIUM; }
};
class Truck : public Vehicle {
public:
    Truck(string lp) : Vehicle(lp, VehicleType::TRUCK) {}
    SpotSize requiredSize() const override { return SpotSize::LARGE; }
};

// ---------- Parking Spot ----------
class ParkingSpot {
    int id, floor;
    SpotSize size;
    Vehicle* parkedVehicle = nullptr;
public:
    ParkingSpot(int id, int floor, SpotSize sz)
        : id(id), floor(floor), size(sz) {}
    bool isAvailable() const { return parkedVehicle == nullptr; }
    bool canFit(Vehicle* v) const {
        return isAvailable() && size >= v->requiredSize();
    }
    void park(Vehicle* v)   { parkedVehicle = v; }
    void unpark()           { parkedVehicle = nullptr; }
    int getId() const       { return id; }
    int getFloor() const    { return floor; }
    SpotSize getSize() const { return size; }
};

// ---------- Ticket ----------
class Ticket {
    static int nextId;
    int ticketId;
    Vehicle* vehicle;
    ParkingSpot* spot;
    time_t entryTime;
public:
    Ticket(Vehicle* v, ParkingSpot* s)
        : ticketId(nextId++), vehicle(v), spot(s), entryTime(time(0)) {}
    int getId() const          { return ticketId; }
    Vehicle* getVehicle() const { return vehicle; }
    ParkingSpot* getSpot() const { return spot; }
    time_t getEntryTime() const  { return entryTime; }
};
int Ticket::nextId = 1;

// ---------- Rate Calculator (Strategy) ----------
class IRateCalculator {
public:
    virtual double calculate(VehicleType type, double hours) = 0;
    virtual ~IRateCalculator() = default;
};
class StandardRate : public IRateCalculator {
public:
    double calculate(VehicleType type, double hours) override {
        double rate = 0;
        switch (type) {
            case VehicleType::MOTORCYCLE: rate = 10; break;
            case VehicleType::CAR:        rate = 20; break;
            case VehicleType::TRUCK:      rate = 30; break;
        }
        return rate * hours;
    }
};

// ---------- Parking Lot (Singleton) ----------
class ParkingLot {
    vector<vector<ParkingSpot>> floors;
    unordered_map<int, unique_ptr<Ticket>> activeTickets;
    unique_ptr<IRateCalculator> rateCalc;
    mutex mtx;

    ParkingLot() : rateCalc(make_unique<StandardRate>()) {}
public:
    static ParkingLot& getInstance() {
        static ParkingLot instance;
        return instance;
    }
    void init(int numFloors, int spotsPerFloor) {
        floors.clear();
        for (int f = 0; f < numFloors; f++) {
            vector<ParkingSpot> spots;
            for (int i = 0; i < spotsPerFloor; i++) {
                SpotSize sz = (i % 3 == 0) ? SpotSize::SMALL
                    : (i % 3 == 1) ? SpotSize::MEDIUM : SpotSize::LARGE;
                spots.emplace_back(f * spotsPerFloor + i, f, sz);
            }
            floors.push_back(move(spots));
        }
    }

    Ticket* parkVehicle(Vehicle* v) {
        lock_guard<mutex> lock(mtx);
        for (auto& floor : floors) {
            for (auto& spot : floor) {
                if (spot.canFit(v)) {
                    spot.park(v);
                    auto ticket = make_unique<Ticket>(v, &spot);
                    int tid = ticket->getId();
                    activeTickets[tid] = move(ticket);
                    cout << "Parked " << v->getPlate()
                         << " at floor " << spot.getFloor()
                         << " spot " << spot.getId()
                         << " | Ticket #" << tid << endl;
                    return activeTickets[tid].get();
                }
            }
        }
        cout << "No spot available for " << v->getPlate() << endl;
        return nullptr;
    }

    double unparkVehicle(int ticketId) {
        lock_guard<mutex> lock(mtx);
        auto it = activeTickets.find(ticketId);
        if (it == activeTickets.end()) return -1;
        auto* ticket = it->second.get();
        double hours = difftime(time(0), ticket->getEntryTime()) / 3600.0;
        if (hours < 1) hours = 1; // minimum 1 hour
        double fee = rateCalc->calculate(ticket->getVehicle()->getType(), hours);
        ticket->getSpot()->unpark();
        cout << "Unparked " << ticket->getVehicle()->getPlate()
             << " | Fee: \$" << fee << endl;
        activeTickets.erase(it);
        return fee;
    }

    ParkingLot(const ParkingLot&) = delete;
    ParkingLot& operator=(const ParkingLot&) = delete;
};

int main() {
    auto& lot = ParkingLot::getInstance();
    lot.init(2, 6);   // 2 floors, 6 spots each

    Car c1("CAR-001"), c2("CAR-002");
    Motorcycle m1("MOTO-001");
    Truck t1("TRUCK-001");

    auto* t1_ticket = lot.parkVehicle(&c1);
    lot.parkVehicle(&m1);
    lot.parkVehicle(&t1);
    lot.parkVehicle(&c2);

    if (t1_ticket) lot.unparkVehicle(t1_ticket->getId());
    return 0;
}`,
          problems: [
            ["Design Parking System","https://leetcode.com/problems/design-parking-system/","Easy"],
            ["Design HashMap","https://leetcode.com/problems/design-hashmap/","Easy"],
            ["Design Underground System","https://leetcode.com/problems/design-underground-system/","Medium"],
          ],
          mcqs: [
            {"q":"Which design pattern is most suitable for the ParkingLot class to ensure only one instance exists?","o":["Factory","Singleton","Observer","Strategy"],"a":1},
            {"q":"In the Parking Lot design, different spot assignment algorithms (nearest, spread) are best handled by:","o":["Inheritance","Strategy pattern","Singleton pattern","Template method"],"a":1},
            {"q":"Why is thread-safety important in a parking lot system?","o":["To make the code compile faster","Multiple entry gates may try to assign the same spot simultaneously","To reduce memory usage","To support different vehicle types"],"a":1},
          ],
        },
        {
          t: "Design BookMyShow",
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Design an <b>online movie ticket booking system</b> (like BookMyShow or Fandango). This is a popular LLD question that tests your ability to handle <b>concurrent seat selection</b>, <b>booking workflows</b>, and <b>payment integration</b>.</p><p class="learn-p"><b>Functional Requirements:</b></p><ul class="learn-list"><li>Search movies by city, genre, language.</li><li>View available shows for a movie at different theatres.</li><li>View seating arrangement and select seats.</li><li>Book seats with temporary hold (lock) during payment.</li><li>Process payment and confirm booking.</li><li>Cancel booking and release seats.</li><li>Notify user via email/SMS on booking/cancellation.</li></ul></div><div class="learn-section"><div class="learn-h">Key Entities</div><ul class="learn-list"><li><b>Movie</b> — title, genre, language, duration, rating.</li><li><b>Theatre</b> — name, city, address, list of screens.</li><li><b>Screen</b> — screen number, list of seats, capacity.</li><li><b>Seat</b> — row, number, type (Regular, Premium, VIP), price.</li><li><b>Show</b> — movie + screen + time slot. Links a movie to a specific screen at a specific time.</li><li><b>Booking</b> — user, show, list of seats, status, payment info.</li><li><b>User</b> — name, email, phone, booking history.</li><li><b>Payment</b> — amount, method, status, transaction ID.</li></ul></div><div class="learn-section"><div class="learn-h">Core Design Challenge: Concurrent Seat Booking</div><p class="learn-p">The hardest part of BookMyShow is handling <b>concurrent seat selection</b>. Two users should not be able to book the same seat for the same show. There are two common approaches:</p><p class="learn-p"><b>Approach 1: Pessimistic Locking (Seat Hold)</b></p><ul class="learn-list"><li>When a user selects seats, those seats are <b>temporarily locked</b> (held) for a fixed duration (e.g., 10 minutes).</li><li>If payment completes within the hold period, the booking is confirmed.</li><li>If the hold expires (user abandons), the seats are released automatically.</li><li>Other users see held seats as "unavailable" during the hold period.</li></ul><div class="learn-code">enum class SeatStatus { AVAILABLE, HELD, BOOKED };\n\nclass ShowSeat {\n    Seat* seat;\n    SeatStatus status = SeatStatus::AVAILABLE;\n    time_t holdExpiry = 0;\n    string heldByUserId;\npublic:\n    bool hold(const string&amp; userId, int holdSeconds) {\n        if (status != SeatStatus::AVAILABLE) return false;\n        status = SeatStatus::HELD;\n        heldByUserId = userId;\n        holdExpiry = time(0) + holdSeconds;\n        return true;\n    }\n    void confirm() { status = SeatStatus::BOOKED; }\n    void release() { status = SeatStatus::AVAILABLE; heldByUserId = ""; }\n    bool isHoldExpired() { return status == SeatStatus::HELD &amp;&amp; time(0) &gt; holdExpiry; }\n};</div><p class="learn-p"><b>Approach 2: Optimistic Locking (DB-level)</b></p><ul class="learn-list"><li>No holds at selection time — any user can select any available seat.</li><li>At payment time, use a database-level <code>WHERE status = AVAILABLE</code> update with a version check.</li><li>If the update affects 0 rows, the seat was taken — transaction fails.</li></ul><div class="learn-tip"><b>Tip:</b> BookMyShow and most real systems use <b>pessimistic locking with a timer</b>. This gives users a better UX — they see which seats are truly available, not seats that might fail at checkout.</div></div><div class="learn-section"><div class="learn-h">Design Patterns Used</div><table class="learn-table"><tr><th>Pattern</th><th>Where</th><th>Why</th></tr><tr><td>Strategy</td><td>PaymentStrategy</td><td>Multiple payment methods (card, UPI, wallet)</td></tr><tr><td>Observer</td><td>NotificationService</td><td>Notify user on booking confirmation/cancellation</td></tr><tr><td>Factory</td><td>SeatFactory</td><td>Create different seat types with appropriate pricing</td></tr><tr><td>State</td><td>BookingStatus</td><td>Booking transitions: PENDING → CONFIRMED → CANCELLED</td></tr></table></div><div class="learn-section"><div class="learn-h">Booking Workflow</div><ol class="learn-list"><li>User selects city &rarr; sees movies.</li><li>User selects movie &rarr; sees theatres and shows.</li><li>User selects show &rarr; sees seat map with availability.</li><li>User selects seats &rarr; system creates HOLD on selected seats (10 min timer starts).</li><li>User makes payment &rarr; if success, booking confirmed, seats marked BOOKED.</li><li>If payment fails or timer expires &rarr; seats released back to AVAILABLE.</li><li>Confirmation notification sent (email/SMS).</li></ol></div><div class="learn-section"><div class="learn-h">Pricing Strategy</div><p class="learn-p">Seat pricing can vary by:</p><ul class="learn-list"><li><b>Seat type</b> — Regular ($10), Premium ($15), VIP ($25).</li><li><b>Show time</b> — matinee discounts, weekend surcharges.</li><li><b>Demand</b> — dynamic pricing based on fill rate.</li></ul><p class="learn-p">Use the <b>Strategy pattern</b> for pricing calculation so that different pricing algorithms can be swapped.</p></div><div class="learn-section"><div class="learn-h">Scalability Considerations</div><ul class="learn-list"><li><b>Database partitioning</b> — shard by city or theatre for scalability.</li><li><b>Caching</b> — cache movie listings and show schedules (read-heavy).</li><li><b>Message queue</b> — async notification sending (don\'t block booking flow).</li><li><b>Distributed locks</b> — for seat holds across multiple app servers, use Redis/DB locks.</li></ul><div class="learn-warn"><b>Warning:</b> In an LLD interview, focus on class design, not distributed systems. But mentioning these briefly shows awareness of production concerns.</div></div>',
          code: `// ===== Design BookMyShow — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <memory>
#include <ctime>
#include <mutex>
using namespace std;

// ---------- Enums ----------
enum class SeatType   { REGULAR, PREMIUM, VIP };
enum class SeatStatus { AVAILABLE, HELD, BOOKED };
enum class BookingStatus { PENDING, CONFIRMED, CANCELLED };

// ---------- Seat ----------
class Seat {
    int row, number;
    SeatType type;
    double price;
public:
    Seat(int r, int n, SeatType t, double p)
        : row(r), number(n), type(t), price(p) {}
    int getRow() const { return row; }
    int getNumber() const { return number; }
    double getPrice() const { return price; }
    string getId() const {
        return to_string(row) + "-" + to_string(number);
    }
};

// ---------- Show Seat (per-show seat status) ----------
class ShowSeat {
    Seat* seat;
    SeatStatus status = SeatStatus::AVAILABLE;
    time_t holdExpiry = 0;
    string heldBy;
public:
    ShowSeat(Seat* s) : seat(s) {}
    bool isAvailable() const {
        if (status == SeatStatus::HELD && time(0) > holdExpiry)
            return true;  // hold expired
        return status == SeatStatus::AVAILABLE;
    }
    bool hold(const string& userId, int secs = 600) {
        if (!isAvailable()) return false;
        status = SeatStatus::HELD;
        heldBy = userId;
        holdExpiry = time(0) + secs;
        return true;
    }
    void confirm() { status = SeatStatus::BOOKED; }
    void release() {
        status = SeatStatus::AVAILABLE;
        heldBy = "";
    }
    Seat* getSeat() const { return seat; }
    SeatStatus getStatus() const { return status; }
};

// ---------- Movie ----------
class Movie {
    string title, genre, language;
    int durationMin;
public:
    Movie(string t, string g, string l, int d)
        : title(t), genre(g), language(l), durationMin(d) {}
    string getTitle() const { return title; }
};

// ---------- Show ----------
class Show {
    Movie* movie;
    string showTime;
    vector<ShowSeat> seats;
    mutex mtx;
public:
    Show(Movie* m, string time, vector<Seat*>& seatList)
        : movie(m), showTime(time) {
        for (auto* s : seatList) seats.emplace_back(s);
    }
    Movie* getMovie() const { return movie; }
    string getTime() const { return showTime; }

    vector<ShowSeat*> getAvailable() {
        vector<ShowSeat*> avail;
        for (auto& ss : seats)
            if (ss.isAvailable()) avail.push_back(&ss);
        return avail;
    }
    bool holdSeats(vector<int>& indices, const string& userId) {
        lock_guard<mutex> lock(mtx);
        // Check all requested seats are available
        for (int i : indices)
            if (!seats[i].isAvailable()) return false;
        // Hold all
        for (int i : indices) seats[i].hold(userId);
        return true;
    }
    void confirmSeats(vector<int>& indices) {
        lock_guard<mutex> lock(mtx);
        for (int i : indices) seats[i].confirm();
    }
    void releaseSeats(vector<int>& indices) {
        lock_guard<mutex> lock(mtx);
        for (int i : indices) seats[i].release();
    }
};

// ---------- Booking ----------
class Booking {
    static int nextId;
    int bookingId;
    string userId;
    Show* show;
    vector<int> seatIndices;
    double totalAmount;
    BookingStatus status;
public:
    Booking(string uid, Show* s, vector<int> si, double amt)
        : bookingId(nextId++), userId(uid), show(s),
          seatIndices(si), totalAmount(amt),
          status(BookingStatus::PENDING) {}

    bool confirm() {
        show->confirmSeats(seatIndices);
        status = BookingStatus::CONFIRMED;
        cout << "Booking #" << bookingId << " CONFIRMED. Total: \$"
             << totalAmount << endl;
        return true;
    }
    void cancel() {
        show->releaseSeats(seatIndices);
        status = BookingStatus::CANCELLED;
        cout << "Booking #" << bookingId << " CANCELLED." << endl;
    }
    int getId() const { return bookingId; }
};
int Booking::nextId = 1;

// ---------- Payment (Strategy) ----------
class IPayment {
public:
    virtual bool pay(double amount) = 0;
    virtual ~IPayment() = default;
};
class CardPayment : public IPayment {
public:
    bool pay(double amount) override {
        cout << "Card charged: \$" << amount << endl;
        return true;
    }
};
class UPIPayment : public IPayment {
public:
    bool pay(double amount) override {
        cout << "UPI paid: \$" << amount << endl;
        return true;
    }
};

int main() {
    // Setup
    Movie m("Inception", "Sci-Fi", "English", 148);
    vector<Seat> rawSeats = {
        {1,1,SeatType::REGULAR,10}, {1,2,SeatType::REGULAR,10},
        {1,3,SeatType::PREMIUM,15}, {2,1,SeatType::PREMIUM,15},
        {2,2,SeatType::VIP,25},     {2,3,SeatType::VIP,25}
    };
    vector<Seat*> seatPtrs;
    for (auto& s : rawSeats) seatPtrs.push_back(&s);

    Show show(&m, "7:00 PM", seatPtrs);

    // User selects seats 0 and 1 (Regular)
    vector<int> selected = {0, 1};
    if (show.holdSeats(selected, "user_alice")) {
        cout << "Seats held for Alice." << endl;
        double total = 20.0;  // 2x \$10
        Booking booking("user_alice", &show, selected, total);

        // Process payment
        CardPayment payment;
        if (payment.pay(total)) {
            booking.confirm();
        } else {
            booking.cancel();
        }
    }

    // Another user tries the same seats
    if (!show.holdSeats(selected, "user_bob")) {
        cout << "Bob: Seats already taken!" << endl;
    }
    return 0;
}`,
          problems: [
            ["Design Movie Rental System","https://leetcode.com/problems/design-movie-rental-system/","Hard"],
            ["Seat Reservation Manager","https://leetcode.com/problems/seat-reservation-manager/","Medium"],
            ["Design a Number Container System","https://leetcode.com/problems/design-a-number-container-system/","Medium"],
          ],
          mcqs: [
            {"q":"To prevent two users from booking the same seat, BookMyShow primarily uses:","o":["Optimistic locking only","Pessimistic locking with a timed hold","No locking — first payment wins","Global mutex on the entire system"],"a":1},
            {"q":"Which pattern best handles multiple payment methods (Card, UPI, Wallet) in BookMyShow?","o":["Singleton","Observer","Strategy","Decorator"],"a":2},
            {"q":"When a seat hold expires without payment, the correct action is:","o":["Delete the seat from the database","Mark the seat as BOOKED","Release the seat back to AVAILABLE","Notify all other users"],"a":2},
          ],
        },
        {
          t: "Design Splitwise",
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Design a <b>Splitwise-like expense sharing system</b>. This is a very popular LLD interview question that tests your ability to model complex financial relationships and apply OOP principles.</p><p class="learn-p"><b>Functional Requirements:</b></p><ul class="learn-list"><li>Users can create groups and add other users.</li><li>Any user can add an expense to a group.</li><li>Expenses can be split in different ways: <b>Equal</b>, <b>Exact amounts</b>, <b>Percentage-based</b>.</li><li>Show balances between any two users.</li><li>Show a user\'s overall balance (net amount owed or owing).</li><li>Simplify debts within a group (minimize transactions).</li></ul></div><div class="learn-section"><div class="learn-h">Key Entities</div><ul class="learn-list"><li><b>User</b> — ID, name, email, phone.</li><li><b>Group</b> — ID, name, list of members, list of expenses.</li><li><b>Expense</b> — ID, description, total amount, paid by (user), split among (users), split type.</li><li><b>Split</b> — abstract base for different split strategies (EqualSplit, ExactSplit, PercentSplit).</li><li><b>BalanceSheet</b> — tracks who owes whom how much.</li></ul></div><div class="learn-section"><div class="learn-h">Split Strategies (Strategy Pattern)</div><p class="learn-p">The core design challenge is supporting different split types. This is a perfect use case for the <b>Strategy pattern</b>:</p><div class="learn-code">class ISplitStrategy {\npublic:\n    virtual unordered_map&lt;string, double&gt;\n        split(double totalAmount, const vector&lt;string&gt;&amp; users) = 0;\n    virtual ~ISplitStrategy() = default;\n};</div><p class="learn-p"><b>EqualSplit:</b> Total / N for each participant.</p><div class="learn-code">class EqualSplit : public ISplitStrategy {\npublic:\n    unordered_map&lt;string, double&gt;\n    split(double total, const vector&lt;string&gt;&amp; users) override {\n        double share = total / users.size();\n        unordered_map&lt;string, double&gt; result;\n        for (auto&amp; u : users) result[u] = share;\n        return result;\n    }\n};</div><p class="learn-p"><b>ExactSplit:</b> Each participant\'s share is specified explicitly.</p><p class="learn-p"><b>PercentSplit:</b> Each participant pays a percentage of the total.</p><div class="learn-warn"><b>Warning:</b> Always validate splits — exact amounts must sum to total; percentages must sum to 100%. Mention validation in your interview answer.</div></div><div class="learn-section"><div class="learn-h">Balance Sheet Design</div><p class="learn-p">The balance sheet tracks pairwise debts. For each expense where user A pays and user B owes a share:</p><div class="learn-code">// balances[A][B] += share;   // B owes A this much\n// balances[B][A] -= share;   // equivalently, A is owed by B</div><p class="learn-p">A cleaner approach uses a single <b>net balance</b> per user pair. If <code>balance[A][B] = 50</code>, then B owes A $50. If B later pays an expense where A owes B $30, then <code>balance[A][B] = 20</code>.</p><div class="learn-tip"><b>Tip:</b> Use a <code>map&lt;pair&lt;userId, userId&gt;, double&gt;</code> where the pair is always ordered (smaller ID first) to avoid duplicate entries for the same pair.</div></div><div class="learn-section"><div class="learn-h">Debt Simplification Algorithm</div><p class="learn-p">Given N users with various debts, <b>minimize the number of transactions</b> needed to settle all debts. This is a classic algorithm problem:</p><ol class="learn-list"><li>Compute the <b>net balance</b> for each user (total owed minus total owing).</li><li>Separate users into <b>creditors</b> (positive balance) and <b>debtors</b> (negative balance).</li><li>Use a <b>greedy approach</b>: match the largest creditor with the largest debtor. The smaller amount settles one of them. Repeat.</li></ol><div class="learn-code">// Net balances: Alice=+50, Bob=-30, Charlie=-20\n// Without simplification: 3+ transactions\n// With simplification: Bob pays Alice $30, Charlie pays Alice $20 (2 transactions)</div><p class="learn-p">For optimal minimization (NP-hard in general), the greedy approach works well in practice. For exact minimum, you need subset-sum / backtracking — but this is usually overkill for an interview.</p></div><div class="learn-section"><div class="learn-h">Design Patterns Used</div><table class="learn-table"><tr><th>Pattern</th><th>Where</th><th>Why</th></tr><tr><td>Strategy</td><td>SplitStrategy</td><td>Different split methods (Equal, Exact, Percent)</td></tr><tr><td>Observer</td><td>Notification</td><td>Notify users when they\'re added to an expense</td></tr><tr><td>Factory</td><td>ExpenseFactory</td><td>Create expense with the right split strategy</td></tr><tr><td>Singleton</td><td>ExpenseManager</td><td>Central manager for all expenses and balances</td></tr></table></div><div class="learn-section"><div class="learn-h">Expense Creation Workflow</div><ol class="learn-list"><li>User creates expense: amount, description, paid by, split among, split type.</li><li>Validate: split amounts/percentages are correct.</li><li>Calculate each participant\'s share using the split strategy.</li><li>Update pairwise balances in the balance sheet.</li><li>Notify affected users.</li></ol></div><div class="learn-section"><div class="learn-h">Handling Edge Cases</div><ul class="learn-list"><li><b>Self-expense</b> — payer is also a participant. Their share is subtracted from what they paid.</li><li><b>Rounding</b> — splitting $100 three ways gives $33.33 each, total $99.99. The payer absorbs the extra cent. Mention this in interviews.</li><li><b>Zero balance</b> — if two users have settled, remove or zero-out their entry.</li><li><b>Multi-currency</b> — track currency per expense, convert on display.</li></ul><div class="learn-tip"><b>Tip:</b> Interviewers love to see you handle rounding. One approach: compute N-1 shares as floor(amount/N * 100)/100, and give the remainder to the last person.</div></div>',
          code: `// ===== Design Splitwise — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include <memory>
#include <cmath>
#include <algorithm>
using namespace std;

// ---------- User ----------
class User {
    string id, name, email;
public:
    User(string id, string name, string email)
        : id(id), name(name), email(email) {}
    string getId() const { return id; }
    string getName() const { return name; }
};

// ---------- Split Strategy ----------
class ISplitStrategy {
public:
    virtual unordered_map<string, double>
        split(double total, const vector<string>& userIds) = 0;
    virtual bool validate(double total, const vector<string>& userIds) = 0;
    virtual ~ISplitStrategy() = default;
};

class EqualSplit : public ISplitStrategy {
public:
    unordered_map<string, double>
    split(double total, const vector<string>& userIds) override {
        unordered_map<string, double> shares;
        double share = round(total / userIds.size() * 100) / 100;
        double sum = 0;
        for (size_t i = 0; i < userIds.size(); i++) {
            if (i == userIds.size() - 1)
                shares[userIds[i]] = total - sum;  // last person gets remainder
            else
                shares[userIds[i]] = share;
            sum += shares[userIds[i]];
        }
        return shares;
    }
    bool validate(double, const vector<string>& users) override {
        return !users.empty();
    }
};

class ExactSplit : public ISplitStrategy {
    unordered_map<string, double> exactAmounts;
public:
    void setAmount(const string& userId, double amt) {
        exactAmounts[userId] = amt;
    }
    unordered_map<string, double>
    split(double, const vector<string>& userIds) override {
        return exactAmounts;
    }
    bool validate(double total, const vector<string>&) override {
        double sum = 0;
        for (auto& [_, amt] : exactAmounts) sum += amt;
        return abs(sum - total) < 0.01;
    }
};

class PercentSplit : public ISplitStrategy {
    unordered_map<string, double> percents;
public:
    void setPercent(const string& userId, double pct) {
        percents[userId] = pct;
    }
    unordered_map<string, double>
    split(double total, const vector<string>& userIds) override {
        unordered_map<string, double> shares;
        for (auto& [uid, pct] : percents)
            shares[uid] = round(total * pct / 100 * 100) / 100;
        return shares;
    }
    bool validate(double, const vector<string>&) override {
        double sum = 0;
        for (auto& [_, pct] : percents) sum += pct;
        return abs(sum - 100.0) < 0.01;
    }
};

// ---------- Expense ----------
class Expense {
    static int nextId;
    int id;
    string description, paidBy;
    double amount;
    unordered_map<string, double> shares;
public:
    Expense(string desc, string payer, double amt,
            unique_ptr<ISplitStrategy> strategy,
            const vector<string>& participants)
        : id(nextId++), description(desc), paidBy(payer), amount(amt) {
        if (!strategy->validate(amt, participants))
            throw invalid_argument("Invalid split");
        shares = strategy->split(amt, participants);
    }
    string getPaidBy() const { return paidBy; }
    const unordered_map<string, double>& getShares() const { return shares; }
    double getAmount() const { return amount; }
    string getDescription() const { return description; }
};
int Expense::nextId = 1;

// ---------- Balance Manager ----------
class BalanceManager {
    // balances[A][B] > 0 means B owes A
    unordered_map<string, unordered_map<string, double>> balances;
public:
    void addExpense(const Expense& exp) {
        string payer = exp.getPaidBy();
        for (auto& [userId, share] : exp.getShares()) {
            if (userId == payer) continue;  // skip self
            balances[payer][userId] += share;
            balances[userId][payer] -= share;
        }
    }

    void showBalance(const string& userId) {
        cout << "Balances for " << userId << ":" << endl;
        if (balances.find(userId) == balances.end()) {
            cout << "  No balances." << endl;
            return;
        }
        for (auto& [other, amount] : balances[userId]) {
            if (abs(amount) < 0.01) continue;
            if (amount > 0)
                cout << "  " << other << " owes you \$"
                     << round(amount * 100) / 100 << endl;
            else
                cout << "  You owe " << other << " \$"
                     << round(-amount * 100) / 100 << endl;
        }
    }

    // Simplify debts using greedy matching
    void simplifyDebts(const vector<string>& groupMembers) {
        // Compute net balance per user
        unordered_map<string, double> net;
        for (auto& uid : groupMembers) net[uid] = 0;
        for (auto& uid : groupMembers)
            for (auto& [other, amt] : balances[uid])
                net[uid] += amt;

        vector<pair<double, string>> creditors, debtors;
        for (auto& [uid, bal] : net) {
            if (bal > 0.01) creditors.push_back({bal, uid});
            else if (bal < -0.01) debtors.push_back({-bal, uid});
        }
        sort(creditors.rbegin(), creditors.rend());
        sort(debtors.rbegin(), debtors.rend());

        cout << "
Simplified transactions:" << endl;
        int i = 0, j = 0;
        while (i < creditors.size() && j < debtors.size()) {
            double settle = min(creditors[i].first, debtors[j].first);
            cout << "  " << debtors[j].second << " pays "
                 << creditors[i].second << " \$" << settle << endl;
            creditors[i].first -= settle;
            debtors[j].first -= settle;
            if (creditors[i].first < 0.01) i++;
            if (debtors[j].first < 0.01) j++;
        }
    }
};

int main() {
    User alice("u1", "Alice", "alice@mail.com");
    User bob("u2", "Bob", "bob@mail.com");
    User charlie("u3", "Charlie", "charlie@mail.com");
    vector<string> group = {"u1", "u2", "u3"};

    BalanceManager bm;

    // Expense 1: Alice pays \$300, split equally
    auto eq = make_unique<EqualSplit>();
    Expense e1("Dinner", "u1", 300, move(eq), group);
    bm.addExpense(e1);
    cout << "Added: Alice paid \$300 for Dinner (equal split)" << endl;

    // Expense 2: Bob pays \$120, exact split
    auto ex = make_unique<ExactSplit>();
    ex->setAmount("u1", 40);
    ex->setAmount("u2", 40);
    ex->setAmount("u3", 40);
    Expense e2("Cab", "u2", 120, move(ex), group);
    bm.addExpense(e2);
    cout << "Added: Bob paid \$120 for Cab (exact split)" << endl;

    cout << endl;
    bm.showBalance("u1");
    cout << endl;
    bm.showBalance("u2");
    cout << endl;
    bm.showBalance("u3");

    bm.simplifyDebts(group);
    return 0;
}`,
          problems: [
            ["Optimal Account Balancing","https://leetcode.com/problems/optimal-account-balancing/","Hard"],
            ["Minimize Rounding Error to Meet Target","https://leetcode.com/problems/minimize-rounding-error-to-meet-target/","Medium"],
            ["Split Array Into Consecutive Subsequences","https://leetcode.com/problems/split-array-into-consecutive-subsequences/","Medium"],
          ],
          mcqs: [
            {"q":"In Splitwise, different split methods (Equal, Exact, Percent) are best modeled using:","o":["Inheritance only","Strategy pattern","Singleton pattern","Observer pattern"],"a":1},
            {"q":"Minimizing the number of transactions to settle debts in a group is:","o":["O(n) solvable with sorting","NP-hard in general, greedy is a good approximation","Always solved with 2 transactions","Not possible"],"a":1},
            {"q":"When splitting $100 equally among 3 people, the rounding issue is best handled by:","o":["Ignoring the extra cent","Having the payer absorb the remainder","Rounding up all shares","Using integers only"],"a":1},
          ],
        },
        {
          t: "Design Elevator System",
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Design an <b>Elevator System</b> for a building with multiple elevators. This is a classic LLD question that tests your ability to model <b>state machines</b>, <b>scheduling algorithms</b>, and <b>concurrent systems</b>.</p><p class="learn-p"><b>Functional Requirements:</b></p><ul class="learn-list"><li>Multiple elevators in a building.</li><li>Users press UP/DOWN buttons on any floor (external request).</li><li>Users press a floor button inside the elevator (internal request).</li><li>Elevators move up/down, open/close doors, pick up and drop off passengers.</li><li>An intelligent dispatcher assigns requests to the optimal elevator.</li><li>Display current floor and direction for each elevator.</li></ul></div><div class="learn-section"><div class="learn-h">Key Entities</div><ul class="learn-list"><li><b>Building</b> — contains floors and elevators.</li><li><b>Floor</b> — has UP and DOWN call buttons and a display.</li><li><b>Elevator</b> — has a current floor, direction, state (IDLE/MOVING/DOOR_OPEN), and a list of pending requests.</li><li><b>Request</b> — floor number + direction (external) or just floor number (internal).</li><li><b>ElevatorController/Dispatcher</b> — assigns external requests to the best elevator.</li><li><b>Door</b> — open/close with safety sensor.</li><li><b>Display</b> — shows current floor and direction.</li></ul></div><div class="learn-section"><div class="learn-h">Elevator State Machine</div><p class="learn-p">Each elevator is modeled as a <b>state machine</b> with the following states:</p><table class="learn-table"><tr><th>State</th><th>Description</th><th>Transitions</th></tr><tr><td>IDLE</td><td>Stationary, no pending requests</td><td>&rarr; MOVING_UP, MOVING_DOWN (on new request)</td></tr><tr><td>MOVING_UP</td><td>Moving upward, serving requests</td><td>&rarr; IDLE (no more up requests), DOOR_OPEN (reached target floor)</td></tr><tr><td>MOVING_DOWN</td><td>Moving downward, serving requests</td><td>&rarr; IDLE (no more down requests), DOOR_OPEN (reached target floor)</td></tr><tr><td>DOOR_OPEN</td><td>Doors open at a floor</td><td>&rarr; MOVING_UP, MOVING_DOWN, IDLE (after timeout)</td></tr></table><div class="learn-code">enum class ElevatorState { IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN };\nenum class Direction { UP, DOWN, NONE };</div></div><div class="learn-section"><div class="learn-h">Scheduling Algorithms</div><p class="learn-p">The dispatcher must decide which elevator handles each external request. Common algorithms:</p><p class="learn-p"><b>1. FCFS (First Come First Served):</b> Assign to the first idle elevator. Simple but inefficient.</p><p class="learn-p"><b>2. SCAN (Elevator Algorithm):</b> Each elevator moves in one direction, serving all requests in that direction, then reverses. Like a disk head scan. This is the most common algorithm discussed in interviews.</p><div class="learn-code">// SCAN algorithm:\n// 1. Move UP, serve all up-requests in order.\n// 2. When no more up-requests, reverse to DOWN.\n// 3. Serve all down-requests.\n// 4. Repeat.</div><p class="learn-p"><b>3. LOOK (optimized SCAN):</b> Like SCAN but the elevator only goes as far as the highest/lowest request, not to the building\'s top/bottom floor.</p><p class="learn-p"><b>4. Shortest Seek Time First (SSTF):</b> Pick the nearest request. Can cause starvation.</p></div><div class="learn-section"><div class="learn-h">Dispatcher Strategy (Strategy Pattern)</div><p class="learn-p">The dispatcher uses the <b>Strategy pattern</b> to select the best elevator:</p><div class="learn-code">class IDispatchStrategy {\npublic:\n    virtual Elevator* dispatch(\n        const Request&amp; req,\n        vector&lt;Elevator*&gt;&amp; elevators) = 0;\n    virtual ~IDispatchStrategy() = default;\n};</div><p class="learn-p"><b>Nearest Elevator Strategy:</b> Pick the closest elevator that is either IDLE or moving toward the request floor in the same direction.</p><div class="learn-code">// Cost = |elevator.currentFloor - request.floor|\n// Prefer: same direction &amp; approaching &gt; IDLE &gt; opposite direction</div><div class="learn-tip"><b>Tip:</b> In interviews, explain the SCAN algorithm clearly and mention that real systems use a weighted cost function considering: distance, direction, current load, and number of pending stops.</div></div><div class="learn-section"><div class="learn-h">Handling Internal vs External Requests</div><p class="learn-p"><b>External requests</b> (floor buttons): The dispatcher assigns them to the best elevator. The request has a floor number and a direction (UP or DOWN).</p><p class="learn-p"><b>Internal requests</b> (elevator buttons): The passenger is already inside. The request goes directly to that elevator\'s queue. The elevator adds the floor to its stop list.</p><div class="learn-warn"><b>Warning:</b> Don\'t confuse the two types. External requests need a dispatcher; internal requests go directly to the elevator.</div></div><div class="learn-section"><div class="learn-h">Design Patterns Used</div><table class="learn-table"><tr><th>Pattern</th><th>Where</th><th>Why</th></tr><tr><td>Strategy</td><td>Dispatch algorithm</td><td>Swap between SCAN, LOOK, SSTF</td></tr><tr><td>State</td><td>Elevator state machine</td><td>Clean state transitions (IDLE → MOVING → DOOR_OPEN)</td></tr><tr><td>Observer</td><td>Display/Floor panels</td><td>Update displays when elevator position changes</td></tr><tr><td>Singleton</td><td>ElevatorController</td><td>Single controller for the building</td></tr><tr><td>Command</td><td>Requests</td><td>Encapsulate floor requests as objects for queuing</td></tr></table></div><div class="learn-section"><div class="learn-h">Concurrency Considerations</div><ul class="learn-list"><li>Multiple elevators run concurrently — each can be a separate thread.</li><li>The dispatcher must be thread-safe — multiple floor buttons can be pressed simultaneously.</li><li>Elevator\'s request queue must be thread-safe (internal + dispatched external requests arrive concurrently).</li><li>Use producer-consumer pattern: floor buttons produce requests, elevators consume them.</li></ul></div><div class="learn-section"><div class="learn-h">Edge Cases</div><ul class="learn-list"><li><b>Overweight</b> — elevator skips pickup if at capacity.</li><li><b>Emergency stop</b> — all elevators stop, doors open.</li><li><b>Maintenance mode</b> — take an elevator out of service.</li><li><b>Fire alarm</b> — all elevators go to ground floor.</li><li><b>VIP elevator</b> — dedicated elevator for certain floors.</li></ul><div class="learn-tip"><b>Tip:</b> Mention 2-3 edge cases proactively in your interview. It shows you think about real-world scenarios, not just the happy path.</div></div>',
          code: `// ===== Design Elevator System — C++ Implementation =====
#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <queue>
#include <memory>
#include <mutex>
#include <climits>
using namespace std;

// ---------- Enums ----------
enum class Direction     { UP, DOWN, NONE };
enum class ElevatorState { IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN };

string dirStr(Direction d) {
    return d == Direction::UP ? "UP" : d == Direction::DOWN ? "DOWN" : "IDLE";
}

// ---------- Request ----------
struct Request {
    int floor;
    Direction direction;   // NONE for internal requests
    Request(int f, Direction d = Direction::NONE) : floor(f), direction(d) {}
};

// ---------- Elevator ----------
class Elevator {
    int id;
    int currentFloor = 0;
    ElevatorState state = ElevatorState::IDLE;
    Direction direction = Direction::NONE;
    set<int> upStops;      // floors to stop at going up
    set<int> downStops;    // floors to stop at going down
    mutex mtx;
    int capacity, currentLoad = 0;

public:
    Elevator(int id, int cap = 10) : id(id), capacity(cap) {}

    void addRequest(int floor) {
        lock_guard<mutex> lock(mtx);
        if (floor > currentFloor)
            upStops.insert(floor);
        else if (floor < currentFloor)
            downStops.insert(floor);
        else
            return;  // already at that floor

        // Start moving if idle
        if (state == ElevatorState::IDLE) {
            if (floor > currentFloor) {
                state = ElevatorState::MOVING_UP;
                direction = Direction::UP;
            } else {
                state = ElevatorState::MOVING_DOWN;
                direction = Direction::DOWN;
            }
        }
    }

    // Simulate one step of the elevator
    void step() {
        lock_guard<mutex> lock(mtx);
        if (state == ElevatorState::IDLE) return;

        if (state == ElevatorState::MOVING_UP) {
            currentFloor++;
            if (upStops.count(currentFloor)) {
                upStops.erase(currentFloor);
                cout << "  Elevator " << id << " stops at floor "
                     << currentFloor << " (going UP)" << endl;
            }
            if (upStops.empty()) {
                if (!downStops.empty()) {
                    state = ElevatorState::MOVING_DOWN;
                    direction = Direction::DOWN;
                } else {
                    state = ElevatorState::IDLE;
                    direction = Direction::NONE;
                }
            }
        } else if (state == ElevatorState::MOVING_DOWN) {
            currentFloor--;
            if (downStops.count(currentFloor)) {
                downStops.erase(currentFloor);
                cout << "  Elevator " << id << " stops at floor "
                     << currentFloor << " (going DOWN)" << endl;
            }
            if (downStops.empty()) {
                if (!upStops.empty()) {
                    state = ElevatorState::MOVING_UP;
                    direction = Direction::UP;
                } else {
                    state = ElevatorState::IDLE;
                    direction = Direction::NONE;
                }
            }
        }
    }

    int getId() const { return id; }
    int getCurrentFloor() const { return currentFloor; }
    Direction getDirection() const { return direction; }
    ElevatorState getState() const { return state; }
    bool isIdle() const { return state == ElevatorState::IDLE; }
    int pendingStops() const { return upStops.size() + downStops.size(); }
};

// ---------- Dispatch Strategy ----------
class IDispatchStrategy {
public:
    virtual Elevator* dispatch(const Request& req,
                                vector<unique_ptr<Elevator>>& elevators) = 0;
    virtual ~IDispatchStrategy() = default;
};

class NearestElevatorStrategy : public IDispatchStrategy {
public:
    Elevator* dispatch(const Request& req,
                       vector<unique_ptr<Elevator>>& elevators) override {
        Elevator* best = nullptr;
        int bestCost = INT_MAX;

        for (auto& elev : elevators) {
            int dist = abs(elev->getCurrentFloor() - req.floor);
            int cost = dist;

            // Prefer idle elevators
            if (elev->isIdle()) {
                cost = dist;
            }
            // Prefer elevator moving toward request in same direction
            else if (elev->getDirection() == Direction::UP &&
                     req.direction == Direction::UP &&
                     elev->getCurrentFloor() <= req.floor) {
                cost = dist;  // on the way
            }
            else if (elev->getDirection() == Direction::DOWN &&
                     req.direction == Direction::DOWN &&
                     elev->getCurrentFloor() >= req.floor) {
                cost = dist;
            }
            else {
                cost = dist + 10;  // penalty for opposite direction
            }

            if (cost < bestCost) {
                bestCost = cost;
                best = elev.get();
            }
        }
        return best;
    }
};

// ---------- Elevator Controller ----------
class ElevatorController {
    vector<unique_ptr<Elevator>> elevators;
    unique_ptr<IDispatchStrategy> strategy;
    int numFloors;

public:
    ElevatorController(int nElevators, int nFloors)
        : numFloors(nFloors),
          strategy(make_unique<NearestElevatorStrategy>()) {
        for (int i = 0; i < nElevators; i++)
            elevators.push_back(make_unique<Elevator>(i));
    }

    // External request (from floor button)
    void requestFromFloor(int floor, Direction dir) {
        Request req(floor, dir);
        Elevator* elev = strategy->dispatch(req, elevators);
        if (elev) {
            cout << "Floor " << floor << " " << dirStr(dir)
                 << " -> assigned to Elevator " << elev->getId() << endl;
            elev->addRequest(floor);
        }
    }

    // Internal request (from inside elevator)
    void requestFromElevator(int elevId, int floor) {
        if (elevId < elevators.size()) {
            cout << "Elevator " << elevId << " -> go to floor "
                 << floor << endl;
            elevators[elevId]->addRequest(floor);
        }
    }

    // Simulate one tick
    void tick() {
        for (auto& elev : elevators) elev->step();
    }

    void status() {
        for (auto& e : elevators) {
            cout << "Elev " << e->getId()
                 << " @ floor " << e->getCurrentFloor()
                 << " [" << dirStr(e->getDirection()) << "]"
                 << " stops=" << e->pendingStops() << endl;
        }
    }
};

int main() {
    ElevatorController ctrl(2, 10);  // 2 elevators, 10 floors

    // External requests from floor buttons
    ctrl.requestFromFloor(5, Direction::UP);
    ctrl.requestFromFloor(3, Direction::DOWN);

    // Internal requests (passenger inside elevator 0 presses floor 8)
    ctrl.requestFromElevator(0, 8);

    cout << "
--- Simulating ---" << endl;
    for (int t = 0; t < 12; t++) {
        cout << "Tick " << t << ":" << endl;
        ctrl.tick();
    }

    cout << "
--- Final Status ---" << endl;
    ctrl.status();
    return 0;
}`,
          problems: [
            ["Design Hit Counter","https://leetcode.com/problems/design-hit-counter/","Medium"],
            ["Time Based Key-Value Store","https://leetcode.com/problems/time-based-key-value-store/","Medium"],
            ["Design Circular Deque","https://leetcode.com/problems/design-circular-deque/","Medium"],
          ],
          mcqs: [
            {"q":"The SCAN (Elevator) algorithm is analogous to:","o":["Breadth-first search","Disk head scheduling","Round-robin CPU scheduling","Priority queue"],"a":1},
            {"q":"Which design pattern best models the elevator's IDLE/MOVING/DOOR_OPEN transitions?","o":["Observer","Strategy","State","Command"],"a":2},
            {"q":"An external elevator request (floor button) differs from an internal request (elevator button) because:","o":["External requests specify direction; internal specify destination floor","External requests are faster","Internal requests have higher priority","There is no difference"],"a":0},
          ],
        }
      ]
    },
    {
      id: "hld", t: "HLD Fundamentals",
      topics: [
        {
          t: "Scalability Fundamentals",
          learn: '<div class="learn-section"><div class="learn-h">What is Scalability?</div><p class="learn-p">Scalability is the ability of a system to handle a growing amount of work by adding resources. A <b>scalable system</b> maintains acceptable performance as the load increases — measured in requests per second (QPS), concurrent users, or data volume.</p><p class="learn-p">There are two fundamental approaches:</p><table class="learn-table"><tr><th>Strategy</th><th>How</th><th>Pros</th><th>Cons</th></tr><tr><td><b>Vertical Scaling (Scale Up)</b></td><td>Bigger machine — more CPU, RAM, disk</td><td>Simple, no code changes</td><td>Hardware ceiling, single point of failure, expensive</td></tr><tr><td><b>Horizontal Scaling (Scale Out)</b></td><td>More machines behind a load balancer</td><td>Near-linear capacity growth, fault-tolerant</td><td>Complexity: statelessness, data partitioning, coordination</td></tr></table><p class="learn-p">Vertical scaling hits hard walls: a single server maxes out at ~256 CPU cores, ~12 TB RAM, and ~100 Gbps NIC. Beyond that, you <b>must</b> go horizontal.</p><div class="learn-tip"><b>Tip:</b> Start vertical (simple), plan horizontal (inevitable). Most startups begin with a monolith on a single box and add horizontal components as bottlenecks emerge.</div></div><div class="learn-section"><div class="learn-h">Stateless vs Stateful Architecture</div><p class="learn-p">Horizontal scaling requires <b>stateless</b> application servers — any server can handle any request because no server stores user-specific data locally.</p><p class="learn-p"><b>Problem:</b> If sessions live in server memory, adding a second server behind a load balancer breaks sessions. Three solutions:</p><ol class="learn-list"><li><b>Sticky sessions</b> — load balancer routes the same user to the same server. Simple but creates uneven load and fails if that server dies.</li><li><b>Centralized session store</b> — Redis or Memcached holds all sessions. Any server can serve any request. <span class="learn-complexity">O(1)</span> session lookup.</li><li><b>Client-side tokens</b> — JWT or signed cookies carry the session. No server-side state at all, but tokens can\'t be revoked easily.</li></ol><div class="learn-code">// Stateless architecture pattern\nClient -&gt; Load Balancer -&gt; App Server (any) -&gt; Session Store (Redis)\n                                             -&gt; Database</div></div><div class="learn-section"><div class="learn-h">Database Replication</div><p class="learn-p">A single database becomes a bottleneck quickly. <b>Replication</b> copies data across multiple servers:</p><ul class="learn-list"><li><b>Leader-Follower (Master-Slave):</b> One leader handles writes; followers handle reads. Since most apps are read-heavy (100:1 read-write ratio), this scales reads dramatically.</li><li><b>Leader-Leader (Multi-Master):</b> Multiple leaders accept writes. Complex conflict resolution needed.</li></ul><p class="learn-p"><b>Replication lag</b> is the delay between a write on the leader and its visibility on followers. If lag is 3 seconds, a user who updates their profile may not see the change on the next page load (routed to a stale follower).</p><p class="learn-p">Solutions: <b>read-after-write consistency</b> (read your own writes from the leader), <b>monotonic reads</b> (ensure a user always reads from the same replica), or <b>causal consistency</b> via vector clocks.</p><div class="learn-warn"><b>Warning:</b> During leader failover, the promoted follower may be behind. Transactions committed on the old leader but not yet replicated are lost — this is the <b>split-brain</b> danger.</div></div><div class="learn-section"><div class="learn-h">Database Sharding (Partitioning)</div><p class="learn-p">When a single database can\'t hold all data or handle all writes, you <b>shard</b> — split data across multiple database instances.</p><table class="learn-table"><tr><th>Strategy</th><th>How</th><th>Pros</th><th>Cons</th></tr><tr><td>Range-based</td><td>user_id 1-1M on shard 1, 1M-2M on shard 2</td><td>Range queries are efficient</td><td>Hotspots if one range is popular</td></tr><tr><td>Hash-based</td><td>hash(user_id) % N</td><td>Even distribution</td><td>Range queries need scatter-gather; resharding moves ~(N-1)/N of data</td></tr><tr><td>Consistent hashing</td><td>Hash ring with virtual nodes</td><td>Adding/removing nodes moves only ~1/N of keys</td><td>More complex implementation</td></tr></table><p class="learn-p">With hash(user_id) % 4 shards, adding a 5th shard requires moving ~80% of data. With consistent hashing, only ~20% moves — a 4x improvement.</p></div><div class="learn-section"><div class="learn-h">Caching Layer</div><p class="learn-p">Caches store frequently accessed data in memory for <span class="learn-complexity">O(1)</span> retrieval. A cache hit ratio of 95% means only 5% of requests reach the database.</p><p class="learn-p"><b>Danger — Cache Crash:</b> If your cache goes down, 100% of traffic suddenly hits the database. If the DB was handling only the 5% miss traffic, it now receives 20x its normal load — a <b>cascading failure</b>.</p><div class="learn-code">Normal:  100K req/s -&gt; Cache (95% hit) -&gt; DB gets 5K req/s\nCrash:   100K req/s -&gt; DB gets 100K req/s (20x spike!) -&gt; DB dies</div><p class="learn-p">Mitigation: cache replication (Redis Sentinel/Cluster), circuit breakers, graceful degradation.</p></div><div class="learn-section"><div class="learn-h">CDN (Content Delivery Network)</div><p class="learn-p">A CDN caches static assets (images, CSS, JS, video) at <b>edge locations</b> worldwide, reducing latency from 200ms (cross-ocean) to &lt;20ms (nearby edge).</p><p class="learn-p"><b>Push CDN:</b> You upload content proactively. Good for known static assets.</p><p class="learn-p"><b>Pull CDN:</b> CDN fetches from origin on first request. Simpler but first user sees higher latency.</p><p class="learn-p">CDN cache invalidation is notoriously hard. If a buggy JS file is cached with a 24-hour TTL across 200 edge locations, you must either purge (API call to CDN provider) or use <b>content-addressed filenames</b> (e.g., <code>app.a1b2c3.js</code>) so deploying a new version creates a new URL.</p><div class="learn-tip"><b>Tip:</b> Use content hashing in filenames (Webpack/Vite do this automatically). Then set CDN TTL to 1 year — the filename changes whenever content changes.</div></div><div class="learn-section"><div class="learn-h">Backpressure &amp; Graceful Degradation</div><p class="learn-p">When downstream systems can\'t keep up, requests queue, memory grows, and the server OOMs. <b>Backpressure</b> is the mechanism to push back against excessive load:</p><ul class="learn-list"><li><b>Load shedding:</b> Drop excess requests with 503 — protect the system at the cost of some requests.</li><li><b>Rate limiting:</b> Cap requests per client — fair distribution of capacity.</li><li><b>Adaptive concurrency:</b> Dynamically adjust allowed concurrency based on response times.</li><li><b>Circuit breakers:</b> Stop calling a failing downstream service; return a fallback response.</li></ul><div class="learn-warn"><b>Warning:</b> Without backpressure, a traffic spike that overwhelms one component can cascade through the entire system — the <b>thundering herd</b> problem.</div></div>',
          code: `// === Scalability Architecture Patterns ===

// 1. Basic single-server setup
Client -> DNS -> Single Server (Web + App + DB)

// 2. Separated tiers
Client -> DNS -> Load Balancer
                    |-> Web Server 1  --|
                    |-> Web Server 2  --|-> Cache (Redis)
                    |-> Web Server N  --|     |
                                             v
                                     DB Leader (writes)
                                      /     \\
                              DB Follower 1  DB Follower 2
                                  (reads)      (reads)

// 3. Stateless server with session store
app.get('/dashboard', (req, res) => {
  // Session fetched from Redis, not local memory
  const session = await redis.get(\`session:\${req.cookies.sid}\`);
  if (!session) return res.redirect('/login');
  // Any server can handle this request
});

// 4. Database sharding by user_id
function getShard(userId, numShards) {
  return hash(userId) % numShards;
}

// 5. Cache-aside pattern
async function getUser(userId) {
  let user = await cache.get(\`user:\${userId}\`);
  if (user) return JSON.parse(user);       // cache hit
  user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  await cache.set(\`user:\${userId}\`, JSON.stringify(user), 'EX', 300);
  return user;                             // cache miss -> fill cache
}

// 6. Availability calculation
// Components in series: A_total = A1 * A2 * ... * An
// 5 components, each 99.99%: 0.9999^5 = 99.95%
// Need 99.99% overall? Add redundancy:
// Each component: 1 - (1 - 0.9999)^2 = 99.999999%
// Series of 5: 0.99999999^5 ≈ 99.9999%

// 7. Back-of-envelope: scaling for 10M DAU
// Read:write = 100:1
// Avg QPS  = 10M * 10 req/day / 86400 ≈ 1157 req/s
// Peak QPS = 5x average ≈ 5,800 req/s
// Peak reads  ≈ 5,742 req/s
// Peak writes ≈ 58 req/s`,
          problems: [
            ["Walk through scaling steps when a product goes viral (50 to 50K req/s)","#","Hard"],
            ["Redis cache crashes — calculate DB load spike and cascading failure","#","Hard"],
            ["Sharding with user_id % N: what breaks when adding a 5th shard?","#","Medium"],
            ["Thundering herd: 10K requests hit DB when cache key expires","#","Hard"],
            ["Design for 99.99% uptime with 5 serial components at 99.99% each","#","Medium"],
            ["Backpressure: web server at 5K req/s, DB at 2K writes/s — prevent OOM","#","Hard"],
          ],
          mcqs: [
            {"q":"A system has 5 components in series, each with 99.9% availability. What is the overall availability?","o":["99.9%","99.5%","99.95%","95%"],"a":1},
            {"q":"Which scaling approach requires the application to be stateless?","o":["Vertical scaling","Horizontal scaling","Both","Neither"],"a":1},
            {"q":"With hash(key) % 4 sharding, adding a 5th shard requires moving approximately what percentage of data?","o":["20%","25%","50%","80%"],"a":3},
            {"q":"What is the primary risk of a cache crash in a system with 95% cache hit ratio?","o":["Data loss in cache","20x load spike on the database","Stale data served to users","Session invalidation"],"a":1},
          ],
        },
        {
          t: "Caching & CDN Deep Dive",
          learn: '<div class="learn-section"><div class="learn-h">Caching Patterns</div><p class="learn-p">Caching is the most impactful performance optimization in system design. Understanding the five core patterns is essential:</p><table class="learn-table"><tr><th>Pattern</th><th>Read Flow</th><th>Write Flow</th><th>Best For</th></tr><tr><td><b>Cache-Aside</b></td><td>App checks cache → miss → query DB → fill cache</td><td>App writes to DB, invalidates cache</td><td>General purpose, read-heavy workloads</td></tr><tr><td><b>Read-Through</b></td><td>Cache itself fetches from DB on miss</td><td>App writes to DB, cache auto-refreshes</td><td>Simpler app code, ORM-friendly</td></tr><tr><td><b>Write-Through</b></td><td>Same as read-through</td><td>Write to cache AND DB synchronously</td><td>Strong consistency required</td></tr><tr><td><b>Write-Behind</b></td><td>Same as read-through</td><td>Write to cache, async flush to DB</td><td>Write-heavy workloads (risk: data loss)</td></tr><tr><td><b>Write-Around</b></td><td>Same as cache-aside</td><td>Write directly to DB, skip cache</td><td>Data written once, rarely re-read</td></tr></table><p class="learn-p"><b>Cache-aside</b> is the most common pattern. The application is responsible for managing the cache. On a cache miss, the app queries the database and populates the cache. On a write, the app updates the DB and <b>invalidates</b> (not updates) the cache entry — this prevents race conditions.</p><div class="learn-warn"><b>Warning:</b> With write-behind caching, if the cache crashes before flushing to DB, recent writes are lost. Only use this pattern where data loss is tolerable (e.g., analytics counters).</div></div><div class="learn-section"><div class="learn-h">Cache Invalidation — The Hard Problem</div><p class="learn-p">Phil Karlton famously said there are only two hard things in CS: cache invalidation and naming things. Three invalidation strategies:</p><ol class="learn-list"><li><b>TTL-based:</b> Each entry expires after a fixed time. Simple, but stale data is served until TTL expires. A product price change from $99 to $89 might show the wrong price for minutes.</li><li><b>Event-based:</b> When data changes, publish an event (via Kafka/SNS) that triggers cache invalidation across all nodes. Near-real-time consistency, but complex to implement.</li><li><b>Version-based:</b> Include a version number in the cache key. When data changes, increment the version — old cache entries naturally become unreachable.</li></ol><div class="learn-code">// Event-based invalidation flow\nApp writes DB -&gt; publishes "user:123:updated" to Kafka\n                 -&gt; All app servers consume event\n                 -&gt; Each server invalidates local cache + Redis</div><div class="learn-tip"><b>Tip:</b> In microservices, prefer event-based invalidation over TTL. TTL alone can leave stale data visible for too long in high-consistency scenarios.</div></div><div class="learn-section"><div class="learn-h">Cache Eviction Policies</div><p class="learn-p">When cache memory is full, an eviction policy decides what to remove:</p><table class="learn-table"><tr><th>Policy</th><th>Evicts</th><th>Strength</th><th>Weakness</th></tr><tr><td><b>LRU</b> (Least Recently Used)</td><td>Item not accessed for longest time</td><td>Great for temporal locality</td><td>Fails on sequential scans (scans evict hot items)</td></tr><tr><td><b>LFU</b> (Least Frequently Used)</td><td>Item with lowest access count</td><td>Keeps truly popular items</td><td>Old popular items stick forever even if no longer relevant</td></tr><tr><td><b>ARC</b> (Adaptive Replacement)</td><td>Adapts between recency and frequency</td><td>Self-tuning, handles both patterns</td><td>More complex to implement</td></tr></table><p class="learn-p">Redis uses an approximated LRU by default. For most workloads, LRU is sufficient. Consider LFU for workloads with stable hot sets (e.g., product catalog).</p></div><div class="learn-section"><div class="learn-h">Thundering Herd / Cache Stampede</div><p class="learn-p">When a popular cache key expires, thousands of simultaneous requests miss the cache and flood the database. Solutions:</p><ol class="learn-list"><li><b>Cache locking:</b> Only one request rebuilds the cache; others wait on a distributed lock (Redis SETNX). Simple but adds latency for waiting requests.</li><li><b>Probabilistic early expiration:</b> Each request has a small probability of refreshing the cache <i>before</i> TTL expires. Spreads rebuilds over time.</li><li><b>Never-expire + background refresh:</b> The cache entry never expires. A background worker refreshes it periodically. Guaranteed fast reads but slightly stale data.</li></ol><div class="learn-code">// Cache locking with Redis SETNX\nfunction get(key) {\n  val = cache.get(key);\n  if (val) return val;\n  if (cache.setnx(key + ":lock", 1, EX=5)) {  // acquire lock\n    val = db.query(key);\n    cache.set(key, val, EX=300);\n    cache.del(key + ":lock");\n    return val;\n  }\n  sleep(50); return get(key);  // retry, another thread is rebuilding\n}</div></div><div class="learn-section"><div class="learn-h">Cache Penetration &amp; Cache Warming</div><p class="learn-p"><b>Cache penetration:</b> Requests for non-existent keys always miss the cache and hit the DB. An attacker can exploit this by querying user_id=-1, -2, etc.</p><p class="learn-p">Defenses: (1) <b>Cache null values</b> with short TTL, (2) <b>Bloom filter</b> — a space-efficient probabilistic data structure that can tell you if a key <i>definitely doesn\'t exist</i> (no false negatives, some false positives), (3) <b>Request validation</b> — reject obviously invalid keys at the API layer.</p><p class="learn-p"><b>Cache warming:</b> After a restart, the cache is cold and the DB takes the full load. Pre-warm by replaying recent access logs or loading the top-N most popular keys before routing production traffic.</p></div><div class="learn-section"><div class="learn-h">Multi-Level Cache Architecture</div><p class="learn-p">Large systems use multiple cache layers:</p><div class="learn-code">L1: In-process cache (100MB, &lt;1ms) — e.g., Guava/Caffeine\nL2: Redis cluster (10GB, 1-2ms network) — shared across servers\nL3: Database (1TB, 10-50ms) — source of truth</div><p class="learn-p">Challenge: keeping L1 caches consistent across 50+ app servers. When data updates at L3, L2 can be invalidated easily, but each server\'s L1 is independent. Solutions: pub/sub invalidation channel, or short L1 TTL (10-30 seconds).</p></div><div class="learn-section"><div class="learn-h">CDN Architecture</div><p class="learn-p">CDNs like CloudFront, Akamai, and Fastly have 200+ edge locations. Key concepts:</p><ul class="learn-list"><li><b>Pull CDN:</b> CDN fetches from origin on first request (cache miss). Subsequent requests served from edge. Best for long-tail content (e-commerce with millions of products).</li><li><b>Push CDN:</b> You upload content to CDN proactively. Best for known popular content (Netflix pre-positions movies at edges before release).</li><li><b>Cache busting:</b> Use content-hashed filenames (<code>app.a1b2c3.js</code>) so deploying new code changes the URL. Set TTL to 1 year — old files are never requested again.</li><li><b>Stale-while-revalidate:</b> Serve stale content while fetching fresh content in the background. The user gets fast response, and the cache updates asynchronously.</li></ul><div class="learn-tip"><b>Tip:</b> For SPAs, never cache <code>index.html</code> (or set very short TTL). Cache all other assets with content hashes and long TTL. This way, deploying a new version just means updating the HTML which references new hashed JS/CSS filenames.</div></div>',
          code: `// === Caching Patterns & CDN Architecture ===

// 1. Cache-Aside (Lazy Loading) Pattern
async function getUserProfile(userId) {
  const cacheKey = \`user:\${userId}\`;
  let data = await redis.get(cacheKey);
  if (data) return JSON.parse(data);       // HIT

  data = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
  await redis.setex(cacheKey, 300, JSON.stringify(data)); // 5 min TTL
  return data;                             // MISS -> fill
}

// On update: invalidate, don't update (avoids race conditions)
async function updateUser(userId, newData) {
  await db.query('UPDATE users SET ... WHERE id = ?', [userId, newData]);
  await redis.del(\`user:\${userId}\`);     // invalidate
}

// 2. Write-Through Pattern
async function writeThrough(key, value) {
  await redis.set(key, value);             // write to cache
  await db.update(key, value);             // write to DB (sync)
}

// 3. Write-Behind (Write-Back) Pattern
async function writeBehind(key, value) {
  await redis.set(key, value);             // write to cache
  queue.push({ key, value });              // async flush to DB later
}

// 4. Cache Stampede Prevention with Locking
async function getWithLock(key) {
  let val = await redis.get(key);
  if (val) return val;

  const lockKey = key + ':lock';
  const acquired = await redis.set(lockKey, '1', 'NX', 'EX', 5);
  if (acquired) {
    val = await db.query(key);
    await redis.setex(key, 300, val);
    await redis.del(lockKey);
    return val;
  }
  await sleep(50);
  return getWithLock(key);  // wait and retry
}

// 5. Bloom Filter for Cache Penetration Defense
// Space: ~10 bits per element for 1% FP rate
// 10M keys -> ~12MB Bloom filter
function handleRequest(key) {
  if (!bloomFilter.mightContain(key)) {
    return null;  // definitely doesn't exist, skip DB
  }
  return cacheAsideGet(key);
}

// 6. CDN Configuration (Nginx example)
// Cache-Control headers:
// Static assets: Cache-Control: public, max-age=31536000, immutable
// HTML pages:    Cache-Control: no-cache (always revalidate)
// API responses: Cache-Control: private, max-age=0

// 7. Multi-level cache lookup
// L1 (local) -> L2 (Redis) -> L3 (DB)
async function multiLevelGet(key) {
  let val = localCache.get(key);       // L1: <1ms
  if (val) return val;
  val = await redis.get(key);          // L2: 1-2ms
  if (val) { localCache.set(key, val, 30); return val; }
  val = await db.query(key);           // L3: 10-50ms
  redis.setex(key, 300, val);
  localCache.set(key, val, 30);
  return val;
}`,
          problems: [
            ["Compare cache-aside, read-through, write-through, write-behind patterns","#","Medium"],
            ["Thundering herd: 10K requests miss cache simultaneously — design solutions","#","Hard"],
            ["Compare LRU, LFU, ARC eviction — design scenario where LRU fails badly","#","Medium"],
            ["CDN push vs pull for Netflix, CNN, and Etsy — justify each choice","#","Medium"],
            ["Cache penetration: attacker queries non-existent keys — design defenses","#","Hard"],
            ["Multi-level cache (L1/L2/L3): design consistency across 50 app servers","#","Hard"],
          ],
          mcqs: [
            {"q":"In cache-aside pattern, what should happen when data is updated in the database?","o":["Update the cache entry with new value","Invalidate (delete) the cache entry","Do nothing and wait for TTL expiry","Write to cache first, then database"],"a":1},
            {"q":"Which cache eviction policy is most vulnerable to sequential scan patterns?","o":["LFU","LRU","ARC","Random"],"a":1},
            {"q":"A Bloom filter used to defend against cache penetration can produce:","o":["False negatives only","False positives only","Both false positives and false negatives","Neither"],"a":1},
            {"q":"What is stale-while-revalidate in CDN caching?","o":["Serve expired content while checking origin in background","Reject requests for stale content","Automatically purge all edge caches","Redirect to origin when cache expires"],"a":0},
          ],
        },
        {
          t: "Load Balancing & Reverse Proxy",
          learn: '<div class="learn-section"><div class="learn-h">Load Balancing Algorithms</div><p class="learn-p">A load balancer distributes incoming traffic across backend servers to improve throughput, reduce latency, and provide fault tolerance. Core algorithms:</p><table class="learn-table"><tr><th>Algorithm</th><th>How It Works</th><th>Best For</th><th>Weakness</th></tr><tr><td><b>Round Robin</b></td><td>Requests go 1, 2, 3, 1, 2, 3...</td><td>Homogeneous servers, uniform requests</td><td>Ignores server capacity and request weight</td></tr><tr><td><b>Weighted Round Robin</b></td><td>Higher-capacity servers get proportionally more</td><td>Heterogeneous servers</td><td>Doesn\'t account for current load</td></tr><tr><td><b>Least Connections</b></td><td>Routes to server with fewest active connections</td><td>Variable request durations</td><td>Doesn\'t account for server capacity</td></tr><tr><td><b>IP Hash</b></td><td>hash(client_ip) % N determines server</td><td>Session affinity without cookies</td><td>Uneven if IP distribution is skewed</td></tr><tr><td><b>Least Response Time</b></td><td>Routes to server with fastest recent responses</td><td>Optimal user experience</td><td>Complex to measure accurately</td></tr></table><p class="learn-p"><b>Example:</b> 3 servers — A (4 cores), B (8 cores), C (2 cores). With round robin, each gets 33% of traffic. Server C is overwhelmed while B is underused. Weighted round robin with weights 2:4:1 distributes fairly. But if some requests take 5 seconds (heavy) and some take 1ms (light), even weighted RR fails — <b>least connections</b> adapts to actual load.</p><div class="learn-warn"><b>Warning:</b> A server with a memory leak responds slowly but doesn\'t crash — a "gray failure." Round robin keeps sending 1/N traffic to it. Least connections avoids it as connections pile up. Always pair load balancing with health checks.</div></div><div class="learn-section"><div class="learn-h">L4 vs L7 Load Balancing</div><p class="learn-p">Load balancers operate at different network layers:</p><table class="learn-table"><tr><th>Feature</th><th>L4 (Transport)</th><th>L7 (Application)</th></tr><tr><td>Sees</td><td>TCP/UDP packets (IP, port)</td><td>HTTP headers, URL, cookies, body</td></tr><tr><td>Speed</td><td>Very fast — just forwards packets</td><td>Slower — must parse HTTP</td></tr><tr><td>Routing</td><td>By IP:port only</td><td>By URL path, headers, cookies</td></tr><tr><td>SSL</td><td>Pass-through (backend terminates)</td><td>Terminates at LB (can inspect traffic)</td></tr><tr><td>Use case</td><td>Max throughput (gaming, streaming)</td><td>Content routing, A/B testing, WAF</td></tr></table><p class="learn-p"><b>When to use L4:</b> Game servers, video streaming, any protocol besides HTTP. <b>When to use L7:</b> Routing /api/* to API servers and /* to web servers, A/B testing based on cookies, WebSocket upgrade handling.</p></div><div class="learn-section"><div class="learn-h">Health Checks</div><p class="learn-p">Health checks detect failed backends so the LB stops routing to them.</p><ul class="learn-list"><li><b>Active (pull):</b> LB periodically pings /health endpoint. Detects failure after check interval (e.g., 10 seconds). During that window, requests to the dead server fail.</li><li><b>Passive (push):</b> LB monitors real traffic — if a backend returns 5xx for N consecutive requests, mark it unhealthy. Faster detection, no extra traffic.</li><li><b>Deep vs shallow:</b> Shallow checks test if the process is running. Deep checks test DB connectivity, disk space, downstream dependencies. Deep checks risk cascading failures if a downstream is slow.</li></ul><div class="learn-tip"><b>Tip:</b> Use shallow health checks for liveness (is the server up?) and deep health checks for readiness (can the server handle traffic?). Kubernetes separates these as liveness and readiness probes.</div></div><div class="learn-section"><div class="learn-h">SSL Termination</div><p class="learn-p"><b>SSL termination at the LB</b> means the LB decrypts HTTPS traffic and forwards plain HTTP to backends. Pros: centralizes certificate management, offloads CPU-intensive TLS from backends, enables L7 inspection. Cons: traffic between LB and backends is unencrypted (mitigated by VPC internal networking or re-encryption).</p><p class="learn-p"><b>TLS 1.3</b> reduces handshake from 2 RTT to 1 RTT, and session resumption enables 0-RTT. For 100K connections/second, this is a significant throughput improvement.</p></div><div class="learn-section"><div class="learn-h">High Availability for Load Balancers</div><p class="learn-p">The LB itself is a single point of failure. HA strategies:</p><ol class="learn-list"><li><b>Active-passive with VRRP:</b> Two LBs share a virtual IP. If the active one fails, the passive takes over in seconds. Simple but wastes one LB\'s capacity.</li><li><b>Active-active with DNS round robin:</b> DNS returns multiple LB IPs. Both handle traffic. If one dies, DNS removes it (but DNS caching means some clients still hit it for minutes).</li><li><b>BGP anycast:</b> Multiple LBs worldwide advertise the same IP. Network routing sends each client to the nearest one. Cloud providers (Cloudflare, AWS Global Accelerator) use this.</li></ol></div><div class="learn-section"><div class="learn-h">Reverse Proxy</div><p class="learn-p">A reverse proxy sits in front of backend servers and handles cross-cutting concerns:</p><ul class="learn-list"><li><b>SSL termination</b> — centralized certificate management</li><li><b>Compression</b> — gzip/brotli responses to reduce bandwidth</li><li><b>Static file serving</b> — serve CSS/JS/images directly without hitting app servers</li><li><b>Rate limiting</b> — protect backends from abuse</li><li><b>Caching</b> — cache API responses at the proxy layer</li><li><b>Request routing</b> — route to different backends based on URL patterns</li></ul><p class="learn-p"><b>NGINX</b> is the most popular reverse proxy/LB. <b>HAProxy</b> excels at pure L4/L7 load balancing with lower latency. <b>Envoy</b> is designed for service meshes (sidecar proxy pattern in Kubernetes/Istio).</p><div class="learn-tip"><b>Tip:</b> In microservices, the "sidecar proxy" model (Envoy per pod) handles load balancing, retries, circuit breaking, and observability at the infrastructure level — application code stays simple.</div></div><div class="learn-section"><div class="learn-h">Graceful Drain &amp; Zero-Downtime Deployment</div><p class="learn-p">Deploying a new version of a backend that handles 10K WebSocket connections requires graceful draining: (1) Stop sending new connections to the old server, (2) Let existing connections finish naturally, (3) After a timeout, force-close remaining connections with reconnect directives. For HTTP, this is simpler — just stop routing new requests after the current ones complete.</p><p class="learn-p"><b>Canary deployment</b> at the LB level: route 1% of traffic to the new version, monitor error rates. If errors exceed threshold, automatically route 100% back to the old version.</p></div>',
          code: `// === Load Balancing & Reverse Proxy ===

// 1. NGINX configuration as reverse proxy + load balancer
// nginx.conf
upstream backend_pool {
    least_conn;                         // algorithm: least connections
    server backend1:8080 weight=4;      // 4 cores
    server backend2:8080 weight=8;      // 8 cores
    server backend3:8080 weight=2;      // 2 cores
}

server {
    listen 443 ssl http2;
    ssl_certificate     /etc/ssl/cert.pem;
    ssl_certificate_key /etc/ssl/key.pem;

    // L7 routing: API vs static
    location /api/ {
        proxy_pass http://backend_pool;
        proxy_set_header X-Real-IP \$remote_addr;
    }
    location /static/ {
        root /var/www/static;           // serve directly
        expires 1y;
    }
    // Health check endpoint
    location /health {
        access_log off;
        return 200 'OK';
    }
}

// 2. Health check logic (pseudocode)
function activeHealthCheck(server) {
  every 10 seconds:
    response = HTTP GET server/health, timeout=3s
    if (response.status != 200 || timeout):
      server.failCount++
      if (server.failCount >= 3):
        server.status = 'UNHEALTHY'
        removeFromPool(server)
    else:
      server.failCount = 0
      server.status = 'HEALTHY'
}

// 3. Passive health check (monitor real traffic)
function onResponse(server, response) {
  if (response.status >= 500):
    server.errorWindow.push(Date.now())
    if (server.errorWindow.countLast(30s) > 10):
      server.status = 'UNHEALTHY'
}

// 4. Consistent hashing for session affinity
function routeRequest(clientIP, servers) {
  hash = md5(clientIP)
  // Walk clockwise on hash ring
  return ring.getNextServer(hash)
}

// 5. Canary deployment at LB level
upstream canary {
    server new_version:8080 weight=1;   // 1% traffic
    server old_version:8080 weight=99;  // 99% traffic
}

// 6. Connection pool sizing
// 10 backend servers, 100 connections each = 1000 pool
// If auto-scaling adds 8 more app servers:
//   18 * 100 = 1800 > DB max 500 connections!
// Solution: connection pooler (PgBouncer) between app and DB`,
          problems: [
            ["Compare round-robin, weighted, least-connections for heterogeneous servers","#","Medium"],
            ["L4 vs L7: choose for API routing, game server, and A/B testing","#","Medium"],
            ["Health check detects failure in 10s — design faster detection without overhead","#","Hard"],
            ["HA load balancer: compare active-passive, DNS round robin, BGP anycast","#","Hard"],
            ["Compare NGINX, HAProxy, AWS ALB, Envoy for microservices on Kubernetes","#","Medium"],
          ],
          mcqs: [
            {"q":"Which load balancing algorithm best handles mixed request durations (1ms and 5s)?","o":["Round Robin","Weighted Round Robin","Least Connections","IP Hash"],"a":2},
            {"q":"An L4 load balancer can route based on:","o":["URL path and cookies","HTTP headers","IP address and port number","Request body content"],"a":2},
            {"q":"What is the main disadvantage of SSL termination at the load balancer?","o":["Certificates are harder to manage","Traffic between LB and backends is unencrypted","L7 routing becomes impossible","Higher CPU usage on backends"],"a":1},
            {"q":"In VRRP-based HA for load balancers, what happens when the active LB fails?","o":["DNS is updated to remove the failed LB","The passive LB takes over the virtual IP","All traffic is dropped until manual intervention","BGP anycast reroutes traffic"],"a":1},
          ],
        },
        {
          t: "Back-of-the-Envelope Estimation",
          learn: '<div class="learn-section"><div class="learn-h">Why Estimation Matters</div><p class="learn-p">In system design interviews, back-of-the-envelope calculations help you make <b>informed architectural decisions</b>. They answer critical questions: Do we need caching? How many servers? Can one database handle the load? The goal is <b>order-of-magnitude accuracy</b> — being within 2-5x of reality is fine; being off by 100x leads to wrong architecture.</p><div class="learn-tip"><b>Tip:</b> Always show your work. The interviewer cares about your reasoning process, not the exact number. Round aggressively — use 10^6 instead of 1,048,576.</div></div><div class="learn-section"><div class="learn-h">Key Numbers Every Engineer Should Know</div><table class="learn-table"><tr><th>Operation</th><th>Latency</th><th>Relative</th></tr><tr><td>L1 cache reference</td><td>0.5 ns</td><td>1x</td></tr><tr><td>L2 cache reference</td><td>7 ns</td><td>14x</td></tr><tr><td>Main memory (RAM)</td><td>100 ns</td><td>200x</td></tr><tr><td>SSD random read</td><td>150 &mu;s (150,000 ns)</td><td>300,000x</td></tr><tr><td>HDD seek</td><td>10 ms (10,000,000 ns)</td><td>20,000,000x</td></tr><tr><td>Send 1KB over 1 Gbps network</td><td>10 &mu;s</td><td>20,000x</td></tr><tr><td>Round trip within data center</td><td>500 &mu;s</td><td>1,000,000x</td></tr><tr><td>Round trip CA to Netherlands</td><td>150 ms</td><td>300,000,000x</td></tr></table><p class="learn-p">The gap between memory (100ns) and disk (10ms) is <b>100,000x</b>. This single fact justifies caching. If your system does 10,000 lookups per request:</p><ul class="learn-list"><li>In-memory cache: 10,000 &times; 100ns = 1ms per request</li><li>SSD-backed: 10,000 &times; 150&mu;s = 1.5 seconds per request</li><li>Spinning disk: 10,000 &times; 10ms = 100 seconds per request</li></ul><div class="learn-warn"><b>Warning:</b> Network latency matters more than you think. A Redis call over the network takes ~1ms — 10,000x slower than a local memory read. Batch your cache calls!</div></div><div class="learn-section"><div class="learn-h">Powers of 2 — The Essential Approximation</div><p class="learn-p"><b>2^10 = 1,024 &asymp; 1,000 (10^3)</b> — this is the foundation of all estimation.</p><table class="learn-table"><tr><th>Power</th><th>Exact</th><th>Approx</th><th>Name</th></tr><tr><td>2^10</td><td>1,024</td><td>1 Thousand</td><td>1 KB</td></tr><tr><td>2^20</td><td>1,048,576</td><td>1 Million</td><td>1 MB</td></tr><tr><td>2^30</td><td>1,073,741,824</td><td>1 Billion</td><td>1 GB</td></tr><tr><td>2^40</td><td>1,099,511,627,776</td><td>1 Trillion</td><td>1 TB</td></tr></table><p class="learn-p">Quick derivations: 2^32 &asymp; 4 &times; 10^9 (4 billion — fits in a 32-bit integer). 2^64 &asymp; 1.8 &times; 10^19 (18 quintillion). You need <b>log2(N)</b> bits to represent N unique items: log2(1M) &asymp; 20 bits.</p></div><div class="learn-section"><div class="learn-h">QPS (Queries Per Second) Estimation</div><p class="learn-p">Formula: <b>QPS = DAU &times; queries_per_user / 86,400</b> (seconds in a day). Peak QPS is typically <b>2x-5x</b> average.</p><div class="learn-code">// Example: Twitter\nDAU = 300M * 50% = 150M\nViews per user per day = 200 tweets\nAvg QPS = 150M * 200 / 86,400 ≈ 347,000 QPS\nPeak QPS (3x) ≈ 1,000,000 QPS\n\n// Each tweet + metadata ≈ 10KB\nDaily egress = 150M * 200 * 10KB = 300 TB/day\nPeak bandwidth = 300TB / (86,400/3) ≈ 10.4 GB/s ≈ 83 Gbps</div></div><div class="learn-section"><div class="learn-h">Storage Estimation</div><p class="learn-p">Estimate data generated per day, multiply by retention period:</p><div class="learn-code">// Example: URL Shortener\nNew URLs: 100M/month ≈ 3.3M/day\nEach mapping: 500 bytes (short URL + long URL + metadata)\nStorage per month: 100M * 500B = 50 GB\nStorage for 5 years: 50GB * 60 months = 3 TB\n\n// With 3x redundancy: 9 TB total</div><div class="learn-code">// Example: Image Hosting\nUploads: 2M/day, avg 500KB\nDaily storage: 2M * 500KB = 1 TB/day\nWith 3 resolutions (original + 3 thumbnails ≈ 2.5MB total per image):\nDaily: 2M * 2.5MB = 5 TB/day\nYearly: 5TB * 365 = 1.8 PB/year</div></div><div class="learn-section"><div class="learn-h">Bandwidth Estimation</div><p class="learn-p">Bandwidth = data_volume / time_period. Account for peak vs average:</p><div class="learn-code">// Example: Video streaming (Netflix-scale)\nSubscribers: 200M\nConcurrent during peak: 200M * 30% = 60M\nAvg stream: 5 Mbps\nPeak bandwidth: 60M * 5 Mbps = 300 Pbps (petabits/sec)\n\nServer with 10 Gbps NIC handles: 10Gbps / 5Mbps = 2,000 streams\nServers needed: 60M / 2,000 = 30,000 servers (just for streaming!)</div></div><div class="learn-section"><div class="learn-h">Server Estimation</div><p class="learn-p">Estimate based on QPS or concurrent connections:</p><ul class="learn-list"><li>A single web server handles ~1,000-10,000 QPS (depends on complexity).</li><li>A single Redis instance handles ~100,000 QPS.</li><li>A single MySQL instance handles ~5,000-10,000 QPS (OLTP with indexes).</li><li>A single Kafka broker handles ~100,000-500,000 messages/sec.</li></ul><div class="learn-code">// Example: Chat system\nDAU: 50M, avg 40 messages/day, msg size: 200 bytes\nAvg QPS: 50M * 40 / 86,400 ≈ 23,000 msg/s\nPeak QPS (3x): ≈ 70,000 msg/s\nStorage (5 years): 50M * 40 * 200B * 365 * 5 ≈ 73 TB</div></div><div class="learn-section"><div class="learn-h">When Does 10x Error Matter?</div><p class="learn-p">Sometimes order-of-magnitude is enough. Sometimes it\'s not:</p><table class="learn-table"><tr><th>Scenario</th><th>10x Error Impact</th></tr><tr><td>Storage estimate (50TB vs 500TB)</td><td><b>Matters:</b> 50TB fits on one machine; 500TB needs distributed storage — fundamentally different architecture.</td></tr><tr><td>QPS (10K vs 100K)</td><td><b>Matters:</b> 10K can be one server; 100K needs load-balanced cluster.</td></tr><tr><td>Latency (10ms vs 100ms)</td><td><b>Might not matter:</b> Both are acceptable for most APIs. But for a search autocomplete (&lt;50ms target), it matters.</td></tr><tr><td>Bandwidth (1Gbps vs 10Gbps)</td><td><b>Might not matter:</b> Both handled by standard NICs. But 100Gbps vs 1Tbps changes your network architecture.</td></tr></table><div class="learn-tip"><b>Tip:</b> In interviews, state your assumptions explicitly: "I\'m assuming peak is 3x average" or "Each tweet is about 10KB with metadata." The interviewer wants to see structured thinking, not memorized numbers.</div></div>',
          code: `// === Back-of-the-Envelope Estimation Cheat Sheet ===

// Key constants
const SECONDS_PER_DAY = 86400;       // ~10^5
const SECONDS_PER_MONTH = 2.6e6;     // ~2.5 * 10^6
const SECONDS_PER_YEAR = 3.15e7;     // ~pi * 10^7

// Powers of 2 approximations
// 2^10 ≈ 10^3    (Thousand / KB)
// 2^20 ≈ 10^6    (Million  / MB)
// 2^30 ≈ 10^9    (Billion  / GB)
// 2^40 ≈ 10^12   (Trillion / TB)

// Latency reference (Jeff Dean's numbers)
// L1 cache:        0.5 ns
// L2 cache:        7 ns
// RAM:             100 ns
// SSD random read: 150 μs (150,000 ns)
// HDD seek:        10 ms  (10,000,000 ns)
// Network (DC):    500 μs
// Network (CA→EU): 150 ms

// === QPS Estimation Template ===
function estimateQPS(dau, actionsPerUserPerDay) {
  const avgQPS = (dau * actionsPerUserPerDay) / SECONDS_PER_DAY;
  const peakQPS = avgQPS * 3;  // peak = 2-5x average
  return { avgQPS, peakQPS };
}

// Example: Twitter-like service
// DAU=150M, 200 reads/user/day
// avgQPS = 150M * 200 / 86400 ≈ 347K
// peakQPS ≈ 1M

// === Storage Estimation Template ===
function estimateStorage(itemsPerDay, bytesPerItem, yearsRetention) {
  const dailyBytes = itemsPerDay * bytesPerItem;
  const totalBytes = dailyBytes * 365 * yearsRetention;
  return totalBytes;  // convert to TB: / 10^12
}

// Example: URL shortener (5 years)
// 100M URLs/month ≈ 3.3M/day
// 500 bytes each
// 3.3M * 500 * 365 * 5 = 3 TB (without redundancy)

// === Server Estimation ===
// Web server:     ~5,000 QPS
// Redis:          ~100,000 QPS
// MySQL (OLTP):   ~5,000 QPS
// Kafka broker:   ~200,000 msg/s

// Servers needed = peakQPS / singleServerCapacity
// For 1M QPS with servers handling 5K each: 200 servers

// === Bandwidth Estimation ===
// bandwidth = totalData / timePeriod
// Example: 300TB/day egress
// = 300 * 10^12 / 86400 bytes/sec
// = 3.47 * 10^9 bytes/sec ≈ 3.5 GB/s ≈ 28 Gbps

// === Birthday Paradox (collision probability) ===
// P(collision) ≈ 1 - e^(-n^2 / 2m)
// n = items inserted, m = hash space size
// For 7-char base62: m = 62^7 ≈ 3.5 * 10^12
// With 1B URLs: P ≈ 1 - e^(-10^18 / 7*10^12) ≈ 1 (guaranteed collision!)
// Need 8+ chars: 62^8 ≈ 2.18 * 10^14, P ≈ n^2/(2m) ≈ 10^18/(4.36*10^14) >> 1 (still likely!)
// Need 10+ chars: 62^10 ≈ 8.4 * 10^17, P ≈ 10^18/(1.68*10^18) ≈ 0.6 at 1B entries
// Use 11+ chars or add collision checking for safety`,
          problems: [
            ["Twitter: estimate read QPS at peak, daily egress bandwidth","#","Medium"],
            ["URL shortener: storage for 5 years at 100M URLs/month","#","Medium"],
            ["Why does memory vs SSD vs disk latency gap matter for architecture?","#","Medium"],
            ["Powers of 2: estimate 2^32 in billions, bits for 1M unique items","#","Medium"],
            ["Chat app: 50M DAU, 40 msg/day — estimate peak msg/s and 5-year storage","#","Medium"],
            ["Your estimate is off by 10x — when does it matter? Give examples","#","Hard"],
          ],
          mcqs: [
            {"q":"Approximately how many seconds are in a day?","o":["8,640","86,400","864,000","8,640,000"],"a":1},
            {"q":"The latency gap between RAM (100ns) and HDD seek (10ms) is approximately:","o":["100x","1,000x","10,000x","100,000x"],"a":3},
            {"q":"If a system has 150M DAU, each making 100 requests/day, peak QPS (3x average) is approximately:","o":["500K","170K","520K","1.5M"],"a":2},
            {"q":"2^40 is approximately equal to:","o":["1 billion","1 trillion","1 million","1 quadrillion"],"a":1},
          ],
        },
        {
          t: "Consistent Hashing",
          learn: '<div class="learn-section"><div class="learn-h">The Problem with Modular Hashing</div><p class="learn-p">Simple modular hashing (<code>hash(key) % N</code>) assigns keys to N servers. But when a server is added or removed, almost all keys must be remapped:</p><div class="learn-code">4 servers, keys 0-19:\nkey 0: 0%4=0, key 1: 1%4=1, ..., key 19: 19%4=3\n\nAdd 5th server (N=4 → N=5):\nkey 0: 0%5=0 ✓, key 1: 1%5=1 ✓, key 2: 2%5=2 ✓\nkey 3: 3%5=3 ✓, key 4: 4%5=4 ✗ (was 0, now 4)\nkey 7: 7%5=2 ✗ (was 3, now 2)\n...\nResult: ~80% of keys must move!</div></div><div class="learn-section"><div class="learn-h">Consistent Hashing: The Hash Ring</div><p class="learn-p">In consistent hashing, both keys and servers are hashed onto a circular ring (0 to 2^32 - 1). Each key is assigned to the first server encountered when walking <b>clockwise</b> from the key\'s position on the ring.</p><p class="learn-p">When a server is added, only keys between the new server and the previous server (counter-clockwise) move to the new server. When a server is removed, its keys move to the next server clockwise. In both cases, only <b>~1/N</b> of keys are affected.</p><div class="learn-code">Ring:     0 --- ServerA(100) --- ServerB(250) --- ServerC(400) --- 2^32\n\nKey at position 150: walks clockwise → assigned to ServerB(250)\nKey at position 300: walks clockwise → assigned to ServerC(400)\n\nAdd ServerD at position 200:\nOnly keys in range (100, 200] move from ServerB to ServerD\nAll other keys stay where they are!</div></div><div class="learn-section"><div class="learn-h">Virtual Nodes</div><p class="learn-p">With only 3 physical nodes on the ring, distribution is <b>highly uneven</b> — one node might own 50% of the ring. The mathematical reason: with N random points on a circle, the expected maximum gap is <span class="learn-complexity">O(log N / N)</span> which is very large for small N.</p><p class="learn-p"><b>Virtual nodes</b> solve this: each physical node gets 100-200 positions on the ring (using different hash seeds). With 150 virtual nodes per physical node and 3 physical nodes, you have 450 points on the ring — the distribution becomes approximately uniform.</p><div class="learn-tip"><b>Tip:</b> For heterogeneous hardware, assign virtual nodes proportionally. A machine with 2x the capacity gets 2x the virtual nodes, receiving approximately 2x the keys.</div></div><div class="learn-section"><div class="learn-h">Replication on the Ring</div><p class="learn-p">For fault tolerance, each key is replicated to N consecutive clockwise nodes. With replication factor 3, a key at position 150 is stored on the next 3 distinct <b>physical</b> nodes clockwise.</p><div class="learn-warn"><b>Warning:</b> If two consecutive virtual nodes belong to the same physical node, you\'d have only 2 physical copies instead of 3. Always skip virtual nodes of the same physical server when selecting replicas.</div></div><div class="learn-section"><div class="learn-h">Handling Node Failures</div><p class="learn-p">When a node fails, its keys automatically move to the next node clockwise. If that node was already at 80% capacity, the added load can cause a <b>cascading failure</b> — it fails too, its keys move to the next, and so on.</p><p class="learn-p">Prevention: (1) <b>Bounded load</b> — set a maximum load per node; excess keys overflow to the next node. (2) <b>Replication</b> — with replication factor 3, a single failure doesn\'t concentrate load on one node; it\'s spread across the ring.</p></div><div class="learn-section"><div class="learn-h">Hot Key Problem</div><p class="learn-p">A viral tweet\'s key receives 100x the average traffic. Virtual nodes don\'t help because it\'s a single key, not a range. Solutions:</p><ol class="learn-list"><li><b>Client-side caching:</b> Cache the hot key on every application server.</li><li><b>Key replication:</b> Add a random suffix to the key (e.g., <code>hot_key_1</code>, <code>hot_key_2</code>, ... <code>hot_key_10</code>). Reads are spread across 10 copies.</li><li><b>Dedicated cache tier:</b> Hot keys are served from a separate, over-provisioned cache cluster.</li></ol></div><div class="learn-section"><div class="learn-h">Real-World Usage</div><p class="learn-p">Consistent hashing is used in:</p><ul class="learn-list"><li><b>DynamoDB / Cassandra:</b> Token ring for data partitioning</li><li><b>CDN (Akamai):</b> Route requests to cache servers</li><li><b>Load balancers:</b> Session affinity (hash client IP to backend)</li><li><b>Distributed caches:</b> Memcached/Redis clusters</li></ul><p class="learn-p"><b>Alternatives:</b> <b>Rendezvous hashing</b> (highest random weight) — for each key, compute hash(key, server) for all servers, pick the highest. Simpler, no ring, but requires evaluating all servers for each lookup. <b>Jump consistent hash</b> — O(1) space, O(ln n) time, but doesn\'t support arbitrary node removal.</p></div>',
          code: `// === Consistent Hashing ===

// 1. Basic hash ring implementation
class ConsistentHashRing {
  constructor(replicas = 150) {
    this.replicas = replicas;  // virtual nodes per physical node
    this.ring = new TreeMap();  // sorted map: hash position -> node
    this.nodes = new Set();
  }

  addNode(node) {
    this.nodes.add(node);
    for (let i = 0; i < this.replicas; i++) {
      const hash = md5(\`\${node}:\${i}\`) % (2 ** 32);
      this.ring.set(hash, node);
    }
  }

  removeNode(node) {
    this.nodes.delete(node);
    for (let i = 0; i < this.replicas; i++) {
      const hash = md5(\`\${node}:\${i}\`) % (2 ** 32);
      this.ring.delete(hash);
    }
  }

  getNode(key) {
    if (this.ring.size === 0) return null;
    const hash = md5(key) % (2 ** 32);
    // Find first node clockwise from hash position
    const entry = this.ring.ceilingEntry(hash);
    return entry ? entry.value : this.ring.firstEntry().value; // wrap around
  }

  // Get N distinct physical nodes for replication
  getNodes(key, n) {
    const result = [];
    const hash = md5(key) % (2 ** 32);
    for (const [pos, node] of this.ring.tailMap(hash)) {
      if (!result.includes(node)) result.push(node);
      if (result.length === n) return result;
    }
    // Wrap around
    for (const [pos, node] of this.ring) {
      if (!result.includes(node)) result.push(node);
      if (result.length === n) return result;
    }
    return result;
  }
}

// 2. Comparison: Modular vs Consistent Hashing
// Modular: add 1 server to 4 → 80% keys move
// Consistent: add 1 server to 4 → ~20% keys move

// 3. Data migration when adding a node
async function addNodeWithMigration(ring, newNode) {
  const oldMapping = {};
  for (const key of allKeys) {
    oldMapping[key] = ring.getNode(key);
  }
  ring.addNode(newNode);
  for (const key of allKeys) {
    const newOwner = ring.getNode(key);
    if (newOwner !== oldMapping[key]) {
      // Key needs to migrate
      const data = await oldMapping[key].get(key);
      await newOwner.put(key, data);
      // Serve from old node until migration confirmed
    }
  }
}

// 4. Hot key mitigation
function getWithHotKeyHandling(key) {
  if (hotKeys.has(key)) {
    // Add random suffix to spread across nodes
    const suffix = Math.floor(Math.random() * 10);
    return ring.getNode(key + ':' + suffix);
  }
  return ring.getNode(key);
}`,
          problems: [
            ["Compare modular (key%4) vs consistent hashing: what % of keys move?","#","Medium"],
            ["Virtual nodes: prove why 3 nodes are uneven, 150 vnodes fix it","#","Medium"],
            ["Cascading failure: node fails, next node overloaded — design prevention","#","Hard"],
            ["Hot key: single viral tweet overwhelms one node — design 3 strategies","#","Hard"],
            ["Session affinity with consistent hashing: what happens on IP change?","#","Medium"],
          ],
          mcqs: [
            {"q":"When adding a 5th node to a 4-node consistent hash ring, approximately what percentage of keys need to move?","o":["80%","50%","25%","20%"],"a":3},
            {"q":"The primary purpose of virtual nodes in consistent hashing is:","o":["To improve query speed","To achieve more uniform key distribution","To provide encryption","To reduce memory usage"],"a":1},
            {"q":"In a hash ring with replication factor 3, why must you skip virtual nodes of the same physical server?","o":["To improve read speed","To ensure 3 distinct physical copies exist","To reduce network traffic","Virtual nodes of the same server have the same hash"],"a":1},
          ],
        },
        {
          t: "Data Models & Storage Engines",
          learn: '<div class="learn-section"><div class="learn-h">Relational vs Document vs Graph</div><p class="learn-p">Choosing the right data model is a foundational architectural decision:</p><table class="learn-table"><tr><th>Model</th><th>Structure</th><th>Joins</th><th>Schema</th><th>Best For</th></tr><tr><td><b>Relational (SQL)</b></td><td>Tables with rows and columns</td><td>Powerful JOINs</td><td>Strict schema (schema-on-write)</td><td>Structured data, transactions, reporting</td></tr><tr><td><b>Document (NoSQL)</b></td><td>Nested JSON/BSON documents</td><td>Weak/no JOINs</td><td>Flexible (schema-on-read)</td><td>Semi-structured, varied attributes, rapid iteration</td></tr><tr><td><b>Graph</b></td><td>Nodes + edges</td><td>Traversals, not JOINs</td><td>Flexible</td><td>Relationships: social networks, fraud detection</td></tr></table><p class="learn-p"><b>Example:</b> "Find all posts liked by friends of friends." In a relational DB, this requires 3 JOINs (users → friends → friends → likes → posts). In a graph DB (Neo4j), it\'s a natural 2-hop traversal with <b>index-free adjacency</b> — each hop is <span class="learn-complexity">O(1)</span> instead of O(log n) for a JOIN.</p></div><div class="learn-section"><div class="learn-h">LSM Trees vs B-Trees</div><p class="learn-p">These are the two dominant storage engine architectures:</p><table class="learn-table"><tr><th>Feature</th><th>LSM Tree</th><th>B-Tree</th></tr><tr><td>Write speed</td><td><b>Fast</b> — sequential writes to WAL + memtable</td><td>Slower — random disk I/O for page updates</td></tr><tr><td>Read speed</td><td>Slower — may check multiple SSTables</td><td><b>Fast</b> — O(log n) tree traversal</td></tr><tr><td>Write amplification</td><td>10-30x (due to compaction)</td><td>Lower (~2-4x)</td></tr><tr><td>Space amplification</td><td>Higher (stale data until compacted)</td><td>Lower</td></tr><tr><td>Used by</td><td>Cassandra, RocksDB, LevelDB, HBase</td><td>PostgreSQL, MySQL (InnoDB), SQLite</td></tr></table><p class="learn-p"><b>Workload match:</b></p><ul class="learn-list"><li><b>90% writes (IoT sensors):</b> LSM tree wins — sequential writes are 100x faster than random writes.</li><li><b>90% reads (product catalog):</b> B-tree wins — direct lookup without checking multiple files.</li><li><b>50/50 (social media):</b> Depends on access pattern. LSM if write throughput is critical; B-tree if read latency matters more.</li></ul></div><div class="learn-section"><div class="learn-h">LSM Tree Deep Dive</div><p class="learn-p">The write path of an LSM tree:</p><ol class="learn-list"><li><b>WAL (Write-Ahead Log):</b> Write is appended to a sequential log on disk for crash recovery.</li><li><b>Memtable:</b> Write is inserted into an in-memory sorted structure (red-black tree or skip list).</li><li><b>Flush to SSTable:</b> When memtable is full (~64MB), it\'s written to disk as a sorted, immutable file (SSTable).</li><li><b>Compaction:</b> Background process merges SSTables, removing duplicates and tombstones (deleted keys).</li></ol><p class="learn-p"><b>Read amplification:</b> A read must check the memtable, then SSTables from newest to oldest. With 10 levels, worst case is 10 disk reads. Bloom filters on each SSTable reduce this — quickly ruling out SSTables that definitely don\'t contain the key.</p></div><div class="learn-section"><div class="learn-h">Column-Oriented Storage</div><p class="learn-p">Traditional row-oriented storage reads entire rows. For analytics queries like "average price of all products sold in Q4," you only need the price and date columns from 100M rows — but row storage reads all 100 columns per row.</p><p class="learn-p"><b>Column-oriented storage</b> stores each column separately. The query reads only 2 columns instead of 100 — a <b>50x I/O reduction</b>. Column stores also compress better (similar values in a column) using run-length encoding, dictionary encoding, and bitmap indexing.</p><div class="learn-code">Row store: [id, name, price, date, ...100 cols] × 100M rows\nAnalytics query reads: 100M × 100 columns = 10 billion values\n\nColumn store: price column: [99, 89, 149, ...] × 100M\n              date column:  [2024-10, ...] × 100M\nQuery reads: 100M × 2 columns = 200M values (50x less I/O)</div></div><div class="learn-section"><div class="learn-h">OLTP vs OLAP</div><table class="learn-table"><tr><th>Property</th><th>OLTP</th><th>OLAP</th></tr><tr><td>Queries</td><td>Short, simple (get user by ID)</td><td>Complex aggregations (sum, avg over millions of rows)</td></tr><tr><td>Volume</td><td>Many small transactions</td><td>Few large scans</td></tr><tr><td>Latency</td><td>&lt;10ms per query</td><td>Seconds to minutes acceptable</td></tr><tr><td>Storage</td><td>Row-oriented (PostgreSQL, MySQL)</td><td>Column-oriented (Redshift, BigQuery, ClickHouse)</td></tr></table><p class="learn-p">Using one database for both OLTP and OLAP causes <b>contention</b>: analytics queries with table scans lock rows, slowing down the web application. Solution: replicate OLTP data to a separate data warehouse (ETL pipeline) or use CDC (Change Data Capture) for real-time sync.</p><div class="learn-tip"><b>Tip:</b> Star schema is the standard for data warehouses: a central fact table (e.g., sales) surrounded by dimension tables (products, customers, dates). This denormalized structure optimizes analytical queries.</div></div>',
          code: `// === Data Models & Storage Engines ===

// 1. Relational model (SQL)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE
);
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  author_id INT REFERENCES users(id),
  content TEXT,
  created_at TIMESTAMP
);
-- Friends of friends who liked a post (3 JOINs)
SELECT DISTINCT u3.name FROM users u1
  JOIN friendships f1 ON u1.id = f1.user_id
  JOIN friendships f2 ON f1.friend_id = f2.user_id
  JOIN likes l ON f2.friend_id = l.user_id
  JOIN users u3 ON l.user_id = u3.id
  WHERE u1.id = 123 AND l.post_id = 456;

// 2. Document model (MongoDB)
{
  "_id": "user123",
  "name": "Alice",
  "posts": [
    { "content": "Hello world", "likes": 42 },
    { "content": "System design is fun", "likes": 100 }
  ],
  "friends": ["user456", "user789"]
}
// Problem: "friends of friends" requires application-level joins

// 3. Graph model (Neo4j Cypher)
// MATCH (me:User {id: 123})-[:FRIEND]->()-[:FRIEND]->(fof)
//       -[:LIKED]->(post:Post {id: 456})
// RETURN DISTINCT fof.name
// Natural 2-hop traversal, O(1) per hop

// 4. LSM Tree write path (pseudocode)
class LSMTree {
  write(key, value) {
    this.wal.append(key, value);        // durability
    this.memtable.put(key, value);      // fast in-memory write
    if (this.memtable.size > 64MB) {
      const sstable = this.memtable.flush(); // sort and write to disk
      this.levels[0].add(sstable);
      this.memtable = new SkipList();
      this.scheduleCompaction();
    }
  }

  read(key) {
    let val = this.memtable.get(key);
    if (val) return val;
    for (const level of this.levels) {
      for (const sst of level.newestFirst()) {
        if (sst.bloomFilter.mightContain(key)) {
          val = sst.get(key);
          if (val) return val;
        }
      }
    }
    return null;
  }
}

// 5. B-Tree vs LSM: write amplification comparison
// B-Tree: update a 4KB page for a 100-byte write = 40x amplification
// LSM (leveled compaction): ~10-30x due to compaction merges
// LSM (size-tiered): ~4-10x, less compaction but more space used

// 6. Column-oriented query optimization
// Row store: SELECT AVG(price) FROM products
//   Reads: 100M rows × 100 cols × 8 bytes = 80 GB
// Column store: reads only price column
//   Reads: 100M × 8 bytes = 800 MB (100x less!)
//   With compression: ~200 MB`,
          problems: [
            ["Model social network in relational, document, graph — query friends-of-friends","#","Hard"],
            ["LSM tree vs B-tree: which for 90% writes, 90% reads, 50/50?","#","Medium"],
            ["LSM tree write path: WAL → memtable → SSTable → compaction","#","Medium"],
            ["Column-oriented storage: calculate I/O savings for analytics query","#","Medium"],
            ["OLTP and OLAP on same DB: explain contention and design separation","#","Hard"],
          ],
          mcqs: [
            {"q":"Which storage engine is better for write-heavy IoT sensor data?","o":["B-Tree","LSM Tree","Column store","Hash index"],"a":1},
            {"q":"In a graph database, index-free adjacency means:","o":["No indexes are used","Each node directly points to adjacent nodes, making traversal O(1) per hop","Adjacency lists are stored in column format","The graph is stored as a B-tree"],"a":1},
            {"q":"Why is column-oriented storage preferred for analytics (OLAP)?","o":["It supports faster writes","It reads only the needed columns, reducing I/O by orders of magnitude","It provides stronger ACID guarantees","It doesn't require schema"],"a":1},
            {"q":"The purpose of Bloom filters in LSM trees is to:","o":["Compress SSTables","Speed up writes to the WAL","Quickly determine if a key is NOT in an SSTable (avoid disk read)","Sort keys during compaction"],"a":2},
          ],
        },
        {
          t: "Replication & Partitioning",
          learn: '<div class="learn-section"><div class="learn-h">Replication Strategies</div><p class="learn-p">Replication copies data across multiple nodes for fault tolerance and read scalability. Three main strategies:</p><table class="learn-table"><tr><th>Strategy</th><th>Writes</th><th>Conflicts</th><th>Partition Tolerance</th><th>Use Case</th></tr><tr><td><b>Single-Leader</b></td><td>One leader handles all writes</td><td>No write conflicts</td><td>Followers may be stale during partition</td><td>Most OLTP databases (PostgreSQL, MySQL)</td></tr><tr><td><b>Multi-Leader</b></td><td>Multiple leaders accept writes</td><td>Write conflicts between leaders</td><td>Each DC continues independently</td><td>Multi-datacenter setups</td></tr><tr><td><b>Leaderless</b></td><td>Any node accepts writes (quorum)</td><td>Concurrent write conflicts</td><td>Available as long as quorum reachable</td><td>DynamoDB, Cassandra, Riak</td></tr></table></div><div class="learn-section"><div class="learn-h">Replication Lag &amp; Consistency Guarantees</div><p class="learn-p">In single-leader replication, followers lag behind the leader. This causes anomalies:</p><ul class="learn-list"><li><b>Read-your-writes:</b> User updates profile on leader, reads from stale follower → sees old data. Fix: read your own writes from the leader.</li><li><b>Monotonic reads:</b> User refreshes page, hits a more-stale follower → sees data "go back in time." Fix: route each user to the same replica (via session affinity).</li><li><b>Consistent prefix reads:</b> Causally related writes ("Q: What\'s the capital?" "A: Paris") arrive out of order on a replica. Fix: track causal dependencies with Lamport timestamps.</li></ul></div><div class="learn-section"><div class="learn-h">Leader Failover &amp; Split Brain</div><p class="learn-p">When the leader fails, a follower must be promoted. Problems:</p><ol class="learn-list"><li>Follower A is at log position 1000, Follower B at 998. Promote A — B is missing 2 transactions.</li><li>The old leader had committed transactions at position 1001 that hadn\'t replicated to anyone — these are <b>permanently lost</b>.</li><li><b>Split brain:</b> The old leader comes back online and thinks it\'s still the leader. Two leaders accept writes simultaneously → data divergence.</li></ol><p class="learn-p">Prevention: fencing tokens — the new leader gets a higher epoch number. Any write with an old epoch is rejected. This is how Raft and ZooKeeper prevent split brain.</p></div><div class="learn-section"><div class="learn-h">Multi-Leader Conflict Resolution</div><p class="learn-p">In multi-DC multi-leader replication, conflicts are inevitable when two users edit the same data simultaneously in different DCs:</p><ul class="learn-list"><li><b>Last Writer Wins (LWW):</b> Timestamp-based. Simple but loses data.</li><li><b>Merge:</b> Automatically merge changes (works for some data types like counters, sets).</li><li><b>Keep both + user resolution:</b> Store both versions, let the application/user choose.</li><li><b>CRDTs:</b> Data structures that automatically converge — no conflicts by design.</li></ul></div><div class="learn-section"><div class="learn-h">Partitioning (Sharding) Strategies</div><table class="learn-table"><tr><th>Strategy</th><th>How</th><th>Range Queries</th><th>Distribution</th></tr><tr><td><b>Range partitioning</b></td><td>Key ranges on each partition (A-F, G-M, N-Z)</td><td>Efficient (single partition)</td><td>Can be uneven (hotspots)</td></tr><tr><td><b>Hash partitioning</b></td><td>hash(key) % N determines partition</td><td>Scatter-gather (all partitions)</td><td>Even distribution</td></tr><tr><td><b>Compound key</b></td><td>Partition by hash(user_id), sort within by timestamp</td><td>Efficient within a user\'s data</td><td>Balanced + range support</td></tr></table><p class="learn-p"><b>Hot spot example:</b> Range partitioning by timestamp means all current writes go to one partition (the latest range). Hash partitioning by user_id spreads writes evenly, but querying "all events in the last hour" requires querying all partitions.</p><p class="learn-p"><b>Compound key</b> is the best of both: partition by hash(user_id) for even distribution, cluster within each partition by timestamp for efficient range queries within a user\'s data.</p></div><div class="learn-section"><div class="learn-h">Secondary Indexes in Partitioned Systems</div><p class="learn-p"><b>Local indexes (document-partitioned):</b> Each partition has its own index. Query "find all red cars" must scatter to ALL partitions. Write is fast (local index update).</p><p class="learn-p"><b>Global indexes (term-partitioned):</b> A single index covers all partitions. Query is fast (one lookup), but writes require distributed transactions to update the global index.</p><div class="learn-warn"><b>Warning:</b> Scatter-gather queries become a bottleneck as partitions increase. If you have 100 shards and need to query all of them, latency is dominated by the slowest shard (tail latency amplification).</div></div>',
          code: `// === Replication & Partitioning ===

// 1. Single-leader replication flow
Leader (writes) → Replication Log → Follower 1 (reads)
                                  → Follower 2 (reads)
                                  → Follower 3 (reads)

// Sync vs Async replication
// Synchronous: leader waits for follower ACK (durable, slower)
// Asynchronous: leader doesn't wait (fast, risk of data loss)
// Semi-synchronous: wait for 1 follower (balance)

// 2. Read-your-writes consistency
async function readAfterWrite(userId, key) {
  // If user recently wrote, read from leader
  const lastWriteTime = await cache.get(\`last_write:\${userId}\`);
  if (lastWriteTime && Date.now() - lastWriteTime < 10000) {
    return leader.read(key);   // read from leader
  }
  return replica.read(key);    // read from any replica
}

// 3. Leader failover with epoch fencing
class LeaderElection {
  promoteFollower(follower) {
    const newEpoch = this.currentEpoch + 1;
    follower.setAsLeader(newEpoch);
    // All nodes reject writes with epoch < newEpoch
    broadcast({ type: 'NEW_LEADER', epoch: newEpoch });
    // Old leader, if alive, is fenced out
  }
}

// 4. Partitioning strategies
// Range partitioning
function rangePartition(key) {
  if (key < 'G') return 'shard1';       // A-F
  if (key < 'N') return 'shard2';       // G-M
  if (key < 'T') return 'shard3';       // N-S
  return 'shard4';                       // T-Z
}

// Hash partitioning
function hashPartition(key, numShards) {
  return murmurHash(key) % numShards;
}

// Compound key (Cassandra-style)
// Partition key: hash(user_id) → determines shard
// Clustering key: timestamp → sorted within partition
// Query: "all events for user X in last hour" → single partition!

// 5. Multi-leader conflict resolution
function resolveConflict(writeA, writeB) {
  // Strategy 1: Last Writer Wins (data loss risk!)
  return writeA.timestamp > writeB.timestamp ? writeA : writeB;

  // Strategy 2: Merge (for compatible data types)
  return merge(writeA.value, writeB.value);

  // Strategy 3: Keep both, let application resolve
  return { conflict: true, versions: [writeA, writeB] };
}

// 6. Replication log implementations
// Statement-based: "INSERT INTO users VALUES (...)"
//   Risk: NOW(), RAND() produce different values on replicas!
// WAL shipping: send raw WAL bytes
//   Risk: storage format coupled between leader/follower versions
// Logical (row-based): "Row 123 changed col X from A to B"
//   Best: decoupled from storage format, supports CDC`,
          problems: [
            ["Compare single-leader, multi-leader, leaderless replication","#","Hard"],
            ["Leader failover: what happens to unreplicated transactions?","#","Hard"],
            ["Multi-leader conflict: LWW vs merge vs keep-both — when does each lose data?","#","Medium"],
            ["Range vs hash partitioning: design compound key for balanced reads/writes","#","Medium"],
            ["Hot spot: celebrity user_id overwhelms one partition — design mitigation","#","Hard"],
          ],
          mcqs: [
            {"q":"In single-leader replication, what is the \"split brain\" problem?","o":["Two followers disagree on data","The old leader comes back and both leaders accept writes","The network splits into three groups","Read replicas fall behind the leader"],"a":1},
            {"q":"A compound partition key (hash user_id, sort by timestamp) is useful because:","o":["It eliminates the need for replication","It provides even distribution AND efficient range queries within a user","It reduces storage requirements","It makes all queries O(1)"],"a":1},
            {"q":"With local (document-partitioned) indexes, a query like \"find all red cars\" requires:","o":["One partition lookup","Querying ALL partitions (scatter-gather)","A global index lookup","No indexes are needed"],"a":1},
            {"q":"Why is statement-based replication dangerous?","o":["It uses too much bandwidth","Non-deterministic functions like NOW() produce different values on replicas","It requires schema locks","It doesn't support transactions"],"a":1},
          ],
        },
        {
          t: "Transactions & Consistency",
          learn: '<div class="learn-section"><div class="learn-h">ACID Properties</div><p class="learn-p">Transactions provide four guarantees, illustrated with a bank transfer (Alice sends $100 from savings to checking):</p><table class="learn-table"><tr><th>Property</th><th>Guarantee</th><th>What Breaks Without It</th></tr><tr><td><b>Atomicity</b></td><td>All or nothing — both debit and credit succeed, or neither does</td><td>$100 deducted from savings but not added to checking (money vanishes)</td></tr><tr><td><b>Consistency</b></td><td>Invariants are maintained (total balance unchanged)</td><td>Application logic error creates money from nothing</td></tr><tr><td><b>Isolation</b></td><td>Concurrent transactions don\'t interfere with each other</td><td>Another transaction reads Alice\'s savings mid-transfer (sees partial state)</td></tr><tr><td><b>Durability</b></td><td>Committed data survives crashes (written to disk/replicated)</td><td>Power failure after commit loses the transfer</td></tr></table><div class="learn-tip"><b>Tip:</b> Atomicity and Durability are provided by the database (WAL, replication). Consistency is partly the application\'s responsibility (enforcing business rules). Isolation has different levels with different performance costs.</div></div><div class="learn-section"><div class="learn-h">Isolation Levels</div><table class="learn-table"><tr><th>Level</th><th>Prevents</th><th>Allows</th><th>Performance</th></tr><tr><td>Read Uncommitted</td><td>Nothing</td><td>Dirty reads, non-repeatable reads, phantoms</td><td>Fastest</td></tr><tr><td>Read Committed</td><td>Dirty reads</td><td>Non-repeatable reads, phantoms</td><td>Fast</td></tr><tr><td>Repeatable Read</td><td>Dirty + non-repeatable reads</td><td>Phantoms, write skew</td><td>Moderate</td></tr><tr><td>Serializable</td><td>All anomalies</td><td>Nothing</td><td>Slowest</td></tr></table><p class="learn-p"><b>Write skew example (doctors on call):</b> Two doctors are on call. Each checks "are there &ge;2 doctors on call?" (yes), then removes themselves. Both succeed under Repeatable Read — now zero doctors are on call. Only Serializable prevents this.</p></div><div class="learn-section"><div class="learn-h">Two-Phase Commit (2PC)</div><p class="learn-p">2PC coordinates distributed transactions across multiple databases/services:</p><ol class="learn-list"><li><b>Phase 1 (Prepare):</b> Coordinator asks all participants "can you commit?" Each responds yes/no.</li><li><b>Phase 2 (Commit/Abort):</b> If all said yes, coordinator sends "commit." If any said no, sends "abort."</li></ol><p class="learn-p"><b>The blocking problem:</b> If the coordinator crashes after sending "prepare" but before sending "commit," participants are stuck — they\'ve promised to commit but don\'t know whether to proceed. They must wait for the coordinator to recover (potentially hours).</p><div class="learn-warn"><b>Warning:</b> 2PC is correct but not fault-tolerant. In practice, systems use the Saga pattern (compensating transactions) for cross-service transactions, accepting eventual consistency.</div></div><div class="learn-section"><div class="learn-h">Raft Consensus</div><p class="learn-p">Raft is a consensus algorithm for getting multiple nodes to agree on a sequence of values. It has three key mechanisms:</p><ol class="learn-list"><li><b>Leader election:</b> One node is elected leader via randomized timeouts. Requires majority vote (3 of 5, 2 of 3).</li><li><b>Log replication:</b> The leader receives writes, appends to its log, replicates to followers. A write is committed when a majority has it.</li><li><b>Safety:</b> Only nodes with the most up-to-date log can be elected leader. This prevents data loss on failover.</li></ol><p class="learn-p">A 5-node Raft cluster tolerates 2 node failures (majority = 3). If 3 nodes fail, the cluster <b>cannot make progress</b> — it\'s unavailable but doesn\'t lose committed data.</p></div><div class="learn-section"><div class="learn-h">Linearizability vs Serializability</div><p class="learn-p">These are often confused but are fundamentally different:</p><ul class="learn-list"><li><b>Linearizability:</b> Single-object, real-time guarantee. Once a write completes, all subsequent reads (from any client) see it. "Behaves as if there\'s one copy of the data."</li><li><b>Serializability:</b> Multi-object, transaction guarantee. Concurrent transactions produce the same result as some serial order. Says nothing about real-time ordering.</li></ul><p class="learn-p">A system can be serializable but not linearizable (transactions are correctly ordered but reads might return stale data). Or linearizable but not serializable (individual reads/writes are up-to-date but transactions can interleave badly).</p></div><div class="learn-section"><div class="learn-h">CAP Theorem</div><p class="learn-p">During a <b>network partition</b>, a distributed system must choose between:</p><ul class="learn-list"><li><b>Consistency (C):</b> All nodes see the same data. Sacrifice: some requests get errors during the partition.</li><li><b>Availability (A):</b> Every request gets a response. Sacrifice: some responses may be stale.</li></ul><p class="learn-p">"P" (Partition Tolerance) is not a choice — partitions happen whether you want them or not. So the real choice is <b>CP</b> (consistent during partition, some unavailability) or <b>AP</b> (available during partition, some inconsistency).</p><p class="learn-p"><b>PACELC</b> extends CAP: Even when there\'s No partition, you still choose between <b>Latency</b> and <b>Consistency</b>. DynamoDB is PA/EL (available during partition, low latency normally). Spanner is PC/EC (consistent always, higher latency).</p><div class="learn-tip"><b>Tip:</b> CAP is about the fundamental tradeoff during failures. In normal operation (no partition), most systems provide both consistency and availability. The real question is: what happens when things go wrong?</div></div><div class="learn-section"><div class="learn-h">Saga Pattern for Microservices</div><p class="learn-p">In a microservices architecture, a "place order" operation spans multiple services (inventory, payment, shipping). You can\'t use 2PC because each service has its own database. The Saga pattern uses <b>compensating transactions</b>:</p><div class="learn-code">1. Reserve inventory ✓\n2. Charge payment ✗ (failed!)\n3. Compensate: release inventory reservation\n\nOr:\n1. Reserve inventory ✓\n2. Charge payment ✓\n3. Create shipping label ✗ (failed!)\n4. Compensate: refund payment\n5. Compensate: release inventory</div></div>',
          code: `// === Transactions & Consistency ===

// 1. ACID example: bank transfer
BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'savings';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'checking';
  -- If either fails, ROLLBACK (Atomicity)
  -- Both see consistent total (Consistency)
  -- Other transactions don't see partial state (Isolation)
COMMIT;  -- Persisted to disk/WAL (Durability)

// 2. Two-Phase Commit (pseudocode)
class TwoPhaseCommit {
  async execute(participants, transaction) {
    // Phase 1: Prepare
    const votes = await Promise.all(
      participants.map(p => p.prepare(transaction))
    );
    const allYes = votes.every(v => v === 'YES');

    // Phase 2: Commit or Abort
    if (allYes) {
      // Write commit decision to coordinator's WAL first!
      await wal.write({ decision: 'COMMIT', txId: transaction.id });
      await Promise.all(participants.map(p => p.commit(transaction)));
    } else {
      await Promise.all(participants.map(p => p.abort(transaction)));
    }
  }
}
// Problem: if coordinator crashes between Phase 1 and 2,
// participants are BLOCKED (holding locks, waiting)

// 3. Raft leader election (simplified)
class RaftNode {
  constructor() {
    this.state = 'follower';
    this.currentTerm = 0;
    this.votedFor = null;
    this.log = [];
  }

  onElectionTimeout() {
    this.state = 'candidate';
    this.currentTerm++;
    this.votedFor = this.id;
    let votes = 1;
    for (const peer of this.peers) {
      const granted = peer.requestVote(this.currentTerm, this.log.length);
      if (granted) votes++;
    }
    if (votes > this.peers.length / 2) {
      this.state = 'leader';
      this.startHeartbeats();
    }
  }

  appendEntry(entry) {
    // Only leader can accept writes
    this.log.push(entry);
    let acks = 1;
    for (const peer of this.peers) {
      if (peer.replicateLog(entry)) acks++;
    }
    if (acks > this.peers.length / 2) {
      this.commitIndex++;  // committed!
      return true;
    }
    return false;
  }
}

// 4. Saga pattern (compensating transactions)
async function placeOrder(order) {
  try {
    await inventoryService.reserve(order.items);    // step 1
    try {
      await paymentService.charge(order.total);     // step 2
      try {
        await shippingService.createLabel(order);   // step 3
      } catch (e) {
        await paymentService.refund(order.total);   // compensate 2
        await inventoryService.release(order.items);// compensate 1
        throw e;
      }
    } catch (e) {
      await inventoryService.release(order.items);  // compensate 1
      throw e;
    }
  } catch (e) {
    return { status: 'FAILED', error: e.message };
  }
  return { status: 'SUCCESS' };
}

// 5. CAP theorem in practice
// CP systems: etcd, ZooKeeper, Spanner
//   → During partition: unavailable (refuse reads/writes)
// AP systems: DynamoDB, Cassandra
//   → During partition: available but may serve stale data`,
          problems: [
            ["Explain ACID with a banking transfer: what breaks without each property?","#","Medium"],
            ["2PC: coordinator crashes after prepare — describe the blocking problem","#","Hard"],
            ["Raft: 5-node cluster loses 2 nodes — can it make progress? What about 3?","#","Medium"],
            ["Linearizability vs serializability: give example where one holds but not other","#","Hard"],
            ["CAP theorem: CP vs AP for financial system vs social media","#","Medium"],
            ["Saga pattern: step 3 fails after 1 and 2 succeed — design compensation","#","Medium"],
          ],
          mcqs: [
            {"q":"In the write skew problem (doctors on call), which isolation level prevents it?","o":["Read Committed","Repeatable Read","Serializable","Read Uncommitted"],"a":2},
            {"q":"The main problem with Two-Phase Commit is:","o":["It's too slow","It can't handle more than 2 participants","Participants are blocked if the coordinator crashes","It doesn't guarantee atomicity"],"a":2},
            {"q":"A 5-node Raft cluster can tolerate how many simultaneous node failures?","o":["1","2","3","4"],"a":1},
            {"q":"In the CAP theorem, \"P\" (partition tolerance) is:","o":["An optional feature you can disable","Not a real choice — partitions happen regardless","Only relevant for multi-datacenter setups","Guaranteed by using TCP"],"a":1},
          ],
        }
      ]
    },
    {
      id: "designs", t: "System Designs",
      topics: [
        {
          t: "Rate Limiter",
          learn: '<div class="learn-section"><div class="learn-h">Why Rate Limiting?</div><p class="learn-p">Rate limiting controls how many requests a client can make in a given time window. It protects against: (1) <b>Denial of Service</b> — malicious or buggy clients overwhelming the system, (2) <b>Cost control</b> — preventing API abuse that incurs infrastructure costs, (3) <b>Fair usage</b> — ensuring one client doesn\'t monopolize shared resources.</p><p class="learn-p">Rate limits are typically expressed as: <code>100 requests/minute per user</code> or <code>10,000 requests/hour per API key</code>.</p></div><div class="learn-section"><div class="learn-h">Token Bucket Algorithm</div><p class="learn-p">The <b>token bucket</b> is the most widely used algorithm. A bucket holds tokens (up to a maximum capacity). Tokens are added at a fixed rate. Each request consumes one token. If the bucket is empty, the request is rejected.</p><div class="learn-code">Bucket capacity: 100 tokens\nRefill rate: 10 tokens/second\n\nt=0:  Bucket has 100 tokens.\n      Client sends 100 requests instantly → all allowed, bucket = 0.\nt=0.1: Bucket = 1 token (refilled). Client sends 1 request → allowed.\nt=10: Bucket = 100 tokens (full). Allows another burst.</div><p class="learn-p"><b>Key property:</b> Token bucket <b>allows bursts</b> up to the bucket capacity, while maintaining a long-term average rate. This is ideal for APIs where occasional bursts are acceptable.</p></div><div class="learn-section"><div class="learn-h">Leaking Bucket Algorithm</div><p class="learn-p">The leaking bucket processes requests at a <b>fixed rate</b> regardless of arrival pattern. Incoming requests enter a queue (bucket). The queue is drained at a constant rate. If the queue is full, requests are dropped.</p><p class="learn-p"><b>Difference from token bucket:</b> A client sending 100 requests in 1 second followed by nothing for 9 seconds — the token bucket allows the burst, while the leaking bucket smooths it to 10 req/s. Leaking bucket is better for <b>traffic shaping</b> (e.g., video encoding pipelines that need steady throughput).</p></div><div class="learn-section"><div class="learn-h">Sliding Window Algorithms</div><p class="learn-p"><b>Fixed Window Counter:</b> Count requests in fixed time windows (e.g., 0:00-0:59, 1:00-1:59). Problem: a client sends 100 requests at 0:59 and 100 at 1:01 — 200 requests in 2 seconds while staying within the per-minute limit.</p><p class="learn-p"><b>Sliding Window Log:</b> Store timestamps of all requests. For each new request, count timestamps within the last window. Accurate but memory-intensive — storing timestamps for 10M API keys at 100 req/min each requires significant storage.</p><p class="learn-p"><b>Sliding Window Counter (hybrid):</b> Uses a weighted formula combining the previous and current window counts. If the current window is 70% through, previous window had 80 requests, current has 30:</p><div class="learn-code">estimated_count = prev_count * (1 - window_position) + curr_count\n                = 80 * 0.3 + 30 = 54 requests</div><p class="learn-p">This approximation has &lt;1% error in practice and uses minimal memory (just two counters per key).</p></div><div class="learn-section"><div class="learn-h">Distributed Rate Limiting</div><p class="learn-p">With multiple servers, local counters are insufficient — a client hitting different servers bypasses the limit. Solutions:</p><ol class="learn-list"><li><b>Centralized counter in Redis:</b> All servers check/increment a shared counter. Use Lua scripting to make check-and-increment atomic, avoiding race conditions.</li><li><b>Local rate limiting with sync:</b> Each server maintains local counters and periodically syncs with a central store. Less accurate but eliminates Redis as a bottleneck.</li><li><b>Sticky routing:</b> Route all requests from one client to the same server. Then local counters suffice, but this limits load balancing flexibility.</li></ol><div class="learn-code">// Redis Lua script for atomic rate limiting\nlocal key = KEYS[1]\nlocal limit = tonumber(ARGV[1])\nlocal window = tonumber(ARGV[2])\nlocal current = tonumber(redis.call(\'GET\', key) or 0)\nif current &lt; limit then\n  redis.call(\'INCR\', key)\n  redis.call(\'EXPIRE\', key, window)\n  return 1  -- allowed\nend\nreturn 0    -- rejected</div></div><div class="learn-section"><div class="learn-h">Multi-Tier Rate Limiting</div><p class="learn-p">Real systems need multiple rate limit levels:</p><ul class="learn-list"><li><b>Per-user:</b> 100 req/min (prevent individual abuse)</li><li><b>Per-IP:</b> 1,000 req/min (prevent distributed attacks from one network)</li><li><b>Per-endpoint:</b> /api/search at 100 req/min, /api/upload at 10 req/min</li><li><b>Global:</b> 100K req/min (protect overall system capacity)</li></ul><p class="learn-p">Check order: cheapest first. Per-IP is a simple hash lookup, so check it first. Per-user requires authentication lookup, check it second. Global is a shared counter, check it last.</p><div class="learn-warn"><b>Warning:</b> A shared office with 50 users behind one IP may legitimately make 2,500 req/min. If the per-IP limit is 1,000, legitimate users are blocked. Solution: authenticated users get per-user limits; per-IP limits only apply to unauthenticated traffic.</div></div><div class="learn-section"><div class="learn-h">Where to Rate Limit</div><p class="learn-p">Three options: (1) <b>API Gateway</b> — centralized, easy to manage, but the gateway becomes a bottleneck. (2) <b>Middleware in each service</b> — decentralized, each service protects itself. (3) <b>Dedicated rate limit service</b> — separate service queried by all others.</p><p class="learn-p"><b>Fail open vs fail closed:</b> If the rate limiter goes down, do you allow all traffic (fail open, risking overload) or reject all traffic (fail closed, causing an outage)? For most systems, fail open is preferred — it\'s better to be unprotected briefly than completely unavailable.</p></div>',
          code: `// === Rate Limiter Algorithms ===

// 1. Token Bucket
class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;  // tokens per second
    this.lastRefill = Date.now();
  }

  allow() {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;  // rate limited
  }

  refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }
}

// 2. Sliding Window Counter
class SlidingWindowCounter {
  constructor(windowMs, limit) {
    this.windowMs = windowMs;
    this.limit = limit;
    this.prevCount = 0;
    this.currCount = 0;
    this.windowStart = Date.now();
  }

  allow() {
    const now = Date.now();
    const elapsed = now - this.windowStart;
    if (elapsed >= this.windowMs) {
      this.prevCount = this.currCount;
      this.currCount = 0;
      this.windowStart = now;
    }
    const windowPos = (now - this.windowStart) / this.windowMs;
    const estimate = this.prevCount * (1 - windowPos) + this.currCount;
    if (estimate < this.limit) {
      this.currCount++;
      return true;
    }
    return false;
  }
}

// 3. Redis-based distributed rate limiter (Lua script)
// KEYS[1] = rate_limit:{user_id}
// ARGV[1] = limit (e.g., 100)
// ARGV[2] = window in seconds (e.g., 60)
RATE_LIMIT_SCRIPT = \`
  local key = KEYS[1]
  local limit = tonumber(ARGV[1])
  local window = tonumber(ARGV[2])
  local current = tonumber(redis.call('GET', key) or '0')
  if current < limit then
    redis.call('INCR', key)
    if current == 0 then
      redis.call('EXPIRE', key, window)
    end
    return 1
  end
  return 0
\`

// 4. HTTP Response headers for rate limiting
// X-RateLimit-Limit: 100
// X-RateLimit-Remaining: 37
// X-RateLimit-Reset: 1623456789  (Unix epoch)
// Retry-After: 23  (seconds, when 429 returned)`,
          problems: [
            ["Compare token bucket and leaking bucket for bursty traffic patterns","#","Medium"],
            ["Fixed window counter boundary flaw — design sliding window fix","#","Medium"],
            ["Distributed rate limiter: race condition with shared Redis counter","#","Hard"],
            ["Multi-tier limiter: per-user, per-IP, global — design evaluation order","#","Hard"],
            ["Rate limiter at gateway vs middleware vs dedicated service — compare failure modes","#","Medium"],
          ],
          mcqs: [
            {"q":"Which rate limiting algorithm allows request bursts up to bucket capacity?","o":["Leaking bucket","Token bucket","Fixed window counter","Sliding window log"],"a":1},
            {"q":"In a sliding window counter, previous window had 80 requests and current (30% through) has 20. Estimated count is:","o":["100","76","56","44"],"a":1},
            {"q":"Why is Lua scripting needed for Redis-based rate limiting?","o":["Lua is faster than Redis commands","To make check-and-increment atomic","Redis does not support counters natively","To handle multiple data types"],"a":1},
            {"q":"If the centralized rate limiter service goes down, \"fail open\" means:","o":["Reject all requests","Allow all requests (no rate limiting)","Return cached rate limit decisions","Queue all requests until limiter recovers"],"a":1},
          ],
        },
        {
          t: "Key-Value Store",
          learn: '<div class="learn-section"><div class="learn-h">Key-Value Store Architecture</div><p class="learn-p">A distributed key-value store is the backbone of many modern systems (DynamoDB, Cassandra, Redis, Riak). The core operations are <code>get(key)</code> and <code>put(key, value)</code>, but designing one that handles 1M ops/sec with 99.9% availability requires solving several hard distributed systems problems.</p><p class="learn-p">Architecture overview: Keys are <b>partitioned</b> across nodes using consistent hashing. Each key is <b>replicated</b> to N nodes for durability. A <b>coordinator</b> node routes each request to the correct partition.</p><div class="learn-code">Client -&gt; Coordinator -&gt; finds responsible nodes via consistent hash ring\n                      -&gt; sends write to N replicas\n                      -&gt; waits for W acknowledgments (quorum)\n                      -&gt; returns success to client</div></div><div class="learn-section"><div class="learn-h">Quorum Reads &amp; Writes</div><p class="learn-p">With <b>N</b> replicas, <b>W</b> write acknowledgments, and <b>R</b> read responses required:</p><table class="learn-table"><tr><th>Config</th><th>Consistency</th><th>Availability</th><th>Latency</th></tr><tr><td>W=1, R=1</td><td>Weak (fast but can read stale)</td><td>Highest</td><td>Lowest</td></tr><tr><td>W=N, R=1</td><td>Strong reads, but slow writes</td><td>Low (any node failure blocks writes)</td><td>Writes slow</td></tr><tr><td>W=1, R=N</td><td>Strong (but slow reads)</td><td>Low (any failure blocks reads)</td><td>Reads slow</td></tr><tr><td>W=2, R=2 (N=3)</td><td>Strong (W+R &gt; N)</td><td>Moderate</td><td>Moderate</td></tr></table><p class="learn-p">The rule: if <b>W + R &gt; N</b>, every read sees at least one replica with the latest write — <b>strong consistency</b>. If W + R &le; N, you get <b>eventual consistency</b> with lower latency.</p><div class="learn-tip"><b>Tip:</b> For a system where reads must be under 5ms but writes can be slower, use R=1, W=2 (with N=3). Reads hit one fast replica; writes ensure durability on two nodes.</div></div><div class="learn-section"><div class="learn-h">Conflict Resolution</div><p class="learn-p">In a leaderless system, two clients can write to the same key simultaneously:</p><div class="learn-code">Client A writes {name: "Alice"} to replicas 1, 2\nClient B writes {name: "Bob"} to replicas 2, 3\nReplica 2 has both writes!</div><p class="learn-p">Conflict resolution strategies:</p><ul class="learn-list"><li><b>Last Write Wins (LWW):</b> Use timestamps; latest write wins. Simple but <b>dangerous</b> — clock skew can discard valid writes. Data loss is possible.</li><li><b>Vector Clocks:</b> Each node maintains a version vector. Concurrent writes are detected and both versions kept. The application (or user) resolves the conflict.</li><li><b>CRDTs:</b> Conflict-Free Replicated Data Types automatically merge concurrent updates (e.g., counters, sets). No conflicts by design, but limited to specific data structures.</li></ul><div class="learn-warn"><b>Warning:</b> LWW loses data silently. Amazon\'s shopping cart famously used "merge all" conflict resolution — showing deleted items is better than losing added items.</div></div><div class="learn-section"><div class="learn-h">Vector Clocks</div><p class="learn-p">Vector clocks track causality across nodes. Each node maintains a counter for every other node:</p><div class="learn-code">Node A writes x=1:   VC = {A:1}\nNode B reads x, writes x=2: VC = {A:1, B:1}\nNode C writes x=3 (without reading): VC = {C:1}\n\nB\'s VC {A:1, B:1} and C\'s VC {C:1} are concurrent\n(neither dominates the other) → CONFLICT detected</div><p class="learn-p">Scalability problem: with 1000 nodes, the vector clock has 1000 entries per key. Solution: prune entries from nodes that haven\'t updated recently, or use dotted version vectors.</p></div><div class="learn-section"><div class="learn-h">Failure Detection &amp; Recovery</div><p class="learn-p"><b>Gossip protocol</b> for failure detection: each node periodically pings random other nodes and shares its membership list. If a node hasn\'t been heard from in T seconds, it\'s suspected. After 2T, it\'s marked dead. The protocol is decentralized — no single failure detector to fail.</p><p class="learn-p"><b>Recovery mechanisms:</b></p><ul class="learn-list"><li><b>Hinted handoff:</b> When a replica is down, writes go to a temporary node with a "hint." When the replica recovers, hints are forwarded to it.</li><li><b>Read repair:</b> On a read, if replicas disagree, the coordinator updates stale replicas with the latest value.</li><li><b>Anti-entropy with Merkle trees:</b> Replicas exchange Merkle tree roots. If they differ, they drill down to find exactly which keys are out of sync — reduces comparison from O(n) to <span class="learn-complexity">O(log n)</span>.</li></ul></div><div class="learn-section"><div class="learn-h">Storage Engine: LSM Trees</div><p class="learn-p">Most KV stores use an LSM tree (Log-Structured Merge tree) for writes:</p><ol class="learn-list"><li>Write goes to <b>WAL</b> (write-ahead log) on disk for durability</li><li>Write goes to <b>memtable</b> (in-memory sorted structure, typically a red-black tree)</li><li>When memtable is full, it\'s flushed to disk as an <b>SSTable</b> (Sorted String Table)</li><li>Background <b>compaction</b> merges SSTables, removing duplicates and deletions</li></ol><p class="learn-p">Reads check memtable first, then SSTables from newest to oldest. <b>Bloom filters</b> on each SSTable quickly determine if a key might exist, avoiding unnecessary disk reads.</p></div><div class="learn-section"><div class="learn-h">CP vs AP: The CAP Trade-off</div><p class="learn-p">During a network partition, you must choose:</p><ul class="learn-list"><li><b>CP (Consistent, Partition-tolerant):</b> System becomes unavailable during partition to guarantee consistency. Best for financial transactions (better to fail than to double-spend).</li><li><b>AP (Available, Partition-tolerant):</b> System remains available but may serve stale data. Best for social media (showing a slightly stale like count is fine).</li></ul><p class="learn-p">DynamoDB and Cassandra are AP. Etcd and ZooKeeper are CP. Most real systems use <b>tunable consistency</b> — adjust R, W, N per-query based on the use case.</p></div>',
          code: `// === Key-Value Store Design ===

// 1. Write path (LSM Tree)
function put(key, value) {
  // Step 1: Write to WAL for durability
  wal.append(key, value, timestamp);

  // Step 2: Write to memtable (in-memory sorted structure)
  memtable.insert(key, value);

  // Step 3: If memtable full, flush to SSTable on disk
  if (memtable.size() > THRESHOLD) {
    sstable = memtable.flush();   // sorted, immutable file
    sstables.add(sstable);
    memtable = new Memtable();
  }
}

// 2. Read path
function get(key) {
  // Check memtable first (newest data)
  val = memtable.get(key);
  if (val) return val;

  // Check SSTables from newest to oldest
  for (sstable of sstables.reverseOrder()) {
    if (sstable.bloomFilter.mightContain(key)) {
      val = sstable.get(key);
      if (val) return val;
    }
  }
  return null;  // key not found
}

// 3. Quorum write (N=3, W=2)
async function quorumPut(key, value) {
  const replicas = hashRing.getNodes(key, 3);  // N=3
  const promises = replicas.map(r => r.put(key, value));
  const results = await Promise.allSettled(promises);
  const successes = results.filter(r => r.status === 'fulfilled');
  if (successes.length >= 2) return 'OK';   // W=2 met
  throw new Error('Write quorum not met');
}

// 4. Vector clock conflict detection
function isConflict(vc1, vc2) {
  let vc1Dominates = false, vc2Dominates = false;
  for (const node of allNodes) {
    if (vc1[node] > vc2[node]) vc1Dominates = true;
    if (vc2[node] > vc1[node]) vc2Dominates = true;
  }
  return vc1Dominates && vc2Dominates;  // concurrent!
}

// 5. Gossip protocol (failure detection)
setInterval(() => {
  const peer = randomPeer();
  const myList = membershipList.serialize();
  const peerList = peer.exchange(myList);
  membershipList.merge(peerList);
  // If peer.lastHeartbeat > 2*T, mark suspected
}, GOSSIP_INTERVAL);

// 6. Merkle tree anti-entropy
// Compare root hashes; if different, compare children
// Drill down to find exactly which keys diverge
// Only transfer divergent keys: O(log n) comparisons`,
          problems: [
            ["Design complete KV store architecture for 1M ops/sec, 99.9% availability","#","Hard"],
            ["Quorum: compare R=1/W=1, R=2/W=2, R=1/W=3 with N=3 replicas","#","Medium"],
            ["Two concurrent writes to same key — explain conflict with vector clocks","#","Hard"],
            ["Node down 3 hours: compare read repair, anti-entropy, hinted handoff","#","Medium"],
            ["CP vs AP for financial transactions vs social media likes","#","Medium"],
          ],
          mcqs: [
            {"q":"With N=3 replicas, which quorum configuration guarantees strong consistency?","o":["W=1, R=1","W=1, R=2","W=2, R=2","W=1, R=3"],"a":2},
            {"q":"What is the primary advantage of Merkle trees in anti-entropy repair?","o":["Faster writes","Reduces comparison from O(n) to O(log n)","Eliminates the need for replication","Provides encryption for data at rest"],"a":1},
            {"q":"In Last Write Wins conflict resolution, what is the main risk?","o":["Higher latency","Silent data loss due to clock skew","Increased storage requirements","Network partition handling"],"a":1},
            {"q":"A Bloom filter on an SSTable helps with:","o":["Speeding up writes","Quickly determining if a key might exist on disk","Compressing data on disk","Resolving write conflicts"],"a":1},
          ],
        },
        {
          t: "URL Shortener",
          learn: '<div class="learn-section"><div class="learn-h">Core Requirements</div><p class="learn-p">A URL shortener (like bit.ly) maps long URLs to short ones: <code>shorturl.com/abc123</code> &rarr; <code>https://very-long-original-url.com/path?query=...</code>. Key design considerations:</p><ul class="learn-list"><li><b>Scale:</b> 100M new URLs/month, read:write ratio of 100:1</li><li><b>Short URL length:</b> As short as possible while avoiding collisions</li><li><b>Redirect speed:</b> Low latency (&lt;50ms) for the redirect</li><li><b>Analytics:</b> Track clicks, geographic distribution, referrers</li></ul></div><div class="learn-section"><div class="learn-h">Base62 Encoding &amp; URL Length</div><p class="learn-p"><b>Base62</b> uses characters a-z, A-Z, 0-9 (62 characters). The number of unique URLs for length L is 62^L:</p><table class="learn-table"><tr><th>Length</th><th>Unique URLs</th><th>Years at 100M/month</th></tr><tr><td>6</td><td>56.8 billion</td><td>~47 years</td></tr><tr><td>7</td><td>3.5 trillion</td><td>~2,900 years</td></tr><tr><td>8</td><td>218 trillion</td><td>~181,000 years</td></tr></table><p class="learn-p">7 characters gives 3.5 trillion possibilities — more than enough. Start with 7 characters.</p></div><div class="learn-section"><div class="learn-h">ID Generation: Hash vs Auto-Increment</div><p class="learn-p">Two main approaches:</p><table class="learn-table"><tr><th>Approach</th><th>Collision Handling</th><th>Predictability</th><th>URL Reuse</th><th>Scalability</th></tr><tr><td><b>Hash (MD5/SHA) + truncate</b></td><td>Birthday paradox risk; need collision resolution</td><td>Not guessable</td><td>Same URL &rarr; same short URL (if desired)</td><td>Stateless</td></tr><tr><td><b>Auto-increment ID + base62</b></td><td>No collisions by design</td><td>Sequential/guessable</td><td>Same URL gets different short URLs each time</td><td>Needs distributed ID generator</td></tr></table><p class="learn-p"><b>Collision probability (Birthday Paradox):</b> With 7 base62 chars (3.5T space) and 1B URLs: P(collision) &asymp; n^2 / (2m) = 10^18 / (7 &times; 10^12) &asymp; 142. Collisions are <b>guaranteed</b>! You must detect and resolve them (retry with appended random bits, or use a longer hash).</p></div><div class="learn-section"><div class="learn-h">Distributed ID Generation (Snowflake)</div><p class="learn-p">For the auto-increment approach at scale, you need a distributed ID generator. Twitter\'s <b>Snowflake</b> produces 64-bit IDs:</p><div class="learn-code">| 1 bit unused | 41 bits timestamp | 5 bits datacenter | 5 bits machine | 12 bits sequence |\n\n41 bits timestamp: ~69 years of milliseconds\n5 bits datacenter: 32 data centers\n5 bits machine: 32 machines per DC\n12 bits sequence: 4,096 IDs per millisecond per machine\n\nTotal: 4,096 * 1,000 * 32 * 32 = ~4.2 billion IDs/second</div><p class="learn-p">IDs are roughly time-ordered (useful for sorting), unique across all machines (no coordination needed), and fit in a 64-bit integer.</p></div><div class="learn-section"><div class="learn-h">301 vs 302 Redirects</div><table class="learn-table"><tr><th>Redirect</th><th>Browser Behavior</th><th>Analytics Impact</th><th>Server Load</th></tr><tr><td><b>301 (Permanent)</b></td><td>Caches the redirect; future visits skip your server</td><td>Undercounts clicks (browser caches)</td><td>Lower (cached)</td></tr><tr><td><b>302 (Temporary)</b></td><td>Always hits your server for each visit</td><td>Accurate click tracking</td><td>Higher</td></tr></table><p class="learn-p">If click analytics matter (which they do for most URL shorteners), use <b>302 redirects</b>.</p></div><div class="learn-section"><div class="learn-h">Caching &amp; Database Design</div><p class="learn-p">Access pattern follows a <b>power-law distribution</b>: 20% of URLs get 80% of traffic. Cache the hot URLs in Redis.</p><div class="learn-code">Cache size estimate:\n10B total URLs, but only top 20% are "hot"\nHot URLs: 2B * 500 bytes = 1 TB\nFor 90% hit ratio, need ~20% of hot URLs cached\nCache size: ~200 GB (fits in a large Redis cluster)</div><p class="learn-p"><b>Database schema:</b></p><div class="learn-code">Table: url_mappings\n  short_url  VARCHAR(8) PRIMARY KEY  -- indexed, fast lookup\n  long_url   TEXT NOT NULL\n  created_at TIMESTAMP\n  expires_at TIMESTAMP\n  user_id    BIGINT</div><p class="learn-p">Shard by short_url (hash partitioning). The uniqueness check for the hash approach requires checking the shard — this is where the auto-increment approach has an advantage (no uniqueness check needed).</p></div><div class="learn-section"><div class="learn-h">Handling Custom Aliases &amp; Expiration</div><p class="learn-p"><b>Custom aliases</b> (e.g., <code>myapp.co/sale2024</code>): Reserve a namespace prefix or character set to separate custom from auto-generated URLs. For example, auto-generated URLs start with a lowercase letter; custom aliases can start with uppercase or a digit.</p><p class="learn-p"><b>Expiration:</b> Use lazy deletion — don\'t actively scan for expired URLs. Instead, check <code>expires_at</code> on each redirect request. Run a background cleanup job periodically to reclaim storage.</p></div>',
          code: `// === URL Shortener Design ===

// 1. Base62 encoding
const CHARSET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function base62Encode(num) {
  let result = '';
  while (num > 0) {
    result = CHARSET[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result.padStart(7, 'a');  // ensure 7 chars
}

// 2. Snowflake-style ID generator
class SnowflakeID {
  // 41 bits: timestamp (ms since epoch)
  //  5 bits: datacenter ID (0-31)
  //  5 bits: machine ID (0-31)
  // 12 bits: sequence (0-4095)
  constructor(datacenterId, machineId) {
    this.datacenterId = datacenterId;
    this.machineId = machineId;
    this.sequence = 0;
    this.lastTimestamp = -1;
  }

  nextId() {
    let ts = Date.now();
    if (ts === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & 0xFFF; // 4095
      if (this.sequence === 0) ts = waitNextMs(ts);
    } else {
      this.sequence = 0;
    }
    this.lastTimestamp = ts;
    return ((ts - EPOCH) << 22) |
           (this.datacenterId << 17) |
           (this.machineId << 12) |
           this.sequence;
  }
}

// 3. URL shortening with hash approach
async function shortenURL(longUrl) {
  const hash = md5(longUrl).substring(0, 7);  // first 43 bits
  const existing = await db.get(hash);
  if (existing && existing.longUrl === longUrl) return hash; // reuse
  if (existing) {
    // Collision! Append random bits and retry
    return shortenURL(longUrl + randomSalt());
  }
  await db.put(hash, { longUrl, createdAt: Date.now() });
  return hash;
}

// 4. Redirect endpoint
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;

  // Check cache first
  let longUrl = await redis.get(\`url:\${shortUrl}\`);
  if (!longUrl) {
    const record = await db.get(shortUrl);
    if (!record || record.expiresAt < Date.now()) {
      return res.status(404).send('URL not found or expired');
    }
    longUrl = record.longUrl;
    await redis.setex(\`url:\${shortUrl}\`, 3600, longUrl);
  }

  // Track analytics asynchronously
  analyticsQueue.push({ shortUrl, ip: req.ip, ua: req.headers['user-agent'] });

  res.redirect(302, longUrl);  // 302 for analytics tracking
});

// 5. Database: sharded by short_url
// Shard = hash(short_url) % NUM_SHARDS
// Each shard: ~600M rows (10B / 16 shards)`,
          problems: [
            ["Base62 encoding: calculate unique URLs for length 6, 7, 8","#","Medium"],
            ["Hash vs auto-increment ID: compare collision, predictability, scalability","#","Medium"],
            ["Distributed ID generation: analyze Snowflake bit fields","#","Hard"],
            ["301 vs 302 redirect: impact on caching, analytics, server load","#","Medium"],
            ["Design caching layer for power-law URL access distribution","#","Medium"],
          ],
          mcqs: [
            {"q":"With base62 encoding and 7-character short URLs, the maximum unique URLs is approximately:","o":["56 billion","3.5 trillion","218 trillion","1 billion"],"a":1},
            {"q":"Why is 302 (temporary) redirect preferred over 301 for URL shorteners with analytics?","o":["302 is faster","Browsers don't cache 302, so every click hits the server for tracking","301 is deprecated","302 supports HTTPS while 301 does not"],"a":1},
            {"q":"In Twitter's Snowflake ID, how many IDs can one machine generate per millisecond?","o":["1,024","4,096","65,536","1,000,000"],"a":1},
          ],
        },
        {
          t: "Web Crawler",
          learn: '<div class="learn-section"><div class="learn-h">Web Crawler Requirements</div><p class="learn-p">A web crawler systematically downloads web pages, extracts links, and follows them to discover new content. At scale (search engines), crawlers must handle billions of pages.</p><div class="learn-code">Target: 1 billion pages in 1 week\nPages/second = 1B / (7 * 86,400) ≈ 1,653 pages/sec\nIf each page takes 2s to download: need ~3,300 concurrent threads\nAt 500 threads/machine: need ~7 machines</div></div><div class="learn-section"><div class="learn-h">BFS vs DFS Traversal</div><p class="learn-p"><b>BFS (Breadth-First Search)</b> is preferred for web crawling because:</p><ul class="learn-list"><li>It discovers <b>high-quality pages first</b> — seed URLs are typically authoritative (Wikipedia, CNN), and their direct links are likely important too.</li><li>DFS gets trapped in deep chains (especially spider traps — infinite URL generators).</li><li>BFS provides <b>fair coverage</b> across domains rather than deep-diving into one site.</li></ul><p class="learn-p"><b>Priority-aware BFS:</b> Pure BFS treats all URLs equally. A priority queue replaces the simple FIFO queue. Priority considers: page importance (PageRank), domain authority, freshness need, and explicitly requested re-crawls.</p></div><div class="learn-section"><div class="learn-h">Politeness &amp; Rate Limiting</div><p class="learn-p">A polite crawler doesn\'t overwhelm any single web server. With 1000 threads crawling simultaneously, you must enforce <b>at most 1 request per second per domain</b>.</p><p class="learn-p">Design: Use a <b>domain-based queue system</b>. Each domain has its own queue. A scheduler assigns work from domain queues with rate limiting — after fetching from domain X, that queue is locked for 1 second before the next fetch.</p><p class="learn-p"><b>robots.txt:</b> Every crawler must respect robots.txt directives. Cache robots.txt per domain (re-fetch every 24 hours). If robots.txt is temporarily unavailable, the conservative approach is to <b>block crawling</b> (not assume everything is allowed).</p></div><div class="learn-section"><div class="learn-h">URL Deduplication</div><p class="learn-p">When you download a page and extract 50 URLs, most have already been crawled. Checking 10 billion URLs in a hash set requires ~300GB of memory. Solutions:</p><ul class="learn-list"><li><b>Bloom filter:</b> Uses ~1.5GB for 10B URLs at 1% false positive rate. False positives mean we occasionally skip a new URL (acceptable). No false negatives — we never re-crawl a seen URL.</li><li><b>Distributed hash partitioning:</b> Partition the URL space across machines. Each machine holds a subset of seen URLs in memory.</li></ul><div class="learn-tip"><b>Tip:</b> Before checking dedup, <b>normalize URLs</b>: lowercase the hostname, remove default ports, sort query parameters, remove fragments (#section), remove tracking parameters (?ref=google).</div></div><div class="learn-section"><div class="learn-h">Content Deduplication</div><p class="learn-p">Many pages have identical or near-identical content (syndicated articles, mirrors). For <b>exact duplicates</b>: hash the page content (MD5/SHA). For <b>near-duplicates</b>: use <b>SimHash</b> — a fingerprint where similar documents produce similar hashes. Two documents are near-duplicates if their SimHash values differ by &le;3 bits.</p></div><div class="learn-section"><div class="learn-h">Spider Traps</div><p class="learn-p">Spider traps generate infinite URLs: calendar pages going infinitely into the future, session IDs in URLs creating unique pages, or infinite pagination. Detection strategies:</p><ol class="learn-list"><li><b>URL length limit:</b> Reject URLs longer than 256 characters.</li><li><b>Depth limit:</b> Don\'t follow links more than 15 levels deep from seed URLs.</li><li><b>Pattern detection:</b> Detect repeating URL structures (e.g., /a/b/a/b/a/b...).</li><li><b>Blacklisting:</b> Manually blacklist known trap domains.</li></ol></div><div class="learn-section"><div class="learn-h">DNS Resolution Bottleneck</div><p class="learn-p">Each DNS lookup takes 10-100ms. At 10,000 pages/sec, that\'s potentially 1,000 seconds of DNS time per second. Solutions: run a <b>local DNS resolver/cache</b> (reduces most lookups to &lt;1ms), and <b>prefetch DNS</b> for URLs in the frontier queue before they\'re needed.</p></div><div class="learn-section"><div class="learn-h">Distributed Architecture</div><div class="learn-code">Seed URLs -&gt; URL Frontier (priority queue)\n                |  (domain-based rate limiting)\n                v\n         URL Fetcher (distributed, 100 machines)\n                |  (respects robots.txt)\n                v\n         Content Parser (extract text, links, metadata)\n                |           |\n                v           v\n        Content Store    URL Filter &amp; Dedup\n        (raw HTML)       (Bloom filter)\n                            |\n                            v\n                     New URLs -&gt; back to Frontier</div></div>',
          code: `// === Web Crawler Design ===

// 1. URL Frontier with priority and politeness
class URLFrontier {
  constructor() {
    this.priorityQueues = [[], [], []]; // high, medium, low
    this.domainQueues = {};  // domain -> queue of URLs
    this.domainLastFetch = {};  // domain -> timestamp
    this.POLITENESS_DELAY = 1000; // 1 second between requests to same domain
  }

  addURL(url, priority) {
    const domain = extractDomain(url);
    if (!this.domainQueues[domain]) {
      this.domainQueues[domain] = [];
    }
    this.domainQueues[domain].push(url);
    this.priorityQueues[priority].push(domain);
  }

  getNextURL() {
    for (const queue of this.priorityQueues) {
      while (queue.length > 0) {
        const domain = queue.shift();
        const now = Date.now();
        if (now - (this.domainLastFetch[domain] || 0) >= this.POLITENESS_DELAY) {
          this.domainLastFetch[domain] = now;
          return this.domainQueues[domain].shift();
        }
        queue.push(domain); // re-enqueue, not ready yet
      }
    }
    return null;
  }
}

// 2. Bloom Filter for URL deduplication
// For 10B URLs at 1% FP rate: ~1.5 GB memory
class BloomFilter {
  constructor(expectedItems, fpRate) {
    this.size = Math.ceil(-expectedItems * Math.log(fpRate) / (Math.LN2 ** 2));
    this.numHashes = Math.ceil((this.size / expectedItems) * Math.LN2);
    this.bits = new BitArray(this.size);
  }
  add(item) { /* set bits at hash positions */ }
  mightContain(item) { /* check bits at hash positions */ }
}

// 3. URL normalization
function normalizeURL(url) {
  let u = new URL(url);
  u.hostname = u.hostname.toLowerCase();
  u.hash = '';                        // remove fragment
  if (u.port === '80' || u.port === '443') u.port = '';
  // Sort query params
  u.search = new URLSearchParams([...u.searchParams].sort()).toString();
  // Remove tracking params
  ['ref', 'utm_source', 'utm_medium'].forEach(p => u.searchParams.delete(p));
  return u.toString();
}

// 4. robots.txt parser (cached per domain)
robotsCache = {};
async function canFetch(url) {
  const domain = extractDomain(url);
  if (!robotsCache[domain] || robotsCache[domain].age > 24 * 3600) {
    robotsCache[domain] = await fetchAndParse(domain + '/robots.txt');
  }
  return robotsCache[domain].isAllowed(url, 'MyBot');
}

// 5. Spider trap detection
function isSpiderTrap(url, depth) {
  if (url.length > 256) return true;          // URL too long
  if (depth > 15) return true;                 // too deep
  if (hasRepeatingPattern(url)) return true;   // /a/b/a/b/...
  return false;
}

// 6. SimHash for near-duplicate detection
function simhash(document) {
  const tokens = tokenize(document);
  const vector = new Array(64).fill(0);
  for (const token of tokens) {
    const hash = hash64(token);
    for (let i = 0; i < 64; i++) {
      vector[i] += (hash >> i) & 1 ? 1 : -1;
    }
  }
  return vector.map(v => v > 0 ? 1 : 0);  // 64-bit fingerprint
}
// Hamming distance <= 3 bits = near duplicate`,
          problems: [
            ["Design crawler for 1B pages/week: calculate threads and machines needed","#","Medium"],
            ["BFS vs DFS: why BFS preferred? Design priority-aware BFS frontier","#","Medium"],
            ["Politeness: ensure max 1 req/s per domain with 1000 concurrent threads","#","Hard"],
            ["URL dedup with 10B URLs: Bloom filter vs hash set — tradeoffs","#","Medium"],
            ["Spider trap detection: design automated mechanisms","#","Medium"],
          ],
          mcqs: [
            {"q":"Why is BFS preferred over DFS for web crawling?","o":["BFS is faster","BFS discovers high-quality pages first and avoids traps","DFS requires more memory","BFS handles JavaScript-rendered pages better"],"a":1},
            {"q":"A Bloom filter for 10 billion URLs at 1% false positive rate requires approximately:","o":["100 MB","1.5 GB","30 GB","300 GB"],"a":1},
            {"q":"What does a false positive in the URL Bloom filter mean for crawling?","o":["A new URL is mistakenly crawled twice","A new URL is mistakenly skipped","An old URL is re-crawled","The crawler crashes"],"a":1},
          ],
        },
        {
          t: "Notification System",
          learn: '<div class="learn-section"><div class="learn-h">Multi-Channel Architecture</div><p class="learn-p">A notification system must support multiple delivery channels: iOS push (APNS), Android push (FCM), SMS, email, and potentially WhatsApp or in-app notifications. The architecture should be <b>pluggable</b> — adding a new channel requires implementing one interface, not modifying core logic.</p><div class="learn-code">Event (e.g., "order shipped")\n    |\n    v\nNotification Service\n    |  (checks user preferences, dedup, rate limit)\n    v\nChannel Router\n    |-&gt; iOS Push (APNS adapter)\n    |-&gt; Android Push (FCM adapter)\n    |-&gt; Email (SES/SendGrid adapter)\n    |-&gt; SMS (Twilio adapter)\n    |-&gt; In-App (WebSocket push)</div><p class="learn-p">Each channel has different characteristics: push notifications are near-instant but can be disabled, email has high deliverability but low open rates, SMS is expensive but reaches everyone.</p></div><div class="learn-section"><div class="learn-h">Reliability: At-Least-Once vs Exactly-Once</div><p class="learn-p">Notifications must be <b>at-least-once</b> — never lose a notification. But <b>exactly-once</b> is nearly impossible in distributed systems. The solution is at-least-once delivery with <b>client-side deduplication</b>.</p><p class="learn-p">Each notification carries a unique ID. The receiving device maintains a dedup window (e.g., last 1000 notification IDs or last 24 hours). If a notification ID is already seen, it\'s silently dropped.</p><div class="learn-warn"><b>Warning:</b> If a Kafka consumer reads a message, commits the offset, but crashes before sending it to APNS, the notification is lost. Solution: commit the offset only <i>after</i> confirmed delivery (at-least-once semantics).</div></div><div class="learn-section"><div class="learn-h">Preference Management</div><p class="learn-p">Users have complex notification preferences:</p><ul class="learn-list"><li>Channel preferences (push enabled, email disabled)</li><li>Do Not Disturb schedules (10 PM - 7 AM in user\'s timezone)</li><li>Category preferences (marketing unsubscribed, transactions enabled)</li><li>Frequency caps (max 5 notifications/hour)</li></ul><p class="learn-p">The preference engine evaluates all rules before routing. Store preferences in a fast key-value store (Redis) with the user\'s timezone, since DND schedules vary by location.</p></div><div class="learn-section"><div class="learn-h">Queuing &amp; Rate Limiting</div><p class="learn-p">1 billion notifications/day with 40% in a 2-hour peak window (6-8 PM local time, varying by timezone):</p><div class="learn-code">Peak: 400M / (2 * 3600) ≈ 55,000 notifications/sec\nAPNS limits per connection: ~3,000 notif/sec\nConnections needed: 55,000 / 3,000 ≈ 19 APNS connections</div><p class="learn-p">Use Kafka as the message queue between the notification service and channel adapters. Each channel adapter consumes from its own topic, allowing independent scaling.</p></div><div class="learn-section"><div class="learn-h">Priority Queues &amp; Starvation Prevention</div><p class="learn-p">Not all notifications are equal. A bank fraud alert must be delivered in seconds; a marketing email can wait hours. Design a priority queue with 3+ levels:</p><ul class="learn-list"><li><b>Critical</b> (P0): Fraud alerts, security codes, emergency notifications</li><li><b>High</b> (P1): Order updates, direct messages, time-sensitive promotions</li><li><b>Normal</b> (P2): Social updates, marketing, recommendations</li></ul><p class="learn-p"><b>Starvation problem:</b> If the high-priority queue is always full, low-priority notifications never send. Solution: weighted fair queuing — process 70% from P0, 20% from P1, 10% from P2, ensuring all priorities make progress.</p></div><div class="learn-section"><div class="learn-h">Thundering Herd from Flash Sales</div><p class="learn-p">Sending a flash sale notification to 50M users causes a thundering herd — all users tap the notification simultaneously, crashing the backend. Solution: <b>staggered delivery</b>. Send to random 1% every 30 seconds over 50 minutes. Business tradeoff: some users see the sale 30-50 minutes after others.</p></div><div class="learn-section"><div class="learn-h">Notification Aggregation</div><p class="learn-p">A user gets 50 likes in 10 minutes. Instead of 50 separate notifications, aggregate: "Alice, Bob, and 48 others liked your photo." The first notification is sent immediately. After a time window (e.g., 2 minutes), subsequent events for the same target are aggregated into one notification. If the user opens the first notification before aggregation fires, cancel the pending aggregate.</p></div>',
          code: `// === Notification System Design ===

// 1. High-level architecture
//   Event Source -> Notification Service -> Kafka Topics
//     -> iOS Worker    -> APNS
//     -> Android Worker -> FCM
//     -> Email Worker   -> SES
//     -> SMS Worker     -> Twilio

// 2. Notification routing with preferences
async function sendNotification(userId, event) {
  const prefs = await redis.hgetall(\`prefs:\${userId}\`);
  const userTz = prefs.timezone || 'UTC';
  const localHour = getLocalHour(userTz);

  // Check DND
  if (prefs.dndStart && localHour >= prefs.dndStart && localHour < prefs.dndEnd) {
    return scheduleForLater(userId, event, prefs.dndEnd);
  }

  // Check category preference
  if (prefs[\`unsub:\${event.category}\`]) return;

  // Check frequency cap
  const count = await redis.incr(\`notif_count:\${userId}\`);
  if (count === 1) await redis.expire(\`notif_count:\${userId}\`, 3600);
  if (count > prefs.maxPerHour) return;

  // Route to enabled channels
  if (prefs.push) await kafka.produce('push-topic', notification);
  if (prefs.email) await kafka.produce('email-topic', notification);
  if (prefs.sms && event.priority === 'critical') {
    await kafka.produce('sms-topic', notification);
  }
}

// 3. Deduplication on send side
async function deduplicateAndSend(notification) {
  const dedupKey = \`dedup:\${notification.id}\`;
  const exists = await redis.setnx(dedupKey, '1');
  if (!exists) return;  // already sent
  await redis.expire(dedupKey, 86400);  // 24h dedup window
  await sendToChannel(notification);
}

// 4. Priority queue with starvation prevention
class WeightedPriorityProcessor {
  // Process 70% P0, 20% P1, 10% P2
  async processBatch(batchSize) {
    const p0Count = Math.floor(batchSize * 0.7);
    const p1Count = Math.floor(batchSize * 0.2);
    const p2Count = batchSize - p0Count - p1Count;

    await Promise.all([
      this.process('critical-queue', p0Count),
      this.process('high-queue', p1Count),
      this.process('normal-queue', p2Count),
    ]);
  }
}

// 5. APNS connection pool
// HTTP/2 multiplexing: 500 concurrent streams per connection
// 100K notif/sec: need 100000/500 = 200 connections
class APNSConnectionPool {
  constructor(size) {
    this.connections = Array(size).fill(null).map(() => createHTTP2Connection());
  }
  async send(deviceToken, payload) {
    const conn = this.getAvailableConnection();
    return conn.request({
      ':method': 'POST',
      ':path': \`/3/device/\${deviceToken}\`,
    }, JSON.stringify(payload));
  }
}

// 6. Notification aggregation
class NotificationAggregator {
  async onEvent(userId, eventType, data) {
    const key = \`agg:\${userId}:\${eventType}\`;
    const count = await redis.incr(key);
    if (count === 1) {
      // First event: send immediately + start aggregation window
      sendNotification(userId, data);
      redis.expire(key, 120);  // 2-min window
    }
    // Events 2-N: stored for aggregate notification after window
  }
}`,
          problems: [
            ["Design multi-channel notification system: iOS, Android, SMS, email","#","Hard"],
            ["At-least-once delivery with dedup — design the unique ID mechanism","#","Medium"],
            ["Preference management: DND, category unsub, frequency cap","#","Medium"],
            ["Flash sale to 50M users: design staggered delivery to prevent thundering herd","#","Hard"],
            ["Priority queue with 3 levels: prevent starvation of low-priority notifications","#","Medium"],
          ],
          mcqs: [
            {"q":"Why is exactly-once notification delivery nearly impossible in distributed systems?","o":["APNS doesn't support it","Network failures can cause duplicates that can't be distinguished from new messages","Email protocols don't support dedup","Users can have multiple devices"],"a":1},
            {"q":"If APNS supports 3,000 notifications/sec per HTTP/2 connection, how many connections for 90K notif/sec?","o":["10","30","90","3,000"],"a":1},
            {"q":"What is the primary purpose of staggered notification delivery for flash sales?","o":["Save bandwidth","Prevent thundering herd on the backend","Comply with APNS rate limits","Improve notification open rates"],"a":1},
          ],
        },
        {
          t: "News Feed",
          learn: '<div class="learn-section"><div class="learn-h">Fan-Out on Write vs Fan-Out on Read</div><p class="learn-p">The central design decision for a news feed is when to assemble each user\'s feed:</p><table class="learn-table"><tr><th>Approach</th><th>How</th><th>Read Latency</th><th>Write Cost</th><th>Best For</th></tr><tr><td><b>Fan-out on Write (Push)</b></td><td>When user posts, push to all followers\' feeds</td><td>Very fast (pre-computed)</td><td>High (1 write per follower)</td><td>Users with &lt;10K followers</td></tr><tr><td><b>Fan-out on Read (Pull)</b></td><td>When user opens feed, fetch from all followed users</td><td>Slower (computed on demand)</td><td>Low (write once)</td><td>Users with millions of followers</td></tr></table><p class="learn-p"><b>Example — push model:</b> A user with 1,000 followers posts. The system writes the post ID to 1,000 individual feed lists. When any follower opens their feed, the pre-computed list is ready — <span class="learn-complexity">O(1)</span> read latency.</p><p class="learn-p"><b>Example — pull model:</b> A user follows 5,000 accounts. Opening the feed requires merging 5,000 timelines, sorting by time/relevance — expensive at read time.</p></div><div class="learn-section"><div class="learn-h">The Celebrity Problem</div><p class="learn-p">A user with 50M followers posts a photo. With fan-out on write, that\'s 50M write operations — taking minutes and creating a massive write spike. This is impractical.</p><p class="learn-p"><b>Hybrid approach:</b> Use push for regular users (&lt;10K followers) and pull for celebrities (&gt;10K followers). When assembling a feed, merge the pre-computed push feed with real-time pulls from followed celebrities.</p><div class="learn-code">User opens feed:\n1. Fetch pre-computed feed from cache (pushed posts)\n2. Identify followed celebrities (stored in user profile)\n3. Fetch latest posts from each celebrity\'s timeline\n4. Merge, rank, return top 50</div><div class="learn-tip"><b>Tip:</b> The threshold between "regular user" and "celebrity" is a tunable parameter. Start at 10K followers and adjust based on system performance.</div></div><div class="learn-section"><div class="learn-h">Feed Ranking</div><p class="learn-p">A chronological feed is simple but suboptimal. Modern feeds use ML-based ranking considering:</p><ul class="learn-list"><li><b>Recency:</b> Newer posts score higher (time decay function)</li><li><b>Engagement:</b> Posts with many likes/comments score higher</li><li><b>Relationship strength:</b> Posts from close friends score higher than acquaintances (based on interaction history)</li><li><b>Content type:</b> Photos/videos may rank differently than text posts</li><li><b>Diversity:</b> Avoid showing 10 posts from one user in a row</li></ul><p class="learn-p">Facebook\'s original EdgeRank formula: <b>Score = &Sigma;(affinity &times; edge_weight &times; time_decay)</b>. Modern systems use deep learning models trained on engagement signals.</p></div><div class="learn-section"><div class="learn-h">Feed Caching &amp; Pagination</div><p class="learn-p">Each user\'s feed is stored in Redis as a sorted set of (post_id, score) pairs. Pagination options:</p><ul class="learn-list"><li><b>Offset-based:</b> <code>GET /feed?page=3&size=20</code>. Problem: if a new post is inserted while the user scrolls, items shift and the user sees duplicates.</li><li><b>Cursor-based:</b> <code>GET /feed?after=post_id_123&size=20</code>. Returns posts after a specific cursor. No duplicates even when new posts arrive.</li></ul><div class="learn-warn"><b>Warning:</b> Offset-based pagination is broken for real-time feeds. Always use cursor-based pagination.</div></div><div class="learn-section"><div class="learn-h">Feed Storage Estimation</div><div class="learn-code">500M users, 10% DAU = 50M active feeds\nEach feed stores top 500 post_ids\nEach entry: 8 bytes (post_id) + 8 bytes (score) = 16 bytes\n50M * 500 * 16 = 400 GB in Redis\n\nThis is feasible with a Redis cluster (~40 nodes with 10GB each)</div></div><div class="learn-section"><div class="learn-h">Feed Invalidation</div><p class="learn-p">When a post is edited, deleted, or flagged for policy violation, it must be removed from all feeds containing it. Options:</p><ul class="learn-list"><li><b>Edit:</b> Lazy update — feeds show old content until refreshed. Acceptable for most edits.</li><li><b>Delete:</b> Publish a deletion event. Fan-out to remove from cached feeds. Not instant — can take minutes for large fan-outs.</li><li><b>Policy violation:</b> Must be fast. Use a global "blocked post IDs" set checked at read time. Even if the post exists in cached feeds, it\'s filtered before display.</li></ul></div>',
          code: `// === News Feed System Design ===

// 1. Fan-out on Write service
async function publishPost(userId, post) {
  // Save post to posts table
  await db.posts.insert({ id: post.id, authorId: userId, ...post });

  const followerCount = await getFollowerCount(userId);

  if (followerCount > CELEBRITY_THRESHOLD) {
    // Celebrity: don't fan out, followers will pull
    await redis.zadd(\`user_timeline:\${userId}\`, post.timestamp, post.id);
    return;
  }

  // Regular user: fan out to all followers
  const followers = await getFollowers(userId);
  const pipeline = redis.pipeline();
  for (const followerId of followers) {
    pipeline.zadd(\`feed:\${followerId}\`, post.timestamp, post.id);
    pipeline.zremrangebyrank(\`feed:\${followerId}\`, 0, -501); // keep top 500
  }
  await pipeline.exec();
}

// 2. Feed retrieval (hybrid push + pull)
async function getFeed(userId, cursor, limit = 20) {
  // Step 1: Get pre-computed feed (pushed posts)
  let feedIds;
  if (cursor) {
    feedIds = await redis.zrangebyscore(
      \`feed:\${userId}\`, '-inf', cursor, 'LIMIT', 0, limit
    );
  } else {
    feedIds = await redis.zrevrange(\`feed:\${userId}\`, 0, limit - 1);
  }

  // Step 2: Pull from followed celebrities
  const celebrities = await getCelebrityFollows(userId);
  for (const celeb of celebrities) {
    const celebPosts = await redis.zrevrange(
      \`user_timeline:\${celeb}\`, 0, 4  // latest 5 posts
    );
    feedIds = feedIds.concat(celebPosts);
  }

  // Step 3: Fetch full post objects
  const posts = await db.posts.findByIds(feedIds);

  // Step 4: Filter blocked/deleted posts
  const blockedIds = await redis.smembers('blocked_posts');
  const filtered = posts.filter(p => !blockedIds.includes(p.id));

  // Step 5: Rank by relevance
  return rankPosts(filtered, userId).slice(0, limit);
}

// 3. Ranking function (simplified EdgeRank)
function rankPosts(posts, userId) {
  return posts.map(post => {
    const recency = 1 / (1 + (Date.now() - post.timestamp) / 3600000);
    const engagement = Math.log(1 + post.likes + post.comments * 2);
    const affinity = getAffinityScore(userId, post.authorId);
    post.score = affinity * engagement * recency;
    return post;
  }).sort((a, b) => b.score - a.score);
}

// 4. Cursor-based pagination
// GET /feed?after=post_abc123&limit=20
// Response: { posts: [...], nextCursor: "post_xyz789" }
// Never use offset-based pagination for real-time feeds!

// 5. Fan-out worker (processes post events from Kafka)
kafkaConsumer.on('message', async (event) => {
  const { authorId, postId, timestamp } = event;
  const followers = await getFollowersInBatches(authorId, 1000);
  for (const batch of followers) {
    await Promise.all(batch.map(fid =>
      redis.zadd(\`feed:\${fid}\`, timestamp, postId)
    ));
  }
});`,
          problems: [
            ["Fan-out on write vs read: walk through operations for 1K followers","#","Medium"],
            ["Celebrity problem: 50M followers — design hybrid push/pull approach","#","Hard"],
            ["Feed ranking: design algorithm with recency, engagement, affinity","#","Hard"],
            ["Feed caching in Redis: cursor-based pagination to avoid duplicates","#","Medium"],
            ["Fan-out service at 10K posts/sec: design worker scaling strategy","#","Hard"],
          ],
          mcqs: [
            {"q":"Fan-out on write is impractical for users with many followers because:","o":["Read latency increases","It requires too many write operations","It doesn't support ranking","It requires more read replicas"],"a":1},
            {"q":"Why is cursor-based pagination preferred over offset-based for news feeds?","o":["It's faster","It avoids duplicate posts when new content is inserted","It uses less memory","It supports better caching"],"a":1},
            {"q":"In a hybrid push/pull feed system, when is pull used?","o":["For all users","For users who post frequently","For celebrity accounts with many followers","For inactive users"],"a":2},
          ],
        },
        {
          t: "Chat System",
          learn: '<div class="learn-section"><div class="learn-h">Real-Time Communication Protocols</div><p class="learn-p">Chat requires real-time bidirectional communication. Three options:</p><table class="learn-table"><tr><th>Protocol</th><th>Direction</th><th>Connection</th><th>Overhead</th><th>Use Case</th></tr><tr><td><b>HTTP Long Polling</b></td><td>Simulated bidirectional</td><td>New request when response arrives</td><td>HTTP headers on each poll</td><td>Legacy/fallback</td></tr><tr><td><b>Server-Sent Events (SSE)</b></td><td>Server &rarr; Client only</td><td>Persistent HTTP stream</td><td>Low (one-way)</td><td>Notifications, live scores</td></tr><tr><td><b>WebSocket</b></td><td>True bidirectional</td><td>Single persistent TCP connection</td><td>Very low (2 bytes framing)</td><td>Chat, gaming, collaboration</td></tr></table><p class="learn-p"><b>WebSocket</b> is the standard for chat. After the HTTP upgrade handshake, the connection becomes a persistent TCP channel. Both client and server can send messages at any time with minimal framing overhead.</p><div class="learn-tip"><b>Tip:</b> Long polling might be preferred in environments where WebSocket connections are blocked by corporate firewalls or proxies.</div></div><div class="learn-section"><div class="learn-h">Connection Management at Scale</div><p class="learn-p">50M concurrent WebSocket connections, each sending a heartbeat every 30 seconds:</p><div class="learn-code">Heartbeats/sec = 50M / 30 = 1.67M heartbeats/sec\nBandwidth = 1.67M * 50 bytes = 83.5 MB/s = 668 Mbps\nAt 500K connections/server: need 100 chat servers</div><p class="learn-p">When a chat server crashes, 500K connections are lost. All clients must reconnect — causing a <b>reconnection storm</b>. Mitigation: stagger reconnection with jitter (each client waits a random 0-30 seconds before reconnecting).</p></div><div class="learn-section"><div class="learn-h">Message Ordering</div><p class="learn-p">Messages can arrive out of order due to network routing. User A sends "Are you free tonight?" then "Let\'s grab dinner." The recipient might see them in reverse order.</p><p class="learn-p">Solution: Each message gets a <b>sequence number</b> per conversation. The client buffers messages and displays them in sequence order. If message #5 arrives before #4, buffer #5 and display both when #4 arrives (or display after a short timeout with a gap indicator).</p><div class="learn-warn"><b>Warning:</b> Global timestamps are insufficient for ordering — clock skew across servers can cause misordering. Per-conversation monotonic sequence numbers are more reliable.</div></div><div class="learn-section"><div class="learn-h">Group Chat</div><p class="learn-p">For a group of N members, each message must reach all online members. Approaches:</p><ul class="learn-list"><li><b>Sender fan-out:</b> Sender\'s server sends to each member\'s server. Simple but sender\'s server does O(N) work.</li><li><b>Dedicated group service:</b> Message goes to a group service that fans out. Decouples sender from delivery. Best for medium groups (10-500 members).</li><li><b>Pub/sub channel:</b> Each group is a pub/sub topic. Members subscribe. Best for large broadcast groups (1000+ members).</li></ul></div><div class="learn-section"><div class="learn-h">Presence System</div><p class="learn-p">WhatsApp shows "online" and "last seen" for each contact. With 2B users, real-time presence is expensive.</p><p class="learn-p">Design: Client sends heartbeats every 30 seconds. If no heartbeat for 60 seconds, status changes to "offline." A grace period of ~30 seconds prevents flicker during brief connectivity drops.</p><p class="learn-p"><b>Fan-out presence updates</b> can be expensive. If a user has 500 contacts, going online triggers 500 updates. Optimization: only send presence updates to contacts who have the app open (active subscribers), not all contacts.</p></div><div class="learn-section"><div class="learn-h">Message Storage</div><p class="learn-p">Store messages in a database partitioned by conversation_id. Use Cassandra or similar wide-column store. Partition key = conversation_id, clustering key = message_id (time-ordered).</p><p class="learn-p"><b>Hot partition problem:</b> A 5-year-old conversation with millions of messages creates a huge partition. Solution: compound partition key = (conversation_id, month). Recent months are fast to query; old months are separate partitions.</p></div><div class="learn-section"><div class="learn-h">Message Delivery Guarantees</div><p class="learn-p">Three stages: <b>Sent</b> (reached server), <b>Delivered</b> (reached recipient\'s device), <b>Read</b> (user opened the conversation).</p><div class="learn-code">Sender -&gt; Server: ACK = "sent" (single check mark)\nServer -&gt; Recipient device: ACK = "delivered" (double check mark)\nRecipient opens conversation: ACK = "read" (blue check marks)</div><p class="learn-p">Each hop uses acknowledgments. If the server doesn\'t receive a "delivered" ACK, it queues the message for retry. Offline messages are queued and delivered in bulk when the recipient reconnects.</p></div><div class="learn-section"><div class="learn-h">End-to-End Encryption</div><p class="learn-p">In E2E encryption, the server cannot read messages. Key concepts: (1) <b>Key exchange</b> using Diffie-Hellman. (2) <b>Double Ratchet Algorithm</b> — generates a new encryption key for each message, providing forward secrecy. (3) <b>Group re-keying</b> — when a member is added/removed, all members generate new group keys.</p></div>',
          code: `// === Chat System Design ===

// 1. WebSocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Connection registry: userId -> ws connection
const connections = new Map();

wss.on('connection', (ws, req) => {
  const userId = authenticate(req);
  connections.set(userId, ws);
  updatePresence(userId, 'online');

  ws.on('message', (data) => handleMessage(userId, JSON.parse(data)));
  ws.on('close', () => {
    connections.delete(userId);
    setTimeout(() => updatePresence(userId, 'offline'), 30000); // grace period
  });
});

// 2. Message handling with ordering
let seqCounters = {};  // conversationId -> next sequence number

async function handleMessage(senderId, msg) {
  const { conversationId, content, type } = msg;

  // Assign sequence number
  if (!seqCounters[conversationId]) seqCounters[conversationId] = 0;
  const seqNum = ++seqCounters[conversationId];

  const message = {
    id: generateId(),
    conversationId,
    senderId,
    content,
    seqNum,
    timestamp: Date.now(),
  };

  // Persist to database
  await db.messages.insert(message);

  // ACK to sender: "sent"
  connections.get(senderId)?.send(JSON.stringify({
    type: 'ack', messageId: message.id, status: 'sent'
  }));

  // Deliver to recipients
  const members = await getConversationMembers(conversationId);
  for (const memberId of members) {
    if (memberId === senderId) continue;
    const recipientWs = connections.get(memberId);
    if (recipientWs) {
      recipientWs.send(JSON.stringify({ type: 'message', ...message }));
    } else {
      await offlineQueue.push(memberId, message);  // queue for later
    }
  }
}

// 3. Group chat fan-out
async function sendToGroup(groupId, message) {
  const members = await redis.smembers(\`group:\${groupId}:members\`);
  // For large groups, use pub/sub instead of direct fan-out
  if (members.length > 500) {
    await redis.publish(\`group:\${groupId}\`, JSON.stringify(message));
  } else {
    for (const memberId of members) {
      deliverToUser(memberId, message);
    }
  }
}

// 4. Presence system with heartbeat
setInterval(() => {
  connections.forEach((ws, userId) => {
    ws.ping();  // send ping
  });
}, 30000);

// Server checks: if no pong received in 60s, mark offline

// 5. Offline message delivery
async function onUserReconnect(userId) {
  const pending = await offlineQueue.getAll(userId);
  // Sort by sequence number per conversation
  const sorted = pending.sort((a, b) => a.seqNum - b.seqNum);
  for (const msg of sorted) {
    connections.get(userId).send(JSON.stringify(msg));
  }
  await offlineQueue.clear(userId);
}

// 6. Read receipts
async function markAsRead(userId, conversationId, lastSeqNum) {
  await db.readReceipts.upsert({
    conversationId, userId, lastReadSeq: lastSeqNum
  });
  // Notify other members
  broadcastToConversation(conversationId, {
    type: 'read_receipt', userId, lastReadSeq: lastSeqNum
  });
}`,
          problems: [
            ["Compare HTTP long polling, SSE, WebSocket for real-time chat","#","Medium"],
            ["Message ordering: design sequence-number system for distributed servers","#","Hard"],
            ["Group chat: sender fan-out vs pub/sub for 100 vs 100K members","#","Medium"],
            ["Presence system: heartbeat design with grace period for 2B users","#","Hard"],
            ["Message delivery guarantee: sent, delivered, read — design ACK chain","#","Medium"],
          ],
          mcqs: [
            {"q":"What is the primary advantage of WebSocket over HTTP long polling for chat?","o":["WebSocket is encrypted","True bidirectional communication with low overhead","Better browser compatibility","Automatic reconnection"],"a":1},
            {"q":"50M concurrent WebSocket connections with 30s heartbeats generate approximately how many heartbeats/sec?","o":["167K","500K","1.67M","50M"],"a":2},
            {"q":"Why use per-conversation sequence numbers instead of global timestamps for message ordering?","o":["Sequence numbers are smaller","Clock skew across servers makes timestamps unreliable","Timestamps don't support encryption","Sequence numbers are faster to generate"],"a":1},
            {"q":"What should happen when a user's internet drops for 5 seconds in the presence system?","o":["Immediately mark offline","Use a grace period of ~30 seconds before marking offline","Delete the user session","Disconnect all their conversations"],"a":1},
          ],
        },
        {
          t: "Search Autocomplete",
          learn: '<div class="learn-section"><div class="learn-h">Trie Data Structure</div><p class="learn-p">The <b>trie</b> (prefix tree) is the core data structure for autocomplete. Each node represents a character, and paths from root to nodes represent prefixes. Storing the top-K results at each node trades memory for query speed.</p><div class="learn-code">Root\n ├── s\n │   ├── y\n │   │   └── s → [system design, system architecture, system call]\n │   └── t\n │       └── r → [string, stream, structure]\n └── d\n     └── a → [data structure, database, data science]</div><p class="learn-p"><b>Memory estimation:</b> 100M unique search terms, average 20 characters each. Naive: 100M * 20 = 2GB for strings alone. With top-5 results per node: ~50GB total. This doesn\'t fit in one machine\'s RAM.</p></div><div class="learn-section"><div class="learn-h">Trie Sharding</div><p class="learn-p">Split the trie across machines. Options:</p><ul class="learn-list"><li><b>First-character sharding:</b> All terms starting with \'a\' on shard 1, \'b\' on shard 2, etc. Problem: severely imbalanced — \'s\' handles 15% of queries while \'x\' handles 0.1%.</li><li><b>Multi-character prefix:</b> Shard by first 2 characters. 62^2 = 3,844 ranges mapped to N shards. More balanced.</li><li><b>Hash-based:</b> Even distribution, but breaks prefix matching — you\'d need to query all shards.</li></ul><p class="learn-p">Best approach: range-based sharding with dynamic splitting. If a range gets too hot, split it further.</p></div><div class="learn-section"><div class="learn-h">Ranking Suggestions</div><p class="learn-p">Suggestions must be ranked by relevance, not just frequency. Factors:</p><ul class="learn-list"><li><b>Global popularity:</b> Query frequency from search logs</li><li><b>Recency:</b> Trending queries should rank higher</li><li><b>Personalization:</b> User\'s search history and preferences</li><li><b>Freshness:</b> Election results, breaking news should appear within minutes</li></ul><p class="learn-p">Blend: <code>score = 0.6 * global_freq + 0.3 * personal_freq + 0.1 * trending_boost</code>. Pre-compute and store top-K at each trie node. Personalization is applied at query time as a re-ranking filter.</p></div><div class="learn-section"><div class="learn-h">Real-Time Trending Updates</div><p class="learn-p">The trie is rebuilt weekly in a batch process, but trending topics must appear within minutes. Solution: <b>overlay approach</b>:</p><ol class="learn-list"><li>Static trie: rebuilt weekly, serves as the base</li><li>Trending cache: a small real-time data structure (hash map or small trie) updated every minute from streaming analytics (Kafka + Flink)</li><li>At query time: merge results from static trie and trending cache, de-duplicate, re-rank</li></ol></div><div class="learn-section"><div class="learn-h">Data Collection Pipeline</div><p class="learn-p">Every search query is a potential autocomplete suggestion. But with 10B searches/day, most are unique (long tail).</p><div class="learn-code">Pipeline:\nSearch logs → Kafka → Flink/Spark Streaming\n  → Aggregate query frequencies (5-min windows)\n  → Filter: only queries with freq &gt; threshold become suggestions\n  → Update frequency counters in a key-value store\n  → Weekly batch: rebuild trie from top-N queries per prefix</div></div><div class="learn-section"><div class="learn-h">Fuzzy Matching (Typo Tolerance)</div><p class="learn-p">User types "amazn" but means "amazon." Approaches:</p><ul class="learn-list"><li><b>Edit distance:</b> Find trie entries within edit distance 1-2 of the query. Computationally expensive in a trie — generates many candidate paths.</li><li><b>Phonetic matching (Soundex):</b> Map words to phonetic codes. "amazn" and "amazon" produce similar codes.</li><li><b>N-gram index:</b> Break terms into 2-grams (am, ma, az, zo, on). Query "amazn" shares many 2-grams with "amazon."</li></ul><p class="learn-p">To stay under 50ms latency, pre-compute common misspellings and store them as aliases pointing to the correct trie nodes.</p></div><div class="learn-section"><div class="learn-h">Content Filtering</div><p class="learn-p">Autocomplete must NOT suggest offensive, dangerous, or legally risky terms. Filtering can happen at trie construction time (remove entries from the suggestion list) or at query time (filter results before returning). Construction-time filtering is preferred — it\'s faster and ensures bad suggestions never reach the serving layer.</p></div><div class="learn-section"><div class="learn-h">Caching Strategy</div><p class="learn-p">Short prefixes (1-3 chars) have high reuse: everyone types "h", "ho", "how". Cache these results aggressively. Long prefixes (5+ chars) are unique per user — caching is ineffective.</p><div class="learn-code">Prefix length 1: 62 unique prefixes    → cache hit rate ~99%\nPrefix length 2: 3,844 unique prefixes → cache hit rate ~95%\nPrefix length 3: ~238K unique prefixes  → cache hit rate ~80%\nPrefix length 5+: long tail             → cache hit rate &lt;20%</div><p class="learn-p">Use a tiered cache: L1 for 1-2 char prefixes (long TTL), L2 for 3-4 char prefixes (medium TTL), no cache for 5+ chars.</p></div>',
          code: `// === Search Autocomplete System ===

// 1. Trie with top-K at each node
class TrieNode {
  constructor() {
    this.children = {};
    this.topK = [];  // pre-computed top 5 suggestions
  }
}

class AutocompleteTrie {
  constructor() { this.root = new TrieNode(); }

  insert(word, frequency) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
      // Update top-K at this node
      this.updateTopK(node, word, frequency);
    }
  }

  updateTopK(node, word, freq) {
    const existing = node.topK.find(e => e.word === word);
    if (existing) existing.freq = freq;
    else node.topK.push({ word, freq });
    node.topK.sort((a, b) => b.freq - a.freq);
    if (node.topK.length > 5) node.topK.pop();
  }

  search(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return [];
      node = node.children[ch];
    }
    return node.topK;  // O(1) after prefix traversal!
  }
}

// 2. Query API with debouncing (client side)
let debounceTimer;
input.addEventListener('keyup', (e) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetch(\`/autocomplete?q=\${input.value}\`)
      .then(r => r.json())
      .then(suggestions => renderSuggestions(suggestions));
  }, 100);  // 100ms debounce
});

// 3. Server-side handler with caching
async function autocomplete(prefix) {
  // Check cache (effective for short prefixes)
  const cached = await redis.get(\`ac:\${prefix}\`);
  if (cached) return JSON.parse(cached);

  // Query trie (static results)
  const staticResults = trie.search(prefix);

  // Merge with trending results
  const trendingResults = await redis.zrevrange(
    \`trending:\${prefix}\`, 0, 4
  );

  // Merge, deduplicate, re-rank
  const merged = mergeAndRank(staticResults, trendingResults);

  // Filter offensive content
  const filtered = merged.filter(s => !blocklist.has(s.word));

  // Cache result (tiered TTL)
  const ttl = prefix.length <= 2 ? 3600 : prefix.length <= 4 ? 300 : 60;
  await redis.setex(\`ac:\${prefix}\`, ttl, JSON.stringify(filtered));

  return filtered.slice(0, 5);
}

// 4. Data collection pipeline (pseudocode)
// Kafka consumer processes search logs
kafkaConsumer.on('search_event', (event) => {
  const query = normalize(event.query);
  // Increment frequency counter
  redis.zincrby('query_frequencies', 1, query);

  // Update trending (sliding window)
  const bucket = Math.floor(Date.now() / 60000); // 1-min buckets
  redis.zincrby(\`trending_bucket:\${bucket}\`, 1, query);
});

// 5. Weekly trie rebuild (batch job)
async function rebuildTrie() {
  const trie = new AutocompleteTrie();
  const topQueries = await redis.zrevrange('query_frequencies', 0, 10000000);
  for (const { word, freq } of topQueries) {
    if (freq > MIN_THRESHOLD) {
      trie.insert(word, freq);
    }
  }
  // Blue-green deploy: build new trie while old one serves
  atomicSwap(servingTrie, trie);
}`,
          problems: [
            ["Design trie-based autocomplete: estimate memory for 100M terms","#","Medium"],
            ["Real-time trending: overlay recent queries on static weekly trie","#","Hard"],
            ["Ranking: blend global popularity, personalization, and trending","#","Medium"],
            ["Data collection pipeline: from 10B daily searches to trie entries","#","Hard"],
            ["Fuzzy matching for typos: design within 50ms latency budget","#","Hard"],
          ],
          mcqs: [
            {"q":"Storing top-K results at each trie node optimizes:","o":["Memory usage","Insertion speed","Query speed (O(prefix_length) instead of full subtree scan)","Deletion of outdated suggestions"],"a":2},
            {"q":"Sharding a trie by first character results in:","o":["Perfectly balanced shards","Severely imbalanced shards due to letter frequency","Inability to do prefix matching","Higher memory usage"],"a":1},
            {"q":"Why is debouncing (100ms delay) used for autocomplete requests?","o":["To reduce server load by not sending a request on every keystroke","To improve suggestion accuracy","Because the trie lookup takes 100ms","To encrypt the query"],"a":0},
            {"q":"For prefix length 1-2, the cache hit rate is approximately:","o":["20%","50%","80%","95-99%"],"a":3},
          ],
        },
        {
          t: 'Design Stock Trading / Order Matching Engine',
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Design a <b>stock exchange order matching engine</b> — the core component of any trading platform. This is highly relevant for <b>DE Shaw</b> interviews given their quantitative trading focus.</p><p class="learn-p"><b>Key requirements:</b></p><ul class="learn-list"><li>Support <b>Limit Orders</b> (buy/sell at specific price) and <b>Market Orders</b> (buy/sell at best available price)</li><li><b>Price-time priority</b>: orders at the same price matched in FIFO order</li><li>Real-time order book management (bids and asks)</li><li>Handle cancellations and partial fills</li><li>Sub-millisecond matching latency</li></ul></div><div class="learn-section"><div class="learn-h">Core Concepts</div><table class="learn-table"><tr><th>Term</th><th>Meaning</th></tr><tr><td>Bid</td><td>Buy order — "I want to buy at this price or lower"</td></tr><tr><td>Ask (Offer)</td><td>Sell order — "I want to sell at this price or higher"</td></tr><tr><td>Spread</td><td>Difference between best ask and best bid</td></tr><tr><td>Order Book</td><td>Collection of all outstanding bids and asks for a security</td></tr><tr><td>Match</td><td>When a buy price ≥ sell price, a trade occurs</td></tr><tr><td>Partial Fill</td><td>Order partially matched, remaining quantity stays in book</td></tr></table><div class="learn-code">Order Book for AAPL:\n\nBids (Buy):              Asks (Sell):\nPrice    Qty  Time       Price    Qty  Time\n$150.10  200  09:30:01   $150.15  100  09:30:00\n$150.05  500  09:30:02   $150.20  300  09:30:01\n$150.00  100  09:29:55   $150.25  200  09:30:03\n         ↑ Best Bid              ↑ Best Ask\n         Spread = $0.05</div></div><div class="learn-section"><div class="learn-h">Matching Algorithm</div><p class="learn-p"><b>Price-time priority</b> (most common):</p><ol class="learn-list"><li>Match at the <b>best price</b> first (highest bid, lowest ask)</li><li>At the same price, match <b>oldest order first</b> (FIFO)</li><li>If incoming order is larger than the matched order, partially fill and continue matching</li><li>If no match possible, add to the order book</li></ol><div class="learn-code">Incoming: BUY 300 shares at $150.20 (limit)\n\n1. Match vs Ask $150.15 × 100 → TRADE 100 @ $150.15\n   Remaining: 200 shares\n2. Match vs Ask $150.20 × 300 → TRADE 200 @ $150.20\n   Remaining: 0 → fully filled!\n\nIncoming: BUY 500 shares at $150.10 (limit)\n1. No ask ≤ $150.10 → add to Bid side of order book</div></div><div class="learn-section"><div class="learn-h">Data Structures</div><table class="learn-table"><tr><th>Component</th><th>Data Structure</th><th>Why</th></tr><tr><td>Bids</td><td>Max-heap (or sorted map, desc)</td><td>Best bid = highest price, O(log n) insert/remove</td></tr><tr><td>Asks</td><td>Min-heap (or sorted map, asc)</td><td>Best ask = lowest price, O(log n) insert/remove</td></tr><tr><td>Orders at same price</td><td>Queue (FIFO)</td><td>Time priority — oldest first</td></tr><tr><td>Order lookup</td><td>HashMap (orderId → Order*)</td><td>O(1) cancel/modify</td></tr></table><div class="learn-tip"><b>Performance:</b> Real exchanges use lock-free data structures, memory pools, and kernel bypass (DPDK/RDMA) for nanosecond latency. In an interview, focus on the algorithmic design — sorted map + queue is the right abstraction.</div></div><div class="learn-section"><div class="learn-h">System Architecture</div><div class="learn-code">Client → Gateway → Order Validator → Matching Engine → Trade Store\n                                         ↓\n                                    Market Data Feed\n                                    (WebSocket to clients)\n\nMatching Engine (per symbol):\n  ┌─────────────────────┐\n  │  Order Book          │\n  │  ┌───────┐ ┌───────┐│\n  │  │ Bids  │ │ Asks  ││\n  │  │(max-h)│ │(min-h)││\n  │  └───────┘ └───────┘│\n  │  HashMap: id→Order   │\n  └─────────────────────┘</div></div><div class="learn-section"><div class="learn-h">Key Design Decisions</div><ul class="learn-list"><li><b>One matching engine per symbol</b> — allows parallelism across stocks</li><li><b>Event sourcing</b> — log every order/trade event for audit and replay</li><li><b>Sequencer</b> — assign global sequence numbers for deterministic replay</li><li><b>Risk checks</b> — pre-trade (margin, position limits) before matching</li></ul><div class="learn-warn"><b>DE Shaw focus:</b> They care about latency, throughput, and correctness. Mention lock-free queues, cache-line alignment, and why you avoid memory allocation on the hot path.</div></div>',
          code: `// ===== Stock Trading Order Matching Engine =====
#include <iostream>
#include <map>
#include <queue>
#include <unordered_map>
#include <string>
using namespace std;

enum class Side { BUY, SELL };
enum class OrderType { LIMIT, MARKET };

struct Order {
    int id;
    string symbol;
    Side side;
    OrderType type;
    double price;
    int quantity;
    int remaining;
    long long timestamp;

    Order(int id, string sym, Side s, OrderType t, double p, int q, long long ts)
        : id(id), symbol(sym), side(s), type(t), price(p),
          quantity(q), remaining(q), timestamp(ts) {}
};

struct Trade {
    int buyOrderId, sellOrderId;
    double price;
    int quantity;
};

class OrderBook {
    // Bids: highest price first (descending)
    map<double, queue<Order*>, greater<double>> bids;
    // Asks: lowest price first (ascending)
    map<double, queue<Order*>> asks;
    // Fast lookup for cancellations
    unordered_map<int, Order*> orderMap;
    vector<Trade> trades;

public:
    void addOrder(Order* order) {
        orderMap[order->id] = order;

        if (order->side == Side::BUY) {
            matchBuy(order);
            if (order->remaining > 0 && order->type == OrderType::LIMIT)
                bids[order->price].push(order);
        } else {
            matchSell(order);
            if (order->remaining > 0 && order->type == OrderType::LIMIT)
                asks[order->price].push(order);
        }
    }

    void matchBuy(Order* buy) {
        while (buy->remaining > 0 && !asks.empty()) {
            auto it = asks.begin();
            if (buy->type == OrderType::LIMIT && it->first > buy->price) break;

            auto& q = it->second;
            Order* sell = q.front();
            int matched = min(buy->remaining, sell->remaining);
            trades.push_back({buy->id, sell->id, it->first, matched});
            cout << "TRADE: " << matched << " @ $" << it->first << endl;

            buy->remaining -= matched;
            sell->remaining -= matched;
            if (sell->remaining == 0) { q.pop(); orderMap.erase(sell->id); }
            if (q.empty()) asks.erase(it);
        }
    }

    void matchSell(Order* sell) {
        while (sell->remaining > 0 && !bids.empty()) {
            auto it = bids.begin();
            if (sell->type == OrderType::LIMIT && it->first < sell->price) break;

            auto& q = it->second;
            Order* buy = q.front();
            int matched = min(sell->remaining, buy->remaining);
            trades.push_back({buy->id, sell->id, it->first, matched});
            cout << "TRADE: " << matched << " @ $" << it->first << endl;

            sell->remaining -= matched;
            buy->remaining -= matched;
            if (buy->remaining == 0) { q.pop(); orderMap.erase(buy->id); }
            if (q.empty()) bids.erase(it);
        }
    }

    bool cancelOrder(int orderId) {
        auto it = orderMap.find(orderId);
        if (it == orderMap.end()) return false;
        it->second->remaining = 0;
        orderMap.erase(it);
        cout << "CANCELLED order " << orderId << endl;
        return true;
    }

    void printBook() {
        cout << "\\n--- ORDER BOOK ---" << endl;
        cout << "ASKS:" << endl;
        for (auto it = asks.rbegin(); it != asks.rend(); ++it)
            cout << "  $" << it->first << " x " << it->second.front()->remaining << endl;
        cout << "BIDS:" << endl;
        for (auto& [price, q] : bids)
            cout << "  $" << price << " x " << q.front()->remaining << endl;
    }
};

int main() {
    OrderBook book;
    long long ts = 1;

    auto* o1 = new Order(1, "AAPL", Side::SELL, OrderType::LIMIT, 150.15, 100, ts++);
    auto* o2 = new Order(2, "AAPL", Side::SELL, OrderType::LIMIT, 150.20, 300, ts++);
    auto* o3 = new Order(3, "AAPL", Side::BUY,  OrderType::LIMIT, 150.10, 200, ts++);
    book.addOrder(o1); book.addOrder(o2); book.addOrder(o3);
    book.printBook();

    // Incoming buy that crosses the spread
    auto* o4 = new Order(4, "AAPL", Side::BUY, OrderType::LIMIT, 150.20, 250, ts++);
    book.addOrder(o4); // matches 100@150.15 + 150@150.20
    book.printBook();

    return 0;
}`,
          problems: [
            ['Stock Price Fluctuation', 'https://leetcode.com/problems/stock-price-fluctuation/', 'Medium'],
            ['Design an Order Matching Engine', 'https://www.geeksforgeeks.org/order-matching-engine-in-stock-exchange/', 'Hard'],
            ['Time Based Key-Value Store', 'https://leetcode.com/problems/time-based-key-value-store/', 'Medium']
          ],
          mcqs: [
            {q: 'In price-time priority matching, orders at the same price are matched:', o: ['Randomly', 'Largest first', 'FIFO (oldest first)', 'LIFO (newest first)'], a: 2},
            {q: 'The bid side of an order book is organized as:', o: ['Min-heap (lowest price first)', 'Max-heap (highest price first)', 'FIFO queue', 'Hash map'], a: 1},
            {q: 'A market order differs from a limit order because:', o: ['It has no price — executes at the best available price', 'It can only buy, not sell', 'It is always partially filled', 'It stays in the order book indefinitely'], a: 0}
          ]
        },
        {
          t: 'Design Payment System',
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Design a <b>payment processing system</b> (like Stripe, Razorpay, or PayPal) that handles transactions reliably at scale.</p><p class="learn-p"><b>Key requirements:</b></p><ul class="learn-list"><li>Support multiple payment methods (credit card, debit card, UPI, net banking, wallet)</li><li><b>Exactly-once processing</b> — no duplicate charges</li><li>Handle payment failures, retries, and refunds</li><li>PCI DSS compliance for card data</li><li>High availability and low latency</li></ul></div><div class="learn-section"><div class="learn-h">Payment Flow</div><div class="learn-code">1. User clicks "Pay $100"\n2. Client → Payment Service: POST /payments\n   { amount: 100, currency: "USD", method: "card", token: "tok_xxx" }\n3. Payment Service:\n   a. Generate idempotency key (UUID)\n   b. Create payment record (status: PENDING)\n   c. Call Payment Gateway (Stripe/Razorpay)\n   d. Gateway contacts Card Network → Issuing Bank\n   e. Bank approves/declines\n   f. Update payment record (status: SUCCESS/FAILED)\n4. Return result to client\n5. Async: Send receipt email, update ledger</div></div><div class="learn-section"><div class="learn-h">Idempotency — The Critical Requirement</div><p class="learn-p">Network failures can cause the client to retry a payment. Without idempotency, the user could be charged twice. Solution: <b>idempotency key</b>.</p><div class="learn-code">POST /payments\nIdempotency-Key: "abc-123-def"\n\nServer logic:\n1. Check if idempotency_key "abc-123-def" exists in DB\n2. If YES → return cached result (no duplicate charge)\n3. If NO → process payment, store result with key\n\nThis guarantees exactly-once semantics from the client\'s perspective.</div><div class="learn-warn"><b>Critical:</b> The idempotency key + result must be stored atomically with the payment record. Use a database transaction or a unique constraint on the key.</div></div><div class="learn-section"><div class="learn-h">Double-Entry Ledger</div><p class="learn-p">Every payment creates two ledger entries (accounting 101). This ensures the books always balance.</p><div class="learn-code">-- User pays $100 for an order:\nINSERT INTO ledger (account, type, amount) VALUES\n  (\'user_wallet\',    \'DEBIT\',  100.00),  -- money leaves user\n  (\'merchant_wallet\', \'CREDIT\', 100.00); -- money enters merchant\n\n-- Refund $100:\nINSERT INTO ledger (account, type, amount) VALUES\n  (\'merchant_wallet\', \'DEBIT\',  100.00),\n  (\'user_wallet\',     \'CREDIT\', 100.00);\n\n-- Invariant: SUM(credits) == SUM(debits) ALWAYS</div></div><div class="learn-section"><div class="learn-h">Payment State Machine</div><div class="learn-code">PENDING → PROCESSING → SUCCESS\n                    ↘ FAILED → RETRY → PROCESSING\n                                     ↘ ABANDONED\nSUCCESS → REFUND_PENDING → REFUNDED</div><p class="learn-p">Model payment status as a state machine. Transitions are persisted to the database with timestamps for audit trail.</p></div><div class="learn-section"><div class="learn-h">Architecture</div><table class="learn-table"><tr><th>Component</th><th>Responsibility</th></tr><tr><td>API Gateway</td><td>Rate limiting, auth, route to payment service</td></tr><tr><td>Payment Service</td><td>Orchestrates payment flow, idempotency</td></tr><tr><td>Payment Gateway Adapter</td><td>Abstracts Stripe/Razorpay/PayPal (Strategy pattern)</td></tr><tr><td>Ledger Service</td><td>Double-entry bookkeeping</td></tr><tr><td>Notification Service</td><td>Email/SMS receipts (async via message queue)</td></tr><tr><td>Reconciliation Worker</td><td>Daily comparison of our records vs gateway records</td></tr></table><div class="learn-tip"><b>Key patterns:</b> Strategy pattern for payment gateways, State pattern for payment status, Saga pattern for distributed transactions (order service + payment service + inventory service).</div></div>',
          code: `// ===== Payment System — Core Components =====
#include <iostream>
#include <string>
#include <unordered_map>
#include <vector>
#include <chrono>
using namespace std;

enum class PaymentStatus { PENDING, PROCESSING, SUCCESS, FAILED, REFUNDED };
enum class PaymentMethod { CARD, UPI, NET_BANKING, WALLET };

struct Payment {
    string id;
    string idempotencyKey;
    double amount;
    string currency;
    PaymentMethod method;
    PaymentStatus status;
    string gatewayTxnId;
    long long createdAt;
    long long updatedAt;
};

// Strategy pattern for payment gateways
class IPaymentGateway {
public:
    virtual pair<bool, string> charge(double amount, const string& token) = 0;
    virtual bool refund(const string& txnId, double amount) = 0;
    virtual ~IPaymentGateway() = default;
};

class StripeGateway : public IPaymentGateway {
public:
    pair<bool, string> charge(double amount, const string& token) override {
        cout << "[Stripe] Charging $" << amount << endl;
        return {true, "stripe_txn_" + to_string(rand())};
    }
    bool refund(const string& txnId, double amount) override {
        cout << "[Stripe] Refunding $" << amount << " for " << txnId << endl;
        return true;
    }
};

class RazorpayGateway : public IPaymentGateway {
public:
    pair<bool, string> charge(double amount, const string& token) override {
        cout << "[Razorpay] Charging $" << amount << endl;
        return {true, "rzp_txn_" + to_string(rand())};
    }
    bool refund(const string& txnId, double amount) override {
        cout << "[Razorpay] Refunding $" << amount << endl;
        return true;
    }
};

// Double-entry ledger
struct LedgerEntry {
    string account;
    string type; // DEBIT or CREDIT
    double amount;
    string paymentId;
};

class PaymentService {
    unordered_map<string, Payment> payments;
    unordered_map<string, string> idempotencyStore; // key → paymentId
    vector<LedgerEntry> ledger;
    IPaymentGateway* gateway;

public:
    PaymentService(IPaymentGateway* gw) : gateway(gw) {}

    string processPayment(const string& idempKey, double amount,
                          const string& token, PaymentMethod method) {
        // Idempotency check
        if (idempotencyStore.count(idempKey)) {
            string existingId = idempotencyStore[idempKey];
            cout << "Idempotent: returning existing payment " << existingId << endl;
            return existingId;
        }

        string paymentId = "pay_" + to_string(payments.size() + 1);
        Payment p{paymentId, idempKey, amount, "USD", method,
                  PaymentStatus::PENDING, "", 0, 0};

        p.status = PaymentStatus::PROCESSING;
        auto [success, txnId] = gateway->charge(amount, token);

        if (success) {
            p.status = PaymentStatus::SUCCESS;
            p.gatewayTxnId = txnId;
            // Double-entry ledger
            ledger.push_back({"user_wallet", "DEBIT", amount, paymentId});
            ledger.push_back({"merchant_wallet", "CREDIT", amount, paymentId});
            cout << "Payment " << paymentId << " SUCCESS" << endl;
        } else {
            p.status = PaymentStatus::FAILED;
            cout << "Payment " << paymentId << " FAILED" << endl;
        }

        payments[paymentId] = p;
        idempotencyStore[idempKey] = paymentId;
        return paymentId;
    }

    bool refund(const string& paymentId) {
        auto it = payments.find(paymentId);
        if (it == payments.end() || it->second.status != PaymentStatus::SUCCESS)
            return false;

        if (gateway->refund(it->second.gatewayTxnId, it->second.amount)) {
            it->second.status = PaymentStatus::REFUNDED;
            ledger.push_back({"merchant_wallet", "DEBIT", it->second.amount, paymentId});
            ledger.push_back({"user_wallet", "CREDIT", it->second.amount, paymentId});
            return true;
        }
        return false;
    }
};

int main() {
    StripeGateway stripe;
    PaymentService service(&stripe);

    // Process payment
    string id = service.processPayment("idem_001", 99.99, "tok_card", PaymentMethod::CARD);

    // Retry with same idempotency key — no duplicate charge
    service.processPayment("idem_001", 99.99, "tok_card", PaymentMethod::CARD);

    // Refund
    service.refund(id);
    return 0;
}`,
          problems: [
            ['Design Payment System', 'https://www.geeksforgeeks.org/design-online-payment-system/', 'Hard'],
            ['Idempotent API Design', 'https://www.geeksforgeeks.org/idempotent-rest-apis/', 'Medium'],
            ['Event Sourcing Patterns', 'https://www.geeksforgeeks.org/event-sourcing-pattern/', 'Medium']
          ],
          mcqs: [
            {q: 'Idempotency in payment systems ensures:', o: ['Payments are faster', 'Retrying a payment request does not cause duplicate charges', 'All payments succeed', 'Payments are encrypted'], a: 1},
            {q: 'In double-entry bookkeeping, every transaction:', o: ['Has exactly one ledger entry', 'Has a debit and credit entry that balance', 'Is stored in a blockchain', 'Requires manual approval'], a: 1},
            {q: 'Which pattern is used to support multiple payment gateways (Stripe, Razorpay)?', o: ['Singleton', 'Observer', 'Strategy', 'Factory'], a: 2}
          ]
        }
      ]
    },
  ]
};
