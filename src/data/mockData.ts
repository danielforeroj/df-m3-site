import { Post, PostType, HomeContent } from '../types';

export const initialHomeContent: HomeContent = {
  hero_title: "Daniel Forero",
  hero_tags: ["Father", "Husband", "Marketer", "Angel Investor", "Nerd", "Crypto Degen"],
  logos: [
    { name: 'Google', logoUrl: 'https://cdn.svgporn.com/logos/google.svg' },
    { name: 'Apple', logoUrl: 'https://cdn.svgporn.com/logos/apple.svg' },
    { name: 'Solana', logoUrl: 'https://cdn.svgporn.com/logos/solana.svg' },
    { name: 'Immutable', logoUrl: 'https://cdn.svgporn.com/logos/immutable.svg' },
    { name: 'Rarible', logoUrl: 'https://cdn.svgporn.com/logos/rarible.svg' },
    { name: 'Aptos', logoUrl: 'https://cdn.svgporn.com/logos/aptos.svg' },
    { name: 'Chevron', logoUrl: 'https://cdn.svgporn.com/logos/chevron.svg' },
    { name: 'T-Mobile', logoUrl: 'https://cdn.svgporn.com/logos/t-mobile.svg' },
    { name: 'Auth0', logoUrl: 'https://cdn.svgporn.com/logos/auth0.svg' },
    { name: 'Cloudflare', logoUrl: 'https://cdn.svgporn.com/logos/cloudflare.svg' },
    { name: 'Stripe', logoUrl: 'https://cdn.svgporn.com/logos/stripe.svg' },
    { name: 'Twilio', logoUrl: 'https://cdn.svgporn.com/logos/twilio.svg' },
    { name: 'OpenAI', logoUrl: 'https://cdn.svgporn.com/logos/openai.svg' },
    { name: 'Vercel', logoUrl: 'https://cdn.svgporn.com/logos/vercel.svg' },
  ],
  about: {
    title: "Who’s this guy?",
    body: "I turn Web3 ideas into real-world businesses—and then make sure the world hears about them.\n\nOver the past decade I’ve launched ventures that tokenize real-estate, push millions in stablecoin flows across borders, and crack open new revenue models for everyday users. My growth playbook has powered mainstream traction for global brands, generated nine-figure TVL, and even put blockchain on the pop-culture stage with headline NFT drops for Quentin Tarantino, Doja Cat, and Jennifer Esposito."
  },
  operator: {
    title: "Operator ➜ Angel Investor",
    body: "Alongside my operating roles, I back founders who are reinventing finance, identity, and ownership—then jump in as a hands-on advisor to turn theory into traction. If you’re raising and fit that bill, let’s talk.\n\nI'm looking for relentless founders with a clear vision and the grit to execute."
  },
  socials: [
    { name: 'Instagram', url: 'https://www.instagram.com/danielforeroj/' },
    { name: 'X', url: 'https://www.x.com/danielforeroj/' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/' },
    { name: 'Telegram', url: 'https://t.me/danielforeroj/' },
  ],
  hero_buttons: [
    { label: 'Get in touch', url: 'mailto:hello@danielforeroj.com'},
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/'},
  ],
  ventures: [
    {
      title: "GTM Mentor at Outlier Ventures",
      body: "Advising the next generation of Web3 founders on go-to-market strategy, product positioning, and narrative development within the Outlier Ventures accelerator program.",
      ctaLabel: "Learn More About Outlier Ventures",
      ctaUrl: "https://outlierventures.io"
    },
    {
      title: "Managing Partner at Multiplied (DMC)",
      body: "The marketing & PR agency behind headline-grabbing launches for protocols and brands alike, including Solana’s wormhole, Immutable X, Quentin Tarantino’s NFT, among many others.",
      ctaLabel: "Learn More About Multiplied (DMC)",
      ctaUrl: "https://multipliedhq.com"
    },
    {
      title: "Partner at SpaceDev",
      body: "The second largest DevShop in LATAM. Worked with Aptos, Rarible, Apple, Google, Chevron, Blockus, etc.",
      ctaLabel: "Learn More About SpaceDev",
      ctaUrl: "https://spacedev.io"
    },
    {
      title: "Partner at Capa",
      body: "Leveraging stablecoin infrastructure to move money across LATAM with zero FX drag. Raised USD$3M in pre-seed.",
      ctaLabel: "Learn More About Capa",
      ctaUrl: "https://capa.fi"
    }
  ]
};


export const posts: Post[] = [
  {
    type: PostType.BLOG,
    title: 'The Playbook for Launching Web3 Ventures',
    slug: 'web3-launch-playbook',
    date: '2023-10-26T10:00:00Z',
    excerpt: 'A deep dive into the strategies that power mainstream traction for global brands and generate nine-figure TVL.',
    content_md: `
Over the past decade I’ve launched ventures that tokenize real-estate, push millions in stablecoin flows across borders, and crack open new revenue models for everyday users. My growth playbook has powered mainstream traction for global brands, generated nine-figure TVL, and even put blockchain on the pop-culture stage with headline NFT drops for Quentin Tarantino, Doja Cat, and Jennifer Esposito.

This isn't just theory. This is a battle-tested framework for turning ambitious Web3 ideas into market-defining businesses. In this post, we'll break down the key pillars:
1.  Product-Market Fit in a Decentralized World
2.  Community as your #1 Growth Engine
3.  Narrative Crafting and Media Dominance
4.  Tokenomics that Align Incentives
    `,
    tags: ['web3', 'growth', 'marketing', 'startups'],
  },
  {
    type: PostType.LEAD_MAGNET,
    title: 'The Ultimate Guide to Stablecoin Arbitrage in LATAM',
    slug: 'latam-stablecoin-guide',
    date: '2023-08-01T18:00:00Z',
    excerpt: 'Download our exclusive guide on leveraging stablecoin infrastructure to move money across LATAM with zero FX drag.',
    content_md: `
Cross-border payments in Latin America are plagued by high fees, slow settlement times, and crippling currency devaluation. Stablecoins offer a revolutionary alternative.

This guide provides a step-by-step walkthrough for businesses and individuals looking to leverage this technology. You will learn:
- The fundamentals of USD-pegged stablecoins.
- On-ramp and off-ramp strategies in major LATAM markets.
- How to execute arbitrage opportunities between local exchanges.
- Compliance and regulatory considerations.

At Capa, we've built the infrastructure to make this seamless. This guide gives you the knowledge to get started.
    `,
    tags: ['stablecoins', 'latam', 'finance', 'fintech'],
    lead_magnet: {
      file: 'content/uploads/guide.pdf',
      cta: 'Download PDF Guide',
      requires_email: false,
    },
  },
  {
    type: PostType.BLOG,
    title: 'From Operator to Angel Investor: My Thesis',
    slug: 'operator-to-angel',
    date: '2023-07-20T11:00:00Z',
    excerpt: 'Why I back founders who are reinventing finance, identity, and ownership, and how I help them turn theory into traction.',
    content_md: `
After years in the trenches building companies, I've learned that the most valuable capital isn't just money—it's experience. That's the core of my angel investment thesis. I back founders who are tackling massive, systemic problems in finance, identity, and ownership.

But I don't just write a check. I jump in as a hands-on advisor. I help with:
- Go-to-market strategy
- Product feedback and roadmap
- Key hires and team building
- Opening my network for partnerships and fundraising

If you’re raising and fit that bill, let’s talk. I'm looking for relentless founders with a clear vision and the grit to execute.
    `,
    tags: ['investing', 'angel', 'vcs', 'startups'],
  }
];