import React, { useState, useEffect } from "react";

const About = () => {
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert(false);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [alert]);

    return (
        <section className="page about-page">
            <div className="title-container">
                <h1>About</h1>
            </div>
            <div className="about-desc">
                <p>
                    Hello, my name is Karol. It's my first web app built on
                    React Framework. It's still in "work in progress" stage so
                    be patient. You can report any bugs to me on:
                </p>
                <p
                    className="contact-email"
                    onClick={() => {
                        setAlert(true);
                        navigator.clipboard.writeText("karolkwit96@gmail.com");
                    }}
                >
                    karolkwit96@gmail.com
                    {alert && <p className="alert">copied to clipboard</p>}
                </p>
                <p>Thanks for visiting my app!</p>
            </div>
        </section>
    );
};

export default About;
