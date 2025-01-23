import React, { useEffect } from "react";
import WatchGrid from "./WatchGrid";
import bags from "../femalebags.json"; // Import bags JSON data

function FemaleBags({ Btn }) {
  useEffect(() => {
    document.title = "Female Bags"; // Update the tab name
  }, []); // Empty dependency array means this effect runs once on mount

  return <WatchGrid Btn={Btn} items={bags} />;
}

export default FemaleBags;
