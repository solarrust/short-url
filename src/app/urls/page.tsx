"use client";

import Link from "next/link";
import CopyButton from "../components/CopyButton";
import DeleteButton from "../components/DeleteButton";

async function fetchUrls() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch urls");
  }

  return response.json();
}

export default async function Urls() {
  let urls;

  try {
    urls = await fetchUrls();
  } catch (error) {
    return <div className="error">{(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>All custom URLs</h1>
      <Link href="/">Home</Link>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Visits</th>
          </tr>
        </thead>
        <tbody>
          {urls.urls &&
            urls.urls.map(
              (url: {
                _id: string;
                originalUrl: string;
                shortUrl: string;
                visits: number;
              }) => (
                <tr key={url._id}>
                  <td>
                    <a href={`${url.originalUrl}`} target="_blank">
                      {url.originalUrl}
                    </a>
                  </td>
                  <td>
                    <a href={`${url.shortUrl}`} target="_blank">
                      {`${process.env.NEXT_PUBLIC_BASE_URL}${url.shortUrl}`}
                    </a>
                    <CopyButton
                      url={`${process.env.NEXT_PUBLIC_BASE_URL}${url.shortUrl}`}
                    />
                    <DeleteButton id={url._id} />
                  </td>
                  <td>{url.visits}</td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
