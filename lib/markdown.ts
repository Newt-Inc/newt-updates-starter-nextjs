import MarkdownIt from "markdown-it";
import plainText from "markdown-it-plain-text";

const md = new MarkdownIt({
  html: true,
  breaks: true,
});
md.use(plainText);

export const renderToHtml = (markdown: string) => {
  return md.render(markdown);
};

export const renderToPlainText = (markdown: string) => {
  md.render(markdown);
  return (md as MarkdownIt & { plainText: string }).plainText;
};
