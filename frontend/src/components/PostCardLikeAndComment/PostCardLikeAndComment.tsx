import React, { FC } from "react";
import PostCardCommentBtn from "components/PostCardCommentBtn/PostCardCommentBtn";
import PostCardLikeContainer from "containers/PostCardLikeContainer/PostCardLikeContainer";
import { PostDataType } from "data/types";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState } from "app/auth/auth";
import { handleLike, handleUnlike } from "../../components/Forgin/components/blogUtils";

export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  postData: Pick<PostDataType, "like" | "id" | "href" | "commentCount">;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: PostDataType["id"]) => void;
}

const PostCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  onClickLike = () => { },
}) => {

  const history = useHistory();

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const url = auth.BASE_API_URL;

  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <PostCardLikeContainer
        className={itemClass}
        like={postData.like}
        onClickLike={() => {
          if (!auth.token) {
            history.push("/login");
          }
          else if (postData.like.isLiked) {
            handleUnlike(url, postData.id, auth?.user?.user_id, auth?.token);
          } else {
            handleLike(url, postData.id, auth?.user?.user_id, auth?.token);
          }
        }}
        postId={postData.id}
      />
      <PostCardCommentBtn
        href={postData.href}
        commentCount={postData.commentCount}
        className={`${hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
          }  ${itemClass}`}
      />
    </div>
  );
};

export default PostCardLikeAndComment;
