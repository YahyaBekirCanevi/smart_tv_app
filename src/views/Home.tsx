import React, { useEffect } from "react";
import { useChannelStore } from "../stores/channel";
import Loading from "../components/Loading";
import CategoryRow from "../components/CategoryRow";
import TimeDisplay from "../components/TimeDisplay";

const backgroundStyle: React.CSSProperties = {
  background: "radial-gradient(circle, #1A0966 25%, #292733 100%)",
};

const Home: React.FC = () => {
  const { isLoading, fetchChannels, getChannelsByCategory } = useChannelStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const categories = ["General", "Documentary", "Kids", "Sports", "Movies"];
  return (
    <div className="min-h-screen max-w-full w-full" style={backgroundStyle}>
      <div className="flex align-center justify-between flex-col sm:flex-row">
        <h1 className="text-4xl font-bold text-start text-white pl-4 py-4 sm:py-8 flex align-start flex-col sm:flex-row">
          YBC |{" "}
          <span className="text-lg text-[#888] text-start px-0 sm:px-4 my-2">
            Yahya Bekir Canevi
          </span>
        </h1>
        <TimeDisplay className="text-md text-[#d3d3d3] text-end px-4 mb-4 sm:my-auto" />
      </div>
      {isLoading && (
        <Loading className={"animate-spin h-[30px] w-[30px] w-full m-auto"} />
      )}
      {!isLoading &&
        categories.map((category, index) => (
          <CategoryRow
            key={category}
            category={category}
            index={index}
            maxRows={categories.length}
            channels={getChannelsByCategory(category)}
          />
        ))}
    </div>
  );
};

export default Home;
