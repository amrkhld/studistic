// Mock data based on StudentPerformanceFactors.csv structure
// and Studistic documentation (Supabase DB tables: users, student_features, predictions, grades)
// This will be replaced by Supabase + FastAPI calls later

// ===== Database Table Types (matching Supabase schema) =====

export interface User {
    id: string;
    email: string;
    full_name: string;
    avatar_url?: string;
    department: string;
    year: number;
    created_at: string;
}

export interface StudentFeatures {
    user_id: string;
    hours_studied: number;
    attendance: number;
    sleep_hours: number;
    previous_scores: number;
    tutoring_sessions: number;
    physical_activity: number;
    parental_involvement: 'Low' | 'Medium' | 'High';
    access_to_resources: 'Low' | 'Medium' | 'High';
    extracurricular_activities: boolean;
    motivation_level: 'Low' | 'Medium' | 'High';
    internet_access: boolean;
    family_income: 'Low' | 'Medium' | 'High';
    teacher_quality: 'Low' | 'Medium' | 'High';
    school_type: 'Public' | 'Private';
    peer_influence: 'Positive' | 'Neutral' | 'Negative';
    learning_disabilities: boolean;
    parental_education_level: 'High School' | 'College' | 'Postgraduate';
    distance_from_home: 'Near' | 'Moderate' | 'Far';
    gender: 'Male' | 'Female';
}

export interface Prediction {
    id: string;
    user_id: string;
    predicted_score: number;
    risk_level: 'At Risk' | 'Medium Risk' | 'High Performer';
    confidence: number;
    model_used: string;
    created_at: string;
}

export interface Grade {
    id: string;
    user_id: string;
    course_name: string;
    course_code: string;
    grade: string;
    score: number;
    semester: string;
    credit_hours: number;
}

// ===== ML / Analytics Types =====

export interface FeatureImportance {
    feature: string;
    importance: number;
    display_name: string;
}

export interface RiskDistribution {
    label: string;
    count: number;
    percentage: number;
    color: string;
}

export interface Recommendation {
    id: number;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    icon: string;
}

export interface DatasetStats {
    total_students: number;
    avg_exam_score: number;
    avg_attendance: number;
    avg_hours_studied: number;
    avg_sleep_hours: number;
    avg_previous_scores: number;
}

export interface KanbanTask {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'high' | 'medium' | 'low';
    due_date?: string;
}

// ===== Mock Data =====

export const currentUser: User = {
    id: 'usr-001',
    email: 'student@studistic.com',
    full_name: 'Student User',
    department: 'Information Systems',
    year: 3,
    created_at: '2024-09-01',
};

export const studentFeatures: StudentFeatures = {
    user_id: 'usr-001',
    hours_studied: 23,
    attendance: 84,
    sleep_hours: 7,
    previous_scores: 73,
    tutoring_sessions: 0,
    physical_activity: 3,
    parental_involvement: 'Low',
    access_to_resources: 'High',
    extracurricular_activities: false,
    motivation_level: 'Low',
    internet_access: true,
    family_income: 'Low',
    teacher_quality: 'Medium',
    school_type: 'Public',
    peer_influence: 'Positive',
    learning_disabilities: false,
    parental_education_level: 'High School',
    distance_from_home: 'Moderate',
    gender: 'Male',
};

export const latestPrediction: Prediction = {
    id: 'pred-001',
    user_id: 'usr-001',
    predicted_score: 67.4,
    risk_level: 'Medium Risk',
    confidence: 82.5,
    model_used: 'Linear Regression',
    created_at: '2026-03-06',
};

export const studentGrades: Grade[] = [
    { id: 'g1', user_id: 'usr-001', course_name: 'Data Structures', course_code: 'CS201', grade: 'B+', score: 85, semester: 'Fall 2025', credit_hours: 3 },
    { id: 'g2', user_id: 'usr-001', course_name: 'Database Systems', course_code: 'IS301', grade: 'A-', score: 90, semester: 'Fall 2025', credit_hours: 3 },
    { id: 'g3', user_id: 'usr-001', course_name: 'Web Development', course_code: 'CS301', grade: 'A', score: 95, semester: 'Fall 2025', credit_hours: 3 },
    { id: 'g4', user_id: 'usr-001', course_name: 'Statistics', course_code: 'MATH201', grade: 'B', score: 78, semester: 'Fall 2025', credit_hours: 3 },
    { id: 'g5', user_id: 'usr-001', course_name: 'Operating Systems', course_code: 'CS202', grade: 'B-', score: 72, semester: 'Spring 2025', credit_hours: 3 },
    { id: 'g6', user_id: 'usr-001', course_name: 'Software Engineering', course_code: 'SE301', grade: 'A-', score: 88, semester: 'Spring 2025', credit_hours: 3 },
    { id: 'g7', user_id: 'usr-001', course_name: 'Linear Algebra', course_code: 'MATH101', grade: 'C+', score: 65, semester: 'Spring 2025', credit_hours: 3 },
    { id: 'g8', user_id: 'usr-001', course_name: 'Discrete Math', course_code: 'MATH102', grade: 'B+', score: 84, semester: 'Fall 2024', credit_hours: 3 },
];

