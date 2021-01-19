import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../App.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import db from "../firebase.config";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
      display: "flex",
    },
  },

  text: {
    marginBottom: "1rem",
    marginLeft: "3rem",
  },
  button: {
    marginLeft: "4.5rem",
  },

  links: {
    textDecoration: "none",
    color: "white",
  },
  form: {
    position: "absolute",
    left: "47rem",
  },
  alert: {
    position: "absolute",
    bottom: 12,
    left: 450,
  },
}));

const UpdateStates = () => {
  const [selangor, setSelangor] = useState("");
  const [johor, setJohor] = useState("");

  const [deaths, setDeaths] = useState("");
  const [recoveries, setRecoveries] = useState("");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [prev, setPrev] = useState();

  const classes = useStyles();

  const errorMessage = () => {
    if (failure)
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Error updating — <strong>ctry again!</strong>
        </Alert>
      );
  };

  const successMessage = () => {
    if (success)
      return (
        <Alert severity="success" className={classes.alert}>
          <AlertTitle>Success</AlertTitle>
          Cases Updated <strong>check it out!</strong>
        </Alert>
      );
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    db.collection("state_cases")
      .orderBy("date")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        setPrev(data[data.length - 1]);
      });
  };

  console.log(prev);

  const handleSubmit = (e) => {
    if (selangor === "" || johor === "" || recoveries === "" || deaths === "") {
      return (<UpdateStates />), setFailure(true);
    }
    db.collection("state_cases")
      .add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
        negeri: [
          {
            name: "Selangor",
            new_case: parseInt(selangor),
            total_case: parseInt(selangor) + prev.negeri[0].total_case,
          },
          {
            name: "Johor",
            new_case: parseInt(johor),
            total_case: parseInt(johor) + prev.negeri[1].total_case,
          },
        ],
        newCase: parseInt(johor) + parseInt(selangor),
        newDeath: parseInt(deaths),
        newRecovery: parseInt(recoveries),
        totalCase:
          parseInt(selangor) +
          prev.negeri[0].total_case +
          parseInt(johor) +
          prev.negeri[1].total_case,
        totalRecovery: parseInt(recoveries) + prev.totalRecovery,
        totalDeath: parseInt(deaths) + prev.totalDeath,
      })
      .then(() => {
        setSuccess(true);
        setJohor("");
        setSelangor("");
      })
      .catch((error) => {
        console.log(error);
        setFailure(true);
      });
  };

  return (
    <div className={classes.form}>
      <form
        className={classes.root}
        noValidate
        required
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>Update States Cases</h1>
        <TextField
          required
          id="outlined-basic"
          label="Selangor"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setSelangor(e.target.value)}
          value={selangor}
        />
        <TextField
          required
          id="outlined-basic"
          label="Johor"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setJohor(e.target.value)}
          value={johor}
        />
        <TextField
          required
          id="outlined-basic"
          label="New Death"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setDeaths(e.target.value)}
          value={deaths}
        />
        <TextField
          required
          id="outlined-basic"
          label="New Recovery"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setRecoveries(e.target.value)}
          value={recoveries}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Update States
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          <Link to="/" className={classes.links}>
            Back To Dashboard
          </Link>
        </Button>
      </form>
      {(errorMessage(), successMessage())}
    </div>
  );
};

export default UpdateStates;
