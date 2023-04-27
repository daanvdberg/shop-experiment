import CategoryItem, { CategoryItemType } from "@components/category-item";

interface IProps {
  categories: CategoryItemType[];
}

const Directory = ({ categories }: IProps) => {
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

export default Directory;
