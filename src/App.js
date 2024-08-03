import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./modules/HomePage"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading Route...</div>}>
            <HomePage />
          </Suspense>
        }
        exact
      />
    </Routes>
  );
}

export default App;
