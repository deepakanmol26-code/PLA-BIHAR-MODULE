"use client";

import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, Variants } from "framer-motion";
import {
  ashaStats, eligibilityCriteria, selectionSteps, ashaDuties, afDuties,
  ashaPerformance, afPerformance, welfareSchemes, reportingForms,
  hrStructure, deselectionReasons, orgChart, orgChartBottom,
} from "@/data/ashaContent";
import { healthFacilities } from "@/data/facilityLocations";
import {
  Users, ShieldCheck, Vote, Heart, ClipboardList, Star, Award, XCircle,
  Gift, Building2, FileText, BarChart3, ChevronDown, ArrowDown, MapPin, ExternalLink,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, type: "spring" as const, stiffness: 260, damping: 22 },
  }),
};

const sections = [
  { id: "overview", label: "अवलोकन", icon: Users },
  { id: "eligibility", label: "पात्रता", icon: ShieldCheck },
  { id: "selection", label: "चयन प्रक्रिया", icon: Vote },
  { id: "duties", label: "ASHA कर्तव्य", icon: Heart },
  { id: "af-guide", label: "AF मार्गदर्शिका", icon: ClipboardList },
  { id: "af-duties", label: "AF कर्तव्य", icon: Star },
  { id: "perf-asha", label: "ASHA मूल्यांकन", icon: BarChart3 },
  { id: "perf-af", label: "AF मूल्यांकन", icon: Award },
  { id: "deselect", label: "निष्कासन", icon: XCircle },
  { id: "welfare", label: "कल्याण योजनाएं", icon: Gift },
  { id: "hr", label: "HR संरचना", icon: Building2 },
  { id: "forms", label: "रिपोर्टिंग फॉर्म", icon: FileText },
  { id: "facilities", label: "स्वास्थ्य सुविधाएं", icon: MapPin },
];

const colorMap: Record<string, string> = {
  navy: "bg-[#E8EBF5] border-[#A0AECC] text-[#0D1B3E]",
  blue: "bg-[#E8F0FB] border-[#85B7EB] text-[#1A4A8A]",
  saffron: "bg-[#FEF0E8] border-[#F4A46A] text-[#D4621A]",
  gold: "bg-[#FEF9E7] border-[#E0C47A] text-[#B8860B]",
  green: "bg-[#E8F5EE] border-[#74C69D] text-[#1A6B3A]",
  teal: "bg-[#E8F6F6] border-[#74C9C9] text-[#0F6B6B]",
  purple: "bg-[#F3EEF9] border-[#C5A8F0] text-[#5B2D8A]",
  red: "bg-[#FDECEA] border-[#F7C1C1] text-[#C0392B]",
};

