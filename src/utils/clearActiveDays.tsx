export const clearActiveDays = (monthsArr: any) => {
    const clearedFromActiveDaysMonthArr = monthsArr.map((ele: any) => {
        ele.days.map((day: any) => {
            day.active = false
        })

        return ele;
    });

    return clearedFromActiveDaysMonthArr;
}