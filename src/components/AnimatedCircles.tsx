const AnimatedCircles = () => {
  const circles = [
    { size: 60, top: "10%", left: "5%", delay: 0 },
    { size: 100, top: "20%", right: "10%", delay: 1 },
    { size: 40, top: "50%", left: "10%", delay: 2 },
    { size: 80, bottom: "20%", left: "15%", delay: 0.5 },
    { size: 50, bottom: "30%", right: "20%", delay: 1.5 },
    { size: 120, top: "60%", right: "5%", delay: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {circles.map((circle, index) => (
        <div
          key={index}
          className="absolute rounded-full border border-primary/20 animate-pulse-slow"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            top: circle.top,
            bottom: circle.bottom,
            left: circle.left,
            right: circle.right,
            animationDelay: `${circle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedCircles;
