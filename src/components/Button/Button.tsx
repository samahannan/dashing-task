import "./Button.scss";

interface IButton {
  type?: "button" | "submit";
  text?: string;
  className?: string;
}

export default function Button({
  type = "button",
  text = "",
  className = "primary",
}: IButton) {
  return <input className={`button ${className}`} type={type} value={text} />;
}
