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

  const baseUrl = `https://${baseURL}/${locale}`;
  const ogImageUrl = `${baseUrl}/og-image.jpg`;

  return {
    metadataBase: new URL(baseUrl),
    title: home.title,
    description: home.description,
    icons: {
      icon: '/favicon.ico', // Add favicon here
    },
    openGraph: {
      title: `We inspire, innovate, and ignite creativity among students through AI`,
      description: 'We inspire, innovate, and ignite creativity among students through AI',
      url: baseUrl,
      siteName: `We inspire, innovate, and ignite creativity among students through AI`,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630, 
          alt: 'BlackBox AI Student Community X SVEC - We Design, Innovate', // Alt text for accessibility
        },
      ],
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