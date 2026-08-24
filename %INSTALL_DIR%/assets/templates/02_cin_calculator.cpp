#include <iostream>
#include <string>

int main() {
    std::string studentName;
    double num1, num2;
    char op;

    std::cout << "Enter your name: ";
    if (!(std::cin >> studentName)) return 0;

    std::cout << "Hello, " << studentName << "! Let's do some math." << std::endl;
    std::cout << "Enter first number: ";
    std::cin >> num1;

    std::cout << "Enter operation (+, -, *, /): ";
    std::cin >> op;

    std::cout << "Enter second number: ";
    std::cin >> num2;

    double result = 0;
    bool valid = true;

    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
            if (num2 != 0) {
                result = num1 / num2; 
            } else {
                std::cout << "Error: Division by zero!" << std::endl;
                valid = false;
            }
            break;
        default:
            std::cout << "Unknown operator: " << op << std::endl;
            valid = false;
            break;
    }

    if (valid) {
        std::cout << "Result: " << num1 << " " << op << " " << num2 << " = " << result << std::endl;
    }

    return 0;
}
