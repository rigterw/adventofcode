export function main(input: string[]): any {

    let pos: number = 50
    let counter: number = 0;
    let fullRotation: number = 100;

    for (let i = 0; i < input.length; i++) {
        let positiveDir: boolean = input[i].charAt(0) == "R";
        let number: number = +(input[i].substring(1));

        counter += Math.floor(number / fullRotation);
        if (!positiveDir) {
            number *= -1;
        }
        let prevPos: number = pos;
        pos += number % fullRotation;

        if (pos < 0) {
            if (prevPos != 0) {
                counter++;
            }
            pos += fullRotation;
        } else if (pos >= fullRotation) {
            counter++;
            pos -= fullRotation;
        } else if (pos == 0) {
            counter++;
        }
    }
    return counter;
}