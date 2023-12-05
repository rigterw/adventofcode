#include <iostream>
#include <fstream>
#include <sstream>


#include <vector>

using namespace std;

vector<string> splitString(string, char);
vector<string> splitWords(string);

int score = 0;
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
    return matches;
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
    }

    return fileLined;
}


int main(){

    fstream file;

    vector<string> cards = loadFile("input.txt");
    int cardAmounts[199] = {0};

        for (int i = 0; i < 199; i++)
        {
            score++;
            int calculatedScore = calculateScore(cards[i]);
            for (int j = 0; j <= cardAmounts[i]; j++)
            {
                for (int k = 0; k < calculatedScore; k++)
                {
                    score++;
                    cardAmounts[i + k + 1]++;
                }
            }
        }

        cout << score << "\n";
    file.close();
    return 1;
    }