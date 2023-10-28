import { Link, link } from "@nextui-org/react";
import { FaTwitter, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";


const SocialMedia = ({ user }) => {
  const { email, githubUser, linkedinUser, twitterUser } = user;
  return (
    <div className="flex flex-row ml-8 mb-4 ">
      <Link
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}
        &body=Hola%20me%20gustaría%20contactarte%20por%20el%20proyecto%20que%20desarrollaste%20.`}
        target="_blank"
      >
        <FaEnvelope
          style={{ margin: "10px", fontSize: "50px", marginRight: "25px" }}
        />
      </Link>

      <Link href={`https://www.linkedin.com/in/${linkedinUser}`} target="_blank">
        <FaLinkedin
          style={{ margin: "10px", fontSize: "50px", marginRight: "25px" }}
        />
      </Link>

      <Link href={`https://twitter.com/${twitterUser}`} target="_blank">
        <FaTwitter
          style={{ margin: "10px", fontSize: "50px", marginRight: "25px" }}
        />
      </Link>

      <Link href={`https://github.com/${githubUser}`} target="_blank">
        <FaGithub style={{ margin: "10px", fontSize: "50px" }} />
      </Link>
    </div>
  );
};

export default SocialMedia;
