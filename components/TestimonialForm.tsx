"use client";

import { SetStateAction, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createTestimonial } from "@/lib/appwrite/actions/testimonial.actions";

export const TestimonialForm = ({ currentUser }: { currentUser: any }) => {
  const [message, setMessage] = useState("");
  const [stars, setStars] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message || stars < 1) return;

    setSubmitting(true);
    await createTestimonial({
      userId: currentUser.$id,
      name: currentUser.fullName,
      avatar: currentUser.avatar,
      message,
      stars,
    });
    setMessage("");
    setStars(0);
    setSubmitting(false);
  };

  return (
    <Card className="p-6">
      <Textarea
        placeholder="How's the app?"
        value={message}
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setMessage(e.target.value)
        }
      />
      <div className="flex items-center gap-2 my-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setStars(star)}
            className={star <= stars ? "text-yellow-500" : "text-gray-400"}
          >
            ★
          </button>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Testimonial"}
      </Button>
    </Card>
  );
};
