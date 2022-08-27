import React from "react";
import axios from "axios";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import PizzaBlockPreloader from "../components/PizzaBlockPreloader/PizzaBlockPreloader";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";


function Home() {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeIndex, setActiveIndex] = React.useState(0);


    React.useEffect(() => {
        axios.get('https://62a0fa267b9345bcbe4391d8.mockapi.io/items').then((response) => {
            setItems(response.data);
            setIsLoading(false);
            window.scrollTo(0, 0);
        })
    }, []);


    return (
        <div className="container">
            <div className="content__top">
                <Categories activeIndex={activeIndex} onClickCategory={(i) => setActiveIndex(i)} />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    isLoading ? [...new Array(10)].map((_, i) => <PizzaBlockPreloader key={i} />)
                        : items.map(obj => <PizzaBlock  key={obj.id} title={obj.title} price={obj.price} img={obj.imageUrl} sizes={obj.sizes} types={obj.types} />)
                }

            </div>
        </div>
    )
}


export default Home;