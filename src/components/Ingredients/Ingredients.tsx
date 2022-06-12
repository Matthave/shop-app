import { IngredientsType } from "../../Types/types";
import EachIngredient from "./EachIngredient";
import { v4 as uuidv4 } from 'uuid';

const Ingredients: React.FC <{ ingredients: IngredientsType[]}> = ({ingredients}) => {

    const ingredientsList = ingredients.map((ing: IngredientsType) => {
        return <EachIngredient key={uuidv4()} ing={ing}/>
    });

    return <div className="ingredients">
        <p className="ingredients__title">Shopping List</p>
        {ingredientsList.length === 0 ? 
            <p className='generate__placeholder'>Your shopping list is empty</p> 
            :
            <ul className="ingredients__ul">
                {ingredientsList}
            </ul>
        }
    </div>
}

export default Ingredients;