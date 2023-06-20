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

export const fetchProfile = async (id: any, url: string) => {
  const response = await fetch(`${url}/api/user/${id}/`);
  const data = await response.json();
  const transformedPosts = {
    id: data.id,
    firstName: data.username,
    lastName: "",
    displayName: data.username,
    email: data.email,
    gender: "",
    avatar: `${url}${data.photo}`,
    bgImage: "https://images.pexels.com/photos/912410/pexels-photo-912410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    count: data.blog_count,
    href: `/author/${data.id}`,
    desc: data.bio,
    jobName: "Author Job"
  }
  return transformedPosts;
}


export const fetchAllProfiles = async (url: string) => {
  const response = await fetch(`${url}/api/users/`);
  const data = await response.json();
  const transformedPosts = data.map((post: any, index: any) => ({
    id: post.id,
    firstName: post.username,
    lastName: "",
    displayName: post.username,
    email: post.email,
    gender: "",
    avatar: `${url}${post.photo}`,
    bgImage: "https://images.pexels.com/photos/912410/pexels-photo-912410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    count: post.blog_count,
    href: `/author/${post.id}`,
    desc: post.bio,
    jobName: "Author Job"
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

  try {
    const response = await fetch(`${url}/api/profile/${user.id}/update/`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + String(token.access),
      },
      body: formData,
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      console.log(updatedProfile);
    } else {
      console.error('Failed to update profile:', response.status);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
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
        image: `${url}${post.image}`,
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
    .then((response) => response.json());
};


export const deleteBlog = async (url: any, id: any, token: any) => {
  await fetch(`${url}/api/blogs/${id}/delete/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + String(token.access),
    },
  });
};



export async function fetchBlog(url: any, id: any, blogId: number) {
  const response = await fetch(`${url}/api/blogs/${blogId}/`);
  const data = await response.json();
  const transformedPosts = {
    author: {
      id: data.author_id,
      firstName: data.author_name,
      lastName: "",
      displayName: data.author_name,
      email: "nfoulcher2@google.com.br",
      avatar: `${url}${data.author_photo}`,
      count: 43,
      href: `/author/${data.author_id}`,
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
    },
    categories: [{
      id: 1,
      name: "Garden",
      href: "/archive/the-demo-archive-slug",
      thumbnail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80",
      taxonomy: "category",
      count: 13,
      color: "indigo"
    }],
    id: data.id,
    featuredImage: `${url}${data.image}`,
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
    content: "",
    comments: [
      {
        id: 1,
        author: {
          id: data.author_id,
          firstName: data.author_name,
          lastName: "",
          displayName: data.author_name,
          email: "nfoulcher2@google.com.br",
          avatar: `${url}${data.author_photo}`,
          count: 43,
          href: `/author/${data.author_id}`,
          desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
          jobName: "Author Job",
        },
        children: [],
        date: "May 20, 2021",
        content: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        parentId: null,
        like: {
          count: 96,
          isLiked: false
        },
        childrens: null
      }
    ]
  };
  return transformedPosts;
}

export async function fetchComments(url: string, id: number) {
  const response = await fetch(`${url}${id}/comments/`);
  const data = await response.json();
  return data;
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
      email: "nfoulcher2@google.com.br",
      gender: "Bigender",
      avatar: `${url}${post.author_photo}`,
      count: 43,
      href: `/author/${post.author_id}`,
      desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
      jobName: "Author Job",
      bgImage: "https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    },
    categories: [{
      id: 1,
      name: "Garden",
      href: "/archive/the-demo-archive-slug",
      thumbnail: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80",
      count: 13,
      color: "indigo"
    }],
    index: index + 1,
    id: post.id,
    featuredImage: `${url}${post.image}`,
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
