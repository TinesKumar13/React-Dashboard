import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import Legend from "./Legend";
import Typography from "@material-ui/core/Typography";

const Piechart = ({ cases }) => {
  const useStyles = makeStyles({
    root: {
      width: 335,
      height: 375,
      position: "relative",
      left: -15,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
    },
    new: {
      height: 10,
      width: 20,
      background: "blue",
    },
    death: {
      height: 10,
      width: 20,
      background: "yellow",
    },

    recovery: {
      height: 10,
      width: 20,
      background: "red",
    },
    date: {
      fontSize: 14,
      color: "text-secondary",
    },
  });

  const { newCase, newDeath, newRecovery, date } = cases[0];
  var s = new Date(date.seconds * 1000).toLocaleDateString();
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`Statistics As Of ${s}`}
          </Typography>
          <PieChart
            data={[
              { title: "New Cases", value: newCase, color: "#ffc658" },
              { title: "New Deaths", value: newDeath, color: "#FF6666" },
              {
                title: "New Recoveries",
                value: newRecovery,
                color: "#7AFF66",
              },
            ]}
            radius="40"
            animate="true"
            center={[50, 45]}
            animationDuration="1000"
            animationEasing="ease-out"
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
            labelStyle={{ fontSize: "0.3rem", fontWeight: "bold" }}
          />
          <Legend />
        </CardContent>
      </Card>
    </div>
  );
};

export default Piechart;
