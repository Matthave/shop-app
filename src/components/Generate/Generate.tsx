import { useState } from 'react';
import { NewMeal } from '../../Types/types';
import Tooltip from './Tooltip/Tooltip';
import { v4 as uuidv4 } from 'uuid';

const Generate: React.FC <{ chosenMeals: any, ingredientsLoaderFunc: any }> = ({chosenMeals, ingredientsLoaderFunc}) => {
    const [ showTooltip, setShopTooltip ] = useState ({id: -1, visibility: false});
    const generateShoppingList = () => {
        let query = '';
        chosenMeals.map((meal: any, index: number) => {
            const mealStringIds = meal.id.toString();
            if (index === 0) query = `meal=${mealStringIds}`;
            else query += `&meal=${mealStringIds}`;
        });

        const generateRequest = async () => {
            try{
                const response = await fetch(`https://itsolutions.hopto.org/api/meals/generate?${query}`);
                const data = await response.json();
                ingredientsLoaderFunc(data?.ingredients);
            }catch(err){
                console.error(err)
            }
        }

        generateRequest();
    }

    const trimString = (name: string) => {
        if (name.includes('video')){
            const splitName = name.split('-');
            return splitName[0].trim();
        }
        return name;
    }

    const pointerDownHandler = (meal: NewMeal, index: number) => {
        setShopTooltip((prevState) => {
            return { id: index, visibility: !prevState.visibility }
        })
    };

    const pointerLeaveHandler = () => {
        setShopTooltip({id: -1, visibility: false})
    };

    const mealsList = chosenMeals.map((meal: NewMeal, index: number) => {
        return <li onPointerEnter={() => pointerDownHandler(meal, index)} onPointerLeave={pointerLeaveHandler} className='generate__li'>
            {trimString(meal.name)}{showTooltip.visibility && showTooltip.id === index && <Tooltip meal={meal}/>}
            </li>
    })
    return <div className="generate">
        <p className='generate__title'>Meal List</p>
        {mealsList.length === 0 ? 
            <p className='generate__placeholder'>Add some meal</p> 
            : 
            <>
                <ul className="generate__ul">
                    {mealsList}
                </ul>
                <button onClick={generateShoppingList} className='generate__btn'>Generate shopping list</button>
            </>
        }
    </div>
}

export default Generate;