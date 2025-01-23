import React from "react";
import WatchGrid from "./WatchGrid";
import bags from "../femalebags.json"; // Import bags JSON data

function FemaleBags({ Btn }) {
  return <WatchGrid Btn={Btn} items={bags} />;
}

export default FemaleBags;
