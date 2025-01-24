import { useState } from "react";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {!submitted ? 
       <>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Feedback Form</h1>
       <form onSubmit={handleSubmit}>
         <div className="mb-4">
           <label
             htmlFor="feedback"
             className="block text-sm font-medium text-gray-700"
           >
             Your Feedback
           </label>
           <textarea
             id="feedback"
             className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
             rows="4"
             value={feedback}
             onChange={(e) => setFeedback(e.target.value)}
             placeholder="Write your feedback here..."
             required
           />
         </div>
         <div className="mb-4">
           <label className="block text-sm font-medium text-gray-700">
             Rating
           </label>
           <div className="flex space-x-3 mt-2">
             {
             [1, 2, 3, 4, 5].map((star) => (
               <button
                 key={star}
                 type="button"
                 className={`h-10 w-10 flex items-center justify-center border rounded-full text-sm font-medium ${
                   rating === star
                     ? "bg-indigo-500 text-white border-indigo-500"
                     : "bg-white text-gray-700 border-gray-300"
                 }`}
                 onClick={() => setRating(star)}
               >
                 {star}
               </button>
             ))}
           </div>
         </div>
         <button
           type="submit"
           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
           disabled={!feedback || !rating || submitted}
         >
           {submitted ? "Submitting..." : "Submit"}
         </button>
       </form>
       {submitted && (
         <p className="mt-4 text-center text-green-600 font-medium">
           Feedback Submitted!
         </p>
       )}
       </>
       :
       <>
           <p>Here is feedback</p>
           <span>Stars</span>
       </>
    }
    </div>
  );
}
