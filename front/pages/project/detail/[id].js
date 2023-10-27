import LayoutUser from "../../../components/layout/layoutUser";

import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCommentsToDetail, getDetail } from "../../../redux/actions/actions";
import Link from "next/link";
import { Button, Image } from "@nextui-org/react";

import Comments from "../../../components/comments/comments";
import ButtonDownload from "../../../components/project/buttonDownload";

import Head from "next/head";
import Loader from "../../../components/layout/loader";
import CreateComments from "../../../components/comments/CreateComments";
import Rankings from "../../../components/rankings/Rankings";
import { useState } from "react";

const Detail = () => {
  const router = useRouter();
  const id = router.query.id;
  let score = 0;
  /*   console.log(id); */

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getDetail(id));
      dispatch(getCommentsToDetail(id));
    }
  }, [dispatch, id]);

  const detail = useSelector((state) => state.projectsData.detail);
  const comments = useSelector((state) => state.projectsData.comments);
  console.log(comments);
  if (detail.id) {
    score = detail.Ratings.reduce(
      (accumulator, currentValue) => accumulator + currentValue.score,
      0
    );
  }
  console.log(detail);

  const loading = useSelector((state) => state.projectsData.loading);
  //* Aqui se maneja el loader
  if (loading) return <Loader />;
  return (
    <LayoutUser>
      <Head>
        <title>ProjUnity | {detail.name}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex flex-wrap items-center justify-center">
        <div className="bg-background-100 pb-11  w-12/12 md:w-8/12">
          <Image
            size="lg"
            height={80}
            radius="none"
            width={1000}
            src={detail.image}
            isZoomed
            alt={detail.name}
            object-fit="cover"
          />

          <div className="p-11 w-full">
            <h1 className="text-4xl m-4 flex justify-center justify-items-center items-center">
              {detail.name}
            </h1>
            <Rankings rankings={detail.Ratings} />
            <article className="flex flex-row gap-4  w-full">
              <div className="w-6-12 ">
                {/*               conectarse con proyect/user  */}
                <div className="mb-6">
                  <h2 className="text-black m-3">Desarrollador</h2>{" "}
                  <Link href={`/user/${detail.Users[0].id}`}>
                    {detail.Users[0].name}
                  </Link>
                </div>
                <ButtonDownload project={detail} />
                <p>{detail.shortDescription}</p>
                <h2 className="text-black m-3">Características</h2>
                <p>{detail.description}</p>
                <h2 className="text-black m-3">Descargar</h2>
                <ButtonDownload
                  price={detail.price}
                  name={detail.name}
                  project={detail}
                />
                <h2 className="text-black m-3">Registro de desarrollo</h2>
                <p>Última actualización: {detail.updatedAt}</p>
              </div>
              <aside className="w-4-12 flex flex-col gap-4">
                <Image
                  size="md"
                  height={100}
                  width={240}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                  alt="PROJECTS IMAGES 1"
                  object-fit="cover"
                  // classNames="m-5"
                />

                <Image
                  size="md"
                  height={550}
                  width={240}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                  alt="PROJECTS IMAGES 2"
                  object-fit="cover"
                  // classNames="m-5"
                />

                <Image
                  size="md"
                  height={250}
                  width={240}
                  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
                  alt="PROJECTS IMAGES 3"
                  // classNames="m-5"
                />
              </aside>
            </article>
          </div>

          <div className="px-11 flex flex-col ">
            <h2 className="text-black mt-3 mb-2">Comentarios</h2>
            {/* userID={detail.Users[0].id}  */}
            <CreateComments project={detail.id} replyTo={false} />
            <div className="flex flex-col gap-4 justify-items-end pl-9 mt-4">
              {comments?.map((comment) => (
                <Comments
                  comment={comment}
                  key={comment.id}
                  project={detail.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
};

export default Detail;

//ver creation date y update date
