import React, { useState, useEffect } from 'react';
import { GraduationCap, RotateCcw, Moon, Sun } from 'lucide-react';
import { requirements } from './data/requirements';
import { tracks } from './data/tracks';
import { RequirementCategory } from './components/RequirementCategory';
import { TranscriptParser } from './components/TranscriptParser';
import { TrackSelector } from './components/TrackSelector';
import { Course } from './data/requirements';

export default function App() {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(() => {
    const saved = localStorage.getItem('selectedTrackId');
    return saved || null;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories');
    if (saved) {
      return JSON.parse(saved);
    }
    const savedTrackId = localStorage.getItem('selectedTrackId');
    if (savedTrackId) {
      const track = tracks.find(t => t.id === savedTrackId);
      return track ? track.requirements : requirements;
    }
    return requirements;
  });

  const [completedCourses, setCompletedCourses] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('completedCourses');
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('completedCourses', JSON.stringify([...completedCourses]));
    localStorage.setItem('categories', JSON.stringify(categories));
    if (selectedTrackId) {
      localStorage.setItem('selectedTrackId', selectedTrackId);
    } else {
      localStorage.removeItem('selectedTrackId');
    }
  }, [completedCourses, categories, selectedTrackId]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSelectTrack = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      setSelectedTrackId(trackId);
      setCategories(track.requirements);
      setCompletedCourses(new Set());
    }
  };

  const handleToggleCourse = (courseId: string) => {
    setCompletedCourses(prev => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  const handleParseTranscript = (courses: string[]) => {
    const allCourseIds = categories.flatMap(category => 
      category.courses.map(course => course.id)
    );
    
    const validCourses = courses.filter(course => 
      allCourseIds.some(id => id.toLowerCase() === course.toLowerCase())
    );
    
    setCompletedCourses(prev => {
      const next = new Set(prev);
      validCourses.forEach(course => {
        const exactId = allCourseIds.find(id => 
          id.toLowerCase() === course.toLowerCase()
        );
        if (exactId) {
          next.add(exactId);
        }
      });
      return next;
    });
  };

  const handleAddCourse = (categoryName: string, course: Course) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.name === categoryName
          ? { ...cat, courses: [...cat.courses, course] }
          : cat
      )
    );
  };

  const handleDeleteCourse = (categoryName: string, courseId: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.name === categoryName
          ? { 
              ...cat, 
              courses: cat.courses.filter(course => course.id !== courseId)
            }
          : cat
      )
    );
    setCompletedCourses(prev => {
      const next = new Set(prev);
      next.delete(courseId);
      return next;
    });
  };

  const handleUpdateCourse = (categoryName: string, courseId: string, updates: Partial<Course>) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.name === categoryName
          ? {
              ...cat,
              courses: cat.courses.map(course => 
                course.id === courseId
                  ? { ...course, ...updates }
                  : course
              )
            }
          : cat
      )
    );
  };

  const handleReset = () => {
    setSelectedTrackId(null);
    setCategories(requirements);
    setCompletedCourses(new Set());
    localStorage.removeItem('selectedTrackId');
    localStorage.removeItem('categories');
    localStorage.removeItem('completedCourses');
  };

  const totalRequired = categories.reduce((sum, cat) => sum + cat.required, 0);
  const totalCompleted = categories.reduce((sum, cat) => {
    const categoryCompleted = cat.courses
      .filter(course => completedCourses.has(course.id))
      .length;
    return sum + Math.min(categoryCompleted, cat.required);
  }, 0);

  const progressPercentage = (totalCompleted / totalRequired) * 100;
  const selectedTrack = selectedTrackId ? tracks.find(t => t.id === selectedTrackId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Luan's Ultimate CS-BS Tracker
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-end">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                {totalCompleted} of {totalRequired} requirements completed
              </div>
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-lg transition-all text-gray-700 dark:text-gray-200 border border-blue-500/20 hover:border-blue-500/30"
              title="Reset to default requirements"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {selectedTrack && (
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {selectedTrack.name} Track
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {selectedTrack.description}
            </p>
          </div>
        )}

        <TrackSelector
          tracks={tracks}
          selectedTrackId={selectedTrackId}
          onSelectTrack={handleSelectTrack}
        />

        <TranscriptParser onParseTranscript={handleParseTranscript} />

        <div className="space-y-6">
          {categories.map((category) => (
            <RequirementCategory
              key={category.name}
              category={category}
              completedCourses={completedCourses}
              onToggleCourse={handleToggleCourse}
              onAddCourse={handleAddCourse}
              onDeleteCourse={handleDeleteCourse}
              onUpdateCourse={handleUpdateCourse}
            />
          ))}
        </div>
      </div>
    </div>
  );
}