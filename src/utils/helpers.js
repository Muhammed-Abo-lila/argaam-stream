export const getEpisodeLabel = (count, lang) => {
  if (lang === "en") {
    return count<= 1 ? "episode" : "episodes";
  }
  if (count === 1||count===0) {
    return "حلقة";
  }
  if (count === 2) {
    return "حلقتان";
  }
  if (count >= 3 && count <= 10) {
    return "حلقات";
  }
  return "حلقة";
};

export const sliceText = (text, length) => {
  if (!text) return "";

  return text.length > length
    ? `${text.slice(0, length)}...`
    : text;
};