import { Button} from "@nextui-org/react";


import React from 'react'

export const ButtonDownload = () => {
  return (
    <div>
      <Button
        className="m-3"
        radius="none"
        margin="1"
        color="primary"
        // variant="ghost"
        onPress={() =>
          alert(
            "download project??? esto no sucederia si lo comprará al projecto"
          )
        }
      >
        Download
      </Button>
    </div>
  );
}

export default ButtonDownload