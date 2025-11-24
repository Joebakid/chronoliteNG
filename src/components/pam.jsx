"use client";

import React, { useEffect, useState } from "react";
import WatchGrid from "../components/WatchGrid"; // adjust path if needed

function Pam({ Btn }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Pam";

    const loadItems = async () => {
      try {
        const res = await fetch("/pam/pam.json", { cache: "no-store" });

        if (!res.ok) {
          console.error("Failed to load pam.json. Status:", res.status);
          setItems([]);
          return;
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          console.error("pam.json must contain an array:", data);
          setItems([]);
          return;
        }

        setItems(data);
      } catch (error) {
        console.error("Error loading pam.json:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading items...</div>;
  }

  return <WatchGrid Btn={Btn} items={items} />;
}

export default Pam;
