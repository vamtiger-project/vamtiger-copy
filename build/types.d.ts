export declare enum StringConstant {
    slash = "/"
}
export declare enum CommandlineArguments {
    source = "source",
    destination = "destination",
    exclude = "exclude",
    help = "help"
}
export declare enum ShortCommandlineArguments {
    source = "s",
    destination = "d",
    exclude = "e",
    help = "h"
}
export declare enum CommandlineArgumentsDescription {
    source = "Source path",
    destination = "Destination path",
    exclude = "Patterns to exclude",
    help = "List commandline options"
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
