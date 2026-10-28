import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Check,
  AlertTriangle,
  Info,
  Terminal,
  Shield,
  Search,
  BookOpen,
} from "lucide-react";
import { initTiltCards } from "@/lib/effects/tiltCards";
import { initReveals } from "@/lib/effects/reveals";
import { BLOG_POSTS, type BlogPost } from "@/data/blogData";
import { toast } from "sonner";

export default function Blog() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Sync selectedPost with route param if present
  useEffect(() => {
    if (id) {
      const found = BLOG_POSTS.find((p) => p.id === id || p.slug === id);
      if (found) {
        setSelectedPost(found);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setSelectedPost(null);
    }
  }, [id]);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt-card]"));
    const cleanupTilt = initTiltCards(cards);
    const headers = Array.from(document.querySelectorAll<HTMLElement>(".header-reveal"));
    const cleanupReveals = initReveals(headers);

    return () => {
      cleanupTilt();
      cleanupReveals();
    };
  }, [selectedPost, activeCategory, searchQuery]);

  const categories = ["All", "Threat Intel", "Compliance", "Product", "Architecture", "Incident Response", "Vulnerabilities"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    navigate(`/blog/${post.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    navigate("/blog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(!bookmarked ? "Article saved to reading list!" : "Article removed from reading list");
  };

  // If a post is selected, render the full detailed article
  if (selectedPost) {
    const relatedPosts = BLOG_POSTS.filter((p) => p.id !== selectedPost.id).slice(0, 3);

    return (
      <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-sm text-cyber-blue hover:text-white transition-colors mb-8 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Security Intel Articles</span>
          </button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30 px-3 py-1 rounded-full font-semibold font-mono">
                {selectedPost.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-dark-text font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedPost.readTime} read</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-dark-text font-mono">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedPost.date}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight mb-6 tracking-tight">
              {selectedPost.title}
            </h1>

            <p className="text-lg sm:text-xl text-dark-text leading-relaxed mb-6 font-normal">
              {selectedPost.excerpt}
            </p>

            {/* Author info & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-dark-border/60">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPost.author.avatar}
                  alt={selectedPost.author.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyber-blue/40 shadow-lg"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{selectedPost.author.name}</h4>
                  <p className="text-xs text-dark-text">{selectedPost.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="cyber-btn-secondary text-xs py-2 px-3.5 flex items-center gap-2"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-cyber-green" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? "Link Copied" : "Share"}</span>
                </button>
                <button
                  onClick={handleBookmark}
                  className={`cyber-btn-secondary text-xs py-2 px-3.5 flex items-center gap-2 ${
                    bookmarked ? "text-cyber-yellow border-cyber-yellow/40" : ""
                  }`}
                  title="Save article"
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-cyber-yellow" : ""}`} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative rounded-[22px] overflow-hidden mb-12 border border-white/10 shadow-2xl">
            <img
              src={selectedPost.img}
              alt={selectedPost.title}
              className="w-full h-72 sm:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent to-transparent opacity-80" />
          </div>

          {/* MITRE ATT&CK Mapping if present */}
          {selectedPost.mitreTechniques && selectedPost.mitreTechniques.length > 0 && (
            <div className="mb-10 p-5 rounded-xl bg-dark-card/60 border border-cyber-blue/30 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-cyber-blue" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyber-blue">
                  Mapped MITRE ATT&CK® Techniques
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPost.mitreTechniques.map((tech) => (
                  <div
                    key={tech.id}
                    className="p-3 bg-dark-surface/80 rounded-lg border border-dark-border flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-cyber-blue mr-2">{tech.id}</span>
                      <span className="text-xs text-white font-medium">{tech.name}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-dark-card text-dark-text border border-dark-border">
                      {tech.tactic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Article Body Sections */}
          <div className="space-y-10">
            {selectedPost.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight border-b border-dark-border/40 pb-2">
                  {sec.heading}
                </h2>

                {sec.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-dark-text-bright text-base sm:text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {/* Callout box */}
                {sec.callout && (
                  <div
                    className={`p-4 rounded-xl border flex gap-3 ${
                      sec.callout.type === "warning"
                        ? "bg-cyber-red/10 border-cyber-red/30 text-cyber-red"
                        : "bg-cyber-blue/10 border-cyber-blue/30 text-cyber-blue"
                    }`}
                  >
                    {sec.callout.type === "warning" ? (
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-white mb-1">{sec.callout.title}</h4>
                      <p className="text-xs sm:text-sm text-dark-text-bright leading-relaxed">
                        {sec.callout.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Code block */}
                {sec.codeBlock && (
                  <div className="rounded-xl overflow-hidden border border-dark-border bg-[#030712] shadow-xl">
                    <div className="flex items-center justify-between px-4 py-2 bg-dark-card border-b border-dark-border text-xs text-dark-text">
                      <span className="flex items-center gap-1.5 font-mono">
                        <Terminal className="w-3.5 h-3.5 text-cyber-blue" />
                        {sec.codeBlock.language}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(sec.codeBlock?.code || "");
                          toast.success("Code snippet copied!");
                        }}
                        className="text-[11px] text-cyber-blue hover:underline"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 text-xs sm:text-sm font-mono text-dark-text-bright overflow-x-auto leading-relaxed">
                      <code>{sec.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {/* Key Points */}
                {sec.keyPoints && (
                  <div className="space-y-2 mt-4 p-5 rounded-xl bg-dark-card/40 border border-dark-border/60">
                    <h4 className="text-xs uppercase font-bold text-cyber-green tracking-wider mb-2">
                      Key Takeaways & Action Items
                    </h4>
                    <ul className="space-y-2">
                      {sec.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2.5 text-sm text-dark-text-bright">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green mt-2 flex-shrink-0" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-dark-border/60">
            <h4 className="text-xs uppercase font-semibold text-dark-text mb-3">Topics Covered</h4>
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-dark-card border border-dark-border text-dark-text-bright"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Security Advisory CTA */}
          <div className="mt-14 p-8 rounded-2xl bg-gradient-to-r from-cyber-blue/15 via-cyber-purple/10 to-transparent border border-cyber-blue/30 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Stay Ahead of Emerging Cyber Threats
              </h3>
              <p className="text-sm text-dark-text max-w-xl">
                Get real-time zero-day vulnerabilities, threat actor indicators, and SOC mitigation playbooks delivered to your inbox weekly.
              </p>
            </div>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="cyber-btn-primary whitespace-nowrap text-sm py-2.5 px-6 shadow-glow-blue"
            >
              Get Free Protection
            </button>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-12 border-t border-dark-border">
            <h3 className="text-2xl font-bold text-white mb-6">Related Security Intelligence</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPosts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleOpenPost(p)}
                  className="glass-card-hover rounded-xl overflow-hidden cursor-pointer group"
                >
                  <img src={p.img} alt={p.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="p-4">
                    <span className="text-[11px] font-semibold text-cyber-blue">{p.category}</span>
                    <h4 className="text-sm font-bold text-white mt-1 mb-2 line-clamp-2 group-hover:text-cyber-blue transition-colors">
                      {p.title}
                    </h4>
                    <span className="text-xs text-dark-text">{p.readTime} read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the Blog Listing Page
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#05070F] text-dark-text-bright relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyber-teal/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <section className="py-12 sm:py-16 text-center relative z-10">
        <div className="max-w-3xl mx-auto px-4 header-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-pulse" />
            Security Intelligence Blog
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white mb-4 tracking-tight">
            Threat Research & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyber-blue via-cyber-teal to-cyber-green bg-clip-text text-transparent">
              Security Intelligence
            </span>
          </h1>
          <p className="text-dark-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Forensic analysis, zero-day threat advisories, compliance blueprints, and SOC best practices from the GetCyber research team.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="pb-10 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-6 border-b border-white/10">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-cyber-blue text-white shadow-glow-blue font-semibold"
                      : "bg-[#0B101E]/80 text-dark-text hover:text-white border border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
              <input
                type="text"
                placeholder="Search research & CVEs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-cyber pl-10 pr-4 py-2 text-xs w-full bg-[#0B101E]/90 border-white/10 focus:border-cyber-blue rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 p-8 rounded-[24px] bg-[#0B101E]/80 border border-white/10">
              <BookOpen className="w-12 h-12 text-dark-text mx-auto mb-3 opacity-50" />
              <h3 className="text-lg font-bold text-white mb-1">No articles found</h3>
              <p className="text-sm text-dark-text">Try searching with different keywords or clear your filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                }}
                className="cyber-btn-secondary text-xs mt-4 py-2 px-5 rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((p) => (
                <div
                  key={p.id}
                  data-tilt-card
                  data-glow={p.glow}
                  onClick={() => handleOpenPost(p)}
                  className="tilt-card rounded-[22px] bg-[#0B101E]/80 backdrop-blur-xl overflow-hidden cursor-pointer shadow-2xl flex flex-col group border border-white/10 hover:border-cyber-blue/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs bg-[#05070F]/90 backdrop-blur-md text-cyber-blue border border-cyber-blue/30 px-3 py-1 rounded-full font-semibold font-mono">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3 text-xs text-dark-text font-mono">
                        <span>{p.readTime} read</span>
                        <span>•</span>
                        <span>{p.date}</span>
                      </div>
                      <h3 className="tilt-title font-display font-bold text-white text-base mb-2.5 leading-snug group-hover:text-cyber-blue transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-dark-text text-xs line-clamp-2 leading-relaxed mb-5">
                        {p.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.author.avatar}
                          alt={p.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-cyber-blue/30"
                        />
                        <span className="text-xs text-dark-text font-medium">{p.author.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenPost(p);
                        }}
                        className="flex items-center gap-1.5 text-xs text-cyber-blue font-semibold hover:text-white transition-colors group/btn"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
