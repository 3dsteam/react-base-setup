import React, {ReactElement} from "react";

export const Loading = (): ReactElement => {
    return (
        <div className="fit-auth-container flex justify-center items-center">
            <p className="text-xl text-primary">
                Loading <i className="fa-regular fa-spinner-third fa-spin"/>
            </p>
        </div>
    )
}