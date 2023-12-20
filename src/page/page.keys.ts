export enum KEY {
    BACKSPACE = 'BACKSPACE'
}

export const toKeyEnum = (key:string) => {
    const upperKey = key.toUpperCase();
    return KEY[upperKey as keyof typeof KEY];
}