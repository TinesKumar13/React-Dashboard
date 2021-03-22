import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import db from "../firebase.config";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const columns = [
  { id: "displayName", label: "Name", minWidth: 170 },
  {
    id: "ic",
    label: "IC Number",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 170,
    format: (value) => value.toLocaleString("en-US"),
  },
];



const Shops = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [check ,setCheck] = useState([])
  const [fail , setFail] = useState(false)



  const useStyles = makeStyles({
    root: {
      width: 620,
      height: 525,
      position: "absolute",
      right: 600,
      top: 839,
      left: 928,
    },
    container: {
      maxHeight: 440,
    },
    drop : {
   display: "flex",
   alignItems:"center",
   justifyContent: "space-between",
   
  
  
     },
     input: {
      width: "30%",
      marginLeft: "0.2rem"
      
     },


  });

  const classes = useStyles();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    populateData()
  }, []);

/*  const fetchCases = async () => {
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setRows(data);
      });
  };*/

  const populateData = () => {
    setFail(false)
    return db.collection("users").onSnapshot(snapshot => {
      const usersdata = [];
      snapshot.forEach(doc => usersdata.push({...doc.data()}))
      setRows(usersdata)
      setCheck(usersdata)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

   const verifier = []
  
    check.some(c => (

  c.ic === name ? verifier.push(c) : ""
   
    ))

    if(verifier.length > 0){
      setName("")
      setRows(verifier)
      setFail(false)
    }else {
      setName("")
       setRows([])
       setFail(true)
    }
  }




  return (
    
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} style={row.covid === true ? {background:"#ff8484"} : {background:"white"}}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      
                      return (
                        <TableCell key={column.id} align={column.align} >
                          <Link
                            style={{ textDecoration: "none", color: "black" }}
                            to={`/usertrack/${row.id}`}
                            
                          >
                            {value}
                          </Link>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

      </TableContainer>
      
      <div className={classes.drop}>
        <form onSubmit={handleSubmit} className={classes.input}>
            
     
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="IC"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error = {fail}
              onSubmit={handleSubmit}
            />
</form>
<KeyboardBackspaceIcon style={{marginLeft: "0.1rem"}} onClick={populateData}/>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      
      </div>


    </Paper>
  );
};

export default Shops;
