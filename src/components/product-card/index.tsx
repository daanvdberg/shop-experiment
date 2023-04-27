import Button from "@components/button";
import { formatPrice } from "@utils";
import { Product } from "@utils/store";
import { Link } from "react-router-dom";

interface IProps {
  product: Product;
}

const ProductCard = ({ product }: IProps) => {
  return (
    <div className="group overflow-hidden rounded-lg bg-slate-50 shadow-xl shadow-slate-200 transition-shadow duration-500 hover:shadow-slate-300">
      <div
        className="flex h-48 w-full items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${product.thumbnail})` }}
      >
        <Button className="px-10 py-6 font-bold opacity-0 hover:!opacity-100 group-hover:opacity-80 ">
          Add to Cart
        </Button>
      </div>
      <div className="p-4 py-3 text-lg">
        <Link to={`/product/${product.id}`} className="flex text-slate-800">
          {product.title}
        </Link>
        <span className="font-semibold text-sky-800">
          {formatPrice(product.price)}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
