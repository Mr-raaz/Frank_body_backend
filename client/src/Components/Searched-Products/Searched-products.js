import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import { Footer } from '../Footer/footer';
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
            <Navbar />
            {searchedData.length == 0 ? (<div id='noresult_image' ><img id=' noresult_image' src="https://ibellstore.com/images/no-item-found-here.png" /></div>) :
                <div id='pageparentdiv'>
                    {searchedData.map((elem, ind) => {
                        return (

                            <Link to={`/details/${elem._id}`} id='products_parent_div' key={ind + 1}>
                                <div>
                                    <img src={elem.url_1} />
                                </div>
                                <div className='details_div'>
                                    <h4>{elem.prod_name}</h4>
                                    <h5>Best Price:  ₹ {elem.best_price}</h5>
                                    <span>Original Price: </span><p className='mrp_tag'>₹ {elem.mrp} </p>
                                    <span className='percent_span'> | ({100 - parseInt(elem.best_price * 100 / elem.mrp)}%)</span>
                                    <h5 className='review_tag'>⭐⭐⭐⭐⭐</h5>
                                    <p>43 ratings & 15 reviews</p>
                                </div>

                            </Link>
                        )
                    })}
                </div>
            }
            <Footer />
        </div >
    )
}

export default SearchedProducts