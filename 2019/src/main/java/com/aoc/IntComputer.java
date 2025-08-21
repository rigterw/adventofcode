package com.aoc;

public class IntComputer {

    private int i = 0;

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

    private void add(int[] program) {
        program[program[i + 3]] = program[program[i + 1]] + program[program[i + 2]];
        i += 4;
    }

    private void multiply(int[] program) {
        program[program[i + 3]] = program[program[i + 1]] * program[program[i + 2]];
        i += 4;
    }

    public int[] execute(String input) {

        return execute(convertInput(input));
    }

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
