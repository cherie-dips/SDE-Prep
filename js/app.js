// ====== STATE ======
let st=JSON.parse(localStorage.getItem('dsprep_v4')||'{}');
if(!st.road)st.road={};if(!st.cal)st.cal={};if(!st.mcq)st.mcq={};if(!st.prob)st.prob={};
function sv(){localStorage.setItem('dsprep_v4',JSON.stringify(st))}

// ====== ROADMAP DATA ======
const ROADMAP=[
  typeof CPP_CONTENT!=='undefined'?CPP_CONTENT:null,
  typeof DSA_CONTENT!=='undefined'?DSA_CONTENT:null,
  typeof SYSDES_CONTENT!=='undefined'?SYSDES_CONTENT:null,
  typeof OS_CONTENT!=='undefined'?OS_CONTENT:null,
  typeof CN_CONTENT!=='undefined'?CN_CONTENT:null,
  typeof DBMS_CONTENT!=='undefined'?DBMS_CONTENT:null,
  typeof MERN_CONTENT!=='undefined'?MERN_CONTENT:null,
  typeof GENAI_CONTENT!=='undefined'?GENAI_CONTENT:null,
  typeof APTITUDE_CONTENT!=='undefined'?APTITUDE_CONTENT:null,
].filter(Boolean);

