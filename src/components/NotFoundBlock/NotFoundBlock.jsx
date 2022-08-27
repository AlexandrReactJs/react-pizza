import React from "react";
import style from "./NotFoundBlock.module.scss";

function NotFoundBlock() {
    return <div className={style.root}>
        <span>&#128529;</span>
        <h1>
            Ничего не найдено :(
        </h1>
        <p className={style.description}>К сожалению данная страница в нашем интернет-магазине отсутствует</p>
    </div>


}

export default NotFoundBlock;