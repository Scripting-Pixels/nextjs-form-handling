import FeedbackForm from "@/components/feedback-form";

export default function Home() {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-yellow-400">
      <div className="max-w-lg w-full p-6 shadow-md rounded-xl bg-white">
        <h1 className="text-2xl font-bold mb-4">Feedback</h1>
        <FeedbackForm />
      </div>
    </section>
  );
}
