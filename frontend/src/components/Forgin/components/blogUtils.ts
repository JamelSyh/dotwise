const imageUrl = "https://res.cloudinary.com/dz3frffba/";
const profileBackgroundImages = [
  "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3030268/pexels-photo-3030268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/302820/pexels-photo-302820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/866398/pexels-photo-866398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/259526/pexels-photo-259526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/235359/pexels-photo-235359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/931881/pexels-photo-931881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export const login = async (url: any, username: any, password: any) => {

  // @ts-ignore

  return await fetch(`${url}/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
};

export const signup = async (url: any, data: any) => {

  return await fetch(`${url}/api/register/`, {
    method: "POST",
    body: data,
  });

}


export const handleLike = async (url: any, blogId: any, id: any, token: any) => {
  if (!token) {
    // navigate("/login", {
    //   state: { message: "Please login to like!" },
    // });
  } else {
    const response = await fetch(`${url}/api/blogs/${blogId}/addlike/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({ user: id }),
    });
    const data = await response.json();
    console.log(data);
  }
};

export const handleSubmitComment = async (content: any, blogId: any, auth: any) => {
  if (!auth.token) {
  } else {
    return await fetch(`${auth.BASE_API_URL}/api/comments/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(auth.token.access),
      },
      body: JSON.stringify({
        blog: blogId,
        user: auth.user.user_id,
        body: content,
      }),
    });
  };
}


export const fetchComments = async (url: any, blogId: any) => {
  const response = await fetch(`${url}/api/blogs/${blogId}/comments/`);
  const data = await response.json();
  return data.map((comment: any, index: any) => ({
    id: comment.id,
    author: {
      id: comment.user,
      firstName: comment.username,
      lastName: "",
      displayName: data.username,
      email: "",
      avatar: `${comment.photo}`,
      count: 0,
      href: `/author/${comment.user}`,
      desc: "",
      jobName: "Author Job",
    },
    children: [],
    date: comment.date_format,
    content: comment.body,
    parentId: null,
    like: {
      count: 0,
      isLiked: false
    },
    childrens: null
  }));
}


export const handleUnlike = async (url: any, blogId: any, id: any, token: any) => {
  if (!token) {
    // navigate("/login", {
    //   state: { message: "You need to login first!" },
    // });
  } else {
    const response = await fetch(`${url}/api/blogs/${blogId}/removelike/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
      body: JSON.stringify({ user: id }),
    });
    const data = await response.json();
    console.log(data);
  }
};


export const fileValidation = (files: any, setMessage: any, e: any) => {
  if (
    files[0].type !== "image/jpeg" &&
    files[0].type !== "image/png" &&
    files[0].type !== "image/jpg"
  ) {
    setMessage("Please choose a valid image file (jpg, jpeg or png)");
    e.target.value = "";
    return;
  }
  if (files[0].size > 2000000) {
    setMessage("Maximum image size is 2MB");
    e.target.value = "";
    return;
  }
};

export const fetchProfile = async (id: any, url: any) => {
  const response = await fetch(`${url}/api/user/${id}/`);
  const data = await response.json();
  const transformedPosts = {
    id: data.id,
    firstName: data.username,
    lastName: "",
    displayName: data.username,
    email: data.email,
    gender: "",
    avatar: `${imageUrl}${data.photo}`,
    bgImage: `${imageUrl}${data.bg_image}` || profileBackgroundImages[data.id % profileBackgroundImages.length],
    count: data.blog_count,
    href: `/author/${data.id}`,
    desc: data.bio,
    jobName: "Author Job",
    api_key: data.api_key,
    role: data.role
  }
  return transformedPosts;
}


export const fetchAllProfiles = async (url: string) => {
  const response = await fetch(`${url}/api/users/`);
  const data = await response.json();
  const transformedPosts = data.map((post: any, index: any) => ({
    id: post.id,
    api_key: data.api_key,
    firstName: post.username,
    lastName: "",
    displayName: post.username,
    email: post.email,
    gender: "",
    avatar: `${imageUrl}${post.photo}`,
    bgImage: post.bg_image ? `${imageUrl}${post.bg_image}` : profileBackgroundImages[post.id % profileBackgroundImages.length],
    count: post.blog_count,
    href: `/author/${post.id}`,
    desc: post.bio,
    jobName: "Author Job",
    role: post.role,
  }));
  return transformedPosts;
}


export const updateProfileInfo = async (url: any, user: any, token: any) => {
  const formData = new FormData();

  if (user.username) {
    formData.append('username', user.username);
  }
  if (user.password) {
    formData.append('password', user.password);
  }
  if (user.bio) {
    formData.append('bio', user.bio);
  }
  if (user.email) {
    formData.append('email', user.email);
  }
  if (user.photo) {
    formData.append('photo', user.photo);
  }
  if (user.bgImage) {
    formData.append('bg_image', user.bgImage);
  }
  if (user.role) {
    formData.append('role', user.role);
  }

  return await fetch(`${url}/api/profile/${user.id}/update/`, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + String(token.access),
    },
    body: formData,
  });

};

