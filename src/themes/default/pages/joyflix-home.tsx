import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clapperboard,
  Film,
  Gift,
  Heart,
  ImagePlus,
  Paperclip,
  Play,
  Rocket,
  Settings2,
  Sparkles,
  Zap,
} from 'lucide-react';

import { Link } from '@/core/i18n/navigation';
import { JoyflixBackground } from '@/themes/default/blocks/joyflix-background';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Marquee } from '@/shared/components/ui/marquee';

const modelLogos = [
  ['Hailuo', 'https://joyflix.ai/imgs/logos/hailuo.svg'],
  ['Kling', 'https://joyflix.ai/imgs/logos/kling.svg'],
  ['Wan', 'https://joyflix.ai/imgs/logos/wan.svg'],
  ['PixVerse', 'https://joyflix.ai/imgs/logos/pixverse.svg'],
  ['Luma', 'https://joyflix.ai/imgs/logos/luma.svg'],
] as const;

const featureBullets = [
  'Simple text or image input',
  'Multiple AI models to choose from',
  'Fast generation in under 60 seconds',
  'High-quality video output',
] as const;

const showcaseVideos = [
  {
    title: 'Dog Olympics',
    prompt: 'A playful sports sequence with a surreal Olympic arena and fast, clean motion.',
    video: 'https://cdn.joyflix.ai/demo/videos/dog-olympics.mp4',
  },
  {
    title: 'Sunrise bicycle',
    prompt: 'A ground-level follow shot through a city waking up in warm early-morning light.',
    video: 'https://cdn.joyflix.ai/demo/videos/sun-rises-bicycle.mp4',
  },
  {
    title: 'Pirate ship',
    prompt: 'A cinematic fantasy scene with rich atmosphere, dramatic sails, and deep contrast.',
    video: 'https://cdn.joyflix.ai/demo/videos/pirate-ship.mp4',
  },
  {
    title: 'Snow leopard',
    prompt: 'A crisp wildlife-style shot with strong texture, depth, and premium motion detail.',
    video: 'https://cdn.joyflix.ai/demo/videos/snow-leopard.mp4',
  },
] as const;

const demoCards = [
  {
    title: 'Retro interface reveal',
    desc: 'Animate nostalgic stills into a polished product story.',
    prompt:
      'Turn a retro illustration into a floating screen reveal with bloom and subtle parallax.',
    image: 'https://cdn.joyflix.ai/demo/imgs/macpaint.png',
    video: 'https://cdn.joyflix.ai/demo/videos/macpaint.mp4',
  },
  {
    title: 'Dreamy travel loop',
    desc: 'Start from one scenic frame and add motion-rich atmosphere.',
    prompt:
      'Add gentle camera movement, drifting light, and warm evening ambience to a Venice canal scene.',
    image: 'https://cdn.joyflix.ai/demo/imgs/gondola.jpg',
    video: 'https://cdn.joyflix.ai/demo/videos/gondola.mp4',
  },
  {
    title: 'Stylized character motion',
    desc: 'Bring poster art to life without rebuilding the whole shot.',
    prompt:
      'Animate the character illustration with particles, hair motion, and a cinematic push-in.',
    image: 'https://cdn.joyflix.ai/demo/imgs/woman-city-doodle.jpg',
    video: 'https://cdn.joyflix.ai/demo/videos/woman-city-doodle.mp4',
  },
] as const;

const introduceCards = [
  {
    title: 'Text to Video AI',
    desc: 'Turn any text prompt into a captivating video. Our advanced AI understands context and creates visuals that match your vision perfectly.',
    icon: Clapperboard,
  },
  {
    title: 'Image to Video AI',
    desc: 'Bring your static photos to life with realistic motion, depth, and cinematic effects that tell compelling stories.',
    icon: ImagePlus,
  },
  {
    title: 'Professional Quality',
    desc: "Generate high-definition videos with professional-grade quality that's ready for social media, marketing, or personal use.",
    icon: Film,
  },
] as const;

