import React from 'react';
import { Track } from '../data/tracks';
import { ChevronRight } from 'lucide-react';

interface Props {
  tracks: Track[];
  selectedTrackId: string | null;
  onSelectTrack: (trackId: string) => void;
}

export function TrackSelector({ tracks, selectedTrackId, onSelectTrack }: Props) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-8 transition-all hover:shadow-2xl hover:scale-[1.01] border border-white/20">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
        Select Your Track
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onSelectTrack(track.id)}
            className={`p-4 rounded-lg text-left transition-all ${
              selectedTrackId === track.id
                ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-2 border-blue-500/50'
                : 'bg-white/50 dark:bg-gray-700/30 hover:bg-blue-50 dark:hover:bg-gray-700/50 border-2 border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {track.name}
              </h3>
              <ChevronRight className={`h-5 w-5 transition-transform ${
                selectedTrackId === track.id ? 'text-blue-500 rotate-90' : 'text-gray-400'
              }`} />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {track.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}