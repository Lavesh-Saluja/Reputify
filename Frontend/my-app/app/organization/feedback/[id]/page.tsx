"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import useLoggedIn from "../../../hooks/useLoggedIn";

interface FeedbackItem {
  user: string;
  message: string;
  rating: number;
  isStarred: boolean;
}

interface Organization {
  id: string;
  name: string;
  logo: string;
  description: string;
}

const Feedback: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const { loggedIn, loading } = useLoggedIn();
  const router = useRouter();

  // Sample organization data
  const sampleOrganization: Organization = {
    id: "sample-id",
    name: "Tech Solutions Inc.",
    logo: "https://via.placeholder.com/100", // Placeholder logo URL
    description: "Tech Solutions Inc. is a global leader in innovative technology solutions, empowering businesses worldwide.",
  };

  const [organization, setOrganization] = useState<Organization | null>(sampleOrganization);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [dataFetched, setDataFetched] = useState(false); // Flag to check if real data is fetched

  // Fetch organization details when component mounts
  useEffect(() => {
    if (id) {
      fetch(`/api/organization/${id}`) // Replace with your API endpoint
        .then((res) => res.json())
        .then((data) => {
          setOrganization(data);
          setDataFetched(true); // Mark that real data has been fetched
        })
        .catch((error) => console.error("Error fetching organization details:", error));
    }
  }, [id]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !loggedIn) {
      router.replace("/signup");
    }
  }, [loading, loggedIn, router]);

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    const feedbackData = {
      message: feedbackText,
      rating,
      user: "Current User", // Replace with actual user data
      isStarred: false,
    };

    // Send feedback data to API
    fetch(`/api/organization/${id}/feedback`, { // Replace with actual endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedbackData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Feedback submitted:", response);
        setFeedbackText("");
        setRating(0);
      })
      .catch((error) => console.error("Error submitting feedback:", error));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      {true && (
        <div className="mb-8 text-center">
          <img
            src={sampleOrganization.logo}
            alt={`${sampleOrganization.name} logo`}
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
          <h1 className="text-3xl font-bold mb-1">{sampleOrganization.name}</h1>
          <p className="text-gray-500 italic mb-3">Your trusted partner for excellence</p> {/* Optional subtitle */}
          <p className="text-gray-600">{sampleOrganization.description}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-center">Your Feedback</h2>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          rows={4}
          placeholder="Write your feedback here..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

        <div className="flex items-center justify-center mt-4">
          <p className="mr-3">Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-yellow-500 text-2xl"
            >
              {star <= rating ? <AiFillStar /> : <AiOutlineStar />}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmitFeedback}
          className="w-full mt-6 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default Feedback;
