const util = require('./util');

async function loadScript(day: number, part: number) {
    try {
        const script = await require(`./day${day}/${part}`);
        return script;
    } catch (error) {
        console.error(error);
    }
}


async function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.error("not all values set");
        process.exit(0);
    }

    const day = Number(args[0]);
    const part = Number(args[1]);
    const input = util.getInput(day, args[2]);
    const script = await loadScript(day, part);
    const startTime = performance.now();
    console.log(script.main(input));
    console.log(`script executed in ${performance.now() - startTime}ms`);
}

main();