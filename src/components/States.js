import React, { useEffect, useState } from "react";
import db from "../firebase.config";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: 290,
  },
});

export const States = () => {
  const [negeri, setNegeri] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    stateCases();
  }, []);

  const stateCases = async () => {
    db.collection("state_cases")
      .orderBy("date")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());

        setNegeri(data[data.length - 1].negeri);
        setDate(data[data.length - 1].date);
      });
  };

  const classes = useStyles();
  var s = date && new Date(date.seconds * 1000).toLocaleDateString();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <caption>Updated at {s}</caption>
        <TableHead>
          <TableRow>
            <TableCell>States</TableCell>
            <TableCell align="right">New Cases</TableCell>
            <TableCell align="right">Total Cases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {negeri &&
            negeri.map((n) => (
              <TableRow key={n.name}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell align="right">{n.new_case}</TableCell>
                <TableCell align="right">{n.total_case}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
