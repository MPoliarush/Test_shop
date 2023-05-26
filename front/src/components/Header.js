import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link,useParams} from 'react-router-dom'

function Header(){

const [activeTab,setActiveTab] = useState({
shop:false,
order:false,
history:false
})

const basketState = useSelector(state=>state.basket)
const url= window.location.href
// console.log(url)
// console.log(basketState.totalQuantity)


function changeActive(e){
    
    if(e.currentTarget.getAttribute('name')=='Shop'){
        setActiveTab({...activeTab,
            shop:true,
            order:false,
            history:false
        })
    } else if(e.currentTarget.getAttribute('name')=='Cart' || url=='http://localhost:3000/order' ){
        setActiveTab({...activeTab,
            shop:false,
            order:true,
            history:false
        })
    }else if(e.currentTarget.getAttribute('name')=='History'){
            setActiveTab({...activeTab,
                shop:false,
                order:false,
                history:true
            })
    }
}


useEffect(()=>{
    
    
    if(url=='http://localhost:3000/order' ){
        setActiveTab({...activeTab,
            shop:false,
            order:true,
            history:false
        })
    }else if(url=='http://localhost:3000/' ){
        setActiveTab({...activeTab,
            shop:true,
            order:false,
            history:false
        })
    }else if(url=='http://localhost:3000/history' ){
        setActiveTab({...activeTab,
            shop:false,
            order:false,
            history:true
        })
    }


},[])

    return (
        <header>
            <nav>
                <ul className="ul">
                    <Link to='/' className= {activeTab.shop ? "li first activeTab" : "li first"} onClick={changeActive} name='Shop'>Shop</Link>
                    <Link to='/order' className= {activeTab.order ? "li first activeTab" : "li first"} onClick={changeActive} name='Cart'>Shopping Cart <span className='num'>{basketState.totalQuantity}</span></Link>
                    <Link to='/history' className= {activeTab.history ? "li first activeTab" : "li first"} onClick={changeActive} name='History'>History</Link>

                </ul>
            </nav>
        </header>
    )
}


export default Header