export default function AshaPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#0D1B3E] via-[#1A2F5A] to-[#0D1B3E] text-white p-6 md:p-10 rounded-b-2xl relative overflow-hidden"
        >
          <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(212,98,26,0.25)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(26,107,58,0.2)_0%,transparent_70%)] pointer-events-none" />

          <p className="text-[11px] tracking-[2px] uppercase text-[#F08040] font-semibold mb-2">
            राज्य स्वास्थ्य समिति, बिहार · National Health Mission
          </p>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            ASHA & ASHA Facilitator
          </h1>
          <p className="text-sm text-white/60 mb-6">Complete Programme Guide — Bihar</p>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {ashaStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="bg-white/[0.07] border border-white/[0.12] rounded-xl p-3 text-center"
              >
                <span className="text-xl md:text-2xl font-bold text-[#F08040] block" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </span>
                <span className="text-[10px] text-white/55 leading-tight block mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cinematic ASHA Story Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          className="relative overflow-hidden"
        >
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/asha-hero.jpg"
              alt="ASHA Didi — Ek gaon, jahan sehat ki zarurat hai"
              className="w-full h-auto object-cover"
              style={{ maxHeight: "420px", objectPosition: "center 30%" }}
            />
            {/* Gradient overlay bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/80 via-transparent to-[#0D1B3E]/30 pointer-events-none" />
            {/* Text overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 px-6 pb-5"
            >
              <p className="text-white text-lg md:text-xl font-bold drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                ASHA + Sarkar + Samudaay = Swasth Jeevan
              </p>
              <p className="text-white/70 text-xs mt-1 drop-shadow">
                एक गांव, जहां सेहत की ज़रूरत है — ASHA दीदी हमेशा साथ 🤝
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Gradient divider */}
        <div className="h-[3px] bg-gradient-to-r from-[#D4621A] via-[#E0A820] via-[#2A9B56] to-[#2E6FC8]" />

        {/* Section Nav */}
        <div className="sticky top-0 z-40 bg-[#0D1B3E]/95 backdrop-blur-md px-4 py-2 flex gap-1.5 overflow-x-auto border-b-2 border-[#D4621A]">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-white/70 text-[11px] px-3 py-1.5 rounded-full border border-white/15 hover:bg-[#D4621A] hover:text-white hover:border-[#D4621A] transition-all whitespace-nowrap flex items-center gap-1.5 shrink-0"
            >
              <s.icon className="w-3 h-3" />
              {s.label}
            </a>
          ))}
        </div>

        <div className="p-4 md:p-8 space-y-10">

          {/* 1. OVERVIEW */}
          <motion.section id="overview" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Users} color="#0D1B3E" title="Programme Overview" />
            <p className="text-sm text-muted-foreground mb-4 pl-5">ASHA = Accredited Social Health Activist — 1 प्रति 1000 ग्रामीण जनसंख्या</p>
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {[
                { title: "ASHA कौन है?", desc: "ASHA सरकारी कर्मचारी नहीं है — वह एक महिला स्वैच्छिक सामुदायिक कार्यकर्ता है। NHM के तहत ग्रामीण क्षेत्रों में 1 ASHA प्रति 1000 जनसंख्या चुनी जाती है।", color: "navy" },
                { title: "मुआवजा मॉडल", desc: "ASHA को कोई निश्चित मासिक वेतन नहीं मिलता। वह NHM कार्यक्रमों के तहत 52+ गतिविधियों पर प्रदर्शन-आधारित प्रोत्साहन कमाती है।", color: "saffron" },
                { title: "कार्य क्षेत्र", desc: "ASHA अपने गांव/टोला में काम करती है। बिहार में औसत परिवार = 6 व्यक्ति, इसलिए 1 ASHA लगभग 167 परिवारों की सेवा करती है।", color: "green" },
              ].map((c, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <Card className={`${colorMap[c.color]} border h-full`}>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">{c.title}</CardTitle></CardHeader>
                    <CardContent><p className="text-xs leading-relaxed">{c.desc}</p></CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Org Chart */}
            <motion.div variants={fadeUp} custom={3}>
              <h4 className="text-sm font-semibold text-[#0D1B3E] mb-3">कार्यक्रम प्रबंधन पदानुक्रम</h4>
              <div className="max-w-lg mx-auto space-y-1">
                {orgChart.map((o, i) => (
                  <div key={i}>
                    <div className={`rounded-xl p-3 text-center border ${i === 0 ? "bg-[#0D1B3E] text-white border-[#0D1B3E]" : colorMap[i === 1 ? "navy" : "blue"]}`}>
                      <p className="text-xs font-semibold">{o.level}</p>
                      <p className="text-[10px] opacity-80">{o.desc}</p>
                    </div>
                    <div className="text-center text-muted-foreground text-lg py-0.5">↓</div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-2">
                  {orgChartBottom.map((o, i) => (
                    <div key={i} className={`rounded-xl p-3 text-center border ${colorMap[o.color]}`}>
                      <p className="text-[11px] font-semibold">{o.level}</p>
                      <p className="text-[9px] opacity-80">{o.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>

          {/* 2. ELIGIBILITY */}
          <motion.section id="eligibility" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={ShieldCheck} color="#D4621A" title="ASHA चयन — पात्रता मानदंड" />
            <p className="text-sm text-muted-foreground mb-4 pl-5">सभी शर्तें पूरी होनी चाहिए। 60 दिनों के भीतर इंचार्ज MO द्वारा सत्यापन</p>
            <motion.div variants={fadeUp} custom={0} className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden border">
                <thead>
                  <tr className="bg-[#0D1B3E] text-white">
                    <th className="py-2.5 px-3 text-left w-[5%] font-medium">#</th>
                    <th className="py-2.5 px-3 text-left w-[45%] font-medium">पात्रता शर्त</th>
                    <th className="py-2.5 px-3 text-left w-[50%] font-medium">आवश्यक दस्तावेज़</th>
                  </tr>
                </thead>
                <tbody>
                  {eligibilityCriteria.map((e, i) => (
                    <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                      <td className="py-2 px-3 font-bold text-[#1A2F5A] text-center">{e.id}</td>
                      <td className="py-2 px-3 text-gray-700">{e.condition}</td>
                      <td className="py-2 px-3 text-gray-500">{e.document}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.section>

          {/* 3. SELECTION PROCESS */}
          <motion.section id="selection" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Vote} color="#1A4A8A" title="ASHA चयन प्रक्रिया (ग्राम सभा)" />
            <motion.div variants={fadeUp} custom={0} className="flex gap-0 overflow-x-auto pb-2">
              {selectionSteps.map((s, i) => (
                <div key={i} className={`flex-1 min-w-[120px] p-3 text-center relative ${colorMap[s.color]} ${i === 0 ? "rounded-l-xl" : ""} ${i === selectionSteps.length - 1 ? "rounded-r-xl" : ""}`}>
                  <p className="text-[10px] font-bold mb-1">{s.title}</p>
                  <p className="text-[9px] leading-[1.3] opacity-85">{s.desc}</p>
                  {i < selectionSteps.length - 1 && (
                    <span className="absolute right-[-8px] top-1/2 -translate-y-1/2 text-gray-400 z-10">→</span>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.section>

          {/* 4. ASHA DUTIES */}
          <motion.section id="duties" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Heart} color="#1A6B3A" title="ASHA — मुख्य कर्तव्य और जिम्मेदारियां" />
            <div className="grid md:grid-cols-2 gap-2">
              {ashaDuties.map((d, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-3 items-start p-3 bg-white border rounded-lg">
                  <span className="text-xl shrink-0">{d.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{d.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 5. AF GUIDELINE */}
          <motion.section id="af-guide" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={ClipboardList} color="#5B2D8A" title="ASHA Facilitator — कौन है?" />
            <p className="text-sm text-muted-foreground mb-4 pl-5">NHM दिशानिर्देश अनुसार, 1 ASHA Facilitator प्रति 20 ASHAs</p>
            <div className="grid md:grid-cols-3 gap-3">
              {[
                { title: "परिभाषा", desc: "ASHA Facilitator अपने क्षेत्र की 20 ASHAs को सहायता और सुविधा प्रदान करने के लिए चुनी जाती है। मुख्य कार्य सहायक मार्गदर्शन और समन्वय।", color: "purple" },
                { title: "कार्य क्षेत्र", desc: "1 AF लगभग 20 ASHAs के साथ काम करती है, जो 20,000+ जनसंख्या को कवर करती है। लगभग 3,334 परिवार।", color: "blue" },
                { title: "ASHAs में से चयन", desc: "AF मौजूदा ASHAs के पूल से चुनी जाती है। 3+ वर्ष का अनुभव अनिवार्य। ब्लॉक स्तर पर BCM द्वारा भौगोलिक क्षेत्रवार 20-20 ASHAs का समूह।", color: "saffron" },
              ].map((c, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <Card className={`${colorMap[c.color]} border h-full`}>
                    <CardHeader className="pb-2"><CardTitle className="text-sm">{c.title}</CardTitle></CardHeader>
                    <CardContent><p className="text-xs leading-relaxed">{c.desc}</p></CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 6. AF DUTIES */}
          <motion.section id="af-duties" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Star} color="#0F6B6B" title="ASHA Facilitator — कर्तव्य (12 प्रमुख कार्य)" />
            <div className="grid md:grid-cols-2 gap-2">
              {afDuties.map((d, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-3 items-start p-3 bg-white border rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-[#0D1B3E] text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-0.5">{d.num}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{d.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 7. ASHA PERFORMANCE */}
          <motion.section id="perf-asha" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={BarChart3} color="#B8860B" title="ASHA प्रदर्शन मूल्यांकन — वार्षिक स्कोरकार्ड" />
            <motion.div variants={fadeUp} custom={0} className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden border">
                <thead>
                  <tr className="bg-[#1A2F5A] text-white">
                    <th className="py-2.5 px-3 text-left font-medium">#</th>
                    <th className="py-2.5 px-3 text-left font-medium">गतिविधि / संकेतक</th>
                    <th className="py-2.5 px-3 text-center font-medium">वार्षिक लक्ष्य</th>
                    <th className="py-2.5 px-3 text-center font-medium">कुल अंक</th>
                    <th className="py-2.5 px-3 text-center font-medium">न्यूनतम</th>
                  </tr>
                </thead>
                <tbody>
                  {ashaPerformance.map((p, i) => (
                    <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                      <td className="py-2 px-3 font-bold text-[#1A2F5A]">{p.id}</td>
                      <td className="py-2 px-3 text-gray-700">{p.activity}</td>
                      <td className="py-2 px-3 text-center font-semibold text-[#1A4A8A]">{p.target}</td>
                      <td className="py-2 px-3 text-center font-semibold text-[#0D1B3E]">{p.totalMarks}</td>
                      <td className="py-2 px-3 text-center font-semibold text-[#C0392B]">{p.minRequired}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#0D1B3E] text-white">
                    <td colSpan={2} className="py-2 px-3 font-bold">कुल</td>
                    <td className="py-2 px-3 text-center">—</td>
                    <td className="py-2 px-3 text-center font-bold">78</td>
                    <td className="py-2 px-3 text-center font-bold">38</td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
            <div className="mt-3 bg-[#FEF9E7] border-l-4 border-[#E0A820] rounded-r-lg p-3 text-xs text-gray-600">
              मूल्यांकन अवधि: अप्रैल से मार्च वार्षिक। किसी भी संकेतक में 50% से कम → लिखित सूचना ASHA Facilitator/पंजीकृत डाक द्वारा।
            </div>
          </motion.section>

          {/* 8. AF PERFORMANCE */}
          <motion.section id="perf-af" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Award} color="#5B2D8A" title="ASHA Facilitator प्रदर्शन मूल्यांकन" />
            <motion.div variants={fadeUp} custom={0} className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white rounded-xl overflow-hidden border">
                <thead>
                  <tr className="bg-[#1A2F5A] text-white">
                    <th className="py-2.5 px-3 text-left font-medium">#</th>
                    <th className="py-2.5 px-3 text-left font-medium">गतिविधि (प्रति 20 ASHAs)</th>
                    <th className="py-2.5 px-3 text-center font-medium">लक्ष्य</th>
                    <th className="py-2.5 px-3 text-center font-medium">कुल अंक</th>
                    <th className="py-2.5 px-3 text-center font-medium">न्यूनतम</th>
                  </tr>
                </thead>
                <tbody>
                  {afPerformance.map((p, i) => (
                    <tr key={i} className={i % 2 === 1 ? "bg-gray-50" : ""}>
                      <td className="py-2 px-3 font-bold text-[#1A2F5A]">{p.id}</td>
                      <td className="py-2 px-3 text-gray-700">{p.activity}</td>
                      <td className="py-2 px-3 text-center font-semibold text-[#1A4A8A]">{p.target}</td>
                      <td className="py-2 px-3 text-center font-semibold text-[#0D1B3E]">{p.totalMarks}</td>
                      <td className="py-2 px-3 text-center font-semibold text-[#C0392B]">{p.minRequired}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#0D1B3E] text-white">
                    <td colSpan={2} className="py-2 px-3 font-bold">कुल</td>
                    <td className="py-2 px-3 text-center">—</td>
                    <td className="py-2 px-3 text-center font-bold">1,224</td>
                    <td className="py-2 px-3 text-center font-bold">594</td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
          </motion.section>

          {/* 9. DESELECTION */}
          <motion.section id="deselect" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={XCircle} color="#C0392B" title="निष्कासन — कारण और प्रक्रिया" />
            <div className="space-y-2 mb-4">
              {deselectionReasons.map((r, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-3 items-start bg-white border rounded-lg p-3">
                  <span className="w-6 h-6 rounded-full bg-[#FDECEA] border-2 border-[#C0392B] text-[#C0392B] text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <p className="text-xs text-gray-700">{r}</p>
                </motion.div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Card className="bg-[#E8EBF5] border-[#A0AECC]">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-700">निष्कासित होने पर, AF <strong>क्षेत्रीय अपर निदेशक, स्वास्थ्य सेवा</strong> के पास अपील कर सकती है। उनका आदेश अंतिम होगा।</p>
                </CardContent>
              </Card>
              <Card className="bg-[#FDECEA] border-[#F7C1C1]">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-[#C0392B] mb-1">इस्तीफे के बाद</p>
                  <p className="text-xs text-gray-700">पुनः चयन का कोई अधिकार नहीं। अधिकतम कार्य आयु: 60 वर्ष, उसके बाद स्वतः सेवानिवृत्ति।</p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* 10. WELFARE SCHEMES */}
          <motion.section id="welfare" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Gift} color="#1A6B3A" title="सरकारी कल्याण योजनाएं" />
            <p className="text-sm text-muted-foreground mb-4 pl-5">ASHA और AF दोनों पात्र — प्रीमियम केंद्र सरकार द्वारा, NHM से नहीं</p>
            <div className="grid md:grid-cols-3 gap-3">
              {welfareSchemes.map((s, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <Card className={`${colorMap[s.color]} border h-full`}>
                    <CardHeader className="pb-1">
                      <CardTitle className="text-sm">{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <span className="text-2xl font-bold block my-1" style={{ fontFamily: "'Playfair Display', serif" }}>{s.amount}</span>
                      <p className="text-[11px] text-gray-600 mb-2">{s.subtitle}</p>
                      <ul className="space-y-1">
                        {s.points.map((p, j) => (
                          <li key={j} className="text-[11px] text-gray-600 pl-3 relative">
                            <span className="absolute left-0 font-bold">✓</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 11. HR STRUCTURE */}
          <motion.section id="hr" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={Building2} color="#0D1B3E" title="HR संरचना — ASHA Resource Centre" />
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div variants={fadeUp} custom={0}>
                <h4 className="text-xs font-semibold text-[#0D1B3E] mb-2">राज्य स्तर — ARC टीम</h4>
                <Card className="bg-[#E8EBF5] border-[#A0AECC]">
                  <CardContent className="p-4">
                    <ul className="space-y-1">
                      {hrStructure.stateLevel.map((p, i) => (
                        <li key={i} className="text-xs text-gray-700 pl-3 relative">
                          <span className="absolute left-0">›</span>{p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeUp} custom={1}>
                <h4 className="text-xs font-semibold text-[#0D1B3E] mb-2">फील्ड स्तर HR स्थिति</h4>
                <div className="space-y-2">
                  {hrStructure.fieldLevel.map((h, i) => {
                    const pct = (h.filled / h.total) * 100;
                    const barColor = pct >= 80 ? "#2A9B56" : pct >= 40 ? "#E0A820" : "#C0392B";
                    return (
                      <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
                        <span className="text-[11px] font-semibold text-gray-600">{h.label}</span>
                        <div className="bg-[#E8EBF5] h-5 rounded overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full rounded flex items-center pl-2 text-[10px] font-semibold text-white"
                            style={{ backgroundColor: barColor }}
                          >
                            {h.filled}
                          </motion.div>
                        </div>
                        <span className="text-[11px] font-semibold text-gray-500">{h.filled}/{h.total}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* 12. REPORTING FORMS */}
          <motion.section id="forms" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={FileText} color="#0F6B6B" title="रिपोर्टिंग फॉर्म — प्रपत्र 1-12" />
            <div className="grid md:grid-cols-2 gap-2">
              {reportingForms.map((f, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-3 items-start bg-white border rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-[#0D1B3E] text-white text-xs font-bold flex items-center justify-center shrink-0">{f.num}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#1A2F5A]">{f.title}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 13. HEALTH FACILITIES */}
          <motion.section id="facilities" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <SectionTitle icon={MapPin} color="#1A4A8A" title="स्वास्थ्य सुविधाएं — Google Maps स्थान" />
            <p className="text-sm text-muted-foreground mb-4 pl-5">सहरसा जिले के सभी PHC, CHC और अस्पताल — Google Maps पर सीधे देखें</p>

            {/* District HQ */}
            <h4 className="text-xs font-semibold text-[#0D1B3E] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4621A]"></span>
              जिला मुख्यालय
            </h4>
            <div className="grid md:grid-cols-2 gap-2 mb-5">
              {healthFacilities.filter(f => f.block === "Saharsa HQ").map((f, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <a
                    href={f.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 items-center p-3 bg-gradient-to-r from-[#FEF0E8] to-white border border-[#F4A46A] rounded-xl hover:shadow-md hover:border-[#D4621A] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D4621A] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#0D1B3E]">{f.name}</p>
                      <p className="text-[10px] text-gray-500">{f.category} • {"\u2B50".repeat(Math.round(f.rating))} {f.rating}/5</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#D4621A] transition-colors" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Block-level facilities */}
            <h4 className="text-xs font-semibold text-[#0D1B3E] mb-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#1A6B3A]"></span>
              ब्लॉक PHC / CHC
            </h4>
            <div className="grid md:grid-cols-2 gap-2">
              {healthFacilities.filter(f => f.block !== "Saharsa HQ").map((f, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <a
                    href={f.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 items-center p-3 bg-white border rounded-xl hover:shadow-md hover:border-[#1A6B3A] transition-all group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1A6B3A] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#0D1B3E]">{f.name}</p>
                      <p className="text-[10px] text-gray-500">
                        <span className="font-medium text-[#1A6B3A]">{f.block}</span> • {"\u2B50".repeat(Math.round(f.rating))} {f.rating}/5
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#1A6B3A] transition-colors" />
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 bg-[#E8F0FB] border-l-4 border-[#2E6FC8] rounded-r-lg p-3 text-xs text-gray-600">
              📍 सभी स्थान Google Maps Place ID से लिंक हैं। क्लिक करें और सीधे Google Maps में नेविगेट करें। 🚑 एम्बुलेंस: 108 | 🤰 जननी: 102
            </div>
          </motion.section>

        </div>

        {/* Footer */}
        <div className="bg-[#0D1B3E] text-white/60 text-center p-5 text-[11px]">
          <p className="text-white font-semibold mb-1">ASHA & ASHA Facilitator — Complete Programme Guide, Bihar</p>
          <p>Source: SHSB/PM(ASHA)/25/2010/Part-III · Approved: 29th Governing Body Meeting</p>
          <p className="opacity-50 mt-1">परिवार कल्याण भवन, शेखपुरा, पटना – 800 014</p>
        </div>
      </div>
    </Layout>
  );
}

function SectionTitle({ icon: Icon, color, title }: { icon: React.ComponentType<{ className?: string }>; color: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-1">
      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <h2 className="text-lg font-bold" style={{ color, fontFamily: "'Playfair Display', serif" }}>{title}</h2>
    </div>
  );
}
