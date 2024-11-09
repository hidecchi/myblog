"use client";

import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { debounce } from "utils/utils";
import { createTexture, setProgram } from "utils/webglUtils";

import fragmentShaderSource from "./fragmentShader.glsl";
import vertexShaderSource from "./vertexShader.glsl";
import styles from "./WebglCanvasSlide.module.scss";

type TickState = {
  type: "stop" | "increase" | "decrease";
  before: number;
  number: number;
};

const slideItems = [
  {
    text: "Shisha Cafe&Barランデヴー様",
    link: "https://rendezvous-shisha.com/",
  },
  { text: "飲食テナントナビ様", link: "https://fukuokatenpo.com/" },
];

export const WebglCanvasSlide = () => {
  const canvasWrapRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstSetUpRef = useRef<boolean>(true);

  const tickStateRef = useRef<TickState>({
    type: "stop",
    before: 0,
    number: 0,
  });

  useEffect(() => {
    if (!firstSetUpRef.current) return;
    if (!canvasRef.current) return;
    if (!canvasRef.current.parentElement) return;

    firstSetUpRef.current = false;

    const parentWidth = canvasRef.current.parentElement.clientWidth;
    const aspectRatio = 550 / 1000;

    canvasRef.current.width = parentWidth;
    canvasRef.current.height = parentWidth * aspectRatio;

    const gl = canvasRef.current.getContext("webgl2");
    const program = gl && gl.createProgram();

    if (!gl || !program) return;

    setProgram(gl, program, vertexShaderSource, fragmentShaderSource);
    gl.enable(gl.DEPTH_TEST);

    //////////////////////// attributeの設定　////////////////////////
    const vertexData = [
      -1, -1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0, 1, -1, 0, -1, 1, 0,
    ];
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexData),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 12, 0);
    gl.enableVertexAttribArray(0);
    //////////////////////// attributeの設定　////////////////////////

    (async () => {
      //////////////////////// textureの設定　////////////////////////
      await createTexture(
        gl,
        program,
        "uSampler",
        5,
        "/randevouz.jpg",
        1000,
        550
      );
      await createTexture(
        gl,
        program,
        "uSampler2",
        6,
        "/tenant-navi.jpg",
        1000,
        550
      );
      //////////////////////// textureの設定　////////////////////////

      const tickLoc = gl.getUniformLocation(program, "uTick");

      gl.uniform1f(tickLoc, tickStateRef.current.number);
      const draw = () => {
        requestAnimationFrame(draw);
        if (tickStateRef.current.type === "increase") {
          tickStateRef.current.number += 25;
          if (
            tickStateRef.current.before + 1000 <=
            tickStateRef.current.number
          ) {
            tickStateRef.current.type = "stop";
          }
        }
        if (tickStateRef.current.type === "decrease") {
          tickStateRef.current.number -= 25;
          if (
            tickStateRef.current.before - 1000 >=
            tickStateRef.current.number
          ) {
            tickStateRef.current.type = "stop";
          }
        }
        gl.uniform1f(tickLoc, tickStateRef.current.number);
        gl.drawArrays(gl.TRIANGLES, 0, vertexData.length / 3);
      };

      draw();
    })();

    const onWindowResize = debounce(() => {
      if (!canvasRef.current) return;
      if (!canvasRef.current.parentElement) return;

      const parentWidth = canvasRef.current.parentElement.clientWidth;
      const aspectRatio = 550 / 1000;

      canvasRef.current.width = parentWidth;
      canvasRef.current.height = parentWidth * aspectRatio;

      const gl = canvasRef.current.getContext("webgl2");
      if (gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    }, 100);
    window.addEventListener("resize", onWindowResize);

    return () => {
      if (process.env.ENV !== "develop") {
        window.removeEventListener("resize", onWindowResize);
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, []);

  return (
    <>
      <a
        className={styles.canvasWrap}
        ref={canvasWrapRef}
        target="_blank"
        rel="noopener noreferrer"
        href={slideItems[0].link}
        aria-label={`${slideItems[0].text}サイトへ`}
      >
        <canvas
          id="webgl-canvas"
          ref={canvasRef}
          style={{ margin: "0 auto" }}
        />
      </a>
      <ControlPanel tickStateRef={tickStateRef} canvasWrapRef={canvasWrapRef} />
    </>
  );
};

const ControlPanel = ({
  tickStateRef,
  canvasWrapRef,
}: {
  tickStateRef: MutableRefObject<TickState>;
  canvasWrapRef: RefObject<HTMLAnchorElement>;
}) => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const onClickPrev = () => {
    if (tickStateRef.current.number === 0) return;
    tickStateRef.current.before = tickStateRef.current.number;
    tickStateRef.current.type = "decrease";
    setSlideIndex(0);
    if (canvasWrapRef.current) {
      canvasWrapRef.current.href = slideItems[0].link;
      canvasWrapRef.current.ariaLabel = `${slideItems[0].text}サイトへ`;
    }
  };

  const onClickNext = () => {
    if (tickStateRef.current.number >= 1000) return;
    tickStateRef.current.before = tickStateRef.current.number;
    tickStateRef.current.type = "increase";
    setSlideIndex(1);
    if (canvasWrapRef.current) {
      canvasWrapRef.current.href = slideItems[1].link;
      canvasWrapRef.current.ariaLabel = `${slideItems[1].text}サイトへ`;
    }
  };

  return (
    <div className={styles.controlPanel}>
      <p className={styles.slideItemName}>{slideItems[slideIndex]?.text}</p>
      <div className={styles.controlPanelBottom}>
        <button
          onClick={onClickPrev}
          className={styles.prevButton}
          disabled={slideIndex === 0}
          aria-label="前のスライドへ"
        />
        <button
          onClick={onClickNext}
          className={styles.nextButton}
          disabled={slideIndex === slideItems.length - 1}
          aria-label="次のスライドへ"
        />
        <span className={styles.indexInfo}>
          {slideIndex + 1} / {slideItems.length}
        </span>
      </div>
    </div>
  );
};
