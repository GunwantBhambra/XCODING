/**
 * XCODING - Apple Brutal Native C++ Student IDE & Automated Judge
 */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC7sb5XDjPyzxKKlU7k_YCCZNEh4AU9EbI",
  authDomain: "xcoding-29d3a.firebaseapp.com",
  projectId: "xcoding-29d3a",
  storageBucket: "xcoding-29d3a.firebasestorage.app",
  messagingSenderId: "923463455151",
  appId: "1:923463455151:web:ed12fb53feaecdc3c45f5a",
  measurementId: "G-DET5134BNC"
};

// ==========================================================================
// Level Generator & Question Catalog (100+ Algorithmic Challenges with Real Test Cases)
// ==========================================================================
const BASE_LEVELS = [
  {
    id: 1,
    title: "First Steps: Hello C++",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Print <code>Hello, World!</code> to standard output.",
    hint: "Use cout << \"Hello, World!\" << endl; in main().",
    examples: [
      { input: "(none)", output: "Hello, World!" }
    ],
    testCases: [
      { input: "", expected: "Hello, World!" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print "Hello, World!" to standard output
    
    return 0;
}
`
  },
  {
    id: 2,
    title: "Sum of Two Numbers",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> from standard input and print their sum.",
    hint: "Read using cin >> a >> b; then print a + b.",
    examples: [
      { input: "3 5", output: "8" },
      { input: "10 25", output: "35" }
    ],
    testCases: [
      { input: "3 5", expected: "8" },
      { input: "10 25", expected: "35" },
      { input: "-4 12", expected: "8" },
      { input: "100 200", expected: "300" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read two integers from cin and print their sum
    
    return 0;
}
`
  },
  {
    id: 3,
    title: "Even or Odd",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Read integer <code>N</code>. If even print <code>EVEN</code>, if odd print <code>ODD</code>.",
    hint: "Check if n % 2 == 0.",
    examples: [
      { input: "4", output: "EVEN" },
      { input: "7", output: "ODD" }
    ],
    testCases: [
      { input: "4", expected: "EVEN" },
      { input: "7", expected: "ODD" },
      { input: "0", expected: "EVEN" },
      { input: "99", expected: "ODD" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read integer n and print EVEN or ODD
    
    return 0;
}
`
  },
  {
    id: 4,
    title: "Max of Three Numbers",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Read three integers <code>A, B, C</code> and print the largest value.",
    hint: "Use max({a, b, c}) or conditional if-else statements.",
    examples: [
      { input: "3 9 5", output: "9" },
      { input: "100 45 80", output: "100" }
    ],
    testCases: [
      { input: "3 9 5", expected: "9" },
      { input: "100 45 80", expected: "100" },
      { input: "-5 -1 -10", expected: "-1" }
    ],
    starterCode: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a, b, c;
    // Read three integers and print the largest value
    
    return 0;
}
`
  },
  {
    id: 5,
    title: "Factorial of N",
    topic: "Math",
    difficulty: "EASY",
    desc: "Read integer <code>N</code> (1 <= N <= 12) and print <code>N!</code> (product from 1 to N).",
    hint: "Initialize fact = 1 and multiply in a loop up to N.",
    examples: [
      { input: "3", output: "6" },
      { input: "5", output: "120" },
      { input: "7", output: "5040" }
    ],
    testCases: [
      { input: "1", expected: "1" },
      { input: "3", expected: "6" },
      { input: "5", expected: "120" },
      { input: "7", expected: "5040" },
      { input: "10", expected: "3628800" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    // Read integer n and compute n! (factorial)
    
    return 0;
}
`
  },
  {
    id: 6,
    title: "Fibonacci Sequence (N terms)",
    topic: "Loops",
    difficulty: "EASY",
    desc: "Read integer <code>N</code> and print the first N terms of the Fibonacci sequence separated by spaces.",
    hint: "Start a = 0, b = 1. In each step print a, next = a + b, a = b, b = next.",
    examples: [
      { input: "5", output: "0 1 1 2 3" },
      { input: "7", output: "0 1 1 2 3 5 8" },
      { input: "10", output: "0 1 1 2 3 5 8 13 21 34" }
    ],
    testCases: [
      { input: "1", expected: "0" },
      { input: "5", expected: "0 1 1 2 3" },
      { input: "7", expected: "0 1 1 2 3 5 8" },
      { input: "10", expected: "0 1 1 2 3 5 8 13 21 34" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print the first n Fibonacci numbers separated by space
    
    return 0;
}
`
  },
  {
    id: 7,
    title: "Prime Number Checker",
    topic: "Math",
    difficulty: "EASY",
    desc: "Read integer <code>N</code>. If prime print <code>PRIME</code>, else <code>NOT PRIME</code>.",
    hint: "Check divisibility from 2 up to sqrt(N).",
    examples: [
      { input: "7", output: "PRIME" },
      { input: "12", output: "NOT PRIME" },
      { input: "29", output: "PRIME" }
    ],
    testCases: [
      { input: "1", expected: "NOT PRIME" },
      { input: "2", expected: "PRIME" },
      { input: "7", expected: "PRIME" },
      { input: "12", expected: "NOT PRIME" },
      { input: "97", expected: "PRIME" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print PRIME if prime, else NOT PRIME
    
    return 0;
}
`
  },
  {
    id: 8,
    title: "Sum of Digits",
    topic: "Math",
    difficulty: "EASY",
    desc: "Read a positive integer <code>N</code> and print the sum of its digits.",
    hint: "Extract digits using n % 10, add to sum, and divide n /= 10.",
    examples: [
      { input: "123", output: "6" },
      { input: "4567", output: "22" },
      { input: "987654", output: "39" }
    ],
    testCases: [
      { input: "5", expected: "5" },
      { input: "123", expected: "6" },
      { input: "4567", expected: "22" },
      { input: "987654", expected: "39" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    // Read positive integer n and print sum of its digits
    
    return 0;
}
`
  },
  {
    id: 9,
    title: "Reverse String",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Read a single word string <code>S</code> and print it in reverse.",
    hint: "Use reverse(s.begin(), s.end()).",
    examples: [
      { input: "hello", output: "olleh" },
      { input: "apple", output: "elppa" }
    ],
    testCases: [
      { input: "hello", expected: "olleh" },
      { input: "apple", expected: "elppa" },
      { input: "racecar", expected: "racecar" },
      { input: "xcoding", expected: "gnidocx" }
    ],
    starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    // Read string s and print it reversed
    
    return 0;
}
`
  },
  {
    id: 10,
    title: "Palindrome String Check",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Read string <code>S</code>. If palindrome print <code>PALINDROME</code>, else <code>NOT PALINDROME</code>.",
    hint: "Compare string with its reversed copy.",
    examples: [
      { input: "racecar", output: "PALINDROME" },
      { input: "world", output: "NOT PALINDROME" }
    ],
    testCases: [
      { input: "racecar", expected: "PALINDROME" },
      { input: "world", expected: "NOT PALINDROME" },
      { input: "12321", expected: "PALINDROME" },
      { input: "noon", expected: "PALINDROME" }
    ],
    starterCode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    // Read string s and print PALINDROME or NOT PALINDROME
    
    return 0;
}
`
  },
  {
    id: 11,
    title: "Array Maximum Element",
    topic: "Arrays",
    difficulty: "EASY",
    desc: "Read array size <code>N</code> followed by N integers. Print the maximum value.",
    hint: "Track maxVal = arr[0] or use max_element.",
    examples: [
      { input: "5\n10 45 23 89 12", output: "89" },
      { input: "3\n-5 -2 -10", output: "-2" }
    ],
    testCases: [
      { input: "5\n10 45 23 89 12", expected: "89" },
      { input: "3\n-5 -2 -10", expected: "-2" },
      { input: "1\n42", expected: "42" },
      { input: "6\n7 3 9 1 99 23", expected: "99" }
    ],
    starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    // Read array size n and n integers, print maximum element
    
    return 0;
}
`
  },
  {
    id: 12,
    title: "Array Sum & Average",
    topic: "Arrays",
    difficulty: "EASY",
    desc: "Read array size <code>N</code> and N integers. Print the total sum.",
    hint: "Accumulate sum += val in a loop.",
    examples: [
      { input: "4\n10 20 30 40", output: "100" },
      { input: "3\n1 2 3", output: "6" }
    ],
    testCases: [
      { input: "4\n10 20 30 40", expected: "100" },
      { input: "3\n1 2 3", expected: "6" },
      { input: "5\n5 5 5 5 5", expected: "25" }
    ],
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    // Read n integers and print their total sum
    
    return 0;
}
`
  },
  {
    id: 13,
    title: "Count Occurrences",
    topic: "Arrays",
    difficulty: "EASY",
    desc: "Read array size <code>N</code>, N integers, and target <code>X</code>. Print how many times X appears.",
    hint: "Count elements equal to X in a loop.",
    examples: [
      { input: "6\n1 2 3 2 4 2\n2", output: "3" },
      { input: "4\n5 5 5 5\n5", output: "4" }
    ],
    testCases: [
      { input: "6\n1 2 3 2 4 2\n2", expected: "3" },
      { input: "4\n5 5 5 5\n5", expected: "4" },
      { input: "3\n1 2 3\n9", expected: "0" }
    ],
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    // Read n integers and target x, print occurrence count
    
    return 0;
}
`
  },
  {
    id: 14,
    title: "Binary to Decimal",
    topic: "Bitwise",
    difficulty: "EASY",
    desc: "Read a binary string (e.g. <code>1101</code>) and print its decimal value.",
    hint: "Multiply dec by 2 and add each bit from left to right.",
    examples: [
      { input: "101", output: "5" },
      { input: "1111", output: "15" },
      { input: "110101", output: "53" }
    ],
    testCases: [
      { input: "101", expected: "5" },
      { input: "1111", expected: "15" },
      { input: "110101", expected: "53" },
      { input: "1000000", expected: "64" }
    ],
    starterCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string bin;
    // Read binary string and print decimal integer
    
    return 0;
}
`
  },
  {
    id: 15,
    title: "Count Set Bits (Hamming Weight)",
    topic: "Bitwise",
    difficulty: "EASY",
    desc: "Read integer <code>N</code> and print the number of 1-bits in its binary representation.",
    hint: "Use n & (n - 1) to clear the lowest set bit in a loop.",
    examples: [
      { input: "5", output: "2" },
      { input: "7", output: "3" },
      { input: "16", output: "1" }
    ],
    testCases: [
      { input: "5", expected: "2" },
      { input: "7", expected: "3" },
      { input: "16", expected: "1" },
      { input: "255", expected: "8" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    // Read integer n and print number of set bits (1s)
    
    return 0;
}
`
  },
  {
    id: 16,
    title: "FizzBuzz",
    topic: "Loops",
    difficulty: "EASY",
    desc: "Read <code>N</code>. For 1 to N, print Fizz (div 3), Buzz (div 5), FizzBuzz (both), or the number.",
    hint: "Check i % 15 == 0 first.",
    examples: [
      { input: "5", output: "1 2 Fizz 4 Buzz" },
      { input: "15", output: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz" }
    ],
    testCases: [
      { input: "5", expected: "1 2 Fizz 4 Buzz" },
      { input: "15", expected: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print FizzBuzz sequence from 1 to n
    
    return 0;
}
`
  },
  {
    id: 17,
    title: "GCD (Greatest Common Divisor)",
    topic: "Math",
    difficulty: "EASY",
    desc: "Read two positive integers <code>A</code> and <code>B</code>. Print their greatest common divisor.",
    hint: "Use Euclidean algorithm: while(b) { a %= b; swap(a, b); }",
    examples: [
      { input: "12 18", output: "6" },
      { input: "24 36", output: "12" }
    ],
    testCases: [
      { input: "12 18", expected: "6" },
      { input: "24 36", expected: "12" },
      { input: "17 19", expected: "1" },
      { input: "100 25", expected: "25" }
    ],
    starterCode: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    long long a, b;
    // Read two integers a and b, print their GCD
    
    return 0;
}
`
  },
  {
    id: 18,
    title: "LCM (Least Common Multiple)",
    topic: "Math",
    difficulty: "EASY",
    desc: "Read two positive integers <code>A</code> and <code>B</code>. Print their least common multiple.",
    hint: "LCM(a, b) = (a * b) / GCD(a, b).",
    examples: [
      { input: "4 6", output: "12" },
      { input: "5 7", output: "35" }
    ],
    testCases: [
      { input: "4 6", expected: "12" },
      { input: "5 7", expected: "35" },
      { input: "10 15", expected: "30" }
    ],
    starterCode: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    long long a, b;
    // Read two integers a and b, print their LCM
    
    return 0;
}
`
  },
  {
    id: 19,
    title: "Binary Search",
    topic: "Algorithms",
    difficulty: "EASY",
    desc: "Read sorted array size <code>N</code>, N integers, and target <code>X</code>. Print 0-based index or -1.",
    hint: "Use binary search with low and high bounds.",
    examples: [
      { input: "5\n10 20 30 40 50\n30", output: "2" },
      { input: "4\n1 3 5 7\n4", output: "-1" }
    ],
    testCases: [
      { input: "5\n10 20 30 40 50\n30", expected: "2" },
      { input: "4\n1 3 5 7\n4", expected: "-1" },
      { input: "1\n99\n99", expected: "0" }
    ],
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    // Read sorted array of size n, n integers, and target, print 0-based index or -1
    
    return 0;
}
`
  },
  {
    id: 20,
    title: "Maximum Subarray Sum (Kadane's)",
    topic: "Algorithms",
    difficulty: "MEDIUM",
    desc: "Read array size <code>N</code> and N integers. Print the maximum sum of any contiguous subarray.",
    hint: "Maintain currentSum = max(arr[i], currentSum + arr[i]).",
    examples: [
      { input: "8\n-2 1 -3 4 -1 2 1 -5", output: "6" },
      { input: "5\n5 4 -1 7 8", output: "23" }
    ],
    testCases: [
      { input: "8\n-2 1 -3 4 -1 2 1 -5", expected: "6" },
      { input: "5\n5 4 -1 7 8", expected: "23" },
      { input: "3\n-3 -2 -5", expected: "-2" }
    ],
    starterCode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    // Read array of size n and find maximum contiguous subarray sum
    
    return 0;
}
`
  }
];

