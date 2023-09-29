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
    <Link href={`detail/${proj.id}`}>
      <Card
        shadow="sm"
        key={proj.id}
        isPressable
        onPress={() => console.log("proj pressed")}
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
          <Chip className="text-default-500" variant="faded" radius="sm">
            {proj.price === "free" ? "Free" : `$${proj.price}`}
          </Chip>
        </CardFooter>
      </Card>
    </Link>
  );
}
