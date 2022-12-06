import os

os.system("cls")

input = open(r"C:\Users\Wessel\Documents\projects\adventofcode2022\day3\input.txt", "r")

dupescore = 0


def calculateScore(letter):
    if(letter.isupper()):
        return ord(letter) - 64 + 26
    
    return ord(letter) - 96




for backpack in input:
    print(backpack)
    if(len(backpack) % 2 != 0):
        backpack[:-1]
    comp1 = backpack[:len(backpack)//2]
    comp2 = backpack[len(backpack)//2:]
    found = []
    for x in range(len(comp1)):
        for y in range(len(comp2)):
            if comp1[x] == comp2[y] and comp1[x] not in found:
                found.append(comp1[x])
                dupescore += calculateScore(comp1[x])
                break

print(dupescore)
