import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import rightImgDemo from "images/BecomeAnAuthorImg.png";
import ButtonPrimary from "components/Button/ButtonPrimary";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <span className="text-xs uppercase tracking-wider font-medium text-neutral-400">
          Unleash Your Braille Storytelling Potential
        </span>
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Become an author and share your great stories
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          Share Your Unique Perspective: Join dotwise as an author and contribute your compelling stories, experiences, and insights related to braille, blindness, and assistive technology.
        </span>
        <ButtonPrimary href={"/signup"} className="mt-8">Become an author</ButtonPrimary>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
