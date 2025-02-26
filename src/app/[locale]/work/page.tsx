import { getPosts } from '@/app/utils';
import { Flex } from '@/once-ui/components';
import { Projects } from '@/components/work/Projects';
import { baseURL, renderContent } from '@/app/resources';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  const t = await getTranslations();
  const { work } = renderContent(t);

  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/${locale}/work/`,
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

export default async function Work({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  unstable_setRequestLocale(locale);
  let allProjects = getPosts(['src', 'app', '[locale]', 'work', 'projects', locale]);

  const t = await getTranslations(); // Use server-side getTranslations
  const { person, work } = renderContent(t);

  return (
    <Flex fillWidth maxWidth="m" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            headline: work.title,
            description: work.description,
            url: `https://${baseURL}/projects`,
            image: `${baseURL}/og-image.jpg`,
            author: {
              '@type': 'Person',
              name: person.name,
            },
            hasPart: allProjects.map((project) => ({
              '@type': 'CreativeWork',
              headline: project.metadata.title,
              description: project.metadata.summary,
              url: `https://${baseURL}/projects/${project.slug}`,
              image: `${baseURL}/${project.metadata.image}`,
            })),
          }),
        }}
      />
      <Projects locale={locale} />
    </Flex>
  );
}