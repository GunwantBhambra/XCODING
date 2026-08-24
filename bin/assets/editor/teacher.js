/**
 * XCODING - Teacher Edition & Live Student Inspector
 * Direct Firebase Realtime Database Integration
 */

const RTDB_URL = "https://xcoding-29d3a-default-rtdb.europe-west1.firebasedatabase.app";

// Import 50 Challenge Questions Catalog
const LEVELS = [
  {
    id: 1,
    title: "First Steps: Hello World",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Print <code>Hello, World!</code> to standard output followed by a newline.",
    hint: "Textual messages in C++ must be enclosed within matching double quotes and piped to standard output.",
    examples: [{ input: "(none)", output: "Hello, World!" }],
    testCases: [{ input: "", expected: "Hello, World!" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print "Hello, World!" to standard output\n    \n    return 0;\n}\n`
  },
  {
    id: 2,
    title: "Personalized Welcome",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Print <code>Welcome to C++ Programming!</code> to standard output.",
    hint: "Ensure exact capitalization, spacing, and punctuation inside your string literal.",
    examples: [{ input: "(none)", output: "Welcome to C++ Programming!" }],
    testCases: [{ input: "", expected: "Welcome to C++ Programming!" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print "Welcome to C++ Programming!" to standard output\n    \n    return 0;\n}\n`
  },
  {
    id: 3,
    title: "Two Lines of Text",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Print two separate lines of text:<br><code>Coding is fun</code><br><code>Practice makes perfect</code>",
    hint: "Think about how line breaks are introduced between text outputs.",
    examples: [{ input: "(none)", output: "Coding is fun\nPractice makes perfect" }],
    testCases: [{ input: "", expected: "Coding is fun\nPractice makes perfect" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the two required lines\n    \n    return 0;\n}\n`
  },
  {
    id: 4,
    title: "Tabular Alignment (Escape Sequences)",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Print two columns separated by a tab character:<br><code>NAME\tSCORE</code><br><code>Alice\t100</code>",
    hint: "Recall the special escape sequence used to insert horizontal tab spacing inside a string literal.",
    examples: [{ input: "(none)", output: "NAME\tSCORE\nAlice\t100" }],
    testCases: [{ input: "", expected: "NAME\tSCORE\nAlice\t100" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print NAME and SCORE columns separated by tabs\n    \n    return 0;\n}\n`
  },
  {
    id: 5,
    title: "Quoted Message (Escaped Quotes)",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Print the exact text containing quotes:<br><code>She said, \"Keep learning!\"</code>",
    hint: "When a quote character is part of the text rather than the code boundary, an escape backslash is required.",
    examples: [{ input: "(none)", output: "She said, \"Keep learning!\"" }],
    testCases: [{ input: "", expected: "She said, \"Keep learning!\"" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the quote including double quotes\n    \n    return 0;\n}\n`
  },
  {
    id: 6,
    title: "Display File Path (Escaped Backslashes)",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Print a file directory path with backslashes:<br><code>C:\\Users\\Student\\Project</code>",
    hint: "The backslash character itself initiates an escape sequence; consider how to represent a literal backslash.",
    examples: [{ input: "(none)", output: "C:\\Users\\Student\\Project" }],
    testCases: [{ input: "", expected: "C:\\Users\\Student\\Project" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the Windows file path with backslashes\n    \n    return 0;\n}\n`
  },
  {
    id: 7,
    title: "String Variable Display",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Declare a <code>string</code> variable named <code>lang</code> initialized to <code>\"C++\"</code>, and output: <code>I love C++</code>",
    hint: "Include the standard string header if needed and combine variables with literal text during stream insertion.",
    examples: [{ input: "(none)", output: "I love C++" }],
    testCases: [{ input: "", expected: "I love C++" }],
    starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Declare string lang = "C++" and print "I love " followed by lang\n    \n    return 0;\n}\n`
  },
  {
    id: 8,
    title: "Read a Single Word",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Read a single word (a student's first name) from standard input and print: <code>Hello, [name]!</code>",
    hint: "Standard stream extraction reads individual whitespace-delimited tokens into a string variable.",
    examples: [{ input: "Alex", output: "Hello, Alex!" }, { input: "Sarah", output: "Hello, Sarah!" }],
    testCases: [{ input: "Alex", expected: "Hello, Alex!" }, { input: "Jordan", expected: "Hello, Jordan!" }, { input: "Taylor", expected: "Hello, Taylor!" }],
    starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Read a name from standard input and print "Hello, <name>!"\n    \n    return 0;\n}\n`
  },
  {
    id: 9,
    title: "Format Two Words (Last, First)",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Read two words from input representing a first name and a last name (e.g., <code>John Doe</code>). Output formatted as: <code>User: Doe, John</code>",
    hint: "Extract multiple string variables sequentially and reorder them appropriately when printing.",
    examples: [{ input: "John Doe", output: "User: Doe, John" }, { input: "Ada Lovelace", output: "User: Lovelace, Ada" }],
    testCases: [{ input: "John Doe", expected: "User: Doe, John" }, { input: "Alan Turing", expected: "User: Turing, Alan" }, { input: "Grace Hopper", expected: "User: Hopper, Grace" }],
    starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Read first and last name, print "User: <last>, <first>"\n    \n    return 0;\n}\n`
  },
  {
    id: 10,
    title: "Read Full Line With Spaces",
    topic: "Strings",
    difficulty: "EASY",
    desc: "Read an entire line of text (which may contain spaces) from input and print: <code>Echo: [line]</code>",
    hint: "Standard extraction stops at whitespace; investigate standard library functions designed to read whole lines into a string.",
    examples: [{ input: "Never give up on your dreams", output: "Echo: Never give up on your dreams" }],
    testCases: [{ input: "Never give up on your dreams", expected: "Echo: Never give up on your dreams" }, { input: "Learning C++ step by step", expected: "Echo: Learning C++ step by step" }, { input: "Clean code always wins", expected: "Echo: Clean code always wins" }],
    starterCode: `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    // Read an entire line of text with spaces and echo it\n    \n    return 0;\n}\n`
  },
  {
    id: 11,
    title: "Two Variables Sentence",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Declare two integer variables <code>a = 7</code> and <code>b = 3</code>. Print <code>7 and 3</code>.",
    hint: "Use cout << a << \" and \" << b << endl;.",
    examples: [{ input: "(none)", output: "7 and 3" }],
    testCases: [{ input: "", expected: "7 and 3" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare a = 7, b = 3 and print \"7 and 3\"\n    \n    return 0;\n}\n`
  },
  {
    id: 12,
    title: "Constant Addition",
    topic: "Variables",
    difficulty: "EASY",
    desc: "Print the result of the addition <code>25 + 75</code> directly to standard output.",
    hint: "Use cout << 25 + 75 << endl;.",
    examples: [{ input: "(none)", output: "100" }],
    testCases: [{ input: "", expected: "100" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print 25 + 75\n    \n    return 0;\n}\n`
  },
  {
    id: 13,
    title: "Echo Integer Input",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read a single integer <code>N</code> from standard input and print it.",
    hint: "Use int n; cin >> n; cout << n << endl;.",
    examples: [{ input: "42", output: "42" }, { input: "-9", output: "-9" }],
    testCases: [{ input: "42", expected: "42" }, { input: "-9", expected: "-9" }, { input: "0", expected: "0" }, { input: "1005", expected: "1005" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read integer n from cin and print it\n    \n    return 0;\n}\n`
  },
  {
    id: 14,
    title: "Echo with Label",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print <code>Number: N</code>.",
    hint: "Use cout << \"Number: \" << n << endl;.",
    examples: [{ input: "25", output: "Number: 25" }, { input: "-3", output: "Number: -3" }],
    testCases: [{ input: "25", expected: "Number: 25" }, { input: "-3", expected: "Number: -3" }, { input: "100", expected: "Number: 100" }, { input: "0", expected: "Number: 0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print \"Number: <n>\"\n    \n    return 0;\n}\n`
  },
  {
    id: 15,
    title: "Read Two Integers",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> and print them separated by a single space.",
    hint: "Use cin >> a >> b; cout << a << \" \" << b << endl;.",
    examples: [{ input: "12 34", output: "12 34" }],
    testCases: [{ input: "12 34", expected: "12 34" }, { input: "5 99", expected: "5 99" }, { input: "-10 20", expected: "-10 20" }, { input: "0 0", expected: "0 0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print them separated by space\n    \n    return 0;\n}\n`
  },
  {
    id: 16,
    title: "Reverse Order Output",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code>, then print <code>B</code> followed by <code>A</code> separated by a space.",
    hint: "Read into a and b, then print b << \" \" << a.",
    examples: [{ input: "10 20", output: "20 10" }, { input: "1 99", output: "99 1" }],
    testCases: [{ input: "10 20", expected: "20 10" }, { input: "1 99", expected: "99 1" }, { input: "-5 8", expected: "8 -5" }, { input: "7 7", expected: "7 7" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b, print b then a\n    \n    return 0;\n}\n`
  },
  {
    id: 17,
    title: "Three Integers on Separate Lines",
    topic: "Input",
    difficulty: "EASY",
    desc: "Read three integers <code>A</code>, <code>B</code>, and <code>C</code>, and print each on its own line.",
    hint: "Use cin >> a >> b >> c; and print each followed by endl.",
    examples: [{ input: "10 20 30", output: "10\n20\n30" }],
    testCases: [{ input: "10 20 30", expected: "10\n20\n30" }, { input: "1 2 3", expected: "1\n2\n3" }, { input: "-5 0 5", expected: "-5\n0\n5" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // Read three integers and print each on a new line\n    \n    return 0;\n}\n`
  },
  {
    id: 18,
    title: "Next Integer (+1)",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print the next integer (<code>N + 1</code>).",
    hint: "Read n and output n + 1.",
    examples: [{ input: "7", output: "8" }, { input: "-1", output: "0" }],
    testCases: [{ input: "7", expected: "8" }, { input: "-1", expected: "0" }, { input: "99", expected: "100" }, { input: "0", expected: "1" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n + 1\n    \n    return 0;\n}\n`
  },
  {
    id: 19,
    title: "Previous Integer (-1)",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print the preceding integer (<code>N - 1</code>).",
    hint: "Read n and output n - 1.",
    examples: [{ input: "10", output: "9" }, { input: "0", output: "-1" }],
    testCases: [{ input: "10", expected: "9" }, { input: "0", expected: "-1" }, { input: "-5", expected: "-6" }, { input: "100", expected: "99" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n - 1\n    \n    return 0;\n}\n`
  },
  {
    id: 20,
    title: "Double the Number",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its double (<code>N * 2</code>).",
    hint: "Use cout << n * 2 << endl;.",
    examples: [{ input: "6", output: "12" }, { input: "-4", output: "-8" }],
    testCases: [{ input: "6", expected: "12" }, { input: "-4", expected: "-8" }, { input: "0", expected: "0" }, { input: "25", expected: "50" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * 2\n    \n    return 0;\n}\n`
  },
  {
    id: 21,
    title: "Triple the Number",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its triple (<code>N * 3</code>).",
    hint: "Use cout << n * 3 << endl;.",
    examples: [{ input: "4", output: "12" }, { input: "-3", output: "-9" }],
    testCases: [{ input: "4", expected: "12" }, { input: "-3", expected: "-9" }, { input: "10", expected: "30" }, { input: "0", expected: "0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * 3\n    \n    return 0;\n}\n`
  },
  {
    id: 22,
    title: "Sum of Two Integers",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> from standard input and print their sum (<code>A + B</code>).",
    hint: "Use cin >> a >> b; cout << a + b << endl;.",
    examples: [{ input: "3 5", output: "8" }, { input: "20 30", output: "50" }],
    testCases: [{ input: "3 5", expected: "8" }, { input: "20 30", expected: "50" }, { input: "-4 10", expected: "6" }, { input: "100 250", expected: "350" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a + b\n    \n    return 0;\n}\n`
  },
  {
    id: 23,
    title: "Difference of Two Integers",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> and print <code>A - B</code>.",
    hint: "Use cout << a - b << endl;.",
    examples: [{ input: "10 3", output: "7" }, { input: "4 9", output: "-5" }],
    testCases: [{ input: "10 3", expected: "7" }, { input: "4 9", expected: "-5" }, { input: "50 50", expected: "0" }, { input: "-5 -12", expected: "7" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a - b\n    \n    return 0;\n}\n`
  },
  {
    id: 24,
    title: "Product of Two Integers",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> and print their product (<code>A * B</code>).",
    hint: "Use cout << a * b << endl;.",
    examples: [{ input: "6 7", output: "42" }, { input: "-3 8", output: "-24" }],
    testCases: [{ input: "6 7", expected: "42" }, { input: "-3 8", expected: "-24" }, { input: "12 12", expected: "144" }, { input: "0 99", expected: "0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a * b\n    \n    return 0;\n}\n`
  },
  {
    id: 25,
    title: "Integer Division Quotient",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code> (where <code>B != 0</code>) and print the integer quotient <code>A / B</code>.",
    hint: "Integer division a / b drops any decimal portion.",
    examples: [{ input: "17 5", output: "3" }, { input: "20 4", output: "5" }],
    testCases: [{ input: "17 5", expected: "3" }, { input: "20 4", expected: "5" }, { input: "7 2", expected: "3" }, { input: "3 10", expected: "0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print integer division a / b\n    \n    return 0;\n}\n`
  },
  {
    id: 26,
    title: "Remainder (Modulo %)",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two positive integers <code>A</code> and <code>B</code> and print the remainder <code>A % B</code>.",
    hint: "Use the % operator: cout << a % b << endl;.",
    examples: [{ input: "17 5", output: "2" }, { input: "20 4", output: "0" }],
    testCases: [{ input: "17 5", expected: "2" }, { input: "20 4", expected: "0" }, { input: "7 2", expected: "1" }, { input: "100 7", expected: "2" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print remainder a % b\n    \n    return 0;\n}\n`
  },
  {
    id: 27,
    title: "Quotient and Remainder",
    topic: "Arithmetic",
    difficulty: "EASY",
    desc: "Read two positive integers <code>A</code> and <code>B</code>. Print quotient and remainder separated by a space.",
    hint: "Use cout << a / b << \" \" << a % b << endl;.",
    examples: [{ input: "19 4", output: "4 3" }, { input: "10 2", output: "5 0" }],
    testCases: [{ input: "19 4", expected: "4 3" }, { input: "10 2", expected: "5 0" }, { input: "25 6", expected: "4 1" }, { input: "9 10", expected: "0 9" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b, print quotient and remainder separated by space\n    \n    return 0;\n}\n`
  },
  {
    id: 28,
    title: "Linear Formula: 2x + 5",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read an integer <code>X</code> and compute <code>2 * X + 5</code>.",
    hint: "Use cout << 2 * x + 5 << endl;.",
    examples: [{ input: "3", output: "11" }, { input: "0", output: "5" }],
    testCases: [{ input: "3", expected: "11" }, { input: "0", expected: "5" }, { input: "10", expected: "25" }, { input: "-2", expected: "1" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    // Read x and print 2 * x + 5\n    \n    return 0;\n}\n`
  },
  {
    id: 29,
    title: "Evaluate: a * x + b",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read three integers <code>A</code>, <code>B</code>, and <code>X</code>. Compute and print <code>A * X + B</code>.",
    hint: "Use cin >> a >> b >> x; cout << a * x + b << endl;.",
    examples: [{ input: "3 4 5", output: "19" }, { input: "2 10 3", output: "16" }],
    testCases: [{ input: "3 4 5", expected: "19" }, { input: "2 10 3", expected: "16" }, { input: "0 7 99", expected: "7" }, { input: "5 -3 4", expected: "17" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, x;\n    // Read a, b, x and print a * x + b\n    \n    return 0;\n}\n`
  },
  {
    id: 30,
    title: "Square of a Number",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its square (<code>N * N</code>).",
    hint: "Use cout << n * n << endl;.",
    examples: [{ input: "5", output: "25" }, { input: "-4", output: "16" }],
    testCases: [{ input: "5", expected: "25" }, { input: "-4", expected: "16" }, { input: "12", expected: "144" }, { input: "0", expected: "0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * n\n    \n    return 0;\n}\n`
  },
  {
    id: 31,
    title: "Cube of a Number",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read an integer <code>N</code> and print its cube (<code>N * N * N</code>).",
    hint: "Use cout << n * n * n << endl;.",
    examples: [{ input: "3", output: "27" }, { input: "-2", output: "-8" }],
    testCases: [{ input: "3", expected: "27" }, { input: "-2", expected: "-8" }, { input: "5", expected: "125" }, { input: "10", expected: "1000" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * n * n\n    \n    return 0;\n}\n`
  },
  {
    id: 32,
    title: "Perimeter of a Square",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read side length <code>S</code> of a square. Print its perimeter (<code>4 * S</code>).",
    hint: "Perimeter is 4 * s.",
    examples: [{ input: "5", output: "20" }, { input: "12", output: "48" }],
    testCases: [{ input: "5", expected: "20" }, { input: "12", expected: "48" }, { input: "1", expected: "4" }, { input: "25", expected: "100" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    // Read side s and print 4 * s\n    \n    return 0;\n}\n`
  },
  {
    id: 33,
    title: "Area of a Square",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read side length <code>S</code> of a square. Print its area (<code>S * S</code>).",
    hint: "Area is s * s.",
    examples: [{ input: "6", output: "36" }, { input: "9", output: "81" }],
    testCases: [{ input: "6", expected: "36" }, { input: "9", expected: "81" }, { input: "10", expected: "100" }, { input: "15", expected: "225" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    // Read side s and print s * s\n    \n    return 0;\n}\n`
  },
  {
    id: 34,
    title: "Perimeter of a Rectangle",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read length <code>L</code> and width <code>W</code>. Print the perimeter <code>2 * (L + W)</code>.",
    hint: "Use cout << 2 * (l + w) << endl;.",
    examples: [{ input: "4 7", output: "22" }, { input: "10 20", output: "60" }],
    testCases: [{ input: "4 7", expected: "22" }, { input: "10 20", expected: "60" }, { input: "5 5", expected: "20" }, { input: "12 8", expected: "40" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, w;\n    // Read length and width, print perimeter 2 * (l + w)\n    \n    return 0;\n}\n`
  },
  {
    id: 35,
    title: "Area of a Rectangle",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read length <code>L</code> and width <code>W</code>. Print the area (<code>L * W</code>).",
    hint: "Use cout << l * w << endl;.",
    examples: [{ input: "5 8", output: "40" }, { input: "10 15", output: "150" }],
    testCases: [{ input: "5 8", expected: "40" }, { input: "10 15", expected: "150" }, { input: "6 6", expected: "36" }, { input: "20 4", expected: "80" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int l, w;\n    // Read length and width, print area l * w\n    \n    return 0;\n}\n`
  },
  {
    id: 36,
    title: "Sum of Three Integers",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read three integers <code>A</code>, <code>B</code>, and <code>C</code> and print their total sum.",
    hint: "Use cin >> a >> b >> c; cout << a + b + c << endl;.",
    examples: [{ input: "1 2 3", output: "6" }, { input: "10 25 15", output: "50" }],
    testCases: [{ input: "1 2 3", expected: "6" }, { input: "10 25 15", expected: "50" }, { input: "-5 10 20", expected: "25" }, { input: "100 200 300", expected: "600" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // Read three integers and print their sum\n    \n    return 0;\n}\n`
  },
  {
    id: 37,
    title: "Hours & Minutes to Minutes",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read two integers: <code>hours</code> and <code>minutes</code>. Print total minutes (<code>hours * 60 + minutes</code>).",
    hint: "Multiply hours by 60 and add minutes.",
    examples: [{ input: "2 30", output: "150" }, { input: "1 45", output: "105" }],
    testCases: [{ input: "2 30", expected: "150" }, { input: "1 45", expected: "105" }, { input: "0 50", expected: "50" }, { input: "5 0", expected: "300" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int hours, minutes;\n    // Read hours and minutes, print total minutes\n    \n    return 0;\n}\n`
  },
  {
    id: 38,
    title: "Minutes to Hours & Minutes",
    topic: "Expressions",
    difficulty: "EASY",
    desc: "Read total minutes <code>M</code>. Print hours and remaining minutes separated by a space.",
    hint: "Use cout << m / 60 << \" \" << m % 60 << endl;.",
    examples: [{ input: "135", output: "2 15" }, { input: "60", output: "1 0" }],
    testCases: [{ input: "135", expected: "2 15" }, { input: "60", expected: "1 0" }, { input: "45", expected: "0 45" }, { input: "300", expected: "5 0" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int m;\n    // Read total minutes m and print hours and remaining minutes\n    \n    return 0;\n}\n`
  },
  {
    id: 39,
    title: "Print Float Literal",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Print the decimal floating-point number <code>3.14</code> directly to standard output.",
    hint: "Use cout << 3.14 << endl;.",
    examples: [{ input: "(none)", output: "3.14" }],
    testCases: [{ input: "", expected: "3.14" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the decimal number 3.14\n    \n    return 0;\n}\n`
  },
  {
    id: 40,
    title: "Double Variable Declaration",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Declare a variable of type <code>double</code> named <code>price = 19.99;</code> and print its value.",
    hint: "Use double price = 19.99; cout << price << endl;.",
    examples: [{ input: "(none)", output: "19.99" }],
    testCases: [{ input: "", expected: "19.99" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare double price = 19.99 and print it\n    \n    return 0;\n}\n`
  },
  {
    id: 41,
    title: "Read Floating-Point Number",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read a single floating-point number (type <code>double</code>) from standard input and print it.",
    hint: "Use double x; cin >> x; cout << x << endl;.",
    examples: [{ input: "7.25", output: "7.25" }, { input: "-0.5", output: "-0.5" }],
    testCases: [{ input: "7.25", expected: "7.25" }, { input: "-0.5", expected: "-0.5" }, { input: "3.1415", expected: "3.1415" }, { input: "100.5", expected: "100.5" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    double x;\n    // Read double x and print it\n    \n    return 0;\n}\n`
  },
  {
    id: 42,
    title: "Float Addition",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> numbers <code>A</code> and <code>B</code> from standard input and print their sum.",
    hint: "Use cin >> a >> b; cout << a + b << endl;.",
    examples: [{ input: "3.2 4.1", output: "7.3" }, { input: "10.25 5.5", output: "15.75" }],
    testCases: [{ input: "3.2 4.1", expected: "7.3" }, { input: "10.25 5.5", expected: "15.75" }, { input: "1.5 2.5", expected: "4" }, { input: "-2.5 7.5", expected: "5" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b;\n    // Read two doubles and print their sum\n    \n    return 0;\n}\n`
  },
  {
    id: 43,
    title: "Float Multiplication",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> numbers <code>A</code> and <code>B</code> and print their product (<code>A * B</code>).",
    hint: "Use cout << a * b << endl;.",
    examples: [{ input: "1.5 3.0", output: "4.5" }, { input: "0.5 0.5", output: "0.25" }],
    testCases: [{ input: "1.5 3.0", expected: "4.5" }, { input: "0.5 0.5", expected: "0.25" }, { input: "2.5 4.0", expected: "10" }, { input: "10.0 2.5", expected: "25" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b;\n    // Read two doubles and print their product\n    \n    return 0;\n}\n`
  },
  {
    id: 44,
    title: "Decimal Division with Doubles",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> numbers <code>A</code> and <code>B</code> (where <code>B != 0</code>) and print <code>A / B</code>.",
    hint: "Double division computes the exact decimal fraction.",
    examples: [{ input: "7.0 2.0", output: "3.5" }, { input: "9.0 4.0", output: "2.25" }],
    testCases: [{ input: "7.0 2.0", expected: "3.5" }, { input: "9.0 4.0", expected: "2.25" }, { input: "1.0 4.0", expected: "0.25" }, { input: "15.0 6.0", expected: "2.5" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b;\n    // Read two doubles and print a / b\n    \n    return 0;\n}\n`
  },
  {
    id: 45,
    title: "Integer to Float Typecast Division",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code>. Cast <code>A</code> to <code>double</code> and print exact division <code>(double)A / B</code>.",
    hint: "Use (double)a / b to avoid integer truncation.",
    examples: [{ input: "5 2", output: "2.5" }, { input: "7 4", output: "1.75" }],
    testCases: [{ input: "5 2", expected: "2.5" }, { input: "7 4", expected: "1.75" }, { input: "9 2", expected: "4.5" }, { input: "1 2", expected: "0.5" }],
    starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read integers a and b, cast to double and print exact division\n    \n    return 0;\n}\n`
  },
  {
    id: 46,
    title: "Formatted Decimal (setprecision)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read a <code>double X</code>. Using <code>&lt;iomanip&gt;</code>, print <code>X</code> formatted to exactly 2 decimal places using <code>fixed</code> and <code>setprecision(2)</code>.",
    hint: "Include <iomanip> and do: cout << fixed << setprecision(2) << x << endl;",
    examples: [{ input: "3.1", output: "3.10" }, { input: "12.3456", output: "12.35" }],
    testCases: [{ input: "3.1", expected: "3.10" }, { input: "12.3456", expected: "12.35" }, { input: "5", expected: "5.00" }, { input: "0", expected: "0.00" }],
    starterCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double x;\n    // Read double x and print formatted to 2 decimal places\n    \n    return 0;\n}\n`
  },
  {
    id: 47,
    title: "Average of Two Integers (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two integers <code>A</code> and <code>B</code>. Calculate their average as a float and print it formatted to 2 decimal places.",
    hint: "Average is (a + b) / 2.0. Format using fixed and setprecision(2).",
    examples: [{ input: "4 5", output: "4.50" }, { input: "10 15", output: "12.50" }],
    testCases: [{ input: "4 5", expected: "4.50" }, { input: "10 15", expected: "12.50" }, { input: "20 30", expected: "25.00" }, { input: "1 2", expected: "1.50" }],
    starterCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read two integers, compute float average, print with 2 decimal places\n    \n    return 0;\n}\n`
  },
  {
    id: 48,
    title: "Percentage Calculator (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two <code>double</code> values: <code>obtainedMarks</code> and <code>totalMarks</code>. Calculate percentage <code>(obtained / total) * 100.0</code> and print with 2 decimal places.",
    hint: "Formula: (obtained / total) * 100.0. Use fixed and setprecision(2).",
    examples: [{ input: "45 50", output: "90.00" }, { input: "37 40", output: "92.50" }],
    testCases: [{ input: "45 50", expected: "90.00" }, { input: "37 40", expected: "92.50" }, { input: "18 25", expected: "72.00" }, { input: "1 3", expected: "33.33" }],
    starterCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double obtained, total;\n    // Read obtained and total marks, compute percentage, print with 2 decimal places\n    \n    return 0;\n}\n`
  },
  {
    id: 49,
    title: "Celsius to Fahrenheit (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read a temperature in Celsius <code>C</code> (type <code>double</code>). Convert to Fahrenheit using <code>F = (C * 9.0 / 5.0) + 32.0</code> and print with 2 decimal places.",
    hint: "Formula: (c * 9.0 / 5.0) + 32.0. Use fixed and setprecision(2).",
    examples: [{ input: "0", output: "32.00" }, { input: "100", output: "212.00" }],
    testCases: [{ input: "0", expected: "32.00" }, { input: "100", expected: "212.00" }, { input: "37", expected: "98.60" }, { input: "-40", expected: "-40.00" }],
    starterCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double c;\n    // Read Celsius temperature, convert to Fahrenheit, print with 2 decimal places\n    \n    return 0;\n}\n`
  },
  {
    id: 50,
    title: "Body Mass Index (BMI) (2 Decimals)",
    topic: "Floating Point",
    difficulty: "EASY",
    desc: "Read two floating-point numbers: <code>weight</code> (in kg) and <code>height</code> (in meters). Calculate BMI using formula <code>BMI = weight / (height * height)</code> and print formatted to 2 decimal places.",
    hint: "Formula: weight / (height * height). Use fixed and setprecision(2).",
    examples: [{ input: "70 1.75", output: "22.86" }, { input: "85 1.80", output: "26.23" }],
    testCases: [{ input: "70 1.75", expected: "22.86" }, { input: "85 1.80", expected: "26.23" }, { input: "55 1.60", expected: "21.48" }, { input: "90 1.90", expected: "24.93" }],
    starterCode: `#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double weight, height;\n    // Read weight (kg) and height (m), compute BMI, print with 2 decimal places\n    \n    return 0;\n}\n`
  }
];

// Global Teacher Portal State
const teacherState = {
  editor: null,
  students: [],
  selectedStudent: null,
  selectedLevelId: 1,
  filter: 'all',
  searchQuery: '',
  isEvaluating: false,
  pendingTestResults: []
};

// Native IPC Dispatch
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
    case 'test_suite_compile_start':
      appendTeacherConsole("\n[COMPILER] Building student solution with MSVC cl.exe (/MT, /O2)...", "info-msg");
      break;

    case 'test_suite_compile_error':
      teacherState.isEvaluating = false;
      updateEvalButtons();
      appendTeacherConsole("\n[COMPILATION FAILED]", "error-msg");
      appendTeacherConsole(msg.rawOutput || "Build failed.", "error-msg");
      break;

    case 'test_case_result':
      if (!teacherState.pendingTestResults) teacherState.pendingTestResults = [];
      teacherState.pendingTestResults.push(msg);
      break;

    case 'test_suite_complete':
      teacherState.isEvaluating = false;
      updateEvalButtons();
      const results = teacherState.pendingTestResults || [];

      results.forEach((tc) => {
        const tcNum = tc.index + 1;
        const inputStr = tc.input ? tc.input.trim() : "";
        if (tc.passed) {
          appendTeacherConsole(`[✓] Test ${tcNum} PASSED (Duration: ${tc.durationMs}ms) Output: "${tc.actual}"`, "success-msg");
          if (inputStr) appendTeacherConsole(`    Input:    "${inputStr}"`, "dim");
        } else {
          appendTeacherConsole(`[✕] Test ${tcNum} FAILED`, "error-msg");
          if (inputStr) appendTeacherConsole(`    Input:    "${inputStr}"`, "dim");
          appendTeacherConsole(`    Expected: "${tc.expected}"`, "info-msg");
          appendTeacherConsole(`    Actual:   "${tc.actual}"`, "error-msg");
        }
      });

      appendTeacherConsole(`--------------------------------------------------`, "dim");
      if (msg.allPassed) {
        appendTeacherConsole(`RESULT: ${msg.passedCount} / ${msg.totalCount} TESTS PASSED (100% SUCCESS)\n`, "success-msg");
      } else {
        appendTeacherConsole(`RESULT: ${msg.passedCount} / ${msg.totalCount} TESTS PASSED\n`, "error-msg");
      }
      break;
  }
}

function appendTeacherConsole(text, customClass = "") {
  const container = document.getElementById('teacher-console-output');
  if (!container) return;
  const row = document.createElement('div');
  row.className = `terminal-row ${customClass}`;
  row.textContent = text;
  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

function clearTeacherConsole() {
  const container = document.getElementById('teacher-console-output');
  if (container) container.innerHTML = "";
}

function updateEvalButtons() {
  const btnRun = document.getElementById('btn-teacher-run');
  if (btnRun) {
    btnRun.disabled = teacherState.isEvaluating;
    const span = btnRun.querySelector('span');
    if (span) span.textContent = teacherState.isEvaluating ? "RUNNING TESTS..." : "RUN STUDENT CODE";
  }
}

// Relative time formatter
function formatTimeAgo(dateStr) {
  if (!dateStr) return "Offline";
  try {
    const d = new Date(dateStr);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (isNaN(diff) || diff < 0) return "Just now";
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return d.toLocaleDateString();
  } catch(e) {
    return "Recently";
  }
}

// Fetch All Students Live from Firebase Realtime Database
async function fetchStudentsLive() {
  const refreshBtn = document.getElementById('btn-teacher-refresh');
  const syncStatus = document.getElementById('teacher-sync-status');
  if (refreshBtn) refreshBtn.classList.add('spinning');
  if (syncStatus) syncStatus.querySelector('span:last-child').textContent = "SYNCING CLUSTER...";

  try {
    const res = await fetch(`${RTDB_URL}/students.json`);
    let studentMap = {};
    if (res.ok) {
      studentMap = (await res.json()) || {};
    }

    let list = Object.values(studentMap).filter(s => s && typeof s === 'object');

    // Sort by: Cleared levels DESC, totalRuns DESC, lastSynced DESC
    list.sort((a, b) => {
      const aCleared = Array.isArray(a.completedLevels) ? a.completedLevels.length : 0;
      const bCleared = Array.isArray(b.completedLevels) ? b.completedLevels.length : 0;
      if (bCleared !== aCleared) return bCleared - aCleared;

      const aRuns = (a.tally && a.tally.totalRuns) || 0;
      const bRuns = (b.tally && b.tally.totalRuns) || 0;
      if (bRuns !== aRuns) return bRuns - aRuns;

      const aTime = a.lastSynced ? new Date(a.lastSynced).getTime() : 0;
      const bTime = b.lastSynced ? new Date(b.lastSynced).getTime() : 0;
      return bTime - aTime;
    });

    teacherState.students = list;
    renderTeacherMetrics();
    renderStudentRoster();

    if (list.length > 0 && !teacherState.selectedStudent) {
      selectStudent(list[0]);
    } else if (teacherState.selectedStudent) {
      const updated = list.find(s => s.uid === teacherState.selectedStudent.uid);
      if (updated) selectStudent(updated);
    }
  } catch (err) {
    console.error("Firebase fetch failed:", err);
    appendTeacherConsole(`[Warning] Could not reach Firebase cluster: ${err.message}`, "error-msg");
  } finally {
    if (refreshBtn) setTimeout(() => refreshBtn.classList.remove('spinning'), 500);
    if (syncStatus) syncStatus.querySelector('span:last-child').textContent = "FIREBASE RTDB CONNECTED";
  }
}

// Compute & Render Class Metrics
function renderTeacherMetrics() {
  const list = teacherState.students || [];
  const elCount = document.getElementById('tm-student-count');
  const elAvg = document.getElementById('tm-avg-cleared');
  const elComp = document.getElementById('tm-completed-count');

  if (elCount) elCount.textContent = list.length;

  const totalCleared = list.reduce((acc, s) => acc + (Array.isArray(s.completedLevels) ? s.completedLevels.length : 0), 0);
  const avgCleared = list.length > 0 ? (totalCleared / list.length).toFixed(1) : 0;
  if (elAvg) elAvg.textContent = `${avgCleared} / 50`;

  const completedCount = list.filter(s => Array.isArray(s.completedLevels) && s.completedLevels.length === LEVELS.length).length;
  if (elComp) elComp.textContent = completedCount;
}

// Render Left Column Student List
function renderStudentRoster() {
  const listContainer = document.getElementById('teacher-student-list');
  if (!listContainer) return;
  listContainer.innerHTML = "";

  const query = (teacherState.searchQuery || '').toLowerCase().trim();
  const filter = teacherState.filter;

  const filtered = teacherState.students.filter(s => {
    const cleared = Array.isArray(s.completedLevels) ? s.completedLevels.length : 0;
    
    // Filter tags
    if (filter === 'mastered' && cleared < LEVELS.length) return false;
    if (filter === 'needhelp' && cleared >= 10) return false;
    if (filter === 'active') {
      const last = s.lastSynced ? new Date(s.lastSynced).getTime() : 0;
      const hoursAgo = (Date.now() - last) / (1000 * 3600);
      if (hoursAgo > 24) return false;
    }

    // Search query
    if (query) {
      const name = (s.displayName || '').toLowerCase();
      const email = (s.email || '').toLowerCase();
      const uid = (s.uid || '').toLowerCase();
      return name.includes(query) || email.includes(query) || uid.includes(query);
    }
    return true;
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `<div class="roster-empty-state">No students found matching current filter.</div>`;
    return;
  }

  filtered.forEach(s => {
    const isSelected = teacherState.selectedStudent && teacherState.selectedStudent.uid === s.uid;
    const cleared = Array.isArray(s.completedLevels) ? s.completedLevels.length : 0;
    const pct = Math.round((cleared / LEVELS.length) * 100);
    const name = s.displayName || s.email || "Student";
    const email = s.email || "Offline Guest";
    const initial = name.charAt(0).toUpperCase();
    const runs = (s.tally && s.tally.totalRuns) || 0;
    const timeAgo = formatTimeAgo(s.lastSynced);

    const card = document.createElement('div');
    card.className = `teacher-student-card ${isSelected ? 'active' : ''}`;
    card.innerHTML = `
      <div class="tsc-top">
        <div class="tsc-avatar">${initial}</div>
        <div class="tsc-info">
          <div class="tsc-name">${name}</div>
          <div class="tsc-email">${email}</div>
        </div>
        <div class="tsc-score-badge">${cleared}/${LEVELS.length}</div>
      </div>
      <div class="tsc-progress-wrap">
        <div class="tsc-progress-bar" style="width: ${pct}%"></div>
      </div>
      <div class="tsc-footer">
        <span class="tsc-runs">${runs} runs</span>
        <span class="tsc-time">${timeAgo}</span>
      </div>
    `;

    card.addEventListener('click', () => selectStudent(s));
    listContainer.appendChild(card);
  });
}

// Select a Student and Load Inspection Workspace
function selectStudent(student) {
  teacherState.selectedStudent = student;
  renderStudentRoster();

  // Update Header Profile Banner
  const name = student.displayName || student.email || "Student";
  const email = student.email || "Offline Student";
  const initial = name.charAt(0).toUpperCase();
  const cleared = Array.isArray(student.completedLevels) ? student.completedLevels.length : 0;
  const pct = Math.round((cleared / LEVELS.length) * 100);

  const elAvatar = document.getElementById('insp-avatar');
  const elName = document.getElementById('insp-name');
  const elEmail = document.getElementById('insp-email');
  const elUid = document.getElementById('insp-uid');
  const elLast = document.getElementById('insp-last-synced');
  const elCount = document.getElementById('insp-cleared-count');
  const elFill = document.getElementById('insp-progress-fill');
  const elBadge = document.getElementById('insp-status-badge');

  if (elAvatar) elAvatar.textContent = initial;
  if (elName) elName.textContent = name;
  if (elEmail) elEmail.textContent = email;
  if (elUid) elUid.textContent = `UID: ${student.uid || 'local'}`;
  if (elLast) elLast.textContent = `Last Synced: ${formatTimeAgo(student.lastSynced)}`;
  if (elCount) elCount.textContent = cleared;
  if (elFill) elFill.style.width = `${pct}%`;
  if (elBadge) {
    if (cleared === LEVELS.length) {
      elBadge.textContent = "MASTERY 100%";
      elBadge.className = "student-status-badge gold";
    } else if (cleared >= 25) {
      elBadge.textContent = "ADVANCED";
      elBadge.className = "student-status-badge emerald";
    } else {
      elBadge.textContent = "IN PROGRESS";
      elBadge.className = "student-status-badge cyan";
    }
  }

  renderLevelsMatrix();
  loadStudentCodeForLevel(teacherState.selectedLevelId);
}

// Render the 50-Level Matrix Grid
function renderLevelsMatrix() {
  const matrixContainer = document.getElementById('levels-matrix-grid');
  if (!matrixContainer) return;
  matrixContainer.innerHTML = "";

  const student = teacherState.selectedStudent;
  const completed = (student && Array.isArray(student.completedLevels)) ? student.completedLevels : [];
  const levelCodeMap = (student && student.levelCode) ? student.levelCode : {};
  const levelAttemptsMap = (student && student.levelAttempts) ? student.levelAttempts : {};

  LEVELS.forEach(lvl => {
    const isCleared = completed.includes(lvl.id);
    const hasCustomCode = Boolean(levelCodeMap[lvl.id] && levelCodeMap[lvl.id].trim().length > 0);
    const attempts = levelAttemptsMap[lvl.id] || 0;
    const isSelected = teacherState.selectedLevelId === lvl.id;

    let statusClass = "unattempted";
    let icon = "🔒";

    if (isCleared) {
      statusClass = "cleared";
      icon = "✓";
    } else if (hasCustomCode || attempts > 0) {
      statusClass = "attempted";
      icon = "●";
    }

    const btn = document.createElement('button');
    btn.className = `level-matrix-chip ${statusClass} ${isSelected ? 'active' : ''}`;
    btn.title = `Level ${lvl.id}: ${lvl.title} (${lvl.topic})`;
    btn.innerHTML = `
      <span class="lmc-num">${String(lvl.id).padStart(2, '0')}</span>
      <span class="lmc-icon">${icon}</span>
    `;

    btn.addEventListener('click', () => {
      teacherState.selectedLevelId = lvl.id;
      renderLevelsMatrix();
      loadStudentCodeForLevel(lvl.id);
    });

    matrixContainer.appendChild(btn);
  });
}

// Load Student's Saved C++ Code for Specified Level into Monaco Editor
function loadStudentCodeForLevel(levelId) {
  const lvl = LEVELS.find(l => l.id === levelId) || LEVELS[0];
  const student = teacherState.selectedStudent;

  const lbl = document.getElementById('active-level-label');
  if (lbl) {
    lbl.textContent = `LEVEL ${String(lvl.id).padStart(3, '0')}: ${lvl.title}`;
  }

  // Update question prompt card
  const qTitle = document.getElementById('tq-title');
  const qDesc = document.getElementById('tq-desc');
  const qHint = document.getElementById('tq-hint');

  if (qTitle) qTitle.innerHTML = `Level ${lvl.id}: ${lvl.title} <span class="badge">${lvl.topic}</span>`;
  if (qDesc) qDesc.innerHTML = lvl.desc;
  if (qHint) qHint.innerHTML = `<strong>Hint:</strong> ${lvl.hint}`;

  // Check student's saved code
  let codeToLoad = lvl.starterCode;
  let isCustom = false;

  if (student && student.levelCode && student.levelCode[lvl.id]) {
    codeToLoad = student.levelCode[lvl.id];
    isCustom = true;
  }

  if (teacherState.editor) {
    teacherState.editor.setValue(codeToLoad);
  }

  appendTeacherConsole(`[Inspector] Loaded Level ${lvl.id} (${lvl.title}) for student "${(student && student.displayName) || 'Student'}" [${isCustom ? 'STUDENT SAVED CODE' : 'STARTER TEMPLATE'}]`, "info-msg");
}

// Run Student's Code through MSVC Compiler & Automated Judge
function runStudentCodeEvaluation() {
  if (teacherState.isEvaluating) return;
  const lvl = LEVELS.find(l => l.id === teacherState.selectedLevelId) || LEVELS[0];
  const code = teacherState.editor ? teacherState.editor.getValue() : "";

  teacherState.isEvaluating = true;
  teacherState.pendingTestResults = [];
  updateEvalButtons();

  clearTeacherConsole();
  appendTeacherConsole(`==================================================`, "dim");
  appendTeacherConsole(`[EVALUATING] Level ${lvl.id}: ${lvl.title} (${lvl.testCases.length} Test Cases)`, "info-msg");
  appendTeacherConsole(`[Student] ${(teacherState.selectedStudent && teacherState.selectedStudent.displayName) || 'Student'}`, "dim");

  sendNativeMessage({
    action: 'run_test_suite',
    fileName: 'student_eval.cpp',
    filePath: '',
    code: code,
    testCases: lvl.testCases
  });
}

// Initialize Monaco Editor for Teacher Inspector
function initTeacherMonaco() {
  if (typeof require === 'undefined') return;

  require.config({ paths: { 'vs': 'vs' } });
  require(['vs/editor/editor.main'], function () {
    const container = document.getElementById('teacher-editor-container');
    if (!container) return;

    teacherState.editor = monaco.editor.create(container, {
      value: LEVELS[0].starterCode,
      language: 'cpp',
      theme: 'vs-dark',
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Consolas', monospace",
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'all',
      lineNumbers: 'on',
      tabSize: 4,
      insertSpaces: true,
      readOnly: false
    });

    // Load initial level
    loadStudentCodeForLevel(1);
  });
}

// DOM Setup
document.addEventListener('DOMContentLoaded', () => {
  initTeacherMonaco();
  fetchStudentsLive();

  // Auto-refresh every 30 seconds
  setInterval(fetchStudentsLive, 30000);

  // Top Bar Refresh Button
  const btnRefresh = document.getElementById('btn-teacher-refresh');
  if (btnRefresh) btnRefresh.addEventListener('click', fetchStudentsLive);

  // Run Student Code Action
  const btnRun = document.getElementById('btn-teacher-run');
  if (btnRun) btnRun.addEventListener('click', runStudentCodeEvaluation);

  // Copy Student Code
  const btnCopy = document.getElementById('btn-teacher-copy');
  if (btnCopy) {
    btnCopy.addEventListener('click', () => {
      if (teacherState.editor) {
        navigator.clipboard.writeText(teacherState.editor.getValue());
        btnCopy.textContent = "COPIED!";
        setTimeout(() => { btnCopy.textContent = "COPY"; }, 1500);
      }
    });
  }

  // Force Update
  const btnTeacherForceUpdate = document.getElementById('btn-teacher-force-update');
  if (btnTeacherForceUpdate) {
    btnTeacherForceUpdate.addEventListener('click', () => {
      appendTeacherConsole("\n==================================================");
      appendTeacherConsole(" [1-CLICK FORCE UPDATE] Launching Cloud Installer...");
      appendTeacherConsole("==================================================\n");
      sendNativeMessage({ action: 'force_update' });
    });
  }

  // Clear Console
  const btnClear = document.getElementById('btn-teacher-clear-console');
  if (btnClear) btnClear.addEventListener('click', clearTeacherConsole);

  // Search Roster
  const searchInput = document.getElementById('teacher-student-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      teacherState.searchQuery = e.target.value;
      renderStudentRoster();
    });
  }

  // Filter Pills
  const filterPills = document.querySelectorAll('#roster-filter-pills .t-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      teacherState.filter = pill.dataset.filter;
      renderStudentRoster();
    });
  });

  // Native Window Dragging on Header
  const dragBar = document.getElementById('window-drag-bar');
  if (dragBar) {
    dragBar.addEventListener('mousedown', (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      sendNativeMessage({ action: 'drag_window' });
    });

    dragBar.addEventListener('dblclick', (e) => {
      if (e.target.closest('button') || e.target.closest('input')) return;
      sendNativeMessage({ action: 'maximize_window' });
    });
  }

  // Window Controls
  const winMin = document.getElementById('win-min');
  const winMax = document.getElementById('win-max');
  const winClose = document.getElementById('win-close');

  if (winMin) winMin.addEventListener('click', () => sendNativeMessage({ action: 'minimize_window' }));
  if (winMax) winMax.addEventListener('click', () => sendNativeMessage({ action: 'maximize_window' }));
  if (winClose) winClose.addEventListener('click', () => sendNativeMessage({ action: 'close_window' }));
});
