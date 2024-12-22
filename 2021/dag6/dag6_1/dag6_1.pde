


int nDays = 256;

IntList fish, inventory;

void setup() {

  String[] load = loadStrings("input.txt");
  int[] input = int(split(load[0], ","));
  fish = new IntList();
  for (int i = 0; i<input.length; i++) {
    fish.append(input[i]);
  }

  for (int d = 0; d<nDays; d++) {
    for (int i = 0; i<fish.size(); i++) {
      fish.sub(i, 1); 
      if (fish.get(i)<0) {
        fish.set(i, 6);
        fish.append(9);
      }
    }
    println(d);
  }
  println(fish.size());
}
