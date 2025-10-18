import React from "react";

const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 bg-[#E5E5E5] flex items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-[#4A4A4A] font-bold text-[48px] md:text-[64px] flex items-center justify-center">
          Hozir
          <span className="ml-1 flex">
            <span
              className="inline-block animate-pulse"
              style={{ animationDelay: "0ms", animationDuration: "1.5s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-pulse"
              style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-pulse"
              style={{ animationDelay: "1s", animationDuration: "1.5s" }}
            >
              .
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default LoadingComponent;
