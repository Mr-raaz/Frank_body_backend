import React from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
function SingleReview({message , user_name}) {
    return (
        <>
           <div className="single_review_outer">

                <div className='profile_name_section'>
                    <div> <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></div>
                    <div><p>{user_name}</p></div>
                </div>


                <div className='rating_box_single'>
                
                <Rating name="read-only" value={3} readOnly />
                </div>

                <div>
                    {message}
                </div>

           </div> 
        </>
    );
}

export default SingleReview;