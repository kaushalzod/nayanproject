function getFileExtenstion(filename)
{
    return filename.split('.').pop();
}

function fileValidation() {
    var fileInput = 
        document.getElementById('actual-btn');     
    var filePath = fileInput.value;
    var allowedExtensions = 
            /(\.doc|\.ppt|\.rtf|\.docx|\.xlsx|\.html|\.txt)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type');
        fileInput.value = '';
        return false;
    } 
}
