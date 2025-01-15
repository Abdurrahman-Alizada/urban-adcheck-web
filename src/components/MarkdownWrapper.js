import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';

export default function MarkdownLayout({ children, title, meta }) {


    return (
        <div className={`min-h-screen bg-gray-50 `}>
            <div className="container mx-auto py-6 max-w-4xl">
                <header className="mb-8">

                    <h1 className="text-4xl font-bold text-gray-800 ">{title}</h1>
                    {meta && (
                        <p className="text-sm text-gray-500  mt-2">{meta}</p>
                    )}
                    <hr className="mt-4 border-gray-300 " />
                </header>
                <main className="prose lg:prose-lg ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSlug,]}
                    >
                        {children}
                    </ReactMarkdown>
                </main>

            </div>
        </div>
    );
}
