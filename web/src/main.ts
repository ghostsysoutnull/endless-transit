// Composition root. The adapters and the first screen are wired here as the modules arrive.
const root = document.querySelector('#app');
if (root === null) throw new Error('#app is missing from index.html');
root.textContent = 'ENDLESS TRANSIT';
