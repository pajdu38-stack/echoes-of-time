// 🎮 Echoes of Time - Game JavaScript

const questions = [
    {
        artifact: "🗿",
        name: "حجر الزمن",
        echo: "وجدت نقشًا قديمًا يقول: «من يعرف الماضي يستطيع تغيير المستقبل».",
        options: [
            "أبحث عن المفتاح",
            "ألمس الحجر",
            "أهرب من المكان",
            "أنتظر"
        ],
        correct: 1
    },
    {
        artifact: "🔑",
        name: "المفتاح الغامض",
        echo: "ظهر مفتاح قديم عليه رمز غريب. يبدو أنه يفتح بابًا مخفيًا.",
        options: [
            "أرمي المفتاح",
            "أستخدم المفتاح",
            "أكسر الباب",
            "أعود للخلف"
        ],
        correct: 1
    },
    {
        artifact: "👁️",
        name: "عين الظل",
        echo: "شعرت أن شيئًا يراقبك من الظلام...",
        options: [
            "أقترب",
            "أختبئ",
            "أصرخ",
            "أغلق عيني"
        ],
        correct: 1
    },
    {
        artifact: "⏳",
        name: "ساعة الزمن",
        echo: "بدأت الساعة تتحرك للخلف. لديك لحظات قليلة لاتخاذ القرار.",
        options: [
            "أوقف الساعة",
            "أكسرها",
            "أهرب",
            "أنتظر"
        ],
        correct: 0
    },
    {
        artifact: "🚪",
        name: "الباب الأخير",
        echo: "وصلت إلى الباب الأخير. خلفه يوجد سر المكان.",
        options: [
            "أفتح الباب",
            "أهرب",
            "أعود",
            "أجلس"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selected = null;

const $ = (selector) => document.querySelector(selector);

function getElements() {
    return {
        name: $(".artifact-name"),
        icon: $(".artifact-icon"),
        echo: $(".echo-text"),
        options: $(".options-grid"),
        feedback: $(".feedback"),
        progress: $(".progress-fill"),
        score: $(".score-display")
    };
}

function startGame() {
    currentQuestion = 0;
    score = 0;
    selected = null;
    showQuestion();
}

function showQuestion() {
    const el = getElements();
    const q = questions[currentQuestion];

    if (el.name) el.name.textContent = q.name;
    if (el.icon) el.icon.textContent = q.artifact;
    if (el.echo) el.echo.textContent = q.echo;

    if (el.feedback) {
        el.feedback.textContent = "اختر قرارك...";
        el.feedback.className = "feedback info";
    }

    selected = null;

    if (el.options) {
        el.options.innerHTML = "";

        q.options.forEach((option, index) => {
            const button = document.createElement("button");

            button.className = "option-btn";
            button.textContent = option;

            button.addEventListener("click", () => {
                selectOption(index, button);
            });

            el.options.appendChild(button);
        });
    }

    if (el.progress) {
        const percent =
            ((currentQuestion + 1) / questions.length) * 100;

        el.progress.style.width = percent + "%";
    }

    updateScore();
}

function selectOption(index, button) {
    if (selected !== null) return;

    selected = index;

    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    const el = getElements();
    const q = questions[currentQuestion];

    if (index === q.correct) {
        score++;

        button.classList.add("correct");

        if (el.feedback) {
            el.feedback.textContent = "✅ اختيار صحيح!";
            el.feedback.className = "feedback success";
        }
    } else {
        button.classList.add("wrong");

        if (el.feedback) {
            el.feedback.textContent =
                "❌ اختيار خاطئ... الإجابة الصحيحة: " +
                q.options[q.correct];

            el.feedback.className = "feedback error";
        }

        document.querySelectorAll(".option-btn")[q.correct]
            ?.classList.add("correct");
    }

    updateScore();

    setTimeout(() => {
        nextQuestion();
    }, 1200);
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        finishGame();
        return;
    }

    showQuestion();
}

function finishGame() {
    const el = getElements();

    if (el.name) el.name.textContent = "🎉 انتهت اللعبة!";
    if (el.icon) el.icon.textContent = "🏆";

    if (el.echo) {
        el.echo.textContent =
            `أكملت الرحلة! حصلت على ${score} من ${questions.length} نقاط.`;
    }

    if (el.options) {
        el.options.innerHTML = "";

        const restart = document.createElement("button");

        restart.className = "action-btn";
        restart.textContent = "🔄 العب من جديد";

        restart.addEventListener("click", startGame);

        el.options.appendChild(restart);
    }

    if (el.feedback) {
        el.feedback.textContent =
            score === questions.length
                ? "⭐ ممتاز! أجبت على جميع الأسئلة بشكل صحيح!"
                : "انتهت الرحلة. حاول مرة أخرى لتحصل على نتيجة أعلى!";

        el.feedback.className =
            score === questions.length
                ? "feedback success"
                : "feedback info";
    }

    if (el.progress) {
        el.progress.style.width = "100%";
    }

    updateScore();
}

function updateScore() {
    const el = getElements();

    if (el.score) {
        el.score.innerHTML = `
            <span>🏆 النقاط: ${score}</span>
            <span>📜 المرحلة: ${Math.min(
                currentQuestion + 1,
                questions.length
            )}/${questions.length}</span>
        `;
    }
}

// تشغيل اللعبة عند فتح الصفحة
document.addEventListener("DOMContentLoaded", startGame);
