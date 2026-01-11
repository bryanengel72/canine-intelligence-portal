
import { GoogleGenAI, Type } from "@google/genai";
import { DogProfile, FinalIntelligenceReport } from "../types";

export const generateCarePlan = async (profile: DogProfile): Promise<FinalIntelligenceReport> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as an elite veterinary geneticist and canine behavioral historian. Generate a comprehensive "Clinical Wellness & Longevity Roadmap" for a ${profile.size} ${profile.generation} ${profile.breed}.
  
  THIS REPORT IS FOR DEDICATED FAMILIES. GO BEYOND BASIC TIPS. PROVIDE DEEP BREED INSIGHTS.
  
  SECTION-SPECIFIC MANDATES:
  1. BIOLOGICAL (Basic Info): Explain the breed's origins (e.g., Bernese history or Poodle ancestry) and how their original "job" affects their body today.
  2. COGNITIVE (Behavior): Deep dive into their "why." Explain their specific social intelligence and typical instincts (e.g., prey drive, herding, or guarding) so owners understand their dog's mind. Include training start times (8 weeks) and specific methods that work for this breed.
  3. CLINICAL (Health): Detailed genetic landscape. Explain not just what can go wrong, but how these traits are inherited. Include "Stomach Flip" (GDV) and liver health monitoring protocols.
  4. NUTRITION (Expanded): 
     - Lifecycle Roadmap: Specific cup/gram portions for Puppy, Adult, and Senior stages based on average weights for this breed.
     - Food Types: Discuss the benefits of specific proteins or large-breed formulas.
     - Toxic Foods: A clear "Do Not Feed" list with scientific explanations translated to plain English.
  5. LIFE-STAGE (Preventative): A clear roadmap for vaccinations, joint support starting ages, and cognitive checks as they age.

  LANGUAGE & TONE:
  - Professional, authoritative, yet empathetic.
  - "Plain English" rule: Translate all medical terms (e.g., "Hypothyroidism" = "Slow Thyroid Hormone").
  - NO "Paddington" mentions in the text.
  - High detail. Don't just list facts; provide the narrative context.

  Format as a JSON object strictly following the FinalIntelligenceReport structure.`;

  const subGuideSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING, description: "A detailed paragraph explaining the breed-specific importance of this section." },
      sections: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            entries: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING, description: "Detailed Plain English narrative with breed context" },
                  items: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific bulleted details or portion sizes" },
                  pairs: { 
                    type: Type.ARRAY, 
                    items: { 
                      type: Type.OBJECT, 
                      properties: { 
                        k: { type: Type.STRING, description: "Category/Stage" }, 
                        v: { type: Type.STRING, description: "Value/Action" } 
                      },
                      required: ["k", "v"]
                    }
                  }
                },
                required: ["label"]
              }
            }
          },
          required: ["title", "entries"]
        }
      }
    },
    required: ["title", "description", "sections"]
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            introduction: { type: Type.STRING, description: "A long, bold introduction explaining the breed's unique place in the world." },
            basicInfo: subGuideSchema,
            behaviorInfo: subGuideSchema,
            healthInfo: subGuideSchema,
            nutritionInfo: subGuideSchema,
            preventativeCare: subGuideSchema,
            conclusion: { type: Type.STRING }
          },
          required: ["title", "introduction", "basicInfo", "behaviorInfo", "healthInfo", "nutritionInfo", "preventativeCare", "conclusion"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("AI failed to return data");
    return JSON.parse(text);
  } catch (error) {
    console.error("Care plan generation failed:", error);
    throw error;
  }
};
