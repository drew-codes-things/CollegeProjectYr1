function toggleMenu() {
    alert("Menu opened successfully");
}

document.getElementById('applicationForm').addEventListener('submit', function(e) {
    const email = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    if (!email.includes('@')) {
        e.preventDefault(); 
        errorMessage.style.display = 'block'; 
    } else {
        errorMessage.style.display = 'none';
        alert('Thank you for applying, the process has started');
    }
});
