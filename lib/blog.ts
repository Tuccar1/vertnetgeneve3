import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  author: string
  category: string
  tags: string[]
  image?: string
  readingTime?: number
}

export function getBlogPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => {
        try {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          return {
            slug,
            title: data.title || '',
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            content,
            author: data.author || 'Vertnetgeneve',
            category: data.category || 'Général',
            tags: data.tags || [],
            image: data.image,
            readingTime: Math.ceil(content.split(' ').length / 200),
          } as BlogPost
        } catch (error) {
          return null
        }
      })
      .filter((post): post is BlogPost => post !== null)

    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    return []
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return null
    }

    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = remark().use(html).processSync(content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: data.title || '',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      content: contentHtml,
      author: data.author || 'Vertnetgeneve',
      category: data.category || 'Général',
      tags: data.tags || [],
      image: data.image,
      readingTime: Math.ceil(content.split(' ').length / 200),
    }
  } catch (error) {
    return null
  }
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getBlogPosts().filter((post) => post.category === category)
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getBlogPosts().filter((post) => post.tags.includes(tag))
}

