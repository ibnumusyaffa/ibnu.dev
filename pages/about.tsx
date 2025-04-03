import Meta from "@/components/Meta";

export default function About() {
  return (
    <>
      <Meta
        title="About | Ibnu Musyaffa"
        description="Tulisan seputar pengembangan perangkat lunak dan teknologi lainnya"
        url="https://ibnu.dev"
      ></Meta>

      <div className="md:w-[50%] mx-auto bg-white border-2 border-black p-5 md:p-10 min-h-screen">
        <div className="prose prose-base">
          <h2>Tentang Saya</h2>
          <p>
            Halo! Saya <strong>Ibnu Musyaffa</strong>, seorang Software Engineer
            dari Jawa Tengah, Indonesia. Selamat datang di blog saya!
          </p>

          <p>
            Di blog ini, saya berbagi pengalaman dan wawasan seputar
            pengembangan perangkat lunak dan teknologi web.
          </p>

          <h3>Skillset:</h3>
          <ul>
            <li>
              <strong>Bahasa:</strong> Javascript/Typescript, PHP, Golang
            </li>
            <li>
              <strong>Framework/Library:</strong> React, Next.js, Node.js,
              Laravel, Tailwind CSS
            </li>
            <li>
              <strong>Database:</strong> MySQL, Postgres, Elasticsearch, Redis
            </li>
            <li>
              <strong>DevOps & Lainnya:</strong> Linux, Docker, Kubernetes,
              Grafana Stack
            </li>
          </ul>

          <h3>Kontak:</h3>
          <ul>
            <li>
              <strong>GitHub: </strong>
              <a
                href="https://github.com/ibnumusyaffa"
                target="_blank"
                className="text-blue-700 no-underline"
              >
                github.com/ibnumusyaffa
              </a>
            </li>
            <li>
              <strong>LinkedIn: </strong>
              <a
                href="https://www.linkedin.com/in/ibnu-musyaffa"
                target="_blank"
                className="text-blue-700 no-underline"
              >
                linkedin.com/in/ibnu-musyaffa
              </a>
            </li>

            <li>
              <strong>Email: </strong>
              <a
                href="mailto:ibnu.musyaffa@gmail.com"
                className="text-blue-700 no-underline"
              >
                ibnu.musyaffa@gmail.com
              </a>
            </li>
          </ul>

          <p>Terima kasih sudah berkunjung!</p>
        </div>
      </div>
    </>
  );
}
