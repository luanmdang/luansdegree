import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { RequirementCategory, Course } from '../data/requirements';
import { createCourse } from '../utils/exploreCourses';

interface Props {
  category: RequirementCategory;
  onAddCourse: (categoryName: string, course: Course) => void;
}

export function CourseManager({ category, onAddCourse }: Props) {
  const [isAdding, setIsAdding] = useState(false);
  const [courseId, setCourseId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    try {
      const course = createCourse(courseId);
      onAddCourse(category.name, course);
      setCourseId('');
      setIsAdding(false);
    } catch (err) {
      setError('Invalid course ID format. Please use format like "CS 106A".');
    }
  };

  return (
    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Course ID (e.g., CS 161)"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="flex-1 p-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-blue-500/20"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setCourseId('');
                setError(null);
              }}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 px-4 py-2"
            >
              Cancel
            </button>
          </div>
          {error && (
            <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}