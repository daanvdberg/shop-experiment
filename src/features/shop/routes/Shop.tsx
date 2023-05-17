import { useProducts } from "@stores/catalog";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryKey } from "../types";
import ShopToolbar from "../components/ShopToolbar";
import { ProductCard } from "../components/ProductCard";

export const Shop = () => {
  const [category, setCategory] = useState<CategoryKey>();

  const { category: categoryParam } = useParams<{ category: CategoryKey }>();

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
