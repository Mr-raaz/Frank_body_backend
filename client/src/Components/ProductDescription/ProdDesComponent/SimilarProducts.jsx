import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
// import LimitedTimeDeal from '../../LandingPage/MiddleSection/LimitedTimeDeal';
import LtdCard from '../../LandingPage/MiddleSection/LtdCard';
import axios from 'axios';
// import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function SimilarProducts({func}) {

    // const recommendaded = []
    const [recommendaded , setRecom] = useState([]);
    const navigate = useNavigate();

    async function getRecommendedData(){
        let temp = await axios.get('https://frank-body-backend.vercel.app/products');
        // console.log(temp.data.data);
        // let check = temp.data.data.splice(3,7);
        setRecom([...temp.data.data]);
    }

    function checking(val){
      func(val);
      navigate(`/details/${val}`)
    }

    useEffect(()=>{
      getRecommendedData();
    },[]);

      


    return (
        <>
            <div className="recommendation_border">

                <h2 className='recomended'>You May Also Like </h2> <br />
                <div className="slider_section_recom">

                <Swiper
        slidesPerView={5}
        spaceBetween={30}
        slidesPerGroup={2}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >


{
  recommendaded.length > 0 &&  recommendaded.map((elem)=>{
        if(elem != null){
          return <SwiperSlide onClick={()=>checking(elem._id)}> <LtdCard data={elem}/></SwiperSlide>
        }
        
    })
}
        


      </Swiper>
                    
                </div>
            </div>
        </>
    );
}

export default SimilarProducts;