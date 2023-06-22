import Heading from "components/Heading/Heading";
import NcImage from "components/NcImage/NcImage";
import React from "react";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}
const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Jamal Sayah`,
    job: "Co-founder and Chief Executive",
    avatar:
      "https://res.cloudinary.com/dz3frffba/image/upload/v1687463422/zkabikuepkdtj4e2ught.jpg",
  },
];

const FOUNDER_PARTNER: People[] = [
  {
    id: "1",
    name: `Megateli Abdelaziz`,
    job: "colleague",
    avatar:
      "https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg",
  },
  {
    id: "4",
    name: `Khelil Ouaras`,
    job: "colleague",
    avatar:
      "https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg",
  },
];

const SectionFounder = () => {
  return (
    <>
      <div className="nc-SectionFounder relative">
        <Heading
          desc="Get to know the passionate individuals behind dotwise who are committed to improving the lives of blind individuals."
        >
          🔥 Founder
        </Heading>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
          {FOUNDER_DEMO.map((item) => (
            <div key={item.id} className="max-w-sm">
              <NcImage
                containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
                className="absolute inset-0 object-cover"
                src={item.avatar}
              />
              <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                {item.job}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="nc-SectionFounder relative">
        <Heading
          desc="Discover our partnerships with organizations and experts in the field of blindness and assistive technology."
        >
          ⭐ Collaborations
        </Heading>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
          {FOUNDER_PARTNER.map((item) => (
            <div key={item.id} className="max-w-sm">
              <NcImage
                containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
                className="absolute inset-0 object-cover"
                src={item.avatar}
              />
              <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                {item.job}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionFounder;
