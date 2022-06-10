import { NewMeal } from '../../../Types/types';

const Tooltip: React.FC <{
    meal: NewMeal
}> = ({meal}) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return <div className='tooltip' ><span className='tooltip__mealType'>{capitalizeFirstLetter(meal.mealType)}</span> 
    for the day: <span className='tooltip__date'>{meal.mealDate.fullDate}</span>
    </div>
}

export default Tooltip;