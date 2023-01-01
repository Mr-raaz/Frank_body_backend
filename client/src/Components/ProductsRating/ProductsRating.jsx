import React , {useState ,useEffect}from 'react';
import './ProductsRating.css';
import Rating from '@mui/material/Rating';
import Popup from './Popup';
import RightCommentDiv from './RightCommentDiv';
import { useParams } from 'react-router-dom';
import axios from 'axios';
function ProductsRating(props) {

    let [comments , setComments] = useState([]);

    let id = useParams().id

    const [check , setCheck] = useState(0);

    const [ctmCount , setCount] = useState(2);

    function counting(){
            let temp = comments.map((elem)=>{
                return elem != null
            })
            setCount(temp.length);
    }

    async function getComments(){
        let temp = await axios.get(`http://localhost:5000/comment/get/${id}`);
        setComments(temp.data);
        counting();
    }

    function updateComment(val){
        setCheck((prev) => prev+1);
        getComments();
        counting();
        setTimeout(()=>{
               getComments(); 
               counting();
        },200)
    }

    useEffect(()=>{
        getComments();
    },[])


    return (
        <div className="outer_rating_section">

                <div className='left_rating_div'>
                    <div className='rating_title'>Customer reviews</div>
                    <div className='rating_star_div'>
                        <div><Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly /></div>
                        <div><span className='rating_out_of'>3.5 out of 5</span></div>
                    </div>
                    <div className='people_count'>{ctmCount} customer ratings</div>


                    <div className="rataing_progress_bar">

                        <div>
                        <span>5 Star</span>
                        <span className='outer_test'><div className='progress_outer5'></div></span>
                        </div>

                        <div>
                        <span>4 Star</span>
                        <span className='outer_test'><div className='progress_outer4'></div></span>
                        </div>
                        <div>
                        <span>3 Star</span>
                        <span className='outer_test'><div className='progress_outer3'></div></span>
                        </div>
                        <div>
                        <span>2 Star</span>
                        <span className='outer_test'><div className='progress_outer2'></div></span>
                        </div>
                        <div>
                        <span>1 Star</span>
                        <span className='outer_test'><div className='progress_outer1'></div></span>
                        </div>
                    </div>

                    <div className="rating_button_outer">
                    <p>Review this product</p>
                    <p>Share your thoughts with other customers</p>
                        <div className='write_review_btn'><Popup  func={updateComment}/></div>
                    </div>
                </div>


                <div className='right_rating_div'>
                    <RightCommentDiv comments={comments}/>
                </div>

        </div>
    );
}

export default ProductsRating;