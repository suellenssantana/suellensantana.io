// Footer.jsx
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center py-4">
      <a
        href="https://github.com/suellenssantana"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-gray-400 hover:text-black transition"
      >
        <FaGithub size={32} />
      </a>
    </footer>
  );
}
