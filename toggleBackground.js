document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Element is in view:', entry.target); // Debugging check
          entry.target.classList.add('bg-visible'); // Add class when visible
        } else {
          console.log('Element is out of view:', entry.target); // Debugging check
          entry.target.classList.remove('bg-visible'); // Remove class when not visible
        }
      });
    }, {
      threshold: 0.1 // 10% of the element is visible
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });
  