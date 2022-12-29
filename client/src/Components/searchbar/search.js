import React, { useEffect, useState } from 'react'
import style from './search.css'

var data = [{

}]

function Search() {
    let [value, setValue] = useState("");
    let [data, setdata] = useState([]);

    const getData = async () => {
        let res = await fetch(`https://fakestoreapi.com/products`)
        let arr = await res.json();
        setdata(arr);
    }

    useEffect(() => {
        getData()
    }, [])

    const searchedValue = (e) => {
        setValue(e.target.value)
    }
    return (
        <div>
            <input value={value} onChange={searchedValue} placeholder='search product' />
            <div>
                {data.filter((elem) => {
                    let title = elem.title.toLowerCase();
                    let key = value.toLowerCase();

                    return key && title.includes(key) && key !== title;
                })
                    .map((elem) => {
                        return (
                            <p onClick={() => setValue(elem.title)}>{elem.title}</p>
                        )
                    }).splice(0, 6)}
            </div>
        </div>

    )
}

export default Search