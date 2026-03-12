// Helper function for building card elements
export const elementBuilder = (tag, cls, text) => {
  const el = document.createElement(tag);
  if (cls) el.classList.add(cls);
  if (text != null) {
    el.textContent = text;
  }
  return el;
};
