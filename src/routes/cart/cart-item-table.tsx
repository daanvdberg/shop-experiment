import ConfirmRemoval from "@components/confirm-removal";
import { formatPrice } from "@utils";
import { TAX_PERCENTAGE, useCart } from "@utils/store";
import { Link } from "react-router-dom";

const CartItemTable = () => {
  const items = useCart((state) => state.items);
  const totals = useCart((state) => state.totals);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);

  if (!items.length) {
    return <h2>Your shopping cart doesn't have anything yet</h2>;
  }

  console.log(totals);

  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b border-slate-400 font-header uppercase text-slate-500">
        <tr>
          <th scope="col" className="p-4">
            Description
          </th>
          <th scope="col" className="p-4">
            Quantity
          </th>
          <th scope="col" className="p-4">
            Price
          </th>
          <th scope="col" className="w-[1%] p-4"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="border-t border-slate-200 first:border-0"
          >
            <td className="p-4">
              <div className="flex items-center justify-start">
                <img
                  src={item.thumbnail}
                  className="w-28 rounded border border-slate-300"
                  width="110"
                  height="110"
                />
                <Link to={`/product/${item.productId}`}>
                  <span className="ml-4 text-lg">{item.title}</span>
                </Link>
              </div>
            </td>
            <td className="whitespace-nowrap p-4">
              <button
                onClick={() => updateQuantity(item.id, false)}
                className={`${
                  item.quantity <= 1 ? "cursor-not-allowed " : ""
                }inline-flex h-10 w-10 items-center justify-center rounded-l border border-slate-400 p-0 transition-colors enabled:hover:bg-slate-200`}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="inline-flex h-10 w-10 items-center justify-center border-b border-t border-slate-400">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-r border border-slate-400 p-0 transition-colors hover:bg-slate-200"
              >
                +
              </button>
            </td>
            <td className="whitespace-nowrap p-4 text-lg">
              {formatPrice(item.price)}
            </td>
            <td align="right" className="w-[1%] whitespace-nowrap p-4">
              <ConfirmRemoval
                onConfirm={() => removeItem(item.id)}
                description="This will remove the item from your cart."
              />
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot className="border-t border-slate-300 text-lg">
        <tr>
          <td colSpan={3} align="right" className="px-4 pb-1 pt-6">
            Subtotal:
          </td>
          <td align="right" className="px-4 pb-1 pt-6 font-medium">
            {totals?.subTotal}
          </td>
        </tr>
        <tr>
          <td colSpan={3} align="right" className="px-4 py-1">
            Tax ({TAX_PERCENTAGE}%):
          </td>
          <td colSpan={4} align="right" className="px-4 py-1 font-medium">
            {totals?.tax}
          </td>
        </tr>
        <tr className="text-2xl">
          <td colSpan={3} align="right" className="px-4 py-1">
            Total:
          </td>
          <td colSpan={4} align="right" className="px-4 py-1 font-medium">
            {totals?.total}
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CartItemTable;
