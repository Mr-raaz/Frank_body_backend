import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Rating from './Rating';
import Input from './Input';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useRef } from 'react';
function PaperComponent(props) {
  
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({func}) {
  let id = useParams().id;
  const detail = useRef();
  const cookies = new Cookies();
  let token = cookies.get('jwt');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    axios.post(`https://frank-body-backend.vercel.app/comment/${id}` , {
      token:{token},
      comment:{
        message:detail.current.value
      }
    }).then((res)=>{
      // console.log(res);
    }).then((err)=>{
      // console.log(err);
    })

    func(1);
    setOpen(false);

  };

  return (
    <div>
      <Button variant="outlined" style={{
        color: "antiquewhite",
        backgroundColor:"#e76364",
        border:'none'
    }} 
    onClick={handleClickOpen}>
        Write a review
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <Stack direction="row" spacing={2}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <p>Anshu Raj</p>
        </Stack>
        </DialogTitle>
        
        <DialogContent>
          <DialogContentText>
          <Stack direction="column" spacing={2}>
          <div className='rating_icon'><Rating /></div>
          <textarea cols="100" rows="7" ref={detail} placeholder='Write your review here..' className='text_are'></textarea>
        </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{color:'#e76364'}}>
            Cancel
          </Button>
          <Button onClick={handleClose} style={{color:'#e76364'}}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}