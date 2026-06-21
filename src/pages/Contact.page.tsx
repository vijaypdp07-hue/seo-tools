import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2 } from "lucide-react";
import { ErrorMessage } from "../components/shared/ErrorMessage";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  category: z.enum(["Bug Report", "Feature Request", "General", "Billing"], {
    message: "Please select a valid category.",
  }),
  message: z.string().min(20, "Message must be at least 20 characters long."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      category: "General",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to send message.");
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-text-secondary">
          Have a question, feedback, or a bug report? We'd love to hear from you.
        </p>
      </div>

      <div className="bg-bg-secondary p-8 rounded-xl shadow-sm border border-border">
        {isSuccess ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-light mb-6">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h2>
            <p className="text-text-secondary mb-8">
              We've received your message and typically reply within 1-2 business days.
              A confirmation email has been sent to your address.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`block w-full rounded-md border-0 py-2.5 px-3 text-text-primary shadow-sm ring-1 ring-inset ${
                    errors.name ? "ring-error focus:ring-error" : "ring-border focus:ring-border-focus"
                  } placeholder:text-text-muted bg-bg focus:ring-2 sm:text-sm sm:leading-6`}
                  placeholder="Your name"
                />
                {errors.name && <ErrorMessage message={errors.name.message} className="mt-2" />}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`block w-full rounded-md border-0 py-2.5 px-3 text-text-primary shadow-sm ring-1 ring-inset ${
                    errors.email ? "ring-error focus:ring-error" : "ring-border focus:ring-border-focus"
                  } placeholder:text-text-muted bg-bg focus:ring-2 sm:text-sm sm:leading-6`}
                  placeholder="you@example.com"
                />
                {errors.email && <ErrorMessage message={errors.email.message} className="mt-2" />}
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-1">
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-text-primary shadow-sm ring-1 ring-inset ${
                  errors.category ? "ring-error focus:ring-error" : "ring-border focus:ring-border-focus"
                } bg-bg focus:ring-2 sm:text-sm sm:leading-6`}
              >
                <option value="General">General Inquiry</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing">Billing</option>
              </select>
              {errors.category && <ErrorMessage message={errors.category.message} className="mt-2" />}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-text-primary shadow-sm ring-1 ring-inset ${
                  errors.message ? "ring-error focus:ring-error" : "ring-border focus:ring-border-focus"
                } placeholder:text-text-muted bg-bg focus:ring-2 sm:text-sm sm:leading-6 resize-y`}
                placeholder="How can we help you? (Minimum 20 characters)"
              />
              {errors.message && <ErrorMessage message={errors.message.message} className="mt-2" />}
            </div>

            {serverError && (
              <div className="rounded-md bg-error-light p-4 border border-error/20">
                <div className="flex">
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-error">{serverError}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center items-center rounded-md bg-primary px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 -ml-1 h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
