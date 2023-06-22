// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import Textarea from "components/Textarea/Textarea";
import { handleSubmitComment } from "../../components/Forgin/components/blogUtils";
import { fetchBlog } from "../../components/Forgin/components/blogUtils";
import { useHistory, useParams, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuthState, setPending } from "app/auth/auth";
import { setPost } from "app/content/content";

export interface SingleCommentFormProps {
  className?: string;
  commentId?: number;
  onClickSubmit?: (id?: number) => void;
  onClickCancel?: (id?: number) => void;
  textareaRef?: any;
  defaultValue?: string;
  rows?: number;
}

const SingleCommentForm: FC<SingleCommentFormProps> = ({
  className = "mt-5",
  commentId,
  onClickSubmit,
  onClickCancel,
  textareaRef,
  defaultValue = "",
  rows = 4,
}) => {

  const history = useHistory();
  const location = useLocation();
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const pending = auth.pending;
  const url = auth.BASE_API_URL;

  // @ts-ignore
  const { slug } = useParams();
  const id = parseInt(slug.split('/').pop());

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    if (!auth.token) {
      history.push({
        pathname: "/login",
        state: { from: history.location.pathname } // Save the current path as the "from" state
      });
      return;
    }
    dispatch(setPending(true));
    handleSubmitComment(comment, id, auth).then(() => {
      setComment("");
      fetchBlog(url, auth?.user?.user_id, id).then((data) => {
        dispatch(setPost(data));
        dispatch(setPending(false));
      });
    });
  };


  return (
    <form className={`nc-SingleCommentForm ${className}`}>
      <Textarea
        placeholder="Add to discussion"
        value={comment}
        ref={textareaRef}
        required={true}
        rows={rows}
        onChange={(e) => { setComment(e.target.value); }}
      />
      <div className="mt-2 space-x-3">
        <ButtonPrimary loading={pending} onClick={(e) => { handleCommentSubmit(e); }} type="submit">
          Submit
        </ButtonPrimary>
        <ButtonSecondary type="button" onClick={() => { setComment(""); }}>
          Cancel
        </ButtonSecondary>
      </div>
    </form >
  );
};

export default SingleCommentForm;
