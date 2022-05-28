import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { LightenDarkenColor } from "../../utils/colorDarken";
import { dish } from "../../Types/types";

const initialDishesObj = {id: 0, ingredients: [], name: '', recipe: '', servings: 0};

const EachTab: React.FC<{
    currentMonthAndDay: any, 
    category: any,
    currentTabHandler: (tabName: string) => void,
}> = ({currentMonthAndDay, category, currentTabHandler}) => {
    const [dishInfo, setDishInfo] = useState <dish>(initialDishesObj)
    const { currentDay } = currentMonthAndDay;

    const { name: categoryName, color: categoryColor } =  currentDay[category.name];
    const { name: tabName, active: tabActive } = category;
    const currentDishUrl = currentMonthAndDay.currentDay[tabName].url;
    const currentLeadingColor = currentMonthAndDay.currentDay[tabName].color;

    useEffect(() => {
        const getDishRequest = async () => {
            try{
                const response = await fetch(`https://itsolutions.hopto.org/${currentDishUrl}`);
                const data = await response.json();
                setDishInfo(data);
            }catch(err){
                console.error(err)
            }
        };
        if (currentDishUrl) getDishRequest();
    }, [currentDishUrl]);

    const {name: dishName = '', servings = 0, recipe = '', ingredients = []} = dishInfo;
    const ingredientsRender = <ul className='tab__recipe--ingredients'>
          <p className='tab__recipe--ingredients--title' style={{backgroundColor: LightenDarkenColor(currentLeadingColor, -120)}}>Ingredients</p>
          <p className='tab__recipe--ingredients--title' style={{backgroundColor: LightenDarkenColor(currentLeadingColor, -120)}}>Servings for {servings}</p>
       {ingredients?.map((ing: any) => {
          const { ingredient, quantity, unit } = ing;
          return <li className='tab__recipe--ingredients--item' key={uuidv4()}>
              <p className="tab__recipe--ingredients--name" style={{backgroundColor: LightenDarkenColor(currentLeadingColor, -60)}}>{ingredient}</p>
              <p className="tab__recipe--ingredients--quantity" style={{backgroundColor: LightenDarkenColor(currentLeadingColor, -30)}}>{`${quantity} ${unit}`}</p>
          </li>
       })}
    </ul>;

    const recipeRender = <div className="tab__recipe--recipe">
         <p className='tab__recipe--ingredients--title' style={{backgroundColor: LightenDarkenColor(currentLeadingColor, -120)}}>Recipe</p>
         <p className='tab__recipe--recipe--text'>{recipe}</p>
    </div>

    const tabCategoryStyle = {
        borderTop: `1px solid ${LightenDarkenColor(categoryColor, -50)}`,
        borderLeft: `1px solid ${LightenDarkenColor(categoryColor, -50)}`,
        borderBottom: `1px solid ${LightenDarkenColor(categoryColor, -50)}`,
        backgroundColor: categoryColor
    };

    return (
        <>
            {categoryName !== '' && 
                <div style={tabCategoryStyle} 
                className={`tab__category ${tabActive ? 'tab__category--active' : ''}`} 
                onClick={() => currentTabHandler(tabName)}>
                    {tabName} 
                    <div style={{backgroundColor: categoryColor}} className='tab__recipe'>
                        <p className='tab__recipe--title' style={{backgroundColor: LightenDarkenColor(currentLeadingColor, -130)}}>{dishName}</p>
                        {ingredientsRender}
                        {recipeRender}
                    </div>
                </div>
            }
        </>
    )
}

export default EachTab;