import React from "react";
import style from "./Search.module.scss";
import searchIcon from '../assets/img/search.svg';
import closeIcon from '../assets/img/close.svg';
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
import { filterSelector } from "../../redux/slices/filterSlice";




const Search: React.FC = () => {
    const dispatch = useDispatch();
    const {searchValue} = useSelector(filterSelector);
    
    const [value, setValue] = React.useState<string>('')
    const inputRef = React.useRef<HTMLInputElement>(null)
    const onClickClear = () => {
        setSearchValue('');
        if(inputRef.current){
            inputRef.current.focus();
        }
        
    }

    const updateValueDebounce = React.useCallback(
        debounce((str: string) => {
            dispatch(setSearchValue(str));
        }, 300), [setSearchValue])

    const onChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
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

