import { formatPrice } from "@utils";
import { CartItem } from "@utils/store";

interface IProps {
  item: CartItem;
}

const MiniCartItem = ({ item }: IProps) => {
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

export default MiniCartItem;
