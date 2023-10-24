import React from "react";
import {
  Badge,
  Avatar,
  Switch,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
  Link,
} from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { getAllitems } from "../../redux/actions/actionsCarrito";
import { FaShoppingCart } from "react-icons/fa";

export default function Carrito() {
  const [isInvisible, setIsInvisible] = React.useState(false);
  const dispatch = useDispatch();
  /* const dispatch = useDispatch(); */
  React.useEffect(() => {
    dispatch(getAllitems());
  }, [dispatch]);
  const items = useSelector((state) => state.carritoData.carrito);

  /*   console.log(items); */

  return (
    <div>
      <Dropdown>
        <Badge
          color="danger"
          content={items?.length === 0 ? null : items?.length}
          isInvisible={isInvisible}
          shape="circle"
        >
          <DropdownTrigger>
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="light"
            >
              {" "}
              <FaShoppingCart />
            </Button>
          </DropdownTrigger>
        </Badge>
        <DropdownMenu aria-label="Static Actions">
          <DropdownSection title="Carrito de compras" showDivider>
            {items?.map((item) => (
              <DropdownItem key={item.id} className="h-14 gap-2 opacity-100">
                <User
                  name={item.name}
                  description={`$${item.price}`}
                  classNames={{
                    name: "text-default-600",
                    description: "text-default-500",
                  }}
                  avatarProps={{
                    size: "sm",
                    src: `${item.image}`,
                  }}
                />
              </DropdownItem>
            ))}
          </DropdownSection>

          <DropdownItem key="delete" className="text-primary">
            <Link href="/cart">Ver carrito de compra</Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>{" "}
    </div>
  );
}
