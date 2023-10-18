import { FaTwitter, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const SocialMedia = ({email}) => {
  return (
    <div className="flex flex-row ml-8 mb-4 ">
      <a
        href="https://mail.google.com/mail/?view=cm&fs=1&to=lauragrisanzio2@gmail.com
        &body=Hola%20me%20gustaría%20contactarte%20por%20el%20proyecto%20que%20desarrollaste%20."
        target="_blank"
      >
        <FaEnvelope
          style={{ margin: "10px", fontSize: "50px", marginRight: "25px" }}
        />
      </a>

      <a
        href="https://www.linkedin.com/in/laura-grisanzio-39b8311a2/"
        target="_blank"
      >
        <FaLinkedin
          style={{ margin: "10px", fontSize: "50px", marginRight: "25px" }}
        />
      </a>

      <a href="https://twitter.com/twitterlatam?lang=es" target="_blank">
        <FaTwitter
          style={{ margin: "10px", fontSize: "50px", marginRight: "25px" }}
        />
      </a>

      <a href="https://github.com/lauragrisan" target="_blank">
        <FaGithub style={{ margin: "10px", fontSize: "50px" }} />
      </a>
    </div>
  );
};

export default SocialMedia;
