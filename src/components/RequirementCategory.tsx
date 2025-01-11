import React, { useState } from 'react';
import { Check, Circle, ExternalLink, Trash2, Edit2, Save, X } from 'lucide-react';
import { RequirementCategory as CategoryType, Course } from '../data/requirements';
import { CourseManager } from './CourseManager';
import { getExploreCoursesUrl } from '../utils/exploreCourses';

interface Props {
  category: CategoryType;
  completedCourses: Set<string>;
  onToggleCourse: (courseId: string) => void;
  onAddCourse: (categoryName: string, course: Course) => void;
  onDeleteCourse: (categoryName: string, courseId: string) => void;
  onUpdateCourse: (categoryName: string, courseId: string, updates: Partial<Course>) => void;
}

interface EditableCourseProps {
  course: Course;
  isEditing: boolean;
  onStartEdit: () => void;
  onSave: (updates: Partial<Course>) => void;
  onCancel: () => void;
}

function EditableCourse({ course, isEditing, onStartEdit, onSave, onCancel }: EditableCourseProps) {
  const [name, setName] = useState(course.name);
  const [units, setUnits] = useState(course.units.toString());

  const handleSave = () => {
    const parsedUnits = parseFloat(units);
    if (isNaN(parsedUnits)) return;
    
    onSave({
      name,
      units: parsedUnits
    });
  };

  if (!isEditing) {
    return (
      <>
        <div className="text-sm text-gray-600 dark:text-gray-300">{course.name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{course.units} units</div>
      </>
    );
  }

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-sm p-1 border rounded w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Course name"
      />
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="text-sm p-1 border rounded w-20 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          step="0.5"
          min="0"
        />
        <span className="text-sm text-gray-500 dark:text-gray-400">units</span>
        <button
          onClick={handleSave}
          className="p-1 text-green-500 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
          title="Save changes"
        >
          <Save className="h-4 w-4" />
        </button>
        <button
          onClick={onCancel}
          className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          title="Cancel"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </>
  );
}

export function RequirementCategory({ 
  category, 
  completedCourses, 
  onToggleCourse, 
  onAddCourse,
  onDeleteCourse,
  onUpdateCourse
}: Props) {
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  
  const completedCount = category.courses.filter(course => 
    completedCourses.has(course.id)
  ).length;

  const progressPercentage = (completedCount / category.required) * 100;

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-6 transition-all hover:shadow-2xl hover:scale-[1.01] border border-white/20">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            {category.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            {completedCount}/{category.required} Required
          </div>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {category.courses.map((course) => (
          <div 
            key={course.id}
            className="flex items-center space-x-3 p-3 hover:bg-white dark:hover:bg-gray-700/50 rounded-lg group transition-all"
          >
            <button 
              className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              onClick={() => onToggleCourse(course.id)}
            >
              {completedCourses.has(course.id) ? (
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-0.5">
                  <Check className="h-5 w-5 text-white" />
                </div>
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <a 
                  href={getExploreCoursesUrl(course.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center space-x-1"
                >
                  <span>{course.id}</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                {editingCourseId !== course.id && (
                  <button
                    onClick={() => setEditingCourseId(course.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-all"
                    title="Edit course"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <EditableCourse
                course={course}
                isEditing={editingCourseId === course.id}
                onStartEdit={() => setEditingCourseId(course.id)}
                onSave={(updates) => {
                  onUpdateCourse(category.name, course.id, updates);
                  setEditingCourseId(null);
                }}
                onCancel={() => setEditingCourseId(null)}
              />
            </div>
            <button
              onClick={() => onDeleteCourse(category.name, course.id)}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all"
              title="Delete course"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <CourseManager category={category} onAddCourse={onAddCourse} />
    </div>
  );
}