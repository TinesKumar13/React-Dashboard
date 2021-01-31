import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import db from "../firebase.config";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import "./Map.css";
import MapShower from "./Map";







const UserTracker = () => {



  const [details, setDetails] = useState([]);
  const [profile, setProfile] = useState()
  const [location, setLocation] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  let { id } = useParams();
  let trimmed = id.trim()

  useEffect(() => {
 
    return db.collection("users").doc(trimmed).collection("check_in")
    .orderBy("date")
    .onSnapshot(snapshot => {
      const detailData = []
      snapshot.forEach(doc => detailData.push({...doc.data()}))
      setDetails(detailData)
    })

   
  },[])


  useEffect(() => {
 
    fetchProfile()

   
  },[])

  useEffect(() => {
 
  return db.collection("users").doc(trimmed).collection("location")
          .orderBy("time")
          .onSnapshot(snapshot => {
            const locationData = []
            snapshot.forEach(doc => locationData.push({...doc.data()}))
            setLocation(locationData)
          })

   
  },[])










  const fetchProfile = async () => {

  
    
   await db.collection("users")
      .doc(trimmed)
      .get()
      .then(function(doc) {
        if (doc.exists) {
   
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
      margin: 30,
    
  


    },
    title: {
      fontSize: 14,
   

    },
    container : {
      display : "flex",
      alignItems: "center",
      height: 600,
      justifyContent: "center",
    
    },

    details: {
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
   
    },
    rootPaper: {
      width: 475,
      height: 505,

    },
    containerPaper: {
      height: 450,
    },

  });

  const classes = useStyles();

  const columns = [
    { id: 'latitude', label: 'Latitude', minWidth: 170 },
    { id: 'longitude', label: 'Longitude', minWidth: 100 },
    {
      id: 'time',
      label: 'Date & Time',
      minWidth: 100,
      format: (value) => new Date(value.seconds * 1000).toLocaleString()
    }
  
  ];

 

return  (
 
    <div className="container">
  
    <div  className={classes.container}>
      
      <Card className={classes.root}>
        <CardContent className={classes.details}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Name : {profile && profile.displayName}

        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
     
          IC : {profile && profile.ic}  
         
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >

          Phone : {profile && profile.phoneNumber}
        </Typography>

        {details && details.map(detail => (
            
          <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
            
      {`Shop Name : ${detail.shop_name} \u00A0\u00A0Date : ${new Date(detail.date.seconds *1000).toLocaleString()}`}
        </Typography>
        ))}
        </CardContent>
      </Card>

      <Paper className={classes.rootPaper}>
      <TableContainer className={classes.containerPaper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {location.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((l) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={l.latitude}>
                  {columns.map((column) => {
                    const value = l[column.id]
                
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'object' ? column.format(value):value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={location.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>

        {location.length && <MapShower locations={location}/> }

  </div>
  )
};

export default UserTracker;
