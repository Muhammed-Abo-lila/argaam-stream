export const getEpisodeLabel = (count, lang) => {
  if (lang === "en") {
    return count <= 1 ? "episode" : "episodes";
  }
  if (count === 1 || count === 0) {
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

  return text.length > length ? `${text.slice(0, length)}...` : text;
};
export const formatViews = (views = 0) => {
  return views < 1000 ? views : `${Math.round(views / 1000)}k`;
};

export const formatDate = (date) => {
  const [year, month, day] = date.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day}.${months[Number(month) - 1]}.${year}`;
};
