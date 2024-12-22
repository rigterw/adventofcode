#include "../basic_func/basicFunc.h"
#include <sstream>
#include <string>
#include <iostream>


class Hand
{

public:
    int score;
    int handValues[5];
    Hand(){}
    Hand(string hand, string score){
        this->score = stoi(score);
        for (int i = 0; i < hand.length(); i++){
            if(isdigit(hand[i])){
                handValues[i] = hand[i] -'0';
                continue;
            }

            if(hand[i] == 'T'){
                handValues[i] = 10;
            }else if(hand[i] == 'J'){
                handValues[i] = 11;
            }else if(hand[i] == 'Q'){
                handValues[i] = 12;
            }else if(hand[i] == 'K'){
                handValues[i] = 13;
            }else if(hand[i] == 'A'){
                handValues[i] = 14;
            }
        }
    }
};

bool findDuplicates(bool twoPair, int cards[5]){
    int numbers[12] = {0};

    for (int i = 0; i < 5; i++){
        numbers[cards[i]-3]++;
    }

    bool hasThree = false;
    int twoCounter = 0;

    for (int i = 0; i < 12; i++){
        if(numbers[i] == 3){
            hasThree = true;
        }else if(numbers[i] == 2){
            twoCounter++;
        }
    }

    if(twoPair){
        return twoCounter == 2;
    }else{
        return hasThree && twoCounter == 1;
    }
}

int getLevel(int cards[5]){
    int highestMatch  = 0;
    cout << cards[0] << " " << cards[1] << " " << cards[2] << " " << cards[3] << " " << cards[4]<< "\n";
    for (int i = 0; i < 4; i++){
        int matches = 1;

        for (int j = i+1; j < 5; j++){

            if(cards[i] == cards[j]){

                matches++;
            }
        }
        if(matches == 5){
            return 6;
        }
        if(matches == 4){
            return 5;
        }
        if(matches == 3){
            return findDuplicates(false, cards) ? 4 : 3;
        }
        if(matches == 2){
            if(findDuplicates(true, cards)){
                return 2;
            }
            highestMatch = 1;
        }
    }

    return highestMatch;
}


void sortHand(Hand hand, vector<Hand>&level){
    for (int i = 0; i < level.size(); i++){
        Hand opponent = level[i];
        for (int j = 0; j < 5; j++){
            if(hand.handValues[j] == opponent.handValues[j]){
                continue;
            }
            if(hand.handValues[j] < opponent.handValues[j]){
                auto index = level.begin() + i;
                level.insert(index, hand);
                return;
            }else{
                break;
            }
        }
    }
    level.push_back(hand);
}

int main(){
    vector<string> file = loadFile("./input.txt");

    vector<Hand> hands;
    vector<Hand> sortedHands[7];

    for (int i = 0; i < file.size(); i++){
        vector<string> handInputs = splitWords(file[i]);
        hands.push_back(Hand(handInputs[0], handInputs[1]));
    }

    for (int i = 0; i < hands.size(); i++){
        int level = getLevel(hands[i].handValues);
        sortHand(hands[i], sortedHands[level]);
    }

    int rank = 0;
    int score = 0;
    for (int i = 0; i < 7; i++){
        for (int j = 0; j < sortedHands[i].size(); j++){
            rank++;

            score += rank * sortedHands[i][j].score;
        }
    }
        cout << score;
    return 1;
}

