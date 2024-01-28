import { NextPage } from "next";
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import classes from "./CSS/Home.module.scss";
import Image from "next/image";

const Home: NextPage = () => {
  return (
      <main className="flex flex-col">
        <Hero />
        <HomeMenu />
        <section className={`text-center my-16`} id="about">
          <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
          <Image
            src={"/avatar.png"}
            width={399}
            height={363}
            alt={"sallad"}
            className={`${classes.about}`}
          />
          <div className={`text-gray-500 max-w-md mx-auto mt-4 gap-4`}>
            <p className={`${classes["about-text"]}`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
              minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste
              quos suscipit tempora? Aperiam esse fugiat inventore laboriosam
              officiis quam rem!
            </p>
            <p className={`${classes["about-text"]}`}>
              At consectetur delectus ducimus est facere iure molestias
              obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste
              minus molestiae pariatur provident quibusdam saepe?
            </p>
            <p className={`${classes["about-text"]}`}>
              At consectetur delectus ducimus est facere iure molestias
              obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste
              minus molestiae pariatur provident quibusdam saepe?
            </p>
            <p className={`${classes["about-text"]}`}>
              Laborum molestias neque nulla obcaecati odio quia quod
              reprehenderit sit vitae voluptates? Eos, tenetur.
            </p>
          </div>
        </section>
        <section className="text-center my-8" id="contact">
          <SectionHeaders
            subHeader={"Don't hesitate"}
            mainHeader={"Contact us"}
          />
          <div className="mt-8">
            <a
              className="text-4xl underline text-gray-500"
              href="tel:+46738123123"
            >
              +46 738 123 123
            </a>
          </div>
        </section>
        <svg width="0" height="0">
          <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,1 L0,1 Z" />
          </clipPath>
        </svg>
      </main>
  );
};
export default Home;
