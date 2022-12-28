import React, { useEffect, useState } from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import './ProductDescription.css';
import { useParams } from 'react-router-dom';
import Details_page from './ProdDesComponent/Details_page';
import { Footer } from '../Footer/footer';
import ShoppingOfferSection from '../ProductPage/product_page_comp/InitialOfferSection/ShoppingOfferSection';
import DetailsTabSection from './ProdDesComponent/DetailsTabSection';
import SimilarProducts from './ProdDesComponent/SimilarProducts';

function ProductDescription() {

    const [currProd , setProd] = useState([]);

    const [id2 , setid2] = useState(useParams().id);

    function check(val){
        setid2(val);

        window.scrollTo({
            top:0,
            behavior:'smooth'
        })

    }

    


    useEffect(()=>{

            getProductDetails();
            
    },[id2])

    
    async function getProductDetails(){
        let res = await fetch(`https://frank-body-backend.vercel.app/${id2}`);
        let data = await res.json()

        setProd([data]);

    }

    return (
        <>
        <Navbar />

            {
                currProd.map((elem)=>{
                    return <Details_page key={elem._id} data={elem} />
                })
            }

            
<DetailsTabSection />
<SimilarProducts  func = {check}/>
<ShoppingOfferSection />
                <Footer />
        </>
    );
}

export default ProductDescription;