import Select from "@components/select";
import * as Toolbar from "@radix-ui/react-toolbar";
import { CategoryKey, useProducts } from "@utils/store";

interface IProps {
  onChange: (value: CategoryKey) => void;
}

const ShopToolbar = ({ onChange }: IProps) => {
  const products = useProducts((state) => state.products);
  const categories = useProducts((state) => state.categories);

  if (products.length < 1) return null;

  const handleChange = (value: string) => onChange(value as CategoryKey);

  return (
    <Toolbar.Root
      className="my-6 flex w-full min-w-max items-center rounded-md bg-white p-[10px]"
      aria-label="Formatting options"
    >
      <Select
        label="Category"
        placeholder="Filter by Category"
        values={categories.map((c) => ({
          value: c.id,
          label: c.title,
        }))}
        onChange={handleChange}
        emptyValue="All"
      />
      <Toolbar.Separator className="bg-mauve6 mx-[10px] w-[1px]" />
      <Toolbar.Link
        className="text-mauve11 hover:bg-violet3 hover:text-violet11 focus:shadow-violet7 data-[state=on]:bg-violet5 data-[state=on]:text-violet11 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-transparent bg-white px-[5px] text-[13px] leading-none outline-none first:ml-0 hover:cursor-pointer hover:bg-transparent focus:relative focus:shadow-[0_0_0_2px]"
        style={{ marginLeft: "auto" }}
        asChild
      >
        <span>{`${products.length} product(s) found`}</span>
      </Toolbar.Link>
    </Toolbar.Root>
  );
};

export default ShopToolbar;
