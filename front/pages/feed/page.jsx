import { useState } from "react";
import Link from "next/link";
import LayoutUser from "../components/layoutUser";

export default function Feed() {
  const [activeTab, setActiveTab] = useState("myFeed");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <LayoutUser>
      <div className="p-4">
        <div className="flex space-x-4">
          <div
            className={`cursor-pointer ${
              activeTab === "myFeed"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            } p-2 rounded`}
            onClick={() => handleTabChange("myFeed")}
          >
            <Link href="/feed/my-feed">My Feed</Link>
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "forYourFeed"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            } p-2 rounded`}
            onClick={() => handleTabChange("forYourFeed")}
          >
            <Link href="/feed/for-your-feed">For Your Feed</Link>
          </div>
          <div
            className={`cursor-pointer ${
              activeTab === "globalFeed"
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            } p-2 rounded`}
            onClick={() => handleTabChange("globalFeed")}
          >
            <Link href="/feed/global-feed">Global Feed</Link>
          </div>
        </div>

        <div className="mt-4">
          {/* Contenido del feed según la pestaña activa */}
          {activeTab === "myFeed" && (
            <p className="text-lg">Contenido de Feed</p>
          )}
          {activeTab === "forYourFeed" && (
            <p className="text-lg">Contenido de For Your Feed</p>
          )}
          {activeTab === "globalFeed" && (
            <p className="text-lg">Contenido de Global Feed</p>
          )}
        </div>
      </div>
    </LayoutUser>
  );
}
