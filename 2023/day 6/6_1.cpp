#include "../basic_func/basicFunc.h"
#include <string>
#include <iostream>


int main(){
    vector<string> file = loadFile("./input.txt");

    for (int i = 0; i < file.size(); i++){
        for (int j = 0; j < file[i].length(); j++){
            if (file[i][j] == ':'){
                file[i] = file[i].substr(j+1);
                break;
            }
        }
    }

    vector<int> maxTimes = splitNumbers(file[0]);
    vector<int> records = splitNumbers(file[1]);

    int score = 1;
    for (int i = 0; i < maxTimes.size(); i++){
        int counter = 0;
        for (int j = 0; j < maxTimes[i]; j++){
            if((maxTimes[i] - j) * j > records[i]){
                counter++;
            }
        }
        score *= counter;
    }
    cout << score;
    return 1;
}