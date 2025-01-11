import { RequirementCategory } from './requirements';

export interface Track {
  id: string;
  name: string;
  description: string;
  requirements: RequirementCategory[];
}

const commonMathRequirements: RequirementCategory = {
  name: "Mathematics",
  description: "Required mathematics foundation (26 units minimum)",
  required: 7,
  courses: [
    { id: "CS 103", name: "Mathematical Foundations of Computing", units: 5 },
    { id: "CS 109", name: "Introduction to Probability for Computer Scientists", units: 5 },
    { id: "MATH 19", name: "Calculus I", units: 3 },
    { id: "MATH 20", name: "Calculus II", units: 3 },
    { id: "MATH 21", name: "Calculus III", units: 3 },
    { id: "MATH 51", name: "Linear Algebra, Multivariable Calculus, and Modern Applications", units: 5 },
    { id: "MATH 52", name: "Integral Calculus of Several Variables", units: 5 },
    { id: "MATH 53", name: "Differential Equations with Linear Algebra", units: 5 },
    { id: "MATH 104", name: "Applied Matrix Theory", units: 3 },
    { id: "MATH 107", name: "Graph Theory", units: 3 },
    { id: "MATH 108", name: "Introduction to Combinatorics and Its Applications", units: 3 },
    { id: "MATH 109", name: "Groups and Symmetry", units: 3 },
    { id: "MATH 110", name: "Number Theory for Cryptography", units: 3 },
    { id: "MATH 113", name: "Linear Algebra and Matrix Theory", units: 3 }
  ]
};

const commonScienceRequirements: RequirementCategory = {
  name: "Science",
  description: "Science requirements (11 units minimum)",
  required: 3,
  courses: [
    { id: "PHYSICS 41", name: "Mechanics", units: 4 },
    { id: "PHYSICS 43", name: "Electricity and Magnetism", units: 4 },
    { id: "PHYSICS 45", name: "Light and Heat", units: 4 },
    { id: "PHYSICS 21", name: "Mechanics and Fluids", units: 4 },
    { id: "PHYSICS 23", name: "Electricity, Magnetism, and Optics", units: 4 },
    { id: "PHYSICS 61", name: "Mechanics and Special Relativity", units: 4 },
    { id: "PHYSICS 63", name: "Electricity, Magnetism and Waves", units: 4 }
  ]
};

const commonTISRequirements: RequirementCategory = {
  name: "Technology in Society",
  description: "Technology in Society requirement (3-5 units)",
  required: 1,
  courses: [
    { id: "CS 182", name: "Ethics, Public Policy, and Technological Change", units: 5 },
    { id: "CS 184", name: "Ethics and Technology", units: 4 }
  ]
};

const commonEngFundamentals: RequirementCategory = {
  name: "Engineering Fundamentals",
  description: "Engineering Fundamentals (13 units minimum)",
  required: 3,
  courses: [
    { id: "CS 106B", name: "Programming Abstractions", units: 5 },
    { id: "ENGR 40M", name: "An Intro to Making: What is EE", units: 3 },
    { id: "ENGR 76", name: "Information Science and Engineering", units: 3 }
  ]
};

const commonCSCore: RequirementCategory = {
  name: "Computer Science Core",
  description: "Required computer science core (15 units)",
  required: 3,
  courses: [
    { id: "CS 107", name: "Computer Organization and Systems", units: 5 },
    { id: "CS 111", name: "Operating Systems Principles", units: 5 },
    { id: "CS 161", name: "Design and Analysis of Algorithms", units: 5 }
  ]
};

