#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

int main() {
    std::cout << "--- C++ Vector and Dynamic Array Demo ---" << std::endl;
    
    std::vector<std::string> courses = {"CS101: Intro to C++", "CS102: Data Structures", "CS201: Algorithms"};
    
    std::cout << "Initial Course List:" << std::endl;
    for (size_t i = 0; i < courses.size(); ++i) {
        std::cout << "  [" << (i + 1) << "] " << courses[i] << std::endl;
    }

    std::cout << "\nAdding 'CS301: Computer Architecture' to vector..." << std::endl;
    courses.push_back("CS301: Computer Architecture");

    std::cout << "\nUpdated Course List (using range-for loop):" << std::endl;
    for (const auto& course : courses) {
        std::cout << "  * " << course << std::endl;
    }

    std::cout << "\nTotal courses: " << courses.size() << std::endl;
    return 0;
}
