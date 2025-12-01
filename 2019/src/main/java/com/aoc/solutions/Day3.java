package com.aoc.solutions;

import java.util.HashMap;

import com.aoc.ISolution;
import com.aoc.InputReader;
import com.aoc.util.Vector2;

public class Day3 implements ISolution {

    HashMap<String, Boolean> positions = new java.util.HashMap<>();
    Character[][] map = new Character[10000][10000];

    @Override
    public String one(String input) {
        String[] directionSet = InputReader.splitLines(input);

        String[] directions = directionSet[0].split(",");
        Line line = new Line();
        for (int i = 0; i < directions.length; i++) {
            int distance = Integer.parseInt(directions[i].substring(1));
            char dir = directions[i].charAt(0);
            for (int j = 0; j < distance; j++) {
                String pos = line.move(dir).toString();
                positions.put(pos, true);
            }
        }

        directions = directionSet[1].split(",");
        line = new Line();
        float lowestDistance = Integer.MAX_VALUE;
        Vector2 origin = new Vector2();
        for (int i = 0; i < directions.length; i++) {

            int distance = Integer.parseInt(directions[i].substring(1));
            char dir = directions[i].charAt(0);
            for (int j = 0; j < distance; j++) {
                Vector2 pos = line.move(dir);
                String posString = pos.toString();

                if (!positions.containsKey(posString)) {
                    continue;
                }

                float originDistance = Math.abs(Vector2.manhattan(origin, pos));
                System.out.println("found intersection at: " + pos.toString() + "with distance: " + originDistance);
                lowestDistance = originDistance < lowestDistance ? originDistance : lowestDistance;
            }
        }

        return lowestDistance + "";

    }

    private class Line {
        private Vector2 pos;

        public Line() {
            pos = new Vector2();
        }

        public Vector2 move(Character dir) {
            switch (dir) {
                case 'R':
                    pos.x++;
                    break;

                case 'U':
                    pos.y--;
                    break;
                case 'D':
                    pos.y++;
                    break;
                case 'L':
                    pos.x--;
                    break;

                default:
                    break;
            }

            return new Vector2(pos.x, pos.y);
        }
    }

    @Override
    public String two(String input) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'two'");
    }
}
