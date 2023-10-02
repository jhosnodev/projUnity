import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";

export default function SolicitudesCard({ solicitud }) {
  return (
    <Card key={solicitud.id} shadow="sm">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h2 className="text-md">{solicitud.nombre}</h2>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2">
        <p>{solicitud.shortDescription}</p>
      </CardBody>
      <Divider />
      <div className="gap-9 flex overflow-visible py-2 px-9">
        <Button color="secondary" variant="ghost" type="submit">
          Ver Más
        </Button>
        <Button
          color="secondary"
          variant="shadow"
          radius="sm"
          type="submit"
          className="hover:bg-purple-400"
        >
          Contactar
        </Button>
      </div>
      <CardFooter className="flex gap-3">
        <Image
          className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
          alt="avatar"
          height={60}
          radius="sm"
          src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
          width={70}
        />
        <div className="flex flex-col">
          <p className="text-md">{solicitud.usuario}</p>
          <p className="text-small text-default-500">
            {solicitud.Bio_del_Usuario}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
