document.addEventListener("DOMContentLoaded", function() {
    const objective = document.getElementById("objective-details");
    const educationTimeline = document.getElementById("education-timeline");
    const certificationTimeline = document.getElementById("certification-timeline");
    const employmentTimeline = document.getElementById("employment-timeline");
    const skillsList = document.getElementById("skills-list");
    const projectTimeline = document.getElementById("project-timeline")

    // Objective section
    const item = document.createElement("p");
    const objectiveText = document.createTextNode("A dedicated AWS Cloud Practitioner, seeking an entry-level position where skills in cloud-based development can be utilized for career advancement.");
    item.classList.add("objective");
    item.appendChild(objectiveText);
    objective.appendChild(item);

    // Education Timeline
    const educationData = [
        { program: "AWS re/Start", name: "Edukasyon.ph", startDate: "August 29, 2023", endDate: "November 14, 2023" },
        { program: {course: "Bachelor of Science in Information Technology", major: "Major in Database Applications Programming"}, name: "Nueva Ecija University of Science and Technology", startDate: "2014", endDate: "2018" }
        // Add more education data as needed
    ];

    educationData.forEach(edu => {
        const item = document.createElement("div");
        
        // Create a span for the program-course and set its text content
        const programSpan = document.createElement("span");
        // Add a class to the span for styling
        programSpan.classList.add("program");
        programDetails = document.createElement("li")
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
        { technology: "AWS Certified Cloud Practitioner", name: "Amazon Web Services", startDate: "January 2024", endDate: "January 2027" },
        // Add more certification data as needed
    ];

    certificationData.forEach(cert => {
        const item = document.createElement("div");
        
        // Create a span for the employment and set its text content
        const technologySpan = document.createElement("span");
        technologySpan.textContent = cert.technology;
        // Add a class to the span for styling
        technologySpan.classList.add("technology");
        // Set the text content of the list item
        certDetails = document.createElement("li")
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


    // Function to create the clickable text element used in Personal Projects Section
    function createToggleText(clickableText, textsToShow, iconClass1, iconClass2) {
        // Create a div element to act as the container
        const container = document.createElement('div');
        container.classList.add('project-details-section');
        
        // Create a span element for the clickable text
        const clickableSpan = document.createElement('span');
        clickableSpan.classList.add('text-decoration-transition');
        clickableSpan.style.cursor = 'pointer';  // Change the cursor to pointer for better UX
        clickableSpan.style.color = 'blue';  // Optional: Style to look like a link
    
        // Create the Font Awesome icon element
        const icon = document.createElement('i');
        icon.className = iconClass1;
        icon.style.marginLeft = '8px';  // Optional: Add some space between the icon and text
       
        // Create a text node for the clickable text
        const textNode = document.createTextNode(clickableText);
    
        // Create a div element for the text to show/hide
        const textContainer = document.createElement('div');
        // textContainer.textContent = textToShow;
        textContainer.style.display = 'none';  // Initially hide the text
    
        // Add texts to the textContainer
        textsToShow.forEach(function(item) {
            if (typeof item === 'string') {
                // If item is a string, create a div element for text content
                const textElement = document.createElement('div');
                textElement.textContent = item;
                textContainer.appendChild(textElement);
            } else if (item instanceof HTMLElement) {
                // If item is a DOM element, append it directly
                textContainer.appendChild(item);
            } 
        });
        // Add the click event listener to toggle the text visibility
        clickableSpan.addEventListener('click', function() {
            if (textContainer.style.display === 'none') {
                textContainer.style.display = 'block';
                textNode.textContent = 'Hide details';
                icon.className = iconClass2;
                icon.style.marginRight = '8px';
                icon.style.marginLeft = '0';
                clickableSpan.appendChild(icon);
                clickableSpan.appendChild(textNode);
                
            } else {
                textContainer.style.display = 'none';
                textNode.textContent = 'View details';
                icon.className = iconClass1;
                icon.style.marginLeft = '8px';
                clickableSpan.appendChild(textNode);
                clickableSpan.appendChild(icon);
            }
        });
    
        // Append the icon and text node to the clickable span
        clickableSpan.appendChild(textNode);
        clickableSpan.appendChild(icon);
        
        // Append the clickable span and text container to the main container
        container.appendChild(clickableSpan);
        container.appendChild(textContainer);
        
        // Return the container element
        return container;
    }

    // Technical Project Timeline
    const projectData = [
        { name: "jd-espiritu.website", 
        details: ["Built a static website with automated deployment from GitHub to Amazon S3 using AWS CodePipeline", 
                "Utilized Amazon Route 53 to manage DNS, AWS Certificate Manager to handle HTTPS traffic, and Amazon CloudFront for content delivery.",
                "Implemented a page views counter using AWS Lambda, API Gateway, and Amazon DynamoDB"],
        github_link: "https://github.com/jdavid19/resume-website-v2/tree/main"
    },
        // Add more project data as needed
    ];

    projectData.forEach(project => {
        // Create div and paragraph
        const item = document.createElement("div");
        const textParagraph = document.createElement("p");
        textParagraph.classList.add("project-details");

        // Create a span for styling and anchor for the project name and set its text content
        const projectSpan = document.createElement("span");
        const projectName = document.createElement("a");
        projectName.href = "https://www.jd-espiritu.website";
        projectName.textContent = project.name;
        projectName.target = "_blank"
        projectName.style.textDecoration = "none";
        projectName.style.color = 'black';
        projectSpan.classList.add("project");
        projectSpan.appendChild(projectName);

        // GitHub Link
        const githubLink = document.createElement("a");
        githubLink.href = project.github_link;
        githubLink.textContent = "Link to GitHub repository";
        githubLink.target = "_blank";
        githubLink.style.textDecoration = "none";
        githubLink.style.color = 'blue';

        const projectElement = document.createElement("ul");

        // Create list items for each project details
        project.details.forEach(detail => {
            const projectDetailItem = document.createElement("li");
            projectDetailItem.textContent = detail;
            projectElement.appendChild(projectDetailItem);
            projectElement.appendChild(githubLink);
        });
        
        // Create Show/Hide Button
        const toggleText = createToggleText('View details', [projectElement], 'fa fa-arrow-right', 'fa fa-arrow-left');

        // Append button to paragraph
        textParagraph.appendChild(toggleText);
        
        // Append the span, project details
        item.appendChild(projectSpan);
        item.appendChild(textParagraph);
        
        // Append the list item to the projectTimeline
        projectTimeline.appendChild(item);
    });
    
    // Employment Timeline
    const employmentData = [
        { position: "PhilHealth Encoder, Makati Medical Center", company: "Exemplar168 Manpower and Trading Corp", startDate: "October 7, 2019", endDate: "January 15, 2020" },
        // Add more employment data as needed
    ];

    employmentData.forEach(emp => {
        const item = document.createElement("div");
        
        // Create a span for the employment and set its text content
        const employmentSpan = document.createElement("span");
        employmentSpan.textContent = emp.position;
        // Add a class to the span for styling
        employmentSpan.classList.add("employment");
        // Set the text content of the list item
        const employmentDetails = document.createElement("li")
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
    
});


