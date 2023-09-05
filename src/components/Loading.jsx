import React, { useContext } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { AuthContext } from "../context/AuthContext";

const Loader = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center h-screen bg-[#F3F3F6]">
      <ScaleLoader
        color={'#5F68F6'}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
