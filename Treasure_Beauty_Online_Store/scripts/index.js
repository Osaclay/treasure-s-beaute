// Setup Materialize components when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
  try {
    // Initialize modals
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Initialize collapsible elements
    const items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    console.log('Materialize components initialized successfully.');
  } catch (error) {
    console.error('Error initializing Materialize components:', error);
  }
});

