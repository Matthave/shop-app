import React, { useState, useReducer, useCallback } from 'react';
import "./css/styles.min.css"
import Calendar from './components/Calendar/Calendar';
import Modal from './components/Modal/Modal';
import { ModalPropMonthData, ModalPropMonthArrData, NewMeal, IngredientsType } from './Types/types';
import { clearActiveDays } from './utils/clearActiveDays';
import TabSection from './components/TabSection/TabSection';
import Generate from './components/Generate/Generate';
import Ingredients from './components/Ingredients/Ingredients';

const modalInitialState = {
modalVisibility: false,
clickedMonthData: [],
monthData: {}
};

const modalReducer = (state:any, action: { type: string, payload?: any }) => {
  switch (action.type) {
    case 'updateData':
      const {clickedMonthData, monthData} = action.payload;
      return {modalVisibility: state.modalVisibility, clickedMonthData, monthData}
    default:
      throw new Error();
  }
}

const App: React.FC = () => {
  const [modalVisibility, setModalVisibility ] = useState(false);
  const [modalData, disptachModalData] = useReducer(modalReducer, modalInitialState);
  const [chosenMeals, setChosenMeal] = useState <NewMeal[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsType[]>([]);
  const modalVisibilityHandler = useCallback((clickedMonthData: ModalPropMonthData, monthData: ModalPropMonthArrData) => {
    disptachModalData({type: 'updateData', payload: {clickedMonthData, monthData}})
    const asyncShowModal = async () => {
      await setModalVisibility(true);
      document.querySelector('.modal')!.scrollIntoView(); 
    }

    asyncShowModal();
  }, []);

  const closeButton = () => {
    const { monthsArr, setMonthsArr} = modalData.monthData;
    setModalVisibility(false);
    setMonthsArr(clearActiveDays(monthsArr));
  }

  const ingredientsLoaderFunc = (ing: []) => {
    setIngredients(ing)
  }

  return (
    <div className="App">
      <Calendar modalVisibilityHandler={modalVisibilityHandler} setModalVisibility={setModalVisibility}/>
      {modalVisibility && <Modal modalData={modalData} closeButton={closeButton} setChosenMeal={setChosenMeal} chosenMeals={chosenMeals}/>}
      {modalVisibility && <TabSection modalData={modalData}/>}
      <Generate chosenMeals={chosenMeals} ingredientsLoaderFunc={ingredientsLoaderFunc}/>
      <Ingredients ingredients={ingredients}/>
    </div>
  );
}

export default App;
