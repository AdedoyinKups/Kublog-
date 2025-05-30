"use client";

import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = ({ params }) => {
  const [data, setData] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog', {
        params: {
          id: params.id,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch blog data:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);
  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-1 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt=""
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt=" " />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={
              data.authorImg && (data.authorImg.startsWith('/') || data.authorImg.startsWith('http'))
                ? data.authorImg
                : assets.profile_icon // fallback image
            }
            width={60}
            height={60}
            alt=" "
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image
            className="border-4 border-white"
            src={data.image}
            width={1280}
            height={720}
            alt=" "
          />
          
         <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}></div>
          
            <div className="flex ">
              <Image src={assets.facebook_icon} width={50} height={50} alt="Facebook" />
              <Image src={assets.twitter_icon} width={50} height={50} alt="Twitter" />
            </div>
          </div>
        </div>
      <Footer />
    </>
  ) : (
    <></>
  );
};

export default Page;
