import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import transcriptorReducer from "./transcriptor/transcriptor";
import authReducer from "./auth/auth";
import translatorReducer from "./translator/translator";
import searchReducer from "./search/search";
import contentReducer from "./content/content";

const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  pages: pagesReducer,
  mediaRunning: mediaRunningReducer,
  transcriptor: transcriptorReducer,
  auth: authReducer,
  translator: translatorReducer,
  search: searchReducer,
  content: contentReducer,
};

export default rootReducers;
