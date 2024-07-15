import React from "react";
import { BeatLoader, PropagateLoader, ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading, size = 150 }) => {
  return (
    <ClipLoader color="#123abc" loading={loading} css={override} size={size} />
  );
};

const Spinner2 = ({ loading, size = 150 }) => {
  return (
    <BeatLoader color="#123abc" loading={loading} css={override} size={size} />
  );
};

const Spinner3 = ({ loading, size = 150 }) => {
  return (
    <PropagateLoader
      color="#123abc"
      loading={loading}
      css={override}
      size={size}
    />
  );
};

export { Spinner, Spinner2, Spinner3 };
