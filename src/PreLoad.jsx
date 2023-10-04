import React from "react";
import ReactLoading from "react-loading";

const PreLoad = () => {
  const App = React.lazy(() => import("./App"));
  return (
    <>
      <React.Suspense fallback="Page is Loading.....">
        <App />
      </React.Suspense>
    </>
  );
};

export default PreLoad;
