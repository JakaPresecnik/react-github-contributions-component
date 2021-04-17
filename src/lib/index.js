import React, { useEffect, useState } from "react";

export default function Loading ({width, height}) {
    let squaresX = [];
    let squaresY = [];
    const [x, setX] = useState(Math.floor(Math.random() * squaresX.length));
    const [y, setY] = useState(Math.floor(Math.random() * squaresY.length));

    for (let i = 0; i < width / 36; i++) {
        squaresX.push(i)
    }
    for (let i = 0; i < height / 36; i++) {
        squaresY.push(i);
    }
    useEffect(() => {
        let timeout = setInterval(() => {
            setX(Math.floor(Math.random() * squaresX.length))
            setY(Math.floor(Math.random() * squaresY.length))
        }, 100);
        return () => clearInterval(timeout);
    }, [])

    return (
        <svg width={width} height={height}>
            {squaresX.map((squareX, i) => {
                return squaresY.map((squareY, j) => (
                    <rect 
                        width="10" 
                        height="10" 
                        fill={x === i && y === j ? '#eee' : '#161b22'}
                        x={640 / 3 + squareX * 12}
                        y={137 / 3 + squareY * 12}
                        rx="2"
                        ry="2"
                        key={`coord${squareX}to${squareY}` }>
                    </rect>
                ))
            })}
        </svg>
    )
}