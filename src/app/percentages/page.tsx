import { featureImportances, riskDistribution, studentFeatures, datasetStats } from '@/lib/mock-data';
import { BarChart3, PieChart } from 'lucide-react';

export default function PercentagesPage() {
    const totalStudents = riskDistribution.reduce((s, r) => s + r.count, 0);

    const comparisons = [
        { label: 'Attendance', value: studentFeatures.attendance, avg: datasetStats.avg_attendance, unit: '%', max: 100 },
        { label: 'Hours Studied', value: studentFeatures.hours_studied, avg: datasetStats.avg_hours_studied, unit: 'h', max: 44 },
        { label: 'Previous Scores', value: studentFeatures.previous_scores, avg: datasetStats.avg_previous_scores, unit: '', max: 100 },
        { label: 'Sleep Hours', value: studentFeatures.sleep_hours, avg: datasetStats.avg_sleep_hours, unit: 'h', max: 10 },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6 animate-fade-in ">
            <header>
                <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>Feature Contributions</h1>
                <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>Understand which factors drive your predicted performance</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* SHAP */}
                <div className="lg:col-span-7 glass p-6 animate-slide-up stagger-1">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <BarChart3 size={15} strokeWidth={1.5} style={{ color: 'var(--accent-cyan)' }} />
                            <h2 className="text-[14px] font-semibold">Feature Importance</h2>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>SHAP</span>
                    </div>
                    <div className="space-y-4">
                        {featureImportances.map((f, i) => {
                            const w = (f.importance / featureImportances[0].importance) * 100;
                            return (
                                <div key={f.feature}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{i + 1}. {f.display_name}</span>
                                        <span className="text-[11px] font-mono font-semibold" style={{ color: 'var(--accent-cyan)' }}>{(f.importance * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="metric-bar">
                                        <div className="metric-bar-fill" style={{
                                            width: `${w}%`,
                                            background: i < 3 ? 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))' : 'rgba(56,189,248,0.3)',
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Risk */}
                <div className="lg:col-span-5 space-y-5">
                    <div className="glass p-6 animate-slide-up stagger-2">
                        <div className="flex items-center gap-2 mb-5">
                            <PieChart size={15} strokeWidth={1.5} style={{ color: 'var(--accent-purple)' }} />
                            <h2 className="text-[14px] font-semibold">Risk Distribution</h2>
                        </div>
                        <div className="space-y-4">
                            {riskDistribution.map((r) => (
                                <div key={r.label}>
                                    <div className="flex justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span style={{ width: 8, height: 8, borderRadius: 3, background: r.color }} />
                                            <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{r.label}</span>
                                        </div>
                                        <span className="text-[12px] font-semibold" style={{ color: r.color }}>{r.percentage}%</span>
                                    </div>
                                    <div className="metric-bar">
                                        <div className="metric-bar-fill" style={{ width: `${r.percentage}%`, background: r.color }} />
                                    </div>
                                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{r.count.toLocaleString()} students</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stacked bar */}
                    <div className="glass p-5 animate-slide-up stagger-3">
                        <h3 className="text-[12px] font-semibold mb-3">Overall Distribution</h3>
                        <div className="flex rounded-lg overflow-hidden h-7">
                            {riskDistribution.map((r) => (
                                <div key={r.label} style={{ width: `${r.percentage}%`, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {r.percentage > 10 && <span className="text-[10px] font-bold text-white">{r.percentage}%</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Your vs Average */}
            <div className="glass p-6 animate-slide-up stagger-4">
                <h2 className="text-[14px] font-semibold mb-5">Your Values vs Dataset Average</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {comparisons.map((c) => {
                        const yourPct = (c.value / c.max) * 100;
                        const avgPct = (c.avg / c.max) * 100;
                        const above = c.value >= c.avg;
                        return (
                            <div key={c.label} className="glass-subtle p-4">
                                <div className="flex justify-between mb-3">
                                    <span className="text-[12px] font-medium" style={{ color: 'var(--foreground)' }}>{c.label}</span>
                                    <span className="text-[10px] font-semibold" style={{ color: above ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                        {above ? '↑ Above' : '↓ Below'} avg
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-[10px] w-10" style={{ color: 'var(--text-muted)' }}>You</span>
                                    <div className="flex-1 metric-bar"><div className="metric-bar-fill" style={{ width: `${yourPct}%`, background: 'var(--accent-cyan)' }} /></div>
                                    <span className="text-[11px] font-mono w-10 text-right" style={{ color: 'var(--foreground)' }}>{c.value}{c.unit}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] w-10" style={{ color: 'var(--text-muted)' }}>Avg</span>
                                    <div className="flex-1 metric-bar"><div className="metric-bar-fill" style={{ width: `${avgPct}%`, background: 'rgba(255,255,255,0.1)' }} /></div>
                                    <span className="text-[11px] font-mono w-10 text-right" style={{ color: 'var(--text-muted)' }}>{c.avg.toFixed(1)}{c.unit}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
