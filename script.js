// ===== PAGE NAVIGATION SYSTEM =====
async function showPage(pageName) {
    try {
        // Fetch the page content
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('Page not found');
        
        const content = await response.text();
        
        // Update page content
        document.getElementById('page-content').innerHTML = content;
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Close mobile menu if open
        document.getElementById('navLinks').classList.remove('active');
        
        // Re-initialize page-specific scripts
        initializePageScripts(pageName);
        
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('page-content').innerHTML = '<div class="container"><h2>Page not found</h2></div>';
    }
}

