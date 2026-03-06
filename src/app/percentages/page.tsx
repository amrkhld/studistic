import {
    featureImportances,
    riskDistribution,
    studentFeatures,
    datasetStats,
} from '@/lib/mock-data';
import { PieChart, BarChart3 } from 'lucide-react';

export default function PercentagesPage() {
    const totalRiskStudents = riskDistribution.reduce((s, r) => s + r.count, 0);

    // Build a list of numerical features with student value and dataset average
    const numericalComparisons = [
        { label: 'Attendance', value: studentFeatures.attendance, avg: datasetStats.avg_attendance, unit: '%', max: 100 },
        { label: 'Hours Studied', value: studentFeatures.hours_studied, avg: datasetStats.avg_hours_studied, unit: 'h', max: 44 },
        { label: 'Previous Scores', value: studentFeatures.previous_scores, avg: datasetStats.avg_previous_scores, unit: '', max: 100 },
        { label: 'Sleep Hours', value: studentFeatures.sleep_hours, avg: datasetStats.avg_sleep_hours, unit: 'h', max: 10 },
    ];

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-in">
            {/* Header */}
            <header>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Feature Contributions
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Understand which factors drive your predicted performance
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* SHAP Feature Importance */}
                <div className="lg:col-span-7 card animate-slide-up stagger-1">
                    <div className="flex items-center gap-2 mb-5">
                        <BarChart3 size={18} style={{ color: 'var(--accent-yellow)' }} />
                        <h2 className="text-base font-semibold">Feature Importance (SHAP)</h2>
                    </div>
                    <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                        These are the top factors that influence exam score predictions, ranked by their impact.
                    </p>
                    <div className="space-y-4">
                        {featureImportances.map((f, i) => {
                            const widthPercent = (f.importance / featureImportances[0].importance) * 100;
                            return (
                                <div key={f.feature}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {i + 1}. {f.display_name}
                                        </span>
                                        <span className="text-sm font-mono font-semibold" style={{ color: 'var(--accent-yellow)' }}>
                                            {(f.importance * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="metric-bar">
                                        <div
                                            className="metric-bar-fill"
                                            style={{
                                                width: `${widthPercent}%`,
                                                background: i < 3
                                                    ? 'linear-gradient(90deg, var(--accent-yellow), var(--accent-orange))'
                                                    : 'var(--accent-blue)',
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Risk Distribution */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="card animate-slide-up stagger-2">
                        <div className="flex items-center gap-2 mb-5">
                            <PieChart size={18} style={{ color: 'var(--accent-yellow)' }} />
                            <h2 className="text-base font-semibold">Risk Level Distribution</h2>
                        </div>
                        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
                            Distribution across {totalRiskStudents.toLocaleString()} students in the dataset.
                        </p>
                        <div className="space-y-4">
                            {riskDistribution.map((risk) => (
                                <div key={risk.label}>
                                    <div className="flex justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span style={{ width: 10, height: 10, borderRadius: 3, background: risk.color, display: 'inline-block' }} />
                                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{risk.label}</span>
                                        </div>
                                        <span className="text-sm font-semibold" style={{ color: risk.color }}>
                                            {risk.percentage}%
                                        </span>
                                    </div>
                                    <div className="metric-bar">
                                        <div className="metric-bar-fill" style={{ width: `${risk.percentage}%`, background: risk.color }} />
                                    </div>
                                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                        {risk.count.toLocaleString()} students
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Visual breakdown of stacked risk bar */}
                    <div className="card animate-slide-up stagger-3">
                        <h3 className="text-sm font-semibold mb-3">Overall Distribution</h3>
                        <div className="flex rounded-lg overflow-hidden h-8">
                            {riskDistribution.map((risk) => (
                                <div
                                    key={risk.label}
                                    style={{
                                        width: `${risk.percentage}%`,
                                        background: risk.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {risk.percentage > 10 && (
                                        <span className="text-xs font-bold text-white">{risk.percentage}%</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2">
                            {riskDistribution.map((risk) => (
                                <span key={risk.label} className="text-xs" style={{ color: risk.color }}>
                                    {risk.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Your Values vs Average */}
            <div className="card animate-slide-up stagger-4">
                <h2 className="text-base font-semibold mb-4">Your Values vs Dataset Average</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {numericalComparisons.map((item) => {
                        const yourPercent = (item.value / item.max) * 100;
                        const avgPercent = (item.avg / item.max) * 100;
                        const isAboveAvg = item.value >= item.avg;
                        return (
                            <div key={item.label} className="p-4 rounded-lg" style={{ background: 'var(--background)', border: '1px solid var(--border)' }}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.label}</span>
                                    <span className="text-xs" style={{ color: isAboveAvg ? '#2ea043' : '#f04a2a' }}>
                                        {isAboveAvg ? '↑ Above' : '↓ Below'} avg
                                    </span>
                                </div>
                                {/* Your value */}
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs w-14" style={{ color: 'var(--text-muted)' }}>You</span>
                                    <div className="flex-1 metric-bar">
                                        <div className="metric-bar-fill" style={{ width: `${yourPercent}%`, background: 'var(--accent-yellow)' }} />
                                    </div>
                                    <span className="text-xs font-mono w-10 text-right" style={{ color: 'var(--foreground)' }}>
                                        {item.value}{item.unit}
                                    </span>
                                </div>
                                {/* Average */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs w-14" style={{ color: 'var(--text-muted)' }}>Avg</span>
                                    <div className="flex-1 metric-bar">
                                        <div className="metric-bar-fill" style={{ width: `${avgPercent}%`, background: 'var(--text-muted)' }} />
                                    </div>
                                    <span className="text-xs font-mono w-10 text-right" style={{ color: 'var(--text-muted)' }}>
                                        {item.avg.toFixed(1)}{item.unit}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
