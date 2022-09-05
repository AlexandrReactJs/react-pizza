import React from "react";
import axios from "axios";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlockPreloader from "../components/PizzaBlockPreloader/PizzaBlockPreloader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { searchContext } from "../App"
import { useSelector } from "react-redux";

function Home() {
    /*     SEARCH   */
    const { searchValue} = React.useContext(searchContext);
    /*   PIZZAS STATE AND JSON MAP TO JSX */
    const [items, setItems] = React.useState([]);
    const pizzas = items.map(obj => <PizzaBlock  key={obj.id} title={obj.title} price={obj.price} img={obj.imageUrl} sizes={obj.sizes} types={obj.types} />);
    /*    SKELETON PRELOADER    */
    const [isLoading, setIsLoading] = React.useState(true);
    const preloader = [...new Array(10)].map((_, i) => <PizzaBlockPreloader key={i} />);


    /*  COTEGORY AND SORT   */
    const categoryActiveIndex = useSelector((state) => state.filter.categoryIndex);
    const sortActiveIndex = useSelector((state) => state.filter.sortIndex);
    const list = ['rating&order=desc', 'price&order=desc', 'price&order=asc', 'title&order=asc'];
    const selectedSortItem = list[sortActiveIndex];


    /*   PAGINATION    */
    let pageSize = useSelector((state) =>  state.filter.pageSize);
    let totalCountPizzas = useSelector((state) =>  state.filter.totalPizzasCount)
    let pageCount = Math.ceil(totalCountPizzas / pageSize);
    let currentPage = useSelector((state) => state.filter.currentPage)

    React.useEffect(() => {
        setIsLoading(true)
        axios.get(`https://630b9081ed18e82516559755.mockapi.io/pizzas?page=${currentPage}&limit=${pageSize}&${searchValue ? `search=${searchValue}` : ``}&${categoryActiveIndex > 0 ? `category=${categoryActiveIndex}` : ``}&sortBy=${selectedSortItem}`).then((response) => {
            setItems(response.data);
            setIsLoading(false);
            window.scrollTo(0, 0);
        })
    }, [selectedSortItem, searchValue, currentPage, pageSize, categoryActiveIndex]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={categoryActiveIndex}/>
                <Sort activeIndex={sortActiveIndex} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading ? preloader : pizzas
                }

            </div>
            <Pagination pageCount={pageCount}/>
        </div>
    )
}


export default Home;