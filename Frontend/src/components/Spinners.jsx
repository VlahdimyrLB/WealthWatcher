import React from "react";
import { BeatLoader, PropagateLoader, ClipLoader } from "react-spinners";

const Spinner = ({ loading, size = 150 }) => {
  return (
    <div className="flex items-center justify-center ">
      <ClipLoader color="#123abc" loading={loading} size={size} />
    </div>
  );
};

const Spinner2 = ({ loading, size = 150 }) => {
  return (
    <div className="flex items-center justify-center ">
      <BeatLoader color="#123abc" loading={loading} size={size} />
    </div>
  );
};

const Spinner3 = ({ loading, size = 150 }) => {
  return (
    <div className="flex items-center justify-center">
      <PropagateLoader color="#123abc" loading={loading} size={size} />
    </div>
  );
};

export { Spinner, Spinner2, Spinner3 };
