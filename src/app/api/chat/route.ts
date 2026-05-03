import { NextRequest, NextResponse } from 'next/server';

// Comprehensive, highly knowledgeable, and friendly election knowledge base
const electionKnowledge: Record<string, { keywords: string[]; response: string; eli5Response: string }> = {
  register: {
    keywords: ['register', 'registration', 'voter id', 'epic', 'enroll', 'form 6', 'पंजीकरण', 'मतदाता पहचान', 'new voter'],
    response: `## How to Register as a Voter in India 📝

Namaste! Registering to vote is a wonderful step towards shaping our democracy. Here is the fast and efficient way to do it:

**Are you eligible?**
- You need to be **18+ years old**.
- An **Indian citizen**.

**The Easiest Way to Apply (Online):**
1. Visit the official portal: **voters.eci.gov.in** or use the **Voter Helpline App**.
2. Click on **"New Registration"** and fill out **Form 6**.
3. Upload simple documents: 
   - Age proof (Aadhaar, Birth Certificate, etc.)
   - Address proof (Utility bill, Passport, etc.)
   - A recent passport-size photo.

**What happens next?**
You will get an SMS with a reference number. Your application will be verified by a Booth Level Officer (BLO), and your EPIC (Voter ID) card will be delivered to your home by speed post!

*Need to make corrections? Use Form 8 instead! Let me know if you need help with that.*`,
    eli5Response: `## Let's Get You Registered! 🎈

Namaste! Joining the voters' club is super easy and fun!

**Here is how you join the team:**
1. **Check if you're 18:** You have to be at least 18 years old. It's like reaching the next level in a game! 🎮
2. **Sign up online:** Grab a phone and go to the **Voter Helpline App**. 
3. **Show your ID:** You just upload a picture of yourself and a document proving where you live.
4. **Get your Card:** The government will mail you a shiny new Voter ID card right to your door! 

You are now ready to vote! 🗳️`,
  },
  forms: {
    keywords: ['form 7', 'form 8', 'form 6a', 'correction', 'change address', 'delete name'],
    response: `## Election Commission Forms Simplified 📋

Namaste! The ECI uses different forms for different purposes. Here is a quick, handy guide:

- **Form 6:** For registering as a **new voter** or shifting to a new constituency.
- **Form 6A:** For **NRI (Non-Resident Indian)** voter registration.
- **Form 7:** For **deleting** a name from the electoral roll (due to death or shifting).
- **Form 8:** For **corrections** in your Voter ID (name, DOB, photo, address change within the same constituency).

All these forms can be filled out seamlessly on **voters.eci.gov.in** or the **Voter Helpline App**. It's fast, paperless, and efficient!`,
    eli5Response: `## Magic Forms Explained 📝

Namaste friend! The government uses different "magic forms" for different things:

- **Form 6:** The "Hello!" form. Use this to get your first-ever voter card!
- **Form 7:** The "Goodbye" form. Used when someone moves far away or passes away.
- **Form 8:** The "Fix It" form. Did they spell your name wrong? Did you change your address? Form 8 fixes it all! 🛠️

You can find all of them on the Voter Helpline App!`,
  },
  eligible: {
    keywords: ['eligible', 'eligibility', 'qualify', 'who can vote', 'voting age', 'पात्र', 'योग्यता'],
    response: `## Voter Eligibility Criteria ✅

Namaste! I'm glad you asked. To vote in Indian elections, you must meet a few simple criteria:

1. **Age:** You must be at least **18 years old** on the qualifying date (usually Jan 1st, April 1st, July 1st, or Oct 1st of the year).
2. **Citizenship:** You must be an **Indian citizen**.
3. **Residence:** You should be an "ordinarily resident" of the polling area where you wish to vote.

**Who cannot vote?**
- Foreign citizens.
- Individuals declared to be of unsound mind by a competent court.
- Individuals temporarily disqualified due to corrupt practices or election offenses under the Representation of the People Act, 1951.

If you meet the top three criteria, you are fully empowered to participate in the world's largest democracy!`,
    eli5Response: `## Who gets to play? 🎮

Namaste! Voting is a special privilege. You can vote if:

- ✅ You are **18 years old** (you're officially an adult!)
- ✅ You are a citizen of India 🇮🇳
- ✅ You live in the area where you want to vote.

If you match these, you get to choose the leaders of our country! Isn't that awesome? ✨`,
  },
  votingday: {
    keywords: ['voting day', 'polling day', 'how to vote', 'cast vote', 'evm', 'booth', 'मतदान', 'वोट'],
    response: `## Your Guide to Voting Day 🗳️

Namaste! Voting day is exciting. Here is a fast, efficient guide on exactly what to do:

**1. Prepare Before You Go:**
- Check your name on the voter list and find your polling booth via the **Voter Helpline App**.
- Carry your **EPIC (Voter ID)**. If you don't have it, you can use Aadhaar, PAN card, Driving License, or Passport!

**2. At the Polling Booth:**
- **Verification:** The First Polling Officer will check your name on the list and verify your ID.
- **Inking:** The Second Polling Officer will mark your left index finger with indelible ink. ✍️
- **Voting:** Walk into the voting compartment. Press the blue button on the **EVM (Electronic Voting Machine)** next to your chosen candidate's symbol.
- **Confirmation:** Listen for the loud "BEEP" sound. Look at the **VVPAT machine** glass window—you will see a printed slip for 7 seconds confirming your vote!

*Friendly tip: Mobile phones and cameras are strictly prohibited inside the booth. Your vote is completely secret!*`,
    eli5Response: `## Voting Day Adventure! 🗳️

Namaste! Going to vote is like going on a mini-adventure. Here's what happens:

1. **Find your booth:** The government sets up a special room (usually a school) just for voting.
2. **Show your ID:** You show them your card so they know it's really you.
3. **Get the Magic Ink:** They paint a tiny blue dot on your finger so you don't vote twice. It stays for weeks! 💅
4. **Push the Button:** You look at a machine called an EVM, find your favorite leader's symbol, and press the button next to it!
5. **Listen for the BEEP:** The machine goes *BEEP* and prints a little slip of paper behind glass to show it counted your choice perfectly!

And boom, you're done! You just helped run the country! 🇮🇳`,
  },
  process: {
    keywords: ['process', 'election process', 'how elections work', 'election steps', 'चुनाव प्रक्रिया', 'mcc', 'code of conduct'],
    response: `## The Fast-Track Indian Election Process 🏛️

Namaste! Running elections in a country of 1.4 billion people is a massive logistical marvel. Here is how the Election Commission of India (ECI) does it efficiently:

1. **Announcement & MCC:** The ECI announces the schedule. Instantly, the **Model Code of Conduct (MCC)** kicks in, preventing the ruling government from announcing new schemes that could influence voters.
2. **Nominations:** Candidates file their papers. The ECI scrutinizes them and releases the final list of contesting candidates.
3. **Campaigning:** Candidates vigorously campaign. This period legally ends **48 hours** before polling day (known as the 'Silence Period').
4. **Polling Day(s):** Using highly secure, offline **EVMs (Electronic Voting Machines)**, millions of citizens cast their votes.
5. **Counting Day:** Under strict security, votes are tallied efficiently, and results are declared on the very same day!

It's a beautiful, well-oiled democratic machine!`,
    eli5Response: `## The Great Election Race 🏁

Namaste! Elections are like a big, fair race to choose our leaders. 

1. **Ready, Set...:** The referee (the Election Commission) says "The race is starting!" They make sure nobody cheats.
2. **Signing Up:** Anyone who wants to be a leader signs up.
3. **The Campaign:** The candidates talk to everyone and say, "Vote for me, I will do great things!" 📣
4. **Voting Day:** All the adults go and press a button for their favorite person.
5. **Counting:** The computers count the votes super fast, and the person with the most votes wins the gold medal and becomes the leader! 🥇`,
  },
  nota: {
    keywords: ['nota', 'none of the above', 'reject', 'dislike', 'not happy'],
    response: `## Understanding NOTA (None Of The Above) 🚫

Namaste! If you go to vote and feel that **none of the candidates** are suitable, you have a powerful tool: **NOTA**.

- **Where is it?** It is the very last button on the Electronic Voting Machine (EVM).
- **What does it do?** It registers a valid vote expressing your dissatisfaction with all contesting candidates.
- **Does NOTA change the winner?** No. Under Indian law (First-Past-The-Post), even if NOTA gets the highest number of votes, the human candidate with the second-highest votes is declared the winner. 

However, high NOTA numbers send a strong, data-backed message to political parties to field better candidates next time! It empowers you to vote without compromising your standards.`,
    eli5Response: `## What is NOTA? 🚫

Namaste! Imagine your parents offer you broccoli, spinach, or Brussels sprouts for dinner, and you don't like ANY of them. 

NOTA is a button on the voting machine that basically says "No Thank You to all of them!" 

It doesn't pick a winner, but it lets the leaders know that the voters want better choices next time! It's your way of respectfully passing on the options. 😊`,
  },
  evm: {
    keywords: ['evm', 'machine', 'hack', 'secure', 'vvpat', 'electronic voting'],
    response: `## EVMs & VVPATs: Fast and Secure 🔒

Namaste! The **Electronic Voting Machine (EVM)** is the backbone of India's fast and efficient elections.

**Are they secure? Absolutely.**
- EVMs are standalone machines. They have **no internet, no Bluetooth, and no Wi-Fi**. They physically cannot be hacked remotely.
- They are built by high-security public sector units (BEL and ECIL).

**What is VVPAT?**
It stands for *Voter Verifiable Paper Audit Trail*. When you press the button on the EVM, the VVPAT prints a paper slip with your candidate's symbol. It is visible through a glass window for 7 seconds before dropping into a sealed box. This ensures your vote is exactly as you intended! 

If there's ever a dispute, the ECI can physically count the VVPAT slips to verify the EVM numbers. Efficient and transparent!`,
    eli5Response: `## The Voting Machine! 💻

Namaste! Have you ever wondered how we count millions of votes so fast? We use a super cool machine called an EVM!

It's basically a giant calculator. But it's super safe:
- It has **no internet connection**, so hackers can't get into it! 🛡️
- When you press a button, a little printer next to it prints a piece of paper showing who you voted for. You look at the paper through a glass window for 7 seconds, and then it drops into a locked box.

It's like getting a receipt at the store, proving your vote is safe and counted perfectly! ✨`,
  }
};

