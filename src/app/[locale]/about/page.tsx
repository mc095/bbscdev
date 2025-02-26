import { Flex, Heading } from "@/once-ui/components";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import StudentProfileCard from "@/components/about/StudentProfileCard";
import styles from "@/app/[locale]/about/about.module.scss";
import azmatimg from "@/app/[locale]/about/team/azmat.jpg";
import rasmithaimg from "@/app/[locale]/about/team/rasmitha.jpg";
import sripadimg from "@/app/[locale]/about/team/sripada.jpg";
import akashimg from "@/app/[locale]/about/team/akash.jpg";
import jayakimg from "@/app/[locale]/about/team/jayakanth.jpg";
import mohanimg from "@/app/[locale]/about/team/mohan.jpg";
import madhurimg from "@/app/[locale]/about/team/madhur.jpg";
import pallavimg from "@/app/[locale]/about/team/pallavi.jpg";
import supriyaimg from "@/app/[locale]/about/team/supriya.jpg";
import vishnuimg from "@/app/[locale]/about/team/vishnu.jpg";
import tejasimg from "@/app/[locale]/about/team/tejaswini.jpg";
import praskimg from "@/app/[locale]/about/team/praskum.jpg";
import madhanimg from "@/app/[locale]/about/team/madhan.jpg";
import fathimaimg from "@/app/[locale]/about/team/fathima.jpg";
import ganeshimg from "@/app/[locale]/about/team/ganesh.jpg";
import hodimg from "@/app/[locale]/about/team/Hod.jpg";
import tanyaimg from "@/app/[locale]/about/team/tanya.jpg";
import umaimg from "@/app/[locale]/about/team/sahithi.jpg";
import syamalaimg from "@/app/[locale]/about/team/shyamalamani.jpg";
import pallavisatyaimg from "@/app/[locale]/about/team/pallavisatya.jpg";
import ramyasreeimg from "@/app/[locale]/about/team/ramyasree.jpg";
import prasadimg from "@/app/[locale]/about/team/varaprasad.jpg";
import hariimg from "@/app/[locale]/about/team/haricharan.jpg";
import saiimg from "@/app/[locale]/about/team/sai.jpg";
import anjaniimg from "@/app/[locale]/about/team/anjani.jpg";
import pratyuimg from "@/app/[locale]/about/team/pratyusha.jpg";
import bhargavimg from "@/app/[locale]/about/team/bhargav.jpg";
import rishiimg from "@/app/[locale]/about/team/rishi.jpg";
import mahatiimg from "@/app/[locale]/about/team/mahathi.jpg";
import lohithaimg from "@/app/[locale]/about/team/lohitha.jpg";
import durgaimg from "@/app/[locale]/about/team/durgadevi.jpg";
import varshaimg from "@/app/[locale]/about/team/varhsa.jpg";
import bhargaviimg from "@/app/[locale]/about/team/bhargavi.jpg";
import geethikaimg from "@/app/[locale]/about/team/geethika.jpg";
import shanmukimg from "@/app/[locale]/about/team/shanmuk.jpg";
import maniimg from "@/app/[locale]/about/team/mani.jpg";
import pavanaimg from "@/app/[locale]/about/team/pavana.jpg";
import ganeshcnt from "@/app/[locale]/about/team/ganeshcontent.jpg";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";

