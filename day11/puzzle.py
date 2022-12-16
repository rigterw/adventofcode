import os

class Monkey:

    def calculateNewValue(self, item):

        if self.operator == "*":
            return item * self.operationValue
        if self.operator == "+":
            return item + self.operationValue
        if self.operator == "-":
            return item - self.operationValue
        if self.operator == "2":
            return item * item

    def Throw(self):

        for item in self.items:
            newItemValue = 0
            self.counter += 1
            newItemValue = self.calculateNewValue(item)
            print(newItemValue)
            newItemValue = int(newItemValue //3)
        
            if newItemValue % self.divisionValue == 0:
                monkeys[self.true].items.append(newItemValue)
            else:
                monkeys[self.false].items.append(newItemValue)
        
        self.items = []
        


    def __init__(self, items, operator, operationValue, divisionValue, trueValue, falseValue):
        self.counter = 0
        self.items = items
        self.operator = operator
        self.operationValue = operationValue
        self.divisionValue = divisionValue
        self.true = trueValue
        self.false = falseValue
    

os.system('cls')

input = open("day11/input.txt", "r")
input = input.readlines()

#cut off the \n
for i in range(len(input)):
    x = input[i].split("\n")

    input[i] = x[0]


lastItems = []
lastOp = ""
lastOperationValue = 0
lastDivisionValue = 0
lastTrueValue = 0
lastFalseValue = 0

monkeys = []
currentMonkey = 0

for line in input:

    if "Monkey " in line:
        line = line.split(" ")
        line = line[1].split(":")
        currentMonkey = int(line[0])


    elif "Starting items:" in line:
        line = line.split(": ")
        
        items = line[1].split(", ")

        for item in range(len(items)):
            items[item] = int(items[item])

        lastItems = items

    elif "Operation: " in line:
        line = line.split(" ")
        lastOp = line[-2]

        if line[5] == "old":
            lastOp = "2"
            continue
        lastOperationValue = int(line[5])

    elif "Test: " in line:
        line = line.split(" ")

        lastDivisionValue = int(line[-1])

    elif "If true: " in line:
        line = line.split(" ")
        lastTrueValue = int(line[-1])
    elif "If false: " in line:
        line = line.split(" ")
        lastFalseValue = int(line[-1])

    

    else:
        monkeys.append(Monkey(lastItems, lastOp, lastOperationValue, lastDivisionValue, lastTrueValue, lastFalseValue))
monkeys.append(Monkey(lastItems, lastOp, lastOperationValue, lastDivisionValue, lastTrueValue, lastFalseValue))


for i in range(20):
    for monkey in monkeys:
        monkey.Throw()

firstPlace = 0
secondPlace = 0

for monkey in monkeys:
    if monkey.counter > firstPlace:
        secondPlace = firstPlace
        firstPlace = monkey.counter
    
    elif monkey.counter > secondPlace:
        secondPlace = monkey.counter

print(firstPlace * secondPlace)

            
    
