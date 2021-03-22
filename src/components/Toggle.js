import React, {useEffect, useState} from 'react'
import Switch from '@material-ui/core/Switch';
import db from '../firebase.config';
import "./Toggle.css"

const Toggle = ({profile}) => {

    const {covid} = profile

    const [positive, setPositive] = useState(covid)

    const handleCovid =  ()  => {
       
        setPositive(p => !p)



    }

    useEffect(() => {
                
        try {
            db.collection("users").doc(profile.id.trim()).update({
                covid : positive
            })
        } catch (error) {
            console.log(error)
        }
    }, [positive])
    return (
        <div className="slider">
            <Switch    
        checked={positive}
        onChange={() => handleCovid()}
        inputProps={{ 'aria-label': 'secondary checkbox' }}/>
        </div>
    )
}

export default Toggle
