import * as React from 'react';

export interface ILPInputDivProps {
  dataAttr?: string,
  hContent?: string,
}

export default function LPInputDiv(props: ILPInputDivProps) {
  const { hContent } = props;
  return (
    <div>
      <h5>
        {hContent}
      </h5>
      <div>
        <input type={'text'}></input>
      </div>

    </div>
  );
}