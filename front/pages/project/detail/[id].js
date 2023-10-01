import LayoutUser from "../../../components/layoutUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../../redux/actions/actions";

import { Button, Image } from "@nextui-org/react";
import Comments from "../../../components/comments";
import ButtonDownload from "../../../components/buttonDownload";

const Detail = () => {
  const router = useRouter();
  const id = router.query.id;
  const detail = useSelector((state) => state.projectsData.detail);
  console.log(detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));

    //   //funcion que limpie el detail
    // //   return () => {
    // //     dispatch(clearDetail());
    // //   };
  }, [dispatch, id]);

  return (
    <LayoutUser>
      <div className="flex flex-wrap gap-4 items-center m-1">
        <div>
          {
            <div>
              <div className="text-white text-3xl bg-orange-500 w-auto h-48 m-1 flex justify-center justify-items-center items-center">
                BANNER DEL PROYECTO - no sé que iria acá
              </div>
              <div className="font-black text-6xl m-4 flex justify-center justify-items-center items-center">
                <h1>PROJECT NAME: {detail.title}</h1>
              </div>
              <div className="flex flex-col float-right">
                <Image
                  size="md"
                  height={100}
                  width={240}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                  alt="PROJECTS IMAGES 1"
                  object-fit="cover"
                  // classNames="m-5"
                />
                <br></br>
                <Image
                  size="md"
                  height={550}
                  width={240}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                  alt="PROJECTS IMAGES 2"
                  object-fit="cover"
                  // classNames="m-5"
                />
                <br></br>
                <Image
                  size="md"
                  height={250}
                  width={240}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                  alt="PROJECTS IMAGES 3"
                  // classNames="m-5"
                />
                <br></br>
              </div>
              <ButtonDownload />
              <h1 className="text-black m-3">Features</h1>
              <h3 className="text-black text-justify indent-2">
                SHORT DESCRIPTION:{detail.body}{" "}
              </h3>
              <div>
                <h2 className="text-black m-3 underline">
                  PROGRAMMER - CREATOR - AUTHOR
                </h2>
                <h3 className="text-black ">SIMON CHARMICHEAL</h3>
                <h2 className="text-black m-3 underline">Category</h2>
                <h3 className="text-black">{detail.id}</h3>
                <h2 className="text-black m-3 underline">Description</h2>
                <h3 className="text-black text-justify indent-2">
                  {detail.body}
                </h3>
                {/* <h2>{detail.userId} (URL)</h2> */}
                <h2 className="text-black m-3 underline">Status</h2>
                <h3 className="text-black">{detail.id}</h3>
                <h2 className="text-black m-3 underline">Price</h2>
                <h3 className="text-black">{detail.id}$</h3>
              </div>
              <h1 className="text-black mt-4">Download</h1>
              <ButtonDownload />
              <h1 className="text-black mt-4">Developments log</h1>
              {/* url??? */}
              <h3 className="underline m-1">Create date: {detail.id}</h3>
              <h3 className="underline m-1">Update date: {detail.id}</h3>
            </div>
          }
          <br></br>
          <h2 className="text-black mt-3 mb-2">Comments</h2>
          <Comments />
        </div>
      </div>
    </LayoutUser>
  );
};

export default Detail;

//ver creation date y update date
