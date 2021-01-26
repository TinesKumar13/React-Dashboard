import React from "react";
import { Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { FunnelChart, Tooltip, Funnel, LabelList } from "recharts";

const NegeriStat = ({ cases }) => {
  const negeri = cases[0].negeri.sort(function (a, b) {
    return b.total_case - a.total_case;
  });

  const colours = [
    "#FF0D0D",
    "#FF0D0D",
    "#FF0D0D",
    "#FF0D0D",
    "#FF4E11",
    "#FF4E11",
    "#FF4E11",
    "#FF8E15",
    "#FF8E15",
    "#FF8E15",
    "#FAB733",
    "#FAB733",
    "#FAB733",
    "#ACB334",
    "#ACB334",
    "#ACB334",
  ];
  const data = [];

  for (var i = 0; i < colours.length; ) {
    const n = negeri[i];

    data.push({
      name: n.name,
      value: n.total_case,
      fill: colours[i],
    });

    i++;
  }

  const useStyles = makeStyles({
    root: {
      width: 495,
      height: 485,
      position: "relative",
      left: -15,
      top: 25,
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
    main: {
      height: "90vh",
    },
    content: {
      position: "absolute",
      top: 12,
      right: 10,
    },
  });

  var s = new Date(cases[0].date.seconds * 1000).toLocaleDateString();
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {`Total Cases For States As Of ${s}`}
          </Typography>

          <FunnelChart width={500} height={410} className={classes.content}>
            <Tooltip />
            <Funnel dataKey="value" data={data} isAnimationActive>
              <LabelList
                position="middle"
                fill="#000"
                stroke="none"
                dataKey="name"
              />
            </Funnel>
          </FunnelChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default NegeriStat;
