import React, { useEffect } from "react";
import WatchGrid from "./WatchGrid";
import shirts from "../plainshirt.json"; // Import watches JSON data

function PlainTee({ Btn }) {
  useEffect(() => {
    document.title = "Shirt"; // Update the tab name
  }, []); // Empty dependency array means this effect runs once on mount
  return <WatchGrid Btn={Btn} items={shirts} />;
}

export default PlainTee;
