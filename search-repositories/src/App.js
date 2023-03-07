import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Repositories from "./components/Repositories";
import Repository from "./components/Repository";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/:route" element={<Repositories />} />
      <Route path="/:owner/:repository" element={<Repository />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
