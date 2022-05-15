import { useState } from "react";

const EachTab: React.FC<{
    currentMonthAndDay: any, 
    category: any,
}> = ({currentMonthAndDay, category}) => {
    const [ showCurrentTab, setShowCurrentTab ] = useState(false);
    const { currentDay } = currentMonthAndDay;

    const showCurrentTabfunc = () => {
        setShowCurrentTab((prevState) => {
            return !prevState;
        })
    }

    const { name: categoryName, color: categoryColor } =  currentDay[category.name];
    return (
        <>
            {categoryName !== '' && 
                <div style={{backgroundColor: categoryColor}} className={`tab__category ${showCurrentTab ? 'tab__category--active' : ''}`} onClick={showCurrentTabfunc}>
                    {category.name} 
                    <div style={{backgroundColor: categoryColor}} className='tab__recipe'></div>
                </div>
            }
        </>
    )
}

export default EachTab;