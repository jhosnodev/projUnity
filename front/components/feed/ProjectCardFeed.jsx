import { Avatar, Button, Image, Link } from "@nextui-org/react";
import { Heart } from "./icons";
const ProjectCardFeed = ({proj}) => {

     return (
       <div className="ml-8 mb-8">
         <div className="bg-slate-300 h-16 w-4/5">
           <div className="flex justify-start items-center flex-row">
             <Avatar
               className="w-12 h-12 text-xlarge m-2 bg-slate-200"
              //  src={proj.Users[0].image}
             />
             <Link href={`/user/${proj.Users.id}`} underline="always">
               <p className="ml-1 text-black"> {proj.Users[0].name}</p>
             </Link>
             <p className="ml-4 text-black"> UpdateProject</p>
             <p className="ml-4 text-black"> 1 day ago</p>
             <div className="ml-96">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 height="3em"
                 viewBox="0 0 512 512"
                 fill="#969696"
               >
                 <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
               </svg>
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
}

export default ProjectCardFeed;