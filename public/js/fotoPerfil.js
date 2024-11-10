document.addEventListener('DOMContentLoaded', function() {
    const userPhoto = document.getElementById('userPhoto');
    const fileInput = document.getElementById('fileInput');

    if (userPhoto && fileInput) {
        userPhoto.addEventListener('click', function() {
            fileInput.click();
        });

        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    userPhoto.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
});