import EditPosts from "./editPosts";
import RemovePosts from "./removePosts";

const Posts = () => {
  return (
    <div className="ml-20 mb-8">
      <div className=" flex flex-row justify-start items-center bg-slate-300 h-12 w-10/12">
        <p className="text-black ml-2">ProjectBeta - </p>
        <p className="text-black ml-2">
         Responder a OtherUser en comentarios de ProjectBeta
        </p>
        <p className="text-black ml-96">1 day ago</p>
      </div>

      <div className="flex flex-col bg-white border-slate-300 border-2 h-auto w-10/12">
        <div>
          <p className="m-4 text-black">Comentarios</p>
        </div>
        <div className="flex flex-row m-4 justify-start">
                  {/* <EditPosts /> */}
                  <RemovePosts/>
        </div>
      </div>
    </div>
  );
};

export default Posts;
