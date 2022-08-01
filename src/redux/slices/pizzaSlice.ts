import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
/* import { Sort } from "./filterSlice"; */

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

type Pizza = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  count: number;
};

interface PizzaSliceState {
  items: Pizza[];
  status: "loading" | "success" | "error";
}

export type SearchPizzaParams = {
  order: string;
  category: string;
  sortBy: string;
  currentPage: string;
  search: string;
};

export const FetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/FetchPizzasStatus",
  async (params) => {
    const { order, category, sortBy, currentPage, search } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://62b2dd4e20cad3685c95976d.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(FetchPizzas.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });

    builder.addCase(FetchPizzas.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },

  /*
   No TS case
  
  extraReducers: {
  [FetchPizzas.fulfilled]: (state, action)=>{
    state.items = action.payload;
    state.status = 'success';
  },
  [FetchPizzas.pending]: (state)=>{
    state.items = [];
    state.status = 'loading';
  },
  [FetchPizzas.rejected]: (state)=>{
    state.items = [];
    state.status = 'error';
  },
}, */
});
export const selectPizzasData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
