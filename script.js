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
    } catch (error) {
        console.error('Error initializing components:', error);
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
    try {
        const calculator = document.querySelector('.roi-calculator');
        if (!calculator) {
            console.error('Calculator container not found');
            return;
        }

        const elements = {
            input: calculator.querySelector('input[name="investment"]'),
            yieldInput: calculator.querySelector('input[name="yield"]'),
            rangeValue: calculator.querySelector('.range-value span'),
            resultMonthly: calculator.querySelector('.monthly-income'),
            resultYearly: calculator.querySelector('.yearly-roi'),
            calculateBtn: calculator.querySelector('.calculate-btn'),
            resultsDiv: calculator.querySelector('.calculator-results'),
            currencyBtns: calculator.querySelectorAll('.currency-btn'),
            currencyLabel: calculator.querySelector('.currency-label'),
            shareBtn: calculator.querySelector('.share-btn')
        };

        if (Object.values(elements).some(el => !el)) {
            console.error('Some calculator elements not found');
            return;
        }

        // Реальные курсы валют (можно заменить на API)
        const exchangeRates = {
            THB: 1,
            USD: 0.029,
            EUR: 0.026
        };

        let currentCurrency = 'THB';

        // Инициализация начальных значений
        elements.rangeValue.textContent = '50,000';
        elements.yieldInput.value = 1;

        // Обработка переключения валют
        elements.currencyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.currencyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCurrency = btn.dataset.currency;
                elements.currencyLabel.textContent = currentCurrency;
                
                if (elements.input.value) {
                    const thbValue = convertToTHB(parseFloat(elements.input.value), currentCurrency);
                    calculateROI(thbValue);
                }
            });
        });

        // Обновление значения ползунка (теперь показываем сумму в месяц)
        elements.yieldInput.addEventListener('input', () => {
            const investmentValue = parseFloat(elements.input.value) || 5000000;
            const monthlyYield = (parseFloat(elements.yieldInput.value) / 100) * investmentValue;
            elements.rangeValue.textContent = formatCurrency(monthlyYield, currentCurrency);
        });

        // Конвертация в THB
        function convertToTHB(amount, fromCurrency) {
            return amount / exchangeRates[fromCurrency];
        }

        // Конвертация из THB
        function convertFromTHB(amount, toCurrency) {
            return amount * exchangeRates[toCurrency];
        }

        // Расчет ROI с учетом реальных данных
        function calculateROI(investment) {
            if (!investment || isNaN(investment)) {
                alert('Пожалуйста, введите сумму инвестиций');
                return;
            }

            // Реальные данные из статьи
            const managementFee = 0.2; // 20% комиссия управляющей компании
            const maintenanceCost = 0.01; // 1% на обслуживание
            const occupancyRate = 0.85; // 85% заполняемость
            const monthlyYield = parseFloat(elements.yieldInput.value) / 100;
            
            // Расчет реального дохода
            const grossMonthlyIncome = investment * monthlyYield;
            const netMonthlyIncome = grossMonthlyIncome * occupancyRate * (1 - managementFee - maintenanceCost);
            const yearlyROI = (netMonthlyIncome * 12 / investment) * 100;

            const monthlyIncomeConverted = convertFromTHB(netMonthlyIncome, currentCurrency);
            
            elements.resultMonthly.textContent = formatCurrency(monthlyIncomeConverted, currentCurrency);
            elements.resultYearly.textContent = yearlyROI.toFixed(1) + '%';

            // Показываем результаты
            elements.resultsDiv.style.display = 'block';
            elements.resultsDiv.style.opacity = '1';
            elements.resultsDiv.style.transform = 'translateY(0)';

            // Обновляем графики и рекомендации
            updateCharts(investment, netMonthlyIncome, yearlyROI);
            generateRecommendations(yearlyROI);
            updateInvestmentComparison(yearlyROI);

            // Плавная прокрутка к результатам
            elements.resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Анимация появления рекомендаций
            const recommendationItems = document.querySelectorAll('.recommendation-item');
            recommendationItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }

        // Форматирование валюты
        function formatCurrency(amount, currency) {
            const symbols = {
                THB: '฿',
                USD: '$',
                EUR: '€'
            };
            return `${symbols[currency]}${amount.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
        }

        // Обновление графиков
        function updateCharts(investment, monthlyIncome, yearlyROI) {
            updateROIChart(investment, monthlyIncome);
            updateComparisonChart(yearlyROI);
        }

        // График ROI
        function updateROIChart(investment, monthlyIncome) {
            try {
                const ctx = document.getElementById('roiChart');
                if (!ctx) {
                    console.error('ROI Chart canvas not found');
                    return;
                }

                const context = ctx.getContext('2d');
                if (!context) {
                    console.error('Could not get 2D context for ROI chart');
                    return;
                }

                const months = Array.from({length: 12}, (_, i) => i + 1);
                const values = months.map(month => investment + (monthlyIncome * month));

                // Уничтожаем старый график, если он существует
                if (window.roiChart && typeof window.roiChart.destroy === 'function') {
                    window.roiChart.destroy();
                }

                window.roiChart = new Chart(context, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Рост инвестиций',
                            data: values,
                            borderColor: '#e74c3c',
                            backgroundColor: 'rgba(231, 76, 60, 0.1)',
                            fill: true,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }
                            },
                            x: {
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)'
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.error('Error updating ROI chart:', error);
            }
        }

        // График сравнения
        function updateComparisonChart(yearlyROI) {
            try {
                const ctx = document.getElementById('comparisonChart');
                if (!ctx) {
                    console.warn('Comparison Chart canvas not found - skipping chart update');
                    return;
                }

                const context = ctx.getContext('2d');
                if (!context) {
                    console.warn('Could not get 2D context for comparison chart - skipping chart update');
                    return;
                }

                const data = {
                    labels: ['Недвижимость Пхукета', 'Банковский депозит', 'Облигации', 'Фондовый рынок'],
                    datasets: [{
                        data: [yearlyROI, 3, 5, 8],
                        backgroundColor: ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f']
                    }]
                };

                // Уничтожаем старый график, если он существует
                if (window.comparisonChart && typeof window.comparisonChart.destroy === 'function') {
                    window.comparisonChart.destroy();
                }

                window.comparisonChart = new Chart(context, {
                    type: 'bar',
                    data: data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(255, 255, 255, 0.1)',
                                    borderDash: [5, 5]
                                },
                                ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    callback: value => value + '%',
                                    font: {
                                        size: 12,
                                        weight: 'bold'
                                    },
                                    padding: 10
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    font: {
                                        size: 12,
                                        weight: 'bold'
                                    },
                                    padding: 10,
                                    maxRotation: 45,
                                    minRotation: 45
                                }
                            }
                        }
                    }
                });
            } catch (error) {
                console.warn('Error updating comparison chart:', error);
            }
        }

        // Генерация рекомендаций
        function generateRecommendations(yearlyROI) {
            try {
                const recommendationsList = document.querySelector('.recommendations-list');
                if (!recommendationsList) {
                    console.error('Recommendations list container not found');
                    return;
                }

                // Очищаем список только если он существует
                recommendationsList.innerHTML = '';

                // Базовые рекомендации
                const baseRecommendations = [
                    {
                        title: 'Виллы премиум-класса',
                        description: 'Гарантированная доходность от 10% годовых',
                        roi: '10-12%',
                        location: 'Районы: Лагуна, Банг Тао, Сурин',
                        price: 'от 25,000,000 ฿'
                    },
                    {
                        title: 'Апартаменты с видом на море',
                        description: 'Высокий спрос в высокий сезон',
                        roi: '8-10%',
                        location: 'Районы: Ката, Карон, Раваи',
                        price: 'от 8,000,000 ฿'
                    },
                    {
                        title: 'Таунхаусы',
                        description: 'Стабильный доход от долгосрочной аренды',
                        roi: '6-8%',
                        location: 'Районы: Чалонг, Кату, Таланг',
                        price: 'от 5,000,000 ฿'
                    }
                ];

                // Дополнительные рекомендации в зависимости от ROI
                const additionalRecommendations = [];
                
                if (yearlyROI > 12) {
                    additionalRecommendations.push({
                        title: 'Люкс виллы первой линии',
                        description: 'Эксклюзивные объекты с максимальной доходностью',
                        roi: '12-15%',
                        location: 'Районы: Камала, Сурин (первая линия)',
                        price: 'от 45,000,000 ฿'
                    });
                } else if (yearlyROI < 6) {
                    additionalRecommendations.push({
                        title: 'Кондоминиумы',
                        description: 'Доступные инвестиции с низким порогом входа',
                        roi: '5-7%',
                        location: 'Районы: Пхукет Таун, Кату',
                        price: 'от 3,000,000 ฿'
                    });
                }

                // Объединяем все рекомендации
                const allRecommendations = [...baseRecommendations, ...additionalRecommendations];

                // Создаем и добавляем элементы рекомендаций
                allRecommendations.forEach((rec, index) => {
                    const item = document.createElement('li');
                    item.className = 'recommendation-item';
                    item.style.animationDelay = `${index * 0.2}s`;

                    item.innerHTML = `
                        <div class="recommendation-header">
                            <h4>${rec.title}</h4>
                            <span class="roi-badge">${rec.roi}</span>
                        </div>
                        <p class="recommendation-description">${rec.description}</p>
                        <div class="recommendation-details">
                            <p class="location"><i class="fas fa-map-marker-alt"></i> ${rec.location}</p>
                            <p class="price"><i class="fas fa-tag"></i> ${rec.price}</p>
                        </div>
                    `;

                    recommendationsList.appendChild(item);
                });
            } catch (error) {
                console.error('Error generating recommendations:', error);
            }
        }

        // Обновление сравнения инвестиций
        function updateInvestmentComparison(yearlyROI) {
            const comparisonData = [
                {
                    name: 'Недвижимость Пхукета',
                    roi: yearlyROI,
                    benefits: [
                        'Пассивный доход от аренды',
                        'Рост стоимости актива',
                        'Возможность личного использования'
                    ],
                    risks: ['Сезонность спроса', 'Расходы на управление и обслуживание']
                },
                {
                    name: 'Банковский депозит',
                    roi: 3,
                    benefits: [
                        'Низкий риск',
                        'Высокая ликвидность'
                    ],
                    risks: ['Низкая доходность', 'Инфляционные риски']
                },
                {
                    name: 'Облигации',
                    roi: 5,
                    benefits: [
                        'Стабильный доход',
                        'Средний риск'
                    ],
                    risks: ['Зависимость от ключевой ставки']
                },
                {
                    name: 'Фондовый рынок',
                    roi: 8,
                    benefits: [
                        'Высокая ликвидность',
                        'Потенциально высокий доход'
                    ],
                    risks: ['Высокая волатильность', 'Рыночные риски']
                }
            ];

            const comparisonContainer = document.querySelector('.comparison-section');
            if (comparisonContainer) {
                const table = document.createElement('div');
                table.className = 'investment-comparison-table';
                
                comparisonData.forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'comparison-row';
                    row.innerHTML = `
                        <div class="comparison-cell name">${item.name}</div>
                        <div class="comparison-cell roi">
                            <span class="roi-value">${item.roi}%</span>
                            <div class="roi-bar" style="width: ${(item.roi / Math.max(...comparisonData.map(d => d.roi))) * 100}%"></div>
                        </div>
                        <div class="comparison-cell benefits">
                            <ul>${item.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
                        </div>
                        <div class="comparison-cell risks">
                            <ul>${item.risks.map(r => `<li>${r}</li>`).join('')}</ul>
                        </div>
                    `;
                    table.appendChild(row);
                });
                
                comparisonContainer.innerHTML = '';
                comparisonContainer.appendChild(table);
            }
        }

        // Поделиться результатами
        elements.shareBtn.addEventListener('click', async () => {
            const text = `Мой расчет доходности недвижимости на Пхукете:\n` +
                        `Ежемесячный доход: ${elements.resultMonthly.textContent}\n` +
                        `Годовая доходность: ${elements.resultYearly.textContent}`;
            
            try {
                if (navigator.share) {
                    await navigator.share({
                        title: 'Расчет доходности недвижимости на Пхукете',
                        text: text
                    });
                } else {
                    // Fallback для браузеров без Web Share API
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('Результаты скопированы в буфер обмена');
                }
            } catch (error) {
                console.warn('Error sharing results:', error);
                // Fallback в случае ошибки
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                alert('Результаты скопированы в буфер обмена');
            }
        });

        // Обработчик кнопки расчета
        elements.calculateBtn.addEventListener('click', () => {
            const investment = parseFloat(elements.input.value);
            if (!isNaN(investment)) {
                const thbValue = convertToTHB(investment, currentCurrency);
                calculateROI(thbValue);
            } else {
                alert('Пожалуйста, введите корректную сумму инвестиций');
            }
        });
    } catch (error) {
        console.error('Error initializing calculator:', error);
    }
}

// Price Growth Chart
function initPriceGrowthChart() {
    const ctx = document.getElementById('priceGrowthChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: 'Пхукет',
                    data: [100, 110, 125, 145, 160],
                    borderColor: '#e74c3c',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Бали',
                    data: [100, 105, 112, 120, 129],
                    borderColor: '#3498db',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: 'Дубай',
                    data: [100, 108, 118, 130, 142],
                    borderColor: '#2ecc71',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Динамика роста цен на недвижимость (2020 = 100%)'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 90,
                    max: 170
                }
            }
        }
    });
}

// Countdown Timer
function initCountdownTimer() {
    // Устанавливаем дату окончания акции (30 дней от текущей даты)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    function updateTimer() {
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) {
            // Если время вышло, обновляем таймер на следующие 30 дней
            endDate.setDate(endDate.getDate() + 30);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.querySelector('.days').textContent = days.toString().padStart(2, '0');
        document.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        document.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
        document.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Обновляем таймер каждую секунду
    updateTimer();
    setInterval(updateTimer, 1000);
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные ответы
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Переключаем текущий ответ
            item.classList.toggle('active');
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