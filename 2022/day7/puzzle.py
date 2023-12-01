import os

class Node:


    def __init__(self, parent, name):
        self.name = name
        self.children = {}
        if parent != 0:
            self.parent = parent


    def addChild(self, childName, child):
        self.children[childName] = child
    
    def getValue(self):
        value = 0
        for child in self.children:
            value += self.children[child].getValue()
        return int(value)

    def __str__(self):
        return self.name


class EndNode:
    def __init__(self, parent, value, name):
        self.value = value
        self.name = name
        self.parent = parent

    def getValue(self):
        return int(self.value)

    def __str__(self):
        return self.name


os.system('cls')

input = open("day7/input.txt", "r")
input = input.readlines()

RootNode = Node(0, "root")
currentNode = RootNode

leaves = []

counter = 0
for command in input:
    command = command.split("\n")
    commandWords = command[0].split(" ")

    counter += 1


    if commandWords[0] == "$":
        if commandWords[1] == "cd":
            if commandWords[2] == "..":
                currentNode = currentNode.parent
            elif commandWords[2] == "/":
                currentNode = RootNode
            else :
                currentNode = currentNode.children[commandWords[2]]
    
    elif commandWords[0] == "dir":
        currentNode.addChild(commandWords[1], Node(currentNode, str(counter) + " dir:" + commandWords[1]))

    
    else:
        leaf = EndNode(currentNode, int(commandWords[0]), str(counter) + " leaf:" +  commandWords[1])
        currentNode.addChild(commandWords[1], leaf)
        leaves.append(leaf)


def checkSizes(one, two):
    if one < two and 30000000 < 70000000 - (RootNode.getValue() - one):
        return one
    return two

def search(node):
    score = 0
    if isinstance(node, Node):
        print(str(node) + " " + str(node.getValue()))
        for childNode in node.children:
            score += search(node.children[childNode])
            

        if node.getValue() < 100000:
            print(node)
            score += node.getValue()
    return score

def search2(node):
    bestvalue = node.getValue()
    if isinstance(node, Node):
        for childNode in node.children:
                bestvalue = checkSizes(bestvalue, search2(node.children[childNode]))
    else:
        return 9999999999999999
    return bestvalue

print("----------------------------------------------------------")

print(search2(RootNode))
