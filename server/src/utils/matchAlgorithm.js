const calculateMatchPercentage = (user1, user2) => {
  let score = 0;
  let totalWeight = 0;

  if (user1.interests && user2.interests) {
    const commonInterests = user1.interests.filter((interest) =>
      user2.interests.includes(interest)
    );
    const interestWeight = 40;
    const interestScore =
      (commonInterests.length / Math.max(user1.interests.length, user2.interests.length)) *
      interestWeight;
    score += interestScore;
    totalWeight += interestWeight;
  }

  if (user1.location && user2.location) {
    const locationWeight = 30;
    if (user1.location.toLowerCase() === user2.location.toLowerCase()) {
      score += locationWeight;
    }
    totalWeight += locationWeight;
  }

  const ageWeight = 20;
  const ageDifference = Math.abs(user1.age - user2.age);
  const ageScore = Math.max(0, (10 - ageDifference) / 10) * ageWeight;
  score += ageScore;
  totalWeight += ageWeight;

  const activityWeight = 10;
  const hoursSinceLastSeen = (Date.now() - new Date(user2.lastSeen)) / (1000 * 60 * 60);
  const activityScore = hoursSinceLastSeen < 24 ? activityWeight : activityWeight / 2;
  score += activityScore;
  totalWeight += activityWeight;

  const matchPercentage = Math.round((score / totalWeight) * 100);
  return matchPercentage;
};

module.exports = { calculateMatchPercentage };
