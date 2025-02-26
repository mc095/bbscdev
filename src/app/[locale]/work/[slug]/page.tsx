import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { formatDate, getPosts } from '@/app/utils';
import { AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components';
import { baseURL, renderContent } from '@/app/resources';
import { routing } from '@/i18n/routing';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// Define params as a Promise to match Next.js PageProps
interface WorkParams {
  params: Promise<{ slug: string; locale: string }>; // Awaitable params
}

export async function generateStaticParams() {
  const locales = routing.locales;
  const allPosts = [];

  for (const locale of locales) {
    const posts = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);
    allPosts.push(
      ...posts.map((post) => ({
        slug: post.slug,
        locale: locale,
      }))
    );
  }

  return allPosts;
}

// Make generateMetadata async since it fetches translations
export async function generateMetadata({ params }: WorkParams) {
  const { slug, locale } = await params; // Await params
  let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).find(
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
      url: `https://${baseURL}/${locale}/work/${post.slug}`,
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

export default async function Project({ params }: WorkParams) {
  const { slug, locale } = await params; // Await params
  unstable_setRequestLocale(locale);
  let post = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]).find(
    (post) => post.slug === slug
  );

  if (!post) {
    notFound();
  }

  const t = await getTranslations(); // Use server-side getTranslations
  const { person } = renderContent(t);

  const avatars = post.metadata.team?.map((person) => ({
    src: person.avatar,
  })) || [];

  return (
    <Flex as="section" fillWidth maxWidth="m" direction="column" alignItems="center" gap="l">
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
            url: `https://${baseURL}/${locale}/work/${post.slug}`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
          }),
        }}
      />
      <Flex fillWidth maxWidth="xs" gap="16" direction="column">
        <Button
          href={`/${locale}/work`}
          variant="tertiary"
          size="s"
          prefixIcon="chevronLeft"
        >
          Home
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Flex>
      {post.metadata.images?.length > 0 && (
        <SmartImage
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}
      <Flex style={{ margin: 'auto' }} as="article" maxWidth="xs" fillWidth direction="column">
        <Flex gap="12" marginBottom="24" alignItems="center">
          {post.metadata.team && (
            <AvatarGroup reverseOrder avatars={avatars} size="m" />
          )}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Flex>
    </Flex>
  );
}