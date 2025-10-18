"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetByIdBlog, useGetSameTags } from "@/service";
import BlogSideBar from "@/layout/blog/BlogSideBar";
import Link from "next/link";
import { IoEye } from "react-icons/io5";
import { setViewBlogApi } from "@/service/api/blog";
import ShareButton from "@/components/blog/ShareButton";
import { LoadingComponent } from "@/components";
import { socket } from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";

const BlogDetalsPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const blogId = id;

  const { data, isLoading } = useGetByIdBlog(blogId);
  const { data: sameTags, isLoading: semIsLoading } = useGetSameTags(blogId);
  const enteredRef = useRef(false);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);

  useEffect(() => {
    if (!data?.blog || enteredRef.current) return;

    const enterTime = new Date().toISOString();

    if (!enteredRef.current) {
      socket.emit("blogStats", {
        name: data.blog.title,
        blogId: data.blog._id,
        event: "enter",
        time: enterTime,
      });
      enteredRef.current = true;
      console.log("🚀 Sent ENTER event:", "blogs");
    }

    return () => {
      const leaveTime = new Date().toISOString();
      socket.emit("blogStats", {
        name: data.blog.title,
        blogId: data.blog._id,
        event: "leave",
        time: leaveTime,
      });
      console.log("👋 Sent LEAVE event:", "blogs");
    };
  }, [data]);

  useEffect(() => {
    if (!blogId || !userId) return;

    const timer = setTimeout(() => {
      setViewBlogApi(blogId, userId).catch(() => {});
    }, 15000);

    return () => clearTimeout(timer);
  }, [blogId, userId]);

  const onFocusSearch = () => {
    router.push("/blog");
  };

  const blog = data?.blog;

  if (isLoading || semIsLoading) {
    return <LoadingComponent />;
  }

  return (
    <section className="pt-12 bg-[#EDEBE6] min-h-[80vh]">
      <div className="mx-auto max-w-8xl px-4 py-8 flex gap-2">
        <BlogSideBar
          onSearchChange={() => {}}
          onCategoryClick={() => router.push("/blog")}
          onFocusSearch={onFocusSearch}
        />

        <div className="flex-1 max-w-full overflow-x-hidden lg:border-2 md:pt-10 pb-10 rounded-[10px] lg:border-[#BEBEBE]">
          <div className="lg:w-[90%] lg:m-auto">
            {/* Header card */}

            <div className="mb-5">
              <Link
                href={"/blog"}
                className="block mx-auto w-[235px] text-center font-bold text-[18px] text-[#000000] opacity-70 py-2 shadow-md"
              >
                Asosiy bo’limga qaytish
              </Link>
            </div>

            <div className="block rounded-[5px] break-words border border-[#C2C2C2] px-6 py-6 ">
              <div className="md:w-[90%] md:mx-auto">
                <div className="text-5xl capitalize font-bold text-[#4A4A4A]">
                  {blog?.title}
                </div>
                <div className="mt-3 h-[1px] bg-[#737373] w-[215px]" />
                <div className="mt-3 text-[20px] text-[#00000080] opacity-50 font-bold">
                  {blog?.subtitle}
                </div>
                <div className="mt-4 text-xs text-gray-500 flex items-center justify-between gap-6">
                  <span className="flex items-center gap-1">
                    <IoEye className="text-[#737373] opacity-50 text-[15px]" />
                    <span className="text-[#737373] opacity-50 font-bold">
                      {blog?.multiViews}
                    </span>
                  </span>
                  <span className="text-[#737373] opacity-50 font-bold">
                    {blog?.createdAt?.slice(0, 10)}
                  </span>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-6">
              {blog?.sections?.map((s: any, idx: number) => (
                <div key={idx}>
                  <h2 className="text-[32px] font-bold text-[#737373] mb-3">
                    {s.title}
                  </h2>
                  <p className="text-[#737373] whitespace-pre-wrap text-[14px] font-bold opacity-90 leading-7">
                    {s.subtitle}
                  </p>
                </div>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center font-bold justify-center">
              <ShareButton />
            </div>

            <br />
            <div className="border border-[#737373] w-[315px] mx-auto"></div>

            {/* Similar tags */}
            {sameTags?.data && sameTags.data.length > 0 && (
              <div className="mt-8">
                <div className="text-center text-[20px] text-[#737373] font-bold mb-15">
                  O'xshash postlar:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sameTags.data.map((b: any) => (
                    <Link
                      key={b._id}
                      href={`/blog/${b._id}`}
                      className="block rounded-[5px] border border-gray-300 shadow-md px-6 py-6 "
                    >
                      <div className="text-4xl capitalize font-bold text-[#4A4A4A]">
                        {b?.title}
                      </div>
                      <div className="mt-3 h-[1px] bg-[#737373] w-[215px]" />
                      <div className="mt-3 text-[#00000080] opacity-50 font-bold">
                        {b?.subtitle}
                      </div>
                      <div className="mt-4 text-xs text-gray-500 flex items-center justify-between gap-6">
                        <span className="flex items-center gap-1">
                          <IoEye className="text-[#737373] opacity-50 text-[15px]" />
                          <span className="text-[#737373] opacity-50 font-bold">
                            {b.multiViews || 0}
                          </span>
                        </span>
                        <span className="text-[#737373] opacity-50 font-bold">
                          {b.createdAt?.slice(0, 10)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="lg:hidden mt-10">
              <Link
                href={"/blog"}
                className="block w-[170px] text-center mx-auto cursor-pointer border border-[#737373] py-2"
              >
                Umumiy Bloglar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetalsPage;
