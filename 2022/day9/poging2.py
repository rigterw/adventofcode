import os

os.system('cls')

input = open("day9/tinput.txt", "r")
input = input.readlines()

hX = 0
hY = 0
lX = 0
lY = 0

positions = []

lastX = False

for commands in input:

    commands = commands.split("\n")
    command = commands[0].split(" ")

    for step in range(int(command[1])):
        if command[0] == "U":
            hY += 1
        elif command[0] == "R":
            hX += 1
        elif command[0] == "D":
            hY -= 1
        elif command[0] == "L":
            hX -= 1
    
        lastPos = str(hX) + " " + str(hY)

        if step > 0 and (abs(lX - hX)> 1 or abs(lY - hY)):
            if lastPos not in positions:
                positions.append(lastPos)

print(positions)
print(len(positions)+1)

    