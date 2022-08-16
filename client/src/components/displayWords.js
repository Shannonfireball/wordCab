import React, { useEffect } from 'react'

import LinearProgress from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux'
import { loadWords } from '../slice/loadWords';
import BasicCard from './Card';


import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

export default function DisplayWords() {
    
    const words = useSelector(state => state.load.words);
    const dispatch = useDispatch()
    
    useEffect(()=>{
      dispatch(loadWords())
    },[dispatch])
    const search = useSelector(state => state.search);
    const filteredNewWords = words.filter(words=>{
      return words.word.toLowerCase().includes(search.toLowerCase())
    })
    // const filterecwords = useSelector(selectFilteredWords);
    // console.log(filteredNewWords);
    const display = filteredNewWords.length<=0
  return (
    <div>
    {display&&<LinearProgress/>}
    {filteredNewWords.map(word =>(
      <Stack sx={{
        '& > :not(style)': { m: 0.5, width: '90%' },
      }} >
      <Item><BasicCard word={word.word} entries={word.entries} /></Item>
      </Stack>
    ))}</div>
  )
}
