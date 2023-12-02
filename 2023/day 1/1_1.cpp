#include <iostream>
#include <fstream>
#include <string>
#include <cctype>

using namespace std;
int main(){

    fstream file;
    int score = 0;

    file.open("./input.txt",ios::in);
    cout << "start";
    if(file.is_open()){
        string line;
        while(getline(file, line)){
        string number = "";
            for (int i = 0; i < line.length(); i++){
                if(isdigit(line[i])){
                    number += line[i];
                    cout << number;
                    break;
                }
            }

            for (int i = line.length()-1; i >= 0; i--){
                if(isdigit(line[i])){
                    number += line[i];
                    cout << number << "\n";
                    break;
                }
            }
            score += stoi(number);
        }

        file.close();
    }else{
        cout << "rip";
    }
    cout << "score: " << score << endl;

    return 0;
}