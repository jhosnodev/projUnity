import style from "../styles/carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, Image } from "@nextui-org/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPremiumsProjects } from "../redux/actions/actions";

const ProjectCarousel = () => {
  const carouselData = [
    {
      id: 1,
      name: "Proyecto 1",
      price: "free",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      image: "https://random.imagecdn.app/800/300",
      tags: ["js", "productivity"],
    },
    {
      id: 2,
      name: "Tema 1",
      price: "3",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      image: "https://random.imagecdn.app/800/300",
      tags: ["js", "productivity"],
    },
    {
      id: 3,
      name: "Plugin 3",
      price: "40",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      image: "https://random.imagecdn.app/800/300",
      tags: ["js", "productivity"],
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPremiumsProjects());
  }, [dispatch]);
  const premium = useSelector((state) => state.projectsData.premium);
  console.log(premium);
  return (
    /* className={style.slide} */
    /* className={style.overlay} */
    <Carousel>
      {premium.map((project) => (
        <div
          key={project.id}
          className="flex w-full h-80 flex-row bg-primary text-background"
        >
          <div className="w-2/3">
            <Image
              src={project.image}
              alt={project.name}
              width={1200}
              height={1000}
              radius="none"
            />
          </div>

          {/*           <Image
          
          width={100}
          height={100}
            src={project.image}
            alt={project.name}
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          /> */}
          <div className="flex flex-col p-9 text-left">
            <h2 className={style.title}>{project.name}</h2>
            <p className={style.description}>{project.description}</p>
            <div>
              <Link href={`/project/detail/${project.id}`}>
                <button className={style.buttonsCorousel}>Visitar</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProjectCarousel;
