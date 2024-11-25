export type ColumnsFromData<T> = {
    field: keyof T extends string ? keyof T : never;
    name: string;
}[];
