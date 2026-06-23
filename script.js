document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleDetails');
    const detailPanel = document.getElementById('detailPanel');

    toggleBtn.addEventListener('click', () => {
        const isOpened = detailPanel.style.maxHeight && detailPanel.style.maxHeight !== '0px';
        
        if (isOpened) {
            detailPanel.style.maxHeight = '0px';
            detailPanel.style.opacity = '0';
            toggleBtn.textContent = 'View Engagement Parameters';
        } else {
            // Uses scrollHeight to dynamically calculate panel height for smooth transitions
            detailPanel.style.maxHeight = detailPanel.scrollHeight + 'px';
            detailPanel.style.opacity = '1';
            toggleBtn.textContent = 'Hide Engagement Parameters';
        }
    });
});