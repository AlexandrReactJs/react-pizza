import "./scss/app.scss";
import Header from "./components/Header/Header";
import React from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";


export const searchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [typesIndex, setTypesIndex] = React.useState(0);
  const [pizzaSizeIndex, setPizzaSize] = React.useState(0);
  return (
    <div className="wrapper">
      <searchContext.Provider value={{ searchValue, setSearchValue}}>
        <Header />
        <div className="content">

          <Routes>
            <Route path="/" element={<Home pizzaSizeIndex={pizzaSizeIndex} typesIndex={typesIndex} setPizzaSize={setPizzaSize} setTypesIndex={setTypesIndex}/>} />
            <Route path="/cart" element={<Cart pizzaSizeIndex={pizzaSizeIndex} typesIndex={typesIndex} setPizzaSize={setPizzaSize} setTypesIndex={setTypesIndex}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>


        </div>
      </searchContext.Provider>

    </div>
  );
}

export default App;
