package com.aoc;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class InputReader {

    public static String[] splitLines(String input) {
        return input.split("\r\n");
    }

    public static String readText(String day, boolean example) throws IOException {
        if (example) {
            day += "_ex";
        }
        return Files.readString(Path.of("input", "day" + day + ".txt"));
    }
}
