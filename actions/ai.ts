"use server"
// Runtime: nodejs

import { db } from "@/lib/db"
import { getServerSession } from "@/auth"
import type { z } from "zod"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { FarmAnalyzerSchema, SoilAnalyzerSchema } from "@/schemas"

export async function savePrompt(
  type: "ASSISTANT" | "FARM_ANALYZER" | "CROP_ANALYZER" | "SOIL_ANALYZER",
  prompt: string,
  response: string,
) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type,
        prompt,
        response,
      },
    })

    return { success: "Prompt saved successfully!" }
  } catch (error) {
    return { error: "Failed to save prompt." }
  }
}

export async function getPromptCount() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    const count = await db.prompt.count({
      where: { userId: session.user.id },
    })

    return { count }
  } catch (error) {
    return { error: "Failed to get prompt count." }
  }
}

export async function generateFarmersAssistantResponse(prompt: string, language: string) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    // If user is not admin, has used 3 or more prompts, and has no wallet balance
    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    // Prepare system prompt based on selected language
    let systemPrompt = "You are a helpful farming assistant with expertise in Nigerian agriculture."

    if (language !== "english") {
      systemPrompt += ` Please respond in ${language}.`
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system: systemPrompt,
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "ASSISTANT",
        prompt,
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate response." }
  }
}

export async function generateFarmAnalysis(values: z.infer<typeof FarmAnalyzerSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit (similar to above)
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    const prompt = `
      Analyze the following farm data and provide detailed recommendations:
      
      Farm Size: ${values.farmSize} hectares
      Soil Type: ${values.soilType}
      Humidity: ${values.humidity}%
      Moisture: ${values.moisture}%
      Temperature: ${values.temperature}°C
      Location: ${values.location}, Nigeria
      Additional Information: ${values.additionalInfo || "None provided"}
      
      Please provide a comprehensive analysis including:
      1. Suitable crops for this environment
      2. Recommended farming techniques
      3. Potential challenges and solutions
      4. Irrigation recommendations
      5. Fertilizer recommendations
      6. Seasonal considerations
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert agricultural analyst specializing in Nigerian farming conditions. Provide detailed, structured, and practical advice based on the farm data provided.",
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "FARM_ANALYZER",
        prompt: JSON.stringify(values),
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate farm analysis." }
  }
}

export async function generateSoilAnalysis(values: z.infer<typeof SoilAnalyzerSchema>) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit (similar to above)
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    const prompt = `
      Analyze the following soil data and provide detailed recommendations:
      
      Soil Type: ${values.soilType}
      pH Level: ${values.ph}
      Organic Matter: ${values.organicMatter}%
      Nitrogen Content: ${values.nitrogen} mg/kg
      Phosphorus Content: ${values.phosphorus} mg/kg
      Potassium Content: ${values.potassium} mg/kg
      Location: ${values.location}, Nigeria
      Additional Information: ${values.additionalInfo || "None provided"}
      
      Please provide a comprehensive analysis including:
      1. Soil quality assessment
      2. Suitable crops for this soil type
      3. Fertilizer recommendations
      4. Soil improvement strategies
      5. Potential issues and solutions
      6. Long-term soil management advice
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert soil scientist specializing in Nigerian agricultural soils. Provide detailed, structured, and practical advice based on the soil data provided.",
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "SOIL_ANALYZER",
        prompt: JSON.stringify(values),
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate soil analysis." }
  }
}

