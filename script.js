// Определение данных для объектов недвижимости
const properties = [
    {
        image: "https://images.pexels.com/photos/32870/pexels-photo.jpg",
        title: {
            ru: "Вилла с видом на море",
            en: "Sea View Villa"
        },
        description: {
            ru: "Роскошная вилла с 4 спальнями, бассейном и панорамным видом на море",
            en: "Luxury villa with 4 bedrooms, pool and panoramic sea view"
        },
        price: {
            ru: "от 25,000,000 THB",
            en: "from 25,000,000 THB"
        }
    },
    {
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        title: {
            ru: "Апартаменты в кондоминиуме",
            en: "Condominium Apartment"
        },
        description: {
            ru: "Современные апартаменты с 2 спальнями в престижном районе",
            en: "Modern 2-bedroom apartment in prestigious area"
        },
        price: {
            ru: "от 8,000,000 THB",
            en: "from 8,000,000 THB"
        }
    },
    {
        image: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg",
        title: {
            ru: "Пентхаус с террасой",
            en: "Penthouse with Terrace"
        },
        description: {
            ru: "Эксклюзивный пентхаус с просторной террасой и джакузи",
            en: "Exclusive penthouse with spacious terrace and jacuzzi"
        },
        price: {
            ru: "от 15,000,000 THB",
            en: "from 15,000,000 THB"
        }
    },
    {
        image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
        title: {
            ru: "Вилла с бассейном",
            en: "Pool Villa"
        },
        description: {
            ru: "Современная вилла с частным бассейном и тропическим садом",
            en: "Modern villa with private pool and tropical garden"
        },
        price: {
            ru: "от 20,000,000 THB",
            en: "from 20,000,000 THB"
        }
    }
];

// Определение данных для отзывов
const testimonials = [
    {
        rating: 5,
        text: {
            ru: "Отличный сервис! Помогли найти идеальную виллу для нашей семьи. Очень профессиональный подход.",
            en: "Great service! Helped us find the perfect villa for our family. Very professional approach."
        },
        name: {
            ru: "Александр П.",
            en: "Alexander P."
        }
    },
    {
        rating: 5,
        text: {
            ru: "Быстро нашли подходящий вариант в нашем бюджете. Все документы оформили грамотно и быстро.",
            en: "Quickly found a suitable option within our budget. All documents were processed competently and quickly."
        },
        name: {
            ru: "Елена С.",
            en: "Elena S."
        }
    },
    {
        rating: 5,
        text: {
            ru: "Превосходное знание рынка недвижимости Пхукета. Очень довольны приобретенной виллой.",
            en: "Excellent knowledge of Phuket real estate market. Very satisfied with the purchased villa."
        },
        name: {
            ru: "Михаил К.",
            en: "Michael K."
        }
    }
];

// Проверка загрузки файлов
console.log('Script.js loaded');

// Кэширование DOM элементов
const elements = {
    header: document.querySelector('header'),
    backToTop: document.getElementById('back-to-top'),
    contactForm: document.getElementById('contact-form'),
    propertyGrid: document.querySelector('.property-grid'),
    testimonialsContainer: document.querySelector('.testimonials-container'),
    faqItems: document.querySelectorAll('.faq-item'),
    languageSwitcher: document.getElementById('language-switcher'),
    countdownElements: {
        days: document.getElementById('countdown-days'),
        hours: document.getElementById('countdown-hours'),
        minutes: document.getElementById('countdown-minutes'),
        seconds: document.getElementById('countdown-seconds')
    }
};

