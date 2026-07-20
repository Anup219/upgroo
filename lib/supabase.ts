import "server-only";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn("Warning: NEXT_PUBLIC_SUPABASE_URL environment variable is not defined.");
}

export async function supabaseRequest(
  path: string,
  options: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
  } = {}
) {
  const method = options.method || "GET";
  const url = `${supabaseUrl}/rest/v1/${path}`;

  const headers: Record<string, string> = {
    "apikey": supabaseServiceKey || "",
    "Authorization": `Bearer ${supabaseServiceKey || ""}`,
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (method === "POST" || method === "PATCH") {
    headers["Prefer"] = "return=representation";
  }

  const response = await fetch(url, {
    method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Supabase REST request failed [${method} ${path}]: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  // DELETE requests might not return content
  if (method === "DELETE" || response.status === 204) {
    return null;
  }

  return response.json();
}
