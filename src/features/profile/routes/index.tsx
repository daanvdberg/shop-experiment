import { User } from "./User";
import { Orders } from "./Orders";
import { Billing } from "./Billing";

export const ProfileRoutes = [
  { index: true, element: <User /> },
  { path: "orders", element: <Orders /> },
  { path: "billing", element: <Billing /> },
];
