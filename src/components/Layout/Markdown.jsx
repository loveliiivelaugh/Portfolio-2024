
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { TextGenerateEffect } from '../theme/TextGenerateEffect'
// import { TypewriterEffect } from '../theme/TypeWriterEffect'

const MarkdownWrapper = ({ children, isLastElement = false }) => {
    return (
        <Markdown
            children={children}
            remarkPlugins={[remarkMath]} 
            rehypePlugins={[rehypeKatex]}
            components={{
                code(props) {
                    const {children, className, node, ...rest} = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                    <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        language={match[1]}
                        style={dark}
                    />
                    ) : (
                    <code {...rest} className={className}>
                        {children}
                    </code>
                    )
                },
                img: (props) => <LazyLoadImage {...props} effect="blur" />,
                // ...isLastElement && {
                //     p: (props) => <TextGenerateEffect words={props.children} />
                // }
                // p: (props) => <TypewriterEffect words={props.children.split(' ')} />,
            }}
        />
    )
}

export default MarkdownWrapper