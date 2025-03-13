import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockPreloader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="124" r="125" /> 
    <rect x="0" y="286" rx="0" ry="0" width="280" height="0" /> 
    <rect x="0" y="268" rx="15" ry="15" width="280" height="18" /> 
    <rect x="0" y="311" rx="15" ry="15" width="280" height="88" /> 
    <rect x="0" y="425" rx="10" ry="10" width="95" height="27" /> 
    <rect x="128" y="419" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
)

export default PizzaBlockPreloader;