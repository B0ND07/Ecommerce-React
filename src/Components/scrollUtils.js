export const scrollToComponent = (componentId) => {
    const component = document.getElementById(componentId);
    if (component) {
      component.scrollIntoView({ behavior: 'smooth' });
    }
  };