// Оптимизация обработчиков событий
const eventHandlers = {
    scroll: {
        lastScrollTop: 0,
        handleScroll: () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Показываем/скрываем кнопку "Наверх"
            if (scrollTop > 300) {
                elements.backToTop.style.display = 'block';
            } else {
                elements.backToTop.style.display = 'none';
            }
            
            // Оптимизация отображения хедера
            if (scrollTop > elements.lastScrollTop && scrollTop > 100) {
                elements.header.style.transform = 'translateY(-100%)';
            } else {
                elements.header.style.transform = 'translateY(0)';
            }
            
            elements.lastScrollTop = scrollTop;
        }
    },
    
    form: {
        validateForm: (e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.querySelector('input[name="name"]').value;
            const email = form.querySelector('input[name="email"]').value;
            const phone = form.querySelector('input[name="phone"]').value;
            
            if (!name || !email || !phone) {
                showError('Пожалуйста, заполните все поля');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('Пожалуйста, введите корректный email');
                return;
            }
            
            if (!/^\+?[\d\s-]{10,}$/.test(phone)) {
                showError('Пожалуйста, введите корректный номер телефона');
                return;
            }
            
            // Отправка формы
            form.submit();
        }
    }
};

// Инициализация ленивой загрузки изображений
const initLazyLoading = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
};

// Инициализация анимаций при скролле
const initScrollAnimations = () => {
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => sectionObserver.observe(section));
};

// Инициализация всех компонентов
const initComponents = () => {
    initLazyLoading();
    initScrollAnimations();
    
    // Добавляем обработчики событий
    window.addEventListener('scroll', eventHandlers.scroll.handleScroll);
    elements.contactForm.addEventListener('submit', eventHandlers.form.validateForm);
    elements.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Инициализация FAQ
    elements.faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
    
    // Инициализация переключателя языка
    elements.languageSwitcher.addEventListener('change', (e) => {
        const lang = e.target.value;
        updateContent(lang);
    });
};

// Запуск инициализации после загрузки DOM
document.addEventListener('DOMContentLoaded', initComponents);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Проверяем загрузку стилей
    if (document.querySelector('link[href="styles.css"]')) {
        console.log('CSS loaded');
    } else {
        console.error('CSS not loaded');
    }

    // Проверяем загрузку Chart.js
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    // Инициализация всех компонентов
    try {
        initAccordion();
        initLanguageSwitcher();
        initContactForm();
        initSmoothScrolling();
        initROICalculator();
        initPriceGrowthChart();
        initCountdownTimer();
        initFAQ();
        initMobileMenu();
        initActiveNavigation();
        initHeroAnimations();
        initHeroButtons();
        initLazyLoading();
        initStages();
        initStickyHeader();
        initScrollProgress();
        initWhyUsAnimations();
        checkTextRendering();
    } catch (error) {
        console.error('Error initializing components:', error);
    }

    // Populate properties
    const propertiesGrid = document.querySelector('.properties-grid');
    if (propertiesGrid) {
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
    }

    // Populate testimonials
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
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
    }

    // Ленивая загрузка изображений
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Проверка текста при изменении размера окна
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkTextRendering, 250);
    });
});

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

// Улучшенная функция смены языка с анимацией
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithData = document.querySelectorAll('[data-ru][data-en]');
    
    // Установка начального языка
    const currentLang = localStorage.getItem('language') || 'ru';
    document.documentElement.lang = currentLang;
    
    // Функция анимированной смены текста
    function animateTextChange(element, newText) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            if (element.tagName === 'INPUT') {
                element.placeholder = newText;
            } else {
                element.textContent = newText;
            }
            
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Активация соответствующей кнопки
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Установка начальных стилей для анимации
    elementsWithData.forEach(element => {
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    
    // Обработчики кликов по кнопкам языка
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            localStorage.setItem('language', lang);
            document.documentElement.lang = lang;
            
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            elementsWithData.forEach(element => {
                const newText = element.dataset[lang];
                if (newText) {
                    animateTextChange(element, newText);
                }
            });
            
            // Проверка на отсутствующие переводы
            checkMissingTranslations();
        });
    });
    
    // Начальная установка текстов
    elementsWithData.forEach(element => {
        const content = element.dataset[currentLang];
        if (element.tagName === 'INPUT') {
            element.placeholder = content;
        } else {
            element.textContent = content;
        }
    });
}

