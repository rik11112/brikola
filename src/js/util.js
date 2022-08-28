export function addClickListener(id, callback) {
    document.getElementById(id).addEventListener('click', callback);
}