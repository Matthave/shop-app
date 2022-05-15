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