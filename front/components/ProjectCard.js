import React from "react";
import { Card, CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function ProjectCard({proj}) {
  return (
    <Card
    className="max-w-[400px]"
    >
      <CardBody>
        <Link to={`/detail/${proj.id}`} >
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={proj.name}
          className="w-full object-cover h-[140px]"
          src={proj.image}
        />
        </Link>
      </CardBody>
      <CardFooter className="text-small justify-between">
        <div className="w-70 text-left">
          <b>{proj.name}</b>
          <br />
          <span>{proj.description.slice(0, 20)}</span>
          <br />
          {proj["tags"]?.length > 0
            ? proj["tags"]?.map((tag, index) => (
                <Chip variant="light" key={index}>{`#${tag}`}</Chip>
              ))
            : "sin tags"}
        </div>
        <Chip className="text-default-500" variant="faded" radius="sm">{proj.price === 'free' ? 'Free' : `$${proj.price}`}</Chip>
      </CardFooter>
    </Card>
  );
}
