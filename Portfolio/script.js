// Read more / Read less for recommendations
document.getElementById('all_recommendations')?.addEventListener('click', function (e) {
  const btn = e.target.closest('.read-more-btn');
  if (!btn) return;
  const card = btn.closest('.recommendation');
  if (!card) return;
  card.classList.toggle('expanded');
  btn.textContent = card.classList.contains('expanded') ? 'Read less' : 'Read more';
});

// Smooth scroll for nav links with offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      const navHeight = document.querySelector('nav')?.offsetHeight || 0;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

async function addRecommendation() {
    const nameInput = document.getElementById('contact_name');
    const emailInput = document.getElementById('contact_email');
    const messageInput = document.getElementById('new_recommendation');
    const feedback = document.getElementById('contact_feedback');

    if (!nameInput || !emailInput || !messageInput || !feedback) return;

    const setFeedback = (text) => {
      feedback.textContent = text;
      feedback.classList.add('show');
    };

    const clearFeedback = () => {
      feedback.textContent = '';
      feedback.classList.remove('show');
    };

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      setFeedback('Kindly fill all the details');
      if (!name) {
        nameInput.focus();
      } else if (!email) {
        emailInput.focus();
      } else {
        messageInput.focus();
      }
      return;
    }

    if (!validEmail) {
      setFeedback('Please enter a valid email for contact.');
      emailInput.focus();
      return;
    }

    clearFeedback();

    setFeedback('Sending your message...');

    try {
      const response = await fetch('https://formsubmit.co/ajax/singhharaziz@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio Contact from ${name}`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      const result = await response.json();
      if (!response.ok || (result.success !== 'true' && result.success !== true)) {
        throw new Error('Send failed');
      }

      clearFeedback();
      showPopup(true);
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    } catch (error) {
      setFeedback('Unable to send right now. Please try again in a moment.');
    }
  }
  
  function showPopup(bool) {
    if (bool) {
      document.getElementById('popup').style.visibility = 'visible'
    } else {
      document.getElementById('popup').style.visibility = 'hidden'
    }
  }
  