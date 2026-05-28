import React from "react";

import app from "../../public/app.png";

const AppDownloadSection = () => {
  return (
    <section className="w-full bg-[#0f1b11] text-white py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Image */}
        <div className="flex justify-center w-full lg:w-1/2">
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
            "
          />
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          
          <p className="text-orange-400 font-semibold font-sans mb-3 uppercase tracking-widest text-sm sm:text-base">
            Mobile App
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
            text-white
            text-base
            sm:text-lg
            leading-relaxed
            mb-8
            max-w-xl
            mx-auto
            lg:mx-0
          ">
            Experience lightning fast performance, easy booking, secure
            payments, and a beautiful mobile experience directly from your
            smartphone.
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
              className="w-full sm:w-auto"
            >
              <button className="
                flex
                items-center
                justify-center
                gap-4
                bg-white
                text-black
                px-6
                py-4
                rounded-2xl
                hover:scale-105
                transition
                duration-300
                w-full
                sm:w-auto
              ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Play Store"
                  className="w-10 h-10"
                />

                <div className="text-left">
                  <p className="text-xs">GET IT ON</p>
                  <h3 className="font-bold text-lg">Google Play</h3>
                </div>
              </button>
            </a>

            {/* App Store */}
            <a
              href="/shop"
              className="w-full sm:w-auto"
            >
              <button className="
                flex
                items-center
                justify-center
                gap-4
                bg-white
                text-black
                px-6
                py-4
                rounded-2xl
                hover:scale-105
                transition
                duration-300
                w-full
                sm:w-auto
              ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/831/831276.png"
                  alt="App Store"
                  className="w-10 h-10"
                />

                <div className="text-left">
                  <p className="text-xs">Download on the</p>
                  <h3 className="font-bold text-lg">App Store</h3>
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