// ====== CALENDAR ======
const SP=[
{date:"2026-06-15",theme:"C++ Basics",tasks:[
{t:'Variables, Data Types & I/O',c:'C++',road:'cpp:basics:0'},
{t:'Operators & Type Casting',c:'C++',road:'cpp:basics:1'},
{t:'Control Flow (if/else, loops, switch)',c:'C++',road:'cpp:basics:2'},
{t:'Functions & Recursion Basics',c:'C++',road:'cpp:basics:3'},
{t:'Pointers & References',c:'C++',road:'cpp:basics:4'}
]},
{date:"2026-06-16",theme:"C++ STL",tasks:[
{t:'Vectors & Dynamic Arrays',c:'C++',road:'cpp:stl:0'},
{t:'Maps, Sets & Unordered Containers',c:'C++',road:'cpp:stl:1'},
{t:'Strings & String Operations',c:'C++',road:'cpp:stl:2'},
{t:'STL Algorithms & Iterators',c:'C++',road:'cpp:stl:3'},
{t:'Pairs, Tuples & Priority Queue',c:'C++',road:'cpp:stl:4'}
]},
{date:"2026-06-17",theme:"C++ OOP",tasks:[
{t:'Classes, Objects & Constructors',c:'C++',road:'cpp:oop:0'},
{t:'Inheritance & Polymorphism',c:'C++',road:'cpp:oop:1'},
{t:'Templates & Generic Programming',c:'C++',road:'cpp:oop:2'},
{t:'Operator Overloading',c:'C++',road:'cpp:oop:3'},
{t:'Exception Handling & RAII',c:'C++',road:'cpp:oop:4'}
]},
{date:"2026-06-18",theme:"Arrays & Sorting",tasks:[
{t:'Sorting Algorithms',c:'DSA',road:'dsa:arrays:0'},
{t:'Two Pointers',c:'DSA',road:'dsa:arrays:1'},
{t:'Merge Intervals',c:'DSA',road:'dsa:arrays:2'},
{t:'Sliding Window',c:'DSA',road:'dsa:arrays:3'},
{t:'Prefix Sums',c:'DSA',road:'dsa:arrays:4'},
{t:'Kadane\'s Algorithm',c:'DSA',road:'dsa:arrays:5'},
{t:'Rotate Array & Array Manipulation',c:'DSA',road:'dsa:arrays:6'},
{t:'Boyer-Moore Voting & Frequency Problems',c:'DSA',road:'dsa:arrays:7'},
{t:'Stock Buy & Sell Problems',c:'DSA',road:'dsa:arrays:8'}
]},
{date:"2026-06-19",theme:"Binary Search & Strings",tasks:[
{t:'Binary Search on 1D Arrays',c:'DSA',road:'dsa:bs:0'},
{t:'Binary Search on Answers',c:'DSA',road:'dsa:bs:1'},
{t:'Binary Search on 2D Arrays',c:'DSA',road:'dsa:bs:2'},
{t:'String Basics & Operations',c:'DSA',road:'dsa:strings:0'},
{t:'Pattern Matching (KMP)',c:'DSA',road:'dsa:strings:1'}
]},
{date:"2026-06-20",theme:"Strings & Linked Lists",tasks:[
{t:'Rabin-Karp & Z-Algorithm',c:'DSA',road:'dsa:strings:2'},
{t:'Palindrome Problems',c:'DSA',road:'dsa:strings:3'},
{t:'Singly Linked List',c:'DSA',road:'dsa:ll:0'},
{t:'Doubly Linked List',c:'DSA',road:'dsa:ll:1'},
{t:'Fast & Slow Pointers',c:'DSA',road:'dsa:ll:2'}
]},
{date:"2026-06-21",theme:"Stacks & Queues",tasks:[
{t:'Stack Basics & Implementation',c:'DSA',road:'dsa:stq:0'},
{t:'Monotonic Stack',c:'DSA',road:'dsa:stq:1'},
{t:'Next Greater Element',c:'DSA',road:'dsa:stq:2'},
{t:'Queue using Stacks',c:'DSA',road:'dsa:stq:3'},
{t:'Deque Problems',c:'DSA',road:'dsa:stq:4'}
]},
{date:"2026-06-22",theme:"Recursion & Backtracking",tasks:[
{t:'Recursion Basics & Patterns',c:'DSA',road:'dsa:recursion:0'},
{t:'Backtracking Framework',c:'DSA',road:'dsa:recursion:1'},
{t:'Subsets & Permutations',c:'DSA',road:'dsa:recursion:2'},
{t:'N-Queens & Sudoku Solver',c:'DSA',road:'dsa:recursion:3'}
]},
{date:"2026-06-23",theme:"Binary Trees & BST",tasks:[
{t:'Tree Traversals (Inorder, Preorder, Postorder)',c:'DSA',road:'dsa:trees:0'},
{t:'Level Order & Zigzag Traversal',c:'DSA',road:'dsa:trees:1'},
{t:'BST Operations (Insert, Delete, Search)',c:'DSA',road:'dsa:trees:2'},
{t:'Tree Construction from Traversals',c:'DSA',road:'dsa:trees:3'},
{t:'LCA, Diameter & Height',c:'DSA',road:'dsa:trees:4'}
]},
{date:"2026-06-24",theme:"Heaps & Graphs Start",tasks:[
{t:'Heap Basics & Heapify',c:'DSA',road:'dsa:pq:0'},
{t:'Top-K Problems',c:'DSA',road:'dsa:pq:1'},
{t:'Merge K Sorted Lists',c:'DSA',road:'dsa:pq:2'},
{t:'BFS & DFS',c:'DSA',road:'dsa:graphs:0'},
{t:'Cycle Detection',c:'DSA',road:'dsa:graphs:1'}
]},
{date:"2026-06-25",theme:"Graphs Core",tasks:[
{t:'Bipartite Graph Check',c:'DSA',road:'dsa:graphs:2'},
{t:'Dijkstra\'s Shortest Path',c:'DSA',road:'dsa:graphs:3'},
{t:'Bellman-Ford Algorithm',c:'DSA',road:'dsa:graphs:4'},
{t:'Union-Find / DSU',c:'DSA',road:'dsa:graphs:5'},
{t:'MST - Prim & Kruskal',c:'DSA',road:'dsa:graphs:6'},
{t:'Topological Sort',c:'DSA',road:'dsa:graphs:7'}
]},
{date:"2026-06-26",theme:"Graphs Advanced & DP Start",tasks:[
{t:'Floyd-Warshall All-Pairs Shortest Path',c:'DSA',road:'dsa:graphs:8'},
{t:'Strongly Connected Components (SCC)',c:'DSA',road:'dsa:graphs:9'},
{t:'1D DP (Climbing Stairs, House Robber)',c:'DSA',road:'dsa:dp:0'},
{t:'2D DP (Unique Paths, LCS)',c:'DSA',road:'dsa:dp:1'},
{t:'DP on Strings (Edit Distance)',c:'DSA',road:'dsa:dp:2'}
]},
{date:"2026-06-27",theme:"Dynamic Programming",tasks:[
{t:'DP on Subsequences (LIS)',c:'DSA',road:'dsa:dp:3'},
{t:'Knapsack Problems (0/1, Unbounded)',c:'DSA',road:'dsa:dp:4'},
{t:'DP on Trees',c:'DSA',road:'dsa:dp:5'},
{t:'Partition DP',c:'DSA',road:'dsa:dp:6'},
{t:'Bitmask DP (TSP, Subset Problems)',c:'DSA',road:'dsa:dp:7'},
{t:'Digit DP',c:'DSA',road:'dsa:dp:8'}
]},
{date:"2026-06-28",theme:"Greedy Algorithms",tasks:[
{t:'Interval Scheduling & Activity Selection',c:'DSA',road:'dsa:greedy:0'},
{t:'Jump Game & Gas Station',c:'DSA',road:'dsa:greedy:1'},
{t:'Huffman Coding',c:'DSA',road:'dsa:greedy:2'},
{t:'Fractional Knapsack & Job Sequencing',c:'DSA',road:'dsa:greedy:3'}
]},
{date:"2026-06-29",theme:"Tries, Segment Trees & Bits",tasks:[
{t:'Trie Implementation & Word Search',c:'DSA',road:'dsa:tries:0'},
{t:'Segment Tree (Range Query & Update)',c:'DSA',road:'dsa:segtree:0'},
{t:'Fenwick Tree (Binary Indexed Tree)',c:'DSA',road:'dsa:segtree:1'},
{t:'Bit Manipulation Basics & XOR',c:'DSA',road:'dsa:bits:0'},
{t:'Bitmask Techniques & Subset Enumeration',c:'DSA',road:'dsa:bits:1'}
]},
{date:"2026-06-30",theme:"Number Theory & DSA Review",tasks:[
{t:'Modular Arithmetic',c:'DSA',road:'dsa:numtheory:0'},
{t:'Sieve of Eratosthenes & Primes',c:'DSA',road:'dsa:numtheory:1'},
{t:'GCD, LCM & Combinatorics',c:'DSA',road:'dsa:numtheory:2'},
{t:'Sprint: 5 Medium Problems (Mixed DSA)',c:'Practice'}
]},
{date:"2026-07-01",theme:"LLD - OOP & SOLID",tasks:[
{t:'OOP Concepts Deep Dive',c:'LLD',road:'sysdes:lld:0'},
{t:'Composition vs Inheritance',c:'LLD',road:'sysdes:lld:1'},
{t:'SRP & OCP',c:'LLD',road:'sysdes:lld:2'},
{t:'LSP, ISP & DIP',c:'LLD',road:'sysdes:lld:3'}
]},
{date:"2026-07-02",theme:"LLD - Design Patterns",tasks:[
{t:'Singleton & Factory Pattern',c:'LLD',road:'sysdes:patterns:0'},
{t:'Observer & Strategy Pattern',c:'LLD',road:'sysdes:patterns:1'},
{t:'Decorator & Adapter Pattern',c:'LLD',road:'sysdes:patterns:2'},
{t:'Builder & Command Pattern',c:'LLD',road:'sysdes:patterns:3'},
{t:'State, Proxy & Chain of Responsibility',c:'LLD',road:'sysdes:patterns:4'}
]},
{date:"2026-07-03",theme:"LLD - Case Studies",tasks:[
{t:'Design Parking Lot',c:'LLD',road:'sysdes:patterns:5'},
{t:'Design BookMyShow',c:'LLD',road:'sysdes:patterns:6'},
{t:'Design Splitwise',c:'LLD',road:'sysdes:patterns:7'},
{t:'Design Elevator System',c:'LLD',road:'sysdes:patterns:8'}
]},
{date:"2026-07-04",theme:"HLD - Fundamentals",tasks:[
{t:'Scalability Fundamentals',c:'HLD',road:'sysdes:hld:0'},
{t:'Caching & CDN Deep Dive',c:'HLD',road:'sysdes:hld:1'},
{t:'Load Balancing & Reverse Proxy',c:'HLD',road:'sysdes:hld:2'},
{t:'Back-of-the-Envelope Estimation',c:'HLD',road:'sysdes:hld:3'}
]},
{date:"2026-07-05",theme:"HLD - Advanced",tasks:[
{t:'Consistent Hashing',c:'HLD',road:'sysdes:hld:4'},
{t:'Data Models & Storage Engines',c:'HLD',road:'sysdes:hld:5'},
{t:'Replication & Partitioning',c:'HLD',road:'sysdes:hld:6'},
{t:'Transactions & Consistency',c:'HLD',road:'sysdes:hld:7'}
]},
{date:"2026-07-06",theme:"System Design Problems I",tasks:[
{t:'Rate Limiter',c:'HLD',road:'sysdes:designs:0'},
{t:'Key-Value Store',c:'HLD',road:'sysdes:designs:1'},
{t:'URL Shortener',c:'HLD',road:'sysdes:designs:2'},
{t:'Web Crawler',c:'HLD',road:'sysdes:designs:3'},
{t:'Notification System',c:'HLD',road:'sysdes:designs:4'}
]},
{date:"2026-07-07",theme:"System Design Problems II",tasks:[
{t:'News Feed',c:'HLD',road:'sysdes:designs:5'},
{t:'Chat System',c:'HLD',road:'sysdes:designs:6'},
{t:'Search Autocomplete',c:'HLD',road:'sysdes:designs:7'},
{t:'Design Stock Trading / Order Matching Engine',c:'HLD',road:'sysdes:designs:8'},
{t:'Design Payment System',c:'HLD',road:'sysdes:designs:9'}
]},
{date:"2026-07-08",theme:"Design & DSA Review",tasks:[
{t:'Sprint: 5 Hard Problems (Mixed Topics)',c:'Practice'},
{t:'Review All DSA Pattern Templates',c:'Review'},
{t:'Review LLD Design Patterns',c:'Review'},
{t:'Mock: LLD Discussion (30 min)',c:'Practice'}
]},
{date:"2026-07-09",theme:"OS - Processes & Scheduling",tasks:[
{t:'Process States, PCB & Context Switch',c:'OS',road:'os:proc:0'},
{t:'Process Creation & IPC',c:'OS',road:'os:proc:1'},
{t:'FCFS & SJF Scheduling',c:'OS',road:'os:sched:0'},
{t:'Round Robin & Priority Scheduling',c:'OS',road:'os:sched:1'},
{t:'MLFQ & Comparison of Algorithms',c:'OS',road:'os:sched:2'}
]},
{date:"2026-07-10",theme:"OS - Threads & Sync",tasks:[
{t:'Threads & Multithreading Models',c:'OS',road:'os:threads:0'},
{t:'Concurrency Patterns & Thread Safety',c:'OS',road:'os:threads:1'},
{t:'Mutex, Semaphores & Monitors',c:'OS',road:'os:sync:0'},
{t:'Classical Synchronization Problems',c:'OS',road:'os:sync:1'},
{t:'Read-Write Locks, Condition Variables & Barriers',c:'OS',road:'os:sync:2'}
]},
{date:"2026-07-11",theme:"OS - Deadlock & Memory",tasks:[
{t:'Deadlock Conditions & Prevention',c:'OS',road:'os:dead:0'},
{t:'Banker\'s Algorithm & Deadlock Detection',c:'OS',road:'os:dead:1'},
{t:'Paging & Page Tables',c:'OS',road:'os:mem:0'},
{t:'Page Replacement Algorithms',c:'OS',road:'os:mem:1'},
{t:'Segmentation & Segmented Paging',c:'OS',road:'os:mem:2'}
]},
{date:"2026-07-12",theme:"OS - VM & File Systems",tasks:[
{t:'Virtual Memory & Demand Paging',c:'OS',road:'os:vm:0'},
{t:'Thrashing & Working Set Model',c:'OS',road:'os:vm:1'},
{t:'File Allocation Methods',c:'OS',road:'os:fs:0'},
{t:'inode, FAT & Directory Structures',c:'OS',road:'os:fs:1'},
{t:'Disk Scheduling',c:'OS',road:'os:fs:2'},
{t:'RAID Levels',c:'OS',road:'os:fs:3'}
]},
{date:"2026-07-13",theme:"DBMS - ER Model & SQL",tasks:[
{t:'ER Diagrams & Relational Model',c:'DBMS',road:'dbms:er:0'},
{t:'Keys & Constraints',c:'DBMS',road:'dbms:er:1'},
{t:'Relational Algebra',c:'DBMS',road:'dbms:er:2'},
{t:'SQL Basics (DDL, DML, SELECT, WHERE, GROUP BY)',c:'DBMS',road:'dbms:sql:0'},
{t:'Joins',c:'DBMS',road:'dbms:sql:1'}
]},
{date:"2026-07-14",theme:"DBMS - Advanced SQL & Normalization",tasks:[
{t:'Subqueries & Nested Queries',c:'DBMS',road:'dbms:sql:2'},
{t:'Window Functions',c:'DBMS',road:'dbms:sql:3'},
{t:'Views, Indexes & Stored Procedures',c:'DBMS',road:'dbms:sql:4'},
{t:'CTEs, Set Operations & CASE',c:'DBMS',road:'dbms:sql:5'},
{t:'Normalization (1NF, 2NF, 3NF, BCNF)',c:'DBMS',road:'dbms:norm:0'}
]},
{date:"2026-07-15",theme:"DBMS - Transactions & Indexing",tasks:[
{t:'Denormalization',c:'DBMS',road:'dbms:norm:1'},
{t:'ACID Properties & Isolation Levels',c:'DBMS',road:'dbms:txn:0'},
{t:'Concurrency Control (Lock-Based, 2PL, MVCC, Timestamp Ordering)',c:'DBMS',road:'dbms:conc:0'},
{t:'B-Tree, B+ Tree & Hash Indexing',c:'DBMS',road:'dbms:idx:0'}
]},
{date:"2026-07-16",theme:"DBMS - Query Opt, Recovery & NoSQL",tasks:[
{t:'Query Processing & Optimization',c:'DBMS',road:'dbms:qopt:0'},
{t:'Recovery & Write-Ahead Logging (ARIES)',c:'DBMS',road:'dbms:recov:0'},
{t:'CAP Theorem',c:'DBMS',road:'dbms:nosql:0'},
{t:'NoSQL Database Types',c:'DBMS',road:'dbms:nosql:1'},
{t:'Practice: 20 Complex SQL Queries',c:'Practice'}
]},
{date:"2026-07-17",theme:"CN - Models & Data Link",tasks:[
{t:'OSI & TCP/IP Models',c:'CN',road:'cn:models:0'},
{t:'Error Detection & Flow Control',c:'CN',road:'cn:dl:0'},
{t:'MAC Protocols & Ethernet',c:'CN',road:'cn:dl:1'},
{t:'Sliding Window Protocols',c:'CN',road:'cn:dl:2'}
]},
{date:"2026-07-18",theme:"CN - Network & Transport",tasks:[
{t:'IPv4 Addressing & Subnetting',c:'CN',road:'cn:net:0'},
{t:'Routing Protocols',c:'CN',road:'cn:net:1'},
{t:'IPv6 & ICMP',c:'CN',road:'cn:net:2'},
{t:'TCP 3-Way Handshake & Flow Control',c:'CN',road:'cn:trans:0'},
{t:'TCP Congestion Control & UDP',c:'CN',road:'cn:trans:1'}
]},
{date:"2026-07-19",theme:"CN - Transport, App & Security",tasks:[
{t:'Socket Programming',c:'CN',road:'cn:trans:2'},
{t:'HTTP/HTTPS & DNS',c:'CN',road:'cn:app:0'},
{t:'DHCP, FTP, SMTP & WebSockets',c:'CN',road:'cn:app:1'},
{t:'Cookies, Sessions, CORS & Authentication',c:'CN',road:'cn:app:2'},
{t:'SSL/TLS, Encryption & Firewalls',c:'CN',road:'cn:sec:0'},
{t:'Common Attacks (DDoS, MITM, DNS Spoofing, XSS)',c:'CN',road:'cn:sec:1'}
]},
{date:"2026-07-20",theme:"CS Fundamentals Review",tasks:[
{t:'OS Rapid Review & 15 MCQs',c:'Review'},
{t:'DBMS Rapid Review & 15 MCQs',c:'Review'},
{t:'CN Rapid Review & 15 MCQs',c:'Review'},
{t:'Practice: 20 Complex SQL Queries',c:'Practice'}
]},
{date:"2026-07-21",theme:"MERN - HTML, CSS & JS",tasks:[
{t:'HTML5 Semantic Elements & Accessibility',c:'MERN',road:'mern:html:0'},
{t:'CSS Flexbox & Grid Layout',c:'MERN',road:'mern:html:1'},
{t:'JavaScript ES6+ Features',c:'MERN',road:'mern:js:0'},
{t:'Closures, Promises & Async/Await',c:'MERN',road:'mern:js:1'},
{t:'Event Loop, Prototypes & this keyword',c:'MERN',road:'mern:js:2'}
]},
{date:"2026-07-22",theme:"TypeScript & React",tasks:[
{t:'TypeScript Essentials',c:'MERN',road:'mern:js:3'},
{t:'Components, JSX & Props',c:'MERN',road:'mern:react:0'},
{t:'Hooks (useState, useEffect, useRef, useMemo)',c:'MERN',road:'mern:react:1'},
{t:'Context API & React Router',c:'MERN',road:'mern:react:2'},
{t:'Performance Optimization & Custom Hooks',c:'MERN',road:'mern:react:3'}
]},
{date:"2026-07-23",theme:"React Testing & Node.js",tasks:[
{t:'Testing (Jest, React Testing Library, Cypress)',c:'MERN',road:'mern:react:4'},
{t:'Node.js Event Loop & Express Basics',c:'MERN',road:'mern:node:0'},
{t:'REST API Design & Best Practices',c:'MERN',road:'mern:node:1'},
{t:'Authentication (JWT, OAuth 2.0)',c:'MERN',road:'mern:node:2'}
]},
{date:"2026-07-24",theme:"Advanced Backend & MongoDB",tasks:[
{t:'Error Handling & Validation',c:'MERN',road:'mern:node:3'},
{t:'File Uploads & Security (Rate Limiting, Helmet)',c:'MERN',road:'mern:node:4'},
{t:'CRUD Operations & Aggregation Pipeline',c:'MERN',road:'mern:mongo:0'},
{t:'Mongoose ODM & Schema Design',c:'MERN',road:'mern:mongo:1'}
]},
{date:"2026-07-25",theme:"DevOps",tasks:[
{t:'Git Workflow & Branching Strategies',c:'MERN',road:'mern:devops:0'},
{t:'Docker Containers & Images',c:'MERN',road:'mern:devops:1'},
{t:'CI/CD with GitHub Actions',c:'MERN',road:'mern:devops:2'},
{t:'Monitoring & Logging (ELK/Prometheus)',c:'MERN',road:'mern:devops:3'}
]},
{date:"2026-07-26",theme:"Cloud & Deployment",tasks:[
{t:'AWS Core Services (EC2, S3, Lambda)',c:'MERN',road:'mern:cloud:0'},
{t:'Serverless Architecture',c:'MERN',road:'mern:cloud:1'},
{t:'Nginx, Load Balancing & Reverse Proxy',c:'MERN',road:'mern:cloud:2'},
{t:'MERN Sprint: 15 MCQs',c:'Practice'}
]},
{date:"2026-07-27",theme:"DSA Sprint - Linear",tasks:[
{t:'Solve: 3 Array/String Medium',c:'Practice'},
{t:'Solve: 2 LL/Stack Medium',c:'Practice'},
{t:'Solve: 2 Tree Medium',c:'Practice'},
{t:'Timed: 3 Problems in 45 min',c:'Practice'}
]},
{date:"2026-07-28",theme:"DSA Sprint - Advanced",tasks:[
{t:'Solve: 3 Graph Medium Problems',c:'Practice'},
{t:'Solve: 3 DP Medium Problems',c:'Practice'},
{t:'Solve: 1 Hard Problem (any topic)',c:'Practice'}
]},
{date:"2026-07-29",theme:"Mock Interview Day 1",tasks:[
{t:'Mock: 2 Medium + 1 Hard DSA (90 min)',c:'Practice'},
{t:'Mock: CS Fundamentals Q&A (30 min)',c:'Review'},
{t:'Mock: LLD Discussion (30 min)',c:'Review'},
{t:'Analysis: Document mistakes',c:'Review'}
]},
{date:"2026-07-30",theme:"Weak Area Drill",tasks:[
{t:'Drill: 5 Problems from Weakest Topic',c:'Practice'},
{t:'Review: Weakest CS Subject',c:'Review'},
{t:'Practice: 20 Mixed MCQs',c:'Practice'}
]},
{date:"2026-07-31",theme:"Mock Interview Day 2",tasks:[
{t:'Mock: Full Technical Round (60 min)',c:'Practice'},
{t:'Mock: System Design Discussion',c:'Review'},
{t:'Speed: 5 Medium in 75 min',c:'Practice'}
]},
{date:"2026-08-01",theme:"ML Foundations & Supervised",tasks:[
{t:'Bias-Variance Tradeoff & Model Evaluation',c:'GenAI',road:'genai:mlf:0'},
{t:'Feature Engineering & Data Preprocessing',c:'GenAI',road:'genai:mlf:1'},
{t:'Linear & Logistic Regression',c:'GenAI',road:'genai:sup:0'},
{t:'Decision Trees, Random Forests & Gradient Boosting',c:'GenAI',road:'genai:sup:1'},
{t:'SVM, KNN & Naive Bayes',c:'GenAI',road:'genai:sup:2'}
]},
{date:"2026-08-02",theme:"Unsupervised & Deep Learning",tasks:[
{t:'Clustering (K-Means, DBSCAN, Hierarchical)',c:'GenAI',road:'genai:unsup:0'},
{t:'Dimensionality Reduction (PCA, t-SNE)',c:'GenAI',road:'genai:unsup:1'},
{t:'Neural Network Fundamentals (Perceptrons, Backpropagation)',c:'GenAI',road:'genai:dl:0'},
{t:'Optimization (SGD, Adam, Learning Rate Scheduling)',c:'GenAI',road:'genai:dl:1'}
]},
{date:"2026-08-03",theme:"CNN, RNN & NLP",tasks:[
{t:'Convolutional Neural Networks (Architecture, Pooling, Famous Models)',c:'GenAI',road:'genai:cnn2:0'},
{t:'RNNs, LSTMs & GRUs',c:'GenAI',road:'genai:seq:0'},
{t:'Text Preprocessing & Word Embeddings (TF-IDF, Word2Vec, GloVe)',c:'GenAI',road:'genai:nlp:0'},
{t:'Attention Mechanism',c:'GenAI',road:'genai:nlp:1'}
]},
{date:"2026-08-04",theme:"LLMs & RAG",tasks:[
{t:'Transformer Architecture (Self-Attention, Multi-Head Attention)',c:'GenAI',road:'genai:llm:0'},
{t:'BERT, GPT & Modern LLMs',c:'GenAI',road:'genai:llm:1'},
{t:'Fine-Tuning & Prompt Engineering',c:'GenAI',road:'genai:llm:2'},
{t:'Vector Databases & Embeddings',c:'GenAI',road:'genai:rag:0'},
{t:'Retrieval-Augmented Generation Pipeline',c:'GenAI',road:'genai:rag:1'},
{t:'LangChain & Orchestration Frameworks',c:'GenAI',road:'genai:rag:2'}
]},
{date:"2026-08-05",theme:"Aptitude & Reasoning",tasks:[
{t:'Probability Fundamentals',c:'Aptitude',road:'apt:prob:0'},
{t:'Combinatorics',c:'Aptitude',road:'apt:prob:1'},
{t:'Logical Reasoning & Number Theory',c:'Aptitude',road:'apt:quant:0'},
{t:'Time, Speed & Distance',c:'Aptitude',road:'apt:arith:0'},
{t:'Time & Work',c:'Aptitude',road:'apt:arith:1'},
{t:'Percentages, Profit & Loss',c:'Aptitude',road:'apt:arith:2'},
{t:'Data Interpretation',c:'Aptitude',road:'apt:logic:0'},
{t:'Puzzles & Logical Arrangements',c:'Aptitude',road:'apt:logic:1'}
]},
{date:"2026-08-06",theme:"Full Mock Simulation",tasks:[
{t:'Mock: Online Round (3 DSA + 25 MCQs, 90 min)',c:'Practice'},
{t:'Mock: Technical Interview (60 min)',c:'Practice'},
{t:'Analysis: Score & Categorize',c:'Review'}
]},
{date:"2026-08-07",theme:"Speed Coding Sprint",tasks:[
{t:'Speed: 10 Easy in 60 min',c:'Practice'},
{t:'Speed: 5 Medium in 75 min',c:'Practice'},
{t:'Review: All DSA Pattern Templates',c:'Review'}
]},
{date:"2026-08-08",theme:"CS & Design Review",tasks:[
{t:'OS Cheat Sheet + 15 MCQs',c:'Review'},
{t:'DBMS Cheat Sheet + 15 MCQs',c:'Review'},
{t:'CN Cheat Sheet + 15 MCQs',c:'Review'},
{t:'LLD: Review Design Patterns',c:'Review'}
]},
{date:"2026-08-09",theme:"Hard Problem Marathon",tasks:[
{t:'Solve: 2 Hard Array/String',c:'Practice'},
{t:'Solve: 2 Hard Graph/DP',c:'Practice'},
{t:'Solve: 1 Hard Tree Problem',c:'Practice'},
{t:'Review: Edge Cases & Common Bugs',c:'Review'}
]},
{date:"2026-08-10",theme:"Final Sprint & Confidence",tasks:[
{t:'DE Shaw Past Questions (GFG, Glassdoor)',c:'Practice'},
{t:'Solve: 5 Medium (one per topic)',c:'Practice'},
{t:'Review: All Cheat Sheets',c:'Review'},
{t:'Review: Top 10 DSA Patterns',c:'Review'}
]}
];
// ====== NAV ======
function switchView(v){
  document.querySelectorAll('#mainNav a').forEach(x=>x.classList.remove('on'));
  const a=document.querySelector(`#mainNav a[data-v="${v}"]`);if(a)a.classList.add('on');
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('on'));
  document.getElementById('v-'+v).classList.add('on');
  if(v==='road')renderRoad();
  if(v==='cal'){renderCal();renderDP();renderDash()}
  updTop();
}
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>switchView(a.dataset.v)));

