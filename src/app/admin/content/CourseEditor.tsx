'use client';

import { useEffect, useState, useCallback } from 'react';

// --------------- Types ---------------

interface CourseQuestion {
  id: string;
  type: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  acceptedAnswers?: string[];
  explanation: string;
  hint?: string;
  diagram?: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  questions: CourseQuestion[];
}

interface Unit {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  lessons: Lesson[];
}

type View = 'units' | 'lessons' | 'questions';

// --------------- Styles ---------------

const containerStyle: React.CSSProperties = {
  padding: '32px 0',
  fontFamily: 'system-ui',
};

const headerRow: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
  flexWrap: 'wrap',
  gap: 12,
};

const breadcrumbStyle: React.CSSProperties = {
  fontSize: 13,
  color: '#888',
  marginBottom: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexWrap: 'wrap',
};

const breadcrumbLink: React.CSSProperties = {
  color: '#3B82F6',
  cursor: 'pointer',
  textDecoration: 'none',
  fontWeight: 600,
};

const editorCardStyle: React.CSSProperties = {
  background: 'white',
  borderRadius: 12,
  border: '1px solid #E5E5E5',
  padding: 16,
  marginBottom: 12,
  cursor: 'pointer',
  transition: 'border-color 0.15s',
};

const btnPrimary: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: 14,
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  background: '#3B82F6',
  color: 'white',
  cursor: 'pointer',
};

const btnDanger: React.CSSProperties = {
  padding: '6px 14px',
  fontSize: 12,
  fontWeight: 700,
  border: 'none',
  borderRadius: 6,
  background: '#EF4444',
  color: 'white',
  cursor: 'pointer',
};

const btnSecondary: React.CSSProperties = {
  padding: '6px 14px',
  fontSize: 12,
  fontWeight: 700,
  border: '1.5px solid #D1D5DB',
  borderRadius: 6,
  background: 'white',
  color: '#374151',
  cursor: 'pointer',
};

const btnBack: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: 13,
  fontWeight: 600,
  border: '1.5px solid #D1D5DB',
  borderRadius: 8,
  background: 'white',
  color: '#374151',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 10,
  fontSize: 14,
  border: '1px solid #ddd',
  borderRadius: 8,
  boxSizing: 'border-box',
  fontFamily: 'system-ui',
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 80,
  resize: 'vertical',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 700,
  color: '#555',
  marginBottom: 4,
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const formSectionStyle: React.CSSProperties = {
  background: '#F8FAFF',
  border: '1.5px solid #C5D5F6',
  borderRadius: 12,
  padding: 20,
  marginBottom: 16,
};

const formFieldStyle: React.CSSProperties = {
  marginBottom: 16,
};

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  fontSize: 11,
  fontWeight: 700,
  padding: '2px 8px',
  borderRadius: 6,
  background: bg,
  color,
  whiteSpace: 'nowrap',
  display: 'inline-block',
});

const colorSwatchStyle = (color: string): React.CSSProperties => ({
  width: 20,
  height: 20,
  borderRadius: 4,
  background: color,
  border: '1px solid #ccc',
  display: 'inline-block',
  flexShrink: 0,
});

const actionRow: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  flexShrink: 0,
};

const formActions: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  marginTop: 20,
  flexWrap: 'wrap',
};

// --------------- Component ---------------

