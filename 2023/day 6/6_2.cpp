#include "../basic_func/basicFunc.h"
#include <string>
#include <iostream>


int getNumber(vector<string> input){
    string total = "";
    for (int i = 0; i < input.size(); i++){
        total += input[i];
    }
    return stoi(total);
}

long long getLong(vector<string> input){
        string total = "";
    for (int i = 0; i < input.size(); i++){
        total += input[i];
    }
    return stoll(total);
}

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

    int maxTime = getNumber(splitWords(file[0]));
    long long record = getLong(splitWords(file[1]));
    



        long counter = 0;
        for (int j = 0; j < maxTime; j++){
            if(((long long)maxTime - j) * j > record){
                counter++;
            }
        }
    cout << counter;
    return 1;
}