import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Articles | Omar AlBeshr',
  description: 'Articles by Omar AlBeshr published in Sail Magazine, covering language, science, psychology, and culture.',
};

const articles = [
  {
    title: 'Chaos Systems and Predictions – Can We Alter The Future?',
    url: 'https://sailemagazine.com/2020/10/chaos-systems-and-predictions-can-we-alter-the-future/',
    date: '2020-10-19',
    categories: ['COVID-19', 'Science'],
    excerpt: 'An explanation of Chaos Systems Levels and how they relate to our current situation with Covid-19.',
  },
  {
    title: 'The History of Messages',
    url: 'https://sailemagazine.com/2017/05/the-history-of-messages/',
    date: '2017-05-22',
    categories: ['History', 'Social Media', 'Technology'],
    excerpt: 'Exploring telecommunications evolution and the progression to modern messaging systems.',
  },
  {
    title: 'The Story Behind Guinness Book of Records',
    url: 'https://sailemagazine.com/2016/09/the-story-behind-guinness-book-of-records/',
    date: '2016-09-20',
    categories: ['Books'],
    excerpt: 'The origins of the Guinness Book of Records and what motivates record-breaking.',
  },
  {
    title: "What's My Name? #MuhammadAli",
    url: 'https://sailemagazine.com/2016/07/whats-my-name/',
    date: '2016-07-19',
    categories: ['Psychology'],
    excerpt: "Muhammad Ali's name change and its significance for identity.",
  },
  {
    title: "What's In It For Me (WII FM)",
    url: 'https://sailemagazine.com/2016/06/whats-in-it-for-me-wii-fm/',
    date: '2016-06-26',
    categories: ['Inspirational', 'Work Life'],
    excerpt: 'A practical business concept applicable to everyday decision-making.',
  },
  {
    title: 'Game of Tongues (#GameOfThrones)',
    url: 'https://sailemagazine.com/2016/04/game-of-tongues-gameofthrones/',
    date: '2016-04-24',
    categories: ['Books', 'Film & TV'],
    excerpt: 'Constructed languages used in film and television production.',
  },
  {
    title: 'Multilingualism: A Means to A More Fruitful Life',
    url: 'https://sailemagazine.com/2016/02/language-a-tool-for-better-living-decisions-and-happiness/',
    date: '2016-02-16',
    categories: ['Language', 'Psychology'],
    excerpt: 'How multilingual ability can shift perspectives and present-moment awareness.',
  },
  {
    title: 'Your Language Shapes The World Around You',
    url: 'https://sailemagazine.com/2016/01/your-language-shapes-the-world-around-you/',
    date: '2016-01-07',
    categories: ['Language', 'Psychology'],
    excerpt: 'How language functions beyond communication as a lens for perception.',
  },
  {
    title: 'The Evolution of Languages',
    url: 'https://sailemagazine.com/2015/12/language-and-the-perpetual-winds-of-change/',
    date: '2015-12-27',
    categories: ['Language'],
    excerpt: 'How languages must adapt to survive cultural and temporal change.',
  },
  {
    title: 'Breaking the 4th Wall On Screen & Theatre',
    url: 'https://sailemagazine.com/2015/11/breaking-the-4th-wall/',
    date: '2015-11-09',
    categories: ['Film & TV'],
    excerpt: 'Meta-storytelling techniques used across theatrical and cinematic mediums.',
  },
  {
    title: 'You Are The Butterfly Effect',
    url: 'https://sailemagazine.com/2015/10/the-butterfly-effect/',
    date: '2015-10-11',
    categories: ['Film & TV', 'Mindfulness', 'Science'],
    excerpt: 'How seemingly minor actions can generate disproportionately significant outcomes.',
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl text-omar-oud mb-6">
          Articles
        </h1>
        <p className="text-lg md:text-xl text-omar-muted max-w-2xl mx-auto">
          Published writing on language, science, psychology, and culture in{' '}
          <a
            href="https://sailemagazine.com/author/omar-albeshr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-omar-sand hover:text-omar-oud transition-colors underline"
          >
            Sail Magazine
          </a>
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-8">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group p-6 rounded-lg border border-omar-muted/20 hover:border-omar-sand/50 hover:shadow-md transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <h2 className="font-heading text-xl md:text-2xl text-omar-oud group-hover:text-omar-sand transition-colors">
                {article.title}
              </h2>
              <time
                dateTime={article.date}
                className="text-sm text-omar-muted whitespace-nowrap"
              >
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <p className="text-omar-charcoal leading-relaxed mb-3">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {article.categories.map((cat) => (
                <span
                  key={cat}
                  className="text-xs px-2.5 py-1 bg-omar-sand/10 text-omar-sand rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
