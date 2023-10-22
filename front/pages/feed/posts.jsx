import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LayoutUser from "../../components/layout/layoutUser";
import Loader from "../../components/layout/loader";

import Head from "next/head";


import Comments from "../../components/comments/comments";
import { getAllComments } from "../../redux/actions/actionsComment";
import { comment } from "postcss";

const Posts = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentData.comments);
  console.log(comments);
 
  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

//   const loading = useSelector((state) => state.projectsData.loading);
//   if (loading) return <Loader />;

  return (
    <div>
      <LayoutUser>
        <Head>
          <title>ProjUnity</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <div className="flex flex-col items-center">
          <h1 className="flex-row text-5xl m-8 underline">Últimos Comentarios</h1>
          <div className="flex flex-col space-y-5 m-4">
            {comments.map((comment) => (
              <Comments comment={comment} key={comment.id} />
            ))}
          </div>
        </div>
      </LayoutUser>
    </div>
  );
};

export default Posts;
