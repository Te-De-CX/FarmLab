// components/layout/wallet/WalletPage.tsx
"use client";

import { HiOutlineArrowDown, HiOutlineArrowUp, HiOutlineQrCode } from "react-icons/hi2";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: string;
  description: string;
  date: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "credit", amount: "+$12,500", description: "Farm harvest payout", date: "Today" },
  { id: "2", type: "debit", amount: "-$4,200", description: "Fertilizer subscription", date: "Yesterday" },
  { id: "3", type: "credit", amount: "+$8,000", description: "Referral bonus", date: "Mar 25" },
  { id: "4", type: "debit", amount: "-$2,100", description: "Plan upgrade fee", date: "Mar 24" },
];

export default function WalletPage() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      {/* Balance card – softened green gradient */}
      <div
        className="relative rounded-[20px] overflow-hidden p-6 pt-8 pb-10 text-white"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #232323 35%, #0B0B0B 70%, #01ff23 500%)",
        }}
      >
        <div className="absolute top-0 right-0 w-[140px] h-[140px] rounded-full bg-white/10 -translate-y-1/2 translate-x-1/3 blur-2xl" />
        <p className="text-sm font-medium opacity-90" style={{ fontFamily: "Poppins, sans-serif" }}>
          Total Balance
        </p>
        <p className="text-[32px] font-semibold mt-2" style={{ fontFamily: "PT Serif, serif" }}>
          $134,580.00
        </p>
        <div className="flex gap-4 mt-6">
          <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-3 text-sm font-medium hover:bg-white/30 transition-colors">
            <HiOutlineArrowDown size={18} />
            Deposit
          </button>
          <button className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-3 text-sm font-medium hover:bg-white/30 transition-colors">
            <HiOutlineArrowUp size={18} />
            Withdraw
          </button>
          <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <HiOutlineQrCode size={20} />
          </button>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="flex gap-3">
        {[
          { label: "Earned this month", value: "$28,400" },
          { label: "Pending payout", value: "$6,200" },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex-1 rounded-2xl p-4 border border-white/10"
            style={{ background: "rgba(35,35,35,0.7)", backdropFilter: "blur(8px)" }}
          >
            <p className="text-[#cdcdcd] text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
              {stat.label}
            </p>
            <p className="text-white text-lg font-semibold mt-1" style={{ fontFamily: "PT Serif, serif" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Transactions list */}
      <div>
        <h3
          className="text-white text-base mb-3"
          style={{ fontFamily: "PT Serif, serif", fontWeight: 400 }}
        >
          Recent Transactions
        </h3>
        <div className="flex flex-col gap-2">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-2xl border border-white/10"
              style={{ background: "rgba(35,35,35,0.5)", backdropFilter: "blur(5px)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    tx.type === "credit" ? "bg-emerald-500/20" : "bg-red-500/20"
                  }`}
                >
                  {tx.type === "credit" ? (
                    <HiOutlineArrowDown size={18} color="#6ee7b7" />
                  ) : (
                    <HiOutlineArrowUp size={18} color="#f87171" />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
                    {tx.description}
                  </p>
                  <p className="text-[#cdcdcd] text-xs mt-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {tx.date}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold ${
                  tx.type === "credit" ? "text-emerald-400" : "text-red-400"
                }`}
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}