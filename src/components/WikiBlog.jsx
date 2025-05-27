import React, { useState } from "react";
import { Link } from "react-router-dom";

function WikiBlog({ topic }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        topic
      )}`
    )
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [topic]);

  if (!data) return <p className="text-white">Loading blog...</p>;

  return (
    <div className="mt-28 bg-slate-100 text-black p-6 rounded-lg max-w-3xl mx-auto shadow">
      <h1 className="uppercase text-green-700 text-2xl font-bold mb-2">
        {data.title}
      </h1>
      <p className="mb-4">{data.extract}</p>
      <div className="flex gap-5 justify-between">
        <a
          href={data.content_urls.desktop.page}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition"
        >
          Read full blog on Wikipedia →
        </a>
        <Link className="inline-block px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition">
          Read Chronolite blog →
        </Link>
      </div>
    </div>
  );
}

export default WikiBlog;
