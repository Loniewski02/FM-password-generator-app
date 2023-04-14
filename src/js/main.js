const lengthNumber = document.querySelector('.app__main-length-number');
const rangeInput = document.querySelector('#length');
const copyBtn = document.querySelector('.app__out-copy');
const generatedPassword = document.querySelector('.app__out-pass');
const copyInfo = document.querySelector('.app__out-copy-info');
const generateBtn = document.querySelector('.app__main-btn');
const passStrength = document.querySelector('.app__main-strength-boxes');

const upperCheckbox = document.querySelector('#upper');
const lowerCheckbox = document.querySelector('#lower');
const numberCheckbox = document.querySelector('#numb');
const specialCheckbox = document.querySelector('#special');

const upperLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
const lowerLetters = 'qwertyuiopasdfghjklzxcvbnm';
const numbers = '1234567890';
const symbols = '!#$%&()*+,-./:;<=>?@[]^_`{|}~';

const handleGenerator = () => {
	const passLength = lengthNumber.textContent;
	let availableCharset = '';

	if (upperCheckbox.checked) availableCharset += upperLetters;
	if (lowerCheckbox.checked) availableCharset += lowerLetters;
	if (numberCheckbox.checked) availableCharset += numbers;
	if (specialCheckbox.checked) availableCharset += symbols;

	generatePassword(passLength, availableCharset);
};

const generatePassword = (length, char) => {
	let password = '';

	if (char.length > 1 && length > 1) {
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * char.length);
			password += char[randomIndex];
		}
		checkPasswordStrength(password);
	}
};

const checkPasswordStrength = password => {
	let strength = 0;

	if (password.length < 6) strength += 1;
	else if (password.length < 8) strength += 2;
	else if (password.length < 10) strength += 3;
	else if (password.length < 14) strength += 4;
	else strength += 5;

	const characterTypes = [/[a-z]/, /[A-Z]/, /[0-9]/, /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/];
	let typesUsed = 0;

	for (const regex of characterTypes) {
		if (regex.test(password)) typesUsed++;
	}
	strength += Math.max(0, typesUsed - 1);

	generatedPassword.classList.remove('app__out-pass--disabled');
	generatedPassword.textContent = password;
	handlePasswordStrength(strength);
};

const handlePasswordStrength = strength => {
	passStrength.classList.remove('very-weak', 'weak', 'medium', 'strong');

	if (strength < 3) passStrength.classList.add('very-weak');
	else if (strength < 6) passStrength.classList.add('weak');
	else if (strength < 8) passStrength.classList.add('medium');
	else passStrength.classList.add('strong');
};

const handleRange = e => {
	let target = e.target;
	const minValue = target.min;
	const maxValue = target.max;
	const currentValue = target.value;

	target.style.backgroundSize = ((currentValue - minValue) * 100) / (maxValue - minValue) + '% 100%';
	lengthNumber.textContent = currentValue;
};

const copyPass = () => {
	if (!generatedPassword.classList.contains('app__out-pass--disabled')) {
		navigator.clipboard.writeText(generatedPassword.textContent);
		copyInfo.classList.add('app__out-copy-info--copied');
		setTimeout(() => {
			copyInfo.classList.remove('app__out-copy-info--copied');
		}, 3000);
	}
};

rangeInput.addEventListener('input', handleRange);
copyBtn.addEventListener('click', copyPass);
generateBtn.addEventListener('click', handleGenerator);