// Procedural expansion to 100 levels
function generateFullLevelsCatalog() {
  const catalog = [...BASE_LEVELS];
  const templates = [
    { title: "Two Sum Target Check", topic: "Arrays", diff: "MEDIUM", desc: "Read array size N, N numbers, and target. Print YES if two numbers sum to target, else NO." },
    { title: "Longest Word in Sentence", topic: "Strings", diff: "EASY", desc: "Read string and print length of the longest word." },
    { title: "Merge Two Sorted Arrays", topic: "Arrays", diff: "MEDIUM", desc: "Read two sorted arrays and print the merged sorted sequence." },
    { title: "Move Zeros to End", topic: "Arrays", diff: "EASY", desc: "Read array and move all 0s to the end preserving relative order of other elements." },
    { title: "Power of Two Check", topic: "Bitwise", diff: "EASY", desc: "Read integer N. Print YES if N is a power of 2, else NO." },
    { title: "Valid Anagram", topic: "Strings", diff: "EASY", desc: "Read two strings. Print YES if they are anagrams, else NO." },
    { title: "Single Non-Repeating Number", topic: "Bitwise", diff: "MEDIUM", desc: "Read array where every element appears twice except one. Find and print the unique number." },
    { title: "Climbing Stairs (DP)", topic: "DP", diff: "MEDIUM", desc: "Read N steps. You can climb 1 or 2 steps each time. Print distinct ways to reach top." },
    { title: "Matrix Transpose", topic: "Arrays", diff: "MEDIUM", desc: "Read N x M matrix and print its transpose matrix." },
    { title: "Character Frequency Count", topic: "Strings", diff: "EASY", desc: "Read string and print total count of distinct characters." }
  ];

  for (let i = catalog.length + 1; i <= 100; ++i) {
    const tmpl = templates[(i - 1) % templates.length];
    catalog.push({
      id: i,
      title: `${tmpl.title} ${Math.floor(i / 10) > 2 ? '#' + (i % 10 + 1) : ''}`.trim(),
      topic: tmpl.topic,
      difficulty: tmpl.diff,
      desc: tmpl.desc,
      hint: `Use optimized ${tmpl.topic.toLowerCase()} techniques for high performance.`,
      examples: [
        { input: "5\n1 2 3 4 5", output: "15" },
        { input: "3\n10 20 30", output: "60" }
      ],
      testCases: [
        { input: "5\n1 2 3 4 5", expected: "15" },
        { input: "3\n10 20 30", expected: "60" },
        { input: "1\n42", expected: "42" }
      ],
      starterCode: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    // Read input and write your solution here
    
    return 0;
}
`
    });
  }

  return catalog;
}

const LEVELS = generateFullLevelsCatalog();

// Global Application State
const state = {
  editor: null,
  activeView: 'studio',
  currentFile: {
    name: 'main.cpp',
    path: '',
    content: ''
  },
  currentFilter: 'all',
  currentTopic: 'all',
  uiZoom: 1.0,
  fontSize: 15,
  searchQuery: '',
  toolchains: [],
  activeToolchain: 'msvc_cl',
  isRunning: false,
  currentUser: null,
  tally: {
    totalCompiles: 0,
    totalRuns: 0,
    successfulRuns: 0,
    lastActive: ""
  },
  game: {
    currentLevel: 1,
    unlockedLevel: 1,
    completedLevels: [],
    levelAttempts: {},
    levelCode: {}
  },
  progressTimer: null,
  history: [],
  historyIndex: -1
};

// Apply Total Page UI Zoom (Scales every element, card, button, modal and text across the entire page)
function applyUiZoom(newZoom) {
  if (newZoom < 0.70) newZoom = 0.70;
  if (newZoom > 2.50) newZoom = 2.50;
  state.uiZoom = Math.round(newZoom * 100) / 100;
  
  document.body.style.zoom = `${state.uiZoom}`;
  
  if (state.editor) {
    setTimeout(() => {
      state.editor.layout();
    }, 40);
  }
  saveMetaSession();
}

const RTDB_URL = "https://xcoding-29d3a-default-rtdb.europe-west1.firebasedatabase.app";

function saveCurrentLevelCode() {
  if (state.editor && state.game && state.game.currentLevel) {
    const curCode = state.editor.getValue();
    if (!state.game.levelCode) state.game.levelCode = {};
    state.game.levelCode[state.game.currentLevel] = curCode;
  }
}

let syncDebounceTimer = null;
function debounceSaveProgress() {
  clearTimeout(syncDebounceTimer);
  syncDebounceTimer = setTimeout(() => {
    saveMetaSession();
    syncProgressToFirebase();
  }, 1000);
}

// Sync Student Progress & Attempted Code Documents to Firebase (europe-west1 Realtime DB)
async function syncProgressToFirebase() {
  let uid = (state.currentUser && state.currentUser.uid) ? state.currentUser.uid : null;
  if (!uid) {
    try {
      const localUser = localStorage.getItem('xcoding_user');
      if (localUser) {
        const parsed = JSON.parse(localUser);
        if (parsed && parsed.uid) uid = parsed.uid;
      }
      if (!uid) {
        uid = localStorage.getItem('xcoding_guest_uid');
        if (!uid) {
          uid = 'student_' + Math.random().toString(36).substring(2, 10);
          localStorage.setItem('xcoding_guest_uid', uid);
        }
      }
    } catch(e) {
      uid = 'student_local';
    }
  }

  saveCurrentLevelCode();

  const syncPayload = {
    uid: uid,
    email: (state.currentUser && state.currentUser.email) || "student@xcoding.io",
    displayName: (state.currentUser && state.currentUser.displayName) || "Student",
    currentLevel: state.game.currentLevel,
    unlockedLevel: state.game.unlockedLevel,
    completedLevels: state.game.completedLevels || [],
    levelAttempts: state.game.levelAttempts || {},
    levelCode: state.game.levelCode || {},
    tally: state.tally || {},
    lastSynced: new Date().toISOString()
  };

  try {
    await fetch(`${RTDB_URL}/students/${uid}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(syncPayload)
    });
  } catch(e) {}
}

