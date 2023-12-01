import os

os.system("cls")

input = open(r"C:\Users\Wessel\Documents\projects\adventofcode2022\day3\input.txt", "r")
score = 0

def calculateScore(letter):
    if(letter.isupper()):
        return ord(letter) - 64 + 26
    
    return ord(letter) - 96

input = input.readlines()
for group in range(len(input)//3):
    elves = []
    for i in range(3):
        elves.append(input[i+ group*3])
    
    print(elves[0])
    mainbackpack = elves[0]
    for item in elves[0]:

        if item in elves[1] and item in elves[2]:
            print(item)
            score += calculateScore(item)
            break

print(score)  
