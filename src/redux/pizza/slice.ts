import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchPizzas } from "./asyncActions";
import { Pizza, PizzaSliceState, Status } from "./types";

/* import { Sort } from "./filterSlice"; */



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


export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
