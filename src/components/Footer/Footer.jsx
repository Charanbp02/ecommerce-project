import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${"https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/website/footer-pattern.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ3ZWJzaXRlL2Zvb3Rlci1wYXR0ZXJuLmpwZyIsImlhdCI6MTc0MzgzMTQwNSwiZXhwIjoxNzc1MzY3NDA1fQ.lP8zVG1TOGqjOwzQ3qin_No5IEvxPMoW0Lw2N7e1lKE"})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    title: "Home",
    link: "/#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-44 pt-5">
          {/* company details */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={"https://nmquritpryrthvxcvkxi.supabase.co/storage/v1/object/sign/clothes/logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjbG90aGVzL2xvZ28ucG5nIiwiaWF0IjoxNzQzODMxNDgzLCJleHAiOjE3NzUzNjc0ODN9.oYZ-M1wrfyLn3F9vcl62jTIErihArhO6zUIwIo0LBDQ"} alt="" className="max-w-[50px]" />
              Trend Zone
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in
              beatae ea recusandae blanditiis veritatis.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      className="cursor-pointer hover:text-primary hover:translate-x-1 duration-300 text-gray-200"
                      key={link.title}
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social links */}

            <div>
              <div className="flex items-center gap-3 mt-6">
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaLinkedin className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow />
                  <p>Noida, Uttar Pradesh</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <FaMobileAlt />
                  <p>+91 123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;