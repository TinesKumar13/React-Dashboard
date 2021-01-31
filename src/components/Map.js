import React, {useState} from 'react'
import { MapContainer, TileLayer, CircleMarker , Popup} from "react-leaflet";
import Checkbox from '@material-ui/core/Checkbox';
import "./Map.css";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const MapShower = ({locations}) => {
 
    
    const val = []
    const redOptions = { color: "red" };
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
      setChecked(!checked)
    };


  
            
        for (let index = 0; index < locations.length; index++) {
          
            const data = []
            

            data.push.apply(data, [locations[index].latitude, locations[index].longitude])
         

            val.push(data)
            
        }
    
     
        let guid = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }


      
    return (

        
        <div>
                <div className="last__Seen">
                        <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <h3>Last Seen Location</h3>
       <Link to = "/dashboard" className="button__Dashboard" style={{ textDecoration: 'none' }}>      <Button variant="contained" color="primary" size="small" style={{textDecoration:"none"}}>
            Back To Dashboard
            </Button></Link>

                </div>


            {val && (<MapContainer center={val[0]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        { 
            

            checked ?      <CircleMarker center={val[val.length - 1]}                 
            pathOptions={redOptions}
            radius={35}
            className="circle red"
            key={guid}>
                 <Popup>{`lat:${val[val.length - 1][0]}\u00A0 long :${val[val.length - 1][1]}\u00A0`}</Popup>
            </CircleMarker>    :   val.map(v => (

                <CircleMarker
                center={v}
                pathOptions={redOptions}
                radius={35}
                className="circle red"
                key={guid}
              >


            
         

                <Popup>{`lat:${v[0]}\u00A0 long :${v[1]}\u00A0`}</Popup>
               ))
          

               

       
              
                
              </CircleMarker>
            
                
            ))

         


        }

    </MapContainer>)}

        </div>
             )
}

export default MapShower

