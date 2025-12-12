const presents: number[] = [];
export function main(input: string[]): any {


    for (let i = 0; i <= 5; i++) {
        input.shift();
        let counter = 0;
        for (let j = 0; j < 3; j++) {
            const line = input.shift();

            for (let k = 0; k < line.length; k++) {
                if (line.charAt(k) == "#") {
                    counter++;
                }
            }
        }
        input.shift();
        presents.push(counter);
    }
    let counter = 0;
    for (const area of input) {

        if (checkArea(area)) {
            counter++;
        }
    }

    return counter;
}

function checkArea(area: string): boolean {
    area = area.replace(":", "");

    const areaData: string[] = area.split(" ");
    const areaDimensions: string[] = areaData.shift().split("x");
    const areaSize = +areaDimensions[0] * +areaDimensions[1];
    let requiredSize = 0;

    for (let presentType = 0; presentType < areaData.length; presentType++) {
        requiredSize += +areaData[presentType] * presents[presentType];
    }

    return requiredSize <= areaSize;

}