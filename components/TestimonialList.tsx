"use client";

import { useEffect, useState } from "react";
import { getTestimonials } from "@/lib/appwrite/actions/testimonial.actions";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Testimonial = {
  $id: string;
  name: string;
  avatar: string;
  message: string;
  stars: number;
};

export const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  // console.log(testimonials);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getTestimonials();
      setTestimonials(
        res?.documents?.map((doc: any) => ({
          $id: doc.$id,
          name: doc.name,
          avatar: doc.avatar,
          message: doc.message,
          stars: doc.stars,
        })) || []
      );
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-4 mt-6">
      {testimonials.map((t) => (
        <Card key={t.$id} className="p-4">
          <CardContent>
            <div className="flex items-center gap-4 mb-2">
              <Image
                src={t.avatar}
                alt={t.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{t.name}</p>
                <div className="text-yellow-400">
                  {Array(t.stars).fill("★").join("")}
                </div>
              </div>
            </div>
            <p>{t.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
