"use client";

import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  triviaQuestions, scenarios, foodItems, foodGroupLabels,
  badges, getLevelForPoints, getNextLevel, Badge,
} from "@/data/gameContent";
import {
  Trophy, Heart, Zap, Star, ArrowRight, RotateCcw, CheckCircle2,
  XCircle, Timer, Flame, Award, Gamepad2, Brain, Utensils,
} from "lucide-react";

type GameScreen = "home" | "trivia" | "scenario" | "nutrition" | "results";

interface GameState {
  totalPoints: number;
  streak: number;
  bestStreak: number;
  questionsAnswered: number;
  correctAnswers: number;
  earnedBadges: string[];
  scenariosCompleted: number;
  communityDecisions: number;
}

const initialState: GameState = {
  totalPoints: 0, streak: 0, bestStreak: 0,
  questionsAnswered: 0, correctAnswers: 0,
  earnedBadges: [], scenariosCompleted: 0, communityDecisions: 0,
};

export default function GamePage() {
  const [screen, setScreen] = useState<GameScreen>("home");
  const [gs, setGs] = useState<GameState>(initialState);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("healthHeroGame");
      if (saved) setGs(JSON.parse(saved));
    } catch { /* empty */ }
  }, []);

  const save = useCallback((state: GameState) => {
    setGs(state);
    try { localStorage.setItem("healthHeroGame", JSON.stringify(state)); } catch { /* empty */ }
  }, []);

  const addBadge = useCallback((badgeId: string, state: GameState): GameState => {
    if (state.earnedBadges.includes(badgeId)) return state;
    return { ...state, earnedBadges: [...state.earnedBadges, badgeId] };
  }, []);

  const level = getLevelForPoints(gs.totalPoints);
  const next = getNextLevel(gs.totalPoints);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 md:p-6 min-h-screen">
        <AnimatePresence mode="wait">
          {screen === "home" && (
            <HomeScreen key="home" gs={gs} level={level} next={next} setScreen={setScreen} save={save} />
          )}
          {screen === "trivia" && (
            <TriviaScreen key="trivia" gs={gs} save={save} addBadge={addBadge} onBack={() => setScreen("home")} />
          )}
          {screen === "scenario" && (
            <ScenarioScreen key="scenario" gs={gs} save={save} addBadge={addBadge} onBack={() => setScreen("home")} />
          )}
          {screen === "nutrition" && (
            <NutritionPuzzle key="nutrition" gs={gs} save={save} onBack={() => setScreen("home")} />
          )}
          {screen === "results" && (
            <ResultsScreen key="results" gs={gs} onBack={() => setScreen("home")} onReset={() => { save(initialState); setScreen("home"); }} />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

/* ─── HOME SCREEN ────────────────────────────────────────── */
function HomeScreen({ gs, level, next, setScreen, save }: {
  gs: GameState; level: ReturnType<typeof getLevelForPoints>;
  next: ReturnType<typeof getNextLevel>; setScreen: (s: GameScreen) => void;
  save: (s: GameState) => void;
}) {
  const progressPct = next
    ? ((gs.totalPoints - level.pointsRequired) / (next.pointsRequired - level.pointsRequired)) * 100
    : 100;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0D1B3E] via-[#1A2F5A] to-[#0D1B3E] text-white rounded-2xl p-6 md:p-10 mb-6 relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(212,98,26,0.25)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[10%] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(26,107,58,0.2)_0%,transparent_70%)] pointer-events-none" />

        <motion.div initial={{ y: -20 }} animate={{ y: 0 }}>
          <p className="text-[11px] tracking-[2px] uppercase text-[#F08040] font-semibold mb-2">🎮 स्वास्थ्य शिक्षा गेम</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Health Hero Academy
          </h1>
          <p className="text-white/60 text-sm mb-6">स्वास्थ्य के हीरो बनो! क्विज़, परिदृश्य और पहेलियों से सीखो</p>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { icon: <Trophy className="w-5 h-5 text-[#E0A820]" />, label: "कुल अंक", value: gs.totalPoints },
            { icon: <Star className="w-5 h-5 text-[#F08040]" />, label: "स्तर", value: `${level.level} — ${level.name}` },
            { icon: <Flame className="w-5 h-5 text-red-400" />, label: "बेस्ट स्ट्रीक", value: gs.bestStreak },
            { icon: <Award className="w-5 h-5 text-purple-400" />, label: "बैज", value: gs.earnedBadges.length },
          ].map((s, i) => (
            <motion.div key={i} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-3 flex items-center gap-3">
              {s.icon}
              <div>
                <p className="text-[10px] text-white/50">{s.label}</p>
                <p className="text-sm font-bold">{s.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        {next && (
          <div>
            <div className="flex justify-between text-[10px] text-white/50 mb-1">
              <span>स्तर {level.level}</span>
              <span>स्तर {next.level}: {next.name}</span>
            </div>
            <div className="bg-white/10 h-3 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-gradient-to-r from-[#D4621A] to-[#E0A820] rounded-full" />
            </div>
            <p className="text-[10px] text-white/40 mt-1">{gs.totalPoints}/{next.pointsRequired} अंक</p>
          </div>
        )}
      </div>

      {/* Game Modes */}
      <h2 className="text-lg font-bold text-[#0D1B3E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>🕹️ चुनो अपना चैलेंज</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Brain className="w-8 h-8" />, title: "ट्रिविया क्विज़", desc: "20 सवाल · टाइमर · स्ट्रीक बोनस", color: "from-purple-500 to-indigo-600", action: () => setScreen("trivia") },
          { icon: <Heart className="w-8 h-8" />, title: "परिदृश्य चैलेंज", desc: "5 कहानियां · निर्णय लो · अंक कमाओ", color: "from-rose-500 to-pink-600", action: () => setScreen("scenario") },
          { icon: <Utensils className="w-8 h-8" />, title: "पोषण पहेली", desc: "सही खाद्य समूह में डालो", color: "from-emerald-500 to-green-600", action: () => setScreen("nutrition") },
        ].map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <button onClick={m.action} className="w-full text-left">
              <Card className={`bg-gradient-to-br ${m.color} text-white border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer h-full`}>
                <CardContent className="p-5">
                  <div className="mb-3">{m.icon}</div>
                  <h3 className="font-bold text-lg mb-1">{m.title}</h3>
                  <p className="text-white/70 text-xs">{m.desc}</p>
                </CardContent>
              </Card>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-[#0D1B3E]" style={{ fontFamily: "'Playfair Display', serif" }}>🏅 मेरे बैज</h2>
        <button onClick={() => setScreen("results")} className="text-xs text-blue-600 hover:underline">सभी देखें →</button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
        {badges.map((b) => {
          const earned = gs.earnedBadges.includes(b.id);
          return (
            <motion.div key={b.id} whileHover={{ scale: 1.1 }}
              className={`text-center p-2 rounded-xl border transition-all ${earned ? "bg-yellow-50 border-yellow-300 shadow" : "bg-gray-100 border-gray-200 opacity-40"}`}
              title={earned ? `${b.name}: ${b.description}` : `🔒 ${b.requirement}`}>
              <span className="text-2xl block">{b.emoji}</span>
              <p className="text-[9px] mt-1 font-medium truncate">{b.name}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ─── TRIVIA SCREEN ───────────────────────────────────────── */
function TriviaScreen({ gs, save, addBadge, onBack }: {
  gs: GameState; save: (s: GameState) => void;
  addBadge: (id: string, s: GameState) => GameState; onBack: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [localStreak, setLocalStreak] = useState(0);
  const [sessionPoints, setSessionPoints] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Shuffle questions on mount
  const [questions] = useState(() => {
    const shuffled = [...triviaQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); // 10 per session
  });

  const q = questions[qIndex];
  const isFinished = qIndex >= questions.length;

  // Timer
  useEffect(() => {
    if (selected !== null || isFinished) return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, selected, isFinished]);

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === q.correctIndex;
    const speedBonus = timeLeft > 10 ? 2 : 0;
    const streakMultiplier = localStreak >= 2 ? 2 : 1;
    const earned = isCorrect ? (q.points * streakMultiplier + speedBonus) : 0;

    setSessionPoints(p => p + earned);
    if (isCorrect) {
      setLocalStreak(s => s + 1);
      setSessionCorrect(c => c + 1);
    } else {
      setLocalStreak(0);
    }
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      // Save final
      let newState = {
        ...gs,
        totalPoints: gs.totalPoints + sessionPoints,
        questionsAnswered: gs.questionsAnswered + questions.length,
        correctAnswers: gs.correctAnswers + sessionCorrect,
        streak: localStreak,
        bestStreak: Math.max(gs.bestStreak, localStreak),
      };
      // Check badges
      if (newState.correctAnswers >= 50) newState = addBadge("knowledge_keeper", newState);
      if (localStreak >= 5) newState = addBadge("streak_master", newState);
      if (sessionCorrect === questions.length) {
        const cat = questions[0]?.category;
        if (cat === "nutrition") newState = addBadge("nutrition_expert", newState);
        if (cat === "disease") newState = addBadge("disease_fighter", newState);
      }
      save(newState);
      setQIndex(qIndex + 1);
    } else {
      setSelected(null);
      setTimeLeft(20);
      setQIndex(qIndex + 1);
    }
  };

  if (isFinished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
          <span className="text-6xl block mb-4">🎉</span>
        </motion.div>
        <h2 className="text-2xl font-bold text-[#0D1B3E] mb-2">क्विज़ पूरी!</h2>
        <p className="text-gray-600 mb-6">
          {sessionCorrect}/{questions.length} सही · <span className="text-[#D4621A] font-bold">+{sessionPoints} अंक</span>
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={onBack} className="px-6 py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-[#1A2F5A] transition-colors">
            🏠 होम
          </button>
        </div>
      </motion.div>
    );
  }

  const isCorrect = selected === q.correctIndex;

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">← वापस</button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm">
            <Flame className={`w-4 h-4 ${localStreak >= 3 ? "text-red-500" : "text-gray-400"}`} />
            <span className="font-bold">{localStreak}</span>
          </div>
          <span className="text-sm font-semibold text-[#D4621A]">+{sessionPoints} अंक</span>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-gray-200 h-2 rounded-full mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all"
          style={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div key={qIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
          <Card className="mb-4 shadow-lg border-2 border-gray-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                  {qIndex + 1}/{questions.length} · {q.difficulty === "easy" ? "आसान" : q.difficulty === "medium" ? "मध्यम" : "कठिन"}
                </span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${timeLeft <= 5 ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-100 text-blue-600"}`}>
                  <Timer className="w-4 h-4" /> {timeLeft}s
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#0D1B3E] mb-6 leading-relaxed">{q.question}</h3>

              <div className="space-y-3">
                {q.options.map((opt, i) => {
                  let style = "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50";
                  if (selected !== null) {
                    if (i === q.correctIndex) style = "bg-green-50 border-green-500 ring-2 ring-green-300";
                    else if (i === selected && !isCorrect) style = "bg-red-50 border-red-500 ring-2 ring-red-300";
                    else style = "bg-gray-50 border-gray-200 opacity-50";
                  }
                  return (
                    <motion.button key={i} whileTap={selected === null ? { scale: 0.98 } : undefined}
                      onClick={() => handleAnswer(i)} disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${style}`}>
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm font-medium">{opt}</span>
                      {selected !== null && i === q.correctIndex && <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto shrink-0" />}
                      {selected !== null && i === selected && !isCorrect && i !== q.correctIndex && <XCircle className="w-5 h-5 text-red-600 ml-auto shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`p-4 rounded-xl mb-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className={`text-sm font-semibold mb-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {isCorrect ? `✅ सही! ${localStreak >= 3 ? `🔥 ${localStreak} स्ट्रीक! 2x बोनस!` : ""}` : "❌ गलत!"}
                </p>
                <p className="text-xs text-gray-600">{q.explanation}</p>
              </div>
              <button onClick={nextQuestion}
                className="w-full py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-[#1A2F5A] transition-colors flex items-center justify-center gap-2">
                {qIndex + 1 >= questions.length ? "परिणाम देखें 🏆" : "अगला सवाल"} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── SCENARIO SCREEN ─────────────────────────────────────── */
function ScenarioScreen({ gs, save, addBadge, onBack }: {
  gs: GameState; save: (s: GameState) => void;
  addBadge: (id: string, s: GameState) => GameState; onBack: () => void;
}) {
  const [sIndex, setSIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [sessionPoints, setSessionPoints] = useState(0);

  const s = scenarios[sIndex];
  const isFinished = sIndex >= scenarios.length;

  const handleChoice = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const choice = s.choices[idx];
    const pts = Math.max(0, choice.points);
    setSessionPoints(p => p + pts);
  };

  const nextScenario = () => {
    if (selected === null) return;
    const choice = s.choices[selected];

    if (sIndex + 1 >= scenarios.length) {
      let newState = {
        ...gs,
        totalPoints: gs.totalPoints + sessionPoints,
        scenariosCompleted: gs.scenariosCompleted + scenarios.length,
        communityDecisions: gs.communityDecisions + (choice.isBest ? 1 : 0),
      };
      if (choice.badge) newState = addBadge(choice.badge, newState);
      if (newState.scenariosCompleted >= 3) newState = addBadge("asha_supporter", newState);
      if (newState.communityDecisions >= 5) newState = addBadge("community_leader", newState);
      save(newState);
      setSIndex(sIndex + 1);
    } else {
      let newState = { ...gs, communityDecisions: gs.communityDecisions + (choice.isBest ? 1 : 0) };
      if (choice.badge) newState = addBadge(choice.badge, newState);
      save(newState);
      setSelected(null);
      setSIndex(sIndex + 1);
    }
  };

  if (isFinished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <span className="text-6xl block mb-4">🌟</span>
        <h2 className="text-2xl font-bold text-[#0D1B3E] mb-2">सभी परिदृश्य पूरे!</h2>
        <p className="text-gray-600 mb-6"><span className="text-[#D4621A] font-bold">+{sessionPoints} अंक</span> अर्जित</p>
        <button onClick={onBack} className="px-6 py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-[#1A2F5A] transition-colors">
          🏠 होम
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">← वापस</button>
        <span className="text-sm font-semibold text-[#D4621A]">+{sessionPoints} अंक</span>
      </div>

      <div className="bg-gray-200 h-2 rounded-full mb-6">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 h-full rounded-full transition-all"
          style={{ width: `${((sIndex + 1) / scenarios.length) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={sIndex} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
          {/* Story Card */}
          <Card className="mb-4 shadow-lg border-2 border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-4 text-white">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">परिदृश्य {sIndex + 1}/{scenarios.length}</span>
              <h3 className="text-xl font-bold mt-2">{s.emoji} {s.title}</h3>
            </div>
            <CardContent className="p-5">
              <p className="text-sm text-gray-700 leading-relaxed mb-5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                {s.story}
              </p>

              <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">आप क्या करेंगे?</p>
              <div className="space-y-3">
                {s.choices.map((c, i) => {
                  let style = "bg-white border-gray-200 hover:border-pink-400 hover:bg-pink-50";
                  if (selected !== null) {
                    if (c.isBest) style = "bg-green-50 border-green-500 ring-2 ring-green-300";
                    else if (i === selected && c.points < 0) style = "bg-red-50 border-red-500 ring-2 ring-red-300";
                    else if (i === selected && c.points >= 0) style = "bg-blue-50 border-blue-400";
                    else style = "bg-gray-50 border-gray-200 opacity-50";
                  }
                  return (
                    <motion.button key={i} whileTap={selected === null ? { scale: 0.98 } : undefined}
                      onClick={() => handleChoice(i)} disabled={selected !== null}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${style}`}>
                      <span className="text-sm">{c.text}</span>
                      {selected !== null && i === selected && (
                        <span className={`block mt-1 text-xs font-bold ${c.points > 0 ? "text-green-600" : c.points < 0 ? "text-red-600" : "text-gray-500"}`}>
                          {c.points > 0 ? `+${c.points} HP` : c.points < 0 ? `${c.points} HP` : "0 HP"}
                          {c.badge && " 🏅"}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Feedback */}
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`p-4 rounded-xl mb-4 ${s.choices[selected].points > 0 ? "bg-green-50 border border-green-200" : s.choices[selected].points < 0 ? "bg-red-50 border border-red-200" : "bg-yellow-50 border border-yellow-200"}`}>
                <p className="text-sm text-gray-700">{s.choices[selected].feedback}</p>
              </div>
              <button onClick={nextScenario}
                className="w-full py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-[#1A2F5A] transition-colors flex items-center justify-center gap-2">
                {sIndex + 1 >= scenarios.length ? "परिणाम देखें 🌟" : "अगला परिदृश्य"} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── NUTRITION PUZZLE ────────────────────────────────────── */
function NutritionPuzzle({ gs, save, onBack }: {
  gs: GameState; save: (s: GameState) => void; onBack: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [shuffledItems] = useState(() => [...foodItems].sort(() => Math.random() - 0.5).slice(0, 8));

  const handleSelect = (itemName: string, group: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [itemName]: group }));
  };

  const checkAnswers = () => {
    setSubmitted(true);
    let correct = 0;
    shuffledItems.forEach(item => {
      if (answers[item.name] === item.group) correct++;
    });
    const pts = correct * 2;
    save({ ...gs, totalPoints: gs.totalPoints + pts });
  };

  const allAnswered = shuffledItems.every(item => answers[item.name]);
  const groups = Object.keys(foodGroupLabels);

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">← वापस</button>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-semibold">🍽️ पोषण पहेली</span>
      </div>

      <Card className="mb-4 shadow-lg">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white">
          <h3 className="text-xl font-bold">🥗 संतुलित आहार बनाओ!</h3>
          <p className="text-white/70 text-xs mt-1">हर खाद्य पदार्थ को सही समूह में डालो</p>
        </div>
        <CardContent className="p-5">
          {/* Food Group Buttons Legend */}
          <div className="flex flex-wrap gap-2 mb-5">
            {groups.map(g => (
              <span key={g} className="text-xs px-2 py-1 rounded-full font-medium border"
                style={{ backgroundColor: foodGroupLabels[g].color + "15", borderColor: foodGroupLabels[g].color, color: foodGroupLabels[g].color }}>
                {foodGroupLabels[g].emoji} {foodGroupLabels[g].name}
              </span>
            ))}
          </div>

          {/* Items */}
          <div className="space-y-3">
            {shuffledItems.map((item) => {
              const isCorrect = submitted && answers[item.name] === item.group;
              const isWrong = submitted && answers[item.name] && answers[item.name] !== item.group;

              return (
                <motion.div key={item.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`p-3 rounded-xl border-2 transition-all ${isCorrect ? "bg-green-50 border-green-400" : isWrong ? "bg-red-50 border-red-400" : "bg-white border-gray-200"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      {item.emoji} {item.name}
                      {submitted && isCorrect && <span className="text-green-600 ml-2">✅</span>}
                      {submitted && isWrong && <span className="text-red-600 ml-2">❌ → {foodGroupLabels[item.group].name}</span>}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {groups.map(g => (
                      <button key={g} onClick={() => handleSelect(item.name, g)} disabled={submitted}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                          answers[item.name] === g
                            ? "text-white shadow-sm"
                            : "hover:opacity-80"
                        }`}
                        style={{
                          backgroundColor: answers[item.name] === g ? foodGroupLabels[g].color : foodGroupLabels[g].color + "15",
                          borderColor: foodGroupLabels[g].color,
                          color: answers[item.name] === g ? "white" : foodGroupLabels[g].color,
                        }}>
                        {foodGroupLabels[g].emoji}
                      </button>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Submit */}
          {!submitted ? (
            <button onClick={checkAnswers} disabled={!allAnswered}
              className={`w-full mt-5 py-3 rounded-xl font-semibold transition-all ${allAnswered ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
              ✅ जवाब जमा करो
            </button>
          ) : (
            <div className="mt-5">
              <p className="text-center text-sm font-bold text-emerald-700 mb-3">
                {shuffledItems.filter(i => answers[i.name] === i.group).length}/{shuffledItems.length} सही!
                <span className="text-[#D4621A] ml-2">+{shuffledItems.filter(i => answers[i.name] === i.group).length * 2} अंक</span>
              </p>
              <button onClick={onBack}
                className="w-full py-3 bg-[#0D1B3E] text-white rounded-xl font-semibold hover:bg-[#1A2F5A] transition-colors">
                🏠 होम
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ─── RESULTS / BADGE SCREEN ─────────────────────────────── */
function ResultsScreen({ gs, onBack, onReset }: {
  gs: GameState; onBack: () => void; onReset: () => void;
}) {
  const accuracy = gs.questionsAnswered > 0 ? Math.round((gs.correctAnswers / gs.questionsAnswered) * 100) : 0;
  const level = getLevelForPoints(gs.totalPoints);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800 mb-4 block">← वापस</button>

      <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1A2F5A] text-white rounded-2xl p-6 mb-6 text-center">
        <span className="text-5xl block mb-3">🏆</span>
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>मेरी उपलब्धियां</h1>
        <p className="text-white/60 text-sm">स्तर {level.level} — {level.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "कुल अंक", value: gs.totalPoints, emoji: "🏆" },
          { label: "सही उत्तर", value: gs.correctAnswers, emoji: "✅" },
          { label: "सवाल खेले", value: gs.questionsAnswered, emoji: "❓" },
          { label: "सटीकता", value: `${accuracy}%`, emoji: "🎯" },
          { label: "बेस्ट स्ट्रीक", value: gs.bestStreak, emoji: "🔥" },
          { label: "परिदृश्य पूरे", value: gs.scenariosCompleted, emoji: "📖" },
          { label: "सामुदायिक निर्णय", value: gs.communityDecisions, emoji: "🌟" },
          { label: "बैज अर्जित", value: gs.earnedBadges.length, emoji: "🏅" },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}>
            <Card className="text-center p-3">
              <span className="text-xl block">{s.emoji}</span>
              <p className="text-lg font-bold text-[#0D1B3E]">{s.value}</p>
              <p className="text-[10px] text-gray-500">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <h3 className="text-lg font-bold text-[#0D1B3E] mb-3">🏅 सभी बैज</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {badges.map((b) => {
          const earned = gs.earnedBadges.includes(b.id);
          return (
            <Card key={b.id} className={`p-4 text-center transition-all ${earned ? "bg-yellow-50 border-yellow-300 shadow-md" : "bg-gray-50 border-gray-200 opacity-50"}`}>
              <span className="text-3xl block mb-2">{b.emoji}</span>
              <p className="text-xs font-bold">{b.name}</p>
              <p className="text-[10px] text-gray-500 mt-1">{earned ? b.description : `🔒 ${b.requirement}`}</p>
            </Card>
          );
        })}
      </div>

      <button onClick={onReset}
        className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
        <RotateCcw className="w-4 h-4" /> गेम रीसेट करो
      </button>
    </motion.div>
  );
}
