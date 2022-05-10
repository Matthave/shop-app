export const prepareDayFormat = (dateElement: number) => {
    return dateElement <= 9 ? `0${dateElement}` : dateElement.toString()
};