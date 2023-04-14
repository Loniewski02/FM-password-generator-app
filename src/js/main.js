const lengthNumber = document.querySelector('.app__main-length-number');
const rangeInput = document.querySelector('#length');
const copyBtn = document.querySelector('.app__out-copy');
const generatedPassword = document.querySelector('.app__out-pass');
const copyInfo = document.querySelector('.app__out-copy-info');

const handleRange = e => {
	let target = e.target;
	const minValue = target.min;
	const maxValue = target.max;

	const currentValue = target.value;

	target.style.backgroundSize = ((currentValue - minValue) * 100) / (maxValue - minValue) + '% 100%';

	lengthNumber.textContent = currentValue;
};

const copyPass = () => {
	navigator.clipboard.writeText(generatedPassword.textContent);
	copyInfo.classList.add('app__out-copy-info--copied');
	setTimeout(() => {
		copyInfo.classList.remove('app__out-copy-info--copied');
	}, 3000);
};

rangeInput.addEventListener('input', handleRange);

copyBtn.addEventListener('click', copyPass);