const benefitCards = [
  {
    title: 'Advanced Text to Video AI That Understands Your Vision',
    desc: 'Forget generic stock footage. Our algorithm deciphers complex prompts to produce unique, context-aware videos that truly reflect your idea.',
    image: 'https://joyflix.ai/imgs/features/2.png',
    icon: Sparkles,
  },
  {
    title: 'Transform Static Pictures with Life-like Image to Video AI',
    desc: "Our AI video generator from image tool analyzes your photo to add realistic motion, depth, and effects, turning a single moment into a captivating story.",
    image: 'https://joyflix.ai/imgs/features/3.png',
    icon: ImagePlus,
  },
  {
    title: 'Free AI Video Generator with Professional Results',
    desc: 'Start creating immediately with the free tier. No credit card required, no watermarks on first videos, and a polished output from the start.',
    image: 'https://joyflix.ai/imgs/features/4.png',
    icon: Gift,
  },
] as const;

const useCaseCards = [
  {
    title: 'The Ultimate Prompt to Video AI Generator for Marketers',
    desc: "Over 8,000 marketers use text to video AI to produce scroll-stopping ads in minutes, not days.",
    icon: Rocket,
  },
  {
    title: 'Create Video from Images with AI Free for Personal Memories',
    desc: 'Turn your photo albums into beautiful video stories for birthdays, holidays, and special occasions.',
    icon: ImagePlus,
  },
  {
    title: 'A Powerful AI Animation Generator From Text for Storytellers',
    desc: 'Bring characters and scripts to life without a full studio pipeline or expensive production stack.',
    icon: Clapperboard,
  },
  {
    title: 'A Powerful Alternative to the Sora AI Video Generator',
    desc: 'JoyFlix positions itself as an accessible, available-now option with a polished creative workflow.',
    icon: Sparkles,
  },
  {
    title: 'Professional Quality Video Output',
    desc: 'The system emphasizes composition, lighting, motion, and clean cinematic results instead of toy-like outputs.',
    icon: Film,
  },
  {
    title: 'Fast and Reliable Processing',
    desc: 'The product story leans heavily on quick generation time and dependable cloud rendering.',
    icon: Zap,
  },
] as const;

const statsItems = [
  {
    title: 'Trusted by',
    value: '500K+',
    desc: 'Creators',
  },
  {
    title: 'Videos Generated',
    value: '1M+',
    desc: 'Monthly',
  },
  {
    title: 'Average Creation Time',
    value: '60',
    desc: 'Seconds',
  },
] as const;

const pricingPlans = [
  {
    name: 'Starter',
    desc: 'A simple plan for testing prompts, styles, and short-form video ideas.',
    price: '$0',
    highlight: false,
    features: [
      '20 starter credits each month',
      'Text to video and image to video',
      'Standard queue access',
      'Community support',
    ],
  },
  {
    name: 'Creator',
    desc: 'Balanced speed and output quality for creators shipping every week.',
    price: '$24',
    highlight: true,
    features: [
      '250 generation credits each month',
      'Priority rendering queue',
      'Commercial usage rights',
      'HD exports and reusable presets',
    ],
  },
  {
    name: 'Studio',
    desc: 'Built for teams running client work, campaigns, and heavier production.',
    price: '$79',
    highlight: false,
    features: [
      '900 generation credits each month',
      'Fastest rendering priority',
      'Shared workspace access',
      'Dedicated onboarding help',
    ],
  },
] as const;

const footerLinks = [
  { title: 'Showcase', href: '/#showcase' },
  { title: 'Pricing', href: '/pricing' },
] as const;

const footerSocials = [
  { title: 'X', href: 'https://x.com/li_wujie' },
  { title: 'Github', href: 'https://github.com/wujieli0207' },
  { title: 'Email', href: 'mailto:wujieli0207@outlook.com' },
] as const;

