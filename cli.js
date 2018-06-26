#!/usr/bin/env node

const
	fs   = require("fs"),
	path = require("path"),
	exec = require('child_process').execSync,

	cwd = process.cwd(),
	pkg  = require(path.resolve(cwd, "package.json"));

pkg.scripts = Object.assign({}, pkg.scripts, {
	"lint": "run-p lint:**",
	"lint:js": "eslint **/*.{js,jsx} --fix",
	"lint:css": "stylelint **/*.{css,pcss} --fix",
	"lint:html": "htmlhint **/*.{htm,html}",
	"precommit": "lint-staged"
})

pkg["lint-staged"] = {
	"*.{js,jsx}": ["eslint --fix"],
	"*.{css,pcss}": ["stylelint --fix"],
	"*.{htm,html}": ["htmlhint"],
}

fs.writeFileSync("package.json", JSON.stringify(pkg), { cwd })
fs.copyFileSync(path.resolve(__dirname, ".eslintrc.json"), path.resolve(cwd, ".eslintrc.json"))

console.log(`Installing and configuring eslint, stylelint, htmllint and lint-staged. Please wait...`)
exec(`npm i eslint stylelint htmlhint husky lint-staged npm-run-all --save-dev`, { cwd });
console.log(`Done!`);