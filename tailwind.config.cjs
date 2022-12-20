/** @type {import('tailwindcss').Config} */
module.exports = {
    important: true,
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            textColor: {
                'primary': '#096bec'
            },
            backgroundColor: {
                'primary': '#096bec'
            }
        }
    },
    plugins: []
}
