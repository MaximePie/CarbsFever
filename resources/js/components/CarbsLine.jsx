import React from 'react';

export default function Component(props) {
    const { line } = props;
    const lineCarbs = line.product.carbsPerPortion * line.portions;

    return (
        <div className="CarbsLine">
            <span className="CarbsLine__detail">{line.product.name}</span>
            <span className="CarbsLine__detail">x{line.portions}</span>
            <span className="CarbsLine__detail">{lineCarbs}Kcal</span>
        </div>
    );
}
