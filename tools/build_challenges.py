# tools/build_challenges.py
import json, re

# Define all 75 Challenges with minimal conceptual hinting (no direct code answers!)
CHALLENGES = [
  # 1-5: Basics (Output)
  {
    "id": 1,
    "title": "First Steps: Hello World",
    "topic": "Basics",
    "difficulty": "EASY",
    "desc": "Print <code>Hello, World!</code> to standard output followed by a newline.",
    "hint": "Textual messages in C++ must be enclosed within matching double quotes and piped to standard output.",
    "examples": [{"input": "(none)", "output": "Hello, World!"}],
    "testCases": [{"input": "", "expected": "Hello, World!"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print \"Hello, World!\" to standard output\n    \n    return 0;\n}\n"
  },
  {
    "id": 2,
    "title": "Custom Message",
    "topic": "Basics",
    "difficulty": "EASY",
    "desc": "Print <code>Welcome to C++!</code> to standard output.",
    "hint": "Ensure exact capitalization, spacing, and punctuation inside your string literal.",
    "examples": [{"input": "(none)", "output": "Welcome to C++!"}],
    "testCases": [{"input": "", "expected": "Welcome to C++!"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print \"Welcome to C++!\" to standard output\n    \n    return 0;\n}\n"
  },
  {
    "id": 3,
    "title": "Two Lines of Text",
    "topic": "Basics",
    "difficulty": "EASY",
    "desc": "Print two lines of text:<br><code>Hello</code><br><code>World</code>",
    "hint": "Think about how line breaks are introduced between text outputs.",
    "examples": [{"input": "(none)", "output": "Hello\nWorld"}],
    "testCases": [{"input": "", "expected": "Hello\nWorld"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print \"Hello\" on line 1 and \"World\" on line 2\n    \n    return 0;\n}\n"
  },
  {
    "id": 4,
    "title": "Three-Line Introduction",
    "topic": "Basics",
    "difficulty": "EASY",
    "desc": "Print the following three lines:<br><code>I am learning C++</code><br><code>It is fast</code><br><code>It is fun</code>",
    "hint": "Separate multiple lines using newline characters or sequential output statements.",
    "examples": [{"input": "(none)", "output": "I am learning C++\nIt is fast\nIt is fun"}],
    "testCases": [{"input": "", "expected": "I am learning C++\nIt is fast\nIt is fun"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the three required lines\n    \n    return 0;\n}\n"
  },
  {
    "id": 5,
    "title": "3x3 Star Box",
    "topic": "Basics",
    "difficulty": "EASY",
    "desc": "Print a 3x3 square of stars (*):<br><code>***</code><br><code>***</code><br><code>***</code>",
    "hint": "Consider printing three separate rows of three asterisk characters.",
    "examples": [{"input": "(none)", "output": "***\n***\n***"}],
    "testCases": [{"input": "", "expected": "***\n***\n***"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print 3 rows of 3 asterisks\n    \n    return 0;\n}\n"
  },

  # 6-12: Variables & Literals
  {
    "id": 6,
    "title": "Print Integer Literal",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Print the number <code>42</code> directly to standard output.",
    "hint": "Numeric literals can be sent to the stream directly without quotes.",
    "examples": [{"input": "(none)", "output": "42"}],
    "testCases": [{"input": "", "expected": "42"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the number 42\n    \n    return 0;\n}\n"
  },
  {
    "id": 7,
    "title": "Three Numbers with Spaces",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Print the numbers <code>10 20 30</code> separated by single spaces on one line.",
    "hint": "Chain numeric values and space string separators in a single output stream.",
    "examples": [{"input": "(none)", "output": "10 20 30"}],
    "testCases": [{"input": "", "expected": "10 20 30"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print 10 20 30 on a single line separated by spaces\n    \n    return 0;\n}\n"
  },
  {
    "id": 8,
    "title": "Integer Variable",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Declare an integer variable <code>x = 100;</code> and print its value.",
    "hint": "Declare the variable type before assigning its initial value.",
    "examples": [{"input": "(none)", "output": "100"}],
    "testCases": [{"input": "", "expected": "100"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare integer x = 100 and print it\n    \n    return 0;\n}\n"
  },
  {
    "id": 9,
    "title": "Variable with Text Label",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Declare an integer <code>score = 95;</code> and print <code>Score: 95</code>.",
    "hint": "Stream a literal label string first, followed by the variable.",
    "examples": [{"input": "(none)", "output": "Score: 95"}],
    "testCases": [{"input": "", "expected": "Score: 95"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare score = 95 and print \"Score: 95\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 10,
    "title": "Reassigning a Variable",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Declare <code>int val = 50;</code>, reassign it to <code>99</code>, and print <code>val</code>.",
    "hint": "A variable's stored value can be updated by assigning a new value before printing.",
    "examples": [{"input": "(none)", "output": "99"}],
    "testCases": [{"input": "", "expected": "99"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare val = 50, update val = 99, and print val\n    \n    return 0;\n}\n"
  },
  {
    "id": 11,
    "title": "Two Variables Sentence",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Declare two integer variables <code>a = 7</code> and <code>b = 3</code>. Print <code>7 and 3</code>.",
    "hint": "Interleave multiple variable identifiers with connecting word strings.",
    "examples": [{"input": "(none)", "output": "7 and 3"}],
    "testCases": [{"input": "", "expected": "7 and 3"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Declare a = 7, b = 3 and print \"7 and 3\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 12,
    "title": "Constant Addition",
    "topic": "Variables",
    "difficulty": "EASY",
    "desc": "Print the result of the addition <code>25 + 75</code> directly to standard output.",
    "hint": "Mathematical expressions are computed before the resulting value is streamed.",
    "examples": [{"input": "(none)", "output": "100"}],
    "testCases": [{"input": "", "expected": "100"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print 25 + 75\n    \n    return 0;\n}\n"
  },

  # 13-17: Reading Input
  {
    "id": 13,
    "title": "Echo Integer Input",
    "topic": "Input",
    "difficulty": "EASY",
    "desc": "Read a single integer <code>N</code> from standard input and print it.",
    "hint": "The stream extraction operator reads formatted values from standard input into declared variables.",
    "examples": [{"input": "42", "output": "42"}, {"input": "-9", "output": "-9"}],
    "testCases": [{"input": "42", "expected": "42"}, {"input": "-9", "expected": "-9"}, {"input": "0", "expected": "0"}, {"input": "1005", "expected": "1005"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read integer n from cin and print it\n    \n    return 0;\n}\n"
  },
  {
    "id": 14,
    "title": "Echo with Label",
    "topic": "Input",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print <code>Number: N</code>.",
    "hint": "Extract the input value, then print the descriptive label preceding the value.",
    "examples": [{"input": "25", "output": "Number: 25"}, {"input": "-3", "output": "Number: -3"}],
    "testCases": [{"input": "25", "expected": "Number: 25"}, {"input": "-3", "expected": "-3"}, {"input": "100", "expected": "Number: 100"}, {"input": "0", "expected": "Number: 0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print \"Number: <n>\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 15,
    "title": "Read Two Integers",
    "topic": "Input",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code> and print them separated by a single space.",
    "hint": "Multiple variables can be extracted sequentially from the input stream.",
    "examples": [{"input": "12 34", "output": "12 34"}],
    "testCases": [{"input": "12 34", "expected": "12 34"}, {"input": "5 99", "expected": "5 99"}, {"input": "-10 20", "expected": "-10 20"}, {"input": "0 0", "expected": "0 0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print them separated by space\n    \n    return 0;\n}\n"
  },
  {
    "id": 16,
    "title": "Reverse Order Output",
    "topic": "Input",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code>, then print <code>B</code> followed by <code>A</code> separated by a space.",
    "hint": "Read values into separate variables and alter the order when sending them to output.",
    "examples": [{"input": "10 20", "output": "20 10"}, {"input": "1 99", "output": "99 1"}],
    "testCases": [{"input": "10 20", "expected": "20 10"}, {"input": "1 99", "expected": "99 1"}, {"input": "-5 8", "expected": "8 -5"}, {"input": "7 7", "expected": "7 7"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b, print b then a\n    \n    return 0;\n}\n"
  },
  {
    "id": 17,
    "title": "Three Integers on Separate Lines",
    "topic": "Input",
    "difficulty": "EASY",
    "desc": "Read three integers <code>A</code>, <code>B</code>, and <code>C</code>, and print each on its own line.",
    "hint": "Output a newline character after printing each individual variable.",
    "examples": [{"input": "10 20 30", "output": "10\n20\n30"}],
    "testCases": [{"input": "10 20 30", "expected": "10\n20\n30"}, {"input": "1 2 3", "expected": "1\n2\n3"}, {"input": "-5 0 5", "expected": "-5\n0\n5"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c;\n    // Read three integers and print each on a new line\n    \n    return 0;\n}\n"
  },

  # 18-27: Arithmetic Operations
  {
    "id": 18,
    "title": "Next Integer (+1)",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print the next integer (<code>N + 1</code>).",
    "hint": "Apply the increment addition operation to the input value.",
    "examples": [{"input": "7", "output": "8"}, {"input": "-1", "output": "0"}],
    "testCases": [{"input": "7", "expected": "8"}, {"input": "-1", "expected": "0"}, {"input": "99", "expected": "100"}, {"input": "0", "expected": "1"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n + 1\n    \n    return 0;\n}\n"
  },
  {
    "id": 19,
    "title": "Previous Integer (-1)",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print the preceding integer (<code>N - 1</code>).",
    "hint": "Subtract one from the extracted value.",
    "examples": [{"input": "10", "output": "9"}, {"input": "0", "output": "-1"}],
    "testCases": [{"input": "10", "expected": "9"}, {"input": "0", "expected": "-1"}, {"input": "-5", "expected": "-6"}, {"input": "100", "expected": "99"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n - 1\n    \n    return 0;\n}\n"
  },
  {
    "id": 20,
    "title": "Double the Number",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print its double (<code>N * 2</code>).",
    "hint": "Multiply the number by two.",
    "examples": [{"input": "6", "output": "12"}, {"input": "-4", "output": "-8"}],
    "testCases": [{"input": "6", "expected": "12"}, {"input": "-4", "expected": "-8"}, {"input": "0", "expected": "0"}, {"input": "25", "expected": "50"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * 2\n    \n    return 0;\n}\n"
  },
  {
    "id": 21,
    "title": "Triple the Number",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print its triple (<code>N * 3</code>).",
    "hint": "Use the multiplication operator with a factor of three.",
    "examples": [{"input": "4", "output": "12"}, {"input": "-3", "output": "-9"}],
    "testCases": [{"input": "4", "expected": "12"}, {"input": "-3", "expected": "-9"}, {"input": "10", "expected": "30"}, {"input": "0", "expected": "0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * 3\n    \n    return 0;\n}\n"
  },
  {
    "id": 22,
    "title": "Sum of Two Integers",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code> from standard input and print their sum (<code>A + B</code>).",
    "hint": "Extract both variables and calculate their sum.",
    "examples": [{"input": "3 5", "output": "8"}, {"input": "20 30", "output": "50"}],
    "testCases": [{"input": "3 5", "expected": "8"}, {"input": "20 30", "expected": "50"}, {"input": "-4 10", "expected": "6"}, {"input": "100 250", "expected": "350"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a + b\n    \n    return 0;\n}\n"
  },
  {
    "id": 23,
    "title": "Difference of Two Integers",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code> and print <code>A - B</code>.",
    "hint": "Use the subtraction operator between the two extracted values.",
    "examples": [{"input": "10 3", "output": "7"}, {"input": "4 9", "output": "-5"}],
    "testCases": [{"input": "10 3", "expected": "7"}, {"input": "4 9", "expected": "-5"}, {"input": "50 50", "expected": "0"}, {"input": "-5 -12", "expected": "7"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a - b\n    \n    return 0;\n}\n"
  },
  {
    "id": 24,
    "title": "Product of Two Integers",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code> and print their product (<code>A * B</code>).",
    "hint": "Use the multiplication operator to calculate the product.",
    "examples": [{"input": "6 7", "output": "42"}, {"input": "-3 8", "output": "-24"}],
    "testCases": [{"input": "6 7", "expected": "42"}, {"input": "-3 8", "expected": "-24"}, {"input": "12 12", "expected": "144"}, {"input": "0 99", "expected": "0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a * b\n    \n    return 0;\n}\n"
  },
  {
    "id": 25,
    "title": "Integer Division Quotient",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code> (where <code>B != 0</code>) and print the integer quotient <code>A / B</code>.",
    "hint": "In C++, dividing two integers truncates any fractional remainder.",
    "examples": [{"input": "17 5", "output": "3"}, {"input": "20 4", "output": "5"}],
    "testCases": [{"input": "17 5", "expected": "3"}, {"input": "20 4", "expected": "5"}, {"input": "7 2", "expected": "3"}, {"input": "3 10", "expected": "0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print integer division a / b\n    \n    return 0;\n}\n"
  },
  {
    "id": 26,
    "title": "Remainder (Modulo %)",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read two positive integers <code>A</code> and <code>B</code> and print the remainder <code>A % B</code>.",
    "hint": "The modulo operator computes the remainder of integer division.",
    "examples": [{"input": "17 5", "output": "2"}, {"input": "20 4", "output": "0"}],
    "testCases": [{"input": "17 5", "expected": "2"}, {"input": "20 4", "expected": "0"}, {"input": "7 2", "expected": "1"}, {"input": "100 7", "expected": "2"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print remainder a % b\n    \n    return 0;\n}\n"
  },
  {
    "id": 27,
    "title": "Quotient and Remainder",
    "topic": "Arithmetic",
    "difficulty": "EASY",
    "desc": "Read two positive integers <code>A</code> and <code>B</code>. Print quotient and remainder separated by a space.",
    "hint": "Compute both division results and output them on a single line separated by a space.",
    "examples": [{"input": "19 4", "output": "4 3"}, {"input": "10 2", "output": "5 0"}],
    "testCases": [{"input": "19 4", "expected": "4 3"}, {"input": "10 2", "expected": "5 0"}, {"input": "25 6", "expected": "4 1"}, {"input": "9 10", "expected": "0 9"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b, print quotient and remainder separated by space\n    \n    return 0;\n}\n"
  },

  # 28-36: Linear Formulas & Math Expressions
  {
    "id": 28,
    "title": "Linear Formula: 2x + 5",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read an integer <code>X</code> and compute <code>2 * X + 5</code>.",
    "hint": "Multiplication takes precedence over addition in arithmetic expressions.",
    "examples": [{"input": "3", "output": "11"}, {"input": "0", "output": "5"}],
    "testCases": [{"input": "3", "expected": "11"}, {"input": "0", "expected": "5"}, {"input": "10", "expected": "25"}, {"input": "-2", "expected": "1"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x;\n    // Read x and print 2 * x + 5\n    \n    return 0;\n}\n"
  },
  {
    "id": 29,
    "title": "Evaluate: a * x + b",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read three integers <code>A</code>, <code>B</code>, and <code>X</code>. Compute and print <code>A * X + B</code>.",
    "hint": "Extract all three variables and evaluate the linear formula.",
    "examples": [{"input": "3 4 5", "output": "19"}, {"input": "2 10 3", "output": "16"}],
    "testCases": [{"input": "3 4 5", "expected": "19"}, {"input": "2 10 3", "expected": "16"}, {"input": "0 7 99", "expected": "7"}, {"input": "5 -3 4", "expected": "17"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, x;\n    // Read a, b, x and print a * x + b\n    \n    return 0;\n}\n"
  },
  {
    "id": 30,
    "title": "Square of a Number",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print its square (<code>N * N</code>).",
    "hint": "Multiply the number by itself.",
    "examples": [{"input": "5", "output": "25"}, {"input": "-4", "output": "16"}],
    "testCases": [{"input": "5", "expected": "25"}, {"input": "-4", "expected": "16"}, {"input": "12", "expected": "144"}, {"input": "0", "expected": "0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * n\n    \n    return 0;\n}\n"
  },
  {
    "id": 31,
    "title": "Cube of a Number",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code> and print its cube (<code>N * N * N</code>).",
    "hint": "Multiply the number by itself three times.",
    "examples": [{"input": "3", "output": "27"}, {"input": "-2", "output": "-8"}],
    "testCases": [{"input": "3", "expected": "27"}, {"input": "-2", "expected": "-8"}, {"input": "5", "expected": "125"}, {"input": "10", "expected": "1000"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n * n * n\n    \n    return 0;\n}\n"
  },
  {
    "id": 32,
    "title": "Area of a Rectangle",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read width <code>W</code> and height <code>H</code> as positive integers. Print the area (<code>W * H</code>).",
    "hint": "The area of a rectangle is the product of its dimensions.",
    "examples": [{"input": "5 8", "output": "40"}, {"input": "10 20", "output": "200"}],
    "testCases": [{"input": "5 8", "expected": "40"}, {"input": "10 20", "expected": "200"}, {"input": "7 3", "expected": "21"}, {"input": "1 100", "expected": "100"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int w, h;\n    // Read w and h and print area (w * h)\n    \n    return 0;\n}\n"
  },
  {
    "id": 33,
    "title": "Perimeter of a Rectangle",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read width <code>W</code> and height <code>H</code>. Print perimeter: <code>2 * (W + H)</code>.",
    "hint": "Use parentheses to add width and height before doubling.",
    "examples": [{"input": "4 6", "output": "20"}, {"input": "10 15", "output": "50"}],
    "testCases": [{"input": "4 6", "expected": "20"}, {"input": "10 15", "expected": "50"}, {"input": "1 1", "expected": "4"}, {"input": "25 25", "expected": "100"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int w, h;\n    // Read w and h and print 2 * (w + h)\n    \n    return 0;\n}\n"
  },
  {
    "id": 34,
    "title": "Integer Average of Two Numbers",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code>. Print their integer average <code>(A + B) / 2</code>.",
    "hint": "Sum the two values inside parentheses before dividing by 2.",
    "examples": [{"input": "10 20", "output": "15"}, {"input": "7 8", "output": "7"}],
    "testCases": [{"input": "10 20", "expected": "15"}, {"input": "7 8", "expected": "7"}, {"input": "0 100", "expected": "50"}, {"input": "-10 10", "expected": "0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print (a + b) / 2\n    \n    return 0;\n}\n"
  },
  {
    "id": 35,
    "title": "Hypotenuse Squared (a^2 + b^2)",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read legs <code>A</code> and <code>B</code> of a right triangle. Print <code>A*A + B*B</code>.",
    "hint": "Calculate the sum of both squared values.",
    "examples": [{"input": "3 4", "output": "25"}, {"input": "5 12", "output": "169"}],
    "testCases": [{"input": "3 4", "expected": "25"}, {"input": "5 12", "expected": "169"}, {"input": "1 1", "expected": "2"}, {"input": "6 8", "expected": "100"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print a*a + b*b\n    \n    return 0;\n}\n"
  },
  {
    "id": 36,
    "title": "Celsius to Fahrenheit (Integer)",
    "topic": "Expressions",
    "difficulty": "EASY",
    "desc": "Read Celsius integer <code>C</code>. Compute integer Fahrenheit: <code>(C * 9 / 5) + 32</code>.",
    "hint": "Multiply by 9, divide by 5, then add 32.",
    "examples": [{"input": "0", "output": "32"}, {"input": "100", "output": "212"}],
    "testCases": [{"input": "0", "expected": "32"}, {"input": "100", "expected": "212"}, {"input": "25", "expected": "77"}, {"input": "-40", "expected": "-40"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int c;\n    // Read c and print (c * 9 / 5) + 32\n    \n    return 0;\n}\n"
  },

  # 37-43: Basic Conditions & Logic
  {
    "id": 37,
    "title": "Positive, Negative, or Zero",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code>. Print <code>POSITIVE</code> if > 0, <code>NEGATIVE</code> if < 0, or <code>ZERO</code> if == 0.",
    "hint": "Use an if / else if / else chain to test each sign possibility.",
    "examples": [{"input": "5", "output": "POSITIVE"}, {"input": "-3", "output": "NEGATIVE"}, {"input": "0", "output": "ZERO"}],
    "testCases": [{"input": "5", "expected": "POSITIVE"}, {"input": "-3", "expected": "NEGATIVE"}, {"input": "0", "expected": "ZERO"}, {"input": "100", "expected": "POSITIVE"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print POSITIVE, NEGATIVE, or ZERO\n    \n    return 0;\n}\n"
  },
  {
    "id": 38,
    "title": "Even or Odd",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code>. Print <code>EVEN</code> if divisible by 2, otherwise <code>ODD</code>.",
    "hint": "Check the remainder when divided by 2.",
    "examples": [{"input": "4", "output": "EVEN"}, {"input": "7", "output": "ODD"}],
    "testCases": [{"input": "4", "expected": "EVEN"}, {"input": "7", "expected": "ODD"}, {"input": "0", "expected": "EVEN"}, {"input": "-6", "expected": "EVEN"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print EVEN or ODD\n    \n    return 0;\n}\n"
  },
  {
    "id": 39,
    "title": "Maximum of Two Numbers",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code>. Print the larger value.",
    "hint": "Compare the two values using a relational operator and output the greater one.",
    "examples": [{"input": "10 20", "output": "20"}, {"input": "5 -2", "output": "5"}],
    "testCases": [{"input": "10 20", "expected": "20"}, {"input": "5 -2", "expected": "5"}, {"input": "7 7", "expected": "7"}, {"input": "-10 -20", "expected": "-10"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print the maximum\n    \n    return 0;\n}\n"
  },
  {
    "id": 40,
    "title": "Minimum of Two Numbers",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code>. Print the smaller value.",
    "hint": "Test which value is less and stream that value.",
    "examples": [{"input": "10 20", "output": "10"}, {"input": "-5 3", "output": "-5"}],
    "testCases": [{"input": "10 20", "expected": "10"}, {"input": "-5 3", "expected": "-5"}, {"input": "4 4", "expected": "4"}, {"input": "100 99", "expected": "99"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print the minimum\n    \n    return 0;\n}\n"
  },
  {
    "id": 41,
    "title": "Pass or Fail (Threshold 50)",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read score <code>S</code> (0 to 100). Print <code>PASS</code> if <code>S >= 50</code>, else <code>FAIL</code>.",
    "hint": "Compare the score against the threshold using a conditional check.",
    "examples": [{"input": "75", "output": "PASS"}, {"input": "45", "output": "FAIL"}],
    "testCases": [{"input": "75", "expected": "PASS"}, {"input": "45", "expected": "FAIL"}, {"input": "50", "expected": "PASS"}, {"input": "0", "expected": "FAIL"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int s;\n    // Read s and print PASS if s >= 50, otherwise FAIL\n    \n    return 0;\n}\n"
  },
  {
    "id": 42,
    "title": "Divisible by 4 (Simple Leap Test)",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read an integer year <code>Y</code>. Print <code>YES</code> if <code>Y % 4 == 0</code>, otherwise <code>NO</code>.",
    "hint": "Check whether the remainder modulo 4 equals zero.",
    "examples": [{"input": "2024", "output": "YES"}, {"input": "2023", "output": "NO"}],
    "testCases": [{"input": "2024", "expected": "YES"}, {"input": "2023", "expected": "NO"}, {"input": "2000", "expected": "YES"}, {"input": "1999", "expected": "NO"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int y;\n    // Read y and print YES if divisible by 4, otherwise NO\n    \n    return 0;\n}\n"
  },
  {
    "id": 43,
    "title": "Absolute Value",
    "topic": "Conditions",
    "difficulty": "EASY",
    "desc": "Read an integer <code>N</code>. Print its absolute value <code>|N|</code>.",
    "hint": "If the value is negative, invert its sign to make it positive.",
    "examples": [{"input": "-15", "output": "15"}, {"input": "8", "output": "8"}],
    "testCases": [{"input": "-15", "expected": "15"}, {"input": "8", "expected": "8"}, {"input": "0", "expected": "0"}, {"input": "-999", "expected": "999"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print its absolute value\n    \n    return 0;\n}\n"
  },

  # 44-50: Floating-Point & Precision
  {
    "id": 44,
    "title": "Read and Print a Double",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read a floating-point number <code>X</code> of type <code>double</code> and print it.",
    "hint": "Declare the variable as double to hold decimal values.",
    "examples": [{"input": "3.14", "output": "3.14"}, {"input": "-0.5", "output": "-0.5"}],
    "testCases": [{"input": "3.14", "expected": "3.14"}, {"input": "-0.5", "expected": "-0.5"}, {"input": "100.0", "expected": "100"}, {"input": "2.718", "expected": "2.718"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    double x;\n    // Read double x and print it\n    \n    return 0;\n}\n"
  },
  {
    "id": 45,
    "title": "Exact Floating Average of Two",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read two integers <code>A</code> and <code>B</code>. Print their exact floating-point average <code>(A + B) / 2.0</code>.",
    "hint": "Divide by a decimal literal (2.0) to perform floating-point division.",
    "examples": [{"input": "3 4", "output": "3.5"}, {"input": "10 20", "output": "15"}],
    "testCases": [{"input": "3 4", "expected": "3.5"}, {"input": "10 20", "expected": "15"}, {"input": "1 2", "expected": "1.5"}, {"input": "5 5", "expected": "5"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    // Read a and b and print (a + b) / 2.0\n    \n    return 0;\n}\n"
  },
  {
    "id": 46,
    "title": "Area of a Circle (r^2 * 3.14159)",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read a <code>double r</code> (radius). Print circle area: <code>3.14159 * r * r</code>.",
    "hint": "Multiply the radius by itself and the constant pi.",
    "examples": [{"input": "2.0", "output": "12.5664"}, {"input": "1.0", "output": "3.14159"}],
    "testCases": [{"input": "2.0", "expected": "12.5664"}, {"input": "1.0", "expected": "3.14159"}, {"input": "5.0", "expected": "78.5397"}, {"input": "0.0", "expected": "0"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    double r;\n    // Read radius r and print 3.14159 * r * r\n    \n    return 0;\n}\n"
  },
  {
    "id": 47,
    "title": "Exact Division of Two Doubles",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read two <code>double</code> values <code>A</code> and <code>B</code>. Print <code>A / B</code>.",
    "hint": "Floating-point division preserves fractional values.",
    "examples": [{"input": "7.0 2.0", "output": "3.5"}, {"input": "10.0 4.0", "output": "2.5"}],
    "testCases": [{"input": "7.0 2.0", "expected": "3.5"}, {"input": "10.0 4.0", "expected": "2.5"}, {"input": "9.0 3.0", "expected": "3"}, {"input": "1.0 8.0", "expected": "0.125"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    double a, b;\n    // Read double a and b, print a / b\n    \n    return 0;\n}\n"
  },
  {
    "id": 48,
    "title": "Fixed Precision: 2 Decimal Places",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read a <code>double X</code>. Print <code>X</code> formatted to exactly 2 decimal places using <code>fixed</code> and <code>setprecision(2)</code>.",
    "hint": "Include the <iomanip> library and use stream formatting manipulators.",
    "examples": [{"input": "3.14159", "output": "3.14"}, {"input": "5.0", "output": "5.00"}],
    "testCases": [{"input": "3.14159", "expected": "3.14"}, {"input": "5.0", "expected": "5.00"}, {"input": "2.71828", "expected": "2.72"}, {"input": "0.1", "expected": "0.10"}],
    "starterCode": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double x;\n    // Read x and print with fixed and setprecision(2)\n    \n    return 0;\n}\n"
  },
  {
    "id": 49,
    "title": "Percentage Calculation",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read part <code>P</code> and total <code>T</code> (as integers). Print the percentage <code>(P * 100.0) / T</code> to 1 decimal place.",
    "hint": "Multiply the part by 100.0, divide by total, and apply fixed precision.",
    "examples": [{"input": "45 90", "output": "50.0"}, {"input": "1 3", "output": "33.3"}],
    "testCases": [{"input": "45 90", "expected": "50.0"}, {"input": "1 3", "expected": "33.3"}, {"input": "75 100", "expected": "75.0"}, {"input": "0 50", "expected": "0.0"}],
    "starterCode": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    int p, t;\n    // Read p and t, print percentage to 1 decimal place\n    \n    return 0;\n}\n"
  },
  {
    "id": 50,
    "title": "Speed, Distance, Time Formula",
    "topic": "Floats",
    "difficulty": "EASY",
    "desc": "Read distance <code>D</code> (km, double) and speed <code>S</code> (km/h, double). Print travel time in hours to 2 decimal places.",
    "hint": "Time equals distance divided by speed; format the output to two decimal digits.",
    "examples": [{"input": "120.0 60.0", "output": "2.00"}, {"input": "100.0 80.0", "output": "1.25"}],
    "testCases": [{"input": "120.0 60.0", "expected": "2.00"}, {"input": "100.0 80.0", "expected": "1.25"}, {"input": "55.5 110.0", "expected": "0.50"}, {"input": "300.0 75.0", "expected": "4.00"}],
    "starterCode": "#include <iostream>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    double d, s;\n    // Read distance d and speed s, print time = d / s to 2 decimal places\n    \n    return 0;\n}\n"
  },

  # 51-60: Strings & Text Mastery
  {
    "id": 51,
    "title": "String Length Inspector",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read a single word <code>S</code>. Output its character count: <code>Length: [len]</code>",
    "hint": "C++ string objects provide a built-in member function to determine the number of stored characters.",
    "examples": [{"input": "Programming", "output": "Length: 11"}, {"input": "C++", "output": "Length: 3"}],
    "testCases": [{"input": "Programming", "expected": "Length: 11"}, {"input": "C++", "expected": "Length: 3"}, {"input": "Algorithm", "expected": "Length: 9"}, {"input": "A", "expected": "Length: 1"}],
    "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    // Read string s and print its length\n    \n    return 0;\n}\n"
  },
  {
    "id": 52,
    "title": "First and Last Characters",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read a string <code>S</code> (at least 2 chars). Output its first and last characters separated by space:<br><code>[first] [last]</code>",
    "hint": "Array subscript notation indexes strings starting from index 0 up to size minus 1.",
    "examples": [{"input": "Falcon", "output": "F n"}, {"input": "Rocket", "output": "R t"}],
    "testCases": [{"input": "Falcon", "expected": "F n"}, {"input": "Rocket", "expected": "R t"}, {"input": "Code", "expected": "C e"}, {"input": "XCODING", "expected": "X G"}],
    "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    // Read s and print first and last characters\n    \n    return 0;\n}\n"
  },
  {
    "id": 53,
    "title": "String Concatenation & Hyphenation",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read two words <code>A</code> and <code>B</code>. Concatenate them with a hyphen in between and print:<br><code>Combined: [A-B]</code>",
    "hint": "The plus operator can merge string objects and character literals together.",
    "examples": [{"input": "Cyber Punk", "output": "Combined: Cyber-Punk"}, {"input": "Super Mario", "output": "Combined: Super-Mario"}],
    "testCases": [{"input": "Cyber Punk", "expected": "Combined: Cyber-Punk"}, {"input": "Super Mario", "expected": "Combined: Super-Mario"}, {"input": "Alpha Beta", "expected": "Combined: Alpha-Beta"}],
    "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string a, b;\n    // Read a and b, then print \"Combined: <a-b>\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 54,
    "title": "Tabular Column Formatter",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Print a 2-column header and row separated by tab escape sequences:<br><code>ITEM\tQTY</code><br><code>Apples\t50</code>",
    "hint": "Recall the escape sequence used for inserting horizontal tab stops.",
    "examples": [{"input": "(none)", "output": "ITEM\tQTY\nApples\t50"}],
    "testCases": [{"input": "", "expected": "ITEM\tQTY\nApples\t50"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print ITEM and QTY table with tab separation\n    \n    return 0;\n}\n"
  },
  {
    "id": 55,
    "title": "Escaped Quote Formatter",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Print the following exact quoted statement:<br><code>Albert said, \"Imagination is more important than knowledge.\"</code>",
    "hint": "Escape inner quotation marks so the compiler does not treat them as string terminators.",
    "examples": [{"input": "(none)", "output": "Albert said, \"Imagination is more important than knowledge.\""}],
    "testCases": [{"input": "", "expected": "Albert said, \"Imagination is more important than knowledge.\""}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the quote including double quotes\n    \n    return 0;\n}\n"
  },
  {
    "id": 56,
    "title": "Windows File Path Printer",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Print this Windows directory path:<br><code>C:\\Program Files\\XCODING\\bin</code>",
    "hint": "A literal backslash requires double backslashes in C++ string literals.",
    "examples": [{"input": "(none)", "output": "C:\\Program Files\\XCODING\\bin"}],
    "testCases": [{"input": "", "expected": "C:\\Program Files\\XCODING\\bin"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Print the Windows path with backslashes\n    \n    return 0;\n}\n"
  },
  {
    "id": 57,
    "title": "Full Line Reader (getline)",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read a full sentence with spaces from standard input and print:<br><code>Sentence: [line]</code>",
    "hint": "Standard input extraction stops at whitespace; use the specialized standard library line-reading function.",
    "examples": [{"input": "The quick brown fox jumps over the lazy dog", "output": "Sentence: The quick brown fox jumps over the lazy dog"}],
    "testCases": [
      {"input": "The quick brown fox jumps over the lazy dog", "expected": "Sentence: The quick brown fox jumps over the lazy dog"},
      {"input": "C++ is a high-performance compiled language", "expected": "Sentence: C++ is a high-performance compiled language"}
    ],
    "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    // Read full line using getline and print \"Sentence: <line>\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 58,
    "title": "Character Case Conversion",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read a lowercase character <code>C</code> and print its uppercase version:<br><code>Original: [c], Upper: [C]</code>",
    "hint": "Character arithmetic using the ASCII distance (32) or standard character conversion functions yields the opposite case.",
    "examples": [{"input": "e", "output": "Original: e, Upper: E"}, {"input": "k", "output": "Original: k, Upper: K"}],
    "testCases": [{"input": "e", "expected": "Original: e, Upper: E"}, {"input": "k", "expected": "Original: k, Upper: K"}, {"input": "z", "expected": "Original: z, Upper: Z"}],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    char c;\n    // Read char c and print original and uppercase version\n    \n    return 0;\n}\n"
  },
  {
    "id": 59,
    "title": "Substring Prefix Extractor",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read a string <code>S</code> (length >= 3). Output its first 3 characters as a prefix:<br><code>Prefix: [3_chars]</code>",
    "hint": "The string member function for sub-portions takes a starting position and character count.",
    "examples": [{"input": "International", "output": "Prefix: Int"}, {"input": "Developer", "output": "Prefix: Dev"}],
    "testCases": [{"input": "International", "expected": "Prefix: Int"}, {"input": "Developer", "expected": "Prefix: Dev"}, {"input": "Code", "expected": "Prefix: Cod"}],
    "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    // Read string s and print its first 3 characters\n    \n    return 0;\n}\n"
  },
  {
    "id": 60,
    "title": "String Mirror Reversal",
    "topic": "Strings",
    "difficulty": "MEDIUM",
    "desc": "Read a string <code>S</code>. Output the string reversed in opposite order:<br><code>Reversed: [reversed_s]</code>",
    "hint": "Iterate backwards through the string indices from the end down to the start, or construct a reversed copy.",
    "examples": [{"input": "HELLO", "output": "Reversed: OLLEH"}, {"input": "CodeFork", "output": "Reversed: kroFedoC"}],
    "testCases": [
      {"input": "HELLO", "expected": "Reversed: OLLEH"},
      {"input": "CodeFork", "expected": "Reversed: kroFedoC"},
      {"input": "radar", "expected": "Reversed: radar"},
      {"input": "12345", "expected": "Reversed: 54321"}
    ],
    "starterCode": "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s;\n    // Read string s and print \"Reversed: <rev>\"\n    \n    return 0;\n}\n"
  },

  # 61-75: Loops, Accumulators, Streams & Patterns
  {
    "id": 61,
    "title": "Count from 1 to N",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read a positive integer <code>N</code>. Print numbers from <code>1</code> to <code>N</code> separated by spaces on a single line.",
    "hint": "Initialize a loop counter at 1 and iterate sequentially until reaching N.",
    "examples": [{"input": "5", "output": "1 2 3 4 5"}, {"input": "3", "output": "1 2 3"}],
    "testCases": [
      {"input": "5", "expected": "1 2 3 4 5"},
      {"input": "3", "expected": "1 2 3"},
      {"input": "1", "expected": "1"},
      {"input": "8", "expected": "1 2 3 4 5 6 7 8"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print 1 to n separated by spaces\n    \n    return 0;\n}\n"
  },
  {
    "id": 62,
    "title": "Rocket Launch Countdown",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read an integer <code>N</code>. Print numbers counting down from <code>N</code> down to <code>1</code> separated by spaces, followed by <code>LIFTOFF!</code> on a new line.",
    "hint": "Decrement your loop variable on each iteration, then print the launch message afterwards.",
    "examples": [{"input": "5", "output": "5 4 3 2 1\nLIFTOFF!"}, {"input": "3", "output": "3 2 1\nLIFTOFF!"}],
    "testCases": [
      {"input": "5", "expected": "5 4 3 2 1\nLIFTOFF!"},
      {"input": "3", "expected": "3 2 1\nLIFTOFF!"},
      {"input": "1", "expected": "1\nLIFTOFF!"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n, print countdown on line 1, and LIFTOFF! on line 2\n    \n    return 0;\n}\n"
  },
  {
    "id": 63,
    "title": "Sum of First N Natural Numbers",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read a positive integer <code>N</code>. Calculate and print the sum <code>1 + 2 + ... + N</code>:<br><code>Sum: [total]</code>",
    "hint": "Maintain an accumulator variable initialized to 0 and add each consecutive index inside a loop.",
    "examples": [{"input": "5", "output": "Sum: 15"}, {"input": "10", "output": "Sum: 55"}],
    "testCases": [
      {"input": "5", "expected": "Sum: 15"},
      {"input": "10", "expected": "Sum: 55"},
      {"input": "1", "expected": "Sum: 1"},
      {"input": "100", "expected": "Sum: 5050"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print \"Sum: <total>\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 64,
    "title": "Even Numbers in Range",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read an integer <code>N</code> (where <code>N >= 1</code>). Print the first <code>N</code> even positive numbers starting from <code>2</code> separated by spaces.",
    "hint": "Iterate your counter in steps of 2 or multiply your 1-based loop counter by 2.",
    "examples": [{"input": "4", "output": "2 4 6 8"}, {"input": "6", "output": "2 4 6 8 10 12"}],
    "testCases": [
      {"input": "4", "expected": "2 4 6 8"},
      {"input": "6", "expected": "2 4 6 8 10 12"},
      {"input": "1", "expected": "2"},
      {"input": "5", "expected": "2 4 6 8 10"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print the first n even numbers\n    \n    return 0;\n}\n"
  },
  {
    "id": 65,
    "title": "Multiplication Table Generator",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read an integer <code>N</code>. Print its multiplication table from 1 to 5 in the format:<br><code>[N] x 1 = [val]</code><br><code>...</code><br><code>[N] x 5 = [val]</code>",
    "hint": "Loop from multiplier 1 to 5 and print the formatted arithmetic product for each row.",
    "examples": [{"input": "7", "output": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35"}],
    "testCases": [
      {"input": "7", "expected": "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35"},
      {"input": "3", "expected": "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15"},
      {"input": "10", "expected": "10 x 1 = 10\n10 x 2 = 20\n10 x 3 = 30\n10 x 4 = 40\n10 x 5 = 50"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print table from 1 to 5\n    \n    return 0;\n}\n"
  },
  {
    "id": 66,
    "title": "Factorial Calculator",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read a non-negative integer <code>N</code> (0 to 12). Compute its factorial <code>N!</code> (where <code>0! = 1</code>):<br><code>Factorial: [N!]</code>",
    "hint": "Initialize a product variable to 1 and iteratively multiply each integer up to N.",
    "examples": [{"input": "5", "output": "Factorial: 120"}, {"input": "0", "output": "Factorial: 1"}],
    "testCases": [
      {"input": "5", "expected": "Factorial: 120"},
      {"input": "0", "expected": "Factorial: 1"},
      {"input": "1", "expected": "Factorial: 1"},
      {"input": "6", "expected": "Factorial: 720"},
      {"input": "7", "expected": "Factorial: 5040"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and compute factorial\n    \n    return 0;\n}\n"
  },
  {
    "id": 67,
    "title": "Powers of Two Sequence",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read an integer <code>K</code> (1 to 15). Print the first <code>K</code> powers of two (<code>2^1, 2^2, ..., 2^K</code>) separated by spaces.",
    "hint": "Start with a value of 2 and double it repeatedly across each loop iteration.",
    "examples": [{"input": "4", "output": "2 4 8 16"}, {"input": "6", "output": "2 4 8 16 32 64"}],
    "testCases": [
      {"input": "4", "expected": "2 4 8 16"},
      {"input": "6", "expected": "2 4 8 16 32 64"},
      {"input": "1", "expected": "2"},
      {"input": "8", "expected": "2 4 8 16 32 64 128 256"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int k;\n    // Read k and print first k powers of 2\n    \n    return 0;\n}\n"
  },
  {
    "id": 68,
    "title": "Input Stream Accumulator",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "The first input is count <code>N</code>, followed by <code>N</code> integers. Read all values and output their total sum:<br><code>Total: [sum]</code>",
    "hint": "Read the initial count first, then execute a loop that reads one number per iteration and adds it to your running total.",
    "examples": [{"input": "4 10 20 30 40", "output": "Total: 100"}, {"input": "3 5 -2 8", "output": "Total: 11"}],
    "testCases": [
      {"input": "4 10 20 30 40", "expected": "Total: 100"},
      {"input": "3 5 -2 8", "expected": "Total: 11"},
      {"input": "1 42", "expected": "Total: 42"},
      {"input": "5 1 1 1 1 1", "expected": "Total: 5"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read count n, then read n numbers and print \"Total: <sum>\"\n    \n    return 0;\n}\n"
  },
  {
    "id": 69,
    "title": "Maximum Value in Stream",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "The first input is count <code>N</code> (>= 1), followed by <code>N</code> integers. Find and output the largest number:<br><code>Max: [highest]</code>",
    "hint": "Initialize a tracking variable with the first element and update it whenever a larger number is encountered.",
    "examples": [{"input": "5 12 45 7 89 23", "output": "Max: 89"}, {"input": "3 -10 -5 -20", "output": "Max: -5"}],
    "testCases": [
      {"input": "5 12 45 7 89 23", "expected": "Max: 89"},
      {"input": "3 -10 -5 -20", "expected": "Max: -5"},
      {"input": "1 999", "expected": "Max: 999"},
      {"input": "4 100 20 300 40", "expected": "Max: 300"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read count n, then find the max among n numbers\n    \n    return 0;\n}\n"
  },
  {
    "id": 70,
    "title": "Sign Counters: Positives & Negatives",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "The first input is count <code>N</code>, followed by <code>N</code> integers. Count how many are positive (> 0) and how many are negative (< 0):<br><code>Positive: [pos], Negative: [neg]</code>",
    "hint": "Maintain two separate counter variables and increment the appropriate one based on a conditional test inside the loop.",
    "examples": [{"input": "6 4 -2 0 7 -9 12", "output": "Positive: 3, Negative: 2"}, {"input": "3 1 2 3", "output": "Positive: 3, Negative: 0"}],
    "testCases": [
      {"input": "6 4 -2 0 7 -9 12", "expected": "Positive: 3, Negative: 2"},
      {"input": "3 1 2 3", "expected": "Positive: 3, Negative: 0"},
      {"input": "4 -1 -2 -3 -4", "expected": "Positive: 0, Negative: 4"},
      {"input": "2 0 0", "expected": "Positive: 0, Negative: 0"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read count n, then count positive and negative values\n    \n    return 0;\n}\n"
  },
  {
    "id": 71,
    "title": "Asterisk Line Generator",
    "topic": "Patterns",
    "difficulty": "MEDIUM",
    "desc": "Read a positive integer <code>N</code>. Output a single row containing exactly <code>N</code> asterisk (<code>*</code>) characters.",
    "hint": "Stream an asterisk character on each iteration without adding newlines until the loop finishes.",
    "examples": [{"input": "6", "output": "******"}, {"input": "3", "output": "***"}],
    "testCases": [
      {"input": "6", "expected": "******"},
      {"input": "3", "expected": "***"},
      {"input": "1", "expected": "*"},
      {"input": "10", "expected": "**********"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n asterisks on one line\n    \n    return 0;\n}\n"
  },
  {
    "id": 72,
    "title": "Right-Angled Star Triangle",
    "topic": "Patterns",
    "difficulty": "MEDIUM",
    "desc": "Read height <code>H</code> (1 to 10). Print a right-angled triangle pattern of asterisks where row 1 has 1 star, row 2 has 2 stars, up to row H.",
    "hint": "Nest an inner loop inside an outer loop, where the inner loop prints a number of stars equal to the current row index.",
    "examples": [{"input": "4", "output": "*\n**\n***\n****"}, {"input": "2", "output": "*\n**"}],
    "testCases": [
      {"input": "4", "expected": "*\n**\n***\n****"},
      {"input": "2", "expected": "*\n**"},
      {"input": "1", "expected": "*"},
      {"input": "5", "expected": "*\n**\n***\n****\n*****"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int h;\n    // Read height h and print right-angled triangle of stars\n    \n    return 0;\n}\n"
  },
  {
    "id": 73,
    "title": "Solid Hash Square",
    "topic": "Patterns",
    "difficulty": "MEDIUM",
    "desc": "Read size <code>N</code> (1 to 10). Print an <code>N x N</code> solid square grid of <code>#</code> characters.",
    "hint": "Use two nested loops each running N times, printing a newline at the end of each outer loop iteration.",
    "examples": [{"input": "3", "output": "###\n###\n###"}, {"input": "2", "output": "##\n##"}],
    "testCases": [
      {"input": "3", "expected": "###\n###\n###"},
      {"input": "2", "expected": "##\n##"},
      {"input": "1", "expected": "#"},
      {"input": "4", "expected": "####\n####\n####\n####"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and print n x n grid of hash symbols\n    \n    return 0;\n}\n"
  },
  {
    "id": 74,
    "title": "Character Sequence Repeater",
    "topic": "Patterns",
    "difficulty": "MEDIUM",
    "desc": "Read a character <code>C</code> and a count <code>K</code>. Print character <code>C</code> repeated <code>K</code> times on a single line.",
    "hint": "Read the character and integer into separate variables, then output the character within a counted loop.",
    "examples": [{"input": "= 8", "output": "========"}, {"input": "+ 4", "output": "++++"}],
    "testCases": [
      {"input": "= 8", "expected": "========"},
      {"input": "+ 4", "expected": "++++"},
      {"input": "@ 1", "expected": "@"},
      {"input": "# 5", "expected": "#####"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    char c;\n    int k;\n    // Read char c and int k, print c repeated k times\n    \n    return 0;\n}\n"
  },
  {
    "id": 75,
    "title": "Sum of Decimal Digits",
    "topic": "Loops",
    "difficulty": "MEDIUM",
    "desc": "Read a positive integer <code>N</code>. Compute and print the sum of its digits:<br><code>Digit Sum: [sum]</code>",
    "hint": "Extract the last digit using modulo 10 and remove it using integer division by 10 in a while loop until the number becomes 0.",
    "examples": [{"input": "1234", "output": "Digit Sum: 10"}, {"input": "705", "output": "Digit Sum: 12"}],
    "testCases": [
      {"input": "1234", "expected": "Digit Sum: 10"},
      {"input": "705", "expected": "Digit Sum: 12"},
      {"input": "9", "expected": "Digit Sum: 9"},
      {"input": "999", "expected": "Digit Sum: 27"},
      {"input": "1000", "expected": "Digit Sum: 1"}
    ],
    "starterCode": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    // Read n and compute sum of digits\n    \n    return 0;\n}\n"
  }
]

# Generate valid JS code
levels_js_code = "const LEVELS = " + json.dumps(CHALLENGES, indent=2) + ";\n"

# Update assets/editor/app.js
with open("assets/editor/app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

pattern = r"const LEVELS = \[[\s\S]*?\n\];"
if not re.search(pattern, app_js):
    print("[ERROR] Could not match LEVELS pattern in app.js")
else:
    new_app_js = re.sub(pattern, lambda m: levels_js_code.strip(), app_js, count=1)
    with open("assets/editor/app.js", "w", encoding="utf-8") as f:
        f.write(new_app_js)
    print(f"[SUCCESS] Updated assets/editor/app.js with {len(CHALLENGES)} challenges!")

# Update assets/editor/teacher.js
with open("assets/editor/teacher.js", "r", encoding="utf-8") as f:
    teacher_js = f.read()

if not re.search(pattern, teacher_js):
    print("[ERROR] Could not match LEVELS pattern in teacher.js")
else:
    new_teacher_js = re.sub(pattern, lambda m: levels_js_code.strip(), teacher_js, count=1)
    with open("assets/editor/teacher.js", "w", encoding="utf-8") as f:
        f.write(new_teacher_js)
    print(f"[SUCCESS] Updated assets/editor/teacher.js with {len(CHALLENGES)} challenges!")
