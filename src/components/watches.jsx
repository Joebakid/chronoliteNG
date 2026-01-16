import React, { useEffect } from "react";
import WatchGrid from "./WatchGrid";
import watches from "../watches.json";

function Watches({ Btn }) {
  useEffect(() => {
    document.title = "Watch";
  }, []);

  return (
    <WatchGrid
      items={watches}
      discountType="watch"
      discountAmount={3000}  
    />
  );
}

export default Watches;
