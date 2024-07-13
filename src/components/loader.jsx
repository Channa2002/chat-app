export default function Loader() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}