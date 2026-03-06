import {
  latestPrediction,
  studentFeatures,
  featureImportances,
  recommendations,
  datasetStats,
  getRiskBadgeClass,
  getRiskColor,
} from '@/lib/mock-data';
import {
  TrendingUp,
  Clock,
  BookOpen,
  Moon,
  Target,
  Activity,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export function DashboardView() {
  const riskColor = getRiskColor(latestPrediction.risk_level);
  const scorePercent = Math.min(latestPrediction.predicted_score, 100);

  return (
    <div className="p-6 md:p-8 space-y-6 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            Performance Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            AI-powered predictions based on your academic data
          </p>
        </div>
        <div className={getRiskBadgeClass(latestPrediction.risk_level)} style={{ fontSize: '0.8rem', padding: '6px 16px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: riskColor, display: 'inline-block' }}></span>
          {latestPrediction.risk_level}
        </div>
      </header>

      {/* Top Row — Prediction + Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Prediction Card */}
        <div className="lg:col-span-4 card animate-slide-up stagger-1" style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: riskColor, opacity: 0.08 }} />
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} style={{ color: 'var(--accent-yellow)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
              Predicted Score
            </span>
          </div>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-5xl font-bold" style={{ color: riskColor, fontFamily: 'var(--font-anton)' }}>
              {latestPrediction.predicted_score.toFixed(1)}
            </span>
            <span className="text-lg mb-1" style={{ color: 'var(--text-secondary)' }}>/100</span>
          </div>
          <div className="metric-bar mb-2">
            <div className="metric-bar-fill" style={{ width: `${scorePercent}%`, background: riskColor }} />
          </div>
          <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>Model: {latestPrediction.model_used}</span>
            <span>{latestPrediction.confidence}% confidence</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Attendance', value: `${studentFeatures.attendance}%`, target: '90%+', icon: Target, color: '#1e5bff', percent: studentFeatures.attendance },
            { label: 'Hours Studied', value: `${studentFeatures.hours_studied}h`, target: '30h+', icon: Clock, color: '#2ea043', percent: (studentFeatures.hours_studied / 44) * 100 },
            { label: 'Previous Scores', value: studentFeatures.previous_scores.toString(), target: 'Avg: 75', icon: BookOpen, color: '#d29922', percent: studentFeatures.previous_scores },
            { label: 'Sleep Hours', value: `${studentFeatures.sleep_hours}h`, target: '7-8h ideal', icon: Moon, color: '#8b5cf6', percent: (studentFeatures.sleep_hours / 10) * 100 },
          ].map((metric, i) => (
            <div key={metric.label} className={`card animate-slide-up stagger-${i + 2}`}>
              <div className="flex items-center gap-2 mb-3">
                <div style={{ background: `${metric.color}20`, borderRadius: 8, padding: 6 }}>
                  <metric.icon size={16} style={{ color: metric.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                {metric.value}
              </div>
              <div className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                {metric.label}
              </div>
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{ width: `${metric.percent}%`, background: metric.color }} />
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Target: {metric.target}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row — Feature Importance + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Feature Importance */}
        <div className="lg:col-span-7 card animate-slide-up stagger-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Activity size={18} style={{ color: 'var(--accent-yellow)' }} />
              <h2 className="text-base font-semibold">Top Performance Factors</h2>
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>SHAP Analysis</span>
          </div>
          <div className="space-y-3">
            {featureImportances.slice(0, 7).map((f) => (
              <div key={f.feature} className="flex items-center gap-3">
                <span className="text-xs w-28 truncate" style={{ color: 'var(--text-secondary)' }}>
                  {f.display_name}
                </span>
                <div className="flex-1 metric-bar">
                  <div
                    className="metric-bar-fill"
                    style={{
                      width: `${(f.importance / featureImportances[0].importance) * 100}%`,
                      background: `linear-gradient(90deg, var(--accent-yellow), var(--accent-orange))`,
                    }}
                  />
                </div>
                <span className="text-xs font-mono w-12 text-right" style={{ color: 'var(--text-muted)' }}>
                  {(f.importance * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="lg:col-span-5 card animate-slide-up stagger-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertTriangle size={18} style={{ color: 'var(--accent-yellow)' }} />
            <h2 className="text-base font-semibold">Recommendations</h2>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex items-start gap-3 p-3 rounded-lg transition-colors cursor-default"
                style={{ background: 'var(--background)', border: '1px solid var(--border)' }}
              >
                <span className="text-xl mt-0.5">{rec.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    {rec.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {rec.description}
                  </div>
                </div>
                <span
                  className="text-xs font-semibold uppercase px-2 py-0.5 rounded-full whitespace-nowrap"
                  style={{
                    background: rec.priority === 'high' ? 'rgba(240,74,42,0.15)' : rec.priority === 'medium' ? 'rgba(210,153,34,0.15)' : 'rgba(46,160,67,0.15)',
                    color: rec.priority === 'high' ? '#f04a2a' : rec.priority === 'medium' ? '#d29922' : '#2ea043',
                  }}
                >
                  {rec.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Factors Overview */}
      <div className="card animate-slide-up">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: 'var(--accent-yellow)' }} />
            <h2 className="text-base font-semibold">Your Factor Profile</h2>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Compared to dataset average of {datasetStats.total_students.toLocaleString()} students</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Motivation', value: studentFeatures.motivation_level },
            { label: 'Parental Involvement', value: studentFeatures.parental_involvement },
            { label: 'Resources Access', value: studentFeatures.access_to_resources },
            { label: 'Teacher Quality', value: studentFeatures.teacher_quality },
            { label: 'School Type', value: studentFeatures.school_type },
            { label: 'Peer Influence', value: studentFeatures.peer_influence },
          ].map((factor) => (
            <div key={factor.label} className="text-center p-3 rounded-lg" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{factor.label}</div>
              <div
                className="text-sm font-semibold"
                style={{
                  color:
                    factor.value === 'High' || factor.value === 'Positive' || factor.value === 'Private'
                      ? '#2ea043'
                      : factor.value === 'Low' || factor.value === 'Negative'
                        ? '#f04a2a'
                        : 'var(--accent-yellow)',
                }}
              >
                {factor.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
