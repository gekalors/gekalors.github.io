import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const FetchPizzas = createAsyncThunk(
  "pizza/FetchPizzasStatus",
  async (params, thunkAPI) => {
    const { _order, _category, _sortBy, currentPage } = params;
    const { data } = await axios.get(
      `https://62b2dd4e20cad3685c95976d.mockapi.io/items?page=${currentPage}&limit=4&${_category}&sortBy=${_sortBy}&order=${_order}`
    ); // ${_search}
    if(data.length===0){
      return thunkAPI.rejectWithValue('Не вдалося вигрузити піцци');
    }
    return thunkAPI.fulfillWithValue(data);
    
  }
);
const initialState = {
  items: [],
  status: 'loading', // loading | success | error
};
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
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
},
});
export const selectPizzasData = (state)=> state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
