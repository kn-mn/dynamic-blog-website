// Function to handle the form submission
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const titleToSave = document.getElementById('title').value;
    const contentToSave = document.getElementById('content').value;

    localStorage.setItem("title", titleToSave);
    localStorage.setItem("content", contentToSave);

    alert("Post saved");
});