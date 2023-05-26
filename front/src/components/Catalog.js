import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import axios from "axios";

import FoodCart from './FoodCart'




function Catalog(props){

const [fetcheddata, setFetchedData] = useState([])
const [chosedRestaurant,setChoosedRest] = useState([])
const [activeLi,setActoveLi] =useState([])
const [loading, setLoading] = useState(false);
const orderState =  useSelector(state=>state.basket.food) 



useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  
async function getInfo () {
        try{
            const response = await axios("https://food-38pa.onrender.com/getrest")
           
            
            if(orderState.length==0){
                setChoosedRest([response.data[0]])
            }

            setFetchedData(response.data)
            console.log(response.data)
            console.log([response.data[0]])
            const firstRest = response.data[0].restaurantName
            setActoveLi({
                [firstRest]:true
            })
        }catch(e){
            console.log(e.response)
        }  
}


useEffect(()=>{

    getInfo ()

},[])



useEffect(()=>{

    // console.log(fetcheddata)
    if(orderState.length>0){
        let choosedRestdata = fetcheddata.find(item=> {
            console.log(orderState[0].restaurantName  ,  item.restaurantName)
            return item.restaurantName == orderState[0].restaurantName})
        setChoosedRest([choosedRestdata])
    }

},[fetcheddata])



function restaurantHandler(e){
    // console.log(e.currentTarget.getAttribute('name'))
    let choosedRestdata = fetcheddata.find(item=> item.restaurantName == e.currentTarget.getAttribute('name'))
    // console.log(choosedRestdata)
    setChoosedRest([choosedRestdata])
   
    setActoveLi({
        [e.currentTarget.getAttribute('name')]: true
    })

}




    return (
        <main>
            <div className='shops-wrapp'>
            <h2>Available restaurants:</h2>
                <ul>
                    {/* {fetcheddata.map(item=>{
                        return  <li className={activeLi[item.restaurantName] ? "shops-wrapp liActive" : ''} key={Math.random()} onClick={restaurantHandler} name={item.restaurantName}>{item.restaurantName}</li>
                        
                    })} */}

                    {orderState.length>0 ? <li className="shops-wrapp liActive" key={Math.random()} onClick={restaurantHandler} name={orderState[0].restaurantName}>{orderState[0].restaurantName}</li> 
                    : fetcheddata.map(item=>{
                        return  <li className={activeLi[item.restaurantName] ? "shops-wrapp liActive" : ''} key={Math.random()} onClick={restaurantHandler} name={item.restaurantName}>{item.restaurantName}</li>
                        
                    })
                    }
                    
                </ul>

            </div>
            <div className='food-wrapp'>

                {loading ? 
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                :  
                        
                    chosedRestaurant.map(item=>{
                        return  <FoodCart data={item} key= {Math.random()}></FoodCart>
                    })
                        
                }
                    
            </div>
        </main>
            
    )
}


export default Catalog