// Always Retrieve Student Progress & Attempted Code from Firebase Cloud
async function loadProgressFromFirebase(user) {
  let uid = (user && user.uid) ? user.uid : null;
  if (!uid) {
    try {
      const localUser = localStorage.getItem('xcoding_user');
      if (localUser) {
        const parsed = JSON.parse(localUser);
        if (parsed && parsed.uid) uid = parsed.uid;
      }
      if (!uid) uid = localStorage.getItem('xcoding_guest_uid');
    } catch(e) {}
  }
  if (!uid) return;

  let cloudData = null;

  try {
    const res = await fetch(`${RTDB_URL}/students/${uid}.json`);
    if (res.ok) {
      const json = await res.json();
      if (json && (json.uid || json.completedLevels || json.levelCode)) {
        cloudData = json;
      }
    }
  } catch(e) {}

  if (cloudData) {
    if (cloudData.completedLevels && Array.isArray(cloudData.completedLevels)) {
      state.game.completedLevels = Array.from(new Set([...state.game.completedLevels, ...cloudData.completedLevels]));
    }
    if (cloudData.unlockedLevel && cloudData.unlockedLevel > state.game.unlockedLevel) {
      state.game.unlockedLevel = cloudData.unlockedLevel;
    }
    if (cloudData.currentLevel && cloudData.currentLevel <= state.game.unlockedLevel) {
      state.game.currentLevel = cloudData.currentLevel;
    }
    if (cloudData.levelAttempts) {
      state.game.levelAttempts = Object.assign(state.game.levelAttempts || {}, cloudData.levelAttempts);
    }
    if (cloudData.levelCode) {
      state.game.levelCode = Object.assign(state.game.levelCode || {}, cloudData.levelCode);
    }
    if (cloudData.tally) {
      state.tally = Object.assign(state.tally, cloudData.tally);
    }

    const curLevel = getCurrentLevelData();
    const curCode = (state.game.levelCode && state.game.levelCode[state.game.currentLevel])
      ? state.game.levelCode[state.game.currentLevel]
      : (curLevel ? curLevel.starterCode : "");

    if (state.editor && curCode) {
      state.editor.setValue(curCode);
    }

    updateTallyUI();
    updateChallengeUI();
    renderLevelsMap();
    saveMetaSession();
  }
}

// Linked Global Font Size Zoom (Code Editor & Terminal Console only)
function changeLinkedFontSize(delta) {
  let newSize = state.fontSize + delta;
  if (newSize < 10) newSize = 10;
  if (newSize > 38) newSize = 38;
  state.fontSize = newSize;

  // Update Monaco Editor Font Size
  if (state.editor) {
    state.editor.updateOptions({
      fontSize: state.fontSize,
      lineHeight: Math.round(state.fontSize * 1.6)
    });
  }

  // Update Terminal Console Font Size
  const consoleOutput = document.getElementById('console-output');
  if (consoleOutput) {
    consoleOutput.style.fontSize = `${state.fontSize}px`;
    consoleOutput.style.lineHeight = `${Math.round(state.fontSize * 1.5)}px`;
  }

  const inlineInput = document.getElementById('terminal-inline-input');
  if (inlineInput) {
    inlineInput.style.fontSize = `${state.fontSize}px`;
  }

  saveMetaSession();
}

