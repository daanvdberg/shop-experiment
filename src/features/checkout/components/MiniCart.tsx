import {
  Root,
  Trigger,
  Content,
  Arrow,
  Close,
  Portal,
} from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import classnames from "classnames";
import { CiShoppingBasket } from "react-icons/ci";
import { GiAvocado } from "react-icons/gi";
import { Button } from "@components/Elements";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthUser } from "@stores/authentication";
import { useCart } from "@stores/checkout";
import { formatPrice } from "@utils";
import { CartItem } from "../types";

interface MiniCartItemProps {
  item: CartItem;
}

const MiniCartItem = ({ item }: MiniCartItemProps) => {
  return (
    <div className="mt-3 flex w-full border-t border-slate-200 pt-3 first:mt-0 first:border-0 first:pt-0">
      <div
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded border border-slate-300 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      ></div>
      <div className="flex flex-grow flex-col justify-center pl-4">
        <span>{item.title}</span>
        <div className="flex items-end justify-between">
          <span className="font-medium text-sky-700">
            {formatPrice(item.price)}
          </span>
          <span className="inline-flex h-5 w-6 items-center justify-center rounded bg-slate-300 text-sm font-medium text-slate-800">
            ×{item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MiniCart = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = useAuthUser((state) => state.user);

  const items = useCart((state) => state.items);
  const quantity = useCart((state) => state.quantity);

  const handleViewCart = () => {
    setOpen(false);
    navigate("/cart");
  };

  if (!user) {
    return (
      <button
        className="inline-flex items-center p-2 text-slate-600 hover:text-sky-800"
        title="Shopping Cart"
        onClick={() => navigate("/sign-in")}
      >
        <CiShoppingBasket />
      </button>
    );
  }

  return (
    <Root open={open} onOpenChange={(open) => setOpen(open)}>
      <Trigger asChild>
        <button
          className="inline-flex items-center p-2 text-slate-600 hover:text-sky-800"
          title="Shopping Cart"
        >
          <CiShoppingBasket />
          <span className="ml-1 font-sans text-base">
            {quantity > 0 && quantity}
          </span>
        </button>
      </Trigger>
      <Portal>
        <Content
          align="end"
          sideOffset={2}
          className={classnames(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "shadow-slate-700/6 z-50 w-80 rounded-lg border border-slate-100 bg-white p-4 shadow-lg"
          )}
        >
          <h3 className="font-header text-sm uppercase text-slate-700">
            Shopping Cart
          </h3>

          <div className=" mt-4 space-y-4">
            <div className="-mx-4 max-h-[60vh] min-h-[200px] overflow-auto bg-slate-50 p-4">
              {items.length ? (
                <div className="flex flex-col">
                  {items.map((item) => (
                    <MiniCartItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="relative mt-6 flex flex-col items-center">
                  <div className="relative z-10 flex h-[70px] w-[70px] skew-x-12 items-center justify-center rounded-[80px] bg-sky-200 text-2xl text-lime-700">
                    <GiAvocado />
                  </div>
                  <div className="relative z-10 font-header uppercase">
                    Your cart is empty
                  </div>
                  <div className="absolute -top-4 h-[130px] w-[120px] -skew-x-6 rounded-[120px] bg-sky-100"></div>
                </div>
              )}
            </div>
            <Button onClick={handleViewCart} className="w-full">
              View Cart
            </Button>
          </div>

          <Close
            className={classnames(
              "absolute right-3.5 top-3.5 inline-flex items-center justify-center rounded-full p-1",
              "focus:outline-none focus-visible:ring focus-visible:ring-sky-600 focus-visible:ring-opacity-75"
            )}
          >
            <Cross2Icon className="h-4 w-4 text-slate-500 hover:text-slate-700" />
          </Close>
          <Arrow className="fill-slate-100" />
        </Content>
      </Portal>
    </Root>
  );
};
