import { Flex } from "@/once-ui/components";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  const t = await getTranslations();
  const { gallery } = renderContent(t);

  const title = gallery.title;
  const description = gallery.description;
  const ogImage = `https://${baseURL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://${baseURL}/og-image.jpg`,
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

export default async function Gallery({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  unstable_setRequestLocale(locale);
  const t = await getTranslations(); // Use server-side getTranslations
  const { gallery, person } = renderContent(t);

  return (
    <Flex fillWidth>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: gallery.title,
            description: gallery.description,
            url: `https://${baseURL}/gallery`,
            image: gallery.images.map((image) => ({
              '@type': 'ImageObject',
              url: `${baseURL}${image.src}`,
              description: image.alt,
            })),
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
      <MasonryGrid />
    </Flex>
  );
}