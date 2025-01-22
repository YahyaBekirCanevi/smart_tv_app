import React, { useEffect } from "react";
import { useChannelStore } from "../stores/channel";
import CategoryRow from "../components/CategoryRow";
import GuestLayout from "../layouts/GuestLayout";

const Home: React.FC = () => {
  const { isLoading, fetchChannels, getChannelsByCategory } = useChannelStore();

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  const categories = ["General", "Sports", "Movies", "Kids", "Documentary"];
  return (
    <GuestLayout contentLoading={isLoading}>
      {categories.map((category, index) => (
        <CategoryRow
          key={category}
          category={category}
          index={index}
          maxRows={categories.length}
          channels={getChannelsByCategory(category)}
        />
      ))}
    </GuestLayout>
  );
};

export default Home;
