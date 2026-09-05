"""Section 9: data modeling and schema design."""

SECTIONS = [

("data", "Data modeling and schema design", """
<p>The brief for this area: "tables, columns, sensible relationships between tables, and primary and foreign
keys." That is a precise list, so hit every item explicitly &mdash; name your primary keys, name
your foreign keys, and say what each relationship is.</p>

<h3>Step 1: entities and relationships</h3>
<div class="term">
<span class="word">Cardinality</span>
<p class="plain">how many of one thing relate to how many of another. The three cases are
one-to-one, one-to-many, and many-to-many.</p>
</div>
<table>
<tr><th>Relationship</th><th>How to implement it</th><th>Example</th></tr>
<tr><td><b>One-to-many</b> (1:N)</td>
<td>Foreign key on the <b>many</b> side, pointing at the one</td>
<td>A branch has many copies &rarr; <code>copy.branch_id</code></td></tr>
<tr><td><b>Many-to-many</b> (M:N)</td>
<td>A separate <b>join table</b> holding both foreign keys</td>
<td>Books and authors &rarr; <code>book_author(book_id, author_id)</code></td></tr>
<tr><td><b>One-to-one</b> (1:1)</td>
<td>Usually the same table. Split only to isolate rarely-used or sensitive columns</td>
<td>User and user_credentials</td></tr>
</table>
<div class="box">
<p><b>The move that earns marks:</b> when you spot a many-to-many, say <i>"that's many-to-many, so
it needs a join table &mdash; and the join table is usually a real entity with its own data."</i></p>
<p>A student enrolling on a course is not just <code>(student_id, course_id)</code>; the enrolment
has a date, a grade, a status. Recognising that the join table wants columns of its own is the
difference between a schema that works and one that has to be rebuilt.</p>
</div>

<h3>Step 2: keys</h3>
<div class="term">
<span class="word">Primary key</span>
<p class="plain">the column (or columns) that uniquely identify a row.</p>
<p><b>Surrogate</b> keys are meaningless ids you generate (an auto-increment integer or a UUID).
<b>Natural</b> keys are real-world values (an ISBN, an email). Prefer surrogate: natural keys have
an unfortunate habit of changing, and then every foreign key referencing them has to change too.
Keep the natural key as a <code>UNIQUE</code> column instead.</p>
</div>
<div class="term">
<span class="word">Foreign key</span>
<p class="plain">a column holding another table's primary key, with the database enforcing that the
referenced row actually exists.</p>
<p>Also decide what happens on delete: <code>ON DELETE CASCADE</code> (delete the children too),
<code>RESTRICT</code> (refuse while children exist), or <code>SET NULL</code>. Saying which one you
want, and why, is a detail most candidates skip.</p>
</div>
<p><b>Auto-increment integer vs UUID:</b> integers are compact and index well but leak volume
information and are awkward across distributed systems; UUIDs are globally unique and can be
generated client-side (which pairs nicely with idempotency keys) but are larger and randomly
ordered, which hurts index locality. Have the trade-off ready.</p>

<h3>Step 3: normalisation</h3>
<div class="term">
<span class="word">Normalisation</span>
<p class="plain">organising columns so each fact is stored in exactly one place, so it cannot
disagree with itself.</p>
</div>
<ul>
<li><b>1NF</b> &mdash; no repeating groups; each cell holds a single value. No
<code>phone1, phone2, phone3</code> columns and no comma-separated lists.</li>
<li><b>2NF</b> &mdash; 1NF, and every non-key column depends on the <i>whole</i> primary key. Only
bites when the key is composite.</li>
<li><b>3NF</b> &mdash; 2NF, and no non-key column depends on another non-key column. If you store
<code>city</code> and <code>postcode</code> and the postcode determines the city, that is a
violation.</li>
</ul>
<p><b>The one-liner to remember:</b> <i>"every non-key column depends on the key, the whole key, and
nothing but the key."</i> 3NF is the target for a normal transactional schema.</p>

<div class="box">
<h4>Then say when you would break it</h4>
<p>Normalisation prevents update anomalies but costs joins. Denormalise deliberately when reads
dominate and the data is stable:</p>
<ul>
<li><b>Counters</b> &mdash; storing <code>comment_count</code> on a post beats counting a million
rows, at the cost of keeping it in step.</li>
<li><b>Point-in-time snapshots</b> &mdash; and this one is not really denormalisation at all.
An order line must store <b>the price at the time of purchase</b>, not join to the product's current
price. If the product's price changes next week, every historical invoice must not change with it.
<b>This is the single most commonly missed modelling point in e-commerce questions</b>, and raising
it unprompted is a strong signal.</li>
</ul>
</div>

<h3>Step 4: column types and the details that catch people</h3>
<table>
<tr><th>Data</th><th>Use</th><th>Not</th></tr>
<tr><td>Money</td><td><code>DECIMAL(12,2)</code>, or an integer count of minor units</td>
<td><code>FLOAT</code> &mdash; binary floating point cannot represent 0.10 exactly, so sums drift</td></tr>
<tr><td>Timestamps</td><td><code>TIMESTAMPTZ</code>, always stored UTC</td>
<td>Local time with no zone &mdash; unrecoverable ambiguity</td></tr>
<tr><td>Fixed sets</td><td>An <code>ENUM</code>, or a lookup table with a foreign key</td>
<td>Free-text status strings</td></tr>
<tr><td>Identifiers</td><td><code>BIGINT</code> or <code>UUID</code></td>
<td><code>INT</code>, if there is any chance of exceeding 2.1 billion</td></tr>
</table>
<p>The <b>money as float</b> point is worth stating out loud in any commerce question. It is a real
bug, it is common, and knowing it reads as production experience.</p>

<h3>Step 5: indexes</h3>
<div class="term">
<span class="word">Index</span>
<p class="plain">a sorted side-structure that lets the database find matching rows without scanning
the whole table &mdash; like a book's index.</p>
<p>The trade: reads get faster, writes get slower (every insert must update every index), and disk
usage grows. So index deliberately, not everywhere.</p>
</div>
<p><b>What to index:</b> every foreign key (you will join on it); columns in <code>WHERE</code>
clauses you run often; columns you sort by.</p>
<div class="term">
<span class="word">Composite index and column order</span>
<p class="plain">an index on several columns at once. The order matters enormously.</p>
<p>An index on <code>(member_id, status)</code> helps a query filtering on <code>member_id</code>
alone, and one filtering on both &mdash; but <b>not</b> one filtering on <code>status</code> alone.
It is like a phone book sorted by surname then first name: useless for finding everyone called
"James" if you do not know the surname. Say "leftmost prefix rule" and you will have said something
most candidates cannot.</p>
</div>

<h3>Step 6: constraints and concurrency</h3>
<p>Push correctness into the database where you can, because application code has bugs and races:</p>
<ul>
<li><code>NOT NULL</code> on everything that genuinely must be present.</li>
<li><code>UNIQUE</code> on natural keys &mdash; and this is how you prevent double-booking. A
unique constraint on <code>(copy_id) WHERE status = 'ACTIVE'</code> (a partial unique index) makes
it <i>physically impossible</i> for one copy to have two active loans, no matter what the
application does.</li>
<li><code>CHECK</code> for invariants, e.g. <code>CHECK (due_at &gt; borrowed_at)</code>.</li>
</ul>

<div class="box">
<h4>The double-booking answer</h4>
<p>Almost every problem in this round has a "two people grab the last one" moment. Have this ready:</p>
<p>"The read-then-write is a race: two requests both see the copy as available and both insert a
loan. Three defences, and I'd use more than one. First, a <b>transaction</b> with the check and the
insert inside it. Second, either <b>pessimistic</b> locking (<code>SELECT ... FOR UPDATE</code> on
the copy row, blocking the second request) or <b>optimistic</b> locking (a version column; the
second write fails and retries). Third, and most robust, a <b>unique constraint</b> so that even if
the logic is wrong the database refuses the second row &mdash; and I'd return 409 Conflict when it
does."</p>
<p>Pessimistic suits high contention and short transactions; optimistic suits low contention.
Naming both and choosing is what they want.</p>
</div>

<h3>Step 7: the questions that show seniority</h3>
<ul>
<li><b>Soft deletes</b> &mdash; a <code>deleted_at</code> column instead of really deleting, so you
keep history and can undo. Cost: every query must remember to filter it.</li>
<li><b>Audit trail</b> &mdash; <code>created_at</code>, <code>updated_at</code>,
<code>created_by</code> on anything a human edits.</li>
<li><b>History vs current state</b> &mdash; does the business need to know what a row used to say?
If so, an events or history table, not just an updated row.</li>
<li><b>Multi-tenancy</b> &mdash; if several customers share the database, a
<code>tenant_id</code> on every table and in every index.</li>
</ul>
"""),

]
