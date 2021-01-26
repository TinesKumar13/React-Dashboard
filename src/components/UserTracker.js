import React from "react";
import { Link, useParams } from "react-router-dom";

const UserTracker = () => {
  let { id } = useParams();
  return (
    <div>
      <h1>Hi</h1>
      <Link to="/dashboard">{id}</Link>
    </div>
  );
};

export default UserTracker;
