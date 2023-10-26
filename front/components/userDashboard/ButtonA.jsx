import { useRouter } from "next/router";
// import ButtonEdit from "../../components/userDashboard/buttonEdit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import LayoutUser from "../layout/layoutUser";
import Loader from "../layout/loader";

import Head from "next/head";

import ProjDashUser from "./projDashUser";
import ButtonCreate from "./buttonCreateProj";
import ButtonPromotion from "./buttonPromotion";
import ButtonRequest from "./buttonRequest";
import Posts from "./posts";
import Example from "./chartsViews";
import DownloadCharts from "./downloadCharts";
import OrdenesCompra from "./OrdenesCompra";
import { getSesion } from "../../redux/actions/actionsUser";
import { restoreProjects } from "../../redux/actions/actions";
// import { getOrder } from "../../redux/actions/actionsPayments";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Link,
  Image,
} from "@nextui-org/react";
import Swal from "sweetalert2";

const ButtonA = ({ id }) => {
    console.log(id);

    const dispatch = useDispatch()

   
    return (
      <div>
           <Button
          onPress={active}
          className="text-white mb-4 mr-8 bg-orange-600 rounded-none text-lg font-bold"
         
        >
          Activar
        </Button>

        {/* </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
      </div>
    );
};

export default ButtonA;
