import './App.css';
import React,{useEffect,useState} from 'react';
import Search from './components/Search';
import Container from '@mui/material/Container';
import DisplayWords from './components/displayWords';
import AddNewWord from './components/addWord';



const App =()=> {
      return (
        <div className="font-loader">
          <Container maxWidth="md">
              <Search />            
              <DisplayWords/>
              <AddNewWord />
          </Container>
        </div>
      );
}


export default App;


