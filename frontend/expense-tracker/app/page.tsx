"use client";

import { FiActivity, FiArrowUpRight, FiBarChart2, FiCalendar, FiShoppingBag, FiSmartphone, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { createTransaction, fetchCategories, fetchSummary, fetchTransactions } from "./endpoints/apis";

interface Summary {
  balance: number;
  total_income: number;
  total_expenses: number;
}

interface Category {
  id: number;
  name: string;
  tone: string;
  type: "income" | "expense";
}

interface Transaction {
  id: number;
  title: string;
  amount: number;
  occurred_at: string;
  type: "income" | "expense";
  category_id?: number | null;
  note?: string | null;
}

const currency = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function Home() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrate() {
      const [summaryRes, txRes, categoryRes] = await Promise.all([
        fetchSummary(),
        fetchTransactions(),
        fetchCategories(),
      ]);
      setSummary(summaryRes);
      setTransactions(txRes);
      setCategories(categoryRes);
      setLoading(false);
    }
    hydrate();
  }, []);

  const highlight = useMemo(() => {
    return transactions.slice(0, 3);
  }, [transactions]);

  const onQuickAdd = async (type: "income" | "expense") => {
    const fallbackCategory = categories.find((cat) => cat.type === type);
    await createTransaction({
      title: type === "income" ? "Bonus" : "Coffee run",
      amount: type === "income" ? 1200 : 12,
      type,
      category_id: fallbackCategory?.id,
      note: "Created from the quick action",
    });
    const [summaryRes, txRes] = await Promise.all([fetchSummary(), fetchTransactions()]);
    setSummary(summaryRes);
    setTransactions(txRes);
  };

  return (
    <main className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Badge className="bg-emerald-500/10 text-emerald-200 inline-flex items-center gap-2">
            <FiSmartphone className="h-4 w-4" /> Mobile-first
          </Badge>
          <h1 className="text-3xl font-semibold text-slate-50 sm:text-4xl">
            Lumina — your vibrant expense cockpit
          </h1>
          <p className="max-w-2xl text-base text-slate-300">
            Track income and spending in a fast, modern interface. Optimized for phones, yet stunning on desktop with fluid
            gradients and tactile controls.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onQuickAdd("income")}>
              <FiDollarSign className="mr-2 h-4 w-4" /> Add income
            </Button>
            <Button variant="ghost" onClick={() => onQuickAdd("expense")}>
              <FiShoppingBag className="mr-2 h-4 w-4" /> Log expense
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right shadow-glow sm:min-w-[220px]">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Current balance</p>
          <p className="text-3xl font-semibold text-emerald-200">
            {loading ? "—" : currency(summary?.balance ?? 0)}
          </p>
          <p className="text-sm text-slate-300">Updated live from your ledger</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <CardHeader
            title="Cash flow"
            badge={
              <span className="flex items-center gap-2 text-xs text-slate-300">
                <FiCalendar className="h-4 w-4" /> Last 14 days
              </span>
            }
          />
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm sm:text-base">
              <FlowStat
                label="Income"
                tone="from-emerald-400 via-green-400 to-lime-300"
                amount={summary?.total_income ?? 0}
                loading={loading}
              />
              <FlowStat
                label="Expenses"
                tone="from-pink-500 via-rose-400 to-orange-300"
                amount={summary?.total_expenses ?? 0}
                loading={loading}
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm text-slate-300">Balances are recomputed on every change so your overview stays crisp.</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                <Badge className="bg-purple-500/10 text-purple-100">Realtime summary</Badge>
                <Badge className="bg-sky-500/10 text-sky-100">SQLite local-first</Badge>
                <Badge className="bg-emerald-500/10 text-emerald-100">FastAPI backend</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-5">
          <CardHeader title="Recent activity" badge={<FiArrowUpRight className="h-4 w-4 text-slate-300" />} />
          <CardContent>
            <div className="space-y-3">
              {highlight.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-slate-50">{tx.title}</p>
                    <p className="text-xs text-slate-400">{new Date(tx.occurred_at).toLocaleString()}</p>
                  </div>
                  <p className={tx.type === "income" ? "text-emerald-300" : "text-rose-300"}>
                    {tx.type === "income" ? "+" : "-"}
                    {currency(tx.amount)}
                  </p>
                </div>
              ))}
              {!highlight.length && (
                <div className="rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                  Add a quick transaction to see it glow here.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <CardHeader title="Patterns" badge={<FiBarChart2 className="h-4 w-4 text-slate-300" />} />
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner"
                  style={{ boxShadow: `0 10px 30px ${category.tone}33` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: category.tone }}>
                      {category.name}
                    </span>
                    <Badge className="bg-white/10 text-slate-200">{category.type}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Customize tones to keep categories easy to spot in mobile lists.</p>
                </div>
              ))}
              {!categories.length && (
                <p className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-slate-300">
                  Save your first category to teach the system how you like to organize purchases.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="p-5">
          <CardHeader title="Quick tips" badge={<FiTrendingUp className="h-4 w-4 text-slate-300" />} />
          <CardContent>
            <div className="space-y-3 text-sm text-slate-200">
              <Tip text="Tap the gradient buttons on mobile to add entries in seconds." />
              <Tip text="FastAPI + SQLite means lightweight hosting and instant local prototyping." />
              <Tip text="Use category tones to visually encode recurring expenses." />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function FlowStat({ label, amount, tone, loading }: { label: string; amount: number; tone: string; loading: boolean }) {
  return (
    <div className="rounded-xl bg-white/5 p-4 shadow-inner">
      <p className="text-xs uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${tone}`}>
        {loading ? "—" : currency(amount)}
      </p>
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
      <FiActivity className="mt-0.5 h-4 w-4 text-amber-300" />
      <p className="text-sm text-slate-200">{text}</p>
    </div>
  );
}