// Функция проверки отсутствующих переводов
function checkMissingTranslations() {
    const elementsWithData = document.querySelectorAll('[data-ru][data-en]');
    const missingTranslations = [];
    
    elementsWithData.forEach(element => {
        const ruText = element.dataset.ru;
        const enText = element.dataset.en;
        
        if (!ruText || !enText || ruText === enText) {
            const elementInfo = {
                element: element,
                ru: ruText,
                en: enText
            };
            missingTranslations.push(elementInfo);
        }
    });
    
    if (missingTranslations.length > 0) {
        console.warn('Обнаружены отсутствующие или некорректные переводы:', missingTranslations);
    }
}

// Функция для проверки корректности отображения текста
function checkTextRendering() {
    const allTextElements = document.querySelectorAll('h1, h2, h3, p, span, a, button, label, input[type="text"], input[type="email"], input[type="tel"]');
    
    allTextElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = parseFloat(computedStyle.fontSize);
        const lineHeight = parseFloat(computedStyle.lineHeight);
        
        // Проверка на слишком маленький текст
        if (fontSize < 12) {
            console.warn('Обнаружен слишком маленький текст:', element);
        }
        
        // Проверка на оптимальную высоту строки
        if (lineHeight / fontSize < 1.2 || lineHeight / fontSize > 2) {
            console.warn('Неоптимальная высота строки:', element);
        }
        
        // Проверка на обрезание текста
        if (element.scrollWidth > element.clientWidth) {
            console.warn('Текст обрезается:', element);
        }
    });
}

// Form submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const phone = contactForm.querySelector('input[name="phone"]');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Пожалуйста, введите ваше имя');
                isValid = false;
            }
            
            if (!email.value.trim() || !email.value.includes('@')) {
                showError(email, 'Пожалуйста, введите корректный email');
                isValid = false;
            }
            
            if (!phone.value.trim() || !/^\+?[\d\s-()]+$/.test(phone.value)) {
                showError(phone, 'Пожалуйста, введите корректный номер телефона');
                isValid = false;
            }
            
            if (isValid) {
                // Формируем сообщение для WhatsApp
                const message = `Новая заявка с сайта!%0A%0AИмя: ${name.value}%0AEmail: ${email.value}%0AТелефон: ${phone.value}`;
                
                // Открываем WhatsApp с готовым сообщением
                window.open(`https://wa.me/message/2OHKSR7E27KVH1?text=${message}`, '_blank');
                
                // Очищаем форму
                contactForm.reset();
                
                // Показываем сообщение об успехе
                alert('Спасибо! Ваша заявка отправлена.');
            }
        });
    }
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const parent = input.parentElement;
    parent.appendChild(errorDiv);
    
    input.classList.add('error');
    
    setTimeout(() => {
        errorDiv.remove();
        input.classList.remove('error');
    }, 3000);
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

// ROI Calculator
function initROICalculator() {
    const calculatorForm = document.querySelector('.calculator-form');
    const resultValue = document.querySelector('.result-value');

    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const investment = parseFloat(document.querySelector('input[name="investment"]').value);
        const monthlyIncome = parseFloat(document.querySelector('input[name="monthly-income"]').value);
        const monthlyExpenses = parseFloat(document.querySelector('input[name="monthly-expenses"]').value);

        if (isNaN(investment) || isNaN(monthlyIncome) || isNaN(monthlyExpenses)) {
            alert('Пожалуйста, введите корректные числовые значения');
            return;
        }

        const annualIncome = (monthlyIncome - monthlyExpenses) * 12;
        const roi = (annualIncome / investment) * 100;

        resultValue.textContent = roi.toFixed(2) + '%';
    });
}

