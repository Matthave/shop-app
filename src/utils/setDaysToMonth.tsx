export const setDaysToMonth = (daysNumber: number) => {
const daysArrToMap = Array.from(Array(daysNumber).keys());
const monthsDaysMaped = daysArrToMap.map((ele) => {
    return { active: false, id: ele, 
    breakfast: { id: 0, name: '', url: '' },
     brunch: { id: 0, name: '', url: '' },
     lunch: { id: 0, name: '', url: '' },
     snacks: { id: 0, name: '', url: '' },
     dinner: { id: 0, name: '', url: '' }}
});

return monthsDaysMaped;
};