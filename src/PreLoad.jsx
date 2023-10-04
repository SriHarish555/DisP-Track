import React, { useState } from "react";
import ReactLoading from "react-loading";

const PreLoad = () => {
  const App = React.lazy(() => import("./App"));
  const [loader, setLoader] = useState(true);
  setTimeout(() => setLoader(false), 5000);
  return (
    <>
      <React.Suspense
        fallback={
          <>
            {loader && (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#33F8EF"}
                height={100}
                width={100}
                className="loader"
              />
            )}
          </>
        }
      >
        <App />
      </React.Suspense>
    </>
  );
};

export default PreLoad;
