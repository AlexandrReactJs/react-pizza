import React from "react";
import style from "./Pagination.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";

type PaginationProps = {
    pageCount: number
}

const Pagination: React.FC<PaginationProps> = ({pageCount}) => {
    const dispatch = useDispatch();

    let pages = []

    for(let i = 1; i <= pageCount; i++){
        pages.push(i);
    }
    return(
        <div className={style.Pagination}>
            {
                pages.map((el,i) => ( <button key={i} onClick = {() => {dispatch(setCurrentPage(el))}}>{el}</button>))
            }
        </div>
    )
}


export default Pagination;