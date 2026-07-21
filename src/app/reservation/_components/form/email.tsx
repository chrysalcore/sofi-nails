interface EmailTemplateProps {
    name: string;
    date: string;
    details: string;
}

export default function EmailTemplate({
    name,
    date,
    details,
}: EmailTemplateProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Reservation Confirmation - Sofi Nails</title>
            </head>
            <body
                style={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    backgroundColor: "#f0f1f5",
                    fontFamily: "Arial, sans-serif",
                    textSizeAdjust: "100%",
                    WebkitTextSizeAdjust: "100%",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        backgroundColor: "#f0f1f5",
                        padding: "20px 0",
                    }}
                >
                    <div
                        style={{
                            maxWidth: "600px",
                            margin: "0 auto",
                            backgroundColor: "#ffffff",
                            borderRadius: "8px",
                            overflow: "hidden",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                    >
                        {/* Header Image
                        <div style={{ padding: 0 }}>
                            <img
                                src="https://via.placeholder.com/600x200/FFD700/000000?text=Sofi+Nails"
                                width="600"
                                height="200"
                                alt="Sofi Nails"
                                style={{ display: 'block', width: '100%', height: 'auto', maxWidth: '100%' }}
                            />
                        </div> */}

                        {/* Greeting */}
                        <div
                            style={{
                                padding: "40px 30px 20px 30px",
                                textAlign: "center",
                            }}
                        >
                            <h1
                                style={{
                                    color: "#c39870",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                    margin: "0 0 10px 0",
                                    fontFamily:
                                        '"Work Sans", Arial, sans-serif',
                                }}
                            >
                                New Reservation from {name}
                            </h1>
                            <p
                                style={{
                                    color: "#6e5b3d",
                                    fontSize: "18px",
                                    margin: "0",
                                    fontFamily:
                                        '"Work Sans", Arial, sans-serif',
                                }}
                            >
                                I want to visit your salon on:
                            </p>
                            <p
                                style={{
                                    color: "#c39870",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    margin: "10px 0 0 0",
                                }}
                            >
                                {date}
                            </p>
                        </div>

                        {/* Details */}
                        <div
                            style={{
                                padding: "20px 30px",
                                textAlign: "center",
                            }}
                        >
                            <h2
                                style={{
                                    color: "#6e5b3d",
                                    fontSize: "20px",
                                    margin: "0 0 15px 0",
                                    fontFamily:
                                        '"Work Sans", Arial, sans-serif',
                                }}
                            >
                                Reservation Details:
                            </h2>
                            <p
                                style={{
                                    color: "#4d5741",
                                    fontSize: "16px",
                                    lineHeight: "1.5",
                                    margin: "0",
                                    fontFamily: "Arial, sans-serif",
                                }}
                            >
                                {details}
                            </p>
                        </div>

                        {/* Call to Action Button */}
                        <div
                            style={{
                                padding: "30px 30px 40px 30px",
                                textAlign: "center",
                            }}
                        >
                            <a
                                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Evento&details=Ubicaci%C3%B3n:%20https://maps.google.com/?q=2928+Bent+Tree+Cir,+Salem,+VA&location=2928%20Bent%20Tree%20Cir,%20Salem,%20VA%2024153'`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "#ff4030",
                                    color: "#ffffff",
                                    textDecoration: "none",
                                    padding: "15px 30px",
                                    borderRadius: "25px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    fontFamily: "Work Sans, Arial, sans-serif",
                                }}
                            >
                                Confirm Reservation
                            </a>
                        </div>

                        {/* Footer */}
                        <div
                            style={{
                                backgroundColor: "#f8f9fa",
                                padding: "20px 30px",
                                textAlign: "center",
                                borderTop: "1px solid #e9ecef",
                            }}
                        >
                            <p
                                style={{
                                    color: "#6c757d",
                                    fontSize: "14px",
                                    margin: "0",
                                    fontFamily: "Arial, sans-serif",
                                }}
                            >
                                Thank you for choosing Sofi Nails. We look
                                forward to seeing you soon.
                                <br />
                                For more information, visit our website.
                            </p>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
