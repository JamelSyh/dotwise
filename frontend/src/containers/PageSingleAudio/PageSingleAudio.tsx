import React, { FC, ReactNode, useEffect } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import { SINGLE_AUDIO } from "data/single";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch } from "app/hooks";
import { Helmet } from "react-helmet";
import { changeCurrentPage } from "app/pages/pages";
import SingleContent from "containers/PageSingle/SingleContent";
import SingleRelatedPosts from "containers/PageSingle/SingleRelatedPosts";
import Badge from "components/Badge/Badge";
import SingleTitle from "containers/PageSingle/SingleTitle";
import SingleMetaAction2 from "containers/PageSingle/SingleMetaAction2";
import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer/ButtonPlayMusicRunningContainer";
import LoadingVideo from "components/LoadingVideo/LoadingVideo";
import iconPlaying from "images/icon-playing.gif";
import { MediaRunningState } from "app/mediaRunning/mediaRunning";

export interface PageSingleAudioProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}

const PageSingleAudio: FC<PageSingleAudioProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // UPDATE CURRENTPAGE DATA IN PAGE-REDUCERS
    dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE_AUDIO }));
    return () => {
      dispatch(changeCurrentPage({ type: "/", data: {} }));
    };
  }, []);

  const renderIcon = (state?: MediaRunningState["state"]) => {
    if (state === "playing") {
      return <img className="w-7" src={iconPlaying} alt="" />;
    }

    if (state === "loading") {
      return <LoadingVideo className="transform scale-75" />;
    }
    return (
      <svg className="w-11 h-11" fill="currentColor" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
        ></path>
      </svg>
    );
  };

  const renderButtonPlay = (
    isCurrentRunning: boolean,
    state?: MediaRunningState["state"]
  ) => {
    let newState = state;
    if (!isCurrentRunning) {
      newState = null;
    }

    return (
      <div
        className={`aspect-w-1 aspect-h-1 rounded-full overflow-hidden shadow-2xl group cursor-pointer `}
      >
        <img
          className={`w-full h-full object-cover group-hover:scale-105 transform transition-transform nc-will-change-transform nc-animation-spin rounded-full ${
            newState === "playing" ? "playing" : ""
          }`}
          src={SINGLE_AUDIO.featuredImage}
          alt="audio"
        />

        <div className="bg-neutral-900 bg-blend-multiply bg-opacity-75 rounded-full"></div>
        <div className="flex items-center justify-center">
          <div className="text-white bg-black bg-blend-multiply bg-opacity-50 w-20 h-20 border-2 border-neutral-300 rounded-full flex items-center justify-center ">
            {renderIcon(newState)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`nc-PageSingleAudio relative pt-8 lg:pt-16 ${className}`}
        data-nc-id="PageSingleAudio"
      >
        {/* Overlay */}
        <div className="bg-primary-50 dark:bg-neutral-800 absolute top-0 inset-x-0 h-60 w-full"></div>
        <Helmet>
          <title>Single Audio || Blog Magazine React Template</title>
        </Helmet>

        {/* SINGLE_AUDIO HEADER */}
        <header className="relative container ">
          <div className="bg-white dark:bg-neutral-900 shadow-2xl px-5 py-7 md:p-11 rounded-2xl md:rounded-[40px] flex flex-col sm:flex-row items-center justify-center space-y-10 sm:space-y-0 sm:space-x-11">
            <div className="w-1/2 sm:w-1/4 flex-shrink-0">
              <ButtonPlayMusicRunningContainer
                renderChildren={renderButtonPlay}
                post={SINGLE_AUDIO}
              />
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div>
                  <Badge name="S1 EP. 128" />
                </div>
                <span className="text-neutral-500 dark:text-neutral-400">
                  Adventures in DevOps
                  <span className="mx-2">·</span>
                  Jul 22
                </span>
              </div>
              <SingleTitle title={SINGLE_AUDIO.title} />
              <span className="hidden lg:block text-lg text-neutral-500 dark:text-neutral-400">
                {SINGLE_AUDIO.desc}
              </span>
              <SingleMetaAction2 meta={SINGLE_AUDIO} />
            </div>
          </div>
        </header>

        {/* SINGLE_AUDIO MAIN CONTENT */}
        <div className="container mt-12">
          <SingleContent data={SINGLE_AUDIO} />
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts />
      </div>
    </>
  );
};

export default PageSingleAudio;