export const tracks: Track[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    description: "Focus on machine learning, robotics, and artificial intelligence systems",
    requirements: [
      commonMathRequirements,
      commonScienceRequirements,
      commonTISRequirements,
      commonEngFundamentals,
      commonCSCore,
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
      }
    ]
  },
  {
    id: "systems",
    name: "Systems",
    description: "Focus on computer systems, architecture, and networking",
    requirements: [
      commonMathRequirements,
      commonScienceRequirements,
      commonTISRequirements,
      commonEngFundamentals,
      commonCSCore,
      {
        name: "Systems Core",
        description: "Required systems courses",
        required: 2,
        courses: [
          { id: "CS 112", name: "Operating Systems Kernel Implementation", units: 4 },
          { id: "CS 140E", name: "Operating Systems Design", units: 4 },
          { id: "CS 143", name: "Compilers", units: 4 },
          { id: "EE 180", name: "Digital Systems Architecture", units: 4 }
        ]
      },
      {
        name: "Systems Depth",
        description: "Systems depth courses",
        required: 2,
        courses: [
          { id: "CS 144", name: "Introduction to Computer Networking", units: 4 },
          { id: "CS 145", name: "Introduction to Big Data Systems", units: 4 },
          { id: "CS 149", name: "Parallel Computing", units: 4 },
          { id: "CS 155", name: "Computer and Network Security", units: 4 },
          { id: "CS 190", name: "Software Design Studio", units: 4 },
          { id: "CS 217", name: "Hardware Accelerators for Machine Learning", units: 4 },
          { id: "CS 240", name: "Advanced Topics in Operating Systems", units: 4 },
          { id: "CS 242", name: "Programming Languages", units: 4 },
          { id: "CS 243", name: "Program Analysis and Optimizations", units: 4 },
          { id: "CS 244", name: "Advanced Topics in Networking", units: 4 },
          { id: "CS 245", name: "Principles of Data-Intensive Systems", units: 4 }
        ]
      }
    ]
  },
  {
    id: "theory",
    name: "Theory",
    description: "Focus on theoretical computer science and mathematical foundations",
    requirements: [
      commonMathRequirements,
      commonScienceRequirements,
      commonTISRequirements,
      commonEngFundamentals,
      commonCSCore,
      {
        name: "Theory Core",
        description: "Required theory courses",
        required: 1,
        courses: [
          { id: "CS 154", name: "Introduction to the Theory of Computation", units: 4 }
        ]
      },
      {
        name: "Theory Depth",
        description: "Advanced theory courses",
        required: 2,
        courses: [
          { id: "CS 168", name: "The Modern Algorithmic Toolbox", units: 4 },
          { id: "CS 255", name: "Introduction to Cryptography", units: 4 },
          { id: "CS 261", name: "Combinatorial Optimization", units: 4 },
          { id: "CS 265", name: "Randomized Algorithms and Probabilistic Analysis", units: 4 }
        ]
      },
      {
        name: "Theory Electives",
        description: "Theory track electives",
        required: 2,
        courses: [
          { id: "CS 143", name: "Compilers", units: 4 },
          { id: "CS 151", name: "Logic Programming", units: 4 },
          { id: "CS 155", name: "Computer and Network Security", units: 4 },
          { id: "CS 157", name: "Computational Logic", units: 4 },
          { id: "CS 163", name: "The Practice of Theory Research", units: 4 },
          { id: "CS 166", name: "Data Structures", units: 4 },
          { id: "CS 205L", name: "Continuous Mathematical Methods with an Emphasis on Machine Learning", units: 4 },
          { id: "CS 228", name: "Probabilistic Graphical Models", units: 4 },
          { id: "CS 233", name: "Geometric and Topological Data Analysis", units: 4 },
          { id: "CS 242", name: "Programming Languages", units: 4 },
          { id: "CS 250", name: "Algebraic Error Correcting Codes", units: 4 },
          { id: "CS 254", name: "Computational Complexity", units: 4 },
          { id: "CS 259Q", name: "Quantum Computing", units: 4 },
          { id: "CS 263", name: "Counting and Sampling", units: 4 },
          { id: "CS 264", name: "Beyond Worst-Case Analysis", units: 4 }
        ]
      }
    ]
  },
  {
    id: "hci",
    name: "Human-Computer Interaction",
    description: "Focus on user experience, interface design, and human-centered computing",
    requirements: [
      commonMathRequirements,
      commonScienceRequirements,
      commonTISRequirements,
      commonEngFundamentals,
      commonCSCore,
      {
        name: "HCI Core",
        description: "Required HCI courses",
        required: 3,
        courses: [
          { id: "CS 147", name: "Introduction to Human-Computer Interaction Design", units: 4 },
          { id: "CS 142", name: "Web Applications", units: 4 },
          { id: "CS 147L", name: "Cross-platform Mobile App Development", units: 4 }
        ]
      },
      {
        name: "HCI Design Studios",
        description: "Design studio courses",
        required: 1,
        courses: [
          { id: "CS 247A", name: "Design for Artificial Intelligence", units: 4 },
          { id: "CS 247B", name: "Design for Behavior Change", units: 4 },
          { id: "CS 247G", name: "Design for Play", units: 4 },
          { id: "CS 247I", name: "Design for Understanding", units: 4 },
          { id: "CS 247S", name: "Service Design", units: 4 }
        ]
      }
    ]
  },
  {
    id: "info",
    name: "Information",
    description: "Focus on data management, information systems, and data science",
    requirements: [
      commonMathRequirements,
      commonScienceRequirements,
      commonTISRequirements,
      commonEngFundamentals,
      commonCSCore,
      {
        name: "Information Core",
        description: "Required information courses",
        required: 2,
        courses: [
          { id: "CS 124", name: "From Languages to Information", units: 4 },
          { id: "CS 145", name: "Introduction to Big Data Systems", units: 4 }
        ]
      },
      {
        name: "Information Applications",
        description: "Information systems applications",
        required: 2,
        courses: [
          { id: "CS 224N", name: "Natural Language Processing with Deep Learning", units: 4 },
          { id: "CS 224S", name: "Spoken Language Processing", units: 4 },
          { id: "CS 229", name: "Machine Learning", units: 4 },
          { id: "CS 233", name: "Geometric and Topological Data Analysis", units: 4 },
          { id: "CS 234", name: "Reinforcement Learning", units: 4 }
        ]
      },
      {
        name: "Information Systems",
        description: "Database and information systems",
        required: 1,
        courses: [
          { id: "CS 142", name: "Web Applications", units: 4 },
          { id: "CS 147", name: "Introduction to Human-Computer Interaction Design", units: 4 },
          { id: "CS 245", name: "Principles of Data-Intensive Systems", units: 4 },
          { id: "CS 246", name: "Mining Massive Data Sets", units: 4 }
        ]
      }
    ]
  }
];