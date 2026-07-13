const CONTACT_EMAIL = 'yhjeon1003@gmail.com';

const stepDetails = {
  diagnose: {
    title: '현재 과제와 병목 진단',
    body: '원료, 제품 아이디어, 개발 단계, 인증 준비, 조직 협업 상태를 빠르게 점검하고 가장 먼저 풀어야 할 문제를 정합니다.'
  },
  design: {
    title: '개발·인증·협업 로드맵 설계',
    body: '제품 콘셉트, R&D 일정, 제조 협의, 품질 기준, 인증 준비 항목을 하나의 실행 순서로 연결합니다.'
  },
  drive: {
    title: '실행 우선순위와 회의체 운영',
    body: '부서별 할 일과 의사결정 기준을 명확히 하고, 제품화 과정에서 놓치기 쉬운 이슈를 주기적으로 점검합니다.'
  },
  transfer: {
    title: '내부 기준과 문서 체계 정리',
    body: '외부 자문이 끝난 뒤에도 내부팀이 반복해서 사용할 수 있는 체크리스트, 회의 구조, 문서 기준을 남깁니다.'
  }
};

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-open');
    navLinks.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      navLinks.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', '메뉴 열기');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = Number(element.dataset.count || 0);
    const duration = 900;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.round(target * progress);
      element.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    countObserver.unobserve(element);
  });
}, { threshold: 0.65 });

document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));

document.querySelectorAll('[data-step]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.step;
    const detail = stepDetails[key];
    const detailBox = document.querySelector('[data-step-detail]');

    document.querySelectorAll('[data-step]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    if (detailBox && detail) {
      detailBox.innerHTML = `<h3>${detail.title}</h3><p>${detail.body}</p>`;
    }
  });
});

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const diagnosisInputs = document.querySelectorAll('[data-diagnosis]');
const diagnosisResult = document.querySelector('[data-diagnosis-result]');

function updateDiagnosis() {
  const checkedCount = Array.from(diagnosisInputs).filter((input) => input.checked).length;

  if (!diagnosisResult) return;

  if (checkedCount === 0) {
    diagnosisResult.innerHTML = '<strong>체크한 항목이 없습니다.</strong><p>현재 고민과 개발 단계를 선택하면 상담 필요도를 보여드립니다.</p>';
  } else if (checkedCount <= 2) {
    diagnosisResult.innerHTML = '<strong>단기 진단이 적합합니다.</strong><p>현재 개발 과제의 병목과 우선순위를 먼저 정리해보는 것이 좋습니다.</p>';
  } else if (checkedCount <= 4) {
    diagnosisResult.innerHTML = '<strong>제품화 로드맵 자문이 필요합니다.</strong><p>기획, R&D, 품질, 협업 구조를 한 번에 정리해야 일정 지연을 줄일 수 있습니다.</p>';
  } else {
    diagnosisResult.innerHTML = '<strong>프로젝트 PM형 자문을 권장합니다.</strong><p>현재 문제는 개별 이슈보다 전체 개발 운영 구조와 연결되어 있을 가능성이 큽니다.</p>';
  }
}

diagnosisInputs.forEach((input) => input.addEventListener('change', updateDiagnosis));

const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const company = String(formData.get('company') || '').trim();
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const topic = String(formData.get('topic') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!company || !name || !email || !topic || !message) {
      if (formStatus) formStatus.textContent = '필수 항목을 모두 입력해주세요.';
      return;
    }

    const subject = encodeURIComponent(`[B2B 자문 문의] ${company} / ${topic}`);
    const body = encodeURIComponent([
      `회사명: ${company}`,
      `담당자명: ${name}`,
      `이메일: ${email}`,
      `관심 분야: ${topic}`,
      '',
      '현재 고민:',
      message
    ].join('\n'));

    if (formStatus) {
      formStatus.textContent = '메일 앱을 열어 상담 요청 내용을 보냅니다. 메일 앱에서 내용을 확인한 뒤 전송해주세요.';
    }

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}
