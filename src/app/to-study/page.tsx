'use client';

import { useState } from 'react';
import { kanbanTasks, KanbanTask } from '@/lib/mock-data';
import { Plus, GripVertical, Calendar } from 'lucide-react';

const COLUMNS = [
    { id: 'todo' as const, title: 'To Do', color: 'var(--accent-red)', dot: '#f87171' },
    { id: 'in-progress' as const, title: 'In Progress', color: 'var(--accent-amber)', dot: '#fbbf24' },
    { id: 'done' as const, title: 'Done', color: 'var(--accent-green)', dot: '#34d399' },
];

function PriorityDot({ priority }: { priority: string }) {
    const color = priority === 'high' ? '#f87171' : priority === 'medium' ? '#fbbf24' : '#34d399';
    return <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />;
}

export default function ToStudyPage() {
    const [tasks] = useState<KanbanTask[]>(kanbanTasks);

    return (
        <div className="p-6 lg:p-8 space-y-6 animate-fade-in ">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-[22px] font-semibold tracking-tight" style={{ color: 'var(--foreground)' }}>To-Study Board</h1>
                    <p className="text-[13px] mt-1" style={{ color: 'var(--text-secondary)' }}>Organize your study tasks with a Kanban workflow</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer btn-minimal"
                    style={{ background: 'rgba(56,189,248,0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(56,189,248,0.15)' }}>
                    <Plus size={14} /> Add Task
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {COLUMNS.map((col, ci) => {
                    const colTasks = tasks.filter((t) => t.status === col.id);
                    return (
                        <div key={col.id} className={`animate-slide-up stagger-${ci + 1}`}>
                            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
                                <span style={{ width: 8, height: 8, borderRadius: 3, background: col.dot }} />
                                <h2 className="text-[13px] font-semibold" style={{ color: 'var(--foreground)' }}>{col.title}</h2>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto"
                                    style={{ background: `${col.dot}15`, color: col.dot }}>
                                    {colTasks.length}
                                </span>
                            </div>
                            <div className="space-y-2.5">
                                {colTasks.map((task) => (
                                    <div key={task.id} className="glass p-4 cursor-pointer" style={{ borderRadius: 14 }}>
                                        <div className="flex items-start gap-2.5">
                                            <GripVertical size={12} style={{ color: 'var(--text-muted)', marginTop: 3, flexShrink: 0 }} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <PriorityDot priority={task.priority} />
                                                    <span className="text-[12px] font-medium" style={{ color: 'var(--foreground)' }}>{task.title}</span>
                                                </div>
                                                {task.due_date && (
                                                    <div className="flex items-center gap-1 mt-1.5 ml-[13px]">
                                                        <Calendar size={10} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
                                                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                                            {new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {colTasks.length === 0 && (
                                    <div className="text-center py-10 rounded-2xl" style={{ border: '1px dashed rgba(255,255,255,0.06)' }}>
                                        <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>No tasks</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
