// import { Action } from "@reduxjs/toolkit";
// import * as types from "./actionTypes";
import {
  createSlice,
  PayloadAction,
  ThunkAction,
  AnyAction,
} from "@reduxjs/toolkit";

export interface State {
  hotels: Array<any>;
  categories: [];
}

export const getInitialState = (): State => ({
  hotels: [],
  categories: [],
});

export const appSlice = createSlice({
  name: "rankings",
  initialState: getInitialState(),
  reducers: {
    click: (state, { payload }: PayloadAction<any>) => {
      // console.log("state", state.hotels)
      // console.log("payload", payload)
      state.hotels = [
        ...state.hotels,
        payload
      ]
    }
  },
});

export const { actions, reducer } = appSlice;