// ====== ROADMAP ======
let roadCat=st.navCat||0,roadTab=st.navTab||0,openTopic=st.navTopic!=null?st.navTopic:-1,innerTab=st.navInner||'learn';

function catProg(cat){let d=0,t=0;cat.tabs.forEach(tab=>{tab.topics.forEach((_,ti)=>{t++;if(st.road[cat.id+':'+tab.id+':'+ti])d++})});return{d,t,p:t?Math.round(d/t*100):0}}
function tabProg(cat,tab){let d=0;tab.topics.forEach((_,ti)=>{if(st.road[cat.id+':'+tab.id+':'+ti])d++});return{d,t:tab.topics.length,p:tab.topics.length?Math.round(d/tab.topics.length*100):0}}
function totalProg(){let d=0,t=0;ROADMAP.forEach(c=>c.tabs.forEach(tb=>tb.topics.forEach((_,ti)=>{t++;if(st.road[c.id+':'+tb.id+':'+ti])d++})));return{d,t,p:t?Math.round(d/t*100):0}}

function renderRoadSide(){
  if(!ROADMAP.length){document.getElementById('roadSide').innerHTML='<div class="empty-msg" style="font-size:14px;padding:20px">Loading...</div>';return}
  document.getElementById('roadSide').innerHTML=ROADMAP.map((cat,ci)=>{
    const p=catProg(cat),fc=p.p===100?'complete':p.p>0?'partial':'';
    return`<div class="road-cat ${ci===roadCat?'on':''}" onclick="selCat(${ci})"><div class="rc-t">${cat.t}</div><div class="rc-bar"><div class="fill ${fc}" style="width:${p.p}%"></div></div><div class="rc-pct">${p.d}/${p.t} &middot; ${p.p}%</div></div>`;
  }).join('');
}

