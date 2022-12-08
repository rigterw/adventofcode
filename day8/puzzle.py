import os

os.system('cls')

input = open("day8/input.txt", "r")
input = input.readlines()

counter = 0

for i in range(len(input)):

    input[i] = input[i].replace("\n", "")

def isVisible(height, x , y):
    calculator = 0
    hiddenSide = [False, False, False, False]
    scores = []

    if x == 0 or y == 0 or x == len(input[x]) -1 or y == len(input) -1:
       return 0

    for x2 in range(x+1,len(input[y])):
        calculator += 1

        if int(input[y][x2]) >= height:
            hiddenSide[0] = True
            #print(f"{x},{y} has {x2},{y}")
            break
    scores.append(calculator)
    calculator = 0

    for y2 in range(y+1, len(input)):
        calculator += 1
        if int(input[y2][x]) >= height:
            hiddenSide[1] = True
            #print(f"{x},{y} has {x},{y2}")

            break 


    scores.append(calculator)
    calculator = 0

    for x2 in range(x-1, -1, -1):
        calculator += 1
        if int(input[y][x2]) >= height:
            hiddenSide[2] = True
           # print(f"{x},{y} has {x2},{y}")

            break
    scores.append(calculator)
    calculator = 0
    for y2 in range(y-1, -1, -1):
        calculator += 1 
        #if x == 3 and y == 3:
           # print(f"{input[y2][x]} : {int(input[y2][x]) >= height}")
        if int(input[y2][x]) >= height:
            hiddenSide[3] = True
            #print(f"{x},{y} has {x},{y2}")
            break
    scores.append(calculator)
    # if not hiddenSide[0] or not hiddenSide[1] or not hiddenSide[2] or not hiddenSide[3]:
    #     print(f"found: {height} on: {x},{y}")

    finalscore = 1

    for score in scores:
        if score == 0:
            continue
        finalscore *= score
    if finalscore == 16:
        print(f"high: {x},{y} height: {height}")
    return finalscore
   # return not hiddenSide[0] or not hiddenSide[1] or not hiddenSide[2] or not hiddenSide[3]

for i in range(len(input)):

    input[i].replace("\n", "")

    for j in range(len(input[i])):
        treescore = isVisible(int(input[i][j]), j, i)
        if treescore > counter:
            counter = treescore
        # if isVisible(int(input[i][j]), j, i):
        #     counter += 1

print(counter)
