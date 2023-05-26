import { createSlice, configureStore, combineReducers  } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {current } from '@reduxjs/toolkit'

const persistConfig = {
    key:'root',
    storage,
    version:1
}


const basic = {
    food:[],
    totalQuantity: 0,
    changed: false
}

const orderSlice = createSlice({
    name:'orderedFood',
    initialState:basic,
    reducers:{
        addFood(state,action){
          if(action.payload== null){
            state.food = []
            state.totalQuantity = 0
          }
           else {
            const newItem = action.payload;
            console.log(newItem)
            const existingItem = state.food.find((item) => item.id === newItem.id);
            state.totalQuantity++;
          
         
            if (!existingItem) {
              state.food.push({...action.payload,
                quantity: 1,
                totalPrice: newItem.price 
              });
              
            } else {
              existingItem.quantity++;
              existingItem.totalPrice = +existingItem.totalPrice + +newItem.price;
              
            }

          }


            // state.food = []
            // state.totalQuantity = 0
            // state.changed =false
            
        },
        removeFood(state,action){
            console.log(action.payload)
            const newItem = action.payload;
            const existingItem = state.food.find((item) => item.id === newItem.id);
            state.totalQuantity--;
            
            if (existingItem.quantity === 1) {
              state.food = state.food.filter((item) => item.id !== newItem.id);
            } else {
              existingItem.quantity--;
              existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        totalRemoveFood(state,action){
            console.log(action.payload)
            let basketItemTodelete = state.food.find(item=>item.id == action.payload.id)
            state.food = state.food.filter((item) => item.id !== action.payload.id);
            state.totalQuantity = state.totalQuantity - basketItemTodelete.quantity
            
        }
      
    }
})





const basic2 = {
  order:[]
}

const receivedSlice = createSlice({
  name:'receivedOrder',
  initialState:basic2,
  reducers:{
      getOrder(state,action){
        // state.order.push(action.payload)
        state.order=[]
      },
     
  }
})





const reducer = combineReducers({
    basket:orderSlice.reducer, 
    ordered:receivedSlice.reducer
})

const persistedReducer = persistReducer(persistConfig,reducer )

const store = configureStore({
    reducer: persistedReducer
})



export const orderActions = orderSlice.actions;
export const receivedActions = receivedSlice.actions;

export default store;