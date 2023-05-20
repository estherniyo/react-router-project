import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/vans/Vans";
import VanDetails, { loader as vanDetailLoader } from "./pages/vans/VanDetails";
import Layout from "./components/layout/Layout";
import DashBoard from "./pages/hosts/DashBoard";
import Income from "./pages/hosts/Income";
import Reviews from "./pages/hosts/Reviews";
import HostLayout from "./components/layout/HostLayout";
import HostPrice from "./pages/hosts/HostPrice";
import HostPhoto from "./pages/hosts/HostPhoto";
import HostVanDetails, {
  loader as hostVanDetailLoader,
} from "./pages/hosts/HostVanDetails";
import HostVanList from "./pages/hosts/HostVanList";
import VanDetail from "./pages/hosts/VanDetail";
import Error from "./components/ui/Error";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./pages/Login";
import { requireAuth } from "./utils/util";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />

      <Route path="vans" element={<Vans />} loader={vansLoader} />
      <Route
        path="vans/:id"
        element={<VanDetails />}
        loader={vanDetailLoader}
      />
      <Route path="host" element={<HostLayout />}>
        <Route
          loader={async () => await requireAuth()}
          index
          element={<DashBoard />}
        />
        <Route
          loader={async () => await requireAuth()}
          path="income"
          element={<Income />}
        />
        <Route
          loader={async () => await requireAuth()}
          path="reviews"
          element={<Reviews />}
        />
        <Route
          loader={async () => await requireAuth()}
          path="vans"
          element={<HostVanList />}
        />
        <Route
          loader={hostVanDetailLoader}
          path="vans/:id"
          element={<HostVanDetails />}
        >
          <Route
            loader={async () => await requireAuth()}
            index
            element={<VanDetail />}
          />
          <Route
            loader={async () => await requireAuth()}
            path="pricing"
            element={<HostPrice />}
          />
          <Route
            loader={async () => await requireAuth()}
            path="photos"
            element={<HostPhoto />}
          />
        </Route>
      </Route>
      <Route path="*" element={<h1>Page not found</h1>} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
