// ============================================================
// Robotic Perception Study Hub - Application Logic
// ============================================================

(function () {
    "use strict";

    // --- Navigation ---
    const navBtns = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    navBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.section;
            navBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            sections.forEach(s => s.classList.add("hidden"));
            document.getElementById(target).classList.remove("hidden");
        });
    });

    // --- Topics ---
    const topicGrid = document.getElementById("topic-grid");
    const topicDetail = document.getElementById("topic-detail");
    const topicContent = document.getElementById("topic-content");
    const backBtn = document.getElementById("back-to-topics");

    TOPICS.forEach(topic => {
        const card = document.createElement("div");
        card.className = "topic-card";
        card.innerHTML = `<div class="icon">${topic.icon}</div><h3>${topic.title}</h3><p>${topic.summary}</p>`;
        card.addEventListener("click", () => showTopic(topic));
        topicGrid.appendChild(card);
    });

    function showTopic(topic) {
        topicGrid.classList.add("hidden");
        topicDetail.classList.remove("hidden");
        topicContent.innerHTML = topic.content;
    }

    backBtn.addEventListener("click", () => {
        topicDetail.classList.add("hidden");
        topicGrid.classList.remove("hidden");
    });

    // --- Flashcards ---
    const fcCategory = document.getElementById("fc-category");
    const fcFront = document.getElementById("fc-front");
    const fcBack = document.getElementById("fc-back");
    const fcInner = document.getElementById("flashcard-inner");
    const fcCounter = document.getElementById("fc-counter");
    const fcProgress = document.getElementById("fc-progress");
    const fcPrev = document.getElementById("fc-prev");
    const fcNext = document.getElementById("fc-next");
    const fcShuffle = document.getElementById("fc-shuffle");

    const fcCategories = ["All", ...new Set(FLASHCARDS.map(f => f.category))];
    fcCategories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        fcCategory.appendChild(opt);
    });

    let fcDeck = [...FLASHCARDS];
    let fcIndex = 0;

    function getFilteredCards() {
        const cat = fcCategory.value;
        return cat === "All" ? [...FLASHCARDS] : FLASHCARDS.filter(f => f.category === cat);
    }

    function showCard() {
        if (fcDeck.length === 0) {
            fcFront.textContent = "No cards in this category.";
            fcBack.textContent = "";
            fcCounter.textContent = "0 / 0";
            fcProgress.style.width = "0%";
            return;
        }
        fcInner.classList.remove("flipped");
        const card = fcDeck[fcIndex];
        fcFront.textContent = card.q;
        fcBack.textContent = card.a;
        fcCounter.textContent = `${fcIndex + 1} / ${fcDeck.length}`;
        fcProgress.style.width = `${((fcIndex + 1) / fcDeck.length) * 100}%`;
    }

    fcInner.addEventListener("click", () => fcInner.classList.toggle("flipped"));

    fcPrev.addEventListener("click", () => {
        if (fcDeck.length === 0) return;
        fcIndex = (fcIndex - 1 + fcDeck.length) % fcDeck.length;
        showCard();
    });

    fcNext.addEventListener("click", () => {
        if (fcDeck.length === 0) return;
        fcIndex = (fcIndex + 1) % fcDeck.length;
        showCard();
    });

    fcCategory.addEventListener("change", () => {
        fcDeck = getFilteredCards();
        fcIndex = 0;
        showCard();
    });

    fcShuffle.addEventListener("click", () => {
        for (let i = fcDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fcDeck[i], fcDeck[j]] = [fcDeck[j], fcDeck[i]];
        }
        fcIndex = 0;
        showCard();
    });

    showCard();

    // --- Quiz ---
    const quizCategory = document.getElementById("quiz-category");
    const quizCount = document.getElementById("quiz-count");
    const quizSetup = document.getElementById("quiz-setup");
    const quizActive = document.getElementById("quiz-active");
    const quizResults = document.getElementById("quiz-results");
    const quizStart = document.getElementById("quiz-start");
    const quizProgressEl = document.getElementById("quiz-progress");
    const quizScoreEl = document.getElementById("quiz-score");
    const quizBar = document.getElementById("quiz-bar");
    const quizQuestion = document.getElementById("quiz-question");
    const quizOptions = document.getElementById("quiz-options");
    const quizFeedback = document.getElementById("quiz-feedback");
    const quizNextBtn = document.getElementById("quiz-next-btn");
    const quizFinalScore = document.getElementById("quiz-final-score");
    const quizReview = document.getElementById("quiz-review");
    const quizRestart = document.getElementById("quiz-restart");

    const qCategories = ["All", ...new Set(QUIZ_QUESTIONS.map(q => q.category))];
    qCategories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        quizCategory.appendChild(opt);
    });

    let quizPool = [];
    let quizIndex = 0;
    let quizScore = 0;
    let quizHistory = [];

    function shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    quizStart.addEventListener("click", () => {
        const cat = quizCategory.value;
        let pool = cat === "All" ? [...QUIZ_QUESTIONS] : QUIZ_QUESTIONS.filter(q => q.category === cat);
        pool = shuffleArray(pool);
        const count = parseInt(quizCount.value);
        if (count > 0) pool = pool.slice(0, count);
        if (pool.length === 0) return;

        quizPool = pool;
        quizIndex = 0;
        quizScore = 0;
        quizHistory = [];
        quizSetup.classList.add("hidden");
        quizResults.classList.add("hidden");
        quizActive.classList.remove("hidden");
        showQuizQuestion();
    });

    function showQuizQuestion() {
        const q = quizPool[quizIndex];
        quizProgressEl.textContent = `Question ${quizIndex + 1} / ${quizPool.length}`;
        quizScoreEl.textContent = `Score: ${quizScore}`;
        quizBar.style.width = `${((quizIndex) / quizPool.length) * 100}%`;
        quizQuestion.textContent = q.question;
        quizOptions.innerHTML = "";
        quizFeedback.classList.add("hidden");
        quizFeedback.className = "quiz-feedback hidden";
        quizNextBtn.classList.add("hidden");

        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "quiz-option";
            btn.textContent = opt;
            btn.addEventListener("click", () => selectAnswer(i));
            quizOptions.appendChild(btn);
        });
    }

    function selectAnswer(selected) {
        const q = quizPool[quizIndex];
        const buttons = quizOptions.querySelectorAll(".quiz-option");
        buttons.forEach(b => b.classList.add("disabled"));
        buttons[q.answer].classList.add("correct");

        const isCorrect = selected === q.answer;
        if (!isCorrect) {
            buttons[selected].classList.add("wrong");
        } else {
            quizScore++;
            quizScoreEl.textContent = `Score: ${quizScore}`;
        }

        quizHistory.push({
            question: q.question,
            selected: q.options[selected],
            correct: q.options[q.answer],
            isCorrect
        });

        quizFeedback.classList.remove("hidden");
        if (isCorrect) {
            quizFeedback.className = "quiz-feedback correct-feedback";
            quizFeedback.textContent = "Correct!";
        } else {
            quizFeedback.className = "quiz-feedback wrong-feedback";
            quizFeedback.textContent = `Incorrect. The answer is: ${q.options[q.answer]}`;
        }

        quizNextBtn.classList.remove("hidden");
        quizNextBtn.textContent = quizIndex < quizPool.length - 1 ? "Next Question" : "See Results";
    }

    quizNextBtn.addEventListener("click", () => {
        quizIndex++;
        if (quizIndex < quizPool.length) {
            showQuizQuestion();
        } else {
            showQuizResults();
        }
    });

    function showQuizResults() {
        quizActive.classList.add("hidden");
        quizResults.classList.remove("hidden");
        const pct = Math.round((quizScore / quizPool.length) * 100);
        quizFinalScore.textContent = `${quizScore} / ${quizPool.length} (${pct}%)`;
        quizFinalScore.className = "final-score " + (pct >= 80 ? "great" : pct >= 50 ? "ok" : "poor");
        quizBar.style.width = "100%";

        quizReview.innerHTML = "";
        quizHistory.forEach(h => {
            const div = document.createElement("div");
            div.className = `review-item ${h.isCorrect ? "review-correct" : "review-wrong"}`;
            div.innerHTML = `
                <div class="review-q">${h.question}</div>
                <div class="review-a">Your answer: ${h.selected}${h.isCorrect ? "" : `<br>Correct answer: ${h.correct}`}</div>
            `;
            quizReview.appendChild(div);
        });
    }

    quizRestart.addEventListener("click", () => {
        quizResults.classList.add("hidden");
        quizSetup.classList.remove("hidden");
    });

    // --- Glossary ---
    const glossaryInput = document.getElementById("glossary-input");
    const glossaryList = document.getElementById("glossary-list");

    function renderGlossary(filter = "") {
        glossaryList.innerHTML = "";
        const lower = filter.toLowerCase();
        const filtered = GLOSSARY.filter(g =>
            g.term.toLowerCase().includes(lower) || g.definition.toLowerCase().includes(lower)
        );
        filtered.forEach(g => {
            const dl = document.createElement("dl");
            dl.className = "glossary-item";
            dl.innerHTML = `<dt>${g.term}</dt><dd>${g.definition}</dd>`;
            glossaryList.appendChild(dl);
        });
        if (filtered.length === 0) {
            glossaryList.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:2rem;">No matching terms found.</p>';
        }
    }

    glossaryInput.addEventListener("input", () => renderGlossary(glossaryInput.value));
    renderGlossary();

    // --- Keyboard shortcuts ---
    document.addEventListener("keydown", (e) => {
        const active = document.querySelector(".section:not(.hidden)");
        if (!active) return;

        if (active.id === "flashcards") {
            if (e.key === "ArrowLeft") fcPrev.click();
            if (e.key === "ArrowRight") fcNext.click();
            if (e.key === " " || e.key === "Enter") { e.preventDefault(); fcInner.classList.toggle("flipped"); }
        }
    });
})();
