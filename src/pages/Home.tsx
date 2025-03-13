import React from "react";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlockPreloader from "../components/PizzaBlockPreloader/PizzaBlockPreloader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from 'qs';
import { setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import PizzasCantGet from "../components/PizzasCantGet/PizzasCantGet";
import { filterSelector } from "../redux/slices/filterSlice";
import { pizzaSelector } from "../redux/slices/pizzaSlice";


type fetchPizzaData = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number;
    types: number;
}



const Home: React.FC = () => {

    const dispatch = useDispatch();
    const {searchValue} = useSelector(filterSelector);


    /*   PIZZAS STATE AND JSON MAP TO JSX */

    const { items, status } = useSelector(pizzaSelector)
    const pizzas = items.map((obj: fetchPizzaData) => <PizzaBlock key={obj.id} id={obj.id} title={obj.title} price={obj.price} img={obj.imageUrl} sizes={obj.sizes} types={obj.types} />);

    /*    SKELETON PRELOADER    */
    const preloader = [...new Array(10)].map((_, i) => <PizzaBlockPreloader key={i} />);


    /*  COTEGORY AND SORT   */
    const {categoryIndex} = useSelector(filterSelector);
    const {sortIndex} = useSelector(filterSelector);
    const list = ['rating&order=desc', 'price&order=desc', 'price&order=asc', 'title&order=asc'];
    const selectedSortItem = list[sortIndex];


    /*   PAGINATION    */
    let {pageSize} = useSelector(filterSelector);
    let {totalPizzasCount} = useSelector(filterSelector);
    let {currentPage} = useSelector(filterSelector);
    let pageCount = Math.ceil(totalPizzasCount / pageSize);

    const isMounted = React.useRef(false)

    const navigate = useNavigate();

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            dispatch(setFilters({
                ...params
            }))
        }
    }, [dispatch]);


    React.useEffect(() => {
        async function getPizzas() {
            dispatch(fetchPizzas({ currentPage, searchValue, pageSize, categoryIndex, selectedSortItem }))
        }

        getPizzas();

    }, [selectedSortItem, searchValue, currentPage, pageSize, categoryIndex, dispatch]);


    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sortIndex,
                categoryIndex,
                currentPage

            });

            navigate(`?${queryString}`)
        }

        isMounted.current = true
    }, [sortIndex, currentPage, pageSize, categoryIndex, navigate])

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={categoryIndex} />
                <Sort activeIndex={sortIndex} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? (<PizzasCantGet/>) :

                <div className="content__items">
                
                {
                    status === "loading" ? preloader : pizzas
                }

            </div>
            }
            
            
            <Pagination pageCount={pageCount} />
        </div>
    )
}


export default Home;