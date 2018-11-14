export const mapCurrentChallenge = challenges => {
  const currentChallenge = challenges.find(challenge => challenge.current);
  return currentChallenge ? currentChallenge : challenges[0];
};

export const mapChangeCurrentChallenge = (currentChallenge, challenges) => {
  return challenges.find(challenge => challenge.identifier === currentChallenge);
};
