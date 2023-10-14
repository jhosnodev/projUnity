import { Button } from "@nextui-org/react";
import { useState } from "react";

const Comments = ({comments}) => {

   const [commentsData, setComments] = useState({
     user: "",
     comments: "",
   });
  console.log(comments);
  //  const [errors, setErrors] = useState({});

   const handleChange = (event) => {
     const property = event.target.name;
     const value = event.target.value;
    //  setErrors(validator({ ...userData, [property]: value }));
    //  //seteamos los errores en nuestro estado
     setComments({ ...commentsData, [property]: value });
   };

  
  //  const handleSubmit = (event) => {
  //    event.preventDefault();
  //    print();
  //  };
  return (
    <div>
      <form className="flex flex-col ml-3">
        {/* <input
          class="m-1 w-52 shadow appearance-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="user"
          placeholder="Username..."
          onChange={(e) => handleChange(e)}
          value={commentsData.user}
        /> */}
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
            onPress={() => alert("comment projects")}
          >
            Commentar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
