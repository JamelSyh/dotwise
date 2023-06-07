import React, { FC } from "react";

export interface TemplateNameProps {
  className?: string;
}

const TemplateName: FC<TemplateNameProps> = ({ className = "" }) => {
  return (
    <div className={`nc-TemplateName ${className}`} data-nc-id="TemplateName">
      THIS IS TemplateName
    </div>
  );
};

export default TemplateName;
