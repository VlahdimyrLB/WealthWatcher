import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <ClipLoader color="#123abc" loading={loading} css={override} size={150} />
  );
};

export default Spinner;
