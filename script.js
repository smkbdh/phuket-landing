// Проверка загрузки файлов
console.log('Script.js loaded');

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
            const message = `Новая заявка:\nИмя: ${data.name}`;
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

// ROI Calculator functionality
function initROICalculator() {
    const calculator = document.querySelector('.roi-calculator');
    if (!calculator) return;

    const elements = {
        input: calculator.querySelector('input[name="investment"]'),
        yieldInput: calculator.querySelector('input[name="yield"]'),
        rangeValue: calculator.querySelector('.range-value span'),
        resultMonthly: calculator.querySelector('.monthly-income'),
        resultYearly: calculator.querySelector('.yearly-roi'),
        calculateBtn: calculator.querySelector('.calculate-btn'),
        resultsDiv: calculator.querySelector('.calculator-results'),
        currencyBtns: calculator.querySelectorAll('.currency-btn'),
        helperText: calculator.querySelector('.helper-text')
    };

    const exchangeRates = {
        THB: 1,
        USD: 35.5,
        EUR: 38.5
    };

    let currentCurrency = 'THB';
    const minAmount = {
        THB: 100000,
        USD: Math.round(100000 / exchangeRates.USD),
        EUR: Math.round(100000 / exchangeRates.EUR)
    };

    // Currency switching
    elements.currencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const newCurrency = btn.dataset.currency;
            if (newCurrency === currentCurrency) return;

            elements.currencyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Convert current value to new currency
            const value = parseFloat(elements.input.value.replace(/[^0-9.]/g, '')) || 0;
            const valueInTHB = currentCurrency === 'THB' ? value : value * exchangeRates[currentCurrency];
            const newValue = currentCurrency === 'THB' ? 
                valueInTHB / exchangeRates[newCurrency] : 
                valueInTHB;

            currentCurrency = newCurrency;
            elements.input.value = formatNumber(Math.round(newValue), newCurrency);
            elements.helperText.textContent = `Минимальная сумма: ${formatNumber(minAmount[currentCurrency], currentCurrency)} ${currentCurrency}`;
        });
    });

    // Format number with currency
    function formatNumber(num, currency) {
        return new Intl.NumberFormat('ru-RU').format(num);
    }

    // Input validation and formatting
    elements.input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value) {
            const numValue = parseInt(value);
            if (numValue < minAmount[currentCurrency]) {
                value = minAmount[currentCurrency];
            }
            e.target.value = formatNumber(value, currentCurrency);
        }
    });

    // Yield slider with smooth updates
    elements.yieldInput.addEventListener('input', () => {
        const value = parseFloat(elements.yieldInput.value);
        elements.rangeValue.textContent = `${value.toFixed(1)}%`;
        elements.rangeValue.style.left = `${(value - 0.5) * 100 / 1.5}%`;
    });

    // Calculate button handler
    elements.calculateBtn.addEventListener('click', () => {
        const investment = parseFloat(elements.input.value.replace(/[^0-9.]/g, ''));
        const yield = parseFloat(elements.yieldInput.value);
        
        if (!isNaN(investment) && !isNaN(yield)) {
            elements.calculateBtn.classList.add('calculating');
            
            setTimeout(() => {
                // Convert to THB for calculations if needed
                const investmentTHB = currentCurrency === 'THB' ? 
                    investment : investment * exchangeRates[currentCurrency];

                const monthlyIncome = (investmentTHB * yield / 100);
                const yearlyROI = (yield * 12).toFixed(1);
                
                elements.resultMonthly.textContent = `${formatNumber(Math.round(monthlyIncome), 'THB')} THB`;
                elements.resultYearly.textContent = `${yearlyROI}%`;
                
                elements.resultsDiv.style.display = 'block';
                elements.resultsDiv.classList.add('visible');
                
                updateRecommendations(investmentTHB, yield);
                elements.calculateBtn.classList.remove('calculating');
                
                // Анимация появления результатов
                const resultItems = document.querySelectorAll('.result-item');
                resultItems.forEach((item, index) => {
                    item.style.animation = `fadeInUp 0.3s ease-out forwards ${index * 0.1}s`;
                });
            }, 500);
        }
    });

    // Initialize with default values
    elements.input.value = formatNumber(minAmount[currentCurrency], currentCurrency);
    elements.helperText.textContent = `Минимальная сумма: ${formatNumber(minAmount[currentCurrency], currentCurrency)} ${currentCurrency}`;
}

