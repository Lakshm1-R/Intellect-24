document.addEventListener('DOMContentLoaded', () => {
  const gctRadio = document.getElementById('gct');
  const otherRadio = document.getElementById('other');
  const gctEvents = document.getElementById('gct-events');
  const nonGctEvents = document.getElementById('non-gct-events');

  const verticalBRadios = document.querySelectorAll('input[name="vertical-b"]');
  const verticalBTech = document.getElementById('vertical-b-tech');
  const verticalBNonTech = document.getElementById('vertical-b-non-tech');
  const verticalCTech = document.getElementById('vertical-c-tech');
  const verticalCNonTech = document.getElementById('vertical-c-non-tech');

  // Show events based on college selection
  gctRadio.addEventListener('change', () => {
      gctEvents.style.display = 'block';
      nonGctEvents.style.display = 'none';
  });

  otherRadio.addEventListener('change', () => {
      gctEvents.style.display = 'none';
      nonGctEvents.style.display = 'block';
  });

  // Show Vertical B options and dynamically show Vertical C based on Vertical B choice
  verticalBRadios.forEach((radio) => {
      radio.addEventListener('change', (event) => {
          const value = event.target.value;

          // Display Vertical B options
          verticalBTech.style.display = value === 'tech' ? 'block' : 'none';
          verticalBNonTech.style.display = value === 'non-tech' ? 'block' : 'none';

          // For Vertical C, show opposite category options
          verticalCTech.style.display = value === 'non-tech' ? 'block' : 'none';
          verticalCNonTech.style.display = value === 'tech' ? 'block' : 'none';
      });
  });
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbwYCGUDKSD6XunZx_s13M0tDVgCvZt5zvk1fESQ5z_6BUx8HgZ_LhRxsUXL0mPTSeh-Kg/exec'; // Replace with your Google Apps Script URL
const form = document.forms['form-data']; 

form.addEventListener('submit', function(e)  {
  e.preventDefault(); // Prevent the default form submission
  fetch(scriptURL, {
    method: 'POST',
    body: new FormData(form) // Send form data
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON response
  })
  .then(data => {
    if (data.result === 'success') {
      alert("Thank you! Your registration has been submitted successfully. 🚨 Contact our club for further details");
      window.location.reload(); // Reload the page or redirect as needed
    } else {
      alert("Error: " + data.error); // Handle error from the server
    }
  })
  .catch(error => console.error('Error!', error.message));
});

/* navbar */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    burger.classList.toggle('toggle');
});
