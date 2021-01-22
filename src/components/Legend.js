import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const Legend = () => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
      marginLeft: "0.2rem",
    },
    new: {
      height: 10,
      width: 20,
      background: "#ffc658",
    },
    death: {
      height: 10,
      width: 20,
      background: "#FF6666",
    },

    recovery: {
      height: 10,
      width: 20,
      background: "#7AFF66",
    },

    label: {
      fontSize: "0.58rem",
      paddingRight: "1rem",
      paddingLeft: "0.1rem",
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.new}></div>
      <h3 className={classes.label}>New Cases</h3>
      <div className={classes.death}></div>
      <h3 className={classes.label}>New Deaths</h3>
      <div className={classes.recovery}></div>
      <h3 className={classes.label}>New Recoveries</h3>
    </div>
  );
};

export default Legend;
