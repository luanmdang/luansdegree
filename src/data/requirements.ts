export interface Course {
  id: string;
  name: string;
  units: number;
}

export interface RequirementCategory {
  name: string;
  description: string;
  courses: Course[];
  required: number; // number of courses required from this category
}

export const requirements: RequirementCategory[] = [
  {
    name: "Mathematics",
    description: "Required mathematics foundation (25/26 units)",
    required: 5,
    courses: [
      { id: "CS 103", name: "Mathematical Foundations of Computing", units: 5 },
      { id: "CS 109", name: "Probability for Computer Scientists", units: 5 },
      { id: "MATH 19", name: "Calculus I", units: 3 },
      { id: "MATH 20", name: "Calculus II", units: 3 },
      { id: "MATH 21", name: "Calculus III", units: 3 },
      { id: "MATH 51", name: "Linear Algebra and Multivariable Calculus", units: 5 }
    ]
  },
  {
    name: "Science",
    description: "Science requirements (11 units)",
    required: 3,
    courses: [
      { id: "PHYSICS 41", name: "Mechanics", units: 4 },
      { id: "PHYSICS 43", name: "Electricity and Magnetism", units: 4 },
      { id: "PHYSICS 45", name: "Light and Heat", units: 4 }
    ]
  },
  {
    name: "Technology in Society",
    description: "Technology in Society requirement (3-5 units)",
    required: 1,
    courses: [
      { id: "CS 182", name: "Ethics, Public Policy, and Technological Change", units: 5 },
      { id: "CS 184", name: "Ethics and Technology", units: 4 }
    ]
  },
  {
    name: "Engineering Fundamentals",
    description: "Engineering Fundamentals (13 units)",
    required: 2,
    courses: [
      { id: "CS 106A", name: "Programming Methodology", units: 5 },
      { id: "CS 106B", name: "Programming Abstractions", units: 5 }
    ]
  },
  {
    name: "Computer Science Core",
    description: "Required computer science core courses (15 units)",
    required: 3,
    courses: [
      { id: "CS 107", name: "Computer Organization & Systems", units: 5 },
      { id: "CS 110", name: "Principles of Computer Systems", units: 5 },
      { id: "CS 161", name: "Design and Analysis of Algorithms", units: 5 }
    ]
  },
  {
    name: "AI Track Core",
    description: "Required AI track core courses",
    required: 1,
    courses: [
      { id: "CS 221", name: "Artificial Intelligence: Principles and Techniques", units: 4 }
    ]
  },
  {
    name: "AI Methods",
    description: "Area I: AI Methods courses",
    required: 1,
    courses: [
      { id: "CS 228", name: "Probabilistic Graphical Models", units: 3 },
      { id: "CS 229", name: "Machine Learning", units: 3 },
      { id: "CS 234", name: "Reinforcement Learning and Decision Making", units: 3 }
    ]
  },
  {
    name: "Natural Language Processing",
    description: "Area II: Natural Language Processing courses",
    required: 1,
    courses: [
      { id: "CS 224N", name: "Natural Language Processing with Deep Learning", units: 4 },
      { id: "CS 224U", name: "Natural Language Understanding", units: 3 },
      { id: "CS 224V", name: "Natural Language Processing with Large Language Models", units: 3 }
    ]
  },
  {
    name: "Vision",
    description: "Area III: Vision courses",
    required: 1,
    courses: [
      { id: "CS 231A", name: "Computer Vision: From 3D Reconstruction to Recognition", units: 3 },
      { id: "CS 231N", name: "Deep Learning for Computer Vision", units: 3 }
    ]
  },
  {
    name: "Robotics",
    description: "Area IV: Robotics courses",
    required: 1,
    courses: [
      { id: "CS 223A", name: "Introduction to Robotics", units: 3 },
      { id: "CS 237A", name: "Principles of Robot Autonomy I", units: 3 }
    ]
  },
  {
    name: "Senior Project",
    description: "Capstone experience (3 units)",
    required: 1,
    courses: [
      { id: "CS 191", name: "Senior Project", units: 3 },
      { id: "CS 191W", name: "Writing Intensive Senior Project", units: 3 }
    ]
  },
  {
    name: "Track Electives",
    description: "Additional track-specific electives",
    required: 3,
    courses: [
      { id: "CS 224W", name: "Machine Learning with Graphs", units: 3 },
      { id: "CS 225A", name: "Experimental Robotics", units: 3 },
      { id: "CS 230", name: "Deep Learning", units: 3 },
      { id: "CS 236", name: "Deep Generative Models", units: 3 },
      { id: "CS 238", name: "Decision Making under Uncertainty", units: 3 }
    ]
  }
];