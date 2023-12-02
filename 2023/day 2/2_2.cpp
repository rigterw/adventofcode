#include <iostream>
#include <fstream>
#include <sstream>

#include <vector>
#include <map>

using namespace std;

vector<string> splitString(string, char);
vector<string> splitWords(string);



int cubeScore(string line){
    for (int i = 0; i < line.length(); i++){
        if (line[i] == ':'){
            line = line.substr(i+1);
        }
    }

    vector<string> showings = splitString(line, ';');
    map<char, int> amounts = {
    {'r', 1},
    {'g', 1},
    {'b', 1}};

    for (int i = 0; i < showings.size(); i++){
        vector<string> outputs = splitWords(showings[i]);

        for (int j = 0; j < outputs.size(); j += 2)
        {
            int amount = stoi(outputs[j]);

            if(amount > amounts[outputs[j+1][0]]){

                amounts[outputs[j + 1][0]] = amount;
            }

        }
    }
    return amounts['r'] * amounts['g'] * amounts['b'];
}

// bool isPossible(string line){

//     for (int i = 0; i < line.length(); i++){
//         if (line[i] == ':'){
//             line = line.substr(i+1);
//         }
//     }

//     vector<string> showings = splitString(line, ';');

//     for (int i = 0; i < showings.size(); i++){
//         vector<string> outputs = splitWords(showings[i]);

//         for (int j = 0; j < outputs.size(); j += 2){
//             int amount = stoi(outputs[j]);
            
//             if(amount > amounts[outputs[j + 1][0]]){
//                 return false;
//             }
//         }
//     }

//         return true;
// }

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

int main(){

    fstream file;
    int score = 0;
    int gameNr = 0;

    file.open("./input.txt",ios::in);

    if(!file.is_open()){
        return 0;
    }
    string line;
    while (getline(file, line))
    {
        score += cubeScore(line);
    }

    cout << score;
    file.close();
    return 1;
    }