import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl as style } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { hexToRgb } from "./utils";

const MarkdownWrapper = styled(ReactMarkdown)`
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  blockquote,
  li {
    word-break: break-word;
    hyphens: auto;
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }
  h4 {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
  h2,
  h3,
  h4 {
    font-family: ${({ theme }) => theme.fonts.serif};
    line-height: 1.25;
    margin: 1.5em 0 0.5em;
  }

  p,
  figure,
  ul,
  ol {
    margin-bottom: 1.25em;
  }

  h3 {
    font-weight: 700;
  }

  li {
    list-style: none;
    margin-bottom: 0.5em;
  }

  ul,
  ol {
    padding-left: 3em;
    counter-reset: listCounter;
    li {
      &::before {
        color: ${({ theme }) => theme.colors.accent};
        position: absolute;
      }
      counter-increment: listCounter;
      position: relative;
    }
  }

  ol li {
    list-style: none;
    &::before {
      content: counter(listCounter, decimal-leading-zero);
      left: -1.5rem;
      top: 0.25rem;
      font-size: 0.8rem;
      font-weight: bold;
      position: absolute;
    }
  }

  ul li::before {
    content: counter(listCounter, disc);
    left: -1.25em;
    font-weight: bold;
  }

  hr {
    margin: 3em 0;
    border-top: ${({ theme }) => `1px solid ${theme.colors.grays[0]}`};
  }

  blockquote {
    color: ${({ theme }) => theme.colors.grays[1]};
    font-size: ${({ theme }) => theme.fontSizes[2]};
    position: relative;
    margin: 2em 0;
    &::before {
      content: "";
      height: 120%;
      width: 2em;
      background-color: #017acc40;
      position: absolute;
      left: -0.75em;
      transform: matrix(1, 1, 0, -1, -8, -17);
    }
  }

  p,
  li {
    > code.language-text {
      background-color: ${({ theme }) =>
        `rgba(${hexToRgb(theme.colors.accent)}, 0.1)`};
      color: ${({ theme }) => theme.colors.accent};
      font-family: "Consolas", "Courier Prime", menlo, monospace;
      padding: 0 0.2rem;
    }
  }

  pre,
  iframe,
  figure,
  img {
    margin-bottom: 1.25rem;
  }

  img {
    box-shadow: 0px 2px 10px 2px ${({ theme }) => theme.colors.grays[0]};
  }

  figure {
    text-align: center;
    figcaption {
      margin-top: 1.25rem;
      color: ${({ theme }) => theme.colors.grays[1]};
      font-size: ${({ theme }) => theme.fontSizes[0]};
    }
  }
  
  pre {
    // Overriding the style tag
    padding: 1.5rem !important;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    border-radius: 10px;
    font-size: ${({theme}) => theme.fontSizes[0]};
  }
`;

export default function Markdown(props) {
  return (
    <MarkdownWrapper allowDangerousHtml renderers={{ code: CodeBlock }}>
      {props.content}
    </MarkdownWrapper>
  );
}

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={language} style={style}>
      {value}
    </SyntaxHighlighter>
  );
};
