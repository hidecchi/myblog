import { WebglRayMarchingObject } from "components/WebglRayMarchingObject/WebglRayMarchingObject";

const Page = async () => {
  return (
    <div className="main" style={{ overflow: "hidden" }}>
      <WebglRayMarchingObject />
    </div>
  );
};

export default Page;
