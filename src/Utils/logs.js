import { difference } from "lodash";
export const getDetailsEditedLogs = async (oldData, newData, name = "") => {
  let messages = [];
  await Object.keys(oldData).forEach((key) => {
    if (key === "name" || key === "description" || key === "tags")
      if (oldData[key] !== newData[key]) {
        if (key === "tags") {
          const tagDifference = difference(oldData["tags"], newData["tags"]);
          (tagDifference.length > 0 ||
            oldData["tags"]?.length !== newData["tags"]?.length) &&
            messages.push(
              `${key} from "${oldData[key]}" to "${newData[key].join(", ")}"`
            );
        } else
          messages.push(`${key} from "${oldData[key]}" to "${newData[key]}"`);
      }
  });
  return ["updated the " + name + " " + messages.join(", ")];
};

export const getStepEditedLogs = async (oldData, newData, name = "") => {
  let messages = [];

  if (oldData["actionEvent"] !== newData["actionEvent"]) {
    messages.push(
      `actionEvent from "${oldData["actionEvent"]}" to "${newData["actionEvent"]}"`
    );
  } else
    await Object.keys(newData).forEach(async (key) => {
      if (
        key === "parameters" &&
        oldData["actionEvent"] === newData["actionEvent"]
      ) {
        newData["parameters"].forEach(async (newPar) => {
          await Object.keys(newPar).forEach((newKey) => {
            oldData["testParameters"].forEach(async (oldPar) => {
              if (newPar[newKey] !== oldPar[newKey]) {
                messages.push(
                  `parameter ${newPar["type"]} ${newKey} from "${oldPar[newKey]}" to "${newPar[newKey]}"`
                );
              }
            });
          });
        });
      } else if (key !== "parameters") {
        if (oldData[key] !== newData[key]) {
          messages.push(`${key} from "${oldData[key]}" to "${newData[key]}"`);
        }
      }
    });
  return ["updated the " + name + " " + messages.join(", ")];
};
