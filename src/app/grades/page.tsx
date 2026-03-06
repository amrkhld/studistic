import { studentGrades, getGradeColor } from '@/lib/mock-data';
import { GraduationCap } from 'lucide-react';

export default function GradesPage() {
    const semesters = studentGrades.reduce((acc, g) => {
        if (!acc[g.semester]) acc[g.semester] = [];
        acc[g.semester].push(g);
        return acc;
    }, {} as Record<string, typeof studentGrades>);

    const gradePoints: Record<string, number> = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0,
    };
    const totalCredits = studentGrades.reduce((s, g) => s + g.credit_hours, 0);
    const totalPoints = studentGrades.reduce((s, g) => s + (gradePoints[g.grade] || 0) * g.credit_hours, 0);
    const gpa = (totalPoints / totalCredits).toFixed(2);
    const avgScore = (studentGrades.reduce((s, g) => s + g.score, 0) / studentGrades.length).toFixed(1);

    return (
        <div className="p-6 lg:p-8 space-y-6 animate-fade-in ">
            <header>
                <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>Grades</h1>
                <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>Track your academic results across all courses</p>
            </header>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Cumulative GPA', value: gpa, color: 'var(--accent-cyan)' },
                    { label: 'Average Score', value: avgScore, color: 'var(--accent-purple)' },
                    { label: 'Total Credits', value: `${totalCredits}`, color: 'var(--accent-green)' },
                    { label: 'Courses', value: `${studentGrades.length}`, color: 'var(--text-secondary)' },
                ].map((s, i) => (
                    <div key={s.label} className={`glass p-5 animate-slide-up stagger-${i + 1}`}>
                        <div className="text-[10px] font-medium mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                        <div className="text-[28px] font-bold leading-none" style={{ color: s.color }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Tables */}
            {Object.entries(semesters).map(([semester, grades], si) => (
                <div key={semester} className={`glass p-6 animate-slide-up stagger-${Math.min(si + 3, 6)}`}>
                    <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <GraduationCap size={14} strokeWidth={1.5} style={{ color: 'var(--accent-cyan)' }} />
                        <h2 className="text-[13px] font-semibold">{semester}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    {['Course', 'Code', 'Score', 'Grade', 'Credits'].map((h) => (
                                        <th key={h} className="text-[10px] font-semibold text-left py-2 px-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((g) => (
                                    <tr key={g.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                        <td className="py-3 px-3 text-[12px] font-medium" style={{ color: 'var(--foreground)' }}>{g.course_name}</td>
                                        <td className="py-3 px-3 text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>{g.course_code}</td>
                                        <td className="py-3 px-3 text-[12px]" style={{ color: 'var(--foreground)' }}>{g.score}</td>
                                        <td className="py-3 px-3">
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                                                style={{ background: `${getGradeColor(g.grade)}18`, color: getGradeColor(g.grade) }}>
                                                {g.grade}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>{g.credit_hours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}
