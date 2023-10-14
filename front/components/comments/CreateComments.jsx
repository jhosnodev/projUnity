import { Button } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateComments = ({ project }) => {
  const [commentsData, setComments] = useState({
    user: "",
    comments: "",
    project: project,
    image:
      "https://blog.openreplay.com/images/building-a-comment-form-with-react-mentions/images/hero.png",
    active: true,
    replyTo: true,
  });
  //  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setComments({ ...commentsData, [property]: value });
  };

  const handleSubmitComment = (event) => {
    e.preventDefault();
    console.log("envando ");
  };

  console.log(commentsData);
  return (
    <div>
      <form className="flex flex-col ml-3">
        <input
          className="mr-3 h-14 w-full shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="comments"
          placeholder="Leave your comment..."
          value={commentsData.comments}
          onChange={(e) => handleChange(e)}
        />
        <div className="flex flex-row justify-end m-3">
          <Button
            margin="1"
            color="primary"
            onPress={(e) => handleSubmitComment(e)}
          >
            Commentar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComments;
