const adminCode =
    document.getElementById(
        "adminCode"
    );

const loginButton =
    document.getElementById(
        "loginButton"
    );

const message =
    document.getElementById(
        "message"
    );


loginButton.addEventListener(
    "click",
    async function () {

        const code =
            adminCode.value;


        try {

            const response =
                await fetch(
                    "/admin/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        credentials: "include",

                        body: JSON.stringify({
                            code: code
                        })
                    }
                );


            const result =
                await response.text();


            if (response.ok) {

                window.location.href =
                    "/admin/dashboard";

            } else {

                message.textContent =
                    result;

            }

        } catch (error) {

            message.textContent =
                "Could not connect to server.";

            console.error(error);

        }

    }
);