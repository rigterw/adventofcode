package com.aoc;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class DataVisualizer {

    public static void export(String[][] data, String fileName) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("export/" + fileName))) {
            for (String[] row : data) {
                // Join each row with spaces (you can use commas or tabs if you prefer)
                String line = String.join("", row);
                writer.write(line);
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
