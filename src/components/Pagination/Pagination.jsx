import React from "react";
import style from "./Pagination.module.scss";

const Pagination = ({pageCount, setPage}) => {
    let pages = []
    for(let i = 1; i <= pageCount; i++){
        pages.push(i);
    }
    return(
        <div className={style.Pagination}>
            {
                pages.map(el => ( <button onClick = {() => {setPage(el)}}>{el}</button>))
            }
        </div>
    )
}


export default Pagination;