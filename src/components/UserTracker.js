import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import db from "../firebase.config";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "./Map.css";

const UserTracker = () => {



  const [details, setDetails] = useState();
  const [profile, setProfile] = useState()
  

  let { id } = useParams();
  let trimmed = id.trim()

  useEffect(() => {
 
    fetchUser()

   
  },[])


  useEffect(() => {
 
    fetchProfile()

   
  },[])


  const val = [];
  const redOptions = { color: "red" };

  const addFunction = (a, b) => {
    const data = [];
    data.push.apply(data, [a, b]);
    val.push(data);
  };

  addFunction(3.0782, 101.5883);
  addFunction(3.0567, 101.5851);

  const fetchUser = async () => {

  
    
    db.collection("users")
      .doc(trimmed)
      .collection("check_in")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
          
            setDetails(doc.data())
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  };

  const fetchProfile = async () => {

  
    
    db.collection("users")
      .doc(trimmed)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log(doc.data())
           setProfile(doc.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  }

  const useStyles = makeStyles({
    root: {
      width: 475,
      height: 505,
      margin: 30

    },
    title: {
      fontSize: 14,

    },
    container : {
      display : "flex",
      alignItems: "center",
      height: 600,
      justifyContent: "center"
   
    }

  });

  const classes = useStyles();

 

return  (
    
    <div className="container">
  
    <div  className={classes.container}>
      <Card className={classes.root}>
        <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Hello
        </Typography>
        </CardContent>
      </Card>

      <Card className={classes.root}>
        <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Hello Part 2
        </Typography>
        </CardContent>
      </Card>
    </div>

    <MapContainer center={val[0]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {val.map((v) => {
        return (
          <CircleMarker
            center={v}
            pathOptions={redOptions}
            radius={35}
            className="circle red"
            key={v}
          />
        );
      })}
    </MapContainer>
   
  </div>
  )
};

export default UserTracker;
