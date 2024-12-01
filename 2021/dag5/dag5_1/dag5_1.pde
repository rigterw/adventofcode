int counter;
int[][] field;

void setup() {
  String[] input = loadStrings("field.txt");
  int[]  oldX = new int[input.length];
  int[]  oldY = new int[input.length];
  int[]  newX = new int[input.length];
  int[]  newY = new int[input.length];
  int maxX=0, maxY=0;
  for (int i = 0; i<input.length; i++) {
    String[] splitted1 = split(input[i], " -> ");  
    String[] old = split(splitted1[0], ",");
    String[] New = split(splitted1[1], ",");

    oldX[i] = int(old[0]);
    oldY[i] = int(old[1]);
    newX[i] = int(New[0]);
    newY[i] = int(New[1]);
    if (oldX[i] > maxX) {
      maxX =oldX[i];
    }    
    if (newX[i] > maxX) {
      maxX =newX[i];
    }    
    if (oldY[i] > maxY) {
      maxY =oldY[i];
    }    
    if (newY[i] > maxY) {
      maxY =newY[i];
    }
  }
  maxY++;
  maxX++;
  field = new int[maxX][maxY];
  for (int i = 0; i<maxX; i++) {
    for (int j = 0; j<maxY; j++) {
      field[i][j] = 0;
    }
  }
  for (int i = 0; i<input.length; i++) {
    if (oldX[i]==newX[i]) {

      if (oldY[i] > newY[i]) {
 
        for (int j = 0; j < oldY[i] - newY[i]+1; j++) {
          field[oldX[i]][newY[i]+j]++;

          if (field[oldX[i]][newY[i]+j] == 2) {
 
            counter++;
          }
        }
      }else{
        //deze is goed
          for (int j = 0; j < newY[i] - oldY[i]+1; j++) {
          field[oldX[i]][oldY[i]+j]++;
          if (field[oldX[i]][oldY[i]+j] == 2) {
            counter++;
          }
        }      
        
      }
    }else if(oldY[i] == newY[i]){
      if (oldX[i] > newX[i]) {
        for (int j = 0; j < oldX[i] - newX[i]+1; j++) {
          field[newX[i]+j][oldY[i]]++;
          if (field[newX[i]+j][oldY[i]] == 2) {
            counter++;
          }
        }
      }else{
          for (int j = 0; j < newX[i] - oldX[i]+1; j++) {
          field[oldX[i]+j][oldY[i]]++;
          if (field[oldX[i]+j][oldY[i]] == 2) {
            counter++;
          }
        }      
        
      }
    }
  }
    for (int i = 0; i<maxY; i++) {
      println();
    for (int j = 0; j<maxX; j++) {
     print(field[j][i], " "); 
    }}
  println(counter);
}
