"""Section 4: API design."""

SECTIONS = [

("api", "API design", """
<p>The brief for this area: "the top-level interface of your application with a focus more on the input and
output than the underlying details." So they want the <b>contract</b>, not the implementation.
Almost always one of your two deep dives, because it forces everything else to be concrete.</p>

<h3>The shape of a REST API</h3>
<p>The core idea: your API exposes <b>resources</b> (nouns), and HTTP methods are the <b>verbs</b>
that act on them. Get the nouns right and the endpoints write themselves.</p>

<table>
<tr><th>Method</th><th>Meaning</th><th>Safe?</th><th>Idempotent?</th></tr>
<tr><td>GET</td><td>Read; never changes anything</td><td>Yes</td><td>Yes</td></tr>
<tr><td>POST</td><td>Create a new item, or trigger an action</td><td>No</td><td><b>No</b></td></tr>
<tr><td>PUT</td><td>Replace an item entirely</td><td>No</td><td>Yes</td></tr>
<tr><td>PATCH</td><td>Update part of an item</td><td>No</td><td>Usually</td></tr>
<tr><td>DELETE</td><td>Remove an item</td><td>No</td><td>Yes</td></tr>
</table>

<div class="term">
<span class="word">Idempotent</span>
<p class="plain">doing it twice has the same effect as doing it once.</p>
<p>DELETE is idempotent: delete booking 7, then delete it again &mdash; it is still just gone.
POST is not: post a booking twice and you have two bookings. This matters because networks fail. If
a client sends a request and the connection drops, it does not know whether the server processed it.
For an idempotent method it can just retry. For POST it cannot, without help.</p>
</div>

<div class="box">
<h4>The idempotency answer that impresses</h4>
<p>When you design a "create" or "pay" endpoint, say this:</p>
<p>"POST isn't idempotent, so a client that times out can't safely retry &mdash; it might
double-book. I'd have the client generate an <b>idempotency key</b> (a UUID) and send it as a
header. The server stores the key with the result; if the same key arrives again it returns the
original response instead of creating a second booking."</p>
<p>This is exactly the kind of "beyond the requirements guardrail" their System Design rubric asks
for, and it applies here too. Very few candidates raise it unprompted.</p>
</div>

<h3>Designing the endpoints</h3>
<p>Rules that keep you out of trouble:</p>
<ul>
<li><b>Plural nouns for collections</b>: <code>/books</code>, not <code>/getBook</code>. The verb
is the HTTP method, so putting a verb in the path is redundant.</li>
<li><b>Nest only to show ownership</b>: <code>/members/42/loans</code> is good when loans only
exist within a member. Do not nest more than two levels deep &mdash; past that, use query
parameters.</li>
<li><b>Filtering, sorting and paging are query parameters</b>, not paths:
<code>/books?author=tolkien&amp;sort=-published&amp;limit=20</code>.</li>
<li><b>Actions that are not CRUD get a sub-resource</b>: returning a book is not "update loan"
in any natural sense, so <code>POST /loans/{id}/return</code> is clearer and honest.</li>
</ul>

<pre><code>GET    /books?q=hobbit&amp;branch=3&amp;limit=20&amp;cursor=eyJpZCI6MTIzfQ
GET    /books/{bookId}
GET    /books/{bookId}/copies              # which copies exist, and where
POST   /loans                              # borrow: body { copyId, memberId }
POST   /loans/{loanId}/return              # an action, not a CRUD update
GET    /members/{memberId}/loans?status=active
POST   /reservations                       # body { titleId, memberId }
DELETE /reservations/{reservationId}</code></pre>

<h3>Status codes worth knowing cold</h3>
<table>
<tr><th>Code</th><th>Name</th><th>Use it when</th></tr>
<tr><td>200</td><td>OK</td><td>Successful GET, or an update returning the new state</td></tr>
<tr><td>201</td><td>Created</td><td>POST created something. Return a <code>Location</code> header</td></tr>
<tr><td>202</td><td>Accepted</td><td>You queued the work; it isn't done yet</td></tr>
<tr><td>204</td><td>No Content</td><td>Success, nothing to return (a DELETE)</td></tr>
<tr><td>400</td><td>Bad Request</td><td>Malformed input &mdash; the client's fault, syntactically</td></tr>
<tr><td>401</td><td>Unauthorized</td><td>We don't know who you are (misnamed &mdash; it means unauthenticated)</td></tr>
<tr><td>403</td><td>Forbidden</td><td>We know who you are; you may not do this</td></tr>
<tr><td>404</td><td>Not Found</td><td>No such resource</td></tr>
<tr><td>409</td><td>Conflict</td><td><b>The one to remember.</b> The request is valid but conflicts
with current state &mdash; the copy is already on loan</td></tr>
<tr><td>422</td><td>Unprocessable</td><td>Syntactically fine, semantically invalid (return date before borrow date)</td></tr>
<tr><td>429</td><td>Too Many Requests</td><td>Rate limited</td></tr>
<tr><td>500</td><td>Server Error</td><td>We broke. Never leak a stack trace</td></tr>
</table>
<p><b>401 vs 403</b> and <b>400 vs 409</b> are the two distinctions interviewers actually probe.
Knowing 409 for "already borrowed" instead of blanket-400 is a small detail that reads as
experience.</p>

<h3>Request and response bodies</h3>
<p>Show the actual JSON. It costs thirty seconds and makes the contract unambiguous.</p>
<pre><code>POST /loans
Idempotency-Key: 9f1c...

{ "copyId": "cp_8891", "memberId": "mb_42" }

201 Created
Location: /loans/ln_5567
{
  "id":        "ln_5567",
  "copyId":    "cp_8891",
  "memberId":  "mb_42",
  "borrowedAt":"2026-08-15T10:04:00Z",
  "dueAt":     "2026-08-29T23:59:59Z",
  "status":    "ACTIVE"
}

409 Conflict
{
  "error": {
    "code":    "COPY_ALREADY_ON_LOAN",
    "message": "Copy cp_8891 is currently on loan until 2026-08-22.",
    "details": { "copyId": "cp_8891", "availableAt": "2026-08-22" }
  }
}</code></pre>
<p>Two things to point out about that error shape: a <b>machine-readable code</b> so clients can
branch on it without string-matching the message, and <b>structured details</b> so the client can
show something useful. Say "I'd use a consistent error envelope across every endpoint" &mdash;
consistency is itself a design decision.</p>

<h3>Pagination &mdash; offset vs cursor</h3>
<div class="term">
<span class="word">Offset pagination</span>
<p class="plain"><code>?limit=20&amp;offset=40</code> &mdash; "skip 40, give me 20".</p>
<p>Simple, allows jumping to page 5. Two real problems: the database must count through all
skipped rows, so deep pages get slow; and if an item is inserted while the user pages, rows shift
and they see a duplicate or miss one.</p>
</div>
<div class="term">
<span class="word">Cursor (keyset) pagination</span>
<p class="plain"><code>?limit=20&amp;cursor=abc</code> &mdash; "give me 20 after this exact item".</p>
<p>The cursor encodes the sort key of the last row seen, so the query becomes
<code>WHERE (created_at, id) &lt; (...) ORDER BY ... LIMIT 20</code>, which uses the index and stays
fast at any depth. Cannot jump to an arbitrary page. This is what large APIs use.</p>
</div>
<p>Saying "offset for an admin table where they want page numbers, cursor for an infinite feed"
shows you pick by use case rather than by habit.</p>

<h3>Versioning</h3>
<p>Have an opinion, briefly: <code>/v1/books</code> in the path is the most common and the easiest
to reason about; a header (<code>Accept: application/vnd.api+json;version=1</code>) is purer REST
but harder to test by hand. The important part is the principle: <b>additive changes don't need a
new version; removing or renaming a field does.</b></p>

<h3>The rest of the checklist</h3>
<ul>
<li><b>Authentication</b> &mdash; a bearer token (JWT) in the <code>Authorization</code> header;
mention that the API validates it and derives the caller's identity rather than trusting a
<code>memberId</code> in the body. That last point is a genuine security instinct: never let the
client tell you who it is.</li>
<li><b>Rate limiting</b> &mdash; per API key, returning 429 with a <code>Retry-After</code>.</li>
<li><b>Long operations</b> &mdash; return 202 with a job id and let the client poll
<code>/jobs/{id}</code>, rather than holding a request open.</li>
<li><b>Bulk endpoints</b> &mdash; if a client would loop over 1,000 calls, give them one
<code>POST /loans/bulk</code>. Spotting the N+1 call pattern is a nice touch.</li>
</ul>
"""),

]
