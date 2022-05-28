import { useState, useEffect } from "react";
import { ModalData } from "../../Types/types";
import { getCurrentMonthAndDay } from "../../utils/getCurrentMonthAndDay";
import EachTab from "./EachTab";

type CategoriesEle = 
    {
        name: string,
        url: string,
        active?: boolean
    };

const EachMealTab: React.FC<{
    modalData: ModalData
}> = ({modalData}) => {
    const [categories, setCategories] = useState <CategoriesEle[]>([]);
    const [currentMonthAndDay, setCurrentMonthAndDay] = useState <any>();

    useEffect(() => {
        const getCategoryRequest = async () => {
            try{
                const response = await fetch('https://itsolutions.hopto.org/api/meals/categories');
                const data = await response.json();
                const dataMaped = data.map((ele: CategoriesEle) => {
                    return { ...ele, active: false }
                })
                setCategories((dataMaped));
            }catch(err){
                console.error(err)
            }
        };
        getCategoryRequest();
        setCurrentMonthAndDay(getCurrentMonthAndDay(modalData));

    }, [modalData]);

    const currentTabHandler = (tabName: string) => {
        const newCategoryTabData = categories?.map((tabCategory: CategoriesEle) => {
            const { name, active } = tabCategory;
            if (name === tabName) return { ...tabCategory, active: !active }
            return { ...tabCategory, active: false };
        });

        setCategories(newCategoryTabData);
    }

    return <div className='tab'>
        {categories?.map((category: {name: string, url: string}) => {
            return <EachTab 
            key={category.name} 
            currentMonthAndDay={currentMonthAndDay} 
            category={category}
            currentTabHandler={currentTabHandler}/>
        })}
    </div>
}

export default EachMealTab;