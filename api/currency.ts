import { ApiError, ErrorResult } from "../constants/types";

const API = "https://api.frankfurter.dev/v2";
export async function fetchRate(quote: string): Promise<number> {
  if (quote.toUpperCase() === "USD") return 1;

  await new Promise((resolve) => setTimeout(resolve, 500));

  let res: Response;
  try {
    res = await fetch(`${API}/rate/usd/${quote.toLowerCase()}`);
  } catch (e) {
    throw new ApiError(500, e instanceof Error ? e.message : "Network error");
  }

  if (!res.ok) {
    let status = res.status;
    let message = `Request failed with status ${res.status}`;
    try {
      const errorBody = (await res.json()) as ErrorResult;
      if (errorBody?.status) status = errorBody.status;
      if (errorBody?.message) message = errorBody.message;
    } catch (e) {
      throw new ApiError(500, e instanceof Error ? e.message : "Network error");
    }
    throw new ApiError(status, message);
  }
  const data = await res.json();
  return data.rate as number;
}
