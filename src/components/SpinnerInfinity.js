import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const SpinnerInfinity = () => {
  return (
    <>
    <div className="w-[100%] h-screen flex flex-row justify-center items-center bg-slate-800">
      <InfinitySpin
        visible={true}
        width="200"
        color="white"
        ariaLabel="infinity-spin-loading"
      />
      </div>
    </>
  );
};

export default SpinnerInfinity;
