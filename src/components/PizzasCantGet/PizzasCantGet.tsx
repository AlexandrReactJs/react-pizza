import React from "react";
import style from "./PizzasCantGet.module.scss"

const PizzasCantGet: React.FC = () => {
    return(
        <div className={style.pizzasCanGet}>
            <h2 className={style.title}>Не удалось получить пиццы <span className={style.emoji}>🤔</span></h2>
            <p className={style.subtitle}>К сожалению ну удалось получить пиццы. Повторите попытку позже {"=)"}</p>
        </div>
    )

}

export default PizzasCantGet;