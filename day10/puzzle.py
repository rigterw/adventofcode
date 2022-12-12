import os

os.system('cls')

input = open("day10/input.txt", "r")
input = input.readlines()

register = 1
cycle = 0
strenghts = 0

def checkStrength(cycle, register):
    #print((cycle - 20) % 40)
    if not (cycle == 20 or (cycle - 20) % 40 == 0):
        return 0

    return cycle * register


for command in input:
    command = command.split("\n")
    command = command[0].split(" ")

    if len(command) == 1:
        cycle += 1
        strenghts += checkStrength(cycle, register)

    else:
        for i in range(2):
            cycle += 1
            strenghts += checkStrength(cycle, register)
        
        register += int(command[1])
    

print(strenghts)