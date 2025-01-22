import React, { useEffect } from "react";
import { useChannelStore } from "../stores/channel";
import Loading from "../components/Loading";
import CategoryRow from "../components/CategoryRow";

const backgroundStyle: React.CSSProperties = {
  background: 'radial-gradient(circle, #1A0966 25%, #292733 100%)',
}

const Home: React.FC = () => {
  const { isLoading, fetchChannels, getChannelsByCategory } = useChannelStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);
  const categories = ["News", "Sports", "Music", "Series"];
  return (
    <div className="min-h-screen" style={backgroundStyle}>
      <h1 className="text-4xl font-bold text-start text-white pl-4 py-8">
        Channel Categories
      </h1>
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
