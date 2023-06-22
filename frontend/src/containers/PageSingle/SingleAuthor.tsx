import Avatar from "components/Avatar/Avatar";
import { PostAuthorType } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { selectAuthState } from "app/auth/auth";

export interface SingleAuthorProps {
  author: PostAuthorType;
}

const SingleAuthor: FC<SingleAuthorProps> = ({ data }: any) => {

  const auth = useAppSelector(selectAuthState);
  const author = auth.profile;
  console.log(data, "hil")

  return (
    <div className="nc-SingleAuthor flex">
      <Link to={data.author.href}>
        <Avatar
          imgUrl={data.author.avatar}
          userName={data.author.displayName}
          sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24 "
          radius="rounded-xl"
        />
      </Link>
      <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
          WRITEN BY
        </span>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link to={data.author.href}>{data.author.displayName}</Link>
        </h2>
        <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {data.author.desc}
          <Link className="text-primary-6000 font-medium ml-1" to={data.author.href}>
            Readmore
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SingleAuthor;
