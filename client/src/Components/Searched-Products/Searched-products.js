import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import style from "./SearchedProducts.css"

function SearchedProducts() {
    let [searchParam, setParam] = useSearchParams();
    let search_query = searchParam.get('search_query')
    let [searchedData, setSearchedData] = useState([]);

    const getData = async () => {
        let res = await fetch(`https://frank-body-backend.vercel.app/products`)
        let arr = await res.json();
        arr = arr.data;
        let products = arr.filter((elem) => {
            let title = elem.prod_name.toLowerCase();
            let searched = search_query.toLowerCase();
            let cate = elem.categories.toLowerCase();

            return searched && (title.includes(searched) || cate.includes(searched));
        }).splice(0, 25);
        console.log(products)
        setSearchedData(products);
    }

    useEffect(() => {
        getData()
    }, [searchParam])
    console.log(search_query);
    return (
        <div>
            {searchedData.map((elem, ind) => {
                return (
                    <div id='products_parent_div' key={ind + 1}>
                        <div>
                            <img src={elem.url_1} />
                        </div>
                        <div className='details_div'>
                            <h3>{elem.prod_name}</h3>
                            <h4>Best Price:  ₹ {elem.best_price}  <span></span></h4>
                            <h5>₹ {elem.mrp} </h5>
                            <p className='percent_span'> | ({parseInt(elem.best_price * 100 / elem.mrp)}%)</p>
                            <h4>⭐⭐⭐⭐⭐</h4>
                            <p>43 ratings & 15 reviews</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchedProducts