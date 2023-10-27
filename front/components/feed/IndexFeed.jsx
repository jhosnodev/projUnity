import { useState } from "react";
import Link from "next/link";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import GlobalFeed from "./global-feed";
import MyFeed from "../feed/my-feed";
import YourFeed from "../feed/for-your-feed";
const IndexFeed = () => {
  // const [activeTab, setActiveTab] = useState("globalFeed");

  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
  //   };

  return (
    <div className="flex w-full flex-col">
      <Tabs disabledKeys={(["my", "your"])}>
        <Tab title="Global Feed">
          <GlobalFeed />
        </Tab>
        {/* <Tab key="my" title="My Feed">
          <MyFeed />
        </Tab>

        <Tab key="your" title="For your Feed">
          <YourFeed />
        </Tab> */}
      </Tabs>
    </div>
    //   <div className="p-4">
    //     <div className="flex space-x-4">
    //       <div
    //         className={`cursor-pointer ${
    //           activeTab === "myFeed" ? "bg-purple-500 text-white" : "bg-gray-200"
    //         } p-2 rounded`}

    //       >
    //         <Link href="/feed/my-feed">My Feed</Link>
    //       </div>
    //       <div
    //         className={`cursor-pointer ${
    //           activeTab === "globalFeed"
    //             ? "bg-purple-500 text-white"
    //             : "bg-gray-200"
    //         } p-2 rounded`}
    //         onClick={() => handleTabChange("globalFeed")}
    //       >
    //         <Link href="feed/global-feed">Global Feed</Link>
    //       </div>
    //       <div
    //         className={`cursor-pointer ${
    //           activeTab === "forYourFeed"
    //             ? "bg-purple-500 text-white"
    //             : "bg-gray-200"
    //         } p-2 rounded`}
    //         onClick={() => handleTabChange("forYourFeed")}
    //       >
    //         <Link href="/feed/for-your-feed">For Your Feed</Link>
    //       </div>

    //       <div className="mt-4">

    //         {/* {activeTab === "myFeed" && (
    //           <Link></Link>
    //           <p className="text-lg">Contenido de Feed</p>
    //         )}
    //         {activeTab === "forYourFeed" && (
    //           <p className="text-lg">Contenido de For Your Feed</p>
    //         )}
    //         {activeTab === "globalFeed" && (
    //           <p className="text-lg">Contenido de Global Feed</p>
    //         )} */}
    //       </div>

    //     </div>
    //   </div>
  );
};

export default IndexFeed;
