import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from './search.css'




function Search() {
    let [value, setValue] = useState("");
    let [data, setdata] = useState([]);
    let navigate = useNavigate()

    const getData = async () => {
        let res = await fetch(`https://frank-body-backend.vercel.app/products`)
        let arr = await res.json();
        setdata(arr.data);
    }

    useEffect(() => {
        getData()
    }, [])

    const searchedValue = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <input onKeyPress={(e) => {
                if (e.charCode == 13 && value != "") {
                    navigate(`/products?search_query=${value}`)
                }
            }} value={value} onChange={(e) => searchedValue(e)} placeholder='search product' />
            <div>
                {data.filter((elem) => {
                    let title = elem.prod_name.toLowerCase();
                    let key = value.toLowerCase();

                    return key && title.includes(key) && key !== title;
                })
                    .map((elem, ind) => {
                        return (
                            <p key={ind + 1} onClick={() => setValue(elem.prod_name)}>{elem.prod_name}</p>
                        )
                    }).splice(0, 10)}
            </div>
        </div>

    )
}

export default Search