import ProductCard from "@components/product-card";
import ShopToolbar from "@components/shop-toolbar";
import { CategoryKey, useProducts } from "@utils/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Shop = () => {
  const { category: categoryParam } = useParams<{ category: CategoryKey }>();
  const [category, setCategory] = useState<CategoryKey>();
  const products = useProducts((state) => state.products);

  useEffect(() => {
    setCategory(categoryParam);
  }, [categoryParam]);

  return (
    <div>
      <h1 className="font-header text-slate-700">SHOP</h1>
      <ShopToolbar onChange={(value) => setCategory(value)} />
      <div className="my-8 grid grid-cols-3 gap-8">
        {products
          .filter((p) => !category || p.category === category)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Shop;
