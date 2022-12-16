import os

os.system('cls')

input = open("day10/input.txt", "r")
input = input.readlines()

width = 40
height = 0
for command in input:
    command = command.split("\n")
    command = command[0].split(" ")