export default async function StudentProfiles({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  unstable_setRequestLocale(locale);
  const t = await getTranslations(); // Use server-side getTranslations

  const students = [
    {
      name: "Prasanna Kumar",
      role: "Maverick",
      github: "https://github.com/RAPARLAPRASANNAKUMAR",
      linkedin:
        "https://www.linkedin.com/in/prasanna-kumar-raparla-712a25247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: praskimg.src,
    },
    {
      name: "Sai Akash",
      role: "Maverick",
      github: "https://github.com/PYDIPALA-SAI-AKASH",
      linkedin: "https://www.linkedin.com/in/sai-akash-pydipala-932167256",
      avatarUrl: akashimg.src,
    },
    {
      name: "Rasmitha Lekha",
      role: "Secretary",
      github: "https://github.com/rambha7024",
      linkedin: "https://www.linkedin.com/in/rambha-rasmitha-lekha-40a2b9294/",
      avatarUrl: rasmithaimg.src,
    },
    {
      name: "Supriya",
      role: "Technical Lead",
      github: "https://github.com/Supriya-Uchinthala",
      linkedin: "https://www.linkedin.com/in/supriya-uchinthala/",
      avatarUrl: supriyaimg.src,
    },
    {
      name: "Vishnu Vardhan",
      role: "Non - Technical Lead",
      github: "https://github.com/challavishnu123",
      linkedin: "https://www.linkedin.com/in/vishnu-challa-35b45727a/",
      avatarUrl: vishnuimg.src,
    },
    {
      name: "Ganesh",
      role: "Lead",
      github: "https://github.com/mc095",
      linkedin: "https://www.linkedin.com/in/ganesh097/",
      avatarUrl: ganeshimg.src,
    },
    {
      name: "Fathima",
      role: "Lead",
      github: "https://github.com/AashimaFathima",
      linkedin: "https://www.linkedin.com/in/shaik-aashima-fathima-494b82256/",
      avatarUrl: fathimaimg.src,
    },
    {
      name: "Madhan",
      role: "Lead",
      github: "https://github.com/crazy0codes",
      linkedin: "https://www.linkedin.com/in/madhan-panja-bba021290",
      avatarUrl: madhanimg.src,
    },
    {
      name: "Sripada",
      role: "Co-Lead",
      github: "https://github.com/JokerSripadha",
      linkedin: "https://www.linkedin.com/in/sripadha-kakani-a8803b2a0/",
      avatarUrl: sripadimg.src,
    },
    {
      name: "Pallavi",
      role: "Lead",
      github: "https://github.com/pallavidurga",
      linkedin: "https://www.linkedin.com/in/pallavi-durga-katta-19788928a/",
      avatarUrl: pallavimg.src,
    },
    {
      name: "Madhur",
      role: "Lead",
      github: "https://github.com/MadhurAchanta",
      linkedin: "https://www.linkedin.com/in/madhur-achanta-693b0b28a/",
      avatarUrl: madhurimg.src,
    },
    {
      name: "Azmat",
      role: "Lead",
      github: "https://github.com/Azmat1291",
      linkedin: "https://www.linkedin.com/in/mohammad-azmatulla-b6b67b2b5/",
      avatarUrl: azmatimg.src,
    },
    {
      name: "Tejaswini",
      role: "Co-Lead",
      github: "https://github.com/tejaswinieedara",
      linkedin:
        "https://www.linkedin.com/in/eedara-tejaswini-8607302aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: tejasimg.src,
    },
    {
      name: "Mohan",
      role: "Lead",
      github: "https://github.com/mohanreddypadala",
      linkedin:
        "https://www.linkedin.com/in/mohan-reddy-padala-526716294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      avatarUrl: mohanimg.src,
    },
    {
      name: "Jayakanth",
      role: "Co-Lead",
      github: "https://github.com/Vemulurijayakanth",
      linkedin: "http://linkedin.com/in/jaya-kanth-vemuluri-260501271",
      avatarUrl: jayakimg.src,
    },
    {
      name: "Dr. D. Jaya Kumari",
      role: "Faculty Advisor",
      avatarUrl: hodimg.src,
    },
    {
      name: "Tanya",
      role: "Co-Lead",
      github: "https://github.com/TanyaCoder-27",
      linkedin:
        "https://www.linkedin.com/in/andra-tulasi-lakshmi-tanya-6675b7277/",
      avatarUrl: tanyaimg.src,
    },
    {
      name: "Sahithi",
      role: "Subordinate",
      github: "https://github.com/Adabala-UmaSahithi",
      linkedin: "https://www.linkedin.com/in/uma-sahithi-adabala-0b0a07279/",
      avatarUrl: umaimg.src,
    },
    {
      name: "Syamalamani",
      role: "Subordinate",
      github: "https://github.com/Syamalamanipamarthi",
      linkedin: "https://www.linkedin.com/in/syamalamani-pamarthi-7861802ba",
      avatarUrl: syamalaimg.src,
    },
    {
      name: "Pallavi Satya",
      role: "Co-Lead",
      github: "https://github.com/PallaviSatya",
      linkedin: "https://www.linkedin.com/in/pallavi-satya-palli-99401228b",
      avatarUrl: pallavisatyaimg.src,
    },
    {
      name: "Ramya Sree",
      role: "Subordinate",
      github: "https://github.com/ramyasreelanka5",
      linkedin: "https://www.linkedin.com/in/ramya-sree-lanka/",
      avatarUrl: ramyasreeimg.src,
    },
    {
      name: "Vara Prasad",
      role: "Subordinate",
      github: "https://github.com/vara42",
      linkedin:
        "https://www.linkedin.com/in/ganapati-vara-prasad-polavarapu-76475b304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: prasadimg.src,
    },
    {
      name: "Sai",
      role: "Subordinate",
      github: "https://github.com/saipatsa",
      linkedin: "https://www.linkedin.com/in/yegna-sai-a61a3728b/",
      avatarUrl: saiimg.src,
    },
    {
      name: "Hari Charan",
      role: "Subordinate",
      github: "https://github.com/sharicharan",
      linkedin:
        "https://www.linkedin.com/in/hari-s-954151297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: hariimg.src,
    },
    {
      name: "Anjani",
      role: "Co-Lead",
      github: "https://github.com/Anjani-Koteswari",
      linkedin:
        "https://www.linkedin.com/in/anjani-naga-koteswari-karri-49a6b428a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: anjaniimg.src,
    },
    {
      name: "Pratyusha",
      role: "Subordinate",
      github: "https://github.com/PrathyushaMatta",
      linkedin: "https://www.linkedin.com/in/prathyusha-matta-9926ba28a",
      avatarUrl: pratyuimg.src,
    },
    {
      name: "Bhargav",
      role: "Subordinate",
      github: "https://github.com/BhargavChowdaryBala",
      linkedin:
        "https://www.linkedin.com/in/bhargav-chowdary-a866762ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: bhargavimg.src,
    },
    {
      name: "Rishi",
      role: "Co-Lead",
      github: "https://github.com/rishitatavarthi",
      linkedin:
        "https://www.linkedin.com/in/tatavarthi-rishi-varun-819516294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      avatarUrl: rishiimg.src,
    },
    {
      name: "Mahathi",
      role: "Subordinate",
      github: "https://github.com/mahathisamudrala",
      linkedin:
        "https://www.linkedin.com/in/mahathi-samudrala-9861202b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: mahatiimg.src,
    },
    {
      name: "Lohitha",
      role: "Subordinate",
      github: "https://github.com/Lohitha-patala",
      linkedin: "https://www.linkedin.com/in/lohitha-sai-sri-a35b62331",
      avatarUrl: lohithaimg.src,
    },
    {
      name: "Durga Devi",
      role: "Subordinate",
      github: "https://github.com/DurgaDevi1811",
      linkedin:
        "https://www.linkedin.com/in/durga-devi-vanguri-187594290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: durgaimg.src,
    },
    {
      name: "Varsha",
      role: "Subordinate",
      github: "https://github.com/varshavelagala",
      linkedin: "https://in.linkedin.com/in/varsha-sri-2ab296334",
      avatarUrl: varshaimg.src,
    },
    {
      name: "Bhargavi",
      role: "Subordinate",
      github: "https://github.com/bhargaviananthbandaru",
      linkedin:
        "https://www.linkedin.com/in/bhargavi-bandaru-9b4253242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      avatarUrl: bhargaviimg.src,
    },
    {
      name: "Geethika",
      role: "Subordinate",
      github: "https://github.com/SRI42J",
      linkedin: "https://www.linkedin.com/in/geethikaedupuganti/",
      avatarUrl: geethikaimg.src,
    },
    {
      name: "Shanmukh",
      role: "Subordinate",
      github: "https://github.com/m-shannu",
      linkedin:
        "https://www.linkedin.com/in/shanmukh-madicherla-74287b28b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: shanmukimg.src,
    },
    {
      name: "Mani Chandu",
      role: "Subordinate",
      github: "https://github.com/Mani-9828",
      linkedin:
        "https://www.linkedin.com/in/mani-manichandu-957374325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: maniimg.src,
    },
    {
      name: "Pavana",
      role: "Content Writer",
      github: "https://github.com/pavana-namburi",
      linkedin: "https://www.linkedin.com/in/pavana-namburi",
      avatarUrl: pavanaimg.src,
    },
    {
      name: "Ganesh",
      role: "Content Writer",
      github: "https://github.com/supersaga1",
      linkedin:
        "https://www.linkedin.com/in/sai-ganesh-pampana-300bb72b5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      avatarUrl: ganeshcnt.src,
    },
  ];

  const profileSections = [
    {
      title: "Faculty Advisor",
      profiles: [students[15]],
    },
    {
      title: "Lead & Co-Lead",
      profiles: [students[0], students[1]],
    },
    {
      title: "Secretary",
      profiles: [students[2]],
    },
    {
      title: "Technical and Non-Technical Leads",
      profiles: [students[3], students[4]],
    },
    {
      title: "Machine Learning and Deep Learning",
      profiles: [students[5], students[16], students[17], students[18]],
    },
    {
      title: "Generative AI and Prompt Engineering",
      profiles: [students[6], students[19], students[20]],
    },
    {
      title: "Web and App Development",
      profiles: [students[7], students[8], students[21], students[22], students[23]],
    },
    {
      title: "Cloud Computing",
      profiles: [students[9], students[24], students[25], students[26]],
    },
    {
      title: "Event Management",
      profiles: [students[10], students[27], students[28], students[29], students[30]],
    },
    {
      title: "Public Relations",
      profiles: [students[11], students[12], students[32], students[31]],
    },
    {
      title: "Creative Design & Social Media Management",
      profiles: [students[13], students[14], students[33], students[34], students[35]],
    },
    {
      title: "Content Writing",
      profiles: [students[37], students[36]],
    },
  ];

  return (
    <Flex
      fillWidth
      maxWidth="l"
      direction="column"
      alignItems="center"
      padding="xl"
      background="transparent"
    >
      <Heading
        as="h1"
        variant="display-strong-xl"
        onBackground="neutral-weak"
        marginBottom="xl"
      >
        {t("studentProfiles.title")}
      </Heading>
      {profileSections.map((section, index) => (
        <Flex
          key={index}
          direction="column"
          alignItems="center"
          marginBottom="xl"
        >
          <Heading
            as="h1"
            className={styles.sectionTitle}
            onBackground="neutral-weak"
          >
            {section.title}
          </Heading>
          <Flex
            wrap
            justifyContent="center"
            gap="l"
          >
            {section.profiles
              ?.filter((student) => student)
              .map((student, index) => (
                <StudentProfileCard
                  key={index}
                  name={student.name}
                  role={student.role}
                  github={student.github}
                  linkedin={student.linkedin}
                  avatarUrl={student.avatarUrl}
                />
              ))}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export async function generateMetadata({
  params, // Type as Promise
}: {
  params: Promise<{ locale: string }>; // Awaitable params
}) {
  const { locale } = await params; // Await params to get locale
  const t = await getTranslations();
  const title = t("studentProfiles.title");
  const description = t("studentProfiles.description");
  const ogImage = `https://${baseURL}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/student-profiles`,
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