export default function CourseEditor({ professionId = 'mechanical-engineering', readOnly = false }: { professionId?: string; readOnly?: boolean }) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Navigation
  const [view, setView] = useState<View>('units');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // --------------- Data fetching ---------------

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`/api/content/course?profession=${professionId}`);
      if (!res.ok) throw new Error('Failed to fetch course data');
      const data = await res.json();
      const fetchedUnits: Unit[] = data.course;
      setUnits(fetchedUnits);

      // Refresh selected items with latest data
      if (selectedUnit) {
        const updated = fetchedUnits.find((u: Unit) => u.id === selectedUnit.id);
        if (updated) {
          setSelectedUnit(updated);
          if (selectedLesson) {
            const updatedLesson = updated.lessons.find(
              (l: Lesson) => l.id === selectedLesson.id,
            );
            if (updatedLesson) setSelectedLesson(updatedLesson);
            else {
              setSelectedLesson(null);
              setView('lessons');
            }
          }
        } else {
          setSelectedUnit(null);
          setSelectedLesson(null);
          setView('units');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [selectedUnit, selectedLesson, professionId]);

  useEffect(() => {
    setView('units');
    setSelectedUnit(null);
    setSelectedLesson(null);
    setLoading(true);
    fetchData();
  }, [professionId]); // eslint-disable-line react-hooks/exhaustive-deps

  // --------------- API helpers ---------------

  async function apiCall(
    url: string,
    method: string,
    body?: Record<string, unknown>,
  ) {
    setSaving(true);
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }
      setEditingId(null);
      setIsAdding(false);
      await fetchData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Operation failed');
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(
    type: 'units' | 'lessons' | 'course-questions',
    id: string,
    name: string,
  ) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    apiCall(`/api/admin/content/${type}/${id}`, 'DELETE');
  }

  // --------------- Navigation helpers ---------------

  function navigateToUnit(unit: Unit) {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setView('lessons');
    setEditingId(null);
    setIsAdding(false);
  }

  function navigateToLesson(lesson: Lesson) {
    setSelectedLesson(lesson);
    setView('questions');
    setEditingId(null);
    setIsAdding(false);
  }

  function navigateBack() {
    if (view === 'questions') {
      setSelectedLesson(null);
      setView('lessons');
    } else if (view === 'lessons') {
      setSelectedUnit(null);
      setView('units');
    }
    setEditingId(null);
    setIsAdding(false);
  }

  // --------------- Render ---------------

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={{ fontSize: 14, color: '#666' }}>Loading course data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <p style={{ color: '#EF4444', fontSize: 14, marginBottom: 12 }}>
          {error}
        </p>
        <button
          style={btnPrimary}
          onClick={() => {
            setLoading(true);
            fetchData();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {view === 'units' && (
        <UnitsView
          units={units}
          editingId={readOnly ? null : editingId}
          isAdding={readOnly ? false : isAdding}
          saving={saving}
          readOnly={readOnly}
          onAdd={() => {
            setIsAdding(true);
            setEditingId(null);
          }}
          onEdit={(id) => {
            setEditingId(id);
            setIsAdding(false);
          }}
          onCancelEdit={() => {
            setEditingId(null);
            setIsAdding(false);
          }}
          onSave={(data, id) => {
            if (id) apiCall(`/api/admin/content/units/${id}`, 'PUT', data);
            else apiCall('/api/admin/content/units', 'POST', data);
          }}
          onDelete={(id, name) => handleDelete('units', id, name)}
          onSelect={navigateToUnit}
        />
      )}

      {view === 'lessons' && selectedUnit && (
        <LessonsView
          unit={selectedUnit}
          editingId={readOnly ? null : editingId}
          isAdding={readOnly ? false : isAdding}
          saving={saving}
          readOnly={readOnly}
          onBack={navigateBack}
          onAdd={() => {
            setIsAdding(true);
            setEditingId(null);
          }}
          onEdit={(id) => {
            setEditingId(id);
            setIsAdding(false);
          }}
          onCancelEdit={() => {
            setEditingId(null);
            setIsAdding(false);
          }}
          onSave={(data, id) => {
            if (id)
              apiCall(`/api/admin/content/lessons/${id}`, 'PUT', data);
            else
              apiCall('/api/admin/content/lessons', 'POST', {
                ...data,
                unitId: selectedUnit.id,
              });
          }}
          onDelete={(id, name) => handleDelete('lessons', id, name)}
          onSelect={navigateToLesson}
        />
      )}

      {view === 'questions' && selectedUnit && selectedLesson && (
        <QuestionsView
          unit={selectedUnit}
          lesson={selectedLesson}
          editingId={readOnly ? null : editingId}
          isAdding={readOnly ? false : isAdding}
          saving={saving}
          readOnly={readOnly}
          onBack={navigateBack}
          onBackToUnits={() => {
            setSelectedUnit(null);
            setSelectedLesson(null);
            setView('units');
            setEditingId(null);
            setIsAdding(false);
          }}
          onAdd={() => {
            setIsAdding(true);
            setEditingId(null);
          }}
          onEdit={(id) => {
            setEditingId(id);
            setIsAdding(false);
          }}
          onCancelEdit={() => {
            setEditingId(null);
            setIsAdding(false);
          }}
          onSave={(data, id) => {
            if (id)
              apiCall(
                `/api/admin/content/course-questions/${id}`,
                'PUT',
                data,
              );
            else
              apiCall('/api/admin/content/course-questions', 'POST', {
                ...data,
                lessonId: selectedLesson.id,
              });
          }}
          onDelete={(id, name) =>
            handleDelete('course-questions', id, name)
          }
        />
      )}
    </div>
  );
}

