import React from "react";

function FeaturePage({
    title,
    subtitle,
    icon = "▣",
    buttonText,
    children
}) {

    return (
        <div className="feature-page">

            <div className="page-header">

                <div>
                    <h1>{title}</h1>

                    {subtitle && (
                        <p>{subtitle}</p>
                    )}
                </div>

                <div className="page-actions">

                    <button className="outline-button">
                        ↻ Refresh
                    </button>

                    {buttonText && (
                        <button className="primary-button">
                            + {buttonText}
                        </button>
                    )}

                </div>

            </div>

            {children || (

                <div className="empty-card">

                    <div className="empty-icon">
                        {icon}
                    </div>

                    <h2>
                        No {title.toLowerCase()} found
                    </h2>

                    <p>
                        There is no data available yet.
                    </p>

                </div>

            )}

        </div>
    );
}

export default FeaturePage;