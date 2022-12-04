import React from 'react'
import { useDishStore } from '../store/dish'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import { isEmpty } from 'lodash'


const ingredients = ['Paneer', 'Tomato', 'Patato', 'Cucumber', 'Onion', 'Milk', 'Carrot']

function Dish() {
    const { dish, setDishDetails } = useDishStore()

    const saveDish = async () => {
        if(!isEmpty(dish.name) && !isEmpty(dish.ingredients)){
            const result = await axios.post(`http://localhost:5050/add_dishes`, dish)
            if(result.data.status === 'success'){
                window.location.reload();
            }
        }else{
            alert('Fill all the fields')
        }
    }
    return (
        <div style={{ background: '#eee', color: '#000', flexGrow: 1, padding: '10px' }}>
            <div style={{ width: '90%', margin: 'auto ' }}>
                        <TextField sx={{ margin: '1rem' }} id="outlined-basic" value={dish.name} fullWidth label="Dish Name" variant="outlined" onChange={(e) => setDishDetails('name', e.target.value)} />
                        <FormControl sx={{ margin: '1rem' }} fullWidth>
                            <InputLabel>Select Ingredients</InputLabel>
                            <Select multiple value={dish.ingredients} id="outlined-basic" label="Select Ingredients" variant="outlined" fullWidth onChange={(e) => setDishDetails('ingredients', e.target.value)}>
                                {ingredients?.map((data, i) => <MenuItem key={i} value={data}>{data}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button style={{ display: 'block', margin: 'auto' }} type='submit' variant='contained' size='large' color='success' onClick={saveDish}>Save</Button>
            </div>
        </div>
    )
}

export default Dish