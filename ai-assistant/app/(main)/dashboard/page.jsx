import React from "react";
import Feature from "./_components/Feature";
import Feedback from "./_components/Feedback";
import History from "./_components/History";

function Dashboard() {
  return (
    <div>
      <Feature />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 p-4">
        <History />
        <Feedback />
      </div>
    </div>
  );
}

export default Dashboard;
