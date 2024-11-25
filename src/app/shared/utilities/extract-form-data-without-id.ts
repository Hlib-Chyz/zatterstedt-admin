export function extractFormDataWithoutId<T>(formData: T & { _id: string }): Omit<T, '_id'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...rest } = formData;
    return rest;
}
