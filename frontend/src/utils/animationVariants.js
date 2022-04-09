export const pageTransition = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
  },
}

export const simpleFadeInOut = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
  },
}

export const forViewSwitcher = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
  },
}

export const forViewSwitcherItems = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'backInOut',
    },
  },
  exit: {
    y: 30,
    opacity: 0,
  },
}

export const formContentChange = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
}
