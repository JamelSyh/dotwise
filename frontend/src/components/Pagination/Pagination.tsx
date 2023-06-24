// @ts-nocheck
import { CustomLink } from "data/types";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import twFocusClass from "utils/twFocusClass";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { selectContentState, setCurrentPage } from "app/content/content";
import { useParams } from "react-router-dom";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "#",
  },
  {
    label: "2",
    href: "#",
  },
  {
    label: "3",
    href: "#",
  },
  {
    label: "4",
    href: "#",
  },
];

export interface PaginationProps {
  className?: string;
}

const Pagination: FC<PaginationProps> = ({ className = "", totalPosts, postsPerPage = 10 }) => {


  const dispatch = useAppDispatch();
  const content = useAppSelector(selectContentState);
  const currentPage = content.currentPage;

  const renderItem = (pag: any) => {
    if (pag === currentPage) {
      // RETURN ACTIVE PAGINATION
      return (
        <span
          onClick={() => { dispatch(setCurrentPage(pag)); }}
          key={pag}
          className={`cursor-pointer inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
        >
          {pag}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <a
        key={pag}
        onClick={() => { dispatch(setCurrentPage(pag)); }}
        className={`cursor-pointer inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
      >
        {pag}
      </a>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {/* {DEMO_PAGINATION.map(renderItem)} */}
      {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }).map((_, index) =>
        renderItem(index + 1)
      )}
    </nav>
  );
};

export default Pagination;
