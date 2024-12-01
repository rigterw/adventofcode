

void setup(){
   String directions[] = loadStrings("directions.txt"); 
 int forward=0, depth=0;
for(int i = 0; i < directions.length; i++){
  String[] data = splitTokens(directions[i]);

  String direction = data[0];
  int change = int(data[1]);
  switch(direction){
  case "forward":  
    forward += change;
    break;
    
    case "up":
    depth -= change;
    break;
    
    case "down":
    depth += change;
    break;
  }
}
println(depth, forward);
println(depth*forward);
}
