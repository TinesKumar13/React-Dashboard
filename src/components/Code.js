import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import QRCode from "qrcode.react";
import {Link as Linker} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    },
    image: {
      background: "linear-gradient(to right top, #65dfc9, #6cdbeb)",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      width: "100%"
    },
    input: {
     width: "100%"
    },
    shop : {
      display: "flex",
      flexDirection: "column"
    },
    main : {
       display: "flex",
       flexDirection: "column"
    }
  }));

const Code = () => {

    const classes = useStyles();
    const [code, setCode] = useState("");
    const [qr, setQR] = useState()

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

    const handleSubmit = (e) => {
        e.preventDefault()
       setQR(code)
      
       
     
    }

    const shopQR = () => {
        if (qr) {
          return (
            <div>
              <QRCode
                value={qr}
                id="qr-gen"
                size={290}
                level={"H"}
                includeMargin={true}
              />
    
              <p className={classes.shop}>
                <button type="button" onClick={downloadQRCode} >
                  Download QR Code
    
                </button>
              *Your Shop ID : {qr} 
           
    
                
              </p>
              <p>*Note this ID in case you lose your QR Code</p>
    
            </div>
          );
        } else {
        }
      };
    
    return (
        <div className={classes.root}>
            <form  noValidate className={classes.main}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="code"
              label="Shop ID"
              name="code"
              autoComplete="code"
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={classes.input}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleSubmit}
            >
             Get QR Now
            </Button>
            <Linker to="/">Back To Main Page</Linker>
            </form>
            {shopQR()}
        </div>
    )
}

export default Code
