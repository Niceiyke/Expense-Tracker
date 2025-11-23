const BASEURL = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000/api";

export async function fetchSummary() {
  try {
    const res = await fetch(`${BASEURL}/transactions/summary`, { cache: "no-store" });
    if (!res.ok) return { balance: 0, total_income: 0, total_expenses: 0 };
    return res.json();
  } catch (error) {
    console.error("Failed to fetch summary", error);
    return { balance: 0, total_income: 0, total_expenses: 0 };
  }
}

export async function fetchTransactions() {
  try {
    const res = await fetch(`${BASEURL}/transactions`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    return [];
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${BASEURL}/categories`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return [];
  }
}

// Legacy compatibility helpers
export async function getCategories() {
  return fetch(`${BASEURL}/categories`, { cache: "no-store" });
}

export async function AddCategory(payload: { name: string; tone?: string; type: string }) {
  const normalizedType = payload.type === "income" ? "income" : "expense";
  return fetch(`${BASEURL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      tone: payload.tone,
      type: normalizedType,
    }),
  });
}

export async function createTransaction(payload: {
  title: string;
  amount: number;
  type: "income" | "expense";
  category_id?: number;
  note?: string;
}) {
  const res = await fetch(`${BASEURL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function AddExpenses(payload: { category?: string; description: string; amount: number; date?: Date; user?: string | null }) {
  return fetch(`${BASEURL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.description || "Expense",
      amount: Number(payload.amount),
      type: "expense",
      category_id: payload.category ? Number(payload.category) : undefined,
      note: payload.description,
    }),
  });
}

export async function AddIncome(payload: { category?: string; description: string; amount: number; date?: Date; user?: string | null }) {
  return fetch(`${BASEURL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: payload.description || "Income",
      amount: Number(payload.amount),
      type: "income",
      category_id: payload.category ? Number(payload.category) : undefined,
      note: payload.description,
    }),
  });
}

export async function getUserExpenses() {
  const data = await fetchTransactions();
  const filtered = Array.isArray(data) ? data.filter((tx) => tx.type === "expense") : [];
  return new Response(JSON.stringify(filtered), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function getUserIncome() {
  const data = await fetchTransactions();
  const filtered = Array.isArray(data) ? data.filter((tx) => tx.type === "income") : [];
  return new Response(JSON.stringify(filtered), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function LoginUser(_: { email: string; password: string }) {
  return new Response(JSON.stringify({ jwt: "demo-token" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
