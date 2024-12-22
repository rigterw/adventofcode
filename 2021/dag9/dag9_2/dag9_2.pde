int score = 0;

int[][] map;
Boolean[][] usedCheck;
IntList depthScore = new IntList();
int xlength, ylength;
void setup() {

  String[] input = loadStrings("input.txt");
  xlength  = input[0].split("").length;
  ylength = input.length;
  println(xlength);
  map = new int[input.length][xlength];
  usedCheck = new Boolean[input.length][xlength];
  for (int y = 0; y<input.length; y++) {
    String[] individualValue = input[y].split("");   
    for (int x = 0; x<xlength; x++) {
      map[y][x] = int(individualValue[x]);
      usedCheck[y][x] = false;
    }
  }
  int arrayCounter = 0;
  for (int y = 0; y<input.length; y++) {  
    for (int x = 0; x<xlength; x++) {
      if (y==0 || map[y-1][x] > map[y][x]) {
        if (y==input.length-1 || map[y+1][x] > map[y][x]) {
          if (x==0 || map[y][x-1] > map[y][x]) {
            if (x==xlength-1 || map[y][x+1] > map[y][x]) {

              depthScore.append(1);
              checksides(y+1, x, arrayCounter);

              checksides(y-1, x, arrayCounter);

              checksides(y, x+1, arrayCounter);
              checksides(y, x-1, arrayCounter);
              arrayCounter++;
            }
          }
        }
      }
    }
  }
  depthScore.sortReverse();
  println(depthScore);
  score = depthScore.get(0) * depthScore.get(1) * depthScore.get(2);
  println(score);
}


void checksides(int y, int x, int counter) {

  if (x >= 0 && y>= 0 && x<xlength && y<ylength) {
    println(x, y);
    if (map[y][x] != 9 && usedCheck[y][x] == false) {
      depthScore.increment(counter);
      usedCheck[y][x] = true;
      if (y>0 && map[y-1][x]>map[y][x]&& map[y-1][x] != 9) {
        checksides(y-1, x, counter);
      }
      if (y<ylength-1 && map[y+1][x]>map[y][x]&& map[y+1][x] != 9) {
        checksides(y+1, x, counter);
      }
      if (x>0 && map[y][x-1]>map[y][x]&&map[y][x-1] != 9) {
        checksides(y, x-1, counter);
      }
      if (x<xlength-1 && map[y][x+1]>map[y][x]&&map[y][x+1] != 9) {
        checksides(y, x+1, counter);
      }
    }
  }
}
