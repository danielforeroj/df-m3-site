import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Card from '../components/Card';
import { NavLink } from 'react-router-dom';
import { posts, initialHomePageData } from '../data/mockData';
import { PostType } from '../types';
import { HomeContent } from '../lib/cms';

// Helper function to map mock data to the CMS content structure
const mapMockDataToHomeContent = (mockData: any): HomeContent => {
  return {
    hero_title: mockData.heroTitle,
    hero_tags: mockData.profileRoles,
    about: {
      title: mockData.aboutCard1.title,
      body: mockData.aboutCard1.body,
    },
    operator: {
      title: mockData.aboutCard2.title,
      body: mockData.aboutCard2.body,
    },
    socials: mockData.socialLinks.map(({ name, url }: any) => ({ name, url })),
    hero_buttons: [mockData.heroButton1, mockData.heroButton2]
      .filter((b: any) => b.enabled)
      .map((b: any) => ({ label: b.text, url: b.url })),
    ventures: mockData.ventures.map((v: any) => ({
      title: v.title,
      body: v.description,
      ctaLabel: v.cta,
      ctaUrl: v.url,
    })),
    logos: mockData.logos.map((l: any) => ({
      name: l.name,
      logoUrl: l.logo,
    })),
  };
};

const HomePage: React.FC = () => {
  const [content, setContent] = useState<HomeContent | null>(null);

  useEffect(() => {
    // This is the final, correct implementation: loading data from the single source of truth.
    setContent(mapMockDataToHomeContent(initialHomePageData));
  }, []);

  const blogPosts = posts
    .filter(post => post.type === PostType.BLOG)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-12 md:pt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter" style={{color: 'var(--md-sys-color-primary)'}}>
          {content?.hero_title || "Daniel Forero"}
        </h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {(content?.hero_tags || []).map((role) => (
            <Chip key={role}>{role}</Chip>
          ))}
        </div>
        {content?.hero_buttons && content.hero_buttons.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.hero_buttons.map((button, index) => (
              <Button key={index} as="a" href={button.url} variant={index === 0 ? 'filled-to-ghost' : 'outlined'} target="_blank" rel="noopener noreferrer">
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 md:p-8">
            <h2 className="text-3xl font-bold tracking-tight" style={{color: 'var(--md-sys-color-on-surface)'}}>
              {content?.about?.title || "Who’s this guy?"}
            </h2>
            <p className="mt-4 whitespace-pre-line" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
              {content?.about?.body || "Loading..."}
            </p>
        </Card>
        <Card className="p-6 md:p-8 flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-bold tracking-tight" style={{color: 'var(--md-sys-color-on-surface)'}}>
                  {content?.operator?.title || "Operator ➜ Angel Investor"}
                </h3>
                <p className="mt-4 whitespace-pre-line" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
                    {content?.operator?.body || "Loading..."}
                </p>
            </div>
            {(content?.hero_tags && content.hero_tags.length > 0) && (
              <div className="mt-6 flex flex-wrap gap-2">
                {content.hero_tags.map(role => <Chip key={role}>{role}</Chip>)}
              </div>
            )}
        </Card>
      </section>

      {/* Social Channels Section */}
      {content?.socials && content.socials.length > 0 && (
        <section className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">My Official SM Channels</h2>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.socials.map(link => (
              <Button key={link.name} as="a" href={link.url} target="_blank" rel="noopener noreferrer" variant="filled-to-ghost">{link.name}</Button>
            ))}
          </div>
          <div 
              className="mt-6 max-w-2xl mx-auto p-4 rounded-2xl inline-flex items-center gap-3"
              style={{ backgroundColor: 'var(--md-sys-color-tertiary-container)', color: 'var(--md-sys-color-on-tertiary-container)'}}
          >
            <span className="material-symbols-outlined">warning</span>
            <p className="font-medium text-sm">Watch out for scammers</p>
          </div>
        </section>
      )}

      {/* Ventures Section */}
      {content?.ventures && content.ventures.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold tracking-tight text-center">What I’m Running</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.ventures.map((venture, index) => (
              <Card key={index} className="flex flex-col">
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold" style={{color: 'var(--md-sys-color-on-surface)'}}>{venture.title}</h3>
                  {venture.body && <p className="mt-2 text-sm">{venture.body}</p>}
                </div>
                {venture.ctaLabel && venture.ctaUrl && (
                  <div className="p-6 pt-0">
                    <Button as="a" href={venture.ctaUrl} target="_blank" rel="noopener noreferrer" variant="ghost">{venture.ctaLabel}</Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Blog Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center">From the Blog</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
             <NavLink to={`/post/${post.slug}`} key={post.slug} className="block hover:no-underline">
              <Card className="h-full flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex-grow">
                    <h3 className="text-xl font-bold" style={{color: 'var(--md-sys-color-on-surface)'}}>{post.title}</h3>
                    <p className="text-sm mt-1" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
                      {/* FIX: Corrected typo from toLocaleDateDateString to toLocaleDateString. */}
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="mt-4 text-sm">{post.excerpt}</p>
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
        <div className="mt-8 text-center">
            <Button as={NavLink} to="/blog" variant="filled-to-ghost" icon="arrow_forward">See all blog posts</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;