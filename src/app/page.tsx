"use client";

import { useState } from "react";
import "./globals.css"

export default function Home() {
  const [recipientType, setRecipientType] = useState("Professor");
  const [emailType, setEmailType] = useState("Request");
  const [tone, setTone] = useState("Formal");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");

async function handleGenerate() {
  if (!userInput.trim()) {
    alert("Please enter what the email should be about.");
    return;
  }

  setOutput("Generating email...");

  try {
    const response = await fetch("/api/generate-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipientType,
        emailType,
        tone,
        userInput,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setOutput(data.email);
  } catch (error) {
    console.error(error);
    setOutput("Something went wrong. Please try again.");
  }
}

  return (
    <main className="page-container">
      <div className="content-wrapper">
        <header className="hero">
          <h1>AI Email Assistant</h1>
          <p>
            Generate personalized emails based on recipient, purpose, and tone.
          </p>
        </header>

        <div className="form-card">
          <div className="form-grid">
            <div className="field-group">
              <label>Recipient Type</label>
              <select
                value={recipientType}
                onChange={(e) => setRecipientType(e.target.value)}
                className="select-field"
              >
                <option>Friend</option>
                <option>Professor</option>
                <option>Recruiter</option>
                <option>Manager</option>
              </select>
            </div>

            <div className="field-group">
              <label>Email Type</label>
              <select
                value={emailType}
                onChange={(e) => setEmailType(e.target.value)}
                className="select-field"
              >
                <option>Follow-up</option>
                <option>Request</option>
                <option>Thank-you</option>
                <option>Apology</option>
                <option>Cold Email</option>
              </select>
            </div>

            <div className="field-group">
              <label>Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="select-field"
              >
                <option>Formal</option>
                <option>Friendly</option>
                <option>Short</option>
                <option>Persuasive</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <label>What should the email be about?</label>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Example: Ask my professor for a research opportunity in AI..."
              className="text-area"
            />
          </div>

          <button onClick={handleGenerate} className="generate-btn">
            Generate Email
          </button>
        </div>

        {output && (
          <div className="output-card">
            <h2>Generated Email</h2>
            <pre className="email-output">{output}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
