import React from 'react';
import './ProductsRating.css';
function ProductsRating(props) {
    return (
        <>
           <div className="rating_div_outer">
                <div className="heading_goes_here">

                </div>


                <div className="review_section">

                        <div className='right_review'>

                                <div className="rating_count_section">

                                    <div className='upper_rating_section'>


                                        <div>
                                            <h1>5.0 ⭐</h1>
                                            <p>5 Ratings <br /> & 3 Reviews</p>
                                        </div>

                                        <div></div>



                                    </div>

                                    {/* <div></div> */}
                                </div>
                        </div>



                        <div className='left_review'>

                        </div>
                </div>


           </div>
        </>
    );
}

export default ProductsRating;