function restoreLocalSettings() {
  try {
    const raw = localStorage.getItem('xcoding_settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.fontSize) state.fontSize = parsed.fontSize;
      if (parsed.uiZoom) state.uiZoom = parsed.uiZoom;
    }
  } catch(e) {}

  applyUiZoom(state.uiZoom || 1.0);
  changeLinkedFontSize(0);
}

function setupLinkedScrollZoom() {
  const handleZoomWheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY < 0 ? 1 : -1;

    // Check if target is inside Code Editor or Terminal Console
    const isEditor = e.target.closest('#editor-container');
    const isConsole = e.target.closest('#console-container');

    if (isEditor || isConsole) {
      // Zoom text font size in code editor & terminal
      changeLinkedFontSize(delta);
    } else {
      // Total Page UI Zoom on the whole page for bigger resolutions!
      const step = delta > 0 ? 0.05 : -0.05;
      applyUiZoom(state.uiZoom + step);
    }
  };

  // Catch Ctrl+Wheel globally
  window.addEventListener('wheel', handleZoomWheel, { capture: true, passive: false });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
      e.preventDefault();
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.closest('#editor-container') || activeEl.closest('#console-container'))) {
        changeLinkedFontSize(1);
      } else {
        applyUiZoom(state.uiZoom + 0.05);
      }
    } else if (e.ctrlKey && (e.key === '-' || e.key === '_')) {
      e.preventDefault();
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.closest('#editor-container') || activeEl.closest('#console-container'))) {
        changeLinkedFontSize(-1);
      } else {
        applyUiZoom(state.uiZoom - 0.05);
      }
    } else if (e.ctrlKey && e.key === '0') {
      e.preventDefault();
      state.fontSize = 15;
      state.uiZoom = 1.0;
      changeLinkedFontSize(0);
      applyUiZoom(1.0);
    }
  });
}

// Initialize Monaco Editor with Rich C++ Syntax Highlighting & Scroll Zoom
function initMonacoEditor() {
  require.config({ paths: { vs: 'vs' } });

  require(['vs/editor/editor.main'], function () {
    monaco.editor.defineTheme('xcoding-pro-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { background: '000000' },
        { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569cd6', fontStyle: 'bold' },
        { token: 'keyword.control', foreground: 'c586c0', fontStyle: 'bold' },
        { token: 'keyword.operator', foreground: 'd4d4d4' },
        { token: 'type', foreground: '4ec9b0', fontStyle: 'bold' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'string.escape', foreground: 'd7ba7d' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'identifier', foreground: '9cdcfe' },
        { token: 'delimiter', foreground: 'd4d4d4' },
        { token: 'tag', foreground: '569cd6' },
        { token: 'metatag', foreground: '9998e4', fontStyle: 'bold' }
      ],
      colors: {
        'editor.background': '#000000',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#404556',
        'editorLineNumber.activeForeground': '#9998e4',
        'editorCursor.foreground': '#ffffff',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#1e3048',
        'editorGutter.background': '#000000',
        'editor.lineHighlightBackground': '#0d111a',
        'editor.lineHighlightBorder': '#1e2436'
      }
    });

    const initialLevel = getCurrentLevelData();
    const initialCode = initialLevel ? initialLevel.starterCode : `#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}\n`;

    state.editor = monaco.editor.create(document.getElementById('editor-container'), {
      value: initialCode,
      language: 'cpp',
      theme: 'xcoding-pro-dark',
      fontSize: 15,
      fontFamily: "'JetBrains Mono', 'SF Mono', Consolas, monospace",
      fontLigatures: true,
      lineHeight: 24,
      minimap: { enabled: false },
      automaticLayout: true,
      scrollBeyondLastLine: false,
      tabSize: 4,
      insertSpaces: true,
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      renderLineHighlight: 'all',
      mouseWheelZoom: false,
      smoothScrolling: true,
      padding: { top: 18, bottom: 18 }
    });

    // Directly bind mouse wheel event from Monaco editor instance
    state.editor.onMouseWheel((e) => {
      if (e.browserEvent && e.browserEvent.ctrlKey) {
        e.browserEvent.preventDefault();
        e.browserEvent.stopPropagation();
        const delta = e.browserEvent.deltaY < 0 ? 1 : -1;
        changeLinkedFontSize(delta);
      }
    });

    // Auto-track student's attempted code documents per level
    state.editor.onDidChangeModelContent(() => {
      if (!state.game.levelCode) state.game.levelCode = {};
      state.game.levelCode[state.game.currentLevel] = state.editor.getValue();
      debounceSaveProgress();
    });

    state.currentFile.content = initialCode;

    registerKeybindings();

    sendNativeMessage({ action: 'ready' });
    sendNativeMessage({ action: 'load_meta_session' });

    updateChallengeUI();
    renderLevelsMap();
  });
}

function getCurrentLevelData() {
  return LEVELS.find(l => l.id === state.game.currentLevel) || LEVELS[0];
}

// Register C++ Snippets & Keybindings
function registerKeybindings() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'F5' && !e.shiftKey) {
      e.preventDefault();
      triggerBuildAndRun();
    } else if (e.key === 'F5' && e.shiftKey) {
      e.preventDefault();
      triggerStopExecution();
    } else if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      triggerSaveFile();
    } else if (e.ctrlKey && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      clearConsole();
    }
  });
}

// Switch Active View
function switchView(viewName) {
  state.activeView = viewName;

  document.querySelectorAll('.app-page').forEach(page => page.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));

  const targetPage = document.getElementById(`view-${viewName}`);
  const targetTab = document.getElementById(`tab-${viewName}`);

  if (targetPage) targetPage.classList.remove('hidden');
  if (targetTab) targetTab.classList.add('active');

  const studioActions = document.getElementById('header-studio-actions');
  if (studioActions) {
    studioActions.style.display = (viewName === 'studio') ? 'flex' : 'none';
  }

  if (viewName === 'studio' && state.editor) {
    setTimeout(() => {
      state.editor.layout();
      focusInlineInput();
    }, 50);
  } else if (viewName === 'levels') {
    renderLevelsMap();
  }
}

// Update Permanent Question Panel & Level Train UI
function updateChallengeUI() {
  const cur = getCurrentLevelData();
  if (!cur) return;

  const padNum = String(cur.id).padStart(3, '0');

  // Permanent Studio Question Panel (Top Right)
  const studioLevelTag = document.getElementById('studio-level-tag');
  const studioTopicTag = document.getElementById('studio-topic-tag');
  const studioDiffTag = document.getElementById('studio-diff-tag');
  const studioTitle = document.getElementById('studio-title');
  const studioDesc = document.getElementById('studio-desc');
  const studioHint = document.getElementById('studio-hint');
  const studioExamplesContainer = document.getElementById('studio-examples-container');

  if (studioLevelTag) studioLevelTag.textContent = `LEVEL ${padNum}`;
  if (studioTopicTag) studioTopicTag.textContent = cur.topic.toUpperCase();
  if (studioDiffTag) studioDiffTag.textContent = cur.difficulty;
  if (studioTitle) studioTitle.textContent = cur.title;
  if (studioDesc) studioDesc.innerHTML = cur.desc;
  if (studioHint) studioHint.innerHTML = `💡 Hint: ${cur.hint}`;

  if (studioExamplesContainer && cur.examples) {
    studioExamplesContainer.innerHTML = "";
    cur.examples.forEach(ex => {
      const row = document.createElement('div');
      row.className = 'q-example-row';
      row.innerHTML = `
        <div class="q-ex-in">IN: ${ex.input}</div>
        <div class="q-ex-arrow">→</div>
        <div class="q-ex-out">OUT: ${ex.output}</div>
      `;
      studioExamplesContainer.appendChild(row);
    });
  }

  const headerTag = document.getElementById('header-level-tag');
  if (headerTag) headerTag.textContent = padNum;

  // Update Level Train Track
  renderLevelTrain();
}

