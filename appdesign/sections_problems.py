"""Sections 10-12: fully worked problems, then a problem bank."""

SECTIONS = [

("worked-library", "Problem 1: Library system", """
<p>The full 45 minutes, written out. This continues the scoping from section 3.</p>
<div class="box">
<p><b>Prompt:</b> "Design a library system." Scope agreed in section 3: physical books, multiple
branches, borrow / return / reserve, fines on late return, ~50k members, read-heavy, and a copy
must never be lent twice.</p>
</div>

<h3>Deep dive 1: the schema</h3>
<p>Recall the key insight: <b>a title is not a copy</b>.</p>
<pre><code>member
  id             BIGINT       PK
  email          TEXT         UNIQUE NOT NULL
  name           TEXT         NOT NULL
  joined_at      TIMESTAMPTZ  NOT NULL
  status         ENUM('ACTIVE','SUSPENDED') NOT NULL

branch
  id             BIGINT       PK
  name           TEXT         NOT NULL
  address        TEXT

title                             -- the work: "The Hobbit"
  id             BIGINT       PK
  isbn           TEXT         UNIQUE          -- natural key kept as UNIQUE, not as PK
  name           TEXT         NOT NULL
  published_year SMALLINT

author
  id             BIGINT       PK
  name           TEXT         NOT NULL

title_author                      -- M:N join. A book has many authors; an author many books.
  title_id       BIGINT       FK -> title(id)   ON DELETE CASCADE
  author_id      BIGINT       FK -> author(id)  ON DELETE CASCADE
  PRIMARY KEY (title_id, author_id)

copy                              -- a physical object on a shelf
  id             BIGINT       PK
  title_id       BIGINT       FK -> title(id)   NOT NULL
  branch_id      BIGINT       FK -> branch(id)  NOT NULL
  barcode        TEXT         UNIQUE NOT NULL
  condition      ENUM('GOOD','WORN','DAMAGED') NOT NULL DEFAULT 'GOOD'

loan                              -- the join between member and copy, with its own data
  id             BIGINT       PK
  copy_id        BIGINT       FK -> copy(id)    NOT NULL
  member_id      BIGINT       FK -> member(id)  NOT NULL
  borrowed_at    TIMESTAMPTZ  NOT NULL
  due_at         TIMESTAMPTZ  NOT NULL
  returned_at    TIMESTAMPTZ  NULL              -- NULL means still out
  CHECK (due_at &gt; borrowed_at)

reservation                       -- a hold on a TITLE, not a copy: any copy will do
  id             BIGINT       PK
  title_id       BIGINT       FK -> title(id)   NOT NULL
  member_id      BIGINT       FK -> member(id)  NOT NULL
  created_at     TIMESTAMPTZ  NOT NULL
  status         ENUM('WAITING','READY','FULFILLED','CANCELLED') NOT NULL

fine
  id             BIGINT       PK
  loan_id        BIGINT       FK -> loan(id)    NOT NULL
  amount         DECIMAL(8,2) NOT NULL          -- DECIMAL, never FLOAT
  assessed_at    TIMESTAMPTZ  NOT NULL
  paid_at        TIMESTAMPTZ  NULL</code></pre>

<h4>Indexes, and why each one exists</h4>
<pre><code>CREATE INDEX idx_copy_title_branch ON copy(title_id, branch_id);
    -- "which copies of this title are at this branch?" - the main catalogue query

CREATE INDEX idx_loan_member_active ON loan(member_id) WHERE returned_at IS NULL;
    -- "what does this member currently have out?" - a partial index, so it stays small

CREATE UNIQUE INDEX uniq_active_loan_per_copy ON loan(copy_id) WHERE returned_at IS NULL;
    -- THE IMPORTANT ONE. A copy can have at most one open loan. The database now makes
    -- double-lending physically impossible, whatever the application code does.</code></pre>
<div class="box">
<p>Point at that last index and say: "This is how I'd stop double-lending. Two concurrent borrow
requests can both pass an availability check, but only one can insert the row &mdash; the second
violates the unique index, and I turn that into a <b>409 Conflict</b>."</p>
</div>

<h3>Deep dive 2: the API</h3>
<pre><code>GET  /titles?q=hobbit&amp;branchId=3&amp;limit=20&amp;cursor=...
     200 { "items":[ { "id":"tl_1","name":"The Hobbit","authors":["Tolkien"],
                       "availableCopies": 2 } ], "nextCursor":"..." }

GET  /titles/{titleId}/copies?branchId=3
     200 { "items":[ { "id":"cp_88","barcode":"X1","status":"AVAILABLE" } ] }

POST /loans                    Idempotency-Key: &lt;uuid&gt;
     { "copyId":"cp_88", "memberId":"mb_42" }
     201 { "id":"ln_5", "dueAt":"2026-08-29T23:59:59Z", "status":"ACTIVE" }
     409 { "error":{ "code":"COPY_ALREADY_ON_LOAN", ... } }
     422 { "error":{ "code":"MEMBER_LOAN_LIMIT_REACHED", ... } }

POST /loans/{loanId}/return    -- an action, not a CRUD update
     200 { "id":"ln_5", "returnedAt":"...", "fine": { "amount":"2.50" } }

POST /reservations             { "titleId":"tl_1", "memberId":"mb_42" }
     201 { "id":"rs_9", "position": 3 }

GET  /members/{id}/loans?status=active</code></pre>
<p>Points to make aloud: <code>memberId</code> in the body is a simplification &mdash; in reality
it comes from the auth token, and you never let a client claim to be someone else. Reservation is
on the <i>title</i> because the member does not care which copy. And returning the fine in the
return response saves the client a second call.</p>

<h3>Third area, lighter: the classes</h3>
<p>Where the varying behaviour lives: <b>fine calculation</b> (students, seniors and staff get
different rules) and <b>loan policy</b> (how many books, how long). That is Strategy, twice.</p>
<pre><code>#include &lt;memory&gt;
#include &lt;chrono&gt;
#include &lt;utility&gt;

using Clock     = std::chrono::system_clock;
using TimePoint = Clock::time_point;

// ---- Strategy 1: what a late return costs -------------------------------
class FinePolicy {
public:
    virtual ~FinePolicy() = default;
    virtual double fineFor(int daysLate) const = 0;
};

class StandardFinePolicy : public FinePolicy {
public:
    double fineFor(int daysLate) const override {
        return daysLate &lt;= 0 ? 0.0 : 0.50 * daysLate;
    }
};

class CappedFinePolicy : public FinePolicy {
    double perDay_, cap_;
public:
    CappedFinePolicy(double perDay, double cap) : perDay_(perDay), cap_(cap) {}
    double fineFor(int daysLate) const override {
        if (daysLate &lt;= 0) return 0.0;
        double f = perDay_ * daysLate;
        return f &gt; cap_ ? cap_ : f;
    }
};

// ---- Strategy 2: how long and how many ----------------------------------
class LoanPolicy {
public:
    virtual ~LoanPolicy() = default;
    virtual int loanDays()    const = 0;
    virtual int maxConcurrent() const = 0;
};

class AdultLoanPolicy : public LoanPolicy {
public:
    int loanDays()      const override { return 14; }
    int maxConcurrent() const override { return 10; }
};

// ---- The service ---------------------------------------------------------
class LoanRepository;      // interface, defined elsewhere - program to an interface

class LoanService {
    LoanRepository&amp;             repo_;      // non-owning: injected, outlives us
    std::unique_ptr&lt;FinePolicy&gt; fines_;
    std::unique_ptr&lt;LoanPolicy&gt; policy_;
public:
    LoanService(LoanRepository&amp; repo,
                std::unique_ptr&lt;FinePolicy&gt; fines,
                std::unique_ptr&lt;LoanPolicy&gt; policy)
        : repo_(repo), fines_(std::move(fines)), policy_(std::move(policy)) {}

    // Returns the new loan id. Throws ConflictError if the copy is already out.
    long borrow(long copyId, long memberId);

    double returnCopy(long loanId, TimePoint when);
};</code></pre>
<p>Note what is <i>not</i> here: no Singleton, no Factory, no Observer. Three would be
pattern-stuffing. But mention the extension: "if we later need to email members when a reservation
becomes ready, that's an Observer on the return event &mdash; email, SMS and push all subscribe
without the loan code changing."</p>

<h3>Close with trade-offs</h3>
<ul>
<li><b>At 100&times; scale:</b> the catalogue search moves out of the relational database into a
search index; the availability count becomes a maintained counter rather than a live
<code>COUNT</code>.</li>
<li><b>Deliberately left out:</b> payments for fines, membership sign-up, staff tooling.</li>
<li><b>Would revisit:</b> whether <code>reservation</code> should hold a specific copy once one
becomes free &mdash; that turns into a small queue problem.</li>
</ul>
"""),

("worked-parking", "Problem 2: Parking lot", """
<p>The most-asked OO design question anywhere. It looks simple and it is really testing whether you
can model variation cleanly.</p>

<h3>Requirements (after asking)</h3>
<pre><code>IN SCOPE                                OUT OF SCOPE
- multiple levels, many spots           - payments processing (assume a gateway)
- spot types: motorcycle, compact,      - number-plate recognition
  large, electric (with charger)        - reservations
- vehicle takes a suitable spot
- ticket on entry, fee on exit
- different pricing rules

SCALE: one site, ~2000 spots, low write rate.
CONSISTENCY: a spot must never be double-assigned.</code></pre>

<h3>Class design (the deep dive here &mdash; this problem is behaviour-heavy)</h3>
<pre><code>#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;optional&gt;
#include &lt;chrono&gt;
#include &lt;string&gt;

enum class VehicleType { Motorcycle, Car, Bus, Electric };
enum class SpotType    { Motorcycle, Compact, Large, Electric };

class Vehicle {
    std::string plate_;
    VehicleType type_;
public:
    Vehicle(std::string plate, VehicleType t) : plate_(std::move(plate)), type_(t) {}
    const std::string&amp; plate() const { return plate_; }
    VehicleType type()         const { return type_; }
};

class ParkingSpot {
    long     id_;
    SpotType type_;
    bool     occupied_ = false;
public:
    ParkingSpot(long id, SpotType t) : id_(id), type_(t) {}
    long     id()   const { return id_; }
    SpotType type() const { return type_; }
    bool     free() const { return !occupied_; }
    void occupy()  { occupied_ = true;  }
    void release() { occupied_ = false; }

    // Which vehicles fit here. Kept as data, not as an if-chain scattered around.
    bool fits(VehicleType v) const {
        switch (type_) {
            case SpotType::Motorcycle: return v == VehicleType::Motorcycle;
            case SpotType::Compact:    return v == VehicleType::Motorcycle || v == VehicleType::Car;
            case SpotType::Large:      return true;
            case SpotType::Electric:   return v == VehicleType::Electric;
        }
        return false;
    }
};</code></pre>

<h4>Strategy #1: how we choose a spot</h4>
<pre><code>class SpotAllocationStrategy {
public:
    virtual ~SpotAllocationStrategy() = default;
    virtual std::optional&lt;long&gt; choose(const std::vector&lt;ParkingSpot&gt;&amp; spots,
                                       VehicleType v) const = 0;
};

class FirstFitStrategy : public SpotAllocationStrategy {
public:
    std::optional&lt;long&gt; choose(const std::vector&lt;ParkingSpot&gt;&amp; spots,
                               VehicleType v) const override {
        for (const auto&amp; s : spots)
            if (s.free() &amp;&amp; s.fits(v)) return s.id();
        return std::nullopt;
    }
};

// Prefer the tightest fit so big spots stay free for big vehicles.
class BestFitStrategy : public SpotAllocationStrategy {
public:
    std::optional&lt;long&gt; choose(const std::vector&lt;ParkingSpot&gt;&amp; spots,
                               VehicleType v) const override {
        const ParkingSpot* best = nullptr;
        for (const auto&amp; s : spots) {
            if (!s.free() || !s.fits(v)) continue;
            if (!best || static_cast&lt;int&gt;(s.type()) &lt; static_cast&lt;int&gt;(best-&gt;type()))
                best = &amp;s;
        }
        return best ? std::optional&lt;long&gt;(best-&gt;id()) : std::nullopt;
    }
};</code></pre>

<h4>Strategy #2: how we charge &mdash; and Decorator for the extras</h4>
<pre><code>class PricingStrategy {
public:
    virtual ~PricingStrategy() = default;
    virtual double price(std::chrono::minutes stay, VehicleType v) const = 0;
};

class HourlyPricing : public PricingStrategy {
    double perHour_;
public:
    explicit HourlyPricing(double r) : perHour_(r) {}
    double price(std::chrono::minutes stay, VehicleType) const override {
        long hours = (stay.count() + 59) / 60;      // round up to the next hour
        return perHour_ * static_cast&lt;double&gt;(hours);
    }
};

// Decorator: surcharges and discounts stack in any combination,
// without a subclass per combination.
class PricingDecorator : public PricingStrategy {
protected:
    std::unique_ptr&lt;PricingStrategy&gt; inner_;
public:
    explicit PricingDecorator(std::unique_ptr&lt;PricingStrategy&gt; i) : inner_(std::move(i)) {}
};

class WeekendSurcharge : public PricingDecorator {
public:
    using PricingDecorator::PricingDecorator;
    double price(std::chrono::minutes s, VehicleType v) const override {
        return inner_-&gt;price(s, v) * 1.25;
    }
};

class ElectricDiscount : public PricingDecorator {
public:
    using PricingDecorator::PricingDecorator;
    double price(std::chrono::minutes s, VehicleType v) const override {
        double base = inner_-&gt;price(s, v);
        return v == VehicleType::Electric ? base * 0.90 : base;
    }
};</code></pre>

<h4>The lot itself</h4>
<pre><code>class ParkingLot {
    std::vector&lt;ParkingSpot&gt;                 spots_;
    std::unique_ptr&lt;SpotAllocationStrategy&gt;  allocator_;
    std::unique_ptr&lt;PricingStrategy&gt;         pricing_;
public:
    ParkingLot(std::vector&lt;ParkingSpot&gt; spots,
               std::unique_ptr&lt;SpotAllocationStrategy&gt; a,
               std::unique_ptr&lt;PricingStrategy&gt; p)
        : spots_(std::move(spots)), allocator_(std::move(a)), pricing_(std::move(p)) {}

    std::optional&lt;long&gt; park(const Vehicle&amp; v);            // returns ticket id
    double             unpark(long ticketId);              // returns fee
};</code></pre>

<h3>Schema (lighter, but do not skip it)</h3>
<pre><code>level    (id PK, lot_id FK, floor_number)
spot     (id PK, level_id FK -> level(id), type ENUM, spot_number,
          UNIQUE (level_id, spot_number))
ticket   (id PK, spot_id FK -> spot(id), plate TEXT, vehicle_type ENUM,
          entered_at TIMESTAMPTZ NOT NULL, exited_at TIMESTAMPTZ NULL,
          amount DECIMAL(8,2) NULL)

CREATE UNIQUE INDEX uniq_open_ticket_per_spot ON ticket(spot_id) WHERE exited_at IS NULL;
    -- same trick as the library: one open ticket per spot, enforced by the database</code></pre>
<p>Note <b>spot occupancy is derived</b>, not stored twice: a spot is occupied exactly when it has
an open ticket. Storing a separate <code>occupied</code> flag in the database as well means two
sources of truth that can disagree. (The in-memory <code>ParkingSpot</code> caches it for speed;
the database is authoritative.) Spotting that is a genuinely good modelling observation.</p>

<h3>API</h3>
<pre><code>POST /tickets           { "plate":"KA01AB1234", "vehicleType":"CAR" }
     201 { "ticketId":"tk_9", "spotId":"sp_144", "enteredAt":"..." }
     409 { "error":{ "code":"LOT_FULL" } }
POST /tickets/{id}/exit
     200 { "amount":"7.50", "durationMinutes":95 }
GET  /availability      200 { "MOTORCYCLE":12, "COMPACT":40, "LARGE":3, "ELECTRIC":0 }</code></pre>
"""),

("worked-cart", "Problem 3: E-commerce cart and checkout", """
<p>The one most likely to be asked at a retail company, and the one with the most classic traps.</p>

<h3>Requirements</h3>
<pre><code>IN SCOPE                                OUT OF SCOPE
- browse products, add to cart          - the payment gateway itself
- promotions: % off, buy-2-get-1,       - shipping carrier integration
  free shipping over a threshold        - returns
- checkout creates an order
- stock must not oversell

SCALE: 1M products, read-heavy catalogue, spiky checkout traffic.
CONSISTENCY: stock and order creation must be exact; catalogue can be slightly stale.</code></pre>

<h3>The three traps, and how to walk into them deliberately</h3>
<div class="box">
<ol>
<li><b>Price must be snapshotted.</b> <code>order_line</code> stores the price paid, not a join to
the product's current price. Otherwise last year's invoices silently change when marketing runs a
sale. State this as you write the table &mdash; it is the highest-value sentence in the problem.</li>
<li><b>Product is not Inventory.</b> Same abstract-vs-physical split as title/copy. A product is a
catalogue entry; stock is per warehouse. And a <b>variant</b> (size, colour) is a third level that
most candidates miss: you do not stock "T-shirt", you stock "T-shirt / Medium / Blue".</li>
<li><b>Overselling is a race.</b> Same defence as before: transaction, plus either a conditional
update (<code>UPDATE ... SET qty = qty - 1 WHERE qty &gt;= 1</code>, then check rows affected) or a
<code>CHECK (quantity &gt;= 0)</code> constraint so the database refuses to go negative.</li>
</ol>
</div>

<h3>Schema</h3>
<pre><code>product
  id            BIGINT      PK
  name          TEXT        NOT NULL
  description   TEXT
  brand_id      BIGINT      FK -> brand(id)
  created_at    TIMESTAMPTZ NOT NULL

product_variant                   -- what you actually buy and stock
  id            BIGINT      PK
  product_id    BIGINT      FK -> product(id) NOT NULL
  sku           TEXT        UNIQUE NOT NULL
  attributes    JSONB                        -- {"size":"M","colour":"blue"}
  price         DECIMAL(10,2) NOT NULL       -- the CURRENT price

inventory                         -- stock per variant per warehouse
  variant_id    BIGINT      FK -> product_variant(id)
  warehouse_id  BIGINT      FK -> warehouse(id)
  quantity      INT         NOT NULL CHECK (quantity &gt;= 0)
  PRIMARY KEY (variant_id, warehouse_id)

cart          (id PK, customer_id FK, created_at, updated_at)
cart_item     (cart_id FK, variant_id FK, quantity INT CHECK (quantity &gt; 0),
               PRIMARY KEY (cart_id, variant_id))

"order"                           -- quoted: ORDER is a reserved SQL word
  id            BIGINT      PK
  customer_id   BIGINT      FK -> customer(id) NOT NULL
  status        ENUM('PENDING','PAID','SHIPPED','DELIVERED','CANCELLED') NOT NULL
  placed_at     TIMESTAMPTZ NOT NULL
  subtotal      DECIMAL(10,2) NOT NULL
  discount      DECIMAL(10,2) NOT NULL
  shipping      DECIMAL(10,2) NOT NULL
  total         DECIMAL(10,2) NOT NULL
  idempotency_key TEXT      UNIQUE            -- stops double-submitted checkouts

order_line
  id            BIGINT      PK
  order_id      BIGINT      FK -> "order"(id) NOT NULL
  variant_id    BIGINT      FK -> product_variant(id) NOT NULL
  quantity      INT         NOT NULL
  unit_price    DECIMAL(10,2) NOT NULL   -- SNAPSHOT. never join to current price.
  product_name  TEXT        NOT NULL     -- snapshot too: names change

CREATE INDEX idx_order_customer_time ON "order"(customer_id, placed_at DESC);
CREATE INDEX idx_variant_product      ON product_variant(product_id);</code></pre>

<h3>Class design: promotions</h3>
<p>Promotions are the varying part, so they get the pattern work. Two are in play, and knowing
which to use where is the whole answer:</p>
<ul>
<li><b>Strategy</b> for "how is this one discount computed" &mdash; percentage, fixed amount,
buy-2-get-1.</li>
<li><b>Decorator</b>-style chaining for "apply several promotions in order", because promotions
stack and the order matters.</li>
</ul>
<pre><code>#include &lt;memory&gt;
#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;utility&gt;

struct CartLine {
    long        variantId;
    int         quantity;
    double      unitPrice;
    std::string category;
};

struct PriceBreakdown {
    double subtotal = 0.0;
    double discount = 0.0;
    double shipping = 0.0;
    double total() const { return subtotal - discount + shipping; }
};

// ---- Strategy: one promotion rule --------------------------------------
class Promotion {
public:
    virtual ~Promotion() = default;
    virtual std::string name() const = 0;
    // returns the discount THIS promotion adds, given the cart and running totals
    virtual double discountFor(const std::vector&lt;CartLine&gt;&amp; lines,
                               const PriceBreakdown&amp; running) const = 0;
};

class PercentOffCategory : public Promotion {
    std::string category_;
    double      percent_;
public:
    PercentOffCategory(std::string c, double p)
        : category_(std::move(c)), percent_(p) {}
    std::string name() const override { return percent_ &lt; 1 ? "PERCENT_OFF" : "PERCENT_OFF"; }
    double discountFor(const std::vector&lt;CartLine&gt;&amp; lines,
                       const PriceBreakdown&amp;) const override {
        double sum = 0.0;
        for (const auto&amp; l : lines)
            if (l.category == category_) sum += l.unitPrice * l.quantity;
        return sum * percent_;
    }
};

class BuyTwoGetOneFree : public Promotion {
    std::string category_;
public:
    explicit BuyTwoGetOneFree(std::string c) : category_(std::move(c)) {}
    std::string name() const override { return "B2G1"; }
    double discountFor(const std::vector&lt;CartLine&gt;&amp; lines,
                       const PriceBreakdown&amp;) const override {
        double d = 0.0;
        for (const auto&amp; l : lines)
            if (l.category == category_)
                d += (l.quantity / 3) * l.unitPrice;   // every 3rd item free
        return d;
    }
};

class FreeShippingOver : public Promotion {
    double threshold_;
public:
    explicit FreeShippingOver(double t) : threshold_(t) {}
    std::string name() const override { return "FREE_SHIPPING"; }
    double discountFor(const std::vector&lt;CartLine&gt;&amp;,
                       const PriceBreakdown&amp; running) const override {
        return running.subtotal &gt;= threshold_ ? running.shipping : 0.0;
    }
};

// ---- The engine: applies promotions in a defined order ------------------
class PricingEngine {
    std::vector&lt;std::unique_ptr&lt;Promotion&gt;&gt; promotions_;   // order is significant
public:
    void add(std::unique_ptr&lt;Promotion&gt; p) { promotions_.push_back(std::move(p)); }

    PriceBreakdown price(const std::vector&lt;CartLine&gt;&amp; lines, double baseShipping) const {
        PriceBreakdown b;
        for (const auto&amp; l : lines) b.subtotal += l.unitPrice * l.quantity;
        b.shipping = baseShipping;

        for (const auto&amp; p : promotions_)
            b.discount += p-&gt;discountFor(lines, b);

        if (b.discount &gt; b.subtotal + b.shipping)     // never pay the customer
            b.discount = b.subtotal + b.shipping;
        return b;
    }
};</code></pre>
<div class="box">
<p><b>The trade-off to raise unprompted:</b> "Promotions stacking means order matters &mdash; 10%
off then &pound;5 off is not the same as &pound;5 off then 10% off. I've made the order explicit in
the list rather than leaving it emergent. A real system usually also needs rules about which
promotions can combine at all, and I'd model that as a priority plus an exclusivity group rather
than hard-coding it."</p>
</div>

<h3>API</h3>
<pre><code>GET   /products?q=shirt&amp;category=apparel&amp;limit=20&amp;cursor=...
GET   /products/{id}                      -> includes its variants
POST  /carts/{cartId}/items               { "variantId":"v_1","quantity":2 }
     200 -> the recalculated cart with the price breakdown
DELETE /carts/{cartId}/items/{variantId}
POST  /orders                             Idempotency-Key: &lt;uuid&gt;
      { "cartId":"c_9", "addressId":"ad_2", "paymentToken":"tok_x" }
      201 { "orderId":"or_77", "total":"42.50", "status":"PENDING" }
      409 { "error":{ "code":"OUT_OF_STOCK",
                      "details":{ "variantId":"v_1","available":0 } } }</code></pre>
<p>Say why checkout is the one endpoint that <i>must</i> carry an idempotency key: a customer who
double-clicks, or a mobile client that retries on a flaky connection, must not be charged twice.</p>
"""),

("bank", "Problem bank", """
<p>Six more, in the form you would get them. Try each yourself for ten minutes before reading the
solution &mdash; reading solutions creates recognition, not recall, and the interview tests recall.</p>

<h3>Q1. Design an elevator control system</h3>
<p><b>What it tests:</b> the State pattern, and whether you conflate a single car with the bank.</p>
<div class="box">
<p><b>Solution sketch.</b> Two levels: <code>Elevator</code> (one car) and
<code>ElevatorController</code> (dispatches across cars). Candidates who model only one car miss
the interesting half.</p>
<p><b>State</b> on the car: <code>Idle</code>, <code>MovingUp</code>, <code>MovingDown</code>,
<code>DoorsOpen</code>, <code>Maintenance</code>. Each state answers "what happens on a request?"
differently &mdash; a request while <code>DoorsOpen</code> queues, a request while
<code>Maintenance</code> is rejected. That kills the big switch.</p>
<p><b>Strategy</b> for dispatch: nearest-car, or the classic <i>elevator algorithm</i> (keep going
in one direction serving requests until none remain that way). Swapping the strategy changes the
whole behaviour of the bank, which is exactly why it should be an object.</p>
<pre><code>class Elevator;                   // forward declarations
enum class Direction { Up, Down };

class ElevatorState {
public:
    virtual ~ElevatorState() = default;
    virtual void requestFloor(Elevator&amp; e, int floor) = 0;
    virtual void tick(Elevator&amp; e) = 0;
    virtual const char* name() const = 0;
};

class DispatchStrategy {
public:
    virtual ~DispatchStrategy() = default;
    virtual int chooseCar(const std::vector&lt;Elevator&gt;&amp; cars, int floor, Direction d) const = 0;
};</code></pre>
<p><b>Schema:</b> mostly operational &mdash; <code>elevator(id, bank_id, current_floor, state)</code>,
<code>trip_request(id, from_floor, to_floor, requested_at, served_by, served_at)</code>. Say the
request log exists for analytics: average wait time is the business metric.</p>
</div>

<h3>Q2. Design a movie ticket booking system</h3>
<p><b>What it tests:</b> concurrency on a shared scarce resource, and the abstract/physical split
again.</p>
<div class="box">
<p><b>The split:</b> <code>Movie</code> (the film) vs <code>Show</code> (a screening at a time in a
screen) vs <code>Seat</code> (physical, belongs to a screen) vs <code>ShowSeat</code> (this seat, at
this show &mdash; the thing that is actually bookable). Missing <code>ShowSeat</code> is the classic
error: seat 14A is not booked, it is booked <i>for the 7pm showing</i>.</p>
<pre><code>show_seat (show_id FK, seat_id FK, status ENUM('AVAILABLE','HELD','BOOKED'),
           held_until TIMESTAMPTZ NULL, booking_id FK NULL,
           PRIMARY KEY (show_id, seat_id))</code></pre>
<p><b>The concurrency answer &mdash; the point of the question.</b> Seat selection needs a
temporary <b>hold</b>, not an immediate booking, because the user needs a few minutes to pay.
So: <code>SELECT ... FOR UPDATE</code> on the chosen rows inside a transaction, set
<code>HELD</code> with <code>held_until = now() + 5 minutes</code>, and have a sweeper (or a lazy
check on read) release expired holds. Payment success converts hold to <code>BOOKED</code>.
Mention that holds must expire, or a malicious user can freeze a whole cinema for free.</p>
<p><b>API:</b> <code>POST /shows/{id}/holds</code> &rarr; 201 with an expiry;
<code>POST /bookings</code> with the hold id and an idempotency key.</p>
</div>

<h3>Q3. Design a notification service</h3>
<p><b>What it tests:</b> Observer plus Strategy, and whether you think about delivery guarantees.</p>
<div class="box">
<p><b>Strategy</b> per channel (<code>EmailChannel</code>, <code>SmsChannel</code>,
<code>PushChannel</code>) behind one <code>NotificationChannel</code> interface. <b>Observer</b> so
domain events fan out to whoever cares. <b>Template Method</b> for the send pipeline: render,
validate, throttle, dispatch, record &mdash; with only render and dispatch varying.</p>
<pre><code>struct Recipient;                 // forward declarations
struct RenderedMessage;

class NotificationChannel {
public:
    virtual ~NotificationChannel() = default;
    virtual bool send(const Recipient&amp; to, const RenderedMessage&amp; msg) = 0;
    virtual const char* channelName() const = 0;
};</code></pre>
<p><b>Schema:</b> <code>notification(id, user_id, template_id, channel, status, attempts,
created_at, sent_at, failed_reason)</code>, plus <code>user_preference(user_id, channel,
category, enabled)</code> so users can mute categories. Add <code>template(id, channel, locale,
body)</code> &mdash; and note the <code>locale</code>, because someone always forgets
internationalisation.</p>
<p><b>The senior point:</b> sending is unreliable, so it is a queue with retries and exponential
backoff, an idempotency key per (event, user, channel) so a retried event does not double-send, and
a dead-letter queue for permanent failures.</p>
</div>

<h3>Q4. Design a file system</h3>
<p><b>What it tests:</b> Composite, plainly. Also whether you can handle recursion cleanly.</p>
<div class="box">
<p><b>Composite</b> exactly as in section 8: <code>FileNode</code> base, <code>File</code> leaf,
<code>Directory</code> holding <code>vector&lt;unique_ptr&lt;FileNode&gt;&gt;</code>, with
<code>size()</code> recursing. Add a <b>Visitor</b>-ish traversal if they push on "how would you
search", or just an iterator.</p>
<p><b>Schema</b> is the interesting twist &mdash; trees in SQL. Offer the options and pick:</p>
<ul>
<li><b>Adjacency list</b> &mdash; <code>node(id, parent_id, name, type, size)</code>. Trivial to
write, but "give me the full path" or "everything under this folder" needs a recursive query
(<code>WITH RECURSIVE</code>).</li>
<li><b>Materialised path</b> &mdash; store <code>/a/b/c</code> as a column. Subtree queries become
a simple <code>LIKE '/a/b/%'</code>. Renaming a folder means rewriting descendants.</li>
<li><b>Closure table</b> &mdash; a row per ancestor-descendant pair. Fast both directions, more
storage and more write work.</li>
</ul>
<p>Naming all three and choosing based on read/write mix is a strong answer. Add
<code>UNIQUE (parent_id, name)</code> &mdash; you cannot have two files with the same name in one
directory.</p>
</div>

<h3>Q5. Design a vending machine</h3>
<p><b>What it tests:</b> State, and careful handling of money.</p>
<div class="box">
<p><b>States:</b> <code>Idle</code>, <code>HasMoney</code>, <code>Dispensing</code>,
<code>OutOfStock</code>. Every input (insert coin, select item, cancel) means something different
per state, which is precisely the State pattern's case. Draw the transition table &mdash; drawing
it is worth more than describing it.</p>
<pre><code>class Machine;                    // forward declaration

class VendingState {
public:
    virtual ~VendingState() = default;
    virtual void insertCoin(Machine&amp;, int cents) = 0;
    virtual void select(Machine&amp;, const std::string&amp; slot) = 0;
    virtual void cancel(Machine&amp;) = 0;
};</code></pre>
<p><b>The details that separate answers:</b> money in integer cents, never floating point; change
calculation is a small coin-change problem and can <i>fail</i> (exact change only), which is a real
state; and the dispense-then-decrement order matters if power can fail mid-transaction.</p>
</div>

<h3>Q6. Design a ride-hailing service</h3>
<p><b>What it tests:</b> whether you keep this round's scope, since this is usually a System Design
question.</p>
<div class="box">
<p><b>Keep it in scope.</b> Do not start with geo-sharding and Kafka. Model
<code>Rider</code>, <code>Driver</code>, <code>Vehicle</code>, <code>Trip</code>,
<code>TripStatus</code>, and the matching interface.</p>
<p><b>State</b> on Trip: <code>Requested &rarr; Matched &rarr; DriverArrived &rarr; InProgress
&rarr; Completed</code>, with <code>Cancelled</code> reachable from several &mdash; and note who is
allowed to cancel changes by state, and whether a fee applies. <b>Strategy</b> for matching
(nearest, highest-rated, best ETA) and for pricing (surge is a decorator over base fare).</p>
<pre><code>trip (id PK, rider_id FK, driver_id FK NULL, status ENUM,
      requested_at, matched_at, started_at, completed_at,
      pickup_lat, pickup_lng, dropoff_lat, dropoff_lng,
      fare DECIMAL(8,2) NULL, surge_multiplier DECIMAL(3,2))
driver_location (driver_id PK, lat, lng, updated_at)   -- hot table, written constantly</code></pre>
<p>The one scaling sentence worth adding: "driver locations are written every few seconds and
queried by proximity, so in production that is a geospatial index or a separate in-memory store
rather than a normal table &mdash; but the relational model above is the logical view."</p>
</div>
"""),

]
