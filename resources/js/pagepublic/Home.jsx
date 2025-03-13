import React from 'react';

const Home = () => {
  const backgroundStyle = {
    background: `linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url("https://source.unsplash.com/random/1920x1080?workout") center/cover no-repeat`,
    minHeight: '100vh',
    color: '#fff'
  };

  return (
    <div style={backgroundStyle} className="d-flex flex-column justify-content-center align-items-center">
      {/* Contenedor central */}
      <div className="text-center">
        <h1 className="display-3 fw-bold mb-3">Welcome to FitTrack</h1>
        <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Access the full experience. Sign in or register to continue and start tracking your fitness journey.
        </p>
        <div>
          <a href="/login" className="btn btn-primary btn-lg me-3">
            Sign In
          </a>
          <a href="/register" className="btn btn-outline-light btn-lg">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
