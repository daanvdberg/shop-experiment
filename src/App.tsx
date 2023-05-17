import { useAuthUpdate, useFetchProducts } from "@lib/firebase";
import { AppProvider } from "@providers/app";
import { AppRoutes } from "@routes";

const App = () => {
  useAuthUpdate();
  useFetchProducts();

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
