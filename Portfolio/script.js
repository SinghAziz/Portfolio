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

function addRecommendation() {
    // Get the message of the new recommendation
    let recommendation = document.getElementById("new_recommendation");
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value != null && recommendation.value.trim() != "") {
      console.log("New recommendation added");
      //Call showPopup here
      showPopup(true);
      // Create a new 'recommendation' element and set it's value to the user's message
      var element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = '<div class="recommendation-body"><span class="rec-quote">&#8220;</span><p class="recommendation-text">' + recommendation.value.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p><span class="rec-quote">&#8221;</span></div><div class="recommendation-footer"><span class="recommendation-author">— Anonymous</span><button type="button" class="read-more-btn">Read more</button></div>';
      document.getElementById("all_recommendations").appendChild(element); 
      
      // Reset the value of the textarea
      recommendation.value = "";
    }
  }
  
  function showPopup(bool) {
    if (bool) {
      document.getElementById('popup').style.visibility = 'visible'
    } else {
      document.getElementById('popup').style.visibility = 'hidden'
    }
  }
  