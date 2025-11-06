import { Post, PostType, HomePageData } from '../types';

export const profileData = {
  roles: ["Father", "Husband", "Marketer", "Angel Investor", "Nerd", "Crypto Degen"],
};

// HOW TO ADD LOGOS:
// To add a logo to the "Worked With" slider, add a new object to this `companyLogos` array.
// - `name`: The name of the company.
// - `logo`: A direct URL to an SVG version of the company's logo.
//   You can find many logos at sites like https://cdn.svgporn.com/
export const companyLogos = [
  { name: 'Google', logo: 'https://cdn.svgporn.com/logos/google.svg' },
  { name: 'Apple', logo: 'https://cdn.svgporn.com/logos/apple.svg' },
  { name: 'Solana', logo: 'https://cdn.svgporn.com/logos/solana.svg' },
  { name: 'Immutable', logo: 'https://cdn.svgporn.com/logos/immutable.svg' },
  { name: 'Rarible', logo: 'https://cdn.svgporn.com/logos/rarible.svg' },
  { name: 'Aptos', logo: 'https://cdn.svgporn.com/logos/aptos.svg' },
  { name: 'Chevron', logo: 'https://cdn.svgporn.com/logos/chevron.svg' },
  { name: 'T-Mobile', logo: 'https://cdn.svgporn.com/logos/t-mobile.svg' },
  { name: 'Auth0', logo: 'https://cdn.svgporn.com/logos/auth0.svg' },
  { name: 'Cloudflare', logo: 'https://cdn.svgporn.com/logos/cloudflare.svg' },
  { name: 'Stripe', logo: 'https://cdn.svgporn.com/logos/stripe.svg' },
  { name: 'Twilio', logo: 'https://cdn.svgporn.com/logos/twilio.svg' },
  { name: 'OpenAI', logo: 'https://cdn.svgporn.com/logos/openai.svg' },
  { name: 'Vercel', logo: 'https://cdn.svgporn.com/logos/vercel.svg' },
];

export const initialHomePageData: HomePageData = {
  heroTitle: "Daniel Forero",
  profileRoles: ["Father", "Husband", "Marketer", "Angel Investor", "Nerd", "Crypto Degen"],
  logos: companyLogos,
  aboutCard1: {
    title: "Who’s this guy?",
    body: "I turn Web3 ideas into real-world businesses—and then make sure the world hears about them.\n\nOver the past decade I’ve launched ventures that tokenize real-estate, push millions in stablecoin flows across borders, and crack open new revenue models for everyday users. My growth playbook has powered mainstream traction for global brands, generated nine-figure TVL, and even put blockchain on the pop-culture stage with headline NFT drops for Quentin Tarantino, Doja Cat, and Jennifer Esposito."
  },
  aboutCard2: {
    title: "Operator ➜ Angel Investor",
    body: "Alongside my operating roles, I back founders who are reinventing finance, identity, and ownership—then jump in as a hands-on advisor to turn theory into traction. If you’re raising and fit that bill, let’s talk.\n\nI'm looking for relentless founders with a clear vision and the grit to execute."
  },
  socialLinks: [
    { id: '1', name: 'Instagram', url: 'https://www.instagram.com/danielforeroj/' },
    { id: '2', name: 'X', url: 'https://www.x.com/danielforeroj/' },
    { id: '3', name: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/' },
    { id: '4', name: 'Telegram', url: 'https://t.me/danielforeroj/' },
  ],
  heroButton1: {
    id: 'hero1',
    text: 'Get in touch',
    url: 'mailto:hello@danielforeroj.com',
    variant: 'filled-to-ghost',
    icon: 'email',
    enabled: true,
  },
  heroButton2: {
    id: 'hero2',
    text: 'LinkedIn',
    url: 'https://www.linkedin.com/in/danielforeroj/',
    variant: 'filled-to-ghost',
    enabled: true,
  },
  // FIX: Overwriting this array to force a cache update and remove old "Keystate" data.
  ventures: [
    {
      id: '1',
      title: "GTM Mentor at Outlier Ventures",
      description: "Advising the next generation of Web3 founders on go-to-market strategy, product positioning, and narrative development within the Outlier Ventures accelerator program.",
      cta: "Learn More About Outlier Ventures",
      url: "https://outlierventures.io"
    },
    {
      id: '2',
      title: "Managing Partner at Multiplied (DMC)",
      description: "The marketing & PR agency behind headline-grabbing launches for protocols and brands alike, including Solana’s wormhole, Immutable X, Quentin Tarantino’s NFT, among many others.",
      cta: "Learn More About Multiplied (DMC)",
      url: "https://multipliedhq.com"
    },
    {
      id: '3',
      title: "Partner at SpaceDev",
      description: "The second largest DevShop in LATAM. Worked with Aptos, Rarible, Apple, Google, Chevron, Blockus, etc.",
      cta: "Learn More About SpaceDev",
      url: "https://spacedev.io"
    },
    {
      id: '4',
      title: "Partner at Capa",
      description: "Leveraging stablecoin infrastructure to move money across LATAM with zero FX drag. Raised USD$3M in pre-seed.",
      cta: "Learn More About Capa",
      url: "https://capa.fi"
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