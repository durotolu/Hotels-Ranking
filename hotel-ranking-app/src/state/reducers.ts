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
  hotelModalIsOpen: boolean;
}

export const getInitialState = (): State => ({
  hotels: [
    {
      name: "Some Hotle",
      country: "Nigeria",
      address: "123 Adr road",
    },
    {
      name: "Some Hotle",
      country: "Nigeria",
      address: "123 Adr road",
    },
    {
      name: "Some Hotle",
      country: "Nigeria",
      address: "123 Adr road",
    },
    {
      name: "Some Hotle",
      country: "Nigeria",
      address: "123 Adr road",
    },
  ],
  categories: [],
  hotelModalIsOpen: false
});

export const appSlice = createSlice({
  name: "rankings",
  initialState: getInitialState(),
  reducers: {
    click: (state, { payload }: PayloadAction<any>) => {
      // console.log("state", state.hotels)
      // console.log("payload", payload)
      state.hotels = [...state.hotels, payload];
    },
    toggleHotelModal: (state) => {
      state.hotelModalIsOpen = !state.hotelModalIsOpen;
    },
  },
});

export const { actions, reducer } = appSlice;
