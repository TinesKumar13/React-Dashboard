import React, { useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import db from "../firebase.config";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { CSVLink } from "react-csv";






const useStyles = makeStyles({
  root: {
    width: "20%",
    position: "absolute",
    right: 40,
    top: 50,
 
  },
  container: {
    height: 405,
  },
  view : {
      height: "100vh"
  },
  drop : {
  
   margin: "5px 5px 5px 5px",
   display: "flex",
   alignItems: "center"
  }
});

 const Restaurant = ({date, visited, customers , profile}) => {

  

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [shop, setShop] = useState([])
  const [val , setVal] = useState("")
  const [detail, setDetail] = useState([])
  const [users, setUsers] = useState([])
  const [format, setFormat] = useState([])




  const columns = [
    { id: 'customerName', label: 'Name', minWidth: 170, 
    format: (value) => value.displayName },

        
    { id: 'icNumber', label: 'IC', minWidth: 170, 
    format: (value) => value.ic },
    
    { id: 'contactNumber', label: 'Phone', minWidth: 170, 
    format: (value) => value.phoneNumber },

    { id: 'temperature', label: 'Temperature', minWidth: 100 },
    { id: 'env_temp', label: 'Env Temperature', minWidth: 100 },
  
    {
      id: 'date',
      label: 'Date & Time',
      minWidth: 150,
      format: (value) => new Date(value.seconds * 1000).toLocaleString()
    }
  
  ];
  
  const headers = [
    { label: "Name", key: "customerName.displayName"},
    { label: "IC", key: "icNumber.ic"},
    { label: "Phone Number", key: "contactNumber.phoneNumber" },
    { label: "Temperature", key: "temperature" },
    { label: " Env Temperature", key: "env_temp" },
    { label: "Date & Time", key: "date"}
  ];



  useEffect(() => {
    return db.collection("shops").onSnapshot(snapshot => {
      const shopdata = [];
      snapshot.forEach(doc => shopdata.push({...doc.data()}))
      setShop(shopdata)
    
    })
   }, []);

   useEffect(() => {
    return db.collection("users").onSnapshot(snapshot => {
      const usersdata = [];
      snapshot.forEach(doc => usersdata.push({...doc.data()}))
      setUsers(usersdata)
    
    })
   }, []);



///////////////////////////////////////////////////////////////






  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (shopId, shopName) => {
    
    setAnchorEl(null);
    setVal(shopName)

try {

  return db.collection("shops").doc(shopId.trim()).collection("check_in")
  .where("date", ">" , date)
  .orderBy("date")
  .onSnapshot(snapshot => {
      const detailData = [];
      const seen = new Set()
      snapshot.forEach(doc => detailData.push({...doc.data()}))

                   
   const filteredArr = detailData.filter(el => {
    const duplicate = seen.has(el.customer_id);
    seen.add(el.customer_id);
    return !duplicate;
  });
      setDetail(filteredArr)

      setFormat(filteredArr)

    
  })
  
} catch (error) {

  console.log(error)
  
}



    
  };



  const data = []


format && format.map(f => {

  data.push({
   
    customerName: users.find(user => {
      if(user.id === f.customer_id)  {
      return user.displayName
      }
    }),

    icNumber: users.find(user => {
      if(user.id === f.customer_id)  {
      return user.displayName
      }
    }),
   
    contactNumber: users.find(user => {
      if(user.id === f.customer_id)  {
      return user.displayName
      }
    }),

    temperature : f.temperature,

    env_temp : f.env_temp,


    date : new Date(f.date.seconds * 1000).toLocaleString()

    
  })

  return data
  
})

 var filteredData = data && data.filter(function(d) {
  return d.icNumber.ic !== profile.ic
})







  return (
      <div className={classes.view}>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
   

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
            {filteredData && filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={d.code}>
                  {columns.map((column) => {
                    const value = d[column.id];
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
        <div className={classes.drop}>
        <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            Choose Shop
      </Button>
      <CSVLink data={filteredData} headers={headers}>
  Download CSV For :
</CSVLink>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
  {
      visited && visited.map(v => {
          return       <MenuItem onClick={() => handleClose(v.shop_id,v.shop_name)}>{v.shop_name}</MenuItem>
      })
  }
  
      </Menu>
<h3>{`\u00A0${val}`}</h3>

        </div>
    </Paper>

    </div>
  );
}


export default Restaurant