export function main(input: string[]): any {

    let pos: number = 50
    let counter = 0;

    for (let i = 0; i < input.length; i++) {
        let positiveDir: boolean = input[i].charAt(0) == "R";
        let number = +(input[i].substring(1));

        if (!positiveDir) {
            number *= -1;
        }

        pos += number;
        counter += pos % 100 == 0 ? 1 : 0;

    }
    return counter
}