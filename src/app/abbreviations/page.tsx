"use client";

import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { abbreviations } from "@/data/abbreviations";
import { Bookmark, Building2, HeartPulse, Search, Stethoscope, Users } from "lucide-react";
import { useState } from "react";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Program": return <Bookmark className="w-4 h-4 text-purple-500" />;
    case "Designation": return <Users className="w-4 h-4 text-blue-500" />;
    case "Facility": return <Building2 className="w-4 h-4 text-green-500" />;
    case "Medical": return <Stethoscope className="w-4 h-4 text-red-500" />;
    default: return <HeartPulse className="w-4 h-4 text-orange-500" />;
  }
};

export default function AbbreviationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = abbreviations
    .filter(a =>
      a.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.fullFormEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.fullFormHi.includes(searchTerm)
    )
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <Layout>
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1A4A8A] via-[#2E6FC8] to-[#1A4A8A] rounded-2xl p-6 md:p-10 text-white mb-8 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            संक्षिप्त नाम निर्देशिका (Abbreviations)
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm md:text-base">
            स्वास्थ्य विभाग, ASHA कार्यक्रम और PLA बैठकों में उपयोग किए जाने वाले सभी महत्वपूर्ण संक्षिप्त शब्दों (Abbreviations) का पूर्ण रूप अंग्रेजी और हिंदी में।
          </p>

          <div className="mt-6 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent sm:text-sm shadow-sm transition-all"
              placeholder="संक्षिप्त नाम खोजें (उदा: ASHA, PHC, BCM)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length > 0 ? (
            filtered.map((item, i) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="h-full hover:shadow-md hover:border-blue-300 transition-all group overflow-hidden bg-white/80 backdrop-blur">
                  <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:from-[#D4621A] group-hover:to-[#E0A820] transition-all" />
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-2xl font-bold text-[#0D1B3E] tracking-tight">{item.term}</h2>
                      <div className="bg-gray-100 p-1.5 rounded-md" title={item.category}>
                        {getCategoryIcon(item.category)}
                      </div>
                    </div>
                    <div className="space-y-1 mt-3">
                      <p className="text-sm font-semibold text-gray-800 leading-tight">
                        {item.fullFormEn}
                      </p>
                      <p className="text-sm text-gray-600 font-medium font-hindi">
                        {item.fullFormHi}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              कोई परिणाम नहीं मिला। कृपया पुनः प्रयास करें। (No results found)
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}
