import NcBookmark, { NcBookmarkProps } from "components/NcBookmark/NcBookmark";
import React from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { useHistory } from "react-router-dom";
import {
  addNewSavedByPostId,
  removeSavedByPostId,
  selectRecentSaveds,
  selectRecentRemoveds,
} from "app/bookmarks/bookmarksSlice";
import { selectAuthState } from "app/auth/auth";

export type BookmarkContainerProps = Omit<NcBookmarkProps, "isBookmarked"> & {
  initBookmarked: boolean;
};

const BookmarkContainer: React.FC<BookmarkContainerProps> = (props) => {
  const { postId, initBookmarked } = props;
  const recentSaveds = useAppSelector(selectRecentSaveds);
  const recentRemoveds = useAppSelector(selectRecentRemoveds);
  const auth = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const isBookmarked = () => {
    if (recentSaveds.includes(postId)) {
      return true;
    }
    if (initBookmarked && !recentRemoveds.includes(postId)) {
      return true;
    }
    return false;
  };

  const handleClickBookmark = () => {
    if (!auth.token) {
      history.push({
        pathname: "/login",
        state: { from: history.location.pathname } // Save the current path as the "from" state
      });
      return;
    }
    if (isBookmarked()) {
      dispatch(removeSavedByPostId(postId));
    } else {
      dispatch(addNewSavedByPostId(postId));
    }
  };

  return (
    <NcBookmark
      onClick={handleClickBookmark}
      isBookmarked={isBookmarked()}
      {...props}
    />
  );
};

export default BookmarkContainer;
