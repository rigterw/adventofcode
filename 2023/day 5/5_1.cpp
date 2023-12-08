#include "../basic_func/basicFunc.h"
#include <iostream>
#include <sstream>

vector<long long> splitNumbersL(string inputString){
    istringstream iss(inputString);

    vector<long long> numbers;

    string word;
    while(iss >> word){
        numbers.push_back(stoll(word));
    }

    return numbers;
}


class Converter {
    public:
        long long difference;
        long long rangeSize;
        long long sourceStart;
        Converter(long long dest, long long start, long long range){
            rangeSize = range;
            sourceStart = start;
            difference = dest - start;
        }
        bool inRange(long long number){
            return number >= sourceStart && number < sourceStart + rangeSize;
        }
};

int main(){
    vector<string> file = loadFile("./input.txt");
    vector<Converter> stages [7];
    vector<long long> seeds;
    int stage = 0;
    for (int i = 0; i < file.size(); i++){
       if(file[i] == ""){
           i++;
           stage++;
           continue;
       }

       string row = file[i];

       if(stage == 0){
           for (int i = 0; i < row.length(); i++){
               if (row[i] == ':'){
                   row = row.substr(i + 1);
               }
           }
            seeds = splitNumbersL(row);
            continue;
       }

       vector<long long> values = splitNumbersL(row);

       stages[stage-1].push_back(Converter(values[0], values[1], values[2]));
    }

    for (int i = 0; i < 7; i++){// cycle thru stages
        for (int j = 0; j < seeds.size(); j += 2){//cycle thru all seeds
            long long difference = llabs(seeds[j] - seeds[j + 1]);
            for (int l = 0; l < difference; l++){
                // cout << "seed: " << j << "\n";
                for (int k = 0; k < stages[i].size(); k++){ //cycle thru all possible converstions
                    // cout << seeds[j + l] << " between " << stages[i][k].sourceStart << " and " << stages[i][k].sourceStart + stages[i][k].rangeSize << " : " <<  stages[i][k].inRange(seeds[j]) <<"\n";
                    if (stages[i][k].inRange(seeds[j + l]))
                    {
                        // cout << seeds[j +l] << " becomes: ";
                        seeds[j+l] += stages[i][k].difference;
                        cout << seeds[j +l] << "\n";
                        break;
                    }
                }
            }
        }
        cout << "----------stage" << i +1<<"-------"
             << "\n";
    }

    long long lowest = LLONG_MAX;

    for(int j = 0; j < seeds.size(); j++){
        lowest = lowest > seeds[j] ? seeds[j] : lowest;
        cout << lowest << "\n";
    }

    cout << lowest;

    return 1;
}
