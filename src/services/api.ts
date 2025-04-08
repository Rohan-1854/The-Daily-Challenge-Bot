import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const CHALLENGE_CATEGORIES = {
  CODING: 'coding',
  FITNESS: 'fitness',
  LEARNING: 'learning',
  PRODUCTIVITY: 'productivity',
  MINDFULNESS: 'mindfulness'
} as const;

export interface ApiResponse {
  challenge: string;
  type: keyof typeof CHALLENGE_CATEGORIES;
}

export interface ChallengeResponse {
  text: string;
}

// Challenge types and their associated keywords
const CHALLENGE_TYPES = {
  coding: ['coding', 'program', 'developer', 'programming', 'code'],
  fitness: ['fitness', 'exercise', 'workout', 'gym', 'health'],
  learning: ['learn', 'study', 'education', 'knowledge', 'skill'],
  productivity: ['productivity', 'work', 'efficient', 'task', 'organize'],
  mindfulness: ['mindful', 'meditate', 'relax', 'peace', 'calm']
} as const;

const generateDynamicPrompt = (input: string, challengeType: string) => {
  const basePrompt = `Act as an enthusiastic ${challengeType} coach/mentor. Based on the user's request: "${input}", create an exciting and personalized challenge that:
1. Is specific and actionable
2. Can be completed in a reasonable timeframe
3. Includes clear steps or instructions
4. Provides helpful tips or resources
5. Adds an optional bonus challenge

Make it engaging and motivating, using appropriate emojis and clear formatting. Consider the user's interests and skill level based on their request.

If they mention specific interests or constraints, incorporate those into the challenge.
If they don't specify details, create a balanced challenge suitable for an intermediate level.

Start with an encouraging intro and end with a motivational closing!`;

  return basePrompt;
};

export const getChallengeResponse = async (input: string): Promise<ChallengeResponse> => {
  try {
    // Determine challenge type from input
    const type = input.toLowerCase();
    let challengeType: string | null = null;

    // Find matching challenge type based on keywords
    for (const [key, keywords] of Object.entries(CHALLENGE_TYPES)) {
      if (keywords.some(keyword => type.includes(keyword))) {
        challengeType = key;
        break;
      }
    }

    // If no specific type is matched, analyze the input for general challenge generation
    if (!challengeType) {
      challengeType = 'personal development';
    }

    // Generate dynamic prompt based on user input
    const prompt = generateDynamicPrompt(input, challengeType);

    // Make API request to Gemini
    const response = await axios({
      method: 'post',
      url: `${API_URL}?key=${API_KEY}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    });

    // Validate response format
    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    // Format and return the challenge
    const challengeText = response.data.candidates[0].content.parts[0].text;
    return {
      text: challengeText.trim()
    };

  } catch (error: any) {
    // Enhanced error logging
    console.error('API Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: API_URL,
      apiKey: API_KEY ? 'Present' : 'Missing'
    });

    // Handle specific error cases
    if (error.response?.status === 400) {
      throw new Error('Invalid request to Gemini API. Please check your input.');
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }

    // Generic error with API message if available
    if (error.response?.data?.error?.message) {
      throw new Error(`Gemini API Error: ${error.response.data.error.message}`);
    }

    // Default error
    throw new Error('Failed to generate challenge. Please try again.');
  }
};

export const generateChallenge = async (type: keyof typeof CHALLENGE_CATEGORIES): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [{
          parts: [{ 
            text: `Generate a specific, actionable ${type} challenge that can be completed today. The response should be concise and direct, focusing on a single task or goal.`
          }]
        }]
      }
    );

    return {
      challenge: response.data.candidates[0].content.parts[0].text,
      type: type
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to generate challenge');
  }
};

export const getChallengeType = (input: string): keyof typeof CHALLENGE_CATEGORIES | null => {
  const types = {
    [CHALLENGE_CATEGORIES.CODING]: ['coding', 'program', 'developer'],
    [CHALLENGE_CATEGORIES.FITNESS]: ['fitness', 'exercise', 'workout'],
    [CHALLENGE_CATEGORIES.LEARNING]: ['learn', 'study', 'education'],
    [CHALLENGE_CATEGORIES.PRODUCTIVITY]: ['productivity', 'work', 'efficient'],
    [CHALLENGE_CATEGORIES.MINDFULNESS]: ['mindful', 'meditate', 'relax']
  };

  for (const [type, keywords] of Object.entries(types)) {
    if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
      return type as keyof typeof CHALLENGE_CATEGORIES;
    }
  }
  return null;
}; 