import React, { useEffect, useState } from "react";

interface TimeDisplayProps {
    className: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ className }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();

      // Format hours and minutes
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      // Format date
      const day = now.getDate();
      const month = now.toLocaleString("default", { month: "short" }); // e.g., "Jan"

      // Combine the formatted strings
      setCurrentTime(`${hours}:${minutes} | ${day} ${month}`);
    };

    // Initialize and set interval to update time every minute
    updateCurrentTime();
    const timer = setInterval(updateCurrentTime, 60 * 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  return (
    <div className={className}>
      {currentTime}
    </div>
  );
};

export default TimeDisplay;
