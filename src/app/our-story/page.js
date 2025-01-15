import { getMarkdownPage } from '@/utils/get-markdown';
import { notFound } from 'next/navigation';
import MarkdownLayout from '@/components/MarkdownWrapper';


export default async function Post({ params }) {

  const page = getMarkdownPage({
    title: 'our-story',
  });
  if (!page) {
    notFound();
    return;
  }

  return (
    <MarkdownLayout title={page.title} meta={page.date}>
      {page.content}
    </MarkdownLayout>
  );
}
