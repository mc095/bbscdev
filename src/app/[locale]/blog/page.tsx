import { Flex, Heading } from '@/once-ui/components';
import { Mailchimp } from '@/components';
import { Posts } from '@/components/blog/Posts';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  const t = await getTranslations();
  const { blog } = renderContent(t);

  const title = blog.title;
  const description = blog.description;
  const ogImage = `https://${baseURL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/${locale}/blog`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  unstable_setRequestLocale(locale);
  const t = await getTranslations(); // Use server-side getTranslations
  const { person, blog, newsletter } = renderContent(t);

  return (
    <Flex fillWidth maxWidth="s" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            headline: blog.title,
            description: blog.description,
            url: `https://${baseURL}/blog`,
            image: `${baseURL}/og-image.jpg`,
            author: {
              '@type': 'Person',
              name: person.name,
              image: {
                '@type': 'ImageObject',
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
      </Heading>
      <Flex fillWidth flex={1}>
        <Posts range={[1, 3]} locale={locale} />
        <Posts range={[4]} columns="2" locale={locale} />
      </Flex>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Flex>
  );
}