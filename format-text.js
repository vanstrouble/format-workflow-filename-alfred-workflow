const env = $.NSProcessInfo.processInfo.environment;
const nom = env.objectForKey("nomenclature")?.js;

// The functions now only focus on text transformation.
const formatters = {
	0: (str) => str.replace(/\s+/g, "-"), // kebab-case
	1: (str) => str.replace(/\s+/g, "_"), // snake-case
	2: (str) =>
		str
			.split(/\s+/)
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(""), // PascalCase
};

function run() {
	const text = env.objectForKey("text")?.js;
	const version = env.objectForKey("version")?.js;

	// Find the formatting function in the `formatters` object.
	const selectedFormatter = formatters[nom];

	if (!selectedFormatter) {
		return "Invalid nomenclature option.";
	}

	// 1. Clean the base text once.
	const cleanedText = text.trim().toLowerCase();

	// 2. Apply the selected transformation.
	const formattedText = selectedFormatter(cleanedText);

	// 3. Add the version at the end.
	return `${formattedText}-v${version}`;
}
