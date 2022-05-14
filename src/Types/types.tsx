import { Dispatch, SetStateAction } from "react";

export type ModalPropMonthData = string[];

export type ModalPropMonthArrData = {
    monthsArr: { id: string, month: string, days: any }[],
    setMonthsArr: Dispatch<SetStateAction<{ id: string; month: string; days: Days[]; }[]>>
}

export type Days = {
    active: boolean,
    id: number,
    breakfast: string,
    brunch: string,
    lunch: string,
    snacks: string,
    dinner: string
}; 