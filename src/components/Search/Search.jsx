import React from "react";
import style from "./Search.module.scss";
import searchIcon from '../assets/img/search.svg';
import closeIcon from '../assets/img/close.svg';
import { searchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
    const [value, setValue] = React.useState('')
    const { setSearchValue } = React.useContext(searchContext);
    const inputRef = React.useRef()
    const onClickClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    }

    const updateValueDebounce = React.useCallback(
        debounce((str) => {
            setSearchValue(str);
        }, 300), [setSearchValue])

    const onChangeInputValue = (event) => {
        setValue(event.target.value);
        updateValueDebounce(event.target.value);
    }


    return (
        <div className={style.root}>
            <img className={style.searchIcon} src={searchIcon} alt="search" />
            <input ref={inputRef} onChange={onChangeInputValue} value={value} className={style.input} placeholder="Поиск пицц" />
            {value && <img onClick={() => { onClickClear() }} className={style.close} src={closeIcon} alt="close" />}

        </div>
    )
}


export default Search;

