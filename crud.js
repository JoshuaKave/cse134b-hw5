const STORAGE_KEYS = { projects: 'portfolio-projects', experience: 'portfolio-experience' };
const dataTypeSelect = document.getElementById('data-type');
const itemForm = document.getElementById('item-form');
const itemIndexInput = document.getElementById('item-index');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnDelete = document.getElementById('btn-delete');
const btnCancel = document.getElementById('btn-cancel');
const itemsContainer = document.getElementById('items-container');
const projectFields = ['progress-group', 'link-group', 'link-text-group'];
const experienceFields = ['date-group'];

function getData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS[dataTypeSelect.value])) || [];
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEYS[dataTypeSelect.value], JSON.stringify(data));
}

function updateFields() {
    const isProject = dataTypeSelect.value === 'projects';
    projectFields.forEach(id => document.getElementById(id).hidden = !isProject);
    experienceFields.forEach(id => document.getElementById(id).hidden = isProject);
}

function renderList() {
    const items = getData();
    
    if (items.length === 0) {
        itemsContainer.innerHTML = '<li>No items yet.</li>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < items.length; i++) {
        html += '<li>';
        html += '<span>' + items[i].title + '</span>';
        html += '<span>';
        html += '<button type="button" data-action="update" onclick="edit(' + i + ')">Edit</button>';
        html += '<button type="button" data-action="delete" onclick="remove(' + i + ')">Delete</button>';
        html += '</span>';
        html += '</li>';
    }
    itemsContainer.innerHTML = html;
}

function resetForm() {
    itemForm.reset();
    itemIndexInput.value = '-1';
    formTitle.textContent = 'Create New Item';
    btnSubmit.textContent = 'Create';
    btnSubmit.dataset.action = 'create';
    btnDelete.hidden = true;
    document.getElementById('item-link-text').value = 'View Project';
    updateFields();
}

function getFormData() {
    const isProject = dataTypeSelect.value === 'projects';
    const data = {
        title: document.getElementById('item-title').value.trim(),
        imgSrc: document.getElementById('item-img-src').value.trim(),
        imgAlt: document.getElementById('item-img-alt').value.trim(),
        description: document.getElementById('item-description').value.trim(),
        keywords: document.getElementById('item-keywords').value.trim()
    };

    if (isProject) {
        const progress = document.getElementById('item-progress').value;
        if (progress) {
            data.progress = progress;
        }
        data.link = document.getElementById('item-link').value.trim();
        data.linkText = document.getElementById('item-link-text').value.trim() || 'View Project';
    } else {
        data.date = document.getElementById('item-date').value.trim();
    }

    Object.keys(data).forEach(k => { if (!data[k]) delete data[k]; });
    return data;
}

function create(itemData) {
    const data = getData();
    data.push(itemData);
    saveData(data);
    resetForm();
    renderList();
}

function update(index, itemData) {
    const data = getData();
    data[index] = itemData;
    saveData(data);
    resetForm();
    renderList();
}

function remove(index) {
    const data = getData();
    if (!confirm('Delete "' + data[index].title + '"?')) return;
    data.splice(index, 1);
    saveData(data);
    resetForm();
    renderList();
}

function edit(index) {
    const item = getData()[index];
    if (!item) return;
    
    updateFields();
    itemIndexInput.value = index;
    document.getElementById('item-title').value = item.title || '';
    document.getElementById('item-img-src').value = item.imgSrc || '';
    document.getElementById('item-img-alt').value = item.imgAlt || '';
    document.getElementById('item-description').value = item.description || '';
    document.getElementById('item-keywords').value = item.keywords || '';
    document.getElementById('item-progress').value = item.progress || '';
    document.getElementById('item-link').value = item.link || '';
    document.getElementById('item-link-text').value = item.linkText || 'View Project';
    document.getElementById('item-date').value = item.date || '';

    formTitle.textContent = 'Edit Item';
    btnSubmit.textContent = 'Update';
    btnSubmit.dataset.action = 'update';
    btnDelete.hidden = false;
}

dataTypeSelect.addEventListener('change', () => { resetForm(); renderList(); });
btnCancel.addEventListener('click', resetForm);
btnDelete.addEventListener('click', () => {
    const index = parseInt(itemIndexInput.value);
    if (index >= 0) remove(index);
});
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const index = parseInt(itemIndexInput.value);
    index >= 0 ? update(index, getFormData()) : create(getFormData());
});

updateFields();
renderList();