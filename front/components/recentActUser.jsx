import ButtonReport from "./buttonReport"
import ButtonReply from "./buttonReply";

const RecentActUser = ({name, projName}) => {
  return (
    <div className="ml-20 mb-8">
      <div className=" flex flex-row justify-start items-center bg-slate-300 h-12 w-10/12">
        <p className="text-black ml-2">{projName} - </p>
        <p className="text-black ml-2">
          Responder a OtherUser en comentarios acerca de {projName} 
        </p>
        <p className="text-black ml-96">1 day ago</p>
      </div>

      <div className="flex flex-col bg-white border-slate-300 border-2 h-auto w-10/12">
        <div>
          <p className="m-4 text-black">Comments?? de otros usuarios??</p>
        </div>
        <div className="flex flex-row m-4 justify-start">
          <ButtonReply name={name} />
          <ButtonReport name={name} />
        </div>
      </div>
    </div>
  );
}

export default RecentActUser