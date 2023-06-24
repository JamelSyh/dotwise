// @ts-nocheck
import React, { useState } from "react";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Select from "components/Select/Select";
import Textarea from "components/Textarea/Textarea";
import Label from "components/Label/Label";
import Editorr from "components/editor/editor";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectAuthState, setPending } from 'app/auth/auth';
import { setNotif } from "app/content/content";
import { createBlog, fileValidation } from "../../components/Forgin/components/blogUtils";

const DashboardSubmitPost = () => {

  const history = useHistory();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const user = auth.user;
  const authToken = auth.token;
  const pending = auth.pending;
  const url = auth.BASE_API_URL;

  const [message, setMessage] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    id: user.user_id,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setBlog((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDataFromEditor = (data: any, g: any) => {
    setBlog((prev) => {
      return {
        ...prev,
        content: data
      }
    });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (blog.content == "")
      return;
    dispatch(setPending(true));
    const res = await createBlog(url, blog, authToken);
    if (res.status == 201) {
      const data = await res.json();
      dispatch(setPending(false));
      dispatch(setNotif({ state: true, msg: "Post Created Successfully", type: "success" }));
      history.push(`/blog/${data.id}`);
    } else {
      dispatch(setNotif({ state: true, msg: "Post Creation Error", type: "error" }));
    }
  }

  const handleFile = (e: any) => {
    const { name, files } = e.target;
    fileValidation(files, setMessage, e);
    setBlog((prev) => {
      return {
        ...prev,
        [name]: files[0],
      };
    });
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <label className="block md:col-span-2">
          <Label>Post Title *</Label>
          <Input type="text" name="title" required className="mt-1" value={blog.title} onChange={handleChange} />
        </label>
        {/* <label className="block md:col-span-2"> */}
        {/*   <Label>Post Excerpt</Label> */}

        {/*   <Textarea className="mt-1" rows={4} /> */}
        {/*   <p className="mt-1 text-sm text-neutral-500"> */}
        {/*     Brief description for your article. URLs are hyperlinked. */}
        {/*   </p> */}
        {/* </label> */}
        <label className="block">
          <Label>Category</Label>

          <Select className="mt-1">
            <option value="-1">– select –</option>
            <option value="ha'apai">Category 1</option>
            <option value="tongatapu">Category 2</option>
            <option value="vava'u">Category 3</option>
          </Select>
        </label>
        <label className="block">
          <Label>Tags</Label>

          <Input type="text" className="mt-1" />
        </label>

        <div className="block md:col-span-2">
          <Label>Featured Image</Label>

          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-700 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-neutral-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-neutral-6000">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleFile}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-neutral-500">
                PNG, JPG, GIF up to 2MB
              </p>
            </div>
          </div>
        </div>
        <label className="block md:col-span-2">
          <Label> Post Content</Label>

          <Editorr required onData={handleDataFromEditor} />
        </label>

        <ButtonPrimary loading={pending} className="md:col-span-2" type="submit">
          Submit post
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default DashboardSubmitPost;
