"use client";

import { useState } from "react";

export const Contents = () => {
  const heading = "お問い合わせ";
  const [thanks, setThanks] = useState<string>("");

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await fetch("https://ssgform.com/s/yh7xdTkQCx3P", {
        headers: {
          "X-Requested-With": "XMLHttpRequest", //これが無いと400レスポンスが返却される
        },
        mode: "cors",
        method: "POST",
        body: data,
      });
      if (!res.ok) {
        const json = await res.json();
        console.log(json);
        throw new Error(res.statusText);
      }
      setThanks(
        "お問い合わせありがとうございます。メッセージは正常に送信されました。"
      );
    } catch (err) {
      setThanks("メッセージの送信に失敗しました。");
    }
  };

  return (
    <div className="main contact-page">
      <h1 className="heading">{heading}</h1>
      <p>
        お仕事、その他のお問い合わせやご相談はこちらのフォームより承っております。
      </p>
      <form onSubmit={onSubmitForm}>
        <label>
          <span>
            お名前<span className="required">（必須）</span>
          </span>
          <input type="text" name="お名前" required />
        </label>
        <label>
          <span>
            メールアドレス<span className="required">（必須）</span>
          </span>
          <input type="email" name="メールアドレス" required />
        </label>
        <label>
          <span>
            お問い合わせ内容<span className="required">（必須）</span>
          </span>
          <textarea name="お問い合わせ内容" required />
        </label>
        <button type="submit">メッセージを送信する</button>
      </form>
      <p className="thanks">{thanks}</p>
    </div>
  );
};
