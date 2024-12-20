import React from "react";
import * as Tone from 'tone';
import { useNoteContext } from "../stateManager/NoteContext"; // Import the NoteContext

const PlayNotes = () => {
    const { selectedNotes, selectNote, unselectNote} = useNoteContext(); // Use the NoteContext

    const handleNoteClick = (note, octave) => {
        const fullNote = note + octave;
        if (!selectedNotes.includes(fullNote)) {
            selectNote(fullNote); // Call selectNote from the context
        } else {
            unselectNote(fullNote); // Call unselectNote from the context
        }
    };

    const handleClear = () => {
        selectedNotes.forEach((note) => unselectNote(note));
    };

    const playNotesSynth = () => {
        // Create a polyphonic synthesizer
        const polySynth = new Tone.PolySynth().toDestination();

        // Apply audio effects
        const compressor = new Tone.Compressor(-30, 3).toDestination();
        const eq = new Tone.EQ3(-10, -10, -10).toDestination();

        // Connect the synthesizer to the effects chain
        polySynth.connect(compressor);
        compressor.connect(eq);

        // Trigger the attack and release of the selected notes
        const currTime = Tone.now();
        polySynth.triggerAttackRelease(selectedNotes, "1n", currTime);
    };

    return (
        <div style={{
            height: "100%",
            width: "100%",
            backgroundColor: "green",
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button onClick={playNotesSynth}>
                    Play Current Notes
                </button>
                <button onClick={handleClear}>Clear All</button>
            </div>
        </div>
    );
};

export default PlayNotes;
