import { Util } from './util';

async function loadScript(day: number, part: number) {
    try {
        const script = await import(`./day${day}/${part}.ts`);
        return script;
    } catch (error) {
        console.error(error);
        return null
    }
}


async function main() {
    const args = process.argv.slice(2);

    if (args.length == 0) {
        console.error("not all values set");
        process.exit(0);
    }

    const day = Number(args[0]);
    const part = args.length > 1 ? Number(args[1]) : 0;
    const fileName = args.length > 2 ? args[2] : "input";
    const input = Util.getInput(day, args[2]);
    const script = await loadScript(day, part);
    const startTime = performance.now();
    console.log(script.main(input));
    console.log(`script executed in ${performance.now() - startTime}ms`);
}

main();