import os

os.system("cls")

input = open(r"C:\Users\Wessel\Documents\projects\adventofcode2022\day2\input.txt", "r")
score = 0

for line in input:
    if line[2] == "X":

        if line[0] == "A":
            score += 3
        elif line[0] == "B":
            score += 1
        else:
            score += 2
    elif line[2] == "Y":
        score += 3
        if line[0] == "B":
            score += 2
        elif line[0] == "A":
            score += 1
        else:
            score += 3
    else:
        score += 6
        if line[0] == "C":
            score += 1
        elif line[0] == "B":
            score += 3
        else:
            score += 2

print(score)
    


