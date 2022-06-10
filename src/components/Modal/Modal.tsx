import { Dispatch, useEffect, useState } from 'react';
import { ModalPropMonthData, ModalPropMonthArrData, NewMeal } from '../../Types/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Loader from "../Loader/Loader";

type Categories = {
    name: string,
    url: string
}

type mealCategoryType = {
    name: string, 
    meals: {}[]
}

const colors = {
    breakfast: '#DBA5E1',
    brunch: '#FFA5C9',
    lunch: '#FFB3A0',
    snacks: '#FFD279',
    dinner: '#F9F871'
}

const Modal: React.FC <{
    modalData: { 
        modalVisibility: boolean,
        clickedMonthData: ModalPropMonthData, 
        monthData: ModalPropMonthArrData
    }, 
    closeButton: () => void,
    setChosenMeal: Dispatch<any>,
    chosenMeals: any,
    }> = ({modalData, closeButton, setChosenMeal, chosenMeals}) => {
    const { clickedMonthData, monthData } = modalData;
    const [mealByCategories, setMealByCategories] = useState <mealCategoryType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getCategoryRequest = async () => {
            try{
                const response = await fetch('https://itsolutions.hopto.org/api/meals/categories');
                const data = await response.json();
                return data;
            }catch(err){
                console.error(err)
            }
        }

        const getEachCategory =  (categories: Categories[]) => {
            const requestHandler = async (url: string, name: string) => {
                try{
                    const response = await fetch(`https://itsolutions.hopto.org/${url}`);
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
                setTimeout(() => {
                    setIsLoading(false);
                }, 700);   
            }

            requestFunc();
        }

        const asyncFunc = async () => {
            const categories =  await getCategoryRequest();
            getEachCategory(categories)
        }

        asyncFunc();
    }, []);

    const mealItemClickHandler = (meal: string, mealType: string, mealId: number, mealUrl: string, mealCategory: string) => {
        const clickedCurrentMonthIndex = monthData.monthsArr.findIndex((ele: { id: string; month: string; days: any; }) => {
            return ele.month === clickedMonthData[1]
        });

        const copyMonthsArr = [...monthData.monthsArr];

        const colorAllowed = mealCategory === 'breakfast' ||
         mealCategory === 'brunch' ||
         mealCategory === 'lunch' || 
         mealCategory === 'snacks' || 
         mealCategory === 'dinner';

        const newMeal = {
            name: meal,
            id: mealId,
            url: mealUrl,
            color: colorAllowed ? colors[mealCategory] : '#DBA5E1'
        }
        const clickedCurrentDayMeals = copyMonthsArr[clickedCurrentMonthIndex].days[parseInt(clickedMonthData[0]) - 1];
        clickedCurrentDayMeals[mealType] = newMeal;
        const currentYear = document.querySelector('.calendar__slider--year')?.innerHTML;

        const newMealDate = { 
            day: clickedCurrentDayMeals.id + 1,
            month: copyMonthsArr[clickedCurrentMonthIndex].month, 
            year: currentYear, 
            fullDate: `${clickedCurrentDayMeals.id + 1} ${copyMonthsArr[clickedCurrentMonthIndex].month} ${currentYear}`
        };

        const newMealAlreadyExist = chosenMeals.findIndex((meal: NewMeal) => {
            const { mealDate, mealType: innerMealType } = meal;
            return mealDate.fullDate === newMealDate.fullDate 
            && innerMealType === mealType 
        });

        const exactlyThisMealExist = chosenMeals.findIndex((meal: NewMeal) => {
            const { mealDate, mealType: innerMealType, name, id } = meal;
            return mealDate.fullDate === newMealDate.fullDate 
            && innerMealType === mealType 
            && name === newMeal.name
            && id === newMeal.id
        });

        if ( newMealAlreadyExist === -1 ) {
            setChosenMeal((prevState: any) => {
                return [...prevState, {...newMeal, mealType, mealDate: newMealDate}];
            })
        } 
        
        if (newMealAlreadyExist !== -1 && exactlyThisMealExist === -1)  {
            setChosenMeal(() => {
                const copyChosenMealsArr = [...chosenMeals];
                copyChosenMealsArr.splice(newMealAlreadyExist, 1);
                return [...copyChosenMealsArr, {...newMeal, mealType, mealDate: newMealDate}];
            })
        }
    };

    const currentBreakfastMeal = monthData.monthsArr;
    const currentMonthDays = currentBreakfastMeal.find(ele => ele.month === clickedMonthData[1])?.days;
    const currentDaysMeal = currentMonthDays[parseInt(clickedMonthData[0]) - 1];

    const findProperlyMeal = (mealType: string) => {
        return currentDaysMeal[mealType].name !== '' ? currentDaysMeal[mealType].name : 'Choose'
    }

    const deleteChoosenMeal = (category: {name: string, meals: []}) => {
        const currentYear = document.querySelector('.calendar__slider--year')?.innerHTML;
        const clickedCurrentMonthIndex = monthData.monthsArr.findIndex((ele: { id: string; month: string; days: any; }) => {
            return ele.month === clickedMonthData[1]
        });
        const copyMonthsArr = [...monthData.monthsArr];
        const clickedCurrentDayMeals = copyMonthsArr[clickedCurrentMonthIndex].days[parseInt(clickedMonthData[0]) - 1];
        
        const fullDate = `${clickedCurrentDayMeals.id + 1} ${copyMonthsArr[clickedCurrentMonthIndex].month} ${currentYear}`;
        const mealsIndexToDelete = chosenMeals.findIndex((meal: NewMeal) => {
            const { mealDate, mealType, name, id } = meal;
            return mealDate.fullDate === fullDate 
            && mealType === category.name 
            && id === clickedCurrentDayMeals[category.name].id 
            && name === clickedCurrentDayMeals[category.name].name
        });
        chosenMeals.splice(mealsIndexToDelete, 1);

        clickedCurrentDayMeals[category.name] = {
            name: '',
            id: '',
            url: '',
            color: ''
        };

        setChosenMeal(() => {
            return [...chosenMeals];
        });
    }

    return <div className={`modal ${!isLoading ? 'modal--onPosition' : ''}`}>
        {isLoading && <Loader/>}
        {!isLoading && 
            <>
                <button className='modal__close' onClick={closeButton}><FontAwesomeIcon icon={faXmark} /></button>
                <div className="modal__header">{`${clickedMonthData[1]} ${clickedMonthData[0]}`}</div>
                {mealByCategories.map((category: any) => {
                return (
                    <div key={category.name} className={`modal__${category.name} modal__meal`}>
                        <div className='modal__buttonsWrap'>
                            <button className='modal__button'>{findProperlyMeal(category.name)}</button>
                            {findProperlyMeal(category.name) !== 'Choose' && <button onClick={() => deleteChoosenMeal(category)} className='modal__buttonsWrap--close'><FontAwesomeIcon icon={faXmark} /></button>}
                        </div>
                        <ul className='modal__ul'>
                            {category.meals.map((meal: any) => {
                                const activeMeal = findProperlyMeal(category.name) === meal.name ? `modal__li--${meal.category}--active` : '';
                                return <li key={`${meal.name}-${meal.category}`} className={`modal__li modal__li--${meal.category} ${activeMeal}`} onClick={() => mealItemClickHandler(meal.name, meal.category, meal.id, meal.url, meal.category)}>{meal.name}</li>
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