import { useContext } from "react";
import AppContext from "@/context/appContext";

const { Select } = require("@/components/index");

const ComponentPropsToolbar = (props) => {
  const {
    showOneOfProps,
    COMP_PROP_TYPES,
    showEachOfProps,
    showMultiChoiceProps,
    compProps,
  } = props;

  const { componentIndex, sectionIndex, setProp, mergeProps, setKeyVal } =
    useContext(AppContext);

  const setData = (data) => {
    setProp(data);
  };

  return (
    <div className="p-2 mt-2 grid grid-cols-1 md:grid-cols-4 gap-1 bg-gray-50">
      {/* oneOfProps groups radio buttons for each array of object */}
      {showOneOfProps &&
        COMP_PROP_TYPES.oneOfProps &&
        COMP_PROP_TYPES.oneOfProps.length &&
        COMP_PROP_TYPES.oneOfProps.map((choiceGroup, choiceIndex) => (
          <div key={choiceIndex} className="p-1 col-span-2 justify-center flex">
            {choiceGroup.name && (
              <div className="mr-1 text-gray-400">{choiceGroup.name}:</div>
            )}
            <Select
              small
              onChange={(changedValue) => {
                choiceGroup.choices.forEach((c) => {
                  if (c !== "default") {
                    setData({
                      [c]:
                        changedValue === "default" ? false : c === changedValue,
                    });
                  }
                });
              }}
              data={["default", ...choiceGroup.choices].map((value) => ({
                label: value,
                value,
                tickMark:
                  choiceGroup.name &&
                  compProps &&
                  compProps[choiceGroup.name] &&
                  compProps[choiceGroup.name] === value,
              }))}
            />
          </div>
        ))}

      {/* eachOfProps Check BOXES */}
      {showEachOfProps &&
        Object.entries(COMP_PROP_TYPES.eachOfProps).map(([choiceKey]) => (
          <div
            key={choiceKey}
            className="p-1 col-span-2 items-center text-gray-400 flex"
          >
            {/* TextBox type check */}
            <div className="flex items-center">
              <input
                id={`${sectionIndex}_${componentIndex}_${choiceKey}`}
                type="checkbox"
                className="mr-1"
                checked={!!compProps[choiceKey]}
                onChange={(e) => {
                  setData({
                    [choiceKey]: e.target.checked,
                  });
                }}
              />
              <label htmlFor={`${sectionIndex}_${componentIndex}_${choiceKey}`}>
                {choiceKey}
              </label>
            </div>
          </div>
        ))}
      {/* MultiChoice Props Select Boxs */}
      {showMultiChoiceProps &&
        Object.entries(COMP_PROP_TYPES.multiChoiceProps).map(
          ([choiceKey, vals]) => (
            <div
              key={choiceKey}
              className="p-1 col-span-12 md:col-span-2 items-center flex"
            >
              <div className="mr-1 text-gray-400">{choiceKey}:</div>
              <Select
                small
                onChange={(changedValue) =>
                  setData({
                    [choiceKey]: changedValue,
                  })
                }
                data={vals.map((value) => ({
                  label: value,
                  value,
                  tickMark: compProps ? compProps[choiceKey] === value : false,
                }))}
              />
            </div>
          )
        )}
    </div>
  );
};

export default ComponentPropsToolbar;
