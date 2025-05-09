import React from "react";
import Navbar from "./_components/Navbar";

function Dashboard({ children }) {
  return (
    <div>
      <Navbar />
      <div className="p-10m mt-10 md:px-20 lg:32 xl:px-56 2xl:72">
        {children}
      </div>
    </div>
  );
}

export default Dashboard;
