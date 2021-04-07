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
    marginLeft: "3rem",
  },

  links: {
    textDecoration: "none",
    color: "white",
  },
  form: {
    position: "absolute",
    left: "46rem",
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
  const [kedah, setKedah] = useState("");
  const [kelantan, setKelantan] = useState("");
  const [melaka, setMelaka] = useState("");
  const [sembilan, setSembilan] = useState("");
  const [pahang, setPahang] = useState("");
  const [penang, setPenang] = useState("");
  const [perak, setPerak] = useState("");
  const [perlis, setPerlis] = useState("");
  const [sabah, setSabah] = useState("");
  const [sarawak, setSarawak] = useState("");
  const [terengganu, setTerengganu] = useState("");
  const [lumpur, setLumpur] = useState("");
  const [labuan, setLabuan] = useState("");
  const [putrajaya, setPutrajaya] = useState("");
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

  const handleSubmit = (e) => {
    if (
      selangor === "" ||
      johor === "" ||
      kedah === "" ||
      kelantan === "" ||
      melaka === "" ||
      sembilan === "" ||
      pahang === "" ||
      penang === "" ||
      perak === "" ||
      perlis === "" ||
      sabah === "" ||
      sarawak === "" ||
      terengganu === "" ||
      lumpur === "" ||
      labuan === "" ||
      putrajaya === "" ||
      recoveries === "" ||
      deaths === ""
    ) {
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
          {
            name: "Kedah",
            new_case: parseInt(kedah),
            total_case: parseInt(kedah) + prev.negeri[2].total_case,
          },
          {
            name: "Kelantan",
            new_case: parseInt(kelantan),
            total_case: parseInt(kelantan) + prev.negeri[3].total_case,
          },
          {
            name: "Melaka",
            new_case: parseInt(melaka),
            total_case: parseInt(melaka) + prev.negeri[4].total_case,
          },
          {
            name: "Negeri Sembilan",
            new_case: parseInt(sembilan),
            total_case: parseInt(sembilan) + prev.negeri[5].total_case,
          },
          {
            name: "Pahang",
            new_case: parseInt(pahang),
            total_case: parseInt(pahang) + prev.negeri[6].total_case,
          },
          {
            name: "Penang",
            new_case: parseInt(penang),
            total_case: parseInt(penang) + prev.negeri[7].total_case,
          },
          {
            name: "Perak",
            new_case: parseInt(perak),
            total_case: parseInt(perak) + prev.negeri[8].total_case,
          },
          {
            name: "Perlis",
            new_case: parseInt(perlis),
            total_case: parseInt(perlis) + prev.negeri[9].total_case,
          },
          {
            name: "Sabah",
            new_case: parseInt(sabah),
            total_case: parseInt(sabah) + prev.negeri[10].total_case,
          },
          {
            name: "Sarawak",
            new_case: parseInt(sarawak),
            total_case: parseInt(sarawak) + prev.negeri[11].total_case,
          },
          {
            name: "Terengganu",
            new_case: parseInt(terengganu),
            total_case: parseInt(terengganu) + prev.negeri[12].total_case,
          },
          {
            name: "Kuala Lumpur",
            new_case: parseInt(lumpur),
            total_case: parseInt(lumpur) + prev.negeri[13].total_case,
          },
          {
            name: "Labuan",
            new_case: parseInt(labuan),
            total_case: parseInt(labuan) + prev.negeri[14].total_case,
          },
          {
            name: "Putrajaya",
            new_case: parseInt(putrajaya),
            total_case: parseInt(putrajaya) + prev.negeri[15].total_case,
          },
        ],
        newCase:
          parseInt(johor) +
          parseInt(selangor) +
          parseInt(kedah) +
          parseInt(kelantan) +
          parseInt(melaka) +
          parseInt(sembilan) +
          parseInt(pahang) +
          parseInt(penang) +
          parseInt(perak) +
          parseInt(perlis) +
          parseInt(sabah) +
          parseInt(sarawak) +
          parseInt(terengganu) +
          parseInt(lumpur) +
          parseInt(labuan) +
          parseInt(putrajaya),
        newDeath: parseInt(deaths),
        newRecovery: parseInt(recoveries),
        totalCase:
          parseInt(selangor) +
          prev.negeri[0].total_case +
          parseInt(johor) +
          prev.negeri[1].total_case +
          parseInt(kedah) +
          prev.negeri[2].total_case +
          parseInt(kelantan) +
          prev.negeri[3].total_case +
          parseInt(melaka) +
          prev.negeri[4].total_case +
          parseInt(sembilan) +
          prev.negeri[5].total_case +
          parseInt(pahang) +
          prev.negeri[6].total_case +
          parseInt(penang) +
          prev.negeri[7].total_case +
          parseInt(perak) +
          prev.negeri[8].total_case +
          parseInt(perlis) +
          prev.negeri[9].total_case +
          parseInt(sabah) +
          prev.negeri[10].total_case +
          parseInt(sarawak) +
          prev.negeri[11].total_case +
          parseInt(terengganu) +
          prev.negeri[12].total_case +
          parseInt(lumpur) +
          prev.negeri[13].total_case +
          parseInt(labuan) +
          prev.negeri[14].total_case +
          parseInt(putrajaya) +
          prev.negeri[15].total_case,

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
          label="Kedah"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setKedah(e.target.value)}
          value={kedah}
        />
        <TextField
          required
          id="outlined-basic"
          label="Kelantan"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setKelantan(e.target.value)}
          value={kelantan}
        />
        <TextField
          required
          id="outlined-basic"
          label="Melaka"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setMelaka(e.target.value)}
          value={melaka}
        />
        <TextField
          required
          id="outlined-basic"
          label="Negeri Sembilan"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setSembilan(e.target.value)}
          value={sembilan}
        />
        <TextField
          required
          id="outlined-basic"
          label="Pahang"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setPahang(e.target.value)}
          value={pahang}
        />
        <TextField
          required
          id="outlined-basic"
          label="Penang"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setPenang(e.target.value)}
          value={penang}
        />
        <TextField
          required
          id="outlined-basic"
          label="Perak"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setPerak(e.target.value)}
          value={perak}
        />
        <TextField
          required
          id="outlined-basic"
          label="Perlis"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setPerlis(e.target.value)}
          value={perlis}
        />
        <TextField
          required
          id="outlined-basic"
          label="Sabah"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setSabah(e.target.value)}
          value={sabah}
        />
        <TextField
          required
          id="outlined-basic"
          label="Sarawak"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setSarawak(e.target.value)}
          value={sarawak}
        />
        <TextField
          required
          id="outlined-basic"
          label="Terengganu"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setTerengganu(e.target.value)}
          value={terengganu}
        />
        <TextField
          required
          id="outlined-basic"
          label="Kuala Lumpur"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setLumpur(e.target.value)}
          value={lumpur}
        />
        <TextField
          required
          id="outlined-basic"
          label="Labuan"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setLabuan(e.target.value)}
          value={labuan}
        />
        <TextField
          required
          id="outlined-basic"
          label="Putrajaya"
          variant="outlined"
          className={classes.text}
          type="number"
          onChange={(e) => setPutrajaya(e.target.value)}
          value={putrajaya}
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
          <Link to="/dashboard" className={classes.links}>
            Back To Dashboard
          </Link>
        </Button>
      </form>
      {(errorMessage(), successMessage())}
    </div>
  );
};

export default UpdateStates;