const reviews = [
  {
    name: 'Alex G.',
    role: 'Social Media Manager',
    quote:
      'I can now ship multiple short-form concepts in a single afternoon. The workflow feels fast without getting messy.',
    avatar: '/imgs/avatars/1.png',
  },
  {
    name: 'Jenna R.',
    role: 'Small Business Owner',
    quote:
      'I was looking for a free AI video generator that was not limited or clunky. JoyFlix exceeded all my expectations. It is powerful, fast, and incredibly user-friendly.',
    avatar: '/imgs/avatars/2.png',
  },
  {
    name: 'David M.',
    role: 'Content Creator',
    quote:
      'As a YouTube creator, JoyFlix AI has revolutionized my content production. I can create engaging video intros and animations that would have cost me thousands in production.',
    avatar: '/imgs/avatars/3.png',
  },
  {
    name: 'Nina P.',
    role: 'Freelance Designer',
    quote:
      'In my design workflow, I can quickly prototype video concepts for clients and deliver polished results faster than ever.',
    avatar: '/imgs/avatars/4.png',
  },
  {
    name: 'Sarah L.',
    role: 'Marketing Director',
    quote:
      'Our team creates dozens of video ads every week using JoyFlix. The prompt to video generator understands our brand voice and consistently delivers on-brand content.',
    avatar: '/imgs/avatars/5.png',
  },
  {
    name: 'James H.',
    role: 'Startup Founder',
    quote:
      'As a bootstrapped startup, JoyFlix AI gave us access to professional video creation without the huge costs. Our marketing videos now compete with much larger companies.',
    avatar: '/imgs/avatars/6.png',
  },
  {
    name: 'Olivia K.',
    role: 'E-commerce Operator',
    quote:
      'The image to video feature added such a polished layer to our product launches. It makes static visuals feel premium instantly.',
    avatar: '/imgs/avatars/7.png',
  },
  {
    name: 'Marcus T.',
    role: 'Indie Maker',
    quote:
      'The landing page sold me, but the actual speed kept me. I can validate a motion idea before the day is over.',
    avatar: '/imgs/avatars/8.png',
  },
  {
    name: 'Emily S.',
    role: 'Brand Strategist',
    quote:
      'What used to take five tools now happens in one place. The quality is consistently impressive.',
    avatar: '/imgs/avatars/9.png',
  },
] as const;

const faq = [
  {
    q: 'How to make ai video from text with the best results?',
    a: "For the best output with text to video AI, be specific in your prompts. Include details about the subject, setting, art style, and mood so the system can better match your vision.",
  },
  {
    q: 'What makes you the best ai video generator?',
    a: 'JoyFlix positions itself around visual quality, user control, and accessible high-definition output, even for first-time users.',
  },
  {
    q: 'How do I create video from images with ai free?',
    a: 'Upload a clear image, choose an animation style, and generate directly from the image-to-video workflow without extra editing software.',
  },
  {
    q: 'Does the ai video generator from image work with any photo?',
    a: 'For the best result, use clear high-resolution photos with a well-defined subject so motion, depth, and camera movement read naturally.',
  },
  {
    q: 'How long does it take to generate a video?',
    a: 'Most videos are presented as generating within about 60 seconds, while more complex outputs can take a little longer.',
  },
  {
    q: 'Can I use the generated videos commercially?',
    a: 'The product messaging states that generated videos can be used commercially and that creators retain rights to their output.',
  },
] as const;

function ReviewCard({
  name,
  role,
  quote,
  avatar,
  compact = false,
}: {
  name: string;
  role: string;
  quote: string;
  avatar: string;
  compact?: boolean;
}) {
  return (
    <article
      className={`shrink-0 rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(47,42,39,0.94),rgba(39,35,33,0.94))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.34)] ${
        compact ? 'w-full' : 'w-[320px]'
      }`}
    >
      <p className="text-[1.02rem] leading-9 text-white/70 before:mr-1 before:text-white/32 before:content-['“'] after:ml-1 after:text-white/32 after:content-['”']">
        {quote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <div className="overflow-hidden rounded-full ring-1 ring-white/10">
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="size-12 object-cover"
          />
        </div>
        <div>
          <p className="text-[1.02rem] font-semibold text-white">{name}</p>
          <p className="mt-0.5 text-sm text-white/48">{role}</p>
        </div>
      </div>
    </article>
  );
}

export default function JoyflixHomePage({ locale }: { locale: string }) {
  const isZh = locale.startsWith('zh');
  const labels = {
    announcement: isZh
      ? 'New release: first video free'
      : 'New release: first video free',
    heroTitle: isZh
      ? "The Only AI Video Generator You'll Ever Need"
      : "The Only AI Video Generator You'll Ever Need",
    heroDesc: isZh
      ? 'Effortlessly create stunning videos from scratch with our advanced text to video AI. Or, bring your photos to life with our powerful image to video AI technology.'
      : 'Effortlessly create stunning videos from scratch with our advanced text to video AI. Or, bring your photos to life with our powerful image to video AI technology.',
    introduceTitle: isZh ? 'What is JoyFlix AI' : 'What is JoyFlix AI',
    introduceDesc: isZh
      ? 'JoyFlix AI is the ultimate AI video generator that transforms text prompts and images into stunning, professional-quality videos.'
      : 'JoyFlix AI is the ultimate AI video generator that transforms text prompts and images into stunning, professional-quality videos.',
    benefitTitle: isZh
      ? 'Why JoyFlix is the Best AI Video Generator'
      : 'Why JoyFlix is the Best AI Video Generator',
    featureTitle: isZh
      ? 'Create polished videos from prompts or images'
      : 'Create polished videos from prompts or images',
    featureDesc: isZh
      ? 'Pick a model, describe the shot, and generate cinematic clips with a workflow that feels fast and approachable.'
      : 'Pick a model, describe the shot, and generate cinematic clips with a workflow that feels fast and approachable.',
    useCaseTitle: isZh
      ? 'How Creatives Use Our AI Video Generator'
      : 'How Creatives Use Our AI Video Generator',
    statsTitle: isZh ? 'People Love JoyFlix AI' : 'People Love JoyFlix AI',
    pricingTitle: isZh
      ? 'Choose a plan that matches your creative pace'
      : 'Choose a plan that matches your creative pace',
    reviewsTitle: isZh
      ? 'Testimonials feel like moving social proof'
      : 'Testimonials feel like moving social proof',
    faqTitle: isZh
      ? 'Frequently Asked Questions'
      : 'Frequently Asked Questions',
    ctaTitle: isZh
      ? 'Create Your First AI Video Today'
      : 'Create Your First AI Video Today',
  };
  const reviewColumns = [
    reviews.filter((_, index) => index % 3 === 0),
    reviews.filter((_, index) => index % 3 === 1),
    reviews.filter((_, index) => index % 3 === 2),
  ];
  const reviewDurations = ['[--duration:32s]', '[--duration:38s]', '[--duration:34s]'];

  return (
    <main className="relative overflow-hidden bg-[#060606] text-white">
      <JoyflixBackground />

      <section className="relative border-b border-white/10 px-4 pb-20 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,13,0.3)_0%,rgba(6,6,6,0)_18%,rgba(6,6,6,0.16)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-8 h-[42rem] bg-[radial-gradient(circle_at_50%_36%,rgba(174,102,255,0.24)_0,rgba(174,102,255,0.11)_18%,transparent_42%),radial-gradient(circle_at_46%_50%,rgba(104,116,255,0.22)_0,rgba(104,116,255,0.1)_17%,transparent_40%),radial-gradient(circle_at_56%_54%,rgba(255,128,202,0.12)_0,rgba(255,128,202,0.05)_18%,transparent_42%)] blur-2xl" />
        <div className="container relative">
          <div className="mx-auto max-w-6xl text-center">
            <Badge className="mb-7 rounded-full border border-[#8a77ff]/35 bg-[rgba(16,16,20,0.6)] px-2 py-1 text-xs text-[#ffd8bd] shadow-none backdrop-blur">
              <span className="rounded-full bg-[#7d8cff] px-2.5 py-1 font-medium text-[#130d2a]">
                NEW
              </span>
              <span className="px-3 text-sm text-[#f3b790]">
                Create Your First Video Free
              </span>
              <span className="pr-2 text-white/35">›</span>
            </Badge>

            <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[5.6rem] lg:leading-[0.98]">
              <span className="text-white">The Only </span>
              <span className="bg-[linear-gradient(180deg,#91a1ff_0%,#7480ff_100%)] bg-clip-text text-transparent">
                AI Video
              </span>
              <br />
              <span className="bg-[linear-gradient(180deg,#7c8cff_0%,#9aa6ff_100%)] bg-clip-text text-transparent">
                Generator
              </span>
              <span className="text-white"> You&apos;ll Ever Need</span>
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-balance text-lg leading-9 text-white/55 sm:text-[1.65rem] sm:leading-11">
              {labels.heroDesc}
            </p>

            <div className="mx-auto mt-12 max-w-[56rem] rounded-[28px] border border-white/12 bg-[rgba(28,28,30,0.88)] p-5 shadow-[0_28px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-[24px] border border-white/8 bg-black">
                <div className="min-h-[7.5rem] px-6 py-5 text-left text-[1.05rem] text-white/42 sm:min-h-[8.8rem]">
                  Describe the video you want to generate, the more detailed the
                  better...
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 bg-[linear-gradient(180deg,rgba(86,82,96,0.88),rgba(66,63,73,0.92))] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
                    <div className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-[rgba(52,52,57,0.92)] px-4 text-sm font-medium text-white/88">
                      <span className="size-2.5 rounded-full bg-[linear-gradient(180deg,#0be2ff,#33c96f)] shadow-[0_0_16px_rgba(11,226,255,0.55)]" />
                      Hailuo
                      <ChevronDown className="size-4 text-white/45" />
                    </div>

                    <div className="hidden h-7 w-px bg-white/14 sm:block" />

                    <button
                      type="button"
                      className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-[rgba(52,52,57,0.92)] text-white/78"
                    >
                      <Paperclip className="size-4" />
                    </button>

                    <div className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-[rgba(52,52,57,0.92)] px-4 text-sm font-medium text-white/88">
                      <Settings2 className="size-4 text-white/68" />
                      6 • 768p • Pro...
                      <ChevronDown className="size-4 text-white/45" />
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-full bg-[#7d8cff] px-7 text-sm font-medium text-[#151221] hover:bg-[#8d9bff]"
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-3">
              {[
                'A majestic eagle soaring over mountain peaks at sunrise',
                'Futuristic city with flying cars and neon lights',
                'Ocean waves crashing against rocky cliffs in slow motion',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 bg-[rgba(32,32,35,0.8)] px-5 py-3 text-sm text-white/72 shadow-[0_10px_30px_rgba(0,0,0,0.26)] backdrop-blur"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl rounded-[28px] border border-white/10 bg-white/[0.03] px-6 py-6 md:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-white/35">
                  Video generation models
                </p>
                <p className="mt-2 text-sm text-white/58">
                  The model strip is one of the strongest trust signals on the
                  page.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-8">
                {modelLogos.map(([name, src]) => (
                  <Image
                    key={name}
                    src={src}
                    alt={name}
                    width={120}
                    height={28}
                    className="h-6 w-auto opacity-85"
                    unoptimized
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-[0.28em] text-[#ffb78a] uppercase">
              What is JoyFlix AI
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {labels.featureTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">
              {labels.featureDesc}
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <div className="inline-flex rounded-full border border-[#ff9d57]/25 bg-[#ff9d57]/10 p-3 text-[#ffb47c]">
                <Clapperboard className="size-5" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                Text to video + image to video
              </h3>
              <p className="mt-4 text-base leading-8 text-white/62">
                Both modes live inside the same visual system, so users
                understand the product quickly.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/72">
                {featureBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <BadgeCheck className="mt-0.5 size-4 text-[#ff9d57]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,138,66,0.08),rgba(255,138,66,0.02))] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <div className="inline-flex rounded-full border border-white/12 bg-black/30 p-3 text-[#ffb47c]">
                <Film className="size-5" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-white">
                Text-to-video showcase reels
              </h3>
              <p className="mt-4 text-base leading-8 text-white/62">
                These use the public JoyFlix demo videos directly, so the
                motion language feels much closer to the original site.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {showcaseVideos.map((item) => (
                  <article
                    key={item.title}
                    className="overflow-hidden rounded-[24px] border border-white/10 bg-black/45"
                  >
                    <div className="relative aspect-[4/5]">
                      <video
                        className="h-full w-full object-cover"
                        src={item.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/15 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="text-sm font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-6 text-white/60">
                          {item.prompt}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/58">
                <ImagePlus className="size-3.5 text-[#ffb47c]" />
                Real JoyFlix showcase assets
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            {demoCards.map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] shadow-[0_28px_90px_rgba(0,0,0,0.26)]"
              >
                <div className="relative aspect-[16/11]">
                  <video
                    src={card.video}
                    poster={card.image}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-black/35 px-3 py-1 text-xs text-white/75 backdrop-blur">
                    Image to video AI
                  </div>
                  <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/40 px-3 py-2 text-xs text-white/84 backdrop-blur">
                    <Play className="size-3 fill-current" />
                    Live demo
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    {card.desc}
                  </p>
                  <div className="mt-5 rounded-[22px] border border-white/10 bg-black/30 p-4">
                    <p className="text-sm leading-7 text-white/78">
                      {card.prompt}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] px-4 py-20 sm:px-6 lg:px-8">
        <JoyflixBackground variant="band" className="opacity-95" />
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-[0.28em] text-[#ffb78a] uppercase">
              Pricing preview
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {labels.pricingTitle}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[32px] border p-7 shadow-[0_28px_90px_rgba(0,0,0,0.26)] ${
                  plan.highlight
                    ? 'border-[#ff9d57]/35 bg-[linear-gradient(180deg,rgba(255,138,66,0.12),rgba(255,138,66,0.03))]'
                    : 'border-white/10 bg-white/[0.03]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {plan.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/58">
                      {plan.desc}
                    </p>
                  </div>
                  {plan.highlight ? (
                    <span className="rounded-full border border-[#ffb27a]/35 bg-[#ff8a42]/12 px-3 py-1 text-xs font-medium text-[#ffd8bf]">
                      Most popular
                    </span>
                  ) : null}
                </div>

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-white/45">/ month</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 text-sm leading-7 text-white/72"
                    >
                      <Check className="mt-1 size-4 text-[#ff9d57]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  size="lg"
                  className={`mt-8 h-12 w-full rounded-full text-sm font-semibold ${
                    plan.highlight
                      ? 'bg-[#ff8a42] text-[#140c07] hover:bg-[#ff9b5c]'
                      : 'bg-white text-[#090909] hover:bg-white/92'
                  }`}
                >
                  <Link href="/pricing">View plan</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
      >
        <JoyflixBackground variant="band" className="opacity-80" />
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-[0.28em] text-[#ffb78a] uppercase">
              Loved by creators
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {labels.reviewsTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/55">
              See what content creators, marketers, and storytellers say about
              JoyFlix AI.
            </p>
          </div>

          <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#060606] via-[#060606]/88 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#060606] via-[#060606]/88 to-transparent" />

            <div className="grid gap-6 lg:grid-cols-3">
              {reviewColumns.map((column, index) => (
                <div
                  key={index}
                  className="h-[38rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]"
                >
                  <Marquee
                    vertical
                    repeat={5}
                    pauseOnHover
                    className={`h-full p-0 [--gap:1.35rem] ${reviewDurations[index]}`}
                  >
                    {column.map((review) => (
                      <ReviewCard
                        key={review.name}
                        name={review.name}
                        role={review.role}
                        quote={review.quote}
                        avatar={review.avatar}
                        compact
                      />
                    ))}
                  </Marquee>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-t border-white/10 bg-white/[0.02] px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium tracking-[0.28em] text-[#ffb78a] uppercase">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {labels.faqTitle}
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl rounded-[32px] border border-white/10 bg-white/[0.03] px-6 py-3 sm:px-8">
            <div className="w-full">
              {faq.map((item, index) => (
                <details
                  key={item.q}
                  className="group border-b border-white/10 py-1 last:border-b-0"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-base font-medium text-white marker:content-none">
                    <span>{item.q}</span>
                    <span className="text-xl leading-none text-white/45 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div
                    className={`pb-6 text-sm leading-7 text-white/60 ${
                      index === 0 ? 'pr-10' : ''
                    }`}
                  >
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <JoyflixBackground variant="footer" className="opacity-90" />
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['#1 on Product Hunt', 'Product of the Day'],
              ['Top 5 launch', 'Product of the Week'],
              ['Featured by directories', 'Startup Fame, Dang.ai, Fazier'],
              ['Creator-first positioning', 'Built for fast visual storytelling'],
            ].map(([title, subtitle]) => (
              <article
                key={title}
                className="rounded-[28px] border border-white/10 bg-black/25 p-6"
              >
                <div className="inline-flex rounded-full border border-[#ff9d57]/30 bg-[#ff9d57]/10 p-3 text-[#ffb47c]">
                  <BadgeCheck className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  {subtitle}
                </p>
              </article>
            ))}
          </div>

          <div className="relative mt-16 overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,138,66,0.18),rgba(255,138,66,0.03)_45%,rgba(255,255,255,0.03))] p-8 sm:p-10 lg:p-12">
            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {labels.ctaTitle}
                </h2>
                <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
                  This keeps your existing Next.js structure, but the landing
                  presentation now sits much closer to JoyFlix in rhythm and
                  visual hierarchy.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 lg:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-[#ff8a42] px-6 text-sm font-semibold text-[#140c07] hover:bg-[#ff9b5c]"
                >
                  <Link href="/sign-in">
                    Launch this layout
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/15 bg-white/4 px-6 text-sm font-semibold text-white hover:bg-white/8"
                >
                  <Link href="/#pricing">Explore pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
