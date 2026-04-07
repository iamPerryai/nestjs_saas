import { setRequestLocale } from 'next-intl/server';

import JoyflixHomePage from '@/themes/default/pages/joyflix-home';

export const revalidate = 3600;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <JoyflixHomePage locale={locale} />;
}
