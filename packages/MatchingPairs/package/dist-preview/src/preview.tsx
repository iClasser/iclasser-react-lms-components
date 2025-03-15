import { useEffect, useMemo, useRef, useState } from "react";
// Make sure to change README-PREVIEW.md if you change the preview.

interface MatchPairsItem {
  text: string;
  image?: string;
}
interface MatchPairsPair {
  id: string;
  left: MatchPairsItem;
  right: MatchPairsItem;
}

export interface MatchPairsStructureProps {
  textData?: any;
  textId?: string;
  props: {
    pairs: MatchPairsPair[];
    shuffleLeft?: boolean;
    shuffleRight?: boolean;
  };
}

export type ComponentStructureProps =  MatchPairsStructureProps;

export interface MatchingPairsPreviewProps {
  componentIndex: number;
  textData?: any;
  structureComponent: MatchPairsStructureProps;
  codingContents?: any;
}

interface Item extends MatchPairsItem {
  id: string;
}

// Base design width used for scaling.
const BASE_WIDTH = 800;
// Layout base constants.
const BOX_LEFT_X = 50;
const BOX_RIGHT_X = 400; // Reduced gap between columns.
const BOX_WIDTH = 300;
const BOX_TOP_MARGIN = 50;
const BOX_VERTICAL_GAP = 20;
const BOX_RADIUS = 10;

const Preview = (props: MatchingPairsPreviewProps) => {
  const { textData, structureComponent } = props;
  const { textId, props: compProps } = structureComponent;
  return (
    <div className="p-4">
      {textId && (
        <h2 className="mb-4 text-xl font-stretch-95% font-semibold text-gray-600">
          {textData.getText(textId)}
        </h2>
      )}
      <MatchPairsCanvas props={compProps} textData={textData} />
    </div>
  );
};

interface Box {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  image?: string;
  column: "left" | "right";
  lines: string[];
}