function renderRoadTabs(){
  if(!ROADMAP.length)return;
  const cat=ROADMAP[roadCat],cp=catProg(cat);
  document.getElementById('roadHead').innerHTML=`<h2>${cat.t}</h2><div class="rh-sub">${cp.d}/${cp.t} topics &middot; ${cp.p}%</div>`;
  document.getElementById('roadTabs').innerHTML=cat.tabs.map((tab,ti)=>{
    const p=tabProg(cat,tab);
    return`<button class="road-tab ${ti===roadTab?'on':''}" onclick="selTab(${ti})">${tab.t} <span style="color:#444;font-size:12px">${p.d}/${p.t}</span></button>`;
  }).join('');
  renderRoadTopics();
}

function renderRoadTopics(){
  if(!ROADMAP.length){document.getElementById('roadTopics').innerHTML='<div class="empty-msg">Content loading...</div>';return}
  const cat=ROADMAP[roadCat],tab=cat.tabs[roadTab],p=tabProg(cat,tab);
  const fc=p.p===100?'complete':p.p>0?'partial':'';
  let h=`<div class="tab-prog"><div class="bar"><div class="fill ${fc}" style="width:${p.p}%"></div></div><span>${p.d}/${p.t} completed</span></div>`;
  h+=tab.topics.map((topic,ti)=>{
    const key=cat.id+':'+tab.id+':'+ti;
    const done=!!st.road[key];
    const isOpen=openTopic===ti;
    const tp=typeof topic==='object'?topic:{t:topic};
    const split=splitSpotlight(tp.learn);
    const mcqCount=(tp.mcqs?tp.mcqs.length:0)+split.qCount;
    let card=`<div class="topic-card"><div class="topic-hdr" onclick="toggleOpen(${ti})"><input type="checkbox" ${done?'checked':''} onclick="event.stopPropagation()" onchange="tgDone('${key}')"/><span class="th-name ${done?'done':''}">${tp.t}</span>`;
    if(mcqCount)card+=`<span class="th-badge">Practice &middot; ${mcqCount}</span>`;
    if(tp.problems&&tp.problems.length)card+=`<span class="th-badge">Leetcode &middot; ${tp.problems.length}</span>`;
    if(tp.code)card+=`<span class="th-badge">Code</span>`;
    card+=`<span class="th-arrow ${isOpen?'open':''}">&#9654;</span></div>`;
    if(isOpen){
      const hasCode=!!tp.code;
      const hasProb=tp.problems&&tp.problems.length;
      const hasMcq=tp.mcqs&&tp.mcqs.length;
      const hasSpotlight=!!split.spotlight;
      const hasPractice=hasMcq||hasSpotlight;
      card+=`<div class="topic-body open">`;
      card+=`<div class="inner-tabs">`;
      card+=`<button class="inner-tab ${innerTab==='learn'?'on':''}" onclick="swInner('learn')">Learn</button>`;
      if(hasCode)card+=`<button class="inner-tab ${innerTab==='code'?'on':''}" onclick="swInner('code')">Code</button>`;
      if(hasProb)card+=`<button class="inner-tab ${innerTab==='problems'?'on':''}" onclick="swInner('problems')">Leetcode (${tp.problems.length})</button>`;
      if(hasPractice)card+=`<button class="inner-tab ${innerTab==='mcq'?'on':''}" onclick="swInner('mcq')">Practice Problems (${mcqCount})</button>`;
      card+=`</div>`;
      // Learn pane
      card+=`<div class="inner-pane ${innerTab==='learn'?'on':''}">`;
      if(split.learn)card+=`<div class="tc-section"><div class="tc-text">${split.learn}</div></div>`;
      if(tp.ref)card+=`<div class="tc-section"><div class="tc-label">Reference</div><div class="tc-text">${tp.ref}</div></div>`;
      card+=`</div>`;
      // Code pane
      if(hasCode){
        card+=`<div class="inner-pane ${innerTab==='code'?'on':''}">`;
        card+=`<div class="tc-section"><div class="tc-code">${hlCode(tp.code)}</div></div>`;
        card+=`</div>`;
      }
      // Leetcode pane
      if(hasProb){
        const solvedCount=tp.problems.filter((_,pi)=>st.prob[key+':'+pi]).length;
        card+=`<div class="inner-pane ${innerTab==='problems'?'on':''}">`;
        card+=`<div class="prob-prog">${solvedCount}/${tp.problems.length} solved</div>`;
        card+=`<ul class="tc-problems">`;
        tp.problems.forEach((pr,pi)=>{const[name,url,diff]=pr;const pkey=key+':'+pi;const solved=!!st.prob[pkey];card+=`<li class="${solved?'solved':''}"><input type="checkbox" ${solved?'checked':''} onchange="tgProb('${pkey}')"/><a href="${url}" target="_blank">${name}</a><span class="diff diff-${diff}">${diff}</span></li>`});
        card+=`</ul></div>`;
      }
      // Practice Problems pane (Interview Spotlight + MCQs)
      if(hasPractice){
        card+=`<div class="inner-pane ${innerTab==='mcq'?'on':''}">`;
        if(hasSpotlight)card+=`<div class="tc-section"><div class="tc-text spotlight-qa">${split.spotlight}</div></div>`;
        if(hasMcq){
          card+=`<div class="tc-section"><div class="tc-text spotlight-qa">`;
          tp.mcqs.forEach((m,mi)=>{
            const mkey=key+':'+mi;const picked=st.mcq[mkey];
            const qn=split.qCount+mi+1;
            card+=`<div class="mcq-item"><p class="learn-p"><b>Q${qn}: ${m.q}</b></p><div class="mcq-opts">`;
            m.o.forEach((opt,oi)=>{
              let cls='mcq-opt';
              if(picked!==undefined){cls+=' picked';if(oi===m.a)cls+=' correct';else if(oi===picked)cls+=' wrong'}
              card+=`<div class="${cls}" onclick="pickMCQ('${mkey}',${oi},${m.a})"><span class="mcq-radio"></span>${opt}</div>`;
            });
            card+=`</div></div>`;
          });
          card+=`</div></div>`;
        }
        card+=`</div>`;
      }
      card+=`</div>`;
    }
    card+=`</div>`;return card;
  }).join('');
  document.getElementById('roadTopics').innerHTML=h;
  document.querySelectorAll('.learn-code:not(.hl)').forEach(el=>{el.classList.add('hl');el.innerHTML=hlCode(el.textContent)});
}

