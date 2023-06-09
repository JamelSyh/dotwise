// @ts-nocheck
import React, { useEffect } from "react";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionMagazine1 from "./SectionMagazine1";
import SectionVideos from "./SectionVideos";
import SectionLargeSlider from "./SectionLargeSlider";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { PostDataType } from "data/types";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_AUTHORS } from "data/authors";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionMagazine4 from "./SectionMagazine4";
import SectionAds from "./SectionAds";
import SectionGridPosts from "./SectionGridPosts";
import SectionMagazine7 from "./SectionMagazine7";
import SectionMagazine8 from "./SectionMagazine8";
import SectionMagazine9 from "./SectionMagazine9";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { useAppSelector } from "app/hooks";
import { useAppDispatch } from "app/hooks";
import { selectContentState, setPosts } from "app/content/content";
import { selectAuthState, setPending, setProfiles, setProfile } from "app/auth/auth";
import { fetchAllBlogs, fetchAllProfiles, fetchProfile } from "components/Forgin/components/blogUtils";
import NotifPopup from "components/notifPopup/NotifPopup";

//
//
//

const PageHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const content = useAppSelector(selectContentState);
  const auth = useAppSelector(selectAuthState);
  const url = auth.BASE_API_URL;
  const profiles = auth.profiles;
  const POSTS: PostDataType[] = content.posts;
  const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
  // const MAGAZINE1_POSTS = content.posts;
  // const MAGAZINE2_POSTS = content.posts;

  const sortedPosts = [...POSTS];

  sortedPosts.sort((a, b) => {
    const likesA = a.like.count;
    const likesB = b.like.count;

    if (likesA < likesB) {
      return 1;
    } else if (likesA > likesB) {
      return -1;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setPending(true));
      const blogs = await fetchAllBlogs(url, auth?.user?.user_id);
      dispatch(setPosts(blogs));
      const profiles = await fetchAllProfiles(url);
      dispatch(setProfiles(profiles));
      dispatch(setPending(false));
      if (auth.user?.user_id) {
        dispatch(setPending(true));
        const profileData = await fetchProfile(auth.user.user_id, url);
        dispatch(setProfile(profileData));
        dispatch(setPending(false));
      }
    };

    fetchData();
  }, [auth.user?.user_id]);


  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>Home || Dotwise</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        <BgGlassmorphism />

        {/* ======= START CONTAINER ============= */}
        <div className="container relative">
          {/* === SECTION  === */}
          <SectionLargeSlider
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 "
            posts={sortedPosts.filter((_, i) => i < 3)}
          />

          {/* === SECTION  === */}
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewAuthors
              heading="Newest authors"
              subHeading="Say hello to future creator potentials"
              authors={profiles}
              uniqueSliderClass="PageHome"
            />
          </div>

          {/* === SECTION 5 === */}
          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="Top trending topics"
            subHeading="Discover 233 topics"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
            uniqueSliderClass="pageHome-section5"
          />

          {/* === SECTION 6 === */}
          {/* <div className="relative py-16"> */}
          {/*   <BackgroundSection /> */}
          {/*   <SectionSliderPosts */}
          {/*     postCardName="card9" */}
          {/*     heading="Explore latest audio articles" */}
          {/*     subHeading="Click on the icon to enjoy the music or podcast 🎧" */}
          {/*     sliderStype="style2" */}
          {/*     posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)} */}
          {/*     uniqueSliderClass="pageHome-section6" */}
          {/*   /> */}
          {/* </div> */}

          {/* === SECTION 4 === */}
          <SectionMagazine1
            className="py-16 lg:py-28"
            posts={POSTS}
            tabs={MAGAZINE1_TABS}
          />

          {/* === SECTION 3 === */}
          {/* <SectionAds /> */}

          {/* === SECTION 7 === */}
          {/* <SectionMagazine7 */}
          {/*   className="py-16 lg:py-28" */}
          {/*   posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)} */}
          {/* /> */}
        </div>

        {/* === SECTION 11 === */}
        {/* <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100"> */}
        {/*   <div className="relative container"> */}
        {/*     <SectionGridPosts */}
        {/*       className="py-16 lg:py-28" */}
        {/*       headingIsCenter */}
        {/*       postCardName="card10V2" */}
        {/*       heading="Explore latest video articles" */}
        {/*       subHeading="Hover on the post card and preview video 🥡" */}
        {/*       posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)} */}
        {/*       gridClass="md:grid-cols-2 lg:grid-cols-3" */}
        {/*     /> */}
        {/*   </div> */}
        {/* </div> */}

        <div className="container ">
          {/* === SECTION 9 === */}
          {/* <SectionMagazine8 */}
          {/*   className="py-16 lg:py-28" */}
          {/*   posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)} */}
          {/* /> */}

          {/* {/* === SECTION 9 === */}
          {/* <div className="relative py-16"> */}
          {/*   <BackgroundSection /> */}
          {/*   <SectionMagazine9 */}
          {/*     posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 16)} */}
          {/*   /> */}
          {/* </div> */}

          {/* === SECTION 8 === */}
          <div className="relative py-16">
            <BackgroundSection />
            <SectionBecomeAnAuthor />
          </div>

          {/* === SECTION 5 === */}
          <SectionGridAuthorBox
            className="py-16 lg:py-28"
            authors={profiles.filter((_, i) => i < 10)}
          />


          {/* === SECTION 11 === */}
          {/* <SectionMagazine4 */}
          {/*   className="py-16 lg:py-28" */}
          {/*   heading="Life styles 🎨 " */}
          {/*   posts={MAGAZINE2_POSTS} */}
          {/*   tabs={MAGAZINE1_TABS} */}
          {/* /> */}

          {/* === SECTION 12 === */}
          {/* <div className="relative py-16"> */}
          {/*   <BackgroundSection /> */}
          {/*   <SectionSliderPosts */}
          {/*     postCardName="card11" */}
          {/*     heading=" More design articles" */}
          {/*     subHeading="Over 1118 articles " */}
          {/*     posts={DEMO_POSTS.filter( */}
          {/*       (p, i) => i > 3 && i < 25 && p.postType === "standard" */}
          {/*     )} */}
          {/*     sliderStype="style2" */}
          {/*     uniqueSliderClass="pageHome-section12" */}
          {/*   /> */}
          {/* </div> */}

          {/* === SECTION 14 === */}

          {/* === SECTION 15 === */}
          {/* <SectionVideos className="py-16 lg:py-28" /> */}

          {/* === SECTION 17 === */}
          <SectionLatestPosts
            className="pb-16 lg:pb-28"
            posts={POSTS}
            widgetPosts={POSTS.filter((_, i) => i > 2 && i < 7)}
            categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
            tags={DEMO_CATEGORIES}
            authors={profiles.filter((_, i) => i < 5)}
          />
          <SectionSubscribe2 className="pt-16 lg:pt-28" />
        </div>
        {/* ======= END CONTAINER ============= */}
      </div>
    </div>
  );
};

export default PageHome;
