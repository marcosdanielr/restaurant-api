const timeFormatRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const validateTimeFormat = (time: string) => timeFormatRegex.test(time);
