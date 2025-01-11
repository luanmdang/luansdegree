import { Course, requirements } from '../data/requirements';

// Since ExploreCourses API has CORS restrictions, we'll generate the URL for linking
export function getExploreCoursesUrl(courseId: string): string {
  const formattedId = courseId.replace(/\s+/g, '').toLowerCase();
  return `https://explorecourses.stanford.edu/search?view=catalog&filter-coursestatus-Active=on&q=${formattedId}`;
}

// Format the course ID to a standardized format (e.g., "CS 106A")
export function formatCourseId(courseId: string): string {
  // Remove extra spaces and convert to uppercase
  const cleaned = courseId.trim().toUpperCase();
  // Add space between department and number if missing
  return cleaned.replace(/^([A-Z]+)(\d)/, '$1 $2');
}

// Find a course in our requirements data
function findCourseInRequirements(courseId: string): Course | undefined {
  const formattedId = formatCourseId(courseId);
  for (const category of requirements) {
    const course = category.courses.find(c => c.id === formattedId);
    if (course) {
      return course;
    }
  }
  return undefined;
}

// Create a course with values from requirements data if available
export function createCourse(courseId: string): Course {
  const formattedId = formatCourseId(courseId);
  const existingCourse = findCourseInRequirements(formattedId);
  
  if (existingCourse) {
    return { ...existingCourse };
  }

  // If course not found in requirements, create with default values
  return {
    id: formattedId,
    name: formattedId, // Use ID as temporary name
    units: 3 // Default units for unknown courses
  };
}