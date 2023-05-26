
import { useSelector,useDispatch } from "react-redux"
import {orderActions} from '../store/store'
import { useState } from "react"
import FooDCartContent from "./FoodCartContent"


function FoodCart(props){


    return (
        
       <>
       
            {
                props.data.menu.map(item=>{

                    return (
                        <FooDCartContent data={item} restName = {props.data.restaurantName}></FooDCartContent>
                    )
                })
            }
        </>
    )
}


export default FoodCart