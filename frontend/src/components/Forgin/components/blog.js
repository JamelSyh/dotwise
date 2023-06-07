import { useEffect } from "react";


function Blog(props) {

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const {
    id,
    title,
    content,
    author_name,
    author_photo,
    date_created,
    image,
    category,
    total_likes,
    reading_time,
    comment_count,
  } = props;

  useEffect(() => {
    const fadeFromLeftElements = document.querySelectorAll('.fadeFromLeft');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('ffl-active');
      });
    });
    fadeFromLeftElements.forEach((el) => observer.observe(el));

    const fadeFromRightElements = document.querySelectorAll('.fadeFromRight');
    const observerTwo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('ffr-active');
      });
    });
    fadeFromRightElements.forEach((el) => observerTwo.observe(el));

    const fadeFromBottomElements = document.querySelectorAll('.fadeFromBottom');
    const observerThree = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('ffb-active');
      });
    });
    fadeFromBottomElements.forEach((el) => observerThree.observe(el));

    const fadeFromTopElements = document.querySelectorAll('.fadeFromTop');
    const observerFour = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('fft-active');
      });
    });
    fadeFromTopElements.forEach((el) => observerFour.observe(el));

    function handleAccordion() {
      let accordionOpened = document.querySelectorAll('details[open]')
      for (let item of accordionOpened) {
        if (this != item) {
          item.removeAttribute("open");
        }
      }
    }

    const accordions = document.querySelectorAll('details');
    accordions.forEach(accordion => {
      accordion.addEventListener('click', handleAccordion);
    })


    // Clean up the observers when the component unmounts
    return () => {
      observer.disconnect();
      observerTwo.disconnect();
      observerThree.disconnect();
      observerFour.disconnect();
    };
  }, []);


  return (
    <a id={id} href="blog.html" class="blog fadeFromTop" aria-label="blog ">
      <div class="blog__img">
        <img
          src={`${BASE_URL}${image}`}
          alt="blog" />
      </div>
      <div class="blog__text">
        <h5>{category}</h5>
        <h4>{title}</h4>
        <p>{content}</p>
        <div class="blog__text-profile">
          <img
            src={`${BASE_URL}${author_photo}`}
            alt={author_name} />
          <div>
            <h5>{author_name}</h5>
            <p>{date_created}<span>* </span>{reading_time}</p>
          </div>
        </div>
      </div>
    </a>
  );
}


export default Blog;
