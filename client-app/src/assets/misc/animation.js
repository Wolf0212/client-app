export function moveImage(location) {
    if (location === 'register') {
        document.getElementById('wrapper').style.left = '100.2%';
        document.getElementById('right-panel').style.opacity = '0%';
        document.getElementById('left-panel').style.opacity = '100%';
    }
    if (location === 'login') {
        document.getElementById('wrapper').style.left = '0%';
        document.getElementById('right-panel').style.opacity = '100%';
        document.getElementById('left-panel').style.opacity = '0%';
    }
}