const CircleProgress = ({ percentage, cx, cy, r, strokeWidth }) => {
  const dashArray = 24 * Math.PI * 2;

  const getProgressColor = () => {
    if (percentage >= 80) {
      return { progress: "#008000", background: "#00800033" };
    }

    if (percentage >= 60 && percentage < 80) {
      return { progress: "#ffff00", background: "#ffff0033" };
    }

    if (percentage >= 0 && percentage < 60) {
      return { progress: "#ff0000", background: "#ff000033" };
    }
  };

  return (
    <svg className="rate-progress">
      <circle
        className="background-circle"
        cx={cx}
        cy={cy}
        strokeWidth={strokeWidth}
        r={r}
        style={{ stroke: getProgressColor().background }}
      />
      <circle
        className="progress-circle"
        cx={cx}
        cy={cy}
        strokeWidth={strokeWidth}
        r={r}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashArray - (dashArray * percentage) / 100,
          stroke: getProgressColor().progress,
        }}
      />
    </svg>
  );
};

export default CircleProgress;
