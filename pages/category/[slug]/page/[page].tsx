import { AppMeta, Content } from "newt-client-js";
import { Home } from "../../../../components/Home";
import {
  fetchApp,
  fetchArticles,
  fetchCategories,
  getPages,
} from "../../../../lib/api";
import { Article } from "../../../../types/article";
import { Category } from "../../../../types/category";

export default function CategoryPage(options: {
  app: AppMeta;
  categories: (Content & Category)[];
  articles: (Content & Article)[];
  total: number;
  categorySlug: string;
}) {
  return <Home {...options} />;
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string; page: string };
}) {
  const { slug, page } = params;
  const app = await fetchApp();
  const categories = await fetchCategories();

  const category = categories.find((_category) => _category.slug === slug);
  const { articles, total } = category
    ? await fetchArticles({
        category: category._id,
        page: Number(page) || 1,
      })
    : { articles: [], total: 0 };
  return {
    props: {
      app,
      categories,
      articles,
      total,
      categorySlug: slug,
    },
  };
}

export async function getStaticPaths() {
  const categories = await fetchCategories();
  const paths: { params: { slug: string; page: string } }[] = [];
  await categories.reduce(async (prevPromise, category) => {
    await prevPromise;
    const pages = await getPages({
      category: category._id,
    });
    pages.forEach((page) => {
      paths.push({
        params: {
          slug: category.slug,
          page: page.number.toString(),
        },
      });
    });
  }, Promise.resolve());

  return {
    paths,
    fallback: "blocking",
  };
}
