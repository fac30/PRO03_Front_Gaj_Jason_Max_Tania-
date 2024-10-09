import { useContext, useEffect, useState } from 'react';
import Button from '../buttons/Button';
import { UserContext } from '../sections/Content';
import Tracklist from '../playlist/Tracklist';
import { TracklistProps } from '../utils/playlistTypes';

interface PlaylistProps {
  onNext: () => void;
}

function PlaylistPage({ onNext }: PlaylistProps) {
  const { userName, playlistJson } = useContext(UserContext);
  const [resolvedPlaylist, setResolvedPlaylist] = useState<TracklistProps | null>(null);

  useEffect(() => {
    let isMounted = true;

    playlistJson
      .then((data) => {
        if (isMounted) {
          setResolvedPlaylist(data as TracklistProps);
        }
      })
      .catch((error) => {
        console.error('Error resolving playlistJson:', error);
        if (isMounted) {
          setResolvedPlaylist(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [playlistJson]);

  return (
    <section id="playlist" className="bg-[var(--purple)] flex flex-col justify-center items-center">
      <h1>{userName}, this is your</h1>
      <h1 className="text-white">TOP 5</h1>
      <div className="flex flex-col items-center w-3/4 h-96 overflow-y-auto shadow-xl shadow-[var(--purple-shadow)] bg-[var(--pink)] rounded-lg p-2">
        {resolvedPlaylist ? (
          <Tracklist playlist={resolvedPlaylist} />
        ) : (
          <p>Loading playlist...</p>
        )}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <Button onClick={onNext} label="Save playlist" disabled={false} loading={false} />
        <Button onClick={onNext} label="Try again" disabled={false} loading={false} />
      </div>
    </section>
  );
}

export default PlaylistPage;