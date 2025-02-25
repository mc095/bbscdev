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

export async function generateMetadata(
  { params: { locale } }: { params: { locale: string } }
): Promise<Metadata> {
  const t = await getTranslations();
  const { person, home } = renderContent(t);

  // Define both possible base URLs for your Vercel deployments
  const possibleBaseUrls = [
    `https://bbscdev.vercel.app/${locale}`,
    `https://bbscsvec.vercel.app/${locale}`,
  ];

  // Use the second URL as the default (prioritizing bbscsvec.vercel.app, but you can switch to [0] for bbscdev)
  const baseUrl = possibleBaseUrls[1]; // e.g., https://bbscsvec.vercel.app/en
  const ogImageUrl = `${baseUrl}/og-image.jpg`; // Path to your static og-image.jpg in the public folder

  return {
    metadataBase: new URL(baseUrl),
    title: 'BBSC x SVEC', // Matches your provided title
    description: 'We inspire, innovate, and ignite creativity among students through AI', // Matches your provided description
    icons: {
      icon: '/favicon.ico', // Add favicon here
    },
    openGraph: {
      title: 'BBSC x SVEC', // Matches your provided og:title
      description: 'We inspire, innovate, and ignite creativity among students through AI', // Matches your provided og:description
      url: baseUrl, // e.g., https://bbscsvec.vercel.app/en (using your Vercel URL instead of demo.app)
      siteName: 'Not Provided', // Matches your provided og:site_name
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl, // Points to your static og-image.jpg in the public folder
          width: 1200, // Recommended width for OG images
          height: 630, // Recommended height for OG images
          alt: 'BBSC x SVEC - BlackBox AI Student Community',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image', // Twitter card type for large images
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