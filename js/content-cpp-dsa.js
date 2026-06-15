// ============================================================
// C++ & DSA Content for DE Shaw Interview Prep
// ============================================================

const CPP_CONTENT = {
  id: 'cpp', t: 'C++ Programming',
  tabs: [
    {
      id: 'basics', t: 'Basics',
      topics: [
        {
          t: 'Variables, Data Types & I/O',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Variables</div><p class="learn-p">A <b>variable</b> in C++ is a named storage location in memory that holds a value of a specific type. Every variable must be <b>declared</b> before it can be used. Declaration tells the compiler the variable\'s name and what type of data it will store.</p><div class="learn-code">int age = 25;\ndouble salary = 50000.50;\nchar grade = \'A\';\nbool isActive = true;</div><p class="learn-p">C++ is a <b>statically typed</b> language, meaning the type of every variable is known at compile time. This is in contrast to dynamically typed languages like Python where types are determined at runtime.</p></div><div class="learn-section"><div class="learn-h">Fundamental Data Types</div><p class="learn-p">C++ provides several fundamental data types, each with different sizes and ranges:</p><table class="learn-table"><tr><th>Type</th><th>Size (bytes)</th><th>Range</th></tr><tr><td>char</td><td>1</td><td>-128 to 127</td></tr><tr><td>short</td><td>2</td><td>-32,768 to 32,767</td></tr><tr><td>int</td><td>4</td><td>-2.1B to 2.1B</td></tr><tr><td>long long</td><td>8</td><td>-9.2 x 10^18 to 9.2 x 10^18</td></tr><tr><td>float</td><td>4</td><td>~7 decimal digits precision</td></tr><tr><td>double</td><td>8</td><td>~15 decimal digits precision</td></tr><tr><td>bool</td><td>1</td><td>true (1) or false (0)</td></tr></table><p class="learn-p">The <code>unsigned</code> modifier can be used with integer types to represent only non-negative values, effectively doubling the positive range. For example, <code>unsigned int</code> ranges from 0 to ~4.2 billion.</p><div class="learn-code">unsigned int count = 4000000000U;\nlong long bigNum = 1e18;\nunsigned long long ull = 18446744073709551615ULL;</div></div><div class="learn-section"><div class="learn-h">Type Modifiers &amp; Qualifiers</div><p class="learn-p">C++ supports several type qualifiers:</p><ul class="learn-list"><li><code>const</code> - Makes a variable\'s value immutable after initialization</li><li><code>volatile</code> - Tells the compiler not to optimize access to this variable</li><li><code>auto</code> (C++11) - Lets the compiler deduce the type from the initializer</li><li><code>constexpr</code> (C++11) - Evaluated at compile time</li></ul><div class="learn-code">const int MAX_SIZE = 100;\nauto x = 3.14;  // deduced as double\nconstexpr int SQUARE = 5 * 5;  // computed at compile time</div></div><div class="learn-section"><div class="learn-h">Input/Output with cin and cout</div><p class="learn-p">C++ uses <b>streams</b> for I/O. The <code>&lt;iostream&gt;</code> header provides <code>cin</code> (standard input) and <code>cout</code> (standard output). The insertion operator <code>&lt;&lt;</code> sends data to output, and the extraction operator <code>&gt;&gt;</code> reads data from input.</p><div class="learn-code">#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n    int n;\n    cin &gt;&gt; n;\n    cout &lt;&lt; "Value: " &lt;&lt; n &lt;&lt; endl;\n    return 0;\n}</div><p class="learn-p">For faster I/O in competitive programming, use:</p><div class="learn-code">ios_base::sync_with_stdio(false);\ncin.tie(NULL);</div><p class="learn-p">This disables synchronization between C and C++ I/O streams and unties cin from cout, providing significant speedup. For reading entire lines including spaces, use <code>getline(cin, str)</code>.</p><div class="learn-tip"><b>Tip:</b> In competitive programming, always add <code>ios_base::sync_with_stdio(false); cin.tie(NULL);</code> at the start of main() to avoid TLE on problems with heavy I/O.</div><div class="learn-warn"><b>Warning:</b> Mixing <code>cin &gt;&gt;</code> with <code>getline()</code> can cause issues because <code>cin &gt;&gt;</code> leaves a newline in the buffer. Use <code>cin.ignore()</code> between them.</div></div><div class="learn-section"><div class="learn-h">Scope &amp; Lifetime</div><p class="learn-p">Variables have <b>scope</b> (where they can be accessed) and <b>lifetime</b> (how long they exist):</p><ul class="learn-list"><li><b>Local variables</b> - declared inside a function or block, exist only within that block</li><li><b>Global variables</b> - declared outside all functions, accessible everywhere, exist for the program\'s entire duration</li><li><b>Static variables</b> - retain their value between function calls</li></ul><div class="learn-code">int globalVar = 10;  // global scope\n\nvoid func() {\n    static int count = 0;  // retains value between calls\n    int local = 5;  // destroyed when func() ends\n    count++;\n}</div><div class="learn-tip"><b>Tip:</b> Minimize global variables. Prefer passing parameters to functions for cleaner, more testable code.</div></div>',
          code: `#include <iostream>
#include <string>
#include <climits>
using namespace std;

int main() {
    // ---- Fundamental Data Types ----
    int age = 25;
    double pi = 3.14159265358979;
    char letter = 'A';
    bool isValid = true;
    long long bigNumber = 1000000000000LL;
    unsigned int positive = 4000000000U;

    // ---- Output with cout ----
    cout << "Age: " << age << endl;
    cout << "Pi: " << pi << endl;
    cout << "Letter: " << letter << endl;
    cout << "Bool: " << boolalpha << isValid << endl;
    cout << "Big: " << bigNumber << endl;

    // ---- Input with cin ----
    int n;
    cout << "Enter a number: ";
    cin >> n;
    cout << "You entered: " << n << endl;

    // ---- Reading a full line ----
    cin.ignore(); // clear newline from buffer
    string fullName;
    cout << "Enter full name: ";
    getline(cin, fullName);
    cout << "Hello, " << fullName << "!" << endl;

    // ---- Type sizes ----
    cout << "sizeof(int): " << sizeof(int) << " bytes" << endl;
    cout << "sizeof(double): " << sizeof(double) << " bytes" << endl;
    cout << "sizeof(char): " << sizeof(char) << " byte" << endl;
    cout << "sizeof(long long): " << sizeof(long long) << " bytes" << endl;

    // ---- Constants and auto ----
    const int MAX = 1000;
    auto x = 42;       // int
    auto y = 3.14;     // double
    auto z = 'c';      // char
    constexpr int SQ = 10 * 10; // compile-time constant

    // ---- Limits ----
    cout << "INT_MAX: " << INT_MAX << endl;
    cout << "INT_MIN: " << INT_MIN << endl;
    cout << "LLONG_MAX: " << LLONG_MAX << endl;

    // ---- Fast I/O for competitive programming ----
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    return 0;
}`,
          problems: [
            ['Reverse Integer', 'https://leetcode.com/problems/reverse-integer/', 'Medium'],
            ['Number of 1 Bits', 'https://leetcode.com/problems/number-of-1-bits/', 'Easy'],
            ['Power of Two', 'https://leetcode.com/problems/power-of-two/', 'Easy'],
            ['Valid Number', 'https://leetcode.com/problems/valid-number/', 'Hard']
          ],
          mcqs: [
            {q: 'What is the size of a long long in C++ on most 64-bit systems?', o: ['4 bytes', '8 bytes', '16 bytes', '2 bytes'], a: 1},
            {q: 'What does ios_base::sync_with_stdio(false) do?', o: ['Makes cout faster by buffering output', 'Disables synchronization between C and C++ I/O streams', 'Enables multi-threaded I/O', 'Converts cin to scanf internally'], a: 1},
            {q: 'Which of the following is true about constexpr variables?', o: ['They can be modified at runtime', 'They must be initialized at compile time', 'They are the same as const', 'They can only be used with integers'], a: 1}
          ]
        },
        {
          t: 'Operators & Type Casting',
          learn: '<div class="learn-section"><div class="learn-h">Arithmetic Operators</div><p class="learn-p">C++ provides standard arithmetic operators for mathematical operations:</p><table class="learn-table"><tr><th>Operator</th><th>Description</th><th>Example</th></tr><tr><td>+</td><td>Addition</td><td>a + b</td></tr><tr><td>-</td><td>Subtraction</td><td>a - b</td></tr><tr><td>*</td><td>Multiplication</td><td>a * b</td></tr><tr><td>/</td><td>Division</td><td>a / b</td></tr><tr><td>%</td><td>Modulo (remainder)</td><td>a % b</td></tr></table><p class="learn-p"><b>Important:</b> Integer division truncates toward zero. <code>7 / 2</code> gives <code>3</code>, not <code>3.5</code>. If you need floating-point division, at least one operand must be a float or double.</p><div class="learn-code">int a = 7, b = 2;\ncout &lt;&lt; a / b;      // 3 (integer division)\ncout &lt;&lt; (double)a / b; // 3.5 (floating-point division)\ncout &lt;&lt; a % b;      // 1 (remainder)</div></div><div class="learn-section"><div class="learn-h">Comparison &amp; Logical Operators</div><p class="learn-p"><b>Comparison operators</b> return boolean values (true/false):</p><ul class="learn-list"><li><code>==</code> equal to, <code>!=</code> not equal to</li><li><code>&lt;</code> less than, <code>&gt;</code> greater than</li><li><code>&lt;=</code> less than or equal, <code>&gt;=</code> greater than or equal</li></ul><p class="learn-p"><b>Logical operators</b> combine boolean expressions:</p><ul class="learn-list"><li><code>&amp;&amp;</code> - Logical AND (both must be true)</li><li><code>||</code> - Logical OR (at least one must be true)</li><li><code>!</code> - Logical NOT (negation)</li></ul><p class="learn-p">C++ uses <b>short-circuit evaluation</b>: in <code>a &amp;&amp; b</code>, if <code>a</code> is false, <code>b</code> is never evaluated. Similarly, in <code>a || b</code>, if <code>a</code> is true, <code>b</code> is skipped.</p><div class="learn-warn"><b>Warning:</b> Don\'t confuse <code>=</code> (assignment) with <code>==</code> (comparison). Writing <code>if (x = 5)</code> assigns 5 to x and always evaluates to true!</div></div><div class="learn-section"><div class="learn-h">Bitwise Operators</div><p class="learn-p">Bitwise operators work on the binary representation of integers:</p><table class="learn-table"><tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr><tr><td>&amp;</td><td>AND</td><td>5 &amp; 3</td><td>1 (0101 &amp; 0011 = 0001)</td></tr><tr><td>|</td><td>OR</td><td>5 | 3</td><td>7 (0101 | 0011 = 0111)</td></tr><tr><td>^</td><td>XOR</td><td>5 ^ 3</td><td>6 (0101 ^ 0011 = 0110)</td></tr><tr><td>~</td><td>NOT</td><td>~5</td><td>-6</td></tr><tr><td>&lt;&lt;</td><td>Left Shift</td><td>5 &lt;&lt; 1</td><td>10</td></tr><tr><td>&gt;&gt;</td><td>Right Shift</td><td>5 &gt;&gt; 1</td><td>2</td></tr></table><p class="learn-p">Bitwise operations are extremely fast and commonly used in competitive programming. Left shifting by 1 is equivalent to multiplying by 2, and right shifting by 1 is equivalent to integer division by 2.</p><div class="learn-tip"><b>Tip:</b> Use <code>n &amp; 1</code> to check if a number is odd (returns 1) or even (returns 0). This is faster than <code>n % 2</code>.</div></div><div class="learn-section"><div class="learn-h">Assignment &amp; Compound Operators</div><p class="learn-p">C++ provides compound assignment operators that combine an operation with assignment:</p><div class="learn-code">int x = 10;\nx += 5;   // x = x + 5 = 15\nx -= 3;   // x = x - 3 = 12\nx *= 2;   // x = x * 2 = 24\nx /= 4;   // x = x / 4 = 6\nx %= 4;   // x = x % 4 = 2\nx &lt;&lt;= 2;  // x = x &lt;&lt; 2 = 8\nx &amp;= 3;   // x = x &amp; 3 = 0</div><p class="learn-p">The <b>increment</b> (<code>++</code>) and <b>decrement</b> (<code>--</code>) operators can be prefix or postfix:</p><div class="learn-code">int a = 5;\nint b = ++a; // a becomes 6, b = 6 (pre-increment)\nint c = a++; // c = 6 (old value), a becomes 7 (post-increment)</div></div><div class="learn-section"><div class="learn-h">Type Casting</div><p class="learn-p">C++ provides several ways to convert between types:</p><p class="learn-p"><b>1. Implicit Conversion (Coercion):</b> The compiler automatically converts types in expressions when a narrower type is combined with a wider type.</p><div class="learn-code">int i = 42;\ndouble d = i;    // implicit: int to double (42.0)\nint back = d;    // implicit: double to int (truncates)</div><p class="learn-p"><b>2. C-style Cast:</b> Forces conversion using parentheses syntax.</p><div class="learn-code">double pi = 3.14;\nint truncated = (int)pi;  // 3</div><p class="learn-p"><b>3. C++ Cast Operators (Preferred):</b></p><ul class="learn-list"><li><code>static_cast&lt;T&gt;(expr)</code> - Compile-time cast, safest for known conversions</li><li><code>dynamic_cast&lt;T&gt;(expr)</code> - Runtime cast for polymorphic types</li><li><code>const_cast&lt;T&gt;(expr)</code> - Add/remove const qualifier</li><li><code>reinterpret_cast&lt;T&gt;(expr)</code> - Low-level bit reinterpretation</li></ul><div class="learn-code">double val = 9.97;\nint rounded = static_cast&lt;int&gt;(val);  // 9 (truncates toward zero)</div><div class="learn-warn"><b>Warning:</b> Implicit narrowing conversions (e.g., double to int) can silently lose data. Always use explicit casts when narrowing to show intent and suppress compiler warnings.</div><div class="learn-tip"><b>Tip:</b> Prefer <code>static_cast</code> over C-style casts in interviews. It\'s type-safe and clearly communicates intent.</div></div><div class="learn-section"><div class="learn-h">Operator Precedence</div><p class="learn-p">Understanding operator precedence prevents bugs. From highest to lowest priority:</p><ol class="learn-list"><li>Postfix: <code>a++</code>, <code>a--</code>, function calls</li><li>Unary: <code>++a</code>, <code>--a</code>, <code>!</code>, <code>~</code></li><li>Multiplicative: <code>*</code>, <code>/</code>, <code>%</code></li><li>Additive: <code>+</code>, <code>-</code></li><li>Shift: <code>&lt;&lt;</code>, <code>&gt;&gt;</code></li><li>Relational: <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code></li><li>Equality: <code>==</code>, <code>!=</code></li><li>Bitwise AND: <code>&amp;</code></li><li>Bitwise XOR: <code>^</code></li><li>Bitwise OR: <code>|</code></li><li>Logical AND: <code>&amp;&amp;</code></li><li>Logical OR: <code>||</code></li><li>Assignment: <code>=</code>, <code>+=</code>, etc.</li></ol><div class="learn-tip"><b>Tip:</b> When in doubt, use parentheses to make your intent clear. This also makes code more readable.</div></div>',
          code: `#include <iostream>
#include <cmath>
using namespace std;

int main() {
    // ---- Arithmetic Operators ----
    int a = 17, b = 5;
    cout << "a + b = " << a + b << endl;   // 22
    cout << "a - b = " << a - b << endl;   // 12
    cout << "a * b = " << a * b << endl;   // 85
    cout << "a / b = " << a / b << endl;   // 3 (integer division)
    cout << "a % b = " << a % b << endl;   // 2

    // ---- Floating-point division ----
    cout << "(double)a / b = " << (double)a / b << endl; // 3.4

    // ---- Comparison Operators ----
    cout << (a == b) << endl;  // 0 (false)
    cout << (a != b) << endl;  // 1 (true)
    cout << (a > b) << endl;   // 1 (true)

    // ---- Logical Operators ----
    bool x = true, y = false;
    cout << (x && y) << endl;  // 0
    cout << (x || y) << endl;  // 1
    cout << (!x) << endl;      // 0

    // ---- Bitwise Operators ----
    int p = 5, q = 3;  // 0101, 0011
    cout << "AND: " << (p & q) << endl;   // 1
    cout << "OR:  " << (p | q) << endl;   // 7
    cout << "XOR: " << (p ^ q) << endl;   // 6
    cout << "NOT: " << (~p) << endl;      // -6
    cout << "LSH: " << (p << 1) << endl;  // 10
    cout << "RSH: " << (p >> 1) << endl;  // 2

    // Check odd/even using bitwise AND
    int n = 42;
    cout << n << " is " << ((n & 1) ? "odd" : "even") << endl;

    // ---- Type Casting ----
    // Implicit conversion
    int i = 65;
    double d = i;         // int to double: 65.0
    char c = i;           // int to char: 'A'

    // static_cast (preferred in modern C++)
    double pi = 3.14159;
    int truncated = static_cast<int>(pi);  // 3
    cout << "Truncated: " << truncated << endl;

    // Casting for correct division
    int num = 7, den = 2;
    double result = static_cast<double>(num) / den;
    cout << "7/2 = " << result << endl;  // 3.5

    // ---- Increment/Decrement ----
    int val = 10;
    cout << "Pre:  " << ++val << endl;  // 11
    cout << "Post: " << val++ << endl;  // 11 (val becomes 12)
    cout << "Now:  " << val << endl;    // 12

    return 0;
}`,
          problems: [
            ['Divide Two Integers', 'https://leetcode.com/problems/divide-two-integers/', 'Medium'],
            ['Sum of Two Integers', 'https://leetcode.com/problems/sum-of-two-integers/', 'Medium'],
            ['Single Number', 'https://leetcode.com/problems/single-number/', 'Easy'],
            ['Bitwise AND of Numbers Range', 'https://leetcode.com/problems/bitwise-and-of-numbers-range/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the result of 7 / 2 in C++ when both operands are integers?', o: ['3.5', '3', '4', '3.0'], a: 1},
            {q: 'Which C++ cast should be preferred for safe type conversions?', o: ['C-style cast (int)x', 'reinterpret_cast', 'static_cast', 'const_cast'], a: 2},
            {q: 'What does the expression (n & 1) evaluate to when n = 6?', o: ['1', '0', '6', '3'], a: 1}
          ]
        },
        {
          t: 'Control Flow (if/else, loops, switch)',
          learn: '<div class="learn-section"><div class="learn-h">Conditional Statements: if, else if, else</div><p class="learn-p">Conditional statements allow your program to make decisions based on conditions. The <code>if</code> statement evaluates a boolean expression and executes a block of code only if the expression is true.</p><div class="learn-code">if (condition) {\n    // executed if condition is true\n} else if (anotherCondition) {\n    // executed if first is false and this is true\n} else {\n    // executed if all above are false\n}</div><p class="learn-p">In C++, any non-zero value is considered <code>true</code> and zero is <code>false</code>. This means expressions like <code>if (n)</code> are equivalent to <code>if (n != 0)</code>.</p><div class="learn-warn"><b>Warning:</b> A common bug is writing <code>if (x = 5)</code> instead of <code>if (x == 5)</code>. The first assigns 5 to x and always evaluates to true. Some programmers write <code>if (5 == x)</code> (Yoda conditions) to catch this at compile time.</div></div><div class="learn-section"><div class="learn-h">Ternary Operator</div><p class="learn-p">The ternary operator <code>? :</code> is a shorthand for simple if-else:</p><div class="learn-code">int max = (a &gt; b) ? a : b;\nstring result = (score &gt;= 50) ? "Pass" : "Fail";</div><p class="learn-p">Use the ternary operator for simple, one-line conditional assignments. For complex logic, prefer regular if-else for readability.</p></div><div class="learn-section"><div class="learn-h">Switch Statement</div><p class="learn-p">The <code>switch</code> statement is ideal when comparing a variable against multiple constant values. It\'s more efficient than a chain of if-else when there are many cases.</p><div class="learn-code">switch (day) {\n    case 1: cout &lt;&lt; "Monday"; break;\n    case 2: cout &lt;&lt; "Tuesday"; break;\n    case 3: cout &lt;&lt; "Wednesday"; break;\n    default: cout &lt;&lt; "Other";\n}</div><p class="learn-p">Key rules for switch:</p><ul class="learn-list"><li>The expression must evaluate to an integer or enum type</li><li>Each <code>case</code> must be a compile-time constant</li><li>Always include <code>break</code> unless you intentionally want fall-through</li><li><code>default</code> handles all unmatched cases</li></ul><div class="learn-warn"><b>Warning:</b> Forgetting <code>break</code> in a switch causes fall-through, where execution continues into the next case. This is a very common source of bugs.</div></div><div class="learn-section"><div class="learn-h">Loops: for, while, do-while</div><p class="learn-p">C++ provides three loop constructs:</p><p class="learn-p"><b>1. for loop</b> - Best when you know the number of iterations:</p><div class="learn-code">for (int i = 0; i &lt; n; i++) {\n    cout &lt;&lt; i &lt;&lt; " ";\n}</div><p class="learn-p"><b>2. while loop</b> - Best when the condition is checked before each iteration:</p><div class="learn-code">while (condition) {\n    // body\n    // must update condition to avoid infinite loop\n}</div><p class="learn-p"><b>3. do-while loop</b> - Guarantees at least one execution:</p><div class="learn-code">do {\n    // body executes at least once\n} while (condition);</div></div><div class="learn-section"><div class="learn-h">Range-based for Loop (C++11)</div><p class="learn-p">The range-based for loop simplifies iteration over containers:</p><div class="learn-code">vector&lt;int&gt; v = {1, 2, 3, 4, 5};\nfor (int x : v) {\n    cout &lt;&lt; x &lt;&lt; " ";  // read-only\n}\nfor (int&amp; x : v) {\n    x *= 2;  // modify elements\n}\nfor (const auto&amp; x : v) {\n    cout &lt;&lt; x &lt;&lt; " ";  // efficient read-only with auto\n}</div><div class="learn-tip"><b>Tip:</b> Use <code>const auto&amp;</code> in range-based for loops when you don\'t need to modify elements. It avoids copies and clearly signals read-only intent.</div></div><div class="learn-section"><div class="learn-h">Loop Control: break, continue, goto</div><p class="learn-p"><code>break</code> exits the innermost loop entirely. <code>continue</code> skips the rest of the current iteration and moves to the next one.</p><div class="learn-code">for (int i = 0; i &lt; 10; i++) {\n    if (i == 3) continue;  // skip 3\n    if (i == 7) break;     // stop at 7\n    cout &lt;&lt; i &lt;&lt; " ";     // prints: 0 1 2 4 5 6\n}</div><p class="learn-p">For nested loops, <code>break</code> only exits the innermost loop. To break out of multiple loops, you can use a flag variable, a function with return, or (rarely) <code>goto</code>.</p><div class="learn-tip"><b>Tip:</b> In competitive programming, you\'ll often use <code>while(t--)</code> to handle multiple test cases, and nested loops for matrix traversal.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // ---- if-else example ----
    int n;
    cin >> n;
    if (n > 0) {
        cout << "Positive" << endl;
    } else if (n < 0) {
        cout << "Negative" << endl;
    } else {
        cout << "Zero" << endl;
    }

    // ---- Ternary operator ----
    int a = 10, b = 20;
    int maxVal = (a > b) ? a : b;
    cout << "Max: " << maxVal << endl;

    // ---- Switch statement ----
    char grade = 'B';
    switch (grade) {
        case 'A': cout << "Excellent" << endl; break;
        case 'B': cout << "Good" << endl; break;
        case 'C': cout << "Average" << endl; break;
        default:  cout << "Below Average" << endl;
    }

    // ---- for loop ----
    cout << "For loop: ";
    for (int i = 1; i <= 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    // ---- while loop ----
    int count = 5;
    cout << "While: ";
    while (count > 0) {
        cout << count-- << " ";
    }
    cout << endl;

    // ---- do-while loop ----
    int x;
    do {
        cout << "Enter positive number: ";
        cin >> x;
    } while (x <= 0);

    // ---- Range-based for loop ----
    vector<int> v = {10, 20, 30, 40, 50};
    cout << "Range-based: ";
    for (const auto& val : v) {
        cout << val << " ";
    }
    cout << endl;

    // ---- break and continue ----
    cout << "Break/Continue: ";
    for (int i = 0; i < 10; i++) {
        if (i % 2 == 0) continue; // skip even
        if (i > 7) break;         // stop after 7
        cout << i << " ";         // prints: 1 3 5 7
    }
    cout << endl;

    // ---- Nested loops with test cases ----
    int t = 3;
    while (t--) {
        cout << "Test case " << (3 - t) << endl;
    }

    return 0;
}`,
          problems: [
            ['Fizz Buzz', 'https://leetcode.com/problems/fizz-buzz/', 'Easy'],
            ['Number of Steps to Reduce a Number to Zero', 'https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/', 'Easy'],
            ['Guess Number Higher or Lower', 'https://leetcode.com/problems/guess-number-higher-or-lower/', 'Easy'],
            ['Count Primes', 'https://leetcode.com/problems/count-primes/', 'Medium']
          ],
          mcqs: [
            {q: 'What happens if you omit break in a switch case?', o: ['Compilation error', 'Only the matching case executes', 'Fall-through: execution continues to next case', 'The default case executes'], a: 2},
            {q: 'How many times does a do-while loop execute at minimum?', o: ['Zero', 'One', 'Two', 'Depends on condition'], a: 1},
            {q: 'What does "for (const auto& x : v)" do?', o: ['Iterates over v by value', 'Iterates over v by const reference (no copy)', 'Creates a copy of v', 'Iterates backwards'], a: 1}
          ]
        },
        {
          t: 'Functions & Recursion Basics',
          learn: '<div class="learn-section"><div class="learn-h">Function Basics</div><p class="learn-p">A <b>function</b> is a reusable block of code that performs a specific task. Functions help organize code, reduce duplication, and improve readability. In C++, every function has a return type, a name, and a parameter list.</p><div class="learn-code">returnType functionName(paramType param1, paramType param2) {\n    // function body\n    return value;\n}</div><p class="learn-p">If a function does not return a value, use <code>void</code> as the return type. The <code>main()</code> function is the entry point of every C++ program and returns <code>int</code>.</p></div><div class="learn-section"><div class="learn-h">Pass by Value vs Pass by Reference</div><p class="learn-p">Understanding parameter passing is crucial for writing efficient C++ code:</p><p class="learn-p"><b>Pass by Value:</b> A copy of the argument is made. Changes inside the function do not affect the original variable.</p><div class="learn-code">void increment(int x) {\n    x++;  // modifies local copy only\n}\nint a = 5;\nincrement(a);  // a is still 5</div><p class="learn-p"><b>Pass by Reference:</b> The function receives a reference to the original variable. Changes are reflected outside.</p><div class="learn-code">void increment(int&amp; x) {\n    x++;  // modifies original variable\n}\nint a = 5;\nincrement(a);  // a is now 6</div><p class="learn-p"><b>Pass by Const Reference:</b> Efficient for large objects (avoids copy) while preventing modification.</p><div class="learn-code">void print(const vector&lt;int&gt;&amp; v) {\n    for (int x : v) cout &lt;&lt; x &lt;&lt; " ";\n}</div><div class="learn-tip"><b>Tip:</b> For primitive types (int, double), pass by value. For containers and objects, pass by const reference to avoid expensive copies. Use non-const reference only when you need to modify the argument.</div></div><div class="learn-section"><div class="learn-h">Function Overloading</div><p class="learn-p">C++ allows multiple functions with the same name but different parameter lists. The compiler selects the correct version based on the arguments provided.</p><div class="learn-code">int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint add(int a, int b, int c) { return a + b + c; }</div><p class="learn-p">Overloading is resolved at <b>compile time</b> based on the number and types of arguments. The return type alone is not sufficient to distinguish overloaded functions.</p></div><div class="learn-section"><div class="learn-h">Default Arguments &amp; Inline Functions</div><p class="learn-p"><b>Default arguments</b> provide fallback values for parameters that are not passed:</p><div class="learn-code">void greet(string name, string greeting = "Hello") {\n    cout &lt;&lt; greeting &lt;&lt; ", " &lt;&lt; name &lt;&lt; "!" &lt;&lt; endl;\n}\ngreet("Alice");           // "Hello, Alice!"\ngreet("Bob", "Welcome");  // "Welcome, Bob!"</div><p class="learn-p">Default arguments must be specified from right to left — you cannot skip a default parameter in the middle.</p><p class="learn-p"><b>Inline functions</b> suggest to the compiler to insert the function\'s code directly at the call site, avoiding function call overhead for small functions:</p><div class="learn-code">inline int square(int x) { return x * x; }</div></div><div class="learn-section"><div class="learn-h">Recursion Fundamentals</div><p class="learn-p"><b>Recursion</b> is when a function calls itself to solve smaller subproblems. Every recursive function needs:</p><ol class="learn-list"><li><b>Base case:</b> The condition that stops recursion</li><li><b>Recursive case:</b> The function calls itself with a smaller/simpler input</li><li><b>Progress toward base case:</b> Each recursive call must move closer to the base case</li></ol><div class="learn-code">// Classic example: Factorial\nint factorial(int n) {\n    if (n &lt;= 1) return 1;       // base case\n    return n * factorial(n - 1);  // recursive case\n}\n// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120</div><p class="learn-p">Recursion uses the <b>call stack</b>. Each recursive call adds a new frame to the stack. If recursion is too deep (e.g., factorial(1000000)), you get a <b>stack overflow</b>.</p></div><div class="learn-section"><div class="learn-h">Recursion vs Iteration</div><p class="learn-p">Most recursive solutions can be converted to iterative ones and vice versa. Key differences:</p><table class="learn-table"><tr><th>Aspect</th><th>Recursion</th><th>Iteration</th></tr><tr><td>Memory</td><td>Uses stack frames (<span class="learn-complexity">O(n)</span> space)</td><td>Usually <span class="learn-complexity">O(1)</span> extra space</td></tr><tr><td>Speed</td><td>Function call overhead</td><td>Generally faster</td></tr><tr><td>Readability</td><td>More elegant for tree/graph problems</td><td>Better for simple loops</td></tr><tr><td>Risk</td><td>Stack overflow for deep recursion</td><td>No stack overflow risk</td></tr></table><div class="learn-tip"><b>Tip:</b> Use recursion for problems that have a natural recursive structure: trees, graphs, divide &amp; conquer, backtracking. For simple iterations, prefer loops.</div><div class="learn-warn"><b>Warning:</b> Always verify your base case handles all edge cases. A missing or incorrect base case leads to infinite recursion and stack overflow.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

// ---- Pass by value ----
void swapByValue(int a, int b) {
    int temp = a; a = b; b = temp;
    // Original variables are NOT swapped
}

// ---- Pass by reference ----
void swapByRef(int& a, int& b) {
    int temp = a; a = b; b = temp;
    // Original variables ARE swapped
}

// ---- Function overloading ----
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// ---- Default arguments ----
void printLine(int n, char c = '-') {
    for (int i = 0; i < n; i++) cout << c;
    cout << endl;
}

// ---- Recursion: Factorial ----
long long factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// ---- Recursion: Fibonacci (naive) ----
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

// ---- Recursion: Power ----
// O(log n) using fast exponentiation
long long power(long long base, int exp) {
    if (exp == 0) return 1;
    long long half = power(base, exp / 2);
    if (exp % 2 == 0)
        return half * half;
    else
        return half * half * base;
}

// ---- Recursion: Sum of digits ----
int sumDigits(int n) {
    if (n == 0) return 0;
    return (n % 10) + sumDigits(n / 10);
}

// ---- Recursion: Reverse a string ----
void reverseStr(string& s, int l, int r) {
    if (l >= r) return;
    swap(s[l], s[r]);
    reverseStr(s, l + 1, r - 1);
}

int main() {
    // Pass by value vs reference
    int a = 5, b = 10;
    swapByValue(a, b);
    cout << "After swapByValue: " << a << " " << b << endl; // 5 10
    swapByRef(a, b);
    cout << "After swapByRef: " << a << " " << b << endl;   // 10 5

    // Overloading
    cout << add(3, 4) << endl;       // 7
    cout << add(3.5, 4.2) << endl;   // 7.7

    // Default arguments
    printLine(10);       // ----------
    printLine(10, '*');  // **********

    // Recursion examples
    cout << "5! = " << factorial(5) << endl;       // 120
    cout << "fib(10) = " << fib(10) << endl;       // 55
    cout << "2^10 = " << power(2, 10) << endl;     // 1024
    cout << "sumDigits(1234) = " << sumDigits(1234) << endl; // 10

    string s = "hello";
    reverseStr(s, 0, s.size() - 1);
    cout << "Reversed: " << s << endl; // olleh

    return 0;
}`,
          problems: [
            ['Power of Three', 'https://leetcode.com/problems/power-of-three/', 'Easy'],
            ['Fibonacci Number', 'https://leetcode.com/problems/fibonacci-number/', 'Easy'],
            ['Pow(x, n)', 'https://leetcode.com/problems/powx-n/', 'Medium'],
            ['Count Good Numbers', 'https://leetcode.com/problems/count-good-numbers/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of the naive recursive Fibonacci implementation?', o: ['O(n)', 'O(n log n)', 'O(2^n)', 'O(n^2)'], a: 2},
            {q: 'When should you pass by const reference instead of by value?', o: ['For primitive types like int', 'For large objects like vectors and strings', 'When you want to modify the argument', 'For pointers'], a: 1},
            {q: 'What happens if a recursive function has no base case?', o: ['It returns 0', 'Compilation error', 'Stack overflow (infinite recursion)', 'It runs once and stops'], a: 2}
          ]
        },
        {
          t: 'Pointers & References',
          learn: '<div class="learn-section"><div class="learn-h">What are Pointers?</div><p class="learn-p">A <b>pointer</b> is a variable that stores the <b>memory address</b> of another variable. Pointers are one of the most powerful and important features of C++. They enable dynamic memory allocation, efficient array manipulation, and building complex data structures like linked lists and trees.</p><div class="learn-code">int x = 42;\nint* ptr = &amp;x;  // ptr stores the address of x\ncout &lt;&lt; ptr;    // prints address (e.g., 0x7ffd5e8c)\ncout &lt;&lt; *ptr;   // prints 42 (dereferencing)</div><p class="learn-p">Key pointer operators:</p><ul class="learn-list"><li><code>&amp;</code> (address-of operator): Gets the memory address of a variable</li><li><code>*</code> (dereference operator): Accesses the value at the address stored in the pointer</li></ul></div><div class="learn-section"><div class="learn-h">Pointer Arithmetic</div><p class="learn-p">Pointer arithmetic allows you to navigate through memory. When you increment a pointer, it moves by the size of the type it points to.</p><div class="learn-code">int arr[] = {10, 20, 30, 40, 50};\nint* p = arr;     // points to arr[0]\ncout &lt;&lt; *p;       // 10\ncout &lt;&lt; *(p + 1); // 20\ncout &lt;&lt; *(p + 2); // 30\np++;              // now points to arr[1]\ncout &lt;&lt; *p;       // 20</div><p class="learn-p">Array names decay to pointers to their first element. So <code>arr[i]</code> is equivalent to <code>*(arr + i)</code>.</p></div><div class="learn-section"><div class="learn-h">Null and Dangling Pointers</div><p class="learn-p">A <b>null pointer</b> points to nothing. Always initialize pointers to <code>nullptr</code> (C++11) if they don\'t point to a valid address yet.</p><div class="learn-code">int* p = nullptr;  // null pointer (C++11)\nif (p != nullptr) {\n    cout &lt;&lt; *p;  // safe: only dereference if not null\n}</div><p class="learn-p">A <b>dangling pointer</b> points to memory that has been freed or a variable that has gone out of scope. Dereferencing a dangling pointer is <b>undefined behavior</b>.</p><div class="learn-warn"><b>Warning:</b> Never dereference a null or dangling pointer. Always check for nullptr before dereferencing, and set pointers to nullptr after deleting them.</div></div><div class="learn-section"><div class="learn-h">Dynamic Memory Allocation</div><p class="learn-p">C++ uses <code>new</code> and <code>delete</code> for dynamic memory management on the heap:</p><div class="learn-code">// Single variable\nint* p = new int(42);  // allocate and initialize\ncout &lt;&lt; *p;            // 42\ndelete p;              // free memory\np = nullptr;           // prevent dangling pointer\n\n// Array\nint* arr = new int[100];  // dynamic array\narr[0] = 10;\ndelete[] arr;             // free array (note the [])\narr = nullptr;</div><div class="learn-warn"><b>Warning:</b> Every <code>new</code> must have a matching <code>delete</code>, and every <code>new[]</code> must have a matching <code>delete[]</code>. Mismatching these causes memory leaks or undefined behavior.</div></div><div class="learn-section"><div class="learn-h">References</div><p class="learn-p">A <b>reference</b> is an alias for an existing variable. Unlike pointers, references cannot be null, cannot be reassigned to refer to a different variable, and don\'t need to be dereferenced.</p><div class="learn-code">int x = 10;\nint&amp; ref = x;  // ref is an alias for x\nref = 20;      // changes x to 20\ncout &lt;&lt; x;     // prints 20</div><p class="learn-p"><b>Pointers vs References:</b></p><table class="learn-table"><tr><th>Feature</th><th>Pointer</th><th>Reference</th></tr><tr><td>Can be null?</td><td>Yes</td><td>No</td></tr><tr><td>Can be reassigned?</td><td>Yes</td><td>No</td></tr><tr><td>Needs dereferencing?</td><td>Yes (*ptr)</td><td>No (direct use)</td></tr><tr><td>Has own address?</td><td>Yes</td><td>No (shares with referent)</td></tr><tr><td>Arithmetic?</td><td>Yes</td><td>No</td></tr></table></div><div class="learn-section"><div class="learn-h">Smart Pointers (Modern C++)</div><p class="learn-p">Modern C++ (C++11+) provides <b>smart pointers</b> that automatically manage memory, preventing leaks:</p><ul class="learn-list"><li><code>unique_ptr&lt;T&gt;</code> - Exclusive ownership. Cannot be copied, only moved. Use for most cases.</li><li><code>shared_ptr&lt;T&gt;</code> - Shared ownership with reference counting. Destroyed when last shared_ptr is destroyed.</li><li><code>weak_ptr&lt;T&gt;</code> - Non-owning reference to shared_ptr. Breaks circular references.</li></ul><div class="learn-code">#include &lt;memory&gt;\nauto up = make_unique&lt;int&gt;(42);    // unique_ptr\nauto sp = make_shared&lt;int&gt;(100);   // shared_ptr\ncout &lt;&lt; *up &lt;&lt; " " &lt;&lt; *sp;        // 42 100</div><div class="learn-tip"><b>Tip:</b> In modern C++, prefer smart pointers over raw <code>new</code>/<code>delete</code>. Use <code>unique_ptr</code> by default, and <code>shared_ptr</code> only when you truly need shared ownership.</div></div>',
          code: `#include <iostream>
#include <memory>
using namespace std;

int main() {
    // ---- Basic Pointers ----
    int x = 42;
    int* ptr = &x;        // ptr holds address of x
    cout << "Address: " << ptr << endl;
    cout << "Value: " << *ptr << endl;   // 42
    *ptr = 100;           // modify x through pointer
    cout << "x = " << x << endl;        // 100

    // ---- Pointer Arithmetic ----
    int arr[] = {10, 20, 30, 40, 50};
    int* p = arr;
    for (int i = 0; i < 5; i++) {
        cout << *(p + i) << " ";  // 10 20 30 40 50
    }
    cout << endl;

    // ---- Null Pointer ----
    int* np = nullptr;
    if (np == nullptr) {
        cout << "Pointer is null" << endl;
    }

    // ---- Dynamic Memory ----
    int* dynVal = new int(99);
    cout << "Dynamic: " << *dynVal << endl;
    delete dynVal;
    dynVal = nullptr;

    // Dynamic array
    int n = 5;
    int* dynArr = new int[n];
    for (int i = 0; i < n; i++) dynArr[i] = i * 10;
    for (int i = 0; i < n; i++) cout << dynArr[i] << " ";
    cout << endl;
    delete[] dynArr;

    // ---- References ----
    int a = 10;
    int& ref = a;    // ref is alias for a
    ref = 20;
    cout << "a = " << a << endl;  // 20

    // ---- Swap using pointers ----
    int m = 5, nn = 10;
    int* pm = &m, *pn = &nn;
    int temp = *pm; *pm = *pn; *pn = temp;
    cout << "m=" << m << " n=" << nn << endl;  // m=10 n=5

    // ---- Smart Pointers ----
    // unique_ptr: exclusive ownership
    unique_ptr<int> up = make_unique<int>(42);
    cout << "unique_ptr: " << *up << endl;
    // up is auto-deleted when out of scope

    // shared_ptr: shared ownership
    shared_ptr<int> sp1 = make_shared<int>(100);
    shared_ptr<int> sp2 = sp1;  // both own the same int
    cout << "shared_ptr: " << *sp1 << ", count=" << sp1.use_count() << endl;

    return 0;
}`,
          problems: [
            ['Reverse Linked List', 'https://leetcode.com/problems/reverse-linked-list/', 'Easy'],
            ['Linked List Cycle', 'https://leetcode.com/problems/linked-list-cycle/', 'Easy'],
            ['Copy List with Random Pointer', 'https://leetcode.com/problems/copy-list-with-random-pointer/', 'Medium'],
            ['LRU Cache', 'https://leetcode.com/problems/lru-cache/', 'Medium']
          ],
          mcqs: [
            {q: 'What does the & operator do when used in a variable declaration like int& ref = x?', o: ['Gets the address of x', 'Creates a reference (alias) to x', 'Performs bitwise AND', 'Creates a pointer to x'], a: 1},
            {q: 'What happens when you dereference a nullptr?', o: ['Returns 0', 'Returns null', 'Undefined behavior (likely crash)', 'Compilation error'], a: 2},
            {q: 'Which smart pointer should be used by default for single ownership?', o: ['shared_ptr', 'weak_ptr', 'auto_ptr', 'unique_ptr'], a: 3}
          ]
        }
      ]
    },
    {
      id: 'stl', t: 'STL',
      topics: [
        {
          t: 'Vectors & Dynamic Arrays',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Vectors</div><p class="learn-p">A <b>vector</b> is the most commonly used container in the C++ Standard Template Library (STL). It is a dynamic array that can grow and shrink at runtime. Vectors store elements in contiguous memory, providing <span class="learn-complexity">O(1)</span> random access and <b>amortized</b> <span class="learn-complexity">O(1)</span> push_back.</p><div class="learn-code">#include &lt;vector&gt;\nvector&lt;int&gt; v;           // empty vector\nvector&lt;int&gt; v(5);        // 5 elements, all 0\nvector&lt;int&gt; v(5, 10);    // 5 elements, all 10\nvector&lt;int&gt; v = {1,2,3}; // initializer list</div></div><div class="learn-section"><div class="learn-h">Common Vector Operations</div><table class="learn-table"><tr><th>Operation</th><th>Syntax</th><th>Time Complexity</th></tr><tr><td>Access element</td><td>v[i] or v.at(i)</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Push back</td><td>v.push_back(x)</td><td>Amortized <span class="learn-complexity">O(1)</span></td></tr><tr><td>Pop back</td><td>v.pop_back()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Insert</td><td>v.insert(pos, x)</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Erase</td><td>v.erase(pos)</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Size</td><td>v.size()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Empty check</td><td>v.empty()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Clear</td><td>v.clear()</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Resize</td><td>v.resize(n)</td><td><span class="learn-complexity">O(n)</span></td></tr></table></div><div class="learn-section"><div class="learn-h">How Vectors Grow</div><p class="learn-p">Vectors manage memory automatically. When the current capacity is exceeded, the vector allocates a new, larger block of memory (typically <b>2x</b> the current capacity), copies all elements, and frees the old block. This is why push_back is <b>amortized</b> O(1) — most calls are O(1), but occasional reallocations cost O(n).</p><div class="learn-code">vector&lt;int&gt; v;\ncout &lt;&lt; v.capacity(); // 0\nv.push_back(1);\ncout &lt;&lt; v.capacity(); // 1\nv.push_back(2);\ncout &lt;&lt; v.capacity(); // 2\nv.push_back(3);\ncout &lt;&lt; v.capacity(); // 4 (doubled!)\nv.reserve(100);       // pre-allocate for 100 elements</div><div class="learn-tip"><b>Tip:</b> If you know the approximate size in advance, use <code>v.reserve(n)</code> to avoid repeated reallocations. This can significantly improve performance.</div></div><div class="learn-section"><div class="learn-h">2D Vectors</div><p class="learn-p">2D vectors are vectors of vectors, commonly used for matrices and grids:</p><div class="learn-code">// Create a 3x4 matrix filled with 0\nvector&lt;vector&lt;int&gt;&gt; mat(3, vector&lt;int&gt;(4, 0));\nmat[1][2] = 5;  // access row 1, col 2\n\n// Iterate\nfor (int i = 0; i &lt; mat.size(); i++)\n    for (int j = 0; j &lt; mat[0].size(); j++)\n        cout &lt;&lt; mat[i][j] &lt;&lt; " ";</div></div><div class="learn-section"><div class="learn-h">Vector Tricks for Competitive Programming</div><ul class="learn-list"><li><code>sort(v.begin(), v.end())</code> — sort in ascending order</li><li><code>sort(v.begin(), v.end(), greater&lt;int&gt;())</code> — descending order</li><li><code>reverse(v.begin(), v.end())</code> — reverse the vector</li><li><code>*max_element(v.begin(), v.end())</code> — find maximum</li><li><code>*min_element(v.begin(), v.end())</code> — find minimum</li><li><code>accumulate(v.begin(), v.end(), 0)</code> — sum of elements</li><li><code>v.erase(unique(v.begin(), v.end()), v.end())</code> — remove consecutive duplicates</li></ul><div class="learn-warn"><b>Warning:</b> Accessing <code>v[i]</code> when <code>i &gt;= v.size()</code> is undefined behavior. Use <code>v.at(i)</code> for bounds-checked access that throws an exception, or always verify the index.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    // ---- Initialization ----
    vector<int> v1;                    // empty
    vector<int> v2(5, 10);            // {10,10,10,10,10}
    vector<int> v3 = {3, 1, 4, 1, 5}; // initializer list

    // ---- Basic Operations ----
    v1.push_back(10);
    v1.push_back(20);
    v1.push_back(30);
    cout << "Front: " << v1.front() << endl; // 10
    cout << "Back: " << v1.back() << endl;   // 30
    cout << "Size: " << v1.size() << endl;   // 3
    v1.pop_back();  // removes 30

    // ---- Access ----
    cout << "v3[2] = " << v3[2] << endl;     // 4
    cout << "v3.at(2) = " << v3.at(2) << endl; // 4 (bounds checked)

    // ---- Sorting ----
    sort(v3.begin(), v3.end());          // ascending: 1 1 3 4 5
    sort(v3.begin(), v3.end(), greater<int>()); // descending: 5 4 3 1 1

    // ---- Useful algorithms ----
    vector<int> nums = {5, 2, 8, 1, 9, 3};
    cout << "Max: " << *max_element(nums.begin(), nums.end()) << endl; // 9
    cout << "Min: " << *min_element(nums.begin(), nums.end()) << endl; // 1
    cout << "Sum: " << accumulate(nums.begin(), nums.end(), 0) << endl; // 28

    // ---- Insert and Erase ----
    vector<int> v = {1, 2, 3, 4, 5};
    v.insert(v.begin() + 2, 99);  // {1, 2, 99, 3, 4, 5}
    v.erase(v.begin() + 1);       // {1, 99, 3, 4, 5}

    // ---- 2D Vector ----
    int rows = 3, cols = 4;
    vector<vector<int>> mat(rows, vector<int>(cols, 0));
    mat[1][2] = 42;
    for (auto& row : mat) {
        for (int val : row) cout << val << " ";
        cout << endl;
    }

    // ---- Remove duplicates from sorted vector ----
    vector<int> dup = {1, 1, 2, 2, 3, 3, 3, 4};
    dup.erase(unique(dup.begin(), dup.end()), dup.end());
    // dup = {1, 2, 3, 4}

    // ---- Reserve for performance ----
    vector<int> big;
    big.reserve(1000000); // pre-allocate
    for (int i = 0; i < 1000000; i++) big.push_back(i);

    return 0;
}`,
          problems: [
            ['Two Sum', 'https://leetcode.com/problems/two-sum/', 'Easy'],
            ['Remove Duplicates from Sorted Array', 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', 'Easy'],
            ['Rotate Array', 'https://leetcode.com/problems/rotate-array/', 'Medium'],
            ['Pascal\'s Triangle', 'https://leetcode.com/problems/pascals-triangle/', 'Easy'],
            ['Spiral Matrix', 'https://leetcode.com/problems/spiral-matrix/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the amortized time complexity of push_back on a vector?', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], a: 2},
            {q: 'What does v.reserve(100) do?', o: ['Resizes vector to 100 elements', 'Pre-allocates memory for 100 elements without changing size', 'Creates 100 copies of the vector', 'Limits vector to max 100 elements'], a: 1},
            {q: 'What is the time complexity of inserting an element at the beginning of a vector?', o: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], a: 2}
          ]
        },
        {
          t: 'Maps, Sets & Unordered Containers',
          learn: '<div class="learn-section"><div class="learn-h">std::map — Ordered Map</div><p class="learn-p">A <code>map</code> stores key-value pairs in <b>sorted order</b> by key. It is implemented as a <b>Red-Black Tree</b> (self-balancing BST), giving <span class="learn-complexity">O(log n)</span> for insert, find, and erase.</p><div class="learn-code">#include &lt;map&gt;\nmap&lt;string, int&gt; ages;\nages["Alice"] = 25;\nages["Bob"] = 30;\nages.insert({"Charlie", 35});\n\n// Access\ncout &lt;&lt; ages["Alice"];  // 25\n\n// Check existence\nif (ages.count("Bob")) { /* exists */ }\nif (ages.find("Bob") != ages.end()) { /* exists */ }</div><div class="learn-warn"><b>Warning:</b> Using <code>map[key]</code> to check existence actually <b>inserts</b> the key with a default value if it doesn\'t exist! Use <code>count()</code> or <code>find()</code> to check without inserting.</div></div><div class="learn-section"><div class="learn-h">std::unordered_map — Hash Map</div><p class="learn-p">An <code>unordered_map</code> uses a <b>hash table</b> for <b>average</b> <span class="learn-complexity">O(1)</span> operations. It does not maintain any order. Worst case is <span class="learn-complexity">O(n)</span> due to hash collisions.</p><div class="learn-code">#include &lt;unordered_map&gt;\nunordered_map&lt;string, int&gt; freq;\nfreq["apple"]++;\nfreq["banana"] += 3;\n\nfor (auto&amp; [key, val] : freq) {\n    cout &lt;&lt; key &lt;&lt; ": " &lt;&lt; val &lt;&lt; endl;\n}</div><table class="learn-table"><tr><th>Feature</th><th>map</th><th>unordered_map</th></tr><tr><td>Order</td><td>Sorted by key</td><td>No order</td></tr><tr><td>Implementation</td><td>Red-Black Tree</td><td>Hash Table</td></tr><tr><td>Insert/Find</td><td><span class="learn-complexity">O(log n)</span></td><td>Avg <span class="learn-complexity">O(1)</span>, Worst <span class="learn-complexity">O(n)</span></td></tr><tr><td>Custom key</td><td>Needs operator&lt;</td><td>Needs hash function</td></tr></table></div><div class="learn-section"><div class="learn-h">std::set &amp; std::unordered_set</div><p class="learn-p"><code>set</code> stores <b>unique elements</b> in sorted order (Red-Black Tree). <code>unordered_set</code> stores unique elements with no order (Hash Table).</p><div class="learn-code">set&lt;int&gt; s = {3, 1, 4, 1, 5}; // {1, 3, 4, 5} - sorted, no duplicates\ns.insert(2);    // {1, 2, 3, 4, 5}\ns.erase(3);     // {1, 2, 4, 5}\ns.count(4);     // 1 (exists)\n\nunordered_set&lt;int&gt; us = {3, 1, 4};\nus.insert(2);   // O(1) average</div></div><div class="learn-section"><div class="learn-h">std::multiset &amp; std::multimap</div><p class="learn-p"><code>multiset</code> allows duplicate elements. <code>multimap</code> allows duplicate keys. Both maintain sorted order.</p><div class="learn-code">multiset&lt;int&gt; ms = {3, 1, 4, 1, 5, 1};\ncout &lt;&lt; ms.count(1); // 3\nms.erase(ms.find(1)); // removes ONE occurrence of 1\nms.erase(1);           // removes ALL occurrences of 1</div><div class="learn-warn"><b>Warning:</b> <code>multiset::erase(value)</code> removes ALL occurrences. To remove just one, use <code>erase(find(value))</code>.</div></div><div class="learn-section"><div class="learn-h">Practical Patterns</div><p class="learn-p">Common interview patterns with maps and sets:</p><ul class="learn-list"><li><b>Frequency counting:</b> <code>unordered_map&lt;int, int&gt; freq; for(int x : arr) freq[x]++;</code></li><li><b>Two Sum with map:</b> Store complements while iterating</li><li><b>Sliding window with map:</b> Track character frequencies</li><li><b>Ordered statistics:</b> Use <code>set</code> with <code>lower_bound</code>/<code>upper_bound</code></li></ul><div class="learn-tip"><b>Tip:</b> Use <code>unordered_map</code> by default for speed. Switch to <code>map</code> only when you need sorted order or when hash collisions cause TLE (rare but possible in competitive programming).</div></div>',
          code: `#include <iostream>
#include <map>
#include <unordered_map>
#include <set>
#include <unordered_set>
#include <vector>
using namespace std;

int main() {
    // ---- map (ordered) ----
    map<string, int> scores;
    scores["Alice"] = 95;
    scores["Bob"] = 87;
    scores["Charlie"] = 92;
    // Iterates in sorted order by key
    for (auto& [name, score] : scores) {
        cout << name << ": " << score << endl;
    }

    // ---- unordered_map (hash map) ----
    // Frequency counting pattern
    vector<int> nums = {1, 2, 3, 2, 1, 3, 3, 4};
    unordered_map<int, int> freq;
    for (int x : nums) freq[x]++;
    for (auto& [num, count] : freq) {
        cout << num << " appears " << count << " times" << endl;
    }

    // ---- Check existence safely ----
    if (scores.count("Alice")) cout << "Alice found" << endl;
    auto it = scores.find("Dave");
    if (it == scores.end()) cout << "Dave not found" << endl;

    // ---- set (ordered, unique) ----
    set<int> s = {5, 3, 8, 1, 3, 5};  // {1, 3, 5, 8}
    s.insert(4);    // {1, 3, 4, 5, 8}
    s.erase(3);     // {1, 4, 5, 8}

    // lower_bound and upper_bound
    auto lb = s.lower_bound(4); // points to 4 (first >= 4)
    auto ub = s.upper_bound(4); // points to 5 (first > 4)

    // ---- unordered_set ----
    unordered_set<string> words = {"hello", "world"};
    words.insert("hello"); // no duplicate
    cout << "Size: " << words.size() << endl; // 2

    // ---- multiset (allows duplicates) ----
    multiset<int> ms = {3, 1, 4, 1, 5, 1};
    cout << "Count of 1: " << ms.count(1) << endl; // 3
    ms.erase(ms.find(1)); // remove ONE occurrence
    cout << "Count of 1: " << ms.count(1) << endl; // 2

    // ---- Practical: Two Sum using map ----
    vector<int> arr = {2, 7, 11, 15};
    int target = 9;
    unordered_map<int, int> seen;
    for (int i = 0; i < arr.size(); i++) {
        int complement = target - arr[i];
        if (seen.count(complement)) {
            cout << "Pair: [" << seen[complement] << "," << i << "]" << endl;
        }
        seen[arr[i]] = i;
    }

    return 0;
}`,
          problems: [
            ['Two Sum', 'https://leetcode.com/problems/two-sum/', 'Easy'],
            ['Group Anagrams', 'https://leetcode.com/problems/group-anagrams/', 'Medium'],
            ['Top K Frequent Elements', 'https://leetcode.com/problems/top-k-frequent-elements/', 'Medium'],
            ['Longest Consecutive Sequence', 'https://leetcode.com/problems/longest-consecutive-sequence/', 'Medium'],
            ['Contains Duplicate II', 'https://leetcode.com/problems/contains-duplicate-ii/', 'Easy']
          ],
          mcqs: [
            {q: 'What is the average time complexity of find() in unordered_map?', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'], a: 2},
            {q: 'What happens when you access a non-existent key with map[key]?', o: ['Returns -1', 'Throws an exception', 'Inserts the key with default value', 'Returns the last element'], a: 2},
            {q: 'How does multiset::erase(value) differ from multiset::erase(iterator)?', o: ['No difference', 'erase(value) removes ALL occurrences; erase(iterator) removes ONE', 'erase(value) removes ONE; erase(iterator) removes ALL', 'erase(value) is O(1); erase(iterator) is O(n)'], a: 1}
          ]
        },
        {
          t: 'Strings & String Operations',
          learn: '<div class="learn-section"><div class="learn-h">std::string Basics</div><p class="learn-p">The <code>std::string</code> class in C++ provides a dynamic, safe alternative to C-style character arrays. It handles memory management automatically and provides a rich set of operations.</p><div class="learn-code">#include &lt;string&gt;\nstring s1 = "Hello";\nstring s2("World");\nstring s3(5, \'a\');    // "aaaaa"\nstring s4 = s1 + " " + s2;  // "Hello World"</div><p class="learn-p">Strings are stored as contiguous arrays of characters with a null terminator. The <code>size()</code> and <code>length()</code> methods return the number of characters (not including the null terminator).</p></div><div class="learn-section"><div class="learn-h">Common String Operations</div><table class="learn-table"><tr><th>Operation</th><th>Syntax</th><th>Complexity</th></tr><tr><td>Length</td><td>s.size() or s.length()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Access char</td><td>s[i] or s.at(i)</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Concatenate</td><td>s1 + s2 or s1.append(s2)</td><td><span class="learn-complexity">O(n+m)</span></td></tr><tr><td>Substring</td><td>s.substr(pos, len)</td><td><span class="learn-complexity">O(len)</span></td></tr><tr><td>Find</td><td>s.find("pattern")</td><td><span class="learn-complexity">O(n*m)</span></td></tr><tr><td>Compare</td><td>s1 == s2, s1 &lt; s2</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Insert</td><td>s.insert(pos, str)</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Erase</td><td>s.erase(pos, len)</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Replace</td><td>s.replace(pos, len, str)</td><td><span class="learn-complexity">O(n)</span></td></tr></table></div><div class="learn-section"><div class="learn-h">String Conversion &amp; Parsing</div><p class="learn-p">C++11 provides convenient conversion functions:</p><div class="learn-code">// Number to string\nstring s = to_string(42);      // "42"\nstring d = to_string(3.14);    // "3.140000"\n\n// String to number\nint n = stoi("42");            // 42\nlong l = stol("1234567890");   // 1234567890\ndouble f = stod("3.14");       // 3.14</div><p class="learn-p">For more complex parsing, use <code>stringstream</code>:</p><div class="learn-code">#include &lt;sstream&gt;\nstring line = "hello world 42";\nstringstream ss(line);\nstring word;\nwhile (ss &gt;&gt; word) {\n    cout &lt;&lt; word &lt;&lt; endl;  // tokenize by spaces\n}</div></div><div class="learn-section"><div class="learn-h">Character Operations</div><p class="learn-p">The <code>&lt;cctype&gt;</code> header provides character classification functions:</p><ul class="learn-list"><li><code>isalpha(c)</code> — is c a letter?</li><li><code>isdigit(c)</code> — is c a digit?</li><li><code>isalnum(c)</code> — letter or digit?</li><li><code>isupper(c)</code> / <code>islower(c)</code> — case check</li><li><code>toupper(c)</code> / <code>tolower(c)</code> — case conversion</li></ul><div class="learn-code">char c = \'a\';\ncout &lt;&lt; (char)toupper(c);  // \'A\'\n\n// Convert entire string to lowercase\nstring s = "Hello World";\nfor (char&amp; ch : s) ch = tolower(ch);\n// or: transform(s.begin(), s.end(), s.begin(), ::tolower);</div></div><div class="learn-section"><div class="learn-h">String Tricks for Interviews</div><ul class="learn-list"><li><b>Reverse a string:</b> <code>reverse(s.begin(), s.end())</code></li><li><b>Check palindrome:</b> <code>string rev = s; reverse(rev.begin(), rev.end()); return s == rev;</code></li><li><b>Sort characters:</b> <code>sort(s.begin(), s.end())</code></li><li><b>Count character:</b> <code>count(s.begin(), s.end(), \'a\')</code></li></ul><div class="learn-tip"><b>Tip:</b> When building strings character by character, use <code>+=</code> instead of <code>+</code>. The <code>s += c</code> appends in-place (amortized O(1)), while <code>s = s + c</code> creates a new string each time (O(n)).</div><div class="learn-warn"><b>Warning:</b> <code>s.find()</code> returns <code>string::npos</code> (a large number) when not found, not -1. Always compare with <code>string::npos</code>.</div></div>',
          code: `#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
#include <cctype>
using namespace std;

int main() {
    // ---- Initialization ----
    string s1 = "Hello";
    string s2 = "World";
    string s3 = s1 + " " + s2;  // "Hello World"

    // ---- Basic Operations ----
    cout << "Length: " << s3.length() << endl;    // 11
    cout << "Char at 4: " << s3[4] << endl;      // 'o'
    cout << "Substr: " << s3.substr(6, 5) << endl; // "World"

    // ---- Find and Replace ----
    size_t pos = s3.find("World");
    if (pos != string::npos) {
        cout << "Found at: " << pos << endl;  // 6
        s3.replace(pos, 5, "C++");  // "Hello C++"
    }

    // ---- Conversions ----
    int num = 42;
    string numStr = to_string(num);   // "42"
    int back = stoi(numStr);          // 42

    // ---- Reverse a string ----
    string rev = "abcdef";
    reverse(rev.begin(), rev.end());  // "fedcba"

    // ---- Check Palindrome ----
    string word = "racecar";
    string temp = word;
    reverse(temp.begin(), temp.end());
    cout << word << " is palindrome: " << (word == temp) << endl;

    // ---- Character operations ----
    string mixed = "Hello World 123";
    int letters = 0, digits = 0, spaces = 0;
    for (char c : mixed) {
        if (isalpha(c)) letters++;
        else if (isdigit(c)) digits++;
        else if (c == ' ') spaces++;
    }
    cout << "Letters: " << letters << " Digits: " << digits << endl;

    // ---- Tokenize with stringstream ----
    string csv = "apple,banana,cherry";
    stringstream ss(csv);
    string token;
    while (getline(ss, token, ',')) {
        cout << token << endl;
    }

    // ---- Sort characters ----
    string sortMe = "dcba";
    sort(sortMe.begin(), sortMe.end());  // "abcd"

    // ---- To lowercase ----
    string upper = "HELLO";
    for (char& c : upper) c = tolower(c);  // "hello"

    // ---- Build string efficiently ----
    string result;
    result.reserve(100);  // pre-allocate
    for (int i = 0; i < 10; i++) {
        result += to_string(i);  // efficient append
    }

    return 0;
}`,
          problems: [
            ['Valid Anagram', 'https://leetcode.com/problems/valid-anagram/', 'Easy'],
            ['Longest Common Prefix', 'https://leetcode.com/problems/longest-common-prefix/', 'Easy'],
            ['String to Integer (atoi)', 'https://leetcode.com/problems/string-to-integer-atoi/', 'Medium'],
            ['Longest Palindromic Substring', 'https://leetcode.com/problems/longest-palindromic-substring/', 'Medium']
          ],
          mcqs: [
            {q: 'What does s.find("xyz") return if "xyz" is not found in the string?', o: ['-1', '0', 'string::npos', 'Throws an exception'], a: 2},
            {q: 'Why is s += c preferred over s = s + c in a loop?', o: ['No difference', 's += c is amortized O(1) while s = s + c is O(n) creating a new string', 's += c uses less memory', 's = s + c is faster'], a: 1},
            {q: 'What is the time complexity of s.substr(pos, len)?', o: ['O(1)', 'O(len)', 'O(n)', 'O(n * len)'], a: 1}
          ]
        },
        {
          t: 'STL Algorithms & Iterators',
          learn: '<div class="learn-section"><div class="learn-h">What are Iterators?</div><p class="learn-p"><b>Iterators</b> are objects that provide a way to access elements of a container sequentially without exposing its underlying structure. They act as a generalized pointer, bridging algorithms and containers.</p><div class="learn-code">vector&lt;int&gt; v = {10, 20, 30, 40};\nvector&lt;int&gt;::iterator it = v.begin();\ncout &lt;&lt; *it;       // 10\nit++;\ncout &lt;&lt; *it;       // 20\n\n// Modern C++ with auto\nfor (auto it = v.begin(); it != v.end(); it++) {\n    cout &lt;&lt; *it &lt;&lt; " ";\n}</div></div><div class="learn-section"><div class="learn-h">Iterator Types</div><table class="learn-table"><tr><th>Iterator Type</th><th>Capabilities</th><th>Containers</th></tr><tr><td>Input Iterator</td><td>Read forward only, single pass</td><td>istream_iterator</td></tr><tr><td>Output Iterator</td><td>Write forward only, single pass</td><td>ostream_iterator</td></tr><tr><td>Forward Iterator</td><td>Read/write forward, multi-pass</td><td>forward_list, unordered_set</td></tr><tr><td>Bidirectional Iterator</td><td>Forward + backward</td><td>list, set, map</td></tr><tr><td>Random Access Iterator</td><td>Full pointer arithmetic</td><td>vector, deque, array</td></tr></table><p class="learn-p">Most STL algorithms require specific iterator types. <code>sort()</code> needs random access iterators, so it works on vectors but not on lists.</p></div><div class="learn-section"><div class="learn-h">Essential STL Algorithms</div><p class="learn-p">The <code>&lt;algorithm&gt;</code> header provides powerful generic algorithms. Here are the most important ones:</p><p class="learn-p"><b>Sorting:</b></p><div class="learn-code">sort(v.begin(), v.end());                    // ascending\nsort(v.begin(), v.end(), greater&lt;int&gt;());    // descending\nstable_sort(v.begin(), v.end());             // preserves relative order of equals\npartial_sort(v.begin(), v.begin()+3, v.end()); // only sort first 3</div><p class="learn-p"><b>Searching:</b></p><div class="learn-code">// Binary search (requires sorted range)\nbool found = binary_search(v.begin(), v.end(), 42);\nauto lb = lower_bound(v.begin(), v.end(), 42); // first &gt;= 42\nauto ub = upper_bound(v.begin(), v.end(), 42); // first &gt; 42</div><p class="learn-p"><b>Min/Max:</b></p><div class="learn-code">auto mx = *max_element(v.begin(), v.end());\nauto mn = *min_element(v.begin(), v.end());\nauto [lo, hi] = minmax_element(v.begin(), v.end()); // C++17</div></div><div class="learn-section"><div class="learn-h">Modifying Algorithms</div><div class="learn-code">// Fill, generate\nfill(v.begin(), v.end(), 0);     // set all to 0\niota(v.begin(), v.end(), 1);     // 1, 2, 3, ..., n\n\n// Transform\ntransform(v.begin(), v.end(), v.begin(), [](int x){ return x*2; });\n\n// Remove (erase-remove idiom)\nv.erase(remove(v.begin(), v.end(), 0), v.end()); // remove all 0s\n\n// Unique (remove consecutive duplicates)\nsort(v.begin(), v.end());\nv.erase(unique(v.begin(), v.end()), v.end());\n\n// Reverse, rotate\nreverse(v.begin(), v.end());\nrotate(v.begin(), v.begin()+2, v.end()); // left rotate by 2</div></div><div class="learn-section"><div class="learn-h">Lambda Functions</div><p class="learn-p">Lambdas are anonymous functions commonly used with STL algorithms:</p><div class="learn-code">// Sort by absolute value\nsort(v.begin(), v.end(), [](int a, int b) {\n    return abs(a) &lt; abs(b);\n});\n\n// Count elements &gt; 10\nint cnt = count_if(v.begin(), v.end(), [](int x) { return x &gt; 10; });\n\n// Custom comparator for pairs\nvector&lt;pair&lt;int,int&gt;&gt; p;\nsort(p.begin(), p.end(), [](auto&amp; a, auto&amp; b) {\n    return a.second &lt; b.second;  // sort by second element\n});</div><div class="learn-tip"><b>Tip:</b> <code>lower_bound</code> and <code>upper_bound</code> are your best friends for binary search on sorted containers. <code>lower_bound</code> returns the first position where you can insert value without breaking sorted order.</div></div><div class="learn-section"><div class="learn-h">Numeric Algorithms</div><p class="learn-p">The <code>&lt;numeric&gt;</code> header provides:</p><div class="learn-code">#include &lt;numeric&gt;\nint sum = accumulate(v.begin(), v.end(), 0);\nint product = accumulate(v.begin(), v.end(), 1, multiplies&lt;int&gt;());\n\n// Prefix sums\nvector&lt;int&gt; prefix(v.size());\npartial_sum(v.begin(), v.end(), prefix.begin());\n\n// GCD and LCM (C++17)\nint g = gcd(12, 8);   // 4\nint l = lcm(12, 8);   // 24</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {5, 2, 8, 1, 9, 3, 7, 4, 6};

    // ---- Sorting ----
    sort(v.begin(), v.end());  // {1,2,3,4,5,6,7,8,9}

    // ---- Binary Search (on sorted range) ----
    bool found = binary_search(v.begin(), v.end(), 5); // true
    auto lb = lower_bound(v.begin(), v.end(), 5);  // iterator to 5
    auto ub = upper_bound(v.begin(), v.end(), 5);  // iterator to 6
    cout << "Index of 5: " << (lb - v.begin()) << endl; // 4

    // ---- Min/Max ----
    cout << "Max: " << *max_element(v.begin(), v.end()) << endl; // 9
    cout << "Min: " << *min_element(v.begin(), v.end()) << endl; // 1

    // ---- Accumulate ----
    int sum = accumulate(v.begin(), v.end(), 0);  // 45
    cout << "Sum: " << sum << endl;

    // ---- Count / Count_if ----
    int cnt = count(v.begin(), v.end(), 5);  // 1
    int gt5 = count_if(v.begin(), v.end(), [](int x) { return x > 5; }); // 4

    // ---- Transform (double each element) ----
    vector<int> doubled(v.size());
    transform(v.begin(), v.end(), doubled.begin(), [](int x) { return x * 2; });

    // ---- Reverse ----
    reverse(v.begin(), v.end());  // {9,8,7,6,5,4,3,2,1}

    // ---- Custom Sort with Lambda ----
    vector<pair<string, int>> students = {
        {"Alice", 90}, {"Bob", 85}, {"Charlie", 92}
    };
    sort(students.begin(), students.end(),
         [](auto& a, auto& b) { return a.second > b.second; });
    // sorted by score descending

    // ---- Erase-Remove Idiom ----
    vector<int> nums = {1, 0, 2, 0, 3, 0, 4};
    nums.erase(remove(nums.begin(), nums.end(), 0), nums.end());
    // nums = {1, 2, 3, 4}

    // ---- next_permutation ----
    vector<int> perm = {1, 2, 3};
    do {
        for (int x : perm) cout << x << " ";
        cout << endl;
    } while (next_permutation(perm.begin(), perm.end()));

    // ---- Prefix sums ----
    vector<int> arr = {1, 2, 3, 4, 5};
    vector<int> prefix(arr.size());
    partial_sum(arr.begin(), arr.end(), prefix.begin());
    // prefix = {1, 3, 6, 10, 15}

    return 0;
}`,
          problems: [
            ['Merge Sorted Array', 'https://leetcode.com/problems/merge-sorted-array/', 'Easy'],
            ['Sort Colors', 'https://leetcode.com/problems/sort-colors/', 'Medium'],
            ['Kth Largest Element in an Array', 'https://leetcode.com/problems/kth-largest-element-in-an-array/', 'Medium'],
            ['Next Permutation', 'https://leetcode.com/problems/next-permutation/', 'Medium']
          ],
          mcqs: [
            {q: 'What type of iterator does sort() require?', o: ['Input iterator', 'Forward iterator', 'Bidirectional iterator', 'Random access iterator'], a: 3},
            {q: 'What does lower_bound return for a sorted array {1,3,5,7,9} when searching for 4?', o: ['Iterator to 3', 'Iterator to 5 (first element >= 4)', 'Iterator to end()', 'nullptr'], a: 1},
            {q: 'What is the erase-remove idiom used for?', o: ['Sorting elements', 'Efficiently removing elements matching a condition from a vector', 'Finding elements in a map', 'Reversing a container'], a: 1}
          ]
        },
        {
          t: 'Pairs, Tuples & Priority Queue',
          learn: '<div class="learn-section"><div class="learn-h">std::pair</div><p class="learn-p">A <code>pair</code> combines two values of potentially different types into a single object. Pairs are extremely common in competitive programming and interviews.</p><div class="learn-code">#include &lt;utility&gt;\npair&lt;int, string&gt; p = {1, "hello"};\ncout &lt;&lt; p.first;   // 1\ncout &lt;&lt; p.second;  // "hello"\n\n// make_pair\nauto p2 = make_pair(3.14, 42);\n\n// Structured bindings (C++17)\nauto [x, y] = make_pair(10, 20);</div><p class="learn-p">Pairs support comparison operators. They compare by <code>first</code> element first, then by <code>second</code> if the first elements are equal. This makes them natural for sorting by multiple criteria.</p><div class="learn-code">vector&lt;pair&lt;int,int&gt;&gt; v = {{3,1}, {1,5}, {3,2}, {1,3}};\nsort(v.begin(), v.end());\n// Result: {1,3}, {1,5}, {3,1}, {3,2}</div></div><div class="learn-section"><div class="learn-h">std::tuple</div><p class="learn-p">A <code>tuple</code> is a generalization of pair that can hold any number of elements:</p><div class="learn-code">#include &lt;tuple&gt;\ntuple&lt;int, string, double&gt; t = {1, "hello", 3.14};\ncout &lt;&lt; get&lt;0&gt;(t);  // 1\ncout &lt;&lt; get&lt;1&gt;(t);  // "hello"\n\n// Structured bindings (C++17)\nauto [id, name, score] = t;\n\n// tie for unpacking\nint a; string b; double c;\ntie(a, b, c) = t;</div><div class="learn-tip"><b>Tip:</b> In competitive programming, use pairs for 2 values and tuples for 3+. Structured bindings (C++17) make both much cleaner to use.</div></div><div class="learn-section"><div class="learn-h">std::priority_queue</div><p class="learn-p">A <code>priority_queue</code> is a container adapter that provides <span class="learn-complexity">O(log n)</span> insertion and <span class="learn-complexity">O(1)</span> access to the maximum element (by default, it\'s a <b>max-heap</b>).</p><div class="learn-code">#include &lt;queue&gt;\n// Max-heap (default)\npriority_queue&lt;int&gt; maxPQ;\nmaxPQ.push(3);\nmaxPQ.push(1);\nmaxPQ.push(4);\ncout &lt;&lt; maxPQ.top();  // 4 (maximum)\nmaxPQ.pop();           // removes 4\n\n// Min-heap\npriority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minPQ;\nminPQ.push(3);\nminPQ.push(1);\nminPQ.push(4);\ncout &lt;&lt; minPQ.top();  // 1 (minimum)</div><table class="learn-table"><tr><th>Operation</th><th>Complexity</th></tr><tr><td>push(x)</td><td><span class="learn-complexity">O(log n)</span></td></tr><tr><td>pop()</td><td><span class="learn-complexity">O(log n)</span></td></tr><tr><td>top()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>empty()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>size()</td><td><span class="learn-complexity">O(1)</span></td></tr></table></div><div class="learn-section"><div class="learn-h">Custom Comparator for Priority Queue</div><p class="learn-p">For custom types or custom ordering, define a comparator:</p><div class="learn-code">// Min-heap of pairs by second element\nauto cmp = [](pair&lt;int,int&gt;&amp; a, pair&lt;int,int&gt;&amp; b) {\n    return a.second &gt; b.second;  // &gt; for min-heap\n};\npriority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, decltype(cmp)&gt; pq(cmp);</div><div class="learn-warn"><b>Warning:</b> The comparator for priority_queue is <b>reversed</b> compared to sort. For min-heap, use <code>&gt;</code> (greater than), not <code>&lt;</code>. This is because priority_queue puts the element that compares as \"less\" at the bottom.</div></div><div class="learn-section"><div class="learn-h">Common Use Cases</div><ul class="learn-list"><li><b>Top-K problems:</b> Use a min-heap of size K to find the K largest elements</li><li><b>Dijkstra\'s algorithm:</b> Min-heap of {distance, node} pairs</li><li><b>Merge K sorted lists:</b> Min-heap of elements from each list</li><li><b>Event scheduling:</b> Process events in order of time using a priority queue</li></ul><div class="learn-tip"><b>Tip:</b> For Dijkstra\'s, use <code>priority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, greater&lt;pair&lt;int,int&gt;&gt;&gt;</code> for a min-heap sorted by distance (first element of pair).</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
#include <tuple>
#include <algorithm>
using namespace std;

int main() {
    // ---- Pairs ----
    pair<int, string> p = {1, "hello"};
    cout << p.first << " " << p.second << endl;

    // Sorting pairs
    vector<pair<int, int>> intervals = {{3,5}, {1,3}, {2,7}, {1,2}};
    sort(intervals.begin(), intervals.end());
    // Sorted: {1,2}, {1,3}, {2,7}, {3,5}

    // ---- Tuples ----
    tuple<int, string, double> t = {1, "Alice", 95.5};
    cout << get<0>(t) << " " << get<1>(t) << " " << get<2>(t) << endl;

    // Structured bindings (C++17)
    auto [id, name, score] = t;
    cout << name << ": " << score << endl;

    // ---- Max-Heap (default priority_queue) ----
    priority_queue<int> maxPQ;
    maxPQ.push(10);
    maxPQ.push(30);
    maxPQ.push(20);
    cout << "Max: " << maxPQ.top() << endl;  // 30
    maxPQ.pop();
    cout << "Next: " << maxPQ.top() << endl; // 20

    // ---- Min-Heap ----
    priority_queue<int, vector<int>, greater<int>> minPQ;
    minPQ.push(10);
    minPQ.push(30);
    minPQ.push(20);
    cout << "Min: " << minPQ.top() << endl;  // 10

    // ---- Min-Heap with pairs (Dijkstra style) ----
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> dijkPQ;
    dijkPQ.push({5, 0});   // {distance, node}
    dijkPQ.push({1, 2});
    dijkPQ.push({3, 1});
    while (!dijkPQ.empty()) {
        auto [dist, node] = dijkPQ.top();
        dijkPQ.pop();
        cout << "Node " << node << " at distance " << dist << endl;
    }

    // ---- Top-K pattern ----
    vector<int> nums = {3, 1, 4, 1, 5, 9, 2, 6, 5};
    int k = 3;
    // Find k largest using min-heap of size k
    priority_queue<int, vector<int>, greater<int>> topK;
    for (int x : nums) {
        topK.push(x);
        if ((int)topK.size() > k) topK.pop();
    }
    // topK contains the 3 largest: 5, 6, 9
    cout << "Top " << k << ": ";
    while (!topK.empty()) {
        cout << topK.top() << " ";
        topK.pop();
    }
    cout << endl;

    return 0;
}`,
          problems: [
            ['Kth Largest Element in a Stream', 'https://leetcode.com/problems/kth-largest-element-in-a-stream/', 'Easy'],
            ['Top K Frequent Elements', 'https://leetcode.com/problems/top-k-frequent-elements/', 'Medium'],
            ['Merge K Sorted Lists', 'https://leetcode.com/problems/merge-k-sorted-lists/', 'Hard'],
            ['Find Median from Data Stream', 'https://leetcode.com/problems/find-median-from-data-stream/', 'Hard'],
            ['Last Stone Weight', 'https://leetcode.com/problems/last-stone-weight/', 'Easy']
          ],
          mcqs: [
            {q: 'What is the default behavior of priority_queue in C++?', o: ['Min-heap', 'Max-heap', 'FIFO queue', 'Stack'], a: 1},
            {q: 'How do you create a min-heap priority_queue for integers?', o: ['priority_queue<int, min>', 'priority_queue<int, vector<int>, less<int>>', 'priority_queue<int, vector<int>, greater<int>>', 'min_priority_queue<int>'], a: 2},
            {q: 'How are pairs compared by default in C++?', o: ['Only by first element', 'Only by second element', 'By first element, then by second if firsts are equal', 'By the sum of both elements'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'oop', t: 'OOP',
      topics: [
        {
          t: 'Classes, Objects & Constructors',
          learn: '<div class="learn-section"><div class="learn-h">What is a Class?</div><p class="learn-p">A <b>class</b> is a user-defined data type that bundles data (member variables) and functions (member methods) together. Think of a class as a <b>blueprint</b> — just as an architectural blueprint defines how to build a house, a class defines how to create objects.</p><div class="learn-code">class Student {\npublic:\n    string name;\n    int age;\n    double gpa;\n\n    void display() {\n        cout &lt;&lt; name &lt;&lt; " (Age: " &lt;&lt; age &lt;&lt; ", GPA: " &lt;&lt; gpa &lt;&lt; ")" &lt;&lt; endl;\n    }\n};</div></div><div class="learn-section"><div class="learn-h">Objects</div><p class="learn-p">An <b>object</b> is an instance of a class. You can create multiple objects from the same class, each with its own data:</p><div class="learn-code">Student s1;\ns1.name = "Alice";\ns1.age = 20;\ns1.gpa = 3.8;\ns1.display();  // Alice (Age: 20, GPA: 3.8)\n\nStudent s2 = {"Bob", 21, 3.5};  // aggregate initialization (if no user constructors)</div></div><div class="learn-section"><div class="learn-h">Access Specifiers</div><p class="learn-p">C++ provides three access levels:</p><table class="learn-table"><tr><th>Specifier</th><th>Access</th></tr><tr><td><code>public</code></td><td>Accessible from anywhere</td></tr><tr><td><code>private</code></td><td>Accessible only within the class</td></tr><tr><td><code>protected</code></td><td>Accessible in the class and its derived classes</td></tr></table><p class="learn-p">By default, members of a class are <code>private</code>. In a <code>struct</code>, they are <code>public</code> by default. This is the <b>only</b> difference between struct and class in C++.</p></div><div class="learn-section"><div class="learn-h">Constructors</div><p class="learn-p">A <b>constructor</b> is a special method that is called automatically when an object is created. It has the same name as the class and no return type.</p><p class="learn-p"><b>1. Default Constructor:</b></p><div class="learn-code">class Point {\npublic:\n    int x, y;\n    Point() : x(0), y(0) {}  // default constructor\n};</div><p class="learn-p"><b>2. Parameterized Constructor:</b></p><div class="learn-code">class Point {\npublic:\n    int x, y;\n    Point(int x, int y) : x(x), y(y) {}  // parameterized\n};\nPoint p(3, 4);  // x=3, y=4</div><p class="learn-p"><b>3. Copy Constructor:</b> Creates an object by copying another object of the same type.</p><div class="learn-code">class Point {\npublic:\n    int x, y;\n    Point(const Point&amp; other) : x(other.x), y(other.y) {\n        cout &lt;&lt; "Copy constructor called" &lt;&lt; endl;\n    }\n};\nPoint p1(3, 4);\nPoint p2 = p1;  // copy constructor called\nPoint p3(p1);   // also copy constructor</div></div><div class="learn-section"><div class="learn-h">Initializer Lists</div><p class="learn-p">The <b>member initializer list</b> initializes members directly rather than assigning them in the constructor body. This is more efficient and required for const members, reference members, and base classes.</p><div class="learn-code">class Student {\n    const int id;\n    string name;\npublic:\n    // Must use initializer list for const member\n    Student(int id, string name) : id(id), name(name) {}\n};</div><div class="learn-tip"><b>Tip:</b> Always use initializer lists for better performance. They initialize members directly, while assignment in the body first default-constructs then assigns.</div></div><div class="learn-section"><div class="learn-h">Destructor</div><p class="learn-p">A <b>destructor</b> is called automatically when an object goes out of scope or is explicitly deleted. It\'s used to release resources (memory, file handles, etc.).</p><div class="learn-code">class FileHandler {\n    FILE* fp;\npublic:\n    FileHandler(const char* filename) {\n        fp = fopen(filename, "r");\n    }\n    ~FileHandler() {  // destructor\n        if (fp) fclose(fp);\n        cout &lt;&lt; "File closed" &lt;&lt; endl;\n    }\n};</div></div><div class="learn-section"><div class="learn-h">Rule of Three / Rule of Five</div><p class="learn-p">If your class manages resources (dynamic memory, file handles), you likely need to define:</p><p class="learn-p"><b>Rule of Three:</b> Destructor, Copy Constructor, Copy Assignment Operator</p><p class="learn-p"><b>Rule of Five (C++11):</b> Add Move Constructor and Move Assignment Operator</p><div class="learn-warn"><b>Warning:</b> If you define any of these special functions, you likely need all of them. Failing to follow the Rule of Three/Five leads to double-free bugs, memory leaks, or dangling pointers.</div></div>',
          code: `#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int age;
    double gpa;

public:
    // Default constructor
    Student() : name("Unknown"), age(0), gpa(0.0) {
        cout << "Default constructor called" << endl;
    }

    // Parameterized constructor
    Student(string name, int age, double gpa)
        : name(name), age(age), gpa(gpa) {
        cout << "Parameterized constructor called" << endl;
    }

    // Copy constructor
    Student(const Student& other)
        : name(other.name), age(other.age), gpa(other.gpa) {
        cout << "Copy constructor called" << endl;
    }

    // Copy assignment operator
    Student& operator=(const Student& other) {
        if (this != &other) {
            name = other.name;
            age = other.age;
            gpa = other.gpa;
        }
        cout << "Copy assignment called" << endl;
        return *this;
    }

    // Destructor
    ~Student() {
        cout << "Destructor called for " << name << endl;
    }

    // Getters
    string getName() const { return name; }
    int getAge() const { return age; }
    double getGpa() const { return gpa; }

    // Setters
    void setGpa(double g) {
        if (g >= 0.0 && g <= 4.0) gpa = g;
    }

    // Display
    void display() const {
        cout << name << " (Age: " << age
             << ", GPA: " << gpa << ")" << endl;
    }
};

int main() {
    Student s1;                           // default constructor
    Student s2("Alice", 20, 3.8);        // parameterized
    Student s3 = s2;                     // copy constructor
    Student s4("Bob", 21, 3.5);
    s1 = s4;                             // copy assignment

    s2.display();  // Alice (Age: 20, GPA: 3.8)
    s3.display();  // Alice (Age: 20, GPA: 3.8)

    s2.setGpa(3.9);
    s2.display();  // Alice (Age: 20, GPA: 3.9)

    return 0;
    // Destructors called in reverse order
}`,
          problems: [
            ['Design Linked List', 'https://leetcode.com/problems/design-linked-list/', 'Medium'],
            ['Min Stack', 'https://leetcode.com/problems/min-stack/', 'Medium'],
            ['Implement Queue using Stacks', 'https://leetcode.com/problems/implement-queue-using-stacks/', 'Easy'],
            ['Design HashMap', 'https://leetcode.com/problems/design-hashmap/', 'Easy']
          ],
          mcqs: [
            {q: 'What is the only difference between struct and class in C++?', o: ['struct cannot have methods', 'class cannot be inherited', 'Default access specifier: struct is public, class is private', 'struct is always on stack, class is on heap'], a: 2},
            {q: 'When is the copy constructor called?', o: ['When assigning to an existing object', 'When initializing a new object from an existing one', 'When an object is deleted', 'When a function returns'], a: 1},
            {q: 'Why should you use member initializer lists?', o: ['They are required by the C++ standard', 'They initialize members directly, avoiding default construction then assignment', 'They make code shorter', 'They are faster at runtime only'], a: 1}
          ]
        },
        {
          t: 'Inheritance & Polymorphism',
          learn: '<div class="learn-section"><div class="learn-h">Inheritance Basics</div><p class="learn-p"><b>Inheritance</b> allows a class (derived/child) to inherit properties and behaviors from another class (base/parent). It promotes code reuse and establishes an "is-a" relationship.</p><div class="learn-code">class Animal {\nprotected:\n    string name;\npublic:\n    Animal(string n) : name(n) {}\n    void eat() { cout &lt;&lt; name &lt;&lt; " is eating" &lt;&lt; endl; }\n};\n\nclass Dog : public Animal {\npublic:\n    Dog(string n) : Animal(n) {}  // call base constructor\n    void bark() { cout &lt;&lt; name &lt;&lt; " barks!" &lt;&lt; endl; }\n};\n\nDog d("Rex");\nd.eat();   // inherited from Animal\nd.bark();  // Dog\'s own method</div></div><div class="learn-section"><div class="learn-h">Types of Inheritance</div><table class="learn-table"><tr><th>Type</th><th>Syntax</th><th>public members become</th><th>protected members become</th></tr><tr><td>public</td><td>class D : public B</td><td>public</td><td>protected</td></tr><tr><td>protected</td><td>class D : protected B</td><td>protected</td><td>protected</td></tr><tr><td>private</td><td>class D : private B</td><td>private</td><td>private</td></tr></table><p class="learn-p"><b>public inheritance</b> is the most common and represents "is-a" relationship. Private members of the base class are never directly accessible in derived classes.</p></div><div class="learn-section"><div class="learn-h">Virtual Functions &amp; Polymorphism</div><p class="learn-p"><b>Polymorphism</b> means "many forms." In C++, <b>runtime polymorphism</b> is achieved through virtual functions. When a base class pointer or reference calls a virtual function, the derived class\'s version is executed.</p><div class="learn-code">class Shape {\npublic:\n    virtual double area() const {\n        return 0;  // base implementation\n    }\n    virtual ~Shape() {}  // virtual destructor!\n};\n\nclass Circle : public Shape {\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double area() const override {\n        return 3.14159 * radius * radius;\n    }\n};\n\nclass Rectangle : public Shape {\n    double w, h;\npublic:\n    Rectangle(double w, double h) : w(w), h(h) {}\n    double area() const override {\n        return w * h;\n    }\n};\n\n// Polymorphism in action\nShape* shapes[] = {new Circle(5), new Rectangle(3, 4)};\nfor (auto s : shapes) {\n    cout &lt;&lt; s-&gt;area() &lt;&lt; endl;  // calls correct version!\n}</div></div><div class="learn-section"><div class="learn-h">Pure Virtual Functions &amp; Abstract Classes</div><p class="learn-p">A <b>pure virtual function</b> has no implementation and forces derived classes to provide one. A class with at least one pure virtual function is an <b>abstract class</b> and cannot be instantiated.</p><div class="learn-code">class Shape {\npublic:\n    virtual double area() const = 0;  // pure virtual\n    virtual ~Shape() {}\n};\n// Shape s;  // ERROR: cannot instantiate abstract class</div><p class="learn-p">Abstract classes define interfaces — they specify what derived classes must implement.</p></div><div class="learn-section"><div class="learn-h">Virtual Destructors</div><p class="learn-p">When deleting a derived object through a base pointer, you <b>must</b> have a virtual destructor in the base class. Otherwise, only the base destructor runs, causing resource leaks.</p><div class="learn-code">class Base {\npublic:\n    virtual ~Base() { cout &lt;&lt; "Base destroyed" &lt;&lt; endl; }\n};\nclass Derived : public Base {\n    int* data;\npublic:\n    Derived() : data(new int[100]) {}\n    ~Derived() { delete[] data; cout &lt;&lt; "Derived destroyed" &lt;&lt; endl; }\n};\n\nBase* ptr = new Derived();\ndelete ptr;  // Both destructors called (correct!)</div><div class="learn-warn"><b>Warning:</b> If a class has virtual functions, always make the destructor virtual. Without it, deleting through a base pointer causes undefined behavior.</div></div><div class="learn-section"><div class="learn-h">Multiple Inheritance &amp; Diamond Problem</div><p class="learn-p">C++ supports <b>multiple inheritance</b>, where a class can inherit from more than one base class. The <b>diamond problem</b> occurs when two base classes inherit from a common ancestor.</p><div class="learn-code">class A { public: int x; };\nclass B : virtual public A {};  // virtual inheritance\nclass C : virtual public A {};  // virtual inheritance\nclass D : public B, public C {};  // only one copy of A::x</div><p class="learn-p">Use <code>virtual</code> inheritance to resolve the diamond problem. Without it, class D would have two copies of A\'s members.</p><div class="learn-tip"><b>Tip:</b> Prefer composition over inheritance when possible. Use inheritance for "is-a" relationships and composition for "has-a" relationships.</div></div>',
          code: `#include <iostream>
#include <string>
#include <vector>
#include <memory>
using namespace std;

// Abstract base class
class Shape {
protected:
    string color;
public:
    Shape(string c = "white") : color(c) {}
    virtual double area() const = 0;    // pure virtual
    virtual string type() const = 0;    // pure virtual
    virtual void display() const {
        cout << type() << " (" << color << "): area = " << area() << endl;
    }
    virtual ~Shape() {}                 // virtual destructor
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r, string c = "red") : Shape(c), radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    string type() const override { return "Circle"; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h, string c = "blue")
        : Shape(c), width(w), height(h) {}
    double area() const override { return width * height; }
    string type() const override { return "Rectangle"; }
};

class Triangle : public Shape {
    double base, height;
public:
    Triangle(double b, double h, string c = "green")
        : Shape(c), base(b), height(h) {}
    double area() const override { return 0.5 * base * height; }
    string type() const override { return "Triangle"; }
};

int main() {
    // Polymorphism with smart pointers
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(5.0, "red"));
    shapes.push_back(make_unique<Rectangle>(4.0, 6.0, "blue"));
    shapes.push_back(make_unique<Triangle>(3.0, 8.0, "green"));

    // Polymorphic behavior
    double totalArea = 0;
    for (const auto& shape : shapes) {
        shape->display();
        totalArea += shape->area();
    }
    cout << "Total area: " << totalArea << endl;

    // Dynamic cast example
    Shape* s = new Circle(10.0);
    Circle* c = dynamic_cast<Circle*>(s);
    if (c) {
        cout << "Successfully cast to Circle" << endl;
    }
    delete s;

    return 0;
}`,
          problems: [
            ['Design Parking System', 'https://leetcode.com/problems/design-parking-system/', 'Easy'],
            ['Design Browser History', 'https://leetcode.com/problems/design-browser-history/', 'Medium'],
            ['Design Twitter', 'https://leetcode.com/problems/design-twitter/', 'Medium'],
            ['LRU Cache', 'https://leetcode.com/problems/lru-cache/', 'Medium']
          ],
          mcqs: [
            {q: 'What keyword enables runtime polymorphism in C++?', o: ['static', 'override', 'virtual', 'dynamic'], a: 2},
            {q: 'What is an abstract class?', o: ['A class with no members', 'A class that cannot be instantiated because it has at least one pure virtual function', 'A class declared with the abstract keyword', 'A class without constructors'], a: 1},
            {q: 'Why must destructors be virtual in a base class with virtual functions?', o: ['To improve performance', 'To prevent compilation errors', 'To ensure the correct destructor is called when deleting through a base pointer', 'Virtual destructors are optional'], a: 2}
          ]
        },
        {
          t: 'Templates & Generic Programming',
          learn: '<div class="learn-section"><div class="learn-h">What are Templates?</div><p class="learn-p"><b>Templates</b> enable <b>generic programming</b> in C++. They allow you to write code that works with any data type, without duplicating the logic for each type. The compiler generates the specific version of the code for each type used — this is called <b>template instantiation</b>.</p><div class="learn-code">// Without templates: need separate functions\nint maxInt(int a, int b) { return (a &gt; b) ? a : b; }\ndouble maxDouble(double a, double b) { return (a &gt; b) ? a : b; }\n\n// With templates: one function for all types\ntemplate &lt;typename T&gt;\nT maxVal(T a, T b) { return (a &gt; b) ? a : b; }\n\nmaxVal(3, 5);       // T = int\nmaxVal(3.14, 2.72); // T = double\nmaxVal(\'a\', \'z\');   // T = char</div></div><div class="learn-section"><div class="learn-h">Function Templates</div><p class="learn-p">Function templates define a pattern for functions. The compiler deduces the template parameter from the arguments:</p><div class="learn-code">template &lt;typename T&gt;\nvoid swapValues(T&amp; a, T&amp; b) {\n    T temp = a;\n    a = b;\n    b = temp;\n}\n\nint x = 1, y = 2;\nswapValues(x, y);  // T deduced as int\n\nstring s1 = "hello", s2 = "world";\nswapValues(s1, s2);  // T deduced as string</div><p class="learn-p">You can also have multiple template parameters and non-type parameters:</p><div class="learn-code">template &lt;typename T, typename U&gt;\nauto add(T a, U b) -&gt; decltype(a + b) {\n    return a + b;\n}\nadd(3, 4.5);  // T=int, U=double, returns double\n\n// Non-type template parameter\ntemplate &lt;typename T, int N&gt;\nclass Array {\n    T data[N];\npublic:\n    int size() { return N; }\n};\nArray&lt;int, 10&gt; arr;  // fixed-size array of 10 ints</div></div><div class="learn-section"><div class="learn-h">Class Templates</div><p class="learn-p">Class templates allow you to create generic data structures:</p><div class="learn-code">template &lt;typename T&gt;\nclass Stack {\n    vector&lt;T&gt; data;\npublic:\n    void push(const T&amp; val) { data.push_back(val); }\n    T pop() {\n        T top = data.back();\n        data.pop_back();\n        return top;\n    }\n    bool empty() const { return data.empty(); }\n    int size() const { return data.size(); }\n};\n\nStack&lt;int&gt; intStack;\nStack&lt;string&gt; strStack;</div><p class="learn-p">All STL containers are class templates: <code>vector&lt;T&gt;</code>, <code>map&lt;K,V&gt;</code>, <code>stack&lt;T&gt;</code>, etc.</p></div><div class="learn-section"><div class="learn-h">Template Specialization</div><p class="learn-p"><b>Template specialization</b> provides a custom implementation for a specific type:</p><div class="learn-code">// General template\ntemplate &lt;typename T&gt;\nvoid print(T val) {\n    cout &lt;&lt; val &lt;&lt; endl;\n}\n\n// Specialization for bool\ntemplate &lt;&gt;\nvoid print&lt;bool&gt;(bool val) {\n    cout &lt;&lt; (val ? "true" : "false") &lt;&lt; endl;\n}\n\nprint(42);      // uses general template\nprint(true);    // uses bool specialization</div></div><div class="learn-section"><div class="learn-h">SFINAE &amp; Concepts (Advanced)</div><p class="learn-p"><b>SFINAE</b> (Substitution Failure Is Not An Error) is a C++ principle where if template argument substitution fails, the compiler silently ignores that overload instead of raising an error.</p><p class="learn-p">C++20 introduced <b>Concepts</b> for cleaner template constraints:</p><div class="learn-code">// C++20 concepts\ntemplate &lt;typename T&gt;\nconcept Numeric = std::integral&lt;T&gt; || std::floating_point&lt;T&gt;;\n\ntemplate &lt;Numeric T&gt;\nT add(T a, T b) { return a + b; }\n\nadd(3, 5);         // OK\n// add("a", "b");  // Error: string doesn\'t satisfy Numeric</div></div><div class="learn-section"><div class="learn-h">Key Points for Interviews</div><ul class="learn-list"><li>Templates are resolved at <b>compile time</b> (no runtime overhead)</li><li>Template code must be in header files (not .cpp) because the compiler needs the full definition at instantiation</li><li>STL is entirely built on templates</li><li><code>auto</code> and <code>decltype</code> complement templates for type deduction</li></ul><div class="learn-tip"><b>Tip:</b> Templates are the foundation of the entire STL. Understanding them helps you understand how vector, map, sort, and other STL components work under the hood.</div><div class="learn-warn"><b>Warning:</b> Template error messages can be extremely long and cryptic. Read them from top to bottom and focus on the first error — later errors are often consequences of the first.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// ---- Function Template ----
template <typename T>
T maxVal(T a, T b) {
    return (a > b) ? a : b;
}

// ---- Function Template with multiple types ----
template <typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {
    return a + b;
}

// ---- Class Template: Generic Stack ----
template <typename T>
class Stack {
    vector<T> data;
public:
    void push(const T& val) { data.push_back(val); }

    T pop() {
        if (data.empty()) throw runtime_error("Stack empty");
        T top = data.back();
        data.pop_back();
        return top;
    }

    T peek() const {
        if (data.empty()) throw runtime_error("Stack empty");
        return data.back();
    }

    bool empty() const { return data.empty(); }
    int size() const { return data.size(); }
};

// ---- Class Template: Generic Pair ----
template <typename T1, typename T2>
class MyPair {
public:
    T1 first;
    T2 second;
    MyPair(T1 f, T2 s) : first(f), second(s) {}
    void display() const {
        cout << "(" << first << ", " << second << ")" << endl;
    }
};

// ---- Template Specialization ----
template <typename T>
void printType(T val) {
    cout << "Generic: " << val << endl;
}

template <>
void printType<bool>(bool val) {
    cout << "Bool: " << (val ? "true" : "false") << endl;
}

// ---- Non-type template parameter ----
template <typename T, int N>
class FixedArray {
    T data[N];
public:
    T& operator[](int i) { return data[i]; }
    constexpr int size() const { return N; }
};

int main() {
    // Function templates
    cout << maxVal(3, 7) << endl;         // 7
    cout << maxVal(3.14, 2.72) << endl;   // 3.14
    cout << maxVal(string("abc"), string("xyz")) << endl; // xyz
    cout << add(3, 4.5) << endl;          // 7.5

    // Class template: Stack
    Stack<int> intStack;
    intStack.push(10);
    intStack.push(20);
    cout << intStack.pop() << endl;  // 20

    Stack<string> strStack;
    strStack.push("hello");
    strStack.push("world");
    cout << strStack.peek() << endl; // world

    // Custom pair
    MyPair<string, int> p("Alice", 25);
    p.display();  // (Alice, 25)

    // Template specialization
    printType(42);    // Generic: 42
    printType(true);  // Bool: true

    return 0;
}`,
          problems: [
            ['Min Stack', 'https://leetcode.com/problems/min-stack/', 'Medium'],
            ['Implement Stack using Queues', 'https://leetcode.com/problems/implement-stack-using-queues/', 'Easy'],
            ['Design Circular Queue', 'https://leetcode.com/problems/design-circular-queue/', 'Medium'],
            ['Implement Trie (Prefix Tree)', 'https://leetcode.com/problems/implement-trie-prefix-tree/', 'Medium']
          ],
          mcqs: [
            {q: 'When are C++ templates instantiated?', o: ['At runtime', 'At link time', 'At compile time', 'At preprocessing time'], a: 2},
            {q: 'Why must template implementations be in header files?', o: ['It is a style convention', 'The compiler needs the full definition at the point of instantiation', 'Templates cannot be in .cpp files', 'Linker requires it'], a: 1},
            {q: 'What is template specialization?', o: ['Making a template work with pointers', 'Providing a custom implementation for a specific type', 'Restricting templates to certain types', 'Optimizing template performance'], a: 1}
          ]
        }
      ]
    }
  ]
};


const DSA_CONTENT = {
  id: 'dsa', t: 'Data Structures & Algorithms',
  tabs: [
    {
      id: 'arrays', t: 'Arrays',
      topics: [
        {
          t: 'Two Pointers',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Two Pointers</div><p class="learn-p">The <b>Two Pointers</b> technique uses two pointers (indices) that move through a data structure — typically an array or string — to solve problems efficiently. By maintaining two pointers, we often reduce the brute-force <span class="learn-complexity">O(n^2)</span> solution to <span class="learn-complexity">O(n)</span>.</p><p class="learn-p">There are two main variations:</p><ul class="learn-list"><li><b>Opposite-direction pointers:</b> One starts at the beginning, the other at the end. They move toward each other. Used for sorted array problems.</li><li><b>Same-direction pointers:</b> Both start near the beginning. One (fast) moves ahead while the other (slow) stays back. Used for linked list cycle detection and in-place operations.</li></ul></div><div class="learn-section"><div class="learn-h">Pattern 1: Two Sum on Sorted Array</div><p class="learn-p">Given a <b>sorted</b> array and a target sum, find a pair that sums to target:</p><div class="learn-code">int left = 0, right = n - 1;\nwhile (left &lt; right) {\n    int sum = arr[left] + arr[right];\n    if (sum == target) return {left, right};\n    else if (sum &lt; target) left++;\n    else right--;\n}</div><p class="learn-p">This works because the array is sorted. If the sum is too small, we need a larger value (move left pointer right). If too large, we need a smaller value (move right pointer left). Time: <span class="learn-complexity">O(n)</span>, Space: <span class="learn-complexity">O(1)</span>.</p></div><div class="learn-section"><div class="learn-h">Pattern 2: Remove Duplicates In-Place</div><p class="learn-p">Use a slow pointer to track the position of the next unique element, and a fast pointer to scan through the array:</p><div class="learn-code">int slow = 0;\nfor (int fast = 1; fast &lt; n; fast++) {\n    if (arr[fast] != arr[slow]) {\n        slow++;\n        arr[slow] = arr[fast];\n    }\n}\n// slow + 1 = number of unique elements</div></div><div class="learn-section"><div class="learn-h">Pattern 3: Container With Most Water</div><p class="learn-p">Two pointers start at opposite ends. Move the pointer at the shorter line inward:</p><div class="learn-code">int left = 0, right = n - 1, maxArea = 0;\nwhile (left &lt; right) {\n    int h = min(height[left], height[right]);\n    maxArea = max(maxArea, h * (right - left));\n    if (height[left] &lt; height[right]) left++;\n    else right--;\n}</div></div><div class="learn-section"><div class="learn-h">Pattern 4: Three Sum</div><p class="learn-p">Sort the array, then fix one element and use two pointers on the remaining portion:</p><div class="learn-code">sort(nums.begin(), nums.end());\nfor (int i = 0; i &lt; n - 2; i++) {\n    if (i &gt; 0 &amp;&amp; nums[i] == nums[i-1]) continue; // skip duplicates\n    int left = i + 1, right = n - 1;\n    while (left &lt; right) {\n        int sum = nums[i] + nums[left] + nums[right];\n        if (sum == 0) { /* found triplet */ }\n        else if (sum &lt; 0) left++;\n        else right--;\n    }\n}</div><div class="learn-tip"><b>Tip:</b> The key insight for Two Pointers is that the movement of each pointer should monotonically reduce the search space. Each pointer moves in only one direction.</div><div class="learn-warn"><b>Warning:</b> Two Pointers on sorted arrays requires the array to actually be sorted. Don\'t forget to sort first, or verify the problem guarantees sorted input.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Two Sum on sorted array
vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left, right};
        else if (sum < target) left++;
        else right--;
    }
    return {};
}

// Remove duplicates from sorted array
int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int slow = 0;
    for (int fast = 1; fast < (int)nums.size(); fast++) {
        if (nums[fast] != nums[slow]) {
            nums[++slow] = nums[fast];
        }
    }
    return slow + 1;
}

// Container With Most Water
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxWater = 0;
    while (left < right) {
        int h = min(height[left], height[right]);
        maxWater = max(maxWater, h * (right - left));
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxWater;
}

// Three Sum
vector<vector<int>> threeSum(vector<int>& nums) {
    vector<vector<int>> result;
    sort(nums.begin(), nums.end());
    int n = nums.size();
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}

int main() {
    vector<int> sorted = {1, 2, 3, 4, 6, 8, 9};
    auto pair = twoSum(sorted, 10);
    if (!pair.empty())
        cout << "Pair: " << sorted[pair[0]] << "+" << sorted[pair[1]] << endl;

    vector<int> dups = {1, 1, 2, 2, 3, 4, 4};
    int len = removeDuplicates(dups);
    cout << "Unique count: " << len << endl;

    vector<int> h = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << "Max area: " << maxArea(h) << endl;

    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    auto triplets = threeSum(nums);
    for (auto& t : triplets)
        cout << t[0] << " " << t[1] << " " << t[2] << endl;

    return 0;
}`,
          problems: [
            ['Two Sum II - Input Array Is Sorted', 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', 'Medium'],
            ['3Sum', 'https://leetcode.com/problems/3sum/', 'Medium'],
            ['Container With Most Water', 'https://leetcode.com/problems/container-with-most-water/', 'Medium'],
            ['Remove Duplicates from Sorted Array', 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', 'Easy'],
            ['Trapping Rain Water', 'https://leetcode.com/problems/trapping-rain-water/', 'Hard']
          ],
          mcqs: [
            {q: 'What is the typical time complexity improvement from Two Pointers?', o: ['O(n^2) to O(n log n)', 'O(n^2) to O(n)', 'O(n) to O(log n)', 'O(2^n) to O(n^2)'], a: 1},
            {q: 'In the Two Sum sorted array problem, why do we move the left pointer right when sum < target?', o: ['To decrease the sum', 'Because the array is sorted, moving left increases the sum', 'To skip duplicates', 'It does not matter which pointer we move'], a: 1},
            {q: 'What prerequisite does the opposite-direction Two Pointers technique usually require?', o: ['Array must be non-empty', 'Array must be sorted', 'Array must have even length', 'Array must contain unique elements'], a: 1}
          ]
        },
        {
          t: 'Sorting Algorithms',
          learn: '<div class="learn-section"><div class="learn-h">Overview of Sorting</div><p class="learn-p">Sorting is one of the most fundamental operations in computer science. Many problems become easier once data is sorted. Understanding sorting algorithms is essential for interviews.</p><table class="learn-table"><tr><th>Algorithm</th><th>Best</th><th>Average</th><th>Worst</th><th>Space</th><th>Stable?</th></tr><tr><td>Bubble Sort</td><td><span class="learn-complexity">O(n)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(1)</span></td><td>Yes</td></tr><tr><td>Selection Sort</td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(1)</span></td><td>No</td></tr><tr><td>Insertion Sort</td><td><span class="learn-complexity">O(n)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(1)</span></td><td>Yes</td></tr><tr><td>Merge Sort</td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n)</span></td><td>Yes</td></tr><tr><td>Quick Sort</td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n^2)</span></td><td><span class="learn-complexity">O(log n)</span></td><td>No</td></tr><tr><td>Heap Sort</td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(n log n)</span></td><td><span class="learn-complexity">O(1)</span></td><td>No</td></tr></table></div><div class="learn-section"><div class="learn-h">Merge Sort</div><p class="learn-p"><b>Merge Sort</b> follows the divide-and-conquer paradigm:</p><ol class="learn-list"><li><b>Divide:</b> Split the array into two halves</li><li><b>Conquer:</b> Recursively sort each half</li><li><b>Combine:</b> Merge the two sorted halves</li></ol><p class="learn-p">Time: <span class="learn-complexity">O(n log n)</span> always. Space: <span class="learn-complexity">O(n)</span> for the temporary array. It is <b>stable</b> (preserves relative order of equal elements).</p><div class="learn-code">void merge(vector&lt;int&gt;&amp; arr, int l, int m, int r) {\n    vector&lt;int&gt; temp;\n    int i = l, j = m + 1;\n    while (i &lt;= m &amp;&amp; j &lt;= r) {\n        if (arr[i] &lt;= arr[j]) temp.push_back(arr[i++]);\n        else temp.push_back(arr[j++]);\n    }\n    while (i &lt;= m) temp.push_back(arr[i++]);\n    while (j &lt;= r) temp.push_back(arr[j++]);\n    for (int k = l; k &lt;= r; k++) arr[k] = temp[k - l];\n}</div></div><div class="learn-section"><div class="learn-h">Quick Sort</div><p class="learn-p"><b>Quick Sort</b> picks a <b>pivot</b> element and partitions the array around it — elements less than pivot go left, greater go right. Then recursively sort each partition.</p><p class="learn-p">Average: <span class="learn-complexity">O(n log n)</span>. Worst: <span class="learn-complexity">O(n^2)</span> when the pivot is always the smallest or largest element (already sorted array with bad pivot choice). Randomizing the pivot avoids this.</p><div class="learn-tip"><b>Tip:</b> C++ <code>std::sort</code> uses IntroSort (Quick Sort + Heap Sort fallback + Insertion Sort for small arrays), guaranteeing <span class="learn-complexity">O(n log n)</span> worst case. Use it in contests instead of implementing your own.</div></div><div class="learn-section"><div class="learn-h">Counting Sort &amp; Radix Sort</div><p class="learn-p">For integers with a limited range, <b>Counting Sort</b> achieves <span class="learn-complexity">O(n + k)</span> time where k is the range. <b>Radix Sort</b> sorts by individual digits, achieving <span class="learn-complexity">O(d * (n + k))</span> where d is the number of digits.</p><div class="learn-warn"><b>Warning:</b> Know when to use which sort. Merge Sort for stability guarantees, Quick Sort for average-case speed, Counting/Radix for integer data with bounded range.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// ---- Merge Sort ----
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> temp;
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (arr[i] <= arr[j]) temp.push_back(arr[i++]);
        else temp.push_back(arr[j++]);
    }
    while (i <= m) temp.push_back(arr[i++]);
    while (j <= r) temp.push_back(arr[j++]);
    for (int k = l; k <= r; k++) arr[k] = temp[k - l];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

// ---- Quick Sort ----
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // last element as pivot
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            swap(arr[++i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

// ---- Counting Sort ----
void countingSort(vector<int>& arr, int maxVal) {
    vector<int> count(maxVal + 1, 0);
    for (int x : arr) count[x]++;
    int idx = 0;
    for (int i = 0; i <= maxVal; i++)
        while (count[i]-- > 0) arr[idx++] = i;
}

int main() {
    // Merge Sort
    vector<int> a = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(a, 0, a.size() - 1);
    cout << "Merge Sort: ";
    for (int x : a) cout << x << " ";
    cout << endl;

    // Quick Sort
    vector<int> b = {10, 7, 8, 9, 1, 5};
    quickSort(b, 0, b.size() - 1);
    cout << "Quick Sort: ";
    for (int x : b) cout << x << " ";
    cout << endl;

    // Counting Sort
    vector<int> c = {4, 2, 2, 8, 3, 3, 1};
    countingSort(c, 8);
    cout << "Counting Sort: ";
    for (int x : c) cout << x << " ";
    cout << endl;

    // STL sort (use this in contests!)
    vector<int> d = {5, 2, 8, 1, 9};
    sort(d.begin(), d.end());
    cout << "STL sort: ";
    for (int x : d) cout << x << " ";
    cout << endl;

    return 0;
}`,
          problems: [
            ['Sort an Array', 'https://leetcode.com/problems/sort-an-array/', 'Medium'],
            ['Sort Colors', 'https://leetcode.com/problems/sort-colors/', 'Medium'],
            ['Merge Sorted Array', 'https://leetcode.com/problems/merge-sorted-array/', 'Easy'],
            ['Largest Number', 'https://leetcode.com/problems/largest-number/', 'Medium'],
            ['Count of Smaller Numbers After Self', 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/', 'Hard']
          ],
          mcqs: [
            {q: 'Which sorting algorithm is stable and always O(n log n)?', o: ['Quick Sort', 'Heap Sort', 'Merge Sort', 'Selection Sort'], a: 2},
            {q: 'What is the worst-case time complexity of Quick Sort?', o: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(2^n)'], a: 2},
            {q: 'What algorithm does C++ std::sort use internally?', o: ['Pure Quick Sort', 'Merge Sort', 'IntroSort (Quick Sort + Heap Sort + Insertion Sort)', 'Tim Sort'], a: 2}
          ]
        },
        {
          t: 'Merge Intervals',
          learn: '<div class="learn-section"><div class="learn-h">Understanding Interval Problems</div><p class="learn-p"><b>Interval problems</b> involve working with ranges represented as [start, end] pairs. These are extremely common in interviews. The key pattern: sort by start time, then process intervals linearly.</p></div><div class="learn-section"><div class="learn-h">Merge Overlapping Intervals</div><p class="learn-p">Given a list of intervals, merge all overlapping ones. The algorithm:</p><ol class="learn-list"><li>Sort intervals by start time</li><li>Initialize result with the first interval</li><li>For each subsequent interval, if it overlaps with the last in result (start &lt;= last.end), merge them by extending the end. Otherwise, add it as a new interval.</li></ol><div class="learn-code">sort(intervals.begin(), intervals.end());\nvector&lt;vector&lt;int&gt;&gt; merged;\nfor (auto&amp; iv : intervals) {\n    if (merged.empty() || merged.back()[1] &lt; iv[0]) {\n        merged.push_back(iv);  // no overlap\n    } else {\n        merged.back()[1] = max(merged.back()[1], iv[1]);  // merge\n    }\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(n log n)</span> due to sorting. Space: <span class="learn-complexity">O(n)</span> for the result.</p></div><div class="learn-section"><div class="learn-h">Insert Interval</div><p class="learn-p">Insert a new interval into a sorted non-overlapping list and merge if necessary:</p><div class="learn-code">// Three phases:\n// 1. Add all intervals that end before newInterval starts\n// 2. Merge all overlapping intervals with newInterval\n// 3. Add remaining intervals</div></div><div class="learn-section"><div class="learn-h">Interval Intersection</div><p class="learn-p">Find the intersection of two lists of sorted intervals:</p><div class="learn-code">int i = 0, j = 0;\nwhile (i &lt; A.size() &amp;&amp; j &lt; B.size()) {\n    int lo = max(A[i][0], B[j][0]);\n    int hi = min(A[i][1], B[j][1]);\n    if (lo &lt;= hi) result.push_back({lo, hi});\n    if (A[i][1] &lt; B[j][1]) i++;\n    else j++;\n}</div><div class="learn-tip"><b>Tip:</b> For interval problems, always consider: (1) sorting by start time, (2) what defines overlap (start &lt;= end of previous), (3) how to handle edge cases (touching intervals [1,3],[3,5]).</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Merge overlapping intervals
vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    for (auto& iv : intervals) {
        if (merged.empty() || merged.back()[1] < iv[0]) {
            merged.push_back(iv);
        } else {
            merged.back()[1] = max(merged.back()[1], iv[1]);
        }
    }
    return merged;
}

// Insert interval into sorted non-overlapping list
vector<vector<int>> insertInterval(vector<vector<int>>& intervals, vector<int>& newIv) {
    vector<vector<int>> result;
    int i = 0, n = intervals.size();
    // Add intervals before newInterval
    while (i < n && intervals[i][1] < newIv[0])
        result.push_back(intervals[i++]);
    // Merge overlapping intervals
    while (i < n && intervals[i][0] <= newIv[1]) {
        newIv[0] = min(newIv[0], intervals[i][0]);
        newIv[1] = max(newIv[1], intervals[i][1]);
        i++;
    }
    result.push_back(newIv);
    // Add remaining
    while (i < n) result.push_back(intervals[i++]);
    return result;
}

// Interval intersection of two sorted lists
vector<vector<int>> intervalIntersection(
    vector<vector<int>>& A, vector<vector<int>>& B) {
    vector<vector<int>> result;
    int i = 0, j = 0;
    while (i < (int)A.size() && j < (int)B.size()) {
        int lo = max(A[i][0], B[j][0]);
        int hi = min(A[i][1], B[j][1]);
        if (lo <= hi) result.push_back({lo, hi});
        if (A[i][1] < B[j][1]) i++;
        else j++;
    }
    return result;
}

int main() {
    vector<vector<int>> intervals = {{1,3},{2,6},{8,10},{15,18}};
    auto merged = mergeIntervals(intervals);
    cout << "Merged: ";
    for (auto& iv : merged)
        cout << "[" << iv[0] << "," << iv[1] << "] ";
    cout << endl; // [1,6] [8,10] [15,18]

    vector<vector<int>> sorted = {{1,2},{3,5},{6,7},{8,10}};
    vector<int> newIv = {4,8};
    auto inserted = insertInterval(sorted, newIv);
    cout << "Inserted: ";
    for (auto& iv : inserted)
        cout << "[" << iv[0] << "," << iv[1] << "] ";
    cout << endl; // [1,2] [3,10]

    return 0;
}`,
          problems: [
            ['Merge Intervals', 'https://leetcode.com/problems/merge-intervals/', 'Medium'],
            ['Insert Interval', 'https://leetcode.com/problems/insert-interval/', 'Medium'],
            ['Interval List Intersections', 'https://leetcode.com/problems/interval-list-intersections/', 'Medium'],
            ['Non-overlapping Intervals', 'https://leetcode.com/problems/non-overlapping-intervals/', 'Medium'],
            ['Meeting Rooms II', 'https://leetcode.com/problems/meeting-rooms-ii/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the first step in the merge intervals algorithm?', o: ['Check for overlaps', 'Sort intervals by start time', 'Remove duplicates', 'Find the maximum end time'], a: 1},
            {q: 'Two intervals [1,5] and [3,8] overlap. What is their merged result?', o: ['[1,3]', '[3,5]', '[1,8]', '[1,5] and [3,8]'], a: 2},
            {q: 'What is the time complexity of the merge intervals algorithm?', o: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(log n)'], a: 2}
          ]
        },
        {
          t: 'Sliding Window',
          learn: '<div class="learn-section"><div class="learn-h">What is the Sliding Window Technique?</div><p class="learn-p">The <b>Sliding Window</b> technique maintains a window (subarray/substring) that slides over the data structure. It\'s used to find optimal subarrays/substrings that satisfy a condition. It converts a brute-force <span class="learn-complexity">O(n^2)</span> or <span class="learn-complexity">O(n^3)</span> approach into <span class="learn-complexity">O(n)</span>.</p><p class="learn-p">Two types:</p><ul class="learn-list"><li><b>Fixed-size window:</b> The window size is given (e.g., maximum sum of subarray of size k)</li><li><b>Variable-size window:</b> Find the smallest/largest window satisfying a condition</li></ul></div><div class="learn-section"><div class="learn-h">Fixed-Size Window</div><p class="learn-p">Find the maximum sum subarray of size k:</p><div class="learn-code">int maxSum = 0, windowSum = 0;\nfor (int i = 0; i &lt; n; i++) {\n    windowSum += arr[i];\n    if (i &gt;= k) windowSum -= arr[i - k]; // slide: remove leftmost\n    if (i &gt;= k - 1) maxSum = max(maxSum, windowSum);\n}</div></div><div class="learn-section"><div class="learn-h">Variable-Size Window Template</div><p class="learn-p">The general template for variable-size sliding window problems:</p><div class="learn-code">int left = 0, result = 0;\nfor (int right = 0; right &lt; n; right++) {\n    // Expand: add arr[right] to window state\n    \n    while (/* window is invalid */) {\n        // Shrink: remove arr[left] from window state\n        left++;\n    }\n    \n    // Update result (window [left, right] is valid)\n    result = max(result, right - left + 1);\n}</div></div><div class="learn-section"><div class="learn-h">Classic Problems</div><p class="learn-p"><b>Longest Substring Without Repeating Characters:</b> Use a set or frequency map to track characters in the current window. When a duplicate is found, shrink from the left.</p><p class="learn-p"><b>Minimum Window Substring:</b> Find the smallest window in s that contains all characters of t. Use two frequency maps and a counter for matched characters.</p><div class="learn-tip"><b>Tip:</b> The key to sliding window is identifying: (1) what constitutes a valid window, (2) when to expand (always move right), (3) when to shrink (condition violated, move left).</div><div class="learn-warn"><b>Warning:</b> Be careful with edge cases: empty input, window larger than array, all identical elements.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <climits>
using namespace std;

// Fixed-size window: max sum of subarray of size k
int maxSumSubarray(vector<int>& arr, int k) {
    int maxSum = 0, windowSum = 0;
    for (int i = 0; i < (int)arr.size(); i++) {
        windowSum += arr[i];
        if (i >= k) windowSum -= arr[i - k];
        if (i >= k - 1) maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}

// Longest substring without repeating characters
int lengthOfLongestSubstring(string s) {
    unordered_set<char> window;
    int left = 0, maxLen = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        while (window.count(s[right])) {
            window.erase(s[left++]);
        }
        window.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Minimum window substring
string minWindow(string s, string t) {
    unordered_map<char, int> need, have;
    for (char c : t) need[c]++;
    int required = need.size(), formed = 0;
    int left = 0, minLen = INT_MAX, minStart = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        have[s[right]]++;
        if (need.count(s[right]) && have[s[right]] == need[s[right]])
            formed++;
        while (formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            have[s[left]]--;
            if (need.count(s[left]) && have[s[left]] < need[s[left]])
                formed--;
            left++;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    cout << "Max sum (k=3): " << maxSumSubarray(arr, 3) << endl; // 9

    cout << "Longest unique: "
         << lengthOfLongestSubstring("abcabcbb") << endl; // 3

    cout << "Min window: "
         << minWindow("ADOBECODEBANC", "ABC") << endl; // "BANC"

    return 0;
}`,
          problems: [
            ['Longest Substring Without Repeating Characters', 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 'Medium'],
            ['Minimum Window Substring', 'https://leetcode.com/problems/minimum-window-substring/', 'Hard'],
            ['Maximum Average Subarray I', 'https://leetcode.com/problems/maximum-average-subarray-i/', 'Easy'],
            ['Longest Repeating Character Replacement', 'https://leetcode.com/problems/longest-repeating-character-replacement/', 'Medium'],
            ['Sliding Window Maximum', 'https://leetcode.com/problems/sliding-window-maximum/', 'Hard']
          ],
          mcqs: [
            {q: 'What is the time complexity of the sliding window technique?', o: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(2^n)'], a: 2},
            {q: 'In a variable-size sliding window, when do you shrink the window?', o: ['Every iteration', 'When the window becomes invalid', 'When the right pointer reaches the end', 'When left == right'], a: 1},
            {q: 'Why is sliding window O(n) even though it has a while loop inside a for loop?', o: ['The while loop runs at most once', 'Each element is added and removed at most once (amortized)', 'The while loop has O(1) body', 'It is actually O(n^2)'], a: 1}
          ]
        },
        {
          t: 'Prefix Sums',
          learn: '<div class="learn-section"><div class="learn-h">What is a Prefix Sum?</div><p class="learn-p">A <b>prefix sum</b> array stores cumulative sums where <code>prefix[i] = arr[0] + arr[1] + ... + arr[i]</code>. This allows computing the sum of any subarray in <span class="learn-complexity">O(1)</span> after <span class="learn-complexity">O(n)</span> preprocessing.</p><div class="learn-code">// Build prefix sum\nvector&lt;int&gt; prefix(n + 1, 0);\nfor (int i = 0; i &lt; n; i++) {\n    prefix[i + 1] = prefix[i] + arr[i];\n}\n\n// Sum of arr[l..r] = prefix[r+1] - prefix[l]\nint rangeSum = prefix[r + 1] - prefix[l];</div><p class="learn-p">Using a size n+1 array with prefix[0] = 0 simplifies edge cases. The sum of subarray [l, r] is <code>prefix[r+1] - prefix[l]</code>.</p></div><div class="learn-section"><div class="learn-h">Subarray Sum Equals K</div><p class="learn-p">A powerful application: count subarrays with sum equal to k. Use prefix sums with a hash map:</p><div class="learn-code">int subarraySum(vector&lt;int&gt;&amp; nums, int k) {\n    unordered_map&lt;int, int&gt; prefixCount;\n    prefixCount[0] = 1;  // empty prefix\n    int sum = 0, count = 0;\n    for (int x : nums) {\n        sum += x;\n        if (prefixCount.count(sum - k))\n            count += prefixCount[sum - k];\n        prefixCount[sum]++;\n    }\n    return count;\n}</div><p class="learn-p">The idea: if <code>prefix[j] - prefix[i] = k</code>, then the subarray [i+1, j] sums to k. We look up how many previous prefix sums equal <code>current_sum - k</code>.</p></div><div class="learn-section"><div class="learn-h">2D Prefix Sums</div><p class="learn-p">For 2D matrices, prefix sums allow <span class="learn-complexity">O(1)</span> rectangular sum queries:</p><div class="learn-code">// Build 2D prefix sum\nfor (int i = 1; i &lt;= m; i++)\n    for (int j = 1; j &lt;= n; j++)\n        prefix[i][j] = mat[i-1][j-1] + prefix[i-1][j]\n                      + prefix[i][j-1] - prefix[i-1][j-1];\n\n// Query sum of rectangle (r1,c1) to (r2,c2)\nint sum = prefix[r2+1][c2+1] - prefix[r1][c2+1]\n        - prefix[r2+1][c1] + prefix[r1][c1];</div><div class="learn-tip"><b>Tip:</b> Prefix sums are building blocks for many problems. Whenever you see "subarray sum" in a problem, think prefix sums + hash map.</div><div class="learn-warn"><b>Warning:</b> Watch for integer overflow with large arrays. Use <code>long long</code> for the prefix sum array when values can be large.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Build prefix sum array
vector<long long> buildPrefix(vector<int>& arr) {
    int n = arr.size();
    vector<long long> prefix(n + 1, 0);
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    return prefix;
}

// Range sum query in O(1)
long long rangeSum(vector<long long>& prefix, int l, int r) {
    return prefix[r + 1] - prefix[l];
}

// Count subarrays with sum equal to k
int subarraySum(vector<int>& nums, int k) {
    unordered_map<long long, int> prefixCount;
    prefixCount[0] = 1;
    long long sum = 0;
    int count = 0;
    for (int x : nums) {
        sum += x;
        if (prefixCount.count(sum - k)) {
            count += prefixCount[sum - k];
        }
        prefixCount[sum]++;
    }
    return count;
}

// 2D prefix sum for matrix region queries
class NumMatrix {
    vector<vector<int>> prefix;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        prefix.assign(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j]
                              + prefix[i][j-1] - prefix[i-1][j-1];
    }
    int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2+1][c2+1] - prefix[r1][c2+1]
             - prefix[r2+1][c1] + prefix[r1][c1];
    }
};

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    auto prefix = buildPrefix(arr);

    // Sum of arr[1..3] = 2+3+4 = 9
    cout << "Sum [1,3]: " << rangeSum(prefix, 1, 3) << endl;

    // Count subarrays with sum = 5
    vector<int> nums = {1, 2, 3, -1, 2, 4, -3};
    cout << "Subarrays with sum 5: " << subarraySum(nums, 5) << endl;

    // 2D prefix sum
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    NumMatrix nm(matrix);
    cout << "Region [1,1]-[2,2]: " << nm.sumRegion(1, 1, 2, 2) << endl; // 28

    return 0;
}`,
          problems: [
            ['Range Sum Query - Immutable', 'https://leetcode.com/problems/range-sum-query-immutable/', 'Easy'],
            ['Subarray Sum Equals K', 'https://leetcode.com/problems/subarray-sum-equals-k/', 'Medium'],
            ['Range Sum Query 2D - Immutable', 'https://leetcode.com/problems/range-sum-query-2d-immutable/', 'Medium'],
            ['Product of Array Except Self', 'https://leetcode.com/problems/product-of-array-except-self/', 'Medium'],
            ['Continuous Subarray Sum', 'https://leetcode.com/problems/continuous-subarray-sum/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity to answer a range sum query with prefix sums?', o: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'], a: 2},
            {q: 'In the subarray sum equals k approach, what does the hash map store?', o: ['Element indices', 'Prefix sum frequencies', 'Subarray lengths', 'Element frequencies'], a: 1},
            {q: 'What is the sum of subarray [l, r] using 0-indexed prefix sums with prefix[0]=0?', o: ['prefix[r] - prefix[l]', 'prefix[r+1] - prefix[l]', 'prefix[r] - prefix[l-1]', 'prefix[r+1] - prefix[l+1]'], a: 1}
          ]
        },
        {
          t: 'Kadane\'s Algorithm',
          learn: '<div class="learn-section"><div class="learn-h">The Maximum Subarray Problem</div><p class="learn-p">Given an array of integers (may contain negatives), find the <b>contiguous subarray</b> with the largest sum. This is a classic interview problem.</p><p class="learn-p"><b>Brute force:</b> Try all subarrays — <span class="learn-complexity">O(n^2)</span> or <span class="learn-complexity">O(n^3)</span>.</p><p class="learn-p"><b>Kadane\'s Algorithm:</b> Solve in <span class="learn-complexity">O(n)</span> time and <span class="learn-complexity">O(1)</span> space.</p></div><div class="learn-section"><div class="learn-h">Kadane\'s Algorithm</div><p class="learn-p">The key insight: at each position, we decide whether to <b>extend</b> the current subarray or <b>start fresh</b>. If the running sum becomes negative, it\'s better to start a new subarray.</p><div class="learn-code">int maxSubArray(vector&lt;int&gt;&amp; nums) {\n    int maxSum = nums[0], currentSum = nums[0];\n    for (int i = 1; i &lt; nums.size(); i++) {\n        currentSum = max(nums[i], currentSum + nums[i]);\n        maxSum = max(maxSum, currentSum);\n    }\n    return maxSum;\n}</div><p class="learn-p"><b>How it works:</b></p><ul class="learn-list"><li><code>currentSum</code> = maximum sum ending at the current position</li><li>At each element, either extend the previous subarray (<code>currentSum + nums[i]</code>) or start new (<code>nums[i]</code>)</li><li><code>maxSum</code> tracks the global maximum across all positions</li></ul></div><div class="learn-section"><div class="learn-h">Tracing Through an Example</div><p class="learn-p">Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]</p><div class="learn-code">i=0: current=-2, max=-2\ni=1: current=max(1, -2+1)=1, max=1\ni=2: current=max(-3, 1-3)=-2, max=1\ni=3: current=max(4, -2+4)=4, max=4\ni=4: current=max(-1, 4-1)=3, max=4\ni=5: current=max(2, 3+2)=5, max=5\ni=6: current=max(1, 5+1)=6, max=6\ni=7: current=max(-5, 6-5)=1, max=6\ni=8: current=max(4, 1+4)=5, max=6\nAnswer: 6 (subarray [4,-1,2,1])</div></div><div class="learn-section"><div class="learn-h">Variants</div><ul class="learn-list"><li><b>Maximum Circular Subarray:</b> Answer is max(normal Kadane, totalSum - minSubarraySum)</li><li><b>Maximum Product Subarray:</b> Track both max and min products (negative * negative = positive)</li><li><b>Find the actual subarray:</b> Track start and end indices</li></ul><div class="learn-tip"><b>Tip:</b> Kadane\'s is essentially a DP where <code>dp[i] = max(nums[i], dp[i-1] + nums[i])</code>, optimized to use O(1) space.</div><div class="learn-warn"><b>Warning:</b> If all elements are negative, Kadane\'s should return the largest (least negative) element, not 0. Initialize maxSum with nums[0], not 0.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

// Basic Kadane's Algorithm
int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}

// Kadane's with subarray indices
pair<int, pair<int,int>> maxSubArrayWithIndices(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    int start = 0, end = 0, tempStart = 0;
    for (int i = 1; i < (int)nums.size(); i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;
        } else {
            currentSum += nums[i];
        }
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    return {maxSum, {start, end}};
}

// Maximum Circular Subarray Sum
int maxCircularSubarraySum(vector<int>& nums) {
    int totalSum = 0;
    int maxSum = nums[0], curMax = 0;
    int minSum = nums[0], curMin = 0;
    for (int x : nums) {
        curMax = max(x, curMax + x);
        maxSum = max(maxSum, curMax);
        curMin = min(x, curMin + x);
        minSum = min(minSum, curMin);
        totalSum += x;
    }
    // If all negative, maxSum is the answer
    if (maxSum < 0) return maxSum;
    return max(maxSum, totalSum - minSum);
}

// Maximum Product Subarray
int maxProduct(vector<int>& nums) {
    int maxProd = nums[0], curMax = nums[0], curMin = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        if (nums[i] < 0) swap(curMax, curMin);
        curMax = max(nums[i], curMax * nums[i]);
        curMin = min(nums[i], curMin * nums[i]);
        maxProd = max(maxProd, curMax);
    }
    return maxProd;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Max subarray sum: " << maxSubArray(nums) << endl; // 6

    auto [sum, indices] = maxSubArrayWithIndices(nums);
    cout << "Sum: " << sum << " from index "
         << indices.first << " to " << indices.second << endl;

    vector<int> circ = {5, -3, 5};
    cout << "Circular max: " << maxCircularSubarraySum(circ) << endl; // 10

    vector<int> prod = {2, 3, -2, 4};
    cout << "Max product: " << maxProduct(prod) << endl; // 6

    return 0;
}`,
          problems: [
            ['Maximum Subarray', 'https://leetcode.com/problems/maximum-subarray/', 'Medium'],
            ['Maximum Product Subarray', 'https://leetcode.com/problems/maximum-product-subarray/', 'Medium'],
            ['Maximum Sum Circular Subarray', 'https://leetcode.com/problems/maximum-sum-circular-subarray/', 'Medium'],
            ['Best Time to Buy and Sell Stock', 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', 'Easy']
          ],
          mcqs: [
            {q: 'What is the time complexity of Kadane\'s Algorithm?', o: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'], a: 2},
            {q: 'In Kadane\'s algorithm, when do we start a new subarray?', o: ['When we find a negative number', 'When the current sum becomes negative', 'When current element is larger than current sum + current element', 'At every step'], a: 2},
            {q: 'For the Maximum Circular Subarray problem, what additional computation is needed?', o: ['Run Kadane on reversed array', 'Compute totalSum - minSubarraySum as an alternative answer', 'Use dynamic programming on 2D array', 'Sort the array first'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'bs', t: 'Binary Search',
      topics: [
        {
          t: 'Binary Search on 1D Arrays',
          learn: '<div class="learn-section"><div class="learn-h">Binary Search Fundamentals</div><p class="learn-p"><b>Binary Search</b> is an efficient algorithm for finding a target in a <b>sorted</b> array. It repeatedly halves the search space, achieving <span class="learn-complexity">O(log n)</span> time complexity.</p><div class="learn-code">int binarySearch(vector&lt;int&gt;&amp; arr, int target) {\n    int lo = 0, hi = arr.size() - 1;\n    while (lo &lt;= hi) {\n        int mid = lo + (hi - lo) / 2;  // avoid overflow\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] &lt; target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;  // not found\n}</div><div class="learn-warn"><b>Warning:</b> Always use <code>lo + (hi - lo) / 2</code> instead of <code>(lo + hi) / 2</code> to prevent integer overflow.</div></div><div class="learn-section"><div class="learn-h">Lower Bound &amp; Upper Bound</div><p class="learn-p"><b>Lower bound:</b> First position where element &gt;= target. <b>Upper bound:</b> First position where element &gt; target.</p><div class="learn-code">int lowerBound(vector&lt;int&gt;&amp; arr, int target) {\n    int lo = 0, hi = arr.size();\n    while (lo &lt; hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] &lt; target) lo = mid + 1;\n        else hi = mid;\n    }\n    return lo;\n}\n\nint upperBound(vector&lt;int&gt;&amp; arr, int target) {\n    int lo = 0, hi = arr.size();\n    while (lo &lt; hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (arr[mid] &lt;= target) lo = mid + 1;\n        else hi = mid;\n    }\n    return lo;\n}</div><p class="learn-p">Count of target = upperBound - lowerBound. These are the basis of STL\'s <code>lower_bound()</code> and <code>upper_bound()</code>.</p></div><div class="learn-section"><div class="learn-h">Search in Rotated Sorted Array</div><p class="learn-p">A sorted array that has been rotated. At each step, one half is always sorted. Determine which half is sorted and whether target lies in it:</p><div class="learn-code">if (arr[lo] &lt;= arr[mid]) {\n    // left half is sorted\n    if (arr[lo] &lt;= target &amp;&amp; target &lt; arr[mid])\n        hi = mid - 1;  // target in left half\n    else\n        lo = mid + 1;  // target in right half\n} else {\n    // right half is sorted\n    if (arr[mid] &lt; target &amp;&amp; target &lt;= arr[hi])\n        lo = mid + 1;\n    else\n        hi = mid - 1;\n}</div><div class="learn-tip"><b>Tip:</b> The key to binary search problems: identify the <b>monotonic property</b> that lets you decide which half to discard.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Standard binary search
int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

// Lower bound: first index where arr[i] >= target
int lowerBound(vector<int>& arr, int target) {
    int lo = 0, hi = arr.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

// Search in rotated sorted array
int searchRotated(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) { // left half sorted
            if (nums[lo] <= target && target < nums[mid])
                hi = mid - 1;
            else
                lo = mid + 1;
        } else { // right half sorted
            if (nums[mid] < target && target <= nums[hi])
                lo = mid + 1;
            else
                hi = mid - 1;
        }
    }
    return -1;
}

// Find first and last position of target
vector<int> searchRange(vector<int>& nums, int target) {
    int lo = lowerBound(nums, target);
    if (lo == (int)nums.size() || nums[lo] != target) return {-1, -1};
    int hi = lowerBound(nums, target + 1) - 1;
    return {lo, hi};
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11, 13};
    cout << "Find 7: index " << binarySearch(arr, 7) << endl; // 3
    cout << "Lower bound of 6: " << lowerBound(arr, 6) << endl; // 3

    vector<int> rotated = {4, 5, 6, 7, 0, 1, 2};
    cout << "Find 0 in rotated: " << searchRotated(rotated, 0) << endl; // 4

    vector<int> dups = {1, 2, 2, 2, 3, 4};
    auto range = searchRange(dups, 2);
    cout << "Range of 2: [" << range[0] << "," << range[1] << "]" << endl;

    return 0;
}`,
          problems: [
            ['Binary Search', 'https://leetcode.com/problems/binary-search/', 'Easy'],
            ['Search in Rotated Sorted Array', 'https://leetcode.com/problems/search-in-rotated-sorted-array/', 'Medium'],
            ['Find First and Last Position of Element in Sorted Array', 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', 'Medium'],
            ['Search Insert Position', 'https://leetcode.com/problems/search-insert-position/', 'Easy'],
            ['Find Minimum in Rotated Sorted Array', 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', 'Medium']
          ],
          mcqs: [
            {q: 'Why use lo + (hi - lo) / 2 instead of (lo + hi) / 2?', o: ['It is faster', 'It prevents integer overflow', 'It rounds down correctly', 'There is no difference'], a: 1},
            {q: 'What is the time complexity of binary search?', o: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'], a: 2},
            {q: 'In a rotated sorted array, what property helps us binary search?', o: ['The entire array is sorted', 'At least one half is always sorted', 'The pivot is always in the middle', 'Elements are unique'], a: 1}
          ]
        },
        {
          t: 'Binary Search on Answers',
          learn: '<div class="learn-section"><div class="learn-h">The Concept</div><p class="learn-p"><b>Binary Search on Answers</b> is a powerful technique where instead of searching for an element in an array, you binary search on the <b>answer space</b>. You define a range of possible answers [lo, hi] and use binary search to find the optimal one.</p><p class="learn-p">This works when: the answer has a <b>monotonic</b> feasibility property — if answer x is feasible, then all answers &gt; x (or all &lt; x) are also feasible.</p></div><div class="learn-section"><div class="learn-h">Template</div><div class="learn-code">int lo = minPossibleAnswer, hi = maxPossibleAnswer;\nwhile (lo &lt; hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (isFeasible(mid)) {\n        hi = mid;      // try smaller\n    } else {\n        lo = mid + 1;  // need larger\n    }\n}\n// lo is the minimum feasible answer</div></div><div class="learn-section"><div class="learn-h">Classic Examples</div><p class="learn-p"><b>Koko Eating Bananas:</b> Koko must eat all bananas in h hours. Find the minimum eating speed. Binary search on speed: [1, max_pile].</p><p class="learn-p"><b>Split Array Largest Sum:</b> Split array into m subarrays to minimize the largest sum. Binary search on the answer: [max_element, total_sum].</p><p class="learn-p"><b>Aggressive Cows / Magnetic Balls:</b> Place cows in stalls to maximize minimum distance. Binary search on distance: [1, max_position - min_position].</p><div class="learn-tip"><b>Tip:</b> When a problem asks "find minimum X such that..." or "find maximum X such that...", consider binary search on answers. The feasibility check is usually an O(n) greedy function.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
using namespace std;

// Koko Eating Bananas: minimum speed to eat all in h hours
int minEatingSpeed(vector<int>& piles, int h) {
    int lo = 1, hi = *max_element(piles.begin(), piles.end());
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        long long hours = 0;
        for (int p : piles) hours += (p + mid - 1) / mid; // ceil division
        if (hours <= h) hi = mid;    // can eat slower
        else lo = mid + 1;           // need to eat faster
    }
    return lo;
}

// Split Array Largest Sum: minimize the largest subarray sum with m splits
int splitArray(vector<int>& nums, int m) {
    int lo = *max_element(nums.begin(), nums.end());
    int hi = accumulate(nums.begin(), nums.end(), 0);
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        // Count splits needed if max sum per subarray is mid
        int splits = 1, currentSum = 0;
        for (int x : nums) {
            if (currentSum + x > mid) {
                splits++;
                currentSum = x;
            } else {
                currentSum += x;
            }
        }
        if (splits <= m) hi = mid;   // can use smaller max
        else lo = mid + 1;           // need larger max
    }
    return lo;
}

// Aggressive Cows: maximize minimum distance
int aggressiveCows(vector<int>& stalls, int cows) {
    sort(stalls.begin(), stalls.end());
    int lo = 1, hi = stalls.back() - stalls.front();
    while (lo < hi) {
        int mid = lo + (hi - lo + 1) / 2; // upper mid for max search
        // Check if we can place cows with min distance = mid
        int count = 1, lastPos = stalls[0];
        for (int i = 1; i < (int)stalls.size(); i++) {
            if (stalls[i] - lastPos >= mid) {
                count++;
                lastPos = stalls[i];
            }
        }
        if (count >= cows) lo = mid;   // can try larger distance
        else hi = mid - 1;             // distance too large
    }
    return lo;
}

int main() {
    vector<int> piles = {3, 6, 7, 11};
    cout << "Min speed: " << minEatingSpeed(piles, 8) << endl; // 4

    vector<int> nums = {7, 2, 5, 10, 8};
    cout << "Min largest sum (2 splits): " << splitArray(nums, 2) << endl; // 18

    vector<int> stalls = {1, 2, 4, 8, 9};
    cout << "Max min distance (3 cows): " << aggressiveCows(stalls, 3) << endl; // 3

    return 0;
}`,
          problems: [
            ['Koko Eating Bananas', 'https://leetcode.com/problems/koko-eating-bananas/', 'Medium'],
            ['Split Array Largest Sum', 'https://leetcode.com/problems/split-array-largest-sum/', 'Hard'],
            ['Capacity To Ship Packages Within D Days', 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/', 'Medium'],
            ['Minimum Number of Days to Make m Bouquets', 'https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/', 'Medium']
          ],
          mcqs: [
            {q: 'When can you apply binary search on answers?', o: ['When the array is sorted', 'When the feasibility function is monotonic', 'Only for minimization problems', 'When elements are unique'], a: 1},
            {q: 'In "Koko Eating Bananas", what is the search space?', o: ['[0, n] where n is number of piles', '[1, max pile size]', '[1, total bananas]', '[min pile, max pile]'], a: 1},
            {q: 'What is the typical overall complexity of binary search on answers?', o: ['O(log n)', 'O(n)', 'O(n * log(answer_range))', 'O(n^2)'], a: 2}
          ]
        },
        {
          t: 'Binary Search on 2D Arrays',
          learn: '<div class="learn-section"><div class="learn-h">Searching in a Sorted Matrix</div><p class="learn-p">Two common matrix search problems appear in interviews:</p><p class="learn-p"><b>Type 1: Row-wise and column-wise sorted</b> — Each row and each column is sorted independently. Use the <b>staircase search</b> starting from top-right or bottom-left corner.</p><div class="learn-code">// Start from top-right corner\nint row = 0, col = n - 1;\nwhile (row &lt; m &amp;&amp; col &gt;= 0) {\n    if (matrix[row][col] == target) return true;\n    else if (matrix[row][col] &gt; target) col--;\n    else row++;\n}\nreturn false;</div><p class="learn-p">Time: <span class="learn-complexity">O(m + n)</span> where m = rows, n = cols.</p></div><div class="learn-section"><div class="learn-h">Type 2: Fully Sorted Matrix</div><p class="learn-p">The first element of each row is greater than the last element of the previous row. Treat the 2D matrix as a 1D sorted array:</p><div class="learn-code">int lo = 0, hi = m * n - 1;\nwhile (lo &lt;= hi) {\n    int mid = lo + (hi - lo) / 2;\n    int val = matrix[mid / n][mid % n];  // convert 1D index to 2D\n    if (val == target) return true;\n    else if (val &lt; target) lo = mid + 1;\n    else hi = mid - 1;\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(log(m * n))</span>.</p></div><div class="learn-section"><div class="learn-h">Finding Kth Smallest in Sorted Matrix</div><p class="learn-p">Binary search on the value space [matrix[0][0], matrix[m-1][n-1]]. For each candidate value, count how many elements are &lt;= it using the staircase technique.</p><div class="learn-tip"><b>Tip:</b> The key conversion for treating a 2D matrix as 1D: row = index / cols, col = index % cols.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

// Type 1: Row-wise and column-wise sorted - Staircase search
bool searchMatrix1(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int row = 0, col = n - 1; // start top-right
    while (row < m && col >= 0) {
        if (matrix[row][col] == target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}

// Type 2: Fully sorted matrix - Binary search
bool searchMatrix2(vector<vector<int>>& matrix, int target) {
    int m = matrix.size(), n = matrix[0].size();
    int lo = 0, hi = m * n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        else if (val < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}

// Kth smallest element in sorted matrix
int kthSmallest(vector<vector<int>>& matrix, int k) {
    int m = matrix.size(), n = matrix[0].size();
    int lo = matrix[0][0], hi = matrix[m-1][n-1];
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        // Count elements <= mid using staircase
        int count = 0, col = n - 1;
        for (int row = 0; row < m; row++) {
            while (col >= 0 && matrix[row][col] > mid) col--;
            count += (col + 1);
        }
        if (count < k) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

int main() {
    // Type 1: row-wise and column-wise sorted
    vector<vector<int>> mat1 = {
        {1, 4, 7, 11},
        {2, 5, 8, 12},
        {3, 6, 9, 16},
        {10, 13, 14, 17}
    };
    cout << "Search 5: " << searchMatrix1(mat1, 5) << endl;  // 1
    cout << "Search 20: " << searchMatrix1(mat1, 20) << endl; // 0

    // Type 2: fully sorted
    vector<vector<int>> mat2 = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    cout << "Search 3: " << searchMatrix2(mat2, 3) << endl;  // 1

    // Kth smallest
    vector<vector<int>> mat3 = {
        {1, 5, 9},
        {10, 11, 13},
        {12, 13, 15}
    };
    cout << "8th smallest: " << kthSmallest(mat3, 8) << endl; // 13

    return 0;
}`,
          problems: [
            ['Search a 2D Matrix', 'https://leetcode.com/problems/search-a-2d-matrix/', 'Medium'],
            ['Search a 2D Matrix II', 'https://leetcode.com/problems/search-a-2d-matrix-ii/', 'Medium'],
            ['Kth Smallest Element in a Sorted Matrix', 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', 'Medium'],
            ['Find a Peak Element II', 'https://leetcode.com/problems/find-a-peak-element-ii/', 'Medium']
          ],
          mcqs: [
            {q: 'For a row-wise and column-wise sorted matrix, what is the search complexity starting from top-right?', o: ['O(log(m*n))', 'O(m + n)', 'O(m * n)', 'O(log m * log n)'], a: 1},
            {q: 'How do you convert a 1D index to 2D coordinates in an m x n matrix?', o: ['row = index / m, col = index % m', 'row = index / n, col = index % n', 'row = index % n, col = index / n', 'row = index * n, col = index * m'], a: 1},
            {q: 'For "Kth Smallest in Sorted Matrix", what do you binary search on?', o: ['Indices', 'Row numbers', 'The value space [min, max]', 'Column numbers'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'strings', t: 'Strings',
      topics: [
        {
          t: 'String Basics & Operations',
          learn: '<div class="learn-section"><div class="learn-h">String Manipulation in Interviews</div><p class="learn-p">String problems are a staple of coding interviews. Common patterns include: frequency counting, two pointers on strings, character-level operations, and substring problems.</p></div><div class="learn-section"><div class="learn-h">Frequency Counting</div><p class="learn-p">Many string problems rely on counting character frequencies:</p><div class="learn-code">// Using array (for lowercase letters only)\nint freq[26] = {0};\nfor (char c : s) freq[c - \'a\']++;\n\n// Using unordered_map (for any characters)\nunordered_map&lt;char, int&gt; freq;\nfor (char c : s) freq[c]++;</div><p class="learn-p">The array approach is faster and uses less memory when the character set is small (e.g., lowercase English letters).</p></div><div class="learn-section"><div class="learn-h">Anagram Detection</div><p class="learn-p">Two strings are <b>anagrams</b> if they contain the same characters with the same frequencies:</p><div class="learn-code">bool isAnagram(string s, string t) {\n    if (s.size() != t.size()) return false;\n    int freq[26] = {0};\n    for (char c : s) freq[c - \'a\']++;\n    for (char c : t) freq[c - \'a\']--;\n    for (int i = 0; i &lt; 26; i++)\n        if (freq[i] != 0) return false;\n    return true;\n}</div></div><div class="learn-section"><div class="learn-h">String Reversal &amp; Palindrome Check</div><div class="learn-code">// Reverse a string in-place\nvoid reverseString(string&amp; s) {\n    int l = 0, r = s.size() - 1;\n    while (l &lt; r) swap(s[l++], s[r--]);\n}\n\n// Check palindrome (ignoring non-alphanumeric)\nbool isPalindrome(string s) {\n    int l = 0, r = s.size() - 1;\n    while (l &lt; r) {\n        while (l &lt; r &amp;&amp; !isalnum(s[l])) l++;\n        while (l &lt; r &amp;&amp; !isalnum(s[r])) r--;\n        if (tolower(s[l]) != tolower(s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}</div><div class="learn-tip"><b>Tip:</b> For string comparison problems, sorting both strings and comparing is O(n log n). Frequency counting is O(n) and usually preferred.</div></div>',
          code: `#include <iostream>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

// Check if two strings are anagrams
bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int freq[26] = {0};
    for (char c : s) freq[c - 'a']++;
    for (char c : t) freq[c - 'a']--;
    for (int i = 0; i < 26; i++)
        if (freq[i] != 0) return false;
    return true;
}

// Check palindrome (alphanumeric only)
bool isPalindrome(string s) {
    int l = 0, r = s.size() - 1;
    while (l < r) {
        while (l < r && !isalnum(s[l])) l++;
        while (l < r && !isalnum(s[r])) r--;
        if (tolower(s[l]) != tolower(s[r])) return false;
        l++; r--;
    }
    return true;
}

// Group anagrams
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    for (string& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    vector<vector<string>> result;
    for (auto& [key, group] : groups)
        result.push_back(group);
    return result;
}

// Longest common prefix
string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty()) return "";
    string prefix = strs[0];
    for (int i = 1; i < (int)strs.size(); i++) {
        while (strs[i].find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}

int main() {
    cout << "Anagram: " << isAnagram("anagram", "nagaram") << endl; // 1
    cout << "Palindrome: " << isPalindrome("A man, a plan, a canal: Panama") << endl; // 1

    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    auto groups = groupAnagrams(strs);
    for (auto& g : groups) {
        for (auto& s : g) cout << s << " ";
        cout << endl;
    }

    vector<string> words = {"flower", "flow", "flight"};
    cout << "LCP: " << longestCommonPrefix(words) << endl; // "fl"

    return 0;
}`,
          problems: [
            ['Valid Anagram', 'https://leetcode.com/problems/valid-anagram/', 'Easy'],
            ['Valid Palindrome', 'https://leetcode.com/problems/valid-palindrome/', 'Easy'],
            ['Group Anagrams', 'https://leetcode.com/problems/group-anagrams/', 'Medium'],
            ['Longest Common Prefix', 'https://leetcode.com/problems/longest-common-prefix/', 'Easy']
          ],
          mcqs: [
            {q: 'What is the most efficient way to check if two strings are anagrams?', o: ['Sort and compare O(n log n)', 'Frequency counting O(n)', 'Brute force permutation check', 'Hash the strings'], a: 1},
            {q: 'How do you access the frequency of lowercase letter c using an array?', o: ['freq[c]', 'freq[c - 0]', 'freq[c - \'a\']', 'freq[c - \'A\']'], a: 2},
            {q: 'What is the time complexity of checking if a string is a palindrome?', o: ['O(n^2)', 'O(n)', 'O(log n)', 'O(n log n)'], a: 1}
          ]
        },
        {
          t: 'Pattern Matching (KMP)',
          learn: '<div class="learn-section"><div class="learn-h">The Pattern Matching Problem</div><p class="learn-p">Given a text string and a pattern string, find all occurrences of the pattern in the text. The naive approach is <span class="learn-complexity">O(n * m)</span> where n = text length, m = pattern length.</p></div><div class="learn-section"><div class="learn-h">KMP Algorithm</div><p class="learn-p">The <b>Knuth-Morris-Pratt (KMP)</b> algorithm achieves <span class="learn-complexity">O(n + m)</span> by using a <b>failure function</b> (also called LPS array — Longest Proper Prefix which is also Suffix). The LPS array tells us how much of the pattern we can skip when a mismatch occurs.</p><div class="learn-code">// Build LPS array\nvector&lt;int&gt; buildLPS(string&amp; pattern) {\n    int m = pattern.size();\n    vector&lt;int&gt; lps(m, 0);\n    int len = 0, i = 1;\n    while (i &lt; m) {\n        if (pattern[i] == pattern[len]) {\n            lps[i++] = ++len;\n        } else if (len &gt; 0) {\n            len = lps[len - 1];  // key insight: don\'t reset len to 0\n        } else {\n            lps[i++] = 0;\n        }\n    }\n    return lps;\n}</div></div><div class="learn-section"><div class="learn-h">How KMP Works</div><p class="learn-p">Example: pattern = "ABCABD", LPS = [0,0,0,1,2,0]</p><p class="learn-p">When matching fails at position j in the pattern, instead of restarting from j=0, we jump to <code>j = lps[j-1]</code>. This skips characters we know already match.</p><div class="learn-tip"><b>Tip:</b> Understanding the LPS array is the hard part of KMP. Practice building it by hand for patterns like "AABAACAABAA".</div><div class="learn-warn"><b>Warning:</b> In interviews, you may not be asked to implement KMP from scratch, but you should know the concept and complexity. For simpler problems, <code>string::find()</code> works.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Build LPS (Longest Proper Prefix which is also Suffix) array
vector<int> buildLPS(string& pattern) {
    int m = pattern.size();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            lps[i++] = ++len;
        } else if (len > 0) {
            len = lps[len - 1]; // don't reset, use LPS
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

// KMP pattern matching - returns all starting indices of pattern in text
vector<int> kmpSearch(string& text, string& pattern) {
    vector<int> result;
    int n = text.size(), m = pattern.size();
    if (m == 0) return result;

    vector<int> lps = buildLPS(pattern);
    int i = 0, j = 0; // i for text, j for pattern
    while (i < n) {
        if (text[i] == pattern[j]) {
            i++; j++;
        }
        if (j == m) {
            result.push_back(i - m); // found match
            j = lps[j - 1];         // continue searching
        } else if (i < n && text[i] != pattern[j]) {
            if (j > 0) {
                j = lps[j - 1]; // skip matched prefix
            } else {
                i++;
            }
        }
    }
    return result;
}

// Repeated substring pattern: check if s can be formed by repeating a substring
bool repeatedSubstring(string s) {
    string doubled = s + s;
    // Remove first and last char to avoid finding s itself
    string sub = doubled.substr(1, doubled.size() - 2);
    return sub.find(s) != string::npos;
    // Alternatively, use KMP: check if LPS[n-1] > 0 and n % (n - LPS[n-1]) == 0
}

int main() {
    string text = "AABAACAADAABAABA";
    string pattern = "AABA";
    vector<int> matches = kmpSearch(text, pattern);
    cout << "Pattern found at indices: ";
    for (int idx : matches) cout << idx << " ";
    cout << endl; // 0 9 12

    // LPS array example
    string pat = "ABCABD";
    vector<int> lps = buildLPS(pat);
    cout << "LPS for " << pat << ": ";
    for (int x : lps) cout << x << " ";
    cout << endl; // 0 0 0 1 2 0

    cout << "Repeated: " << repeatedSubstring("abcabc") << endl; // 1

    return 0;
}`,
          problems: [
            ['Find the Index of the First Occurrence in a String', 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/', 'Easy'],
            ['Repeated Substring Pattern', 'https://leetcode.com/problems/repeated-substring-pattern/', 'Easy'],
            ['Shortest Palindrome', 'https://leetcode.com/problems/shortest-palindrome/', 'Hard'],
            ['Repeated String Match', 'https://leetcode.com/problems/repeated-string-match/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of the KMP algorithm?', o: ['O(n * m)', 'O(n + m)', 'O(n log m)', 'O(n^2)'], a: 1},
            {q: 'What does the LPS array represent?', o: ['Longest palindromic subsequence', 'Longest proper prefix which is also a suffix', 'Longest prefix sum', 'Length of pattern suffix'], a: 1},
            {q: 'When a mismatch occurs at pattern position j, where does KMP jump to?', o: ['j = 0', 'j = j - 1', 'j = lps[j - 1]', 'j = lps[j]'], a: 2}
          ]
        },
        {
          t: 'Palindrome Problems',
          learn: '<div class="learn-section"><div class="learn-h">Palindrome Concepts</div><p class="learn-p">A <b>palindrome</b> reads the same forwards and backwards. Palindrome problems are extremely popular in interviews.</p></div><div class="learn-section"><div class="learn-h">Expand Around Center</div><p class="learn-p">To find the <b>Longest Palindromic Substring</b>, expand from each center. There are 2n-1 possible centers (n single characters + n-1 gaps between characters for even-length palindromes).</p><div class="learn-code">string longestPalindrome(string s) {\n    int start = 0, maxLen = 1;\n    auto expand = [&amp;](int l, int r) {\n        while (l &gt;= 0 &amp;&amp; r &lt; s.size() &amp;&amp; s[l] == s[r]) {\n            if (r - l + 1 &gt; maxLen) {\n                start = l;\n                maxLen = r - l + 1;\n            }\n            l--; r++;\n        }\n    };\n    for (int i = 0; i &lt; s.size(); i++) {\n        expand(i, i);     // odd-length\n        expand(i, i + 1); // even-length\n    }\n    return s.substr(start, maxLen);\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(n^2)</span>, Space: <span class="learn-complexity">O(1)</span>.</p></div><div class="learn-section"><div class="learn-h">Palindrome Partitioning</div><p class="learn-p">Split a string into substrings where each substring is a palindrome. Uses backtracking.</p></div><div class="learn-section"><div class="learn-h">Valid Palindrome Variations</div><ul class="learn-list"><li><b>Valid Palindrome II:</b> Can you make it a palindrome by removing at most one character? Use two pointers; on mismatch, try skipping either character.</li><li><b>Palindromic Substrings:</b> Count all palindromic substrings using expand around center.</li></ul><div class="learn-tip"><b>Tip:</b> For palindrome problems, the expand-around-center technique is the most intuitive approach. For more advanced needs, look into Manacher\'s algorithm for O(n).</div></div>',
          code: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Longest Palindromic Substring - Expand Around Center
string longestPalindrome(string s) {
    int n = s.size(), start = 0, maxLen = 1;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);     // odd length
        expand(i, i + 1); // even length
    }
    return s.substr(start, maxLen);
}

// Count all palindromic substrings
int countSubstrings(string s) {
    int n = s.size(), count = 0;
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            count++;
            l--; r++;
        }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return count;
}

// Valid Palindrome II - at most one deletion
bool validPalindrome(string s) {
    auto isPalin = [&](int l, int r) {
        while (l < r) {
            if (s[l] != s[r]) return false;
            l++; r--;
        }
        return true;
    };
    int l = 0, r = s.size() - 1;
    while (l < r) {
        if (s[l] != s[r])
            return isPalin(l + 1, r) || isPalin(l, r - 1);
        l++; r--;
    }
    return true;
}

// Palindrome Partitioning using backtracking
void partitionHelper(string& s, int start, vector<string>& current,
                     vector<vector<string>>& result) {
    if (start == (int)s.size()) {
        result.push_back(current);
        return;
    }
    for (int end = start; end < (int)s.size(); end++) {
        // Check if s[start..end] is palindrome
        string sub = s.substr(start, end - start + 1);
        string rev = sub;
        reverse(rev.begin(), rev.end());
        if (sub == rev) {
            current.push_back(sub);
            partitionHelper(s, end + 1, current, result);
            current.pop_back();
        }
    }
}

int main() {
    cout << "Longest: " << longestPalindrome("babad") << endl; // "bab" or "aba"
    cout << "Count: " << countSubstrings("aaa") << endl; // 6
    cout << "Valid II: " << validPalindrome("abca") << endl; // 1

    string s = "aab";
    vector<vector<string>> partitions;
    vector<string> current;
    partitionHelper(s, 0, current, partitions);
    for (auto& p : partitions) {
        for (auto& w : p) cout << w << " ";
        cout << endl;
    }

    return 0;
}`,
          problems: [
            ['Longest Palindromic Substring', 'https://leetcode.com/problems/longest-palindromic-substring/', 'Medium'],
            ['Palindromic Substrings', 'https://leetcode.com/problems/palindromic-substrings/', 'Medium'],
            ['Valid Palindrome II', 'https://leetcode.com/problems/valid-palindrome-ii/', 'Easy'],
            ['Palindrome Partitioning', 'https://leetcode.com/problems/palindrome-partitioning/', 'Medium'],
            ['Longest Palindromic Subsequence', 'https://leetcode.com/problems/longest-palindromic-subsequence/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of the expand-around-center approach?', o: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(n log n)'], a: 1},
            {q: 'How many centers are there for palindrome expansion in a string of length n?', o: ['n', 'n - 1', '2n - 1', '2n'], a: 2},
            {q: 'In Valid Palindrome II, what do you do when a mismatch is found?', o: ['Return false immediately', 'Remove both mismatched characters', 'Try removing either the left or right character', 'Reverse the string'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'll', t: 'Linked Lists',
      topics: [
        {
          t: 'Singly Linked List',
          learn: '<div class="learn-section"><div class="learn-h">Structure of a Singly Linked List</div><p class="learn-p">A <b>singly linked list</b> is a linear data structure where each element (node) contains a value and a pointer to the next node. Unlike arrays, linked lists do not store elements in contiguous memory.</p><div class="learn-code">struct ListNode {\n    int val;\n    ListNode* next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};</div><table class="learn-table"><tr><th>Operation</th><th>Array</th><th>Linked List</th></tr><tr><td>Access by index</td><td><span class="learn-complexity">O(1)</span></td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>Insert at head</td><td><span class="learn-complexity">O(n)</span></td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>Insert at tail</td><td><span class="learn-complexity">O(1)</span> amortized</td><td><span class="learn-complexity">O(n)</span> or <span class="learn-complexity">O(1)</span> with tail pointer</td></tr><tr><td>Delete a node</td><td><span class="learn-complexity">O(n)</span></td><td><span class="learn-complexity">O(1)</span> if pointer given</td></tr></table></div><div class="learn-section"><div class="learn-h">Reversing a Linked List</div><p class="learn-p">The most common linked list operation in interviews. Use three pointers: prev, curr, next.</p><div class="learn-code">ListNode* reverse(ListNode* head) {\n    ListNode* prev = nullptr;\n    ListNode* curr = head;\n    while (curr) {\n        ListNode* next = curr-&gt;next;\n        curr-&gt;next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;  // new head\n}</div></div><div class="learn-section"><div class="learn-h">Dummy Head Technique</div><p class="learn-p">A <b>dummy node</b> before the real head simplifies edge cases (inserting/deleting at head):</p><div class="learn-code">ListNode dummy(0);\ndummy.next = head;\n// ... do operations ...\nreturn dummy.next;  // actual head</div><div class="learn-tip"><b>Tip:</b> Use a dummy head whenever the head node might change during the operation. It eliminates special-case handling.</div></div>',
          code: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Insert at head
ListNode* insertHead(ListNode* head, int val) {
    ListNode* node = new ListNode(val);
    node->next = head;
    return node;
}

// Insert at tail
ListNode* insertTail(ListNode* head, int val) {
    ListNode* node = new ListNode(val);
    if (!head) return node;
    ListNode* curr = head;
    while (curr->next) curr = curr->next;
    curr->next = node;
    return head;
}

// Delete a value
ListNode* deleteNode(ListNode* head, int val) {
    ListNode dummy(0);
    dummy.next = head;
    ListNode* prev = &dummy;
    ListNode* curr = head;
    while (curr) {
        if (curr->val == val) {
            prev->next = curr->next;
            delete curr;
            break;
        }
        prev = curr;
        curr = curr->next;
    }
    return dummy.next;
}

// Reverse linked list (iterative)
ListNode* reverse(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;
    while (curr) {
        ListNode* next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Merge two sorted lists
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

// Print list
void printList(ListNode* head) {
    while (head) { cout << head->val << " -> "; head = head->next; }
    cout << "NULL" << endl;
}

int main() {
    ListNode* head = nullptr;
    for (int i = 5; i >= 1; i--) head = insertHead(head, i);
    printList(head);           // 1 -> 2 -> 3 -> 4 -> 5 -> NULL
    head = reverse(head);
    printList(head);           // 5 -> 4 -> 3 -> 2 -> 1 -> NULL
    head = deleteNode(head, 3);
    printList(head);           // 5 -> 4 -> 2 -> 1 -> NULL
    return 0;
}`,
          problems: [
            ['Reverse Linked List', 'https://leetcode.com/problems/reverse-linked-list/', 'Easy'],
            ['Merge Two Sorted Lists', 'https://leetcode.com/problems/merge-two-sorted-lists/', 'Easy'],
            ['Remove Nth Node From End of List', 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', 'Medium'],
            ['Add Two Numbers', 'https://leetcode.com/problems/add-two-numbers/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of accessing the kth element in a singly linked list?', o: ['O(1)', 'O(log n)', 'O(k)', 'O(n)'], a: 2},
            {q: 'How many pointers are needed to reverse a singly linked list iteratively?', o: ['1', '2', '3', '4'], a: 2},
            {q: 'What is the purpose of a dummy head node?', o: ['To store the length', 'To simplify edge cases when the head might change', 'To make the list circular', 'To speed up traversal'], a: 1}
          ]
        },
        {
          t: 'Doubly Linked List',
          learn: '<div class="learn-section"><div class="learn-h">Structure</div><p class="learn-p">A <b>doubly linked list</b> has nodes with pointers to both the <b>next</b> and <b>previous</b> nodes. This allows traversal in both directions and makes deletion <span class="learn-complexity">O(1)</span> when you have a pointer to the node.</p><div class="learn-code">struct DLLNode {\n    int val;\n    DLLNode* prev;\n    DLLNode* next;\n    DLLNode(int x) : val(x), prev(nullptr), next(nullptr) {}\n};</div></div><div class="learn-section"><div class="learn-h">Operations</div><p class="learn-p">Insertion and deletion are straightforward but require updating both prev and next pointers:</p><div class="learn-code">// Insert after a given node\nvoid insertAfter(DLLNode* node, int val) {\n    DLLNode* newNode = new DLLNode(val);\n    newNode-&gt;next = node-&gt;next;\n    newNode-&gt;prev = node;\n    if (node-&gt;next) node-&gt;next-&gt;prev = newNode;\n    node-&gt;next = newNode;\n}\n\n// Delete a node (given pointer to it)\nvoid deleteNode(DLLNode* node) {\n    if (node-&gt;prev) node-&gt;prev-&gt;next = node-&gt;next;\n    if (node-&gt;next) node-&gt;next-&gt;prev = node-&gt;prev;\n    delete node;\n}</div></div><div class="learn-section"><div class="learn-h">LRU Cache — Key Application</div><p class="learn-p">The <b>LRU Cache</b> is the most important doubly linked list problem. It uses a hash map + doubly linked list to achieve <span class="learn-complexity">O(1)</span> get and put operations.</p><p class="learn-p">The doubly linked list maintains access order (most recent at head, least recent at tail). The hash map provides O(1) lookup by key.</p><div class="learn-tip"><b>Tip:</b> DLL is used in LRU Cache because it provides O(1) removal of any node (given a pointer) and O(1) insertion at head/tail. A singly linked list cannot delete in O(1).</div></div>',
          code: `#include <iostream>
#include <unordered_map>
using namespace std;

// LRU Cache using Doubly Linked List + HashMap
class LRUCache {
    struct Node {
        int key, val;
        Node* prev;
        Node* next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };

    int capacity;
    unordered_map<int, Node*> map;
    Node* head; // dummy head (most recent)
    Node* tail; // dummy tail (least recent)

    void addToFront(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }

    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void moveToFront(Node* node) {
        removeNode(node);
        addToFront(node);
    }

public:
    LRUCache(int cap) : capacity(cap) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (!map.count(key)) return -1;
        Node* node = map[key];
        moveToFront(node);
        return node->val;
    }

    void put(int key, int value) {
        if (map.count(key)) {
            map[key]->val = value;
            moveToFront(map[key]);
            return;
        }
        if ((int)map.size() == capacity) {
            Node* lru = tail->prev; // least recently used
            removeNode(lru);
            map.erase(lru->key);
            delete lru;
        }
        Node* node = new Node(key, value);
        addToFront(node);
        map[key] = node;
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl;  // 1
    cache.put(3, 3);               // evicts key 2
    cout << cache.get(2) << endl;  // -1
    cache.put(4, 4);               // evicts key 1
    cout << cache.get(1) << endl;  // -1
    cout << cache.get(3) << endl;  // 3
    cout << cache.get(4) << endl;  // 4
    return 0;
}`,
          problems: [
            ['LRU Cache', 'https://leetcode.com/problems/lru-cache/', 'Medium'],
            ['Design Linked List', 'https://leetcode.com/problems/design-linked-list/', 'Medium'],
            ['Flatten a Multilevel Doubly Linked List', 'https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/', 'Medium'],
            ['LFU Cache', 'https://leetcode.com/problems/lfu-cache/', 'Hard']
          ],
          mcqs: [
            {q: 'What advantage does a doubly linked list have over a singly linked list?', o: ['Uses less memory', 'Faster traversal', 'O(1) deletion of any node given a pointer to it', 'Better cache performance'], a: 2},
            {q: 'In an LRU Cache, what data structures are combined?', o: ['Array + Stack', 'HashMap + Doubly Linked List', 'BST + Queue', 'HashMap + Array'], a: 1},
            {q: 'Why are dummy head and tail nodes used in LRU Cache?', o: ['To store the cache size', 'To eliminate null pointer checks when adding/removing nodes', 'To make the list circular', 'To improve cache hit ratio'], a: 1}
          ]
        },
        {
          t: 'Fast & Slow Pointers',
          learn: '<div class="learn-section"><div class="learn-h">Floyd\'s Cycle Detection</div><p class="learn-p">The <b>Fast &amp; Slow Pointer</b> (tortoise and hare) technique uses two pointers moving at different speeds. The slow pointer moves one step at a time; the fast pointer moves two steps.</p><p class="learn-p"><b>Cycle Detection:</b> If there is a cycle, the fast pointer will eventually meet the slow pointer. If fast reaches null, there is no cycle.</p><div class="learn-code">bool hasCycle(ListNode* head) {\n    ListNode* slow = head;\n    ListNode* fast = head;\n    while (fast &amp;&amp; fast-&gt;next) {\n        slow = slow-&gt;next;\n        fast = fast-&gt;next-&gt;next;\n        if (slow == fast) return true;\n    }\n    return false;\n}</div></div><div class="learn-section"><div class="learn-h">Finding the Cycle Start</div><p class="learn-p">After detection, reset one pointer to head. Then move both one step at a time — they meet at the cycle start.</p><div class="learn-code">ListNode* detectCycleStart(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast &amp;&amp; fast-&gt;next) {\n        slow = slow-&gt;next;\n        fast = fast-&gt;next-&gt;next;\n        if (slow == fast) {\n            slow = head;\n            while (slow != fast) {\n                slow = slow-&gt;next;\n                fast = fast-&gt;next;\n            }\n            return slow;\n        }\n    }\n    return nullptr;\n}</div></div><div class="learn-section"><div class="learn-h">Finding the Middle Node</div><p class="learn-p">When fast reaches the end, slow is at the middle:</p><div class="learn-code">ListNode* middleNode(ListNode* head) {\n    ListNode *slow = head, *fast = head;\n    while (fast &amp;&amp; fast-&gt;next) {\n        slow = slow-&gt;next;\n        fast = fast-&gt;next-&gt;next;\n    }\n    return slow;  // middle node\n}</div><div class="learn-tip"><b>Tip:</b> Finding the middle node is often a building block for other problems: merge sort on linked lists, checking if a linked list is a palindrome, etc.</div></div>',
          code: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Detect cycle
bool hasCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

// Find cycle start
ListNode* detectCycleStart(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow;
        }
    }
    return nullptr;
}

// Find middle node
ListNode* middleNode(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

// Check if palindrome (uses middle + reverse)
bool isPalindrome(ListNode* head) {
    ListNode* mid = middleNode(head);
    // Reverse second half
    ListNode* prev = nullptr;
    while (mid) {
        ListNode* next = mid->next;
        mid->next = prev;
        prev = mid;
        mid = next;
    }
    // Compare
    ListNode *l = head, *r = prev;
    while (r) {
        if (l->val != r->val) return false;
        l = l->next;
        r = r->next;
    }
    return true;
}

int main() {
    // Create list: 1->2->3->4->5
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);

    cout << "Middle: " << middleNode(head)->val << endl; // 3
    cout << "Has cycle: " << hasCycle(head) << endl; // 0

    // Palindrome: 1->2->2->1
    ListNode* pal = new ListNode(1);
    pal->next = new ListNode(2);
    pal->next->next = new ListNode(2);
    pal->next->next->next = new ListNode(1);
    cout << "Palindrome: " << isPalindrome(pal) << endl; // 1

    return 0;
}`,
          problems: [
            ['Linked List Cycle', 'https://leetcode.com/problems/linked-list-cycle/', 'Easy'],
            ['Linked List Cycle II', 'https://leetcode.com/problems/linked-list-cycle-ii/', 'Medium'],
            ['Middle of the Linked List', 'https://leetcode.com/problems/middle-of-the-linked-list/', 'Easy'],
            ['Palindrome Linked List', 'https://leetcode.com/problems/palindrome-linked-list/', 'Easy'],
            ['Find the Duplicate Number', 'https://leetcode.com/problems/find-the-duplicate-number/', 'Medium']
          ],
          mcqs: [
            {q: 'In Floyd\'s cycle detection, why does the fast pointer move 2 steps?', o: ['To save time', 'Any speed > 1 works; 2 is simplest and guarantees meeting in the cycle', 'The cycle must have even length', 'It must be exactly twice the slow speed'], a: 1},
            {q: 'After detecting a cycle, how do you find where it starts?', o: ['Reset both pointers to head', 'Reset one pointer to head, move both at speed 1 until they meet', 'Count the cycle length', 'Use a hash set'], a: 1},
            {q: 'When fast reaches the end of the list, where is slow?', o: ['At the head', 'At the tail', 'At the middle', 'At 1/3 of the list'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'stq', t: 'Stacks & Queues',
      topics: [
        {
          t: 'Stack Basics & Implementation',
          learn: '<div class="learn-section"><div class="learn-h">What is a Stack?</div><p class="learn-p">A <b>stack</b> is a <b>LIFO</b> (Last In, First Out) data structure. Think of a stack of plates — you can only add or remove from the top.</p><table class="learn-table"><tr><th>Operation</th><th>Complexity</th></tr><tr><td>push(x)</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>pop()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>top()/peek()</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>empty()</td><td><span class="learn-complexity">O(1)</span></td></tr></table><div class="learn-code">#include &lt;stack&gt;\nstack&lt;int&gt; st;\nst.push(10);\nst.push(20);\ncout &lt;&lt; st.top();  // 20\nst.pop();           // removes 20</div></div><div class="learn-section"><div class="learn-h">Classic Stack Problems</div><p class="learn-p"><b>Valid Parentheses:</b> Push opening brackets, pop and match on closing brackets.</p><div class="learn-code">bool isValid(string s) {\n    stack&lt;char&gt; st;\n    for (char c : s) {\n        if (c == \'(\' || c == \'[\' || c == \'{\') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top(); st.pop();\n            if (c == \')\' &amp;&amp; top != \'(\') return false;\n            if (c == \']\' &amp;&amp; top != \'[\') return false;\n            if (c == \'}\' &amp;&amp; top != \'{\') return false;\n        }\n    }\n    return st.empty();\n}</div></div><div class="learn-section"><div class="learn-h">Min Stack</div><p class="learn-p">Design a stack that supports getMin() in O(1). Use an auxiliary stack to track minimums.</p><div class="learn-tip"><b>Tip:</b> Stacks are the go-to for matching pairs (parentheses), processing in reverse order, and DFS (iterative).</div></div>',
          code: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

// Valid Parentheses
bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) return false;
        }
    }
    return st.empty();
}

// Min Stack
class MinStack {
    stack<int> dataStack;
    stack<int> minStack;
public:
    void push(int val) {
        dataStack.push(val);
        if (minStack.empty() || val <= minStack.top())
            minStack.push(val);
    }
    void pop() {
        if (dataStack.top() == minStack.top())
            minStack.pop();
        dataStack.pop();
    }
    int top() { return dataStack.top(); }
    int getMin() { return minStack.top(); }
};

// Evaluate Reverse Polish Notation
int evalRPN(vector<string>& tokens) {
    stack<int> st;
    for (auto& t : tokens) {
        if (t == "+" || t == "-" || t == "*" || t == "/") {
            int b = st.top(); st.pop();
            int a = st.top(); st.pop();
            if (t == "+") st.push(a + b);
            else if (t == "-") st.push(a - b);
            else if (t == "*") st.push(a * b);
            else st.push(a / b);
        } else {
            st.push(stoi(t));
        }
    }
    return st.top();
}

int main() {
    cout << "Valid: " << isValid("({[]})") << endl;  // 1
    cout << "Invalid: " << isValid("([)]") << endl;  // 0

    MinStack ms;
    ms.push(5); ms.push(3); ms.push(7);
    cout << "Min: " << ms.getMin() << endl;  // 3
    ms.pop();
    cout << "Min: " << ms.getMin() << endl;  // 3
    ms.pop();
    cout << "Min: " << ms.getMin() << endl;  // 5

    return 0;
}`,
          problems: [
            ['Valid Parentheses', 'https://leetcode.com/problems/valid-parentheses/', 'Easy'],
            ['Min Stack', 'https://leetcode.com/problems/min-stack/', 'Medium'],
            ['Evaluate Reverse Polish Notation', 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', 'Medium'],
            ['Daily Temperatures', 'https://leetcode.com/problems/daily-temperatures/', 'Medium']
          ],
          mcqs: [
            {q: 'What does LIFO stand for?', o: ['Last In First Out', 'Last In Final Output', 'Linear Input First Output', 'Linked In First Out'], a: 0},
            {q: 'How can getMin() be O(1) in a Min Stack?', o: ['Sort the stack', 'Use a binary search tree', 'Maintain an auxiliary stack tracking current minimums', 'Store min value in each node'], a: 2},
            {q: 'What is the space complexity of the valid parentheses solution?', o: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'], a: 1}
          ]
        },
        {
          t: 'Monotonic Stack',
          learn: '<div class="learn-section"><div class="learn-h">What is a Monotonic Stack?</div><p class="learn-p">A <b>monotonic stack</b> is a stack that maintains its elements in either increasing or decreasing order. When pushing a new element, we pop all elements that violate the monotonic property.</p><p class="learn-p"><b>Monotone Increasing Stack:</b> Elements from bottom to top are in increasing order. Used to find the next smaller element.</p><p class="learn-p"><b>Monotone Decreasing Stack:</b> Elements from bottom to top are in decreasing order. Used to find the next greater element.</p></div><div class="learn-section"><div class="learn-h">Template</div><div class="learn-code">stack&lt;int&gt; st;  // stores indices\nfor (int i = 0; i &lt; n; i++) {\n    while (!st.empty() &amp;&amp; arr[st.top()] &lt; arr[i]) {\n        // arr[i] is the next greater element for arr[st.top()]\n        result[st.top()] = arr[i];\n        st.pop();\n    }\n    st.push(i);\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(n)</span> — each element is pushed and popped at most once.</p></div><div class="learn-section"><div class="learn-h">Applications</div><ul class="learn-list"><li><b>Next Greater Element:</b> Find the first larger element to the right</li><li><b>Daily Temperatures:</b> How many days until a warmer temperature</li><li><b>Largest Rectangle in Histogram:</b> Use monotonic increasing stack of heights</li><li><b>Trapping Rain Water:</b> Can be solved with monotonic stack</li></ul><div class="learn-tip"><b>Tip:</b> Store <b>indices</b> in the stack, not values. This gives you both the value (via the array) and the position.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// Daily Temperatures - days until warmer temperature
vector<int> dailyTemperatures(vector<int>& temps) {
    int n = temps.size();
    vector<int> result(n, 0);
    stack<int> st; // monotone decreasing stack of indices
    for (int i = 0; i < n; i++) {
        while (!st.empty() && temps[st.top()] < temps[i]) {
            result[st.top()] = i - st.top();
            st.pop();
        }
        st.push(i);
    }
    return result;
}

// Largest Rectangle in Histogram
int largestRectangleArea(vector<int>& heights) {
    stack<int> st;
    int maxArea = 0;
    int n = heights.size();
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && heights[st.top()] > h) {
            int height = heights[st.top()];
            st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }
        st.push(i);
    }
    return maxArea;
}

int main() {
    vector<int> temps = {73, 74, 75, 71, 69, 72, 76, 73};
    auto days = dailyTemperatures(temps);
    cout << "Days until warmer: ";
    for (int d : days) cout << d << " ";
    cout << endl; // 1 1 4 2 1 1 0 0

    vector<int> heights = {2, 1, 5, 6, 2, 3};
    cout << "Largest rectangle: " << largestRectangleArea(heights) << endl; // 10

    return 0;
}`,
          problems: [
            ['Daily Temperatures', 'https://leetcode.com/problems/daily-temperatures/', 'Medium'],
            ['Largest Rectangle in Histogram', 'https://leetcode.com/problems/largest-rectangle-in-histogram/', 'Hard'],
            ['Trapping Rain Water', 'https://leetcode.com/problems/trapping-rain-water/', 'Hard'],
            ['Online Stock Span', 'https://leetcode.com/problems/online-stock-span/', 'Medium']
          ],
          mcqs: [
            {q: 'Why is the monotonic stack approach O(n)?', o: ['The stack never has more than 1 element', 'Each element is pushed and popped at most once', 'We only iterate once', 'The stack uses a hash map'], a: 1},
            {q: 'What should you store in a monotonic stack?', o: ['Values only', 'Indices (which also give access to values)', 'Pairs of value and index', 'It does not matter'], a: 1},
            {q: 'For finding the next greater element to the right, what type of monotonic stack is used?', o: ['Increasing (bottom to top)', 'Decreasing (bottom to top)', 'Either works', 'Neither'], a: 1}
          ]
        },
        {
          t: 'Next Greater Element',
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">For each element in an array, find the <b>next greater element</b> — the first element to its right that is larger. If none exists, answer is -1.</p></div><div class="learn-section"><div class="learn-h">Approach</div><p class="learn-p">Traverse from right to left (or left to right) maintaining a monotonic decreasing stack:</p><div class="learn-code">vector&lt;int&gt; nextGreater(vector&lt;int&gt;&amp; arr) {\n    int n = arr.size();\n    vector&lt;int&gt; result(n, -1);\n    stack&lt;int&gt; st;\n    for (int i = n - 1; i &gt;= 0; i--) {\n        while (!st.empty() &amp;&amp; st.top() &lt;= arr[i])\n            st.pop();\n        if (!st.empty()) result[i] = st.top();\n        st.push(arr[i]);\n    }\n    return result;\n}</div></div><div class="learn-section"><div class="learn-h">Circular Array Variant</div><p class="learn-p">For a circular array, iterate twice (2n iterations) and use modulo indexing:</p><div class="learn-code">for (int i = 2*n - 1; i &gt;= 0; i--) {\n    while (!st.empty() &amp;&amp; st.top() &lt;= arr[i % n])\n        st.pop();\n    if (i &lt; n) result[i] = st.empty() ? -1 : st.top();\n    st.push(arr[i % n]);\n}</div><div class="learn-tip"><b>Tip:</b> The circular variant is a common follow-up. Double the traversal and use modulo to simulate the circular property.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// Next Greater Element (right to left approach)
vector<int> nextGreaterElement(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i])
            st.pop();
        if (!st.empty()) result[i] = st.top();
        st.push(arr[i]);
    }
    return result;
}

// Next Greater Element - Circular Array
vector<int> nextGreaterCircular(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;
    for (int i = 2 * n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i % n])
            st.pop();
        if (i < n && !st.empty()) result[i] = st.top();
        st.push(arr[i % n]);
    }
    return result;
}

// Previous Smaller Element
vector<int> prevSmaller(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && st.top() >= arr[i])
            st.pop();
        if (!st.empty()) result[i] = st.top();
        st.push(arr[i]);
    }
    return result;
}

int main() {
    vector<int> arr = {4, 5, 2, 25};
    auto nge = nextGreaterElement(arr);
    cout << "NGE: ";
    for (int x : nge) cout << x << " ";
    cout << endl; // 5 25 25 -1

    vector<int> circ = {1, 2, 1};
    auto ngeCirc = nextGreaterCircular(circ);
    cout << "NGE Circular: ";
    for (int x : ngeCirc) cout << x << " ";
    cout << endl; // 2 -1 2

    auto ps = prevSmaller(arr);
    cout << "Prev Smaller: ";
    for (int x : ps) cout << x << " ";
    cout << endl; // -1 4 -1 2

    return 0;
}`,
          problems: [
            ['Next Greater Element I', 'https://leetcode.com/problems/next-greater-element-i/', 'Easy'],
            ['Next Greater Element II', 'https://leetcode.com/problems/next-greater-element-ii/', 'Medium'],
            ['Next Greater Element III', 'https://leetcode.com/problems/next-greater-element-iii/', 'Medium'],
            ['Sum of Subarray Minimums', 'https://leetcode.com/problems/sum-of-subarray-minimums/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the next greater element for 2 in [4, 5, 2, 25]?', o: ['4', '5', '25', '-1'], a: 2},
            {q: 'How do you handle a circular array for NGE?', o: ['Sort the array', 'Iterate 2n times with modulo indexing', 'Use two stacks', 'Reverse the array'], a: 1},
            {q: 'What is the overall time complexity of finding NGE for all elements?', o: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(1)'], a: 2}
          ]
        },
        {
          t: 'Queue using Stacks',
          learn: '<div class="learn-section"><div class="learn-h">Implementing a Queue using Two Stacks</div><p class="learn-p">A <b>queue</b> is FIFO (First In, First Out). We can implement it using two stacks. There are two approaches:</p><p class="learn-p"><b>Approach 1: Expensive enqueue</b> — Transfer all from s1 to s2, push new element to s1, transfer back.</p><p class="learn-p"><b>Approach 2: Amortized O(1) dequeue</b> — Push to input stack. For dequeue, if output stack is empty, transfer all from input to output. This reverses the order, giving FIFO behavior.</p><div class="learn-code">class MyQueue {\n    stack&lt;int&gt; input, output;\n    void transfer() {\n        while (!input.empty()) {\n            output.push(input.top());\n            input.pop();\n        }\n    }\npublic:\n    void push(int x) { input.push(x); }\n    int pop() {\n        if (output.empty()) transfer();\n        int val = output.top(); output.pop();\n        return val;\n    }\n    int peek() {\n        if (output.empty()) transfer();\n        return output.top();\n    }\n    bool empty() { return input.empty() &amp;&amp; output.empty(); }\n};</div><p class="learn-p">Each element is moved at most once from input to output, so amortized cost per operation is <span class="learn-complexity">O(1)</span>.</p><div class="learn-tip"><b>Tip:</b> The key insight is lazy transfer — only move elements when the output stack is empty.</div></div>',
          code: `#include <iostream>
#include <stack>
using namespace std;

class MyQueue {
    stack<int> input, output;
    void transfer() {
        while (!input.empty()) {
            output.push(input.top());
            input.pop();
        }
    }
public:
    void push(int x) {
        input.push(x);
    }
    int pop() {
        if (output.empty()) transfer();
        int val = output.top();
        output.pop();
        return val;
    }
    int peek() {
        if (output.empty()) transfer();
        return output.top();
    }
    bool empty() {
        return input.empty() && output.empty();
    }
};

// Stack using two queues
class MyStack {
    queue<int> q1, q2;
public:
    void push(int x) {
        q2.push(x);
        while (!q1.empty()) {
            q2.push(q1.front());
            q1.pop();
        }
        swap(q1, q2);
    }
    int pop() {
        int val = q1.front();
        q1.pop();
        return val;
    }
    int top() { return q1.front(); }
    bool empty() { return q1.empty(); }
};

int main() {
    MyQueue q;
    q.push(1);
    q.push(2);
    q.push(3);
    cout << q.peek() << endl;  // 1
    cout << q.pop() << endl;   // 1
    cout << q.pop() << endl;   // 2
    q.push(4);
    cout << q.pop() << endl;   // 3
    cout << q.pop() << endl;   // 4
    return 0;
}`,
          problems: [
            ['Implement Queue using Stacks', 'https://leetcode.com/problems/implement-queue-using-stacks/', 'Easy'],
            ['Implement Stack using Queues', 'https://leetcode.com/problems/implement-stack-using-queues/', 'Easy'],
            ['Design Circular Queue', 'https://leetcode.com/problems/design-circular-queue/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the amortized time complexity of dequeue in a two-stack queue?', o: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'], a: 1},
            {q: 'When do you transfer elements from input stack to output stack?', o: ['Every push operation', 'Every pop operation', 'Only when output stack is empty', 'Never'], a: 2},
            {q: 'Why does transferring from one stack to another reverse the order?', o: ['Stacks maintain insertion order', 'LIFO property reverses the sequence', 'It depends on implementation', 'It does not reverse the order'], a: 1}
          ]
        },
        {
          t: 'Deque Problems',
          learn: '<div class="learn-section"><div class="learn-h">Deque (Double-Ended Queue)</div><p class="learn-p">A <b>deque</b> allows insertion and removal from both ends in <span class="learn-complexity">O(1)</span>. In C++, use <code>deque&lt;T&gt;</code>.</p><div class="learn-code">#include &lt;deque&gt;\ndeque&lt;int&gt; dq;\ndq.push_back(1);   dq.push_front(0);\ndq.pop_back();     dq.pop_front();\ndq.front();        dq.back();</div></div><div class="learn-section"><div class="learn-h">Sliding Window Maximum</div><p class="learn-p">The most classic deque problem: find the maximum in each window of size k. Use a <b>monotonic deque</b> that stores indices in decreasing order of values:</p><div class="learn-code">vector&lt;int&gt; maxSlidingWindow(vector&lt;int&gt;&amp; nums, int k) {\n    deque&lt;int&gt; dq;  // stores indices\n    vector&lt;int&gt; result;\n    for (int i = 0; i &lt; nums.size(); i++) {\n        // Remove indices outside window\n        while (!dq.empty() &amp;&amp; dq.front() &lt; i - k + 1)\n            dq.pop_front();\n        // Remove smaller elements from back\n        while (!dq.empty() &amp;&amp; nums[dq.back()] &lt; nums[i])\n            dq.pop_back();\n        dq.push_back(i);\n        if (i &gt;= k - 1)\n            result.push_back(nums[dq.front()]);\n    }\n    return result;\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(n)</span>. Each element is added and removed from the deque at most once.</p><div class="learn-tip"><b>Tip:</b> The monotonic deque is essentially a monotonic stack that also allows removal from the front (to handle the sliding window constraint).</div></div>',
          code: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

// Sliding Window Maximum
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // indices in decreasing order of values
    vector<int> result;
    for (int i = 0; i < (int)nums.size(); i++) {
        // Remove out-of-window indices
        while (!dq.empty() && dq.front() < i - k + 1)
            dq.pop_front();
        // Maintain decreasing order
        while (!dq.empty() && nums[dq.back()] < nums[i])
            dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }
    return result;
}

// Sliding Window Minimum (same idea, flip comparison)
vector<int> minSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < (int)nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1)
            dq.pop_front();
        while (!dq.empty() && nums[dq.back()] > nums[i])
            dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1)
            result.push_back(nums[dq.front()]);
    }
    return result;
}

int main() {
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    auto result = maxSlidingWindow(nums, k);
    cout << "Sliding max: ";
    for (int x : result) cout << x << " ";
    cout << endl; // 3 3 5 5 6 7

    auto minResult = minSlidingWindow(nums, k);
    cout << "Sliding min: ";
    for (int x : minResult) cout << x << " ";
    cout << endl; // -1 -3 -3 -3 3 3

    return 0;
}`,
          problems: [
            ['Sliding Window Maximum', 'https://leetcode.com/problems/sliding-window-maximum/', 'Hard'],
            ['Shortest Subarray with Sum at Least K', 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/', 'Hard'],
            ['Design Circular Deque', 'https://leetcode.com/problems/design-circular-deque/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of the sliding window maximum using a deque?', o: ['O(n * k)', 'O(n log k)', 'O(n)', 'O(k)'], a: 2},
            {q: 'What order does the monotonic deque maintain for sliding window maximum?', o: ['Increasing values from front to back', 'Decreasing values from front to back', 'Sorted by index only', 'No particular order'], a: 1},
            {q: 'Why is a deque needed instead of a stack for sliding window problems?', o: ['Deques are faster', 'Need to remove expired elements from the front', 'Stacks cannot store indices', 'No particular reason'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'recursion', t: 'Recursion',
      topics: [
        {
          t: 'Recursion Basics & Patterns',
          learn: '<div class="learn-section"><div class="learn-h">Thinking Recursively</div><p class="learn-p">Recursion solves a problem by breaking it into smaller subproblems of the same type. The three essential components:</p><ol class="learn-list"><li><b>Base case:</b> When to stop (prevents infinite recursion)</li><li><b>Recursive case:</b> Break the problem into smaller instances</li><li><b>Trust the recursion:</b> Assume the recursive call correctly solves the subproblem</li></ol></div><div class="learn-section"><div class="learn-h">Common Recursive Patterns</div><p class="learn-p"><b>1. Linear Recursion:</b> One recursive call, process shrinks by 1</p><div class="learn-code">int sum(int n) {\n    if (n == 0) return 0;\n    return n + sum(n - 1);\n}</div><p class="learn-p"><b>2. Binary Recursion:</b> Two recursive calls (trees, divide &amp; conquer)</p><div class="learn-code">int fib(int n) {\n    if (n &lt;= 1) return n;\n    return fib(n-1) + fib(n-2);\n}</div><p class="learn-p"><b>3. Tail Recursion:</b> Recursive call is the last operation — can be optimized by compiler</p><div class="learn-code">int factorial(int n, int acc = 1) {\n    if (n &lt;= 1) return acc;\n    return factorial(n - 1, n * acc);  // tail call\n}</div></div><div class="learn-section"><div class="learn-h">Recursion Tree &amp; Complexity Analysis</div><p class="learn-p">Draw a <b>recursion tree</b> to analyze time complexity. The total work is the sum of work at each level.</p><p class="learn-p">For <code>fib(n)</code>: tree has ~2^n nodes, so time is <span class="learn-complexity">O(2^n)</span>. Space is <span class="learn-complexity">O(n)</span> (call stack depth).</p><div class="learn-warn"><b>Warning:</b> Always ensure your recursion makes <b>progress toward the base case</b>. A missing or incorrect base case leads to infinite recursion and stack overflow.</div><div class="learn-tip"><b>Tip:</b> If you can solve it with recursion but it\'s slow, consider memoization (top-down DP) to avoid recomputing subproblems.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Sum of first n natural numbers
int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}

// Power function O(log n)
long long power(long long base, int exp, long long mod = 1e9 + 7) {
    if (exp == 0) return 1;
    long long half = power(base, exp / 2, mod);
    half = (half * half) % mod;
    if (exp % 2 == 1) half = (half * base) % mod;
    return half;
}

// Print all subsequences of a string
void subsequences(string& s, int idx, string current) {
    if (idx == (int)s.size()) {
        cout << "\"" << current << "\" ";
        return;
    }
    // Exclude s[idx]
    subsequences(s, idx + 1, current);
    // Include s[idx]
    subsequences(s, idx + 1, current + s[idx]);
}

// Tower of Hanoi
void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n - 1, from, aux, to);
    cout << "Move disk " << n << " from " << from << " to " << to << endl;
    hanoi(n - 1, aux, to, from);
}

// Check if array is sorted (recursive)
bool isSorted(vector<int>& arr, int idx = 0) {
    if (idx >= (int)arr.size() - 1) return true;
    return arr[idx] <= arr[idx + 1] && isSorted(arr, idx + 1);
}

int main() {
    cout << "Sum 1-10: " << sum(10) << endl;  // 55
    cout << "2^10 mod: " << power(2, 10) << endl;  // 1024

    string s = "abc";
    cout << "Subsequences of abc: ";
    subsequences(s, 0, "");
    cout << endl;

    cout << "Tower of Hanoi (3 disks):" << endl;
    hanoi(3, 'A', 'C', 'B');

    vector<int> sorted = {1, 2, 3, 4, 5};
    cout << "Is sorted: " << isSorted(sorted) << endl;  // 1

    return 0;
}`,
          problems: [
            ['Pow(x, n)', 'https://leetcode.com/problems/powx-n/', 'Medium'],
            ['Fibonacci Number', 'https://leetcode.com/problems/fibonacci-number/', 'Easy'],
            ['Reverse String', 'https://leetcode.com/problems/reverse-string/', 'Easy'],
            ['Letter Combinations of a Phone Number', 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', 'Medium']
          ],
          mcqs: [
            {q: 'What are the two essential components of a recursive function?', o: ['Loop and condition', 'Base case and recursive case', 'Input and output', 'Stack and queue'], a: 1},
            {q: 'What is the space complexity of recursion with depth d?', o: ['O(1)', 'O(d) due to call stack', 'O(d^2)', 'O(2^d)'], a: 1},
            {q: 'What is tail recursion?', o: ['Recursion from the end of an array', 'Recursion where the recursive call is the very last operation', 'Recursion with two base cases', 'Recursion that goes backward'], a: 1}
          ]
        },
        {
          t: 'Backtracking Framework',
          learn: '<div class="learn-section"><div class="learn-h">What is Backtracking?</div><p class="learn-p"><b>Backtracking</b> is a systematic approach to explore all possible solutions by building candidates incrementally and abandoning a candidate ("backtracking") as soon as it determines the candidate cannot lead to a valid solution.</p></div><div class="learn-section"><div class="learn-h">The Template</div><div class="learn-code">void backtrack(state, choices) {\n    if (state is a solution) {\n        result.add(state);\n        return;\n    }\n    for (choice in choices) {\n        if (isValid(choice)) {\n            make(choice);           // choose\n            backtrack(state, remaining_choices);  // explore\n            undo(choice);           // un-choose (backtrack)\n        }\n    }\n}</div><p class="learn-p">The three key steps: <b>Choose</b>, <b>Explore</b>, <b>Un-choose</b>.</p></div><div class="learn-section"><div class="learn-h">Pruning</div><p class="learn-p"><b>Pruning</b> skips branches that cannot lead to valid solutions, dramatically reducing the search space.</p><div class="learn-tip"><b>Tip:</b> Sorting the input before backtracking often enables better pruning and easier duplicate handling.</div><div class="learn-warn"><b>Warning:</b> Forgetting to un-choose (undo the modification) is the most common backtracking bug. Always restore state after the recursive call.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

// Generate all combinations of k numbers from 1..n
void combine(int n, int k, int start, vector<int>& current,
             vector<vector<int>>& result) {
    if ((int)current.size() == k) {
        result.push_back(current);
        return;
    }
    for (int i = start; i <= n; i++) {
        current.push_back(i);       // choose
        combine(n, k, i + 1, current, result);  // explore
        current.pop_back();         // un-choose
    }
}

// Combination Sum: find combinations that sum to target
void combinationSum(vector<int>& candidates, int target, int start,
                    vector<int>& current, vector<vector<int>>& result) {
    if (target == 0) {
        result.push_back(current);
        return;
    }
    for (int i = start; i < (int)candidates.size(); i++) {
        if (candidates[i] > target) break; // pruning (array is sorted)
        current.push_back(candidates[i]);
        combinationSum(candidates, target - candidates[i], i, current, result);
        current.pop_back();
    }
}

// Generate Parentheses
void generateParenthesis(int n, int open, int close, string& current,
                         vector<string>& result) {
    if ((int)current.size() == 2 * n) {
        result.push_back(current);
        return;
    }
    if (open < n) {
        current += '(';
        generateParenthesis(n, open + 1, close, current, result);
        current.pop_back();
    }
    if (close < open) {
        current += ')';
        generateParenthesis(n, open, close + 1, current, result);
        current.pop_back();
    }
}

int main() {
    // Combinations C(4,2)
    vector<vector<int>> combos;
    vector<int> curr;
    combine(4, 2, 1, curr, combos);
    for (auto& c : combos) {
        for (int x : c) cout << x << " ";
        cout << endl;
    }

    // Combination Sum
    vector<int> candidates = {2, 3, 6, 7};
    vector<vector<int>> sums;
    curr.clear();
    sort(candidates.begin(), candidates.end());
    combinationSum(candidates, 7, 0, curr, sums);
    cout << "Combinations summing to 7:" << endl;
    for (auto& s : sums) {
        for (int x : s) cout << x << " ";
        cout << endl;
    }

    // Generate Parentheses
    vector<string> parens;
    string s;
    generateParenthesis(3, 0, 0, s, parens);
    for (auto& p : parens) cout << p << " ";
    cout << endl;

    return 0;
}`,
          problems: [
            ['Combinations', 'https://leetcode.com/problems/combinations/', 'Medium'],
            ['Combination Sum', 'https://leetcode.com/problems/combination-sum/', 'Medium'],
            ['Generate Parentheses', 'https://leetcode.com/problems/generate-parentheses/', 'Medium'],
            ['Word Search', 'https://leetcode.com/problems/word-search/', 'Medium']
          ],
          mcqs: [
            {q: 'What are the three steps in the backtracking template?', o: ['Sort, Search, Return', 'Choose, Explore, Un-choose', 'Push, Process, Pop', 'Start, Middle, End'], a: 1},
            {q: 'What is pruning in backtracking?', o: ['Removing elements from the result', 'Skipping branches that cannot lead to valid solutions', 'Sorting the input array', 'Reducing the recursion depth'], a: 1},
            {q: 'What happens if you forget to undo the choice (backtrack)?', o: ['Stack overflow', 'Wrong results because state carries over between branches', 'Compilation error', 'No effect'], a: 1}
          ]
        },
        {
          t: 'Subsets & Permutations',
          learn: '<div class="learn-section"><div class="learn-h">Generating All Subsets</div><p class="learn-p">Given a set of distinct integers, return all possible subsets (power set). Two approaches:</p><p class="learn-p"><b>1. Backtracking (include/exclude):</b></p><div class="learn-code">void subsets(vector&lt;int&gt;&amp; nums, int idx, vector&lt;int&gt;&amp; curr,\n             vector&lt;vector&lt;int&gt;&gt;&amp; result) {\n    if (idx == nums.size()) { result.push_back(curr); return; }\n    subsets(nums, idx + 1, curr, result);  // exclude\n    curr.push_back(nums[idx]);\n    subsets(nums, idx + 1, curr, result);  // include\n    curr.pop_back();\n}</div><p class="learn-p"><b>2. Iterative (bit masking):</b> For n elements, iterate from 0 to 2^n - 1. Each bit represents include/exclude.</p></div><div class="learn-section"><div class="learn-h">Generating All Permutations</div><p class="learn-p">For n distinct elements, there are n! permutations.</p><div class="learn-code">void permute(vector&lt;int&gt;&amp; nums, int start,\n             vector&lt;vector&lt;int&gt;&gt;&amp; result) {\n    if (start == nums.size()) { result.push_back(nums); return; }\n    for (int i = start; i &lt; nums.size(); i++) {\n        swap(nums[start], nums[i]);\n        permute(nums, start + 1, result);\n        swap(nums[start], nums[i]);  // backtrack\n    }\n}</div></div><div class="learn-section"><div class="learn-h">Handling Duplicates</div><p class="learn-p">For arrays with duplicates, sort first and skip elements equal to the previous one at the same level.</p><div class="learn-tip"><b>Tip:</b> Subsets = 2^n combinations (include/exclude each element). Permutations = n! arrangements (order matters).</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// All subsets (power set)
void subsets(vector<int>& nums, int idx, vector<int>& curr,
             vector<vector<int>>& result) {
    if (idx == (int)nums.size()) {
        result.push_back(curr);
        return;
    }
    subsets(nums, idx + 1, curr, result);  // exclude
    curr.push_back(nums[idx]);
    subsets(nums, idx + 1, curr, result);  // include
    curr.pop_back();
}

// Subsets with duplicates
void subsetsWithDup(vector<int>& nums, int start, vector<int>& curr,
                    vector<vector<int>>& result) {
    result.push_back(curr);
    for (int i = start; i < (int)nums.size(); i++) {
        if (i > start && nums[i] == nums[i-1]) continue; // skip dup
        curr.push_back(nums[i]);
        subsetsWithDup(nums, i + 1, curr, result);
        curr.pop_back();
    }
}

// All permutations
void permute(vector<int>& nums, int start,
             vector<vector<int>>& result) {
    if (start == (int)nums.size()) {
        result.push_back(nums);
        return;
    }
    for (int i = start; i < (int)nums.size(); i++) {
        swap(nums[start], nums[i]);
        permute(nums, start + 1, result);
        swap(nums[start], nums[i]);
    }
}

// Permutations with duplicates
void permuteUnique(vector<int>& nums, vector<bool>& used,
                   vector<int>& curr, vector<vector<int>>& result) {
    if ((int)curr.size() == (int)nums.size()) {
        result.push_back(curr);
        return;
    }
    for (int i = 0; i < (int)nums.size(); i++) {
        if (used[i]) continue;
        if (i > 0 && nums[i] == nums[i-1] && !used[i-1]) continue;
        used[i] = true;
        curr.push_back(nums[i]);
        permuteUnique(nums, used, curr, result);
        curr.pop_back();
        used[i] = false;
    }
}

int main() {
    vector<int> nums = {1, 2, 3};
    vector<vector<int>> result;
    vector<int> curr;

    subsets(nums, 0, curr, result);
    cout << "Subsets (" << result.size() << "): " << endl;
    for (auto& s : result) {
        cout << "{ "; for (int x : s) cout << x << " "; cout << "}" << endl;
    }

    result.clear();
    permute(nums, 0, result);
    cout << "Permutations (" << result.size() << "):" << endl;
    for (auto& p : result) {
        for (int x : p) cout << x << " ";
        cout << endl;
    }

    return 0;
}`,
          problems: [
            ['Subsets', 'https://leetcode.com/problems/subsets/', 'Medium'],
            ['Subsets II', 'https://leetcode.com/problems/subsets-ii/', 'Medium'],
            ['Permutations', 'https://leetcode.com/problems/permutations/', 'Medium'],
            ['Permutations II', 'https://leetcode.com/problems/permutations-ii/', 'Medium'],
            ['Combination Sum II', 'https://leetcode.com/problems/combination-sum-ii/', 'Medium']
          ],
          mcqs: [
            {q: 'How many subsets does a set of n elements have?', o: ['n', 'n!', '2^n', 'n^2'], a: 2},
            {q: 'How do you handle duplicates in subset generation?', o: ['Use a set to store results', 'Sort the array and skip consecutive duplicates at the same recursion level', 'Remove duplicates after generation', 'Use a hash map'], a: 1},
            {q: 'What is the time complexity of generating all permutations?', o: ['O(2^n)', 'O(n!)', 'O(n^2)', 'O(n * 2^n)'], a: 1}
          ]
        },
        {
          t: 'N-Queens & Sudoku Solver',
          learn: '<div class="learn-section"><div class="learn-h">N-Queens Problem</div><p class="learn-p">Place N queens on an N x N chessboard such that no two queens attack each other (no same row, column, or diagonal). This is a classic backtracking problem.</p><div class="learn-code">void solve(int row, int n, vector&lt;string&gt;&amp; board,\n           vector&lt;bool&gt;&amp; cols, vector&lt;bool&gt;&amp; diag1, vector&lt;bool&gt;&amp; diag2,\n           vector&lt;vector&lt;string&gt;&gt;&amp; result) {\n    if (row == n) { result.push_back(board); return; }\n    for (int col = 0; col &lt; n; col++) {\n        if (cols[col] || diag1[row-col+n-1] || diag2[row+col]) continue;\n        board[row][col] = \'Q\';\n        cols[col] = diag1[row-col+n-1] = diag2[row+col] = true;\n        solve(row + 1, n, board, cols, diag1, diag2, result);\n        board[row][col] = \'.\';\n        cols[col] = diag1[row-col+n-1] = diag2[row+col] = false;\n    }\n}</div></div><div class="learn-section"><div class="learn-h">Sudoku Solver</div><p class="learn-p">Fill a 9x9 grid so that each row, column, and 3x3 box contains digits 1-9 exactly once. Try each valid digit and backtrack on failure.</p><div class="learn-tip"><b>Tip:</b> For N-Queens, use three boolean arrays to check column and both diagonals in O(1). The key insight: cells on the same diagonal have the same (row - col) or (row + col).</div><div class="learn-warn"><b>Warning:</b> Both N-Queens and Sudoku have exponential worst-case complexity. Pruning is essential for practical performance.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// N-Queens
class NQueens {
    vector<vector<string>> result;

    void solve(int row, int n, vector<string>& board,
               vector<bool>& cols, vector<bool>& diag1, vector<bool>& diag2) {
        if (row == n) { result.push_back(board); return; }
        for (int col = 0; col < n; col++) {
            if (cols[col] || diag1[row - col + n - 1] || diag2[row + col])
                continue;
            board[row][col] = 'Q';
            cols[col] = diag1[row - col + n - 1] = diag2[row + col] = true;
            solve(row + 1, n, board, cols, diag1, diag2);
            board[row][col] = '.';
            cols[col] = diag1[row - col + n - 1] = diag2[row + col] = false;
        }
    }

public:
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        vector<bool> cols(n, false), diag1(2 * n, false), diag2(2 * n, false);
        solve(0, n, board, cols, diag1, diag2);
        return result;
    }
};

// Sudoku Solver
class SudokuSolver {
    bool isValid(vector<vector<char>>& board, int row, int col, char c) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == c) return false;
            if (board[i][col] == c) return false;
            int r = 3 * (row / 3) + i / 3;
            int cc = 3 * (col / 3) + i % 3;
            if (board[r][cc] == c) return false;
        }
        return true;
    }

public:
    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.'; // backtrack
                        }
                    }
                    return false; // no valid digit found
                }
            }
        }
        return true; // all cells filled
    }
};

int main() {
    NQueens nq;
    auto solutions = nq.solveNQueens(4);
    cout << "4-Queens solutions: " << solutions.size() << endl; // 2
    for (auto& sol : solutions) {
        for (auto& row : sol) cout << row << endl;
        cout << "---" << endl;
    }
    return 0;
}`,
          problems: [
            ['N-Queens', 'https://leetcode.com/problems/n-queens/', 'Hard'],
            ['N-Queens II', 'https://leetcode.com/problems/n-queens-ii/', 'Hard'],
            ['Sudoku Solver', 'https://leetcode.com/problems/sudoku-solver/', 'Hard'],
            ['Valid Sudoku', 'https://leetcode.com/problems/valid-sudoku/', 'Medium']
          ],
          mcqs: [
            {q: 'How many solutions does the 8-Queens problem have?', o: ['1', '12', '92', '724'], a: 2},
            {q: 'What is the key optimization for checking queen placement?', o: ['Use a 2D visited array', 'Use three boolean arrays for columns and both diagonals', 'Check all placed queens each time', 'Use bit manipulation only'], a: 1},
            {q: 'In Sudoku, how do you determine the 3x3 box for cell (row, col)?', o: ['row/3, col/3', 'row%3, col%3', 'row*3, col*3', 'row+3, col+3'], a: 0}
          ]
        }
      ]
    },
    {
      id: 'trees', t: 'Trees',
      topics: [
        {
          t: 'Tree Traversals (Inorder, Preorder, Postorder)',
          learn: '<div class="learn-section"><div class="learn-h">Binary Tree Structure</div><p class="learn-p">A <b>binary tree</b> is a hierarchical data structure where each node has at most two children: left and right.</p><div class="learn-code">struct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};</div></div><div class="learn-section"><div class="learn-h">Three Traversal Orders</div><table class="learn-table"><tr><th>Traversal</th><th>Order</th><th>Use Case</th></tr><tr><td>Inorder</td><td>Left, Root, Right</td><td>BST gives sorted order</td></tr><tr><td>Preorder</td><td>Root, Left, Right</td><td>Serialization, copying tree</td></tr><tr><td>Postorder</td><td>Left, Right, Root</td><td>Deletion, bottom-up calculations</td></tr></table><div class="learn-code">void inorder(TreeNode* root) {\n    if (!root) return;\n    inorder(root-&gt;left);\n    cout &lt;&lt; root-&gt;val &lt;&lt; " ";\n    inorder(root-&gt;right);\n}</div></div><div class="learn-section"><div class="learn-h">Iterative Traversals</div><p class="learn-p">Interviewers often ask for iterative versions using an explicit stack. The iterative inorder is particularly important:</p><div class="learn-code">vector&lt;int&gt; inorderIterative(TreeNode* root) {\n    vector&lt;int&gt; result;\n    stack&lt;TreeNode*&gt; st;\n    TreeNode* curr = root;\n    while (curr || !st.empty()) {\n        while (curr) {\n            st.push(curr);\n            curr = curr-&gt;left;\n        }\n        curr = st.top(); st.pop();\n        result.push_back(curr-&gt;val);\n        curr = curr-&gt;right;\n    }\n    return result;\n}</div><div class="learn-tip"><b>Tip:</b> Know both recursive and iterative versions. Morris Traversal achieves O(1) space without a stack by temporarily modifying the tree.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Recursive traversals
void inorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    inorder(root->left, res);
    res.push_back(root->val);
    inorder(root->right, res);
}

void preorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    res.push_back(root->val);
    preorder(root->left, res);
    preorder(root->right, res);
}

void postorder(TreeNode* root, vector<int>& res) {
    if (!root) return;
    postorder(root->left, res);
    postorder(root->right, res);
    res.push_back(root->val);
}

// Iterative inorder
vector<int> inorderIterative(TreeNode* root) {
    vector<int> result;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }
        curr = st.top(); st.pop();
        result.push_back(curr->val);
        curr = curr->right;
    }
    return result;
}

// Iterative preorder
vector<int> preorderIterative(TreeNode* root) {
    if (!root) return {};
    vector<int> result;
    stack<TreeNode*> st;
    st.push(root);
    while (!st.empty()) {
        TreeNode* node = st.top(); st.pop();
        result.push_back(node->val);
        if (node->right) st.push(node->right);
        if (node->left) st.push(node->left);
    }
    return result;
}

int main() {
    //       1
    //      / \
    //     2   3
    //    / \
    //   4   5
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    vector<int> res;
    inorder(root, res);
    cout << "Inorder: "; for (int x : res) cout << x << " "; cout << endl;
    // 4 2 5 1 3

    res.clear(); preorder(root, res);
    cout << "Preorder: "; for (int x : res) cout << x << " "; cout << endl;
    // 1 2 4 5 3

    res.clear(); postorder(root, res);
    cout << "Postorder: "; for (int x : res) cout << x << " "; cout << endl;
    // 4 5 2 3 1

    return 0;
}`,
          problems: [
            ['Binary Tree Inorder Traversal', 'https://leetcode.com/problems/binary-tree-inorder-traversal/', 'Easy'],
            ['Binary Tree Preorder Traversal', 'https://leetcode.com/problems/binary-tree-preorder-traversal/', 'Easy'],
            ['Binary Tree Postorder Traversal', 'https://leetcode.com/problems/binary-tree-postorder-traversal/', 'Easy'],
            ['Flatten Binary Tree to Linked List', 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', 'Medium']
          ],
          mcqs: [
            {q: 'Inorder traversal of a BST gives elements in what order?', o: ['Reverse sorted', 'Sorted (ascending)', 'Level order', 'Random order'], a: 1},
            {q: 'What data structure is used for iterative tree traversals?', o: ['Queue', 'Stack', 'Heap', 'Deque'], a: 1},
            {q: 'What is the time complexity of any tree traversal?', o: ['O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)'], a: 1}
          ]
        },
        {
          t: 'Level Order & Zigzag Traversal',
          learn: '<div class="learn-section"><div class="learn-h">Level Order Traversal (BFS)</div><p class="learn-p"><b>Level order traversal</b> visits nodes level by level, left to right. It uses a <b>queue</b> (BFS approach).</p><div class="learn-code">vector&lt;vector&lt;int&gt;&gt; levelOrder(TreeNode* root) {\n    if (!root) return {};\n    vector&lt;vector&lt;int&gt;&gt; result;\n    queue&lt;TreeNode*&gt; q;\n    q.push(root);\n    while (!q.empty()) {\n        int size = q.size();\n        vector&lt;int&gt; level;\n        for (int i = 0; i &lt; size; i++) {\n            TreeNode* node = q.front(); q.pop();\n            level.push_back(node-&gt;val);\n            if (node-&gt;left) q.push(node-&gt;left);\n            if (node-&gt;right) q.push(node-&gt;right);\n        }\n        result.push_back(level);\n    }\n    return result;\n}</div></div><div class="learn-section"><div class="learn-h">Zigzag Traversal</div><p class="learn-p">Same as level order, but alternate the direction at each level. Simply reverse every other level, or use a deque.</p><div class="learn-tip"><b>Tip:</b> Level order traversal is the foundation for many tree problems: right side view, maximum width, average of levels, and more.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Level Order Traversal
vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}

// Zigzag Level Order
vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    if (!root) return {};
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root);
    bool leftToRight = true;
    while (!q.empty()) {
        int size = q.size();
        vector<int> level(size);
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            int idx = leftToRight ? i : size - 1 - i;
            level[idx] = node->val;
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
        leftToRight = !leftToRight;
    }
    return result;
}

// Right Side View
vector<int> rightSideView(TreeNode* root) {
    if (!root) return {};
    vector<int> result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            if (i == size - 1) result.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
    }
    return result;
}

int main() {
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);

    auto levels = levelOrder(root);
    cout << "Level order:" << endl;
    for (auto& l : levels) {
        for (int x : l) cout << x << " ";
        cout << endl;
    }

    auto zigzag = zigzagLevelOrder(root);
    cout << "Zigzag:" << endl;
    for (auto& l : zigzag) {
        for (int x : l) cout << x << " ";
        cout << endl;
    }

    return 0;
}`,
          problems: [
            ['Binary Tree Level Order Traversal', 'https://leetcode.com/problems/binary-tree-level-order-traversal/', 'Medium'],
            ['Binary Tree Zigzag Level Order Traversal', 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', 'Medium'],
            ['Binary Tree Right Side View', 'https://leetcode.com/problems/binary-tree-right-side-view/', 'Medium'],
            ['Average of Levels in Binary Tree', 'https://leetcode.com/problems/average-of-levels-in-binary-tree/', 'Easy']
          ],
          mcqs: [
            {q: 'What data structure is used for level order traversal?', o: ['Stack', 'Queue', 'Heap', 'Deque'], a: 1},
            {q: 'How do you know when one level ends and the next begins?', o: ['Use a sentinel node', 'Track the queue size at the start of each level', 'Count nodes', 'Use a stack'], a: 1},
            {q: 'For zigzag traversal, what changes between levels?', o: ['The data structure used', 'The direction of reading (left-to-right vs right-to-left)', 'The tree structure', 'Nothing'], a: 1}
          ]
        },
        {
          t: 'BST Operations (Insert, Delete, Search)',
          learn: '<div class="learn-section"><div class="learn-h">Binary Search Tree Property</div><p class="learn-p">A <b>BST</b> satisfies: for every node, all values in its left subtree are <b>less</b>, and all values in its right subtree are <b>greater</b>. This enables <span class="learn-complexity">O(h)</span> search, insert, and delete where h is the height.</p></div><div class="learn-section"><div class="learn-h">Search</div><div class="learn-code">TreeNode* search(TreeNode* root, int val) {\n    if (!root || root-&gt;val == val) return root;\n    if (val &lt; root-&gt;val) return search(root-&gt;left, val);\n    return search(root-&gt;right, val);\n}</div></div><div class="learn-section"><div class="learn-h">Insert</div><div class="learn-code">TreeNode* insert(TreeNode* root, int val) {\n    if (!root) return new TreeNode(val);\n    if (val &lt; root-&gt;val) root-&gt;left = insert(root-&gt;left, val);\n    else root-&gt;right = insert(root-&gt;right, val);\n    return root;\n}</div></div><div class="learn-section"><div class="learn-h">Delete</div><p class="learn-p">Three cases: (1) Leaf node: simply remove. (2) One child: replace with child. (3) Two children: replace with inorder successor (smallest in right subtree), then delete successor.</p><div class="learn-tip"><b>Tip:</b> In a balanced BST, h = O(log n). In the worst case (skewed tree), h = O(n). This is why balanced BSTs (AVL, Red-Black) exist.</div></div>',
          code: `#include <iostream>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* search(TreeNode* root, int val) {
    if (!root || root->val == val) return root;
    if (val < root->val) return search(root->left, val);
    return search(root->right, val);
}

TreeNode* insert(TreeNode* root, int val) {
    if (!root) return new TreeNode(val);
    if (val < root->val) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

// Find minimum value node
TreeNode* findMin(TreeNode* node) {
    while (node->left) node = node->left;
    return node;
}

TreeNode* deleteNode(TreeNode* root, int key) {
    if (!root) return nullptr;
    if (key < root->val) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->val) {
        root->right = deleteNode(root->right, key);
    } else {
        // Found the node to delete
        if (!root->left) return root->right;   // case 1 & 2
        if (!root->right) return root->left;   // case 2
        // Case 3: two children
        TreeNode* successor = findMin(root->right);
        root->val = successor->val;
        root->right = deleteNode(root->right, successor->val);
    }
    return root;
}

// Validate BST
bool isValidBST(TreeNode* root, long long lo = LLONG_MIN, long long hi = LLONG_MAX) {
    if (!root) return true;
    if (root->val <= lo || root->val >= hi) return false;
    return isValidBST(root->left, lo, root->val) &&
           isValidBST(root->right, root->val, hi);
}

// Kth smallest element (inorder)
int kthSmallest(TreeNode* root, int& k) {
    if (!root) return -1;
    int left = kthSmallest(root->left, k);
    if (k == 0) return left;
    if (--k == 0) return root->val;
    return kthSmallest(root->right, k);
}

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    TreeNode* root = nullptr;
    for (int x : {5, 3, 7, 2, 4, 6, 8})
        root = insert(root, x);
    cout << "Inorder: "; inorder(root); cout << endl; // 2 3 4 5 6 7 8
    cout << "Valid BST: " << isValidBST(root) << endl;

    root = deleteNode(root, 5);
    cout << "After deleting 5: "; inorder(root); cout << endl;

    int k = 3;
    cout << "3rd smallest: " << kthSmallest(root, k) << endl;
    return 0;
}`,
          problems: [
            ['Validate Binary Search Tree', 'https://leetcode.com/problems/validate-binary-search-tree/', 'Medium'],
            ['Insert into a Binary Search Tree', 'https://leetcode.com/problems/insert-into-a-binary-search-tree/', 'Medium'],
            ['Delete Node in a BST', 'https://leetcode.com/problems/delete-node-in-a-bst/', 'Medium'],
            ['Kth Smallest Element in a BST', 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', 'Medium']
          ],
          mcqs: [
            {q: 'When deleting a BST node with two children, what replaces it?', o: ['The left child', 'The right child', 'The inorder successor or predecessor', 'The parent node'], a: 2},
            {q: 'What is the time complexity of BST operations in the worst case?', o: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], a: 2},
            {q: 'How do you validate if a binary tree is a valid BST?', o: ['Check each node is greater than its left child', 'Check each node is within a valid range (min, max)', 'Do level order traversal', 'Count nodes'], a: 1}
          ]
        },
        {
          t: 'Tree Construction from Traversals',
          learn: '<div class="learn-section"><div class="learn-h">Building a Tree from Traversals</div><p class="learn-p">Given two traversals of a binary tree, you can reconstruct the original tree. The most common interview problem: construct from <b>inorder + preorder</b> or <b>inorder + postorder</b>.</p></div><div class="learn-section"><div class="learn-h">From Inorder + Preorder</div><p class="learn-p">Key insight: the first element in preorder is always the root. Find this root in inorder to determine left and right subtrees.</p><div class="learn-code">TreeNode* build(vector&lt;int&gt;&amp; pre, vector&lt;int&gt;&amp; in,\n                int preStart, int inStart, int inEnd,\n                unordered_map&lt;int,int&gt;&amp; inMap) {\n    if (preStart &gt; pre.size() || inStart &gt; inEnd) return nullptr;\n    TreeNode* root = new TreeNode(pre[preStart]);\n    int inIdx = inMap[root-&gt;val];\n    int leftSize = inIdx - inStart;\n    root-&gt;left = build(pre, in, preStart+1, inStart, inIdx-1, inMap);\n    root-&gt;right = build(pre, in, preStart+leftSize+1, inIdx+1, inEnd, inMap);\n    return root;\n}</div><p class="learn-p">Use a hash map for O(1) lookup of root position in inorder. Total time: <span class="learn-complexity">O(n)</span>.</p><div class="learn-tip"><b>Tip:</b> You need inorder + one other traversal. Preorder + postorder alone cannot uniquely determine a binary tree (unless it\'s a full binary tree).</div></div>',
          code: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Build from Inorder + Preorder
class BuildFromPreIn {
    unordered_map<int, int> inMap;
    int preIdx = 0;

    TreeNode* build(vector<int>& pre, int inStart, int inEnd) {
        if (inStart > inEnd) return nullptr;
        TreeNode* root = new TreeNode(pre[preIdx++]);
        int inIdx = inMap[root->val];
        root->left = build(pre, inStart, inIdx - 1);
        root->right = build(pre, inIdx + 1, inEnd);
        return root;
    }

public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < (int)inorder.size(); i++)
            inMap[inorder[i]] = i;
        preIdx = 0;
        return build(preorder, 0, inorder.size() - 1);
    }
};

// Build from Inorder + Postorder
class BuildFromPostIn {
    unordered_map<int, int> inMap;
    int postIdx;

    TreeNode* build(vector<int>& post, int inStart, int inEnd) {
        if (inStart > inEnd) return nullptr;
        TreeNode* root = new TreeNode(post[postIdx--]);
        int inIdx = inMap[root->val];
        root->right = build(post, inIdx + 1, inEnd);  // right first!
        root->left = build(post, inStart, inIdx - 1);
        return root;
    }

public:
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        for (int i = 0; i < (int)inorder.size(); i++)
            inMap[inorder[i]] = i;
        postIdx = postorder.size() - 1;
        return build(postorder, 0, inorder.size() - 1);
    }
};

void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

int main() {
    vector<int> pre = {3, 9, 20, 15, 7};
    vector<int> in = {9, 3, 15, 20, 7};
    BuildFromPreIn builder;
    TreeNode* root = builder.buildTree(pre, in);
    cout << "Inorder check: "; inorder(root); cout << endl;

    vector<int> post = {9, 15, 7, 20, 3};
    BuildFromPostIn builder2;
    TreeNode* root2 = builder2.buildTree(in, post);
    cout << "Inorder check: "; inorder(root2); cout << endl;

    return 0;
}`,
          problems: [
            ['Construct Binary Tree from Preorder and Inorder Traversal', 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', 'Medium'],
            ['Construct Binary Tree from Inorder and Postorder Traversal', 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/', 'Medium'],
            ['Serialize and Deserialize Binary Tree', 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', 'Hard'],
            ['Maximum Binary Tree', 'https://leetcode.com/problems/maximum-binary-tree/', 'Medium']
          ],
          mcqs: [
            {q: 'Which two traversals are needed to uniquely construct a binary tree?', o: ['Preorder + Postorder', 'Inorder + any one of Preorder/Postorder', 'Level order alone', 'Any single traversal'], a: 1},
            {q: 'In preorder traversal, which element is always the root?', o: ['Last element', 'Middle element', 'First element', 'Largest element'], a: 2},
            {q: 'Why use a hash map when constructing from traversals?', o: ['To store the tree', 'For O(1) lookup of root position in inorder', 'To avoid recursion', 'For sorting'], a: 1}
          ]
        },
        {
          t: 'LCA, Diameter & Height',
          learn: '<div class="learn-section"><div class="learn-h">Lowest Common Ancestor (LCA)</div><p class="learn-p">The <b>LCA</b> of two nodes p and q is the deepest node that is an ancestor of both. For a general binary tree:</p><div class="learn-code">TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root-&gt;left, p, q);\n    TreeNode* right = lowestCommonAncestor(root-&gt;right, p, q);\n    if (left &amp;&amp; right) return root;  // p and q in different subtrees\n    return left ? left : right;\n}</div><p class="learn-p">For a <b>BST</b>, use the BST property: if both p and q are less than root, go left; if both greater, go right; otherwise root is the LCA.</p></div><div class="learn-section"><div class="learn-h">Diameter of Binary Tree</div><p class="learn-p">The <b>diameter</b> is the longest path between any two nodes (number of edges). It may or may not pass through the root.</p><div class="learn-code">int diameter(TreeNode* root, int&amp; result) {\n    if (!root) return 0;\n    int left = diameter(root-&gt;left, result);\n    int right = diameter(root-&gt;right, result);\n    result = max(result, left + right);  // path through this node\n    return 1 + max(left, right);         // height of subtree\n}</div></div><div class="learn-section"><div class="learn-h">Height of Binary Tree</div><div class="learn-code">int height(TreeNode* root) {\n    if (!root) return 0;\n    return 1 + max(height(root-&gt;left), height(root-&gt;right));\n}</div><div class="learn-tip"><b>Tip:</b> Many tree problems follow the pattern: compute something for left and right subtrees, then combine at the current node. This is the "recursive thinking" approach.</div></div>',
          code: `#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Height of tree
int height(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(height(root->left), height(root->right));
}

// Diameter (longest path between any two nodes)
int diameterHelper(TreeNode* root, int& result) {
    if (!root) return 0;
    int left = diameterHelper(root->left, result);
    int right = diameterHelper(root->right, result);
    result = max(result, left + right);
    return 1 + max(left, right);
}

int diameter(TreeNode* root) {
    int result = 0;
    diameterHelper(root, result);
    return result;
}

// LCA for general binary tree
TreeNode* lca(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lca(root->left, p, q);
    TreeNode* right = lca(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}

// LCA for BST
TreeNode* lcaBST(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (p->val < root->val && q->val < root->val)
        return lcaBST(root->left, p, q);
    if (p->val > root->val && q->val > root->val)
        return lcaBST(root->right, p, q);
    return root;
}

// Check if tree is balanced
int checkBalance(TreeNode* root) {
    if (!root) return 0;
    int left = checkBalance(root->left);
    int right = checkBalance(root->right);
    if (left == -1 || right == -1 || abs(left - right) > 1) return -1;
    return 1 + max(left, right);
}

bool isBalanced(TreeNode* root) {
    return checkBalance(root) != -1;
}

int main() {
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);

    cout << "Height: " << height(root) << endl;    // 3
    cout << "Diameter: " << diameter(root) << endl;  // 3
    cout << "Balanced: " << isBalanced(root) << endl; // 1

    TreeNode* lcaNode = lca(root, root->left->left, root->left->right);
    cout << "LCA(4,5): " << lcaNode->val << endl;  // 2

    return 0;
}`,
          problems: [
            ['Lowest Common Ancestor of a Binary Tree', 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', 'Medium'],
            ['Diameter of Binary Tree', 'https://leetcode.com/problems/diameter-of-binary-tree/', 'Easy'],
            ['Maximum Depth of Binary Tree', 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', 'Easy'],
            ['Balanced Binary Tree', 'https://leetcode.com/problems/balanced-binary-tree/', 'Easy'],
            ['Binary Tree Maximum Path Sum', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', 'Hard']
          ],
          mcqs: [
            {q: 'What is the LCA of two nodes in different subtrees?', o: ['The left child', 'The right child', 'The root of the tree where they diverge', 'The deeper node'], a: 2},
            {q: 'The diameter of a tree might NOT pass through the root.', o: ['True', 'False'], a: 0},
            {q: 'What is the height of a single-node tree?', o: ['0', '1', '2', '-1'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'pq', t: 'Heaps',
      topics: [
        {
          t: 'Heap Basics & Heapify',
          learn: '<div class="learn-section"><div class="learn-h">What is a Heap?</div><p class="learn-p">A <b>heap</b> is a complete binary tree that satisfies the heap property. In a <b>max-heap</b>, every parent is greater than or equal to its children. In a <b>min-heap</b>, every parent is less than or equal to its children.</p><p class="learn-p">Heaps are typically stored as arrays where for node at index i: left child = 2i+1, right child = 2i+2, parent = (i-1)/2.</p></div><div class="learn-section"><div class="learn-h">Heapify</div><p class="learn-p"><b>Heapify</b> (sift-down) fixes the heap property at a node by swapping with the larger (max-heap) or smaller (min-heap) child.</p><div class="learn-code">void heapify(vector&lt;int&gt;&amp; arr, int n, int i) {\n    int largest = i;\n    int left = 2*i + 1, right = 2*i + 2;\n    if (left &lt; n &amp;&amp; arr[left] &gt; arr[largest]) largest = left;\n    if (right &lt; n &amp;&amp; arr[right] &gt; arr[largest]) largest = right;\n    if (largest != i) {\n        swap(arr[i], arr[largest]);\n        heapify(arr, n, largest);\n    }\n}</div><p class="learn-p">Building a heap from an array: call heapify for all internal nodes bottom-up. Time: <span class="learn-complexity">O(n)</span> (not O(n log n)!).</p></div><div class="learn-section"><div class="learn-h">Heap Sort</div><p class="learn-p">Build a max-heap, then repeatedly extract the max and place it at the end. Time: <span class="learn-complexity">O(n log n)</span>, Space: <span class="learn-complexity">O(1)</span>.</p><div class="learn-tip"><b>Tip:</b> In C++, use <code>priority_queue</code> instead of implementing a heap from scratch. But understand the internals for interviews.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Max-heapify
void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1, right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

// Build max-heap from array
void buildHeap(vector<int>& arr) {
    int n = arr.size();
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
}

// Heap Sort
void heapSort(vector<int>& arr) {
    int n = arr.size();
    buildHeap(arr);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);  // move max to end
        heapify(arr, i, 0);   // restore heap on reduced array
    }
}

// Insert into heap
void heapInsert(vector<int>& heap, int val) {
    heap.push_back(val);
    int i = heap.size() - 1;
    while (i > 0 && heap[(i-1)/2] < heap[i]) {
        swap(heap[i], heap[(i-1)/2]);
        i = (i - 1) / 2;
    }
}

// Extract max from heap
int extractMax(vector<int>& heap) {
    int maxVal = heap[0];
    heap[0] = heap.back();
    heap.pop_back();
    heapify(heap, heap.size(), 0);
    return maxVal;
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    heapSort(arr);
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl; // 5 6 7 11 12 13

    vector<int> heap;
    for (int x : {3, 1, 6, 5, 2, 4}) heapInsert(heap, x);
    cout << "Extract max: " << extractMax(heap) << endl; // 6
    cout << "Extract max: " << extractMax(heap) << endl; // 5

    return 0;
}`,
          problems: [
            ['Kth Largest Element in an Array', 'https://leetcode.com/problems/kth-largest-element-in-an-array/', 'Medium'],
            ['Sort an Array', 'https://leetcode.com/problems/sort-an-array/', 'Medium'],
            ['Last Stone Weight', 'https://leetcode.com/problems/last-stone-weight/', 'Easy']
          ],
          mcqs: [
            {q: 'What is the time complexity of building a heap from an array?', o: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'], a: 1},
            {q: 'For a node at index i in a 0-indexed array heap, where is its left child?', o: ['2*i', '2*i + 1', 'i/2', 'i + 1'], a: 1},
            {q: 'Is heap sort a stable sorting algorithm?', o: ['Yes', 'No'], a: 1}
          ]
        },
        {
          t: 'Top-K Problems',
          learn: '<div class="learn-section"><div class="learn-h">Top-K Pattern</div><p class="learn-p">Finding the K largest or K most frequent elements is a very common interview pattern. The optimal approach uses a <b>min-heap of size K</b>.</p><div class="learn-code">// Kth Largest Element\nint findKthLargest(vector&lt;int&gt;&amp; nums, int k) {\n    priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt; minPQ;\n    for (int x : nums) {\n        minPQ.push(x);\n        if (minPQ.size() &gt; k) minPQ.pop();\n    }\n    return minPQ.top();\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(n log k)</span>. The min-heap always contains the k largest elements; the smallest of those (the top) is the kth largest.</p></div><div class="learn-section"><div class="learn-h">Top K Frequent Elements</div><p class="learn-p">Count frequencies, then find the top-k most frequent using a min-heap:</p><div class="learn-code">// 1. Count frequencies with a map\n// 2. Push into min-heap of size k (by frequency)\n// 3. The heap contains k most frequent elements</div><div class="learn-tip"><b>Tip:</b> For kth largest, use a min-heap of size k. For kth smallest, use a max-heap of size k. The "opposite" heap retains the desired elements.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_map>
using namespace std;

// Kth Largest Element
int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minPQ; // min-heap
    for (int x : nums) {
        minPQ.push(x);
        if ((int)minPQ.size() > k) minPQ.pop();
    }
    return minPQ.top();
}

// Top K Frequent Elements
vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int x : nums) freq[x]++;

    // Min-heap by frequency
    auto cmp = [](pair<int,int>& a, pair<int,int>& b) {
        return a.second > b.second;
    };
    priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> pq(cmp);

    for (auto& [num, count] : freq) {
        pq.push({num, count});
        if ((int)pq.size() > k) pq.pop();
    }

    vector<int> result;
    while (!pq.empty()) {
        result.push_back(pq.top().first);
        pq.pop();
    }
    return result;
}

// Find Median from Data Stream
class MedianFinder {
    priority_queue<int> maxHeap;  // lower half
    priority_queue<int, vector<int>, greater<int>> minHeap;  // upper half
public:
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    double findMedian() {
        if (maxHeap.size() > minHeap.size())
            return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};

int main() {
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    cout << "2nd largest: " << findKthLargest(nums, 2) << endl; // 5

    vector<int> freq = {1, 1, 1, 2, 2, 3};
    auto topK = topKFrequent(freq, 2);
    cout << "Top 2 frequent: ";
    for (int x : topK) cout << x << " ";
    cout << endl;

    MedianFinder mf;
    mf.addNum(1); mf.addNum(2);
    cout << "Median: " << mf.findMedian() << endl; // 1.5
    mf.addNum(3);
    cout << "Median: " << mf.findMedian() << endl; // 2

    return 0;
}`,
          problems: [
            ['Kth Largest Element in an Array', 'https://leetcode.com/problems/kth-largest-element-in-an-array/', 'Medium'],
            ['Top K Frequent Elements', 'https://leetcode.com/problems/top-k-frequent-elements/', 'Medium'],
            ['Find Median from Data Stream', 'https://leetcode.com/problems/find-median-from-data-stream/', 'Hard'],
            ['K Closest Points to Origin', 'https://leetcode.com/problems/k-closest-points-to-origin/', 'Medium']
          ],
          mcqs: [
            {q: 'To find the Kth largest element, which heap type and size should you use?', o: ['Max-heap of size n', 'Min-heap of size k', 'Max-heap of size k', 'Min-heap of size n'], a: 1},
            {q: 'What is the time complexity of finding top-K elements using a heap?', o: ['O(n)', 'O(n log k)', 'O(n log n)', 'O(k log n)'], a: 1},
            {q: 'In Find Median from Data Stream, what two heaps are used?', o: ['Two min-heaps', 'Two max-heaps', 'A max-heap for lower half and min-heap for upper half', 'A min-heap for lower half and max-heap for upper half'], a: 2}
          ]
        },
        {
          t: 'Merge K Sorted Lists',
          learn: '<div class="learn-section"><div class="learn-h">Problem Statement</div><p class="learn-p">Merge k sorted linked lists into one sorted linked list. This is a classic heap problem.</p></div><div class="learn-section"><div class="learn-h">Min-Heap Approach</div><p class="learn-p">Push the head of each list into a min-heap. Extract the minimum, add it to the result, and push the next node from that list.</p><p class="learn-p">Time: <span class="learn-complexity">O(N log k)</span> where N = total number of nodes, k = number of lists. Space: <span class="learn-complexity">O(k)</span> for the heap.</p></div><div class="learn-section"><div class="learn-h">Divide &amp; Conquer Alternative</div><p class="learn-p">Pair up lists and merge them, repeat until one list remains. Like merge sort on the lists themselves. Same time complexity but avoids heap overhead.</p><div class="learn-tip"><b>Tip:</b> The heap approach is more intuitive and general (works for any stream of sorted sequences). The divide &amp; conquer approach is slightly faster in practice.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Min-heap approach
ListNode* mergeKLists(vector<ListNode*>& lists) {
    auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
    priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);

    for (auto* list : lists)
        if (list) pq.push(list);

    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (!pq.empty()) {
        ListNode* node = pq.top(); pq.pop();
        tail->next = node;
        tail = tail->next;
        if (node->next) pq.push(node->next);
    }
    return dummy.next;
}

// Divide and conquer approach
ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) { tail->next = l1; l1 = l1->next; }
        else { tail->next = l2; l2 = l2->next; }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

ListNode* mergeKListsDC(vector<ListNode*>& lists, int lo, int hi) {
    if (lo > hi) return nullptr;
    if (lo == hi) return lists[lo];
    int mid = lo + (hi - lo) / 2;
    ListNode* left = mergeKListsDC(lists, lo, mid);
    ListNode* right = mergeKListsDC(lists, mid + 1, hi);
    return mergeTwoLists(left, right);
}

void printList(ListNode* head) {
    while (head) { cout << head->val << " "; head = head->next; }
    cout << endl;
}

int main() {
    // Create 3 sorted lists
    ListNode* l1 = new ListNode(1); l1->next = new ListNode(4); l1->next->next = new ListNode(5);
    ListNode* l2 = new ListNode(1); l2->next = new ListNode(3); l2->next->next = new ListNode(4);
    ListNode* l3 = new ListNode(2); l3->next = new ListNode(6);

    vector<ListNode*> lists = {l1, l2, l3};
    ListNode* merged = mergeKLists(lists);
    cout << "Merged: "; printList(merged);
    // 1 1 2 3 4 4 5 6

    return 0;
}`,
          problems: [
            ['Merge k Sorted Lists', 'https://leetcode.com/problems/merge-k-sorted-lists/', 'Hard'],
            ['Smallest Range Covering Elements from K Lists', 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/', 'Hard'],
            ['Find K Pairs with Smallest Sums', 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of merging k sorted lists using a heap?', o: ['O(N * k)', 'O(N log k)', 'O(N log N)', 'O(k log N)'], a: 1},
            {q: 'What is the heap size at any point during the merge?', o: ['N', 'k', 'N/k', '1'], a: 1},
            {q: 'What is the space complexity of the divide and conquer approach?', o: ['O(1)', 'O(log k) for recursion stack', 'O(k)', 'O(N)'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'dp', t: 'Dynamic Programming',
      topics: [
        {
          t: '1D DP (Climbing Stairs, House Robber)',
          learn: '<div class="learn-section"><div class="learn-h">What is Dynamic Programming?</div><p class="learn-p"><b>Dynamic Programming (DP)</b> solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Two approaches:</p><ul class="learn-list"><li><b>Top-Down (Memoization):</b> Recursive with cache</li><li><b>Bottom-Up (Tabulation):</b> Iterative, fill table from base cases</li></ul></div><div class="learn-section"><div class="learn-h">Climbing Stairs</div><p class="learn-p">You can climb 1 or 2 stairs at a time. How many ways to reach step n? This is essentially Fibonacci.</p><div class="learn-code">int climbStairs(int n) {\n    if (n &lt;= 2) return n;\n    int prev2 = 1, prev1 = 2;\n    for (int i = 3; i &lt;= n; i++) {\n        int curr = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}</div></div><div class="learn-section"><div class="learn-h">House Robber</div><p class="learn-p">Cannot rob adjacent houses. Maximize stolen amount. At each house: rob it (skip previous) or skip it (take previous best).</p><div class="learn-code">int rob(vector&lt;int&gt;&amp; nums) {\n    int prev2 = 0, prev1 = 0;\n    for (int x : nums) {\n        int curr = max(prev1, prev2 + x);\n        prev2 = prev1;\n        prev1 = curr;\n    }\n    return prev1;\n}</div><div class="learn-tip"><b>Tip:</b> Many 1D DP problems only need the last 1-2 states, allowing O(1) space optimization.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

// Climbing Stairs
int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// House Robber
int rob(vector<int>& nums) {
    int prev2 = 0, prev1 = 0;
    for (int x : nums) {
        int curr = max(prev1, prev2 + x);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// House Robber II (circular)
int robCircular(vector<int>& nums) {
    int n = nums.size();
    if (n == 1) return nums[0];
    auto robRange = [](vector<int>& nums, int lo, int hi) {
        int prev2 = 0, prev1 = 0;
        for (int i = lo; i <= hi; i++) {
            int curr = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    };
    return max(robRange(nums, 0, n-2), robRange(nums, 1, n-1));
}

// Minimum Cost Climbing Stairs
int minCostClimbingStairs(vector<int>& cost) {
    int n = cost.size();
    int prev2 = 0, prev1 = 0;
    for (int i = 2; i <= n; i++) {
        int curr = min(prev1 + cost[i-1], prev2 + cost[i-2]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

int main() {
    cout << "Climb 5 stairs: " << climbStairs(5) << endl; // 8

    vector<int> houses = {2, 7, 9, 3, 1};
    cout << "Rob: " << rob(houses) << endl; // 12

    vector<int> circular = {2, 3, 2};
    cout << "Rob circular: " << robCircular(circular) << endl; // 3

    vector<int> cost = {10, 15, 20};
    cout << "Min cost: " << minCostClimbingStairs(cost) << endl; // 15

    return 0;
}`,
          problems: [
            ['Climbing Stairs', 'https://leetcode.com/problems/climbing-stairs/', 'Easy'],
            ['House Robber', 'https://leetcode.com/problems/house-robber/', 'Medium'],
            ['House Robber II', 'https://leetcode.com/problems/house-robber-ii/', 'Medium'],
            ['Min Cost Climbing Stairs', 'https://leetcode.com/problems/min-cost-climbing-stairs/', 'Easy'],
            ['Decode Ways', 'https://leetcode.com/problems/decode-ways/', 'Medium']
          ],
          mcqs: [
            {q: 'What are the two approaches to DP?', o: ['Greedy and Divide & Conquer', 'Top-Down (Memoization) and Bottom-Up (Tabulation)', 'BFS and DFS', 'Recursion and Iteration'], a: 1},
            {q: 'What is the recurrence for Climbing Stairs?', o: ['dp[i] = dp[i-1] * 2', 'dp[i] = dp[i-1] + dp[i-2]', 'dp[i] = max(dp[i-1], dp[i-2])', 'dp[i] = dp[i-1] + 1'], a: 1},
            {q: 'What is the space-optimized complexity of House Robber?', o: ['O(n)', 'O(n^2)', 'O(1)', 'O(log n)'], a: 2}
          ]
        },
        {
          t: '2D DP (Unique Paths, LCS)',
          learn: '<div class="learn-section"><div class="learn-h">2D DP Problems</div><p class="learn-p">These problems use a 2D table where each cell depends on previous cells. Common in grid and string problems.</p></div><div class="learn-section"><div class="learn-h">Unique Paths</div><p class="learn-p">Count paths from top-left to bottom-right in an m x n grid, moving only right or down.</p><div class="learn-code">int uniquePaths(int m, int n) {\n    vector&lt;vector&lt;int&gt;&gt; dp(m, vector&lt;int&gt;(n, 1));\n    for (int i = 1; i &lt; m; i++)\n        for (int j = 1; j &lt; n; j++)\n            dp[i][j] = dp[i-1][j] + dp[i][j-1];\n    return dp[m-1][n-1];\n}</div></div><div class="learn-section"><div class="learn-h">Longest Common Subsequence (LCS)</div><p class="learn-p">Find the longest subsequence common to two strings. Classic 2D DP:</p><div class="learn-code">int lcs(string&amp; s1, string&amp; s2) {\n    int m = s1.size(), n = s2.size();\n    vector&lt;vector&lt;int&gt;&gt; dp(m+1, vector&lt;int&gt;(n+1, 0));\n    for (int i = 1; i &lt;= m; i++)\n        for (int j = 1; j &lt;= n; j++)\n            if (s1[i-1] == s2[j-1])\n                dp[i][j] = dp[i-1][j-1] + 1;\n            else\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n    return dp[m][n];\n}</div><div class="learn-tip"><b>Tip:</b> Many 2D DP problems can be space-optimized to O(n) by using only two rows (current and previous).</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Unique Paths
int uniquePaths(int m, int n) {
    vector<vector<int>> dp(m, vector<int>(n, 1));
    for (int i = 1; i < m; i++)
        for (int j = 1; j < n; j++)
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
    return dp[m-1][n-1];
}

// Unique Paths with Obstacles
int uniquePathsWithObstacles(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    if (grid[0][0] == 1) return 0;
    vector<vector<long long>> dp(m, vector<long long>(n, 0));
    dp[0][0] = 1;
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) { dp[i][j] = 0; continue; }
            if (i > 0) dp[i][j] += dp[i-1][j];
            if (j > 0) dp[i][j] += dp[i][j-1];
        }
    return dp[m-1][n-1];
}

// Longest Common Subsequence
int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (s1[i-1] == s2[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    return dp[m][n];
}

// Minimum Path Sum
int minPathSum(vector<vector<int>>& grid) {
    int m = grid.size(), n = grid[0].size();
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            else if (i == 0) grid[i][j] += grid[i][j-1];
            else if (j == 0) grid[i][j] += grid[i-1][j];
            else grid[i][j] += min(grid[i-1][j], grid[i][j-1]);
        }
    return grid[m-1][n-1];
}

int main() {
    cout << "Unique Paths 3x7: " << uniquePaths(3, 7) << endl; // 28

    string s1 = "abcde", s2 = "ace";
    cout << "LCS: " << lcs(s1, s2) << endl; // 3

    vector<vector<int>> grid = {{1,3,1},{1,5,1},{4,2,1}};
    cout << "Min Path Sum: " << minPathSum(grid) << endl; // 7

    return 0;
}`,
          problems: [
            ['Unique Paths', 'https://leetcode.com/problems/unique-paths/', 'Medium'],
            ['Unique Paths II', 'https://leetcode.com/problems/unique-paths-ii/', 'Medium'],
            ['Longest Common Subsequence', 'https://leetcode.com/problems/longest-common-subsequence/', 'Medium'],
            ['Minimum Path Sum', 'https://leetcode.com/problems/minimum-path-sum/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the recurrence for Unique Paths?', o: ['dp[i][j] = dp[i-1][j] * dp[i][j-1]', 'dp[i][j] = dp[i-1][j] + dp[i][j-1]', 'dp[i][j] = min(dp[i-1][j], dp[i][j-1])', 'dp[i][j] = dp[i-1][j-1] + 1'], a: 1},
            {q: 'In LCS, when characters match (s1[i] == s2[j]), what is the recurrence?', o: ['dp[i][j] = dp[i-1][j-1] + 1', 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])', 'dp[i][j] = dp[i-1][j-1]', 'dp[i][j] = dp[i][j-1] + 1'], a: 0},
            {q: 'Can 2D DP be space-optimized?', o: ['No', 'Yes, to O(min(m,n)) using two rows', 'Only for square matrices', 'Only for string problems'], a: 1}
          ]
        },
        {
          t: 'DP on Strings (Edit Distance)',
          learn: '<div class="learn-section"><div class="learn-h">Edit Distance (Levenshtein Distance)</div><p class="learn-p">Find the minimum number of operations (insert, delete, replace) to transform one string into another.</p><div class="learn-code">int editDistance(string&amp; s1, string&amp; s2) {\n    int m = s1.size(), n = s2.size();\n    vector&lt;vector&lt;int&gt;&gt; dp(m+1, vector&lt;int&gt;(n+1));\n    for (int i = 0; i &lt;= m; i++) dp[i][0] = i;\n    for (int j = 0; j &lt;= n; j++) dp[0][j] = j;\n    for (int i = 1; i &lt;= m; i++)\n        for (int j = 1; j &lt;= n; j++)\n            if (s1[i-1] == s2[j-1])\n                dp[i][j] = dp[i-1][j-1];\n            else\n                dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});\n    return dp[m][n];\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(m * n)</span>, Space: <span class="learn-complexity">O(m * n)</span> (can optimize to O(n)).</p></div><div class="learn-section"><div class="learn-h">Other String DP Problems</div><ul class="learn-list"><li><b>Distinct Subsequences:</b> Count subsequences of s that equal t</li><li><b>Wildcard Matching:</b> Match string with pattern containing ? and *</li><li><b>Regular Expression Matching:</b> Match with . and *</li></ul><div class="learn-tip"><b>Tip:</b> String DP problems almost always have a 2D table where dp[i][j] represents the answer for the first i characters of s1 and first j characters of s2.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Edit Distance
int editDistance(string& word1, string& word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (word1[i-1] == word2[j-1])
                dp[i][j] = dp[i-1][j-1];
            else
                dp[i][j] = 1 + min({dp[i-1][j],     // delete
                                     dp[i][j-1],     // insert
                                     dp[i-1][j-1]}); // replace
    return dp[m][n];
}

// Distinct Subsequences
int numDistinct(string& s, string& t) {
    int m = s.size(), n = t.size();
    vector<vector<unsigned long long>> dp(m + 1, vector<unsigned long long>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = 1;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            dp[i][j] = dp[i-1][j]; // skip s[i-1]
            if (s[i-1] == t[j-1])
                dp[i][j] += dp[i-1][j-1]; // use s[i-1]
        }
    return dp[m][n];
}

// Wildcard Matching
bool isMatch(string& s, string& p) {
    int m = s.size(), n = p.size();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true;
    for (int j = 1; j <= n; j++)
        if (p[j-1] == '*') dp[0][j] = dp[0][j-1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++) {
            if (p[j-1] == '*')
                dp[i][j] = dp[i-1][j] || dp[i][j-1];
            else if (p[j-1] == '?' || s[i-1] == p[j-1])
                dp[i][j] = dp[i-1][j-1];
        }
    return dp[m][n];
}

int main() {
    string w1 = "horse", w2 = "ros";
    cout << "Edit distance: " << editDistance(w1, w2) << endl; // 3

    string s = "rabbbit", t = "rabbit";
    cout << "Distinct subsequences: " << numDistinct(s, t) << endl; // 3

    string str = "adceb", pat = "*a*b";
    cout << "Wildcard match: " << isMatch(str, pat) << endl; // 1

    return 0;
}`,
          problems: [
            ['Edit Distance', 'https://leetcode.com/problems/edit-distance/', 'Medium'],
            ['Distinct Subsequences', 'https://leetcode.com/problems/distinct-subsequences/', 'Hard'],
            ['Wildcard Matching', 'https://leetcode.com/problems/wildcard-matching/', 'Hard'],
            ['Regular Expression Matching', 'https://leetcode.com/problems/regular-expression-matching/', 'Hard']
          ],
          mcqs: [
            {q: 'In Edit Distance, what does dp[i][j] represent?', o: ['Length of LCS', 'Min operations to convert first i chars of s1 to first j chars of s2', 'Number of matching characters', 'Max common substring length'], a: 1},
            {q: 'When characters match in Edit Distance, what is the cost?', o: ['1', '0 (carry forward dp[i-1][j-1])', 'dp[i-1][j] + 1', 'min of three options'], a: 1},
            {q: 'What are the three operations in Edit Distance?', o: ['Add, Remove, Sort', 'Insert, Delete, Replace', 'Swap, Reverse, Shift', 'Copy, Move, Delete'], a: 1}
          ]
        },
        {
          t: 'DP on Subsequences (LIS)',
          learn: '<div class="learn-section"><div class="learn-h">Longest Increasing Subsequence</div><p class="learn-p">Find the length of the longest strictly increasing subsequence. Two approaches:</p><p class="learn-p"><b>O(n^2) DP:</b> dp[i] = length of LIS ending at index i.</p><div class="learn-code">int lis_n2(vector&lt;int&gt;&amp; nums) {\n    int n = nums.size(), maxLen = 1;\n    vector&lt;int&gt; dp(n, 1);\n    for (int i = 1; i &lt; n; i++)\n        for (int j = 0; j &lt; i; j++)\n            if (nums[j] &lt; nums[i])\n                dp[i] = max(dp[i], dp[j] + 1);\n    return *max_element(dp.begin(), dp.end());\n}</div><p class="learn-p"><b>O(n log n) with Binary Search:</b> Maintain a "tails" array where tails[i] = smallest tail element for LIS of length i+1.</p><div class="learn-code">int lis_nlogn(vector&lt;int&gt;&amp; nums) {\n    vector&lt;int&gt; tails;\n    for (int x : nums) {\n        auto it = lower_bound(tails.begin(), tails.end(), x);\n        if (it == tails.end()) tails.push_back(x);\n        else *it = x;\n    }\n    return tails.size();\n}</div><div class="learn-tip"><b>Tip:</b> The O(n log n) LIS is a very important algorithm. The tails array is not the actual LIS, but its length is correct.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// LIS O(n^2)
int lisDP(vector<int>& nums) {
    int n = nums.size();
    vector<int> dp(n, 1);
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (nums[j] < nums[i])
                dp[i] = max(dp[i], dp[j] + 1);
    return *max_element(dp.begin(), dp.end());
}

// LIS O(n log n)
int lisBinarySearch(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}

// Number of Longest Increasing Subsequences
int findNumberOfLIS(vector<int>& nums) {
    int n = nums.size(), maxLen = 1, count = 0;
    vector<int> len(n, 1), cnt(n, 1);
    for (int i = 1; i < n; i++)
        for (int j = 0; j < i; j++)
            if (nums[j] < nums[i]) {
                if (len[j] + 1 > len[i]) {
                    len[i] = len[j] + 1;
                    cnt[i] = cnt[j];
                } else if (len[j] + 1 == len[i]) {
                    cnt[i] += cnt[j];
                }
            }
    maxLen = *max_element(len.begin(), len.end());
    for (int i = 0; i < n; i++)
        if (len[i] == maxLen) count += cnt[i];
    return count;
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << "LIS (DP): " << lisDP(nums) << endl;           // 4
    cout << "LIS (BS): " << lisBinarySearch(nums) << endl;  // 4

    vector<int> nums2 = {1, 3, 5, 4, 7};
    cout << "Number of LIS: " << findNumberOfLIS(nums2) << endl; // 2

    return 0;
}`,
          problems: [
            ['Longest Increasing Subsequence', 'https://leetcode.com/problems/longest-increasing-subsequence/', 'Medium'],
            ['Number of Longest Increasing Subsequence', 'https://leetcode.com/problems/number-of-longest-increasing-subsequence/', 'Medium'],
            ['Russian Doll Envelopes', 'https://leetcode.com/problems/russian-doll-envelopes/', 'Hard'],
            ['Longest String Chain', 'https://leetcode.com/problems/longest-string-chain/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of the optimal LIS algorithm?', o: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(2^n)'], a: 2},
            {q: 'In the O(n log n) LIS, what does the tails array represent?', o: ['The actual LIS', 'Smallest tail element for each LIS length', 'All increasing subsequences', 'Sorted version of input'], a: 1},
            {q: 'What binary search operation is used in O(n log n) LIS?', o: ['upper_bound', 'lower_bound', 'binary_search', 'find'], a: 1}
          ]
        },
        {
          t: 'Knapsack Problems (0/1, Unbounded)',
          learn: '<div class="learn-section"><div class="learn-h">0/1 Knapsack</div><p class="learn-p">Given items with weights and values, and a capacity W, maximize total value without exceeding capacity. Each item can be used at most once.</p><div class="learn-code">int knapsack01(vector&lt;int&gt;&amp; wt, vector&lt;int&gt;&amp; val, int W) {\n    int n = wt.size();\n    vector&lt;int&gt; dp(W + 1, 0);\n    for (int i = 0; i &lt; n; i++)\n        for (int w = W; w &gt;= wt[i]; w--)  // reverse order!\n            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);\n    return dp[W];\n}</div><p class="learn-p">Note: iterate weights in <b>reverse</b> for 0/1 knapsack to ensure each item is used at most once.</p></div><div class="learn-section"><div class="learn-h">Unbounded Knapsack</div><p class="learn-p">Same but each item can be used unlimited times. Iterate weights in <b>forward</b> direction.</p><div class="learn-code">int unboundedKnapsack(vector&lt;int&gt;&amp; wt, vector&lt;int&gt;&amp; val, int W) {\n    vector&lt;int&gt; dp(W + 1, 0);\n    for (int i = 0; i &lt; n; i++)\n        for (int w = wt[i]; w &lt;= W; w++)  // forward order!\n            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);\n    return dp[W];\n}</div></div><div class="learn-section"><div class="learn-h">Subset Sum / Partition Equal Subset Sum</div><p class="learn-p">These are special cases of 0/1 knapsack where values equal weights. Can we select a subset that sums to target?</p><div class="learn-tip"><b>Tip:</b> The direction of the inner loop determines 0/1 vs unbounded: reverse = 0/1, forward = unbounded.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

// 0/1 Knapsack
int knapsack01(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}

// Unbounded Knapsack
int unboundedKnapsack(vector<int>& wt, vector<int>& val, int W) {
    int n = wt.size();
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int w = wt[i]; w <= W; w++)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    return dp[W];
}

// Partition Equal Subset Sum
bool canPartition(vector<int>& nums) {
    int sum = accumulate(nums.begin(), nums.end(), 0);
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    for (int num : nums)
        for (int j = target; j >= num; j--)
            dp[j] = dp[j] || dp[j - num];
    return dp[target];
}

// Coin Change (minimum coins - unbounded)
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int coin : coins)
        for (int j = coin; j <= amount; j++)
            dp[j] = min(dp[j], dp[j - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}

int main() {
    vector<int> wt = {1, 3, 4, 5}, val = {1, 4, 5, 7};
    cout << "0/1 Knapsack (W=7): " << knapsack01(wt, val, 7) << endl; // 9

    cout << "Unbounded (W=7): " << unboundedKnapsack(wt, val, 7) << endl;

    vector<int> nums = {1, 5, 11, 5};
    cout << "Can partition: " << canPartition(nums) << endl; // 1

    vector<int> coins = {1, 2, 5};
    cout << "Coin change (11): " << coinChange(coins, 11) << endl; // 3

    return 0;
}`,
          problems: [
            ['Partition Equal Subset Sum', 'https://leetcode.com/problems/partition-equal-subset-sum/', 'Medium'],
            ['Coin Change', 'https://leetcode.com/problems/coin-change/', 'Medium'],
            ['Coin Change II', 'https://leetcode.com/problems/coin-change-ii/', 'Medium'],
            ['Target Sum', 'https://leetcode.com/problems/target-sum/', 'Medium'],
            ['Ones and Zeroes', 'https://leetcode.com/problems/ones-and-zeroes/', 'Medium']
          ],
          mcqs: [
            {q: 'What determines 0/1 vs unbounded knapsack in 1D space optimization?', o: ['The number of items', 'The direction of the inner loop (reverse vs forward)', 'The size of the capacity', 'Whether values are positive'], a: 1},
            {q: 'Partition Equal Subset Sum is a special case of which problem?', o: ['LIS', '0/1 Knapsack (with target = totalSum/2)', 'LCS', 'Coin Change'], a: 1},
            {q: 'What is the time complexity of the 1D knapsack solution?', o: ['O(n)', 'O(W)', 'O(n * W)', 'O(2^n)'], a: 2}
          ]
        },
        {
          t: 'DP on Trees',
          learn: '<div class="learn-section"><div class="learn-h">Tree DP Pattern</div><p class="learn-p"><b>DP on Trees</b> computes values bottom-up from leaves to root. At each node, combine results from children. Common pattern:</p><div class="learn-code">int dfs(TreeNode* node) {\n    if (!node) return BASE_CASE;\n    int left = dfs(node-&gt;left);\n    int right = dfs(node-&gt;right);\n    // Update global answer using left + right\n    // Return value for parent\n}</div></div><div class="learn-section"><div class="learn-h">Examples</div><p class="learn-p"><b>Binary Tree Maximum Path Sum:</b> At each node, compute max path through that node (left + node + right) and update global max. Return max single-side path to parent.</p><p class="learn-p"><b>House Robber III:</b> Each node has two states: robbed or not robbed. Return a pair of values from each subtree.</p><div class="learn-tip"><b>Tip:</b> Tree DP typically involves returning one or two values from each subtree and maintaining a global answer.</div></div>',
          code: `#include <iostream>
#include <algorithm>
#include <climits>
using namespace std;

struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Binary Tree Maximum Path Sum
int maxPathSumHelper(TreeNode* root, int& globalMax) {
    if (!root) return 0;
    int left = max(0, maxPathSumHelper(root->left, globalMax));
    int right = max(0, maxPathSumHelper(root->right, globalMax));
    globalMax = max(globalMax, left + right + root->val);
    return max(left, right) + root->val;
}

int maxPathSum(TreeNode* root) {
    int globalMax = INT_MIN;
    maxPathSumHelper(root, globalMax);
    return globalMax;
}

// House Robber III
pair<int,int> robHelper(TreeNode* root) {
    if (!root) return {0, 0};
    auto [leftRob, leftSkip] = robHelper(root->left);
    auto [rightRob, rightSkip] = robHelper(root->right);
    int rob = root->val + leftSkip + rightSkip;
    int skip = max(leftRob, leftSkip) + max(rightRob, rightSkip);
    return {rob, skip};
}

int rob(TreeNode* root) {
    auto [robbed, skipped] = robHelper(root);
    return max(robbed, skipped);
}

// Longest Path in Tree (similar to diameter)
int longestPath(TreeNode* root, int& result) {
    if (!root) return 0;
    int left = longestPath(root->left, result);
    int right = longestPath(root->right, result);
    result = max(result, left + right);
    return 1 + max(left, right);
}

int main() {
    TreeNode* root = new TreeNode(-10);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);
    cout << "Max path sum: " << maxPathSum(root) << endl; // 42

    TreeNode* r2 = new TreeNode(3);
    r2->left = new TreeNode(2);
    r2->right = new TreeNode(3);
    r2->left->right = new TreeNode(3);
    r2->right->right = new TreeNode(1);
    cout << "Rob: " << rob(r2) << endl; // 7

    return 0;
}`,
          problems: [
            ['Binary Tree Maximum Path Sum', 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', 'Hard'],
            ['House Robber III', 'https://leetcode.com/problems/house-robber-iii/', 'Medium'],
            ['Diameter of Binary Tree', 'https://leetcode.com/problems/diameter-of-binary-tree/', 'Easy'],
            ['Longest Univalue Path', 'https://leetcode.com/problems/longest-univalue-path/', 'Medium']
          ],
          mcqs: [
            {q: 'In tree DP, what direction does computation flow?', o: ['Top to bottom', 'Bottom to top (leaves to root)', 'Left to right', 'Random'], a: 1},
            {q: 'In Maximum Path Sum, why do we max(0, child)?', o: ['To handle null nodes', 'To exclude negative paths (better to not include them)', 'To ensure positive result', 'It is a coding convention'], a: 1},
            {q: 'In House Robber III, what two values does each node return?', o: ['Min and max', 'Value if robbed and value if not robbed', 'Left and right sums', 'Height and depth'], a: 1}
          ]
        },
        {
          t: 'Partition DP',
          learn: '<div class="learn-section"><div class="learn-h">What is Partition DP?</div><p class="learn-p"><b>Partition DP</b> problems involve splitting an array or string at various points and finding the optimal way to partition. The general pattern:</p><div class="learn-code">// dp[i][j] = optimal answer for range [i, j]\nfor (int len = 2; len &lt;= n; len++)\n    for (int i = 0; i + len - 1 &lt; n; i++) {\n        int j = i + len - 1;\n        for (int k = i; k &lt; j; k++)  // try all split points\n            dp[i][j] = optimize(dp[i][k], dp[k+1][j]);\n    }</div></div><div class="learn-section"><div class="learn-h">Matrix Chain Multiplication</div><p class="learn-p">Find the minimum number of scalar multiplications to multiply a chain of matrices. Try every split point between i and j.</p></div><div class="learn-section"><div class="learn-h">Palindrome Partitioning II</div><p class="learn-p">Find minimum cuts to partition a string into palindromes.</p><div class="learn-code">int minCut(string&amp; s) {\n    int n = s.size();\n    vector&lt;int&gt; dp(n, 0);\n    vector&lt;vector&lt;bool&gt;&gt; isPalin(n, vector&lt;bool&gt;(n, false));\n    for (int i = n-1; i &gt;= 0; i--)\n        for (int j = i; j &lt; n; j++)\n            isPalin[i][j] = (s[i] == s[j]) &amp;&amp; (j - i &lt; 2 || isPalin[i+1][j-1]);\n    for (int i = 0; i &lt; n; i++) {\n        if (isPalin[0][i]) { dp[i] = 0; continue; }\n        dp[i] = i;  // worst case: cut after every char\n        for (int j = 1; j &lt;= i; j++)\n            if (isPalin[j][i])\n                dp[i] = min(dp[i], dp[j-1] + 1);\n    }\n    return dp[n-1];\n}</div><div class="learn-tip"><b>Tip:</b> Partition DP is about trying all possible split/cut points. The time complexity is usually O(n^3) for the basic version.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <string>
#include <climits>
using namespace std;

// Matrix Chain Multiplication
int matrixChainMultiplication(vector<int>& dims) {
    int n = dims.size() - 1; // number of matrices
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            dp[i][j] = INT_MAX;
            for (int k = i; k < j; k++) {
                int cost = dp[i][k] + dp[k+1][j] +
                           dims[i] * dims[k+1] * dims[j+1];
                dp[i][j] = min(dp[i][j], cost);
            }
        }
    }
    return dp[0][n-1];
}

// Palindrome Partitioning II - minimum cuts
int minCut(string& s) {
    int n = s.size();
    vector<vector<bool>> isPalin(n, vector<bool>(n, false));
    for (int i = n - 1; i >= 0; i--)
        for (int j = i; j < n; j++)
            isPalin[i][j] = (s[i] == s[j]) && (j - i < 2 || isPalin[i+1][j-1]);

    vector<int> dp(n, 0);
    for (int i = 0; i < n; i++) {
        if (isPalin[0][i]) { dp[i] = 0; continue; }
        dp[i] = i;
        for (int j = 1; j <= i; j++)
            if (isPalin[j][i])
                dp[i] = min(dp[i], dp[j-1] + 1);
    }
    return dp[n-1];
}

// Burst Balloons
int maxCoins(vector<int>& nums) {
    int n = nums.size();
    vector<int> balloons(n + 2, 1);
    for (int i = 0; i < n; i++) balloons[i + 1] = nums[i];
    n += 2;
    vector<vector<int>> dp(n, vector<int>(n, 0));
    for (int len = 2; len < n; len++)
        for (int left = 0; left + len < n; left++) {
            int right = left + len;
            for (int k = left + 1; k < right; k++)
                dp[left][right] = max(dp[left][right],
                    dp[left][k] + dp[k][right] +
                    balloons[left] * balloons[k] * balloons[right]);
        }
    return dp[0][n-1];
}

int main() {
    vector<int> dims = {10, 20, 30, 40, 30}; // 4 matrices
    cout << "MCM: " << matrixChainMultiplication(dims) << endl; // 30000

    string s = "aab";
    cout << "Min cuts: " << minCut(s) << endl; // 1

    vector<int> balloons = {3, 1, 5, 8};
    cout << "Max coins: " << maxCoins(balloons) << endl; // 167

    return 0;
}`,
          problems: [
            ['Palindrome Partitioning II', 'https://leetcode.com/problems/palindrome-partitioning-ii/', 'Hard'],
            ['Burst Balloons', 'https://leetcode.com/problems/burst-balloons/', 'Hard'],
            ['Minimum Cost Tree From Leaf Values', 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/', 'Medium'],
            ['Strange Printer', 'https://leetcode.com/problems/strange-printer/', 'Hard']
          ],
          mcqs: [
            {q: 'What is the typical time complexity of partition DP?', o: ['O(n)', 'O(n^2)', 'O(n^3)', 'O(2^n)'], a: 2},
            {q: 'In Matrix Chain Multiplication, what does dp[i][j] represent?', o: ['Number of matrices', 'Min scalar multiplications to multiply matrices i through j', 'Max product', 'Size of result matrix'], a: 1},
            {q: 'What is the key idea behind partition DP?', o: ['Sort the input', 'Try all possible split/cut points in a range', 'Use greedy selection', 'Binary search on answer'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'graphs', t: 'Graphs',
      topics: [
        {
          t: 'BFS & DFS',
          learn: '<div class="learn-section"><div class="learn-h">Graph Representations</div><p class="learn-p">Graphs can be represented as:</p><ul class="learn-list"><li><b>Adjacency List:</b> <code>vector&lt;vector&lt;int&gt;&gt; adj(n)</code> — space efficient for sparse graphs</li><li><b>Adjacency Matrix:</b> <code>vector&lt;vector&lt;int&gt;&gt; mat(n, vector&lt;int&gt;(n, 0))</code> — O(1) edge lookup</li></ul></div><div class="learn-section"><div class="learn-h">BFS (Breadth-First Search)</div><p class="learn-p">BFS explores level by level using a <b>queue</b>. It finds the <b>shortest path in unweighted graphs</b>.</p><div class="learn-code">void bfs(int start, vector&lt;vector&lt;int&gt;&gt;&amp; adj) {\n    vector&lt;bool&gt; visited(n, false);\n    queue&lt;int&gt; q;\n    q.push(start);\n    visited[start] = true;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        for (int neighbor : adj[node]) {\n            if (!visited[neighbor]) {\n                visited[neighbor] = true;\n                q.push(neighbor);\n            }\n        }\n    }\n}</div></div><div class="learn-section"><div class="learn-h">DFS (Depth-First Search)</div><p class="learn-p">DFS explores as deep as possible before backtracking. Uses <b>recursion</b> or an explicit <b>stack</b>.</p><div class="learn-code">void dfs(int node, vector&lt;vector&lt;int&gt;&gt;&amp; adj, vector&lt;bool&gt;&amp; visited) {\n    visited[node] = true;\n    for (int neighbor : adj[node])\n        if (!visited[neighbor])\n            dfs(neighbor, adj, visited);\n}</div><p class="learn-p">Both BFS and DFS have time complexity <span class="learn-complexity">O(V + E)</span>.</p><div class="learn-tip"><b>Tip:</b> Use BFS for shortest path in unweighted graphs. Use DFS for cycle detection, topological sort, and exploring all paths.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// BFS
void bfs(int start, vector<vector<int>>& adj, int n) {
    vector<bool> visited(n, false);
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int nb : adj[node]) {
            if (!visited[nb]) {
                visited[nb] = true;
                q.push(nb);
            }
        }
    }
    cout << endl;
}

// DFS (recursive)
void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int nb : adj[node])
        if (!visited[nb])
            dfs(nb, adj, visited);
}

// Count connected components
int countComponents(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, adj, visited);
            count++;
        }
    }
    return count;
}

// BFS shortest path (unweighted)
vector<int> shortestPath(int start, vector<vector<int>>& adj, int n) {
    vector<int> dist(n, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        for (int nb : adj[node]) {
            if (dist[nb] == -1) {
                dist[nb] = dist[node] + 1;
                q.push(nb);
            }
        }
    }
    return dist;
}

int main() {
    int n = 6;
    vector<vector<int>> adj(n);
    adj[0] = {1, 2}; adj[1] = {0, 3}; adj[2] = {0, 4};
    adj[3] = {1, 5}; adj[4] = {2}; adj[5] = {3};

    cout << "BFS from 0: "; bfs(0, adj, n);
    vector<bool> visited(n, false);
    cout << "DFS from 0: "; dfs(0, adj, visited); cout << endl;

    auto dist = shortestPath(0, adj, n);
    cout << "Distances: ";
    for (int d : dist) cout << d << " ";
    cout << endl;

    return 0;
}`,
          problems: [
            ['Number of Islands', 'https://leetcode.com/problems/number-of-islands/', 'Medium'],
            ['Flood Fill', 'https://leetcode.com/problems/flood-fill/', 'Easy'],
            ['Clone Graph', 'https://leetcode.com/problems/clone-graph/', 'Medium'],
            ['Rotting Oranges', 'https://leetcode.com/problems/rotting-oranges/', 'Medium'],
            ['Word Ladder', 'https://leetcode.com/problems/word-ladder/', 'Hard']
          ],
          mcqs: [
            {q: 'What data structure does BFS use?', o: ['Stack', 'Queue', 'Heap', 'Array'], a: 1},
            {q: 'BFS finds shortest path in which type of graph?', o: ['Weighted', 'Unweighted', 'Both', 'Neither'], a: 1},
            {q: 'What is the time complexity of BFS/DFS?', o: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'], a: 2}
          ]
        },
        {
          t: 'Cycle Detection',
          learn: '<div class="learn-section"><div class="learn-h">Cycle in Undirected Graph</div><p class="learn-p">Use DFS: if you visit a node that is already visited and is not the parent, there is a cycle.</p><div class="learn-code">bool hasCycleDFS(int node, int parent, vector&lt;vector&lt;int&gt;&gt;&amp; adj, vector&lt;bool&gt;&amp; visited) {\n    visited[node] = true;\n    for (int nb : adj[node]) {\n        if (!visited[nb]) {\n            if (hasCycleDFS(nb, node, adj, visited)) return true;\n        } else if (nb != parent) return true;\n    }\n    return false;\n}</div></div><div class="learn-section"><div class="learn-h">Cycle in Directed Graph</div><p class="learn-p">Use DFS with three states: unvisited, in-progress, completed. A back edge to an in-progress node indicates a cycle.</p><div class="learn-code">// 0=unvisited, 1=in-progress, 2=completed\nbool hasCycleDirected(int node, vector&lt;vector&lt;int&gt;&gt;&amp; adj, vector&lt;int&gt;&amp; state) {\n    state[node] = 1;\n    for (int nb : adj[node]) {\n        if (state[nb] == 1) return true; // back edge\n        if (state[nb] == 0 &amp;&amp; hasCycleDirected(nb, adj, state)) return true;\n    }\n    state[node] = 2;\n    return false;\n}</div><div class="learn-tip"><b>Tip:</b> For directed graphs, BFS-based cycle detection uses Kahn\'s algorithm (topological sort). If not all nodes are processed, there\'s a cycle.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// Cycle in undirected graph (DFS)
bool hasCycleUndirected(int node, int parent, vector<vector<int>>& adj,
                        vector<bool>& visited) {
    visited[node] = true;
    for (int nb : adj[node]) {
        if (!visited[nb]) {
            if (hasCycleUndirected(nb, node, adj, visited)) return true;
        } else if (nb != parent) {
            return true;
        }
    }
    return false;
}

// Cycle in directed graph (DFS with 3 states)
bool hasCycleDirected(int node, vector<vector<int>>& adj, vector<int>& state) {
    state[node] = 1; // in-progress
    for (int nb : adj[node]) {
        if (state[nb] == 1) return true;
        if (state[nb] == 0 && hasCycleDirected(nb, adj, state)) return true;
    }
    state[node] = 2; // completed
    return false;
}

// Cycle detection using BFS (Kahn's algorithm)
bool hasCycleBFS(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) indegree[v]++;
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) q.push(i);
    int count = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        count++;
        for (int nb : adj[node])
            if (--indegree[nb] == 0) q.push(nb);
    }
    return count != n; // cycle exists if not all nodes processed
}

int main() {
    // Undirected graph with cycle
    int n = 4;
    vector<vector<int>> adj(n);
    adj[0] = {1, 2}; adj[1] = {0, 2}; adj[2] = {0, 1, 3}; adj[3] = {2};
    vector<bool> visited(n, false);
    cout << "Undirected cycle: "
         << hasCycleUndirected(0, -1, adj, visited) << endl; // 1

    // Directed graph with cycle
    vector<vector<int>> dag(4);
    dag[0] = {1}; dag[1] = {2}; dag[2] = {3}; dag[3] = {1}; // cycle: 1->2->3->1
    vector<int> state(4, 0);
    bool cycle = false;
    for (int i = 0; i < 4; i++)
        if (state[i] == 0 && hasCycleDirected(i, dag, state)) { cycle = true; break; }
    cout << "Directed cycle: " << cycle << endl; // 1

    return 0;
}`,
          problems: [
            ['Course Schedule', 'https://leetcode.com/problems/course-schedule/', 'Medium'],
            ['Course Schedule II', 'https://leetcode.com/problems/course-schedule-ii/', 'Medium'],
            ['Graph Valid Tree', 'https://leetcode.com/problems/graph-valid-tree/', 'Medium']
          ],
          mcqs: [
            {q: 'How do you detect a cycle in an undirected graph using DFS?', o: ['Check if any node is visited twice', 'Check if a visited neighbor is not the parent', 'Count edges vs vertices', 'Use BFS'], a: 1},
            {q: 'In directed graph cycle detection, how many states does each node have?', o: ['2', '3 (unvisited, in-progress, completed)', '4', '1'], a: 1},
            {q: 'In Kahn\'s algorithm, a cycle exists when:', o: ['The queue becomes empty early', 'Not all nodes are processed', 'Indegree of all nodes is 0', 'A node appears twice in queue'], a: 1}
          ]
        },
        {
          t: 'Dijkstra\'s Shortest Path',
          learn: '<div class="learn-section"><div class="learn-h">Dijkstra\'s Algorithm</div><p class="learn-p"><b>Dijkstra\'s</b> finds the shortest path from a source to all other vertices in a <b>weighted graph with non-negative edges</b>. It uses a min-heap (priority queue).</p><div class="learn-code">vector&lt;int&gt; dijkstra(int src, vector&lt;vector&lt;pair&lt;int,int&gt;&gt;&gt;&amp; adj, int n) {\n    vector&lt;int&gt; dist(n, INT_MAX);\n    priority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, greater&lt;&gt;&gt; pq;\n    dist[src] = 0;\n    pq.push({0, src});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d &gt; dist[u]) continue; // skip outdated\n        for (auto [v, w] : adj[u]) {\n            if (dist[u] + w &lt; dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}</div><p class="learn-p">Time: <span class="learn-complexity">O((V + E) log V)</span> with a binary heap.</p><div class="learn-warn"><b>Warning:</b> Dijkstra\'s does NOT work with negative edge weights. Use Bellman-Ford for graphs with negative edges.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<int> dijkstra(int src, vector<vector<pair<int,int>>>& adj, int n) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int n = 5;
    vector<vector<pair<int,int>>> adj(n);
    // {neighbor, weight}
    adj[0] = {{1,4},{2,1}};
    adj[1] = {{3,1}};
    adj[2] = {{1,2},{3,5}};
    adj[3] = {{4,3}};
    adj[4] = {};

    auto dist = dijkstra(0, adj, n);
    cout << "Shortest distances from 0:" << endl;
    for (int i = 0; i < n; i++)
        cout << "To " << i << ": " << dist[i] << endl;
    // 0:0, 1:3, 2:1, 3:4, 4:7

    return 0;
}`,
          problems: [
            ['Network Delay Time', 'https://leetcode.com/problems/network-delay-time/', 'Medium'],
            ['Path with Minimum Effort', 'https://leetcode.com/problems/path-with-minimum-effort/', 'Medium'],
            ['Cheapest Flights Within K Stops', 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', 'Medium'],
            ['Shortest Path in Binary Matrix', 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', 'Medium']
          ],
          mcqs: [
            {q: 'Dijkstra\'s algorithm does NOT work with:', o: ['Directed graphs', 'Undirected graphs', 'Negative edge weights', 'Sparse graphs'], a: 2},
            {q: 'What is the time complexity of Dijkstra\'s with a binary heap?', o: ['O(V^2)', 'O((V+E) log V)', 'O(V * E)', 'O(E log E)'], a: 1},
            {q: 'Why do we skip nodes where d > dist[u]?', o: ['To handle negative edges', 'Because we already found a shorter path (outdated entry in PQ)', 'To avoid cycles', 'It is optional'], a: 1}
          ]
        },
        {
          t: 'Bellman-Ford Algorithm',
          learn: '<div class="learn-section"><div class="learn-h">Bellman-Ford</div><p class="learn-p"><b>Bellman-Ford</b> finds shortest paths from a source vertex, even with <b>negative edge weights</b>. It can also detect <b>negative cycles</b>.</p><div class="learn-code">vector&lt;int&gt; bellmanFord(int src, int n, vector&lt;vector&lt;int&gt;&gt;&amp; edges) {\n    vector&lt;int&gt; dist(n, INT_MAX);\n    dist[src] = 0;\n    for (int i = 0; i &lt; n - 1; i++)  // relax n-1 times\n        for (auto&amp; e : edges)\n            if (dist[e[0]] != INT_MAX &amp;&amp; dist[e[0]] + e[2] &lt; dist[e[1]])\n                dist[e[1]] = dist[e[0]] + e[2];\n    // Check for negative cycles\n    for (auto&amp; e : edges)\n        if (dist[e[0]] != INT_MAX &amp;&amp; dist[e[0]] + e[2] &lt; dist[e[1]])\n            return {};  // negative cycle exists\n    return dist;\n}</div><p class="learn-p">Time: <span class="learn-complexity">O(V * E)</span>. Slower than Dijkstra\'s but handles negative edges.</p><div class="learn-tip"><b>Tip:</b> Use Dijkstra\'s when all edges are non-negative (faster). Use Bellman-Ford when negative edges exist or to detect negative cycles.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

// edges: [from, to, weight]
vector<int> bellmanFord(int src, int n, vector<vector<int>>& edges) {
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;
    // Relax all edges n-1 times
    for (int i = 0; i < n - 1; i++) {
        for (auto& e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
    // Check for negative cycles
    for (auto& e : edges) {
        if (dist[e[0]] != INT_MAX && dist[e[0]] + e[2] < dist[e[1]]) {
            cout << "Negative cycle detected!" << endl;
            return {};
        }
    }
    return dist;
}

int main() {
    int n = 5;
    vector<vector<int>> edges = {
        {0,1,4}, {0,2,1}, {2,1,2}, {1,3,1}, {2,3,5}, {3,4,3}
    };
    auto dist = bellmanFord(0, n, edges);
    cout << "Shortest distances from 0:" << endl;
    for (int i = 0; i < n; i++)
        cout << "To " << i << ": " << dist[i] << endl;

    return 0;
}`,
          problems: [
            ['Cheapest Flights Within K Stops', 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', 'Medium'],
            ['Network Delay Time', 'https://leetcode.com/problems/network-delay-time/', 'Medium'],
            ['Negative Weight Cycle', 'https://leetcode.com/problems/find-negative-weight-cycle/', 'Medium']
          ],
          mcqs: [
            {q: 'How many times does Bellman-Ford relax all edges?', o: ['V times', 'V - 1 times', 'E times', 'E - 1 times'], a: 1},
            {q: 'How does Bellman-Ford detect negative cycles?', o: ['If any distance changes after V-1 relaxations, a negative cycle exists', 'If the distance array has negative values', 'If BFS visits a node twice', 'By checking if the graph is connected'], a: 0},
            {q: 'What is the time complexity of Bellman-Ford?', o: ['O(V + E)', 'O(V log V)', 'O(V * E)', 'O(E log V)'], a: 2}
          ]
        },
        {
          t: 'MST - Prim & Kruskal',
          learn: '<div class="learn-section"><div class="learn-h">Minimum Spanning Tree</div><p class="learn-p">An MST is a subset of edges that connects all vertices with the minimum total edge weight, without cycles.</p></div><div class="learn-section"><div class="learn-h">Kruskal\'s Algorithm</div><p class="learn-p">Sort edges by weight, add each edge if it doesn\'t form a cycle (checked using Union-Find). Time: <span class="learn-complexity">O(E log E)</span>.</p></div><div class="learn-section"><div class="learn-h">Prim\'s Algorithm</div><p class="learn-p">Start from any vertex, greedily add the cheapest edge connecting a visited vertex to an unvisited one. Use a min-heap. Time: <span class="learn-complexity">O(E log V)</span>.</p><div class="learn-code">int primMST(int n, vector&lt;vector&lt;pair&lt;int,int&gt;&gt;&gt;&amp; adj) {\n    vector&lt;bool&gt; inMST(n, false);\n    priority_queue&lt;pair&lt;int,int&gt;, vector&lt;pair&lt;int,int&gt;&gt;, greater&lt;&gt;&gt; pq;\n    pq.push({0, 0}); // {weight, node}\n    int totalWeight = 0;\n    while (!pq.empty()) {\n        auto [w, u] = pq.top(); pq.pop();\n        if (inMST[u]) continue;\n        inMST[u] = true;\n        totalWeight += w;\n        for (auto [v, wt] : adj[u])\n            if (!inMST[v]) pq.push({wt, v});\n    }\n    return totalWeight;\n}</div><div class="learn-tip"><b>Tip:</b> Use Kruskal\'s when you have an edge list. Use Prim\'s when you have an adjacency list and the graph is dense.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

// Union-Find for Kruskal's
class UnionFind {
    vector<int> parent, rank_;
public:
    UnionFind(int n) : parent(n), rank_(n, 0) {
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        return true;
    }
};

// Kruskal's MST
int kruskalMST(int n, vector<vector<int>>& edges) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) {
        return a[2] < b[2];
    });
    UnionFind uf(n);
    int totalWeight = 0, edgesUsed = 0;
    for (auto& e : edges) {
        if (uf.unite(e[0], e[1])) {
            totalWeight += e[2];
            if (++edgesUsed == n - 1) break;
        }
    }
    return totalWeight;
}

// Prim's MST
int primMST(int n, vector<vector<pair<int,int>>>& adj) {
    vector<bool> inMST(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
    int totalWeight = 0;
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true;
        totalWeight += w;
        for (auto [v, wt] : adj[u])
            if (!inMST[v]) pq.push({wt, v});
    }
    return totalWeight;
}

int main() {
    // Kruskal's
    vector<vector<int>> edges = {{0,1,4},{0,2,1},{1,2,2},{1,3,5},{2,3,8},{3,4,3}};
    cout << "Kruskal MST: " << kruskalMST(5, edges) << endl;

    // Prim's
    vector<vector<pair<int,int>>> adj(5);
    adj[0] = {{1,4},{2,1}}; adj[1] = {{0,4},{2,2},{3,5}};
    adj[2] = {{0,1},{1,2},{3,8}}; adj[3] = {{1,5},{2,8},{4,3}};
    adj[4] = {{3,3}};
    cout << "Prim MST: " << primMST(5, adj) << endl;

    return 0;
}`,
          problems: [
            ['Min Cost to Connect All Points', 'https://leetcode.com/problems/min-cost-to-connect-all-points/', 'Medium'],
            ['Connecting Cities With Minimum Cost', 'https://leetcode.com/problems/connecting-cities-with-minimum-cost/', 'Medium'],
            ['Find Critical and Pseudo-Critical Edges in MST', 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/', 'Hard']
          ],
          mcqs: [
            {q: 'What data structure does Kruskal\'s use to detect cycles?', o: ['BFS', 'DFS', 'Union-Find', 'Hash Map'], a: 2},
            {q: 'How many edges does an MST of V vertices have?', o: ['V', 'V - 1', 'E', 'V + 1'], a: 1},
            {q: 'What is the time complexity of Kruskal\'s algorithm?', o: ['O(V^2)', 'O(E log E)', 'O(V + E)', 'O(E * V)'], a: 1}
          ]
        },
        {
          t: 'Topological Sort',
          learn: '<div class="learn-section"><div class="learn-h">What is Topological Sort?</div><p class="learn-p"><b>Topological sort</b> orders vertices of a <b>directed acyclic graph (DAG)</b> such that for every edge (u, v), u comes before v. It\'s used for task scheduling, dependency resolution, and course prerequisites.</p></div><div class="learn-section"><div class="learn-h">Kahn\'s Algorithm (BFS)</div><div class="learn-code">vector&lt;int&gt; topoSort(int n, vector&lt;vector&lt;int&gt;&gt;&amp; adj) {\n    vector&lt;int&gt; indegree(n, 0);\n    for (int u = 0; u &lt; n; u++)\n        for (int v : adj[u]) indegree[v]++;\n    queue&lt;int&gt; q;\n    for (int i = 0; i &lt; n; i++)\n        if (indegree[i] == 0) q.push(i);\n    vector&lt;int&gt; order;\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        order.push_back(node);\n        for (int nb : adj[node])\n            if (--indegree[nb] == 0) q.push(nb);\n    }\n    return order.size() == n ? order : vector&lt;int&gt;(); // empty if cycle\n}</div></div><div class="learn-section"><div class="learn-h">DFS-based Topological Sort</div><p class="learn-p">Do DFS and push nodes to result when all descendants are processed (post-order). Reverse the result.</p><div class="learn-tip"><b>Tip:</b> Topological sort is only possible on DAGs. If the graph has a cycle, topological sort is impossible.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <queue>
#include <stack>
using namespace std;

// Kahn's Algorithm (BFS-based topological sort)
vector<int> topoSortBFS(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) indegree[v]++;
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indegree[i] == 0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int nb : adj[node])
            if (--indegree[nb] == 0) q.push(nb);
    }
    return order.size() == (size_t)n ? order : vector<int>();
}

// DFS-based topological sort
void dfsTopo(int node, vector<vector<int>>& adj, vector<bool>& visited,
             stack<int>& st) {
    visited[node] = true;
    for (int nb : adj[node])
        if (!visited[nb]) dfsTopo(nb, adj, visited, st);
    st.push(node);
}

vector<int> topoSortDFS(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    stack<int> st;
    for (int i = 0; i < n; i++)
        if (!visited[i]) dfsTopo(i, adj, visited, st);
    vector<int> order;
    while (!st.empty()) { order.push_back(st.top()); st.pop(); }
    return order;
}

int main() {
    int n = 6;
    vector<vector<int>> adj(n);
    adj[5] = {2, 0}; adj[4] = {0, 1}; adj[2] = {3}; adj[3] = {1};

    auto order = topoSortBFS(n, adj);
    cout << "Topological order (BFS): ";
    for (int x : order) cout << x << " ";
    cout << endl;

    auto orderDFS = topoSortDFS(n, adj);
    cout << "Topological order (DFS): ";
    for (int x : orderDFS) cout << x << " ";
    cout << endl;

    return 0;
}`,
          problems: [
            ['Course Schedule', 'https://leetcode.com/problems/course-schedule/', 'Medium'],
            ['Course Schedule II', 'https://leetcode.com/problems/course-schedule-ii/', 'Medium'],
            ['Alien Dictionary', 'https://leetcode.com/problems/alien-dictionary/', 'Hard'],
            ['Parallel Courses', 'https://leetcode.com/problems/parallel-courses/', 'Medium']
          ],
          mcqs: [
            {q: 'Topological sort is only valid for:', o: ['Undirected graphs', 'Directed Acyclic Graphs (DAGs)', 'All directed graphs', 'Weighted graphs'], a: 1},
            {q: 'In Kahn\'s algorithm, which nodes are processed first?', o: ['Nodes with highest indegree', 'Nodes with indegree 0', 'Random nodes', 'The source node'], a: 1},
            {q: 'What is the time complexity of topological sort?', o: ['O(V^2)', 'O(V + E)', 'O(V * E)', 'O(E log V)'], a: 1}
          ]
        },
        {
          t: 'Union-Find / DSU',
          learn: '<div class="learn-section"><div class="learn-h">Disjoint Set Union (DSU)</div><p class="learn-p"><b>Union-Find</b> (DSU) maintains a collection of disjoint sets with two operations:</p><ul class="learn-list"><li><b>Find(x):</b> Find the representative (root) of the set containing x</li><li><b>Union(x, y):</b> Merge the sets containing x and y</li></ul><p class="learn-p">With <b>path compression</b> and <b>union by rank</b>, both operations are nearly <span class="learn-complexity">O(1)</span> (amortized, technically O(alpha(n)) where alpha is the inverse Ackermann function).</p><div class="learn-code">class DSU {\n    vector&lt;int&gt; parent, rank_;\npublic:\n    DSU(int n) : parent(n), rank_(n, 0) {\n        iota(parent.begin(), parent.end(), 0);\n    }\n    int find(int x) {\n        if (parent[x] != x) parent[x] = find(parent[x]); // path compression\n        return parent[x];\n    }\n    bool unite(int x, int y) {\n        int px = find(x), py = find(y);\n        if (px == py) return false;\n        if (rank_[px] &lt; rank_[py]) swap(px, py);\n        parent[py] = px;\n        if (rank_[px] == rank_[py]) rank_[px]++;\n        return true;\n    }\n};</div></div><div class="learn-section"><div class="learn-h">Applications</div><ul class="learn-list"><li>Kruskal\'s MST algorithm</li><li>Detecting cycles in undirected graphs</li><li>Connected components</li><li>Number of Islands (union adjacent land cells)</li></ul><div class="learn-tip"><b>Tip:</b> Union-Find is the go-to for dynamic connectivity problems where you need to efficiently merge groups and check if two elements belong to the same group.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

class DSU {
    vector<int> parent, rank_;
    int components;
public:
    DSU(int n) : parent(n), rank_(n, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        components--;
        return true;
    }
    bool connected(int x, int y) { return find(x) == find(y); }
    int getComponents() { return components; }
};

// Number of connected components
int countComponents(int n, vector<vector<int>>& edges) {
    DSU dsu(n);
    for (auto& e : edges) dsu.unite(e[0], e[1]);
    return dsu.getComponents();
}

// Redundant Connection: find the edge that creates a cycle
vector<int> findRedundantConnection(vector<vector<int>>& edges) {
    int n = edges.size();
    DSU dsu(n + 1);
    for (auto& e : edges) {
        if (!dsu.unite(e[0], e[1]))
            return e;  // this edge creates a cycle
    }
    return {};
}

int main() {
    int n = 5;
    vector<vector<int>> edges = {{0,1},{1,2},{3,4}};
    cout << "Components: " << countComponents(n, edges) << endl; // 2

    DSU dsu(5);
    dsu.unite(0, 1);
    dsu.unite(2, 3);
    cout << "0-1 connected: " << dsu.connected(0, 1) << endl; // 1
    cout << "0-2 connected: " << dsu.connected(0, 2) << endl; // 0
    dsu.unite(1, 3);
    cout << "0-2 connected: " << dsu.connected(0, 2) << endl; // 1

    vector<vector<int>> redEdges = {{1,2},{1,3},{2,3}};
    auto redundant = findRedundantConnection(redEdges);
    cout << "Redundant: " << redundant[0] << "-" << redundant[1] << endl;

    return 0;
}`,
          problems: [
            ['Number of Connected Components in an Undirected Graph', 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', 'Medium'],
            ['Redundant Connection', 'https://leetcode.com/problems/redundant-connection/', 'Medium'],
            ['Accounts Merge', 'https://leetcode.com/problems/accounts-merge/', 'Medium'],
            ['Most Stones Removed with Same Row or Column', 'https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/', 'Medium']
          ],
          mcqs: [
            {q: 'What are the two optimizations in Union-Find?', o: ['BFS and DFS', 'Path compression and union by rank', 'Sorting and hashing', 'Memoization and tabulation'], a: 1},
            {q: 'What is the amortized time complexity of find() with both optimizations?', o: ['O(n)', 'O(log n)', 'O(1) (practically, O(alpha(n)))', 'O(sqrt(n))'], a: 2},
            {q: 'How does path compression work?', o: ['Sorts the tree', 'Points all nodes on the find path directly to the root', 'Balances the tree', 'Removes duplicate edges'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'greedy', t: 'Greedy',
      topics: [
        {
          t: 'Interval Scheduling & Activity Selection',
          learn: '<div class="learn-section"><div class="learn-h">Greedy Algorithm Concept</div><p class="learn-p">A <b>greedy algorithm</b> makes the locally optimal choice at each step, hoping to find the global optimum. Not all problems can be solved greedily — you need to verify the greedy choice property.</p></div><div class="learn-section"><div class="learn-h">Activity Selection / Interval Scheduling</div><p class="learn-p">Given activities with start and end times, select the maximum number of non-overlapping activities. <b>Greedy strategy:</b> always pick the activity that finishes earliest.</p><div class="learn-code">int activitySelection(vector&lt;pair&lt;int,int&gt;&gt;&amp; activities) {\n    sort(activities.begin(), activities.end(),\n         [](auto&amp; a, auto&amp; b) { return a.second &lt; b.second; });\n    int count = 1, lastEnd = activities[0].second;\n    for (int i = 1; i &lt; activities.size(); i++) {\n        if (activities[i].first &gt;= lastEnd) {\n            count++;\n            lastEnd = activities[i].second;\n        }\n    }\n    return count;\n}</div></div><div class="learn-section"><div class="learn-h">Non-overlapping Intervals</div><p class="learn-p">Find the minimum number of intervals to remove to make the rest non-overlapping. Answer = total intervals - max non-overlapping (activity selection).</p><div class="learn-tip"><b>Tip:</b> For interval scheduling problems, sorting by end time (for max activities) or by start time (for merging) is the key.</div></div>',
          code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Maximum non-overlapping activities
int activitySelection(vector<pair<int,int>>& activities) {
    sort(activities.begin(), activities.end(),
         [](auto& a, auto& b) { return a.second < b.second; });
    int count = 1, lastEnd = activities[0].second;
    for (int i = 1; i < (int)activities.size(); i++) {
        if (activities[i].first >= lastEnd) {
            count++;
            lastEnd = activities[i].second;
        }
    }
    return count;
}

// Minimum intervals to remove for non-overlapping
int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](auto& a, auto& b) { return a[1] < b[1]; });
    int keep = 1, lastEnd = intervals[0][1];
    for (int i = 1; i < (int)intervals.size(); i++) {
        if (intervals[i][0] >= lastEnd) {
            keep++;
            lastEnd = intervals[i][1];
        }
    }
    return intervals.size() - keep;
}

// Minimum number of arrows to burst balloons
int findMinArrowShots(vector<vector<int>>& points) {
    sort(points.begin(), points.end(),
         [](auto& a, auto& b) { return a[1] < b[1]; });
    int arrows = 1;
    int lastEnd = points[0][1];
    for (int i = 1; i < (int)points.size(); i++) {
        if (points[i][0] > lastEnd) {
            arrows++;
            lastEnd = points[i][1];
        }
    }
    return arrows;
}

int main() {
    vector<pair<int,int>> activities = {{1,3},{2,5},{3,9},{6,8},{5,7},{8,9}};
    cout << "Max activities: " << activitySelection(activities) << endl; // 4

    vector<vector<int>> intervals = {{1,2},{2,3},{3,4},{1,3}};
    cout << "Remove: " << eraseOverlapIntervals(intervals) << endl; // 1

    vector<vector<int>> balloons = {{10,16},{2,8},{1,6},{7,12}};
    cout << "Arrows: " << findMinArrowShots(balloons) << endl; // 2

    return 0;
}`,
          problems: [
            ['Non-overlapping Intervals', 'https://leetcode.com/problems/non-overlapping-intervals/', 'Medium'],
            ['Minimum Number of Arrows to Burst Balloons', 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/', 'Medium'],
            ['Meeting Rooms', 'https://leetcode.com/problems/meeting-rooms/', 'Easy'],
            ['Meeting Rooms II', 'https://leetcode.com/problems/meeting-rooms-ii/', 'Medium']
          ],
          mcqs: [
            {q: 'For activity selection, what should you sort by?', o: ['Start time', 'End time (earliest first)', 'Duration', 'Number of conflicts'], a: 1},
            {q: 'Minimum intervals to remove = total - ?', o: ['Overlapping count', 'Max non-overlapping intervals', 'Number of merge operations', 'Min intervals'], a: 1},
            {q: 'When does a greedy approach work?', o: ['Always', 'When the greedy choice property and optimal substructure hold', 'Only for sorting problems', 'When DP is too slow'], a: 1}
          ]
        },
        {
          t: 'Jump Game & Gas Station',
          learn: '<div class="learn-section"><div class="learn-h">Jump Game</div><p class="learn-p">Given an array where each element is the max jump length from that position, determine if you can reach the last index. <b>Greedy:</b> track the farthest reachable index.</p><div class="learn-code">bool canJump(vector&lt;int&gt;&amp; nums) {\n    int maxReach = 0;\n    for (int i = 0; i &lt; nums.size(); i++) {\n        if (i &gt; maxReach) return false;\n        maxReach = max(maxReach, i + nums[i]);\n    }\n    return true;\n}</div></div><div class="learn-section"><div class="learn-h">Jump Game II (Minimum Jumps)</div><p class="learn-p">Find minimum number of jumps. Use BFS-like approach tracking the end of current level.</p><div class="learn-code">int jump(vector&lt;int&gt;&amp; nums) {\n    int jumps = 0, curEnd = 0, farthest = 0;\n    for (int i = 0; i &lt; nums.size() - 1; i++) {\n        farthest = max(farthest, i + nums[i]);\n        if (i == curEnd) {\n            jumps++;\n            curEnd = farthest;\n        }\n    }\n    return jumps;\n}</div></div><div class="learn-section"><div class="learn-h">Gas Station</div><p class="learn-p">Determine the starting gas station for a circular route. Key insight: if total gas &gt;= total cost, a solution exists. Start from the station after where the running sum is most negative.</p><div class="learn-code">int canCompleteCircuit(vector&lt;int&gt;&amp; gas, vector&lt;int&gt;&amp; cost) {\n    int total = 0, tank = 0, start = 0;\n    for (int i = 0; i &lt; gas.size(); i++) {\n        total += gas[i] - cost[i];\n        tank += gas[i] - cost[i];\n        if (tank &lt; 0) {\n            start = i + 1;\n            tank = 0;\n        }\n    }\n    return total &gt;= 0 ? start : -1;\n}</div><div class="learn-tip"><b>Tip:</b> Greedy problems often have an "aha" insight. For Jump Game, it\'s tracking farthest reach. For Gas Station, it\'s resetting the start position when tank goes negative.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

// Jump Game I - can reach end?
bool canJump(vector<int>& nums) {
    int maxReach = 0;
    for (int i = 0; i < (int)nums.size(); i++) {
        if (i > maxReach) return false;
        maxReach = max(maxReach, i + nums[i]);
    }
    return true;
}

// Jump Game II - minimum jumps
int jump(vector<int>& nums) {
    int jumps = 0, curEnd = 0, farthest = 0;
    for (int i = 0; i < (int)nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == curEnd) {
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}

// Gas Station
int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < (int)gas.size(); i++) {
        total += gas[i] - cost[i];
        tank += gas[i] - cost[i];
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
}

int main() {
    vector<int> nums = {2, 3, 1, 1, 4};
    cout << "Can jump: " << canJump(nums) << endl;     // 1
    cout << "Min jumps: " << jump(nums) << endl;        // 2

    vector<int> nums2 = {3, 2, 1, 0, 4};
    cout << "Can jump: " << canJump(nums2) << endl;     // 0

    vector<int> gas = {1, 2, 3, 4, 5};
    vector<int> cost = {3, 4, 5, 1, 2};
    cout << "Start station: " << canCompleteCircuit(gas, cost) << endl; // 3

    return 0;
}`,
          problems: [
            ['Jump Game', 'https://leetcode.com/problems/jump-game/', 'Medium'],
            ['Jump Game II', 'https://leetcode.com/problems/jump-game-ii/', 'Medium'],
            ['Gas Station', 'https://leetcode.com/problems/gas-station/', 'Medium'],
            ['Candy', 'https://leetcode.com/problems/candy/', 'Hard']
          ],
          mcqs: [
            {q: 'In Jump Game I, what does maxReach track?', o: ['Current position', 'The farthest index reachable so far', 'Number of jumps', 'The last valid position'], a: 1},
            {q: 'What is the time complexity of Jump Game II greedy solution?', o: ['O(n^2)', 'O(n log n)', 'O(n)', 'O(2^n)'], a: 2},
            {q: 'In Gas Station, when do you reset the starting point?', o: ['At every station', 'When the running tank becomes negative', 'At the halfway point', 'When total gas < total cost'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'tries', t: 'Tries',
      topics: [
        {
          t: 'Trie Implementation & Word Search',
          learn: '<div class="learn-section"><div class="learn-h">What is a Trie?</div><p class="learn-p">A <b>Trie</b> (prefix tree) is a tree-like data structure for efficiently storing and searching strings. Each node represents a character, and paths from root to nodes represent prefixes.</p><div class="learn-code">struct TrieNode {\n    TrieNode* children[26];\n    bool isEnd;\n    TrieNode() : isEnd(false) {\n        memset(children, 0, sizeof(children));\n    }\n};</div></div><div class="learn-section"><div class="learn-h">Operations</div><table class="learn-table"><tr><th>Operation</th><th>Complexity</th></tr><tr><td>Insert word</td><td><span class="learn-complexity">O(m)</span> where m = word length</td></tr><tr><td>Search word</td><td><span class="learn-complexity">O(m)</span></td></tr><tr><td>Search prefix</td><td><span class="learn-complexity">O(m)</span></td></tr></table><div class="learn-code">void insert(TrieNode* root, string&amp; word) {\n    TrieNode* node = root;\n    for (char c : word) {\n        int idx = c - \'a\';\n        if (!node-&gt;children[idx])\n            node-&gt;children[idx] = new TrieNode();\n        node = node-&gt;children[idx];\n    }\n    node-&gt;isEnd = true;\n}</div></div><div class="learn-section"><div class="learn-h">Applications</div><ul class="learn-list"><li><b>Autocomplete:</b> Find all words with a given prefix</li><li><b>Spell checking:</b> Check if a word exists in dictionary</li><li><b>Word Search II:</b> Find all words from dictionary in a grid using Trie + DFS</li><li><b>XOR problems:</b> Binary trie for maximum XOR queries</li></ul><div class="learn-tip"><b>Tip:</b> Tries trade space for time. They use more memory than hash sets but provide prefix-based operations that hash sets cannot.</div></div>',
          code: `#include <iostream>
#include <string>
#include <vector>
#include <cstring>
using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool isEnd;
    TrieNode() : isEnd(false) {
        memset(children, 0, sizeof(children));
    }
};

class Trie {
    TrieNode* root;
public:
    Trie() { root = new TrieNode(); }

    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx])
                node->children[idx] = new TrieNode();
            node = node->children[idx];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            node = node->children[idx];
        }
        return node->isEnd;
    }

    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!node->children[idx]) return false;
            node = node->children[idx];
        }
        return true;
    }

    // Collect all words with given prefix
    void collectWords(TrieNode* node, string& current, vector<string>& result) {
        if (node->isEnd) result.push_back(current);
        for (int i = 0; i < 26; i++) {
            if (node->children[i]) {
                current += ('a' + i);
                collectWords(node->children[i], current, result);
                current.pop_back();
            }
        }
    }

    vector<string> autocomplete(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (!node->children[idx]) return {};
            node = node->children[idx];
        }
        vector<string> result;
        collectWords(node, prefix, result);
        return result;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    trie.insert("app");
    trie.insert("application");
    trie.insert("banana");
    trie.insert("band");

    cout << "Search apple: " << trie.search("apple") << endl;    // 1
    cout << "Search app: " << trie.search("app") << endl;        // 1
    cout << "Search ap: " << trie.search("ap") << endl;          // 0
    cout << "Prefix ap: " << trie.startsWith("ap") << endl;      // 1

    auto words = trie.autocomplete("app");
    cout << "Autocomplete 'app': ";
    for (auto& w : words) cout << w << " ";
    cout << endl; // app apple application

    return 0;
}`,
          problems: [
            ['Implement Trie (Prefix Tree)', 'https://leetcode.com/problems/implement-trie-prefix-tree/', 'Medium'],
            ['Word Search II', 'https://leetcode.com/problems/word-search-ii/', 'Hard'],
            ['Design Add and Search Words Data Structure', 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', 'Medium'],
            ['Replace Words', 'https://leetcode.com/problems/replace-words/', 'Medium'],
            ['Maximum XOR of Two Numbers in an Array', 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the time complexity of searching a word of length m in a Trie?', o: ['O(n) where n is number of words', 'O(m) where m is word length', 'O(m * 26)', 'O(log n)'], a: 1},
            {q: 'What is the main advantage of a Trie over a hash set?', o: ['Less memory usage', 'Faster insertion', 'Prefix-based operations (autocomplete, prefix search)', 'Better worst-case performance'], a: 2},
            {q: 'How many children can each Trie node have (for lowercase English)?', o: ['2', '52', '26', '128'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'bits', t: 'Bit Manipulation',
      topics: [
        {
          t: 'Bit Manipulation Basics & XOR',
          learn: '<div class="learn-section"><div class="learn-h">Bitwise Operations</div><table class="learn-table"><tr><th>Operator</th><th>Symbol</th><th>Example</th></tr><tr><td>AND</td><td>&amp;</td><td>5 &amp; 3 = 1</td></tr><tr><td>OR</td><td>|</td><td>5 | 3 = 7</td></tr><tr><td>XOR</td><td>^</td><td>5 ^ 3 = 6</td></tr><tr><td>NOT</td><td>~</td><td>~5 = -6</td></tr><tr><td>Left Shift</td><td>&lt;&lt;</td><td>5 &lt;&lt; 1 = 10</td></tr><tr><td>Right Shift</td><td>&gt;&gt;</td><td>5 &gt;&gt; 1 = 2</td></tr></table></div><div class="learn-section"><div class="learn-h">XOR Properties</div><ul class="learn-list"><li><code>a ^ a = 0</code> (self-cancel)</li><li><code>a ^ 0 = a</code> (identity)</li><li>XOR is commutative and associative</li></ul><p class="learn-p"><b>Single Number:</b> XOR all elements. Duplicates cancel out, leaving the unique element.</p><div class="learn-code">int singleNumber(vector&lt;int&gt;&amp; nums) {\n    int result = 0;\n    for (int x : nums) result ^= x;\n    return result;\n}</div></div><div class="learn-section"><div class="learn-h">Useful Bit Tricks</div><ul class="learn-list"><li><code>n &amp; (n-1)</code> — clears the lowest set bit</li><li><code>n &amp; (-n)</code> — isolates the lowest set bit</li><li><code>n &amp; 1</code> — check if odd</li><li><code>__builtin_popcount(n)</code> — count set bits</li><li><code>1 &lt;&lt; k</code> — set the kth bit</li></ul><div class="learn-code">// Count set bits\nint countBits(int n) {\n    int count = 0;\n    while (n) {\n        n &amp;= (n - 1);  // clear lowest set bit\n        count++;\n    }\n    return count;\n}\n\n// Check if power of 2\nbool isPowerOfTwo(int n) {\n    return n &gt; 0 &amp;&amp; (n &amp; (n-1)) == 0;\n}</div><div class="learn-tip"><b>Tip:</b> XOR is the most commonly tested bitwise operation. Remember: a^a=0, a^0=a. These two properties solve many problems.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

// Single Number (find unique element)
int singleNumber(vector<int>& nums) {
    int result = 0;
    for (int x : nums) result ^= x;
    return result;
}

// Count set bits (Brian Kernighan's algorithm)
int countSetBits(int n) {
    int count = 0;
    while (n) {
        n &= (n - 1); // clear lowest set bit
        count++;
    }
    return count;
}

// Check power of 2
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Two numbers appearing once (all others twice)
vector<int> singleNumberIII(vector<int>& nums) {
    int xorAll = 0;
    for (int x : nums) xorAll ^= x;
    // Find any set bit (where the two numbers differ)
    int diffBit = xorAll & (-xorAll);
    int a = 0, b = 0;
    for (int x : nums) {
        if (x & diffBit) a ^= x;
        else b ^= x;
    }
    return {a, b};
}

// Missing Number
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int result = n;
    for (int i = 0; i < n; i++)
        result ^= i ^ nums[i];
    return result;
}

// Reverse bits
uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}

int main() {
    vector<int> nums = {4, 1, 2, 1, 2};
    cout << "Single: " << singleNumber(nums) << endl; // 4

    cout << "Set bits in 7: " << countSetBits(7) << endl; // 3
    cout << "Is 16 power of 2: " << isPowerOfTwo(16) << endl; // 1

    vector<int> nums2 = {1, 2, 1, 3, 2, 5};
    auto pair = singleNumberIII(nums2);
    cout << "Two singles: " << pair[0] << " " << pair[1] << endl; // 3 5

    vector<int> missing = {3, 0, 1};
    cout << "Missing: " << missingNumber(missing) << endl; // 2

    return 0;
}`,
          problems: [
            ['Single Number', 'https://leetcode.com/problems/single-number/', 'Easy'],
            ['Single Number III', 'https://leetcode.com/problems/single-number-iii/', 'Medium'],
            ['Number of 1 Bits', 'https://leetcode.com/problems/number-of-1-bits/', 'Easy'],
            ['Missing Number', 'https://leetcode.com/problems/missing-number/', 'Easy'],
            ['Reverse Bits', 'https://leetcode.com/problems/reverse-bits/', 'Easy']
          ],
          mcqs: [
            {q: 'What is a ^ a?', o: ['a', '0', '2a', '-a'], a: 1},
            {q: 'What does n & (n-1) do?', o: ['Adds 1 to n', 'Clears the lowest set bit', 'Sets the lowest bit', 'Negates n'], a: 1},
            {q: 'How do you check if n is a power of 2?', o: ['n % 2 == 0', 'n > 0 && (n & (n-1)) == 0', 'n == (n >> 1) << 1', 'log2(n) is integer'], a: 1}
          ]
        }
      ]
    }
  ]
};
