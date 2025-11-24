// src/app/pam/page.jsx  OR src/pages/Pam.jsx (adjust path to WatchGrid as needed)
"use client";

import React, { useEffect, useState } from "react";
import WatchGrid from "../components/WatchGrid"; // adjust if your file structure differs

/**
 * Pam page
 *
 * - Probes /pam/ for a set of likely filenames (pam (1).mp4 .. pam (22).mp4)
 * - Loads /pam/pam.json if present (preferred)
 * - Falls back to a DEV container image path (tooling will transform this to a usable URL)
 *
 * Note: Browsers cannot read server directories. This code probes likely public URLs
 * (i.e. /pam/<filename>) and shows any that respond. For an authoritative list,
 * create public/pam/pam.json containing an array of items.
 */

export default function Pam({ Btn }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Use the uploaded container file path (tooling will transform into a URL).
  // This is the local file path you provided in the session and will be used as the final fallback.
  const DEV_CONTAINER_FILE = "/mnt/data/d090db2b-554d-41c7-a670-14a62caad3df.png";

  // Build a candidate list programmatically for pam (1).mp4 .. pam (22).mp4
  const candidateFiles = Array.from({ length: 22 }, (_, i) => `pam (${i + 1}).mp4`);

  useEffect(() => {
    document.title = "Pam";
    discoverPamVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Discover videos:
   * 1) Try /pam/pam.json (preferred)
   * 2) Probe candidateFiles (pam (1).mp4 ... pam (22).mp4)
   * 3) Try a single fallback local file (/pam/VID-20251119-WA0003.mp4)
   * 4) Final fallback -> DEV_CONTAINER_FILE
   */
  async function discoverPamVideos() {
    setLoading(true);
    setLoadError(null);

    // 1) Try /pam/pam.json first
    try {
      const res = await fetch("/pam/pam.json", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const sane = data.map((it, idx) => ({
            id: it.id ?? `pam-json-${idx}`,
            name: it.name ?? `Pam ${idx + 1}`,
            img: it.img ?? `/pam/${it.file ?? it.src ?? ""}`,
            price: typeof it.price === "number" ? it.price : 0,
            ...it,
          }));
          setItems(sane);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      // ignore and continue to probe candidate files
    }

    // 2) Probe candidateFiles inside /pam/
    const found = [];
    for (const fname of candidateFiles) {
      try {
        const url = `/pam/${encodeURIComponent(fname)}`; // encode spaces/parens
        let ok = false;

        // Try HEAD first (some hosts allow it), otherwise GET
        try {
          const head = await fetch(url, { method: "HEAD", cache: "no-store" });
          ok = head.ok;
        } catch {
          // HEAD failed — try GET (some static servers don't accept HEAD)
          try {
            const get = await fetch(url, { method: "GET", cache: "no-store" });
            ok = get.ok;
          } catch {
            ok = false;
          }
        }

        if (ok) {
          found.push({
            id: `pam-${fname}`,
            name: fname.replace(/\.[^.]+$/, ""),
            img: `/pam/${fname}`,
            price: 0, // placeholder — you can edit public/pam/pam.json later to set prices
          });
        }
      } catch (err) {
        // ignore and continue
      }
    }

    if (found.length > 0) {
      setItems(found);
      setLoading(false);
      return;
    }

    // 3) Try a specific fallback local file (if present in your public/pam folder)
    const fallbackLocal = "/pam/VID-20251119-WA0003.mp4";
    try {
      const f = await fetch(fallbackLocal, { method: "HEAD", cache: "no-store" });
      if (f.ok) {
        setItems([{ id: "fallback-pam", name: "Pam fallback video", img: fallbackLocal, price: 0 }]);
        setLoading(false);
        return;
      }
    } catch {
      // continue to final fallback
    }

    // 4) Final fallback -> dev container file
    setItems([
      {
        id: "dev-fallback",
        name: "Dev fallback media (container file)",
        img: DEV_CONTAINER_FILE,
        price: 0,
      },
    ]);
    setLoadError("No videos found in /pam/. Using dev fallback media.");
    setLoading(false);
  }

  if (loading) {
    return <div className="p-8 text-center">Looking for videos in /pam/ ...</div>;
  }

  return (
    <div className="min-h-screen">
      {loadError && (
        <div className="p-4 bg-yellow-100 text-yellow-900 border border-yellow-300 rounded mb-4 mx-4 max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <strong>Notice:</strong> {loadError} <br />
              To avoid probing logic, create a <code>public/pam/pam.json</code> listing your files,
              or add your video files into <code>public/pam/</code>.
              <div className="mt-2 text-sm text-gray-700">
                Tip: create <code>public/pam/pam.json</code> that looks like:
                <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto">
{`[
  { "id": 1, "name": "Pam 1", "img": "/pam/pam (1).mp4", "price": 0 },
  ...
]`}
                </pre>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => discoverPamVideos()}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WatchGrid expects each item to have { id, name, img, price } -> price space included */}
      <WatchGrid Btn={Btn} items={items} />
    </div>
  );
}
