import React, { FC, useEffect, useRef, useState } from "react";
import SocialsShare from "components/SocialsShare/SocialsShare";
import Avatar from "components/Avatar/Avatar";
import { SinglePageType } from "containers/PageSingle/PageSingle";
import BookmarkContainer from "containers/BookmarkContainer/BookmarkContainer";
import PostCardLikeContainer from "containers/PostCardLikeContainer/PostCardLikeContainer";
import { PageItemType } from "app/pages/pages";
import MainNav2Logged from "./MainNav2Logged";
import MainNav2 from "./MainNav2";
import MainNav1 from "./MainNav1";

export interface HeaderProps {
  // mainNavStyle?: "style1" | "style2" | "style2Logedin";
  mainNavStyle?: "style1" | "style2Logedin";
  currentPage: PageItemType;
}

const Header: FC<HeaderProps> = ({ mainNavStyle = "style1", currentPage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  //
  let prevScrollpos = window.pageYOffset;
  //
  const showSingleMenu = currentPage.type === "/single/:slug";
  //
  const [isSingleHeaderShowing, setIsSingleHeaderShowing] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    if (!mainMenuRef.current) {
      return;
    }
    let mainMenuHeight = mainMenuRef.current.offsetHeight;

    window.onscroll = function() {
      showHideHeaderMenu(mainMenuHeight);
    };
  }, []);

  useEffect(() => {
    if (showSingleMenu) {
      setTimeout(() => {
        //  BECAUSE DIV HAVE TRANSITION 100ms
        window.addEventListener("scroll", showHideSingleHeade);
      }, 200);
    } else {
      window.removeEventListener("scroll", showHideSingleHeade);
    }
  }, [showSingleMenu]);

  const handleProgressIndicator = () => {
    const entryContent = document.querySelector(
      "#single-entry-content"
    ) as HTMLDivElement | null;

    if (!showSingleMenu || !entryContent) {
      return;
    }

    const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight;
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let scrolled = (winScroll / totalEntryH) * 100;
    if (!progressBarRef.current || scrolled > 140) {
      return;
    }

    scrolled = scrolled > 100 ? 100 : scrolled;

    progressBarRef.current.style.width = scrolled + "%";
  };

  const showHideSingleHeade = () => {
    handleProgressIndicator();
    // SHOW _ HIDE SINGLE DESC MENU
    let winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > 600) {
      setIsSingleHeaderShowing(true);
    } else {
      setIsSingleHeaderShowing(false);
    }
  };

  const showHideHeaderMenu = (mainMenuHeight: number) => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;
    if (!mainMenuRef.current) return;

    // SET BG
    if (prevScrollpos < currentScrollPos) {
      currentScrollPos > mainMenuHeight ? setIsTop(false) : setIsTop(true);
    } else {
      currentScrollPos > 0 ? setIsTop(false) : setIsTop(true);
    }

    // SHOW _ HIDE MAIN MENU
    if (prevScrollpos > currentScrollPos) {
      containerRef.current.style.top = "0";
    } else {
      containerRef.current.style.top = `-${mainMenuHeight + 2}px`;
    }
    prevScrollpos = currentScrollPos;
  };

  const renderSingleHeader = () => {
    if (!isSingleHeaderShowing) return null;
    const SINGLE = currentPage.data as SinglePageType;
    const { title, author, id, bookmark } = SINGLE;
    return (
      <div className="nc-SingleHeaderMenu dark relative py-4 bg-neutral-900 dark:bg-neutral-900">
        <div className="container">
          <div className="flex justify-end lg:justify-between">
            <div className="hidden lg:flex items-center mr-3">
              <Avatar
                imgUrl={author.avatar}
                userName={author.displayName}
                sizeClass="w-8 h-8 text-lg"
                radius="rounded-full"
              />
              <h3 className="ml-4 text-lg line-clamp-1 text-neutral-100">
                {title}
              </h3>
            </div>

            {/* ACTION */}
            <div className="flex items-center space-x-2 text-neutral-800 sm:space-x-3 dark:text-neutral-100">
              <PostCardLikeContainer postId={SINGLE.id} like={SINGLE.like} />
              <BookmarkContainer
                initBookmarked={bookmark.isBookmarked}
                postId={id}
              />
              <div className="border-l border-neutral-300 dark:border-neutral-700 h-6"></div>
              <SocialsShare
                className="flex space-x-2"
                itemClass="w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-full left-0 w-full progress-container h-[5px] bg-neutral-300 overflow-hidden">
          <div
            ref={progressBarRef}
            className="progress-bar h-[5px] w-0 bg-teal-600"
          />
        </div>
      </div>
    );
  };

  const renderMainNav = () => {
    switch (mainNavStyle) {
      case "style1":
        return <MainNav1 isTop={isTop} />;
      // case "style2":
      //   return <MainNav2 />;
      case "style2Logedin":
        return <MainNav2Logged />;

      default:
        return <MainNav1 isTop={isTop} />;
    }
  };

  return (
    <div
      className="nc-header nc-will-change-top sticky top-0 w-full left-0 right-0 z-40 transition-all"
      ref={containerRef}
    >
      {/* RENDER MAIN NAVIGATION */}
      <div ref={mainMenuRef}>{renderMainNav()}</div>

      {/* RENDER PROGESSBAR FOR SINGLE PAGE */}
      {showSingleMenu && renderSingleHeader()}

    </div>
  );
};

export default Header;
