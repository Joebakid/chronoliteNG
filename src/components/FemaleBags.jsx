import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import WatchGrid from "./WatchGrid";
import bags from "../femalebags.json"; // Importing JSON data

function FemaleBags({ Btn }) {
  useEffect(() => {
    document.title = "Female Bags - Chronolite NG"; // Updates browser tab title
  }, []);

  return (
    <>
      <Helmet>
        <title>Female Bags - Chronolite NG</title>
        <meta property="og:title" content="Female Bags - Chronolite NG" />
        <meta
          property="og:description"
          content="Explore our exclusive collection of female bags at Chronolite NG."
        />
        <meta
          property="og:image"
          content="https://chronolite.com.ng/path-to-female-bags-image.jpg"
        />
        <meta
          property="og:url"
          content="https://chronolite.com.ng/femalebags"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <WatchGrid Btn={Btn} items={bags} />
    </>
  );
}

export default FemaleBags;
