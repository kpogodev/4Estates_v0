module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        estates: {
          primary: '#185ADB',
          'primary-focus': '#1145BC',
          'primary-content': '#ffffff',

          secondary: '#FFC947',
          'secondary-focus': '#FFDA75',
          'secondary-content': '#222222',

          accent: '#0a1931',
          'accent-focus': '#345683',
          'accent-content': '#ffffff',

          neutral: '#3b424e',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#efefef',
          'base-content': '#222222',

          info: '#00D0FF',
          success: '#59C12C',
          warning: '#FFCC00',
          error: '#FC571B',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '50vw',

          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '0.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
};
