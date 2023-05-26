import { useSelector,useDispatch } from "react-redux"
import {orderActions} from '../store/store'
import { useState } from "react"



function FooDCartContent(props){

    const [err,setErr] = useState(false)
    const orderState = useSelector(state=>state.basket.food)
    const dispatch = useDispatch()
    
    // console.log(orderState)
    console.log(props.data)
    console.log(props.restName)
    
    
    function addToOrderHandler(e){
        // console.log(JSON.parse(e.currentTarget.getAttribute('name')))
        let orderedItem = JSON.parse(e.currentTarget.getAttribute('name'))
        orderedItem.restaurantName = props.restName
        orderedItem._id = orderedItem._id
        
       console.log(orderedItem)
    
        if(orderState.length>0){
            if(orderState[0].restaurantName !== orderedItem.restaurantName){
                // console.log( orderState.restaurantName, orderedItem.restaurantName)
                // console.log("cann not add ")
                setErr(true)
                    return
            } 
        
            dispatch(orderActions.addFood(orderedItem))
               
        } else if(orderState.length==0){
            dispatch(orderActions.addFood(orderedItem))
           
        }
        
    }
    
    
    
    let existingID = orderState.map(item=>item.id)
    console.log(existingID)
    
    
    // function cartOverHandler(e){
    //     const clases = e.currentTarget.getAttribute('class')
    //     console.log(e.currentTarget.getAttribute('class'))
    //     e.currentTarget.className = " activeCart"
    // }
    
    
    



return(
    <>
    
        <div className="foodCart-wrapper"  >

            <div class="flip-card">
                <div class="flip-card-inner">
                    <div className="flip-card-front">
                        <img className="foodCartIMG" src={`/imgs/${props.data.img}`}/>
                    </div>
                    <div className="flip-card-back">
                        <p >{props.data.description}</p>
                    </div>
                </div>
            </div>

            <div className="foodCart-wrapper-text">
                <h3>{props.data.foodName}</h3>
                
                <p>Price: <span>${props.data.price}</span></p>
                <div className="order-options">
                    <button onClick={addToOrderHandler} name={JSON.stringify(props.data)}>{existingID.includes(props.data.id) ? 'Added' : 'Add to order'  }</button>
                    {err ? <p className="warning">Cannot add food from several restaurants to the one order.</p> : ''}
                </div>
            </div>
        </div>
    </>
)
}

export default FooDCartContent