function updateRecommendations(investment, yield) {
    const recommendationsList = document.querySelector('.recommendations-list');
    const comparisonSection = document.querySelector('.comparison-section');
    if (!recommendationsList || !comparisonSection) return;

    // Обновляем рекомендации
    const recommendations = [
        {
            text: 'Инвестируйте в недвижимость с высоким потенциалом роста',
            condition: investment >= 5000000
        },
        {
            text: 'Рассмотрите варианты с готовой арендной программой',
            condition: yield >= 1.2
        },
        {
            text: 'Обратите внимание на объекты в перспективных районах',
            condition: investment >= 3000000
        },
        {
            text: 'Используйте налоговые льготы для инвесторов',
            condition: investment >= 10000000
        }
    ];

    recommendationsList.innerHTML = recommendations
        .filter(rec => rec.condition)
        .map(rec => `<li>${rec.text}</li>`)
        .join('');

    // Обновляем сравнительную таблицу
    const comparisonTable = `
        <table class="investment-comparison-table">
            <thead>
                <tr>
                    <th>Тип инвестиции</th>
                    <th>Годовая доходность</th>
                    <th>Риски</th>
                    <th>Ликвидность</th>
                </tr>
            </thead>
            <tbody>
                <tr class="comparison-row">
                    <td>Недвижимость Пхукета</td>
                    <td>${(yield * 12).toFixed(1)}%</td>
                    <td>Низкие</td>
                    <td>Высокая</td>
                </tr>
                <tr class="comparison-row">
                    <td>Банковский депозит</td>
                    <td>3-4%</td>
                    <td>Минимальные</td>
                    <td>Высокая</td>
                </tr>
                <tr class="comparison-row">
                    <td>Фондовый рынок</td>
                    <td>7-10%</td>
                    <td>Высокие</td>
                    <td>Высокая</td>
                </tr>
                <tr class="comparison-row">
                    <td>Криптовалюты</td>
                    <td>20-30%</td>
                    <td>Очень высокие</td>
                    <td>Средняя</td>
                </tr>
            </tbody>
        </table>
    `;
    
    comparisonSection.innerHTML = `
        <h4>Сравнение с другими инвестициями</h4>
        ${comparisonTable}
    `;

    // Добавляем анимацию появления строк
    const rows = document.querySelectorAll('.comparison-row');
    rows.forEach((row, index) => {
        row.style.animation = `slideIn 0.3s ease-out forwards ${index * 0.1}s`;
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
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    if (!Object.values(countdownElements).every(el => el)) {
        console.error('Не найдены все элементы таймера');
        return;
    }

    // Устанавливаем дату окончания (31 мая 2024)
    const endDate = new Date('2024-05-31T23:59:59').getTime();
    let previousValues = {
        days: -1,
        hours: -1,
        minutes: -1,
        seconds: -1
    };

    function animateValue(element, value) {
        element.classList.remove('animate-flip');
        element.classList.remove('animate-pulse');
        
        // Принудительный reflow для сброса анимации
        void element.offsetWidth;
        
        element.textContent = value.toString().padStart(2, '0');
        element.classList.add('animate-flip');
        
        if (value === 0) {
            element.classList.add('animate-pulse');
        }
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            Object.values(countdownElements).forEach(el => {
                el.textContent = '00';
                el.classList.add('expired');
            });
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Обновляем только изменившиеся значения с анимацией
        if (days !== previousValues.days) {
            animateValue(countdownElements.days, days);
            previousValues.days = days;
        }
        if (hours !== previousValues.hours) {
            animateValue(countdownElements.hours, hours);
            previousValues.hours = hours;
        }
        if (minutes !== previousValues.minutes) {
            animateValue(countdownElements.minutes, minutes);
            previousValues.minutes = minutes;
        }
        if (seconds !== previousValues.seconds) {
            animateValue(countdownElements.seconds, seconds);
            previousValues.seconds = seconds;
        }

        // Добавляем эффект ожидания для следующей секунды
        const progress = 1 - (distance % 1000) / 1000;
        document.documentElement.style.setProperty('--countdown-progress', progress);
    }

    // Запускаем таймер с интервалом в 100мс для более плавной анимации
    updateCountdown();
    setInterval(updateCountdown, 100);
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
            ru: 'от 87,500,000 ฿',
            en: 'from ฿87,500,000'
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
            ru: 'от 15,750,000 ฿',
            en: 'from ฿15,750,000'
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
            ru: 'от 112,000,000 ฿',
            en: 'from ฿112,000,000'
        },
        image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
    },
    {
        title: {
            ru: 'Люкс пентхаус',
            en: 'Luxury Penthouse'
        },
        description: {
            ru: '3-спальный пентхаус с панорамной террасой',
            en: '3-bedroom penthouse with panoramic terrace'
        },
        price: {
            ru: 'от 63,000,000 ฿',
            en: 'from ฿63,000,000'
        },
        image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80'
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