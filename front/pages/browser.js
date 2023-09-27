import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutUser from "../components/layoutUser";
import Loader from "../components/loader";


function browser() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
       setLoading(false); 
      });
    console.log(data);
  }, []);
  if (isLoading) return <Loader />;
  if (!data) return <p>No profile data</p>;
  return (
    <LayoutUser>
      <div className="flex">
        <aside className="basis-1/5 bg-background-100 flex  flex-col justify-center p-4">
          <h2>Filters</h2>
          <span>(clear)</span>
          <h3>Category</h3>
          <h3>Price</h3>
          <h3>Last Update</h3>
          <h3>Tags</h3>
          <h3>Technology</h3>
        </aside>
        <main className="basis-4/5 flex p-4 h-screen">
          <div className="flex flex-row">
            <h1>Treding</h1>
            <select>
              <option>Category</option>
            </select>
            <span>(1000 results)</span>
          </div>
          <div className="flex flex-row"></div>
          <div className="flex flex-row"></div>
        </main>
      </div>
    </LayoutUser>
  );
}

export default browser;
