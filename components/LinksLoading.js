import React from "react";

function LinksLoading() {
  return (
    <div className="mx-auto space-y-2" style={{ maxWidth: "420px" }}>
      {[...Array(4).keys()].map((card, cardIndex) => (
        <FakeCard key={cardIndex} />
      ))}
    </div>
  );
}

export default LinksLoading;

const FakeCard = () => (
  <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-[400px] mx-auto">
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-blue-400 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-blue-400 rounded"></div>
          <div className="h-4 bg-blue-400 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);
