function toggleEventOptions() {
    const participantType = document.getElementById("participantType").value;
    const gctEvents = document.getElementById("gctEvents");
    const nonGctEvents = document.getElementById("nonGctEvents");

    gctEvents.classList.add("hidden");
    nonGctEvents.classList.add("hidden");

    if (participantType === "GCT") {
        gctEvents.classList.remove("hidden");
    } else if (participantType === "non-GCT") {
        nonGctEvents.classList.remove("hidden");
    }
}

function filterGctEvents() {
    const filterValue = document.getElementById("gctDepartmentFilter").value;
    const gctEvents = document.querySelectorAll(".gctEvent");

    gctEvents.forEach(event => {
        if (filterValue === "all" || event.dataset.department === filterValue) {
            event.parentElement.style.display = "block"; // Show checkbox
        } else {
            event.parentElement.style.display = "none"; // Hide checkbox
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Google Form submission URL
        const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfn948x5cnNGgdVDbhtRkCLdCkMVcHBH_tal14gFL2avuu6Hg/formResponse';
        
        // Create URL encoded data (this is more reliable than FormData for Google Forms)
        const formData = new URLSearchParams();
        
        // Map your form fields to Google Form entry IDs
        const formMapping = {
            'email': 'entry.118821203',
            'name': 'entry.171351966',
            'college-name': 'entry.1519140118',
            'collegeArea': 'entry.1645430075',
            'department': 'entry.1918345754',
            'mobile': 'entry.1795372521',
            'year': 'entry.1354496791',
            'transactionId': 'entry.733331796'
        };

        // Add basic form fields
        Object.keys(formMapping).forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                formData.append(formMapping[fieldId], element.value);
            }
        });

        // Handle event selections
        let session1Value = '';
        let session2Value = '';
        let session3Value = '';
        
        const participantType = document.getElementById('participantType').value;
        
        if (participantType === 'GCT') {
            const selectedEvents = Array.from(document.querySelectorAll('.gctEvent:checked')).map(cb => cb.value);
            
            // Map selected events to sessions
            selectedEvents.forEach(event => {
                if (event === 'SHARK TANK') {
                    session1Value = 'SharkTank';
                } else if (event === 'TECH TREK') {
                    session2Value = 'Tech Trek';
                } else if (event === 'ELECTROGEN') {
                    session2Value = 'Electrogen';
                } else if (event === 'CIVITAS') {
                    session3Value = 'Civitas';
                } else if (event === 'Mr. WORKSHOP') {
                    session3Value = 'Mr. Workshop';
                }
            });
        } else if (participantType === 'non-GCT') {
            // Handle non-GCT event selections
            const eventA = document.querySelector('input[name="nonGctEventA"]:checked')?.value || '';
            const eventB = document.querySelector('input[name="nonGctEventB"]:checked')?.value || '';
            const eventC = document.querySelector('input[name="nonGctEventC"]:checked')?.value || '';
            
            session1Value = eventA;
            session2Value = eventB;
            session3Value = eventC;
        }
        
        // Append session choices
        formData.append('entry.13954014', session1Value);
        formData.append('entry.1258840798', session2Value);
        formData.append('entry.122816496', session3Value);
        
        // Validation
        const mobileNumber = document.getElementById('mobile').value;
        const mobileRegex = /^(91)?\d{10}$/;
        if (!mobileRegex.test(mobileNumber)) {
            alert('Please enter a valid mobile number (10 digits, optionally starting with 91)');
            return;
        }
        
        const email = document.getElementById('email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Create a hidden iframe for submission
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        // Create a form inside the iframe
        const iframeDoc = iframe.contentWindow.document;
        const iframeForm = iframeDoc.createElement('form');
        iframeForm.method = 'POST';
        iframeForm.action = formUrl;

        // Add all form data as hidden inputs
        formData.forEach((value, key) => {
            const input = iframeDoc.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            iframeForm.appendChild(input);
        });

        iframeDoc.body.appendChild(iframeForm);

        // Submit the form
        iframeForm.submit();

        // Clean up and show success message
        setTimeout(() => {
            document.body.removeChild(iframe);
            alert('Registration submitted successfully!');
            form.reset();
            
            // Reset event selections
            const gctEvents = document.getElementById('gctEvents');
            const nonGctEvents = document.getElementById('nonGctEvents');
            gctEvents.classList.add('hidden');
            nonGctEvents.classList.add('hidden');
        }, 2000);
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('registrationForm');
    
//     form.addEventListener('submit', async function(e) {
//         e.preventDefault();
        
//         // Google Form submission URL
//         const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfn948x5cnNGgdVDbhtRkCLdCkMVcHBH_tal14gFL2avuu6Hg/formResponse';
        
//         // Get form values
//         const email = document.getElementById('email').value;
//         const name = document.getElementById('name').value;
//         const collegeName = document.getElementById('college-name').value;
//         const collegeArea = document.getElementById('collegeArea').value;
//         const department = document.getElementById('department').value;
//         const mobile = document.getElementById('mobile').value;
//         const year = document.getElementById('year').value;
//         const transactionId = document.getElementById('transactionId')?.value || '';
        
//         // Handle event selections
//         let session1Value = '';
//         let session2Value = '';
//         let session3Value = '';
        
//         const participantType = document.getElementById('participantType').value;
        
//         if (participantType === 'GCT') {
//             const selectedEvents = Array.from(document.querySelectorAll('.gctEvent:checked')).map(cb => cb.value);
            
//             selectedEvents.forEach(event => {
//                 if (event === 'SHARK TANK') {
//                     session1Value = 'SharkTank';
//                 } else if (event === 'TECH TREK') {
//                     session2Value = 'Tech Trek';
//                 } else if (event === 'ELECTROGEN') {
//                     session2Value = 'Electrogen';
//                 } else if (event === 'CIVITAS') {
//                     session3Value = 'Civitas';
//                 } else if (event === 'Mr. WORKSHOP') {
//                     session3Value = 'Mr. Workshop';
//                 }
//             });
//         } else if (participantType === 'non-GCT') {
//             const eventA = document.querySelector('input[name="nonGctEventA"]:checked')?.value || '';
//             const eventB = document.querySelector('input[name="nonGctEventB"]:checked')?.value || '';
//             const eventC = document.querySelector('input[name="nonGctEventC"]:checked')?.value || '';
            
//             session1Value = eventA;
//             session2Value = eventB;
//             session3Value = eventC;
//         }

//         // Validation
//         const mobileRegex = /^(91)?\d{10}$/;
//         if (!mobileRegex.test(mobile)) {
//             alert('Please enter a valid mobile number (10 digits, optionally starting with 91)');
//             return;
//         }
        
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             alert('Please enter a valid email address');
//             return;
//         }

//         // Construct form data
//         const formData = new FormData();
//         formData.append('entry.118821203', email);
//         formData.append('entry.171351966', name);
//         formData.append('entry.1519140118', collegeName);
//         formData.append('entry.1645430075', collegeArea);
//         formData.append('entry.1918345754', department);
//         formData.append('entry.1795372521', mobile);
//         formData.append('entry.1354496791', year);
//         formData.append('entry.733331796', transactionId);
//         formData.append('entry.13954014', session1Value);
//         formData.append('entry.1258840798', session2Value);
//         formData.append('entry.122816496', session3Value);

//         try {
//             // Create a new XMLHttpRequest
//             const xhr = new XMLHttpRequest();
            
//             // Important: Set up the request as synchronous to prevent redirect
//             xhr.open('POST', formUrl, false);  // false makes it synchronous
            
//             // Set headers
//             xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
//             // Convert FormData to URL encoded string
//             const searchParams = new URLSearchParams();
//             for (const pair of formData) {
//                 searchParams.append(pair[0], pair[1]);
//             }
            
//             // Send the request
//             xhr.send(searchParams.toString());
            
//             // Handle the response
//             if (xhr.status === 0 || xhr.status === 200 || xhr.status === 302 || xhr.status === 303) {
//                 // Success case
//                 alert('Registration submitted successfully!');
//                 form.reset();
                
//                 // Reset event selections
//                 const gctEvents = document.getElementById('gctEvents');
//                 const nonGctEvents = document.getElementById('nonGctEvents');
//                 gctEvents.classList.add('hidden');
//                 nonGctEvents.classList.add('hidden');
                
//                 // Reset participant type
//                 document.getElementById('participantType').value = '';
//             } else {
//                 throw new Error('Submission failed');
//             }
//         } catch (error) {
//             console.error('Submission error:', error);
//             alert('There was an error submitting the form. Please try again.');
//         }
//     });
// });