export async function generateCropAnalysis(imageDescription: string) {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    // Check if user has reached free tier limit (similar to above)
    const promptCount = await db.prompt.count({
      where: { userId: session.user.id },
    })

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return { error: "User not found!" }
    }

    if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
      return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
    }

    const prompt = `
      Analyze the following crop/plant image and provide detailed information:
      
      The image shows: ${imageDescription}
      
      Please provide a comprehensive analysis including:
      1. Identification of the crop/plant
      2. Nutritional value
      3. Growing conditions and methods
      4. Potential diseases and pest control
      5. Harvesting and storage recommendations
      6. Market value and economic importance in Nigeria
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are an expert agricultural analyst specializing in Nigerian crops and plants. Provide detailed, structured, and practical information based on the crop image described.",
    })

    // Save prompt to database
    await db.prompt.create({
      data: {
        userId: session.user.id,
        type: "CROP_ANALYZER",
        prompt: imageDescription,
        response: text,
      },
    })

    return { text }
  } catch (error) {
    return { error: "Failed to generate crop analysis." }
  }
}



// "use server"

// import { db } from "@/lib/db"
// import { auth } from "@/auth"
// import type { z } from "zod"
// import { generateText } from "ai"
// import { openai } from "@ai-sdk/openai"
// import type { FarmAnalyzerSchema, SoilAnalyzerSchema } from "@/schemas"

// // Add runtime configuration to ensure this runs in Node.js environment
// // export const runtime = "nodejs"

// export async function savePrompt(
//   type: "ASSISTANT" | "FARM_ANALYZER" | "CROP_ANALYZER" | "SOIL_ANALYZER",
//   prompt: string,
//   response: string,
// ) {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     await db.prompt.create({
//       data: {
//         userId: session.user.id,
//         type,
//         prompt,
//         response,
//       },
//     })

//     return { success: "Prompt saved successfully!" }
//   } catch (error) {
//     return { error: "Failed to save prompt." }
//   }
// }

// export async function getPromptCount() {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     const count = await db.prompt.count({
//       where: { userId: session.user.id },
//     })

//     return { count }
//   } catch (error) {
//     return { error: "Failed to get prompt count." }
//   }
// }

// export async function generateFarmersAssistantResponse(prompt: string, language: string) {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     // Check if user has reached free tier limit
//     const promptCount = await db.prompt.count({
//       where: { userId: session.user.id },
//     })

//     const user = await db.user.findUnique({
//       where: { id: session.user.id },
//     })

//     if (!user) {
//       return { error: "User not found!" }
//     }

//     // If user is not admin, has used 3 or more prompts, and has no wallet balance
//     if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
//       return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
//     }

//     // Prepare system prompt based on selected language
//     let systemPrompt = "You are a helpful farming assistant with expertise in Nigerian agriculture."

//     if (language !== "english") {
//       systemPrompt += ` Please respond in ${language}.`
//     }

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt: prompt,
//       system: systemPrompt,
//     })

//     // Save prompt to database
//     await db.prompt.create({
//       data: {
//         userId: session.user.id,
//         type: "ASSISTANT",
//         prompt,
//         response: text,
//       },
//     })

//     return { text }
//   } catch (error) {
//     return { error: "Failed to generate response." }
//   }
// }

// export async function generateFarmAnalysis(values: z.infer<typeof FarmAnalyzerSchema>) {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     // Check if user has reached free tier limit (similar to above)
//     const promptCount = await db.prompt.count({
//       where: { userId: session.user.id },
//     })

//     const user = await db.user.findUnique({
//       where: { id: session.user.id },
//     })

//     if (!user) {
//       return { error: "User not found!" }
//     }

//     if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
//       return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
//     }

//     const prompt = `
//       Analyze the following farm data and provide detailed recommendations:
      
//       Farm Size: ${values.farmSize} hectares
//       Soil Type: ${values.soilType}
//       Humidity: ${values.humidity}%
//       Moisture: ${values.moisture}%
//       Temperature: ${values.temperature}°C
//       Location: ${values.location}, Nigeria
//       Additional Information: ${values.additionalInfo || "None provided"}
      
//       Please provide a comprehensive analysis including:
//       1. Suitable crops for this environment
//       2. Recommended farming techniques
//       3. Potential challenges and solutions
//       4. Irrigation recommendations
//       5. Fertilizer recommendations
//       6. Seasonal considerations
//     `

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt,
//       system:
//         "You are an expert agricultural analyst specializing in Nigerian farming conditions. Provide detailed, structured, and practical advice based on the farm data provided.",
//     })

