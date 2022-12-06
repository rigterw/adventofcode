import os

os.system("cls")
values = []
counter = 0
input = open(r"C:\Users\Wessel\Documents\projects\adventofcode2022\day1\input.txt", "r")

calories = 0
for line in input:

    if len(line) == 1:
        values.append(calories)
        calories = 0
    else:
        calories += int(line)
input.close()

highest = 0
secondPlace = 0
thirdPlace = 0

for value in values:
    if value > highest:
        thirdPlace = secondPlace
        secondPlace = highest
        highest = value


print(highest + secondPlace + thirdPlace)
