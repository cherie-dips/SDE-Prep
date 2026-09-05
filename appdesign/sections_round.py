"""Sections 1-3: what the round is, the 45-minute method, requirements gathering."""

SECTIONS = [

("round", "What this round actually is", """
<p><b>45 minutes is the common length for this round</b> at most companies that run it &mdash;
long enough to cover three areas at different depths, short enough that you have to prioritise out
loud. It sits between the <b>System Design</b> round (boxes and arrows: load balancers, caches,
queues) and the <b>Coding</b> round (write a working function).</p>

<div class="box">
<p><b>The distinction that trips people up.</b> System Design asks "what <i>machines</i> do you
need and how do they talk?" App Architecture &amp; Data Modeling asks "inside one service, what
<i>classes</i>, <i>endpoints</i> and <i>tables</i> do you need?"</p>
<p>If you start drawing load balancers in this round you are in the wrong round. If you start
designing class hierarchies in the System Design round, likewise.</p>
</div>

<h3>The three areas, and the trap in the brief</h3>
<p>The brief for this round is usually phrased as three things you will be assessed on:</p>
<table>
<tr><th>Area</th><th>What they said they want</th><th>What that means concretely</th></tr>
<tr><td><b>API design</b></td>
<td>"The top-level interface of your application with a focus more on the input and output than the
underlying details"</td>
<td>Endpoints, request and response shapes, status codes, errors, pagination. Not implementation.</td></tr>
<tr><td><b>Class design</b></td>
<td>"Each class serves a distinct purpose and demonstrates encapsulation and proper use of
inheritance and composition"</td>
<td>This sentence is a direct request for design patterns and OO principles. Section 6 onward.</td></tr>
<tr><td><b>Data schema</b></td>
<td>"Tables, columns, sensible relationships between tables, and primary and foreign keys"</td>
<td>An ER model, normalised, with the keys and indexes named explicitly.</td></tr>
</table>

<p>And then the crucial line that usually accompanies it: <i>"in the allotted 45 minutes, you
will only have time to do a 'deep dive' into two out of three main areas... That being said, you
should still have sufficient time to touch on each area."</i></p>

<div class="box">
<h4>Read that as an instruction, because it is one</h4>
<p>They are telling you the winning strategy outright: <b>touch all three, go deep on two.</b></p>
<p>The failure mode they are warning you about is spending 40 minutes lovingly designing class
hierarchies and never drawing a single table. That reads as an incomplete answer even if the
classes were brilliant. Budget your time deliberately and <b>say your budget out loud</b> at the
start &mdash; it turns time management from something you might fail at into something you visibly
control.</p>
</div>

<div class="box">
<h4>What is already in this app</h4>
<p><b>Roadmap &rarr; System Design</b> has an <b>LLD Basics</b> tab (OOP deep dive, composition vs
inheritance, SRP &amp; OCP, LSP/ISP/DIP) and a <b>Patterns &amp; Case Studies</b> tab (Singleton,
Factory, Observer, Strategy, Decorator, Adapter, Builder, Command, State, Proxy, Chain of
Responsibility) plus case studies for Parking Lot, BookMyShow, Splitwise and Elevator.</p>
<p>Use that for the SOLID principles and for a second take on the patterns. <b>This guide adds what
that material does not have:</b> the specific shape of this 45-minute round, C++ implementations
rather than pseudocode or Java, API design, real schema design with keys and indexes, and the
concurrency answers. Where a case study overlaps (Parking Lot, Elevator) treat this version as the
one tuned to this round's rubric.</p>
</div>

<h3>Which two should you go deep on?</h3>
<p>Let the problem decide, and say why you chose:</p>
<ul>
<li><b>Lots of entities and relationships</b> (an e-commerce catalogue, a booking system) &rarr;
go deep on <b>data schema</b> plus <b>API</b>.</li>
<li><b>Lots of varying behaviour</b> (a pricing engine, a notification system, a game) &rarr; go
deep on <b>class design</b> plus <b>API</b>.</li>
<li><b>API is almost always one of the two</b>, because it is the contract that forces the other
two to be concrete.</li>
</ul>
<p>Announce it: "This problem is relationship-heavy, so I'd like to go deep on the schema and the
API, and sketch the class design more briefly &mdash; does that work for you?" You have now
demonstrated prioritisation <i>and</i> got their buy-in, which means they cannot mark you down for
the area you skimmed.</p>
"""),

("method", "The 45-minute method", """
<p>Have one repeatable script so you are never improvising structure under pressure. This is the
one I would use.</p>

<table>
<tr><th>Minutes</th><th>Phase</th><th>What you produce</th></tr>
<tr><td><b>0&ndash;6</b></td><td>Requirements &amp; scope</td>
<td>A written list of functional requirements, the ones you are explicitly excluding, and the
scale assumptions</td></tr>
<tr><td><b>6&ndash;10</b></td><td>Entities</td>
<td>A list of nouns &mdash; the core objects in the domain &mdash; and how they relate</td></tr>
<tr><td><b>10&ndash;22</b></td><td>Deep dive 1 (usually schema)</td>
<td>Tables with columns, types, primary and foreign keys, indexes</td></tr>
<tr><td><b>22&ndash;34</b></td><td>Deep dive 2 (usually API)</td>
<td>Endpoints with methods, paths, request/response bodies, status codes</td></tr>
<tr><td><b>34&ndash;40</b></td><td>Third area, lighter</td>
<td>Class sketch with the one or two patterns that genuinely fit</td></tr>
<tr><td><b>40&ndash;45</b></td><td>Trade-offs &amp; questions</td>
<td>What you would change at 100&times; scale; what you deliberately left out; your questions</td></tr>
</table>

<h3>Phase 1: Requirements &mdash; the six questions</h3>
<p>Never start designing immediately. Their rubric explicitly rewards "requirements gathering" and
"handling ambiguity". Ask these:</p>
<ol>
<li><b>Who are the users, and what are the top three things they do?</b> This gives you your
entities and your endpoints in one answer.</li>
<li><b>What is explicitly out of scope?</b> Get permission to ignore things. "Should I handle
payments, or assume a payment service exists?"</li>
<li><b>Roughly what scale?</b> Hundreds of users or hundreds of millions? This decides whether you
normalise hard or denormalise for reads.</li>
<li><b>Read-heavy or write-heavy?</b> Drives indexing and caching decisions.</li>
<li><b>What must be consistent, and what can be slightly stale?</b> The single most useful
question in the whole round.</li>
<li><b>Is there anything unusual about this domain I should know?</b> Free information, and it
signals humility.</li>
</ol>

<div class="box">
<h4>Then write the requirements down and get agreement</h4>
<p>"So: users can search listings, book a slot, and cancel. Out of scope: payments, notifications,
admin tools. Roughly 100k users, read-heavy, and a double-booking is unacceptable so booking must
be strongly consistent. Have I got that right?"</p>
<p>That single paragraph hits requirements gathering, scope control, scale, and consistency &mdash;
four rubric items in twenty seconds. It also protects you: anything you skip later, you skipped
<i>with their agreement</i>.</p>
</div>

<h3>Phase 2: Find the nouns</h3>
<p>The reliable trick for going from a vague prompt to a concrete model: <b>underline the nouns in
the requirements.</b> Nouns become entities, entities become tables and classes. Verbs become API
endpoints and methods.</p>
<p>"A <u>user</u> can <u>search</u> <u>listings</u> and <u>book</u> a <u>slot</u>" gives you
User, Listing, Slot, Booking as entities, and search / book as operations. Then ask of each pair:
one-to-one, one-to-many, or many-to-many? Every many-to-many becomes a join table &mdash; and
spotting those early is most of data modelling.</p>

<h3>Narrate constantly</h3>
<p>Their rubric lists communication in the coding round, and this round is no different. Two habits
that carry a session:</p>
<ul>
<li><b>State the alternative you rejected.</b> "I'll put the address in its own table rather than
inline on the user, because a user can have several and we'll want to query by city. If addresses
were single and never queried, inline would be simpler." That one sentence shows you did not just
pick the first idea.</li>
<li><b>Flag your assumptions as assumptions.</b> "I'm assuming a listing belongs to exactly one
owner &mdash; tell me if it can be co-owned, because that changes this to a many-to-many."</li>
</ul>
"""),

("requirements", "Turning a vague prompt into a design", """
<p>A worked example of the first ten minutes, because this is where most candidates lose the
session before they have written anything.</p>

<div class="box">
<p><b>Prompt:</b> "Design a system for a library."</p>
</div>

<h3>What a weak candidate does</h3>
<p>Immediately writes <code>class Book { string title; string author; }</code> and starts adding
fields. Twenty minutes later there is a class diagram, no API, no tables, and no one has
established whether this library lends e-books, charges fines, or has multiple branches.</p>

<h3>What you do instead</h3>
<p><b>Step 1 &mdash; ask the six questions.</b> Suppose the answers come back: physical books only,
multiple branches, members can borrow and reserve, fines for late returns, about 50,000 members,
read-heavy, and a book must never be lent to two people at once.</p>

<p><b>Step 2 &mdash; write the scope out loud.</b></p>
<pre><code>IN SCOPE                          OUT OF SCOPE
- search the catalogue            - payments / fine collection
- borrow and return               - e-books, audiobooks
- reserve (hold) a title          - member registration flow
- fines accrue on late return     - staff / admin tooling
- multiple branches

SCALE: ~50k members, ~200k copies, read-heavy
CONSISTENCY: a copy may never be double-lent -> needs a transaction</code></pre>

<p><b>Step 3 &mdash; the nouns, and the one distinction that matters.</b></p>
<div class="box">
<p>Here is the modelling insight this problem is really testing, and it generalises far beyond
libraries: <b>a Book is not a Copy.</b></p>
<p>"The Hobbit" is a <i>title</i> &mdash; it has an author, an ISBN, a description. But you do not
borrow a title, you borrow a specific physical <i>copy</i> sitting on a specific branch's shelf, with
its own condition and barcode. One title, many copies.</p>
<p>Miss this and every downstream design is wrong: you cannot express "we have 3 copies, 2 are
out", you cannot track which branch holds what, and you cannot lend the same title to two people
correctly. <b>Spotting the abstract-versus-physical split is the single most valuable modelling
habit</b>, and it recurs constantly: Product vs. Inventory Item, Flight vs. Seat, Movie vs.
Screening, Recipe vs. Batch.</p>
</div>

<pre><code>Member    Title (the work)    Copy (a physical object)    Branch
Loan      Reservation         Fine

Title  1 --- * Copy          a title has many copies
Branch 1 --- * Copy          each copy lives at one branch
Member 1 --- * Loan          a member has many loans over time
Copy   1 --- * Loan          a copy has many loans over time
   => Loan is the join between Member and Copy, plus dates</code></pre>

<p><b>Step 4 &mdash; state your plan and time budget.</b> "This is entity-heavy, so I'd like to
spend most time on the schema and API, and sketch classes at the end. Starting with the schema."</p>

<p>You are now ten minutes in with a scoped problem, an agreed entity model, a stated plan, and you
have already demonstrated four rubric items. Everything after this is filling in detail.</p>
"""),

]
