import { studentGrades, getGradeColor } from '@/lib/mock-data';
import { GraduationCap, TrendingUp } from 'lucide-react';

export default function GradesPage() {
    // Group by semester
    const semesters = studentGrades.reduce((acc, grade) => {
        if (!acc[grade.semester]) acc[grade.semester] = [];
        acc[grade.semester].push(grade);
        return acc;
    }, {} as Record<string, typeof studentGrades>);

    // Calculate GPA approximation
    const gradePoints: Record<string, number> = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0,
    };

    const totalCredits = studentGrades.reduce((s, g) => s + g.credit_hours, 0);
    const totalPoints = studentGrades.reduce((s, g) => s + (gradePoints[g.grade] || 0) * g.credit_hours, 0);
    const gpa = (totalPoints / totalCredits).toFixed(2);
    const avgScore = (studentGrades.reduce((s, g) => s + g.score, 0) / studentGrades.length).toFixed(1);

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-in">
            {/* Header */}
            <header>
                <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                    Grades
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    Track your academic results across all courses
                </p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Cumulative GPA', value: gpa, color: 'var(--accent-yellow)' },
                    { label: 'Average Score', value: avgScore, color: 'var(--accent-blue)' },
                    { label: 'Total Credits', value: totalCredits.toString(), color: 'var(--accent-green)' },
                    { label: 'Total Courses', value: studentGrades.length.toString(), color: 'var(--text-secondary)' },
                ].map((stat) => (
                    <div key={stat.label} className="card animate-slide-up">
                        <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                        <div className="text-3xl font-bold" style={{ color: stat.color, fontFamily: 'var(--font-anton)' }}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>

            {/* Grades by Semester */}
            {Object.entries(semesters).map(([semester, grades]) => (
                <div key={semester} className="card animate-slide-up">
                    <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid var(--border)' }}>
                        <GraduationCap size={16} style={{ color: 'var(--accent-yellow)' }} />
                        <h2 className="text-sm font-semibold">{semester}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    {['Course', 'Code', 'Score', 'Grade', 'Credits'].map((h) => (
                                        <th key={h} className="text-xs font-semibold text-left py-2 px-3" style={{ color: 'var(--text-muted)' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((grade) => (
                                    <tr key={grade.id} className="transition-colors" style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td className="py-3 px-3 text-sm font-medium" style={{ color: 'var(--foreground)' }}>{grade.course_name}</td>
                                        <td className="py-3 px-3 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>{grade.course_code}</td>
                                        <td className="py-3 px-3 text-sm" style={{ color: 'var(--foreground)' }}>{grade.score}</td>
                                        <td className="py-3 px-3">
                                            <span
                                                className="text-sm font-bold px-2 py-0.5 rounded"
                                                style={{
                                                    background: `${getGradeColor(grade.grade)}20`,
                                                    color: getGradeColor(grade.grade),
                                                }}
                                            >
                                                {grade.grade}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-sm" style={{ color: 'var(--text-muted)' }}>{grade.credit_hours}</td>
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
