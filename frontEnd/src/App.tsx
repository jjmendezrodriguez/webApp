// Main application component
// Root router configuration with shared Header layout

import { Outlet } from "react-router";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
