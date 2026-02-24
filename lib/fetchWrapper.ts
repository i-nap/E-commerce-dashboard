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
  const baseUrl = process.env.SERVER_URL || "https://fakestoreapi.com";
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
        throw new ApiError("The item you are looking for doesn't exist.", 404);
      }
      if (response.status >= 500) {
        throw new ApiError(
          "The store is having technical trouble. Please try again later.",
          500,
        );
      }
      throw new ApiError(
        "Something went wrong with the request.",
        response.status,
      );
    }

    const text = await response.text();

    if (!text) {
      throw new ApiError("No data was found.", 204);
    }

    try {
      return JSON.parse(text) as T;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (parseError) {
      throw new ApiError(
        "We received a broken response. Please refresh and try again.",
        500,
      );
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;

    console.error("Fetch Wrapper Error:", error);
    throw new ApiError(
      "Unable to connect to the store. Please check your internet.",
      503,
    );
  }
}
