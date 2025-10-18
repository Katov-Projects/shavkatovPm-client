"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetAllBlog, useGetBlogsByCategory } from "@/service";
import BlogSideBar from "@/layout/blog/BlogSideBar";
import { debounce } from "@/lib/utils";
import { Search, Filter } from "lucide-react";
import { IoChevronUpCircleOutline, IoEye } from "react-icons/io5";
import blogCategoryIcon from "../../../public/blogCategoryIcon.svg";
import Image from "next/image";
import NotFoundSearch from "@/components/blog/NotFoundSearch";
import { socket } from "@/lib/socket";
import blogCategoryIcon2 from "../../../public/free-icon-settings-17116966.svg";
import { v4 as uuidv4 } from "uuid";

const BlogPage = () => {
  const [search, setSearch] = useState("");
  const [traffic, setTraffic] = useState("direct");
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(
    undefined
  );
  const [mobileMode, setMobileMode] = useState<"blogs" | "categories">("blogs");
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
    if (!userId) return;

    function detectTrafficSource(): string {
      const ref = document.referrer?.toLowerCase() || "";
      if (!ref) return "direct";
      if (ref.includes("google")) return "google";
      if (ref.includes("yandex")) return "yandex";
      if (ref.includes("t.me") || ref.includes("telegram")) return "telegram";
      if (ref.includes("instagram")) return "instagram";
      return "other";
    }

    const source = detectTrafficSource();
    setTraffic(source);

    const enterTime = new Date().toISOString();

    if (!enteredRef.current) {
      socket.emit("homeSection", {
        name: "blogs",
        traffic: source,
        event: "enter",
        time: enterTime,
        userId: userId,
      });
      enteredRef.current = true;
      console.log("🚀 Sent ENTER event:", "blogs");
    }

    return () => {
      const leaveTime = new Date().toISOString();
      socket.emit("homeSection", {
        name: "blogs",
        traffic: source,
        event: "leave",
        time: leaveTime,
        userId: userId,
      });
      console.log("👋 Sent LEAVE event:", "blogs");
    };
  }, [userId]);

  const [active, setActive] = useState("search");
  const [selectedCategoryName, setSelectedCategoryName] = useState("Barchasi");

  // Data
  const { data: allBlogs, isLoading } = useGetAllBlog(search || undefined);
  const { data: categoryBlogs, isLoading: categoryIsLoading } =
    useGetBlogsByCategory(activeCategoryId);

  const blogs = activeCategoryId ? categoryBlogs?.data?.blog : allBlogs?.data;

  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [blogs]);

  // Handlers
  const handleCategoryClick = (id?: string, name?: string) => {
    setActiveCategoryId(id);
    setSelectedCategoryName(name ?? "Barchasi");
    setMobileMode("blogs");
    // setActive("search");
  };

  // Mobile search debounce
  const [mobileSearch, setMobileSearch] = useState("");
  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
      }, 400),
    []
  );

  return (
    <section className="pt-12 bg-[#EDEBE6] min-h-[80vh]">
      <div className="mx-auto max-w-8xl px-4 py-8">
        <div className="flex gap-2">
          {/* Sidebar (desktop) */}
          <BlogSideBar
            onSearchChange={setSearch}
            onCategoryClick={handleCategoryClick}
            activeCategoryId={activeCategoryId}
          />

          {/* Main content */}
          <div className="lg:block w-full lg:border-2 md:pt-10 rounded-[10px] lg:border-[#BEBEBE]">
            <div className="flex-1 lg:h-150 lg:overflow-auto pb-20 lg:w-[90%] lg:m-auto">
              {/* Mobile controls */}
              <div className="lg:hidden mb-6 flex items-center gap-3">
                <div
                  className={`relative h-9 flex-1 shadow-md rounded-[5px] ${
                    active === "search" ? "w-[80%]" : "w-[15%]"
                  }`}
                  onClick={() => {
                    setActive("search");
                    setMobileMode("blogs");
                    setActiveCategoryId(undefined);
                    setSelectedCategoryName("Barchasi");
                    setSearch("");
                    setMobileSearch("");
                  }}
                >
                  <Search
                    className={`absolute ${
                      active === "search" ? "left-3" : "left-5"
                    } top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500`}
                  />
                  <input
                    placeholder="Izlash..."
                    style={{
                      transition: "all 0.3s ease-in-out",
                    }}
                    className={` ${
                      active === "search" ? "" : "hidden"
                    } w-full bg-[#EDEBE6] pl-10 pr-3 py-2 text-sm outline-none focus:outline-none`}
                    onChange={(e) => {
                      setMobileSearch(e.target.value);
                      debouncedSearch(e.target.value);
                    }}
                    value={mobileSearch}
                  />
                </div>
                <button
                  style={{
                    transition: "all 0.3s ease-in-out",
                  }}
                  className={`rounded-md shadow-md flex items-center justify-between bg-[#EDEBE6] px-3 py-2 text-sm ${
                    active === "category" ? "w-[80%]" : "w-[15%]"
                  }`}
                  onClick={() => {
                    setActive("category");
                    setMobileMode("categories");
                  }}
                >
                  {active === "category" ? (
                    <span className=" text-[#000000] font-bold truncate">
                      {selectedCategoryName}
                    </span>
                  ) : (
                    ""
                  )}
                  <div
                    className={` relative w-5 h-5 opacity-70 ${
                      active == "category" ? "" : "mx-auto"
                    }`}
                  >
                    <Image src={blogCategoryIcon2} fill alt="this img" />
                  </div>
                </button>
              </div>

              {/* Content list */}
              {mobileMode === "categories" ? (
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden`}
                >
                  <div className="w-full">
                    <BlogSideBar
                      showOnMobile
                      hideSearch
                      onSearchChange={(v) => setSearch(v)}
                      onCategoryClick={(id, name) =>
                        handleCategoryClick(id, name)
                      }
                      activeCategoryId={activeCategoryId}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {showNotFound && <NotFoundSearch />}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs?.map((b: any) => (
                      <Link
                        key={b._id}
                        href={`/blog/${b._id}`}
                        className="block rounded-[5px] break-words border border-gray-300 shadow-md px-6 py-6 "
                      >
                        <div className="md:mx-auto">
                          <div className="text-4xl capitalize font-bold text-[#4A4A4A]">
                            {b?.title}
                          </div>
                          <div className="mt-3 h-[1px] bg-[#737373] w-[215px]" />
                          <div className="mt-3 text-[#00000080] opacity-50 font-bold">
                            {b?.subtitle}
                          </div>
                          <div className="mt-8 text-xs text-gray-500 flex items-center justify-between gap-6">
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
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              <div
                className={`lg:hidden mt-10 ${
                  active === "category" ? "hidden" : ""
                }`}
              >
                <button
                  className="block w-[170px] mx-auto cursor-pointer border border-[#737373] py-2"
                  onClick={() => {
                    setActive("category");
                    window.scrollTo({ top: 0 });
                    setMobileMode("categories");
                  }}
                >
                  Umumiy Bloglar
                </button>

                <IoChevronUpCircleOutline
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-[43px] float-end  text-gray-400 rounded-full active:scale-95 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
