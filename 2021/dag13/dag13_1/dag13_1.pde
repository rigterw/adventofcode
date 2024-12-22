Boolean[][] field;
String[] cords;
String[] foldLines;
void setup() {
  String[]input = loadStrings("input.txt");

  Boolean foundSpace = false;
  int i = 0, maxX=0, maxY=0;
  while (!foundSpace) {
    i++;
    if (input[i].equals("")) {
      foundSpace = true;
    }
  } 
  cords = new String[i];
  for (int j = 0; j<i; j++) {
    cords[j] = input[j];
    int[] split = int(cords[j].split(","));
    if (split[0] > maxX) {
      maxX = split[0];
    }
    if (split[1] > maxY) {
      maxY = split[1];
    }
  }
  maxX++; 
  maxY++;
  field = new Boolean[maxX][maxY];
  for (int x = 0; x<maxX; x++) {
    for (int y = 0; y<maxY; y++) {  
      field[x][y] = false;
    }
  }

  i++;

  foldLines = new String[input.length-i]; 
  for (int j = 0; j<input.length - i; j++) {
    foldLines[j] = input[i+j];
  }
  for (int c = 0; c<cords.length; c++) {
    int cord[] = int(cords[c].split(",")); 

    field[cord[0]][cord[1]] = true;
  }

  for (int f = 0; f<foldLines.length; f++) {
    String[] foldSplit = foldLines[f].split("=");
    Boolean onX;
    int lineValue;
    onX = foldSplit[0].equals("fold along x"); 
    lineValue = int(foldSplit[1]);

    for (int x = 0; x<maxX; x++) {
      for (int y = 0; y<maxY; y++) {
        if (onX) {
          if ( x> lineValue && field[x][y]) {
            println(true);
            field[lineValue-(x-lineValue)][y] = true;
          }
        } else {
          if ( y> lineValue && field[x][y]) {
            println(true, x, y);
            field[x][lineValue-(y-lineValue)] = true;
          }
        }
      }
    }
    if (onX) {
      maxX = lineValue;
    } else {           
      maxY = lineValue;
    }
  }
  println(maxX, maxY);
  int counter = 0;
  for (int x = 0; x<maxX; x++) {
    for (int y = 0; y<maxY; y++) {
      if (field[x][y]) {
        println(x, y);
        counter++;
      }
    }
  }
  for (int y = 0; y<maxY; y++) {
    for (int x = 0; x<maxX; x++) {
      if (field[x][y]) {
        print("#");
      } else {
        print(".");
      }
    }
    println();
  }
  println(counter);
}
