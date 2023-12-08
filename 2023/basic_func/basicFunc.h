#pragma once
#include <vector>
#include <string>

using namespace std;

std::vector<std::string> splitString(std::string, char);
std::vector<std::string> splitWords(std::string);
std::vector<int> splitNumbers(std::string);
std::vector<std::string> loadFile(std::string);