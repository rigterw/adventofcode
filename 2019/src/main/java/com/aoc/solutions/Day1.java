package com.aoc.solutions;

import com.aoc.ISolution;
import com.aoc.InputReader;

public class Day1 implements ISolution {

    @Override
    public String one(String input) {
        String[] lines = InputReader.splitLines(input);
        int value = 0;
        for (int i = 0; i < lines.length; i++) {
            int weight = Integer.parseInt(lines[i]);
            value += calculateFuel(weight);
        }

        return value + "";
    }

    @Override
    public String two(String input) {
        String[] lines = InputReader.splitLines(input);
        int value = 0;
        for (int i = 0; i < lines.length; i++) {
            int fuel = Integer.parseInt(lines[i]);

            while (fuel > 0) {
                fuel = calculateFuel(fuel);
                value += fuel;
            }
        }
        return value + "";
    }

    private int calculateFuel(int fuel) {
        fuel /= 3;
        fuel -= 2;

        if (fuel <= 0) {
            return 0;
        }
        return fuel;
    }

}
