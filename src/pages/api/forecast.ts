import type { APIRoute } from 'astro';

export const prerender = false;

const SUPABASE_URL = 'https://jzihchpmkhawegqcfbeo.supabase.co/functions/v1/get-forecast-api';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const targetUrl = new URL(SUPABASE_URL);
    url.searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });

    const response = await fetch(targetUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Forecast service unavailable', details: String(error) }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
        'Cache-Control': 'public, max-age=60',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Forecast service unavailable', details: String(error) }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
