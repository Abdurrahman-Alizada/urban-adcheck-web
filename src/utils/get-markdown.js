import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { headers } from 'next/headers';



export function getMarkdownPage({ title = 'not-found' }) {
  
  const requestHeaders = headers();
  const host = requestHeaders.get('host') || '';


  const postsDirectory = path.join(process.cwd(), `src/markdown`);
  
  try {
    // Read all files in the jurisdiction directory
    const fileNames = fs.readdirSync(postsDirectory);

    // Find the file with the matching title
    const fileName = fileNames.find((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return slug === title;
    });

    // If no matching file is found, fallback to "not-found.md"
    const targetFile = fileName || 'not-found.md';
    const filePath = path.join(postsDirectory, targetFile);

    // Read the file content
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: targetFile.replace(/\.md$/, ''),
      ...data,
      content,
    };
  } catch (error) {
    console.error('Error fetching markdown page:', error);
    return {
      slug: 'not-found',
      title: 'Page Not Found',
      content: 'The page you are looking for does not exist.',
    };
  }
}
