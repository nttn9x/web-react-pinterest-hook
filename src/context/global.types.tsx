import { Dispatch } from "react";
import { Record, List } from "immutable";

export const SHOW_DIALOG = "SHOW_DIALOG";
export const LOADING_DATA = "LOADING_DATA";
export const SET_DATAS = "SET_DATAS";

export interface IGlobalRecord {
  isLoading: boolean;
  datas: List<any>;
  indexSelected: number;
  textsearch: string;
}

const GlobalRecord: IGlobalRecord = {
  isLoading: false,
  datas: List([]),
  indexSelected: -1,
  textsearch: ""
};

export class IGlobalState extends Record(GlobalRecord) {}

// -------------------------------------------

export type IGlobalAction =
  | { type: typeof SHOW_DIALOG; index: number }
  | { type: typeof LOADING_DATA; textsearch: string; offset: number }
  | { type: typeof SET_DATAS; datas: any[] };

// -------------------------------------------

export interface IGlobalContext {
  state: any;
  dispatch: Dispatch<IGlobalAction>;
}
