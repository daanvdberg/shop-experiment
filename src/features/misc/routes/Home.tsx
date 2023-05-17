import CategoryCard from "@features/shop/components/CategoryCard";
import { useProducts } from "@stores/catalog";

export const Home = () => {
  const categories = useProducts((state) => state.categories);

  return (
    <div className="grid w-full grid-cols-6 gap-6">
      {categories.map((category, index) => (
        <CategoryCard
          key={category.id}
          category={category}
          className={index < 2 ? "col-span-3" : "col-span-2"}
        />
      ))}
    </div>
  );
};
