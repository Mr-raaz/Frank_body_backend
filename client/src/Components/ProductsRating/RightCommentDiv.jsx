import axios from 'axios';
import React, { useState } from 'react';
import SingleReview from './SingleReview';
function RightCommentDiv({comments}) {

    
    return (
        <>
            <div className="commet_sorting_btn">
            <div><p>Top reviews from India</p></div>
                        <select>
                            <option>Most Recent</option>
                            <option>Top Ratings</option>
                        </select>
            </div>

            <div className="review_list_section">

                    {
                        comments.length == 0 && <div className='nocomment_div'>
                            <img src="https://cdn.dribbble.com/users/740954/screenshots/2301581/no-reviews-yet.png?compress=1&resize=400x300&vertical=top" alt="not found" />
                            <p>No review yet !</p>
                        </div>
                    }
                {
                    comments.length > 0 && comments.map((elem)=>{
                        return elem != null && elem.message.length > 5 && <SingleReview {...elem} />
                    })
                }
                
            </div>
        </>
    );
}

export default RightCommentDiv;