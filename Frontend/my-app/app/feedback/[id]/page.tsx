// pages/feedback/[id].tsx
"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useLoggedIn from '../../hooks/useLoggedIn';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

interface FeedbackItem {
  user: string;
  message: string;
  rating: number;
  isStarred: boolean;
}

const Feedback: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const { loggedIn, loading } = useLoggedIn();
  const router = useRouter();

  // Sample feedback data with rating and isStarred properties
  const feedbackData: Record<string, FeedbackItem[]> = {
    '1': [{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },{ user: 'Alice', message: 'Great service!', rating: 5, isStarred: false },],
    '2': [{ user: 'Bob', message: 'Very helpful!', rating: 4, isStarred: false }],
    '3': [{ user: 'Charlie', message: 'Amazing!', rating: 5, isStarred: false }],
    '4': [{ user: 'David', message: 'Excellent work!', rating: 5, isStarred: false }],
  };

  useEffect(() => {
    if (id) {
      const feedback = feedbackData[id as string] || [];
      setFeedbackList(feedback);
    }
  }, [id]);

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.replace('/register');
    }
  }, [loading, loggedIn, router]);

  const handleStarClick = (index: number) => {
    setFeedbackList(prevList =>
      prevList.map((feedback, i) =>
        i === index ? { ...feedback, isStarred: !feedback.isStarred } : feedback
      )
    );
  };

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ display: 'flex', maxWidth: '900px', margin: 'auto', padding: '20px', gap: '20px' }}>
      {/* Feedback List */}
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '80vh', paddingRight: '10px' }}>
        <h1>Feedback for Organization ID: {id}</h1>
        {feedbackList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {feedbackList.map((feedback, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  alignItems: 'center',
                }}
              >
                <div>
                  <strong>{feedback.user}</strong>
                  <p>{feedback.message}</p>
                  <p>Rating: {feedback.rating} ⭐</p>
                </div>
                <div onClick={() => handleStarClick(index)} style={{ cursor: 'pointer' }}>
                  {feedback.isStarred ? <AiFillStar color="gold" /> : <AiOutlineStar />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No feedback available.</p>
        )}
      </div>

      {/* Link Sharing Box */}
      <div style={{
        width: '250px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: '20px',
        alignSelf: 'flex-start',
        backgroundColor: '#fafafa',
      }}>
        <h3>Share this link</h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#f0f0f0',
          padding: '8px',
          borderRadius: '5px',
          marginBottom: '10px',
          fontSize: '0.9em',
        }}>
          <span style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '180px',
          }}>
            {window.location.href}
          </span>
          <button onClick={handleCopyLink} style={{
            padding: '6px 10px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
