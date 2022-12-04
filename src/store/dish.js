import axios from 'axios'
import create from 'zustand'

export const useDishStore = create((set,get) => ({
  dish: {
    name: '',
    ingredients: [],
  },
  allDishes: [],
  showAddForm: false,
  filterList: [],
  paginationCount: 1,
  setDish: (data) => set((state) => ({ dish: data })),
  setDishDetails: (field, value) => set((state) => ({dish: {...state.dish,[field]: value}})),
  setShowForm : (value) => set(() => ({showAddForm: value})),
  setAllDishes : async (page = 1) => {
    const data =  await axios.get(`http://localhost:5050/get_all_dishes?page=${page}`)
    console.log(">>>>", data);
    if(data.data.status === 'success'){
        set(() => ({allDishes: data.data.data.dishes, filterList: data.data.data.dishes, paginationCount: Math.ceil(data.data.data.countDocument/10)}))
    }
  },
  createDish: () => set(() => ({dish: {name: '', ingredients: []}})),
  setFilterList: (data) => set(() => ({filterList: data})), 
}))
