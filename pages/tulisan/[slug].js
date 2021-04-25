import * as React from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import path from "path";
const { readdir, readFile, lstat, access } = fs.promises;
import Layout from "../../components/Layout";
import Code from "../../components/Code";

export default function Post({ code, frontmatter }) {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <Layout>
      <div>
        <div className="mb-5">
          <h1 className="text-3xl font-semibold">{frontmatter.title}</h1>
          <div className="mt-2 text-gray-700">{frontmatter.description}</div>
        </div>

        <div className="prose  max-w-none">
          <Component components={{ code: Code }} />
        </div>
      </div>
    </Layout>
  );
}

async function getComponents(directory) {
  const files = await readdir(directory);
  let components = {};

  for (const file of files) {
    if (file.substr(-3) === "tsx" || file.substr(-3) === "jsx") {
      const fileBuffer = await readFile(path.join(directory, file));
      components[`./${file}`] = fileBuffer.toString().trim();
    }
  }

  return components;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function getStaticProps({ params }) {
  let slug = params.slug;
  const POSTS_PATH = path.join(process.cwd(), "posts");
  let isExist = await exists(path.join(POSTS_PATH, `${slug}.mdx`));
  if (isExist) {
    let postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const mdxSource = await readFile(postFilePath);

    const result = await bundleMDX(mdxSource, {
      files: {},
    });
    const { code, frontmatter } = result;

    return {
      props: {
        code,
        frontmatter: {
          ...frontmatter,
          date: "2020",
        },
      },
    };
  } else {
    let postFilePath = path.join(POSTS_PATH, `${slug}`, "index.mdx");
    const mdxSource = await readFile(postFilePath);

    const components = await getComponents(
      path.join(POSTS_PATH, `${params.slug}`)
    );
    const result = await bundleMDX(mdxSource, {
      files: components,
    });
    const { code, frontmatter } = result;

    return {
      props: {
        code,
        frontmatter: {
          ...frontmatter,
          date: "2020",
        },
      },
    };
  }
}

export async function getStaticPaths() {
  const POSTS_PATH = path.join(process.cwd(), "posts");
  const slugs = await readdir(POSTS_PATH);

  let paths = [];
  for (const slug of slugs) {
    const stat = await lstat(path.join(process.cwd(), "posts", slug));

    if (stat.isFile()) {
      paths.push({
        params: {
          slug: slug.replace(/\.mdx?$/, ""),
        },
      });
    } else {
      paths.push({
        params: {
          slug,
        },
      });
    }
  }

  return {
    paths,
    fallback: false,
  };
}