export const getMyBlogs = async (url: any, token: any) => {
  if (token) {
    const response = await fetch(`${url}/api/blogs/myblogs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(token.access),
      },
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response body as JSON
      const transformedPosts = data.map((post: any, index: any) => ({
        id: post.id,
        title: post.title,
        image: `${imageUrl}${post.image}`,
        liveStatus: true,
        payment: "Not Applicable",
      }));
      return transformedPosts;
    } else {
      console.error("Failed to fetch my blogs:", response.status);
      return null;
    }
  }
};

export const createBlog = async (url: any, blog: any, token: any) => {
  console.log(blog);
  const formData = new FormData();
  formData.append("title", blog.title);
  formData.append("content", blog.content);
  formData.append("category", blog.category);
  if (blog.image)
    formData.append("image", blog.image);
  formData.append("author", blog.id);
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + String(token.access),
    },
    body: formData,
  };
  return await fetch(`${url}/api/blogs/create/`, requestOptions)
};


export const deleteBlog = async (url: any, id: any, token: any) => {
  return await fetch(`${url}/api/blogs/${id}/delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token.access),
    },
  });
};

export const deleteComment = async (commentId: any, auth: any) => {
  return await fetch(`${auth.BASE_API_URL}/api/comments/${commentId}/delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(auth.token.access),
    },
  });
}


export async function fetchBlog(url: any, id: any, blogId: number) {
  const response = await fetch(`${url}/api/blogs/${blogId}/`);
  const data = await response.json();
  const comments = await fetchComments(url, blogId);
  const transformedPosts = {
    author: {
      id: data.author_id,
      firstName: data.author_name,
      lastName: "",
      displayName: data.author_name,
      email: data.author_email,
      avatar: `${data.author_photo}`,
      count: 43,
      href: `/author/${data.author_id}`,
      desc: data.author_bio,
      jobName: "Author Job",
      role: data.author_role,
    },
    categories: [{
      id: 1,
      name: data.category,
      href: "/archive/the-demo-archive-slug",
      thumbnail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80",
      taxonomy: data.category,
      count: 13,
      color: "indigo"
    }],
    id: data.id,
    featuredImage: `${imageUrl}${data.image}`,
    title: data.title,
    desc: data.summary,
    date: data.date_created,
    href: `/blog/${data.id}`,
    commentCount: data.comment_count,
    viewdCount: data.total_likes,
    readingTime: data.reading_time,
    bookmark: {
      count: 0, // Set the appropriate count value from fetched post
      isBookmarked: false, // Set the appropriate isBookmarked value from fetched post
    },
    like: {
      count: data.likes.length, // Set the appropriate count value from fetched post
      isLiked: data.likes.includes(id), // Set the appropriate isLiked value from fetched post
    },
    authorId: data.author_id, // Set the appropriate authorId value from fetched post
    categoriesId: [], // Set the appropriate categoriesId value from fetched post
    postType: "standard", // Set the appropriate postType value from fetched post
    tags: [
      {
        id: 1,
        name: "Garden",
        href: "/archive/the-demo-archive-slug",
        thumbnail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80",
        count: 13,
        taxonomy: "tag",
        color: "indigo"
      },
    ],
    content: data.content,
    comments: comments,
  };
  return transformedPosts;
}


export const fetchAllBlogs = async (url: string, id: null) => {
  const response = await fetch(`${url}/api/blogs/`);
  const data = await response.json();

  const transformedPosts = data.map((post: any, index: any) => ({
    author: {
      id: post.author_id,
      firstName: post.author_name,
      lastName: "",
      displayName: post.author_name,
      email: post.author_email,
      gender: "",
      avatar: `${post.author_photo}`,
      count: 43,
      href: `/author/${post.author_id}`,
      desc: post.author_bio,
      jobName: "Author Job",
      bgImage: post.bg_image ? `${imageUrl}${post.bg_image}` : profileBackgroundImages[post.id % profileBackgroundImages.length],
      role: data.author_role,
    },
    categories: [{
      id: 1,
      name: post.category,
      href: "/archive/the-demo-archive-slug",
      thumbnail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80",
      count: 13,
      color: "indigo"
    }],
    index: index + 1,
    id: post.id,
    featuredImage: `${imageUrl}${post.image}`,
    title: post.title,
    desc: post.summary,
    date: post.date_created,
    href: `/blog/${post.id}`,
    commentCount: post.comment_count,
    viewdCount: post.total_likes,
    readingTime: post.reading_time,
    bookmark: {
      count: 0, // Set the appropriate count value from fetched post
      isBookmarked: false, // Set the appropriate isBookmarked value from fetched post
    },
    like: {
      count: post.likes.length, // Set the appropriate count value from fetched post
      isLiked: post.likes.includes(id), // Set the appropriate isLiked value from fetched post
    },
    authorId: post.author_id, // Set the appropriate authorId value from fetched post
    categoriesId: [], // Set the appropriate categoriesId value from fetched post
    postType: "standard", // Set the appropriate postType value from fetched post
  }));
  return transformedPosts;
}

export async function fetchAllBlogsByCategory(url: string, category: string) {
  const response = await fetch(`${url}?category=${category}`);
  const data = await response.json();
  return data;
}
