import { Production } from "api/papers"

export function getProductionString(production: Production): string {
    switch(production) {
        case 'ggf': return 'Gluon-gluon fusion'
        case 'vbf': return 'Vector-boson fusion'
        case 'whzh': return 'Vector-boson associated production'
        case 'tth': return 'ttH production'
    }
}

export function copyStringToClipboard (str: string): void {
    // Create new element
    const el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);

    alert('Copied!')
 }
 