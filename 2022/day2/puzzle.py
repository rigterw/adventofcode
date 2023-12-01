import os

os.system("cls")

input = open(r"C:\Users\Wessel\Documents\projects\adventofcode2022\day2\input.txt", "r")
score = 0

for line in input:
    if line[2] == "X":
        score += 1
        if line[0] == "A":
            score += 3
        elif line[0] == "C":
            score += 6
    elif line[2] == "Y":
        score += 2
        if line[0] == "B":
            score += 3
        elif line[0] == "A":
            score += 6
    else:
        score += 3
        if line[0] == "C":
            score += 3
        elif line[0] == "B":
            score += 6

print(score)
    


