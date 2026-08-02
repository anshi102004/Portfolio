/* ==========================================================================
   Anshi Sharma Cyber Matrix - Main Controller Script
   Handles typing matrix, project modals, neon cursor, and interactive events
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Project Data Store ---
  const projectData = {
    '1': {
      title: "Movie Rating Prediction System",
      subtitle: "Machine Learning / Scikit-Learn",
      tags: ["Python", "Pandas", "Scikit-Learn", "Regression"],
      github: "https://github.com/anshi102004/Movie_Rating_Prediction",
      details: `
        <p>A machine learning project built with Python and Scikit-Learn to estimate movie ratings based on genre distributions, budget, and cast attributes.</p>
        <ul style="margin-left:20px; margin-top:10px; line-height:1.7; color:var(--text-secondary);">
          <li>Missing value handling & feature preprocessing on movie datasets.</li>
          <li>Exploratory Data Analysis (EDA) using Pandas & NumPy.</li>
          <li>Supervised regression modeling & evaluation metrics.</li>
        </ul>
      `
    },
    '2': {
      title: "Sales Prediction Model",
      subtitle: "Data Analytics & Forecasting",
      tags: ["Python", "Pandas", "Seaborn", "Regression"],
      github: "https://github.com/anshi102004/Sales_Prediction",
      details: `
        <p>Forecasting product sales based on advertising channel spend (TV, Radio, Newspaper) using statistical regression analysis.</p>
        <ul style="margin-left:20px; margin-top:10px; line-height:1.7; color:var(--text-secondary);">
          <li>Multi-variate regression analysis & correlation matrices.</li>
          <li>Visual heatmaps and scatter plots generated with Seaborn & Matplotlib.</li>
          <li>Model evaluation using R² score and Mean Squared Error.</li>
        </ul>
      `
    },
    '3': {
      title: "Titanic Survival Classifier",
      subtitle: "CodSoft Data Science Internship Project",
      tags: ["Python", "Pandas", "Scikit-Learn", "Classification"],
      github: "https://github.com/anshi102004/Titanic_Survival_Prediction",
      details: `
        <p>A classification project built during the CodSoft internship predicting passenger survival outcomes on the Titanic dataset.</p>
        <ul style="margin-left:20px; margin-top:10px; line-height:1.7; color:var(--text-secondary);">
          <li>Data cleaning, age imputation, and feature engineering.</li>
          <li>Categorical encoding for Pclass, Sex, and Embarked attributes.</li>
          <li>Classification model comparison & confusion matrix evaluation.</li>
        </ul>
      `
    },
    '4': {
      title: "Email Spam Detection Pipeline",
      subtitle: "Natural Language Processing (NLP)",
      tags: ["Python", "NLP", "TF-IDF", "Naive Bayes"],
      github: "https://github.com/anshi102004",
      details: `
        <p>An NLP text classification pipeline for automated spam email detection.</p>
        <ul style="margin-left:20px; margin-top:10px; line-height:1.7; color:var(--text-secondary);">
          <li>Tokenization, stopword filtering, and TF-IDF text vectorization.</li>
          <li>Multinomial Naive Bayes & Logistic Regression modeling.</li>
          <li>High precision classification without false positives.</li>
        </ul>
      `
    }
  };

  // --- Typing Matrix Effect ---
  const typedElement = document.getElementById('typed-role');
  if (typedElement) {
    const phrases = [
      "// B.Tech CSE (AI & ML) Student (9.5 CGPA)",
      "// Data Science & Python Developer",
      "// ML Classification & Regression Specialist",
      "// SQL & Analytical Problem Solver"
    ];
    let pIdx = 0, cIdx = 0, isDeleting = false;

    function typeLoop() {
      const current = phrases[pIdx];
      typedElement.textContent = isDeleting ? current.substring(0, cIdx - 1) : current.substring(0, cIdx + 1);
      cIdx += isDeleting ? -1 : 1;

      if (!isDeleting && cIdx === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000);
      } else if (isDeleting && cIdx === 0) {
        isDeleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        setTimeout(typeLoop, 300);
      } else {
        setTimeout(typeLoop, isDeleting ? 40 : 70);
      }
    }
    typeLoop();
  }

  // --- Custom Cursor ---
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (cursor && follower && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      follower.style.left = `${e.clientX}px`;
      follower.style.top = `${e.clientY}px`;
    });

    document.querySelectorAll('a, button, .bento-card, .dossier-card, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        if (window.soundManager) window.soundManager.playHover();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
      el.addEventListener('click', () => {
        if (window.soundManager) window.soundManager.playClick();
      });
    });
  }

  // --- Sound Toggle ---
  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (window.soundManager) {
        const active = window.soundManager.toggle();
        soundBtn.innerHTML = active ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
      }
    });
  }

  // --- Modal Dossier Handling ---
  function openDossierModal(projId) {
    const proj = projectData[projId];
    if (!proj) return;

    const modalBackdrop = document.createElement('div');
    modalBackdrop.style.cssText = `
      position:fixed; inset:0; background:rgba(3,3,8,0.85); backdrop-filter:blur(12px);
      z-index:2000; display:flex; align-items:center; justify-content:center; padding:24px;
    `;

    const modalBox = document.createElement('div');
    modalBox.style.cssText = `
      background:#0a0a14; border:1px solid var(--neon-pink); padding:30px;
      max-width:600px; width:100%; box-shadow:0 0 40px rgba(255,0,127,0.4);
      position:relative; font-family:var(--font-body);
    `;

    modalBox.innerHTML = `
      <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--neon-pink); margin-bottom:6px;">${proj.subtitle}</div>
      <h2 style="font-size:1.8rem; color:#fff; margin-bottom:14px;">${proj.title}</h2>
      ${proj.details}
      <div style="margin-top:24px; display:flex; gap:12px;">
        <a href="${proj.github}" target="_blank" rel="noopener" class="cyber-btn" style="padding:8px 18px; font-size:0.85rem;">
          <i class="fab fa-github"></i> OPEN GITHUB REPO
        </a>
        <button class="cyber-btn-outline close-modal" style="padding:8px 18px; font-size:0.85rem; cursor:pointer;">
          CLOSE
        </button>
      </div>
    `;

    modalBackdrop.appendChild(modalBox);
    document.body.appendChild(modalBackdrop);

    modalBox.querySelector('.close-modal').addEventListener('click', () => {
      document.body.removeChild(modalBackdrop);
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) document.body.removeChild(modalBackdrop);
    });
  }

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openDossierModal(id);
    });
  });

  // --- Copy Email Button ---
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('anshisharma9927@gmail.com').then(() => {
        copyBtn.innerHTML = '<i class="fas fa-check"></i> COPIED TO CLIPBOARD!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fas fa-copy"></i> COPY EMAIL ADDRESS';
        }, 2000);
      });
    });
  }

  // --- Cyber Form Submit ---
  const cyberForm = document.getElementById('cyber-form');
  if (cyberForm) {
    cyberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = cyberForm.querySelector('button');
      btn.innerHTML = '<i class="fas fa-check"></i> MESSAGE TRANSMITTED!';
      cyberForm.reset();
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> TRANSMIT MESSAGE';
      }, 3000);
    });
  }
});
