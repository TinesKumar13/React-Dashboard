import React, { useState, useEffect } from "react";
import SimpleCard from "./components/Card";
import db from "./firebase.config";
import "./App.css";
import PersonIcon from "@material-ui/icons/Person";
import { States } from "./components/States";
import { Link } from "react-router-dom";
import Piechart from "./components/pieChart";
import Alltime from "./components/Alltime";
import NegeriStat from "./components/funnelChart";
import Shops from "./components/Shops";
import Shopping from "./components/Shoppping";

const App = ({ setAuth, auth }) => {
  const [cases, setCases] = useState();
  const [all, setAll] = useState();

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    db.collection("state_cases")
      .orderBy("date")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const values = data[data.length - 1];
        setAll([data]);
        setCases([values]);
      });
  };

  return (
    <div className="main__Container">
      <div className="main__Header">
        <h1>CovInfo</h1>
        <div className="main__Account">
          <Link to="/updateCases" className="links">
            Update Cases
          </Link>
          <Link to="/" className="links" onClick={() => setAuth(false)}>
            Logout
          </Link>
          <PersonIcon />
        </div>
      </div>

      <div className="stats_Container">
        <div className="stats__Main">
          {cases && (
            <div className="stats__Shower">
              <SimpleCard
                title="Total Number Of Cases"
                cases={cases[0].newCase}
                colour="#ffc658"
                date={cases[0].date}
                total={cases[0].totalCase}
              />
              <SimpleCard
                title="Total Deaths"
                cases={cases[0].newDeath}
                colour="#FF6666"
                date={cases[0].date}
                total={cases[0].totalDeath}
              />
              <SimpleCard
                title="Total Recoveries"
                cases={cases[0].newRecovery}
                colour="#7AFF66"
                date={cases[0].date}
                total={cases[0].totalRecovery}
              />
            </div>
          )}
          <div className="piechart__Stats">
            {cases && <Piechart cases={cases} />}
            {cases && <Alltime cases={all} />}
          </div>
          {cases && <NegeriStat cases={cases} />}
          <Shops />
        </div>

        <div className="states_Container">
          <States />

        </div>

      </div>

      <Shopping/>


    </div>
  );
};

export default App;
