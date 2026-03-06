import { studentFeatures, datasetStats } from '@/lib/mock-data';
import { ArrowRightLeft, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function ComparisonsPage() {
    const comparisons = [
        { label: 'Attendance', yours: studentFeatures.attendance, average: datasetStats.avg_attendance, unit: '%', max: 100 },
        { label: 'Hours Studied', yours: studentFeatures.hours_studied, average: datasetStats.avg_hours_studied, unit: 'h/wk', max: 44 },
        { label: 'Previous Scores', yours: studentFeatures.previous_scores, average: datasetStats.avg_previous_scores, unit: '', max: 100 },
        { label: 'Sleep Hours', yours: studentFeatures.sleep_hours, average: datasetStats.avg_sleep_hours, unit: 'h', max: 10 },
        { label: 'Physical Activity', yours: studentFeatures.physical_activity, average: 2.97, unit: 'h/wk', max: 6 },
        { label: 'Tutoring Sessions', yours: studentFeatures.tutoring_sessions, average: 1.49, unit: '', max: 8 },
    ];

    return (
        <div className="p-6 lg:p-8 space-y-6 animate-fade-in ">
            <header>
                <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>Peer Comparisons</h1>
                <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Your metrics vs the anonymized average of {datasetStats.total_students.toLocaleString()} students
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {comparisons.map((c, i) => {
                    const diff = c.yours - c.average;
                    const diffPct = ((diff / c.average) * 100).toFixed(1);
                    const isAbove = diff > 0.5;
                    const isBelow = diff < -0.5;
                    const yPct = (c.yours / c.max) * 100;
                    const aPct = (c.average / c.max) * 100;

                    return (
                        <div key={c.label} className={`glass p-5 animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[13px] font-semibold" style={{ color: 'var(--foreground)' }}>{c.label}</h3>
                                <div className="flex items-center gap-1">
                                    {!isAbove && !isBelow ? <Minus size={13} style={{ color: 'var(--text-muted)' }} />
                                        : isAbove ? <ArrowUp size={13} style={{ color: 'var(--accent-green)' }} />
                                            : <ArrowDown size={13} style={{ color: 'var(--accent-red)' }} />}
                                    <span className="text-[11px] font-semibold"
                                        style={{ color: !isAbove && !isBelow ? 'var(--text-muted)' : isAbove ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                                        {!isAbove && !isBelow ? 'On par' : `${isAbove ? '+' : ''}${diffPct}%`}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-[10px] font-medium" style={{ color: 'var(--accent-cyan)' }}>You</span>
                                        <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--accent-cyan)' }}>{c.yours}{c.unit}</span>
                                    </div>
                                    <div className="metric-bar" style={{ height: 8, borderRadius: 4 }}>
                                        <div className="metric-bar-fill" style={{ width: `${yPct}%`, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))', height: 8, borderRadius: 4 }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>Peer Avg</span>
                                        <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>{c.average.toFixed(1)}{c.unit}</span>
                                    </div>
                                    <div className="metric-bar" style={{ height: 8, borderRadius: 4 }}>
                                        <div className="metric-bar-fill" style={{ width: `${aPct}%`, background: 'rgba(255,255,255,0.08)', height: 8, borderRadius: 4 }} />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 pt-3 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                    Diff:{' '}
                                    <span style={{ color: !isAbove && !isBelow ? 'var(--text-muted)' : isAbove ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>
                                        {isAbove ? '+' : ''}{diff.toFixed(1)} {c.unit}
                                    </span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="glass p-6 animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                    <ArrowRightLeft size={15} strokeWidth={1.5} style={{ color: 'var(--accent-cyan)' }} />
                    <h2 className="text-[14px] font-semibold">Summary</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {(() => {
                        const above = comparisons.filter(c => c.yours > c.average + 0.5).length;
                        const below = comparisons.filter(c => c.yours < c.average - 0.5).length;
                        const onPar = comparisons.length - above - below;
                        return [
                            { label: 'Above Average', value: above, color: 'var(--accent-green)' },
                            { label: 'On Par', value: onPar, color: 'var(--text-secondary)' },
                            { label: 'Below Average', value: below, color: 'var(--accent-red)' },
                        ].map((s) => (
                            <div key={s.label} className="glass-subtle p-4">
                                <div className="text-[28px] font-bold mb-1 leading-none" style={{ color: s.color }}>{s.value}</div>
                                <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                            </div>
                        ));
                    })()}
                </div>
            </div>
        </div>
    );
}
