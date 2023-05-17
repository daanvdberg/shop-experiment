import { lazyImport } from "@utils";

const { Authentication } = lazyImport(
  () => import("@features/auth"),
  "Authentication"
);

export const publicRoutes = [
  {
    path: "/sign-in",
    element: <Authentication />,
  },
];
