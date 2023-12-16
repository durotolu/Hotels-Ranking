import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Hotel {
  name: string;
  country: string;
  address: string;
  category: string;
  id: string;
}
export interface Category {
  deletable: boolean;
  name: string;
  id: string;
}
export interface Country {
  name: any;
  id: any;
}

export interface State {
  hotels: Array<Hotel>;
  categories: Array<Category>;
  countries: Array<Country>;
  hotelModalIsOpen: boolean;
  activeHotel: Hotel;
  activeCategory: Category;
  isEditMode: boolean;
  categoriesModalIsOpen: boolean;
}

export const getInitialState = (): State => ({
  hotels: [],
  countries: [],
  categories: [
    { deletable: false, name: "1 Star", id: "1 Star" },
    { deletable: false, name: "2 Star", id: "2 Star" },
    { deletable: false, name: "3 Star", id: "3 Star" },
  ],
  hotelModalIsOpen: false,
  activeHotel: { name: "", country: "", address: "", category: "", id: "" },
  activeCategory: { id: "", deletable: false, name: "" },
  isEditMode: false,
  categoriesModalIsOpen: false,
});

export const appSlice = createSlice({
  name: "rankings",
  initialState: getInitialState(),
  reducers: {
    addHotel: (state, { payload }: PayloadAction<Hotel>) => {
      state.hotels = [
        ...state.hotels,
        {
          ...payload,
          id: `${payload.name}-${payload.address}-${state.hotels.length}`,
        },
      ];
    },
    editHotel: (state, { payload }: PayloadAction<Hotel>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => hotel.id !== payload.id
      );
      state.hotels = [...filteredHotels, payload];
    },
    toggleHotelModal: (state) => {
      state.hotelModalIsOpen = !state.hotelModalIsOpen;
    },
    inputChangeHotel: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      state.activeHotel = {
        ...state.activeHotel,
        [payload.name]: payload.value,
      };
    },
    inputChangeCategory: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: string;
        value: string;
      }>
    ) => {
      state.activeCategory = {
        ...state.activeCategory,
        [payload.name]: payload.value,
      };
    },
    setSelectedHotel: (state, { payload }: PayloadAction<Hotel>) => {
      console.log(payload)
      state.activeHotel = {
        ...payload,
      };
    },
    setEditMode: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditMode = payload;
    },
    toggleCategoriesModal: (state) => {
      state.categoriesModalIsOpen = !state.categoriesModalIsOpen;
    },
    deleteHotel: (state, { payload }: PayloadAction<string>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => hotel.id !== payload
      );
      state.hotels = [...filteredHotels];
    },
    selectCategory: (state, { payload }: PayloadAction<Category>) => {
      if (payload.id === state.activeCategory.id) {
        state.activeCategory = {
          ...getInitialState().activeCategory,
        };
      } else {
        state.activeCategory = {
          ...payload,
        };
      }
    },
    editCategory: (state, { payload }: PayloadAction<Category>) => {
      const mappedCategories = state.categories.map((category) => {
        console.log(category.id, payload.id);
        if (category.id === payload.id) {
          return {
            ...payload,
            id: payload.name,
          };
        } else return category;
      });
      state.categories = [...mappedCategories];
    },
    addCategory: (state, { payload }: PayloadAction<Category>) => {
      state.categories = [
        ...state.categories,
        {
          ...payload,
          id: payload.name,
          deletable: true,
        },
      ];
    },
    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => {
          console.log(hotel.name, payload)
          return hotel.category !== payload
        }
      );
      state.hotels = [...filteredHotels];
      const filteredCategories = state.categories.filter(
        (category) => category.id !== payload
      );
      state.categories = [...filteredCategories];
    },
    setCountries: (state, { payload }: PayloadAction<Array<Country>>) => {
      state.countries = [...payload];
    },
  },
});

export const { actions, reducer } = appSlice;
