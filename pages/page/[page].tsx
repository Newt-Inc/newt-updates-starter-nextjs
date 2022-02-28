import { AppMeta, Content } from "newt-client-js";
import { Home } from "../../components/Home";
import {
  fetchApp,
  fetchArticles,
  fetchCategories,
  getPages,
} from "../../lib/api";
import { Article } from "../../types/article";
import { Category } from "../../types/category";

export default function TopPage(options: {
  app: AppMeta;
  categories: (Content & Category)[];
  articles: (Content & Article)[];
  total: number;
}) {
  return <Home {...options} />;
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const page = Number(params.page) || 1;
  const app = await fetchApp();
  const categories = await fetchCategories();
  const { articles, total } = await fetchArticles({
    page,
  });
  return {
    props: {
      app,
      categories,
      articles,
      total,
      page,
    },
  };
}

export async function getStaticPaths() {
  const pages = await getPages();
  return {
    paths: pages.map((page) => ({
      params: {
        page: page.number.toString(),
      },
    })),
    fallback: "blocking",
  };
}
