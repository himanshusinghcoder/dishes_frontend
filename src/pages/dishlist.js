import React, { useState } from 'react'
import { useDishStore } from '../store/dish';
import './style.css'
import { Button, Pagination, Typography } from '@mui/material';
import { toLower } from 'lodash';

function DishList() {
    const [currentIndex, setCurrentIndex] = useState(undefined)
    const { setDish, allDishes, createDish, filterList, setFilterList, paginationCount, setAllDishes } = useDishStore()
    const selectDish = (data) => {
        setDish(data)
    }

    const filterDishes = (e) => {
        if (e.target.value === 0) {
            setFilterList(allDishes)
            return
        }
        const dishes = allDishes.filter(data => toLower(data.name).includes(toLower(e.target.value)))
        setFilterList(dishes)
    }

    const handlePagination = async (e, value) => {
        await setAllDishes(value)
    }
    return (
        <div style={{ textAlign: 'start', width: '25%', borderRight: '2px solid #000',position: 'relative' }}>
            <Typography variant='h6' textAlign={'center'}>Dishes</Typography>
            <hr></hr>
            <input className='searchField' type={'text'} placeholder='search dishes' onChange={filterDishes}></input>
            <Button type='submit' color='primary' variant='contained' style={{ width: '100px', height: '20px', margin: '5px', padding: '5px' }} onClick={createDish} >Create</Button>
            <ul style={{ listStyle: 'none', padding: '0px' }}>
                {filterList.map((data, i) => {
                    return <li key={i} className={currentIndex === data._id ? 'activeClass nav' : 'nav'} onClick={() => {
                        selectDish(data)
                        setCurrentIndex(data._id)
                    }}>{data.name}</li>
                })}
            </ul>
            <div style={{position: 'absolute', bottom: 2}}>
                {paginationCount ? <Pagination count={paginationCount}  shape='rounded' onChange={handlePagination} /> : ''}
            </div>
        </div>
    )
}

export default DishList