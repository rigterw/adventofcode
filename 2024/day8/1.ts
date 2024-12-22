module.exports = {
    main: main
};

interface pos {
    x: number,
    y: number
}
const hashMap = {};

const map: string[][] = [];
export function main(input: string[]): any {
    let counter = 0;
    ReadMap(input);
    for (const key in hashMap) {
        const positions: pos[] = hashMap[key];
        for (let i = 0; i < positions.length - 1; i++) {
            for (let j = i + 1; j < positions.length; j++) {
                const dX = positions[i].x - positions[j].x;
                const dY = positions[i].y - positions[j].y;
                const pos: pos[] = [
                    { x: positions[i].x + dX, y: positions[i].y + dY },
                    { x: positions[j].x - dX, y: positions[j].y - dY }
                ]

                for (let p = 0; p < pos.length; p++) {
                    const ps = pos[p];
                    if (ps.x < 0 || ps.y < 0 || ps.y >= map.length || ps.x >= map[ps.y].length)
                        continue;
                    if (map[ps.y][ps.x] != "#") {
                        counter++;
                        map[ps.y][ps.x] = "#";
                    }
                }
            }
        }
    }

    return counter;
}


function ReadMap(input: string[]) {
    for (let j = 0; j < input.length; j++) {
        const row = input[j].split('').filter(char => char !== "\r");
        for (let i = 0; i < row.length; i++) {
            if (row[i] == '.') {
                continue;
            }

            const pos: pos = { x: i, y: j };
            if (hashMap[row[i]] == undefined) {
                hashMap[row[i]] = [pos];
            } else {
                hashMap[row[i]].push(pos);
            }
        }
        map.push(row);
    }

}