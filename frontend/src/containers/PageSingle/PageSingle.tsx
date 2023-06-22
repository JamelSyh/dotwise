// @ts-nocheck
import React, { FC, ReactNode, useEffect, useState } from "react";
import { PostDataType, TaxonomyType } from "data/types";
import NcImage from "components/NcImage/NcImage";
import { SINGLE } from "data/single";
import SingleContent from "./SingleContent";
import { CommentType } from "components/CommentCard/CommentCard";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState } from "app/auth/auth";
import { selectContentState, setPost } from "app/content/content";
import { changeCurrentPage } from "app/pages/pages";
import SingleHeader from "./SingleHeader";
import SingleRelatedPosts from "./SingleRelatedPosts";
import { useParams } from 'react-router-dom';
import { fetchBlog, fetchComments } from "../../components/Forgin/components/blogUtils";

export interface PageSingleProps {
  className?: string;
}

export interface SinglePageType extends PostDataType {
  tags: TaxonomyType[];
  content: string | ReactNode;
  comments: CommentType[];
}


const PageSingle: FC<PageSingleProps> = ({ className = "" }) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const content = useAppSelector(selectContentState);


  const url = auth.BASE_API_URL;
  // @ts-ignore
  const { slug } = useParams();
  const id = parseInt(slug.split('/').pop());

  useEffect(() => {

    fetchBlog(url, auth?.user?.user_id, id).then((data) => {
      dispatch(setPost(data));
      console.log(SINGLE, data);
    });
    // UPDATE CURRENTPAGE DATA IN PAGE-REDUCERS
    dispatch(changeCurrentPage({ type: "/single/:slug", data: content.post }));

    return () => {
      dispatch(changeCurrentPage({ type: "/", data: {} }));
    };
  }, [id]);

  return (
    <>
      <div
        className={`nc-PageSingle pt-8 lg:pt-16 ${className}`}
        data-nc-id="PageSingle"
      >
        {/* SINGLE HEADER */}
        <header className="container rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <SingleHeader pageData={content.post} />
          </div>
        </header>

        {/* FEATURED IMAGE */}
        <NcImage
          containerClassName="container my-10 sm:my-12"
          className="object-contain max-h-250 w-auto mx-auto my-auto"
          src={content.post.featuredImage}
        />

        {/* SINGLE MAIN CONTENT */}
        <div className="container">
          <SingleContent data={content.post} />
        </div>

        {/* RELATED POSTS */}
        <SingleRelatedPosts />
      </div>
    </>
  );
};

export default PageSingle;
