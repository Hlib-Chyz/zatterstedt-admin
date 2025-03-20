export const formatDates = <T extends { date: string | Date }>(array: T[]): T[] => {
    return array.map((inv) => {
        const date = new Date(inv.date);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const formattedDate = date.toISOString().split('T')[0]!;
        return { ...inv, date: formattedDate };
    });
};
