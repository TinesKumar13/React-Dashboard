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
import Restaurant from "./Restaurant"
import moment from "moment"
import { CSVLink } from "react-csv";
import Toggle from "./Toggle";







const UserTracker = () => {



  const [details, setDetails] = useState([]);
  const [profile, setProfile] = useState()
  const [location, setLocation] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [proximity, setProximity] = useState([])
  const [users, setUsers] = useState([])
  const [shops, setShops] = useState([])
  const [visited, setVisited] = useState([])


  var nowDate = moment().unix()
  var pastDate = moment().subtract(14, 'days').unix()




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
    .where("date", ">", beginningDateObject)
    .orderBy("date")
    .onSnapshot(snapshot => {
      const detailData = []
      const seen = new Set()
      snapshot.forEach(doc => detailData.push({...doc.data()}))
      const filteredArr = detailData.filter(el => {
        const duplicate = seen.has(el.shop_id);
        seen.add(el.shop_id);
        return !duplicate;
      });
    
      setDetails(detailData)
      setVisited(filteredArr)
    })

   
  },[])




  useEffect(() => {
 
    fetchProfile()

   
  },[])

  useEffect(() => {
 
  return db.collection("users").doc(trimmed).collection("location")
          .where("time", ">", beginningDateObject)//remove this for all location
          .orderBy("time")
          .onSnapshot(snapshot => {
            const locationData = []
            snapshot.forEach(doc => locationData.push({...doc.data()}))
            setLocation(locationData)
          })

   
  },[])

  var beginningDate = Date.now() - 1209600000 ;
var beginningDateObject = new Date(beginningDate);



  useEffect(() => {
 
    return db.collection("users").doc(trimmed).collection("close_contact")
            .orderBy("date")
            .where('date', '>', beginningDateObject)

            .onSnapshot(snapshot => {
              const proximityData = []
              const seen = new Set()
              snapshot.forEach(doc => proximityData.push({...doc.data()}))
             
             const filteredArr = proximityData.filter(el => {
                const duplicate = seen.has(el.user_id);
                seen.add(el.user_id);
                return !duplicate;
              });
            
            
              setProximity(filteredArr)
      
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


  useEffect(() => {
    return db.collection("users").onSnapshot(snapshot => {
      const usersdata = [];
      snapshot.forEach(doc => usersdata.push({...doc.data()}))
      setUsers(usersdata)
    
    })
   }, []);







  const useStyles = makeStyles({
    root: {
      width: 375,
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
      width: "80%",
      justifyContent: "space-evenly",

    
    },

    details: {
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
   
    },
    rootPaper: {
      width: 505,
      height: 505,

    },
    containerPaper: {
      height: 450,
    },

    download : {
      position : "absolute",
      bottom : 585,
      paddingLeft: "1rem"
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


  const column = [
    { id: 'customerName', label: 'Name', minWidth: 170, 
    format: (value) => value.displayName },

        
    { id: 'icNumber', label: 'IC', minWidth: 170, 
    format: (value) => value.ic },
    
    { id: 'contactNumber', label: 'Phone', minWidth: 170, 
    format: (value) => value.phoneNumber },

  
    {
      id: 'date',
      label: 'Date & Time',
      minWidth: 150,
  
    }
  
  ];

  const data = []


  
  



  proximity && proximity.map(p => {
  
    data.push({
     
      customerName: users.find(user => {
        if(user.id === p.user_id)  {
        return user.displayName
        }
      }),

      icNumber: users.find(user => {
        if(user.id === p.user_id)  {
        return user.displayName
        }
      }),
     
      contactNumber: users.find(user => {
        if(user.id === p.user_id)  {
        return user.displayName
        }
      }),
  
      date : new Date(p.date.seconds * 1000).toLocaleString()
      
    })

return data

  })


  const headers = [
    { label: "Name", key: "customerName.displayName"},
    { label: "IC", key: "icNumber.ic"},
    { label: "Phone Number", key: "contactNumber.phoneNumber" },
    { label: "Date & Time", key: "date"}
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
        {profile && <Toggle profile={profile}/>}
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

    <Paper className={classes.rootPaper}>
      <TableContainer className={classes.containerPaper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {column.map((c) => (
                <TableCell
                  key={c.id}
                  align={c.align}
                  style={{ minWidth: c.minWidth }}
                >
                  {c.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={d.customerName}>
                  {column.map((c) => {
                    const value = d[c.id]
                
                    return (
                      <TableCell key={c.id} align={c.align}>
                        {c.format && typeof value === 'object' ? c.format(value):value}
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
            <CSVLink data={data} headers={headers} className={classes.download}>
  Download CSV 
</CSVLink>
    </Paper>
    <Restaurant date={beginningDateObject} visited={visited} customers={users} profile={profile}/>
    </div>

        {location.length > 0 && <MapShower locations={location} profile={profile}/> }
      
    
  </div>
  )
};

export default UserTracker;
