import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import { Play, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MidiPlayerProps {
  midiUrl: string;
}

interface NoteData {
  name: string;
  time: number;
  duration: number;
  midi: number;
}

const MidiPlayer = ({ midiUrl }: MidiPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [midiData, setMidiData] = useState<Midi | null>(null);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [currentTime, setCurrentTime] = useState(0);
  const [allNotes, setAllNotes] = useState<NoteData[]>([]);
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const scheduledEventsRef = useRef<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const pianoRollRef = useRef<HTMLDivElement>(null);

  // Piano keys configuration
  const pianoKeys = [
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  ];

  // MIDI note range for piano roll (C2 to C6)
  const midiNoteMin = 36; // C2
  const midiNoteMax = 84; // C6
  const noteRange = midiNoteMax - midiNoteMin;

  useEffect(() => {
    // Load MIDI file
    const loadMidi = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(midiUrl);
        const arrayBuffer = await response.arrayBuffer();
        const midi = new Midi(arrayBuffer);
        setMidiData(midi);
        
        // Extract all notes for piano roll visualization
        const notes: NoteData[] = [];
        midi.tracks.forEach((track) => {
          track.notes.forEach((note) => {
            notes.push({
              name: note.name,
              time: note.time,
              duration: note.duration,
              midi: note.midi,
            });
          });
        });
        setAllNotes(notes);
        console.log("MIDI loaded:", midi.name, "Notes:", notes.length);
      } catch (error) {
        console.error("Error loading MIDI:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadMidi();

    return () => {
      stopPlayback();
    };
  }, [midiUrl]);

  const stopPlayback = () => {
    scheduledEventsRef.current.forEach((id) => {
      Tone.getTransport().clear(id);
    });
    scheduledEventsRef.current = [];
    Tone.getTransport().stop();
    Tone.getTransport().cancel();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (synthRef.current) {
      synthRef.current.releaseAll();
    }

    setActiveNotes(new Set());
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const playMidi = async () => {
    if (!midiData) return;

    try {
      await Tone.start();
      console.log("Tone.js started");

      if (!synthRef.current) {
        synthRef.current = new Tone.PolySynth(Tone.Synth, {
          oscillator: { type: "triangle" },
          envelope: {
            attack: 0.02,
            decay: 0.1,
            sustain: 0.3,
            release: 0.8,
          },
        }).toDestination();
        synthRef.current.volume.value = -6;
      }

      setIsPlaying(true);
      startTimeRef.current = Tone.now();

      midiData.tracks.forEach((track) => {
        track.notes.forEach((note) => {
          const eventId = Tone.getTransport().schedule((time) => {
            synthRef.current?.triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            );

            Tone.getDraw().schedule(() => {
              setActiveNotes((prev) => new Set([...prev, note.name]));
              setTimeout(() => {
                setActiveNotes((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(note.name);
                  return newSet;
                });
              }, note.duration * 1000);
            }, time);
          }, note.time);

          scheduledEventsRef.current.push(eventId);
        });
      });

      const duration = midiData.duration;
      const endEventId = Tone.getTransport().schedule(() => {
        Tone.getDraw().schedule(() => {
          stopPlayback();
        }, Tone.now());
      }, duration + 0.5);
      scheduledEventsRef.current.push(endEventId);

      intervalRef.current = setInterval(() => {
        const elapsed = Tone.now() - startTimeRef.current;
        setCurrentTime(Math.min(elapsed, duration));
      }, 50);

      Tone.getTransport().start();
    } catch (error) {
      console.error("Error playing MIDI:", error);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      playMidi();
    }
  };

  const isBlackKey = (note: string) => note.includes("#");

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Calculate note position in piano roll
  const getNotePosition = (midiNote: number) => {
    const normalizedPosition = (midiNoteMax - midiNote) / noteRange;
    return normalizedPosition * 100;
  };

  const pixelsPerSecond = 60; // Width scaling for piano roll

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handlePlayPause}
          disabled={isLoading || !midiData}
          variant="outline"
          size="lg"
          className="gap-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Square className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
          {isLoading ? "Carregando..." : isPlaying ? "Parar" : "Tocar MIDI"}
        </Button>

        {midiData && (
          <span className="text-sm text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(midiData.duration)}
          </span>
        )}
      </div>

      {/* Progress bar */}
      {midiData && (
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100"
            style={{ width: `${(currentTime / midiData.duration) * 100}%` }}
          />
        </div>
      )}

      {/* Piano visualization */}
      <div className="relative bg-background/50 rounded-lg p-4 overflow-x-auto">
        <div className="flex min-w-max">
          {pianoKeys.map((note) => {
            const isBlack = isBlackKey(note);
            const isActive = activeNotes.has(note);

            return (
              <div
                key={note}
                className={`
                  relative transition-all duration-75
                  ${isBlack
                    ? `w-6 h-20 -mx-3 z-10 rounded-b ${isActive
                        ? "bg-primary shadow-lg shadow-primary/50"
                        : "bg-foreground/80"
                      }`
                    : `w-10 h-32 rounded-b border border-muted/30 ${isActive
                        ? "bg-primary/30 shadow-lg shadow-primary/30"
                        : "bg-background"
                      }`
                  }
                  ${isActive ? "scale-y-95 origin-top" : ""}
                `}
              >
                {!isBlack && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground">
                    {note.replace(/[0-9]/g, "")}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Piano Roll Visualization (DAW style) */}
      {midiData && allNotes.length > 0 && (
        <div className="relative bg-muted/20 rounded-lg overflow-hidden border border-muted/30">
          <div className="flex">
            {/* Piano keys sidebar */}
            <div className="w-12 flex-shrink-0 bg-background/80 border-r border-muted/30 z-10">
              {Array.from({ length: noteRange + 1 }).map((_, i) => {
                const midiNote = midiNoteMax - i;
                const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                const noteName = noteNames[midiNote % 12];
                const octave = Math.floor(midiNote / 12) - 1;
                const isBlack = noteName.includes("#");
                const isC = noteName === "C";

                return (
                  <div
                    key={midiNote}
                    className={`h-3 flex items-center justify-end pr-1 text-[6px] border-b border-muted/10
                      ${isBlack ? "bg-foreground/10 text-muted-foreground/50" : ""}
                      ${isC ? "border-b-muted/30" : ""}
                    `}
                  >
                    {isC && <span className="text-muted-foreground">{noteName}{octave}</span>}
                  </div>
                );
              })}
            </div>

            {/* Notes area with scrolling */}
            <div 
              ref={pianoRollRef}
              className="flex-1 relative overflow-x-auto"
              style={{ height: `${(noteRange + 1) * 12}px` }}
            >
              {/* Grid background */}
              <div 
                className="absolute inset-0"
                style={{ width: `${midiData.duration * pixelsPerSecond}px` }}
              >
                {/* Horizontal grid lines */}
                {Array.from({ length: noteRange + 1 }).map((_, i) => {
                  const midiNote = midiNoteMax - i;
                  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                  const noteName = noteNames[midiNote % 12];
                  const isBlack = noteName.includes("#");
                  const isC = noteName === "C";

                  return (
                    <div
                      key={i}
                      className={`absolute w-full h-3 border-b
                        ${isBlack ? "bg-muted/20 border-muted/10" : "bg-transparent border-muted/10"}
                        ${isC ? "border-b-muted/40" : ""}
                      `}
                      style={{ top: `${i * 12}px` }}
                    />
                  );
                })}

                {/* Vertical grid lines (beats) */}
                {Array.from({ length: Math.ceil(midiData.duration) + 1 }).map((_, i) => (
                  <div
                    key={i}
                    className={`absolute top-0 bottom-0 w-px ${i % 4 === 0 ? "bg-muted/40" : "bg-muted/15"}`}
                    style={{ left: `${i * pixelsPerSecond}px` }}
                  />
                ))}

                {/* Notes */}
                {allNotes.map((note, index) => {
                  const isActiveNote = currentTime >= note.time && currentTime <= note.time + note.duration;
                  const isPastNote = currentTime > note.time + note.duration;
                  
                  return (
                    <div
                      key={index}
                      className={`absolute rounded-sm transition-colors duration-100
                        ${isActiveNote 
                          ? "bg-primary shadow-lg shadow-primary/50" 
                          : isPastNote 
                            ? "bg-primary/40" 
                            : "bg-primary/70"
                        }
                      `}
                      style={{
                        left: `${note.time * pixelsPerSecond}px`,
                        top: `${((midiNoteMax - note.midi) / noteRange) * (noteRange * 12)}px`,
                        width: `${Math.max(note.duration * pixelsPerSecond, 4)}px`,
                        height: "10px",
                      }}
                    />
                  );
                })}

                {/* Playhead */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-secondary z-20 shadow-lg shadow-secondary/50"
                  style={{ 
                    left: `${currentTime * pixelsPerSecond}px`,
                    transition: "left 50ms linear"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active notes display */}
      {activeNotes.size > 0 && (
        <div className="flex flex-wrap gap-2">
          {Array.from(activeNotes).map((note) => (
            <span
              key={note}
              className="px-2 py-1 text-xs bg-primary/20 text-primary rounded animate-pulse"
            >
              {note}
            </span>
          ))}
        </div>
      )}

      {/* MIDI info */}
      {midiData && (
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Tracks: {midiData.tracks.length}</p>
          <p>Notas totais: {allNotes.length}</p>
        </div>
      )}
    </div>
  );
};

export default MidiPlayer;
