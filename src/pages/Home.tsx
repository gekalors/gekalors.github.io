import React from "react";

// import qs from "qs";

// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Catigories, SortPopUp, Skeleton, PizzaBlock } from "../components";
import Pagination from "../Pagination";
import {setCategoryId,setCurrentPage} from "../redux/filter/slice";

// import { options } from "../components/Main/Sort";

import {FetchPizzas} from "../redux/pizza/asyncActions";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import { selectPizzasData } from "../redux/pizza/selectors";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
 // const navigate = useNavigate();
  const isSearch = React.useRef(false);
 // const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const setPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const setCategory = (index: number) => {
    dispatch(setCategoryId(index));
  };

  const GetPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      FetchPizzas({
        order,
        category,
        sortBy,
        currentPage: String(currentPage),
        search,
      })
    );
  };
  /* React.useEffect(() => {
    if (window.location.search) {
      const params =qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = options.find(
        (obj) => obj.sortProperty === params.sortBy
      );
      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort || options[0],
      }));

      isMounted.current = true;
    }
  }, []); */

  React.useEffect(() => {
    window.scrollTo(0, 0);
    GetPizzas();
  }, [
    categoryId,
    sort.sortProperty,
    isSearch.current,
    currentPage,
    searchValue,
  ]);

  /* React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        currentPage,
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
      };
      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`/?${queryString}`);
    }
    if (!window.location.search) {
      dispatch(FetchPizzas({} as SearchPizzaParams));
    }
  }, [categoryId, sort.sortProperty, currentPage, searchValue]); */

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((item: any) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Catigories value={categoryId} setCategory={setCategory} />
        <SortPopUp sort={sort}/>
      </div>
      <h2 className="content__title">Усі піци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Сталася помилка 😕</h2>
          <p>Не вдалося отримати піци. Перевірте ваше підключення до інтернету та спробуйте знову!</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={setPage} />
    </div>
  );
};
export default Home;
