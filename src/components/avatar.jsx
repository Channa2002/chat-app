/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Avatar({ name = "U", color = "DodgerBlue" }) {
    // const colors = ["Tomato", "Orange", "DodgerBlue", "MediumSeaGreen", "Gray", "SlateBlue", "Violet"];
    // const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 40, width: 40, borderRadius: "50%", fontSize: 20, backgroundColor: color, color: "white" }}>
            {name.charAt(0).toUpperCase()}
        </div>
    )
}

export default Avatar;