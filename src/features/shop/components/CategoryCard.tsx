import classnames from "classnames";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Category } from "../types";

interface CategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  category: Category;
}

export const CategoryCard = ({ category, className }: CategoryCardProps) => {
  return (
    <Link
      to={`/shop/${category.id}`}
      className={classnames(
        "group relative flex h-[240px] flex-1 items-center justify-center overflow-hidden rounded-lg text-slate-700 shadow hover:cursor-pointer hover:text-slate-700",
        className
      )}
    >
      <>
        <div
          className="h-full w-full scale-105 bg-cover bg-center transition-transform duration-6000 ease-[cubic-bezier(0.25,0.45,0.45,0.95)] group-hover:scale-125"
          style={{ backgroundImage: `url(${category.thumbnail})` }}
        />
        <div className="absolute flex h-auto flex-col items-center justify-center rounded bg-slate-100 px-8 py-6 opacity-70 transition duration-500 group-hover:opacity-90">
          <h2 className="mb-1 font-header text-2xl font-bold">
            {category.title}
          </h2>
          <p className="text-base">Shop Now</p>
        </div>
      </>
    </Link>
  );
};

export default CategoryCard;
