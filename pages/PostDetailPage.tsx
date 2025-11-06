import React, { useState, useCallback } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { posts } from '../data/mockData';
import { summarizeText } from '../services/geminiService';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Card from '../components/Card';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = useCallback(async () => {
    if (!post) return;
    setIsLoading(true);
    setError(null);
    setSummary(null);
    try {
      const result = await summarizeText(post.content_md);
      setSummary(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4">The post you are looking for does not exist.</p>
        <NavLink to="/" className="mt-6 inline-block">Go back home</NavLink>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Chip>{post.type.replace('_', ' ')}</Chip>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight" style={{color: 'var(--md-sys-color-primary)'}}>{post.title}</h1>
        <p className="mt-2 text-lg" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>{post.excerpt}</p>
        <p className="mt-4 text-sm" style={{color: 'var(--md-sys-color-outline)'}}>
          Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>
      
      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line" style={{color: 'var(--md-sys-color-on-background)'}}>
        {post.content_md}
      </div>

      {/* FIX: Corrected logic to use post.lead_magnet.file for the download link and condition. */}
      {post.lead_magnet?.file && (
        <div className="mt-12 text-center">
          <Button href={post.lead_magnet.file} as="a" variant="filled" icon="download" download>
            {post.lead_magnet.cta || 'Download'}
          </Button>
        </div>
      )}

      <div className="mt-12 border-t pt-8" style={{borderColor: 'var(--md-sys-color-outline)'}}>
        <h3 className="text-xl font-bold">Summarize with AI</h3>
        <p className="text-sm mt-1 mb-4" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
          Use Gemini to get a quick summary of this content.
        </p>
        <Button onClick={handleSummarize} disabled={isLoading} variant="tonal" icon="auto_awesome">
          {isLoading ? 'Summarizing...' : 'Generate Summary'}
        </Button>

        {error && <p className="mt-4 p-4 rounded-lg" style={{backgroundColor: 'var(--md-sys-color-error-container)', color: 'var(--md-sys-color-on-error-container)'}}>{error}</p>}
        
        {summary && (
          <Card className="mt-4 p-6">
            <h4 className="font-bold text-lg" style={{color: 'var(--md-sys-color-on-surface)'}}>AI Summary:</h4>
            <p className="mt-2 text-base whitespace-pre-line">{summary}</p>
          </Card>
        )}
      </div>
    </article>
  );
};

export default PostDetailPage;
