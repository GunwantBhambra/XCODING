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
// Level Catalog (50 Progressive Algorithmic & Math Challenges)
// Progression: Basic Strings -> Integers -> Input -> Arithmetic -> Expressions -> Floats
// ==========================================================================
const LEVELS = [
  {
    id: 1,
    title: "First Steps: Hello World",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Print <code>Hello, World!</code> to standard output followed by a newline.",
    hint: "Use cout << \"Hello, World!\" << endl; inside main().",
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
    title: "Custom Message",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Print <code>Welcome to C++!</code> to standard output.",
    hint: "Use cout << \"Welcome to C++!\" << endl;.",
    examples: [
      { input: "(none)", output: "Welcome to C++!" }
    ],
    testCases: [
      { input: "", expected: "Welcome to C++!" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print "Welcome to C++!" to standard output
    
    return 0;
}
`
  },
  {
    id: 3,
    title: "Two Lines of Text",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Print two lines of text:<br><code>Hello</code><br><code>World</code>",
    hint: "Use two separate cout statements or \\n.",
    examples: [
      { input: "(none)", output: "Hello\\nWorld" }
    ],
    testCases: [
      { input: "", expected: "Hello\nWorld" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print "Hello" on line 1 and "World" on line 2
    
    return 0;
}
`
  },
  {
    id: 4,
    title: "Three-Line Introduction",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Print the following three lines:<br><code>I am learning C++</code><br><code>It is fast</code><br><code>It is fun</code>",
    hint: "Use cout << \"...\" << endl; for each line.",
    examples: [
      { input: "(none)", output: "I am learning C++\\nIt is fast\\nIt is fun" }
    ],
    testCases: [
      { input: "", expected: "I am learning C++\nIt is fast\nIt is fun" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print the three required lines
    
    return 0;
}
`
  },
  {
    id: 5,
    title: "3x3 Star Box",
    topic: "Basics",
    difficulty: "EASY",
    desc: "Print a 3x3 square of stars (*):<br><code>***</code><br><code>***</code><br><code>***</code>",
    hint: "Print \"***\" three times, each on its own line.",
    examples: [
      { input: "(none)", output: "***\\n***\\n***" }
    ],
    testCases: [
      { input: "", expected: "***\n***\n***" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print 3 rows of 3 asterisks
    
    return 0;
}
`
  },
  {
    id: 6,
    title: "Print Integer Literal",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Print the number <code>42</code> directly to standard output.",
    hint: "Use cout << 42 << endl; without quotes.",
    examples: [
      { input: "(none)", output: "42" }
    ],
    testCases: [
      { input: "", expected: "42" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print the number 42
    
    return 0;
}
`
  },
  {
    id: 7,
    title: "Three Numbers with Spaces",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Print the numbers <code>10 20 30</code> separated by single spaces on one line.",
    hint: "Use cout << 10 << \" \" << 20 << \" \" << 30 << endl;.",
    examples: [
      { input: "(none)", output: "10 20 30" }
    ],
    testCases: [
      { input: "", expected: "10 20 30" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print 10 20 30 on a single line separated by spaces
    
    return 0;
}
`
  },
  {
    id: 8,
    title: "Integer Variable",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Declare an integer variable <code>x = 100;</code> and print its value.",
    hint: "Use int x = 100; cout << x << endl;.",
    examples: [
      { input: "(none)", output: "100" }
    ],
    testCases: [
      { input: "", expected: "100" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare integer x = 100 and print it
    
    return 0;
}
`
  },
  {
    id: 9,
    title: "Variable with Text Label",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Declare an integer <code>score = 95;</code> and print <code>Score: 95</code>.",
    hint: "Use cout << \"Score: \" << score << endl;.",
    examples: [
      { input: "(none)", output: "Score: 95" }
    ],
    testCases: [
      { input: "", expected: "Score: 95" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare score = 95 and print "Score: 95"
    
    return 0;
}
`
  },
  {
    id: 10,
    title: "Reassigning a Variable",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Declare <code>int val = 50;</code>, reassign it to <code>99</code>, and print <code>val</code>.",
    hint: "Assign val = 99 before printing.",
    examples: [
      { input: "(none)", output: "99" }
    ],
    testCases: [
      { input: "", expected: "99" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare val = 50, update val = 99, and print val
    
    return 0;
}
`
  },
  {
    id: 11,
    title: "Two Variables Sentence",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Declare two integer variables <code>a = 7</code> and <code>b = 3</code>. Print <code>7 and 3</code>.",
    hint: "Use cout << a << \" and \" << b << endl;.",
    examples: [
      { input: "(none)", output: "7 and 3" }
    ],
    testCases: [
      { input: "", expected: "7 and 3" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare a = 7, b = 3 and print "7 and 3"
    
    return 0;
}
`
  },
  {
    id: 12,
    title: "Constant Addition",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Print the result of the addition <code>25 + 75</code> directly to standard output.",
    hint: "Use cout << 25 + 75 << endl;.",
    examples: [
      { input: "(none)", output: "100" }
    ],
    testCases: [
      { input: "", expected: "100" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print 25 + 75
    
    return 0;
}
`
  },
  {
    id: 13,
    title: "Echo Integer Input",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read a single integer <code>N</code> from standard input and print it.",
    hint: "Use int n; cin >> n; cout << n << endl;.",
    examples: [
      { input: "42", output: "42" },
      { input: "-9", output: "-9" }
    ],
    testCases: [
      { input: "42", expected: "42" },
      { input: "-9", expected: "-9" },
      { input: "0", expected: "0" },
      { input: "1005", expected: "1005" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read integer n from cin and print it
    
    return 0;
}
`
  },
  {
    id: 14,
    title: "Echo with Label",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print <code>Number: N</code>.",
    hint: "Use cout << \"Number: \" << n << endl;.",
    examples: [
      { input: "25", output: "Number: 25" },
      { input: "-3", output: "Number: -3" }
    ],
    testCases: [
      { input: "25", expected: "Number: 25" },
      { input: "-3", expected: "Number: -3" },
      { input: "100", expected: "Number: 100" },
      { input: "0", expected: "Number: 0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print "Number: <n>"
    
    return 0;
}
`
  },
  {
    id: 15,
    title: "Read Two Integers",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> and print them separated by a single space.",
    hint: "Use cin >> a >> b; cout << a << \" \" << b << endl;.",
    examples: [
      { input: "12 34", output: "12 34" }
    ],
    testCases: [
      { input: "12 34", expected: "12 34" },
      { input: "5 99", expected: "5 99" },
      { input: "-10 20", expected: "-10 20" },
      { input: "0 0", expected: "0 0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b and print them separated by space
    
    return 0;
}
`
  },
  {
    id: 16,
    title: "Reverse Order Output",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code>, then print <code>B</code> followed by <code>A</code> separated by a space.",
    hint: "Read into a and b, then print b << \" \" << a.",
    examples: [
      { input: "10 20", output: "20 10" },
      { input: "1 99", output: "99 1" }
    ],
    testCases: [
      { input: "10 20", expected: "20 10" },
      { input: "1 99", expected: "99 1" },
      { input: "-5 8", expected: "8 -5" },
      { input: "7 7", expected: "7 7" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b, print b then a
    
    return 0;
}
`
  },
  {
    id: 17,
    title: "Three Integers on Separate Lines",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read three integers <code>A</code>, <code>B</code>, and <code>C</code>, and print each on its own line.",
    hint: "Use cin >> a >> b >> c; and print each followed by endl.",
    examples: [
      { input: "10 20 30", output: "10\\n20\\n30" }
    ],
    testCases: [
      { input: "10 20 30", expected: "10\n20\n30" },
      { input: "1 2 3", expected: "1\n2\n3" },
      { input: "-5 0 5", expected: "-5\n0\n5" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    // Read three integers and print each on a new line
    
    return 0;
}
`
  },
  {
    id: 18,
    title: "Next Integer (+1)",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print the next integer (<code>N + 1</code>).",
    hint: "Read n and output n + 1.",
    examples: [
      { input: "7", output: "8" },
      { input: "-1", output: "0" }
    ],
    testCases: [
      { input: "7", expected: "8" },
      { input: "-1", expected: "0" },
      { input: "99", expected: "100" },
      { input: "0", expected: "1" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print n + 1
    
    return 0;
}
`
  },
  {
    id: 19,
    title: "Previous Integer (-1)",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print the preceding integer (<code>N - 1</code>).",
    hint: "Read n and output n - 1.",
    examples: [
      { input: "10", output: "9" },
      { input: "0", output: "-1" }
    ],
    testCases: [
      { input: "10", expected: "9" },
      { input: "0", expected: "-1" },
      { input: "-5", expected: "-6" },
      { input: "100", expected: "99" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print n - 1
    
    return 0;
}
`
  },
  {
    id: 20,
    title: "Double the Number",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its double (<code>N * 2</code>).",
    hint: "Use cout << n * 2 << endl;.",
    examples: [
      { input: "6", output: "12" },
      { input: "-4", output: "-8" }
    ],
    testCases: [
      { input: "6", expected: "12" },
      { input: "-4", expected: "-8" },
      { input: "0", expected: "0" },
      { input: "25", expected: "50" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print n * 2
    
    return 0;
}
`
  },
  {
    id: 21,
    title: "Triple the Number",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its triple (<code>N * 3</code>).",
    hint: "Use cout << n * 3 << endl;.",
    examples: [
      { input: "4", output: "12" },
      { input: "-3", output: "-9" }
    ],
    testCases: [
      { input: "4", expected: "12" },
      { input: "-3", expected: "-9" },
      { input: "10", expected: "30" },
      { input: "0", expected: "0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print n * 3
    
    return 0;
}
`
  },
  {
    id: 22,
    title: "Sum of Two Integers",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> from standard input and print their sum (<code>A + B</code>).",
    hint: "Use cin >> a >> b; cout << a + b << endl;.",
    examples: [
      { input: "3 5", output: "8" },
      { input: "20 30", output: "50" }
    ],
    testCases: [
      { input: "3 5", expected: "8" },
      { input: "20 30", expected: "50" },
      { input: "-4 10", expected: "6" },
      { input: "100 250", expected: "350" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b and print a + b
    
    return 0;
}
`
  },
  {
    id: 23,
    title: "Difference of Two Integers",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> and print <code>A - B</code>.",
    hint: "Use cout << a - b << endl;.",
    examples: [
      { input: "10 3", output: "7" },
      { input: "4 9", output: "-5" }
    ],
    testCases: [
      { input: "10 3", expected: "7" },
      { input: "4 9", expected: "-5" },
      { input: "50 50", expected: "0" },
      { input: "-5 -12", expected: "7" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b and print a - b
    
    return 0;
}
`
  },
  {
    id: 24,
    title: "Product of Two Integers",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> and print their product (<code>A * B</code>).",
    hint: "Use cout << a * b << endl;.",
    examples: [
      { input: "6 7", output: "42" },
      { input: "-3 8", output: "-24" }
    ],
    testCases: [
      { input: "6 7", expected: "42" },
      { input: "-3 8", expected: "-24" },
      { input: "12 12", expected: "144" },
      { input: "0 99", expected: "0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b and print a * b
    
    return 0;
}
`
  },
  {
    id: 25,
    title: "Integer Division Quotient",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> (where <code>B != 0</code>) and print the integer quotient <code>A / B</code>.",
    hint: "Integer division a / b drops any decimal portion.",
    examples: [
      { input: "17 5", output: "3" },
      { input: "20 4", output: "5" }
    ],
    testCases: [
      { input: "17 5", expected: "3" },
      { input: "20 4", expected: "5" },
      { input: "7 2", expected: "3" },
      { input: "3 10", expected: "0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b and print integer division a / b
    
    return 0;
}
`
  },
  {
    id: 26,
    title: "Remainder (Modulo %)",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two positive integers <code>A</code> and <code>B</code> and print the remainder <code>A % B</code>.",
    hint: "Use the % operator: cout << a % b << endl;.",
    examples: [
      { input: "17 5", output: "2" },
      { input: "20 4", output: "0" }
    ],
    testCases: [
      { input: "17 5", expected: "2" },
      { input: "20 4", expected: "0" },
      { input: "7 2", expected: "1" },
      { input: "100 7", expected: "2" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b and print remainder a % b
    
    return 0;
}
`
  },
  {
    id: 27,
    title: "Quotient and Remainder",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two positive integers <code>A</code> and <code>B</code>. Print quotient and remainder separated by a space.",
    hint: "Use cout << a / b << \" \" << a % b << endl;.",
    examples: [
      { input: "19 4", output: "4 3" },
      { input: "10 2", output: "5 0" }
    ],
    testCases: [
      { input: "19 4", expected: "4 3" },
      { input: "10 2", expected: "5 0" },
      { input: "25 6", expected: "4 1" },
      { input: "9 10", expected: "0 9" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read a and b, print quotient and remainder separated by space
    
    return 0;
}
`
  },
  {
    id: 28,
    title: "Linear Formula: 2x + 5",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read an integer <code>X</code> and compute <code>2 * X + 5</code>.",
    hint: "Use cout << 2 * x + 5 << endl;.",
    examples: [
      { input: "3", output: "11" },
      { input: "0", output: "5" }
    ],
    testCases: [
      { input: "3", expected: "11" },
      { input: "0", expected: "5" },
      { input: "10", expected: "25" },
      { input: "-2", expected: "1" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int x;
    // Read x and print 2 * x + 5
    
    return 0;
}
`
  },
  {
    id: 29,
    title: "Evaluate: a * x + b",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read three integers <code>A</code>, <code>B</code>, and <code>X</code>. Compute and print <code>A * X + B</code>.",
    hint: "Use cin >> a >> b >> x; cout << a * x + b << endl;.",
    examples: [
      { input: "3 4 5", output: "19" },
      { input: "2 10 3", output: "16" }
    ],
    testCases: [
      { input: "3 4 5", expected: "19" },
      { input: "2 10 3", expected: "16" },
      { input: "0 7 99", expected: "7" },
      { input: "5 -3 4", expected: "17" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, x;
    // Read a, b, x and print a * x + b
    
    return 0;
}
`
  },
  {
    id: 30,
    title: "Square of a Number",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its square (<code>N * N</code>).",
    hint: "Use cout << n * n << endl;.",
    examples: [
      { input: "5", output: "25" },
      { input: "-4", output: "16" }
    ],
    testCases: [
      { input: "5", expected: "25" },
      { input: "-4", expected: "16" },
      { input: "12", expected: "144" },
      { input: "0", expected: "0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print n * n
    
    return 0;
}
`
  },
  {
    id: 31,
    title: "Cube of a Number",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its cube (<code>N * N * N</code>).",
    hint: "Use cout << n * n * n << endl;.",
    examples: [
      { input: "3", output: "27" },
      { input: "-2", output: "-8" }
    ],
    testCases: [
      { input: "3", expected: "27" },
      { input: "-2", expected: "-8" },
      { input: "5", expected: "125" },
      { input: "10", expected: "1000" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    // Read n and print n * n * n
    
    return 0;
}
`
  },
  {
    id: 32,
    title: "Perimeter of a Square",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read side length <code>S</code> of a square. Print its perimeter (<code>4 * S</code>).",
    hint: "Perimeter is 4 * s.",
    examples: [
      { input: "5", output: "20" },
      { input: "12", output: "48" }
    ],
    testCases: [
      { input: "5", expected: "20" },
      { input: "12", expected: "48" },
      { input: "1", expected: "4" },
      { input: "25", expected: "100" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int s;
    // Read side s and print 4 * s
    
    return 0;
}
`
  },
  {
    id: 33,
    title: "Area of a Square",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read side length <code>S</code> of a square. Print its area (<code>S * S</code>).",
    hint: "Area is s * s.",
    examples: [
      { input: "6", output: "36" },
      { input: "9", output: "81" }
    ],
    testCases: [
      { input: "6", expected: "36" },
      { input: "9", expected: "81" },
      { input: "10", expected: "100" },
      { input: "15", expected: "225" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int s;
    // Read side s and print s * s
    
    return 0;
}
`
  },
  {
    id: 34,
    title: "Perimeter of a Rectangle",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read length <code>L</code> and width <code>W</code>. Print the perimeter <code>2 * (L + W)</code>.",
    hint: "Use cout << 2 * (l + w) << endl;.",
    examples: [
      { input: "4 7", output: "22" },
      { input: "10 20", output: "60" }
    ],
    testCases: [
      { input: "4 7", expected: "22" },
      { input: "10 20", expected: "60" },
      { input: "5 5", expected: "20" },
      { input: "12 8", expected: "40" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int l, w;
    // Read length and width, print perimeter 2 * (l + w)
    
    return 0;
}
`
  },
  {
    id: 35,
    title: "Area of a Rectangle",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read length <code>L</code> and width <code>W</code>. Print the area (<code>L * W</code>).",
    hint: "Use cout << l * w << endl;.",
    examples: [
      { input: "5 8", output: "40" },
      { input: "10 15", output: "150" }
    ],
    testCases: [
      { input: "5 8", expected: "40" },
      { input: "10 15", expected: "150" },
      { input: "6 6", expected: "36" },
      { input: "20 4", expected: "80" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int l, w;
    // Read length and width, print area l * w
    
    return 0;
}
`
  },
  {
    id: 36,
    title: "Sum of Three Integers",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read three integers <code>A</code>, <code>B</code>, and <code>C</code> and print their total sum.",
    hint: "Use cin >> a >> b >> c; cout << a + b + c << endl;.",
    examples: [
      { input: "1 2 3", output: "6" },
      { input: "10 25 15", output: "50" }
    ],
    testCases: [
      { input: "1 2 3", expected: "6" },
      { input: "10 25 15", expected: "50" },
      { input: "-5 10 20", expected: "25" },
      { input: "100 200 300", expected: "600" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    // Read three integers and print their sum
    
    return 0;
}
`
  },
  {
    id: 37,
    title: "Hours & Minutes to Minutes",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read two integers: <code>hours</code> and <code>minutes</code>. Print total minutes (<code>hours * 60 + minutes</code>).",
    hint: "Multiply hours by 60 and add minutes.",
    examples: [
      { input: "2 30", output: "150" },
      { input: "1 45", output: "105" }
    ],
    testCases: [
      { input: "2 30", expected: "150" },
      { input: "1 45", expected: "105" },
      { input: "0 50", expected: "50" },
      { input: "5 0", expected: "300" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int hours, minutes;
    // Read hours and minutes, print total minutes
    
    return 0;
}
`
  },
  {
    id: 38,
    title: "Minutes to Hours & Minutes",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read total minutes <code>M</code>. Print hours and remaining minutes separated by a space.",
    hint: "Use cout << m / 60 << \" \" << m % 60 << endl;.",
    examples: [
      { input: "135", output: "2 15" },
      { input: "60", output: "1 0" }
    ],
    testCases: [
      { input: "135", expected: "2 15" },
      { input: "60", expected: "1 0" },
      { input: "45", expected: "0 45" },
      { input: "300", expected: "5 0" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int m;
    // Read total minutes m and print hours and remaining minutes
    
    return 0;
}
`
  },
  {
    id: 39,
    title: "Print Float Literal",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Print the decimal floating-point number <code>3.14</code> directly to standard output.",
    hint: "Use cout << 3.14 << endl;.",
    examples: [
      { input: "(none)", output: "3.14" }
    ],
    testCases: [
      { input: "", expected: "3.14" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Print the decimal number 3.14
    
    return 0;
}
`
  },
  {
    id: 40,
    title: "Double Variable Declaration",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Declare a variable of type <code>double</code> named <code>price = 19.99;</code> and print its value.",
    hint: "Use double price = 19.99; cout << price << endl;.",
    examples: [
      { input: "(none)", output: "19.99" }
    ],
    testCases: [
      { input: "", expected: "19.99" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Declare double price = 19.99 and print it
    
    return 0;
}
`
  },
  {
    id: 41,
    title: "Read Floating-Point Number",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read a single floating-point number (type <code>double</code>) from standard input and print it.",
    hint: "Use double x; cin >> x; cout << x << endl;.",
    examples: [
      { input: "7.25", output: "7.25" },
      { input: "-0.5", output: "-0.5" }
    ],
    testCases: [
      { input: "7.25", expected: "7.25" },
      { input: "-0.5", expected: "-0.5" },
      { input: "3.1415", expected: "3.1415" },
      { input: "100.5", expected: "100.5" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    double x;
    // Read double x and print it
    
    return 0;
}
`
  },
  {
    id: 42,
    title: "Float Addition",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> numbers <code>A</code> and <code>B</code> from standard input and print their sum.",
    hint: "Use cin >> a >> b; cout << a + b << endl;.",
    examples: [
      { input: "3.2 4.1", output: "7.3" },
      { input: "10.25 5.5", output: "15.75" }
    ],
    testCases: [
      { input: "3.2 4.1", expected: "7.3" },
      { input: "10.25 5.5", expected: "15.75" },
      { input: "1.5 2.5", expected: "4" },
      { input: "-2.5 7.5", expected: "5" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    double a, b;
    // Read two doubles and print their sum
    
    return 0;
}
`
  },
  {
    id: 43,
    title: "Float Multiplication",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> numbers <code>A</code> and <code>B</code> and print their product (<code>A * B</code>).",
    hint: "Use cout << a * b << endl;.",
    examples: [
      { input: "1.5 3.0", output: "4.5" },
      { input: "0.5 0.5", output: "0.25" }
    ],
    testCases: [
      { input: "1.5 3.0", expected: "4.5" },
      { input: "0.5 0.5", expected: "0.25" },
      { input: "2.5 4.0", expected: "10" },
      { input: "10.0 2.5", expected: "25" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    double a, b;
    // Read two doubles and print their product
    
    return 0;
}
`
  },
  {
    id: 44,
    title: "Decimal Division with Doubles",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> numbers <code>A</code> and <code>B</code> (where <code>B != 0</code>) and print <code>A / B</code>.",
    hint: "Double division computes the exact decimal fraction.",
    examples: [
      { input: "7.0 2.0", output: "3.5" },
      { input: "9.0 4.0", output: "2.25" }
    ],
    testCases: [
      { input: "7.0 2.0", expected: "3.5" },
      { input: "9.0 4.0", expected: "2.25" },
      { input: "1.0 4.0", expected: "0.25" },
      { input: "15.0 6.0", expected: "2.5" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    double a, b;
    // Read two doubles and print a / b
    
    return 0;
}
`
  },
  {
    id: 45,
    title: "Integer to Float Typecast Division",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code>. Cast <code>A</code> to <code>double</code> and print exact division <code>(double)A / B</code>.",
    hint: "Use (double)a / b to avoid integer truncation.",
    examples: [
      { input: "5 2", output: "2.5" },
      { input: "7 4", output: "1.75" }
    ],
    testCases: [
      { input: "5 2", expected: "2.5" },
      { input: "7 4", expected: "1.75" },
      { input: "9 2", expected: "4.5" },
      { input: "1 2", expected: "0.5" }
    ],
    starterCode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    // Read integers a and b, cast to double and print exact division
    
    return 0;
}
`
  },
  {
    id: 46,
    title: "Formatted Decimal (setprecision)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read a <code>double X</code>. Using <code>&lt;iomanip&gt;</code>, print <code>X</code> formatted to exactly 2 decimal places using <code>fixed</code> and <code>setprecision(2)</code>.",
    hint: "Include <iomanip> and do: cout << fixed << setprecision(2) << x << endl;",
    examples: [
      { input: "3.1", output: "3.10" },
      { input: "12.3456", output: "12.35" }
    ],
    testCases: [
      { input: "3.1", expected: "3.10" },
      { input: "12.3456", expected: "12.35" },
      { input: "5", expected: "5.00" },
      { input: "0", expected: "0.00" }
    ],
    starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double x;
    // Read double x and print formatted to 2 decimal places
    
    return 0;
}
`
  },
  {
    id: 47,
    title: "Average of Two Integers (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code>. Calculate their average as a float and print it formatted to 2 decimal places.",
    hint: "Average is (a + b) / 2.0. Format using fixed and setprecision(2).",
    examples: [
      { input: "4 5", output: "4.50" },
      { input: "10 15", output: "12.50" }
    ],
    testCases: [
      { input: "4 5", expected: "4.50" },
      { input: "10 15", expected: "12.50" },
      { input: "20 30", expected: "25.00" },
      { input: "1 2", expected: "1.50" }
    ],
    starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a, b;
    // Read two integers, compute float average, print with 2 decimal places
    
    return 0;
}
`
  },
  {
    id: 48,
    title: "Percentage Calculator (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> values: <code>obtainedMarks</code> and <code>totalMarks</code>. Calculate percentage <code>(obtained / total) * 100.0</code> and print with 2 decimal places.",
    hint: "Formula: (obtained / total) * 100.0. Use fixed and setprecision(2).",
    examples: [
      { input: "45 50", output: "90.00" },
      { input: "37 40", output: "92.50" }
    ],
    testCases: [
      { input: "45 50", expected: "90.00" },
      { input: "37 40", expected: "92.50" },
      { input: "18 25", expected: "72.00" },
      { input: "1 3", expected: "33.33" }
    ],
    starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double obtained, total;
    // Read obtained and total marks, compute percentage, print with 2 decimal places
    
    return 0;
}
`
  },
  {
    id: 49,
    title: "Celsius to Fahrenheit (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read a temperature in Celsius <code>C</code> (type <code>double</code>). Convert to Fahrenheit using <code>F = (C * 9.0 / 5.0) + 32.0</code> and print with 2 decimal places.",
    hint: "Formula: (c * 9.0 / 5.0) + 32.0. Use fixed and setprecision(2).",
    examples: [
      { input: "0", output: "32.00" },
      { input: "100", output: "212.00" }
    ],
    testCases: [
      { input: "0", expected: "32.00" },
      { input: "100", expected: "212.00" },
      { input: "37", expected: "98.60" },
      { input: "-40", expected: "-40.00" }
    ],
    starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double c;
    // Read Celsius temperature, convert to Fahrenheit, print with 2 decimal places
    
    return 0;
}
`
  },
  {
    id: 50,
    title: "Body Mass Index (BMI) (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two floating-point numbers: <code>weight</code> (in kg) and <code>height</code> (in meters). Calculate BMI using formula <code>BMI = weight / (height * height)</code> and print formatted to 2 decimal places.",
    hint: "Formula: weight / (height * height). Use fixed and setprecision(2).",
    examples: [
      { input: "70 1.75", output: "22.86" },
      { input: "85 1.80", output: "26.23" }
    ],
    testCases: [
      { input: "70 1.75", expected: "22.86" },
      { input: "85 1.80", expected: "26.23" },
      { input: "55 1.60", expected: "21.48" },
      { input: "90 1.90", expected: "24.93" }
    ],
    starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double weight, height;
    // Read weight (kg) and height (m), compute BMI, print with 2 decimal places
    
    return 0;
}
`
  }
];

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

// Render Level Train Stepper Track (Dropdown Navigation for 50 Levels)
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
  const dropAvatar = document.getElementById('dropdown-avatar-text');
  const dropName = document.getElementById('dropdown-user-name');
  const dropEmail = document.getElementById('dropdown-user-email');
  const dropStatus = document.getElementById('dropdown-status');

  if (nameEl) nameEl.textContent = displayName.toUpperCase();
  if (avatarEl) avatarEl.textContent = firstLetter;
  if (dropAvatar) dropAvatar.textContent = firstLetter;
  if (dropName) dropName.textContent = displayName;
  if (dropEmail) dropEmail.textContent = user.email || "Offline Student";
  if (dropStatus) dropStatus.textContent = (user.uid && !user.uid.startsWith('guest_')) ? "SYNCED" : "OFFLINE";
}

function updateTallyUI() {
  const elCompiles = document.getElementById('tally-compiles');
  const elRuns = document.getElementById('tally-runs');
  const dropComp = document.getElementById('dropdown-compiles');
  const dropRuns = document.getElementById('dropdown-runs');
  const dropCleared = document.getElementById('dropdown-cleared');

  if (elCompiles) elCompiles.textContent = state.tally.totalCompiles;
  if (elRuns) elRuns.textContent = state.tally.totalRuns;
  if (dropComp) dropComp.textContent = state.tally.totalCompiles;
  if (dropRuns) dropRuns.textContent = state.tally.totalRuns;
  if (dropCleared && state.game && state.game.completedLevels) {
    dropCleared.textContent = `${state.game.completedLevels.length} / ${LEVELS.length}`;
  }
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
