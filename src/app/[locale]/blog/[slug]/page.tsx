import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { formatDate, getPosts } from '@/app/utils';
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

// Define params as a Promise to match Next.js PageProps
interface BlogParams {
  params: Promise<{ slug: string; locale: string }>; // Awaitable params
}

export async function generateStaticParams() {
  const locales = routing.locales;
  const allPosts = [];

  for (const locale of locales) {
    const posts = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]);
    allPosts.push(
      ...posts.map((post) => ({
        slug: post.slug,
        locale: locale,
      }))
    );
  }

  return allPosts;
}

export async function generateMetadata({ params }: BlogParams) {
  const { slug, locale } = await params; // Await params
  const t = await getTranslations();
  let post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).find(
    (post) => post.slug === slug
  );

  if (!post) {
    return {};
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
  const ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://${baseURL}/${locale}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
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

export default async function Blog({ params }: BlogParams) {
  const { slug, locale } = await params; // Await params
  unstable_setRequestLocale(locale);
  let post = getPosts(['src', 'app', '[locale]', 'blog', 'posts', locale]).find(
    (post) => post.slug === slug
  );

  if (!post) {
    notFound();
  }

  const t = await getTranslations(); // Use server-side getTranslations
  const { person } = renderContent(t);

  return (
    <Flex as="section" fillWidth maxWidth="xs" direction="column" gap="m">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `https://${baseURL}${post.metadata.image}`
              : `https://${baseURL}/og-image.jpg`,
            url: `https://${baseURL}/${locale}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      <Button
        href={`/${locale}/blog`}
        variant="tertiary"
        size="s"
        prefixIcon="chevronLeft"
      >
        Posts
      </Button>
      <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      <Flex gap="12" alignItems="center">
        {person.avatar && <Avatar size="s" src={person.avatar} />}
        <Text variant="body-default-s" onBackground="neutral-weak">
          {formatDate(post.metadata.publishedAt)}
        </Text>
      </Flex>
      <Flex as="article" direction="column" fillWidth>
        <CustomMDX source={post.content} />
      </Flex>
    </Flex>
  );
}