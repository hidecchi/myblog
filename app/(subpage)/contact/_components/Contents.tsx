"use client";

import { useState } from "react";

export const Contents = () => {
  const heading = "お問い合わせ";
  const [thanks, setThanks] = useState<string>("");

  return (
    <div className="main contact-page">
      <h1 className="heading">{heading}</h1>
      <p>
        お仕事、その他のお問い合わせやご相談はこちらのフォームより承っております。
      </p>
      <form
        onSubmit={() => {
          setThanks(
            "お問い合わせありがとうございます。メッセージは正常に送信されました。"
          );
        }}
        target="submitComplete"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSf44oo_fDuu-s1fEjk9thwcuslzNmwtwgS0_YCJqblLmr-KIA/formResponse"
        method="post"
      >
        <label>
          <span>お名前</span>
          <input type="text" name="entry.663295268" required />
        </label>
        <label>
          <span>メールアドレス</span>
          <input type="email" name="entry.1894061630" required />
        </label>
        <label>
          <span>お問い合わせ内容</span>
          <textarea name="entry.1860343706" required />
        </label>
        <button type="submit">メッセージを送る</button>
      </form>
      <iframe name="submitComplete"></iframe>
      <p className="thanks">{thanks}</p>
    </div>
  );
};
