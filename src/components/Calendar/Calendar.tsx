import { useState, useEffect } from "react";
import CalendarSlider from "./CalendarSlider/CalendarSlider";
import { prepareDayFormat } from "../../utils/prepareDateFormat";

const d = new Date();
const Calendar: React.FC = () => {
    const [month, setMonth] = useState(String(d.getMonth() + 1).padStart(2, '0'));
    const [year, setYear] = useState(d.getFullYear());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState({id: 0, value: 'Mon'});
    const markCurrentDay =  prepareDayFormat(d.getMonth() + 1) === month;
    const day = String(d.getDate()).padStart(2, '0');
    const isLeapYear = year % 4 === 0;

    const daysArr = [
        {id: 0, value: 'Mon'},
        {id: 1, value: 'Tue'},
        {id: 2, value: 'Wed'},
        {id: 3, value: 'Thu'},
        {id: 4, value: 'Fri'},
        {id: 5, value: 'Sat'},
        {id: 6, value: 'Sun'}
    ];

    useEffect(() => {
        const fullDate = new Date(year, parseInt(month) - 1, 1, 0);
        const dayOfDate = fullDate.toString().split(' ')[0];
        const numberOfVoidDays = daysArr.filter((day) => day.value === dayOfDate);
        setFirstDayOfMonth(numberOfVoidDays[0]);
     }, [year, month]);

     const calendarSliderFunc = (direction: string) => {
        let anotherMonth = direction === 'right' ? parseInt(month) + 1 : parseInt(month) - 1;
        let anotherMonthPrepString = prepareDayFormat(anotherMonth);

        if(anotherMonthPrepString === '13') {
            setYear((prevState) => {
                return prevState + 1;
            });
            return setMonth('01');
        };

        if(anotherMonthPrepString === '00'){
            setYear((prevState) => {
                return prevState - 1;
            });
            return setMonth('12');
        };

        setMonth(anotherMonthPrepString)
     }

     const monthsArr = [
        { id: '01', month: 'Jan', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
        { id: '02', month: 'Feb', days: isLeapYear ? 
        Array.from(Array(29 + firstDayOfMonth.id).keys()) 
        : Array.from(Array(28 + firstDayOfMonth.id).keys()) },
        { id: '03', month: 'Mar', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
        { id: '04', month: 'Apr', days: Array.from(Array(30 + firstDayOfMonth.id).keys()) },
        { id: '05', month: 'May', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
        { id: '06', month: 'Jun', days: Array.from(Array(30 + firstDayOfMonth.id).keys()) },
        { id: '07', month: 'Jul', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
        { id: '08', month: 'Aug', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
        { id: '09', month: 'Sep', days: Array.from(Array(30 + firstDayOfMonth.id).keys()) },
        { id: '10', month: 'Oct', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
        { id: '11', month: 'Nov', days: Array.from(Array(30 + firstDayOfMonth.id).keys()) },
        { id: '12', month: 'Dec', days: Array.from(Array(31 + firstDayOfMonth.id).keys()) },
    ];

    const currentMonth = monthsArr.find((currMonth) => currMonth.id === month);

    return (
        <div className='calendar'>
        <CalendarSlider 
        currentMonth={monthsArr.filter((ele) => ele.id === month)[0]} 
        currentYear={year} 
        calendarSliderFunc={calendarSliderFunc}/>
            <ul className='calendar__list'>
                <li className='calendar__weekDay'>Mon</li>
                <li className='calendar__weekDay'>Tue</li>
                <li className='calendar__weekDay'>Wed</li>
                <li className='calendar__weekDay'>Thu</li>
                <li className='calendar__weekDay'>Fri</li>
                <li className='calendar__weekDay'>Sat</li>
                <li className='calendar__weekDay'>Sun</li>
            </ul>
            <ul className="calendar__list">
                {currentMonth!.days instanceof Array ? currentMonth!.days.map((ele, index) => {
                    if (firstDayOfMonth.value !== 'Mon' && firstDayOfMonth.id - 1 >= index ) 
                    return <li key={`empty__${index}`} className='calendar__item calendar__item--empty'></li>
                    else return (
                        <li className={`calendar__item ${(index - (firstDayOfMonth.id + 1)) === parseInt(day) && markCurrentDay ? 'calendar__item--currentDay' : ''}`} 
                        key={index + 1}>{index - firstDayOfMonth.id + 1}</li>
                      )
                }) : '' }
            </ul>
        </div>
    )
}

export default Calendar;