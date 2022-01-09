import { writable } from "svelte/store";

export const darkMode = writable(false);

export function toggleDarkMode() {
    window.document.body.classList.toggle("dark-mode");
    darkMode.update(current => !current);
}