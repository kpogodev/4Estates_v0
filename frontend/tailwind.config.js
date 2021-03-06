const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
  })
})

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        'custom-color': 'rgba(24, 90, 219, 0.3) 0px 5px 29px 0px',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    backfaceVisibility,
  ],
  corePlugins: {
    aspectRatio: false,
  },
  daisyui: {
    themes: [
      {
        estates: {
          primary: '#185ADB',
          'primary-focus': '#154FC2',
          'primary-content': '#ffffff',

          secondary: '#113F9C',
          'secondary-focus': '#0A255C',
          'secondary-content': '#ffffff',

          accent: '#FFBA08',
          'accent-focus': '#FFEB05',
          'accent-content': '#222',

          neutral: '#3b424e',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#efefef',
          'base-content': '#222222',

          info: '#3498db',
          success: '#07bc0c',
          warning: '#f1c40f',
          error: '#e74c3c',

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
}