function splitSpotlight(html){
  if(!html)return{learn:'',spotlight:'',qCount:0};
  const marker='<div class="learn-section"><div class="learn-h">Interview Spotlight</div>';
  const idx=html.indexOf(marker);
  if(idx<0)return{learn:html,spotlight:'',qCount:0};
  const raw=html.substring(idx);
  const qCount=(raw.match(/<b>Q\d*[:.]/g)||[]).length;
  const spotlight=raw.replace('<div class="learn-h">Interview Spotlight</div>','');
  return{learn:html.substring(0,idx),spotlight,qCount};
}

function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function hlCode(raw){
  const e=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const tokens=[];let i=0;
  while(i<raw.length){
    if(raw[i]==='/'&&raw[i+1]==='/'){let j=i;while(j<raw.length&&raw[j]!=='\n')j++;tokens.push({t:'com',v:raw.slice(i,j)});i=j;continue}
    if(raw[i]==='/'&&raw[i+1]==='*'){let j=raw.indexOf('*/',i+2);if(j<0)j=raw.length-2;j+=2;tokens.push({t:'com',v:raw.slice(i,j)});i=j;continue}
    if(raw[i]==='"'||raw[i]==="'"){const q=raw[i];let j=i+1;while(j<raw.length&&raw[j]!==q){if(raw[j]==='\\')j++;j++}j++;tokens.push({t:'str',v:raw.slice(i,j)});i=j;continue}
    if(raw[i]==='#'){let j=i;while(j<raw.length&&raw[j]!=='\n'){if(raw[j]==='\\'&&raw[j+1]==='\n')j+=2;else j++}tokens.push({t:'pre',v:raw.slice(i,j)});i=j;continue}
    if(/[0-9]/.test(raw[i])&&(i===0||/[\s,=+\-*/%(<>!&|^~?:;\[]/.test(raw[i-1]))){let j=i;while(j<raw.length&&/[0-9a-fA-FxXbBlLuU.]/.test(raw[j]))j++;tokens.push({t:'num',v:raw.slice(i,j)});i=j;continue}
    if(/[a-zA-Z_]/.test(raw[i])){let j=i;while(j<raw.length&&/[a-zA-Z0-9_]/.test(raw[j]))j++;tokens.push({t:'id',v:raw.slice(i,j)});i=j;continue}
    tokens.push({t:'p',v:raw[i]});i++;
  }
  const kw=new Set(['int','float','double','char','bool','void','long','short','unsigned','signed','auto','const','static','extern','inline','virtual','override','explicit','volatile','mutable','constexpr','class','struct','enum','union','namespace','template','typename','typedef','using','public','private','protected','friend','operator','new','delete','this','return','if','else','for','while','do','switch','case','default','break','continue','goto','try','catch','throw','true','false','nullptr','NULL','sizeof','static_cast','dynamic_cast','const_cast','reinterpret_cast','noexcept','final','abstract','var','let','const','function','async','await','import','export','from','def','lambda','yield','pass','raise','except','finally','with','as','in','not','and','or','is','None','True','False','self','cls','print']);
  const ty=new Set(['string','vector','map','unordered_map','set','unordered_set','pair','tuple','queue','deque','stack','priority_queue','list','array','bitset','shared_ptr','unique_ptr','weak_ptr','optional','variant','any','size_t','int8_t','int16_t','int32_t','int64_t','uint8_t','uint16_t','uint32_t','uint64_t','Node','TreeNode','ListNode','Graph','String','Array','Object','Promise','Map','Set','Number','Boolean','Symbol','BigInt','Date','RegExp','Error','Function','dict','List','Tuple','Dict','Optional','Union','Any','DataFrame','Series','ndarray','Tensor']);
  const flow=new Set(['return','if','else','for','while','do','switch','case','default','break','continue','goto','try','catch','throw','async','await','yield','except','finally','raise','pass']);
  const bi=new Set(['cout','cin','endl','printf','scanf','puts','getline','push_back','pop_back','emplace_back','insert','erase','find','begin','end','size','empty','front','back','top','push','pop','sort','reverse','min','max','swap','abs','make_pair','make_tuple','stoi','stol','stof','stod','to_string','substr','length','resize','reserve','clear','count','lower_bound','upper_bound','next','prev','distance','accumulate','transform','fill','memset','main','console','log','require','module','exports','fetch','setTimeout','setInterval','addEventListener','querySelector','getElementById','createElement','appendChild','innerHTML','textContent','forEach','map','filter','reduce','slice','splice','concat','join','split','trim','replace','match','includes','indexOf','keys','values','entries','assign','freeze','stringify','parse','then','resolve','reject','len','range','enumerate','zip','sorted','reversed','append','extend','remove','items','get','update','format','join','strip','split','isinstance','type','super','hasattr','getattr','setattr']);
  let h='';
  for(const tk of tokens){
    const v=e(tk.v);
    if(tk.t==='com')h+=`<span class="hl-com">${v}</span>`;
    else if(tk.t==='str')h+=`<span class="hl-str">${v}</span>`;
    else if(tk.t==='pre')h+=`<span class="hl-pre">${v}</span>`;
    else if(tk.t==='num')h+=`<span class="hl-num">${v}</span>`;
    else if(tk.t==='id'){
      if(flow.has(tk.v))h+=`<span class="hl-flow">${v}</span>`;
      else if(kw.has(tk.v))h+=`<span class="hl-kw">${v}</span>`;
      else if(ty.has(tk.v))h+=`<span class="hl-ty">${v}</span>`;
      else if(bi.has(tk.v))h+=`<span class="hl-fn">${v}</span>`;
      else h+=`<span class="hl-id">${v}</span>`;
    }else h+=v;
  }
  return h;
}
function selCat(ci){roadCat=ci;roadTab=0;openTopic=-1;st.navCat=ci;st.navTab=0;st.navTopic=-1;sv();renderRoadSide();renderRoadTabs()}
function selTab(ti){roadTab=ti;openTopic=-1;st.navTab=ti;st.navTopic=-1;sv();renderRoadTabs()}
function toggleOpen(ti){openTopic=openTopic===ti?-1:ti;innerTab='learn';st.navTopic=openTopic;st.navInner='learn';sv();renderRoadTopics();if(openTopic>=0){setTimeout(()=>{const el=document.querySelector('.topic-body.open');if(el)el.scrollIntoView({behavior:'smooth',block:'nearest'})},50)}}
function swInner(tab){innerTab=tab;st.navInner=tab;sv();renderRoadTopics()}
function tgDone(key){
  st.road[key]=!st.road[key];if(!st.road[key])delete st.road[key];
  const done=!!st.road[key];
  SP.forEach(dy=>{dy.tasks.forEach((t,i)=>{if(t.road===key){if(done)st.cal[dy.date+'_'+i]=true;else delete st.cal[dy.date+'_'+i]}})});
  sv();renderRoadSide();renderRoadTabs();updTop();
}
function pickMCQ(mkey,picked,correct){st.mcq[mkey]=picked;sv();renderRoadTopics()}
function tgProb(pkey){st.prob[pkey]=!st.prob[pkey];if(!st.prob[pkey])delete st.prob[pkey];sv();renderRoadTopics()}
function renderRoad(){renderRoadSide();renderRoadTabs()}

function goToRoad(roadKey){
  const parts=roadKey.split(':');if(parts.length<3)return;
  const[catId,tabId,topicIdx]=parts;
  const ci=ROADMAP.findIndex(c=>c.id===catId);if(ci<0)return;
  roadCat=ci;
  const ti=ROADMAP[ci].tabs.findIndex(t=>t.id===tabId);if(ti<0)return;
  roadTab=ti;openTopic=parseInt(topicIdx);innerTab='learn';
  switchView('road');
}

// ====== CALENDAR ======
let _now=new Date(),calM=_now.getMonth(),calY=_now.getFullYear(),selDate=ds(_now.getFullYear(),_now.getMonth(),_now.getDate());
function ds(y,m,d){return`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`}
function getDay(d){return SP.find(x=>x.date===d)}
function dayProg(d){const dy=getDay(d);if(!dy)return{dn:0,tot:0,p:0};const tot=dy.tasks.length;let dn=0;dy.tasks.forEach((_,i)=>{if(st.cal[d+'_'+i])dn++});return{dn,tot,p:tot?Math.round(dn/tot*100):0}}

function renderCal(){
  const M=['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calTitle').textContent=M[calM]+' '+calY;
  const g=document.getElementById('calGrid');g.innerHTML='';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>{const e=document.createElement('div');e.className='cal-dh';e.textContent=d;g.appendChild(e)});
  const fd=new Date(calY,calM,1).getDay(),dim=new Date(calY,calM+1,0).getDate();
  const td=new Date(),ts=ds(td.getFullYear(),td.getMonth(),td.getDate());
  for(let i=0;i<fd;i++){const e=document.createElement('div');e.className='cal-d empty';g.appendChild(e)}
  for(let d=1;d<=dim;d++){
    const s=ds(calY,calM,d),dy=getDay(s),pr=dayProg(s);
    const e=document.createElement('div');
    const sc=dy?(pr.p===100?' full':pr.p>0?' part':''):'';
    e.className='cal-d'+(s===selDate?' sel':'')+(s===ts?' today':'')+sc;
    e.onclick=()=>{selDate=s;renderCal();renderDP()};
    let h=`<div class="dn">${d}</div>`;
    if(dy){const fc=pr.p===100?'complete':pr.p>0?'partial':'';h+=`<div class="dt">${dy.theme}</div><div class="dp"><div class="fill ${fc}" style="width:${pr.p}%"></div></div>`}
    e.innerHTML=h;g.appendChild(e);
  }
}

function renderDP(){
  const p=document.getElementById('dayPanel');const dy=getDay(selDate);
  if(!dy){p.innerHTML='<div class="empty-msg">No tasks for this day</div>';return}
  const d=new Date(selDate+'T12:00:00'),dn=d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
  const pr=dayProg(selDate);const dpc=pr.p===100?'complete':pr.p>0?'partial':'';
  let h=`<h3>${dy.theme}</h3><div class="ds">${dn}</div>`;
  h+=`<div class="day-prog"><div class="fill ${dpc}" style="width:${pr.p}%"></div></div><div class="day-pct">${pr.dn} of ${pr.tot} done</div>`;
  h+='<ul class="tl">';
  dy.tasks.forEach((t,i)=>{
    const done=!!st.cal[selDate+'_'+i];
    const roadLink=t.road?`<span class="go-link" onclick="event.stopPropagation();goToRoad('${t.road}')">Open in Roadmap &rarr;</span>`:'';
    h+=`<li class="ti ${done?'done':''}"><input type="checkbox" ${done?'checked':''} onchange="tgCal('${selDate}',${i})"/><div class="tt">${t.t}${roadLink}</div><span class="cat">${t.c}</span></li>`;
  });
  h+='</ul>';p.innerHTML=h;
}

function tgCal(d,i){st.cal[d+'_'+i]=!st.cal[d+'_'+i];sv();renderCal();renderDP();updTop()}
function calNav(d){calM+=d;if(calM>11){calM=0;calY++}if(calM<0){calM=11;calY--}renderCal()}
function calToday(){const t=new Date();calM=t.getMonth();calY=t.getFullYear();selDate=ds(t.getFullYear(),t.getMonth(),t.getDate());renderCal();renderDP()}

// ====== DASHBOARD ======
function renderDash(){
  let rh='';
  ROADMAP.forEach(cat=>{const p=catProg(cat);const fc=p.p===100?'complete':p.p>0?'partial':'';rh+=`<div class="prog-card"><div class="pc-name">${cat.t}</div><div class="pc-bar"><div class="fill ${fc}" style="width:${p.p}%"></div></div><div class="pc-val">${p.d}/${p.t} &middot; ${p.p}%</div></div>`});
  document.getElementById('roadProg').innerHTML=rh||'<div style="color:#666;font-size:14px">No content loaded</div>';
}

// ====== UTILS ======
function toast(msg){const t=document.getElementById('toast');t.innerHTML=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
function updTop(){const p=totalProg();document.getElementById('hProg').textContent=p.p+'%';document.getElementById('hTop').textContent=p.d+'/'+p.t}

// ====== INIT ======
renderRoad();updTop();
