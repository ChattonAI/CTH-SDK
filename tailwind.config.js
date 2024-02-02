module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Adjust the glob patterns to match your project structure
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgba(51, 51, 51, 0.75)',
        'custom-light-gray': '#aaa',
      },
      borderRadius: {
        'custom': '15px',
      },
      borderWidth: {
        'custom': '3px',
      },
      spacing: {
        '14px': '14px',
        '23px': '23px',
        '60px': '60px',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'custom-sm': '14px',
        'custom-xs': '7px',
      },
      lineHeight: {
        'custom': '90%',
      },
      backdropBlur: {
        'custom': '50px',
      },
      maxWidth: {
        'custom': '389px',
      },
      padding: {
        '11px': '11px',
        '13px': '13px',
        '20px': '20px',
      },
      gap: {
        '9px': '9px',
      },
      aspectRatio: {
        '0.88': '0.88',
      },
    },
  },
  plugins: [
    require('postcss-preset-env'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // other plugins...
  ],
}
