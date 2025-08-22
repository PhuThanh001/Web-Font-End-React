
import React from "react";
import { Steps } from "antd";

const StepComponent = ({ current = 0, items = [] }) => {
  return (
    <Steps
      current={current}
      items={items.map((item) => ({
        key: item.title,
        title: item.title,
        description: item.description,
      }))}
    />
  );
};

export default StepComponent;
  