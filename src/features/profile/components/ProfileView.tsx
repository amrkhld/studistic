import {
  currentUser,
  studentFeatures,
  latestPrediction,
  datasetStats,
  getRiskBadgeClass,
} from '@/lib/mock-data';
import { Mail, MapPin, Calendar, GraduationCap, Shield } from 'lucide-react';

export function ProfileView() {
  const initials = currentUser.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
          Profile
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Your personal information and academic overview
        </p>
      </header>

      {/* Profile Card */}
      <div className="card animate-slide-up stagger-1">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{
              background: 'linear-gradient(135deg, var(--accent-yellow), var(--accent-orange))',
              color: 'var(--shadow)',
              fontFamily: 'var(--font-anton)',
            }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
              {currentUser.full_name}
            </h2>
            <div className="flex flex-wrap gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <GraduationCap size={14} /> {currentUser.department}
              </span>
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Calendar size={14} /> Year {currentUser.year}
              </span>
              <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail size={14} /> {currentUser.email}
              </span>
            </div>
          </div>
          <div className={getRiskBadgeClass(latestPrediction.risk_level)}>
            {latestPrediction.risk_level}
          </div>
        </div>
      </div>

      {/* Academic Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Features Summary */}
        <div className="card animate-slide-up stagger-2">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Shield size={16} style={{ color: 'var(--accent-yellow)' }} />
            Academic Profile
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Hours Studied/Week', value: `${studentFeatures.hours_studied}h` },
              { label: 'Attendance Rate', value: `${studentFeatures.attendance}%` },
              { label: 'Previous Scores', value: studentFeatures.previous_scores.toString() },
              { label: 'Sleep Hours', value: `${studentFeatures.sleep_hours}h` },
              { label: 'Physical Activity', value: `${studentFeatures.physical_activity}h/week` },
              { label: 'Tutoring Sessions', value: studentFeatures.tutoring_sessions.toString() },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Environment Factors */}
        <div className="card animate-slide-up stagger-3">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <MapPin size={16} style={{ color: 'var(--accent-yellow)' }} />
            Environment & Background
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Parental Involvement', value: studentFeatures.parental_involvement },
              { label: 'Family Income', value: studentFeatures.family_income },
              { label: 'Internet Access', value: studentFeatures.internet_access ? 'Yes' : 'No' },
              { label: 'School Type', value: studentFeatures.school_type },
              { label: 'Distance from Home', value: studentFeatures.distance_from_home },
              { label: 'Learning Disabilities', value: studentFeatures.learning_disabilities ? 'Yes' : 'No' },
              { label: 'Extracurricular Activities', value: studentFeatures.extracurricular_activities ? 'Yes' : 'No' },
              { label: 'Parental Education', value: studentFeatures.parental_education_level },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--border)' }}>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <span
                  className="text-sm font-semibold"
                  style={{
                    color:
                      item.value === 'High' || item.value === 'Yes' || item.value === 'Positive' || item.value === 'Private'
                        ? '#2ea043'
                        : item.value === 'Low' || item.value === 'No' || item.value === 'Negative'
                          ? '#f04a2a'
                          : 'var(--foreground)',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Prediction */}
      <div className="card animate-slide-up stagger-4">
        <h3 className="text-base font-semibold mb-4">Latest Prediction</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Predicted Score', value: latestPrediction.predicted_score.toFixed(1), color: 'var(--accent-yellow)' },
            { label: 'Risk Level', value: latestPrediction.risk_level, color: latestPrediction.risk_level === 'High Performer' ? '#2ea043' : latestPrediction.risk_level === 'At Risk' ? '#f04a2a' : '#d29922' },
            { label: 'Confidence', value: `${latestPrediction.confidence}%`, color: 'var(--accent-blue)' },
            { label: 'Model', value: latestPrediction.model_used, color: 'var(--text-secondary)' },
          ].map((item) => (
            <div key={item.label} className="text-center p-4 rounded-lg" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
              <div className="text-lg font-bold" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
