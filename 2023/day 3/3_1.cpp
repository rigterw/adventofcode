#include <iostream>
#include <fstream>
#include <sstream>


#include <vector>

using namespace std;

vector<string> grid;

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

bool hasAdjecent(int line, int index, int length){
    int startIndex = index == 0 ? index : index - 1;
    int endIndex = index + length == grid[line].length() ? index + length : index + length + 1;

    if(index > 0 && grid[line][index-1] != '.'){

                cout << grid[line][index-1] << "\n";

        return true;
    }
    if(index + length +1 < grid[line].length() && grid[line][index+length] != '.'){
                cout << "right" << "\n";
        return true;
    }
    //check top line
    if(line > 0){
        for (int i = startIndex; i < endIndex; i++){
            if(grid[line -1][i] != '.'){
                cout << "top" << "\n";
                return true;
            }
        }
    }

    //check bottom line
    if(line + 1 < grid.size()){
        for (int i = startIndex; i < endIndex; i++){
            if(grid[line + 1][i] != '.'){
                cout << "bottom" << "\n";

                return true;
            }
        }
    }
    return false;
}

int main(){
    int score = 0;
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

                if(hasAdjecent(lineNr, foundIndex, number.length())){
                    score += stoi(number);
                }else{
                    cout << "out: " << number << "\n";
                }
            }
        }
    }
    cout << score;
    return 1;
}