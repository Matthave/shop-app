export const setDaysToMonth = (daysNumber: number) => {
const daysArrToMap = Array.from(Array(daysNumber).keys());
const monthsDaysMaped = daysArrToMap.map((ele) => {
    return { active: false, id: ele, breakfast: '', brunch: '', lunch: '', snacks: '', dinner: ''}
});

return monthsDaysMaped;
};