import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  hotels: Array<any>;
  categories: Array<any>;
  hotelModalIsOpen: boolean;
  activeHotel: any;
  isEditMode: boolean;
  categoriesModalIsOpen: boolean;
}

export const getInitialState = (): State => ({
  hotels: [],
  categories: [
    { deletable: false, selected: false, name: "1 Star" },
    { deletable: false, selected: false, name: "2 Star" },
    { deletable: false, selected: false, name: "3 Star" },
  ],
  hotelModalIsOpen: false,
  activeHotel: { name: "", country: "", address: "" },
  isEditMode: false,
  categoriesModalIsOpen: false,
});

export const appSlice = createSlice({
  name: "rankings",
  initialState: getInitialState(),
  reducers: {
    addHotel: (state, { payload }: PayloadAction<any>) => {
      state.hotels = [
        ...state.hotels,
        {
          ...payload,
          id: `${payload.name}-${payload.address}-${state.hotels.length}`,
        },
      ];
    },
    editHotel: (state, { payload }: PayloadAction<any>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => hotel.id !== payload.id
      );
      state.hotels = [...filteredHotels, payload];
    },
    toggleHotelModal: (state) => {
      state.hotelModalIsOpen = !state.hotelModalIsOpen;
    },
    inputChange: (state, { payload }: PayloadAction<any>) => {
      state.activeHotel = {
        ...state.activeHotel,
        [payload.name]: payload.value,
      };
    },
    setSelectedHotel: (state, { payload }: PayloadAction<any>) => {
      state.activeHotel = {
        ...payload,
      };
    },
    setEditMode: (state, { payload }: PayloadAction<any>) => {
      state.isEditMode = payload;
    },
    toggleCategoriesModal: (state) => {
      state.categoriesModalIsOpen = !state.categoriesModalIsOpen;
    },
    deleteHotel: (state, { payload }: PayloadAction<any>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => hotel.id !== payload
      );
      state.hotels = [...filteredHotels];
    },
    editCategory: (state, { payload }: PayloadAction<any>) => {
      // const filteredCategories = state.categories.filter(
      //   (category) => category.name !== payload.name
      // );
      console.log("payload", payload);
      // state.categories = [
      //   ...filteredCategories,
      //   payload
      // ];
      const mappedCategories = state.categories.map((category) => {
        if (category.name === payload.name) {
          return payload;
        } else {
          return ({
            ...category,
            selected: false,
          });
        }
      });
      state.categories = [...mappedCategories];
    },
  },
});

export const { actions, reducer } = appSlice;
