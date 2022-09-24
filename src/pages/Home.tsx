import React, { Fragment, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import AOS from "aos";

const Home = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <MainLayout>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="mb-12 text-center md:text-left">
          <h2 
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="1000"
          className="text-5xl mb-6 font-bold text-primary">
            Start for Free
          </h2>
          <h2 
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="text-8xl text-white drop-shadow-[0_8px_8px_rgba(73,173,236,1)]">
            ETH <br /> Portfolio Tracker
          </h2>
          <p className="text-2xl mt-8 text-white">
            Keep track of your profits, losses and portfolio valuation with our
            easy to use platform.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={"/gem_spin.gif"}
            alt="AVATAR"
            className="hero_image"
            // style={{ width: "100%", height: "70%" }}
          />
        </div>
      </div>

      <div className="mt-36 pb-28 grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 xl:gap-12">
        <div 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1200"
        className="bg-dark_deep text-white p-6 rounded-lg">
          <img src={"/real-time-price.svg"} alt="AVATAR" />

          <h4 className="mt-6 md:text-3xl font-medium mb-2">
            Real-time price data
          </h4>
          <p className="text-xl text-white_variant">
            Updating 24/7 using price data from the Ethereum Blockchain.
          </p>
        </div>




        <div 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
        className="bg-dark_deep text-white p-6 rounded-lg">
          <img src={"/free-to-use.svg"} alt="AVATAR" />

          <h4 className="mt-6 md:text-3xl font-medium mb-2">
            Free to use
          </h4>
          <p className="text-xl text-white_variant">
          Top notch crypto portfolio tracking at no cost.
          </p>
        </div>


        <div 
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1800"
        className="bg-dark_deep text-white p-6 rounded-lg">
          <img src={"/current-portfolio.svg"} alt="AVATAR" />

          <h4 className="mt-6 md:text-3xl font-medium mb-2">
            Track your current portfolio 
          </h4>
          <p className="text-xl text-white_variant">
            Compatible with all Ethereum Blockchain tokens and coins.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
