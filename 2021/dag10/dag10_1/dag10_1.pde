int score;
void setup() {
  String[] input = loadStrings("input.txt");
  for (int i = 0; i< input.length; i++) {

    int counter = 0;
    while (counter< 4) {
      counter = 0;
      String paste = "";
      String[] cut1 = input[i].split("\\(\\)");
      for (int j = 0; j< cut1.length; j++) {

        paste += cut1[j];
      }

      input[i] = paste;
      if (cut1.length == 1) {
        counter++;
      }

      paste = "";
      String[] cut2 = input[i].split("\\{}");
      for (int j = 0; j< cut2.length; j++) {
        paste += cut2[j];
      }
      input[i] = paste;
      if (cut2.length == 1) {
        counter++;
      }

      paste = "";
      String[] cut3 = input[i].split("\\[]");
      for (int j = 0; j< cut3.length; j++) {
        paste += cut3[j];
      }
      input[i] = paste;
      if (cut3.length == 1) {
        counter++;
      }

      paste = "";
      String[] cut4 = input[i].split("<>");
      for (int j = 0; j< cut4.length; j++) {
        paste += cut4[j];
      }
      input[i] = paste;
      if (cut4.length == 1) {
        counter++;
      }
    }
//    println(input[i]);
    score+= getscore(input[i]);
 
  }
     println(score);
}


int getscore(String input) {
 
  String[] character = input.split("");  
  for (int i = 0; i<character.length; i++) {

    switch(character[i]) {
    case ")":

      return 3;
    case "]":

      return 57;

    case "}":

      return 1197;

    case ">":

      return 25137;

default:
    }
  }
  return 0;
}
