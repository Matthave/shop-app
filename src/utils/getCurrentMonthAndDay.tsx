import { ModalData } from "../Types/types"

export const getCurrentMonthAndDay = (modalData: ModalData) => {
    const { monthData, clickedMonthData } = modalData;
    const currentMonthIndex = monthData.monthsArr.findIndex((month) => month.month === clickedMonthData[1]);
    const currentMonth = monthData.monthsArr[currentMonthIndex];
    const currentDay = currentMonth.days[parseInt(clickedMonthData[0]) - 1];
    
    return { currentMonth, currentDay }
}