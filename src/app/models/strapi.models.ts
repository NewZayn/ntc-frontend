export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  } | null;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface Notice {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: StrapiBlock[];
  featuredImage: StrapiImage | null;
  publishedDate: string;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Strapi Blocks types
export type StrapiBlock =
  | StrapiParagraphBlock
  | StrapiHeadingBlock
  | StrapiListBlock
  | StrapiImageBlock
  | StrapiQuoteBlock
  | StrapiCodeBlock;

export interface StrapiTextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface StrapiLinkNode {
  type: 'link';
  url: string;
  children: StrapiTextNode[];
}

export type StrapiInlineNode = StrapiTextNode | StrapiLinkNode;

export interface StrapiParagraphBlock {
  type: 'paragraph';
  children: StrapiInlineNode[];
}

export interface StrapiHeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiInlineNode[];
}

export interface StrapiListBlock {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: StrapiListItemBlock[];
}

export interface StrapiListItemBlock {
  type: 'list-item';
  children: StrapiInlineNode[];
}

export interface StrapiImageBlock {
  type: 'image';
  image: {
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  };
}

export interface StrapiQuoteBlock {
  type: 'quote';
  children: StrapiInlineNode[];
}

export interface StrapiCodeBlock {
  type: 'code';
  children: StrapiTextNode[];
}
