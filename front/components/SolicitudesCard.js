import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { Link, Button } from "@chakra-ui/react";
import ContactModal from "./community/contactarUser";

export default function SolicitudesCard({ solicitud }) {
  return (
    <Card key={solicitud.id} shadow="sm" className="w-full">
      <CardHeader className="pt-4 px-4 flex-col items-start">
        <h2 className="text-md">{solicitud.nombre}</h2>
      </CardHeader>

      <CardBody className="overflow-visible">
        <p>{solicitud.shortDescription}</p>
     
      <div className="flex fle-row justify-end p-2 pt-4">
        <Link href="/community/detalle">
        <Button
        colorScheme="purple"
        variant='outline'
        fontWeight='200'
        mr="4"
        >
          Ver Más
          </Button>
        
        </Link>
        <ContactModal />
      </div>
      </CardBody>
      <Divider />
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