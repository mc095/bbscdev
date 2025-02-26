import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'BBSC x ',
    lastName:  'SVEC',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Design Engineer',
    avatar:    '/images/avatar.jpg',
    location:  'Asia/Kolkata',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: <>Subscribe to BBSC&apos;s Newsletter</>,
    description: <>Know About our new Technical Blogs today!</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/company/black-box-student-community-svec/',
    },
   
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:bbscsvec@gmail.com',
    },

    {
        name: 'Whatsapp',
        icon: 'whatsapp',
        link: 'https://whatsapp.com/channel/0029Vaqs9XG7T8bcOq8p0X3Z',
    },
    {
        name: 'Instagram',
        icon: 'instagram',
        link: 'https://www.instagram.com/bbsc.svec?igsh=aGY1MnZxanN3MHk4',
    },
]

const home = {
    label: 'Home',
    title: `BBSC x SVEC`,
    description: `We inspire, innovate, and ignite creativity among students through AI`,
    headline: <><span style={{
        background: 'linear-gradient(90deg, #b0b0b0, #d4d4d4, #f0f0f0, #d4d4d4, #b0b0b0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: 'bold'
    }}>BBSC x SVEC</span>
    </>,
    subline: <>Unleash your potential! Join the ultimate student hub for innovation, collaboration, and tech mastery with <InlineCode>Blackbox AI</InlineCode> Mavericks!</>

}

const about = {
    label: 'About',
    title: 'About Us',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: false
    },
    calendar: {
        display: true,
        link: 'https://cal.com'
    },

}

const blog = {
    label: 'Blog',
    title: 'Read exclusive activity blogs from us',
    description: `Read what BBSC has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'Our work',
    description: `Design and dev projects by our Team`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'Our gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };