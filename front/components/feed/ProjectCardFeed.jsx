import { Avatar, Button, Image, Link } from "@nextui-org/react";
import { Heart } from "./icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProjectCardFeed = ({ proj }) => {
  return (
    <div className="ml-8 mb-8">
      <div className="bg-slate-300 h-16 w-4/5">
        <div className="flex justify-start items-center flex-row">
          <Avatar
            className="w-12 h-12 m-2 bg-slate-200"
            //  src={proj.Users[0].image}
          />
          <Link href={`/user/${proj.Users.id}`} underline="always">
            <p className="ml-1 text-black"> {proj.Users[0].name}</p>
          </Link>
          <p className="ml-4 text-black"> UpdateProject</p>
          <p className="ml-4 text-black"> 1 day ago</p>
          <div className="ml-96">
            <FaHeart />
          </div>
        </div>
      </div>

      <div className="flex flex-row bg-white border-slate-300 border-2 h-72 w-4/5 p-4">
        <div>
          <Image
            //  size="md"
            //  src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
            src={proj.image}
            alt="PROJECTS IMAGES 1"
            radius="none"
            className="w-auto h-[260px]"
            object-fit="cover"
          />
        </div>
        <div className="w-3/5 ml-2">
          <h2 className="ml-4 mb-2 text-black">{proj.name}</h2>
          <p className="ml-4 text-black">{proj.shortDescription}</p>
          <div>
            <Link href={`/project/detail/${proj.id}`} className="w-full">
              <Button
                className="mt-12 ml-6 text-blue-950 border-blue-950 border-2 font-medium w-40 h-11 text-lg"
                variant="light"
                color="primary"
                radius="none"
              >
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
