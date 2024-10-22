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