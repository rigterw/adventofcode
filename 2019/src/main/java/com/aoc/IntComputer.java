package com.aoc;

public class IntComputer {

    private int i = 0; // pointer of the computer

    /**
     * Executes the provided Intcode program.
     * Also sets the pointer to zero
     * 
     * @param input the program already converted to memory values
     * @return the resulting program state after execution
     */
    public int[] execute(int[] input) {

        i = 0;
        int[] program = input.clone();

        while (program[i] != 99) {
            switch (program[i]) {
                case 1:
                    add(program);
                    break;

                case 2:
                    multiply(program);
                    break;

                default:
                    System.out.println("Unhandled operation: " + program[i]);
            }
        }
        return program;
    }

    /**
     * Executes the add operation and moves the pointer
     * 
     * @param program The current memory state of the program
     */
    private void add(int[] program) {
        program[program[i + 3]] = program[program[i + 1]] + program[program[i + 2]];
        i += 4;
    }

    /**
     * Executes the multiply operation and moves the pointer
     * 
     * @param program The current memory state of the program
     */
    private void multiply(int[] program) {
        program[program[i + 3]] = program[program[i + 1]] * program[program[i + 2]];
        i += 4;
    }

    /**
     * Convert the program string to a memorystate (int array) and then executes it.
     * 
     * @param input
     * @return The memory state after completion
     */
    public int[] execute(String input) {

        return execute(convertInput(input));
    }

    /**
     * Create a memory state from a input string
     * 
     * @param input A string containing all the values that needs to be set, each
     *              slot seperated by a ,
     * @return A ready to use memory state for the int program
     */
    public static int[] convertInput(String input) {
        String[] inputStringArray = InputReader.splitLines(input);
        inputStringArray = inputStringArray[0].split(",");
        int[] inputArray = new int[inputStringArray.length];

        for (int i = 0; i < inputArray.length; i++) {
            inputArray[i] = Integer.parseInt(inputStringArray[i]);
        }

        return inputArray;
    }

}
