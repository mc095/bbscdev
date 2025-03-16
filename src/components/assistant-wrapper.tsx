"use client";
import "@/styles/chatbot.css";

import { FC } from "react";
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  type ChatModelAdapter,
} from "@assistant-ui/react";
import { AssistantModal } from "@/components/assistant-modal";

// Utility type guard for text content
function isTextContent(
  content: any
): content is { type: "text"; text: string } {
  return content.type === "text" && typeof content.text === "string";
}

// Custom ChatModelAdapter for BBSC-related chatbot
const groqAdapter: ChatModelAdapter = {
  async run({ messages, abortSignal }) {
    const lastContent = messages[messages.length - 1]?.content[0];
    const userMessage = isTextContent(lastContent) ? lastContent.text : "";

    const greetings = ["hello", "hi", "hey"];
    const isGreeting =
      greetings.some((greet) => userMessage.toLowerCase().startsWith(greet)) &&
      !userMessage.toLowerCase().includes("bbsc");

    if (isGreeting) {
      return {
        content: [
          {
            type: "text",
            text: "Hello! I am the BBSC Assistant for Sri Vasavi Engineering College, Tadepalligudem. How can I assist you with BBSC today?",
          },
        ],
      };
    }

    const bbscKeywords = [
      "BBSC",
      "Black Box Student Community",
      "Sri Vasavi Engineering College",
      "Prasanna Kumar",
      "Sai Akash",
      "Rasmitha Lekha",
      "Supriya",
      "Vishnu Vardhan",
      "Ganesh",
      "Tanya",
      "Sahithi",
      "Syamalamani",
      "Fathima",
      "Pallavi Satya",
      "Ramya Sree",
      "Madhan",
      "Sripada",
      "Vara Prasad",
      "Sai",
      "Hari Charan",
      "Pallavi",
      "Anjani",
      "Pratyusha",
      "Bhargav",
      "Madhur",
      "Rishi",
      "Mahathi",
      "Lohitha",
      "Durga Devi",
      "Azmat",
      "Tejaswini",
      "Bhargavi",
      "Varsha",
      "Mohan",
      "Jayakanth",
      "Geethika",
      "Shanmukh",
      "Mani Chandu",
      "Pavana",
      "Dr. D. Jaya Kumari",
      "AI",
      "Artificial Intelligence",
      "ML",
      "Machine Learning",
      "Cloud",
      "Blockchain",
      "team",
      "activities",
      "mission",
      "vision",
      "club",
      "faculty advisor",
      "college",
      "workshop",
      "hackathon",
      "guest speaker",
      "community project",
      "mentorship",
      "innovation",
      "entrepreneurship",
      "social impact",
      "technical",
      "non-technical",
      "secretary",
      "coordinator",
      "contact",
      "email",
      "form",
      "what",
      "who",
      "how",
      "when",
      "where",
      "why",
      "is",
      "are",
      "do",
      "does",
      "can",
      "tell",
      "about",
      "give",
      "list",
      "explain",
      "describe",
      "know",
      "want",
      "need",
      "this",
      "that",
      "me",
      "you",
      "us",
      "our",
      "their",
      "they",
    ];

    const isBBSCQuestion = bbscKeywords.some((keyword) =>
      userMessage.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!isBBSCQuestion) {
      return {
        content: [
          {
            type: "text",
            text: "I'm sorry, I can only assist with questions related to the Black Box Student Club (BBSC) at Sri Vasavi Engineering College.",
          },
        ],
      };
    }

    const groqMessages = messages.map((msg) => {
      const part = msg.content[0];
      return {
        role: msg.role,
        content: isTextContent(part) ? part.text : "",
      };
    });

    try {
      const bbscPrompt = `You are the dedicated BBSC Assistant for the Black Box Student Club (BBSC) at Sri Vasavi Engineering College (SVEC), Tadepalligudem. Your sole purpose is to provide accurate, concise answers about BBSC using only the details below. Do not deviate from this information or make assumptions.

              BBSC Info:
              - **Full Name:** Black Box Student Club (BBSC).
              - **Affiliation:** BBSC x SVEC refers to the Black Box Student Club at Sri Vasavi Engineering College, Tadepalligudem.
              - **Mission:** Empower members with knowledge and skills in AI, Machine Learning (ML), and Cloud technologies, fostering a collaborative environment for ethical and responsible innovation.
              - **Vision:** Enable a future where technology empowers individuals to solve real-world problems and create a more equitable and sustainable world.
              - **Focus Areas:**
                - AI & Machine Learning: Exploring algorithms, models, and applications.
                - Cloud Computing: Building scalable solutions using cloud platforms.
                - Innovation & Entrepreneurship: Encouraging innovative projects and startups.
                - Social Impact: Promoting ethical use of technology for societal benefit.
              - **Activities:** Workshops, Hackathons, Guest Speaker Series, Community Projects, Mentorship Program.
              - **Team:**
                - **Faculty Advisor:** Dr. D. Jaya Kumari - Provides guidance and oversight.
                - **Lead:** Prasanna Kumar - Guides the club’s vision and oversees activities.
                - **Co-Lead:** Sai Akash - Supports the Lead and fosters member engagement.
                - **Secretary:** Rasmitha Lekha - Manages administrative tasks and communication.
                - **Technical Lead:** Supriya - Leads technical workshops and projects.
                - **Non-Technical Lead:** Vishnu Vardhan - Handles community building and outreach.
                - **Machine Learning and Deep Learning:**
                  - Lead: Ganesh
                  - Co-Lead: Tanya
                  - Subordinates: Sahithi, Syamalamani
                - **Generative AI and Prompt Engineering:**
                  - Lead: Fathima
                  - Co-Lead: Pallavi Satya
                  - Subordinate: Ramya Sree
                - **Web and App Development:**
                  - Lead: Madhan
                  - Co-Lead: Sripada
                  - Subordinates: Vara Prasad, Sai, Hari Charan
                - **Cloud Computing:**
                  - Lead: Pallavi
                  - Co-Lead: Anjani
                  - Subordinates: Pratyusha, Bhargav
                - **Event Management:**
                  - Lead: Madhur
                  - Co-Lead: Rishi
                  - Subordinates: Mahathi, Lohitha, Durga Devi
                - **Public Relations:**
                  - Lead: Azmat
                  - Co-Lead: Tejaswini
                  - Subordinates: Bhargavi, Varsha
                - **Creative Design & Social Media Management:**
                  - Lead: Mohan
                  - Co-Lead: Jayakanth
                  - Subordinates: Geethika, Shanmukh, Mani Chandu
                - **Content Writing:**
                  - Writers: Ganesh, Pavana
              - **Contact:** Email at bbscsvec@gmail.com or use the website form.

              **Rules:**
              1. Only answer questions related to BBSC at Sri Vasavi Engineering College.
              2. If the question is unrelated to BBSC, reply: "I'm sorry, I can only assist with questions related to the Black Box Student Club (BBSC) at Sri Vasavi Engineering College."
              3. Use only the information provided above; do not add, assume, or invent details.
              4. If insufficient details are available to answer, reply: "I don’t have enough information to answer that. Could you please provide more details about your BBSC-related question?"
              5. For greetings like "hello" or "hi" without BBSC context, reply: "Hello! I am the BBSC Assistant for Sri Vasavi Engineering College, Tadepalligudem. How can I assist you with BBSC today?"
              6. Keep responses concise, accurate, and directly tied to the BBSC info provided.
`;
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: bbscPrompt,
            },
            ...groqMessages,
          ],
        }),
        signal: abortSignal,
      });

      const aiMessage = await response.json();
      return { content: [{ type: "text", text: aiMessage.content }] };
    } catch (error) {
      console.error("Error sending message:", error);
      return {
        content: [{ type: "text", text: "Sorry, something went wrong!" }],
      };
    }
  },
};

export const AssistantWrapper: FC = () => {
  const runtime = useLocalRuntime(groqAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModal />
    </AssistantRuntimeProvider>
  );
};
