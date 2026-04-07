'use client';

import { Particles } from '@/shared/components/magicui/particles';
import { cn } from '@/shared/lib/utils';

type JoyflixBackgroundVariant = 'page' | 'band' | 'footer';

const variantMap: Record<
  JoyflixBackgroundVariant,
  {
    base: string;
    stars: string;
    orbA: string;
    orbB: string;
    orbC: string;
    quantity: number;
    secondaryQuantity: number;
  }
> = {
  page: {
    base: 'bg-[radial-gradient(circle_at_50%_0%,rgba(101,89,255,0.14),transparent_34%),radial-gradient(circle_at_14%_8%,rgba(90,132,255,0.08),transparent_24%),linear-gradient(180deg,rgba(7,7,9,0)_0%,rgba(7,7,9,0.35)_100%)]',
    stars:
      '[background-size:220px_220px,310px_310px,180px_180px] opacity-[0.14]',
    orbA:
      '-left-[18%] top-[4%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(67,105,255,0.22)_0,rgba(67,105,255,0.1)_30%,transparent_70%)]',
    orbB:
      'left-1/2 top-[24%] h-[30rem] w-[44rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(138,97,255,0.14)_0,rgba(138,97,255,0.07)_34%,transparent_72%)]',
    orbC:
      'right-[-14%] top-[58%] h-[34rem] w-[34rem] bg-[radial-gradient(circle,rgba(87,118,255,0.16)_0,rgba(87,118,255,0.08)_32%,transparent_70%)]',
    quantity: 150,
    secondaryQuantity: 60,
  },
  band: {
    base: 'bg-[radial-gradient(circle_at_50%_42%,rgba(83,97,255,0.12),transparent_28%),radial-gradient(circle_at_35%_48%,rgba(199,112,255,0.12),transparent_22%),linear-gradient(180deg,rgba(10,10,14,0.2)_0%,rgba(10,10,14,0)_100%)]',
    stars:
      '[background-size:170px_170px,260px_260px,140px_140px] opacity-[0.18]',
    orbA:
      '-left-[12%] top-[18%] h-[26rem] w-[34rem] bg-[radial-gradient(circle,rgba(64,100,255,0.26)_0,rgba(64,100,255,0.11)_28%,transparent_72%)]',
    orbB:
      'left-1/2 top-[34%] h-[28rem] w-[60rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(148,92,255,0.18)_0,rgba(148,92,255,0.09)_28%,transparent_70%)]',
    orbC:
      'right-[-10%] top-[44%] h-[28rem] w-[28rem] bg-[radial-gradient(circle,rgba(81,127,255,0.16)_0,rgba(81,127,255,0.06)_34%,transparent_72%)]',
    quantity: 120,
    secondaryQuantity: 42,
  },
  footer: {
    base: 'bg-[radial-gradient(circle_at_50%_100%,rgba(117,84,255,0.16),transparent_34%),radial-gradient(circle_at_22%_58%,rgba(73,109,255,0.12),transparent_24%),linear-gradient(180deg,rgba(7,7,10,0)_0%,rgba(7,7,10,0.4)_100%)]',
    stars:
      '[background-size:190px_190px,260px_260px,150px_150px] opacity-[0.16]',
    orbA:
      '-left-[14%] bottom-[-12%] h-[28rem] w-[34rem] bg-[radial-gradient(circle,rgba(72,109,255,0.22)_0,rgba(72,109,255,0.08)_30%,transparent_72%)]',
    orbB:
      'left-1/2 bottom-[-18%] h-[28rem] w-[52rem] -translate-x-1/2 bg-[radial-gradient(circle,rgba(147,93,255,0.18)_0,rgba(147,93,255,0.08)_30%,transparent_72%)]',
    orbC:
      'right-[-12%] bottom-[10%] h-[24rem] w-[24rem] bg-[radial-gradient(circle,rgba(91,130,255,0.18)_0,rgba(91,130,255,0.07)_32%,transparent_72%)]',
    quantity: 95,
    secondaryQuantity: 36,
  },
};

export function JoyflixBackground({
  className,
  variant = 'page',
}: {
  className?: string;
  variant?: JoyflixBackgroundVariant;
}) {
  const config = variantMap[variant];

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className={cn('absolute inset-0', config.base)} />

      <div
        className={cn(
          'absolute inset-0 animate-joy-stars mix-blend-screen [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0,rgba(255,255,255,0.18)_1px,transparent_1.7px),radial-gradient(circle_at_center,rgba(117,132,255,0.85)_0,rgba(117,132,255,0.2)_0.9px,transparent_1.6px),radial-gradient(circle_at_center,rgba(187,114,255,0.8)_0,rgba(187,114,255,0.18)_1px,transparent_1.6px)]',
          config.stars
        )}
      />

      <div
        className={cn(
          'absolute rounded-full blur-3xl animate-joy-drift',
          config.orbA
        )}
      />
      <div
        className={cn(
          'absolute rounded-full blur-3xl animate-joy-float',
          config.orbB
        )}
      />
      <div
        className={cn(
          'absolute rounded-full blur-3xl animate-joy-pulse',
          config.orbC
        )}
      />

      <Particles
        className="absolute inset-0 opacity-45"
        quantity={config.quantity}
        size={1}
        color="#7480ff"
        staticity={34}
        ease={90}
        vx={0.015}
        vy={-0.01}
      />
      <Particles
        className="absolute inset-0 opacity-20"
        quantity={config.secondaryQuantity}
        size={1.3}
        color="#ffffff"
        staticity={48}
        ease={120}
        vx={0.004}
        vy={0.003}
      />
    </div>
  );
}
