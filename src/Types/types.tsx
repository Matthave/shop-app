import { Dispatch, SetStateAction } from "react";

export type ModalPropMonthData = string[];

export type ModalPropMonthArrData = {
    monthsArr: { id: string, month: string, days: any }[],
    setMonthsArr: Dispatch<SetStateAction<{ id: string; month: string; days: Days[]; }[]>>
}

export type eachMealData = {
    id: number,
    name: string,
    url: string
}

export type Days = {
    active: boolean,
    id: number,
    breakfast: eachMealData,
    brunch: eachMealData,
    lunch: eachMealData,
    snacks: eachMealData,
    dinner: eachMealData
}; 


export type ModalData = {
    modalVisibility: boolean,
    clickedMonthData: ModalPropMonthData, 
    monthData: ModalPropMonthArrData
}

export type dish = {
    id: number,
    ingredients: {}[],
    name: string,
    recipe: string,
    servings: number
}

export type NewMeal = {
    color: string,
    id: number,
    name: string,
    url: string
    mealType: string,
    mealDate: { day: number, month: string, year: string, fullDate: string }
}
