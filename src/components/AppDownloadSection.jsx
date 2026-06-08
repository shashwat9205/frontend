// eslint-disable-next-line no-unused-vars
import React from "react";

import app from "../../public/app.png";

const AppDownloadSection = () => {
  return (
    <section className="w-full bg-card text-foreground py-14 px-6 border-y border-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Image */}
        <div className=" hidden md:flex justify-center w-full lg:w-1/2">
          <img
            src={app}
            alt="Mobile App"
            className="
              w-[240px]
              sm:w-[280px]
              md:w-[200px]
              lg:w-[300px]
              h-auto
              rounded-3xl
              shadow-2xl
              border
              border-border
            "
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          
          <p className="text-primary font-bold font-sans mb-3 uppercase tracking-widest text-xs">
            Biohacking Companion
          </p>

          <h2 className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            text-white
            font-sans
            font-bold
            leading-tight
            mb-3
          ">
            Download Our App <br />
            From Play Store & App Store
          </h2>

          <p className="
            text-stone-300
            text-sm
            sm:text-base
            leading-relaxed
            mb-8
            max-w-xl
            mx-auto
            lg:mx-0
           font-medium">
            Monitor longevity metrics, track daily cellular stacks, chat with the biohacking AI assistant, and order premium formulas with instant shipping directly from your smartphone.
          </p>

          {/* Buttons */}
          <div className="
            flex
            flex-col
            sm:flex-row
            items-center
            lg:items-start
            gap-5
          ">
            
            {/* Play Store */}
            <a
              href="/shop"
              className="w-full sm:w-auto no-underline"
            >
              <button className="
                flex
                items-center
                justify-center
                gap-4
                bg-secondary
                text-foreground
                border
                border-border
                px-6
                py-4
                rounded-2xl
                hover:scale-105
                transition
                duration-300
                w-full
                sm:w-auto
                cursor-pointer
              ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Play Store"
                  className="w-8 h-8"
                />

                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">GET IT ON</p>
                  <h3 className="font-extrabold text-base">Google Play</h3>
                </div>
              </button>
            </a>

            {/* App Store */}
            <a
              href="/shop"
              className="w-full sm:w-auto no-underline"
            >
              <button className="
                flex
                items-center
                justify-center
                gap-4
                bg-secondary
                text-foreground
                border
                border-border
                px-6
                py-4
                rounded-2xl
                hover:scale-105
                transition
                duration-300
                w-full
                sm:w-auto
                cursor-pointer
              ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/831/831276.png"
                  alt="App Store"
                  className="w-8 h-8 filter invert"
                />

                <div className="text-left">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Download on the</p>
                  <h3 className="font-extrabold text-base">App Store</h3>
                </div>
              </button>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;