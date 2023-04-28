import react from "react";
import { Navigate } from "react-router-dom";
import { useAuthUser } from "@utils/store";
import Home from "./home";
import Shop from "./shop";
import Contact from "./contact";
import SignIn from "./sign-in";
import Profile from "./profile";
import Cart from "./cart";

interface ProtectedRouteProps {
  element: JSX.Element;
}

export const ProtectedRoute: react.FC<ProtectedRouteProps> = ({
  element,
}: ProtectedRouteProps) => {
  const user = useAuthUser((state) => state.user);

  if (!user && typeof user !== "undefined") {
    return <Navigate to="/sign-in" />;
  }

  return element;
};

export { Home, Shop, Contact, SignIn, Profile, Cart };
