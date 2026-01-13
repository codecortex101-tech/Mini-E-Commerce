import { motion } from "framer-motion";

type RatingDistributionProps = {
  ratings: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalReviews: number;
  averageRating: number;
};

const RatingDistribution = ({
  ratings,
  totalReviews,
  averageRating,
}: RatingDistributionProps) => {
  const getPercentage = (count: number) => {
    if (totalReviews === 0) return 0;
    return (count / totalReviews) * 100;
  };

  const stars = [5, 4, 3, 2, 1] as const;

  return (
    <div className="space-y-4">
      {/* Average Rating */}
      <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
        <div className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          {averageRating.toFixed(1)}
        </div>
        <div className="flex justify-center gap-1 mb-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </div>
      </div>

      {/* Distribution Bars */}
      <div className="space-y-3">
        {stars.map((star) => {
          const count = ratings[star];
          const percentage = getPercentage(count);
          return (
            <div key={star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {star}
                </span>
                <span className="text-yellow-400">★</span>
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: star * 0.05 }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600 rounded-full"
                />
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 w-12 text-right">
                {count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RatingDistribution;
