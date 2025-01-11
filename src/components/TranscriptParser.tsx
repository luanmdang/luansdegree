import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Props {
  onParseTranscript: (courses: string[]) => void;
}

export function TranscriptParser({ onParseTranscript }: Props) {
  const [transcript, setTranscript] = useState('');

  const handleParse = () => {
    const courseRegex = /(?:CS|MATH)\s*\d+[A-Z]*/g;
    const matches = transcript.match(courseRegex) || [];
    const courses = [...new Set(matches)];
    onParseTranscript(courses);
    setTranscript('');
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8 transition-all hover:shadow-2xl hover:scale-[1.01] border border-white/20">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
        Parse Transcript
      </h2>
      <div className="space-y-4">
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste your transcript text here..."
          className="w-full h-32 p-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
        />
        <button
          onClick={handleParse}
          className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-lg shadow-blue-500/20"
        >
          <Search className="h-5 w-5" />
          <span>Parse Transcript</span>
        </button>
      </div>
    </div>
  );
}