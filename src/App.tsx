import { Routes, Route, Outlet, Link } from "react-router-dom";
import {
  Cart,
  Contact,
  Home,
  Profile,
  ProtectedRoute,
  Shop,
  SignIn,
} from "@routes";
import { useAuthUser } from "@utils/store";
import { signOutUser, useAuthUpdate, useFetchProducts } from "@utils/firebase";
import { CiAvocado, CiLogout, CiUser } from "react-icons/ci";
import MiniCart from "@components/mini-cart";

const Layout = () => {
  const user = useAuthUser((state) => state.user);

  return (
    <div className="flex h-full flex-col">
      <header className="shadow-slate-600/6 sticky top-0 z-10 flex justify-center bg-white px-4 py-3 shadow-lg">
        <div className="grid w-full max-w-[1024px] auto-cols-fr grid-flow-col items-center justify-between">
          <nav>
            <ul className="flex font-header uppercase">
              <li>
                <Link
                  to="/shop"
                  className="text-md px-4 py-2 font-light text-slate-600 hover:text-sky-800"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-md px-4 py-2 font-light text-slate-600 hover:text-sky-800"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <Link
            to="/"
            className="inline-flex flex-col items-center font-header text-3xl font-light text-sky-800"
            aria-label="AVACADO ACCESSORIES"
          >
            <CiAvocado />
            <span className="text-sm">AVACADO ACCESSORIES</span>
          </Link>
          <nav className="flex justify-end">
            <ul className="flex font-header text-2xl uppercase">
              <li>
                <MiniCart />
              </li>
              <li>
                <Link
                  to={user ? "/profile" : "/sign-in"}
                  className="p-2 font-light text-slate-600 hover:text-sky-800"
                  title="My Profile"
                >
                  <CiUser />
                </Link>
              </li>
              <li>
                {user ? (
                  <button
                    className="p-2 text-2xl font-light uppercase text-slate-600 hover:text-sky-800"
                    onClick={signOutUser}
                    title="Sign Out"
                  >
                    <CiLogout />
                  </button>
                ) : null}
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="flex-grow px-4 pb-16 pt-12">
        <div className="mx-auto max-w-[1024px]">
          <Outlet />
        </div>
      </div>
      <footer className="flex h-16 flex-shrink-0 items-center justify-center bg-white px-4">
        <div className="w-full max-w-[1024px] text-slate-700">
          LUXURY ACCESSORIES. Copyright © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  useAuthUpdate();
  useFetchProducts();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="contact" element={<Contact />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route
            path="profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route path="cart" element={<ProtectedRoute element={<Cart />} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
