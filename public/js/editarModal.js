document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.getElementById('editButton');
    const editModal = document.getElementById('editModal');
    const cancelEdit = document.getElementById('cancelEdit');

    if (editButton && editModal && cancelEdit) {
        editButton.addEventListener('click', function() {
            editModal.style.display = 'flex';
        });

        cancelEdit.addEventListener('click', function() {
            editModal.style.display = 'none';
        });
    }
});