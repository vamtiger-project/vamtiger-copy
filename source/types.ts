export enum StringConstant {
    slash = '/'
}

export enum CommandlineArguments {
    source = 'source',
    destination = 'destination',
    exclude = 'exclude',
    help = 'help'
}

export enum ShortCommandlineArguments {
    source = 's',
    destination = 'd',
    exclude = 'e',
    help = 'h'
}


export enum CommandlineArgumentsDescription {
    source = 'Source path',
    destination = 'Destination path',
    exclude = 'Patterns to exclude',
    help = 'List commandline options'
}

export interface ICopy {
    source: string;
    destination: string;
    exclude?: string;
    currentWorkingDirectory?: string;
}

export interface IGetGroupedFolders {
    paths: string[];
}