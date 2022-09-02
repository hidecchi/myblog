import React, { useState } from "react";
import Head from "next/head";

export default function Contact(): JSX.Element {
  const heading = "お問い合わせ";
  const [thanks, setThanks] = useState<string>("");

  return (
    <>
      <Head>
        <title>お問い合わせ | kitsune Blog</title>
        <meta
          name="description"
          content="Webエンジニアkitsuneのブログの問い合わせページです。"
        />
      </Head>
      <div className="main">
        <h2 className="heading">{heading}</h2>
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

      <style jsx>
        {`
          iframe {
            display: none;
          }
          form {
            margin-top: 10px;
          }
          form label {
            display: block;
            margin-bottom: 16px;
          }
          form label span {
            display: block;
          }
          form label input {
            appearance: none;
            outline: none;
            width: 100%;
            max-width: 400px;
            height: 30px;
            border: 1px solid #d3cece;
            border-radius: 0px;
          }
          form label input:focus {
            border: 1px solid #42b5e0;
          }

          form label textarea {
            appearance: none;
            resize: none;
            outline: none;
            width: 100%;
            max-width: 400px;
            height: 130px;
            padding: 2px;
            font-family: Arial, YuGothic, "Yu Gothic medium", "Hiragino Sans",
              Meiryo, "sans-serif";
            border: 1px solid #d3cece;
            border-radius: 0px;
          }
          form label textarea:focus {
            border: 1px solid #42b5e0;
          }
          form button[type="submit"] {
            appearance: none;
            max-width: 400px;
            position: relative;
            width: 200px;
            padding: 10px;
            margin-bottom: 10px;
            position: relative;
            background-color: transparent;
            border-bottom: 1px solid #050505;
            border-right: none;
            border-left: none;
            border-top: none;
            cursor: pointer;
            font-family: Arial, YuGothic, "Yu Gothic medium", "Hiragino Sans",
              Meiryo, "sans-serif";
          }
          form button[type="submit"]:hover {
            opacity: 0.5;
          }

          .thanks {
            color: red;
          }
        `}
      </style>
    </>
  );
}
