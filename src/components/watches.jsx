import React, { useEffect } from "react";
import WatchGrid from "./WatchGrid";
import watches from "../watches.json"; // Import watches JSON data

function Watches({ Btn }) {
  useEffect(() => {
    document.title = "Watch"; // Update the tab name
  }, []); // Empty dependency array means this effect runs once on mount
  return <WatchGrid Btn={Btn} items={watches} />;
}

export default Watches;
