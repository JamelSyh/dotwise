import React, { FC } from "react";
import { PostDataType } from "data/types";
import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer/ButtonPlayMusicRunningContainer";

export interface MediaAudioProps {
  post: PostDataType;
}

const MediaAudio: FC<MediaAudioProps> = ({ post }) => {
  return (
    <ButtonPlayMusicRunningContainer
      className="absolute bg-neutral-900 bg-opacity-30 flex items-center justify-center inset-0"
      post={post}
    />
  );
};

export default MediaAudio;
