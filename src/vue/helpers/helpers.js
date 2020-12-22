export function mileToKilometer(miles) {
	const kilometer = miles * 1.60934;
	return Math.round(kilometer);
}

export function deriveWindDir(windDir) {
	const windDirectionArray = [
		{ minVal: 0, maxVal: 30, direction: 'N' },
		{ minVal: 31, maxVal: 45, direction: 'NNE' },
		{ minVal: 46, maxVal: 75, direction: 'NE' },
		{ minVal: 76, maxVal: 90, direction: 'ENE' },
		{ minVal: 91, maxVal: 120, direction: 'E' },
		{ minVal: 121, maxVal: 135, direction: 'ESE' },
		{ minVal: 136, maxVal: 165, direction: 'SE' },
		{ minVal: 166, maxVal: 180, direction: 'SSE' },
		{ minVal: 181, maxVal: 210, direction: 'S' },
		{ minVal: 211, maxVal: 225, direction: 'SSW' },
		{ minVal: 226, maxVal: 255, direction: 'SW' },
		{ minVal: 256, maxVal: 270, direction: 'WSW' },
		{ minVal: 271, maxVal: 300, direction: 'W' },
		{ minVal: 301, maxVal: 315, direction: 'WNW' },
		{ minVal: 316, maxVal: 345, direction: 'NW' },
		{ minVal: 346, maxVal: 360, direction: 'NNW' }
	];
	let windDirection = '';

	for (let i = 0; i < windDirectionArray.length; i += 1) {
		if (windDir >= windDirectionArray[i].minVal && windDir <= windDirectionArray[i].maxVal) {
			windDirection = windDirectionArray[i].direction;
		}
	}
	return windDirection;
}
