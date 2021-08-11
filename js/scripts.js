window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    //upload button
    const actualBtn = document.getElementById('actual-btn');
    const fileChosen = document.getElementById('file-chosen');
    actualBtn.addEventListener('change', function () {
        fileChosen.textContent = this.files[0].name
    });

});

//size restiction
function upload_check() {
    var upl = document.getElementById("actual-btn");
    var max = document.getElementById("max_id").value;

    if (upl.files[0].size > max) {
        alert("File too big! \nMax file size is 10 mb.");
        upl.value = "";
    }
};

//validating extensions
async function fileValidation() {
    var fileInput = document.getElementById('actual-btn');
    var filePath = fileInput.value;
    var fileExt = filePath.split(/(\\|\/)/g).pop();
    console.log(fileExt);
    const formData = new FormData();
    var allowedExtensions =
        /(\.doc|\.ppt|\.rtf|\.docx|\.xlsx|\.html|\.txt)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('Invalid file type!!');
        fileInput.value = '';
        return false;
    }
    else {

        formData.append("files", fileInput.files[0]);
        const response = await fetch('https://8tn5xuv4hf.execute-api.ap-southeast-1.amazonaws.com/uploadfile?filename=' + fileExt,
            {
                method: 'POST',
                body: formData
            }).then(res=>console.log(res.body)).catch(err=>console.log(err));
        console.log(await response);
    }
};

