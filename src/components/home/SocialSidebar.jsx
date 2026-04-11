import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

const SocialSidebar = ({ isHomePage }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Static social media links
  const socialData = [
    {
      icon: Facebook,
      url: "https://facebook.com/acharyajionline",
      color: "#1877F2",
      label: "Facebook",
    },
    {
      icon: Instagram,
      url: "https://instagram.com/acharyajionline",
      color: "#E4405F",
      label: "Instagram",
    },
    {
      icon: Twitter,
      url: "https://twitter.com/acharyajionline",
      color: "#000000",
      label: "Twitter",
    },
    {
      icon: Youtube,
      url: "https://youtube.com/@acharyajionline",
      color: "#FF0000",
      label: "YouTube",
    },
    {
      icon: Linkedin,
      url: "https://linkedin.com/company/acharyajionline",
      color: "#0A66C2",
      label: "LinkedIn",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fallIn {
          from {
            transform: translateY(-100px) rotate(-180deg) scale(0.3);
            opacity: 0;
          }
          to {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes ripple {
          0% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          100% { 
            transform: scale(1.5); 
            opacity: 0; 
          }
        }

        @keyframes iconSpin {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.1); }
        }

        @keyframes buttonShake {
          0%, 100% { transform: rotate(0deg) scale(1.1); }
          25% { transform: rotate(-10deg) scale(1.1); }
          50% { transform: rotate(10deg) scale(1.1); }
          75% { transform: rotate(-10deg) scale(1.1); }
        }

        @keyframes shine {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        @keyframes tooltipBounce {
          0%, 100% { transform: translateY(-50%) scale(1); }
          50% { transform: translateY(-50%) scale(1.05); }
        }

        @keyframes particle {
          0% { 
            transform: translate(-50%, -50%) scale(0); 
            opacity: 0; 
          }
          50% { 
            opacity: 0.8; 
          }
          100% { 
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1.5);
            opacity: 0; 
          }
        }

        .social-item {
          ${isHomePage ? 'animation: fallIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;' : 'opacity: 1;'}
          animation-delay: calc(var(--index) * 0.12s + 0.2s);
          ${isHomePage ? 'opacity: 0;' : ''}
        }

        .social-item.visible {
          opacity: 1;
        }

        .glow-effect {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          filter: blur(12px);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .social-item:hover .glow-effect {
          opacity: 0.6;
          animation: pulse 2s ease-in-out infinite;
        }

        .ripple-effect {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 2px solid;
          opacity: 0;
        }

        .social-item:hover .ripple-effect {
          animation: ripple 1.5s ease-out infinite;
        }

        .social-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 9999px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 2px solid;
          transition: all 0.3s;
          overflow: hidden;
        }

        .social-button:hover {
          animation: buttonShake 0.5s ease-in-out;
          transform: scale(1.1);
        }

        .social-button:active {
          transform: scale(0.9);
        }

        .icon-wrapper {
          transition: all 0.2s;
        }

        .social-item:hover .icon-wrapper {
          animation: iconSpin 0.6s ease-in-out;
        }

        .shine-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
          transform: rotate(45deg);
          opacity: 0;
        }

        .social-item:hover .shine-effect {
          opacity: 1;
          animation: shine 0.6s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .tooltip {
          position: absolute;
          right: 100%;
          margin-right: 12px;
          top: 50%;
          transform: translateY(-50%) translateX(10px) scale(0.8);
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          white-space: nowrap;
        }

        .social-item:hover .tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(0) scale(1);
          animation: tooltipBounce 0.8s ease-in-out infinite;
        }

        .tooltip-content {
          padding: 8px 16px;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: bold;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          position: relative;
        }

        .tooltip-arrow {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-left: 6px solid;
        }

        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        .social-item:hover .particle {
          animation: particle 1s ease-out infinite;
        }

        .particle:nth-child(1) {
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          animation-delay: 0.1s;
        }

        .particle:nth-child(3) {
          animation-delay: 0.2s;
        }
      `}</style>

      <div className="hidden lg:flex flex-col gap-3 fixed right-4 top-1/2 -translate-y-1/2 z-[1001]">
        {socialData.map((social, index) => {
          const Icon = social.icon;

          return (
            <div
              key={index}
              className={`social-item relative ${isVisible ? "visible" : ""}`}
              style={{ "--index": index }}
            >
              {/* Glow */}
              <div
                className="glow-effect"
                style={{ backgroundColor: social.color }}
              />

              {/* Ripple */}
              <div
                className="ripple-effect"
                style={{ borderColor: social.color }}
              />

              {/* Main Button */}
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
                style={{ borderColor: social.color }}
              >
                <div className="icon-wrapper">
                  <Icon size={18} style={{ color: social.color }} />
                </div>

                <div className="shine-effect" />
              </a>

              {/* Tooltip */}
              <div className="tooltip">
                <div
                  className="tooltip-content"
                  style={{ backgroundColor: social.color }}
                >
                  {social.label}
                  <div
                    className="tooltip-arrow"
                    style={{ borderLeftColor: social.color }}
                  ></div>
                </div>
              </div>

              {/* Particles */}
              <div
                className="particle"
                style={{
                  backgroundColor: social.color,
                  "--x": "30px",
                  "--y": "0px",
                }}
              />
              <div
                className="particle"
                style={{
                  backgroundColor: social.color,
                  "--x": "-15px",
                  "--y": "26px",
                }}
              />
              <div
                className="particle"
                style={{
                  backgroundColor: social.color,
                  "--x": "-15px",
                  "--y": "-26px",
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SocialSidebar;
