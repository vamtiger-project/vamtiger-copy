import Args from 'vamtiger-argv/build/main';
import getHelp from 'vamtiger-commandline-help';
import { CommandlineArguments, ShortCommandlineArguments, CommandlineArgumentsDescription } from './types';
import copy from './copy';

const args = new Args();
const source = args.get(CommandlineArguments.source)
    || args.get(ShortCommandlineArguments.source);
const destination = args.get(CommandlineArguments.destination)
    || args.get(ShortCommandlineArguments.destination);
const exclude = args.get(CommandlineArguments.exclude)
    || args.get(ShortCommandlineArguments.exclude);
const help = args.get(CommandlineArguments.help)
    || args.get(ShortCommandlineArguments.help);

if (help) {
    logHelp();
} else if (source && destination) {
    copy({source, destination, exclude}).catch(handleError);
}

function logHelp() {
    const helpText = getHelp({
        args: CommandlineArguments,
        short: ShortCommandlineArguments,
        description: CommandlineArgumentsDescription
    });

    console.log(helpText);
}

function handleError(error: Error) {
    console.error(error);
    process.exit(1);
}

export { default as copy } from './copy';