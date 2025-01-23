import React from "react";
import WatchGrid from "./WatchGrid";
import watches from "../watches.json"; // Import watches JSON data

function Watches({ Btn }) {
  return <WatchGrid Btn={Btn} items={watches} />;
}

export default Watches;
