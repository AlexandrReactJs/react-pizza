import React from "react";
import axios from "axios";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlockPreloader from "../components/PizzaBlockPreloader/PizzaBlockPreloader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";


function Home({searchValue}) {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [activeSortIndex, setActiveSortIndex] = React.useState(0);
    const [page, setPage] = React.useState(1)
    const list = ['rating&order=desc', 'price&order=desc', 'price&order=asc', 'title&order=asc'];
    const selectedSortItem = list[activeSortIndex];
    let pageSize = 4;
    let totalCountPizzas = 10;
    let pageCount = Math.ceil(totalCountPizzas / pageSize);

    React.useEffect(() => {
        setIsLoading(true)
        axios.get(`https://630b9081ed18e82516559755.mockapi.io/pizzas?page=${page}&limit=${pageSize}&${searchValue ? `search=${searchValue}` : ``}&${activeIndex > 0 ? `category=${activeIndex}` : ``}&sortBy=${selectedSortItem}`).then((response) => {
            setItems(response.data);
            setIsLoading(false);
            window.scrollTo(0, 0);
        })
    }, [activeIndex, selectedSortItem, searchValue, page, pageSize]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={activeIndex} onClickCategory = {(i) => {setActiveIndex(i)}}/>
                <Sort activeIndex = {activeSortIndex} onClickSort = {(i) => {setActiveSortIndex(i)}}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading ? [...new Array(10)].map((_, i) => <PizzaBlockPreloader key={i} />)
                        : items.map(obj => <PizzaBlock  key={obj.id} title={obj.title} price={obj.price} img={obj.imageUrl} sizes={obj.sizes} types={obj.types} />)
                }

            </div>
            <Pagination pageCount={pageCount} setPage={setPage}/>
        </div>
    )
}


export default Home;