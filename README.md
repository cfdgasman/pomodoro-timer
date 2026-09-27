# Pomodoro Timer

A minimal [Pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) focus timer written in plain HTML, CSS and JavaScript.

**Live demo:** https://cfdgasman.github.io/pomodoro-timer/

- 25-minute focus sessions, 5-minute short breaks and 15-minute long breaks
- Switches to the next mode by itself, with a long break after every 4 focus sessions
- Plays a soft beep when a session ends
- Shows the time left in the browser tab title
- Keyboard shortcuts: <kbd>Space</kbd> starts or pauses, <kbd>R</kbd> resets
- Stays accurate in background tabs because it counts down to a fixed end time

## Run locally

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

## License

MIT
