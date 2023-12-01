import os

os.system("cls")

input = open(r"C:\Users\Wessel\Documents\projects\adventofcode2022\day4\input.txt", "r").readlines()

counter = 0

for pair in input:
    pair = pair.split("\n")
    assignments = pair[0].split(",")

    elf1 = assignments[0].split("-")
    elf2 = assignments[1].split("-")

    #contain
    if (int(elf1[0]) >= int(elf2[0]) and int(elf1[1]) <= int(elf2[1])) or (int(elf2[0]) >= int(elf1[0]) and int(elf2[1]) <= int(elf1[1])):
        counter += 1

    #overlap
    elif (int(elf1[0]) >= int(elf2[0]) and int(elf1[0]) <= int(elf2[1])) or (int(elf1[1]) >= int(elf2[0]) and int(elf1[1]) <= int(elf2[1])):
        counter += 1
        print(str(elf1[0]) + " " + str(elf1[1])+ " " + str(elf2[0]) + " " + str(elf2[1]))

print(len(input))
print(counter)
