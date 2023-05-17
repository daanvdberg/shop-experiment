import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useAuthUser } from "@stores/authentication";
import { MainLayout } from "@components/Layout";
import { Home, NotFound } from "@features/misc";
import { Shop } from "@features/shop";

export const AppRoutes = () => {
  const user = useAuthUser((state) => state.user);

  const routes = [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        ...(user ? protectedRoutes : publicRoutes),
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);

  console.log(routes);

  return <>{element}</>;
};
