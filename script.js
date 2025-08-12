// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= headerHeight + 100 && sectionTop + sectionHeight > headerHeight + 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.backdropFilter = 'blur(12px)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to cards and sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .project-card, .community-card, .step');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form Validation (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Copy to Clipboard Functionality (for code snippets)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        // Could add a toast notification here
        console.log('Copied to clipboard');
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
    });
}

// Dark Mode Toggle (if needed in the future)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load Dark Mode Preference
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Search Functionality (for future implementation)
function initializeSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchResults = document.querySelector('#search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length > 2) {
                searchTimeout = setTimeout(() => {
                    performSearch(query);
                }, 300);
            } else {
                searchResults.innerHTML = '';
                searchResults.classList.remove('active');
            }
        });
    }
}

function performSearch(query) {
    // Placeholder for search implementation
    console.log('Searching for:', query);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance Optimization: Debounce Scroll Events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll handling logic here
}, 16); // ~60fps

// Accessibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main id to main element
    const main = document.querySelector('.main');
    if (main) {
        main.id = 'main';
    }
});

// Analytics Event Tracking (placeholder)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', { category, action, label });
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    }
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could send error reports to monitoring service
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(function(registration) {
        //         console.log('ServiceWorker registered');
        //     })
        //     .catch(function(error) {
        //         console.log('ServiceWorker registration failed');
        //     });
    });
}

// GitHub Repository Showcase
class GitHubRepoShowcase {
    constructor(config = {}) {
        this.repositories = config.repositories || [];
        this.containerSelector = config.containerSelector || '.projects-grid';
        this.apiBaseUrl = 'https://api.github.com/repos/';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    async fetchRepoData(repoUrl) {
        // Extract owner/repo from GitHub URL
        const repoPath = this.extractRepoPath(repoUrl);
        if (!repoPath) return null;

        // Check cache first
        const cacheKey = repoPath;
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}${repoPath}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error(`Failed to fetch repo data for ${repoPath}:`, error);
            return null;
        }
    }

    extractRepoPath(url) {
        // Extract owner/repo from various GitHub URL formats
        const patterns = [
            /github\.com\/([^\/]+\/[^\/]+)/,
            /^([^\/]+\/[^\/]+)$/
        ];
        
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) {
                return match[1].replace(/\.git$/, '');
            }
        }
        return null;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 30) return `${diffDays} days ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#3178c6',
            'Python': '#3572A5',
            'Java': '#b07219',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'C++': '#f34b7d',
            'C': '#555555',
            'HTML': '#e34c26',
            'CSS': '#1572B6',
            'Shell': '#89e051',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Swift': '#fa7343',
            'Kotlin': '#A97BFF',
            'Dart': '#00B4AB'
        };
        return colors[language] || '#666666';
    }

    createRepoCard(repoData) {
        if (!repoData) return null;

        const card = document.createElement('div');
        card.className = 'project-card repo-card';
        
        const languageColor = this.getLanguageColor(repoData.language);
        const lastUpdated = this.formatDate(repoData.updated_at);
        
        card.innerHTML = `
            <div class="project-header">
                <h3>${repoData.name}</h3>
                <div class="repo-meta-inline">
                    <span class="project-stars">★ ${this.formatNumber(repoData.stargazers_count)}</span>
                    ${repoData.language ? `<span class="project-language" style="background-color: ${languageColor}">${repoData.language}</span>` : ''}
                </div>
            </div>
            <p class="repo-description">${repoData.description || 'No description available'}</p>
            <div class="repo-stats">
                <div class="repo-stat">
                    <span class="repo-stat-label">Last updated:</span>
                    <span class="repo-stat-value">${lastUpdated}</span>
                </div>
                ${repoData.forks_count > 0 ? `
                <div class="repo-stat">
                    <span class="repo-stat-label">Forks:</span>
                    <span class="repo-stat-value">${this.formatNumber(repoData.forks_count)}</span>
                </div>` : ''}
            </div>
            <div class="repo-actions">
                <a href="${repoData.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                    View on GitHub
                </a>
                ${repoData.homepage ? `
                <a href="${repoData.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    Live Demo
                </a>` : ''}
            </div>
        `;
        
        return card;
    }

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    }

    showLoading() {
        const container = document.querySelector(this.containerSelector);
        if (!container) return;
        
        container.innerHTML = `
            <div class="repo-loading">
                <div class="loading-spinner"></div>
                <p>Loading repositories...</p>
            </div>
        `;
    }

    showError(message = 'Failed to load repositories') {
        const container = document.querySelector(this.containerSelector);
        if (!container) return;
        
        container.innerHTML = `
            <div class="repo-error">
                <p>${message}</p>
                <button onclick="repoShowcase.render()" class="btn btn-outline">Try Again</button>
            </div>
        `;
    }

    async render() {
        const container = document.querySelector(this.containerSelector);
        if (!container) {
            console.error('Container not found:', this.containerSelector);
            return;
        }

        if (this.repositories.length === 0) {
            container.innerHTML = '<p>No repositories configured</p>';
            return;
        }

        this.showLoading();
        
        try {
            const repoPromises = this.repositories.map(repo => 
                this.fetchRepoData(typeof repo === 'string' ? repo : repo.url)
            );
            
            const results = await Promise.allSettled(repoPromises);
            const cards = [];
            
            results.forEach((result) => {
                if (result.status === 'fulfilled' && result.value) {
                    const card = this.createRepoCard(result.value);
                    if (card) cards.push(card);
                }
            });
            
            if (cards.length === 0) {
                this.showError('No repositories could be loaded');
                return;
            }
            
            container.innerHTML = '';
            cards.forEach(card => container.appendChild(card));
            
            // Trigger animations if observer is available
            if (typeof observer !== 'undefined') {
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            }
            
        } catch (error) {
            console.error('Error rendering repositories:', error);
            this.showError();
        }
    }

    addRepository(repoUrl, config = {}) {
        this.repositories.push(typeof config === 'object' && Object.keys(config).length > 0 
            ? { url: repoUrl, ...config } 
            : repoUrl
        );
    }

    removeRepository(repoUrl) {
        this.repositories = this.repositories.filter(repo => 
            (typeof repo === 'string' ? repo : repo.url) !== repoUrl
        );
    }

    async refresh() {
        this.cache.clear();
        await this.render();
    }
}

// Initialize GitHub Repository Showcase
let repoShowcase;

// Repository Configuration - Easy to modify
const repositoryConfig = {
    repositories: [
        // Your GitHub repositories
        'jdcaicedo251/transit_demand_prediction',
        'carlosguirado/dcmbench-data'
    ],
    containerSelector: '.projects-grid'
};

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if we have repositories configured
    if (repositoryConfig.repositories.length > 0) {
        repoShowcase = new GitHubRepoShowcase(repositoryConfig);
        
        // Wait a bit for other DOM operations to complete
        setTimeout(() => {
            repoShowcase.render();
        }, 100);
    }
});