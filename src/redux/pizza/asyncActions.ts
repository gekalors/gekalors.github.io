import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

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