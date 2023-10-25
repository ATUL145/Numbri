export const getCategoryIcon = (category) => {
  const categoryIcons = {
    Food: "🍔",
    Entertainment: "🎬",
    EMI: "💳",
    Sports: "⚽",
    Accommodation: "🏨",
    Health: "🏥",
    Other: "❓",
    Travel: "✈️",
    Education: "🎓",
    Shopping: "🛍️",
    Utilities: "💡",
  };

  return categoryIcons[category] || "❓";
};
