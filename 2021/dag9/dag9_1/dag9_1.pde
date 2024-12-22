
int[][] map;

void setup(){
  String[] input = loadStrings("input.txt");
  int xlength  = input[0].split("").length;
  println(xlength);
  int[][]map = new int[input.length][xlength];
  for(int y = 0; y<input.length; y++){
 String[] individualValue = input[y].split("");   
 for(int x = 0; x<xlength; x++){
map[y][x] = int(individualValue[x]);   
   print(map[y][x]);
   
 }
println();    
  }
  
  
}
