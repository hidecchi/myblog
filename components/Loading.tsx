"use client";

import { createRef, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Loading = (): JSX.Element => {
  useEffect(() => {
    loadingTextRefs.current.forEach((item: any) => {
      gsap.set(item.current, {
        x: "random(-200,200)",
        y: "random(-200,200)",
        rotationX: "random(-90,90)",
        rotationY: "random(-90,90)",
        rotationZ: "random(-90,90)",
        opacity: 0,
        color: `hsl(${gsap.utils.random(0, 360, 1)}, 90%, 60%)`,
      });
    });
    const tl = gsap.timeline();
    const ctx = gsap.context(() => {
      tl.to(".loading-text", {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 1,
        duration: 3,
        color: "#333",
        ease: "power2.out",
        stagger: {
          amount: 1,
          from: "center",
        },
      })
        .to(
          ".loading-text",
          {
            ease: "sign.out",
            stagger: {
              amount: 1,
              from: "center",
            },
          },
          "<"
        )
        .to(
          ".loading-text",
          {
            opacity: 0,
            scale: 1.5,
            ease: "power3.in",
            duration: 1.5,
            stagger: {
              amount: 1.2,
              from: "edges",
            },
          },
          "-=0.2"
        )
        .to(".loading", {
          opacity: 0,
          visibility: "hidden",
          duration: 1.5,
        });
    });

    return () => ctx.revert();
  }, []);

  const LOADING_TEXT = "Kitsune Blog";
  const loadingTextRefs = useRef<any>([]);
  LOADING_TEXT.split("").forEach((_, index) => {
    loadingTextRefs.current[index] = createRef();
  });

  return (
    <div className="loading">
      {LOADING_TEXT.split("").map((text, index) => {
        return (
          <span
            className={text === "e" ? "loading-text mr" : "loading-text"}
            key={index}
            ref={loadingTextRefs.current[index]}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
};

export default Loading;
