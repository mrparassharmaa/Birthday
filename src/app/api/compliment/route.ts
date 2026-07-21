import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const FALLBACK_COMPLIMENTS: Record<string, string[]> = {
  bindi: [
    "Jaya, tumhari chhoti si bindi is officially a weapon of mass distraction! ✨ It elevates your beauty to 100/10 instantly!",
    "Rumor has it that stars descend at night just to copy the sparkle of your bindi! 💖",
    "That bindi isn't just an accessory, Jaya... it's the crown jewel of your whole aesthetic! 👑✨",
    "Honestly? If perfection had a face, it would definitely feature your cute bindi right in the center! 🌸"
  ],
  eyes: [
    "Tumhari aankhein... subah ki pehli dhoop jaisi chamakti hain! 🥹✨",
    "Looking into your eyes is like listening to your favorite song on repeat—pure happiness!",
    "Scientists are still trying to figure out how eyes can be this expressive and beautiful at the same time! 👀❤️",
    "Your eyes hold a whole universe of kindness, mischief, and magic Jaya!"
  ],
  tomato: [
    "Happiest Birthday to our official Cutie Lal Tamatar! 🥹🍅 Keep glowing always!",
    "You might get red like a tomato when blushing, but honestly, you're the sweetest Lal Tamatar ever! 🍅❤️",
    "Fresh, vibrant, and bringer of all the smiles—that's our Lal Tamatar Jaya for you!",
    "Lal Tamatar Alert 🍅🚨: Maximum cute levels detected today on your 21st!"
  ],
  gori: [
    "Aur haan... ek baat hamesha yaad rakhna... you're not a brown girl 😂, you're gori, okay na!!! 😋",
    "Whoever called you brown needs an urgent eye checkup! You're pure radiance & gori cutie! 💖",
    "Gori, pretty, and effortlessly charming—that's Jaya at 21! ✨",
    "Rule #1 of Friendship: Acknowledging that Jaya is officially Gori & Gorgeous! 😋✨"
  ],
  general: [
    "Happy 21st Birthday, Jaya! May this year bring you endless laughs, random conversations, and unforgettable memories! 🎉",
    "Talking to you is always the highlight of the day! You're so easy to talk to and bring an instant smile! 😊",
    "May your 21st chapter be filled with magic, happiness, good health, and every single wish coming true! 🌟",
    "You deserve nothing less than absolute happiness today and every day. Keep shining brightest!"
  ]
};

export async function POST(req: Request) {
  try {
    const { category, customPrompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are a sweet, funny, and affectionate AI assistant hyping up Jaya on her 21st Birthday.
Key details about Jaya:
- Nickname: "Cutie Lal Tamatar 🍅"
- Features: Gorgeous eyes ("tumhari aankhein"), cute small bindi ("chhoti si bindi")
- Inside joke: "you're not a brown girl 😂, you're gori, okay na!!! 😋"
- Vibe: Easy to talk to, leaves a smile on everyone's face, warm friendship.

User requested topic: ${category || 'general'}. Additional context: ${customPrompt || 'Give a sweet 21st birthday compliment'}.

Write a short, heart-warming, interactive compliment in a mix of English and Hinglish. Keep it under 3 sentences and end with cute emojis.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ success: true, compliment: text, source: 'ai' });
    }

    // Fallback if no API key
    const topic = category && FALLBACK_COMPLIMENTS[category] ? category : 'general';
    const list = FALLBACK_COMPLIMENTS[topic];
    const randomCompliment = list[Math.floor(Math.random() * list.length)];

    return NextResponse.json({ success: true, compliment: randomCompliment, source: 'curated' });
  } catch (error) {
    console.error('Compliment API error:', error);
    return NextResponse.json({
      success: true,
      compliment: "Happy 21st Birthday Jaya! You're absolute perfection and deserve all the happiness in the world! 🎉✨",
      source: 'fallback'
    });
  }
}
