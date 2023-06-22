import React, { FC } from "react";
import Heading from "components/Heading/Heading";

export interface Statistic {
  id: string;
  heading: string;
  subHeading: string;
}

const FOUNDER_DEMO: Statistic[] = [
  {
    id: "1",
    heading: "10,000+",
    subHeading:
      "Braille Articles Shared Worldwide (as of Sept. 30, 2021)",
  },
  {
    id: "2",
    heading: "100,000+",
    subHeading: "Registered Users (as of Sept. 30, 2021)",
  },
  {
    id: "3",
    heading: "220+",
    subHeading:
      "Countries and Regions Reached (as of Sept. 30, 2021)",
  },
];

export interface SectionStatisticProps {
  className?: string;
}

const SectionStatistic: FC<SectionStatisticProps> = ({ className = "" }) => {
  return (
    <div className={`nc-SectionStatistic relative ${className}`}>
      <Heading
        desc=" We're dedicated to providing impartial and independent content, fostering a global community of braille enthusiasts and blind individuals. "
      >
        🌐 dotwise in Numbers
      </Heading>
      <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3 xl:gap-8">
        {FOUNDER_DEMO.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white dark:bg-black/20 rounded-2xl dark:border-neutral-800"
          >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-4xl dark:text-neutral-200">
              {item.heading}
            </h3>
            <span className="block text-sm text-neutral-500 mt-3 sm:text-base dark:text-neutral-400">
              {item.subHeading}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionStatistic;