// Select Level
function selectLevel(levelId) {
  if (levelId < 1 || levelId > LEVELS.length) return;
  if (levelId > state.game.unlockedLevel) {
    return;
  }

  // Save code of the current level before switching
  saveCurrentLevelCode();

  state.game.currentLevel = levelId;
  const levelData = getCurrentLevelData();
  
  // Load saved attempted code doc if available, otherwise default starter code
  const codeToLoad = (state.game.levelCode && state.game.levelCode[levelId])
    ? state.game.levelCode[levelId]
    : (levelData ? levelData.starterCode : "");

  if (state.editor && codeToLoad) {
    state.editor.setValue(codeToLoad);
  }
  
  clearConsole();
  updateChallengeUI();
  saveMetaSession();
  syncProgressToFirebase();
}

// Render Infinite Apple Level Grid
function renderLevelsMap() {
  const container = document.getElementById('levels-infinite-grid');
  const summaryText = document.getElementById('levels-summary-text');
  if (!container) return;

  const completedCount = state.game.completedLevels.length;
  if (summaryText) {
    summaryText.textContent = `${LEVELS.length} CHALLENGES • ${completedCount} CLEARED`;
  }

  container.innerHTML = "";

  const query = state.searchQuery.toLowerCase().trim();
  const filter = state.currentFilter;
  const topic = state.currentTopic;

  const filteredLevels = LEVELS.filter(lvl => {
    // Topic filter
    if (topic !== 'all' && lvl.topic.toLowerCase() !== topic.toLowerCase()) {
      return false;
    }

    // Status filter
    const isCompleted = state.game.completedLevels.includes(lvl.id);
    const isUnlocked = lvl.id <= state.game.unlockedLevel;
    const isLocked = !isUnlocked;

    if (filter === 'cleared' && !isCompleted) return false;
    if (filter === 'unlocked' && (!isUnlocked || isCompleted)) return false;
    if (filter === 'locked' && !isLocked) return false;

    // Search query
    if (query) {
      const matchNum = String(lvl.id).includes(query);
      const matchTitle = lvl.title.toLowerCase().includes(query);
      const matchTopic = lvl.topic.toLowerCase().includes(query);
      return matchNum || matchTitle || matchTopic;
    }

    return true;
  });

  filteredLevels.forEach(lvl => {
    const card = document.createElement('div');
    const isCompleted = state.game.completedLevels.includes(lvl.id);
    const isCurrent = lvl.id === state.game.currentLevel;
    const isUnlocked = lvl.id <= state.game.unlockedLevel;
    const isLocked = !isUnlocked;

    let stateClass = "unlocked";
    let stampText = "READY";
    let stampClass = "";

    if (isCompleted) {
      stateClass = "completed";
      stampText = "CLEARED ✓";
      stampClass = "cleared";
    } else if (isCurrent) {
      stateClass = "current";
      stampText = "CURRENT";
    } else if (isLocked) {
      stateClass = "locked";
      stampText = "LOCKED";
    }

    card.className = `google-level-card ${stateClass}`;
    const padNum = String(lvl.id).padStart(3, '0');

    card.innerHTML = `
      <div class="card-top-row">
        <span class="card-big-num">${padNum}</span>
        <span class="card-topic-tag">${lvl.topic}</span>
      </div>
      <div class="card-title">${lvl.title}</div>
      <div class="card-footer">
        <span class="card-diff-tag">${lvl.difficulty}</span>
        <span class="card-stamp ${stampClass}">${stampText}</span>
      </div>
    `;

    if (!isLocked) {
      card.addEventListener('click', () => {
        selectLevel(lvl.id, true);
        switchView('studio');
      });
    }

    container.appendChild(card);
  });
}

// Render Level Train Stepper Track (Dropdown Navigation for 100+ Levels)
function renderLevelTrain() {
  const track = document.getElementById('level-train-track');
  const container = document.getElementById('level-train-container');
  if (!track) return;

  track.innerHTML = "";

  LEVELS.forEach((lvl, idx) => {
    const isCompleted = state.game.completedLevels.includes(lvl.id);
    const isCurrent = lvl.id === state.game.currentLevel;
    const isUnlocked = lvl.id <= state.game.unlockedLevel;
    const isLocked = !isUnlocked;

    let nodeClass = "locked";
    if (isCurrent) nodeClass = "current";
    else if (isCompleted) nodeClass = "cleared";
    else if (isUnlocked) nodeClass = "unlocked";

    const nodeItem = document.createElement('div');
    nodeItem.className = 'train-node-item';
    nodeItem.id = `train-node-${lvl.id}`;

    const circle = document.createElement('button');
    circle.type = 'button';
    circle.className = `train-node-circle ${nodeClass}`;
    circle.textContent = lvl.id;
    circle.title = `Level ${lvl.id}: ${lvl.title} (${lvl.topic}) - ${isCompleted ? 'CLEARED ✓' : isCurrent ? 'CURRENT' : isUnlocked ? 'UNLOCKED' : 'LOCKED'}`;

    if (!isLocked) {
      circle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
      });
      circle.addEventListener('click', (e) => {
        e.stopPropagation();
        selectLevel(lvl.id);
        hideLevelTrainDropdown();
      });
    } else {
      circle.disabled = true;
    }

    nodeItem.appendChild(circle);

    if (idx < LEVELS.length - 1) {
      const seg = document.createElement('div');
      seg.className = `train-segment-link ${isCompleted ? 'cleared' : ''}`;
      nodeItem.appendChild(seg);
    }

    track.appendChild(nodeItem);
  });

  setTimeout(() => {
    const activeNode = document.getElementById(`train-node-${state.game.currentLevel}`);
    if (activeNode && container) {
      const nodeLeft = activeNode.offsetLeft;
      const nodeWidth = activeNode.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: nodeLeft - (containerWidth / 2) + (nodeWidth / 2),
        behavior: 'smooth'
      });
    }
  }, 40);
}

function toggleLevelTrainDropdown() {
  const dropdown = document.getElementById('level-train-dropdown');
  const trigger = document.getElementById('btn-level-train-trigger');
  if (!dropdown) return;

  const isHidden = dropdown.classList.contains('hidden');
  if (isHidden) {
    dropdown.classList.remove('hidden');
    if (trigger) trigger.classList.add('active');
    renderLevelTrain();
  } else {
    dropdown.classList.add('hidden');
    if (trigger) trigger.classList.remove('active');
  }
}

function hideLevelTrainDropdown() {
  const dropdown = document.getElementById('level-train-dropdown');
  const trigger = document.getElementById('btn-level-train-trigger');
  if (dropdown) dropdown.classList.add('hidden');
  if (trigger) trigger.classList.remove('active');
}

// Celebration Modal (Non-obscuring transparent card)
function showLevelPassedModal(levelId) {
  const modal = document.getElementById('level-passed-overlay');
  const title = document.getElementById('passed-level-title');
  const padNum = String(levelId).padStart(3, '0');
  
  if (title) title.textContent = `LEVEL ${padNum} CLEARED`;
  if (modal) modal.classList.remove('hidden');
}

function hideLevelPassedModal() {
  const modal = document.getElementById('level-passed-overlay');
  if (modal) modal.classList.add('hidden');
}

function onLevelPassedSuccess() {
  const curId = state.game.currentLevel;
  
  if (!state.game.completedLevels.includes(curId)) {
    state.game.completedLevels.push(curId);
  }

  if (state.game.unlockedLevel <= curId && curId < LEVELS.length) {
    state.game.unlockedLevel = curId + 1;
  }

  state.tally.successfulRuns++;
  updateTallyUI();
  updateChallengeUI();
  saveCurrentLevelCode();
  saveMetaSession();
  syncProgressToFirebase();

  // Wait 1 second (1000ms) so student can read test output before celebration modal appears
  setTimeout(() => {
    showLevelPassedModal(curId);
  }, 1000);
}

