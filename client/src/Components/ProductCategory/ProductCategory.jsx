import React from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import './productCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { margin } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
function ProductCategory() {

  let {type} = useParams();

  const [currCategory  , setCategory] = useState(type);
  const [loading , setLoading] = useState(true);
  const[data , setData] = useState([]);
  const [sort , setSort] = useState('none');
  const[start, setStart] = useState(0);
  const [end , setEnd]= useState(Infinity);

  if(currCategory == 'Lipcare'){
    setCategory("Lip Care")
  }

  function handleCategory(val){
    setLoading(true);
    setCategory(val);
  }

  function handleSort(val){
    setSort(val);
  }


  async function fetchData(){
    let res = await axios.get(`http://localhost:5000/products/category/${currCategory}?sort=${sort}`);
    setData(res.data);
    setTimeout(()=>{
      setLoading(false);
    },500)
  }

  useEffect(()=>{
    fetchData();
  },[currCategory , sort])


  // sorting logic here..

 function handlePriceRange(first, second){
  setStart(first);
  setEnd(second);
 }


  // }
 
    
    return (
        <>
            <Navbar />

            <p className='location'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Shop <FontAwesomeIcon icon = {faAngleRight} /></b>&nbsp; {currCategory}</p>

            <div className="product_category_contaier">
                    <div className='ldiv'>

      

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sort By : Popularity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Popularity" />
        <FormControlLabel value="male" control={<Radio />} label="Discount" />
        <FormControlLabel value="name" control={<Radio onClick={()=>handleSort('prod_name')}/>} label="Name"/>
        <FormControlLabel value="newArrivals" control={<Radio />} label="New Arrivals" />
        <FormControlLabel value="lth" control={<Radio onClick={()=>handleSort('best_price')}/>} label="Price Low To High"/>
        <FormControlLabel value="htl" control={<Radio onClick={()=>handleSort('best_price_high_to_low')}/>} label="Price High To Low"/>
        <FormControlLabel value="rating" control={<Radio />} label="Ratings" />
      </RadioGroup>
    </FormControl>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion  expanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
      <FormControlLabel name='tic' control={<Checkbox checked = {currCategory == "Skin Care" ? true : false} />} label="Skin Care"  onClick={()=> handleCategory("Skin Care")}/>
      <FormControlLabel name='tic2' control={<Checkbox checked = {currCategory == "Lip Care" ? true : false} />} label="Lip Care"  onClick={()=> handleCategory("Lip Care")}/>
      <FormControlLabel name='tic2' control={<Checkbox checked = {currCategory == "HAIR" ? true : false} />} label="Hair"  onClick={()=> handleCategory("HAIR")}/>
      <FormControlLabel name='tic2' control={<Checkbox checked = {currCategory == "Perfumes" ? true : false} />} label="Perfumes"  onClick={()=> handleCategory("Perfumes")}/>
      <FormControlLabel name='tic2' control={<Checkbox checked = {currCategory == "makeup" ? true : false} />} label="Makeup"  onClick={()=> handleCategory("makeup")}/>
      <FormControlLabel name='tic2' control={<Checkbox checked = {currCategory == "EVERYDAY" ? true : false} />} label="Everyday" onClick={()=> handleCategory("EVERYDAY")}/>
      {/* <FormControlLabel name='tic2' control={<Checkbox disabled />} label="Mens" /> */}
    </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion  >

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Gender</Typography>
          </AccordionSummary>


        <AccordionDetails>
          <Typography>
          <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
          </Typography>
        </AccordionDetails>



      </Accordion>

      <Accordion expanded >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <FormGroup>
      <FormControlLabel name='tic' control={<Checkbox  checked={start == 0 && !isFinite(end) ? true :false}/>} label="All"   onClick={()=>handlePriceRange(0,Infinity)}/>
      <FormControlLabel name='tic' control={<Checkbox  checked={start == 0 && end==499? true :false}/>} label="Rs. 0 - Rs . 499"   onClick={()=>handlePriceRange(0,499)}/>
      <FormControlLabel name='tic2' control={<Checkbox checked={start == 500 && end == 999? true :false}/>} label="Rs. 500 - Rs . 999"  onClick={()=>handlePriceRange(500,999)}/>
      <FormControlLabel name='tic2' control={<Checkbox checked={start == 1000 && end == 1999 ? true :false}/>} label="Rs. 1000 - Rs . 1999" onClick={()=>handlePriceRange(1000,1999)}/>
      <FormControlLabel name='tic2' control={<Checkbox checked={start == 2000 ? true :false}/>} label="Rs. 2000 - Above"  onClick={()=>handlePriceRange(2000 , Infinity)}/>
    </FormGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>




                    </div>




                    <div className='rdiv'>


                  {
                    !loading && data.length > 0 && data.map((elem) => {
                        return (
                          <>
                          {elem.best_price >=start && elem.best_price <= end && <div className='productCate_card'>

                        <img src={elem.url_1} alt="Not Found" />

                        <h6 className='prod_name' >{elem.prod_name}</h6>
                        <div className="price_outer"> 
                        <div><span>⭐⭐⭐⭐⭐</span> <b className='ttd'>&#x20B9; {elem.best_price}</b></div>
                        </div>

                        <div className='btn_outer'>
                            <button className="atc22">Add To Cart</button>
                            <button className='testbtn'>Buy Now</button>
                        </div>

                    </div>}
                          </>
                        )
                      })
                    }

                    {
                      loading ? <>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%' animation="wave" /></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                        <div><Skeleton variant="rectangular" width='100%' height='100%'  animation="wave"/></div>
                         </>: null
                      
                    }

                    
                    </div> 
            </div>



        </>
    );
}

export default ProductCategory;