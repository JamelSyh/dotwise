// @ts-nocheck
import React, { FC, useEffect, useRef } from "react";
import NcModal from "components/NcModal/NcModal";
import { CommentType } from "./CommentCard";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { deleteComment } from "../../components/Forgin/components/blogUtils";
import { useParams } from "react-router";
import { fetchBlog } from "../../components/Forgin/components/blogUtils";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState } from "app/auth/auth";
import { setPost, setNotif } from "app/content/content";

export interface ModalDeleteCommentProps {
  commentId: CommentType["id"];
  show: boolean;
  onCloseModalDeleteComment: () => void;
}

const ModalDeleteComment: FC<ModalDeleteCommentProps> = ({
  commentId,
  show,
  onCloseModalDeleteComment,
}) => {
  const textareaRef = useRef(null);

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const url = auth.BASE_API_URL;

  const { slug } = useParams();
  const id = parseInt(slug.split('/').pop());

  const handleDeleteComment = async (e: any) => {
    e.preventDefault();
    const res = await deleteComment(commentId, auth)
    console.log(res);
    if (res.status == 204) {
      dispatch(setNotif({ state: true, msg: "Comment Deleted Successfully", type: "success" }));
    } else {
      dispatch(setNotif({ state: true, msg: "Comment Delete Error", type: "error" }));
    }
    onCloseModalDeleteComment();
    const data = await fetchBlog(url, auth?.user?.user_id, id)
    dispatch(setPost(data));
  };


  const handleClickSubmitForm = (e: any) => {
    handleDeleteComment(e);
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form action="#">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          Delete comment
        </h3>
        <span className="text-sm">
          Are you sure you want to delete this comment? You cannot undo this
          action.
        </span>
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={handleClickSubmitForm} type="submit">
            Delete
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDeleteComment}>
            Cancel
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDeleteComment}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDeleteComment;
