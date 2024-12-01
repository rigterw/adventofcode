async function loadScript(day: number, part: number) {
    try {
        const script = await require(`./day${day}/${part}.ts`);
        script.main();
    } catch (error) {
        console.error(error);
    }
}

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error("not all values set");
    process.exit(0);
}

loadScript(Number(args[0]), Number(args[1]));