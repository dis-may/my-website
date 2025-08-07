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

function containsAny(arr1, arr2) {
  // The some() method checks if at least one element in arr1
  // satisfies the condition provided by the callback function.
  return arr1.some(item => {
    // The includes() method checks if the current 'item' from arr1
    // is present in arr2.
    return arr2.includes(item);
  });
}