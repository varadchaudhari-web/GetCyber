import { GraduationCap, Search, Play, CheckCircle, Award, Clock, Users, Star } from "lucide-react";
import { useTrainingStore } from "@/stores/trainingStore";
import { cn } from "@/lib/utils";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: "text-cyber-green bg-cyber-green/10 border-cyber-green/30",
  intermediate: "text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30",
  advanced: "text-cyber-red bg-cyber-red/10 border-cyber-red/30",
};

export default function Training() {
  const { getFilteredCourses, filter, setFilter, updateProgress, completeCourse } = useTrainingStore();
  const courses = getFilteredCourses();

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Cyber Awareness Training</h1>
          <p className="section-subheader">Build security skills with expert-led courses, labs, and certifications</p>
        </div>
        <div className="glass-card px-4 py-2">
          <p className="text-xs text-dark-text">Your Progress</p>
          <p className="text-xl font-black text-cyber-blue">{courses.filter((c) => c.completed).length}/{courses.length} Completed</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Enrolled", value: courses.filter((c) => c.progress > 0).length, icon: GraduationCap, color: "text-cyber-blue" },
          { label: "Completed", value: courses.filter((c) => c.completed).length, icon: CheckCircle, color: "text-cyber-green" },
          { label: "Certifications", value: courses.filter((c) => c.completed && c.certificationAvailable).length, icon: Award, color: "text-cyber-yellow" },
          { label: "Hours Learned", value: Math.round(courses.reduce((s, c) => s + (c.duration * c.progress) / 100, 0) / 60), icon: Clock, color: "text-cyber-purple" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass-card p-4">
              <Icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-sm text-dark-text mt-1">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
          <input placeholder="Search courses..." className="input-cyber pl-9" value={filter.search} onChange={(e) => setFilter({ search: e.target.value })} />
        </div>
        <select className="input-cyber w-40" onChange={(e) => setFilter({ difficulty: e.target.value || undefined })}>
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="glass-card-hover overflow-hidden">
            <div className="relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-44 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[course.difficulty]}`}>{course.difficulty}</span>
                {course.certificationAvailable && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full border text-cyber-yellow bg-cyber-yellow/10 border-cyber-yellow/30">
                    <Award className="w-3 h-3 inline mr-1" />Certificate
                  </span>
                )}
              </div>
              {course.completed && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-cyber-green rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-dark-bg" />
                </div>
              )}
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-white text-sm leading-tight">{course.title}</h3>
              </div>
              <p className="text-dark-text text-xs leading-relaxed mb-3 line-clamp-2">{course.description}</p>

              <div className="flex items-center gap-4 mb-3 text-xs text-dark-text">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.enrolled.toLocaleString()}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-cyber-yellow fill-current" />{course.rating}</span>
              </div>

              {/* Progress bar */}
              {course.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-dark-text mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-dark-card rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", course.completed ? "bg-cyber-green" : "bg-cyber-blue")} style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {!course.completed ? (
                  <>
                    <button
                      onClick={() => updateProgress(course.id, Math.min(100, course.progress + 25))}
                      className="cyber-btn-primary flex-1 text-xs py-2 flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      {course.progress === 0 ? "Start Course" : "Continue"}
                    </button>
                    {course.progress >= 75 && (
                      <button onClick={() => completeCourse(course.id)} className="cyber-btn-green text-xs py-2 px-3 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Complete
                      </button>
                    )}
                  </>
                ) : (
                  <button className="cyber-btn-secondary flex-1 text-xs py-2 flex items-center justify-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-cyber-yellow" />
                    {course.certificationAvailable ? "View Certificate" : "Review Course"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
