import React, { useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Line,
} from "recharts";
import { Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Alltime = ({ cases }) => {
  const useStyles = makeStyles({
    root: {
      width: 775,
      height: 375,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
      textAlign: "center",
    },
    content: {
      position: "absolute",
      top: 50,
    },
    date: {
      fontSize: 14,
      color: "text-secondary",
    },
  });

  const classes = useStyles();

  const data = [];

  cases &&
    cases[0].map((c) => {
      return data.push({
        date: new Date(c.date.seconds * 1000).toLocaleDateString(),
        cases: c.newCase,
        death: c.newDeath,
        recoveries: c.newRecovery,
      });
    });

  return (
    <div>
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            All Time Analysis Of Cases In Malaysia
          </Typography>
          <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#ffc658" />
            <Line type="monotone" dataKey="recoveries" stroke="#7AFF66" />
            <Line type="monotone" dataKey="death" stroke="#FF6666" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alltime;
