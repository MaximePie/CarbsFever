import React from 'react';

export default function Component(props) {
    const { line } = props;
    const lineCarbs = line.product.carbsPerPortion * line.portions;

    return (
        <div className="CarbsLine">
            <span className="CarbsLine__detail">{line.product.name}</span>
            <span className="CarbsLine__detail">x{line.portions}</span>
            <span className="CarbsLine__detail">{lineCarbs}Kcal</span>
            <span className="CarbsLine__actions">
                <i className="fas fa-trash" onClick={() => props.onDeleteLine(line.id)}/>
                <i className="fas fa-plus-circle" onClick={() => props.onIncrementLine(line.id)}/>
            </span>
        </div>
    );
}
