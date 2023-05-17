import { Navigate } from "react-router-dom";
import { lazyImport } from "@utils";
import { ProfileRoutes } from "@features/profile";

const { AccountLayout } = lazyImport(
  () => import("@components/Layout"),
  "AccountLayout"
);

const { Cart } = lazyImport(() => import("@features/checkout"), "Cart");

export const protectedRoutes = [
  {
    path: "/sign-in",
    element: <Navigate to="/profile" />,
  },
  {
    path: "/profile/*",
    element: <AccountLayout />,
    children: ProfileRoutes,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];
