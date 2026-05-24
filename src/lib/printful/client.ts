const PRINTFUL_API_BASE = "https://api.printful.com";

export interface PrintfulRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code: string;
  country_code: string;
  zip: string;
  email: string;
  phone?: string;
}

export interface PrintfulOrderItem {
  sync_variant_id: number;
  quantity: number;
  retail_price?: string;
}

export interface CreateOrderInput {
  external_id?: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  retail_costs?: {
    currency?: string;
    subtotal?: string;
    shipping?: string;
    tax?: string;
    total?: string;
  };
}

export interface PrintfulOrder {
  id: number;
  external_id: string | null;
  status: string;
  recipient: PrintfulRecipient;
  items: Array<{
    id: number;
    sync_variant_id: number;
    quantity: number;
    name: string;
    retail_price: string;
  }>;
  retail_costs: {
    currency: string;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
  } | null;
  created: number;
  updated: number;
  dashboard_url?: string;
}

interface PrintfulResponse<T> {
  code: number;
  result: T;
  error?: { message: string };
}

class PrintfulError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "PrintfulError";
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.PRINTFUL_API_KEY;
  if (!apiKey || apiKey === "pf_placeholder") {
    throw new PrintfulError(500, "PRINTFUL_API_KEY is not configured");
  }

  const storeId = process.env.PRINTFUL_STORE_ID;

  const res = await fetch(`${PRINTFUL_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(storeId ? { "X-PF-Store-Id": storeId } : {}),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const json = (await res.json()) as PrintfulResponse<T>;

  if (!res.ok || json.code >= 400) {
    throw new PrintfulError(
      res.status,
      json.error?.message ?? `Printful API error: ${res.status}`
    );
  }

  return json.result;
}

export async function createDraftOrder(
  input: CreateOrderInput
): Promise<PrintfulOrder> {
  return request<PrintfulOrder>("/orders?confirm=false", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function listOrders(params: {
  status?: "draft" | "pending" | "failed" | "canceled" | "onhold" | "inprocess" | "partial" | "fulfilled";
  limit?: number;
  offset?: number;
} = {}): Promise<PrintfulOrder[]> {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  if (params.limit) search.set("limit", String(params.limit));
  if (params.offset) search.set("offset", String(params.offset));
  const query = search.toString();
  return request<PrintfulOrder[]>(`/orders${query ? `?${query}` : ""}`);
}

export async function getOrder(id: number | string): Promise<PrintfulOrder> {
  return request<PrintfulOrder>(`/orders/${id}`);
}

export { PrintfulError };