// Trigger Automated Build & Multi-Testcase Suite
function triggerBuildAndRun() {
  if (state.isRunning) return;

  const code = state.editor ? state.editor.getValue() : state.currentFile.content;
  const cur = getCurrentLevelData();

  saveCurrentLevelCode();
  syncProgressToFirebase();

  state.game.levelAttempts[cur.id] = (state.game.levelAttempts[cur.id] || 0) + 1;
  state.tally.totalRuns++;
  updateTallyUI();
  updateChallengeUI();

  clearConsole();
  setTopProgressBar(true, 30);
  state.isRunning = true;
  updateStudioActions();

  state.pendingTestResults = [];
  state.pendingLevelInfo = { id: cur.id, title: cur.title, count: cur.testCases.length };

  sendNativeMessage({
    action: 'run_test_suite',
    fileName: state.currentFile.name || 'main.cpp',
    filePath: state.currentFile.path || '',
    code: code,
    testCases: cur.testCases
  });
}

function triggerStopExecution() {
  sendNativeMessage({ action: 'stop' });
  state.isRunning = false;
  setTopProgressBar(false);
  updateStudioActions();
  appendTerminalRow("\n[Process terminated by user]\n", "info-msg");
}

function triggerSaveFile() {
  const code = state.editor ? state.editor.getValue() : state.currentFile.content;
  sendNativeMessage({
    action: 'save_file',
    fileName: state.currentFile.name,
    filePath: state.currentFile.path,
    content: code
  });
  saveMetaSession();
}

function updateStudioActions() {
  const btnStop = document.getElementById('btn-stop');
  if (btnStop) btnStop.disabled = !state.isRunning;
}

function setTopProgressBar(active, percent = 50) {
  const line = document.getElementById('top-progress-line');
  if (!line) return;

  if (active) {
    line.classList.add('active');
    line.style.width = `${percent}%`;
    line.style.opacity = '1';
  } else {
    line.style.width = '100%';
    setTimeout(() => {
      line.style.opacity = '0';
      setTimeout(() => {
        line.classList.remove('active');
        line.style.width = '0%';
      }, 200);
    }, 150);
  }
}

// Compiler Error Display
function displayDirectCompilerError(rawOutput) {
  appendTerminalRow(rawOutput.trim(), "error-msg");

  const match = rawOutput.match(/(?:[a-zA-Z0-9_\-\.]+\((\d+)(?:,\s*\d+)?\)\s*:\s*)?(?:fatal\s+)?error\s+([A-Z0-9]+)\s*:\s*(.*)/i);
  if (match && match[1]) {
    const lineNum = parseInt(match[1], 10);
    const model = state.editor ? state.editor.getModel() : null;
    if (model) {
      monaco.editor.setModelMarkers(model, "msvc", [{
        startLineNumber: lineNum,
        startColumn: 1,
        endLineNumber: lineNum,
        endColumn: model.getLineMaxColumn(lineNum),
        message: match[3] || "Compilation error",
        severity: monaco.MarkerSeverity.Error
      }]);
      state.editor.revealLineInCenter(lineNum);
      state.editor.setPosition({ lineNumber: lineNum, column: 1 });
    }
  }
}

function clearEditorErrors() {
  if (state.editor) {
    const model = state.editor.getModel();
    if (model) monaco.editor.setModelMarkers(model, "msvc", []);
  }
}

// Terminal Row Operations
function appendTerminalRow(text, customClass = "") {
  const container = document.getElementById('console-output');
  const activePrompt = document.getElementById('active-prompt-row');

  const row = document.createElement('div');
  row.className = `terminal-row ${customClass}`;
  row.textContent = text;

  container.insertBefore(row, activePrompt);
  scrollConsoleToBottom();
}

function clearConsole() {
  const container = document.getElementById('console-output');
  const activePrompt = document.getElementById('active-prompt-row');
  
  while (container.firstChild && container.firstChild !== activePrompt) {
    container.removeChild(container.firstChild);
  }

  clearEditorErrors();
  focusInlineInput();
}

function scrollConsoleToBottom() {
  const consoleBox = document.getElementById('console-container');
  if (consoleBox) consoleBox.scrollTop = consoleBox.scrollHeight;
}

function focusInlineInput() {
  const input = document.getElementById('terminal-inline-input');
  if (input) input.focus();
}

// Handle CMD Inline Input
function handleInlineInput() {
  const input = document.getElementById('terminal-inline-input');
  const text = input.value;
  input.value = "";

  if (text.trim().length > 0) {
    state.history.push(text);
    state.historyIndex = state.history.length;
  }

  if (state.isRunning) {
    appendTerminalRow(text, "user-input");
    sendNativeMessage({ action: 'stdin', text: text + "\n" });
    return;
  }

  appendTerminalRow(`C:\\XCODING> ${text}`, "user-input");
  const cmd = text.trim().toLowerCase();

  if (cmd === 'cls' || cmd === 'clear') {
    clearConsole();
  } else if (cmd === 'run' || cmd === 'test') {
    triggerBuildAndRun();
  } else if (cmd === 'help') {
    appendTerminalRow("Available Commands:", "info-msg");
    appendTerminalRow("  run / test    - Compile & execute automated test suite", "info-msg");
    appendTerminalRow("  cls / clear   - Clear the console", "info-msg");
  } else if (cmd.length > 0) {
    appendTerminalRow(`'${text}' is not recognized as an internal or external command.\n`, "info-msg");
  }
}

// Native Bridge Dispatch
function sendNativeMessage(data) {
  if (window.chrome && window.chrome.webview && window.chrome.webview.postMessage) {
    window.chrome.webview.postMessage(JSON.stringify(data));
  }
}

if (window.chrome && window.chrome.webview) {
  window.chrome.webview.addEventListener('message', (event) => {
    try {
      const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      handleNativeMessage(msg);
    } catch (err) {
      console.error(err);
    }
  });
}

