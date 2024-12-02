import { Container } from "@mui/material";
import { FaYoutube, FaLinkedin } from "react-icons/fa";

export const ContactPage = () => {
  return (
    <Container className="flex w-full flex-col items-center justify-center gap-4 text-white">
      <section className="py-12 text-center">
        <h3 className="mb-6 text-3xl font-bold text-yellow-800">Contact Us</h3>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.youtube.com/@RRK-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700"
          >
            <FaYoutube className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/company/rrk-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-yellow-600 px-6 py-3 text-white hover:bg-yellow-700"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </section>
    </Container>
  );
};

export default ContactPage;
