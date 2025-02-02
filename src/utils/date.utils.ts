/**
 * @example
 *
 * input: 2023-05-30T00:00:00+02:00
 *
 * output: "29 December, 23:00 " (format depend on lang)
 *
 */
export const getFullDateFromISO = (isoString: string) => {
    const date = new Date(isoString);

    const formatter = new Intl.DateTimeFormat('IT-it', {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });

    return formatter.format(date);
};

/**
 *
 * @param date
 * @returns
 */
export const dateFormatter = (date: Date) => {
    const formatter = new Intl.DateTimeFormat('it-IT', {
        year: 'numeric',
        month: 'long',
    });

    const formattedDate = formatter.format(date);

    return formattedDate;
};

export const weekDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