export const featureImportances: FeatureImportance[] = [
    { feature: 'Attendance', importance: 0.263, display_name: 'Attendance' },
    { feature: 'Hours_Studied', importance: 0.218, display_name: 'Hours Studied' },
    { feature: 'Previous_Scores', importance: 0.195, display_name: 'Previous Scores' },
    { feature: 'Tutoring_Sessions', importance: 0.089, display_name: 'Tutoring Sessions' },
    { feature: 'Sleep_Hours', importance: 0.068, display_name: 'Sleep Hours' },
    { feature: 'Parental_Involvement', importance: 0.052, display_name: 'Parental Involvement' },
    { feature: 'Access_to_Resources', importance: 0.041, display_name: 'Access to Resources' },
    { feature: 'Physical_Activity', importance: 0.032, display_name: 'Physical Activity' },
    { feature: 'Motivation_Level', importance: 0.024, display_name: 'Motivation Level' },
    { feature: 'Teacher_Quality', importance: 0.018, display_name: 'Teacher Quality' },
];

export const riskDistribution: RiskDistribution[] = [
    { label: 'High Performer', count: 5073, percentage: 75.6, color: '#34d399' },
    { label: 'Medium Risk', count: 1459, percentage: 21.8, color: '#fbbf24' },
    { label: 'At Risk', count: 175, percentage: 2.6, color: '#f87171' },
];

export const recommendations: Recommendation[] = [
    {
        id: 1,
        title: 'Increase Study Hours',
        description: 'Current: 23h/week → Target: 30h/week for optimal score improvement.',
        priority: 'high',
        icon: '📚',
    },
    {
        id: 2,
        title: 'Improve Attendance',
        description: 'Current: 84% → Target: 90%+. Attendance is the #1 predictor of exam scores.',
        priority: 'high',
        icon: '📌',
    },
    {
        id: 3,
        title: 'Start Tutoring Sessions',
        description: 'Students with 1+ tutoring sessions score 4.2 points higher on average.',
        priority: 'medium',
        icon: '👨‍🏫',
    },
    {
        id: 4,
        title: 'Maintain Sleep Schedule',
        description: 'Current: 7h — within the optimal 6-8h range. Keep it consistent.',
        priority: 'low',
        icon: '😴',
    },
];

export const datasetStats: DatasetStats = {
    total_students: 6607,
    avg_exam_score: 67.24,
    avg_attendance: 79.98,
    avg_hours_studied: 19.98,
    avg_sleep_hours: 7.03,
    avg_previous_scores: 75.07,
};

export const kanbanTasks: KanbanTask[] = [
    { id: 't1', title: 'Review Ch.4 — Data Structures', status: 'todo', priority: 'high', due_date: '2026-03-10' },
    { id: 't2', title: 'Complete Statistics Assignment', status: 'todo', priority: 'high', due_date: '2026-03-08' },
    { id: 't3', title: 'Read Database Normalization Notes', status: 'in-progress', priority: 'medium' },
    { id: 't4', title: 'Practice SQL Queries', status: 'in-progress', priority: 'medium', due_date: '2026-03-12' },
    { id: 't5', title: 'Web Dev Lab Report', status: 'done', priority: 'low' },
    { id: 't6', title: 'Review Linear Algebra Midterm', status: 'done', priority: 'high' },
];

export const modelComparison = [
    { model: 'Linear Regression', r2: 0.825, rmse: 1.52, mae: 0.41 },
    { model: 'Random Forest', r2: 0.887, rmse: 1.22, mae: 0.35 },
    { model: 'Neural Network', r2: 0.841, rmse: 1.45, mae: 0.39 },
];

// Helper functions
export function getRiskBadgeClass(risk: string): string {
    switch (risk) {
        case 'High Performer': return 'risk-high-performer';
        case 'Medium Risk': return 'risk-medium';
        case 'At Risk': return 'risk-at-risk';
        default: return 'risk-medium';
    }
}

export function getRiskColor(risk: string): string {
    switch (risk) {
        case 'High Performer': return '#34d399';
        case 'Medium Risk': return '#fbbf24';
        case 'At Risk': return '#f87171';
        default: return 'rgba(200,210,255,0.4)';
    }
}

export function getGradeColor(grade: string): string {
    if (grade.startsWith('A')) return '#34d399';
    if (grade.startsWith('B')) return '#38bdf8';
    if (grade.startsWith('C')) return '#fbbf24';
    if (grade.startsWith('D')) return '#f87171';
    return 'rgba(200,210,255,0.4)';
}
