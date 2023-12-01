import os

os.system('cls')

input = open("day9/tinput.txt", "r")
input = input.readlines()

hX = 0
hY = 0
tX = 0
tY = 0

positions = []

lastX = False

for commands in input:

    commands = commands.split("\n")
    command = commands[0].split(" ")
    print(command)

    turnaround = False

    if ((command[0] == "U" or command[0] == "D") and not lastX) or ((command[0] == "L" or command[0] == "R") and lastX):
        turnaround = True
    

    for step in range(int(command[1])):
        if command[0] == "U":
            hY += 1
        elif command[0] == "R":
            hX += 1
        elif command[0] == "D":
            hY -= 1
        elif command[0] == "L":
            hX -= 1
        
        ysize = 1
        xsize = 1
        if step > 0 and (command[0] == "R" or command[0] == "L") and (step != 3 and turnaround):
            ysize = 0
        elif step > 0 and (command[0] == "U" or command[0] == "D"):
            xsize = 0
        
        if hY - tY > ysize:
            tY += 1
        elif tY - hY > ysize:
            tY -= 1

        if hX - tX > xsize:
            tX += 1
        elif tX - hX > xsize:
            tX -= 1
        if command[0] == "L" and command[1] == "3":
            print(ysize)
        position = str(tX) + "," + str(tY)
        pos2 = str(hX) +  ","+ str(hY)
        print(f"step {step}: {pos2} {position}")
        if position not in positions:
            positions.append(position)

    if command[0] == "L" or command[0] == "R":
        lastX = True
    else:
        lastX = False

print(positions)
print(len(positions))
    
    
    