import { translations } from '@/lib/translations';

function getAIResponse(userMessage: string, isEli5: boolean, userAge?: number | null, language: string = 'en'): string {
  const message = userMessage.toLowerCase();

  // Find matching knowledge efficiently
  for (const [, knowledge] of Object.entries(electionKnowledge)) {
    const matched = knowledge.keywords.some((kw) => message.includes(kw));
    if (matched) {
      return isEli5 || (userAge !== null && userAge !== undefined && userAge < 16)
        ? knowledge.eli5Response
        : knowledge.response;
    }
  }

  // Highly friendly, robust default fallback
  if (isEli5) {
    return `## I'm here to help you learn! 🌟\n\nNamaste! That's a super interesting question. I'm a special assistant who knows everything about India's elections.\n\nHere is what I can teach you:\n🗳️ **How to vote** — What you do at the voting machine.\n📋 **How to register** — Getting your very own Voter ID.\n🏛️ **EVMs** — How the voting computers work!\n🚫 **NOTA** — What happens if you don't like anyone.\n\nJust ask me about any of these! I love explaining things! 😊`;
  }

  // Use the localized welcome message if it doesn't understand the query
  const t = translations[language as keyof typeof translations] || translations['en'];
  return `## VoteSaathi Assistant\n\n${t.chatWelcome}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, isEli5Mode, userAge, language } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const sanitizedMessage = message.trim().slice(0, 1000);
    const validLanguages = ['en', 'hi', 'bn', 'te', 'mr', 'ta'];
    const safeLanguage = validLanguages.includes(language) ? language : 'en';

    // If Gemini API Key is available, use real AI
    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        let systemPrompt = `You are a knowledgeable, friendly, and neutral Election Assistant for India. 
You answer questions about the Indian election process, voter registration, EVMs, eligibility, etc.
Always format your response using Markdown (headings, bullet points, bold text).
Please respond in the language code: ${safeLanguage}.`;

        if (isEli5Mode || (userAge && userAge < 16)) {
          systemPrompt += `\nThe user is a child (ELI5 mode). Explain everything using very simple words, fun emojis, and relatable analogies (like school games or picking a team captain).`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: sanitizedMessage,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.3,
          }
        });

        return NextResponse.json({
          response: response.text,
          isEli5: isEli5Mode,
        });
      } catch (geminiError) {
        console.error('Gemini API error, falling back to mock:', geminiError);
        // Fall through to mock logic on error
      }
    }
    
    // Fast, efficient response processing (Mock Fallback)
    const aiResponse = getAIResponse(sanitizedMessage, isEli5Mode, userAge, safeLanguage);

    // Optimized artificial delay: Extremely fast (100ms) to feel highly efficient, yet natural
    await new Promise((resolve) => setTimeout(resolve, 100));

    return NextResponse.json({
      response: aiResponse,
      isEli5: isEli5Mode,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request quickly. Please try again.' },
      { status: 500 }
    );
  }
}
