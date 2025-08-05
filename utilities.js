function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 100);

  // Pad with leading zeros for consistent formatting
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  const formattedMilliseconds = String(milliseconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}