import { useState } from "react";
import { IngredientsType } from "../../Types/types";
import Ingredients from "./Ingredients";

const EachIngredient: React.FC <{ ing: IngredientsType}> = ({ing}) => {
    const [ingState, setIngState] = useState(false);
    const ingListClickHandler = () => {
        setIngState((prevState) => !prevState);
    };

    return <li className={'ingredients__li'} onClick={ingListClickHandler}>
    <span className={`ingredients__name ${ingState ? 'ingredients__name--unActive' : ''}`}>{ing.ingredient}</span>
    <span className={`ingredients__unit ${ingState ? 'ingredients__unit--unActive' : ''}`}>{`${ing.quantity} ${ing.unit}`}</span>
</li>
}

export default EachIngredient;