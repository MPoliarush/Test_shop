import { useSelector,useDispatch } from "react-redux"
import {orderActions,receivedActions} from '../store/store'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState,useRef } from "react"
import axios from "axios";
import Map from './Map'


function Order(){
    const [inputs,setInputs]=useState({
        name:'',
        email:'',
        phone:'',
        adress:''
    })
    const [inputsValid,setInputsValod]=useState({
        name:'',
        email:'',
        phone:'',
        adress:'',
    })
    const [mostTotalPrice, setMostTotalPrice] = useState(0)
    const [orderSent,setOrderSent]=useState(false)
    const orderState = useSelector(state=>state.basket.food)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(orderState)
    console.log(...orderState)
    

    function addToOrderHandler(e){
        console.log(JSON.parse(e.currentTarget.getAttribute('name')))
        let orderedItem = JSON.parse(e.currentTarget.getAttribute('name'))
        let data = {
            foodName:orderedItem.foodName,
            id:orderedItem.id,
            img:orderedItem.img,
            price:orderedItem.price,
            restaurantName:orderedItem.restaurantName,
        }

    
        dispatch(orderActions.addFood(orderedItem))
    }

    function deleteFoodFromOrder(e){
        console.log(JSON.parse(e.currentTarget.getAttribute('name')))
        let orderedItem = JSON.parse(e.currentTarget.getAttribute('name'))

        dispatch(orderActions.removeFood(orderedItem))
    }

   
    let price = 0

    useEffect(()=>{
        console.log('logged')
    if(orderState.length>0){
         let prices = orderState.map(item=>{
            return item.totalPrice
        })

        let updatedPrice = prices.reduce((acc,current)=>{
            console.log(acc, current)
             return acc + current
         })

         console.log(updatedPrice)

         setMostTotalPrice(updatedPrice)

    } else {
        setMostTotalPrice(0)
    }

    console.log(price)
    },[orderState])

  
    
    function inputHandler(e){
        console.log(e.currentTarget.getAttribute('name'))
        if(e.currentTarget.getAttribute('name')=='name'){
            setInputs({...inputs,
                name:e.target.value
            })
            setInputsValod({...inputsValid,
                name:''
            })

        }

        if(e.currentTarget.getAttribute('name')=='email'){
            setInputs({...inputs,
                email:e.target.value
            })
            setInputsValod({...inputsValid,
                email:''
            })

        }

        if(e.currentTarget.getAttribute('name')=='phone'){
            setInputs({...inputs,
                phone:e.target.value
            })
            setInputsValod({...inputsValid,
                phone:''
            })

        }

        if(e.currentTarget.getAttribute('name')=='adress'){
            setInputs({...inputs,
                adress:e.target.value
            })

        }
        setInputsValod({...inputsValid,
            adress:''
        })
    }



    async function confirmHandler(e){
        console.log(inputs)
        console.log(inputsValid)

        if(inputs.name==''){
            console.log('prevented')
            setInputsValod({...inputsValid,
                name:"Enter valid name"
            })
            return
        }else {
            setInputsValod({...inputsValid,
                name:''
            })
        }

        if(!inputs.email.trim().includes('@')){
            console.log('prevented 2')
            setInputsValod({...inputsValid,
                email:"Enter valid email"
            })
            return
        }else {
            setInputsValod({...inputsValid,
                email:''
            })
        }

       
        if(isNaN(inputs.phone) || inputs.phone.length==0){
            console.log('prevented 3')
            setInputsValod({...inputsValid,
                phone:"Enter valid phone"
            })
            return
        }else {
            setInputsValod({...inputsValid,
                phone:''
            })
        }

        if(inputs.adress==''){
            console.log('prevented4')
            setInputsValod({...inputsValid,
                adress:"Enter valid address"
            })
            return
        } else {
            setInputsValod({...inputsValid,
                adress:''
            })
        }

        if(orderState.length==0){
            console.log('prevented')
            return
        }

        

        let orderData= {
            order:orderState,
            client:inputs
        }

        console.log(orderData)

        setInputs({
            name:'',
            email:'',
            phone:'',
            adress:''
        }
        )

        setOrderSent(true)

        dispatch(orderActions.addFood(null))
        
        const config = {
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            }
        }
        
        try{
            const response = await axios.post('https://food-38pa.onrender.com/receivedOrder', orderData, config )
        } catch(e){
            console.log(e)
        }

    }


function deleteCard(e){
    console.log(JSON.parse(e.currentTarget.getAttribute('name')))
    let orderedItem = JSON.parse(e.currentTarget.getAttribute('name'))
    dispatch(orderActions.totalRemoveFood(orderedItem))
}


    return (
        <>
        {!orderSent?
            <div className="food-page">
            
                <div className="order-page">
                    <div className="info-wrapp">
                        
                        <div className="all-forms">
                            <div className="info-block">
                                <label>Name:</label>
                                <input  type='text' name='name' value={inputs.name} onChange={inputHandler} placeholder={inputsValid.name}></input>
                            </div>
                            <div className="info-block">
                                <label>Email:</label>
                                <input type='text' name='email' value={inputs.email} onChange={inputHandler} placeholder={inputsValid.email}></input>
                            </div>
                            <div className="info-block">
                                <label>Phone:</label>
                                <input  name='phone' value={inputs.phone} onChange={inputHandler} placeholder={inputsValid.phone}></input>
                            </div>
                            <div className="info-block">
                                <label>Address:</label>
                                <input  type='text' name='adress' value={inputs.adress} onChange={inputHandler} placeholder={inputsValid.adress}></input>
                            </div>

                            <Map></Map>
                        </div>
                        
                    </div>

                    
                    <div className="order-wrapp">
                            {orderState.length>0 ?
                                orderState.map(item=>{
                                    return <div className="ordercard">
                                                <img className="ordercard-img" src={`/imgs/${item.img}`}/>
                                                <div className="text">
                                                        <p>{item.foodName}</p>
                                                        <p className="small-text">Price: ${item.price}</p>
                                                        <p className="small-text">Amount: {item.quantity}</p>
                                                        <p className="card-total">Total: ${item.price*item.quantity}</p>
                                                </div>
                                                <div className="button-wrap">
                                                    <button onClick={addToOrderHandler} name={JSON.stringify(item)}>+</button>
                                                    <button onClick={deleteFoodFromOrder} name={JSON.stringify(item)}>-</button>
                                                </div>
                                                <img className="close" src={'/imgs/close.png'} name={JSON.stringify(item)} onClick={deleteCard}/>
                                        </div>
                                })
                                
                                : <p className="text-err">No items in cart</p>
                            }

                            <div className="bottom">
                            
                        </div>
                    
                    </div>
                        
                </div>
                            <div className='fin'>
                                <div className="total-block"> 
                                    <p>TOTAL:</p>
                                    <span>${mostTotalPrice}</span>
                                </div>
                                <button className="conf" onClick={confirmHandler}>Submit</button>
                            </div>
                
            </div>
        : <div className="food-page">
                <h2 className="completed" >Odrer completed</h2>
        </div>
        }

                        
        </>
    )
}

export default Order