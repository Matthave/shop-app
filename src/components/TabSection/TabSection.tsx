import { useState, useEffect } from "react";
import { ModalData } from "../../Types/types";
import { getCurrentMonthAndDay } from "../../utils/getCurrentMonthAndDay";
import EachTab from "./EachTab";

const EachMealTab: React.FC<{
    modalData: ModalData
}> = ({modalData}) => {
    const [categories, setCategories] = useState([]);
    const [currentMonthAndDay, setCurrentMonthAndDay] = useState <any>();
    useEffect(() => {
        const getCategoryRequest = async () => {
            try{
                const response = await fetch('https://itsolutions.hopto.org/api/meals/categories');
                const data = await response.json();
                setCategories(data);
            }catch(err){
                console.error(err)
            }
        };
        getCategoryRequest();
        setCurrentMonthAndDay(getCurrentMonthAndDay(modalData));

    }, [modalData]);

    return <div className='tab'>
        {categories.map((category: {name: string, url: string}) => {
            return <EachTab key={category.name} currentMonthAndDay={currentMonthAndDay} category={category}/>
        })}
    </div>
}

export default EachMealTab;