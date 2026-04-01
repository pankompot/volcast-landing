import type { APIRoute } from 'astro';

export const prerender = false;

const SUPABASE_URL = 'https://jzihchpmkhawegqcfbeo.supabase.co/functions/v1/submit-production';

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-API-Key, Content-Type',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const apiKey = request.headers.get('X-API-Key');
    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }

    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers,
      body,
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Submit service unavailable', details: String(error) }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