// Price Growth Chart
function initPriceGrowthChart() {
    const ctx = document.getElementById('priceGrowthChart');
    if (!ctx) return;

    const chart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Пхукет',
                    data: [100, 110, 125, 145, 160],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Бали',
                    data: [100, 105, 115, 125, 130],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                },
                {
                    label: 'Дубай',
                    data: [100, 108, 120, 135, 145],
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#fff',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });

    // Responsive font size
    function updateFontSize() {
        const width = window.innerWidth;
        const baseFontSize = width < 768 ? 10 : 14;
        
        chart.options.plugins.legend.labels.font.size = baseFontSize;
        chart.options.scales.x.ticks.font.size = baseFontSize;
        chart.options.scales.y.ticks.font.size = baseFontSize;
        chart.update();
    }

    window.addEventListener('resize', updateFontSize);
    updateFontSize();
}

// Countdown Timer functionality
function initCountdownTimer() {
    const countdownElement = document.getElementById('offerCountdown');
    if (!countdownElement) return;

    // Установка конечной даты (24 часа от текущего момента)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    function updateTimer() {
        const now = new Date();
        const diff = endTime - now;

        if (diff <= 0) {
            countdownElement.textContent = '00:00:00';
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Обновление каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

// FAQ Section functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-question i');
        
        if (!answer || !icon) return;
        
        // Устанавливаем начальную высоту для плавной анимации
        answer.style.height = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'height 0.3s ease-in-out, opacity 0.3s ease-in-out';
        answer.style.opacity = '0';
        
        // Добавляем анимацию для иконки
        icon.style.transition = 'transform 0.3s ease-in-out';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Закрываем все другие элементы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    
                    otherItem.classList.remove('active');
                    otherAnswer.style.height = '0px';
                    otherAnswer.style.opacity = '0';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Переключаем текущий элемент
            if (!isOpen) {
                item.classList.add('active');
                answer.style.height = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
            } else {
                item.classList.remove('active');
                answer.style.height = '0px';
                answer.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            if (item.classList.contains('active')) {
                answer.style.height = answer.scrollHeight + 'px';
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        // Обработчик для кнопки меню
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Закрываем меню при клике на ссылку
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Закрываем меню при клике вне его
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Предотвращаем закрытие при клике внутри меню
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Active Navigation State
function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);
}

function openCalculator() {
    const calculatorSection = document.getElementById('roi-calculator');
    if (calculatorSection) {
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Анимация появления элементов
function initHeroAnimations() {
    const elements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-features, .hero-cta, .hero-stats, .hero-trust');
    
    elements.forEach((element, index) => {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Обработка кликов по кнопкам
function initHeroButtons() {
    const ctaButton = document.querySelector('.cta-button');
    const secondaryButton = document.querySelector('.secondary-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            ctaButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 200);
            
            openCalculator();
        });
    }

    if (secondaryButton) {
        secondaryButton.addEventListener('click', () => {
            secondaryButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                secondaryButton.style.transform = 'scale(1)';
            }, 200);
            
            scrollToContact();
        });
    }
}

// Burger Menu
const burgerMenu = document.querySelector('.burger-menu');
const navMenu = document.querySelector('.nav-menu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Header Animation
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Lazy Loading Images
function initLazyLoading() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazyload");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

// Performance Optimization
function debounceFn(fn, delay) {
    let timeoutId;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Optimize scroll events
const optimizedScroll = debounceFn(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    
    if (header) {
        if (scrollTop > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
}, 10);

window.addEventListener('scroll', optimizedScroll); 

// Инициализация этапов
function initStages() {
    const stageItems = document.querySelectorAll('.stage-item');
    let activeStage = null;

    stageItems.forEach((item, index) => {
        const header = item.querySelector('.stage-header');
        const content = item.querySelector('.stage-content');
        const number = item.querySelector('.stage-number');
        const toggleBtn = item.querySelector('.toggle-btn');

        // Установка начальной высоты контента
        content.style.maxHeight = '0px';

        // Обработчик наведения на номер этапа
        number.addEventListener('mouseenter', () => {
            number.classList.add('hover');
        });

        number.addEventListener('mouseleave', () => {
            number.classList.remove('hover');
        });

        // Обработчик клика по заголовку
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Закрыть активный этап, если он существует
            if (activeStage && activeStage !== item) {
                const activeContent = activeStage.querySelector('.stage-content');
                activeContent.style.maxHeight = '0px';
                activeStage.classList.remove('active');
                activeStage.querySelector('.stage-number').classList.remove('active');
            }

            // Переключить текущий этап
            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + 'px';
                item.classList.add('active');
                number.classList.add('active');
                activeStage = item;

                // Анимация прогресса для предыдущих этапов
                stageItems.forEach((prevItem, prevIndex) => {
                    if (prevIndex < index) {
                        prevItem.classList.add('completed');
                    }
                });
            } else {
                content.style.maxHeight = '0px';
                item.classList.remove('active');
                number.classList.remove('active');
                activeStage = null;
            }
        });
    });

    // Открыть первый этап по умолчанию
    if (stageItems.length > 0) {
        const firstItem = stageItems[0];
        const firstContent = firstItem.querySelector('.stage-content');
        const firstNumber = firstItem.querySelector('.stage-number');
        
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstItem.classList.add('active');
        firstNumber.classList.add('active');
        activeStage = firstItem;
    }
}

// Функция для обновления контента при смене языка
function updateContent(lang) {
    // Обновляем тексты объектов недвижимости
    const propertyGrid = document.querySelector('.property-grid');
    if (propertyGrid) {
        const propertyItems = propertyGrid.querySelectorAll('.property-item');
        propertyItems.forEach((item, index) => {
            const property = properties[index];
            if (property) {
                const title = item.querySelector('h3');
                const description = item.querySelector('p');
                const price = item.querySelector('.price');
                
                if (title) title.textContent = property.title[lang];
                if (description) description.textContent = property.description[lang];
                if (price) price.textContent = property.price[lang];
            }
        });
    }

    // Обновляем отзывы
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        const testimonialItems = testimonialsContainer.querySelectorAll('.testimonial-item');
        testimonialItems.forEach((item, index) => {
            const testimonial = testimonials[index];
            if (testimonial) {
                const text = item.querySelector('.testimonial-text');
                const name = item.querySelector('.testimonial-name');
                
                if (text) text.textContent = testimonial.text[lang];
                if (name) name.textContent = testimonial.name[lang];
            }
        });
    }
}

// Функция для инициализации сетки объектов
function initPropertyGrid() {
    const propertyGrid = document.querySelector('.property-grid');
    if (!propertyGrid) return;

    propertyGrid.innerHTML = properties.map(property => `
        <div class="property-item">
            <img src="${property.image}" alt="${property.title[currentLang]}">
            <h3>${property.title[currentLang]}</h3>
            <p>${property.description[currentLang]}</p>
            <div class="price">${property.price[currentLang]}</div>
        </div>
    `).join('');
}

// Функция для инициализации отзывов
function initTestimonials() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = testimonials.map(testimonial => `
        <div class="testimonial-item">
            <div class="rating">
                ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p class="testimonial-text">${testimonial.text[currentLang]}</p>
            <div class="testimonial-name">${testimonial.name[currentLang]}</div>
        </div>
    `).join('');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    initPropertyGrid();
    initTestimonials();
    updateContent(currentLang);
});

// Кнопка "Наверх"
const backToTop = document.createElement('div');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Анимация появления секций
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));

// Оптимизация производительности
let lastScrollTop = 0;
const pageHeader = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > lastScrollTop) {
        pageHeader.classList.add('header-hidden');
    } else {
        pageHeader.classList.remove('header-hidden');
    }
    
    lastScrollTop = scrollTop;
}, { passive: true });

function initStickyHeader() {
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Индикатор прокрутки
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
}

// Анимация иконок в секции "Почему выбирают нас"
function initWhyUsAnimations() {
    const icons = document.querySelectorAll('.why-us-icon');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Удаляем анимацию при выходе из области видимости
                setTimeout(() => {
                    if (!entry.isIntersecting) {
                        entry.target.classList.remove('animate');
                    }
                }, 1500);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });
    
    icons.forEach(icon => observer.observe(icon));
} 