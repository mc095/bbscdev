import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { Flex, Background } from '@/once-ui/components';
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style } from '@/app/resources';

import { Inter } from 'next/font/google';
import { Source_Code_Pro } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { renderContent } from "@/app/resources";
import { headers } from 'next/headers';

// Helper function to get the base URL dynamically
function getBaseUrl() {
  const headersList = headers();
  const host = headersList.get('host'); // e.g., localhost:3000, bbscsvec.vercel.app, bbscdev.vercel.app
  const protocol = host?.startsWith('localhost') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations();
  const { person, home } = renderContent(t);

  // Dynamically determine the base URL
  const baseUrl = getBaseUrl();
  const ogImageUrl = `${baseUrl}/og-image.jpg`; // Path to your static og-image.jpg in the public folder

  return {
    metadataBase: new URL(baseUrl),
    title: 'BBSC x SVEC',
    description: 'We inspire, innovate, and ignite creativity among students through AI',
    icons: {
      icon: '/favicon.ico', // Add favicon here
    },
    openGraph: {
      title: 'BBSC x SVEC',
      description: 'We inspire, innovate, and ignite creativity among students through AI',
      url: baseUrl,
      siteName: 'Not Provided',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl, // Points to your static og-image.jpg in the public folder
          width: 1200,
          height: 630,
          alt: 'BBSC x SVEC - BlackBox AI Student Community',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BBSC x SVEC',
      description: 'We inspire, innovate, and ignite creativity among students through AI',
      images: [ogImageUrl], // Using your static og-image.jpg
      creator: '@YourTwitterHandle', // Optional: Replace with your Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const primary = Inter({
  variable: '--font-primary',
  subsets: ['latin'],
  display: 'swap',
});

type FontConfig = {
  variable: string;
};

const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

const code = Source_Code_Pro({
  variable: '--font-code',
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Flex
        as="html"
        lang={locale} // Use the locale dynamically
        background="page"
        data-neutral={style.neutral}
        data-brand={style.brand}
        data-accent={style.accent}
        data-solid={style.solid}
        data-solid-style={style.solidStyle}
        data-theme={style.theme}
        data-border={style.border}
        data-surface={style.surface}
        data-transition={style.transition}
        className={classNames(
          primary.variable,
          secondary ? secondary.variable : '',
          tertiary ? tertiary.variable : '',
          code.variable
        )}>
        <Flex
          style={{ minHeight: '100vh' }}
          as="body"
          fillWidth
          margin="0"
          padding="0"
          direction="column">
          <Background
            gradient={effects.gradient}
            dots={effects.dots}
            lines={effects.lines} />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            justifyContent="center"
            flex={1}>
            <Flex
              justifyContent="center"
              fillWidth
              minHeight="0">
              <RouteGuard>
                {children}
              </RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </NextIntlClientProvider>
  );
}