import {Outlet} from 'react-router-dom'

import Header from './components/Header'

function Root (){


return (
<>

  
        <div className="App">
            <div className='content-container'>
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
           
       
 
        

</> 
)
}

export default Root