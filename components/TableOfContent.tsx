"use client";
import React from "react";
import clsx from "clsx";

type HeadingElement = HTMLHeadingElement;
type HeadingObserverEntry = IntersectionObserverEntry;

interface HeadingRefMap {
  [key: string]: HeadingObserverEntry;
}

const useIntersectionObserver = (
  setActiveId: (id: string | undefined) => void
) => {
  const headingElementsRef = React.useRef<HeadingRefMap>({});

  React.useEffect(() => {
    const callback: IntersectionObserverCallback = (headings) => {
      headingElementsRef.current = headings.reduce<HeadingRefMap>(
        (map, headingElement) => {
          map[headingElement.target.id] = headingElement;
          return map;
        },
        headingElementsRef.current
      );

      const visibleHeadings: HeadingObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string): number =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) =>
            Number(getIndexFromId(a.target.id) > getIndexFromId(b.target.id)) *
              2 -
            1
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -40% 0px",
    });

    const headingElements = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HeadingElement[];

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

type TocProps = {
  toc: Array<{
    level: number;
    title: string;
    href: string;
  }>;
};
export function TableOfContent({ toc }: TocProps) {
  const [activeId, setActiveId] = React.useState<string | undefined>();
  useIntersectionObserver(setActiveId);
  return (
    <div className="flex flex-col justify-center">
      <div className="space-y-2">
        {toc.map((item) => {
          const isActive = item.href === `#${activeId}`;
          return (
            <a
              key={item.href}
              className={clsx("block hover:underline text-sm max-w-[300px] truncate", {
                "pl-0": item.level == 2,
                "pl-5": item.level == 3,
                "text-green-600  font-bold": isActive,
                "text-gray-900": !isActive,
              })}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function TableOfContentMobile({ toc }: TocProps) {
  return (
    <div className="flex flex-col justify-center p-5 ">
      <div className="font-semibold mb-1.5 text-gray-800 uppercase">
        Daftar Isi
      </div>
      <div className="space-y-2">
        {toc.map((item) => {
          return (
            <a
              key={item.href}
              className={clsx("block hover:underline  text-gray-700 ", {
                "pl-0": item.level == 2,
                "pl-5": item.level == 3,
              })}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            >
              {item.title}
            </a>
          );
        })}
      </div>
    </div>
  );
}