#include <iostream>
#include <fstream>
#include <sstream>

#include <map>
#include <vector>

using namespace std;

vector<string> grid;
map<string, vector<int>> gears;

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

bool hasAdjecent(int line, int index, int length, int value){
    int startIndex = index == 0 ? index : index - 1;
    int endIndex = index + length == grid[line].length() ? index + length : index + length + 1;

    if(index > 0 && grid[line][index-1] == '*'){
                gears[to_string(line) + "X" + to_string(index -1)].push_back(value);
        return true;
    }
    if(index + length +1 < grid[line].length() && grid[line][index+length] == '*'){
                gears[to_string(line) + "X" + to_string(index+length)].push_back(value);
        return true;
    }
    //check top line
    if(line > 0){
        for (int i = startIndex; i < endIndex; i++){
            if(grid[line -1][i] == '*'){
                gears[to_string(line - 1) + "X" + to_string(i)].push_back(value);
                return true;
            }
        }
    }

    //check bottom line
    if(line + 1 < grid.size()){
        for (int i = startIndex; i < endIndex; i++){
            if(grid[line + 1][i] == '*'){
                gears[to_string(line + 1) + "X" + to_string(i)].push_back(value);
                
                return true;
            }
        }
    }
    return false;
}

int calculateScore(){
    int score = 0;

    for (auto const& x : gears){
    vector<int> val = x.second;
    if (val.size() == 2)
    {
        score += val[0] * val[1];
        }
    }

    return score;
}

int main(){
    grid = loadFile("./input.txt");
    for (int lineNr = 0; lineNr < grid.size(); lineNr++){
        string line = grid[lineNr];
        for (int i = 0; i < line.length(); i++){
            if(isdigit(line[i])){
                string number = "";
                int foundIndex = i;
                while(isdigit(line[i])){
                    number += line[i];
                    i++;
                }
                    cout << "check: " << number << " ";

                    hasAdjecent(lineNr, foundIndex, number.length(), stoi(number));
            }
        }
    }
    cout << calculateScore();
    return 1;
}