// ============================================================
// UNITS VIEW
// ============================================================

function UnitsView({
  units,
  editingId,
  isAdding,
  saving,
  readOnly,
  onAdd,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  onSelect,
}: {
  units: Unit[];
  editingId: string | null;
  isAdding: boolean;
  saving: boolean;
  readOnly?: boolean;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSave: (data: Record<string, unknown>, id?: string) => void;
  onDelete: (id: string, name: string) => void;
  onSelect: (unit: Unit) => void;
}) {
  return (
    <>
      <div style={headerRow}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Course Units
          </h2>
          <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0' }}>
            {units.length} units
          </p>
        </div>
        {!isAdding && !readOnly && (
          <button style={btnPrimary} onClick={onAdd}>
            + Add Unit
          </button>
        )}
      </div>

      {isAdding && (
        <UnitForm
          saving={saving}
          onSave={(data) => onSave(data)}
          onCancel={onCancelEdit}
        />
      )}

      {units.map((unit) => (
        <div key={unit.id}>
          {editingId === unit.id ? (
            <UnitForm
              unit={unit}
              saving={saving}
              onSave={(data) => onSave(data, unit.id)}
              onCancel={onCancelEdit}
            />
          ) : (
            <div style={editorCardStyle} onClick={() => onSelect(unit)}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 6,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{unit.icon}</span>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      {unit.title}
                    </span>
                    <div style={colorSwatchStyle(unit.color)} />
                    <span style={badgeStyle('#F0F0F0', '#555')}>
                      {unit.lessons.length} lesson
                      {unit.lessons.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#888',
                      margin: 0,
                      wordBreak: 'break-word',
                    }}
                  >
                    {unit.description}
                  </p>
                </div>
                {!readOnly && (
                  <div
                    style={actionRow}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      style={btnSecondary}
                      onClick={() => onEdit(unit.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={btnDanger}
                      onClick={() => onDelete(unit.id, unit.title)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {units.length === 0 && !isAdding && (
        <p
          style={{
            fontSize: 14,
            color: '#999',
            textAlign: 'center',
            padding: 40,
          }}
        >
          No units yet. Click &quot;+ Add Unit&quot; to create one.
        </p>
      )}
    </>
  );
}

// ============================================================
// UNIT FORM
// ============================================================

function UnitForm({
  unit,
  saving,
  onSave,
  onCancel,
}: {
  unit?: Unit;
  saving: boolean;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(unit?.title ?? '');
  const [description, setDescription] = useState(unit?.description ?? '');
  const [color, setColor] = useState(unit?.color ?? '#3B82F6');
  const [icon, setIcon] = useState(unit?.icon ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      color: color.trim(),
      icon: icon.trim(),
    });
  }

  return (
    <form style={formSectionStyle} onSubmit={handleSubmit}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>
        {unit ? 'Edit Unit' : 'Add New Unit'}
      </h3>

      <div style={formFieldStyle}>
        <label style={labelStyle}>Title</label>
        <input
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Fundamentals of Statics"
        />
      </div>

      <div style={formFieldStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={textareaStyle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Unit description..."
        />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ ...formFieldStyle, flex: '1 1 180px' }}>
          <label style={labelStyle}>Color (hex)</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#3B82F6"
            />
            <div style={colorSwatchStyle(color)} />
          </div>
        </div>

        <div style={{ ...formFieldStyle, flex: '1 1 120px' }}>
          <label style={labelStyle}>Icon (emoji)</label>
          <input
            style={inputStyle}
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="e.g., &#x2699;&#xFE0F;"
          />
        </div>
      </div>

      <div style={formActions}>
        <button type="submit" style={btnPrimary} disabled={saving}>
          {saving ? 'Saving...' : unit ? 'Update Unit' : 'Create Unit'}
        </button>
        <button
          type="button"
          style={btnSecondary}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ============================================================
// LESSONS VIEW
// ============================================================

function LessonsView({
  unit,
  editingId,
  isAdding,
  saving,
  readOnly,
  onBack,
  onAdd,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
  onSelect,
}: {
  unit: Unit;
  editingId: string | null;
  isAdding: boolean;
  saving: boolean;
  readOnly?: boolean;
  onBack: () => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSave: (data: Record<string, unknown>, id?: string) => void;
  onDelete: (id: string, name: string) => void;
  onSelect: (lesson: Lesson) => void;
}) {
  return (
    <>
      <div style={breadcrumbStyle}>
        <span style={breadcrumbLink} onClick={onBack}>
          Units
        </span>
        <span>&#8250;</span>
        <span style={{ fontWeight: 600, color: '#333' }}>
          {unit.icon} {unit.title}
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button style={btnBack} onClick={onBack}>
          <span>&#8592;</span> Back
        </button>
      </div>

      <div style={headerRow}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>Lessons</h2>
          <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0' }}>
            {unit.lessons.length} lesson
            {unit.lessons.length !== 1 ? 's' : ''} in {unit.title}
          </p>
        </div>
        {!isAdding && !readOnly && (
          <button style={btnPrimary} onClick={onAdd}>
            + Add Lesson
          </button>
        )}
      </div>

      {isAdding && (
        <LessonForm
          saving={saving}
          onSave={(data) => onSave(data)}
          onCancel={onCancelEdit}
        />
      )}

      {unit.lessons.map((lesson) => (
        <div key={lesson.id}>
          {editingId === lesson.id ? (
            <LessonForm
              lesson={lesson}
              saving={saving}
              onSave={(data) => onSave(data, lesson.id)}
              onCancel={onCancelEdit}
            />
          ) : (
            <div
              style={editorCardStyle}
              onClick={() => onSelect(lesson)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 6,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{lesson.icon}</span>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>
                      {lesson.title}
                    </span>
                    <span style={badgeStyle('#F0F0F0', '#555')}>
                      {lesson.questions.length} question
                      {lesson.questions.length !== 1 ? 's' : ''}
                    </span>
                    <span style={badgeStyle('#E8F5E9', '#2E7D32')}>
                      {lesson.xpReward} XP
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: '#888',
                      margin: 0,
                      wordBreak: 'break-word',
                    }}
                  >
                    {lesson.description}
                  </p>
                </div>
                {!readOnly && (
                  <div
                    style={actionRow}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      style={btnSecondary}
                      onClick={() => onEdit(lesson.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={btnDanger}
                      onClick={() => onDelete(lesson.id, lesson.title)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {unit.lessons.length === 0 && !isAdding && (
        <p
          style={{
            fontSize: 14,
            color: '#999',
            textAlign: 'center',
            padding: 40,
          }}
        >
          No lessons yet. Click &quot;+ Add Lesson&quot; to create one.
        </p>
      )}
    </>
  );
}

// ============================================================
// LESSON FORM
// ============================================================

function LessonForm({
  lesson,
  saving,
  onSave,
  onCancel,
}: {
  lesson?: Lesson;
  saving: boolean;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(lesson?.title ?? '');
  const [description, setDescription] = useState(lesson?.description ?? '');
  const [icon, setIcon] = useState(lesson?.icon ?? '');
  const [xpReward, setXpReward] = useState(lesson?.xpReward ?? 10);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      icon: icon.trim(),
      xpReward,
    });
  }

  return (
    <form style={formSectionStyle} onSubmit={handleSubmit}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>
        {lesson ? 'Edit Lesson' : 'Add New Lesson'}
      </h3>

      <div style={formFieldStyle}>
        <label style={labelStyle}>Title</label>
        <input
          style={inputStyle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Free Body Diagrams"
        />
      </div>

      <div style={formFieldStyle}>
        <label style={labelStyle}>Description</label>
        <textarea
          style={textareaStyle}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Lesson description..."
        />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ ...formFieldStyle, flex: '1 1 120px' }}>
          <label style={labelStyle}>Icon (emoji)</label>
          <input
            style={inputStyle}
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="e.g., &#x1F4D0;"
          />
        </div>

        <div style={{ ...formFieldStyle, flex: '1 1 120px' }}>
          <label style={labelStyle}>XP Reward</label>
          <input
            style={inputStyle}
            type="number"
            min={0}
            value={xpReward}
            onChange={(e) => setXpReward(parseInt(e.target.value) || 0)}
          />
        </div>
      </div>

      <div style={formActions}>
        <button type="submit" style={btnPrimary} disabled={saving}>
          {saving ? 'Saving...' : lesson ? 'Update Lesson' : 'Create Lesson'}
        </button>
        <button
          type="button"
          style={btnSecondary}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ============================================================
// QUESTIONS VIEW
// ============================================================

function QuestionsView({
  unit,
  lesson,
  editingId,
  isAdding,
  saving,
  readOnly,
  onBack,
  onBackToUnits,
  onAdd,
  onEdit,
  onCancelEdit,
  onSave,
  onDelete,
}: {
  unit: Unit;
  lesson: Lesson;
  editingId: string | null;
  isAdding: boolean;
  saving: boolean;
  readOnly?: boolean;
  onBack: () => void;
  onBackToUnits: () => void;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onCancelEdit: () => void;
  onSave: (data: Record<string, unknown>, id?: string) => void;
  onDelete: (id: string, name: string) => void;
}) {
  const typeColors: Record<string, { bg: string; fg: string }> = {
    'multiple-choice': { bg: '#E3F2FD', fg: '#1565C0' },
    'true-false': { bg: '#FFF8E1', fg: '#F57F17' },
    'fill-blank': { bg: '#F3E5F5', fg: '#7B1FA2' },
    'teaching': { bg: '#E8F5E9', fg: '#2E7D32' },
    'sort-buckets': { bg: '#FFF3E0', fg: '#E65100' },
    'match-pairs': { bg: '#E0F7FA', fg: '#00695C' },
    'order-steps': { bg: '#FCE4EC', fg: '#AD1457' },
    'multi-select': { bg: '#E8EAF6', fg: '#283593' },
    'slider-estimate': { bg: '#F1F8E9', fg: '#33691E' },
    'scenario': { bg: '#EFEBE9', fg: '#4E342E' },
    'category-swipe': { bg: '#FDE0DC', fg: '#C62828' },
    'rank-order': { bg: '#E0F2F1', fg: '#004D40' },
    'pick-the-best': { bg: '#F3E5F5', fg: '#6A1B9A' },
    'image-tap': { bg: '#E3F2FD', fg: '#0D47A1' },
  };

  return (
    <>
      <div style={breadcrumbStyle}>
        <span style={breadcrumbLink} onClick={onBackToUnits}>
          Units
        </span>
        <span>&#8250;</span>
        <span style={breadcrumbLink} onClick={onBack}>
          {unit.icon} {unit.title}
        </span>
        <span>&#8250;</span>
        <span style={{ fontWeight: 600, color: '#333' }}>
          {lesson.icon} {lesson.title}
        </span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <button style={btnBack} onClick={onBack}>
          <span>&#8592;</span> Back
        </button>
      </div>

      <div style={headerRow}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
            Questions
          </h2>
          <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0' }}>
            {lesson.questions.length} question
            {lesson.questions.length !== 1 ? 's' : ''} in {lesson.title}
          </p>
        </div>
        {!isAdding && !readOnly && (
          <button style={btnPrimary} onClick={onAdd}>
            + Add Question
          </button>
        )}
      </div>

      {isAdding && (
        <QuestionForm
          saving={saving}
          onSave={(data) => onSave(data)}
          onCancel={onCancelEdit}
        />
      )}

      {lesson.questions.map((q) => {
        const tc = typeColors[q.type] || { bg: '#F0F0F0', fg: '#555' };
        return (
          <div key={q.id}>
            {editingId === q.id ? (
              <QuestionForm
                question={q}
                saving={saving}
                onSave={(data) => onSave(data, q.id)}
                onCancel={onCancelEdit}
              />
            ) : (
              <div style={{ ...editorCardStyle, cursor: 'default' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 12,
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 6,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span style={badgeStyle(tc.bg, tc.fg)}>
                        {q.type}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        margin: '0 0 4px',
                        wordBreak: 'break-word',
                      }}
                    >
                      {truncate(q.question, 150)}
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        color: '#888',
                        margin: 0,
                        wordBreak: 'break-word',
                      }}
                    >
                      {truncate(q.explanation, 100)}
                    </p>
                  </div>
                  {!readOnly && (
                    <div style={actionRow}>
                      <button
                        style={btnSecondary}
                        onClick={() => onEdit(q.id)}
                      >
                        Edit
                      </button>
                      <button
                        style={btnDanger}
                        onClick={() =>
                          onDelete(q.id, truncate(q.question, 40))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {lesson.questions.length === 0 && !isAdding && (
        <p
          style={{
            fontSize: 14,
            color: '#999',
            textAlign: 'center',
            padding: 40,
          }}
        >
          No questions yet. Click &quot;+ Add Question&quot; to create
          one.
        </p>
      )}
    </>
  );
}

// ============================================================
// QUESTION FORM
// ============================================================

function QuestionForm({
  question,
  saving,
  onSave,
  onCancel,
}: {
  question?: CourseQuestion;
  saving: boolean;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState<CourseQuestion['type']>(
    question?.type ?? 'multiple-choice',
  );
  const [questionText, setQuestionText] = useState(
    question?.question ?? '',
  );
  const [explanation, setExplanation] = useState(
    question?.explanation ?? '',
  );
  const [hint, setHint] = useState(question?.hint ?? '');

  // Multiple choice
  const [options, setOptions] = useState<string[]>(
    question?.options ?? ['', ''],
  );
  const [correctIndex, setCorrectIndex] = useState<number>(
    question?.correctIndex ?? 0,
  );

  // True/false
  const [correctAnswer, setCorrectAnswer] = useState<boolean>(
    question?.correctAnswer ?? true,
  );

  // Fill blank
  const [acceptedAnswers, setAcceptedAnswers] = useState<string[]>(
    question?.acceptedAnswers ?? [''],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!questionText.trim()) {
      alert('Question text is required');
      return;
    }
    if (!explanation.trim()) {
      alert('Explanation is required');
      return;
    }

    const data: Record<string, unknown> = {
      type,
      question: questionText.trim(),
      explanation: explanation.trim(),
    };

    if (hint.trim()) data.hint = hint.trim();

    if (type === 'multiple-choice') {
      const trimmed = options.map((o) => o.trim()).filter(Boolean);
      if (trimmed.length < 2) {
        alert('At least 2 options are required');
        return;
      }
      if (correctIndex >= trimmed.length) {
        alert('Please select a valid correct option');
        return;
      }
      data.options = trimmed;
      data.correctIndex = correctIndex;
    } else if (type === 'true-false') {
      data.correctAnswer = correctAnswer;
    } else if (type === 'fill-blank') {
      const trimmed = acceptedAnswers
        .map((a) => a.trim())
        .filter(Boolean);
      if (trimmed.length === 0) {
        alert('At least one accepted answer is required');
        return;
      }
      data.acceptedAnswers = trimmed;
    }

    onSave(data);
  }

  function addOption() {
    setOptions([...options, '']);
  }

  function removeOption(index: number) {
    if (options.length <= 2) return;
    const next = options.filter((_, i) => i !== index);
    setOptions(next);
    if (correctIndex >= next.length) setCorrectIndex(next.length - 1);
  }

  function updateOption(index: number, value: string) {
    const next = [...options];
    next[index] = value;
    setOptions(next);
  }

  function addAcceptedAnswer() {
    setAcceptedAnswers([...acceptedAnswers, '']);
  }

  function removeAcceptedAnswer(index: number) {
    if (acceptedAnswers.length <= 1) return;
    setAcceptedAnswers(acceptedAnswers.filter((_, i) => i !== index));
  }

  function updateAcceptedAnswer(index: number, value: string) {
    const next = [...acceptedAnswers];
    next[index] = value;
    setAcceptedAnswers(next);
  }

  return (
    <form style={formSectionStyle} onSubmit={handleSubmit}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px' }}>
        {question ? 'Edit Question' : 'Add New Question'}
      </h3>

      {/* Type selector */}
      <div style={formFieldStyle}>
        <label style={labelStyle}>Question Type</label>
        <select
          style={{ ...inputStyle, cursor: 'pointer' }}
          value={type}
          onChange={(e) =>
            setType(e.target.value as CourseQuestion['type'])
          }
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True / False</option>
          <option value="fill-blank">Fill in the Blank</option>
          <option value="teaching">Teaching</option>
          <option value="sort-buckets">Sort Buckets</option>
          <option value="match-pairs">Match Pairs</option>
          <option value="order-steps">Order Steps</option>
          <option value="multi-select">Multi Select</option>
          <option value="slider-estimate">Slider Estimate</option>
          <option value="scenario">Scenario</option>
          <option value="category-swipe">Category Swipe</option>
          <option value="rank-order">Rank Order</option>
          <option value="pick-the-best">Pick the Best</option>
          <option value="image-tap">Image Tap</option>
        </select>
      </div>

      {/* Question text */}
      <div style={formFieldStyle}>
        <label style={labelStyle}>Question</label>
        <textarea
          style={textareaStyle}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter the question text..."
        />
      </div>

      {/* Type-specific fields */}
      {type === 'multiple-choice' && (
        <div style={formFieldStyle}>
          <label style={labelStyle}>Options</label>
          {options.map((opt, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctIndex === i}
                  onChange={() => setCorrectIndex(i)}
                />
                <span
                  style={{
                    fontSize: 11,
                    color: '#666',
                    fontWeight: 600,
                  }}
                >
                  Correct
                </span>
              </label>
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  style={{
                    ...btnDanger,
                    padding: '6px 10px',
                    fontSize: 14,
                    lineHeight: 1,
                  }}
                  onClick={() => removeOption(i)}
                  title="Remove option"
                >
                  &#215;
                </button>
              )}
            </div>
          ))}
          <button type="button" style={btnSecondary} onClick={addOption}>
            + Add Option
          </button>
        </div>
      )}

      {type === 'true-false' && (
        <div style={formFieldStyle}>
          <label style={labelStyle}>Correct Answer</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              style={{
                ...btnSecondary,
                padding: '10px 24px',
                fontSize: 14,
                background: correctAnswer ? '#3B82F6' : 'white',
                color: correctAnswer ? 'white' : '#374151',
                borderColor: correctAnswer ? '#3B82F6' : '#D1D5DB',
              }}
              onClick={() => setCorrectAnswer(true)}
            >
              True
            </button>
            <button
              type="button"
              style={{
                ...btnSecondary,
                padding: '10px 24px',
                fontSize: 14,
                background: !correctAnswer ? '#3B82F6' : 'white',
                color: !correctAnswer ? 'white' : '#374151',
                borderColor: !correctAnswer ? '#3B82F6' : '#D1D5DB',
              }}
              onClick={() => setCorrectAnswer(false)}
            >
              False
            </button>
          </div>
        </div>
      )}

      {type === 'fill-blank' && (
        <div style={formFieldStyle}>
          <label style={labelStyle}>Accepted Answers</label>
          {acceptedAnswers.map((ans, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'center',
                marginBottom: 8,
              }}
            >
              <input
                style={{ ...inputStyle, flex: 1 }}
                value={ans}
                onChange={(e) => updateAcceptedAnswer(i, e.target.value)}
                placeholder={`Accepted answer ${i + 1}`}
              />
              {acceptedAnswers.length > 1 && (
                <button
                  type="button"
                  style={{
                    ...btnDanger,
                    padding: '6px 10px',
                    fontSize: 14,
                    lineHeight: 1,
                  }}
                  onClick={() => removeAcceptedAnswer(i)}
                  title="Remove answer"
                >
                  &#215;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            style={btnSecondary}
            onClick={addAcceptedAnswer}
          >
            + Add Answer
          </button>
        </div>
      )}

      {/* Explanation */}
      <div style={formFieldStyle}>
        <label style={labelStyle}>Explanation</label>
        <textarea
          style={textareaStyle}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Explain the correct answer..."
        />
      </div>

      {/* Hint (optional) */}
      <div style={formFieldStyle}>
        <label style={labelStyle}>Hint (optional)</label>
        <input
          style={inputStyle}
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder="Optional hint for the student..."
        />
      </div>

      <div style={formActions}>
        <button type="submit" style={btnPrimary} disabled={saving}>
          {saving
            ? 'Saving...'
            : question
              ? 'Update Question'
              : 'Create Question'}
        </button>
        <button
          type="button"
          style={btnSecondary}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// --------------- Helpers ---------------

function truncate(s: string, len: number): string {
  return s.length > len ? s.slice(0, len) + '...' : s;
}
