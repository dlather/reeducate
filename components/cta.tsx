import Image from "next/image";
import Stripes from "@/public/images/stripes-dark.svg";

export default function Cta() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          data-aos="zoom-y-out"
        >
          {/* Glow */}
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500 blur-3xl" />
          </div>
          {/* Stripes illustration */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src={Stripes}
              width={768}
              height={432}
              alt="Stripes"
            />
          </div>
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h4 className="mb-6 border-y text-md font-bold text-gray-200 [border-image:linear-gradient(to_right,transparent,theme(colors.slate.700/.7),transparent)1] md:mb-12 md:text-2xl">
              Our users now work in these companies
            </h4>
            {/* <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <a
                className="btn group mb-4 w-full bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                href="#0"
              >
                <span className="relative inline-flex items-center">
                  Start Free Trial{" "}
                  <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </span>
              </a>
            </div> */}
            <LogoCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}

const LogoCarousel = () => {
  return (
    <div className="relative font-inter antialiased">
      <main className="relative flex-col justify-center overflow-hidden">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg"
                    alt="Facebook"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/disney.svg"
                    alt="Disney"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg"
                    alt="Airbnb"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/apple.svg"
                    alt="Apple"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/spark.svg"
                    alt="Spark"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg"
                    alt="Samsung"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/quora.svg"
                    alt="Quora"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/sass.svg"
                    alt="Sass"
                  />
                </li>
              </ul>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/facebook.svg"
                    alt="Facebook"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/disney.svg"
                    alt="Disney"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/airbnb.svg"
                    alt="Airbnb"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/apple.svg"
                    alt="Apple"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/spark.svg"
                    alt="Spark"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/samsung.svg"
                    alt="Samsung"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/quora.svg"
                    alt="Quora"
                  />
                </li>
                <li>
                  <img
                    src="https://cruip-tutorials.vercel.app/logo-carousel/sass.svg"
                    alt="Sass"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
