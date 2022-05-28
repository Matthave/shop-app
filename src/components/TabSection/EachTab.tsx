
const EachTab: React.FC<{
    currentMonthAndDay: any, 
    category: any,
    currentTabHandler: (tabName: string) => void,
}> = ({currentMonthAndDay, category, currentTabHandler}) => {
    const { currentDay } = currentMonthAndDay;

    const { name: categoryName, color: categoryColor } =  currentDay[category.name];
    const { name: tabName, url, active: tabActive } = category;
    return (
        <>
            {categoryName !== '' && 
                <div style={{backgroundColor: categoryColor}} 
                className={`tab__category ${tabActive ? 'tab__category--active' : ''}`} 
                onClick={() => currentTabHandler(tabName)}>
                    {tabName} 
                    <div style={{backgroundColor: categoryColor}} className='tab__recipe'></div>
                </div>
            }
        </>
    )
}

export default EachTab;