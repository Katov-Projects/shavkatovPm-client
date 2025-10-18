"use client";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaCircleChevronDown } from "react-icons/fa6";
import { useSectionStats } from "@/service/hooks/useSectionStats";
import { useGetAllProjects } from "@/service";
import LoadingComponent from "../LoadingComponent";
import { v4 as uuidv4 } from "uuid";

interface Project {
  _id: number;
  title: string;
  subtitle: string;
  maqsad: string;
  yondashuv: string;
  vositalar: string[];
  url?: string;
}

export default function ServiceSection() {
  const { data, isLoading } = useGetAllProjects();

  const [selectedProject, setSelectedProject] = useState<Project>();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedProject(data?.data[0]);
  }, [isLoading]);

  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);

  // const sectionRef = userId ? useSectionStats("projects", userId) : null;
  const sectionRef = useSectionStats("projects", userId ?? "");


  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleShareClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, "_blank");
    }
  };

  if (isLoading) {
    <LoadingComponent />;
  }

  return (
    <section
      ref={sectionRef ?? undefined}
      id="works"
      className="bg-[#EDEBE6] min-h-screen flex justify-center items-center py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-16">
          Oxirgi Loyihalarim
        </h2>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Project Cards */}
          <div className="space-y-8">
            {data?.data?.map((project: any) => (
              <div
                key={project?._id}
                style={{
                  transition: "box-shadow 0.5s ease-in-out",
                  boxShadow:
                    selectedProject?._id === project._id
                      ? "inset 4px 4px 8px rgba(0, 0, 0, 0.25), inset -1px -1px 2px rgba(0, 0, 0, 0.1)"
                      : "0 2px 6px rgba(29, 27, 27, 0.15)",
                }}
                onClick={() => handleProjectClick(project)}
                className={`bg-[#EDEBE6] border border-[#C2C2C2E5] rounded-tl-[5px] rounded-tr-[5px] p-6  transition-shadow cursor-pointer duration-500 ease-in-out group ${
                  selectedProject?._id === project._id ? "shadow-2xl" : "shadow"
                }`}
              >
                <div className=" relative flex items-center justify-between mb-4 h-20">
                  <div className="w-full">
                    <h3 className="text-2xl text-center font-bold text-gray-800 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      {project.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleShareClick(e, project.url)}
                    className="text-gray-400 absolute top-0 right-0 group-hover:text-gray-600 hover:text-blue-600 transition-colors p-1"
                    aria-label={`${project.title} loyihasiga o'tish`}
                  >
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Project Details */}
          <div className="text-gray-700 space-y-8 min-h-[260px]">
            {/* Maqsad */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Maqsad</h3>
              <p className="leading-relaxed">{selectedProject?.maqsad}</p>
            </div>

            {/* Yondashuv va metodologiya */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Yondashuv va metodologiya
              </h3>
              <p className="leading-relaxed">{selectedProject?.yondashuv}</p>
            </div>

            {/* Vositalar */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Vositalar:
              </h3>
              <p className="leading-relaxed">
                {selectedProject?.vositalar.join(", ")}.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6 w-80">
          {data?.data?.map((project: any) => (
            <div
              key={project.title}
              className="bg-[#EDEBE6] border border-[#C2C2C2E5] w-full rounded-[5px] p-6 h-[152px] overflow-hidden"
            >
              {/* Project Header */}
              <div className="flex  justify-between gap-4 h-full items-center">
                {/* Left: Project Info */}
                <div className="w-[48%] flex flex-col justify-center">
                  <h3 className="text-xl border-[#C2C2C2E5] text-center font-bold text-gray-800 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm">
                    {project.subtitle}
                  </p>
                </div>

                <div className="h-50 border border-[#C2C2C2E5]"></div>

                {/* Right: Details + Share Icon */}
                <div className="w-[48%] relative h-35 flex flex-col">
                  <button
                    onClick={(e) => handleShareClick(e, project.url)}
                    className="absolute top-0 right-0 text-gray-400 hover:text-blue-600 transition-colors p-1 z-10"
                    aria-label={`${project.title} loyihasiga o'tish`}
                  >
                    <ExternalLink size={20} />
                  </button>

                  <div
                    className="text-gray-600 text-sm leading-relaxed mt-6 flex-1 overflow-y-scroll pr-2"
                    style={{ maxHeight: "100px" }}
                  >
                    <p className="mb-2">
                      <span className="font-semibold">Maqsad:</span>{" "}
                      {project.maqsad}
                    </p>
                    <p className="mb-2">
                      <span className="font-semibold">Metodologiya:</span>{" "}
                      Agile, Kanban.
                    </p>
                    <p>
                      <span className="font-semibold">Vositalar:</span>{" "}
                      {project.vositalar.join(", ")}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) {
                const y =
                  element.getBoundingClientRect().top + window.scrollY - 50;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className="w-[213px] text-[20px] mx-auto text-center rounded border-1 border-gray-200 text-[#737373] font-bold py-4 px-4 shadow-hover"
          >
            Sizda g’oya bormi?
          </div>
        </div>
      </div>
    </section>
  );
}
