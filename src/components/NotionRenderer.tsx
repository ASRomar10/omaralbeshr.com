import Image from 'next/image';
import { Fragment } from 'react';

// Notion block types from the API
type NotionBlock = {
  id: string;
  type: string;
  has_children: boolean;
  [key: string]: any;
};

type RichText = {
  type: string;
  text?: {
    content: string;
    link?: { url: string } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href?: string | null;
};

interface NotionRendererProps {
  blocks: NotionBlock[];
}

// Render rich text with formatting
function RichTextRenderer({ richText }: { richText: RichText[] }) {
  if (!richText || richText.length === 0) return null;

  return (
    <>
      {richText.map((text, index) => {
        const { annotations, plain_text } = text;
        let content = plain_text;

        // Build className for text styling
        const textClasses: string[] = [];
        if (annotations.bold) textClasses.push('font-semibold');
        if (annotations.italic) textClasses.push('italic');
        if (annotations.strikethrough) textClasses.push('line-through');
        if (annotations.code) {
          textClasses.push('bg-omar-oud/10 text-omar-oud px-1.5 py-0.5 rounded text-sm font-mono');
        }

        // Handle text color
        if (annotations.color && annotations.color !== 'default') {
          const colorMap: Record<string, string> = {
            gray: 'text-omar-muted',
            brown: 'text-omar-oud',
            orange: 'text-omar-sand',
            yellow: 'text-yellow-600',
            green: 'text-green-600',
            blue: 'text-blue-600',
            purple: 'text-purple-600',
            pink: 'text-pink-600',
            red: 'text-red-600',
          };
          const colorClass = colorMap[annotations.color] || 'text-omar-charcoal';
          textClasses.push(colorClass);
        }

        const className = textClasses.join(' ');

        // Handle links
        const link = text.text?.link?.url || text.href;
        if (link) {
          return (
            <a
              key={index}
              href={link}
              className={`${className} text-omar-sand hover:text-omar-oud underline transition-colors`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        // Handle inline code separately
        if (annotations.code) {
          return (
            <code key={index} className={className}>
              {content}
            </code>
          );
        }

        // Regular text with styling
        return className ? (
          <span key={index} className={className}>
            {content}
          </span>
        ) : (
          <Fragment key={index}>{content}</Fragment>
        );
      })}
    </>
  );
}

// Main NotionRenderer component
export default function NotionRenderer({ blocks }: NotionRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="notion-content space-y-4">
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}

function renderBlock(block: NotionBlock): JSX.Element | null {
  const { type, id } = block;

  switch (type) {
    case 'paragraph': {
      const richText = block.paragraph?.rich_text || [];
      if (richText.length === 0) {
        return <div key={id} className="h-4" />; // Empty paragraph = spacing
      }
      return (
        <p key={id} className="text-omar-charcoal leading-relaxed">
          <RichTextRenderer richText={richText} />
        </p>
      );
    }

    case 'heading_1': {
      const richText = block.heading_1?.rich_text || [];
      return (
        <h1 key={id} className="font-heading text-4xl font-bold text-omar-oud mt-8 mb-4">
          <RichTextRenderer richText={richText} />
        </h1>
      );
    }

    case 'heading_2': {
      const richText = block.heading_2?.rich_text || [];
      return (
        <h2 key={id} className="font-heading text-3xl font-bold text-omar-oud mt-6 mb-3">
          <RichTextRenderer richText={richText} />
        </h2>
      );
    }

    case 'heading_3': {
      const richText = block.heading_3?.rich_text || [];
      return (
        <h3 key={id} className="font-heading text-2xl font-bold text-omar-oud mt-5 mb-2">
          <RichTextRenderer richText={richText} />
        </h3>
      );
    }

    case 'bulleted_list_item': {
      const richText = block.bulleted_list_item?.rich_text || [];
      return (
        <li key={id} className="ml-6 list-disc text-omar-charcoal leading-relaxed marker:text-omar-sand">
          <RichTextRenderer richText={richText} />
          {block.has_children && block.children && (
            <ul className="mt-2 space-y-2">
              {block.children.map((child: NotionBlock) => renderBlock(child))}
            </ul>
          )}
        </li>
      );
    }

    case 'numbered_list_item': {
      const richText = block.numbered_list_item?.rich_text || [];
      return (
        <li key={id} className="ml-6 list-decimal text-omar-charcoal leading-relaxed marker:text-omar-sand marker:font-semibold">
          <RichTextRenderer richText={richText} />
          {block.has_children && block.children && (
            <ol className="mt-2 space-y-2">
              {block.children.map((child: NotionBlock) => renderBlock(child))}
            </ol>
          )}
        </li>
      );
    }

    case 'quote': {
      const richText = block.quote?.rich_text || [];
      return (
        <blockquote key={id} className="border-l-4 border-omar-sand pl-6 py-2 italic text-omar-oud bg-omar-bg">
          <RichTextRenderer richText={richText} />
        </blockquote>
      );
    }

    case 'code': {
      const richText = block.code?.rich_text || [];
      const language = block.code?.language || 'plain text';
      const code = richText.map((t: RichText) => t.plain_text).join('');
      return (
        <div key={id} className="my-4">
          <div className="bg-omar-oud text-omar-bg px-3 py-1.5 text-xs font-mono rounded-t-md">
            {language}
          </div>
          <pre className="bg-omar-oud/95 text-omar-bg p-4 rounded-b-md overflow-x-auto">
            <code className="font-mono text-sm">{code}</code>
          </pre>
        </div>
      );
    }

    case 'image': {
      const imageData = block.image;
      if (!imageData) return null;

      const imageUrl =
        imageData.type === 'external'
          ? imageData.external?.url
          : imageData.file?.url;

      const caption = imageData.caption?.[0]?.plain_text || '';

      if (!imageUrl) return null;

      return (
        <figure key={id} className="my-6">
          <div className="relative w-full h-96 rounded-lg overflow-hidden bg-omar-muted/10">
            <Image
              src={imageUrl}
              alt={caption || 'Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-omar-muted text-center italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case 'divider': {
      return <hr key={id} className="my-8 border-t border-omar-muted/30" />;
    }

    case 'callout': {
      const richText = block.callout?.rich_text || [];
      const icon = block.callout?.icon;
      const emoji = icon?.type === 'emoji' ? icon.emoji : '💡';

      return (
        <div key={id} className="flex gap-3 p-4 bg-omar-sand/10 border-l-4 border-omar-sand rounded-r-md my-4">
          <span className="text-2xl flex-shrink-0">{emoji}</span>
          <div className="text-omar-charcoal leading-relaxed">
            <RichTextRenderer richText={richText} />
          </div>
        </div>
      );
    }

    case 'toggle': {
      const richText = block.toggle?.rich_text || [];
      // Note: This is a simple implementation. For interactive toggles,
      // you'd need to convert this to a client component with state.
      return (
        <details key={id} className="my-4 group">
          <summary className="cursor-pointer font-semibold text-omar-oud hover:text-omar-sand transition-colors list-none">
            <span className="inline-flex items-center gap-2">
              <span className="transform transition-transform group-open:rotate-90">▶</span>
              <RichTextRenderer richText={richText} />
            </span>
          </summary>
          {block.has_children && block.children && (
            <div className="mt-2 ml-6 space-y-2">
              {block.children.map((child: NotionBlock) => renderBlock(child))}
            </div>
          )}
        </details>
      );
    }

    case 'bookmark': {
      const url = block.bookmark?.url;
      const caption = block.bookmark?.caption?.[0]?.plain_text;
      if (!url) return null;

      return (
        <a
          key={id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block my-4 p-4 border border-omar-muted/30 rounded-lg hover:border-omar-sand hover:bg-omar-sand/5 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="text-omar-sand">🔗</span>
            <span className="text-omar-oud font-medium">{caption || url}</span>
          </div>
          <div className="text-sm text-omar-muted mt-1 truncate">{url}</div>
        </a>
      );
    }

    default:
      // Log unsupported block types in development
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Unsupported block type: ${type}`);
      }
      return null;
  }
}
