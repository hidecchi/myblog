import { WebglNoiseCube } from "components/WebglNoiseCube/WebglNoiseCube";

const Page = async () => {
  return (
    <div className="main" style={{ overflow: "hidden" }}>
      <WebglNoiseCube />
    </div>
  );
};

export default Page;
