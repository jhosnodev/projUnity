import Head from "next/head";
import React, { useEffect, useState } from "react";
import LayoutUser from "../components/layoutUser";
import Loader from "../components/loader";
import { Select, SelectItem } from "@nextui-org/react";

export default function browser({ projects, categories }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LayoutUser>
      <div className="flex">
        <aside className="basis-1/5 bg-background-100 flex  flex-col justify-center p-4">
          <h2>Filters</h2>
          <span>(clear)</span>
          <h3>Category</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>{cat.name}</li>
            ))}
          </ul>
          <h3>Price</h3>
          <h3>Last Update</h3>
          <h3>Tags</h3>
        </aside>
        <main className="basis-4/5 flex p-4 h-screen flex-col ">
          <div className="flex flex-row basis-1/5">
            <h1>Treding</h1>
            <Select label="Category" className="w-56">
              {categories.map((cat) => (
                <SelectItem key={cat.id}>{cat.name}</SelectItem>
              ))}
            </Select>
            <span>(1000 results)</span>
          </div>
          <div className="flex flex-col basis-4/5"></div>
        </main>
      </div>
    </LayoutUser>
  );
}

export async function getServerSideProps() {
  const projectsRequest = await fetch("http://localhost:3000/api/projects");
  const categoriesRequest = await fetch("http://localhost:3000/api/categories");
  const [{ data: projects }, { data: categories }] = await Promise.all([
    projectsRequest.json(),
    categoriesRequest.json(),
  ]);

  return {
    props: {
      projects,
      categories,
    },
  };
}
