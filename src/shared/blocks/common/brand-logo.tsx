import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

import { Link } from '@/core/i18n/navigation';
import { Brand as BrandType } from '@/shared/types/blocks/common';

export function BrandLogo({ brand }: { brand: BrandType }) {
  return (
    <Link
      href={brand.url || ''}
      target={brand.target || '_self'}
      className={cn('flex items-center space-x-3', brand.className)}
    >
      {brand.logo && (
        <Image
          src={brand.logo.src}
          alt={brand.title ? '' : brand.logo.alt || ''}
          width={brand.logo.width || 80}
          height={brand.logo.height || 80}
          className={cn('h-8 w-auto rounded-lg', brand.logo.className)}
          unoptimized={brand.logo.src.startsWith('http')}
        />
      )}
      {brand.title && (
        <span className={cn('text-lg font-medium', brand.titleClassName)}>
          {brand.title}
        </span>
      )}
    </Link>
  );
}
