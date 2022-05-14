import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Days } from "../../../Types/types";

const CalendarSlider: 
React.FC<{
    currentMonth: {days: Days[], id: string, month: string},
    currentYear: number,
    calendarSliderFunc: (direction: string) => void }
    > = ({currentMonth, currentYear, calendarSliderFunc}) => {
    return <div className='calendar__slider'>
        <div className='calendar__slider--arrow' onClick={() => calendarSliderFunc('left')}><FontAwesomeIcon icon={faArrowLeft} /></div>
            <div className='calendar__slider--value'>
                <span className='calendar__slider--month'>{currentMonth.month}</span>
                <span className='calendar__slider--year'>{currentYear}</span>
            </div>
        <div className='calendar__slider--arrow' onClick={() => calendarSliderFunc('right')}><FontAwesomeIcon icon={faArrowRight} /></div>
    </div>
}

export default CalendarSlider;