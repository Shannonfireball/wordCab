import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';
import { AddWORD } from '../slice/loadWords';
import { ADD_WORD } from '../graphQlReq/graphQlReq';

import { useSnackbar } from 'notistack';


import { useSelector, useDispatch } from 'react-redux'


export default function AddNewWord() {
  const [open, setOpen] = React.useState(false);
  const [word, setWord] = React.useState('');
  const {enqueueSnackbar}= useSnackbar()

  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,

  };
  const sizeStyle = {
    minHeight:45,
    minWidth:45,
    maxHeight:65,
    maxWidth:65
  }
  const DialogStyle={
    background:'#e3f2fd',
    color:'#0068bf'
  }


  const valueRef = React.useRef('') //creating a refernce for TextField Component
  const dispatch = useDispatch()
  

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const words = useSelector(state => state.load.words);

  const handleAdd = ()=>{
    const duplicate = words.find(words=> words.word=== valueRef.current.value)
    if(duplicate){
      const duplicateMessage = 'Word already exists'
      return enqueueSnackbar(duplicateMessage,{ variant: 'warning' })
    }
    ADD_WORD(valueRef.current.value).then(Word=> {
          dispatch(AddWORD(Word))
          if(Word.word){
            const message = 'Success word added';
            enqueueSnackbar(message, { variant: 'success' })

          }
          console.log(Word)
      }).catch(error=>{
        const messageError = 'Error not word added';
        enqueueSnackbar(messageError, { variant: 'error' })
      });
    setWord('')
    handleClose()
  }

  return (
    <div >
      <Button sx={fabStyle}  onClick={handleClickOpen}><AddCircleIcon sx={sizeStyle}/>word</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
      
        <DialogTitle sx={DialogStyle}>Add word</DialogTitle>
        <DialogContent sx={DialogStyle}>
              <TextField sx={{background:'#ffff'}} inputRef={valueRef} value={word} onChange={handleChange}/>
        </DialogContent>
        <DialogActions sx={DialogStyle} >
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Ok</Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}