//     // Save prompt to database
//     await db.prompt.create({
//       data: {
//         userId: session.user.id,
//         type: "FARM_ANALYZER",
//         prompt: JSON.stringify(values),
//         response: text,
//       },
//     })

//     return { text }
//   } catch (error) {
//     return { error: "Failed to generate farm analysis." }
//   }
// }

// export async function generateSoilAnalysis(values: z.infer<typeof SoilAnalyzerSchema>) {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     // Check if user has reached free tier limit (similar to above)
//     const promptCount = await db.prompt.count({
//       where: { userId: session.user.id },
//     })

//     const user = await db.user.findUnique({
//       where: { id: session.user.id },
//     })

//     if (!user) {
//       return { error: "User not found!" }
//     }

//     if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
//       return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
//     }

//     const prompt = `
//       Analyze the following soil data and provide detailed recommendations:
      
//       Soil Type: ${values.soilType}
//       pH Level: ${values.ph}
//       Organic Matter: ${values.organicMatter}%
//       Nitrogen Content: ${values.nitrogen} mg/kg
//       Phosphorus Content: ${values.phosphorus} mg/kg
//       Potassium Content: ${values.potassium} mg/kg
//       Location: ${values.location}, Nigeria
//       Additional Information: ${values.additionalInfo || "None provided"}
      
//       Please provide a comprehensive analysis including:
//       1. Soil quality assessment
//       2. Suitable crops for this soil type
//       3. Fertilizer recommendations
//       4. Soil improvement strategies
//       5. Potential issues and solutions
//       6. Long-term soil management advice
//     `

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt,
//       system:
//         "You are an expert soil scientist specializing in Nigerian agricultural soils. Provide detailed, structured, and practical advice based on the soil data provided.",
//     })

//     // Save prompt to database
//     await db.prompt.create({
//       data: {
//         userId: session.user.id,
//         type: "SOIL_ANALYZER",
//         prompt: JSON.stringify(values),
//         response: text,
//       },
//     })

//     return { text }
//   } catch (error) {
//     return { error: "Failed to generate soil analysis." }
//   }
// }

// export async function generateCropAnalysis(imageDescription: string) {
//   const session = await auth()

//   if (!session?.user?.id) {
//     return { error: "Unauthorized" }
//   }

//   try {
//     // Check if user has reached free tier limit (similar to above)
//     const promptCount = await db.prompt.count({
//       where: { userId: session.user.id },
//     })

//     const user = await db.user.findUnique({
//       where: { id: session.user.id },
//     })

//     if (!user) {
//       return { error: "User not found!" }
//     }

//     if (session.user.role !== "ADMIN" && promptCount >= 3 && user.walletBalance <= 0) {
//       return { error: "You've reached your free tier limit. Please upgrade your account to continue." }
//     }

//     const prompt = `
//       Analyze the following crop/plant image and provide detailed information:
      
//       The image shows: ${imageDescription}
      
//       Please provide a comprehensive analysis including:
//       1. Identification of the crop/plant
//       2. Nutritional value
//       3. Growing conditions and methods
//       4. Potential diseases and pest control
//       5. Harvesting and storage recommendations
//       6. Market value and economic importance in Nigeria
//     `

//     const { text } = await generateText({
//       model: openai("gpt-4o"),
//       prompt,
//       system:
//         "You are an expert agricultural analyst specializing in Nigerian crops and plants. Provide detailed, structured, and practical information based on the crop image described.",
//     })

//     // Save prompt to database
//     await db.prompt.create({
//       data: {
//         userId: session.user.id,
//         type: "CROP_ANALYZER",
//         prompt: imageDescription,
//         response: text,
//       },
//     })

//     return { text }
//   } catch (error) {
//     return { error: "Failed to generate crop analysis." }
//   }
// }

