long highvalue, line;

void setup() {
  String[] input = loadStrings("input.txt"); 
  int[] crab = int(split(input[0], ","));
  highvalue = 0;


  for (int j = 0; j<max(crab); j++) {
    long value = 1, soloFuel = 0, fuel = 0;
    for (int i = 0; i<crab.length; i++) {
      int crabPos = crab[i];
      if (j>crabPos) {
        while (j > crabPos) {
          crabPos++;  
          fuel += value; 
          value++;
          if (j<=crabPos) {

            value = 1;
          }
        }
      } else if (crabPos>j) {
        while (j < crabPos) {
          crabPos--;  
          fuel += value; 
          value++;
          if (j>=crabPos) {
            value = 1;
          }
        }
      }
    }
    println(fuel, " ", highvalue);
    if (highvalue == 0) {
      highvalue = fuel;
      line = j;
    } else if (fuel < highvalue) {
      highvalue = fuel;  
      line = j;
    }
  }
  println(highvalue);
  println(line);
}
