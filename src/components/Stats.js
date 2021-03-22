import React from 'react'
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
  import "../App.css"
  import { Button } from '@material-ui/core';
  import { Link } from 'react-router-dom';



const Stats = (props) => {
const {negeri , all, index} = props.location.state
const data = []

all.map(a => {
    return data.push({
        date : new Date( a.date.seconds * 1000).toLocaleDateString(),
        total : a.negeri[index].total_case,
        new:  a.negeri[index].new_case,

    })
})

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
    date: {
      fontSize: 14,
      color: "text-secondary",
    },
  });


  const classes = useStyles();

console.log(data)
    return (
        <div className="state__box">
                   <Link to = "/dashboard" className="button__Dashboard" style={{ textDecoration: 'none' }}>      <Button variant="contained" color="primary" size="small" style={{textDecoration:"none"}}>
            Back To Dashboard
            </Button></Link>

        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {negeri.name} Total and New Cases
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
              <Line type="monotone" dataKey="total" stroke="#ffc658" />
              <Line type="monotone" dataKey="new" stroke="#FF6666" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    )
}



export default Stats
