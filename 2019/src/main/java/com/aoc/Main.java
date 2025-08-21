package com.aoc;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

public class Main {
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("Not enough variables given");
            return;
        }
        String day = args[0];
        boolean firstPuzzle = Integer.parseInt(args[1]) == 1;

        boolean example = args.length > 2 && args[2].equals("true");
        try {
            String input = InputReader.readText(day, example);

            Class<?> classs = Class.forName("com.aoc.solutions.Day" + day);
            ISolution solution = (ISolution) classs.getDeclaredConstructor().newInstance();

            String sol = firstPuzzle ? solution.one(input) : solution.two(input);
            System.out.println("The solution is: " + sol);
        } catch (ClassNotFoundException | InstantiationException | IllegalAccessException
                | InvocationTargetException | NoSuchMethodException | IOException e) {
            System.out.println(e);
        }
    }
}