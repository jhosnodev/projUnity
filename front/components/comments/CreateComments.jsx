import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/actionsComment";

const CreateComments = ({ userID, project }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id;
  /*   console.log(id); */

  const [commentsData, setComments] = useState({
    user: userID,
    comment: "",
    project: project,
    image:
      "https://blog.openreplay.com/images/building-a-comment-form-with-react-mentions/images/hero.png",
    active: true,
    replyTo: false,
  });
  //  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const value = event.target.value;

    setComments({ ...commentsData, comment: value });
    console.log(commentsData);
  };
  const handleSubmitComment = (e) => {
/*     const sesion = JSON.parse(localStorage.getItem("sesion")); */
    e.preventDefault;
    /*    console.log(sesion); */
/*     setComments({ ...commentsData, user: sesion.id }); */

    if (
      commentsData.project &&
      commentsData.user &&
      commentsData.comment.trim()
    ) {
      console.log("envio");
      dispatch(createComment(commentsData));
    }
  };

  return (
    <div>
      <form className="flex flex-col ml-3">
        <input
          className="mr-3 h-14 w-full shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="comment"
          value={commentsData.comment}
          placeholder="Deja tu comentario..."
          onChange={(e) => handleChange(e)}
        />
        <div className="flex flex-row justify-end m-3">
          <Button
            margin="1"
            color="primary"
            onPress={(e) => handleSubmitComment(e)}
          >
            Comentar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComments;
