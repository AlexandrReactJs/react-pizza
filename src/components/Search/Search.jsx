import React from "react";
import style from "./Search.module.scss";
import searchIcon from '../assets/img/search.svg';
import closeIcon from '../assets/img/close.svg';


const Search = ({searchValue, setSearchValue}) => {
    return(
        <div className={style.root}>
            <img className={style.searchIcon} src={searchIcon} alt="search" />
            <input onChange={(event) => {setSearchValue(event.target.value)}} value = {searchValue} className={style.input} placeholder="Поиск пицц" />
            {searchValue && <img onClick={() => {setSearchValue('')}} className={style.close} src={closeIcon} alt="close" />}
            
        </div>
    )
}


export default Search;

