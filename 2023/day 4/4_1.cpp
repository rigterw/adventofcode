#include <iostream>
#include <fstream>
#include <sstream>


#include <vector>

using namespace std;

vector<string> splitString(string, char);
vector<string> splitWords(string);

int calculateScore(string card){

    //cut off the first part
    for (int i = 0; i < card.length(); i++){
        if (card[i] == ':'){
            card = card.substr(i+1);
        }
    }

    vector<string> parts = splitString(card, '|');

    vector<string> winningNrs = splitWords(parts[0]);
    vector<string> numbers = splitWords(parts[1]);

    int matches = 0;

    for (int i = 0; i < numbers.size(); i++){
        for (int j = 0; j < winningNrs.size(); j++){
            if(numbers[i] == winningNrs[j]){
                matches++;
                break;
            }
        }
    }

    if(matches == 0){
        return 0;
    }
    return pow(2, matches - 1);
}



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

    file.open("./input.txt",ios::in);

    if(!file.is_open()){
        return 0;
    }
    string line;
    while (getline(file, line))
    {
        score += calculateScore(line);
    }

    cout << score;
    file.close();
    return 1;
    }