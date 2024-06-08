document.addEventListener("DOMContentLoaded", function() {
    const objective = document.getElementById("objective-details");
    const educationTimeline = document.getElementById("education-timeline");
    const certificationTimeline = document.getElementById("certification-timeline");
    const employmentTimeline = document.getElementById("employment-timeline");
    const skillsList = document.getElementById("skills-list");
    const projectTimeline = document.getElementById("project-timeline")


    // Objective section
    const item = document.createElement("p");
    const objectiveText = document.createTextNode("An Aspiring Cloud Engineer, seeking an entry-level position where skills in cloud-based development can be utilized for career advancement.");
    const objectiveSpan = document.createElement("span");
    objectiveSpan.classList.add("objective");
    objectiveSpan.appendChild(objectiveText);
    item.appendChild(objectiveSpan);
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
        programDetails = document.createElement("p")
        // Add a class to the paragraph for styling
        programDetails.classList.add("program-details")

        if (typeof edu.program === 'object') {
            programSpan.textContent = edu.program.course;
            const detailsText = document.createTextNode(edu.program.major + "\n" + edu.name + "\n")
            const detailsText2 = document.createTextNode(`${edu.startDate} - ${edu.endDate}`)
            programDetails.appendChild(detailsText)
            programDetails.appendChild(detailsText2)
        } else {
            programSpan.textContent = edu.program;
            const detailsText = document.createTextNode(edu.name + "\n")
            const detailsText2 = document.createTextNode(`${edu.startDate} - ${edu.endDate}`)
            programDetails.appendChild(detailsText)
            programDetails.appendChild(detailsText2)
        }
        item.appendChild(programSpan)
        item.appendChild(programDetails)
        educationTimeline.appendChild(item);

    });

    // Certification Timeline
    const certificationData = [
        { technology: "Certified Cloud Practitioner", name: "Amazon Web Services", startDate: "January 2024", endDate: "January 2027" },
        // Add more certification data as needed
    ];

    certificationData.forEach(cert => {
        const item = document.createElement("li");
        
        // Create a span for the employment and set its text content
        const technologySpan = document.createElement("span");
        technologySpan.textContent = cert.technology;
        // Add a class to the span for styling
        technologySpan.classList.add("technology");
        // Set the text content of the list item
        certDetails = document.createElement("p")
        // Add a class to the paragraph for styling
        certDetails.classList.add("certification-details")
        
        const detailsText = document.createTextNode(cert.name + "\n")
        const detailsText2 = document.createTextNode(`${cert.startDate} - ${cert.endDate}`)
        certDetails.appendChild(detailsText)
        certDetails.appendChild(detailsText2)

        item.appendChild(technologySpan)
        item.appendChild(certDetails)
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
        employmentDetails = document.createElement("p")
        // Add a class to the paragraph for styling
        employmentDetails.classList.add("employment-details")

        const detailsText = document.createTextNode(emp.company + "\n")
        const detailsText2 = document.createTextNode(`${emp.startDate} - ${emp.endDate}`)
        employmentDetails.appendChild(detailsText)
        employmentDetails.appendChild(detailsText2)

        item.appendChild(employmentSpan)
        item.appendChild(employmentDetails)
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
        item.appendChild(skillsSpan)
        // Append the list item to the skillsList
        skillsList.appendChild(item);
    });


    // Technical Project Timeline
    const projectData = [
        { name: "jd-espiritu.website", 
        details: "Built a static website with a Continuous Deployment Pipeline from Github to S3 using the following AWS Services: AWS CodePipeline, Amazon S3, Amazon Route 53, AWS Certificate Manager, and Amazon CloudFront.",
        github_link: "https://github.com/jdavid19/resume-website-v2/tree/main"
    },
        { name: "Python Project with Boto3", 
        details: "A Python application that utilizes the Boto3 library (AWS SDK for Python) to interact with various AWS services programmatically. The application is based on my resume website.",
        github_link: "https://github.com/jdavid19/codepipeline-resume-website"
    },
        // Add more project data as needed
    ];

    projectData.forEach(project => {
        // Create list item
        const item = document.createElement("li");
        // Create a span for the project name and set its text content
        const projectSpan = document.createElement("span");
        projectSpan.textContent = project.name;
        // Add a class to the span for styling
        projectSpan.classList.add("project");
        // Create a paragraph for the project details
        const projectDetails = document.createElement("p");
        projectDetails.classList.add("project-details"); // Add class for styling
        const detailsText = document.createTextNode(project.details);
        const breakElement = document.createElement("br")
        
        const githubLink = document.createElement("a");
        githubLink.href = project.github_link;
        githubLink.textContent = "Link to GitHub repository";
        githubLink.target = "_blank"; // Set the link to open in a new tab

        projectDetails.appendChild(detailsText);
        projectDetails.appendChild(breakElement);
        projectDetails.appendChild(githubLink)
        
        // Append the span, project details
        item.appendChild(projectSpan);
        item.appendChild(projectDetails);
        
        // Append the list item to the projectTimeline
        projectTimeline.appendChild(item);
    });
    
});


