# Read Faster

A minimalist speed reading web application using RSVP (Rapid Serial Visual Presentation) technique with anchor letter highlighting for optimal reading focus.

## Features

- **RSVP Reading**: Words flash one at a time at your chosen speed
- **Anchor Letter Highlighting**: Red anchor letter stays fixed at screen center for consistent focal point
- **Adjustable Speed**: Control WPM (Words Per Minute) from 100-1000, even while reading
- **Sentence Pauses**: Automatic 1-second pause at the end of each sentence
- **Theme Toggle**: Switch between dark mode (black background, white text) and light mode (white background, black text)
- **Keyboard Shortcuts**: Space to pause/resume, Escape to stop

## Usage

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python3 -m http.server 8000`

2. **Paste Your Text**
   - Paste any text you want to read into the text area

3. **Set Your Speed**
   - Adjust the WPM slider (default: 300 WPM)
   - Beginners: 200-300 WPM
   - Intermediate: 400-600 WPM
   - Advanced: 600+ WPM

4. **Start Reading**
   - Click "Start Reading" or press Enter
   - Focus on the red anchor letter in the center
   - Let your peripheral vision read the rest of each word

5. **Control Playback**
   - Pause/Resume: Click button or press Space
   - Adjust Speed: Move the WPM slider during reading
   - Stop: Click "Stop" or press Escape

6. **Toggle Theme**
   - Click the ◐ button in the top-right corner
   - Your preference is saved automatically

## How It Works

### Anchor Letter Algorithm

The anchor letter (highlighted in red) is calculated to provide an optimal recognition point:
- 2-4 letter words: 2nd letter
- 5-6 letter words: 3rd letter
- 7-9 letter words: 4th letter
- 10-13 letter words: 5th letter
- 14+ letter words: ~35% position

This positioning matches the natural "Optimal Recognition Point" (ORP) discovered in speed reading research.

### Sentence Pauses

The application automatically detects sentence endings (`.`, `!`, `?`) and inserts a 1-second pause, giving your brain time to process the completed thought before continuing.

## Technical Details

- **Technology**: Vanilla HTML, CSS, and JavaScript (no framework required)
- **Typography**: Sora font from Google Fonts
- **Compatibility**: Works in all modern browsers
- **Storage**: Theme preference saved to localStorage

## Design Philosophy

This application follows a "typographic precision" approach:
- Refined minimalism with zero unnecessary elements
- Hypnotic, perfectly-centered focal point
- Calm, focused, almost meditative reading environment
- Surgical precision in layout and timing

## Keyboard Shortcuts

- **Enter**: Start reading (when in setup)
- **Space**: Pause/Resume (when reading)
- **Escape**: Stop and return to setup (when reading)

## Tips for Speed Reading

1. **Trust Your Peripheral Vision**: Don't try to read the whole word consciously - let your peripheral vision do the work while you focus on the red anchor letter.

2. **Start Slow**: Begin at 250-300 WPM and gradually increase as you get comfortable.

3. **Avoid Subvocalization**: Try not to "speak" the words in your head. Let your visual system process the words directly.

4. **Use the Pauses**: The 1-second sentence pauses help your brain consolidate information. Don't rush through them.

5. **Practice Daily**: Like any skill, speed reading improves with consistent practice.

## License

MIT License - Feel free to use and modify as you wish.
