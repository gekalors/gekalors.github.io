export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type Pizza = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  count: number;
};

export interface PizzaSliceState {
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
  