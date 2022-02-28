import { AppMeta, Content } from "newt-client-js";
import { fetchApp, fetchArticles, fetchCategories } from "../lib/api";
import { Category } from "../types/category";
import { Article } from "../types/article";
import { Home } from "../components/Home";

export default function TopPage(options: {
  app: AppMeta;
  categories: (Content & Category)[];
  articles: (Content & Article)[];
  total: number;
}) {
  return <Home {...options} />;
}

export async function getStaticProps() {
  const app = await fetchApp();
  const categories = await fetchCategories();
  const { articles, total } = await fetchArticles();
  return {
    props: {
      app,
      categories,
      articles,
      total,
    },
  };
}
