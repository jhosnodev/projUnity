import ButtonEdit from "./buttonEdit";
import ButtonAnalitycs from "./buttonAnalitycs";
import ButtonActive from "./buttonActive";

const ProjDashUser = () => {
  return (
    <div className="flex flex-row m-4">
      <div className="ml-4 bg-slate-300 h-32 w-48"></div>
      <div className="flex bg-white border-slate-300 border-3 w-auto">
        <div className="flex flex-col justify-end">
          <div className="flex flex-row ">
            <ButtonEdit />
            <ButtonAnalitycs />
            <ButtonActive />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjDashUser;
