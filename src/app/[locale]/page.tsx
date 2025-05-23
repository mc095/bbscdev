
import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Card,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes, renderContent } from "@/app/resources";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { AssistantWrapper } from "@/components/assistant-wrapper";

export async function generateMetadata({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  const t = await getTranslations();
  const { home } = renderContent(t);
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Home({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  unstable_setRequestLocale(locale);
  const t = await getTranslations(); // Use server-side getTranslations instead of useTranslations
  const { home, about, person, newsletter } = renderContent(t);

  return (
    <Flex
      maxWidth="m"
      fillWidth
      gap="xl"
      direction="column"
      alignItems="center"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: home.title,
            description: home.description,
            url: `https://${baseURL}`,
            image: `${baseURL}/og-image.jpg`,
            publisher: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Flex fillWidth direction="column" paddingY="l" gap="m">
        <Flex direction="column" fillWidth maxWidth="s" gap="m">
          <RevealFx translateY="4">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2}>
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="body-default-l"
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx translateY="12" delay={0.4}>
            <Button
              data-border="rounded"
              href={`/${locale}/about`}
              variant="tertiary"
              suffixIcon="chevronRight"
              size="m"
            >
              <Flex gap="8" alignItems="center">
                {about && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {t("about.title")}
              </Flex>
            </Button>
          </RevealFx>
        </Flex>
      </Flex>

      {/* Sign-up Card Section */}
      {/* <Flex fillWidth justifyContent="center" marginY="l">
        <Card padding="l" border="neutral-medium" style={{ maxWidth: "400px" }}>
          <Heading variant="body-strong-xl" marginBottom="s">
            Register for Algo Phoenix Hackathon Today!
          </Heading>
          <Text variant="body-default-l" marginBottom="m">
            Hackathon:where code meets creativity
          </Text>
          <Button
            variant="primary"
            href="https://forms.gle/9AgS4e2zgrtqayUM7"
            target="_blank"
          >
            Sign Up
          </Button>
        </Card>
      </Flex> */}

      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} locale={locale} />
      </RevealFx>
      {routes["/blog"] && (
        <Flex fillWidth paddingX="20">
          <Posts range={[1, 2]} columns="2" locale={locale} />
        </Flex>
      )}
      <Projects range={[2]} locale={locale} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
      <AssistantWrapper />
    </Flex>
  );
}