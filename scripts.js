/* Shared Scripts for Mannu Kumar Portfolio */

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        button.addEventListener('click', () => {
            const isOpen = content.style.maxHeight;
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-content').style.maxHeight = null;
                otherItem.querySelector('.faq-icon').style.transform = 'rotate(0deg)';
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.style.transform = 'rotate(45deg)';
            } else {
                content.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    if (pricingToggle) {
        const monthlyPrices = document.querySelectorAll('.price-monthly');
        const yearlyPrices = document.querySelectorAll('.price-yearly');
        const toggleDot = pricingToggle.querySelector('.toggle-dot');

        pricingToggle.addEventListener('click', () => {
            const isYearly = toggleDot.style.transform === 'translateX(28px)';
            
            if (isYearly) {
                toggleDot.style.transform = 'translateX(0px)';
                monthlyPrices.forEach(p => p.classList.remove('hidden'));
                yearlyPrices.forEach(p => p.classList.add('hidden'));
            } else {
                toggleDot.style.transform = 'translateX(28px)';
                monthlyPrices.forEach(p => p.classList.add('hidden'));
                yearlyPrices.forEach(p => p.classList.remove('hidden'));
            }
        });
    }

    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Blog Filter
    const searchInput = document.getElementById('blog-search');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (searchInput || categoryButtons.length > 0) {
        const filterBlogs = () => {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';

            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const category = card.dataset.category;
                const matchesSearch = title.includes(searchTerm);
                const matchesCategory = activeCategory === 'all' || category === activeCategory;

                if (matchesSearch && matchesCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        };

        if (searchInput) {
            searchInput.addEventListener('input', filterBlogs);
        }

        categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryButtons.forEach(b => b.classList.remove('active', 'bg-brand-navy', 'text-white'));
                categoryButtons.forEach(b => b.classList.add('bg-white', 'text-brand-navy'));
                btn.classList.add('active', 'bg-brand-navy', 'text-white');
                btn.classList.remove('bg-white', 'text-brand-navy');
                filterBlogs();
            });
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
        });
    }
});
