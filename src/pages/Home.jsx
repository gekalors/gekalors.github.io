import React from "react";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchContext } from "../App";
import { Catigories, SortPopUp, Skeleton, PizzaBlock } from "../components";
import Pagination from "../Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { _options } from "../components/Sort";
import { FetchPizzas, selectPizzasData } from "../redux/slices/pizzaSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { items, status } = useSelector(selectPizzasData);
  const { categoryId, sort, currentPage } = useSelector(selectFilter);

  const { _Search } = React.useContext(SearchContext);

  const setCurrent = (id) => {
    dispatch(setCurrentPage(id));
  };
  const setCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const GetPizzas = async () => {
    const _order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const _category = categoryId > 0 ? `category=${categoryId}` : "";
    const _sortBy = sort.sortProperty.replace("-", "");
    // const _search = _Search ?`&search=${_Search}`:'';
    // Back-end filter
    dispatch(
      FetchPizzas({
        _order,
        _category,
        _sortBy,
        currentPage,
      })
    );
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = _options.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    GetPizzas();
  }, [categoryId, sort.sortProperty, isSearch.current, currentPage]); //_Search

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        categoryId,
        sortProperty: sort.sortProperty,
      });

      navigate(`?${queryString}`);
      
      if (categoryId === 0 && currentPage === 1) {
        navigate(`/`);
      }
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const _skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items
    .filter((obj) => {
      if (obj.name.toLocaleLowerCase().includes(_Search.toLocaleLowerCase())) {
        // Front-end filter (works)
        return true;
      }
      return false;
    })
    .map((_item) => <Link key={_item.id} to={`/pizza/${_item.id}`}><PizzaBlock  {..._item} /></Link>);

  return (
    <div className="container">
      <div className="content__top">
        <Catigories _value={categoryId} _setCategory={setCategory} />
        <SortPopUp />
      </div>
      <h2 className="content__title">Усі піци</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>An error occurred 😕</h2>
          <p>
            No pizzas extracted. Better luck next time!
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? _skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={setCurrent} />
    </div>
  );
};
export default Home;
