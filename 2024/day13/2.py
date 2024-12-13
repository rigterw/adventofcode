from ortools.linear_solver import pywraplp
import re

def findSolution(goal, A, B):
    solver = pywraplp.Solver.CreateSolver('SCIP')
    nA = solver.IntVar(0, solver.infinity(), name= "A button")
    nB = solver.IntVar(0, solver.infinity(), name= "B button")
    obj = solver.Objective()
    obj.SetCoefficient(nA, 3)
    obj.SetCoefficient(nB, 1)
    obj.SetMinimization()

    xPos = solver.Constraint(goal["x"], goal["x"])
    xPos.SetCoefficient(nA, A["x"])
    xPos.SetCoefficient(nB, B["x"])

    yPos = solver.Constraint(goal["y"], goal["y"])
    yPos.SetCoefficient(nA, A["y"])
    yPos.SetCoefficient(nB, B["y"])

    result = solver.Solve()
    if result == solver.INFEASIBLE:
        print("infeasable")
        return 0
    elif result == solver.OPTIMAL:
        print(nA.solution_value(), nB.solution_value())
        return obj.Value()
    

def handleInput(path):
    # Define a number pattern to match (similar to your numberPattern in TypeScript)
    number_pattern = r'\d+'  # This will match sequences of digits in the text
    machines = []
    # Open the file in read mode
    with open(path, 'r') as file:
        lines = file.readlines()  # Read all lines into a list
        
        # Process lines in chunks of 4
        for i in range(0, len(lines), 4):
            # Iterate through the first 3 lines in each chunk (if available)
            data = []
            for j in range(min(3, len(lines) - i)):  # Ensure we don't go out of bounds
                line = lines[i + j].strip()  # Get the current line, strip any extra whitespace
                
                # Find numbers in the line using the regular expression
                numbers = re.findall(number_pattern, line)
                data.append({"x": int(numbers[0]), "y": int(numbers[1])})
            
            data[2]["x"] += 10000000000000
            data[2]["y"] += 10000000000000
            machines.append(data)
    return machines    


machines = handleInput("build/day13/input.txt")
score = 0
for machine in machines:
    score += findSolution(machine[2], machine[0], machine[1])

print(score)