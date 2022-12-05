import './App.css';
import DishList from './pages/dishlist';
import Dish from './pages/dish';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDishStore } from './store/dish';
import { isEmpty } from 'lodash';

function App() {
    const { setAllDishes,allDishes }   = useDishStore()
    useEffect(() => {
      if(isEmpty(allDishes)){
        setAllDishes()
      }
    })
  return (
    <div style={{height: `100vh`, width: `100%`, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Box className='dish_container' component={'div'} sx={{display: 'flex', width: {xs: '100%', md: '70%'}, background: '#eee', height: '80%'}}>
      <DishList></DishList>
      <Dish></Dish>
    </Box>
    </div>
  );
}

export default App;
