import React, { useEffect } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { getMyBlogs } from "../../components/Forgin/components/blogUtils";
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectAuthState, setPending } from 'app/auth/auth';
import { selectContentState, setMyPosts } from "app/content/content";
import { deleteBlog } from "../../components/Forgin/components/blogUtils";
import { setNotif } from "app/content/content";

// const people = [
//   {
//     id: 1,
//     title: "Tokyo Fashion Week Is Making Itself Great Again",
//     image:
//       "https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 2,
//     title: "Traveling Tends to Magnify All Human Emotions",
//     image:
//       "https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 3,
//     title: "Interior Design: Hexagon is the New Circle in 2018",
//     image:
//       "https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 4,
//     title: "Heritage Museums & Gardens to Open with New Landscape",
//     image:
//       "https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
//   {
//     id: 5,
//     title:
//       "Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job",
//     image:
//       "https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: false,
//     payment: "Not Applicable",
//   },
//   {
//     id: 6,
//     title:
//       "Denton Corker Marshall the mysterious black box is biennale pavilion",
//     image:
//       "https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
//     liveStatus: true,
//     payment: "Not Applicable",
//   },
// ];



const DashboardPosts = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuthState);
  const pending = auth.pending;
  const content = useAppSelector(selectContentState);
  const user = auth.user;
  const authToken = auth.token;
  const url = auth.BASE_API_URL;


  const setMyBlogs = async () => {
    const res = await getMyBlogs(url, authToken);
    dispatch(setMyPosts(res));
  }

  const deletePost = async (item: any) => {
    dispatch(setPending(true));
    const res = await deleteBlog(url, item.id, authToken);
    dispatch(setPending(false));
    if (res.status == 204) {
      dispatch(setNotif({ state: true, msg: "Post Deleted Successfully", type: "success" }));
    } else {
      dispatch(setNotif({ state: true, msg: "Post Delete Error", type: "error" }));
    }
  }

  useEffect(() => {
    setMyBlogs();
  }, [auth])

  return (
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
          <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-left text-xs font-medium text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {content.myPosts.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={item.image}
                        />
                        <div className="ml-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.title}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.liveStatus ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                          Offline
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                      <a
                        href="/#"
                        className="cursor-pointer text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Edit
                      </a>
                      {` | `}
                      <a
                        className=" cursor-pointer text-rose-600 hover:text-rose-900"
                        onClick={() => { deletePost(item) }}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default DashboardPosts;
