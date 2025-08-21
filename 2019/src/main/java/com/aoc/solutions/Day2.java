package com.aoc.solutions;

import com.aoc.ISolution;
import com.aoc.IntComputer;

public class Day2 implements ISolution {

    @Override
    public String one(String input) {
        int[] program = IntComputer.convertInput(input);
        int[] result = new IntComputer().execute(program);
        return result[0] + "";
    }

    @Override
    public String two(String input) {
        IntComputer computer = new IntComputer();
        int[] program = IntComputer.convertInput(input);

        for (int noun = 0; noun < 100; noun++) {
            for (int verb = 0; verb < 100; verb++) {
                program[1] = noun;
                program[2] = verb;

                int[] result = computer.execute(program);

                if (result[0] == 19690720) {
                    return (100 * noun + verb) + "";
                }
            }
        }

        return null;
    }
}
