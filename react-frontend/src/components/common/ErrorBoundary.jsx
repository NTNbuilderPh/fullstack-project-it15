import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="center-screen">
          <div className="error-card">
            <h2>Something went wrong.</h2>
            <p>Please refresh the page and try again.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}