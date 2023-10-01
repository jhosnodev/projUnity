import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Link,
} from "@nextui-org/react";
export default function ProjectCard({ proj }) {
  return (
    <Link href={`project/detail/${proj.id}`} className="w-full">
      <Card
        shadow="sm"
        key={proj.id}
        isPressable
        onPress={() => console.log("proj pressed")}
        className="w-full h-full"
      >
        <CardBody className="overflow-visible p-0">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={proj.name}
            className="w-full object-cover h-[140px]"
            src={proj.image}
          />
        </CardBody>
        <CardFooter className="text-small justify-between h-full items-start  flex-row">
          <div className="w-70 text-left flex flex-col ">
            <b>{proj.name}</b>
            <br />
            <b>{proj?.Categories[0].name}</b>
            <span>{proj?.shortDescription.slice(0, 50)}</span>
            <br />
            <div>
              {proj["Tags"]?.length > 0
                ? proj["Tags"]?.map((tag, index) => (
                    <Chip variant="bordered" key={index}>{`#${tag.name}`}</Chip>
                  ))
                : "sin tags"}
            </div>
          </div>
          <Chip className="text-default-500" variant="faded" radius="sm">
            {proj.price === "0.00" ? "Free" : `$${proj.price.split(".")[0]}`}
          </Chip>
        </CardFooter>
      </Card>
    </Link>
  );
}
