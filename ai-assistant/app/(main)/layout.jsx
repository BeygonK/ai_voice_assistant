import React from "react";
import Navbar from "./_components/Navbar";

function Dashboard({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Dashboard;
