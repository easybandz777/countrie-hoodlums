import { notFound } from "next/navigation";
import { listOrders, PrintfulError } from "@/lib/printful/client";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ key?: string; status?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { key, status } = await searchParams;

  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey || key !== adminKey) {
    notFound();
  }

  const filterStatus =
    status === "pending" ||
    status === "fulfilled" ||
    status === "canceled" ||
    status === "failed" ||
    status === "inprocess"
      ? status
      : "draft";

  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let errorMessage: string | null = null;

  try {
    orders = await listOrders({ status: filterStatus, limit: 50 });
  } catch (err) {
    errorMessage =
      err instanceof PrintfulError
        ? `Printful API error (${err.status}): ${err.message}`
        : err instanceof Error
          ? err.message
          : "Unknown error";
  }

  return (
    <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <header className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Printful Orders
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Review draft orders before confirming on{" "}
            <a
              href="https://www.printful.com/dashboard/default/orders"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-cream"
            >
              printful.com
            </a>
          </p>
        </div>
        <nav className="flex gap-2 text-xs uppercase tracking-wider">
          {(["draft", "pending", "inprocess", "fulfilled", "canceled"] as const).map(
            (s) => (
              <a
                key={s}
                href={`?key=${encodeURIComponent(key ?? "")}&status=${s}`}
                className={`px-3 py-1.5 border ${
                  filterStatus === s
                    ? "bg-cream text-black border-cream"
                    : "border-neutral-700 text-neutral-400 hover:border-neutral-400"
                }`}
              >
                {s}
              </a>
            )
          )}
        </nav>
      </header>

      {errorMessage && (
        <div className="mb-6 p-4 border border-red-500/40 bg-red-500/10 text-red-200 text-sm">
          {errorMessage}
        </div>
      )}

      {!errorMessage && orders.length === 0 && (
        <p className="text-neutral-500 text-sm">No orders with status &quot;{filterStatus}&quot;.</p>
      )}

      <ul className="space-y-3">
        {orders.map((order) => (
          <li
            key={order.id}
            className="border border-neutral-800 bg-neutral-950 p-4"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-neutral-400">
                    #{order.id}
                  </span>
                  <span className="px-2 py-0.5 text-xs uppercase tracking-wider bg-neutral-800 text-neutral-300">
                    {order.status}
                  </span>
                  {order.external_id && (
                    <span className="font-mono text-xs text-neutral-500">
                      stripe: {order.external_id.slice(-12)}
                    </span>
                  )}
                </div>
                <p className="text-cream text-sm">{order.recipient.name}</p>
                <p className="text-neutral-400 text-xs">
                  {order.recipient.address1}
                  {order.recipient.address2 && `, ${order.recipient.address2}`}
                  {", "}
                  {order.recipient.city}, {order.recipient.state_code}{" "}
                  {order.recipient.zip} {order.recipient.country_code}
                </p>
                <p className="text-neutral-500 text-xs">
                  {order.recipient.email}
                </p>
              </div>
              <div className="text-right">
                {order.retail_costs && (
                  <p className="text-cream font-bold">
                    {order.retail_costs.currency} {order.retail_costs.total}
                  </p>
                )}
                <a
                  href={`https://www.printful.com/dashboard/default/orders/${order.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs uppercase tracking-wider underline text-neutral-300 hover:text-cream"
                >
                  Open in Printful →
                </a>
              </div>
            </div>
            <ul className="mt-3 pt-3 border-t border-neutral-900 space-y-1 text-xs">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between text-neutral-400">
                  <span>
                    {item.quantity}× {item.name}
                  </span>
                  <span className="font-mono">${item.retail_price}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
