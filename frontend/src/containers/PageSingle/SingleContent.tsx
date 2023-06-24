// @ts-nocheck
import React, { FC, useEffect, useRef } from "react";
import Tag from "components/Tag/Tag";
import { SinglePageType } from "./PageSingle";
import SingleAuthor from "./SingleAuthor";
import SingleCommentForm from "./SingleCommentForm";
import SingleCommentLists from "./SingleCommentLists";
import SingleContentDemo from "./SingleContentDemo";
import { useLocation } from "react-router";
import { useAppSelector } from "app/hooks";
import { selectAuthState, setPending } from "app/auth/auth";
import Article from "../../components/Loaders/Article";


export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const { tags, author, commentCount, comments } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  //
  const location = useLocation();
  const auth = useAppSelector(selectAuthState);
  const pending = auth.pending;


  useEffect(() => {
    //  SCROLL TO COMMENT AREA
    if (location.hash !== "#comment") {
      return;
    }
    //
    if (location.hash === "#comment") {
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.scrollIntoView();
        }
      }, 500);
    }
  }, [location]);

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-invert"
      >
        {/* THIS IS THE DEMP CONTENT */}
        {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
        {/* <SingleContentDemo /> */}
        {/* {data.desc} */}
        {/* @ts-ignore */}
        {pending ? <Article /> :
          < div dangerouslySetInnerHTML={{ __html: data.content }} />
        }
      </div>

      {/* TAGS */}
      <div className="max-w-screen-md mx-auto flex flex-wrap">
        {data.categories.map((item) => (
          <Tag hideCount key={item.id} tag={item} className="mr-2 mb-2" />
        ))}
      </div>

      {/* AUTHOR */}
      <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        {/* <SingleAuthor data={data} /> */}
      </div>

      {/* COMMENT FORM */}
      <div
        id="comment"
        ref={commentRef}
        className="max-w-screen-md mx-auto pt-5"
      >
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses ({commentCount})
        </h3>
        <SingleCommentForm
        />
      </div>

      {/* COMMENTS LIST */}
      <div className="max-w-screen-md mx-auto">
        <SingleCommentLists comments={comments} />
      </div>
    </div>
  );
};

export default SingleContent;
