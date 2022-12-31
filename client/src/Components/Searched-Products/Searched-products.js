import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchedProducts() {
    let [searchParam, setParam] = useSearchParams();
    let search_query = searchParam.get('search_query')
    let [searchedKey, setSearchedKey] = useState();

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
        console.log(products);
    }

    useEffect(() => {
        getData()
    }, [searchParam])
    console.log(search_query);
    return (
        <div>Searched-products</div>
    )
}

export default SearchedProducts