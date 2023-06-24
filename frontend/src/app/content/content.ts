// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { isEqual } from "lodash";

// interface StateType {
//   posts: [{
//     [postId: string]: PostAuthorType;
//   }];
// }

const initialState = {
  notif: { state: false, msg: null, type: null },
  currentPage: 1,
  comments: [
    {
      id: 1,
      author: {
        id: 1,
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        gender: '',
        avatar: 'https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg',
        count: 0,
        href: '/author/1',
        desc: '',
        jobName: '',
        bgImage: 'https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      },
      date: '',
      content: '',
      parentId: null,
      like: {
        count: 0,
        isLiked: false
      },
      childrens: null
    }
  ]
  ,
  posts: [],
  myPosts: [
    {
      author: {
        id: 1,
        firstName: '',
        lastName: '',
        displayName: '',
        email: '',
        gender: '',
        avatar: 'https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg',
        count: 0,
        href: '/author/1',
        desc: '',
        jobName: '',
        bgImage: 'https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
      },
      categories: [
      ],
      id: 1,
      featuredImage: '',
      title: '',
      desc: '',
      date: '',
      href: '',
      commentCount: 0,
      viewdCount: 0,
      readingTime: '',
      bookmark: {
        count: 0,
        isBookmarked: false
      },
      like: {
        count: 0,
        isLiked: false
      },
      authorId: 0,
      categoriesId: [],
      postType: '',
      tags: [
      ],
    }
  ],
  post: {
    author: {
      id: 1,
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      gender: '',
      avatar: 'https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg',
      count: 0,
      href: '/author/1',
      desc: '',
      jobName: '',
      bgImage: 'https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    },
    categories: [
    ],
    id: 1,
    featuredImage: '',
    title: '',
    desc: '',
    date: '',
    href: '',
    commentCount: 0,
    viewdCount: 0,
    readingTime: '',
    bookmark: {
      count: 0,
      isBookmarked: false
    },
    like: {
      count: 0,
      isLiked: false
    },
    authorId: 0,
    categoriesId: [],
    postType: '',
    tags: [
    ],
    content: '',
    comments: [
      {
        id: 1,
        author: {
          id: 1,
          firstName: '',
          lastName: '',
          displayName: '',
          email: '',
          gender: '',
          avatar: 'https://res.cloudinary.com/dz3frffba/image/upload/v1687457552/media/profile/default.jpg',
          count: 0,
          href: '/author/1',
          desc: '',
          jobName: '',
          bgImage: 'https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        date: '',
        content: '',
        parentId: null,
        like: {
          count: 0,
          isLiked: false
        },
        childrens: null
      }
    ]
  }
};

export const ContentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.posts, action.payload)) {
        state.posts = action.payload;
      }
    },
    setMyPosts: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.myPosts, action.payload)) {
        state.myPosts = action.payload;
      }
    },
    setPost: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.post, action.payload)) {
        state.post = action.payload;
      }
    },
    setComments: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.comments, action.payload)) {
        state.comments = action.payload;
      }
    },
    setCurrentPage: (state, action: PayloadAction<any>) => {
      if (!isEqual(state.currentPage, action.payload)) {
        state.currentPage = action.payload;
      }
    },
    setNotif: (state, action: PayloadAction<any>) => {
      state.notif = action.payload;
    },
  },
});

export const {
  setPosts,
  setMyPosts,
  setPost,
  setComments,
  setCurrentPage,
  setNotif,
} = ContentSlice.actions;

export const selectContentState = (state: RootState) =>
  state.content;

export default ContentSlice.reducer;

