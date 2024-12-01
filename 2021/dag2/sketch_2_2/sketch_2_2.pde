

void setup(){
   String directions[] = loadStrings("directions.txt"); 
 int forward=0, depth=0, aim = 0;
for(int i = 0; i < directions.length; i++){
  String[] data = splitTokens(directions[i]);

  String direction = data[0];
  int change = int(data[1]);
  switch(direction){
  case "forward":  
    forward += change;
    depth += change*aim;
    break;
    
    case "up":
    aim -= change;
    break;
    
    case "down":
    aim += change;
    break;
  }
}
println(depth, forward);
println(depth*forward);
}
