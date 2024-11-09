function generateResume() {
    // Get user input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skillsInput = document.getElementById("skills").value;
    const skills = skillsInput.split(',').map(skill => skill.trim());

    // Handle photo upload
    const photoInput = document.getElementById("photo");
    let photoURL = "";
    if (photoInput.files && photoInput.files.length > 0) {
        photoURL = URL.createObjectURL(photoInput.files[0]);
    }

    // Generate the resume HTML content
    const resumeContent = `
        <div id="resume">
            <h3>${name}</h3>
            ${photoURL ? `<img src="${photoURL}" alt="Profile Photo">` : ""}
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h4>Education</h4>
            <p>${education}</p>
            <h4>Experience</h4>
            <p>${experience}</p>
            <h4>Skills</h4>
            <ul>
                ${skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
    `;

    // Display the generated resume
    const resumeOutput = document.getElementById("resumeOutput");
    resumeOutput.innerHTML = resumeContent;
    const resumeSection = document.getElementById("resumeSection");
    resumeSection.style.display = "block";
}

function downloadResume() {
    const resumeOutput = document.getElementById("resumeOutput");

    // Use html2pdf library to convert resume to PDF
    html2pdf()
        .set({
            margin: 1,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .from(resumeOutput)
        .save();
}
