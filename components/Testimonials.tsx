"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

interface Review {
  id: string;
  name: string;
  rating: number;
  reviewText: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(
          collection(db, "reviews"),
          where("status", "==", "approved")
        );
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        setReviews(fetched);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      rating: rating,
      reviewText: formData.get("reviewText"),
    };

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setFormSuccess(true);
        setTimeout(() => {
          setShowForm(false);
          setFormSuccess(false);
        }, 3000);
      }
    } catch (err) {
      alert("Error submitting review");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section id="reviews" className="py-24 px-10 bg-[#0a0a0a] border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Reviews</h2>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Trusted by real people. See what our clients have to say about our work.
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 border border-white/10 bg-white/5 hover:bg-white/10 font-black text-[10px] uppercase tracking-widest transition-colors"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        </div>

        {showForm && (
          <div className="mb-16 bg-[#050505] border border-white/10 p-8 max-w-2xl mx-auto animate-in fade-in zoom-in-95">
            {formSuccess ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-black uppercase tracking-tight text-green-500 mb-2">Review Submitted!</h3>
                <p className="text-gray-400 text-sm font-medium tracking-wide">Thank you! Your review is pending approval.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Share your experience</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-white hover:scale-110 transition-transform"
                    >
                      <Star className={`w-4 h-4 ${star <= rating ? "fill-blue-600 text-blue-600" : "opacity-30"}`} />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Name</label>
                    <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Email (Private)</label>
                    <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Review</label>
                  <textarea required name="reviewText" rows={3} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 outline-none transition-colors resize-none" placeholder="We loved working with Anand Web Studio..."></textarea>
                </div>

                <button disabled={formLoading} type="submit" className="w-full bg-white text-black py-4 text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors mt-2 disabled:opacity-50">
                  {formLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-12 text-[10px] font-bold tracking-widest uppercase text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center p-12 bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest text-gray-400">
            No reviews yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-[#050505] border border-white/10 p-8">
                <div className="flex text-blue-600 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-blue-600" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm font-medium">"{review.reviewText}"</p>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">— {review.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
