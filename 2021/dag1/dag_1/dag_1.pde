
int tel;
void setup() {
  String[] lines = loadStrings("depts.txt");
  println(lines.length);

  for (int i = 1; i< lines.length; i++) {
    int newnumber = int(lines[i]);
    int oldNumber = int(lines[i-1]);

    if (newnumber > oldNumber) {
      tel++;
    }
  }
  println(tel);
}
