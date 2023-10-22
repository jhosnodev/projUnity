import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
import CreateComments from "./CreateComments";
import { getSesion } from "../../redux/actions/actionsUser";
import { useDispatch, useSelector } from "react-redux";

export default function Comments({ comment, project }) {
  const dispatch = useDispatch();
  /*   React.useEffect(() => {
    dispatch(getSesion());
  }, [dispatch]); */
  const [ableToResponse, setAbleToresponse] = React.useState(true);
  const [userID, setUserID] = React.useState("");
  const handleCreateResponse = () => {
    setAbleToresponse(!ableToResponse);
    dispatch(getSesion());
  };
  const user = useSelector((state) => state.usersData.sesion.id);
 
  return (
    <>
      <Card className="w-full rounded-none p-4" radius="none">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" size="md" />
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
          <Button
            margin="1"
            color="primary"
            onPress={() => handleCreateResponse()}
            variant="ghost"
          >
            💬 Responder
          </Button>
        </CardFooter>
      </Card>
      <div className={`${ableToResponse ? "visible-global" : "hidden-global"}`}>
        <CreateComments
          replyTo={comment.id}
          project={project}
          userID={user ? user : ""}
        />
      </div>
    </>
  );
}
