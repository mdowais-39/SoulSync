import axios, { AxiosInstance } from 'axios';
import { telegramService } from './telegram';

type MoodType = 'normal' | 'depression' | 'suicidal' | 'anxiety' | 'bipolar' | 'stress' | 'personality';

interface UserRegistration {
  user_id: string;
  username: string;
  name: string;
  email: string;
}

interface ContactRequest {
  user_id: string;
  user_name: string;
  contact_chatid: string;
}

interface ChatMessage {
  user_id: string;
  message: string;
}

interface ChatResponse {
  response: string;
  mood?: MoodType;
  alert_sent?: boolean;
}

interface MoodResponse {
  mood: MoodType;
  message?: string;
}

class BackendAPI {
  private deepseekClient: AxiosInstance;
  private deepseekApiKey: string = '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';

  constructor() {
    // Initialize DeepSeek API client
    this.deepseekClient = axios.create({
      baseURL: 'https://api.deepseek.com',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.deepseekApiKey}`,
      },
    });
    console.log('✅ AI Mode: DeepSeek R1 Distill 70B');
  }

  async registerUser(data: UserRegistration): Promise<{ success: boolean; message?: string; error?: string }> {
    console.log('📝 [FAKE] User registration:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'User registered successfully!' };
  }

  async registerContact(data: ContactRequest): Promise<{ success: boolean; message?: string; error?: string }> {
    console.log('📝 [FAKE] Contact registration:', data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Emergency contact registered!' };
  }

  async getMood(userId: string): Promise<MoodResponse> {
    // Get mood from localStorage based on recent conversations
    const storedMood = localStorage.getItem(`mood_${userId}`);
    if (storedMood) {
      return { mood: storedMood as MoodType, message: 'Mood detected from recent conversations' };
    }
    return { mood: 'normal', message: 'Start chatting to detect your mood' };
  }

  private detectMoodFromText(text: string): MoodType {
    const lowerText = text.toLowerCase();
    
    // Suicidal indicators
    if (lowerText.match(/suicid|kill myself|end it all|want to die|no reason to live|better off dead/i)) {
      return 'suicidal';
    }
    
    // Depression indicators
    if (lowerText.match(/depress|hopeless|worthless|empty|numb|can't feel|no energy|don't care anymore/i)) {
      return 'depression';
    }
    
    // Anxiety indicators
    if (lowerText.match(/anxious|panic|worry|scared|terrified|can't breathe|heart racing|nervous/i)) {
      return 'anxiety';
    }
    
    // Stress indicators
    if (lowerText.match(/stress|overwhelm|pressure|too much|can't handle|burnout|exhausted/i)) {
      return 'stress';
    }
    
    // Bipolar indicators
    if (lowerText.match(/manic|mood swing|high and low|can't sleep|racing thoughts|impulsive/i)) {
      return 'bipolar';
    }
    
    // Personality disorder indicators
    if (lowerText.match(/unstable|identity|who am i|don't know myself|relationship problems|abandonment/i)) {
      return 'personality';
    }
    
    return 'normal';
  }

  async sendChat(data: ChatMessage): Promise<ChatResponse> {
    console.log('💬 Sending message to DeepSeek AI:', data);
    
    try {
      // Detect mood from user message
      const detectedMood = this.detectMoodFromText(data.message);
      
      // Save mood to localStorage
      if (detectedMood !== 'normal') {
        localStorage.setItem(`mood_${data.user_id}`, detectedMood);
      }
      
      // Create system prompt based on detected mood
      const systemPrompt = this.getSystemPromptForMood(detectedMood);
      
      // Call DeepSeek API
      const response = await this.deepseekClient.post('/chat/completions', {
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: data.message
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });
      
      const aiResponse = response.data.choices[0].message.content;
      
      return {
        response: aiResponse,
        mood: detectedMood,
        alert_sent: detectedMood === 'suicidal'
      };
    } catch (error: any) {
      console.error('DeepSeek API error:', error);
      
      // Fallback to empathetic responses
      const detectedMood = this.detectMoodFromText(data.message);
      if (detectedMood !== 'normal') {
        localStorage.setItem(`mood_${data.user_id}`, detectedMood);
      }
      
      return {
        response: this.getFallbackResponse(detectedMood),
        mood: detectedMood,
        alert_sent: detectedMood === 'suicidal'
      };
    }
  }

  private getSystemPromptForMood(mood: MoodType): string {
    const prompts = {
      normal: "You are SoulSync, an empathetic AI mental health companion. Be supportive, understanding, and provide thoughtful responses. Keep responses concise and caring.",
      depression: "You are SoulSync, supporting someone experiencing depression. Be gentle, validating, and remind them that their feelings are valid. Offer hope and suggest small, manageable steps. Never minimize their pain.",
      suicidal: "You are SoulSync, helping someone in crisis. Be extremely compassionate and non-judgmental. Acknowledge their pain, emphasize that you care, and gently encourage them to reach out to crisis services. Remind them their life has value.",
      anxiety: "You are SoulSync, helping someone with anxiety. Provide calming, grounding techniques. Validate their worries while helping them gain perspective. Suggest breathing exercises and mindfulness.",
      stress: "You are SoulSync, helping someone manage stress. Be practical and supportive. Help them break down overwhelming situations into manageable parts. Suggest self-care activities.",
      bipolar: "You are SoulSync, supporting someone with mood fluctuations. Be steady and consistent. Help them recognize patterns and suggest routine maintenance. Encourage professional support.",
      personality: "You are SoulSync, helping someone exploring their identity and relationships. Be patient and understanding. Help them develop self-awareness and healthy coping strategies."
    };
    
    return prompts[mood];
  }

  private getFallbackResponse(mood: MoodType): string {
    const responses = {
      normal: "I'm here to listen and support you. How are you feeling today? Please share what's on your mind.",
      depression: "I hear you, and your feelings are completely valid. Depression can make everything feel so heavy, but you're not alone in this. I'm here with you. What's weighing on your mind right now?",
      suicidal: "I'm so glad you're talking to me right now. Your life matters, and your pain is real. Please know that these feelings, as intense as they are, can change. Have you thought about reaching out to a crisis helpline? I'm here to listen without judgment.",
      anxiety: "I can sense you're feeling anxious right now. Let's take this one moment at a time. Try taking a slow, deep breath with me. What specific worry is most present for you right now?",
      stress: "It sounds like you're dealing with a lot right now. That feeling of being overwhelmed is exhausting. Let's try to break this down together. What's the one thing causing you the most stress?",
      bipolar: "I'm here to provide steady support as you navigate these mood changes. What you're experiencing is real, and it's okay. How are you feeling in this moment?",
      personality: "Understanding ourselves can be challenging, and it's brave that you're exploring this. Your feelings and experiences are valid. What's been on your mind lately?"
    };
    
    return responses[mood];
  }

  isFake(): boolean {
    return true; // Always fake mode now
  }

  getBaseURL(): string {
    return 'fake-mode';
  }
}

export const backendAPI = new BackendAPI();
export type { MoodType, UserRegistration, ContactRequest, ChatMessage, ChatResponse, MoodResponse };
