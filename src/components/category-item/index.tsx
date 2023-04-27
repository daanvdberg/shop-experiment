import classnames from "classnames";
import { HTMLAttributes } from "react";

export type CategoryItemType = {
  id: number;
  title: string;
  imageUrl: string;
};

interface IProps extends HTMLAttributes<HTMLDivElement> {
  category: CategoryItemType;
}

const CategoryItem = ({ category, className }: IProps) => {
  return (
    <div
      className={classnames(
        "group relative flex h-[240px] flex-1 items-center justify-center overflow-hidden rounded-lg shadow hover:cursor-pointer",
        className
      )}
    >
      <div
        className="h-full w-full bg-cover bg-center transition-transform duration-6000 ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-110"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <div className="absolute flex h-12 flex-col items-center justify-center rounded bg-slate-100 px-8 py-10 opacity-70 transition group-hover:opacity-90">
        <h2 className="mb-1 font-header text-2xl font-bold text-slate-700">
          {category.title}
        </h2>
        <p className="text-base">Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
