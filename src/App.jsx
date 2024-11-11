import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading.jsx"
// import Home from "./pages/Home";

const Home = lazy(() => import("./pages/Home"));

const App = () => {

  return (
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      } />
    </Routes>
  )
}

export default App
