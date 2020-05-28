import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

const searchClient = algoliasearch(
  "KBJLQ93WI4",
  "2c640df937f8f88f2c89e59a730941b4"
);

const searchIndices = [
  { name: `bsp-songs`, title: `Songs`, hitComp: `SongHit` },
];

function Header() {
  const [isExpanded, toggleExpansion] = useState(false);
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="bg-green-blue">
      <div className="flex flex-wrap items-center justify-between p-4 mx-auto md:p-8">
        <Link to="/">
          <h1 className="flex items-center text-white no-underline">
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 750 750"
              className="fill-current"
            >
              <path d="M485.2 16.5c-5.5 1.7-7.6 3.1-19.7 13-13.7 11.3-26.6 24.9-48.9 51.5-14.5 17.4-26.5 30.2-53 56.5-18.8 18.7-62.8 62.8-97.7 98-34.9 35.3-70.6 70.4-79.4 78.2-26.7 23.5-47.2 45.4-68.6 73.3-18.1 23.6-31.6 45.2-36 57.6-4.5 13-.6 25.1 10.1 30.7 4.9 2.6 6.2 2.8 11.9 2.4l6.3-.5-5 2.9c-12.8 7.3-15 22.6-4.7 32.5 7.5 7.3 17.7 7.9 28.5 1.7 13.7-7.9 40.6-35 80-80.8 9.1-10.5 23.2-26.7 31.5-36 8.2-9.4 22.4-25.6 31.4-35.9 25-28.7 65.2-68.1 123.6-121 27.8-25.2 44.9-42.4 74.6-75.1 42.3-46.6 46.4-51.7 50.6-63.3 3.8-10.3 2.8-16.1-3.7-21.5-6-5.1-13.3-4.7-19.9.9-3.9 3.4-20.6 22.5-43.1 49.4-5.8 6.9-16.1 18.8-23 26.5-6.9 7.7-19.9 22.5-29 33-26.8 30.9-36.9 41.4-68.5 71-36.8 34.5-43 40.1-72 64.5-56.2 47.4-92.6 82.4-120.5 115.7-7.9 9.5-14.5 17.1-14.8 16.8-.2-.2 5.4-7.5 12.5-16.2 27.1-33.2 46.3-59.2 69.1-93.8 16.3-24.7 23.7-34.4 46.5-61 40.4-47 63.1-71.5 115.7-124.8 38.2-38.8 49.4-48.5 85.5-74.2 27-19.3 48.8-35.9 51.8-39.5 6.2-7.3 7.9-14.5 5.3-21.5-4-10.2-15.3-14.8-27.4-11zM574.8 99.7c-6.2 3-27.6 20.2-37.8 30.3-16.5 16.6-49.3 51.9-63 68-7.3 8.5-17.3 20.2-22.3 26-11.1 12.8-71.1 72.1-101.2 100.1-12.1 11.2-37.1 35-55.5 52.9s-43.2 41.3-55 52.1c-39.5 35.9-63.3 63.6-89.6 104.1-14.6 22.6-16.8 27.6-16.1 36.7.6 7.8 4.1 13.4 10.7 17.1 9 5 21.7 2.4 27.6-5.7 1.2-1.6 5.5-6.7 9.6-11.4s13.7-16.6 21.3-26.5c7.7-9.8 19.8-25.3 27-34.4 18.3-23.1 23.4-29.9 38-51 15.3-22.2 21.8-30.4 44.8-56.7 37.8-43.2 66.5-73.2 108.5-113.5 31.3-30.1 36.6-34.9 66.2-59.8 10.1-8.5 25.4-21.8 33.9-29.5 8.5-7.7 22-19.7 30-26.6 15-12.9 24.7-22.7 37.5-37.8 8.9-10.5 9.8-12.2 9.9-18 .2-12.9-13.2-21.8-24.5-16.4zM591.5 163.1c-7.2 3.8-18.5 12.1-25.7 18.8-3.9 3.6-19.4 20.5-34.3 37.6-14.9 17-35.9 40.2-46.7 51.5-24.2 25.5-120.3 120.2-131.8 130-26.6 22.5-35.4 30.7-60.2 55.8C232.5 518 214.7 538 191 571.3c-11.6 16.1-20 30.1-24.6 40.7-3.8 9.1-4.6 22.7-1.5 28.7 6.6 13 23.5 15.8 33.2 5.6 4-4.2 5.9-7.3 5.9-9.8 0-2.1 5.2-9.8 36-53 14.1-19.8 28.1-39.6 31.2-44 8-11.5 18.9-24.2 40.9-48 30-32.3 38.3-41.6 54.1-60.7 17.8-21.3 41.6-46.3 102.9-107.9 47.1-47.4 55.6-55.1 96.4-88.1 24-19.4 37.7-32.5 46-44.3 4.7-6.5 5-7.3 5-13.1 0-5.1-.4-6.6-2.8-9.7-1.5-2-4.1-4.4-5.7-5.2-4.2-2.2-11.8-1.9-16.5.6z" />
              <path d="M599.5 209.8c-2.9 1.8-13.9 13.5-23.7 25.2-2.5 3-10.6 13.9-17.9 24.2-7.4 10.2-23.4 30.7-35.5 45.5-12.2 14.7-27.3 33.1-33.5 40.7-6.3 7.7-16.9 20.1-23.6 27.5-15.4 17.2-62.5 64.7-85.3 86.1-33.7 31.5-99.6 94.5-108.8 104-20.6 21.1-53 67-68.4 96.8-4.1 8-4.8 10.1-4.8 15.2 0 3.2.4 7 .9 8.3 1.5 3.8 7 9.6 11.2 11.8 4.5 2.3 13.4 2.5 18.2.5 4.3-1.8 10.5-9.1 11.3-13.3.4-2.2 4.4-8 11.8-17.1 6.1-7.6 13.5-17 16.4-21 3-4 5.6-7.2 5.8-7.2.3 0-1.4 2.6-3.7 5.7-21.1 29.1-31.7 55.3-28 69.1 3.6 13.3 20.2 19.4 31.4 11.6 4.4-3.1 8.7-10.1 8.7-14.2 0-1.6 6-9.6 18.8-25 34.8-41.8 47-57.8 64.3-83.7 13.4-20.2 15.9-23.3 54.4-67.5 48.7-56 53.1-60.8 84.9-92.5 39.5-39.4 48-47 80.1-71 32.5-24.3 31.4-23.4 54.8-45.4 36.1-33.8 49.7-55 49.7-77.2-.1-11.3-3.8-17.8-12.2-21.4-5.8-2.4-11.7-1.9-18.5 1.5-10.6 5.3-17.5 12.7-35.9 39-9.3 13.3-23.9 32.6-32.4 42.9-8.5 10.3-21.3 26.3-28.5 35.6-7.1 9.3-16.2 20.7-20.2 25.4-11.1 13.4-80.5 81.7-114.3 112.7-16.7 15.3-40.8 37.9-53.5 50-12.6 12.2-28.4 26.8-35 32.4-20.8 17.7-30.9 28.5-51 54.5-5.9 7.7-11.5 14.7-12.4 15.5-2 2-2.5 2.7 14.5-20 7.7-10.2 20.1-27.5 27.6-38.5 14.9-21.6 24.8-34.7 41.7-55 20-24.1 69.2-77.7 80.7-88 4.4-3.9 17.3-16 28.9-27 11.5-11 31.5-29.6 44.2-41.3 25.1-22.9 42.2-40.7 62.9-65.2 23.8-28.2 30.6-37.9 42.4-60.5 5.7-10.9 6.2-12.3 5.7-16.8-.5-5.4-2.8-9.1-7.7-12.5-4.2-2.8-12.2-3-16.5-.4z" />
            </svg>
            <span className="text-xl font-serif tracking-normal font-bold tracking-tight ml-1">
              {site.siteMetadata.title}
            </span>
          </h1>
        </Link>
        <button
          className="flex items-center block px-3 py-2 text-white border border-white rounded md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:flex md:items-center w-full md:w-auto`}
        >
          {[
            {
              route: `/all-songs`,
              title: `All Songs`,
            },
            {
              route: `/songbook`,
              title: `Song Book`,
            },
            {
              route: `/contact`,
              title: `Contact`,
            },
            {
              route: `/about`,
              title: `About`,
            },
          ].map((link) => (
            <Link
              className="block mt-4 text-white no-underline md:inline-block md:mt-0 md:ml-6"
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
