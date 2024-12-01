int codelength = 12, o2, co2;
String gamma, epsilon;
Number right;
Number number[]= new Number[1000];
void setup() {

  String input[] = loadStrings("input.txt"); 
  String bytes[] = new String[12];
  
  for (int i = 0; i < input.length; i++) {
    number[i] = new Number();
    String splittedNumber[] = input[i].split("");
    for (int j = 0; j<codelength; j++) {
      number[i].bytes[j] = splittedNumber[j];
    }
  }
  for (int posByte = 0; posByte < codelength; posByte++) {

    int oneCount=0, zeroCount=0, zeroCount2=0, oneCount2=0, counter =0; 
    for (int row = 0; row < input.length; row++) {
      if (number[row].enabled) {
        if (number[row].bytes[posByte].equals("0")) {
          zeroCount++;
        } else {
          oneCount++;
        }
      }  
      if (number[row].enabled2) {
        if (number[row].bytes[posByte].equals("0")) {
          zeroCount2++;
        } else {
          oneCount2++;
        }
      }
    }
    for (int row = 0; row<input.length; row++) {
      if (number[row].enabled) {
        if (zeroCount>oneCount && number[row].bytes[posByte].equals("1")) {
          number[row].enabled = false;
        } else if (zeroCount<=oneCount && number[row].bytes[posByte].equals("0")) {
          number[row].enabled = false;
        }
      }  
      if (number[row].enabled2) {

        if (zeroCount2<=oneCount2 && number[row].bytes[posByte].equals("1")) {
          number[row].enabled2 = false;
        } else if (zeroCount2>oneCount2 && number[row].bytes[posByte].equals("0")) {
          number[row].enabled2 = false;
        } else {
          counter++;
          
        }

      }
    }
    if (counter == 1) {
      for (int row = 0; row<input.length; row++) {
        if (number[row].enabled2) {
          right = number[row];
          println(row);
        }
      }
    }
  }
  for (int row = 0; row<input.length; row++) {
    if (number[row].enabled) {
      String solution = null;
      for (int posByte = 0; posByte < codelength; posByte++) {

        if (solution == null) {
          solution = number[row].bytes[posByte];
        } else {
          solution += number[row].bytes[posByte];
        }
      }
      o2 =unbinary(solution);
    }
    if (right != null) {
      String solution = null;
      for (int posByte = 0; posByte < codelength; posByte++) {

        if (solution == null) {
          solution = right.bytes[posByte];
        } else {
          solution += right.bytes[posByte];
        }
      }
      co2 =unbinary(solution);
    } else if (number[row].enabled2) {      
      String solution = null;
      for (int posByte = 0; posByte < codelength; posByte++) {

        if (solution == null) {
          solution = number[row].bytes[posByte];
        } else {
          solution += number[row].bytes[posByte];
        }
      }
      co2 =unbinary(solution);
    }
  }
  println(o2, " ", co2);
  println(o2*co2);
}
