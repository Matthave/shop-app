import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ModalPropMonthData, ModalPropMonthArrData } from '../../Types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Loader from "../Loader/Loader";

type Categories = {
    name: string,
    url: string
}

const Modal: React.FC <{
    modalData: { 
        modalVisibility: boolean,
        clickedMonthData: ModalPropMonthData, 
        monthData: ModalPropMonthArrData
    }, 
    closeButton: () => void}> = ({modalData, closeButton}) => {
    const { clickedMonthData, monthData } = modalData;
    const [flag, setFlag] = useState(false);
    const [mealByCategories, setMealByCategories] = useState <any>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getCategoryRequest = async () => {
            try{
                const response = await fetch('http://itsolutions.hopto.org/api/meals/categories/');
                const data = await response.json();
                return data;
            }catch(err){
                console.error(err)
            }
        }

        const getEachCategory =  (categories: Categories[]) => {
            const requestHandler = async (url: string, name: string) => {
                try{
                    const response = await fetch(`http://itsolutions.hopto.org/${url}`);
                    const data = await response.json();
                    const copyData = data.map((ele: any) => {
                        return {...ele, active: ele.active ? ele.active : false};
                    });
                    setMealByCategories((prevState: any) => {
                        return [...prevState, {name, meals: [...copyData]}]
                    })
                }catch(err){
                    console.error(err)
                }
            }
            const requestFunc = async () => {
                setIsLoading(true);
                await requestHandler(categories[0].url, categories[0].name);
                await requestHandler(categories[1].url, categories[1].name);
                await requestHandler(categories[2].url, categories[2].name);
                await requestHandler(categories[3].url, categories[3].name);
                await requestHandler(categories[4].url, categories[4].name);
                setIsLoading(false);
            }

            requestFunc();
        }

        const asyncFunc = async () => {
            const categories =  await getCategoryRequest();
            getEachCategory(categories)
        }

        asyncFunc();
    }, []);

    const mealItemClickHandler = (meal: string, mealType: string) => {
        const clickedCurrentMonthIndex = monthData.monthsArr.findIndex((ele: { id: string; month: string; days: any; }) => {
            return ele.month === clickedMonthData[1]
        });

        const copyMonthsArr = [...monthData.monthsArr];
        const clickedCurrentDayMeals = copyMonthsArr[clickedCurrentMonthIndex].days[parseInt(clickedMonthData[0]) - 1];
        clickedCurrentDayMeals[mealType] = meal;

        setFlag((prevState) => {
            return !prevState;
        })
    };

    const currentBreakfastMeal = monthData.monthsArr;
    const currentMonthDays = currentBreakfastMeal.find(ele => ele.month === clickedMonthData[1])?.days;
    const currentDaysMeal = currentMonthDays[parseInt(clickedMonthData[0]) - 1];

    const findProperlyMeal = (mealType: string) => {
        return currentDaysMeal[mealType] !== '' ? currentDaysMeal[mealType] : 'Choose'
    }

    return <div className='modal'>
        {isLoading && <Loader/>}
        {!isLoading && 
            <>
                <button className='modal__close' onClick={closeButton}><FontAwesomeIcon icon={faXmark} /></button>
                <div className="modal__header">{`${clickedMonthData[1]} ${clickedMonthData[0]}`}</div>
                {mealByCategories.map((category: any) => {
                return (
                    <div key={category.name} className={`modal__${category.name} modal__meal`}>
                        <button className='modal__button'>{findProperlyMeal(category.name)}</button>
                        <ul className='modal__ul'>
                            {category.meals.map((meal: any) => {
                                return <li key={`${meal.name}-${meal.category}`} className={`modal__li modal__li--${meal.category}`} onClick={() => mealItemClickHandler(meal.name, meal.category)}>{meal.name}</li>
                            })}
                        </ul>
                    </div> 
                )
                })}
            </>
        }
    </div>
}

export default Modal;