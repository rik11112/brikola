export function addClickListener(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
}
export function getById(id) {
    return document.getElementById(id);
}