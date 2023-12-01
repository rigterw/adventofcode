import os

os.system('cls')

input = open("day6/input.txt", "r")
input = input.readline()

def hasDupe(input, offset):
    for i in range(14):
        for j in range(14):
            if i ==  j:
                continue
            if input[offset + i] == input[offset + j]:
                return True

    return False


for i in range(len(input)):
    dupecheck = hasDupe(input, i)
    if dupecheck == False:
        print(i+14)
        break
