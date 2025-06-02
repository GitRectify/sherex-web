import React, { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import "./App.css";
import Routers from "./routes/Router.js";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css';

const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <ClipLoader
      color="#F3BA2F"
      loading={true}
      size={50}
      aria-label="Loading Spinner"
    />
  </div>
);
function App() {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<LoadingSpinner />}>
        <Routers />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          rtl={false}
          closeButton={true}
          theme="dark"
          className="toast-container"
        />
      </Suspense>
    </div>
  );
}

export default App;
