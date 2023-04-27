import ProductCard from "@components/product-card";
import { useProducts } from "@utils/store";

const Shop = () => {
  const products = useProducts((state) => state.products);

  return (
    <div>
      <h1 className="font-header text-slate-700">SHOP</h1>
      <div className="my-8 grid grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
