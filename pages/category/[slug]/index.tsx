import { AppMeta, Content } from "newt-client-js";
import { Home } from "../../../components/Home";
import { fetchApp, fetchArticles, fetchCategories } from "../../../lib/api";
import { Article } from "../../../types/article";
import { Category } from "../../../types/category";

export default function CategoryPage(options: {
  app: AppMeta;
  categories: (Content & Category)[];
  articles: (Content & Article)[];
  total: number;
  categorySlug: string;
}) {
  return <Home {...options} />;
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const app = await fetchApp();
  const categories = await fetchCategories();

  const category = categories.find((_category) => _category.slug === slug);
  const { articles, total } = category
    ? await fetchArticles({
        category: category._id,
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
  return {
    paths: categories.map((category) => ({
      params: {
        slug: category.slug,
      },
    })),
    fallback: "blocking",
  };
}
