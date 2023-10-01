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
    <Card key={solicitud.id} shadow="sm" isPressable>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h2 className="text-md">{solicitud.nombre}</h2>
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible py-2">
        <p>{solicitud.shortDescription}</p>
      </CardBody>
      <Divider />
      <div className="gap-9 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 overflow-visible py-2">
        <Button color="secondary" variant="ghost">
          Ver Más
        </Button>
        <Button color="secondary" variant="ghost" radius="sm">
          Contactar
        </Button>
      </div>
      <CardFooter className="flex gap-3">
        <Image
          alt="nextui logo"
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
