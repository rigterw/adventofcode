const util = require('./util');

async function loadScript(day: number, part: number, testdata: any) {
    try {
        const script = await require(`./day${day}/${part}`);
        const input = util.getInput(day, testdata == "true");
        console.log(script.main(input));
    } catch (error) {
        console.error(error);
    }
}

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("not all values set");
    process.exit(0);
}

loadScript(Number(args[0]), Number(args[1]), args[2]);