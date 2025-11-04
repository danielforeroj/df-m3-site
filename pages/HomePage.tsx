import React from 'react';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Card from '../components/Card';
import LogoSlider from '../components/LogoSlider';
import { NavLink } from 'react-router-dom';
import { posts } from '../data/mockData';
import { PostType, HomePageData } from '../types';

interface HomePageProps {
  data: HomePageData;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const { profileRoles, logos, aboutCard1, aboutCard2, socialLinks, heroButton1, heroButton2, ventures } = data;

  const blogPosts = posts
    .filter(post => post.type === PostType.BLOG)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center pt-12 md:pt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter" style={{color: 'var(--md-sys-color-primary)'}}>Daniel Forero</h1>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {profileRoles.map((role) => (
            <Chip key={role}>{role}</Chip>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          {heroButton1.enabled && (
            <Button as="a" href={heroButton1.url} variant={heroButton1.variant} icon={heroButton1.icon}>
              {heroButton1.text}
            </Button>
          )}
          {heroButton2.enabled && (
            <Button as="a" href={heroButton2.url} variant={heroButton2.variant} icon={heroButton2.icon}>
              {heroButton2.text}
            </Button>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 md:p-8">
            <h2 className="text-3xl font-bold tracking-tight" style={{color: 'var(--md-sys-color-on-surface)'}}>{aboutCard1.title}</h2>
            <p className="mt-4 text-lg" style={{color: 'var(--md-sys-color-on-surface)'}}>
              {aboutCard1.subtitle}
            </p>
            <p className="mt-4" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
              {aboutCard1.text}
            </p>
        </Card>
        <Card className="p-6 md:p-8 flex flex-col justify-between">
            <div>
                <h3 className="text-2xl font-bold tracking-tight" style={{color: 'var(--md-sys-color-on-surface)'}}>{aboutCard2.title}</h3>
                <p className="mt-4" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
                    {aboutCard2.subtitle}
                </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {profileRoles.map(role => <Chip key={role}>{role}</Chip>)}
            </div>
        </Card>
      </section>

      {/* Social Channels Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">My Official SM Channels</h2>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {socialLinks.map(link => (
             <Button key={link.id} as="a" href={link.url} target="_blank" rel="noopener noreferrer" variant="filled-to-ghost">{link.name}</Button>
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

      {/* Logo Slider Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center">Worked With</h2>
        <div className="mt-8">
            <LogoSlider logos={logos} />
        </div>
      </section>

      {/* Ventures Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center">What I’m Running</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {ventures.map((venture) => (
            <Card key={venture.id} className="flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold" style={{color: 'var(--md-sys-color-on-surface)'}}>{venture.title}</h3>
                <p className="mt-2 text-sm">{venture.description}</p>
              </div>
              <div className="p-6 pt-0">
                <Button as="a" href={venture.url} target="_blank" rel="noopener noreferrer" variant="ghost">{venture.cta}</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

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