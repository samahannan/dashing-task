import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Login.scss";
import { PASSWORD_RULES } from "../../constants";

export default function Login({
  successCallback,
}: {
  successCallback: (role: boolean) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  const [password, setPassword] = useState("");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const [enableButton, setEnableButton] = useState(false);

  useEffect(() => {
    const invalidRules = PASSWORD_RULES.filter(({ regex }) => {
      return !password.match(regex);
    });
    if (invalidRules.length > 0) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  }, [password]);

  const handleSubmit = (e: any) => {
    // validate
    e.preventDefault();
    // not enough for the button to be enabled, to avoid bypassing it
    if (enableButton) {
      const role = password === "P@ssw0rd123" ? true : false;
      successCallback(role);
    }
  };

  return (
    <div className={`login_wrapper ${loaded ? "visible" : ""}`}>
      <div className="card">
        <div className="card_header">
          <h3>Welcome</h3>
        </div>
        <div className="card_content">
          <form onSubmit={handleSubmit}>
            <div className="form_inputs">
              <div className="input_holder">
                <input type="text" placeholder="Username" />
              </div>
              <div className="input_holder">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  value={password}
                />
              </div>
            </div>
            <div className="password_state">
              <h5>Password must contain</h5>
              <ul>
                {PASSWORD_RULES.map(({ label, regex }) => (
                  <li className={password.match(regex) ? "active" : ""}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="checkmark"
                    >
                      <path
                        fill={password.match(regex) ? "#4BB543" : "#333"}
                        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"
                      />
                    </svg>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="form_actions">
              <Button
                text="Login"
                className={!enableButton ? "disabled" : ""}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
