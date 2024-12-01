int oldNumber;
int tel;
void setup() {
  String[] lines = loadStrings("depts.txt");
  println(lines.length);
  println(lines.length/3);
  for (int i = 1; i< lines.length-2; i++) {
    int newNumber = 0;
    int oldNumber = 0;
    for (int j = 0; j< 3; j++) {

      newNumber = newNumber +int(lines[i+j]);
      oldNumber = oldNumber + int(lines[i+j-1]);
    }
    if (newNumber > oldNumber) {
      println(newNumber, oldNumber);
      tel++;
    }
  }
  println(tel);
}
