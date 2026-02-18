document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const setsContainer = document.getElementById('lotto-sets-container');
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    const generateUniqueNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const generateAndDisplaySets = () => {
        setsContainer.innerHTML = ''; // Clear previous sets
        for (let i = 0; i < 5; i++) {
            const lottoNumbers = generateUniqueNumbers();
            const setElement = document.createElement('div');
            setElement.classList.add('lotto-set');
            setElement.style.animationDelay = `${i * 0.1}s`;

            const numbersContainer = document.createElement('div');
            numbersContainer.classList.add('lotto-numbers');

            lottoNumbers.forEach((number, index) => {
                const ball = document.createElement('div');
                ball.classList.add('number-ball', `color-${(index % 6) + 1}`);
                ball.textContent = number;
                numbersContainer.appendChild(ball);
            });

            const copyBtn = document.createElement('button');
            copyBtn.classList.add('copy-btn');
            copyBtn.textContent = 'Copy';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(lottoNumbers.join(', ')).then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                    }, 1500);
                });
            });

            setElement.appendChild(numbersContainer);
            setElement.appendChild(copyBtn);
            setsContainer.appendChild(setElement);
        }
    };

    generateBtn.addEventListener('click', generateAndDisplaySets);

    themeSwitch.addEventListener('change', () => {
        body.classList.toggle('light-mode');
    });

    // Initial generation
    generateAndDisplaySets();
});
