"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown,
  User,
  Calendar,
  Edit,
  Trash2,
  Plus,
  X
} from "lucide-react";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
  isVerified: boolean;
  propertyId?: string;
  propertyTitle?: string;
}

interface AgentReviewsProps {
  agentId: string;
  agentName: string;
  currentRating: number;
  totalReviews: number;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "review1",
    userId: "user1",
    userName: "Ahmad Zulkarnain",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    title: "Excellent service and very professional",
    comment: "Sarah helped me find my dream home in just 2 weeks! She was very knowledgeable about the area and understood exactly what I was looking for. Her attention to detail and professional approach made the entire process smooth and stress-free. Highly recommended!",
    date: "2024-01-15",
    helpful: 12,
    notHelpful: 0,
    isVerified: true,
    propertyId: "1",
    propertyTitle: "Luxury Condo in Taman Melawati"
  },
  {
    id: "review2",
    userId: "user2",
    userName: "Priya Singh",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    title: "Found the perfect investment property",
    comment: "As an investor, I needed someone who understood the market and could identify properties with good potential. Sarah exceeded my expectations. She found me a property that has already appreciated 15% in value. Her market knowledge is impressive.",
    date: "2024-01-10",
    helpful: 8,
    notHelpful: 1,
    isVerified: true
  },
  {
    id: "review3",
    userId: "user3",
    userName: "David Wong",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    title: "Good experience overall",
    comment: "Sarah was responsive and professional throughout the process. She showed me several properties that matched my criteria. The only minor issue was that one property had some undisclosed maintenance issues, but she helped resolve it quickly.",
    date: "2024-01-05",
    helpful: 5,
    notHelpful: 2,
    isVerified: true,
    propertyId: "2",
    propertyTitle: "Modern Terrace House in Wangsa Maju"
  },
  {
    id: "review4",
    userId: "user4",
    userName: "Siti Aminah",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    title: "Highly recommended for first-time buyers",
    comment: "As a first-time buyer, I was nervous about the process, but Sarah made everything so easy to understand. She explained every step, answered all my questions, and never made me feel rushed. I couldn't have asked for a better agent!",
    date: "2024-01-01",
    helpful: 15,
    notHelpful: 0,
    isVerified: true
  }
];

export function AgentReviews({ agentId, agentName, currentRating, totalReviews }: AgentReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: ""
  });
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "helpful">("recent");

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  // Sort reviews based on selected criteria
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "rating":
        return b.rating - a.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  const handleAddReview = () => {
    if (!newReview.title.trim() || !newReview.comment.trim()) return;

    const review: Review = {
      id: `review${Date.now()}`,
      userId: "currentUser",
      userName: "Current User",
      userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: newReview.rating,
      title: newReview.title.trim(),
      comment: newReview.comment.trim(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      notHelpful: 0,
      isVerified: false
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: "", comment: "" });
    setShowAddReview(false);
  };

  const handleHelpful = (reviewId: string, isHelpful: boolean) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful: isHelpful ? review.helpful + 1 : review.helpful,
            notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful
          }
        : review
    ));
  };

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    };

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? "text-yellow-500 fill-current" 
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Reviews for {agentName}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(averageRating, "lg")}
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ({totalReviews} reviews)
              </span>
            </div>
          </div>
        </div>
        
        <Button onClick={() => setShowAddReview(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </div>

      {/* Rating Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 min-w-[60px]">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{rating}</span>
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[40px] text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Review Form */}
      {showAddReview && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Write a Review</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddReview(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReview.rating 
                          ? "text-yellow-500 fill-current" 
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Summarize your experience"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detailed Review
              </label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this agent..."
                rows={4}
                className="w-full"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddReview} className="flex-1">
                Submit Review
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddReview(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {/* Sort and Filter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            <Select value={sortBy} onValueChange={(value: "recent" | "rating" | "helpful") => setSortBy(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {sortedReviews.length} reviews
          </span>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {review.userName}
                          </h4>
                          {review.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          {renderStars(review.rating, "sm")}
                          <span>{review.rating}/5</span>
                          <span>•</span>
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                      {review.title}
                    </h5>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {review.comment}
                    </p>

                    {/* Property Reference */}
                    {review.propertyId && review.propertyTitle && (
                      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          Review for property:
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {review.propertyTitle}
                        </p>
                      </div>
                    )}

                    {/* Helpful Actions */}
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpful(review.id, true)}
                          className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-green-600"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpful(review.id, false)}
                          className="h-8 px-2 text-gray-600 dark:text-gray-400 hover:text-red-600"
                        >
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Not Helpful ({review.notHelpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Reviews */}
        {sortedReviews.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Be the first to share your experience with {agentName}
              </p>
              <Button onClick={() => setShowAddReview(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Write the First Review
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 