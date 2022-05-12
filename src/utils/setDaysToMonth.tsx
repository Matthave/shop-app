export const setDaysToMonth = (daysNumber: number) => {
const daysArrToMap = Array.from(Array(daysNumber).keys());
const monthsDaysMaped = daysArrToMap.map((ele) => {
    return { id: ele, breakfast: '', branch: '', lunch: '', tea: '', dinner: ''}
});

return monthsDaysMaped;
};