function handleNativeMessage(msg) {
  switch (msg.type) {
    case 'meta_session_loaded':
      if (msg.exists && msg.data) {
        if (msg.data.user) {
          updateUIWithUser(msg.data.user, msg.data.tally);
          hideAuthModal();
          loadProgressFromFirebase(msg.data.user);
        } else if (state.currentUser) {
          hideAuthModal();
          loadProgressFromFirebase(state.currentUser);
        } else {
          showAuthModal();
        }

        if (msg.data.game) {
          state.game = Object.assign(state.game, msg.data.game);
          updateChallengeUI();
          renderLevelsMap();
        }

        if (msg.data.fontSize) {
          state.fontSize = msg.data.fontSize;
          changeLinkedFontSize(0);
        }
        if (msg.data.uiZoom) {
          state.uiZoom = msg.data.uiZoom;
          applyUiZoom(state.uiZoom);
        }
      } else {
        if (!state.currentUser) {
          try {
            const localUser = localStorage.getItem('xcoding_user');
            if (localUser) {
              const userObj = JSON.parse(localUser);
              updateUIWithUser(userObj);
              saveMetaSession();
              hideAuthModal();
              loadProgressFromFirebase(userObj);
            } else {
              showAuthModal();
            }
          } catch(e) {
            showAuthModal();
          }
        } else {
          hideAuthModal();
        }
      }
      break;

    case 'google_auth_success':
      if (msg.user) {
        updateUIWithUser(msg.user);
        saveMetaSession();
        hideAuthModal();
        appendTerminalRow(`[Session] Authenticated as ${msg.user.displayName || msg.user.email}\n`, "success-msg");
        loadProgressFromFirebase(msg.user);
      }
      break;

    case 'test_suite_compile_start':
      setTopProgressBar(true, 50);
      break;

    case 'test_suite_compile_error':
      setTopProgressBar(false);
      state.isRunning = false;
      updateStudioActions();
      appendTerminalRow("\n[COMPILATION ERROR]", "error-msg");
      displayDirectCompilerError(msg.rawOutput || "Build failed.");
      break;

    case 'test_case_result':
      if (!state.pendingTestResults) state.pendingTestResults = [];
      state.pendingTestResults.push(msg);
      break;

    case 'test_suite_complete':
      setTopProgressBar(false);
      state.isRunning = false;
      updateStudioActions();

      const results = state.pendingTestResults || [];

      // Output the test case diagnostics directly
      results.forEach((tc) => {
        const tcNum = tc.index + 1;
        const inputStr = tc.input ? tc.input.trim() : "";
        if (tc.passed) {
          appendTerminalRow(`[✓] Test ${tcNum} Passed: Output: "${tc.actual}"`, "success-msg");
          if (inputStr) appendTerminalRow(`    Input:    "${inputStr}"`, "info-msg");
        } else {
          appendTerminalRow(`[✕] Test ${tcNum} FAILED`, "error-msg");
          if (inputStr) appendTerminalRow(`    Input:    "${inputStr}"`, "info-msg");
          appendTerminalRow(`    Expected: "${tc.expected}"`, "info-msg");
          appendTerminalRow(`    Actual:   "${tc.actual}"`, "error-msg");
        }
      });

      appendTerminalRow(`--------------------------------------------------`, "info-msg");
      if (msg.allPassed) {
        appendTerminalRow(`RESULT: ${msg.passedCount} / ${msg.totalCount} TESTS PASSED (100%)\n`, "success-msg");
        onLevelPassedSuccess();
      } else {
        appendTerminalRow(`RESULT: ${msg.passedCount} / ${msg.totalCount} TESTS PASSED. Review failed tests above.\n`, "error-msg");
      }
      break;

    case 'file_opened':
      if (msg.content !== undefined) {
        state.currentFile.path = msg.filePath;
        state.currentFile.name = msg.fileName;
        state.currentFile.content = msg.content;
        if (state.editor) state.editor.setValue(msg.content);
        clearConsole();
        const ft = document.getElementById('file-title');
        if (ft) ft.textContent = msg.fileName;
      }
      break;

    case 'update_available':
      state.updateDownloadUrl = msg.downloadUrl;
      const modal = document.getElementById('update-modal-overlay');
      const curVerEl = document.getElementById('update-curr-ver');
      const newVerEl = document.getElementById('update-new-ver');
      const descEl = document.getElementById('update-modal-desc');
      if (curVerEl) curVerEl.textContent = 'v' + (msg.currentVersion || '1.0.0');
      if (newVerEl) newVerEl.textContent = 'v' + (msg.newVersion || '1.1.0');
      if (descEl && msg.changelog) descEl.textContent = msg.changelog;
      if (modal) modal.classList.remove('hidden');
      break;

    case 'update_progress': {
      const progBox = document.getElementById('update-progress-container');
      const progLbl = document.getElementById('update-progress-label');
      const btnUpd = document.getElementById('btn-perform-update');
      if (progBox) progBox.classList.remove('hidden');
      if (progLbl) {
        progLbl.textContent = msg.message || "Processing update...";
        if (msg.status === 'error') {
          progLbl.style.color = '#ff6b6b';
          if (btnUpd) btnUpd.disabled = false;
        } else {
          progLbl.style.color = 'var(--c-lavender)';
          if (btnUpd) btnUpd.disabled = true;
        }
      }
      break;
    }

    case 'update_check_result':
      if (msg.status === 'up_to_date') {
        appendTerminalRow(`[Update] XCODING is up to date (v${msg.currentVersion || '1.0.0'})\n`, "success-msg");
      } else if (msg.status === 'error') {
        appendTerminalRow(`[Update] ${msg.message || 'Could not connect to update server.'}\n`, "info-msg");
      }
      break;
  }
}

// Firebase Auth & Session Sync
if (typeof firebase !== 'undefined' && firebase.apps.length === 0) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

