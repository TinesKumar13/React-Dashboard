import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import App from "../App";
import QRCode from "react-qr-code";

import db from "../firebase.config";
import shortid from "shortid";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CovInfo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  },
}));

const Login = () => {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [shop, setShop] = useState("");
  const [address, setAddress] = useState("");
  const [unique, setUnique] = useState();

  const user = "tineshreds@gmail.com";
  const key = "123456";

  const handleSubmit = () => {
    if (email === user && password === key) {
      setAuth(true);
    } else {
      alert("Wrong username or password! Please try again");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (shop === "" || address === "") {
      return <Login />;
    } else {
      const id = shortid.generate();

      db.collection("shops")
        .doc(id)
        .set({
          shop_name: shop,
          address: address,
        })
        .then(() => {
          setShop("");
          setAddress("");
          setUnique(id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const shopQR = () => {
    if (unique) {
      return <QRCode value={unique} id={unique} />;
    }
  };

  return auth ? (
    <App setAuth={setAuth} />
  ) : (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <StorefrontIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Your Shop Now
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Shop Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={shop}
              onChange={(e) => setShop(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Shop Address"
              name="address"
              autoComplete="address"
              autoFocus
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleRegister}
            >
              Register Now
            </Button>

            <Box mt={3}>
              <Copyright />
            </Box>
          </form>
          {shopQR()}
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign In
            </Button>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
