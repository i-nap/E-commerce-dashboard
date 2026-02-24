export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function fetchWrapper<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.SERVER_URL;
  const url = `${baseUrl}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Product or category not found at: ${url}`);
      } else {
        console.error(`API Error: ${response.status}`);
      }

      throw new ApiError("Failed to fetch from API", response.status);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("Fetch Wrapper Error:", error);
    throw error;
  }
}
