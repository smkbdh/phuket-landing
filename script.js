// Stages accordion functionality
function initAccordion() {
    const stageItems = document.querySelectorAll('.stage-item');
    
    // Открываем первый элемент по умолчанию
    if (stageItems.length > 0) {
        stageItems[0].classList.add('active');
    }
    
    stageItems.forEach(item => {
        const header = item.querySelector('.stage-header');
        const toggleBtn = item.querySelector('.toggle-btn');
        
        const toggleAccordion = (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            const isActive = item.classList.contains('active');
            
            // Закрываем все элементы
            stageItems.forEach(stageItem => {
                stageItem.classList.remove('active');
            });
            
            // Если элемент не был активен, открываем его
            if (!isActive) {
                item.classList.add('active');
            }
        };

        // Добавляем обработчики на заголовок и кнопку
        header.addEventListener('click', toggleAccordion);
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleAccordion);
        }
    });
}

// Language switching functionality
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithData = document.querySelectorAll('[data-ru][data-en]');

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update content
            elementsWithData.forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'OPTION') {
                    element.placeholder = element.dataset[lang];
                } else {
                    element.textContent = element.dataset[lang];
                }
            });
        });
    });
}

// Form submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Redirect to WhatsApp
            const message = `Новая заявка:\nИмя: ${data.name}\nWhatsApp: ${data.whatsapp}\nТип запроса: ${data.requestType}\nТип недвижимости: ${data.propertyType}`;
            window.open(`https://wa.me/message/2OHKSR7E27KVH1?text=${encodeURIComponent(message)}`, '_blank');
            
            contactForm.reset();
        });
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const element = document.querySelector(this.getAttribute('href'));
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initLanguageSwitcher();
    initContactForm();
    initSmoothScrolling();
});

// Property data
const properties = [
    {
        title: {
            ru: 'Роскошная вилла с бассейном',
            en: 'Luxury villa with pool'
        },
        description: {
            ru: 'Современная вилла с 4 спальнями, частным бассейном и видом на море',
            en: 'Modern villa with 4 bedrooms, private pool and sea view'
        },
        price: {
            ru: 'от 2,500,000 $',
            en: 'from $2,500,000'
        },
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
        title: {
            ru: 'Современная квартира в центре',
            en: 'Modern apartment in the center'
        },
        description: {
            ru: 'Стильная квартира с 2 спальнями, полностью оборудованная кухня',
            en: 'Stylish apartment with 2 bedrooms, fully equipped kitchen'
        },
        price: {
            ru: 'от 450,000 $',
            en: 'from $450,000'
        },
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
        title: {
            ru: 'Вилла на берегу моря',
            en: 'Beachfront Villa'
        },
        description: {
            ru: 'Роскошная 5-спальная вилла с прямым выходом к пляжу',
            en: 'Luxurious 5-bedroom villa with direct beach access'
        },
        price: {
            ru: 'от $3,200,000',
            en: 'from $3,200,000'
        },
        image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    }
];

// Testimonials data
const testimonials = [
    {
        name: {
            ru: 'Анна Петрова',
            en: 'Anna Petrova'
        },
        text: {
            ru: 'Отличный сервис! Помогли найти идеальную виллу для нашей семьи.',
            en: 'Great service! Helped us find the perfect villa for our family.'
        },
        rating: 5
    },
    {
        name: {
            ru: 'Михаил Иванов',
            en: 'Mikhail Ivanov'
        },
        text: {
            ru: 'Профессиональный подход и внимательное отношение к клиентам.',
            en: 'Professional approach and attentive attitude to clients.'
        },
        rating: 5
    }
];

// Populate properties
const propertiesGrid = document.querySelector('.properties-grid');
properties.forEach(property => {
    const propertyCard = document.createElement('div');
    propertyCard.className = 'property-card';
    propertyCard.innerHTML = `
        <img src="${property.image}" alt="${property.title.ru}">
        <div class="property-info">
            <h3 class="property-title" data-ru="${property.title.ru}" data-en="${property.title.en}">${property.title.ru}</h3>
            <p class="property-description" data-ru="${property.description.ru}" data-en="${property.description.en}">${property.description.ru}</p>
            <p class="property-price" data-ru="${property.price.ru}" data-en="${property.price.en}">${property.price.ru}</p>
            <a href="https://wa.me/message/2OHKSR7E27KVH1?text=" class="cta-button" data-ru="Узнать больше" data-en="Learn more">Узнать больше</a>
        </div>
    `;
    propertiesGrid.appendChild(propertyCard);
});

// Populate testimonials
const testimonialsSlider = document.querySelector('.testimonials-slider');
testimonials.forEach(testimonial => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className = 'testimonial-card';
    testimonialCard.innerHTML = `
        <div class="testimonial-rating">
            ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5-testimonial.rating)}
        </div>
        <p class="testimonial-text" data-ru="${testimonial.text.ru}" data-en="${testimonial.text.en}">${testimonial.text.ru}</p>
        <p class="testimonial-name" data-ru="${testimonial.name.ru}" data-en="${testimonial.name.en}">${testimonial.name.ru}</p>
    `;
    testimonialsSlider.appendChild(testimonialCard);
});



const progressList = document.getElementById('progress-list');
progressItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="status-icon ${item.status}">${getStatusIcon(item.status)}</span>
        <span class="progress-text" data-ru="${item.text.ru}" data-en="${item.text.en}">${item.text.ru}</span>
    `;
    progressList.appendChild(li);
});

function getStatusIcon(status) {
    switch(status) {
        case 'completed':
            return '✅';
        case 'in-progress':
            return '⏳';
        case 'not-started':
            return '❌';
        default:
            return '❌';
    }
} 