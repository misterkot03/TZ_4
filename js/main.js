'use strict';

// В будущем можно превратить в запрос на получение массива с сервака
const coursesData = [
  {
    id: 'google-ads',
    title: 'The Ultimate Google Ads Training Course',
    category: 'marketing',
    categoryLabel: 'Marketing',
    price: 100,
    author: 'Jerome Bell',
    image: 'img/course-1.jpg',
    imageAlt: 'Instructor Jerome Bell',
    badgeModifier: 'course-card__badge--marketing'
  },
  {
    id: 'product-management',
    title: 'Product Management Fundamentals',
    category: 'management',
    categoryLabel: 'Management',
    price: 480,
    author: 'Marvin McKinney',
    image: 'img/course-2.jpg',
    imageAlt: 'Instructor Marvin McKinney',
    badgeModifier: 'course-card__badge--management'
  },
  {
    id: 'hr-analytics',
    title: 'HR Management and Analytics',
    category: 'hr',
    categoryLabel: 'HR & Recruiting',
    price: 200,
    author: 'Leslie Alexander Li',
    image: 'img/course-3.jpg',
    imageAlt: 'Instructor Leslie Alexander Li',
    badgeModifier: 'course-card__badge--hr'
  },
  {
    id: 'brand-pr',
    title: 'Brand Management & PR Communications',
    category: 'marketing',
    categoryLabel: 'Marketing',
    price: 530,
    author: 'Kristin Watson',
    image: 'img/course-4.jpg',
    imageAlt: 'Instructor Kristin Watson',
    badgeModifier: 'course-card__badge--marketing'
  },
  {
    id: 'graphic-design-basic',
    title: 'Graphic Design Basic',
    category: 'design',
    categoryLabel: 'Design',
    price: 500,
    author: 'Guy Hawkins',
    image: 'img/course-5.jpg',
    imageAlt: 'Instructor Guy Hawkins',
    badgeModifier: 'course-card__badge--design'
  },
  {
    id: 'business-dev-management',
    title: 'Business Development Management',
    category: 'management',
    categoryLabel: 'Management',
    price: 400,
    author: 'Dianne Russell',
    image: 'img/course-6.jpg',
    imageAlt: 'Instructor Dianne Russell',
    badgeModifier: 'course-card__badge--management'
  },
  {
    id: 'highload-architecture',
    title: 'Highload Software Architecture',
    category: 'development',
    categoryLabel: 'Development',
    price: 600,
    author: 'Brooklynn Simmons',
    image: 'img/course-7.jpg',
    imageAlt: 'Instructor Brooklynn Simmons',
    badgeModifier: 'course-card__badge--development'
  },
  {
    id: 'hr-selection',
    title: 'Human Resources – Selection and Recruitment',
    category: 'hr',
    categoryLabel: 'HR & Recruiting',
    price: 150,
    author: 'Kathryn Murphy',
    image: 'img/course-8.jpg',
    imageAlt: 'Instructor Kathryn Murphy',
    badgeModifier: 'course-card__badge--hr'
  },
  {
    id: 'ux-human-centered',
    title: 'User Experience. Human-centered Design',
    category: 'design',
    categoryLabel: 'Design',
    price: 240,
    author: 'Cody Fisher',
    image: 'img/course-9.jpg',
    imageAlt: 'Instructor Cody Fisher',
    badgeModifier: 'course-card__badge--design'
  }
];

function normalize(text) {
  return text.toLowerCase().trim();
}

function createCourseCard(course) {
  const template = document.querySelector('#courseCardTemplate');
  const card = template.content.firstElementChild.cloneNode(true);

  card.dataset.category = course.category;
  card.dataset.title = course.title;

  const img = card.querySelector('.course-card__img');
  img.src = course.image;
  img.alt = course.imageAlt;

  const badge = card.querySelector('.course-card__badge');
  badge.textContent = course.categoryLabel;
  badge.classList.add(course.badgeModifier);

  card.querySelector('.course-card__title').textContent = course.title;
  card.querySelector('.course-card__price').textContent = `$${course.price}`;
  card.querySelector('.course-card__author').textContent = `by ${course.author}`;

  return card;
}

function renderCourses(data) {
  const grid = document.getElementById('coursesGrid');
  grid.innerHTML = '';
  data.forEach((course) => {
    grid.appendChild(createCourseCard(course));
  });
}

(function init() {
  renderCourses(coursesData);
  const tabButtons = Array.from(document.querySelectorAll('.courses__tab'));
  const searchInput = document.querySelector('.courses__search-input');
  const cards = Array.from(document.querySelectorAll('.course-card'));

  let activeCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    const normalizedQuery = normalize(searchQuery);

    cards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const cardTitle = normalize(card.dataset.title || '');

      const matchesCategory =
        activeCategory === 'all' || cardCategory === activeCategory;

      const matchesSearch =
        !normalizedQuery || cardTitle.includes(normalizedQuery);

      const shouldShow = matchesCategory && matchesSearch;
      card.classList.toggle('course-card--hidden', !shouldShow);
    });
  }

  function handleTabClick(evt) {
    const button = evt.currentTarget;
    const category = button.dataset.category;

    if (!category || category === activeCategory) {
      return;
    }

    activeCategory = category;

    tabButtons.forEach((btn) => {
      const isActive = btn === button;
      btn.classList.toggle('courses__tab--active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    applyFilters();
  }

  function handleSearchInput(evt) {
    searchQuery = evt.target.value;
    applyFilters();
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', handleTabClick);
  });

  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }

  applyFilters();
})();
