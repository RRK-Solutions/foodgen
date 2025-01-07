import { Container, TextField, Button } from "@mui/material";
import { FaYoutube, FaLinkedin } from "react-icons/fa";

export const ContactPage = () => {
  return (
    <Container
      maxWidth="md"
      className="flex w-full flex-col items-center justify-center gap-8 py-12 text-white"
    >
      {/* Contact Info Section */}
      <section className="w-full rounded-lg bg-yellow-100 px-6 py-8 text-center text-yellow-800 shadow">
        <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
        <p className="mx-auto mb-4 max-w-xl text-base">
          We’d love to hear from you! Whether you have a question about our
          services, pricing, or anything else, our team is ready to answer all
          your questions.
        </p>
        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold">Address</h3>
            <p>1234 RRK Ave., Suite 100</p>
            <p>Bratislava, Slovakia 80100</p>
          </div>
          <div className="mt-4 border-l-2 border-yellow-600 px-4 md:mt-0">
            <h3 className="text-lg font-semibold">Phone</h3>
            <p>+421 987 654 321</p>
          </div>
          <div className="mt-4 border-l-2 border-yellow-600 px-4 md:mt-0">
            <h3 className="text-lg font-semibold">Email</h3>
            <p>info@rrk-solutions.com</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="w-full rounded-lg bg-white px-6 py-8 text-center shadow">
        <h3 className="mb-6 text-2xl font-bold text-yellow-800">
          Send Us a Message
        </h3>
        <form className="mx-auto flex max-w-md flex-col gap-4">
          <TextField
            label="Your Name"
            variant="outlined"
            className="bg-white"
            required
          />
          <TextField
            label="Your Email"
            variant="outlined"
            type="email"
            className="bg-white"
            required
          />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            className="bg-white"
            required
          />
          <Button type="submit" variant="contained" color="warning">
            Submit
          </Button>
        </form>
      </section>

      {/* Social Section */}
      <section className="w-full text-center">
        <h3 className="mb-4 text-2xl font-bold text-yellow-800">Follow Us</h3>
        <p className="mb-6 text-base text-yellow-100">
          Stay connected on our social channels for updates and more!
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.youtube.com/@RRK-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
          >
            <FaYoutube className="h-6 w-6" />
            <span className="hidden sm:inline">YouTube</span>
          </a>
          <a
            href="https://www.linkedin.com/company/rrk-solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-white hover:bg-blue-800"
          >
            <FaLinkedin className="h-6 w-6" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
        </div>
      </section>
    </Container>
  );
};

export default ContactPage;
