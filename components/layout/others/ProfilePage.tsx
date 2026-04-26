// components/layout/profile/ProfilePage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useTelegramUser } from "@/libs/hooks/useTelegramUser";
import {
  HiOutlinePencil,
  HiOutlineBell,
  HiOutlineShieldCheck,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineCamera,
  HiOutlineUser,
  
  HiOutlinePhone,
  HiOutlineFingerPrint,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineSparkles,
} from "react-icons/hi2";
import Modal from "./Modal";

const MOCK_PROFILE = {
//   name: "Jane Smith",
  tier: "Gold Farmer",
  avatar: "/avatar-placeholder.png",
  completedCycles: 247,
  totalPlans: 5,
  email: "Jane@farmflow.io",
  phone: "+171 812 345 6789",
};

// ---------- EDIT PROFILE ----------
function EditProfileForm({ onClose, initialName }: { onClose: () => void; initialName: string }) {
    const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(MOCK_PROFILE.email);
  const [phone, setPhone] = useState(MOCK_PROFILE.phone);
  const [avatar, setAvatar] = useState(MOCK_PROFILE.avatar);


  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to server; here we simply create a preview URL
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const handleSave = () => {
    console.log("Saved:", { name, email, phone, avatar });
    onClose();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Avatar upload */}
      <div className="flex justify-center">
        <label className="relative cursor-pointer group">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-emerald-400/30 transition-colors">
            <Image src={avatar} alt="avatar" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <HiOutlineCamera size={28} className="text-white" />
            </div>
          </div>
          <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </label>
      </div>

      {/* Inputs with leading icons */}
      {[
        { icon: <HiOutlineUser size={18} color="#cdcdcd" />, label: "Full Name", value: name, setter: setName, type: "text" },
        { icon: <HiOutlineUser size={18} color="#cdcdcd" />, label: "Email", value: email, setter: setEmail, type: "email" },
        { icon: <HiOutlinePhone size={18} color="#cdcdcd" />, label: "Phone", value: phone, setter: setPhone, type: "tel" },
      ].map((field, idx) => (
        <div key={idx}>
          <label className="text-[#b0b0b0] text-xs mb-1.5 block" style={{ fontFamily: "Poppins, sans-serif" }}>
            {field.label}
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">{field.icon}</div>
            <input
              type={field.type}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="w-full bg-[#141414] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-400/50 transition-colors"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />
          </div>
        </div>
      ))}

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-xl text-white font-semibold mt-3 transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg, #1B4332, #2D6A4F)",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 4px 14px rgba(45, 106, 79, 0.3)",
        }}
      >
        <HiOutlineSparkles size={18} />
        Save Changes
      </button>
    </div>
  );
}

// ---------- NOTIFICATIONS ----------
function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(true);
  const [harvest, setHarvest] = useState(false);
  const [promo, setPromo] = useState(false);

  const toggles = [
    {
      icon: <HiOutlineBell size={20} />,
      title: "Push Notifications",
      description: "Instant alerts for harvests and updates",
      state: push,
      setter: setPush,
    },
    {
      icon: <HiOutlineUser size={20} />,
      title: "Email Digest",
      description: "Weekly summary of your farm activity",
      state: email,
      setter: setEmail,
    },
    {
      icon: <HiOutlineSparkles size={20} />,
      title: "Harvest Reminders",
      description: "Never miss a harvest cycle deadline",
      state: harvest,
      setter: setHarvest,
    },
    {
      icon: <HiOutlineXCircle size={20} />,
      title: "Promotional Offers",
      description: "Tips, discounts, and seasonal deals",
      state: promo,
      setter: setPromo,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[#b0b0b0] text-xs mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
        Choose what you want to hear about
      </p>
      {toggles.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-emerald-400">
              {item.icon}
            </div>
            <div>
              <p className="text-white text-sm font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                {item.title}
              </p>
              <p className="text-[#888] text-xs mt-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                {item.description}
              </p>
            </div>
          </div>
          <button
            onClick={() => item.setter(!item.state)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              item.state ? "bg-emerald-500" : "bg-white/20"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                item.state ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      ))}

      <button
        onClick={onClose}
        className="self-end text-white/50 text-sm mt-3 hover:text-white transition-colors"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Done
      </button>
    </div>
  );
}

// ---------- SECURITY ----------
function SecurityInfo({ onClose }: { onClose: () => void }) {
  const [biometric, setBiometric] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <HiOutlineShieldCheck size={36} className="text-emerald-400" />
        </div>
        <p className="text-white text-lg" style={{ fontFamily: "PT Serif, serif" }}>
          Account Security
        </p>
        <p className="text-[#b0b0b0] text-xs text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
          Manage your authentication settings
        </p>
      </div>

      <div className="space-y-3">
        {/* 2FA Status */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
          <HiOutlineCheckCircle size={24} className="text-emerald-400" />
          <div>
            <p className="text-white text-sm font-medium">Two‑factor authentication</p>
            <p className="text-[#888] text-xs">Enabled via SMS</p>
          </div>
        </div>

        {/* Biometric toggle */}
        <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className={`${biometric ? "text-emerald-400" : "text-red-400"}`}>
              <HiOutlineFingerPrint size={24} />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Biometric Login</p>
              <p className="text-[#888] text-xs">Face ID / Touch ID</p>
            </div>
          </div>
          <button
            onClick={() => setBiometric(!biometric)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              biometric ? "bg-emerald-500" : "bg-white/20"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                biometric ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Change password button */}
        <button className="w-full py-3 rounded-xl border border-white/10 text-white/80 text-sm hover:bg-white/5 transition-colors">
          Change Password
        </button>
      </div>

      <button
        onClick={onClose}
        className="self-end text-white/50 text-sm hover:text-white transition-colors"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Close
      </button>
    </div>
  );
}

