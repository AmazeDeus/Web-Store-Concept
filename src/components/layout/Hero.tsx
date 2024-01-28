import { FC } from "react";
import Right from "../icons/Right";

const Hero: FC = () => {
  return (
    <section className="hero-wrapper">
      <div className="hero md:mt-4">
        <div className="hero-title">
          <h1 className="text-4xl font-semibold capitalize">
            Store&nbsp;
            <span className="text-primary">Name</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
          <div className="flex gap-4 text-sm">
            <button className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full">
              Order now
              <Right />
            </button>
            <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
              Learn more
              <Right />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
