import Meta from "@/components/Meta";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

type Project = {
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "PDKI Indonesia - Indonesian Copyright Search Engine",
    description:
      "PDKI Indonesia (Intellectual Property Database) is Indonesia's official intellectual property information platform managed by the Directorate General of Intellectual Property (DJKI). The platform provides public access to trademark, patent, copyright, industrial design, and geographical indication records, enabling users to search, verify, and monitor intellectual property registrations across Indonesia. PDKI serves as a central repository of intellectual property data, promoting transparency, legal certainty, and digital access to intellectual property services.",
    techStack: ["Laravel", "React", "Elasticsearch", "Linux", "MySQL"],
    images: [
      "/portofolio/pdki/image-1.png",
      "/portofolio/pdki/image-2.png",
      "/portofolio/pdki/image-3.png",
    ],
    link: "https://pdki-indonesia.dgip.go.id/",
  },
  {
    title: "Invoice Tracker",
    description:
      "Invoice tracking is an application that functions to help track invoices starting from the invoice creation process (pending delivery) to the clearing process (payment processing and completion).",
    techStack: ["Nodejs", "React", "MySQL"],
    images: [
      "/portofolio/invoice-tracker/image-1.png",
      "/portofolio/invoice-tracker/image-2.png",
      "/portofolio/invoice-tracker/image-3.png",
    ],
  },
  {
    title: "SIAP",
    description:
      "SIAP is a web app for authoring questions in various types of exams in Indonesia. SIAP application handles a lot of innovative question types such as matching problem, complex multiple choice, cloze procedure, paragraph selection, slide/interactive question, etc.",
    techStack: ["Nodejs", "React", "MySQL"],
    images: [
      "/portofolio/siap/image-1.png",
      "/portofolio/siap/image-2.png",
    ],
  },
  {
    title: "SMILE - Supply chain system",
    description:
      "SMILE (Electronic Health Logistics Inventory Monitoring System) is a nationwide web and mobile platform used by Indonesia's Ministry of Health and supported by UNDP. It digitizes vaccine, medicine, and laboratory supply chain management by providing real-time visibility into inventory levels and cold-chain storage conditions. Scaled to over 10,200 healthcare centers across Indonesia, SMILE helps ensure the availability, safety, and effective distribution of critical health supplies.",
    techStack: ["Nodejs", "React", "MySQL", "Clickhouse"],
    images: [
      "/portofolio/smile/image-1.png",
      "/portofolio/smile/image-2.png",
      "/portofolio/smile/image-3.png",
      "/portofolio/smile/image-4.png",
    ],
  },
];

export default function Portofolio() {
  const [activeGallery, setActiveGallery] = useState<{
    title: string;
    images: string[];
    index: number;
  } | null>(null);

  return (
    <>
      <Meta
        title="Portfolio | Ibnu Musyaffa"
        description="A collection of selected projects with summaries, tech stacks, and image galleries."
        url="/portofolio"
      ></Meta>

      <div className="md:w-[50%] mx-auto bg-white border-2 border-black">
        <div className="px-6 py-5 md:px-10 border-b-2 border-black bg-lime-300">
          <h1 className="mb-2 text-2xl font-medium text-gray-900">Portfolio</h1>
        </div>

        <div className="space-y-8 p-6 md:p-10">
          {projects.map((project) => (
            <article
              key={project.title}
              className="border-2 border-black bg-stone-50"
            >
              <div className="border-b-2 border-black px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium text-gray-950">
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-gray-700">
                      {project.description}
                    </p>
                  </div>

                  {project.link ? (
                    <a
                      href={project.link}
                      className="shrink-0 border-2 border-black bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-100"
                    >
                      View
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-4 p-5 md:grid-cols-3">
                {project.images.map((image, index) => (
                  <button
                    key={`${project.title}-${index}`}
                    type="button"
                    className="relative aspect-[4/3] overflow-hidden border-2 border-black bg-gray-200 text-left cursor-zoom-in"
                    onClick={() =>
                      setActiveGallery({
                        title: project.title,
                        images: project.images,
                        index,
                      })
                    }
                  >
                    <Image
                      src={image}
                      alt={`${project.title} preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </button>
                ))}
              </div>

              <div className="border-t-2 border-black px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border-2 border-black bg-sky-100 px-3 py-1 text-xs font-medium text-gray-900"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        open={!!activeGallery}
        close={() => setActiveGallery(null)}
        index={activeGallery?.index ?? 0}
        slides={(activeGallery?.images ?? []).map((src) => ({ src }))}
        carousel={{ finite: true }}
        render={{
          slide: ({ slide }) => (
            <div className="relative h-full w-full">
              <Image
                src={slide.src}
                alt={activeGallery?.title || "Project image"}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          ),
        }}
      />
    </>
  );
}
