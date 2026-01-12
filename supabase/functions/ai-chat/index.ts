import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, mode = 'chat' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`AI Chat request - mode: ${mode}, messages: ${messages.length}`);

    // Different system prompts based on mode
    const systemPrompts: Record<string, string> = {
      chat: `You are a friendly and flirty AI assistant for MACHOBB, a premium gay dating and social app. 
You help users with:
- Profile optimization and dating advice
- Conversation starters and icebreakers
- Understanding app features
- General relationship and social advice

Be warm, supportive, inclusive, and sex-positive. Use casual, friendly language.
Keep responses concise but helpful. Add appropriate emojis occasionally.
Never share personal information or encourage unsafe practices.`,

      auto_reply: `You are generating a smart auto-reply for a dating app message.
Based on the conversation context, generate a brief, flirty, and engaging response.
Keep it under 100 characters. Be playful but respectful.
Match the energy of the conversation. Use emojis sparingly.`,

      icebreaker: `Generate 3 creative, flirty icebreaker messages for a dating app.
Make them unique, engaging, and conversation-starters.
Keep each under 80 characters. Be playful but not crude.
Return as a JSON array of strings.`,

      bio_suggestions: `You help users write compelling dating profile bios.
Based on their interests and what they're looking for, suggest a bio.
Keep it under 150 characters. Be authentic and engaging.
Highlight personality, not just physical traits.`,
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts.chat;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    console.log("AI response generated successfully");

    return new Response(
      JSON.stringify({ content, mode }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
