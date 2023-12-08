#include "basicFunc.h"
#include <fstream>
#include <sstream>
#include <iostream>

vector<string> splitString(string inputString, char splitChar){
    vector<string> sections;
    int lastCut = 0;

    for (int i = 0; i < inputString.length(); i++){
        if(inputString[i] == splitChar){

            string cut = inputString.substr(lastCut + 1, i - lastCut -1);
            sections.push_back(cut);
            lastCut = i;
        }
    }
    sections.push_back(inputString.substr(lastCut + 1));
    return sections;
}

vector<string> splitWords(string inputString){
    istringstream iss(inputString);

    vector<string> words;

    string word;
    while(iss >> word){
        words.push_back(word);
    }

    return words;
}

vector<int> splitNumbers(string inputString){
    istringstream iss(inputString);

    vector<int> numbers;

    string word;
    while(iss >> word){
        numbers.push_back(stoi(word));
    }

    return numbers;
}

vector<string> loadFile(string fileName){
    fstream file;
    vector<string> fileLined;

    file.open(fileName,ios::in);

    if(file.is_open()){
        string line;
        while (getline(file, line))
        {
            fileLined.push_back(line);
        }
        file.close();
    }else{
        cout << "file Error";
    }

    return fileLined;
}