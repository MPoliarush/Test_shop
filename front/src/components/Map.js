import {GoogleMap, useLoadScript,Marker} from '@react-google-maps/api'

function Map(){

 console.log(process.env)   

    const {isLoaded} = useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_API_KEY,

    })

    if(!isLoaded){
        return (<></>)
    }



    return (
        <div title='Section is under reconstruction)'>
        <GoogleMap zoom={10} center={{lat:50.5, lng:30.5 }} mapContainerClassName='map-cont'>
            <Marker position={{lat:50.46, lng:30.5 }}></Marker>
        </GoogleMap>
        </div>
       
    )
}

export default Map