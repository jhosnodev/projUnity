import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

export default function Comments({ comment }) {
  return (
    <Card className="w-full rounded-none p-4" radius="none">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight ">@zoeylang</h5>
          </div>
        </div>
        <Button
          variant="light"
          color="danger"
          onPress={() => alert("reportar comentario")}
        >
          Reportar
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400 my-4">
        <p>{comment.comment}</p>
      </CardBody>
      <CardFooter className="gap-3 pr-4">
        <Button margin="1" color="primary" onPress={() => alert("reply")} variant="ghost">
          💬 Responder
        </Button>
      </CardFooter>
    </Card>
  );
}
