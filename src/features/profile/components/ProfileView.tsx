import {
  currentUser,
  studentFeatures,
  latestPrediction,
  getRiskBadgeClass,
} from '@/lib/mock-data';
import { Mail, Calendar, GraduationCap, Shield, MapPin } from 'lucide-react';

export function ProfileView() {
  const initials = currentUser.full_name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="p-6 lg:p-8 space-y-6 animate-fade-in ">
      <header>
        <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>Profile</h1>
        <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>Your personal information and academic overview</p>
      </header>

      {/* Profile Card */}
      <div className="glass p-6 animate-slide-up stagger-1">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))', color: '#fff' }}>
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-[17px] font-semibold" style={{ color: 'var(--foreground)' }}>{currentUser.full_name}</h2>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { icon: GraduationCap, text: currentUser.department },
                { icon: Calendar, text: `Year ${currentUser.year}` },
                { icon: Mail, text: currentUser.email },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-secondary)' }}>
                  <item.icon size={13} strokeWidth={1.5} /> {item.text}
                </span>
              ))}
            </div>
          </div>
          <div className={getRiskBadgeClass(latestPrediction.risk_level)}>{latestPrediction.risk_level}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Academic */}
        <div className="glass p-6 animate-slide-up stagger-2">
          <h3 className="text-[13px] font-semibold mb-4 flex items-center gap-2">
            <Shield size={14} strokeWidth={1.5} style={{ color: 'var(--accent-cyan)' }} /> Academic Profile
          </h3>
          <div className="space-y-0">
            {[
              { label: 'Hours Studied/Week', value: `${studentFeatures.hours_studied}h` },
              { label: 'Attendance Rate', value: `${studentFeatures.attendance}%` },
              { label: 'Previous Scores', value: `${studentFeatures.previous_scores}` },
              { label: 'Sleep Hours', value: `${studentFeatures.sleep_hours}h` },
              { label: 'Physical Activity', value: `${studentFeatures.physical_activity}h/week` },
              { label: 'Tutoring Sessions', value: `${studentFeatures.tutoring_sessions}` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <span className="text-[12px] font-semibold" style={{ color: 'var(--foreground)' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Environment */}
        <div className="glass p-6 animate-slide-up stagger-3">
          <h3 className="text-[13px] font-semibold mb-4 flex items-center gap-2">
            <MapPin size={14} strokeWidth={1.5} style={{ color: 'var(--accent-purple)' }} /> Environment & Background
          </h3>
          <div className="space-y-0">
            {[
              { label: 'Parental Involvement', value: studentFeatures.parental_involvement },
              { label: 'Family Income', value: studentFeatures.family_income },
              { label: 'Internet Access', value: studentFeatures.internet_access ? 'Yes' : 'No' },
              { label: 'School Type', value: studentFeatures.school_type },
              { label: 'Distance from Home', value: studentFeatures.distance_from_home },
              { label: 'Learning Disabilities', value: studentFeatures.learning_disabilities ? 'Yes' : 'No' },
              { label: 'Extracurricular', value: studentFeatures.extracurricular_activities ? 'Yes' : 'No' },
              { label: 'Parental Education', value: studentFeatures.parental_education_level },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <span className="text-[12px] font-semibold"
                  style={{
                    color: item.value === 'High' || item.value === 'Yes' || item.value === 'Positive' || item.value === 'Private' ? 'var(--accent-green)'
                      : item.value === 'Low' || item.value === 'No' || item.value === 'Negative' ? 'var(--accent-red)'
                        : 'var(--foreground)',
                  }}
                >{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Prediction */}
      <div className="glass p-6 animate-slide-up stagger-4">
        <h3 className="text-[13px] font-semibold mb-4">Latest Prediction</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Predicted Score', value: latestPrediction.predicted_score.toFixed(1), color: 'var(--accent-cyan)' },
            { label: 'Risk Level', value: latestPrediction.risk_level, color: latestPrediction.risk_level === 'High Performer' ? 'var(--accent-green)' : latestPrediction.risk_level === 'At Risk' ? 'var(--accent-red)' : 'var(--accent-amber)' },
            { label: 'Confidence', value: `${latestPrediction.confidence}%`, color: 'var(--accent-purple)' },
            { label: 'Model', value: latestPrediction.model_used, color: 'var(--text-secondary)' },
          ].map((item) => (
            <div key={item.label} className="glass-subtle text-center p-4">
              <div className="text-[10px] font-medium mb-2" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
              <div className="text-[16px] font-bold" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
