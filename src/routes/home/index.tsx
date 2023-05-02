import CategoryItem from "@components/category-item";
import { useProducts } from "@utils/store";

const Home = () => {
  const categories = useProducts((state) => state.categories);
  return (
    <div className="grid w-full grid-cols-6 gap-6">
      {categories.map((category, index) => (
        <CategoryItem
          key={category.id}
          category={category}
          className={index < 2 ? "col-span-3" : "col-span-2"}
        />
      ))}
    </div>
  );
};

export default Home;
