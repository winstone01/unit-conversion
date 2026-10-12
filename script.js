const category = document.getElementById("category");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const swapBtn = document.getElementById("swapBtn");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");

const units = {
	length: ["Meter", "Kilometer", "Centimeter", "Millimeter", "Mile", "Yard", "Foot", "Inch"],
	weight: ["Kilogram", "Gram", "Milligram", "Pound", "Stone", "Ounce"],
	temperature: ["Celsius", "Fahrenheit", "Kelvin"],
	time: ["Second", "Minute", "Hour", "Day"],
	data: ["Byte", "Kilobyte", "Megabyte", "Gigabyte", "Terabyte"],
};

function loadUnits() {
	const selectedCategory = category.value;
	fromUnit.innerHTML = "";
	toUnit.innerHTML = "";
	units[selectedCategory].forEach(function (unit) {
		const fromOption = document.createElement("option");
		fromOption.value = unit;
		fromOption.textContent = unit;
		fromUnit.appendChild(fromOption);

		const toOption = document.createElement("option");
		toOption.value = unit;
		toOption.textContent = unit;
		toUnit.appendChild(toOption);
	});
	if (fromUnit.options.length > 1) {
		toUnit.selectedIndex = 1;
	}
}

function convertLength(value, from, to) {
	const meterValues = {
		Meter: 1,
		Kilometer: 1000,
		Centimeter: 0.01,
		Millimeter: 0.001,
		Mile: 1609.344,
		Yard: 0.9144,
		Foot: 0.3048,
		Inch: 0.0254,
	};

	const valueInMeters = value * meterValues[from];
	return valueInMeters / meterValues[to];
}

function convertWeight(value, from, to) {
	const kilogramValues = {
		kilogram: 1,
		Gram: 0.001,
		Milligram: 0.000001,
		Ponds: 0.45359,
		Ounce: 0.02834,
		Stone: 0.157473,
	};
	const valueInKilograms = value * kilogramValues[from];
	return valueInKilograms / kilogramValues[to];
}

function convertTemperature(value, from, to) {
	let celsius;
	if (from === "celsius") {
		celsius = value;
	} else if (from === "Fahrenheit") {
		celsius = ((value - 32) * 5) / 9;
	} else if (from === "Kelvin") {
		celsius = value - 273.15;
	}
	if (to === "Celsius") {
		return celsius;
	}
	if (to === "Fahrenheit") {
		return (celsius * 9) / 5 + 32;
	}
	if (to === "Kelvin") {
		return celsius + 273.15;
	}
}

function convertTime(value, from, to) {
	const secondValues = {
		Second: 1,
		Minute: 60,
		Hour: 3600,
		Day: 86400,
	};

	const valueInSeconds = value * secondValues[from];
	return valueInSeconds / secondValues[to];
}

function convertData(value, from, to) {
	const byteValue = {
		Byte: 1,
		Kilobyte: 1024,
		Megabyte: 1024 * 1024,
		Gigabyte: 1024 * 1024 * 1024,
		Terabyte: 1024 * 1024 * 1024 * 1024,
	};
	const valueBytes = value * byteValue[from];
	return valueBytes / byteValue[to];
}

function convert() {
	const value = Number(inputValue.value);

	if (inputValue.value === "") {
		result.textContent = "Enter a value";
		return;
	}
	const from = fromUnit.value;
	const to = toUnit.value;
	const selectedCategory = category.value;
	let convertedValue;

	if (selectedCategory === "length") {
		convertedValue = convertLength(value, from, to);
	} else if (selectedCategory === "weight") {
		convertedValue = convertWeight(value, from, to);
	} else if (selectedCategory === "temperature") {
		convertTemperature(value, from, to);
	} else if (selectedCategory === "time") {
		convertedValue = convertTime(value, from, to);
	} else if (selectedCategory === "data") {
		convertedValue = convertData(value, from, to);
	}
	result.textContent = formatResult(convertedValue);
}

function formatResult(value) {
	if (!Number.isFinite(value)) {
		return "Invalid";
	}
	return Number(value).toLocaleString("en-GB", {
		maximumFractionDigits: 4,
	});
}

function swapUnits() {
	const currentFrom = fromUnit.value;
	const currentTo = toUnit.value;
	fromUnit.value = currentTo;
	toUnit.value = currentFrom;

	if (inputValue.value !== "") {
		convert();
	}
}

function clearConverter() {
	inputValue.value = "";
	result.textContent = "0";
}

category.addEventListener("change", function () {
	loadUnits();
	clearConverter();
});

convertBtn.addEventListener("click", convert);
clearBtn.addEventListener("click", clearConverter);
swapBtn.addEventListener("click", swapUnits);

inputValue.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		convert();
	}
});

loadUnits();
