const submitBtn = document.getElementById('submitBtn');
const tableContent = document.getElementById('tableContent');
const closeBtn = document.getElementById('closeBtn');
const boxInfo = document.querySelector('.box-info');
const bookmarkNameInput = document.getElementById('bookmarkName');
const bookmarkURLInput = document.getElementById('bookmarkURL');

let bookmarks = [];

submitBtn.addEventListener('click', () => {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkURLInput.value.trim();
    
    if (validateInput(name, url)) {
        bookmarks.push({ name, url });
        renderBookmarks();
        clearInputs();
        boxInfo.classList.add('d-none'); // Hide the info box on successful submission
    } else {
        boxInfo.classList.remove('d-none');
    }
});

closeBtn.addEventListener('click', () => {
    boxInfo.classList.add('d-none');
});

function validateInput(name, url) {
    return name.length >= 3 && isValidURL(url);
}

function isValidURL(string) {
    const res = string.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/g);
    return (res !== null);
}

function renderBookmarks() {
    tableContent.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${bookmark.name}</td>
            <td><a href="${bookmark.url}" target="_blank" class="btn btn-primary"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
            <td><button class="btn btn-danger" onclick="deleteBookmark(${index})"> <i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        `;
        tableContent.appendChild(row);
    });
}

function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    renderBookmarks();
}

function clearInputs() {
    bookmarkNameInput.value = '';
    bookmarkURLInput.value = '';
}
