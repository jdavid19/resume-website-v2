document.addEventListener("DOMContentLoaded", function() {
    const objective = document.getElementById("objective-details");
    const educationTimeline = document.getElementById("education-timeline");
    const certificationTimeline = document.getElementById("certification-timeline");
    const employmentTimeline = document.getElementById("employment-timeline");
    const skillsList = document.getElementById("skills-list");


    // Objective section
    const item = document.createElement("p");
    const objectiveText = document.createTextNode("An Aspiring Cloud Engineer, seeking an entry-level position where skills in cloud-based development can be utilized for career advancement.");
    item.appendChild(objectiveText);
    objective.appendChild(item);

    // Education Timeline
    const educationData = [
        { program: "AWS re/Start", name: "Edukasyon.ph", startDate: "August 29, 2023", endDate: "November 14, 2023" },
        { program: {course: "Bachelor of Science in Information Technology", major: "Major in Database Applications Programming"}, name: "Nueva Ecija University of Science and Technology", startDate: "2014", endDate: "2018" }
        // Add more education data as needed
    ];

    educationData.forEach(edu => {
        const item = document.createElement("li");
        
        // Create a span for the program-course and set its text content
        const programSpan = document.createElement("span");
        // Add a class to the span for styling
        programSpan.classList.add("program");

        if (typeof edu.program === 'object') {
            programSpan.textContent = edu.program.course;
            item.innerHTML = `${programSpan.outerHTML}\n    ${edu.program.major}\n    ${edu.name}\n    (${edu.startDate} - ${edu.endDate})`;
            
        } else {
            programSpan.textContent = edu.program;
            item.innerHTML = `${programSpan.outerHTML}\n    ${edu.name}\n    (${edu.startDate} - ${edu.endDate})`;
        }
        educationTimeline.appendChild(item);

        
    });

    // Certification Timeline
    const certificationData = [
        { technology: "Certified Cloud Practitioner", name: "Amazon Web Services", startDate: "January 2024", endDate: "January 2027" },
        // Add more certification data as needed
    ];

    certificationData.forEach(cert => {
        const item = document.createElement("li");
    
        // Create a span for the technology and set its text content
        const technologySpan = document.createElement("span");
        technologySpan.textContent = cert.technology;
        // Add a class to the span for styling
        technologySpan.classList.add("technology");
    
        // Set the text content of the list item
        item.innerHTML = `${technologySpan.outerHTML}\n    ${cert.name}\n    (${cert.startDate} - ${cert.endDate})`;
    
        // Append the list item to the certificationTimeline
        certificationTimeline.appendChild(item);
    });
    
    // Employment Timeline
    const employmentData = [
        { position: "PhilHealth Encoder, Makati Medical Center", company: "Exemplar168 Manpower and Trading Corp", startDate: "October 7, 2019", endDate: "January 15, 2020" },
        // Add more employment data as needed
    ];

    employmentData.forEach(emp => {
        const item = document.createElement("li");
        
        // Create a span for the employment and set its text content
        const employmentSpan = document.createElement("span");
        employmentSpan.textContent = emp.position;
        // Add a class to the span for styling
        employmentSpan.classList.add("employment");
        // Set the text content of the list item
        item.innerHTML = `${employmentSpan.outerHTML}\n    ${emp.company}\n    (${emp.startDate} - ${emp.endDate})`;
        // Append the list item to the employmentTimeline
        employmentTimeline.appendChild(item);
    });

    // Technical Skills
    const skillsData = [
        "Cloud Fundamentals",
        "AWS Core Services",
        "Python",
        "AWS SDK",
        "HTML",
        "CSS",
        "Javascript",
        "SQL",
        "Git",
        // Add more skills as needed
    ];

    skillsData.forEach(skill => {
        const item = document.createElement("li");

        // Create a span for the employment and set its text content
        const skillsSpan = document.createElement("span");
        skillsSpan.textContent = skill;
        // Add a class to the span for styling
        skillsSpan.classList.add("techskills");
        // Set the text content of the list item
        item.innerHTML = `${skillsSpan.outerHTML}`;
        // Append the list item to the employmentTimeline
        skillsList.appendChild(item);
    });

    
});


