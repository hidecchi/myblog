import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | Kitsune Blog",
  description: "WebエンジニアKitsuneのブログの問い合わせページです。",
};

// const sleep = (waitTime: number) =>
//   new Promise((resolve) => setTimeout(resolve, waitTime));
const Page: NextPage = async () => {
  // await sleep(50);
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const data = await response.json();
  return (
    <div>
      {data.map((item: any, index: number) => (
        <div key={index}>{item.title}</div>
      ))}
    </div>
  );
};

export default Page;
