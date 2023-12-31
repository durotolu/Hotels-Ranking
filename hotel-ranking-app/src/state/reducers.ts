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
  hotelsInitial: Array<Hotel>;
  hotels: Array<Hotel>;
  categories: Array<Category>;
  countries: Array<Country>;
  hotelModalIsOpen: boolean;
  activeHotel: Hotel;
  activeCategory: Category;
  isEditMode: boolean;
  categoriesModalIsOpen: boolean;
  filterBy: string;
}

export const getInitialState = (): State => ({
  hotelsInitial: [],
  hotels: JSON.parse(localStorage.getItem("hotels") as string) || [],
  countries: [],
  categories: JSON.parse(localStorage.getItem("categories") as string) || [
    { deletable: false, name: "1 Star", id: "1 Star" },
    { deletable: false, name: "2 Star", id: "2 Star" },
    { deletable: false, name: "3 Star", id: "3 Star" },
  ],
  hotelModalIsOpen: false,
  activeHotel: { name: "", country: "", address: "", category: "", id: "" },
  activeCategory: { id: "", deletable: false, name: "" },
  isEditMode: false,
  categoriesModalIsOpen: false,
  filterBy: "",
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
      localStorage.setItem("hotels", JSON.stringify(state.hotels))
    },
    editHotel: (state, { payload }: PayloadAction<Hotel>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => hotel.id !== payload.id
      );
      state.hotels = [...filteredHotels, payload];
      localStorage.setItem("hotels", JSON.stringify(state.hotels))
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
      localStorage.setItem("hotels", JSON.stringify(state.hotels))
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
      const mappedHotels = state.hotels.map((hotel) => {
        if (hotel.category === payload.id) {
          return {
            ...hotel,
            category: payload.name,
          };
        } else return hotel;
      });
      state.hotels = [...mappedHotels];

      const mappedCategories = state.categories.map((category) => {
        if (category.id === payload.id) {
          return {
            ...payload,
            id: payload.name,
          };
        } else return category;
      });
      state.categories = [...mappedCategories];
      localStorage.setItem("categories", JSON.stringify(state.categories))
      localStorage.setItem("hotels", JSON.stringify(state.hotels))
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
      localStorage.setItem("categories", JSON.stringify(state.categories))
    },
    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      const filteredHotels = state.hotels.filter(
        (hotel) => {
          return hotel.category !== payload
        }
      );
      state.hotels = [...filteredHotels];
      const filteredCategories = state.categories.filter(
        (category) => category.id !== payload
      );
      state.categories = [...filteredCategories];
      localStorage.setItem("categories", JSON.stringify(state.categories))
      localStorage.setItem("hotels", JSON.stringify(state.hotels))
    },
    setCountries: (state, { payload }: PayloadAction<Array<Country>>) => {
      state.countries = [...payload];
    },
    setFilter: (state, { payload }: PayloadAction<string>) => {
      state.filterBy = payload
    },
  },
});

export const { actions, reducer } = appSlice;
