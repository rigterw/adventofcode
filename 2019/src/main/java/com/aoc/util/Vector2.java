package com.aoc.util;

public class Vector2 {

    public float x;
    public float y;

    public Vector2(float x, float y) {
        this.x = x;
        this.y = y;
    }

    public Vector2() {
        this(0, 0);
    }

    public static float manhattan(Vector2 one, Vector2 other) {
        return Math.abs(one.x - other.x) + Math.abs(one.y - other.y);
    }

    public boolean equals(Vector2 other) {
        return this.x == other.x && this.y == other.y;
    }

    @Override
    public final String toString() {
        return "[" + x + "," + y + "]";
    }
}
