import { ItemList } from "../components/ItemList";

export const Cart = () => {
  return (
    <div>
      <h1 className="mb-6">Cart</h1>
      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2">
          <ItemList />
        </div>
        <div className="rounded border border-slate-200 bg-slate-50 px-6 py-8">
          <h2>Sidebar</h2>
        </div>
      </div>
    </div>
  );
};
