import React from "react";
import ReactLoading from "react-loading";
import App from "./App";

const PreLoad = () => {
  return (
    <>
      <React.Suspense
        fallback={
          <ReactLoading
            type={"spinningBubbles"}
            color={"#33F8EF"}
            height={100}
            width={100}
            className="loader"
          />
        }
      >
        <App />
      </React.Suspense>
    </>
  );
};

export default PreLoad;
