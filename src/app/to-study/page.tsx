'use client';

import { useState } from 'react';
import { kanbanTasks, KanbanTask } from '@/lib/mock-data';
import { Plus, GripVertical, Calendar } from 'lucide-react';

const COLUMNS = [
    { id: 'todo' as const, title: 'To Do', color: '#f04a2a' },
    { id: 'in-progress' as const, title: 'In Progress', color: '#d29922' },
    { id: 'done' as const, title: 'Done', color: '#2ea043' },
];

function PriorityDot({ priority }: { priority: string }) {
    const color = priority === 'high' ? '#f04a2a' : priority === 'medium' ? '#d29922' : '#2ea043';
    return <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, display: 'inline-block' }} />;
}

export default function ToStudyPage() {
    const [tasks] = useState<KanbanTask[]>(kanbanTasks);

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-in">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                        To-Study Board
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        Organize your study tasks with a Kanban workflow
                    </p>
                </div>
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                    style={{
                        background: 'var(--accent-yellow)',
                        color: 'var(--shadow)',
                    }}
                >
                    <Plus size={16} />
                    Add Task
                </button>
            </header>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLUMNS.map((column) => {
                    const columnTasks = tasks.filter((t) => t.status === column.id);
                    return (
                        <div key={column.id} className="animate-slide-up">
                            {/* Column Header */}
                            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `2px solid ${column.color}` }}>
                                <span style={{ width: 10, height: 10, borderRadius: 3, background: column.color, display: 'inline-block' }} />
                                <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                                    {column.title}
                                </h2>
                                <span
                                    className="text-xs font-bold px-2 py-0.5 rounded-full ml-auto"
                                    style={{ background: `${column.color}20`, color: column.color }}
                                >
                                    {columnTasks.length}
                                </span>
                            </div>

                            {/* Tasks */}
                            <div className="space-y-3">
                                {columnTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="card cursor-pointer"
                                        style={{ padding: '1rem' }}
                                    >
                                        <div className="flex items-start gap-2">
                                            <GripVertical size={14} style={{ color: 'var(--text-muted)', marginTop: 2, flexShrink: 0 }} />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <PriorityDot priority={task.priority} />
                                                    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                                                        {task.title}
                                                    </span>
                                                </div>
                                                {task.description && (
                                                    <p className="text-xs ml-4" style={{ color: 'var(--text-muted)' }}>
                                                        {task.description}
                                                    </p>
                                                )}
                                                {task.due_date && (
                                                    <div className="flex items-center gap-1 mt-2 ml-4">
                                                        <Calendar size={10} style={{ color: 'var(--text-muted)' }} />
                                                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                                            {new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {columnTasks.length === 0 && (
                                    <div className="text-center py-8 rounded-lg" style={{ border: '1px dashed var(--border)' }}>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No tasks</p>
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
