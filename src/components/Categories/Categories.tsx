import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryIndex } from "../../redux/slices/filterSlice";


type CategoriesProps = {
    activeIndex: number
}

const Categories: React.FC<CategoriesProps> = ({activeIndex}) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const dispatch = useDispatch();
    
     
    

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((value, i) => <li onClick={() => dispatch(setCategoryIndex(i))} key={i} className={activeIndex === i ? "active" : ""}>{value}</li>)
                }
                
            </ul>
        </div>
    );
}

export default Categories;