import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { areaOfInterest, startupName } = await req.json();
    
    if (!areaOfInterest) {
      return new Response(
        JSON.stringify({ error: "Area of interest is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userInput = startupName 
      ? `Area of Interest: ${areaOfInterest}, Preferred Startup Name: ${startupName}`
      : `Area of Interest: ${areaOfInterest}`;

    const systemPrompt = `You are a creative startup idea generator. Generate unique and innovative startup ideas based on user interests.`;
    const userPrompt = `Generate a creative startup idea based on the following user interests: ${userInput}.
Please return the response in this format:
Startup Name: ...
Description: ...
Target Audience: ...
Monetization Model: ...`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    // Parse the response
    const lines = generatedText.split('\n').filter((line: string) => line.trim());
    const parsedIdea: any = {};

    lines.forEach((line: string) => {
      if (line.includes('Startup Name:')) {
        parsedIdea.name = line.replace('Startup Name:', '').trim();
      } else if (line.includes('Description:')) {
        parsedIdea.description = line.replace('Description:', '').trim();
      } else if (line.includes('Target Audience:')) {
        parsedIdea.targetAudience = line.replace('Target Audience:', '').trim();
      } else if (line.includes('Monetization Model:')) {
        parsedIdea.monetization = line.replace('Monetization Model:', '').trim();
      }
    });

    return new Response(
      JSON.stringify({ idea: parsedIdea }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-startup-idea function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
