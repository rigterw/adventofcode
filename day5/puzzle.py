import os

os.system('cls')

input = open("day5/input.txt", "r")
input = input.readlines()



#places stack input into array
stacks = [[],[],[],[],[],[],[],[],[]]

for x in range(8):
    inputLine = input[7-x]
    for i in range(9):
        if inputLine[i*4+1] != " ":
            stacks[i].append(inputLine[i*4+1])



for x in range(len(input)-10):
    i = x+10

    order = input[i].split(" ")

    for j in range(int(order[1])):

        grabbedItem = stacks[int(order[3])-1][-1]
        stacks[int(order[3])-1].pop()
        stacks[int(order[5])-1].append(grabbedItem)

code = ""
for stack in stacks:
    code += stack[-1]

print(code)



    