int maxLevel = 9, gridSize = 10, maxDay = 100;
int counter;

int[][] octopus = new int[gridSize][gridSize];


void setup() {

  String[] input = loadStrings("octopus.txt");  
  for (int y = 0; y<input.length; y++) {
    int[] inputSplit = int(input[y].split(""));  
    for (int x = 0; x<inputSplit.length; x++) {
      octopus[x][y] = inputSplit[x];
    }
  }

for(int day = 0; day<maxDay; day++){
  for (int y = 0; y<gridSize; y++) {  
    for (int x = 0; x<gridSize; x++) {
      octopus[x][y]++;
    }
  }
  for (int y = 0; y<gridSize; y++) {  
    for (int x = 0; x<gridSize; x++) {
      if (octopus[x][y]>9) {
        print(x,y);
        flash(x, y); 
      }
    }
  }
}
  println(counter);
}


void flash(int x, int y) {
  println(x,y, "value: ", octopus[x][y]);
  octopus[x][y] = 0;
  counter++;
  for (int i = -1; i<2; i++) {
    for (int j = -1; j<2; j++) {
      if (!(i==0 && j==0)&& x+i != -1 && y+j !=-1 && y+j != gridSize && x+i != gridSize) {
        if (octopus[x+i][y+j] !=0) {
          octopus[x+i][y+j]++; 
          if ( octopus[x+i][y+j] > 9) {
            flash(x+i, y+j);
          }
        }
      }
    }
  }
}
