
  int score = 0;
void setup() {
  int winner = 0, lastNr = 0, cardsWon = 0;
  String[] input = loadStrings("bingo.txt");
  int nCards = (input.length-1)/6, cardSize = 5;
  int[] bingoNrs = int(input[0].split(","));
  int[][][] bingoCard = new int[nCards][cardSize][cardSize];
  Boolean[][][] bingoMarker = new Boolean[nCards][cardSize][cardSize];
  Boolean noWinner = true;
  Boolean cardWon[] = new Boolean[nCards];

  //initialise bingo card
  for (int cardNr = 0; cardNr < nCards; cardNr++) {
    cardWon[cardNr] = false;
    for (int y = 0; y < cardSize; y++) {
      int[] number = int(splitTokens(input[cardNr*6+2+y]));

      for (int x = 0; x < cardSize; x++) {
        bingoCard[cardNr][y][x] = number[x];
        bingoMarker[cardNr][y][x] = false;
      }
    }
  }


  for (int currentNr = 0; currentNr < bingoNrs.length; currentNr++) {
    cardsWon = 0;
    //rolls number


    for (int cardNr = 0; cardNr < nCards; cardNr++) {
      if (cardWon[cardNr]) {
        cardsWon++;
      }
      if (cardsWon != 100 && !cardWon[cardNr]) {
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
            if (!cardWon[cardNr]) {
              cardWon[cardNr] = true;
              winner = cardNr;
              lastNr = bingoNrs[currentNr];
                 println(cardsWon, " ", lastNr, " ", bingoNrs[currentNr], " ", winner);
            }
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
            if (!cardWon[cardNr]) {
              cardWon[cardNr] = true;
              winner = cardNr;
              lastNr = bingoNrs[currentNr];
              if (cardNr == 39) {
                for (int y = 0; y < cardSize; y++) {
                  println();
                  for (int b = 0; b < cardSize; b++) {
                    print(bingoMarker[winner][y][b]);
                  }
                }
              }
            }
          }
        }
      }

    } 
  }

  for (int y = 0; y < cardSize; y++) {
    for (int x = 0; x < cardSize; x++) {
      if (!bingoMarker[winner][y][x]) {
        score += bingoCard[winner][y][x];
      }
    }
  }//println(cardsWon, " ", winner, " ", lastNr, " ", bingoNrs[currentNr]);
  println(score, " ", lastNr, " ", score*lastNr);
}