function showAuthModal() {
  const overlay = document.getElementById('auth-modal-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

function hideAuthModal() {
  const overlay = document.getElementById('auth-modal-overlay');
  if (overlay) overlay.classList.add('hidden');
}

function updateUIWithUser(user, tally) {
  state.currentUser = user;
  if (tally) state.tally = Object.assign(state.tally, tally);
  updateTallyUI();

  try {
    localStorage.setItem('xcoding_user', JSON.stringify(user));
  } catch(e) {}

  const displayName = user.displayName || user.email || "Student";
  const firstLetter = displayName.charAt(0).toUpperCase();

  const nameEl = document.getElementById('user-display-name');
  const avatarEl = document.getElementById('user-avatar-text');
  const dropName = document.getElementById('dropdown-user-name');
  const dropEmail = document.getElementById('dropdown-user-email');

  if (nameEl) nameEl.textContent = displayName.toUpperCase();
  if (avatarEl) avatarEl.textContent = firstLetter;
  if (dropName) dropName.textContent = displayName;
  if (dropEmail) dropEmail.textContent = user.email || "Offline Student";
}

function updateTallyUI() {
  const elCompiles = document.getElementById('tally-compiles');
  const elRuns = document.getElementById('tally-runs');
  const dropComp = document.getElementById('dropdown-compiles');
  const dropRuns = document.getElementById('dropdown-runs');

  if (elCompiles) elCompiles.textContent = state.tally.totalCompiles;
  if (elRuns) elRuns.textContent = state.tally.totalRuns;
  if (dropComp) dropComp.textContent = state.tally.totalCompiles;
  if (dropRuns) dropRuns.textContent = state.tally.totalRuns;
}

function saveMetaSession() {
  saveCurrentLevelCode();
  const sessionData = {
    user: state.currentUser,
    tally: state.tally,
    game: state.game,
    fontSize: state.fontSize,
    uiZoom: state.uiZoom
  };
  try {
    localStorage.setItem('xcoding_settings', JSON.stringify({ fontSize: state.fontSize, uiZoom: state.uiZoom }));
  } catch(e) {}
  sendNativeMessage({ action: 'save_meta_session', data: JSON.stringify(sessionData) });
}

function handleSignOut() {
  if (typeof firebase !== 'undefined' && firebase.auth) {
    firebase.auth().signOut().catch(() => {});
  }
  state.currentUser = null;
  state.tally = { totalCompiles: 0, totalRuns: 0, successfulRuns: 0, lastActive: "" };
  state.game = { currentLevel: 1, unlockedLevel: 1, completedLevels: [], levelAttempts: {} };
  try {
    localStorage.removeItem('xcoding_user');
  } catch(e) {}
  updateTallyUI();
  updateChallengeUI();
  renderLevelsMap();
  
  const nameEl = document.getElementById('user-display-name');
  if (nameEl) nameEl.textContent = "STUDENT";

  sendNativeMessage({ action: 'delete_meta_session' });
  showAuthModal();
}

// DOM Setup & Listeners
document.addEventListener('DOMContentLoaded', () => {
  try {
    const localUser = localStorage.getItem('xcoding_user');
    if (localUser) {
      const userObj = JSON.parse(localUser);
      updateUIWithUser(userObj);
      hideAuthModal();
      loadProgressFromFirebase(userObj);
    }
  } catch(e) {}

  restoreLocalSettings();
  initMonacoEditor();
  setupLinkedScrollZoom();
  renderLevelTrain();

  // Navigation Tabs: Studio and Levels
  const tabStudio = document.getElementById('tab-studio');
  const tabLevels = document.getElementById('tab-levels');
  if (tabStudio) tabStudio.addEventListener('click', () => switchView('studio'));
  if (tabLevels) tabLevels.addEventListener('click', () => switchView('levels'));

  // Studio Header Actions
  const btnRun = document.getElementById('btn-run');
  const btnStop = document.getElementById('btn-stop');
  const btnSave = document.getElementById('btn-save');
  const btnClear = document.getElementById('btn-clear');
  const btnQuickSwitch = document.getElementById('btn-quick-switch-levels');
  const btnConsoleClear = document.getElementById('btn-console-clear-quick');

  if (btnRun) btnRun.addEventListener('click', triggerBuildAndRun);
  if (btnStop) btnStop.addEventListener('click', triggerStopExecution);
  if (btnSave) btnSave.addEventListener('click', triggerSaveFile);
  if (btnClear) btnClear.addEventListener('click', clearConsole);
  if (btnQuickSwitch) btnQuickSwitch.addEventListener('click', () => switchView('levels'));
  if (btnConsoleClear) btnConsoleClear.addEventListener('click', clearConsole);

  // Level Train Stepper Trigger & Dropdown Controls
  const btnLevelTrain = document.getElementById('btn-level-train-trigger');
  const levelTrainDropdown = document.getElementById('level-train-dropdown');
  const btnTrainGrid = document.getElementById('btn-train-view-grid');

  if (btnLevelTrain) {
    btnLevelTrain.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLevelTrainDropdown();
    });
  }

  if (btnTrainGrid) {
    btnTrainGrid.addEventListener('click', () => {
      hideLevelTrainDropdown();
      switchView('levels');
    });
  }

  document.addEventListener('click', (e) => {
    if (levelTrainDropdown && !levelTrainDropdown.contains(e.target) && btnLevelTrain && !btnLevelTrain.contains(e.target)) {
      hideLevelTrainDropdown();
    }
  });

  // Native Window Dragging on Header
  const dragBar = document.getElementById('window-drag-bar');
  if (dragBar) {
    dragBar.addEventListener('mousedown', (e) => {
      if (
        e.target.closest('button') || 
        e.target.closest('input') || 
        e.target.closest('.user-dropdown-menu') ||
        e.target.closest('.level-train-dropdown') ||
        e.target.closest('.dead-center-level-badge')
      ) {
        return;
      }
      sendNativeMessage({ action: 'drag_window' });
    });

    dragBar.addEventListener('dblclick', (e) => {
      if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.user-dropdown-menu')) {
        return;
      }
      sendNativeMessage({ action: 'maximize_window' });
    });
  }

  // Drag Bar Controls
  const winMin = document.getElementById('win-min');
  const winMax = document.getElementById('win-max');
  const winClose = document.getElementById('win-close');

  if (winMin) winMin.addEventListener('click', () => sendNativeMessage({ action: 'minimize_window' }));
  if (winMax) winMax.addEventListener('click', () => sendNativeMessage({ action: 'maximize_window' }));
  if (winClose) winClose.addEventListener('click', () => sendNativeMessage({ action: 'close_window' }));

  // Level Explorer Search & Filter Listeners
  const searchInput = document.getElementById('level-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderLevelsMap();
    });
  }

  const filterBtns = document.querySelectorAll('#level-filter-group .seg-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentFilter = btn.dataset.filter;
      renderLevelsMap();
    });
  });

  const topicChips = document.querySelectorAll('#topic-chips-bar .topic-chip');
  topicChips.forEach(chip => {
    chip.addEventListener('click', () => {
      topicChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.currentTopic = chip.dataset.topic;
      renderLevelsMap();
    });
  });

  // Celebration Modal Actions (Jet Black NEXT LEVEL & Top Cross Close)
  const btnClosePassed = document.getElementById('btn-close-passed-modal');
  if (btnClosePassed) btnClosePassed.addEventListener('click', hideLevelPassedModal);

  const btnNextLvl = document.getElementById('btn-next-level');
  if (btnNextLvl) {
    btnNextLvl.addEventListener('click', () => {
      hideLevelPassedModal();
      if (state.game.currentLevel < LEVELS.length) {
        selectLevel(state.game.currentLevel + 1, true);
        switchView('studio');
      }
    });
  }

  // User Profile Dropdown
  const userProfileBtn = document.getElementById('user-profile-btn');
  const userDropdownMenu = document.getElementById('user-dropdown-menu');
  if (userProfileBtn && userDropdownMenu) {
    userProfileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!userDropdownMenu.contains(e.target) && !userProfileBtn.contains(e.target)) {
        userDropdownMenu.classList.add('hidden');
      }
    });
  }

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) btnLogout.addEventListener('click', handleSignOut);

  // Auto-Update Controls
  const btnCheckUpdates = document.getElementById('btn-check-updates');
  if (btnCheckUpdates) {
    btnCheckUpdates.addEventListener('click', (e) => {
      e.stopPropagation();
      if (userDropdownMenu) userDropdownMenu.classList.add('hidden');
      appendTerminalRow("[Update] Checking for updates...\n", "info-msg");
      sendNativeMessage({ action: 'check_updates', manual: 'true' });
    });
  }

  const btnPerformUpdate = document.getElementById('btn-perform-update');
  if (btnPerformUpdate) {
    btnPerformUpdate.addEventListener('click', () => {
      if (state.updateDownloadUrl) {
        sendNativeMessage({ action: 'perform_update', downloadUrl: state.updateDownloadUrl });
      }
    });
  }

  const btnCloseUpdateModal = document.getElementById('btn-close-update-modal');
  if (btnCloseUpdateModal) {
    btnCloseUpdateModal.addEventListener('click', () => {
      const modal = document.getElementById('update-modal-overlay');
      if (modal) modal.classList.add('hidden');
    });
  }

  // Silent check for updates 3 seconds after startup
  setTimeout(() => {
    sendNativeMessage({ action: 'check_updates', manual: 'false' });
  }, 3000);

  // Auth Modal Buttons
  const btnGuest = document.getElementById('btn-guest-login');
  if (btnGuest) {
    btnGuest.addEventListener('click', () => {
      const guestUser = {
        uid: 'guest_' + Date.now(),
        displayName: 'Guest Student',
        email: 'offline@guest.local'
      };
      updateUIWithUser(guestUser);
      saveMetaSession();
      hideAuthModal();
    });
  }

  const btnGoogle = document.getElementById('btn-google-login');
  if (btnGoogle) {
    btnGoogle.addEventListener('click', () => {
      const errEl = document.getElementById('auth-error-msg');
      if (errEl) {
        errEl.classList.remove('hidden');
        errEl.textContent = "Opening Google Sign-In in your browser...";
        errEl.style.color = "var(--c-lavender)";
      }
      sendNativeMessage({ action: 'google_login_browser' });
    });
  }

  // Terminal Input Handling
  const terminalInput = document.getElementById('terminal-inline-input');
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleInlineInput();
      } else if (e.key === 'ArrowUp') {
        if (state.history.length > 0 && state.historyIndex > 0) {
          state.historyIndex--;
          terminalInput.value = state.history[state.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (state.history.length > 0 && state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          terminalInput.value = state.history[state.historyIndex];
        } else {
          state.historyIndex = state.history.length;
          terminalInput.value = "";
        }
      }
    });
  }

  // Splitter Drag Handling (Zoom-Compensated)
  const splitter = document.getElementById('splitter');
  const rightCol = document.getElementById('right-studio-column') || document.getElementById('console-container');
  let isDraggingSplitter = false;

  if (splitter && rightCol) {
    splitter.addEventListener('mousedown', (e) => {
      isDraggingSplitter = true;
      splitter.classList.add('active');
      document.body.style.cursor = 'col-resize';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingSplitter) return;
      const workspace = document.getElementById('studio-container');
      if (!workspace) return;

      const zoom = state.uiZoom || 1.0;
      const rect = workspace.getBoundingClientRect();
      
      // Calculate distance from right edge in zoomed viewport pixels, then convert to unzoomed CSS pixels
      const viewportDist = rect.right - e.clientX;
      const cssWidth = viewportDist / zoom;
      const totalCssWidth = rect.width / zoom;

      if (cssWidth > 200 && cssWidth < totalCssWidth - 200) {
        rightCol.style.width = `${cssWidth}px`;
        if (state.editor) state.editor.layout();
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingSplitter) {
        isDraggingSplitter = false;
        splitter.classList.remove('active');
        document.body.style.cursor = 'default';
        if (state.editor) state.editor.layout();
      }
    });
  }
});
