import Head from "next/head";
import {
  EnvelopeIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import ContactLink from "@/components/ContactLink";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Ibnu Musyaffa</title>
        <meta
          name="description"
          content="Tech & Design enthusiast, helping to create a better world for everyone."
        />
      </Head>

      <div className="md:w-[50%] mx-auto bg-white border-2 border-black p-10 min-h-screen">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
            Ibnu Musyaffa
          </p>

          <p className="mb-12 text-gray-600 dark:text-gray-400 leading-relaxed">
            Hi, I am ibnu musyaffa, a software engineer with 10+ years of
            experience. I love to code and build products that help people to
            live better life.
          </p>

          <section>
            <p className="text-2xl font-medium text-gray-900 dark:text-white mb-6">
              Contact
            </p>
            <ul className="space-y-6">
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
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
