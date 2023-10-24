import { Avatar, Button, Image, Link } from "@nextui-org/react";
import { Heart } from "./icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProjectCardFeed = ({ proj }) => {
  return (
    <div className=" mb-8 bg-slate-300 h-full">
      <div className="flex justify-between  content-center flex-row p-3">
        <div className="flex flex-row justify-center content-center items-center gap-5">
          <Avatar className="w-12 h-12  bg-slate-200" />
       {/*    `/user/${proj.Users[0].id}` */}
          <Link href={'/'} underline="always">
            <p className=" text-primary font-bold"> {proj.Users[0].name}</p>
          </Link>
          <p className=" text-primary  font-medium"> UpdateProject</p>
          <p className=" text-primary italic "> 1 day ago</p>
        </div>
        <div
          variant="light"
          color="primary"
          className=" flex flex-row justify-center content-center items-center gap-4 mr-4 cursor-pointer"
        >
          <Button>
            <FaHeart />
          </Button>
        </div>
      </div>

      <div className="flex flex-row bg-white border-slate-300 border-2 h-72 ">
        <Image
          src={proj.image}
          alt={proj.name}
          radius="none"
          className="w-auto h-full"
          object-fit="cover"
        />

        <div className="w-3/5 ml-2 p-5">
          <h2 className=" mb-2 text-primary">{proj.name}</h2>
          <p className=" text-primary">{proj.shortDescription}</p>
          <div className="mt-9">
            <Link href={`/project/detail/${proj.id}`} className="w-full">
              <Button variant="ghost" color="primary">
                Ver más
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardFeed;
