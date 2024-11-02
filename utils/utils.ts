import { Entry } from "contentful";

import { IBlogFields } from "../@types/generated/contentful";

export const getTagName = (blog: Entry<IBlogFields>): string => {
  if (blog.metadata.tags.length !== 0) {
    if (blog.metadata.tags[0].sys.id === "freelance") {
      return "フリーランス";
    } else if (blog.metadata.tags[0].sys.id === "other") {
      return "その他";
    } else if (blog.metadata.tags[0].sys.id === "programing") {
      return "プログラミング";
    }
  }
  return "";
};

export const getTagLink = (blog: Entry<IBlogFields>): string => {
  if (blog.metadata.tags.length !== 0) {
    return `/category/${blog.metadata.tags[0].sys.id}`;
  }
  return "";
};

export const getFormatedNow = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return (
    year +
    ("0" + month).slice(-2) +
    ("0" + day).slice(-2) +
    "_" +
    ("0" + hour).slice(-2) +
    ("0" + minute).slice(-2) +
    ("0" + second).slice(-2)
  );
};

export const debounce = (fn: () => void, interval: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    // setTimeoutでinterval秒処理を待ち関数を実行
    // debounce関数ががinterval秒内で複数呼び出されても、都度clearTimeoutを実行し、最後の1回だけ実行する
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, interval);
  };
};
