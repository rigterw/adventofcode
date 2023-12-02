#include <iostream>
#include <fstream>
#include <string>
#include <cctype>

using namespace std;

char searchString(string, int);

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
                    break;
                }else{
                    char check = searchString(line, i);

                    if(isdigit(check)){
                        number += check;
                    break;
                    }
                }
            }

            for (int i = line.length()-1; i >= 0; i--){
                if(isdigit(line[i])){
                    number += line[i];
                    break;
                }else{
                    char check = searchString(line, i);

                    if(isdigit(check)){
                        number += check;
                    break;
                    }
                }
            }
            cout << number << "\n";
            score += stoi(number);
        }

        file.close();
    }else{
        cout << "rip";
    }
    cout << "score: " << score << endl;

    return 0;
}


char searchString(string text, int i){
    if(text.length() < i + 3){
        return 'T';
    }
    string sub = text.substr(i, 3);
    if(sub == "one"){
        return '1';
    }

    if(sub == "two"){
        return '2';
    }

    if(sub == "six"){
        return '6';
    }

    if(text.length() < i + 4){
        return 'F';
    }

    sub = text.substr(i, 4);

    if(sub == "four"){
        return '4';
    }

    if(sub == "five"){
        return '5';
    }
    if(sub == "zero"){
        return '0';
    }

    if(sub == "nine"){
        return '9';
    }

    if(text.length() < i + 5){
        return 'I';
    }

    sub = text.substr(i, 5);


    if(sub == "seven"){
        return '7';
    }

    if(sub == "eight"){
        return '8';
    }

    if(sub == "three"){
        return '3';
    }

    return 'N';
}