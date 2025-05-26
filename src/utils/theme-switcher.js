// Function to apply the theme by adding/removing 'dark-mode' class from body
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('theme', theme);
};

export const initializeTheme = () => {
  let currentTheme = localStorage.getItem('theme');

  if (!currentTheme) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDark ? 'dark' : 'light';
  }

  applyTheme(currentTheme);
};

export const toggleTheme = () => {
  let currentTheme = localStorage.getItem('theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
};
