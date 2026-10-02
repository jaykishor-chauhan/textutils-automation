import React, { useState, useEffect } from 'react';
import '../App.css';

export default function TextBox(props) {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findWord, setFindWord] = useState('');
  const [replaceWord, setReplaceWord] = useState('');
  const [copied, setCopied] = useState(false);

  // Clean up speech synthesis when component unmounts or text changes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const convertToUppercase = () => {
    if (!text.trim()) return;
    setText(text.toUpperCase());
    props.showAlert('Converted to UPPERCASE successfully!', 'success');
  };

  const convertToLowercase = () => {
    if (!text.trim()) return;
    setText(text.toLowerCase());
    props.showAlert('Converted to lowercase successfully!', 'success');
  };

  const convertToTitleCase = () => {
    if (!text.trim()) return;
    const titleCased = text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(titleCased);
    props.showAlert('Converted to Title Case successfully!', 'success');
  };

  const convertToSentenceCase = () => {
    if (!text.trim()) return;
    const sentenceCased = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    setText(sentenceCased);
    props.showAlert('Converted to Sentence case successfully!', 'success');
  };

  const invertCase = () => {
    if (!text.trim()) return;
    const inverted = text
      .split('')
      .map((char) =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
      .join('');
    setText(inverted);
    props.showAlert('Inverted character case successfully!', 'success');
  };

  const removeExtraSpaces = () => {
    if (!text.trim()) return;
    const cleanedText = text.replace(/\s+/g, ' ').trim();
    setText(cleanedText);
    props.showAlert('Extra whitespace removed successfully!', 'success');
  };

  const removeLineBreaks = () => {
    if (!text.trim()) return;
    const singleLine = text.replace(/[\r\n]+/g, ' ').trim();
    setText(singleLine);
    props.showAlert('Line breaks removed successfully!', 'success');
  };

  const handleFindReplace = () => {
    if (!findWord) {
      props.showAlert('Please enter a word to find.', 'warning');
      return;
    }
    const regex = new RegExp(findWord, 'gi');
    if (!regex.test(text)) {
      props.showAlert(`Word "${findWord}" not found in text.`, 'warning');
      return;
    }
    const replaced = text.replace(regex, replaceWord);
    setText(replaced);
    props.showAlert(`Replaced all occurrences of "${findWord}".`, 'success');
  };

  const copyText = () => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      props.showAlert('Text copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const pasteText = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      if (clipboardText) {
        setText(clipboardText);
        props.showAlert('Pasted text from clipboard!', 'success');
      }
    } catch (err) {
      props.showAlert('Could not read clipboard. Please paste manually.', 'warning');
    }
  };

  const loadSampleText = () => {
    const sample = `TextUtils is an intuitive, modern, and powerful text processing web application. It enables you to format, clean, analyze, and convert text effortlessly in real-time. 

Try testing uppercase, lowercase, sentence case, and space removal with this sample text! You can also listen to it spoken out loud or view detailed statistics like reading time and word counts.`;
    setText(sample);
    props.showAlert('Sample text loaded!', 'info');
  };

  const resetText = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setText('');
    props.showAlert('Editor cleared!', 'info');
  };

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      props.showAlert('Text-to-speech is not supported in this browser.', 'warning');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      props.showAlert('Speech stopped.', 'info');
    } else {
      if (!text.trim()) {
        props.showAlert('Please enter some text to speak.', 'warning');
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
      props.showAlert('Reading text aloud...', 'info');
    }
  };

  const downloadText = () => {
    if (!text.trim()) return;
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'textutils-export.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    props.showAlert('File downloaded as textutils-export.txt', 'success');
  };

  // Calculations for stats
  const wordsArray = text.trim().split(/\s+/).filter((item) => item.length > 0);
  const wordCount = wordsArray.length;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s/g, '').length;
  const sentenceCount = text.split(/[.!?]+/).filter((item) => item.trim().length > 0).length;
  const readingTimeMin = (wordCount * 0.005).toFixed(2);
  const speakingTimeMin = (wordCount * 0.008).toFixed(2);

  return (
    <div className="app-container">
      {/* Hero Header */}
      <div className="hero-section">
        <h2 className="hero-title">
          {props.heading ? (
            props.heading
          ) : (
            <>
              Smart <span className="hero-gradient">Text Analyzer</span> & Tools
            </>
          )}
        </h2>
        <p className="hero-subtitle">
          Transform, clean, inspect, and listen to your text seamlessly with instantaneous live analytics.
        </p>
      </div>

      {/* Editor Box */}
      <div className="editor-card">
        <div className="editor-header">
          <div className="editor-label">
            <i className="bi bi-pencil-square text-primary"></i>
            <span>Input Text</span>
          </div>
          <div className="editor-quick-tools">
            <button
              type="button"
              className="quick-btn"
              onClick={loadSampleText}
              title="Load example text"
            >
              <i className="bi bi-file-earmark-text"></i> Sample Text
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={pasteText}
              title="Paste from clipboard"
            >
              <i className="bi bi-clipboard-plus"></i> Paste
            </button>
            <button
              type="button"
              className="quick-btn"
              onClick={resetText}
              disabled={text.length === 0}
              title="Clear all text"
            >
              <i className="bi bi-trash3"></i> Clear
            </button>
          </div>
        </div>

        <textarea
          className="custom-textarea"
          id="textBox"
          placeholder="Type or paste your text here to analyze, transform, and format..."
          value={text}
          onChange={handleOnChange}
          rows="8"
          spellCheck="false"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        />
      </div>

      {/* Search & Replace Drawer */}
      {showFindReplace && (
        <div className="search-replace-box">
          <input
            type="text"
            className="search-input"
            placeholder="Find word..."
            value={findWord}
            onChange={(e) => setFindWord(e.target.value)}
          />
          <input
            type="text"
            className="search-input"
            placeholder="Replace with..."
            value={replaceWord}
            onChange={(e) => setReplaceWord(e.target.value)}
          />
          <button
            className="tool-btn tool-btn-primary"
            onClick={handleFindReplace}
            disabled={!findWord || text.length === 0}
          >
            <i className="bi bi-arrow-repeat"></i> Replace All
          </button>
          <button
            className="tool-btn tool-btn-secondary"
            onClick={() => setShowFindReplace(false)}
          >
            <i className="bi bi-x"></i> Cancel
          </button>
        </div>
      )}

      {/* Action Toolbar Groups */}
      <div className="actions-section">
        <div className="action-group-title">
          <i className="bi bi-magic"></i> Transformations & Formatting
        </div>
        <div className="button-grid">
          <button
            className="tool-btn tool-btn-primary"
            disabled={text.length === 0}
            onClick={convertToUppercase}
            title="Convert all letters to UPPERCASE"
          >
            <i className="bi bi-type-bold"></i> UPPERCASE
          </button>
          <button
            className="tool-btn tool-btn-primary"
            disabled={text.length === 0}
            onClick={convertToLowercase}
            title="Convert all letters to lowercase"
          >
            <i className="bi bi-type"></i> lowercase
          </button>
          <button
            className="tool-btn tool-btn-secondary"
            disabled={text.length === 0}
            onClick={convertToTitleCase}
            title="Capitalize The First Letter Of Each Word"
          >
            <i className="bi bi-type-h1"></i> Title Case
          </button>
          <button
            className="tool-btn tool-btn-secondary"
            disabled={text.length === 0}
            onClick={convertToSentenceCase}
            title="Capitalize first letter of each sentence"
          >
            <i className="bi bi-fonts"></i> Sentence case
          </button>
          <button
            className="tool-btn tool-btn-secondary"
            disabled={text.length === 0}
            onClick={invertCase}
            title="Invert lowercase to UPPERCASE and vice versa"
          >
            <i className="bi bi-arrow-left-right"></i> Invert Case
          </button>
          <button
            className="tool-btn tool-btn-secondary"
            disabled={text.length === 0}
            onClick={removeExtraSpaces}
            title="Remove excessive spaces between words"
          >
            <i className="bi bi-distribute-horizontal"></i> Remove Extra Spaces
          </button>
          <button
            className="tool-btn tool-btn-secondary"
            disabled={text.length === 0}
            onClick={removeLineBreaks}
            title="Convert multi-line text into a single cohesive line"
          >
            <i className="bi bi-text-wrap"></i> Remove Line Breaks
          </button>
        </div>

        <div className="action-group-title mt-3">
          <i className="bi bi-tools"></i> Productivity & Utilities
        </div>
        <div className="button-grid">
          <button
            className={`tool-btn ${copied ? 'tool-btn-success' : 'tool-btn-primary'}`}
            disabled={text.length === 0}
            onClick={copyText}
            title="Copy text to clipboard"
          >
            <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'}`}></i>
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>

          <button
            className={`tool-btn ${isSpeaking ? 'tool-btn-danger' : 'tool-btn-accent'}`}
            disabled={text.length === 0}
            onClick={handleSpeech}
            title="Listen to text using speech synthesis"
          >
            <i className={`bi ${isSpeaking ? 'bi-stop-circle-fill' : 'bi-volume-up-fill'}`}></i>
            {isSpeaking ? 'Stop Speaking' : 'Listen Text'}
          </button>

          <button
            className="tool-btn tool-btn-secondary"
            disabled={text.length === 0}
            onClick={downloadText}
            title="Save text as a .txt file"
          >
            <i className="bi bi-download"></i> Download .txt
          </button>

          <button
            className={`tool-btn ${showFindReplace ? 'tool-btn-primary' : 'tool-btn-secondary'}`}
            disabled={text.length === 0}
            onClick={() => setShowFindReplace(!showFindReplace)}
            title="Search and replace specific words"
          >
            <i className="bi bi-search"></i> Find & Replace
          </button>

          <button
            className="tool-btn tool-btn-danger ms-auto"
            disabled={text.length === 0}
            onClick={resetText}
            title="Clear editor contents"
          >
            <i className="bi bi-trash3"></i> Reset All
          </button>
        </div>
      </div>

      {/* Analytics / Text Summary Dashboard */}
      <div className="summary-section">
        <div className="section-header">
          <h3 className="section-title">
            <i className="bi bi-bar-chart-line-fill text-primary"></i> Live Text Metrics
          </h3>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-indigo">
              <i className="bi bi-card-text"></i>
            </div>
            <div className="stat-details">
              <span className="stat-value">{wordCount}</span>
              <span className="stat-label">Words</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-purple">
              <i className="bi bi-hash"></i>
            </div>
            <div className="stat-details">
              <span className="stat-value">{charCount}</span>
              <span className="stat-label">Characters</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-cyan">
              <i className="bi bi-fonts"></i>
            </div>
            <div className="stat-details">
              <span className="stat-value">{charNoSpacesCount}</span>
              <span className="stat-label">No Spaces</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-emerald">
              <i className="bi bi-paragraph"></i>
            </div>
            <div className="stat-details">
              <span className="stat-value">{sentenceCount}</span>
              <span className="stat-label">Sentences</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-amber">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="stat-details">
              <span className="stat-value">
                {wordCount === 0 ? '0' : readingTimeMin}
                <span className="stat-unit">min</span>
              </span>
              <span className="stat-label">Reading Time</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-rose">
              <i className="bi bi-mic"></i>
            </div>
            <div className="stat-details">
              <span className="stat-value">
                {wordCount === 0 ? '0' : speakingTimeMin}
                <span className="stat-unit">min</span>
              </span>
              <span className="stat-label">Speaking Time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Section */}
      <div className="preview-card">
        <div className="preview-header">
          <div className="editor-label">
            <i className="bi bi-eye-fill text-primary"></i>
            <span>Live Output Preview</span>
          </div>
          {text.length > 0 && (
            <div className="d-flex gap-2">
              <button
                type="button"
                className="quick-btn"
                onClick={copyText}
                title="Copy preview text"
              >
                <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'}`}></i>{' '}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                type="button"
                className="quick-btn"
                onClick={downloadText}
                title="Download preview text"
              >
                <i className="bi bi-download"></i> Save
              </button>
            </div>
          )}
        </div>

        <div className="preview-body">
          {text.length > 0 ? (
            text
          ) : (
            <div className="preview-empty">
              <i className="bi bi-file-earmark-font"></i>
              <p className="mb-1 font-semibold">Nothing to preview yet</p>
              <small>Type or paste text into the box above to preview and format in real time.</small>
            </div>
          )}
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="custom-footer">
        <p className="mb-0">
          TextUtils PRO &bull; Fast, private, in-browser text transformation and analytics.
        </p>
      </footer>
    </div>
  );
}
