import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// @ts-expect-error
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { mdWrapper } from "./MarkdownWrapper.css";

export default function Markdown(props) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      rehypePlugins={[rehypeRaw]}
      className={mdWrapper}
      components={{
        code: CodeBlock,
      }}
    >
      {props.content}
    </ReactMarkdown>
  );
}

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, "")}
      style={nightOwl}
      language={match[1]}
      PreTag="div"
      className={className}
      customStyle={{
        borderRadius: 10,
      }}
      {...props}
    />
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
