import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CountUp from "react-countup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";
import { motion } from "framer-motion";
const SimpleCard = ({ title, cases, colour, date, total }) => {
  const useStyles = makeStyles({
    root: {
      width: 275,
      height: 305,
      margin: "5px 20px 20px 20px",
      position: "relative",
      left: 95,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
      color: colour,
      fontWeight: "bold",
    },
    pos: {
      marginBottom: 12,
    },

    counter: {
      fontSize: 45,
      color: colour,
    },
    progress: {
      height: 140,
      width: 230,
    },
    date: {
      fontSize: 14,
      color: "text-secondary",
    },
  });

  const classes = useStyles();
  var s = new Date(date.seconds * 1000).toLocaleDateString();
  // expected output "8/30/2017"
  var percentageCases = (cases/total)*100
  return (
    <motion.div     
   
    initial={{ scale: 0 }}
    animate={{ rotate: 360, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 200,
      damping: 45
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    >
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography className={classes.date} color="textSecondary" gutterBottom>
          {s}
        </Typography>

        <Typography className={classes.counter}>
          <CountUp end={total} className={classes.counter} />
        </Typography>
        <ProgressProvider valueStart={0} valueEnd={percentageCases}>
          {(value) => (
            <CircularProgressbar
              value={value}
              maxValue={100}
              pathColor={colour}
              className={classes.progress}
              styles={buildStyles({
                pathColor: colour,
                transition: "stroke-dashoffset 0.5s ease 0s",
                pathTransitionDuration: 2.5,
              })}
            />
          )}
        </ProgressProvider>
        <Typography className={classes.title} gutterBottom>
          +{cases} New
        </Typography>
      </CardContent>
    </Card>
    </motion.div>
  );
};

export default SimpleCard;