const MatchPairsCanvas: React.FC<MatchPairsStructureProps> = ({
  props: compProps,
  textData,
}) => {
  const { pairs, shuffleLeft = false, shuffleRight = false } = compProps;

  // Build left/right items.
  const leftItems: Item[] = useMemo(() => {
    const items = pairs.map((pair) => ({ id: pair.id, ...pair.left }));
    return shuffleLeft ? shuffle(items) : items;
  }, [pairs, shuffleLeft]);

  const rightItems: Item[] = useMemo(() => {
    const items = pairs.map((pair) => ({ id: pair.id, ...pair.right }));
    return shuffleRight ? shuffle(items) : items;
  }, [pairs, shuffleRight]);

  // States for selection, matching, and hover.
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    column: "left" | "right";
  } | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [hovered, setHovered] = useState<{
    id: string;
    column: "left" | "right";
  } | null>(null);
  // Save computed box positions for hit detection.
  const [itemsPositions, setItemsPositions] = useState<{
    left: Box[];
    right: Box[];
  }>({ left: [], right: [] });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper: Wrap text into an array of lines based on available width.
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i] + " ";
      if (ctx.measureText(testLine).width > maxWidth && currentLine !== "") {
        lines.push(currentLine.trim());
        currentLine = words[i] + " ";
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    return lines;
  };

  // Helper: Draw a rounded rectangle.
  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor: string,
    strokeColor?: string,
    lineWidth?: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    if (strokeColor && lineWidth) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  // Helper: Draw a justified text line by distributing extra space between words.
  const drawJustifiedTextLine = (
    ctx: CanvasRenderingContext2D,
    line: string,
    x: number,
    y: number,
    availableWidth: number
  ) => {
    // Ensure fillStyle is set.
    ctx.fillStyle = "black";
    const words = line.split(" ");
    if (words.length === 1) {
      ctx.fillText(line, x, y);
      return;
    }
    const totalWordsWidth = words.reduce(
      (acc, word) => acc + ctx.measureText(word).width,
      0
    );
    const gapCount = words.length - 1;
    const extraSpace = availableWidth - totalWordsWidth;
    const spaceWidth = extraSpace / gapCount;
    let currentX = x;
    words.forEach((word, index) => {
      ctx.fillText(word, currentX, y);
      currentX += ctx.measureText(word).width;
      if (index !== words.length - 1) {
        currentX += spaceWidth;
      }
    });
  };

  const drawLeftAlignedTextLine = (
    ctx: CanvasRenderingContext2D,
    line: string,
    x: number,
    y: number
  ) => {
    ctx.fillStyle = "black";
    ctx.fillText(line, x, y);
  };
  const drawLeftAlignedTextLines = (
    ctx: CanvasRenderingContext2D,
    lines: string[],
    x: number,
    startY: number,
    textSize: number,
    lineHeight: number
  ) => {
    ctx.fillStyle = "black";
    ctx.font = `${textSize}px sans-serif`;
    lines.forEach((line, index) => {
      ctx.fillText(line, x, startY + index * lineHeight);
    });
  };

  // Main draw function.
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas width based on container width.
    const containerWidth = containerRef.current?.clientWidth || BASE_WIDTH;
    canvas.width = containerWidth;
    const scale = containerWidth / BASE_WIDTH;

    // Define paddings, font size, etc.
    const padding = 20 * scale;
    const fontSize = 24 * scale;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textBaseline = "top";
    const lineHeight = fontSize * 1.2;
    const imageWidth = 40 * scale;
    const imageHeight = 40 * scale;

    // Compute left boxes with dynamic heights.
    const leftBoxes: Box[] = [];
    let currentYLeft = BOX_TOP_MARGIN * scale;
    for (const item of leftItems) {
      const hasImage = !!item.image;
      const availableWidth = hasImage
        ? BOX_WIDTH * scale - (imageWidth + 3 * padding)
        : BOX_WIDTH * scale - 2 * padding;
      const lines = wrapText(ctx, textData.getText(item.text), availableWidth);
      const textHeight = lines.length * lineHeight;
      let boxHeight = 4 * padding + textHeight;
      if (hasImage) {
        boxHeight = Math.max(boxHeight, imageHeight + 2 * padding);
      }
      leftBoxes.push({
        id: item.id,
        x: BOX_LEFT_X * scale,
        y: currentYLeft + 10,
        width: BOX_WIDTH * scale,
        height: boxHeight + 20,
        text: textData.getText(item.text),
        image: item.image,
        column: "left",
        lines,
      });
      currentYLeft += boxHeight + BOX_VERTICAL_GAP * scale + 20;
    }

    // Compute right boxes with dynamic heights.
    const rightBoxes: Box[] = [];
    let currentYRight = BOX_TOP_MARGIN * scale;
    for (const item of rightItems) {
      const hasImage = !!item.image;
      const availableWidth = hasImage
        ? BOX_WIDTH * scale - (imageWidth + 3 * padding)
        : BOX_WIDTH * scale - 2 * padding;
      const lines = wrapText(ctx, textData.getText(item.text), availableWidth);
      const textHeight = lines.length * lineHeight;
      let boxHeight = 2 * padding + textHeight;
      if (hasImage) {
        boxHeight = Math.max(boxHeight, imageHeight + 2 * padding);
      }
      rightBoxes.push({
        id: item.id,
        x: BOX_RIGHT_X * scale,
        y: currentYRight + 10,
        width: BOX_WIDTH * scale,
        height: boxHeight + 20,
        text: textData.getText(item.text),
        image: item.image,
        column: "right",
        lines,
      });
      currentYRight += boxHeight + BOX_VERTICAL_GAP * scale + 20;
    }

    // Set canvas height to fit all content.
    const canvasHeight = Math.max(currentYLeft, currentYRight) + padding;
    canvas.height = canvasHeight;

    // Update positions state (used for event detection).
    setItemsPositions({ left: leftBoxes, right: rightBoxes });

    // Clear canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw each box.
    const drawBox = (box: Box) => {
      const isMatched = matchedPairs.includes(box.id);
      const isSelected =
        selectedItem?.id === box.id && selectedItem.column === box.column;
      const isHovered =
        hovered &&
        hovered.id === box.id &&
        hovered.column === box.column &&
        !isSelected &&
        !isMatched;
      const fillColor = isMatched ? "#A3E635" : "#BFDBFE";
      const strokeColor = isSelected
        ? "orange"
        : isHovered
        ? "rgba(0,0,0,0.5)"
        : undefined;
      const strokeWidth = isSelected ? 3 : isHovered ? 2 : 0;

      // Draw the rounded rectangle.
      drawRoundedRect(
        ctx,
        box.x,
        box.y,
        box.width,
        box.height,
        BOX_RADIUS * scale,
        fillColor,
        strokeColor,
        strokeWidth
      );

      // Determine text starting point.
      let textX = box.x + padding;
      const availableWidth = box.image
        ? box.width - (imageWidth + 3 * padding)
        : box.width - 2 * padding;
      const textBlockHeight = box.lines.length * lineHeight;
      // Vertically center the text block.
      const textOffsetY = box.y + (box.height - textBlockHeight) / 2;

      // If an image exists, attempt to draw it.
      if (box.image) {
        const img = new Image();
        img.src = box.image;
        // If image is already loaded, draw it immediately.
        if (img.complete) {
          ctx.drawImage(
            img,
            box.x + padding,
            box.y + padding,
            imageWidth,
            imageHeight
          );
        } else {
          // Once loaded, redraw the canvas.
          img.onload = () => drawCanvas();
        }
        textX = box.x + padding + imageWidth + padding;
      }
      // Always set text fill color.
      ctx.fillStyle = "black";
      // Draw each line of text. Justify all lines except the last.
      box.lines.forEach((line, index) => {
        // const lineY = textOffsetY + index * lineHeight;
        // if (index < box.lines.length - 1 && line.split(" ").length > 1) {
        //   drawJustifiedTextLine(ctx, line, textX, lineY, availableWidth);
        // } else {
        //   ctx.fillText(line, textX, lineY);
        // }
        // const lineY = textOffsetY + index * lineHeight;
        // drawLeftAlignedTextLine(ctx, line, textX, lineY);
        const lineY = textOffsetY + index * lineHeight;
        drawLeftAlignedTextLines(
          ctx,
          [line],
          textX,
          lineY,
          fontSize,
          lineHeight
        );
      });
    };

    leftBoxes.forEach(drawBox);
    rightBoxes.forEach(drawBox);

    // Draw connecting lines for matched pairs.
    matchedPairs.forEach((id) => {
      const leftBox = leftBoxes.find((box) => box.id === id);
      const rightBox = rightBoxes.find((box) => box.id === id);
      if (leftBox && rightBox) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(leftBox.x + leftBox.width, leftBox.y + leftBox.height / 2);
        ctx.lineTo(rightBox.x, rightBox.y + rightBox.height / 2);
        ctx.stroke();
      }
    });
  };

  // Redraw on window resize and state changes.
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      drawCanvas();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [leftItems, rightItems, selectedItem, matchedPairs, hovered]);

  useEffect(() => {
    drawCanvas();
  }, [leftItems, rightItems, selectedItem, matchedPairs, hovered]);

  // Handle canvas click events.
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const isInside = (box: Box) =>
      clickX >= box.x &&
      clickX <= box.x + box.width &&
      clickY >= box.y &&
      clickY <= box.y + box.height;
    let clicked: { id: string; column: "left" | "right" } | null = null;
    for (const box of itemsPositions.left) {
      if (isInside(box)) {
        clicked = { id: box.id, column: "left" };
        break;
      }
    }
    if (!clicked) {
      for (const box of itemsPositions.right) {
        if (isInside(box)) {
          clicked = { id: box.id, column: "right" };
          break;
        }
      }
    }
    if (!clicked) return;
    if (matchedPairs.includes(clicked.id)) return;
    if (!selectedItem) {
      setSelectedItem(clicked);
    } else {
      if (selectedItem.column === clicked.column) {
        setSelectedItem(clicked);
      } else {
        if (selectedItem.id === clicked.id) {
          setMatchedPairs((prev) => [...prev, clicked.id]);
        }
        setSelectedItem(null);
      }
    }
  };

  // Handle hover events.
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const isInside = (box: Box) =>
      mouseX >= box.x &&
      mouseX <= box.x + box.width &&
      mouseY >= box.y &&
      mouseY <= box.y + box.height;
    let hoveredCandidate: { id: string; column: "left" | "right" } | null =
      null;
    for (const box of itemsPositions.left) {
      if (isInside(box)) {
        hoveredCandidate = { id: box.id, column: "left" };
        break;
      }
    }
    if (!hoveredCandidate) {
      for (const box of itemsPositions.right) {
        if (isInside(box)) {
          hoveredCandidate = { id: box.id, column: "right" };
          break;
        }
      }
    }
    setHovered(hoveredCandidate);
  };

  const handleMouseOut = () => setHovered(null);

  const reset = () => {
    setSelectedItem(null);
    setMatchedPairs([]);
  };

  return (
    <div ref={containerRef} style={{ width: "100%" }}>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid black", width: "100%", display: "block" }}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
      <button
        onClick={reset}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          backgroundColor: "#3B82F6",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Reset
      </button>
    </div>
  );
};

// Simple Fisher–Yates shuffle.
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default Preview;
