import {
  EnvelopeIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import ContactLink from "@/components/ContactLink";
import Meta from "@/components/Meta";

export default function About() {
  return (
    <>
      <Meta
        title="About | Ibnu Musyaffa"
        description="Tulisan seputar pengembangan perangkat lunak dan teknologi lainnya"
        url="https://ibnu.dev"
      ></Meta>

      <div className="md:w-[50%] mx-auto bg-white border-2 border-black p-10 min-h-screen">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="text-3xl font-medium text-gray-900 dark:text-white mb-6">
            About
          </div>

          <p className="mb-12 text-gray-700leading-relaxed">
            Hi, I am <b>Ibnu Musyaffa</b>, a software engineer with 10+ years of
            experience. I love to code and build products that help people to
            live better life.
          </p>

          <section>
            <p className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
              Feel free to contact me
            </p>
            <div className="space-y-5">
              <ContactLink
                href="https://github.com/ibnumusyaffa"
                icon={<CodeBracketIcon className="h-5 w-5" />}
              >
                github.com/ibnumusyaffa
              </ContactLink>
              <ContactLink
                href="https://twitter.com/ibnumusyaffa"
                icon={<ChatBubbleLeftRightIcon className="h-5 w-5" />}
              >
                twitter.com/ibnumusyaffa
              </ContactLink>
              <ContactLink
                href="mailto:ibnu.musyaffa@gmail.com"
                icon={<EnvelopeIcon className="h-5 w-5" />}
              >
                ibnu.musyaffa@gmail.com
              </ContactLink>
              <ContactLink
                href="https://www.linkedin.com/in/ibnumusyaffa/"
                icon={<BriefcaseIcon className="h-5 w-5" />}
              >
                linkedin.com/in/ibnu-musyaffa
              </ContactLink>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
