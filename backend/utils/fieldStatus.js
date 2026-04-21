export const getFieldStatus = (field) => {
  const today = new Date();
  const plantedDate = new Date(field.plantingDate);

  const daySincePlanting = (today - plantedDate) / (1000 * 60 * 60 * 24);

  if (field.currentStage === "harvested") {
    return "completed";
  }

  if (daySincePlanting > 30 && field.currentStage === "ready") {
    return "at_risk";
  }

  return "active";
};
