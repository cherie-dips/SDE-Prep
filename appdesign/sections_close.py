"""Sections 13-14: mistakes and rubric self-check, then the cheat sheet."""

SECTIONS = [

("mistakes", "Common mistakes and a self-check", """
<h3>The ten ways people lose this round</h3>
<table>
<tr><th>#</th><th>Mistake</th><th>What to do instead</th></tr>
<tr><td>1</td><td>Designing before asking anything</td>
<td>Six questions, then read the scope back and get agreement</td></tr>
<tr><td>2</td><td>Running out of time with one area untouched</td>
<td>Announce a time budget at the start and glance at the clock at the halfway mark</td></tr>
<tr><td>3</td><td>Naming patterns to show off</td>
<td>Name a pattern only when you can state what breaks without it</td></tr>
<tr><td>4</td><td>Drifting into System Design &mdash; caches, load balancers, sharding</td>
<td>Stay at classes, endpoints and tables. Mention scale once, at the end</td></tr>
<tr><td>5</td><td>Missing the abstract-vs-physical split</td>
<td>Ask "is the thing they book the same as the thing in the catalogue?" Title/Copy,
Product/Inventory, Movie/Show/Seat</td></tr>
<tr><td>6</td><td>Joining to a live price for historical records</td>
<td>Snapshot price and name onto the order line</td></tr>
<tr><td>7</td><td>No mention of concurrency</td>
<td>Every scarce resource gets the transaction + constraint answer</td></tr>
<tr><td>8</td><td>Silent designing</td>
<td>Narrate, and state the alternative you rejected</td></tr>
<tr><td>9</td><td>Defensiveness when challenged</td>
<td>Their rubric explicitly values "responds to coaching". Treat a challenge as information</td></tr>
<tr><td>10</td><td>No trade-offs at the end</td>
<td>Reserve five minutes: what you'd change at scale, what you left out, what you'd revisit</td></tr>
</table>

<h3>Handling being challenged</h3>
<p>They will push on something, and it is usually a test of how you think rather than a correction.
The move is neither to cave instantly nor to dig in:</p>
<div class="box">
<p>"That's a fair point &mdash; if &lt;their scenario&gt; happens, my design does &lt;the bad
thing&gt;. I chose it because &lt;original reason&gt;, but if &lt;their scenario&gt; is common then
&lt;alternative&gt; is better because &lt;reason&gt;. Which is closer to how your traffic actually
looks?"</p>
</div>
<p>That acknowledges, explains, adapts, and hands the decision back with a real question. It works
whether they were right or just probing.</p>

<h3>Self-check against the stated rubric</h3>
<p>The brief names three things. Before you say you are done, verify:</p>
<ul>
<li><b>API design</b> &mdash; did I give endpoints with methods, paths, a request body, a response
body, at least one error case with a status code, and say something about pagination or
idempotency?</li>
<li><b>Class design</b> &mdash; does each class do one thing? Did I use composition where the
behaviour varies? Did I justify each pattern by what would break without it? Did I write
<code>virtual ~Class()</code>?</li>
<li><b>Data schema</b> &mdash; did I name every primary key and foreign key, mark NOT NULL and
UNIQUE, give at least one index with a reason, and handle the many-to-many with a join table?</li>
</ul>

<h3>The last five minutes &mdash; a script</h3>
<p>Do not let the session peter out. Close deliberately:</p>
<div class="box">
<p>"To summarise: &lt;three sentences on the model&gt;. If this grew 100&times;, the first thing to
break would be &lt;X&gt;, and I'd fix it by &lt;Y&gt;. I deliberately left out &lt;A and B&gt;. The
part I'm least sure about is &lt;C&gt; &mdash; I'd want to know more about &lt;real-world
constraint&gt; before committing to it."</p>
</div>
<p>Naming the weakest part of your own design is counter-intuitive but reads as senior. It proves
you evaluated it rather than just produced it.</p>

<h3>Questions to ask them</h3>
<ol>
<li>How much of your codebase is in this shape today, and where does it hurt?</li>
<li>Where do you draw the line between putting a rule in the database and putting it in the
application?</li>
<li>How do schema migrations work here &mdash; what does changing a table on a live service look
like?</li>
<li>When a design decision is contested on a team, how does it get resolved?</li>
</ol>
"""),

("cheatsheet", "Cheat sheet", """
<h3>The 45 minutes</h3>
<pre><code>0-6    requirements: 6 questions, write the scope, get agreement
6-10   nouns -> entities -> cardinalities
10-22  deep dive 1   (usually schema)
22-34  deep dive 2   (usually API)
34-40  third area, lighter
40-45  trade-offs, what you left out, your questions</code></pre>

<h3>The six opening questions</h3>
<pre><code>1. Who are the users, and what are their top 3 actions?
2. What's explicitly out of scope?
3. Roughly what scale?
4. Read-heavy or write-heavy?
5. What must be consistent, what can be stale?
6. Anything unusual about this domain?</code></pre>

<h3>Pattern triggers</h3>
<table>
<tr><th>You hear...</th><th>Reach for</th></tr>
<tr><td>"we might add other kinds of X later"</td><td>Strategy</td></tr>
<tr><td>"when this happens, several things must react"</td><td>Observer</td></tr>
<tr><td>"optional extras in any combination"</td><td>Decorator</td></tr>
<tr><td>"undo", "queue of work", "replay"</td><td>Command</td></tr>
<tr><td>a big switch on a status field</td><td>State</td></tr>
<tr><td>"same steps, one part differs"</td><td>Template Method</td></tr>
<tr><td>tree, nesting, part-whole</td><td>Composite</td></tr>
<tr><td>"this third-party library doesn't fit"</td><td>Adapter</td></tr>
<tr><td>"the client has to call six things in order"</td><td>Facade</td></tr>
<tr><td>"only create it if it's actually used"</td><td>Proxy (virtual)</td></tr>
<tr><td>families of things used together</td><td>Abstract Factory</td></tr>
</table>

<h3>The nine principles</h3>
<pre><code>1. Separate what varies from what stays the same
2. Program to an interface, not an implementation
3. Favor composition over inheritance
4. Strive for loosely coupled designs
5. Open for extension, closed for modification
6. Depend on abstractions, not concrete classes
7. Talk only to your immediate friends (Least Knowledge)
8. Don't call us, we'll call you (Hollywood)
9. One class, one reason to change</code></pre>

<h3>C++ reflexes</h3>
<pre><code>virtual ~Base() = default;        on every polymorphic base   <- do this every time
override                          on every override
unique_ptr by default; shared_ptr deliberately; weak_ptr for observers
const T&amp; for read-only params
enum class, not plain enum
Rule of Zero: let the compiler generate the special members
std::function instead of a hierarchy for a single stateless behaviour</code></pre>

<h3>Schema reflexes</h3>
<pre><code>surrogate PK; natural key as UNIQUE
FK on the "many" side; join table for many-to-many (and it usually has its own columns)
DECIMAL for money, never FLOAT
TIMESTAMPTZ in UTC
snapshot price + name onto order lines
index every FK; composite index order = leftmost prefix rule
partial UNIQUE index to make double-booking impossible
CHECK constraints for invariants
created_at / updated_at on anything humans edit</code></pre>

<h3>HTTP</h3>
<pre><code>200 ok   201 created   202 accepted   204 no content
400 malformed   401 not authenticated   403 not allowed   404 missing
409 CONFLICT (already booked / already exists)   422 semantically invalid
429 rate limited   500 our fault

POST isn't idempotent -> Idempotency-Key header on create/pay
cursor pagination for feeds, offset for admin page numbers
identity comes from the token, never from the request body</code></pre>

<h3>The three sentences that earn the most</h3>
<pre><code>"A &lt;title&gt; isn't a &lt;copy&gt; - one is the catalogue entry, one is the
 physical thing you actually book."

"The order line snapshots the price, so history doesn't change when
 the product's price does."

"Two requests can both pass the availability check, so I'd put a unique
 constraint on it and return 409 when the database refuses the second."</code></pre>
"""),

]
