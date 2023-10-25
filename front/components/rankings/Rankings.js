import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
/* import CreateComments from "./CreateComments"; */
import { getSesion } from "../../redux/actions/actionsUser";
import { useDispatch, useSelector } from "react-redux";
import Rating from "react-rating";

import { FaRegStar, FaStar } from "react-icons/fa";

export default function Rankings({ rankings }) {
  const count = rankings.length;
  const score =
    rankings.reduce(
      (accumulator, currentValue) => accumulator + currentValue.score,
      0
    ) / count;
  return (
    <div className="flex flex-row w-full justify-end my-6 gap-6">
      ({count} Reseñas){" "}
      <Rating
        initialRating={score}
        readonly
        emptySymbol={<FaRegStar />}
        fullSymbol={<FaStar />}
      />
    </div>
  );
}
