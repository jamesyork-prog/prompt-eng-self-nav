// /Users/james.york/WebstormProjects/prompt-engineering-deck/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",      // Scans all .html files in the root directory
    "./js/**/*.js",  // Scans all .js files in the js folder and its subdirectories
    // Add any other file paths here if you use Tailwind classes elsewhere
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here
      colors: {
        'flash-coral': '#FF555E',
        'flash-black': '#000000', // Note: Tailwind's default 'black' is #000000. You might not need to redefine this unless you intend to override it.
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // Added 'Outfit' with a generic 'sans-serif' fallback
        // You could also add other font families here if needed, e.g.:
        // serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    // Add any Tailwind plugins here
  ],
}
