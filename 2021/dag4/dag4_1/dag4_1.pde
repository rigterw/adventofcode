

void setup() {
  int winner = 0, lastNr = 0;
  String[] input = loadStrings("bingo.txt");
  int nCards = (input.length-1)/6, cardSize = 5;
  int[] bingoNrs = int(input[0].split(","));
  int[][][] bingoCard = new int[nCards][cardSize][cardSize];
  Boolean[][][] bingoMarker = new Boolean[nCards][cardSize][cardSize];
  Boolean noWinner = true;

  //initialise bingo card
  for (int cardNr = 0; cardNr < nCards; cardNr++) {
    for (int y = 0; y < cardSize; y++) {
      int[] number = int(splitTokens(input[cardNr*6+2+y]));

      for (int x = 0; x < cardSize; x++) {
        bingoCard[cardNr][y][x] = number[x];
        bingoMarker[cardNr][y][x] = false;
      }
    }
  }


  for (int currentNr = 0; currentNr < bingoNrs.length; currentNr++) {
    //rolls number
    if (noWinner) {
      for (int cardNr = 0; cardNr < nCards; cardNr++) {
        for (int y = 0; y < cardSize; y++) {
          for (int x = 0; x < cardSize; x++) {
            if (bingoCard[cardNr][y][x] == bingoNrs[currentNr]) {
              bingoMarker[cardNr][y][x] = true;
            }
          }
        }
        for (int y = 0; y < cardSize; y++) {
          Boolean horisontal =true;
          for (int x = 0; x < cardSize; x++) {
            if (!bingoMarker[cardNr][y][x]) {
              horisontal = false;
            }
          }
          if (horisontal) {
            noWinner = false;
            winner = cardNr;
            lastNr = bingoNrs[currentNr];
          }
        } 
        for (int x = 0; x < cardSize; x++) {
          Boolean vertical =true;
          for (int y = 0; y < cardSize; y++) {
            if (!bingoMarker[cardNr][y][x]) {
              vertical = false;
            }
          }
          if (vertical) {
            noWinner = false;
            winner = cardNr;
            println(winner);
            lastNr = bingoNrs[currentNr];
          }
        }
      }
    }
  }
  int score = 0;
  for (int y = 0; y < cardSize; y++) {
    for (int x = 0; x < cardSize; x++) {
      if(!bingoMarker[winner][y][x]){
        score += bingoCard[winner][y][x];
      }
    }
  }
  println(score*lastNr);
}