// ---------- HELP & SUPPORT ----------
function HelpSupport({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center mb-2">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <HiOutlineQuestionMarkCircle size={36} className="text-emerald-400" />
        </div>
      </div>
      <p className="text-white text-center text-lg" style={{ fontFamily: "PT Serif, serif" }}>
        We’re here to help
      </p>
      <p className="text-[#b0b0b0] text-xs text-center -mt-2 mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
        Get in touch through any channel below
      </p>

      <div className="space-y-3">
        <a
          href="mailto:support@farmflow.io"
          className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <HiOutlineUser size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Email Support</p>
            <p className="text-[#888] text-xs">support@farmflow.io</p>
          </div>
        </a>

        <a
          href="tel:+2348000000000"
          className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.05] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <HiOutlinePhone size={20} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Call Us</p>
            <p className="text-[#888] text-xs">+234 800 000 0000</p>
          </div>
        </a>

        <button className="w-full py-3 rounded-xl border border-white/10 text-white/80 text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
          <HiOutlineSparkles size={18} />
          FAQs
        </button>
      </div>

      <button
        onClick={onClose}
        className="self-end text-white/50 text-sm mt-2 hover:text-white transition-colors"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        Close
      </button>
    </div>
  );
}

// ---------- MAIN PROFILE PAGE ----------
export default function ProfilePage() {
  const [modal, setModal] = useState<{
    type: "edit" | "notifications" | "security" | "help" | null;
  }>({ type: null });

  const closeModal = () => setModal({ type: null });
    const telegramUser = useTelegramUser();

  // Build the display name from Telegram (fallback to mock)
  const displayName = telegramUser
    ? `${telegramUser.first_name ?? ""} ${telegramUser.last_name ?? ""}`.trim()
    : "Jane Smith";  

  const settingsItems = [
    {
        id: "edit",
        icon: <HiOutlinePencil size={22} color="white" />,
        label: "Edit Profile",
        modalTitle: "Edit Profile",
        component: <EditProfileForm onClose={closeModal} initialName={displayName} />,
    },
    {
      id: "notifications",
      icon: <HiOutlineBell size={22} color="white" />,
      label: "Notifications",
      modalTitle: "Notifications",
      component: <NotificationsPanel onClose={closeModal} />,
    },
    {
      id: "security",
      icon: <HiOutlineShieldCheck size={22} color="white" />,
      label: "Security",
      modalTitle: "Security",
      component: <SecurityInfo onClose={closeModal} />,
    },
    {
      id: "help",
      icon: <HiOutlineQuestionMarkCircle size={22} color="white" />,
      label: "Help & Support",
      modalTitle: "Help & Support",
      component: <HelpSupport onClose={closeModal} />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 pb-4">
        {/* Profile card – unchanged from before but still refined */}
        <div
          className="relative rounded-[24px] overflow-hidden p-6"
          style={{
            background: "linear-gradient(135deg, #2a2a2a 0%, #232323 100%)",
            boxShadow: "inset 0px 4px 15px rgba(250,250,250,0.05)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full border-2 border-white/10 overflow-hidden">
              <Image
                src={MOCK_PROFILE.avatar}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-white text-xl" style={{ fontFamily: "PT Serif, serif" }}>
                {displayName}
              </p>
              <p className="text-[#cdcdcd] text-sm mt-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {MOCK_PROFILE.tier}
              </p>
            </div>
          </div>
          <div className="flex gap-6 mt-5">
            <div>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "PT Serif, serif" }}>
                {MOCK_PROFILE.completedCycles}
              </p>
              <p className="text-[#cdcdcd] text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                Cycles Completed
              </p>
            </div>
            <div>
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "PT Serif, serif" }}>
                {MOCK_PROFILE.totalPlans}
              </p>
              <p className="text-[#cdcdcd] text-xs" style={{ fontFamily: "Poppins, sans-serif" }}>
                Active Plans
              </p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="flex flex-col gap-2">
          {settingsItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setModal({ type: item.id as any })}
              className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-[rgba(35,35,35,0.5)] backdrop-blur-sm hover:bg-white/5 transition-all active:scale-[0.98] group"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                {item.icon}
              </div>
              <span className="text-white text-sm" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          className="flex items-center gap-4 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all active:scale-[0.98]"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-red-500/10">
            <HiOutlineArrowRightOnRectangle size={22} color="#f87171" />
          </div>
          <span className="text-red-300 text-sm font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
            Log Out
          </span>
        </button>
      </div>

      {/* Dynamically render the modal */}
      {modal.type && (
        <Modal
          isOpen={!!modal.type}
          onClose={closeModal}
          title={settingsItems.find((i) => i.id === modal.type)?.modalTitle || ""}
        >
          {settingsItems.find((i) => i.id === modal.type)?.component}
        </Modal>
      )}
    </>
  );
}