import React from "react";


function Categories({activeIndex, onClickCategory}) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    
     
    

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, i) => <li onClick={() => {onClickCategory(i)}} key={i} className={activeIndex === i ? "active" : ""}>{value}</li>)
                }
                
            </ul>
        </div>
    );
}

export default Categories;