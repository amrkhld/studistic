import { studentFeatures, datasetStats } from '@/lib/mock-data';
import { ArrowRightLeft, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function ComparisonsPage() {
    const comparisons = [
        {
            label: 'Attendance',
            yours: studentFeatures.attendance,
            average: datasetStats.avg_attendance,
            unit: '%',
            max: 100,
        },
        {
            label: 'Hours Studied',
            yours: studentFeatures.hours_studied,
            average: datasetStats.avg_hours_studied,
            unit: 'h/week',
            max: 44,
        },
        {
            label: 'Previous Scores',
            yours: studentFeatures.previous_scores,
            average: datasetStats.avg_previous_scores,
            unit: '',
            max: 100,
        },
        {
            label: 'Sleep Hours',
            yours: studentFeatures.sleep_hours,
            average: datasetStats.avg_sleep_hours,
            unit: 'h',
            max: 10,
        },
        {
            label: 'Physical Activity',
            yours: studentFeatures.physical_activity,
            average: 2.97,
            unit: 'h/week',
            max: 6,
        },
        {
            label: 'Tutoring Sessions',
            yours: studentFeatures.tutoring_sessions,
            average: 1.49,
            unit: 'sessions',
            max: 8,
        },
    ];

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-in">
            {/* Header */}
            <header>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Peer Comparisons
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    See how your metrics compare to the anonymized average of {datasetStats.total_students.toLocaleString()} students
                </p>
            </header>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comparisons.map((item, i) => {
                    const diff = item.yours - item.average;
                    const diffPercent = ((diff / item.average) * 100).toFixed(1);
                    const isAbove = diff > 0;
                    const isEqual = Math.abs(diff) < 0.5;
                    const yourPercent = (item.yours / item.max) * 100;
                    const avgPercent = (item.average / item.max) * 100;

                    return (
                        <div key={item.label} className={`card animate-slide-up stagger-${Math.min(i + 1, 6)}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{item.label}</h3>
                                <div className="flex items-center gap-1">
                                    {isEqual ? (
                                        <Minus size={14} style={{ color: 'var(--text-muted)' }} />
                                    ) : isAbove ? (
                                        <ArrowUp size={14} style={{ color: '#2ea043' }} />
                                    ) : (
                                        <ArrowDown size={14} style={{ color: '#f04a2a' }} />
                                    )}
                                    <span
                                        className="text-xs font-semibold"
                                        style={{ color: isEqual ? 'var(--text-muted)' : isAbove ? '#2ea043' : '#f04a2a' }}
                                    >
                                        {isEqual ? 'On par' : `${isAbove ? '+' : ''}${diffPercent}%`}
                                    </span>
                                </div>
                            </div>

                            {/* Visual comparison */}
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs font-medium" style={{ color: 'var(--accent-yellow)' }}>You</span>
                                        <span className="text-xs font-mono font-bold" style={{ color: 'var(--accent-yellow)' }}>
                                            {item.yours}{item.unit}
                                        </span>
                                    </div>
                                    <div className="metric-bar" style={{ height: 12, borderRadius: 6 }}>
                                        <div
                                            className="metric-bar-fill"
                                            style={{
                                                width: `${yourPercent}%`,
                                                background: 'linear-gradient(90deg, var(--accent-yellow), var(--accent-orange))',
                                                borderRadius: 6,
                                                height: 12,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Peer Average</span>
                                        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                                            {item.average.toFixed(1)}{item.unit}
                                        </span>
                                    </div>
                                    <div className="metric-bar" style={{ height: 12, borderRadius: 6 }}>
                                        <div
                                            className="metric-bar-fill"
                                            style={{
                                                width: `${avgPercent}%`,
                                                background: 'var(--text-muted)',
                                                borderRadius: 6,
                                                height: 12,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Difference indicator */}
                            <div className="mt-3 pt-3 text-center" style={{ borderTop: '1px solid var(--border)' }}>
                                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                    Difference: {' '}
                                    <span style={{ color: isEqual ? 'var(--text-muted)' : isAbove ? '#2ea043' : '#f04a2a', fontWeight: 600 }}>
                                        {isAbove ? '+' : ''}{diff.toFixed(1)} {item.unit}
                                    </span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary */}
            <div className="card animate-slide-up">
                <div className="flex items-center gap-2 mb-4">
                    <ArrowRightLeft size={18} style={{ color: 'var(--accent-yellow)' }} />
                    <h2 className="text-base font-semibold">Summary</h2>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                    {(() => {
                        const above = comparisons.filter(c => c.yours > c.average + 0.5).length;
                        const below = comparisons.filter(c => c.yours < c.average - 0.5).length;
                        const onPar = comparisons.length - above - below;
                        return [
                            { label: 'Above Average', value: above, color: '#2ea043' },
                            { label: 'On Par', value: onPar, color: 'var(--text-secondary)' },
                            { label: 'Below Average', value: below, color: '#f04a2a' },
                        ].map((s) => (
                            <div key={s.label} className="p-4 rounded-lg" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                                <div className="text-3xl font-bold mb-1" style={{ color: s.color, fontFamily: 'var(--font-anton)' }}>
                                    {s.value}
                                </div>
                                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                            </div>
                        ));
                    })()}
                </div>
            </div>
        </div>
    );
}
