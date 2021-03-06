import React from "react";
import debounce from 'lodash.debounce';
import { SearchContext } from "../App";
import styles from "./Search.module.scss";

const Search = () => {
  
  const [value, setValue] = React.useState();
  const {_setSearch} = React.useContext(SearchContext)
  
  const updateSearchValue = React.useCallback(
    debounce((str)=>{
      _setSearch(str);
      setValue(str);
    }, 1000),
    [],
  );
  const onChangeInput = event =>{
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }
  

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input value={value} onChange = {onChangeInput} className={styles.input} placeholder="Пошук піцци" />
    </div>
  );
};
export default Search;
