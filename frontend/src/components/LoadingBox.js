import React from 'react';
import "font-awesome/css/font-awesome.min.css";

export default function LoadingBox() {
  return (
    <div className="loading">
      <i className="fa fa-spinner fa-spin"></i> Loading...
    </div>
  );
}