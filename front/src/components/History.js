import { useState,useEffect } from "react"
import axios from "axios";





function History(){

    const [logged,setLogged]=useState({email:''})
    const [fetchedHistory,setFetchedHistory] = useState([])



function emailHandler(e){
    console.log(e.target.value)
    setLogged({email:e.target.value})
}

async function getData(){
    const config = {
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*"
        }
    }
    console.log(logged)
    try{
        const response = await axios.post('http://localhost:3000/getUserHistory', logged, config )
        console.log(response.data)
        setFetchedHistory(response.data)
    } catch(e){
        console.log(e)
    }
}





    return(
        <>
        <div className="info-wrapp history">
            <div className="info-block">
                <label>Email:</label>
                <input type='text' name='email' onChange={emailHandler} ></input>
            </div>
            <button className="check" onClick={getData}>Check history</button>
        </div>

        <div className="order-history">
                            {fetchedHistory.length>0 ?
                                fetchedHistory.map(item=>{
                                    return <div className="order-card-history">
                                                 <div>   
                                                    {item.order.map(img=><img className="historyIMG" src={`/imgs/${img.img}`}/> )} 
                                                </div>
                                                <div className="text-history">
                                                        {item.order.map(food=> <p>{food.foodName}</p> )}
                                                </div>
                                                <p className="card-total-history">Total: $ {item.order.reduce((acc,curr)=> acc.totalPrice+curr.totalPrice)}</p>
                                        </div>
                                })
                                

                                : <p className="text-err">No items in cart</p>
                            }

                            <div className="bottom">
                    </div>
                    
        </div>
       

        </>
    )
}

export default History