export type ColumnsFromData<T> = {
    field: keyof T extends string ? keyof T : never;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action?: (_: any) => void;
}[];
